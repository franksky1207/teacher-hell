import test from 'node:test';
import assert from 'node:assert/strict';
import { calendarWorld,advanceRequest,atDate } from './support/calendar.js';
import { request,event,fact,result,open,id } from './support/runtime.js';
import { prepareWorldOperation,startCalendarWorld,forkWorldAttempt } from '../src/runtime/transactions.js';
import { runtimeOf,restoreWorldState } from '../src/runtime/model.js';
import { createSave,restoreSave } from '../src/storage/format.js';
import { CALENDAR,calendarDay,yearData,gradeAt } from '../src/calendar/calendar.js';
import { nextVacationOperation } from '../src/runtime/schedule.js';
import { addDays } from '../src/calendar/civil.js';

test('calendar-integration: untouched baseline adopts real calendar and persisted PRNG timetable once',()=>{
 const w=calendarWorld(),r=runtimeOf(w);assert.equal(r.plan.validation,'fixed-calendar-v1');assert.equal(w.position.date,yearData(2026).summerCamp);assert.deepEqual(restoreSave(JSON.stringify(createSave(w,w))),createSave(w,w));assert.deepEqual(restoreWorldState(JSON.stringify(w)),w);
 const changed=prepareWorldOperation(w,request(w,'already-started',[{type:'sample',stream:'events',id:'x',weights:[1,2]}])).world;assert.throws(()=>startCalendarWorld(changed,{}),/MIGRATION/);
 for(const mutate of [p=>p.calendarVersion='future',p=>p.cursor++,p=>p.tables[0].lessons[1]={...p.tables[0].lessons[0]},p=>p.positions=[w.position]]){const bad=structuredClone(w);mutate(runtimeOf(bad).plan);assert.throws(()=>restoreWorldState(bad));}
});
test('calendar-integration: time requires a completed slot, consecutive progression, atomic rollback and replay',()=>{
 const w=calendarWorld(),before=structuredClone(w),p=runtimeOf(w).plan;
 assert.throws(()=>prepareWorldOperation(w,request(w,'skip',[{type:'advance-time',planId:p.id,steps:1}])),/TIME_BARRIER/);
 const q=advanceRequest(w,'legal'),next=prepareWorldOperation(w,q).world;assert.equal(next.position.slotId,'p1');assert.equal(next.position.date,w.position.date);assert.equal(prepareWorldOperation(next,q).duplicate,true);
 const again=prepareWorldOperation(next,advanceRequest(next,'legal-two')).world;assert.deepEqual(again.numeric.evolution.random,next.numeric.evolution.random);
 const bad=advanceRequest(w,'bad');bad.operations.unshift({type:'sample',id:'would-draw',stream:'events',weights:[1,2]});bad.operations.push({type:'invalid'});assert.throws(()=>prepareWorldOperation(w,bad));assert.deepEqual(w,before);
 const jump=advanceRequest(w,'jump');jump.operations.at(-1).steps=2;assert.throws(()=>prepareWorldOperation(w,jump),/TIME_BARRIER/);
});
test('calendar-integration: pending teacher choice blocks slot completion / advancement',()=>{
 const w=calendarWorld(),e=event(w,'pending',{nodeId:'pick',options:[{id:'a',emotional:true},{id:'b',emotional:false},{id:'c',emotional:false}],confirmedOptionId:null}),next=prepareWorldOperation(w,request(w,'new-choice',[open(e)])).world;
 assert.throws(()=>prepareWorldOperation(next,advanceRequest(next,'cannot-leave')),/TIME_BARRIER/);
});
test('calendar-integration: protected activity stops new/old formal consequences but shares original N6 results',()=>{
 const a=CALENDAR.years.flatMap(y=>y.activities).find(a=>a.kind==='teachers-day'&&a.date.startsWith('2026')),w=atDate(a.date,'p6'),e=event(w,'activity'),ops=[open(e),fact(e),result(e,e.participantIds[1])];
 assert.throws(()=>prepareWorldOperation(w,request(w,'blocked',ops)),/ACTIVITY_PROTECTED/);
 e.definitionId=`activity:${a.id}`;const q={...request(w,'activity-result',ops),calendarContext:{kind:'activity',activityId:a.id}},next=prepareWorldOperation(w,q).world;
 assert.equal(next.numeric.receipts.length,1);assert.equal(prepareWorldOperation(next,q).duplicate,true);assert.equal(runtimeOf(next).effects.length,1);
 const other=request(next,'old-followup',[{type:'stage',eventId:e.id,fromStageId:e.stageId,stageId:id('stage','future'),choice:null}]);assert.throws(()=>prepareWorldOperation(next,other),/ACTIVITY_PROTECTED/);
 const proc=event(next,'deadline');proc.definitionId='procedure:synthetic-deadline';const background=prepareWorldOperation(next,{...request(next,'deadline',[open(proc),fact(proc,'deadline')]),calendarContext:{kind:'procedure'}}).world;assert.equal(runtimeOf(background).facts.length,2);assert.equal(background.position.date,w.position.date);
});
test('calendar-integration: admissions use shared daily/night/holiday/vacation bucket and survive reload',()=>{
 const w=calendarWorld();let next=w;for(let n=0;n<5;n++)next=prepareWorldOperation(next,request(next,'daily-'+n,[open(event(next,'daily-'+n))])).world;
 assert.throws(()=>prepareWorldOperation(next,request(next,'sixth',[open(event(next,'sixth'))])),/EVENT_QUOTA/);
 let vacation=atDate('2026-08-17');const e=event(vacation,'vacation');vacation=prepareWorldOperation(vacation,request(vacation,'vac-open',[open(e)])).world;vacation=restoreWorldState(JSON.stringify(vacation));assert.throws(()=>prepareWorldOperation(vacation,request(vacation,'vac-again',[open(event(vacation,'vac2'))])),/EVENT_QUOTA/);
 const tue=atDate('2026-08-25','study1'),one=prepareWorldOperation(tue,request(tue,'night1',[open(event(tue,'night1'))])).world;const two=prepareWorldOperation(one,advanceRequest(one,'night-next')).world;assert.throws(()=>prepareWorldOperation(two,request(two,'night2',[open(event(two,'night2'))])),/EVENT_QUOTA/);
});
test('calendar-integration: semester boundary requires one persisted schedule, does not redraw on restore',()=>{
 const y=yearData(2027),before=atDate(addDays(y.winterCamp,-1));runtimeOf(before).plan.tables=runtimeOf(before).plan.tables.slice(0,1);
 assert.throws(()=>prepareWorldOperation(before,advanceRequest(before,'missing-schedule')),/TIMETABLE/);
 const previous=runtimeOf(before).plan.tables[0],classes=previous.classes; // 3 eligible classes sufficient for Chinese, retained from same academic year.
 const q=advanceRequest(before,'prepare-next');q.operations.unshift({type:'prepare-semester',semesterId:'2027:spring',classes,homeClassId:previous.homeClassId});const next=prepareWorldOperation(before,q).world;
 assert.equal(next.position.date,y.winterCamp);assert.equal(runtimeOf(next).plan.tables.length,2);assert.deepEqual(restoreWorldState(JSON.stringify(next)),next);assert.equal(prepareWorldOperation(next,q).duplicate,true);
 const resubmit=request(next,'redraw',[q.operations[0]]);assert.throws(()=>prepareWorldOperation(next,resubmit));
});
test('calendar-integration: legal next-year opening snapshot, summer labels, retry and unknown versions',()=>{
 const y=yearData(2027),prior=atDate(addDays(y.autumnStart,-1)),q=advanceRequest(prior,'opening'),opening=prepareWorldOperation(prior,q).world;
 assert.equal(prior.position.serviceYear,1);assert.equal(opening.position.serviceYear,2);assert.equal(opening.position.date,y.autumnStart);assert.deepEqual(restoreSave(JSON.stringify(createSave(opening,opening))).opening,opening);
 assert.throws(()=>createSave(prior,prior),/SNAPSHOT/);
 const failed=prepareWorldOperation(opening,request(opening,'failed-attempt',[{type:'sample',stream:'events',id:'failure',weights:[1,2]}])).world;
 const retried=forkWorldAttempt(opening,{attemptId:id('attempt','new-year-retry'),seeds:{settlement:45,streams:{events:46,schedule:47}}});assert.ok(!runtimeOf(retried).commits.some(c=>c.id===runtimeOf(failed).commits.at(-1).id));assert.deepEqual(retried.position,opening.position);assert.deepEqual(runtimeOf(retried).plan.tables,runtimeOf(opening).plan.tables);
 const bad=createSave(opening,opening);runtimeOf(bad.world).plan.calendarVersion='unknown';assert.throws(()=>restoreSave(bad),/CALENDAR_VERSION/);
});

test('calendar-integration: durable week direction pauses for choices, resumes and summarizes once at boundary',()=>{
 let w=atDate('2026-08-17');w=prepareWorldOperation(w,request(w,'plan-week',[{type:'plan-vacation',id:'stable-week',weeks:3,direction:'rest'}])).world;
 assert.equal(runtimeOf(w).plan.vacation.endDate,'2026-08-23');const e=event(w,'week-choice',{nodeId:'choose',options:[{id:'a',emotional:true},{id:'b',emotional:false},{id:'c',emotional:false}],confirmedOptionId:null});w=prepareWorldOperation(w,request(w,'week-event',[open(e)])).world;
 w=restoreWorldState(JSON.stringify(w));assert.equal(nextVacationOperation(w).status,'decision-required');assert.equal(runtimeOf(w).plan.vacation.direction,'rest');
 w=prepareWorldOperation(w,request(w,'week-decision',[{type:'confirm-choice',eventId:e.id,stageId:e.stageId,optionId:'a',optionText:'synthetic week choice'}])).world;
 let days=0,lastRequest;while(nextVacationOperation(w).status==='advance'){lastRequest=nextVacationOperation(w).request;w=prepareWorldOperation(w,lastRequest).world;days++;assert.ok(days<=7);}
 assert.equal(days,7);assert.equal(w.position.date,'2026-08-24');assert.equal(w.position.slotId,'early');assert.equal(runtimeOf(w).history.filter(h=>h.type==='vacation-summary').length,1);const before=structuredClone(w);assert.equal(prepareWorldOperation(w,lastRequest).duplicate,true);assert.deepEqual(w,before);
 assert.throws(()=>prepareWorldOperation(w,request(w,'bad-week',[{type:'plan-vacation',id:'camp',weeks:1,direction:'rest'}])),/VACATION/);
});
