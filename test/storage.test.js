import test from 'node:test';
import assert from 'node:assert/strict';
import { runtimeScenario,request,id } from './support/runtime.js';
import { createSave,restoreSave,saveToken,sameToken } from '../src/storage/format.js';
import { createStoredSession } from '../src/storage/session.js';
import { runtimeOf,WorldError } from '../src/runtime/model.js';
const clone=structuredClone;
function memory(){const slots=new Map(),counts=new Map();let fail=false;return {fail(){fail=true;},async read(n){return clone(slots.get(n)??{payload:null,token:null});},async write(n,payload,expected){const old=await this.read(n);if(!sameToken(old.token,expected))throw new WorldError('STALE','changed');if(fail){fail=false;throw new Error('quota');}const generation=(counts.get(n)??0)+1;counts.set(n,generation);const saved={payload:clone(payload),token:payload?saveToken({payload,generation}):null};slots.set(n,saved);return clone(saved);}};}
const sample=(world,tag)=>request(world,tag,[{type:'sample',stream:'events',id:tag,weights:[1,2,3]}]);
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
