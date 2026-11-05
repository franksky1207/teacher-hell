import test from 'node:test';
import assert from 'node:assert/strict';
import { calendarWorld,advanceRequest,atDate } from './support/calendar.js';
import { request,event,fact,result,open,id,runtimeScenario } from './support/runtime.js';
import { prepareWorldOperation,startCalendarWorld,forkWorldAttempt } from '../src/runtime/transactions.js';
import { runtimeOf,restoreWorldState } from '../src/runtime/model.js';
import { createSave,restoreSave } from '../src/storage/format.js';
import { CALENDAR,calendarDay,yearData,gradeAt } from '../src/calendar/calendar.js';
import { nextVacationOperation,calendarMilestones } from '../src/runtime/schedule.js';
import { addDays } from '../src/calendar/civil.js';

test('calendar-integration: untouched baseline adopts real calendar and persisted PRNG timetable once',()=>{
 const w=calendarWorld(),r=runtimeOf(w);assert.equal(r.plan.validation,'fixed-calendar-v1');assert.equal(w.position.date,yearData(2026).summerCamp);assert.deepEqual(restoreSave(JSON.stringify(createSave(w,w))),createSave(w,w));assert.deepEqual(restoreWorldState(JSON.stringify(w)),w);
 const missingRandom=structuredClone(w);delete missingRandom.random.schedule;assert.throws(()=>restoreWorldState(missingRandom),/RANDOM/);
 const forged=runtimeScenario();runtimeOf(forged).plan.validation='fixed-calendar-v1';assert.throws(()=>restoreWorldState(forged));
 const changed=prepareWorldOperation(w,request(w,'already-started',[{type:'sample',stream:'events',id:'x',weights:[1,2]}])).world;assert.throws(()=>startCalendarWorld(changed,{}),/MIGRATION/);
 for(const mutate of [p=>p.calendarVersion='future',p=>p.cursor++,p=>p.tables[0].lessons[1]={...p.tables[0].lessons[0]},p=>p.positions=[w.position],p=>p.vacation=false,p=>p.cursor=Number.MAX_SAFE_INTEGER]){const bad=structuredClone(w);mutate(runtimeOf(bad).plan);assert.throws(()=>restoreWorldState(bad));}
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

test('calendar-integration: completed slots cannot accept late work; reviews wait for the final slot; snapshots precede first-slot actions',()=>{
 const w=calendarWorld(),sample={type:'sample',stream:'events',id:'late',weights:[1,2]};
 const closed=prepareWorldOperation(w,request(w,'close',[{type:'finish-slot',completedActivityIds:[]}])).world;
 assert.throws(()=>prepareWorldOperation(closed,request(closed,'late',[sample])),/TIME_BARRIER/);
 const changed=prepareWorldOperation(w,request(w,'initial-work',[sample])).world;assert.throws(()=>createSave(changed,changed),/SNAPSHOT/);
 const y=yearData(2027),before=atDate(addDays(y.autumnStart,-1)),opening=prepareWorldOperation(before,advanceRequest(before,'fresh-opening')).world;
 const late=prepareWorldOperation(opening,request(opening,'late-opening',[sample])).world;assert.throws(()=>createSave(late,late),/SNAPSHOT/);assert.doesNotThrow(()=>createSave(opening,opening));
 const vacationMissing=atDate('2027-02-07');runtimeOf(vacationMissing).plan.tables.pop();assert.throws(()=>restoreWorldState(vacationMissing),/TIMETABLE/);
 const final=atDate(y.springFinal,'private');assert.equal(calendarMilestones(final).annualSettlementReady,false);
 const finished=prepareWorldOperation(final,request(final,'final-finish',[{type:'finish-slot',completedActivityIds:[]}])).world;assert.equal(calendarMilestones(finished).annualSettlementReady,true);assert.equal(calendarMilestones(finished).semesterReviewReady,true);
 const summer=atDate(addDays(y.springFinal,1));assert.equal(calendarMilestones(summer).postAnnualSummer,true);assert.equal(calendarMilestones(calendarWorld()).postAnnualSummer,false);
});

// T1 late-year probes are calendar/tenure contracts, not claims of completed annual gameplay.
import { foundationScenario } from './support/scenarios.js';
import { startThreeYearSchoolCareer,startFailureSchoolCareer } from '../src/runtime/transactions.js';
import { teacherTenure,validateFormalPlan } from '../src/runtime/schedule.js';
import { THREE_YEAR,newThreeYearStart,planMode,positionFor,cursorFor,careerRange,DIFFICULTY_TENURE } from '../src/calendar/calendar.js';
import { generateTimetable } from '../src/calendar/timetable.js';
import { schoolCatalogue } from '../src/world/registry.js';
import { SUBJECT_LOAD } from '../src/calendar/timetable.js';
function t1Foundation(){const f=foundationScenario(74);f.events=[];f.enrollments=[];return f;}
function t1World(difficulty='easy',taipeiDate='2026-11-05'){const {startYear}=newThreeYearStart(taipeiDate);return startFailureSchoolCareer(t1Foundation(),{startYear,subject:'國文',seed:75,career:{version:1,mode:THREE_YEAR,difficulty}});}

test('calendar-integration T1: all difficulties create play year one with no veteran awards, histories or relations',()=>{
 const old=startFailureSchoolCareer(t1Foundation(),{startYear:2026,subject:'國文',seed:75});
 for(const [difficulty,tenure] of Object.entries(DIFFICULTY_TENURE)){
  const w=t1World(difficulty),r=runtimeOf(w);assert.equal(planMode(r.plan),THREE_YEAR);assert.equal(w.position.serviceYear,1);assert.equal(w.numeric.evolution.world.player.year,1);assert.equal(teacherTenure(w),tenure);
  assert.deepEqual(w.numeric,old.numeric);assert.deepEqual(w.enrollments,old.enrollments);assert.deepEqual(w.events,[]);assert.equal(r.history.length,1);assert.equal(r.commits.length,1);assert.equal(w.numeric.receipts.length,0);assert.equal(w.numeric.evolution.clock.lastNaturalDate,null);
  assert.equal(r.history.some(h=>['annual-success','academic-opening','cohort-completion','career-completion'].includes(h.type)),false);
  assert.deepEqual(restoreWorldState(JSON.stringify(w)),w);
  const next=prepareWorldOperation(w,advanceRequest(w,'t1-'+difficulty)).world;assert.equal(teacherTenure(next),tenure);assert.equal(next.position.serviceYear,1);
 }
});

test('calendar-integration T1: year two/three tenure derives from legal autumn opening without synthetic successes',()=>{
 for(const difficulty of Object.keys(DIFFICULTY_TENURE))for(const year of [2,3]){
  const w=t1World(difficulty),p=runtimeOf(w).plan,registry=w.numeric.evolution.world.registry;
  // Scheduling-only fixture: use the persisted school catalogue and generate consecutive legal tables.
  let random=w.random.schedule;
  for(let index=1;index<year*2-1;index++){
   const academicYear=p.startYear+Math.floor(index/2),semesterId=`${p.startYear+Math.ceil(index/2)}:${index%2?'spring':'autumn'}`;
   const generated=generateTimetable({subject:p.subject,academicYear,semesterId,previous:p.tables.at(-1),classes:schoolCatalogue({...w.numeric.evolution.world,registry:{...registry,academicYear}},Object.keys(SUBJECT_LOAD)),homeClassId:registry.homeClassId,random});
   p.tables.push(generated.table);random=generated.random;
  }
  const date=yearData(p.startYear+year-1).autumnStart,before=addDays(date,-1);
  assert.equal(positionFor(before,calendarDay(before,year).slots[0].id,p.startYear,THREE_YEAR).serviceYear,year-1);
  w.position=positionFor(date,'early',p.startYear,THREE_YEAR);p.cursor=cursorFor(date,'early',p.startYear);w.numeric.evolution.world.player.year=year;
  validateFormalPlan(p);assert.equal(teacherTenure(w),DIFFICULTY_TENURE[difficulty]+year-1);assert.equal(runtimeOf(w).history.filter(h=>h.type==='annual-success').length,0);
  // This intentionally incomplete annual fixture cannot be restored as a played world.
  assert.throws(()=>restoreWorldState(w));
 }
});

test('calendar-integration T1: later and last three-year starts preserve fixed timetable/slot checks',()=>{
 for(const startYear of [2026,2040,2062]){
  const w=t1World('normal',`${startYear}-11-05`),p=runtimeOf(w).plan;assert.equal(p.startYear,startYear);assert.equal(w.position.date,yearData(startYear).summerCamp);assert.equal(teacherTenure(w),10);
  assert.deepEqual(restoreSave(JSON.stringify(createSave(w,w))).world,w);
  assert.equal(prepareWorldOperation(w,advanceRequest(w,'late-'+startYear)).world.position.slotId,'p1');
  for(const mutate of [p=>p.tables[0].lessons.pop(),p=>p.cursor++,p=>p.tables[0].semesterId=`${startYear}:spring`]){const bad=structuredClone(w);mutate(runtimeOf(bad).plan);assert.throws(()=>restoreWorldState(bad));}
 }
 assert.throws(()=>t1World('easy','2063-11-05'));assert.throws(()=>t1World('unknown'));assert.throws(()=>t1World('toString'));
 const end=careerRange(2062,THREE_YEAR).end;assert.equal(positionFor(end,calendarDay(end,3).slots.at(-1).id,2062,THREE_YEAR).serviceYear,3);assert.throws(()=>positionFor(addDays(end,1),'vacation-day',2062,THREE_YEAR));
});

test('calendar-integration T1: forged difficulty, tenure, mode and twentieth play year are rejected',()=>{
 for(const mutate of [
  w=>runtimeOf(w).plan.career.difficulty='normal',w=>runtimeOf(w).plan.career.difficulty=['easy'],w=>runtimeOf(w).plan.career.initialTenure=20,
  w=>runtimeOf(w).plan.career.mode='career-30',w=>runtimeOf(w).plan.career.version=2,
  w=>delete runtimeOf(w).plan.career,w=>runtimeOf(w).plan.validation='fixed-calendar-v1',
  w=>w.position.serviceYear=20,w=>w.numeric.evolution.world.player.year=20,
  w=>{const p=runtimeOf(w).plan;p.career.difficulty='normal';p.id=p.id.replace(':easy',':normal');},
  w=>{const p=runtimeOf(w).plan;delete p.career;p.validation='fixed-calendar-v1';p.id=p.id.replace(':three-year:easy','');},
  w=>runtimeOf(w).plan.startYear=2027,w=>runtimeOf(w).plan.calendarVersion='future',
 ]){const w=t1World();mutate(w);assert.throws(()=>restoreWorldState(w));}
 const save=createSave(t1World(),t1World());save.world= t1World('normal');assert.throws(()=>restoreSave(save),/SNAPSHOT/);
 const old=calendarWorld();assert.equal(planMode(runtimeOf(old).plan),'career-30');assert.equal(teacherTenure(old),1);assert.equal(Object.hasOwn(runtimeOf(old).plan,'career'),false);
 assert.deepEqual(restoreSave(JSON.stringify(createSave(old,old))).world,old);
});

import { experiencedOpening } from './support/calendar.js';
import { deriveWorldPanel } from '../src/social/reputation.js';
import { derivePanel,ABILITY_NAMES,STATE_NAMES } from '../src/player/panel.js';
import { directedKey,contactKey } from '../src/world/relationships.js';
import { schoolResponsibilities } from '../src/world/registry.js';
import { validateWorld } from '../src/world/validation.js';
test('calendar-integration T2: real seeded openings preserve novice contracts, streams, roster and teaching load',()=>{
 const hard=experiencedOpening('hard'),ordinary=hard.numeric.evolution.world;
 const legacy=startFailureSchoolCareer(t1Foundation(),{startYear:2026,subject:'國文',seed:75});assert.deepEqual(hard.numeric,legacy.numeric);
 for(const [difficulty,tenure] of [['easy',20],['normal',10],['hard',1]]){
  const w=experiencedOpening(difficulty),n=w.numeric.evolution.world,p=deriveWorldPanel(n),r=runtimeOf(w);
  assert.deepEqual(experiencedOpening(difficulty),w);assert.equal(teacherTenure(w),tenure);assert.equal(w.position.serviceYear,1);assert.equal(n.player.year,1);
  assert.equal(r.history.length,1);assert.equal(r.history[0].type,'school');assert.equal(w.events.length,0);assert.equal(w.numeric.receipts.length,0);assert.equal(r.numericArchives.length,0);
  assert.equal(n.classroom.studentIds.length,40);assert.equal(n.registry.cohorts.length,1);assert.deepEqual(n.people,ordinary.people);assert.deepEqual(n.families,ordinary.families);assert.deepEqual(n.careLinks,ordinary.careLinks);assert.deepEqual(n.registry.enrollments,ordinary.registry.enrollments);
  assert.deepEqual(n.random,ordinary.random);assert.deepEqual(w.random,hard.random);assert.deepEqual(w.numeric.random,hard.numeric.random);assert.deepEqual(w.numeric.evolution.random,hard.numeric.evolution.random);assert.deepEqual(n.player.random,ordinary.player.random);
  const table=r.plan.tables[0];assert.equal(table.lessons.length,18);assert.ok(table.lessons.some(l=>l.classId===table.homeClassId));assert.deepEqual(table,runtimeOf(hard).plan.tables[0]);
  assert.deepEqual(n.registry.assignments,ordinary.registry.assignments);validateWorld(n,{stage:'runtime'});
  if(difficulty==='hard'){assert.equal(n.player.version,1);assert.equal(n.background,undefined);assert.deepEqual(STATE_NAMES.map(k=>p[k]),[100,100,100,40,100,100]);assert.equal(ABILITY_NAMES.reduce((s,k)=>s+p[k],0),240);}
  else{
   assert.equal(n.player.version,2);assert.equal(n.background.episodes.length,difficulty==='normal'?4:6);assert.deepEqual(p,derivePanel(n.player.initial));assert.notDeepEqual(p,deriveWorldPanel(ordinary));
   assert.equal(n.player.current.evaluations.length,3);assert.equal(Object.keys(n.contacts).length,Object.keys(ordinary.contacts).length+3);
   for(const [key,edge] of Object.entries(ordinary.relationships))assert.deepEqual(n.relationships[key],edge);
   for(const id of n.player.origin.staffIds){assert.equal(n.people[id].kind,'other');const incoming=n.relationships[directedKey(id,w.identity.playerId)],outgoing=n.relationships[directedKey(w.identity.playerId,id)],source=n.social.attestations[directedKey(id,w.identity.playerId)];assert.notDeepEqual(incoming.values,outgoing.values);assert.ok(n.background.episodes.some(e=>e.id===source.basisId&&e.participantIds.includes(id)&&e.playerKnown));assert.equal(n.contacts[contactKey(id,w.identity.playerId)].reference,source.basisId);}
  }
  assert.deepEqual(restoreSave(JSON.stringify(createSave(w,w))).world,w);
 }
});
test('calendar-integration T2: responsibilities have bounded school provenance and no implicit procedural powers',()=>{
 let withDuty,withoutDuty;
 for(let seed=0;seed<12&&(!withDuty||!withoutDuty);seed++){const w=experiencedOpening('easy',seed);if(schoolResponsibilities(w.numeric.evolution.world).length)withDuty=w;else withoutDuty=w;}
 assert.ok(withDuty&&withoutDuty);
 const n=withDuty.numeric.evolution.world,[duty]=schoolResponsibilities(n);assert.equal(duty.personId,withDuty.identity.playerId);assert.equal(duty.scope,n.school.id);assert.ok(n.registry.assignments.some(a=>a.personId===duty.appointedBy&&a.roleId===1));assert.equal(duty.authority,'coordination-only');assert.equal(duty.subject,duty.title==='subject-convenor'?runtimeOf(withDuty).plan.subject:null);assert.ok(duty.responsibilities.length>=2);assert.ok(n.background.episodes.some(e=>e.id===duty.sourceId&&e.type==='school-service'));
 assert.equal(n.registry.assignments.filter(a=>a.personId===withDuty.identity.playerId&&a.roleId===9&&a.until===null).length,1);assert.equal(n.people[withDuty.identity.playerId],undefined);assert.equal(runtimeOf(withDuty).plan.tables[0].lessons.length,18);
 duty.title='principal';assert.notEqual(schoolResponsibilities(n)[0].title,'principal');
 assert.deepEqual(schoolResponsibilities(experiencedOpening('hard').numeric.evolution.world),[]);
});
test('calendar-integration T2: malformed background, opinions, staff, seed and mode cannot survive restoration',()=>{
 for(const mutate of [
  n=>n.background=null,n=>n.background.subject='英文',n=>n.background.episodes[0].outcome=99,n=>n.background.episodes.push(n.background.episodes[0]),n=>n.background.episodes[0].schoolId='another-school',
  n=>n.player.initial.person['3-1']++,n=>n.player.current.person['3-1']++,n=>n.player.origin.count=4,n=>n.player.origin.staffIds[0]=n.classroom.studentIds[0],
  n=>delete n.contacts[contactKey(n.player.current.playerId,n.player.origin.staffIds[0])],
  n=>n.social.attestations[directedKey(n.player.origin.staffIds[0],n.player.current.playerId)].basisId='invented',
  n=>n.player.current.evaluations=n.player.origin.base.evaluations,n=>delete n.background,
  n=>n.registry.responsibilities=[{title:'principal'}],
 ]){const w=experiencedOpening();mutate(w.numeric.evolution.world);assert.throws(()=>restoreWorldState(w));}
 for(const mutate of [c=>c.backgroundSeed++,c=>c.difficulty='normal',c=>c.version=1]){const w=experiencedOpening();mutate(runtimeOf(w).plan.career);assert.throws(()=>restoreWorldState(w));}
 const publicFoundation=t1Foundation();publicFoundation.numeric.evolution.world.school.mode='public';assert.throws(()=>startThreeYearSchoolCareer(publicFoundation,{taipeiDate:'2026-11-05',difficulty:'hard',subject:'國文',seed:75}));
 const mixed=createSave(experiencedOpening(),experiencedOpening());mixed.opening=experiencedOpening('normal');assert.throws(()=>restoreSave(mixed));
});
