/** Real-browser synthetic verification only; copied to a temporary site by the runner. */
import { runtimeScenario,request,event,fact,open,id,result } from './runtime.js';
import { createIndexedDBStorage } from '../../src/storage/indexeddb.js';
import { createStoredSession,reviewRecoveryImport,importRecoveryBackup } from '../../src/storage/session.js';
import { createSave,restoreSave } from '../../src/storage/format.js';
import { runtimeOf,ATTEMPT_LINEAGE_KEY } from '../../src/runtime/model.js';
import { prepareWorldOperation } from '../../src/runtime/transactions.js';
const equal=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
const check=(value,label)=>{if(!value)throw Error(label);};
async function rejects(fn,code){let error;try{await fn();}catch(e){error=e;}check(error&&(!code||error.code===code||error.name===code),`Expected rejection ${code}; got ${error}`);}
export async function setup(testId,initialize=false){
 const db=createIndexedDBStorage({factory:globalThis.indexedDB,namespace:'test',testId}),w=runtimeScenario(71);
 if(initialize)for(const slot of [1,2,3]){const s=await createStoredSession(db,slot);await s.initialize(w);}
 const session=await createStoredSession(db,1);
 const q=tag=>request(w,tag,[{type:'sample',stream:'events',id:'draw',weights:[1,2,3]}]);
 return {db,w,session,q,testId};
}
export async function basics(t){
 for(const slot of [1,2,3])check(equal((await t.db.read(slot)).payload.world,t.w),'independent initialized slot');
 await rejects(()=>t.db.read(4),'SLOT');await rejects(()=>t.db.read(0),'SLOT');
 await rejects(()=>createIndexedDBStorage({factory:globalThis.indexedDB,namespace:'test'}),'NAMESPACE');
 await rejects(()=>createIndexedDBStorage({factory:globalThis.indexedDB}),'NAMESPACE');
 const dev=createIndexedDBStorage({factory:globalThis.indexedDB,namespace:'test',testId:t.testId+'-isolated'});check((await dev.read(1)).payload===null,'namespace isolation');await dev.close();return 'three slots / namespace / invalid slot';
}
export async function compete(t,tag){try{return {ok:true,...await t.session.execute(t.q(tag))};}catch(e){return {ok:false,code:e.code};}}
export async function replay(t,tag){
 const disk=await t.db.read(1),before=JSON.stringify(disk);const out=await t.session.execute(t.q(tag));check(out.duplicate,'lost response dedup');check(before===JSON.stringify(await t.db.read(1)),'replay wrote disk');
 const reloaded=await createStoredSession(t.db,1);check(equal(reloaded.snapshot(),disk),'reopen exact state');check(runtimeOf(disk.payload.world).revision===1,'one winner');return 'lost response / reopen / RNG exact';
}
export async function faults(t){
 const before=await t.db.read(1);
 for(const mode of ['abort','quota']){
  const driver=createIndexedDBStorage({factory:globalThis.indexedDB,namespace:'test',testId:t.testId,faults:{beforeCommit({transaction}){if(mode==='abort')transaction.abort();else throw new DOMException('injected quota','QuotaExceededError');}}});
  const s=await createStoredSession(driver,1),q=request(before.payload.world,'fault-'+mode,[{type:'sample',stream:'events',id:'fault-draw',weights:[1,2]}]);
  await rejects(()=>s.execute(q),mode==='quota'?'QuotaExceededError':undefined);check(equal(s.snapshot(),before),'failed memory changed');check(equal(await t.db.read(1),before),'aborted disk changed');
  const exported=await s.export();await rejects(()=>s.import(exported,{expectedToken:before.token,confirmed:true}));check(equal(await t.db.read(1),before),'failed import damaged target');await driver.close();
 }
 const faulty=await createStoredSession(t.db,1,{afterPersist(){throw Error('memory synchronization');}}),q=request(before.payload.world,'memory-fault',[{type:'sample',stream:'events',id:'persisted',weights:[1,2]}]);
 const out=await faulty.execute(q);check(out.committed&&out.recoveryRequired,'disk success incorrectly reported');await rejects(()=>faulty.execute(q),'RECOVERY_REQUIRED');await faulty.recover();check((await faulty.execute(q)).duplicate,'memory failure retry duplicated');
 const committed=await t.db.read(1);check(runtimeOf(committed.payload.world).revision===2,'sync failure not durable');
 // Ambiguous response recovery uses the persisted ID, even after an actual page reload by runner.
 t.memoryRequest=q;return 'transaction abort / injected quota / failed import / disk-success-memory-failure';
}
export async function importsAndRetry(t){
 const s=await createStoredSession(t.db,1),before=s.snapshot(),text=await s.export();
 await rejects(()=>s.import(text,{expectedToken:before.token}),'CONFIRM');
 for(const mutate of [p=>p.version=9,p=>p.world.versions.save=9,p=>p.world.extensions['teacher-hell/world'].version=9,p=>p.world.numeric.version=9,p=>p.world.events.push({})]){const p=JSON.parse(text);mutate(p);await rejects(()=>s.import(JSON.stringify(p),{expectedToken:before.token,confirmed:true}));}
 check(equal(await t.db.read(1),before),'invalid import modified slot');
 const review=await s.reviewImport(text);check(equal(review.replacing.identity,t.w.identity),'overwrite summary');
 const b=await createStoredSession(t.db,2),bt=b.snapshot().token;await b.import(text,{expectedToken:bt,confirmed:true});
 await b.retry({attemptId:id('attempt','browser-retry'),seeds:{settlement:92,streams:{events:93}}});
 const retryOptions={attemptId:id('attempt','browser-retry'),seeds:{settlement:92,streams:{events:93}}};
 const retryDisk=await t.db.read(2);check((await b.retry(retryOptions)).duplicate,'retry repeated');await rejects(()=>b.retry({...retryOptions,seeds:{settlement:94,streams:{events:93}}}),'CONFLICT');check(equal(await t.db.read(2),retryDisk),'retry changed on duplicate');
 const retried=(await t.db.read(2)).payload;check(runtimeOf(retried.world).commits.length===1&&runtimeOf(retried.world).history.length===1,'failed history leaked');check(equal(retried.opening,t.w),'opening changed');check(equal(await t.db.read(1),before),'cross slot changed');
 const old=before.token;await s.delete({expectedToken:old,confirmed:true});await s.initialize(t.w);await rejects(()=>t.db.write(1,createSave(t.w,t.w),old),'STALE');
 await rejects(()=>s.import(text,{expectedToken:review.token,confirmed:true}),'STALE');return 'versions / overwrite review / retry snapshot / deletion ABA';
}
/** Retry identity safety only. Supplied moments, no annual failure/completion claim. */
export async function retryLineageStorage(testId,initialize=true){
 const db=createIndexedDBStorage({factory:globalThis.indexedDB,namespace:'test',testId:testId+'-retry-lineage'});
 try{
  const s=await createStoredSession(db,1),w=runtimeScenario(71);
  const measurements=[],bytes=value=>new TextEncoder().encode(JSON.stringify(value)).byteLength;
  const measure=async label=>{const at=performance.now(),text=await s.export(),exportMs=performance.now()-at,restoreAt=performance.now(),payload=restoreSave(text);measurements.push({label,saveBytes:new TextEncoder().encode(text).byteLength,openingBytes:bytes(payload.opening),lineageBytes:bytes(payload.world.extensions[ATTEMPT_LINEAGE_KEY]??null),exportMs,restoreMs:performance.now()-restoreAt,heapUsed:performance.memory?.usedJSHeapSize??null});};
  const options=tag=>({attemptId:id('attempt','lineage-'+tag),seeds:{settlement:92,streams:{events:93}}});
  if(initialize){
   await s.initialize(w);await measure('engineering-before-retry');await s.retry(options('first'));await measure('engineering-first-retry');
   const first=s.snapshot().payload.world,old=request(first,'abandoned-lineage-draw',[{type:'sample',stream:'events',id:'discarded',weights:[1,2,3]}]);
   await s.execute(old);await s.retry(options('second'));await measure('engineering-second-retry');
   const before=s.snapshot();await rejects(()=>s.execute(old),'ATTEMPT');
   await rejects(()=>s.retry(options('first')),'ATTEMPT');check(equal(s.snapshot(),before),'retired attempt modified memory');
   const abortDriver=createIndexedDBStorage({factory:globalThis.indexedDB,namespace:'test',testId:testId+'-retry-lineage',faults:{beforeCommit({transaction}){transaction.abort();}}});
   try{const failing=await createStoredSession(abortDriver,1);await rejects(()=>failing.retry(options('third')));check(equal(await db.read(1),before),'failed retry consumed an ID or modified disk');}finally{await abortDriver.close();}
   const imported=await createStoredSession(db,2);await imported.import(await s.export(),{expectedToken:null});
   await rejects(()=>imported.retry(options('first')),'ATTEMPT');check(equal(imported.snapshot().payload,s.snapshot().payload),'import changed retry state');
  }else{
   const before=s.snapshot();await rejects(()=>s.retry(options('first')),'ATTEMPT');
   check(equal(s.snapshot(),before),'navigation lost retired identity protection');
   const stale=await createStoredSession(db,1);await s.retry(options('third'));await measure('engineering-third-retry');
   const after=s.snapshot();await rejects(()=>stale.retry(options('fourth')),'STALE');
   check(equal(await db.read(1),after),'stale retry overwrote new attempt');
   check(equal(after.payload.opening,w),'retry regenerated or modified opening');
   check(runtimeOf(after.payload.world).history.length===1&&runtimeOf(after.payload.world).facts.length===0,'discarded attempt history leaked');
   check((await s.retry(options('third'))).duplicate,'retry re-delivery wrote a new attempt');
  }
  const text=await s.export();return {provenance:'synthetic retry safety only; no annual failure or success',saveBytes:new TextEncoder().encode(text).byteLength,measurements,signature:JSON.stringify(s.snapshot())};
 }finally{await db.close();}
}
export async function decision(t){
 const s=await createStoredSession(t.db,1),w=s.snapshot().payload.world,e=event(w,'choice',{nodeId:'choose',options:[{id:'a',emotional:true},{id:'b',emotional:false},{id:'c',emotional:false}],confirmedOptionId:null});
 const q=request(w,'open-choice',[open(e),fact(e)]);await s.execute(q);const pending=s.snapshot(),reopen=await createStoredSession(t.db,1);check(equal(reopen.snapshot(),pending),'pending choice rerolled');
 const w2=pending.payload.world,q2=request(w2,'confirm',[{type:'confirm-choice',eventId:e.id,stageId:e.stageId,optionId:'a',optionText:'synthetic emotional response'},result(e,e.participantIds[1]),{type:'sample',id:'decision-draw',stream:'events',weights:[1,2]}]);
 const abortDriver=createIndexedDBStorage({factory:globalThis.indexedDB,namespace:'test',testId:t.testId,faults:{beforeCommit({transaction}){transaction.abort();}}});
 const aborted=await createStoredSession(abortDriver,1);await rejects(()=>aborted.execute(q2));check(equal(aborted.snapshot(),pending)&&equal(await t.db.read(1),pending),'N6/choice/random partially committed on abort');await abortDriver.close();
 await reopen.execute(q2);const settled=await t.db.read(1);check((await reopen.execute(q2)).duplicate,'decision repeated');check(equal(await t.db.read(1),settled),'result reapplied');check(settled.payload.world.numeric.receipts.length===1,'numeric settlement count');
 const fresh=await createStoredSession(t.db,1);await rejects(()=>fresh.execute(request(settled.payload.world,'rechoose',[{type:'confirm-choice',eventId:e.id,stageId:e.stageId,optionId:'b',optionText:'other'}])),'CHOICE');
 const disk=await t.db.read(1);check(equal(disk,settled),'rejected choice changed world');return 'pending event / locked choice / N6 unique consequence / full restore';
}
export async function capacity(t){
 // 30 labeled annual buckets, 20 meaningful facts each, long story text. NOT 30-year gameplay/calendar.
 let w=runtimeScenario(81);const ops=[];
 for(let year=1;year<=30;year++){
  const e=event(w,'capacity-'+year);ops.push(open(e));
  for(let n=0;n<20;n++)ops.push(fact(e,`capacity-${year}-${n}`,{description:'合成容量歷史，完整保留原文。'.repeat(180),data:{syntheticYear:year,entry:n},witnessIds:[]}));
 }
 const begin=performance.now();w=prepareWorldOperation(w,request(w,'capacity',ops)).world;const generateMs=performance.now()-begin;
 const s=await createStoredSession(t.db,3),token=s.snapshot().token;let at=performance.now();await s.import(JSON.stringify(createSave(w,w)),{expectedToken:token,confirmed:true});const writeMs=performance.now()-at;
 at=performance.now();const text=await s.export(),exportMs=performance.now()-at,bytes=new TextEncoder().encode(text).byteLength;
 const target=await createStoredSession(t.db,2);at=performance.now();await target.import(text,{expectedToken:target.snapshot().token,confirmed:true});const importMs=performance.now()-at;
 at=performance.now();const loaded=await t.db.read(2),readMs=performance.now()-at;check(equal(loaded.payload,restoreSave(text)),'large roundtrip differs');check(runtimeOf(loaded.payload.world).facts.length===600&&runtimeOf(loaded.payload.opening).facts.length===600,'history/opening truncated');
 const abortDriver=createIndexedDBStorage({factory:globalThis.indexedDB,namespace:'test',testId:t.testId,faults:{beforeCommit({transaction}){transaction.abort();}}});
 const failing=await createStoredSession(abortDriver,2);await rejects(()=>failing.import(text,{expectedToken:loaded.token,confirmed:true}));const preserved=await t.db.read(2);check(equal(preserved,loaded),'aborted large import partially changed pages');await abortDriver.close();
 const head=await new Promise((resolve,reject)=>{const r=globalThis.indexedDB.open(`teacher-hell:test:${t.testId}:v1:slot2`,1);r.onerror=()=>reject(r.error);r.onsuccess=()=>{const db=r.result,tx=db.transaction('state'),get=tx.objectStore('state').get('save');tx.oncomplete=()=>{db.close();resolve(get.result);};};});check(head.chunkCount>1,'large payload was not segmented');
 return {syntheticOnly:true,chunks:head.chunkCount,annualBuckets:30,events:30,facts:600,bytes,generateMs:Math.round(generateMs),writeMs:Math.round(writeMs),exportMs:Math.round(exportMs),importMs:Math.round(importMs),readMs:Math.round(readMs),heap:performance.memory?.usedJSHeapSize??null,note:'Desktop Chromium; heap includes copies/GC; not device capacity or gameplay balance'};
}
export async function holdSlot(t){
 let signal;const started=new Promise(r=>signal=r);t.release=false;
 t.holdDriver=createIndexedDBStorage({factory:globalThis.indexedDB,namespace:'test',testId:t.testId,faults:{beforeCommit({transaction}){
  const store=transaction.objectStore('state');function keep(){const r=store.get('generation');r.onsuccess=()=>{if(!t.release)keep();};}keep();signal();
 }}});
 const disk=await t.db.read(1);t.held=t.holdDriver.write(1,disk.payload,disk.token);await started;return true;
}
export async function releaseSlot(t){t.release=true;await t.held;await t.holdDriver.close();return true;}

export async function namespaceAndCorruption(t){
 const names=[],factory={open(name,version){names.push(name);return globalThis.indexedDB.open(`teacher-hell:test:${t.testId}:namespace-probe:${name}`,version);}};
 const player=createIndexedDBStorage({factory,namespace:'player'}),dev=createIndexedDBStorage({factory,namespace:'development'});
 const a=await createStoredSession(player,1),b=await createStoredSession(dev,1);await a.initialize(t.w);check(b.snapshot().payload===null,'development accessed player slot');await b.initialize(t.w);check(names[0]!==names[1]&&names[0].includes(':player:')&&names[1].includes(':development:'),'namespace DB names collide');await player.close();await dev.close();
 const testId=t.testId+'-corruption',db=createIndexedDBStorage({factory:globalThis.indexedDB,namespace:'test',testId}),s=await createStoredSession(db,1);await s.initialize(t.w);const original=s.snapshot();
 const raw=await new Promise((resolve,reject)=>{const r=globalThis.indexedDB.open(`teacher-hell:test:${testId}:v1:slot1`,1);r.onerror=()=>reject(r.error);r.onsuccess=()=>resolve(r.result);});
 await new Promise((resolve,reject)=>{const tx=raw.transaction('pages','readwrite');tx.objectStore('pages').delete(0);tx.oncomplete=resolve;tx.onabort=()=>reject(tx.error);});
 await rejects(()=>s.recover(),'CORRUPT');await rejects(()=>createStoredSession(db,1),'CORRUPT');
 const header=await new Promise(resolve=>{const tx=raw.transaction('state'),r=tx.objectStore('state').get('save');tx.oncomplete=()=>resolve(r.result);});check(equal(header.token,original.token),'corrupt read deleted original metadata');raw.close();
 const text=JSON.stringify(original.payload),review=await reviewRecoveryImport(db,1,text);check(equal(review.replacing,original.token),'recovery review lost identity');
 await rejects(()=>importRecoveryBackup(db,1,text,{expectedToken:review.token}),'CONFIRM');
 await rejects(()=>importRecoveryBackup(db,1,'{}',{expectedToken:review.token,confirmed:true}));
 await importRecoveryBackup(db,1,text,{expectedToken:review.token,confirmed:true});check(equal((await db.read(1)).payload,original.payload),'backup recovery differs');
 await rejects(()=>importRecoveryBackup(db,1,text,{expectedToken:review.token,confirmed:true}),'STALE');
 // Install precisely the old text-page layout, then prove read-only loading,
 // failed lazy upgrade rollback, and successful CAS upgrade preserve every byte.
 const legacyRaw=await new Promise(resolve=>{const req=globalThis.indexedDB.open(`teacher-hell:test:${testId}:v1:slot1`,1);req.onsuccess=()=>resolve(req.result);});
 const saved=await db.read(1),legacyText=JSON.stringify(saved.payload),legacyPages=[];
 for(let i=0;i<legacyText.length;i+=262144)legacyPages.push(legacyText.slice(i,i+262144));
 await new Promise((resolve,reject)=>{const tx=legacyRaw.transaction(['state','pages'],'readwrite');tx.objectStore('pages').clear();legacyPages.forEach((p,i)=>tx.objectStore('pages').put(p,i));tx.objectStore('state').put({token:saved.token,chunkCount:legacyPages.length},'save');tx.oncomplete=resolve;tx.onabort=()=>reject(tx.error);});
 check(equal(await db.read(1),saved),'legacy IDB read differs');
 const aborted=createIndexedDBStorage({factory:globalThis.indexedDB,namespace:'test',testId,faults:{beforeCommit({transaction}){transaction.abort();}}});
 await rejects(()=>aborted.write(1,saved.payload,saved.token));check(equal(await db.read(1),saved),'failed upgrade changed legacy data');await aborted.close();
 const upgraded=await db.write(1,saved.payload,saved.token);check(equal(upgraded.payload,saved.payload),'upgrade lost data');
 check(equal(await db.read(1),upgraded),'upgraded reload differs');legacyRaw.close();
 await db.close();
 const future=await new Promise((resolve,reject)=>{const r=globalThis.indexedDB.open(`teacher-hell:test:${testId}:v1:slot1`,2);r.onerror=()=>reject(r.error);r.onsuccess=()=>resolve(r.result);});future.close();
 const older=createIndexedDBStorage({factory:globalThis.indexedDB,namespace:'test',testId});await rejects(()=>older.read(1),'VersionError');await older.close();
 return 'player/development namespaces (test DBs only); corrupt pages / confirmed backup recovery / future DB version rejection';
}

/** S2: actual retained T4 checkpoint, full JSON hash, real IDB; no generated substitute. */
export async function s2Storage(testId,initialize,expected){
 const {careerResult}=await import('../../src/runtime/career.js');
 const hash=async text=>Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(text))),x=>x.toString(16).padStart(2,'0')).join('');
 const db=createIndexedDBStorage({factory:globalThis.indexedDB,namespace:'test',testId}),metrics={stages:{},heap:[]};
 let maxDelay=0,last=performance.now();const timer=setInterval(()=>{const now=performance.now();maxDelay=Math.max(maxDelay,now-last-20);last=now;},20);
 const timed=async(name,fn)=>{const at=performance.now(),out=await fn();metrics.stages[name]=performance.now()-at;metrics.heap.push({stage:name,used:performance.memory?.usedJSHeapSize??null});return out;};
 try{
  if(initialize){
   let text=await (await fetch('./test/support/s2-completed.json')).text();check(await hash(text)===expected,'Original source hash differs');
   let payload=JSON.parse(text);text=null;globalThis.gc?.();
   let stored=await timed('write',()=>db.write(1,payload,null));payload=null;stored=null;globalThis.gc?.();
  }
  let stored=await timed('read',()=>db.read(1));
  check(await timed('fullStateHash',()=>hash(JSON.stringify(stored.payload)))===expected,'Complete world/opening state differs');
  const r=runtimeOf(stored.payload.world);check(r.history.filter(h=>h.type==='annual-success').length===3,'Lost annual settlements');
  check(careerResult(stored.payload.world).data.years===3,'Lost completion');
  const prior=JSON.parse(r.commits.at(-1).request);
  check(prepareWorldOperation(stored.payload.world,prior).duplicate,'Terminal replay was not deduplicated');
  await rejects(()=>prepareWorldOperation(stored.payload.world,{...prior,id:id('operation','s2-after-complete'),expectedRevision:r.revision}),'CAREER_COMPLETE');
  if(initialize&&testId.endsWith('-faults')){
   metrics.realSourceFaults=[];
   for(const mode of ['abort','quota','stale']){
    const driver=createIndexedDBStorage({factory:globalThis.indexedDB,namespace:'test',testId,faults:{beforeCommit({transaction}){if(mode==='abort')transaction.abort();if(mode==='quota')throw new DOMException('injected quota','QuotaExceededError');}}});
    await timed('failedWrite-'+mode,()=>rejects(()=>driver.write(1,stored.payload,mode==='stale'?null:stored.token),mode==='stale'?'STALE':mode==='quota'?'QuotaExceededError':undefined));
    // Full-payload reload verifies no prepared pages escaped the aborted CAS.
    let preserved=await db.read(1);check(equal(preserved.token,stored.token),'Failed write changed token');
    check(await hash(JSON.stringify(preserved.payload))===expected,'Failed write changed source');preserved=null;await driver.close();globalThis.gc?.();metrics.realSourceFaults.push(mode);
   }
  }
  metrics.revision=stored.token.revision;stored=null;globalThis.gc?.();
  const raw=await new Promise((resolve,reject)=>{const req=globalThis.indexedDB.open(`teacher-hell:test:${testId}:v1:slot1`,1);req.onsuccess=()=>resolve(req.result);req.onerror=()=>reject(req.error);});
  const physical=await new Promise((resolve,reject)=>{const tx=raw.transaction(['state','pages']),h=tx.objectStore('state').get('save'),p=tx.objectStore('pages').getAll();tx.oncomplete=()=>resolve({head:h.result,pages:p.result});tx.onabort=()=>reject(tx.error);});raw.close();
  metrics.metadata=physical.head;metrics.pageBytes=physical.pages.reduce((n,p)=>n+(typeof p==='string'?new TextEncoder().encode(p).length:p.byteLength),0);
  metrics.metadataBytes=new TextEncoder().encode(JSON.stringify(physical.head)).length;
  // Let the heartbeat report the final synchronous verification pause too.
  await new Promise(r=>setTimeout(r,30));metrics.maxMainThreadDelayMs=maxDelay;
  return metrics;
 }finally{clearInterval(timer);await db.close();}
}
