/** Actual fourth-year artifact, fresh IndexedDB namespace; no player save access. */
import {createIndexedDBStorage} from '../../src/storage/indexeddb.js';
import {createStoredSession} from '../../src/storage/session.js';
import {failureResult} from '../../src/runtime/homeroom.js';
import {runtimeOf} from '../../src/runtime/model.js';
import {canonicalData} from '../../src/changes/settlement.js';
import {id} from './runtime.js';
const need=(v,m)=>{if(!v)throw Error(m);};
// Let native IndexedDB callbacks release their serialization buffers before a
// second complete inspection/export copy. This is a test driver, not a save cut.
const settled=async()=>{await new Promise(resolve=>setTimeout(resolve,0));globalThis.gc?.();};
export async function careerStorage(testId,initialize=true){
 const db=createIndexedDBStorage({factory:globalThis.indexedDB,namespace:'test',testId:testId+'-career'}),started=performance.now();
 try{
  const s=await createStoredSession(db,1);await settled();let retryMs=null,importMs=null;
  if(initialize){
   let response=await fetch('./test/support/career-failure.json');need(response.ok,'Generate demo:career and career retry acceptance first');let source=await response.text();response=null;const at=performance.now(),importing=s.import(source,{expectedToken:null});source=null;await importing;importMs=performance.now()-at;await settled();console.log('CAREER imported',importMs);
   let failed=s.snapshot().payload;const h=failureResult(failed.world);need(h&&h.data.year===4&&failed.opening.position.serviceYear===4,'Expected a real fourth-year terminal and legal opening');
   const original=canonicalData(failed.opening.numeric.evolution),oldYears=canonicalData(runtimeOf(failed.world).history.filter(h=>h.type==='annual-success'));
   const opts={attemptId:id('attempt','browser-career-4'),seeds:{settlement:72,streams:Object.fromEntries(Object.keys(failed.world.random).map(k=>[k,33]))},failureId:h.id,failedAttemptId:failed.world.identity.attemptId,schoolYearId:failed.world.position.schoolYearId,expectedRevision:runtimeOf(failed.world).revision};
   failed=null;globalThis.gc?.();console.log('CAREER retry start');const retryAt=performance.now();await s.retry(opts);retryMs=performance.now()-retryAt;await settled();console.log('CAREER retry complete',retryMs);let current=s.snapshot().payload;
   need(!failureResult(current.world)&&canonicalData(current.world.numeric.evolution)===original,'Retry did not restore the actual fourth-year opening');need(canonicalData(runtimeOf(current.world).history.filter(h=>h.type==='annual-success'))===oldYears,'Earlier successful years changed');current=null;globalThis.gc?.();console.log('CAREER restored values checked');need((await s.retry(opts)).duplicate,'Redelivered retry was not idempotent');await settled();
  }
  let payload=s.snapshot().payload,w=payload.world,n=w.numeric.evolution.world;
  need(w.position.serviceYear===4&&w.position.date===payload.opening.position.date&&!failureResult(w),'Fourth-year opening lost on storage read');need(n.registry.cohorts.length===2&&n.classroom.studentIds.length===40,'Retry regenerated or duplicated cohorts');need(n.registry.assignments.some(a=>a.classId===n.classroom.id&&a.personId===w.identity.playerId&&a.until===null&&a.roleId===9),'New legal homeroom lost');need(runtimeOf(w).history.filter(h=>h.type==='annual-success').length===3,'Three prior successes lost');
  payload=null;w=null;n=null;globalThis.gc?.();
  console.log('CAREER export start');
  const text=await s.export(),bytes=new TextEncoder().encode(text),hash=Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',bytes)),n=>n.toString(16).padStart(2,'0')).join('');
  return {hash,bytes:bytes.byteLength,year:4,successfulYears:3,cohorts:2,students:40,importMs,retryMs,elapsedMs:performance.now()-started,heapUsed:performance.memory?.usedJSHeapSize??null};
 }finally{await db.close();}
}
