import test from 'node:test';
import assert from 'node:assert/strict';
import { performance } from 'node:perf_hooks';
import { runtimeScenario,request,event,fact,open } from './support/runtime.js';
import { prepareWorldOperation } from '../src/runtime/transactions.js';
import { restoreWorldState,runtimeOf } from '../src/runtime/model.js';
import { readPlayerView } from '../src/runtime/views.js';
import { createSave,encodeSave,restoreSave } from '../src/storage/format.js';
import { CLASS_NAMES,schoolClassId,readSchoolCandidates,enrollmentEligibility,schoolCatalogue,dailySchoolPeople } from '../src/world/registry.js';
import { createRandom } from '../src/numeric/random.js';
import { generateTimetable,SUBJECT_LOAD } from '../src/calendar/timetable.js';
import { validateWorld } from '../src/world/validation.js';
import { evolutionHolders,evolveWorldSnapshot } from '../src/evolution/step.js';
import { calendarDay,yearData,positionFor,gradeAt,careerRange } from '../src/calendar/calendar.js';
import { addDays } from '../src/calendar/civil.js';

import { n,school,commit,initial,cause,change,leave,enter,longPlan,baseline,year } from './support/school-scenario.js';

test('school: first forty unique identities, formal ten names, random homeroom and deterministic restore',()=>{
 const w=initial(),r=n(w).registry,ids=n(w).classroom.studentIds;
 assert.equal(ids.length,40);assert.equal(new Set(ids).size,40);assert.equal(Object.keys(r.classes).length,30);
 assert.deepEqual(Object.values(r.classes).filter(c=>c.cohortStart===2026).map(c=>c.name),CLASS_NAMES);
 assert.equal(r.classes[r.homeClassId].index,r.homeIndex);assert.deepEqual(initial(),w);
 assert.deepEqual(restoreSave(encodeSave(createSave(w))).world,w);assert.deepEqual(initial().numeric,n(w)&&w.numeric);
 assert.ok(new Set(ids.map(id=>n(w).people[id].values['1-1'])).size>35);
 assert.ok(new Set([1,2,3,4,5].map(seed=>n(initial(seed)).registry.homeIndex)).size>1);
 assert.equal(w.enrollments.length,40);assert.ok(!JSON.stringify(readPlayerView(w)).includes('appearance'));
});

test('school: 38 schedules one future admission, legal time execution replenishes only to 39 and deduplicates',()=>{
 let w=initial();const ids=n(w).classroom.studentIds.slice(0,2);w=change(w,'two-leave',ids.map(id=>leave(id)));
 assert.equal(n(w).classroom.studentIds.length,38);const plan=n(w).registry.transfers[0];assert.equal(plan.status,'scheduled');assert.equal(plan.dueDate,'2026-08-10');
 assert.equal(n(w).registry.transfers.length,1);assert.equal(readSchoolCandidates(n(w)).transfer.needsRecentArrival,true);
 const q=request(w,'week-arrival',[{type:'advance-time',planId:runtimeOf(w).plan.id,steps:8}]);const next=prepareWorldOperation(w,q).world;
 assert.equal(n(next).classroom.studentIds.length,39);assert.equal(n(next).registry.transfers[0].status,'completed');assert.equal(prepareWorldOperation(next,q).duplicate,true);
 assert.ok(ids.every(id=>n(next).people[id]));assert.equal(n(next).registry.transfers.length,1);
 assert.deepEqual(restoreSave(encodeSave(createSave(next))).world,next);
});

test('school: 42 stops admissions; invalid sub-38 and a failed mixed transaction are atomic',()=>{
 let w=initial(),home=n(w).classroom.id;w=change(w,'two-enter',[enter(home),enter(home)]);assert.equal(n(w).classroom.studentIds.length,42);
 assert.equal(enrollmentEligibility(n(w),{personId:null,classId:home,action:'transfer-in'}).eligible,false);
 const before=structuredClone(w);assert.throws(()=>change(w,'overcapacity',[enter(home)]),/Ineligible/);assert.deepEqual(w,before);
 w=initial();const c=cause(w,'failed');const q=request(c.world,'bad-half',[school(enter(n(w).classroom.id),c.id),{type:'unknown'}]);assert.throws(()=>prepareWorldOperation(c.world,q));assert.deepEqual(n(c.world).classroom.studentIds,n(w).classroom.studentIds);
 assert.throws(()=>change(w,'three-leave',n(w).classroom.studentIds.slice(0,3).map(id=>leave(id))),/Sub-38/);
});

test('school: same-school class changes, return, guardians, historical basis and tamper rejection',()=>{
 let w=initial();const id=n(w).classroom.studentIds[0],family=n(w).people[id].familyId,links=structuredClone(n(w).careLinks.filter(l=>l.studentId===id)),home=n(w).classroom.id;
 const other=Object.values(n(w).registry.classes).find(c=>c.cohortStart===2026&&c.id!==home).id;
 w=change(w,'move',[enter(other,id,'change-class')]);assert.equal(n(w).classroom.studentIds.length,39);assert.equal(n(w).people[id].roleIds.includes(12),true);
 w=change(w,'move-back',[enter(home,id,'change-class')]);assert.equal(n(w).classroom.studentIds.length,40);assert.equal(n(w).people[id].familyId,family);assert.deepEqual(n(w).careLinks.filter(l=>l.studentId===id),links);
 w=change(w,'suspend',[leave(id,'suspended')]);w=change(w,'return',[enter(home,id,'return')]);assert.equal(n(w).registry.enrollments.filter(e=>e.personId===id).length,4);
 const bad=structuredClone(w);n(bad).registry.enrollments[0].personId='missing';assert.throws(()=>restoreWorldState(bad));
 const badRole=structuredClone(w);n(badRole).people[id].roleIds=[18];assert.throws(()=>restoreWorldState(badRole),/affiliation/);
 const badRef=structuredClone(w);badRef.enrollments[0].classId=badRef.enrollments[1].cohortId;assert.throws(()=>restoreWorldState(badRef));
 assert.throws(()=>change(w,'wrong-change',[enter(schoolClassId('school',2025,1),id,'change-class')]),/Ineligible/);
});

test('school: cross-cohort repeat and delayed graduation retain the natural identity',()=>{
 let w=longPlan(initial()),id=n(w).classroom.studentIds[0];w=year(w,2027);
 const target=schoolClassId('school',2027,2);w=change(w,'repeat',[enter(target,id,'repeat')]);assert.equal(n(w).people[id].roleIds.includes(13),true);
 assert.equal(n(w).registry.enrollments.filter(e=>e.personId===id).length,2);
 w=change(w,'delay',[leave(id,'delayed')]);w=change(w,'resume-delayed',[enter(target,id,'return')]);assert.ok(n(w).people[id]);assert.equal(n(w).people[id].id,id);
 assert.deepEqual(restoreSave(encodeSave(createSave(w))).world,w);
});

test('school: teacher identity, appointment succession, all role configurations and hidden player view',()=>{
 let w=longPlan(initial()),home=n(w).classroom.id;
 w=change(w,'new-teacher',[{type:'school-staff',personId:'colleague',roleIds:[8,9]}]);const values=structuredClone(n(w).people.colleague.values);
 w=change(w,'appointment',[{type:'school-assignment',id:'teaching-1',personId:'colleague',roleId:8,classId:home,endsId:null}]);
 w=year(w,2027);
 const c=cause(w,'role-succession',[w.identity.playerId,'colleague']);w=commit(c.world,'successor',[school({type:'school-staff',personId:'colleague',roleIds:[2,8]},c.id),school({type:'school-assignment',id:'administration-2',personId:'colleague',roleId:2,classId:null,endsId:'teaching-1'},c.id)]);
 assert.deepEqual(n(w).people.colleague.values,values);assert.ok(n(w).registry.assignments.find(a=>a.id==='teaching-1').until);
 assert.equal(n(w).registry.assignments.find(a=>a.id==='administration-2').personId,'colleague');
 assert.ok(!JSON.stringify(readPlayerView(w)).includes('colleague'));assert.ok(!JSON.stringify(readPlayerView(w)).includes('registry'));
 const staff=Object.values(n(w).people).filter(p=>p.kind==='other');assert.ok(staff.length>=90);validateWorld(n(w),{stage:'runtime'});
});

test('school: ten cohort engineering baselines retain histories, household links and bounded daily work',()=>{
 const start=performance.now(),heapBefore=process.memoryUsage().heapUsed;let w=longPlan(initial()),all=new Set(),sizes=[];const first=n(w).classroom.studentIds[0],firstValues=structuredClone(n(w).people[first].values),firstLinks=structuredClone(n(w).careLinks.filter(l=>l.studentId===first));
 for(let cohort=0;cohort<10;cohort++){
  const startYear=2026+cohort*3,ids=[...n(w).classroom.studentIds];assert.equal(ids.length,40);for(const id of ids){assert.ok(!all.has(id));all.add(id);}
  for(let offset=1;offset<=2;offset++){w=year(w,startYear+offset);assert.deepEqual(n(w).classroom.studentIds,ids);}
  const catalogue=schoolCatalogue(n(w),Object.keys(SUBJECT_LOAD));assert.equal(catalogue.length,30);
  const table=generateTimetable({subject:'國文',semesterId:`${startYear+2}:autumn`,academicYear:startYear+2,classes:catalogue,homeClassId:n(w).classroom.id,random:createRandom(31).snapshot()});assert.equal(table.table.lessons.length,18);
  w=baseline(w,`${startYear+3}-06-05`);w=change(w,`graduate-${cohort}`,[{type:'school-graduate',personIds:ids,reason:'synthetic documented academic qualification'}]);
  assert.equal(n(w).classroom.studentIds.length,0);assert.ok(n(w).people[ids[0]]);assert.ok(!dailySchoolPeople(n(w)).has(ids[0]));
  sizes.push({cohort:cohort+1,people:Object.keys(n(w).people).length,enrollments:n(w).registry.enrollments.length,bytes:Buffer.byteLength(encodeSave(createSave(w)))});
  if(cohort<9){w=year(w,startYear+3);w=commit(w,'new-cohort-'+cohort,[school({type:'school-cohort'})]);}
 }
 assert.equal(all.size,400);assert.equal(n(w).registry.cohorts.length,10);assert.deepEqual(n(w).careLinks.filter(l=>l.studentId===first),firstLinks);
 assert.deepEqual(n(w).people[first].values,firstValues);assert.deepEqual(restoreSave(encodeSave(createSave(w))).world,w);
 const evolved=evolveWorldSnapshot(n(w),42);assert.deepEqual(evolved.people[first].values,firstValues);assert.ok(evolutionHolders(n(w)).length<150);
 const report={provenance:'synthetic lifecycle baselines; no 30-year daily gameplay',uniqueStudents:all.size,sizes,dailyHolders:evolutionHolders(n(w)).length,elapsedMs:Math.round(performance.now()-start),heapDeltaBytes:process.memoryUsage().heapUsed-heapBefore,numericBytes:Buffer.byteLength(JSON.stringify(n(w))),registryBytes:Buffer.byteLength(JSON.stringify(n(w).registry)),historyEntries:runtimeOf(w).history.length,finalBytes:Buffer.byteLength(encodeSave(createSave(w)))};
 console.log('SCHOOL_LIFECYCLE_REPORT '+JSON.stringify(report));
});

test('school: calendar 2026-2065 dates, initial reference migration and operation resends',()=>{
 for(let y=2026;y<=2065;y++){const d=yearData(y);assert.ok(calendarDay(d.summerCamp,1).slots.length);}
 const old=runtimeScenario();assert.throws(()=>commit(old,'cannot-guess',[school({type:'school-initialize',academicYear:2026})]),/MIGRATION/);assert.deepEqual(restoreWorldState(old),old);
 let w=runtimeScenario();w.enrollments=[];const q=request(w,'replay-init',[school({type:'school-initialize',academicYear:2026})]),one=prepareWorldOperation(w,q);assert.equal(prepareWorldOperation(one.world,q).duplicate,true);
 const changed=structuredClone(q);changed.operations[0].change.academicYear=2027;assert.throws(()=>prepareWorldOperation(one.world,changed),/CONFLICT/);
});

test('school: official bootstrap supplies real timetable classes and a recoverable opening snapshot',async()=>{
 const {foundationScenario}=await import('./support/scenarios.js');const {startSchoolCareer}=await import('../src/runtime/transactions.js');
 const f=foundationScenario();f.events=[];f.enrollments=[];const w=startSchoolCareer(f,{startYear:2026,subject:'國文',seed:31}),r=n(w).registry;
 assert.ok(runtimeOf(w).plan.tables[0].classes.every(c=>r.classes[c.id]));assert.equal(runtimeOf(w).revision,1);
 assert.deepEqual(restoreSave(encodeSave(createSave(w,w))).world,w);
 const {readSchoolRoster}=await import('../src/runtime/views.js');const roster=readSchoolRoster(w);assert.equal(roster.students.length,40);assert.ok(CLASS_NAMES.includes(roster.className));assert.ok(!JSON.stringify(roster).includes('values'));
});


test('school: historical affiliations cannot authorize fictitious relationships and malformed counters are rejected',()=>{
 let w=initial();const ids=n(w).classroom.studentIds,outsiderClass=Object.values(n(w).registry.classes).find(c=>c.cohortStart===2026&&c.id!==n(w).classroom.id).id;
 w=change(w,'outside-student',[enter(outsiderClass)]);const newcomer=n(w).registry.enrollments.at(-1).personId;
 const bad=structuredClone(w),relation=Object.values(n(bad).relationships).find(r=>r.fromId===w.identity.playerId&&r.toId===ids[0]);
 delete n(bad).relationships[JSON.stringify([relation.fromId,relation.toId])];relation.toId=newcomer;n(bad).relationships[JSON.stringify([relation.fromId,newcomer])]=relation;
 assert.throws(()=>restoreWorldState(bad),/basis|contact/);
 for(const mutate of [r=>delete r.classes[Object.keys(r.classes).find(id=>id!==r.homeClassId)],r=>r.nextEnrollment=1,r=>r.homeIndex=r.homeIndex%10+1,r=>r.enrollments[0].until='2060-01-01',r=>r.enrollments.push({...r.enrollments[0],id:'school-enrollment:999'})]){const b=structuredClone(w);mutate(n(b).registry);assert.throws(()=>restoreWorldState(b));}
});


test('school: concurrent due admissions recheck capacity after each completion without blocking time',()=>{
 let w=initial(),home=n(w).classroom.id;w=change(w,'forty-one',[enter(home)]);
 const c=cause(w,'two-arrangements');w=commit(c.world,'queue-both',['first','second'].map(id=>school({type:'school-transfer-plan',id,classId:home,personId:null,dueDate:'2026-08-04',source:c.id},c.id)));
 const q=request(w,'capacity-recheck',[{type:'advance-time',planId:runtimeOf(w).plan.id,steps:8}]);w=prepareWorldOperation(w,q).world;
 assert.equal(n(w).classroom.studentIds.length,42);assert.equal(n(w).registry.transfers.filter(t=>t.status==='completed').length,1);assert.equal(n(w).registry.transfers.filter(t=>t.status==='scheduled').length,1);
 assert.equal(prepareWorldOperation(w,q).duplicate,true);
});
