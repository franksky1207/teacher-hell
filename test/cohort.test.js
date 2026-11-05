import test from 'node:test';
import assert from 'node:assert/strict';
import { compileCohortCompletion,beforeCohortCompletion,validateCohortCompletions,validateCohortArchive } from '../src/runtime/cohort.js';
import { compileThreeYearCohortCompletion } from '../src/runtime/annual.js';
import { prepareWorldOperation,startThreeYearSchoolCareer } from '../src/runtime/transactions.js';
import { runtimeOf,restoreWorldState } from '../src/runtime/model.js';
import { enrollmentEligibility,validateRegistry } from '../src/world/registry.js';
import { createSettlementSession } from '../src/changes/settlement.js';
import { executeSchool,arrangeReplenishment,dueTransfers } from '../src/runtime/school.js';
import { readAcademicQualification } from '../src/runtime/academics.js';
import { yearData } from '../src/calendar/calendar.js';
import { captureAssessment } from '../src/assessment/evidence.js';
import { curriculum } from '../src/academics/rules.js';
import { initial,longPlan,year,baseline,n,change,leave,enter } from './support/school-scenario.js';
import { sourceFact } from './support/procedure-scenario.js';
import { foundationScenario } from './support/scenarios.js';
import { request,id } from './support/runtime.js';
import { annualOpening,runAnnual } from './support/annual-scenario.js';

// Explicit lower-domain contract probe. No annual-success rows are fabricated;
// skipped calendar baselines are NOT a legal three-year production playthrough.
function probe(){
 let w=year(year(longPlan(initial(74)),2027),2028);
 const personId=n(w).classroom.studentIds[0],records=[1,2,3].flatMap(level=>['autumn','spring'].flatMap(half=>curriculum(level,'science',null,null,2,half).map(c=>({...c,level,half,mark:80,earned:c.credits}))));
 const cause=sourceFact(w,{type:'academic-recognition',records},[personId]);w=cause.world;
 w=prepareWorldOperation(w,{...request(w,'cohort-recognize',[{type:'academic',action:'open',termId:'2028:autumn'},{type:'academic',action:'recognize',personId,records,basisFactId:cause.fact.id}]),calendarContext:{kind:'procedure'}}).world;
 return baseline(w,'2029-06-29');
}
function compiled(w,terminal=true){return compileCohortCompletion(w,id('operation','cohort-probe'),{terminal});}
// Internal transaction harness only. It executes the production school adapter,
// builds the archive boundary, and deliberately cannot pass full world restore.
function materialize(w,plan){
 const after=structuredClone(w),r=runtimeOf(after),operationId=id('operation','cohort-probe');
 const append=(type,data,factIds=[])=>{const h={id:'probe:'+r.history.length,order:r.history.length+1,type,data,operationId,attemptId:w.identity.attemptId,at:{date:w.position.date,slotId:w.position.slotId},cursor:r.plan.cursor,factIds,eventId:plan.archive.eventId,stageId:plan.archive.stageId};r.history.push(h);return h;};
 const f=plan.operations.find(o=>o.type==='fact'),row=append('fact',{factId:f.id});r.facts.push({...f,order:row.order,occurredAt:row.at,cursor:row.cursor});
 let session=createSettlementSession(after.numeric);
 for(const op of plan.operations.filter(o=>o.type==='school')){const applied=executeSchool(after,op,session);session=createSettlementSession(applied.snapshot);after.numeric=applied.snapshot;append('school',applied.data,[op.basisFactId]);}
 const h=append('cohort-completion',structuredClone(plan.archive.data),plan.archive.factIds);
 return {after,h,append};
}

test('T3 compiler unit: official academic recognition yields mixed graduation/incomplete study with no mutation or fourth year',()=>{
 const w=probe(),before=JSON.stringify(w),plan=compiled(w),a=plan.archive;
 assert.equal(a.data.outcomes.length,40);assert.equal(a.data.outcomes.filter(o=>o.qualification.eligible).length,1);
 for(const o of a.data.outcomes)assert.deepEqual(o.qualification,readAcademicQualification(w,o.personId));
 assert.equal(plan.operations.filter(o=>o.type==='school'&&o.change.status==='incomplete').length,39);
 assert.ok(!plan.operations.some(o=>['school-year','school-cohort'].includes(o.change?.type)));
 assert.deepEqual(compiled(w),plan);assert.equal(JSON.stringify(w),before);
});

test('T3 compiler unit: active roster includes transfers and excludes already departed/suspended/changed-class students',()=>{
 let w=probe();const original=[...n(w).classroom.studentIds],classId=n(w).classroom.id;
 w=change(w,'former-pupils',[leave(original[1]),leave(original[2],'suspended'),enter(classId)]);
 // One legal class change, leaving the original homeroom at 38.
 const younger=Object.values(n(w).registry.classes).find(c=>c.cohortStart===2026&&c.id!==classId);
 w=change(w,'change-away',[enter(younger.id,original[3],'change-class')]);
 const plan=compiled(w),ids=plan.archive.data.outcomes.map(o=>o.personId);
 assert.equal(ids.length,38);assert.ok(ids.includes(n(w).classroom.studentIds.at(-1)));
 for(const p of original.slice(1,4))assert.ok(!ids.includes(p));
 assert.equal(n(w).registry.cohorts[0].initialStudentIds.length,40);
 const {after,h}=materialize(w,plan);validateCohortArchive(after,h);
 assert.ok(n(after).registry.enrollments.some(e=>e.personId===original[3]&&e.until===null));
 assert.deepEqual(dueTransfers(n(after),'2029-07-01'),[]);
});

test('T3 internal adapter: causal receipts preserve people, academics, relationships, original identity and teacher employment',()=>{
 const w=probe(),plan=compiled(w),{after,h}=materialize(w,plan);
 assert.equal(n(after).classroom.id,n(w).classroom.id);assert.equal(n(after).classroom.studentIds.length,0);
 assert.equal(n(after).registry.academicYear,2028);assert.equal(n(after).registry.cohorts.length,1);
 for(const [personId,p] of Object.entries(n(w).people)){
  const expected=structuredClone(p);if(expected.kind==='student'&&n(w).classroom.studentIds.includes(personId))expected.roleIds=expected.roleIds.map(role=>role===11?18:role).sort((a,b)=>a-b);
  assert.deepEqual(n(after).people[personId],expected);
 }
 for(const field of ['families','careLinks','relationships','reputations','player','background'])assert.deepEqual(n(after)[field],n(w)[field]);
 assert.deepEqual(n(after).registry.cohorts,n(w).registry.cohorts);
 assert.ok(n(after).registry.assignments.find(a=>a.personId===w.identity.playerId&&a.roleId===9&&a.classId===h.data.classId).until);
 validateRegistry(n(after));
});

test('T3 internal adapter: same-date annual roster can be reconstructed by ordered receipts; no refill or failure records',()=>{
 const w=probe(),plan=compiled(w),{after,h}=materialize(w,plan),restored=beforeCohortCompletion(after,h);
 const capture=x=>captureAssessment(n(x),{id:'same-day-end',provenance:'formal',attemptId:w.identity.attemptId});
 assert.deepEqual(capture(restored),capture(w));
 assert.deepEqual(n(restored).classroom,n(w).classroom);assert.deepEqual(n(restored).registry.enrollments,n(w).registry.enrollments);
 assert.equal(enrollmentEligibility(n(after),{classId:n(after).classroom.id,personId:null,action:'transfer-in'}).reason,'completed-cohort');
 assert.equal(arrangeReplenishment(after,{id:'no-refill'},createSettlementSession(after.numeric)),null);assert.deepEqual(dueTransfers(n(after),after.position.date),[]);
 assert.equal(runtimeOf(after).history.some(h=>['annual-failure','homeroom-result'].includes(h.type)),false);
 assert.throws(()=>compiled(after),/already completed/);
 assert.throws(()=>restoreWorldState(after)); // harness is never a production terminal
});

test('T3 archive contract: ordered fact/qualification/leave replay rejects missing students, altered credits, duplicate and forged archives',()=>{
 const w=probe(),plan=compiled(w,false),{after,h,append}=materialize(w,plan);
 // Narrow validator contract only; full restore still rejects this probe's absent annual source.
 append('year-transition',{previousClassId:n(w).classroom.id});
 validateCohortArchive(after,h);
 assert.throws(()=>validateCohortCompletions(after),/verified annual/);
 for(const mutate of [
  x=>runtimeOf(x).history.find(s=>s.type==='cohort-completion').data.outcomes.pop(),
  x=>{const c=runtimeOf(x).history.find(s=>s.type==='cohort-completion'),p=c.data.outcomes.pop().personId;runtimeOf(x).facts.find(f=>f.id===c.factIds[0]).data.outcomes.pop();runtimeOf(x).facts.find(f=>f.id===c.factIds[0]).subjectIds.pop();runtimeOf(x).history=runtimeOf(x).history.filter(s=>!(s.type==='school'&&s.data.change.personId===p&&s.data.change.type==='school-leave'));},
  x=>runtimeOf(x).history.find(s=>s.type==='cohort-completion').data.outcomes[0].qualification.eligible=false,
  x=>runtimeOf(x).history.find(s=>s.type==='school'&&s.data.change.type==='school-leave').data.basisFactId='forged',
  x=>runtimeOf(x).history.push(structuredClone(h)),
  x=>runtimeOf(x).facts.find(f=>f.id===h.factIds[0]).data.outcomes[0].qualification.earned++,
 ]){const bad=structuredClone(after);mutate(bad);assert.throws(()=>{validateCohortArchive(bad,runtimeOf(bad).history.find(s=>s.type==='cohort-completion'));validateCohortCompletions(bad);});}
});

test('T3 domain transaction: no public half-completion or unsourced normal duty end; ordinary sub-38 protection is unchanged',()=>{
 let w=annualOpening({events:false,continuity:true});const before=JSON.stringify(w);
 assert.throws(()=>prepareWorldOperation(w,{...request(w,'half-completion',[{type:'complete-three-year-career'}]),calendarContext:{kind:'procedure'}}),/Unknown operation/);
 assert.throws(()=>prepareWorldOperation(w,{...request(w,'duty-end',[{type:'school',basisFactId:null,change:{type:'school-end-homeroom',classId:n(w).classroom.id,reason:'forged'}}]),calendarContext:{kind:'procedure'}}),/atomic completion transaction/);
 assert.equal(JSON.stringify(w),before);
 const raw=initial();assert.throws(()=>change(raw,'ordinary-mass-leave',n(raw).classroom.studentIds.slice(0,3).map(p=>leave(p))),/Sub-38/);
});

test('T3 legal-source integration: real opening and school activity cannot supply June success or bypass semester reviews',()=>{
 const f=foundationScenario(74);f.events=[];f.enrollments=[];
 const opening=startThreeYearSchoolCareer(f,{taipeiDate:'2026-11-05',difficulty:'normal',subject:'國文',seed:75});
 assert.throws(()=>compileThreeYearCohortCompletion(opening,id('operation','early')),/third playable/);
 const day=runAnnual(annualOpening({events:false}),{stopDate:'2026-07-20'}).world;
 assert.throws(()=>compileThreeYearCohortCompletion(day,id('operation','day')),/third playable/);
 assert.equal(runtimeOf(day).history.some(h=>h.type==='annual-success'),false);
 // Calendar-only third-year probe cannot become official completion.
 const w=structuredClone(opening);w.position.serviceYear=3;
 assert.throws(()=>compileThreeYearCohortCompletion(w,id('operation','no-success')),/verified annual success/);
 assert.throws(()=>restoreWorldState(w));
});


test('T3 30-year domain transaction probe: common leaves still feed school-year and new forty-person cohort, with duplicate-ID protection',()=>{
 let w=probe();const camp=new Date(yearData(2029).summerCamp+'T00:00:00Z');
 // Existing synthetic school calendar baseline, never a forged annual playthrough.
 w=baseline(w,new Date(camp.getTime()-86400000).toISOString().slice(0,10));
 const plan=compiled(w,false),operations=[...plan.operations,{type:'school',basisFactId:null,change:{type:'school-year',academicYear:2029}},{type:'school',basisFactId:null,change:{type:'school-cohort'}}];
 const q={...request(w,'cohort-probe',operations),calendarContext:{kind:'procedure'}};
 // Compiler IDs and command IDs deliberately coincide in the production path.
 const result=prepareWorldOperation(w,q),after=result.world;
 assert.equal(n(after).registry.academicYear,2029);assert.equal(n(after).registry.cohorts.length,2);assert.equal(n(after).classroom.studentIds.length,40);
 assert.ok(n(w).classroom.studentIds.every(p=>!n(after).classroom.studentIds.includes(p)&&n(after).people[p]));
 assert.equal(prepareWorldOperation(after,q).duplicate,true);
 assert.throws(()=>prepareWorldOperation(after,{...request(after,'different-completion',operations),calendarContext:{kind:'procedure'}}));
});


test('T4 terminal audit: a different assignment cannot disguise an early end of the opening homeroom duty',()=>{
 const w=probe(),{after,h}=materialize(w,compiled(w)),registry=n(after).registry;
 const original=registry.assignments.find(a=>a.personId===w.identity.playerId&&a.roleId===9&&a.classId===h.data.classId);
 after.extensions['teacher-hell/homeroom-continuity']={assignmentId:original.id};
 validateCohortArchive(after,h);
 registry.assignments.push({...original,id:'forged-substitute-duty'});original.until='2029-06-01';
 assert.throws(()=>validateCohortArchive(after,h),/actual dated assignment end/);
});

test('A1 cohort adapter: completion certificate and incomplete are distinct, without changing career lifecycle',()=>{
 let w=probe();const personId=n(w).classroom.studentIds[1],records=structuredClone(runtimeOf(w).facts.find(f=>f.data.type==='academic-recognition').data.records);
 let remaining=120;for(const c of records.toSorted((a,b)=>b.credits-a.credits)){c.earned=c.credits<=remaining?c.credits:0;c.mark=c.earned?80:35;remaining-=c.earned;}assert.equal(remaining,0);
 const source=sourceFact(w,{type:'academic-recognition',records},[personId]);w=source.world;w=prepareWorldOperation(w,{...request(w,'a1-completion-certificate',[{type:'academic',action:'recognize',personId,records,basisFactId:source.fact.id}]),calendarContext:{kind:'procedure'}}).world;
 const q=readAcademicQualification(w,personId);assert.equal(q.earned,120);assert.equal(q.eligible,false);assert.equal(q.certificateEligible,true);
 const plan=compiled(w),leaves=plan.operations.filter(o=>o.type==='school'&&o.change.type==='school-leave');assert.equal(leaves.filter(o=>o.change.status==='graduated').length,1);assert.equal(leaves.filter(o=>o.change.status==='course-completed').length,1);assert.equal(leaves.filter(o=>o.change.status==='incomplete').length,38);assert.equal(leaves.filter(o=>o.change.status==='delayed').length,0);
 const {after,h}=materialize(w,plan);validateCohortArchive(after,h);assert.equal(n(after).registry.academicYear,2028);assert.equal(n(after).registry.cohorts.length,1);
});
