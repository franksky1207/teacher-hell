/** Real Chromium 01–04 scenario. Late-year snapshots are explicit synthetic baselines, not simulated gameplay. */
import { calendarWorld,advanceRequest,atDate } from './calendar.js';
import { request,event,fact,result,open,id } from './runtime.js';
import { createIndexedDBStorage } from '../../src/storage/indexeddb.js';
import { createStoredSession } from '../../src/storage/session.js';
import { createSave } from '../../src/storage/format.js';
import { runtimeOf } from '../../src/runtime/model.js';
import { yearData } from '../../src/calendar/calendar.js';
import { addDays } from '../../src/calendar/civil.js';
const equal=(a,b)=>JSON.stringify(a)===JSON.stringify(b),check=(ok,label)=>{if(!ok)throw Error(label);};
async function rejects(fn,code){let caught;try{await fn();}catch(e){caught=e;}check(caught&&(!code||caught.code===code||caught.name===code),`Expected ${code}, got ${caught}`);}
export async function setupPhase(testId,initialize){const db=createIndexedDBStorage({factory:globalThis.indexedDB,namespace:'test',testId:testId+'-phase1'}),s=await createStoredSession(db,1),w=calendarWorld();if(initialize)await s.initialize(w);return {db,s,w,testId:testId+'-phase1'};}
export async function scenario(t){
 const w=t.s.snapshot().payload.world,e=event(w,'phase1'),q=advanceRequest(w,'phase1-result');q.operations.unshift(open(e),fact(e),result(e,e.participantIds[1]),{type:'sample',stream:'events',id:'managed-draw',weights:[1,2,3]});
 const response=await t.s.execute(q),snapshot=t.s.snapshot();check(response.committed,'not durably committed');check(snapshot.payload.world.position.slotId==='p1','time did not advance');check(runtimeOf(snapshot.payload.world).effects.length===1,'N6 result absent');
 const reopened=await createStoredSession(t.db,1);check(equal(reopened.snapshot(),snapshot),'reload changed world/time/history/PRNG/timetable');check((await reopened.execute(q)).duplicate,'resend repeated settlement');check(equal(await t.db.read(1),snapshot),'resend changed disk');
 const fail=request(snapshot.payload.world,'invalid-time',[{type:'sample',stream:'events',id:'discard',weights:[1,2]},{type:'advance-time',planId:runtimeOf(w).plan.id,steps:5}]);await rejects(()=>reopened.execute(fail),'TIME_BARRIER');check(equal(await t.db.read(1),snapshot),'failed transaction changed disk');
 const bad=JSON.parse(await reopened.export());runtimeOf(bad.world).plan.calendarVersion='future';await rejects(()=>reopened.import(bad,{expectedToken:snapshot.token,confirmed:true}),'CALENDAR_VERSION');check(equal(await t.db.read(1),snapshot),'unknown calendar import changed slot');
 t.q=q;t.snapshot=snapshot;return {revision:runtimeOf(snapshot.payload.world).revision,numericReceipts:snapshot.payload.world.numeric.receipts.length,calendarVersion:runtimeOf(w).plan.calendarVersion,bytes:new TextEncoder().encode(await reopened.export()).byteLength};
}
export async function stalePhase(t){const q=advanceRequest(t.w,'phase1-stale-peer');await rejects(()=>t.s.execute(q),'STALE');return true;}
export async function annualPhase(t){
 const y=yearData(2027),prior=atDate(addDays(y.autumnStart,-1)),s=await createStoredSession(t.db,2);await s.import(JSON.stringify(createSave(prior,t.w)),{expectedToken:null});
 const q=advanceRequest(prior,'phase1-next-opening');await rejects(()=>s.execute(q),'SNAPSHOT');const before=s.snapshot();await s.execute(q,{captureOpening:true});const opened=s.snapshot();check(opened.payload.world.position.serviceYear===2,'service year did not advance');check(equal(opened.payload.world,opened.payload.opening),'opening not atomic');
 const failure=request(opened.payload.world,'phase1-failed-year',[{type:'sample',stream:'events',id:'failure-draw',weights:[1,2]}]);await s.execute(failure);const options={attemptId:id('attempt','phase1-retry'),seeds:{settlement:101,streams:{events:102,schedule:103}}};await s.retry(options);
 const retried=s.snapshot();check(!runtimeOf(retried.payload.world).commits.some(c=>c.id===failure.id),'failed attempt history leaked');check(equal(retried.payload.opening,opened.payload.opening),'opening changed');check(equal(runtimeOf(retried.payload.world).plan.tables,runtimeOf(opened.payload.world).plan.tables),'retry redrew timetable');check((await s.retry(options)).duplicate,'retry repeated');
 const read=await createStoredSession(t.db,2);check(equal(read.snapshot(),retried),'retry disk restore differs');check(equal((await t.db.read(1)),t.snapshot),'slot2 annual work changed slot1');
 return {openingDate:opened.payload.world.position.date,serviceYear:opened.payload.world.position.serviceYear,historyIsolated:true};
}
