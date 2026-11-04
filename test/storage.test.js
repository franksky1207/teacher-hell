import test from 'node:test';
import assert from 'node:assert/strict';
import { runtimeScenario,request,id,event,fact,open,result } from './support/runtime.js';
import { createSave,restoreSave,saveToken,sameToken } from '../src/storage/format.js';
import { createStoredSession } from '../src/storage/session.js';
import { runtimeOf,WorldError } from '../src/runtime/model.js';
import { annualOpening } from './support/annual-scenario.js';
import { forkWorldAttempt } from '../src/runtime/transactions.js';
const clone=structuredClone;
function memory(){const slots=new Map(),counts=new Map();let fail=false;return {fail(){fail=true;},async read(n){return clone(slots.get(n)??{payload:null,token:null});},async write(n,payload,expected){const old=await this.read(n);if(!sameToken(old.token,expected))throw new WorldError('STALE','changed');if(fail){fail=false;throw new Error('quota');}const generation=(counts.get(n)??0)+1;counts.set(n,generation);const saved={payload:clone(payload),token:payload?saveToken({payload,generation}):null};slots.set(n,saved);return clone(saved);}};}
const sample=(world,tag)=>request(world,tag,[{type:'sample',stream:'events',id:tag,weights:[1,2,3]}]);
test('storage: formal annual play cannot use engineering retry before failure, after reload or across slots',async()=>{
 let opening;const w=annualOpening({events:false,onOpening:value=>opening=value}),db=memory(),s=await createStoredSession(db,1);
 await s.initialize(opening);const stale=await createStoredSession(db,1);
 await s.import(createSave(w,opening),{expectedToken:s.snapshot().token,confirmed:true});
 const before=s.snapshot(),options={attemptId:id('attempt','unauthorized-annual'),seeds:{settlement:22,streams:Object.fromEntries(Object.keys(w.random).map(k=>[k,33]))}};
 // Repeated attempts neither consume an ID nor rotate RNG/history/revision.
 for(let n=0;n<3;n++)await assert.rejects(s.retry(options),{code:'RETRY_UNAUTHORIZED'});
 assert.deepEqual(s.snapshot(),before);assert.deepEqual(await db.read(1),before);
 await assert.rejects(stale.retry(options),{code:'STALE'});
 assert.throws(()=>forkWorldAttempt(opening,options),{code:'RETRY_UNAUTHORIZED'});
 assert.throws(()=>forkWorldAttempt(opening,options,w),{code:'RETRY_UNAUTHORIZED'});
 const exported=await s.export(),imported=await createStoredSession(db,2);await imported.import(exported,{expectedToken:null});
 const reloaded=await createStoredSession(db,2),copy=reloaded.snapshot();await assert.rejects(reloaded.retry(options),{code:'RETRY_UNAUTHORIZED'});
 assert.deepEqual(reloaded.snapshot(),copy);assert.deepEqual((await db.read(1)),before);assert.equal((await db.read(3)).payload,null);
 // A blocked retry must not lock normal play or corrupt the original opening.
 const q=sample(w,'continue-after-denied-retry');await s.execute(q);assert.equal((await s.execute(q)).duplicate,true);
 assert.deepEqual(s.snapshot().payload.opening,opening);
});
test('storage: version rejection and detached complete world/opening roundtrip',()=>{
  const w=runtimeScenario(),p=createSave(w,w);assert.deepEqual(restoreSave(JSON.stringify(p)),p);p.world.random.events.state=0;assert.deepEqual(w,runtimeScenario());
  for(const mutate of [p=>p.version=2,p=>p.world.extensions['teacher-hell/world'].version=2,p=>p.world.schemaVersion=8,p=>p.extra=true]){const bad=createSave(w,w);mutate(bad);assert.throws(()=>restoreSave(bad));}
});
test('storage: failed write preserves world/random, retry and lost response settle exactly once',async()=>{
 const db=memory(),s=await createStoredSession(db,1),w=runtimeScenario();await s.initialize(w);const before=s.snapshot(),q=sample(w,'once');db.fail();await assert.rejects(s.execute(q),/quota/);assert.deepEqual(s.snapshot(),before);assert.deepEqual(await db.read(1),before);
 await s.execute(q);const committed=s.snapshot();const reloaded=await createStoredSession(db,1);assert.equal((await reloaded.execute(q)).duplicate,true);assert.deepEqual(reloaded.snapshot(),committed);assert.equal(runtimeOf(committed.payload.world).commits.length,1);
 await assert.rejects(reloaded.execute({...q,operations:[{type:'bad'}]}),{code:'CONFLICT'});
});
test('storage: serialize queued operations; stale peers cannot overwrite newer world',async()=>{
 const db=memory(),a=await createStoredSession(db,1),w=runtimeScenario();await a.initialize(w);const b=await createStoredSession(db,1),q=sample(w,'a');
 const results=await Promise.allSettled([a.execute(q),a.execute(sample(w,'b'))]);assert.equal(results[0].status,'fulfilled');assert.equal(results[1].status,'rejected');
 const saved=await db.read(1);await assert.rejects(b.execute(sample(w,'other')),{code:'STALE'});assert.deepEqual(await db.read(1),saved);assert.equal((await b.execute(q)).duplicate,true);
});
test('storage: disk success plus memory failure returns durable outcome and requires recovery',async()=>{
 const db=memory(),init=await createStoredSession(db,1),w=runtimeScenario();await init.initialize(w);const s=await createStoredSession(db,1,{afterPersist(){throw Error('publication failed');}}),q=sample(w,'sync-fault');
 const result=await s.execute(q);assert.equal(result.committed,true);assert.equal(result.recoveryRequired,true);assert.throws(()=>s.snapshot(),{code:'RECOVERY_REQUIRED'});await assert.rejects(s.execute(q),{code:'RECOVERY_REQUIRED'});
 await s.recover();assert.equal((await s.execute(q)).duplicate,true);assert.equal(runtimeOf(s.snapshot().payload.world).revision,1);
});
test('storage: import confirmation, CAS, invalid data and quota preserve destination',async()=>{
 const db=memory(),s=await createStoredSession(db,1),w=runtimeScenario();await s.initialize(w);const before=s.snapshot(),text=await s.export();
 await assert.rejects(s.import(text,{expectedToken:before.token}),{code:'CONFIRM'});await assert.rejects(s.import('{}',{expectedToken:before.token,confirmed:true}));assert.deepEqual(await db.read(1),before);
 db.fail();await assert.rejects(s.import(text,{expectedToken:before.token,confirmed:true}),/quota/);assert.deepEqual(await db.read(1),before);
 const review=await s.reviewImport(text);assert.deepEqual(review.replacing.identity,w.identity);await s.execute(sample(w,'later'));await assert.rejects(s.import(text,{expectedToken:review.token,confirmed:true}),{code:'STALE'});
 const fresh=s.snapshot();await s.import(text,{expectedToken:fresh.token,confirmed:true});assert.deepEqual(s.snapshot().payload,before.payload);assert.notDeepEqual(s.snapshot().token,before.token);
 await assert.rejects(s.delete({expectedToken:s.snapshot().token}),{code:'CONFIRM'});
});
test('storage: persisted opening retry excludes failed history and survives export/reload',async()=>{
 const db=memory(),s=await createStoredSession(db,1),w=runtimeScenario();await s.initialize(w);await s.execute(sample(w,'failed-attempt'));const exported=await s.export(),b=await createStoredSession(db,2);await b.import(exported,{expectedToken:null});
 await b.retry({attemptId:id('attempt','retry'),seeds:{settlement:22,streams:Object.fromEntries(Object.keys(w.random).map(k=>[k,33]))}});
 const next=b.snapshot().payload;assert.equal(runtimeOf(next.world).commits.some(c=>c.id===sample(w,'failed-attempt').id),false);assert.deepEqual(next.opening,w);assert.equal(next.world.identity.careerId,w.identity.careerId);assert.deepEqual((await db.read(1)).payload,restoreSave(exported));
});

test('storage: retry re-delivery is idempotent; changed seeds conflict; atomic opening capture',async()=>{
 const db=memory(),s=await createStoredSession(db,1),w=runtimeScenario();await s.initialize(w);
 await s.execute(sample(w,'opening-operation'),{captureOpening:true});const opening=s.snapshot().payload.opening;
 await s.execute(sample(opening,'failure'));const opts={attemptId:id('attempt','stable-retry'),seeds:{settlement:24,streams:{events:25}}};
 await s.retry(opts);const before=s.snapshot();assert.equal((await s.retry(opts)).duplicate,true);assert.deepEqual(s.snapshot(),before);
 await assert.rejects(s.retry({...opts,seeds:{settlement:26,streams:{events:25}}}),{code:'CONFLICT'});assert.deepEqual(s.snapshot(),before);
 assert.deepEqual(s.snapshot().payload.opening,opening);assert.equal(runtimeOf(s.snapshot().payload.world).commits.length,2);
 const stale=await createStoredSession(db,1);await s.execute(sample(s.snapshot().payload.world,'after-retry'));await assert.rejects(stale.retry(opts),{code:'STALE'});
});

test('storage: an overwritten career cannot impersonate the old operation receipt even with identical request IDs',async()=>{
 const db=memory(),a=await createStoredSession(db,1),w=runtimeScenario();await a.initialize(w);const q=sample(w,'same-id-across-careers');await a.execute(q);const original=a.snapshot(),replacement=structuredClone(original.payload);
 replacement.world.identity.careerId=id('career','replacement');replacement.opening.identity.careerId=id('career','replacement');
 const manager=await createStoredSession(db,1);await manager.import(JSON.stringify(replacement),{expectedToken:manager.snapshot().token,confirmed:true});const disk=await db.read(1);
 await assert.rejects(a.execute(q),{code:'STALE'});assert.deepEqual(a.snapshot(),original);assert.deepEqual(await db.read(1),disk);
});

test('storage: retired attempt IDs cannot be reused after two retries or export/import',async()=>{
 const db=memory(),s=await createStoredSession(db,1),w=runtimeScenario();await s.initialize(w);
 const options=tag=>({attemptId:id('attempt',tag),seeds:{settlement:24,streams:{events:25}}});
 await s.retry(options('first'));const first=s.snapshot().payload.world;
 const oldRequest=sample(first,'retired-request');await s.execute(oldRequest);
 await s.retry(options('second'));const second=s.snapshot();
 await assert.rejects(s.execute(oldRequest),{code:'ATTEMPT'});
 await assert.rejects(s.retry(options('first')),{code:'ATTEMPT'});
 assert.deepEqual(s.snapshot(),second);assert.deepEqual(await db.read(1),second);
 const imported=await createStoredSession(db,2);await imported.import(await s.export(),{expectedToken:null});
 await assert.rejects(imported.retry(options('first')),{code:'ATTEMPT'});
 await imported.retry(options('third'));
 assert.equal(imported.snapshot().payload.world.identity.attemptId,options('third').attemptId);
 assert.deepEqual(imported.snapshot().payload.opening,w);
});

test('storage: a failed retry write consumes no attempt ID and stale pages cannot retry',async()=>{
 const db=memory(),s=await createStoredSession(db,1),w=runtimeScenario();await s.initialize(w);
 const peer=await createStoredSession(db,1),before=s.snapshot();
 const options={attemptId:id('attempt','atomic-lineage'),seeds:{settlement:81,streams:{events:82}}};
 db.fail();await assert.rejects(s.retry(options),/quota/);
 assert.deepEqual(s.snapshot(),before);assert.deepEqual(await db.read(1),before);
 await s.retry(options);const saved=s.snapshot();
 await assert.rejects(peer.retry({attemptId:id('attempt','stale-lineage'),seeds:options.seeds}),{code:'STALE'});
 assert.deepEqual(await db.read(1),saved);
 const reloaded=await createStoredSession(db,1);assert.equal((await reloaded.retry(options)).duplicate,true);
 assert.deepEqual(reloaded.snapshot(),saved);
});

test('storage: missing, altered or unsupported retry lineage fails save validation',async()=>{
 const db=memory(),s=await createStoredSession(db,1),w=runtimeScenario();await s.initialize(w);
 await s.retry({attemptId:id('attempt','validated-lineage'),seeds:{settlement:81,streams:{events:82}}});
 const saved=s.snapshot().payload,key='teacher-hell/attempt-lineage';
 for(const mutate of [p=>delete p.world.extensions[key],p=>p.world.extensions[key].version=2,p=>p.world.extensions[key].attemptIds.pop(),p=>p.world.extensions[key].attemptIds.push(id('attempt','unrecorded'))]){
  const bad=clone(saved);mutate(bad);assert.throws(()=>restoreSave(bad));
 }
 assert.deepEqual(restoreSave(JSON.stringify(saved)),saved);
});

test('storage: repeated retry keeps the full opening and removes abandoned facts and numeric outcomes',async()=>{
 const db=memory(),s=await createStoredSession(db,1),w=runtimeScenario(),e=event(w);
 await s.initialize(w);await s.execute(request(w,'opening-fact',[open(e),fact(e)]),{captureOpening:true});
 const opening=s.snapshot().payload.opening,subject=e.participantIds[1];
 const options=tag=>({attemptId:id('attempt',tag),seeds:{settlement:41,streams:{events:42}}});
 for(const tag of ['full-first','full-second','full-third']){
  const current=s.snapshot().payload.world;
  const q=request(current,tag,[fact(e,'abandoned-'+tag),result(e,subject,'numeric-'+tag,5,tag)]);
  await s.execute(q);assert.notDeepEqual(s.snapshot().payload.world.numeric.evolution,opening.numeric.evolution);
  await s.retry(options(tag));const next=s.snapshot().payload;
  assert.deepEqual(next.opening,opening);assert.deepEqual(next.world.numeric.evolution,opening.numeric.evolution);
  assert.deepEqual(next.world.events,opening.events);assert.deepEqual(next.world.enrollments,opening.enrollments);
  for(const field of ['facts','claims','knowledge','disclosures','effects','stages'])assert.deepEqual(runtimeOf(next.world)[field],runtimeOf(opening)[field]);
  assert.equal(next.world.numeric.receipts.length,0);assert.equal(runtimeOf(next.world).commits.length,runtimeOf(opening).commits.length+1);
  await assert.rejects(s.execute(q),{code:'ATTEMPT'});
 }
});
