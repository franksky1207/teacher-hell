/** Independent S1 research tests. No production codec/format is installed. */
import test from 'node:test';
import assert from 'node:assert/strict';
import { packPrefix,unpackPrefix,compressBytes,decompressBytes,attributeSave,sha256,jsonBytes,PREFIX_PATHS,measureFile } from '../scripts/save-capacity.js';
import { runtimeScenario,request,event,fact,open,result,id } from './support/runtime.js';
import { experiencedOpening } from './support/calendar.js';
import { failureOpening } from './support/failure-scenario.js';
import { prepareWorldOperation,forkWorldAttempt } from '../src/runtime/transactions.js';
import { runtimeOf } from '../src/runtime/model.js';
import { createSave,restoreSave,saveToken,sameToken } from '../src/storage/format.js';
import { createStoredSession } from '../src/storage/session.js';
import { mkdtemp,writeFile,rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
function sample(){
 let w=runtimeScenario(),e=event(w,'s1-test');w=prepareWorldOperation(w,request(w,'s1-fact',[open(e),fact(e)])).world;
 const actor=e.participantIds[1],claimId=id('claim','s1-test');
 w=prepareWorldOperation(w,request(w,'s1-learn',[
  {type:'claim',id:claimId,versionId:'v1',factId:id('fact','one'),statement:'獨立的合成契約敘述',sourceId:actor},
  {type:'learn',actorId:actor,claimId,versionId:'v1',source:{kind:'observation',actorId:actor,basisFactId:id('fact','one')},belief:'believed',confidence:.8},result(e,actor,'s1-test-result'),
 ])).world;
 const opening=structuredClone(w);
 w=prepareWorldOperation(w,request(w,'s1-mutable',[
  {type:'belief',actorId:actor,claimId,versionId:'v1',belief:'rejected',confidence:.2},
  {type:'stage',eventId:e.id,fromStageId:e.stageId,stageId:id('stage','s1-test-next'),choice:null},
 ])).world;
 const tail=event(w,'s1-abandoned-tail');w=prepareWorldOperation(w,request(w,'s1-tail-effects',[open(tail),fact(tail,'tail'),{...result(tail,actor,'s1-tail-result'),factId:id('fact','tail')}])).world;
 return createSave(w,opening);
}
test('S1 prefix: exact append-only prefixes restore fully; mutable same-ID state remains independent',()=>{
 const original=sample(),before=JSON.stringify(original),p=packPrefix(original),restored=unpackPrefix(JSON.stringify(p));
 assert.deepEqual(restored,original);assert.equal(JSON.stringify(original),before);assert.deepEqual(restoreSave(restored),original);assert.throws(()=>restoreSave(p));
 assert.ok(p.shared.some(b=>b.path.at(-1)==='history'&&b.count>0));assert.ok(p.shared.some(b=>b.path.at(-1)==='receipts'&&b.count>0));
 assert.ok(p.shared.every(b=>PREFIX_PATHS.some(path=>JSON.stringify(path)===JSON.stringify(b.path))));
 assert.ok(!p.shared.some(b=>['knowledge','events','evolution','random','plan'].includes(b.path.at(-1))));
 assert.notDeepEqual(runtimeOf(restored.world).knowledge,runtimeOf(restored.opening).knowledge);assert.notDeepEqual(restored.world.events,restored.opening.events);
 const originalOpening=JSON.stringify(restored.opening);runtimeOf(restored.world).history[0].data.extra='only-world';restored.world.numeric.evolution.world.player.current.person['2-1']=99;
 assert.equal(JSON.stringify(restored.opening),originalOpening);p.shared[0].rows[0].data.extra='only-prototype';assert.equal(JSON.stringify(original),before);
});
test('S1 prefix: same attempt IDs alone never authorize reuse; retired attempt receipts and opening survive',()=>{
 const original=sample(),opening=original.opening,options={attemptId:id('attempt','s1-retry'),seeds:{settlement:22,streams:Object.fromEntries(Object.keys(opening.random).map(k=>[k,33]))}},retried=forkWorldAttempt(opening,options,original.world),save=createSave(retried,opening),p=packPrefix(save),restored=unpackPrefix(p);
 assert.deepEqual(restored,save);assert.equal(runtimeOf(restored.world).numericArchives.length,1);assert.ok(runtimeOf(restored.world).numericArchives[0].receipts.length>0);assert.deepEqual(runtimeOf(restored.world).numericArchives[0].receipts,opening.numeric.receipts);assert.ok(original.world.numeric.receipts.length>opening.numeric.receipts.length);assert.ok(!restored.world.numeric.receipts.some(r=>r.id===id('effect','s1-tail-result')));assert.equal(restored.world.numeric.receipts.length,0);
 assert.ok(!p.shared.some(b=>b.path[0]==='numeric'));assert.notEqual(restored.world.numeric.attemptId,restored.opening.numeric.attemptId);
 assert.throws(()=>forkWorldAttempt(opening,{...options,attemptId:original.world.identity.attemptId},restored.world),{code:'ATTEMPT'});
});
test('S1 prefix: invalid hashes, references, counts and recomputed-hash illegal worlds are rejected',()=>{
 const save=sample(),p=packPrefix(save);
 for(const mutate of [
  q=>q.version=9,q=>q.source.normalizedSha256='0'.repeat(64),q=>q.shared[0].sha256='0'.repeat(64),q=>q.shared[0].count++,q=>q.shared.push(q.shared[0]),q=>q.shared[0].path=['__proto__','polluted'],q=>q.shared[0].path=['events'],q=>q.shared[0].rows.pop(),q=>q.payload.world.position.serviceYear=20,
 ]){const bad=structuredClone(p);mutate(bad);assert.throws(()=>unpackPrefix(bad));}
 const bad=structuredClone(p),illegal=structuredClone(save);illegal.world.position.serviceYear=20;bad.payload.world.position.serviceYear=20;bad.source.normalizedSha256=sha256(JSON.stringify(illegal));bad.source.normalizedBytes=jsonBytes(illegal);assert.throws(()=>unpackPrefix(bad),/TIME|[Yy]ear|[Pp]osition|authority/);
 assert.equal({}.polluted,undefined);
});
test('S1 codecs: Gzip/Brotli and Node Web Streams preserve UTF-8, reject truncation and enforce expanded-byte limits',async()=>{
 const original=sample(),raw=Buffer.from(JSON.stringify(original));
 for(const codec of ['gzip','brotli','gzip-web','brotli-web']){
  const compressed=await compressBytes(raw,codec),decoded=await decompressBytes(compressed,codec,raw.length);assert.equal(sha256(decoded),sha256(raw));assert.deepEqual(restoreSave(decoded.toString('utf8')),original);
  await assert.rejects(decompressBytes(compressed,codec,raw.length-1));await assert.rejects(decompressBytes(compressed.subarray(0,Math.floor(compressed.length/2)),codec,raw.length));
 }
});
test('S1 combined: all three T2 difficulties and retained 30-year opening pass unchanged full validators',async()=>{
 for(const w of [experiencedOpening('easy'),experiencedOpening('normal'),experiencedOpening('hard'),failureOpening()]){
  const original=createSave(w,w),p=packPrefix(original),raw=Buffer.from(JSON.stringify(p));
  for(const codec of ['gzip','brotli'])assert.deepEqual(unpackPrefix((await decompressBytes(await compressBytes(raw,codec),codec,raw.length)).toString('utf8')),original);
 }
});
test('S1 attribution: disjoint UTF-8 partition sums exactly; changed IDs and repeated evidence are counted without deletion',()=>{
 const save=sample(),a=attributeSave(save);
 assert.equal(a.partition.reduce((n,x)=>n+x.bytes,0),jsonBytes(save));assert.equal(a.normalizedJsonBytes,Buffer.byteLength(JSON.stringify(save)));
 assert.equal(a.comparisons.events.counts.changed,1);assert.equal(a.comparisons['runtime.knowledge'].counts.changed,1);assert.ok(a.comparisons['runtime.history'].byteIdenticalPrefixRows>0);
 assert.ok(a.ledgers.world.runtimeRequests.jsonValueBytes>a.ledgers.world.runtimeRequests.textBytes);assert.ok(a.ledgers.world.numericRequests.directChangesRepeatedValueBytes>0);assert.equal(a.ledgers.world.verifiedEventFactReferences,2);assert.ok(a.repetition.keyColonBytes>0);
 assert.equal(a.topFive.length,5);
});
test('S1 prefix: null openings and aliased input roots never create mutable shared decoded roots',()=>{
 const w=runtimeScenario(),noOpening=createSave(w),restored=unpackPrefix(packPrefix(noOpening));assert.deepEqual(restored,noOpening);
 const aliased={kind:noOpening.kind,version:1,world:w,opening:w},copy=unpackPrefix(packPrefix(aliased));assert.deepEqual(copy.world,copy.opening);copy.world.random.events.state=1;assert.notEqual(copy.opening.random.events.state,1);
});
test('S1 storage boundary: decoded v1 payload retains CAS, failed-write rollback and manual import/export',async()=>{
 let fail=false;const slots=new Map(),storage={async read(slot){assert.ok([1,2,3].includes(slot));return structuredClone(slots.get(slot)??{payload:null,token:null});},async write(slot,payload,expected){const prior=await this.read(slot);if(!sameToken(prior.token,expected))throw Object.assign(Error('stale'),{code:'STALE'});if(fail){fail=false;throw Error('quota');}const checked=restoreSave(payload),saved={payload:checked,token:saveToken({generation:(prior.token?.generation??0)+1,payload:checked})};slots.set(slot,saved);return structuredClone(saved);}};
 const save=sample(),session=await createStoredSession(storage,1);await session.initialize(save.opening);const before=session.snapshot(),decoded=unpackPrefix(packPrefix(save));
 await assert.rejects(session.import(packPrefix(save),{expectedToken:before.token,confirmed:true}));assert.deepEqual(session.snapshot(),before);
 fail=true;await assert.rejects(session.import(decoded,{expectedToken:before.token,confirmed:true}),/quota/);assert.deepEqual(session.snapshot(),before);
 await session.import(decoded,{expectedToken:before.token,confirmed:true});assert.deepEqual(restoreSave(await session.export()),save);await assert.rejects(session.import(decoded,{expectedToken:before.token,confirmed:true}),{code:'STALE'});
 const second=await createStoredSession(storage,2);await second.import(await session.export(),{expectedToken:null});assert.deepEqual(second.snapshot().payload,save);assert.equal((await storage.read(3)).payload,null);
});
test('S1 worker: wrong source hash is rejected before prototype/compression measurements',async()=>{
 const dir=await mkdtemp(join(tmpdir(),'teacher-hell-s1-'));
 try{const file=join(dir,'save.json');await writeFile(file,JSON.stringify(sample()));await assert.rejects(measureFile(file,'gzip','0'.repeat(64)),/SHA-256/);}finally{await rm(dir,{recursive:true,force:true});}
});
