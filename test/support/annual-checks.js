/** Real first-year artifact produced by demo:annual; never fabricated annual rows. */
import { createIndexedDBStorage } from '../../src/storage/indexeddb.js';
import { createStoredSession } from '../../src/storage/session.js';
import { restoreSave } from '../../src/storage/format.js';
import { runtimeOf } from '../../src/runtime/model.js';
import { prepareWorldOperation } from '../../src/runtime/transactions.js';
import { readAnnualHistory } from '../../src/runtime/views.js';
import { deriveWorldPanel } from '../../src/social/reputation.js';
import { request } from './runtime.js';
const check=(ok,message)=>{if(!ok)throw Error(message);};
async function rejects(action,code){let error;try{await action();}catch(e){error=e;}check(error&&(!code||error.code===code),`Expected ${code??'rejection'}, got ${error}`);}
export async function annualStorage(testId,initialize=true){
 const started=performance.now();let importMs=null;
 const db=createIndexedDBStorage({factory:globalThis.indexedDB,namespace:'test',testId:testId+'-annual'});
 try{
  const s=await createStoredSession(db,1);
  if(initialize){
   const response=await fetch('./test/support/annual-completed.json');check(response.ok,'Generate demo:annual before browser acceptance');
   const payload=restoreSave(await response.text()),report=runtimeOf(payload.world).history.find(h=>h.type==='annual-success');check(report&&payload.opening,'Missing real completed year/opening');
   const first=deriveWorldPanel(payload.opening.numeric.evolution.world),last=deriveWorldPanel(payload.world.numeric.evolution.world);
   check(Object.entries(report.data.comparison).length===12&&Object.entries(report.data.comparison).every(([key,row])=>row.start===first[key]&&row.end===last[key]&&row.delta===last[key]-first[key]),'Twelve annual values differ from actual panels');
   const visible=readAnnualHistory(payload.world)[0];check(!('endRelations' in visible)&&!('records' in visible)&&!('end' in visible),'Annual view exposed raw NPC/academic snapshots');
   const later=prepareWorldOperation(payload.world,{...request(payload.world,'post-annual-day',[{type:'advance-time',planId:runtimeOf(payload.world).plan.id,steps:1}]),calendarContext:{kind:'routine'}}).world;
   const restoredLater=restoreSave({...payload,world:later});check(JSON.stringify(runtimeOf(restoredLater.world).history.find(h=>h.type==='annual-success'))===JSON.stringify(report),'Legal post-annual day changed the sealed annual result');
   await s.initialize(payload.opening);const old=s.snapshot(),stale=await createStoredSession(db,1);
   const corrupted=structuredClone(payload);runtimeOf(corrupted.world).history.find(h=>h.type==='annual-success').data.evidence.rating.score++;
   await rejects(()=>s.import(corrupted,{expectedToken:old.token,confirmed:true}));check(JSON.stringify(s.snapshot())===JSON.stringify(old),'Corrupted annual import changed source');
   const faulty=createIndexedDBStorage({factory:globalThis.indexedDB,namespace:'test',testId:testId+'-annual',faults:{beforeCommit({transaction}){transaction.abort();}}});
   try{const failed=await createStoredSession(faulty,1);await rejects(()=>failed.import(payload,{expectedToken:old.token,confirmed:true}));}finally{await faulty.close();}
   check(JSON.stringify(await db.read(1))===JSON.stringify(old),'Aborted annual import changed disk');
   const at=performance.now();await s.import(payload,{expectedToken:old.token,confirmed:true});importMs=performance.now()-at;
   await rejects(()=>stale.execute(request(payload.opening,'stale-annual',[{type:'sample',stream:'events',id:'stale',weights:[1]}])),'STALE');
   const original=s.snapshot(),annualRequest=JSON.parse(runtimeOf(payload.world).commits.at(-1).request);
   check((await s.execute(annualRequest)).duplicate,'Repeated annual settlement did not deduplicate');check(JSON.stringify(s.snapshot())===JSON.stringify(original),'Repeated annual settlement changed the year');
   await rejects(()=>s.execute({...request(payload.world,'settle-again',[{type:'settle-school-year'}]),calendarContext:{kind:'routine'}}));
   for(const slot of [2,3]){const other=await createStoredSession(db,slot);await other.initialize(payload.opening);check(runtimeOf(other.snapshot().payload.world).history.every(h=>h.type!=='annual-success'),'Annual history leaked across slots');}
  }
  const at=performance.now(),saved=await s.export(),exportMs=performance.now()-at,restoreAt=performance.now(),payload=restoreSave(saved),restoreMs=performance.now()-restoreAt,annual=runtimeOf(payload.world).history.find(h=>h.type==='annual-success'),bytes=new TextEncoder().encode(saved);
  check(annual&&annual.data.evidence.rating.status==='rated','Annual result did not survive storage');
  const hash=Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',bytes)),n=>n.toString(16).padStart(2,'0')).join('');
  return {hash,bytes:bytes.byteLength,year:annual.data.year,score:annual.data.evidence.rating.score,grade:annual.data.evidence.rating.grade,comparisonCount:Object.keys(annual.data.comparison).length,importMs,exportMs,restoreMs,elapsedMs:performance.now()-started,heapUsed:performance.memory?.usedJSHeapSize??null};
 }finally{await db.close();}
}
