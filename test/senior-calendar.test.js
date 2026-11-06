import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {gunzipSync} from 'node:zlib';
import {CALENDAR,CALENDAR_VERSION,SENIOR_CALENDAR_VERSION as V,seniorCalendar,calendarDay,examSchedule,assessmentCalendar,semester,yearData,positionFor,positionAt,cursorFor,nextPosition,THREE_YEAR,gradeAt} from '../src/calendar/calendar.js';
import {addDays,weekday,datesBetween} from '../src/calendar/civil.js';
import {compileSeniorCalendar} from '../src/calendar/senior-rules.js';
import {calendarPlanId,formalSlot,calendarMilestones} from '../src/runtime/schedule.js';
import {atDate,experiencedOpening} from './support/calendar.js';
import {eventWorld,draw,definition} from './support/event-fixtures.js';
import {request} from './support/runtime.js';
import {runtimeOf,restoreWorldState,WorldError} from '../src/runtime/model.js';
import {prepareWorldOperation} from '../src/runtime/transactions.js';
import {academicState} from '../src/runtime/academics.js';
import {applySchoolOperation} from '../src/world/registry.js';
import {startEvolution} from '../src/evolution/time.js';
import {startSettlement} from '../src/changes/settlement.js';
import {createSave,restoreSave,encodeSave,sameToken,saveToken} from '../src/storage/format.js';
import {createStoredSession} from '../src/storage/session.js';
const day=(date,grade=3)=>calendarDay(date,grade,V);
const nodes=seniorCalendar.nodes.filter(n=>n.academicYear===2028);
/** Explicit isolated late-date baselines; no claim of natural three-year gameplay. */
function baseline(date,slot=null,school=false){
 const target=slot??day(date).slots[0].id,w=eventWorld(74,date,target,{version:1,mode:THREE_YEAR,difficulty:'hard'});
 if(school){const n=w.numeric.evolution.world;for(const academicYear of [2027,2028])applySchoolOperation(n,{type:'school-year',academicYear},yearData(academicYear).summerCamp);w.numeric=startSettlement(startEvolution(n,{seed:44,date,schoolYearId:w.position.schoolYearId,openingId:w.position.openingId}),{seed:45,attemptId:w.identity.attemptId});}
 return restoreWorldState(w);
}
function run(w,ops,tag='h1',kind='routine'){return prepareWorldOperation(w,{...request(w,tag+'-'+runtimeOf(w).revision,ops),calendarContext:{kind}}).world;}
function step(w,activity=null){const ops=activity?[{type:'school-action',activity}]:[{type:'finish-slot',completedActivityIds:formalSlot(w).slot.activityIds},{type:'advance-time',planId:runtimeOf(w).plan.id,steps:1}];return run(w,ops);}

test('H1-A: autumn/spring nights, Saturday seven-period grouping, holidays and other grades',()=>{
 for(const [start,nights] of [['2028-09-11',[1,2,4,5]],['2029-03-12',[1,4]]])for(let i=0;i<5;i++){
  const d=day(addDays(start,i));assert.equal(d.slots.some(s=>s.id==='dinner'),nights.includes(i+1));assert.equal(d.slots.filter(s=>s.id.startsWith('study')).length,nights.includes(i+1)?3:0);
 }
 assert.equal(day('2028-09-16').kind,'grade3-saturday');assert.deepEqual(day('2028-09-16').slots.map(s=>s.id),['morning','afternoon','private']);
 assert.equal(day('2029-03-17').kind,'weekend');assert.deepEqual(day('2029-03-17').slots.map(s=>s.id),['morning','afternoon','evening']);assert.equal(day('2029-03-17').quota.max,1);
 assert.equal(day('2026-10-10').kind,'holiday');
 for(const g of [1,2])for(const date of ['2028-09-11','2029-03-12','2029-03-17'])assert.deepEqual(day(date,g),calendarDay(date,g));
 const parents=CALENDAR.years.flatMap(y=>y.activities).find(a=>a.kind==='parents'&&a.date>'2029-02-19'&&a.date<'2029-04-01');assert.ok(day(parents.date).slots.some(s=>s.protected));
});

test('H1-A: production advancement skips nonexistent nights and uses ordinary Saturday evening',()=>{
 let w=baseline('2029-03-13','p8');w=step(w);assert.equal(w.position.slotId,'private');w=step(w);assert.equal(w.position.date,'2029-03-14');assert.equal(w.position.slotId,'early');
 w=baseline('2029-03-12','p8');for(const id of ['dinner','study1','study2','study3','private']){w=step(w);assert.equal(w.position.slotId,id);}
 w=baseline('2029-03-17','morning');w=step(w);assert.equal(w.position.slotId,'afternoon');w=step(w);assert.equal(w.position.slotId,'evening');assert.deepEqual(restoreSave(encodeSave(createSave(w))).world,w);
 assert.throws(()=>positionFor('2029-03-13','study1',2026,THREE_YEAR,V),/SLOT/);
});

test('H1-A: actual event draws reserve only existing slots and Saturday shares one daily quota',()=>{
 for(const date of ['2029-03-13','2029-03-17','2028-09-16']){
  let w=baseline(date,null,true);w=run(w,[{type:'academic',action:'open'}]);w=run(w,[draw([definition()])],'draw','formal-event');
  const selected=runtimeOf(w).history.findLast(h=>h.type==='event-selection').data.selected,slots=day(date).slots.map(s=>s.id);
  assert.ok(selected.every(s=>slots.includes(s.slotId)));if(date==='2029-03-13')assert.ok(selected.every(s=>!s.slotId.startsWith('study')));if(date==='2029-03-17')assert.ok(selected.length<=1);
  assert.deepEqual(restoreWorldState(JSON.stringify(w)),w);
 }
});

test('H1-B: two legal graduation-exam days, first exam retained, no third, all other semesters unchanged',()=>{
 const s=semester('2029:spring'),exams=examSchedule(s.id,3,V);assert.deepEqual(exams.map(e=>e.round),[1,2]);assert.deepEqual(exams[0].dates,s.exams[0]);assert.deepEqual(exams[1].dates,s.exams[1]);assert.equal(exams[1].kind,'graduation-exam');assert.equal(exams[1].dates.length,2);
 for(const d of exams.flatMap(e=>e.dates)){assert.ok(weekday(d)<=5);assert.equal(day(d).holiday.length,0);assert.ok(day(d).slots.some(s=>s.kind==='exam'));}
 for(const d of s.exams[2])assert.equal(day(d).exam,false);
 for(const t of CALENDAR.years.flatMap(y=>y.terms))for(const g of [1,2,3]){if(g===3&&t.kind==='spring')continue;assert.deepEqual(examSchedule(t.id,g,V),examSchedule(t.id,g));}
});

test('H1-B: finish-slot automatically records rounds 1/2; rejects third/ordinary and defers H2 close',()=>{
 for(const round of [1,2]){
  let w=baseline(examSchedule('2029:spring',3,V)[round-1].dates.at(-1),'p8',true);w=run(w,[{type:'academic',action:'open'}]);w=step(w);
  const t=academicState(w).terms['2029:spring'];assert.deepEqual(t.assessments.map(a=>a.round),[round]);assert.equal(t.closed,false);assert.equal(calendarMilestones(w).annualSettlementReady,false);assert.deepEqual(restoreWorldState(JSON.stringify(w)),w);
 }
 let w=baseline('2029-06-29','p8',true);w=run(w,[{type:'academic',action:'open'}]);
 for(const round of [0,3])assert.throws(()=>run(w,[{type:'academic',action:'assess',round}]),/round unavailable/);
 assert.throws(()=>run(w,[{type:'academic',action:'close'}]),/H2 senior closing/);w=step(w);assert.deepEqual(academicState(w).terms['2029:spring'].assessments,[]);
 const contract=assessmentCalendar('2029:spring',3,V);assert.equal(contract.teacherTermEnd,'2029-06-29');assert.equal(contract.ordinaryAssessmentDates,null);
});

test('H1-B: after graduation exams normal lessons/nights continue through ceremony eve',()=>{
 let count=0;for(const date of datesBetween('2029-05-09','2029-05-31')){
  const d=day(date);if(weekday(date)<=5&&!d.holiday.length&&!d.activities.length){assert.equal(d.kind,'school');assert.equal(d.exam,false);assert.ok(d.slots.some(s=>s.period));count++;}
 }
 assert.ok(count>10);let w=baseline('2029-05-08','private');w=step(w);assert.equal(w.position.date,'2029-05-09');assert.equal(w.position.slotId,'early');assert.equal(w.position.serviceYear,3);assert.equal(day('2029-06-01').activities[0].kind,'graduation');
 let position=positionFor('2029-05-08','private',2026,THREE_YEAR,V),slots=0;const visited=new Set();
 while(position.date<'2029-06-01'){const next=nextPosition(position,2026,THREE_YEAR,V);assert.deepEqual(positionAt(cursorFor(next.date,next.slotId,2026,V),2026,THREE_YEAR,V),next);assert.ok(next.date===position.date||next.date===addDays(position.date,1));position=next;visited.add(position.date);slots++;assert.ok(slots<500);}
 assert.equal(visited.size,24);assert.ok(slots>200);assert.equal(position.slotId,'morning');
 w=step(baseline('2029-05-31','private'));assert.equal(w.position.date,'2029-06-01');assert.equal(w.position.slotId,'morning');assert.ok(formalSlot(w).slot.protected);
});

test('H1-C: exactly four GSAT and two subject nodes in the 2028 cohort, deterministic sources',()=>{
 assert.deepEqual(compileSeniorCalendar(CALENDAR),seniorCalendar);assert.equal(nodes.length,6);assert.deepEqual(nodes.filter(n=>n.family==='gsat').map(n=>n.date.slice(5,7)),['07','09','10','12']);assert.equal(nodes.filter(n=>n.family==='subject').length,2);
 for(const node of nodes){assert.equal(day(node.date).courseSemesterId,node.semesterId);assert.equal(node.countsTowardSemester,false);assert.equal(node.provenance,'school-world-h1-v1');if(node.family==='subject'){assert.equal(node.resultScope,'eligible-route-students');assert.equal(node.eligibilityContract,'h3-subject-route-v1');}}
});

test('H1-C: every generated mock avoids holidays, exams and existing senior activities',()=>{
 for(const node of seniorCalendar.nodes){const d=day(node.date);assert.ok(weekday(node.date)<=5);assert.equal(d.holiday.length,0);assert.equal(d.exam,false);assert.deepEqual(d.activities.map(a=>a.id),[node.id]);assert.deepEqual(d.slots.map(s=>s.id),['morning','afternoon','private']);assert.equal(d.quota.max,0);}
});

test('H1-C: production summary stages, event protection, no marks or invented admissions',()=>{
 for(const family of ['gsat','subject']){
  const node=nodes.find(n=>n.family===family);let w=baseline(node.date,'morning',true);w=run(w,[{type:'academic',action:'open'}]);const before=academicState(w);
  w=run(w,[draw([definition()])],'protected-draw','formal-event');assert.deepEqual(runtimeOf(w).history.findLast(h=>h.type==='event-selection').data.selected,[]);
  for(const next of ['afternoon','private']){w=step(w,'automatic');assert.equal(w.position.slotId,next);}
  const summaries=runtimeOf(w).facts.filter(f=>f.data.mockSummary).map(f=>f.data.mockSummary);assert.equal(summaries.length,2);assert.deepEqual(summaries.map(s=>s.phase),['morning','afternoon']);assert.ok(summaries.every(s=>s.nodeId===node.id&&s.individualResults===null&&s.countsTowardSemester===false));
  const saved=w;w=step(w,'rest');assert.equal(runtimeOf(w).facts.filter(f=>f.data.mockSummary).length,2);assert.deepEqual(academicState(w),before);assert.deepEqual(restoreSave(encodeSave(createSave(w))).world,w);const bad=structuredClone(saved);const campus=runtimeOf(bad).history.find(h=>h.type==='campus');campus.data.operations.find(o=>o.type==='fact').data.mockSummary.individualResults=[{score:99}];assert.throws(()=>restoreWorldState(bad),/mock summary/);
 }
});

test('H1 compatibility: pre-change serialized three-year saves retain exact dates, cursors, years and frozen version',()=>{
 const saves=JSON.parse(gunzipSync(readFileSync(new URL('./fixtures/h1-pre-a8cb5ec.json.gz',import.meta.url))));
 for(const original of saves){const loaded=restoreSave(original);assert.deepEqual(loaded,original);assert.deepEqual(restoreSave(encodeSave(loaded)),original);const w=loaded.world,p=runtimeOf(w).plan;assert.equal(p.calendarVersion,CALENDAR_VERSION);assert.equal(p.startYear,runtimeOf(original.world).plan.startYear);assert.deepEqual(positionAt(p.cursor,p.startYear,THREE_YEAR,p.calendarVersion),w.position);assert.deepEqual(restoreWorldState(step(w)),step(w));}
 assert.equal(runtimeOf(saves[3].world).plan.startYear,2030);
 const old=saves[0].world;assert.equal(old.position.slotId,'p8');assert.equal(day(old.position.date).activities[0].kind,'mock-gsat');assert.equal(formalSlot(old).slot.id,'p8');assert.equal(saves[1].world.position.slotId,'study2');
});

test('H1 compatibility: both versions cross semester opening without moving saved cursor or start year',()=>{
 for(const version of [CALENDAR_VERSION,V]){
  let w=baseline('2029-02-18','vacation-day'),p=runtimeOf(w).plan;p.calendarVersion=version;p.id=calendarPlanId(p);w=restoreWorldState(w);const saved=restoreSave(encodeSave(createSave(w)));assert.equal(saved.world.position.date,'2029-02-18');w=step(saved.world);assert.equal(w.position.date,'2029-02-19');assert.equal(w.position.slotId,'early');assert.equal(runtimeOf(w).plan.startYear,2026);assert.deepEqual(restoreWorldState(w),w);
 }
});

test('H1 compatibility: new opening roundtrip and 30-year original fixed data/slots remain intact',()=>{
 const w=experiencedOpening('hard');assert.equal(runtimeOf(w).plan.calendarVersion,V);assert.equal(runtimeOf(w).plan.startYear,2026);assert.deepEqual(restoreSave(encodeSave(createSave(w,w))).world,w);
 const old=atDate('2029-03-06','study2');assert.equal(runtimeOf(old).plan.validation,'fixed-calendar-v1');assert.equal(formalSlot(old).slot.id,'study2');assert.equal(calendarDay('2029-03-17',3).kind,'grade3-saturday');assert.equal(examSchedule('2029:spring',3).length,3);assert.deepEqual(restoreSave(encodeSave(createSave(old))).world,old);
 const bad=structuredClone(w);runtimeOf(bad).plan.calendarVersion='unknown';assert.throws(()=>restoreWorldState(bad),/CALENDAR_VERSION/);const cursor=structuredClone(w);runtimeOf(cursor).plan.cursor++;assert.throws(()=>restoreWorldState(cursor),/TIME/);
});

function memory(){let record={payload:null,token:null},generation=0,fail=false;return {fail(){fail=true;},async read(){return structuredClone(record);},async write(slot,payload,expected){if(!sameToken(record.token,expected))throw new WorldError('STALE','changed');if(fail){fail=false;throw Error('quota');}record={payload:restoreSave(payload),token:saveToken({payload,generation:++generation})};return structuredClone(record);}};}
test('H1 CAS: mock stages commit once, failed writes roll back, stale peers and altered imports reject',async()=>{
 const w=baseline(nodes[0].date,'morning'),db=memory(),s=await createStoredSession(db,1);await s.import(createSave(w),{expectedToken:null});const peer=await createStoredSession(db,1),q={...request(w,'mock-stage',[{type:'finish-slot',completedActivityIds:formalSlot(w).slot.activityIds},{type:'advance-time',planId:runtimeOf(w).plan.id,steps:1}]),calendarContext:{kind:'routine'}},before=s.snapshot();db.fail();await assert.rejects(s.execute(q),/quota/);assert.deepEqual(s.snapshot(),before);await s.execute(q);assert.equal((await s.execute(q)).duplicate,true);await assert.rejects(peer.execute({...q,id:q.id+'-other'}),/STALE/);assert.equal(s.snapshot().payload.world.position.slotId,'afternoon');const bad=createSave(s.snapshot().payload.world);runtimeOf(bad.world).plan.cursor++;assert.throws(()=>restoreSave(bad),/TIME/);const reloaded=await createStoredSession(db,1);assert.deepEqual(reloaded.snapshot(),s.snapshot());
});
