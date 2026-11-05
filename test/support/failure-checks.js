/** Focused real IndexedDB acceptance for formal terminals produced by demo:failure. */
import { createIndexedDBStorage } from '../../src/storage/indexeddb.js';
import { createStoredSession } from '../../src/storage/session.js';
import { restoreSave } from '../../src/storage/format.js';
import { failureResult } from '../../src/runtime/homeroom.js';
import { runtimeOf } from '../../src/runtime/model.js';
import { failureRequest } from './failure-scenario.js';
import { id } from './runtime.js';
const need=(v,m)=>{if(!v)throw Error(m);};
async function rejects(action,code){let error;try{await action();}catch(e){error=e;}need(error&&(!code||error.code===code),'Expected '+code+', got '+error);}
export async function failureStorage(testId,initialize=true){
 const db=createIndexedDBStorage({factory:globalThis.indexedDB,namespace:'test',testId:testId+'-formal-failure'}),started=performance.now(),measurements=[];
 try{
  const s=await createStoredSession(db,1);
  if(initialize){
   for(const [index,name] of ['cycle-1','cycle-2','cycle-3','physical'].entries()){
    const response=await fetch('./test/support/failure-'+name+'.json');need(response.ok,'Run demo:failure first');const payload=restoreSave(await response.text()),old=s.snapshot();
    await s.import(payload,{expectedToken:old.token,confirmed:!!old.payload});const loaded=await createStoredSession(db,1),failed=loaded.snapshot().payload.world;need(failureResult(failed),'Actual terminal did not survive IndexedDB');
    await rejects(()=>loaded.execute(failureRequest(failed,[{type:'advance-time',planId:runtimeOf(failed).plan.id,steps:1}],'routine')),'YEAR_FAILED');
    const opts={attemptId:id('attempt','browser-formal-'+index),seeds:{settlement:33,streams:Object.fromEntries(Object.keys(payload.opening.random).map(k=>[k,3]))},failureId:failureResult(failed).id,failedAttemptId:failed.identity.attemptId,schoolYearId:failed.position.schoolYearId,expectedRevision:runtimeOf(failed).revision};
    const before=loaded.snapshot();await rejects(()=>loaded.retry({...opts,failureId:'forged'}),'RETRY_UNAUTHORIZED');need(JSON.stringify(loaded.snapshot())===JSON.stringify(before),'Denied authorization changed memory');
    const broken=createIndexedDBStorage({factory:globalThis.indexedDB,namespace:'test',testId:testId+'-formal-failure',faults:{beforeCommit({transaction}){transaction.abort();}}});try{const faulty=await createStoredSession(broken,1);await rejects(()=>faulty.retry(opts));need(JSON.stringify(await db.read(1))===JSON.stringify(before),'Aborted retry changed disk');}finally{await broken.close();}
    const stale=await createStoredSession(db,1),at=performance.now();await loaded.retry(opts);const retryMs=performance.now()-at;need((await loaded.retry(opts)).duplicate,'Legal retry replay was not idempotent');await rejects(()=>stale.retry(opts),'STALE');
    const after=loaded.snapshot();need(!failureResult(after.payload.world),'Failed world polluted new attempt');need(JSON.stringify(after.payload.opening)===JSON.stringify(payload.opening),'Original opening replaced');need(JSON.stringify(after.payload.world.numeric.evolution)===JSON.stringify(payload.opening.numeric.evolution),'Numeric isolation failed');need(runtimeOf(after.payload.world).facts.length===0,'Abandoned facts leaked');
    const exportAt=performance.now(),encoded=await loaded.export(),exportMs=performance.now()-exportAt;const other=await createStoredSession(db,2),destination=other.snapshot();await other.import(encoded,{expectedToken:destination.token,confirmed:!!destination.payload});need(JSON.stringify(other.snapshot().payload)===JSON.stringify(after.payload),'Three-slot import changed retry');need((await db.read(3)).payload===null,'Other slot polluted');
    await loaded.execute(failureRequest(after.payload.world,[{type:'academic',action:'open',termId:'2026:autumn'}],'routine'));await rejects(()=>loaded.retry({...opts,attemptId:id('attempt','unfailed-'+index)}),'RETRY_UNAUTHORIZED');
    const fresh=await createStoredSession(db,1);measurements.push({name,failedBytes:new TextEncoder().encode(JSON.stringify(payload)).byteLength,retriedBytes:new TextEncoder().encode(encoded).byteLength,retryMs,exportMs,heapUsed:performance.memory?.usedJSHeapSize??null});
    const changed=structuredClone(payload);runtimeOf(changed.world).history.find(h=>h.type==='annual-failure').data.sourceHistoryIds=[];await rejects(()=>fresh.import(changed,{expectedToken:fresh.snapshot().token,confirmed:true}));await s.recover();
   }
  }
  const saved=await s.export(),payload=restoreSave(saved);need(!failureResult(payload.world)&&payload.world.extensions['teacher-hell/attempt-lineage'].attemptIds.length>=2,'Navigation lost retry state');
  return {formalRoutes:['executed unfair replacement','ordinary pressure → N7 crisis → inability and natural resignation'],measurements,navigationRestored:!initialize,bytes:new TextEncoder().encode(saved).byteLength,attemptId:payload.world.identity.attemptId,elapsedMs:performance.now()-started};
 }finally{await db.close();}
}
