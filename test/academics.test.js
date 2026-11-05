import test from 'node:test';
import assert from 'node:assert/strict';
import { semesterScore,score,standard,rulesFor,ranks,curriculum,graduation } from '../src/academics/rules.js';
import { createLearner,academicMark,emptyAcademics,openTerm,assess,closeTerm,ranking } from '../src/academics/learning.js';
import { canonicalData } from '../src/changes/settlement.js';
import { createRandom } from '../src/numeric/random.js';
import { createId } from '../src/contracts/foundation.js';
import { prepareWorldOperation,forkWorldAttempt } from '../src/runtime/transactions.js';
import { academicState,readGrades,readRankings,readAcademicQualification } from '../src/runtime/academics.js';
import { schoolActions } from '../src/runtime/campus.js';
import { restoreWorldState,runtimeOf } from '../src/runtime/model.js';
import { createSave,encodeSave,restoreSave } from '../src/storage/format.js';
import { buildEventCandidates } from '../src/runtime/event-candidates.js';
import { definition } from './support/event-fixtures.js';
import { semester,calendarDay } from '../src/calendar/calendar.js';
import { request,event,fact,open } from './support/runtime.js';
import { academicWorld,applySchool,academicBaseline,academicCause,completeAcademic,academicStoryRoute } from './support/academic-scenario.js';

test('academics: exact 40/20/20/20, one decimal and bounded scores',()=>{assert.equal(semesterScore(90,[10,20,30]),48);assert.equal(semesterScore(66.6,[77.7,88.8,99.9]),80);assert.equal(score(-10),0);assert.equal(score(110),100);assert.throws(()=>semesterScore(100,[20,30]));});
test('academics: independent subject baselines, stable ordinary marks and persistent event state',()=>{const rng=createRandom(1),s=createLearner(rng),baseline=s.subjects.國文.baseline;assert.ok(new Set(Object.values(s.subjects).map(x=>x.baseline)).size>8);const marks=Array.from({length:20},()=>academicMark(s,'國文',0,rng,true));assert.ok(Math.max(...marks)-Math.min(...marks)<=4);s.subjects.國文.state=0;assert.ok(academicMark(s,'國文',0,createRandom(5),true)<academicMark({...s,subjects:{...s.subjects,國文:{...s.subjects.國文,state:100}}},'國文',0,createRandom(5),true));assert.equal(s.subjects.國文.baseline,baseline);});
test('academics: full class, shared paper, objective sums and dynamic lightweight rank population',()=>{const s=emptyAcademics(),rng=createRandom(41);openTerm(s,{termId:'a',year:2026,grade:1,roster:Array.from({length:40},(_,i)=>({id:'e'+i,personId:'p'+i,classId:'home'})),classes:[{id:'home',size:40},{id:'other',size:23},{id:'third',size:31}],offered:null},rng);for(const round of [0,1,2,3])assess(s,{termId:'a',round,activeIds:Object.keys(s.students)},rng);closeTerm(s,{termId:'a'});const t=s.terms.a,rows=ranking(t);assert.equal(t.light.length,54);assert.equal(rows[0].gradePopulation,94);assert.equal(rows[0].classPopulation,40);assert.ok(rows[0].total>100);assert.ok(t.assessments.every(a=>a.marks.every(m=>Object.keys(m.marks).length===15)));assert.deepEqual(ranks([{id:'a',total:5},{id:'b',total:5},{id:'c',total:2}]).map(r=>r.rank),[1,1,3]);assert.equal(ranking(t,'semester',['p1']).find(r=>r.id==='p1').gradePopulation,55);});
test('academics: current thresholds, legacy assumptions, special standards and credit deduplication',()=>{assert.equal(rulesFor(2026).id,rulesFor(2065).id);assert.equal(rulesFor(2030).graduationCredits,150);assert.equal(rulesFor(2030,1).graduationCredits,152);assert.equal(standard(rulesFor(2026),'special',1).pass,40);assert.equal(standard(rulesFor(2026),'special',3).pass,60);assert.ok(curriculum(1,'science',null,null,2,'spring').some(c=>c.subject==='地球科學'));assert.ok(!curriculum(3,'science').some(c=>c.subject==='歷史'));assert.equal(curriculum(3,'science',null,{subject:'數學',periods:6}).find(c=>c.subject==='數學A').credits,4);assert.ok(curriculum(3,'science',null,{subject:'歷史',periods:3}).some(c=>c.subject==='歷史'&&c.credits===3));const records=[1,2,3].flatMap(level=>['autumn','spring'].flatMap(half=>curriculum(level,'science',null,null,2,half).map(c=>({...c,level,half,earned:c.credits}))));assert.equal(graduation(records,rulesFor(2026)).eligible,true);assert.equal(graduation([...records,...records],rulesFor(2026)).earned,graduation(records,rulesFor(2026)).earned);assert.equal(graduation(records.map(r=>({...r,earned:0})),rulesFor(2026)).repeatEligible,true);});
test('academics: production term, four assessments, queries consume no RNG and save roundtrip',()=>{const w=completeAcademic(),id=w.numeric.evolution.world.classroom.studentIds[0],before=JSON.stringify(w),g=readGrades(w,id,'2026:autumn');assert.equal(g.assessments.length,4);assert.equal(g.semester.courses.length,15);assert.equal(readRankings(w,'2026:autumn').length,400);const d=definition('academic-makeup-gate');d.eligibility.academic=[{kind:'makeup',termId:'2026:autumn'}];const candidates=buildEventCandidates(w,[d],{engineering:true}).candidates,expected=academicState(w).terms['2026:autumn'].results.filter(row=>row.courses?.some(c=>c.mark>=40&&c.mark<60));assert.equal(candidates.length,expected.length);assert.ok(candidates.every(c=>expected.some(row=>row.id===c.participantIds[0])));assert.equal(JSON.stringify(w),before);assert.deepEqual(restoreSave(encodeSave(createSave(w))).world,w);assert.equal(readAcademicQualification(w,id).complete,false);});
test('academics: event consequence has precise causal authorization, persists, deduplicates and rolls back',()=>{let w=academicWorld(),personId=w.numeric.evolution.world.classroom.studentIds[0],c=academicCause(w,personId,'國文',-25);w=c.world;const op={type:'academic',action:'influence',personId,subject:'國文',delta:-25,basisFactId:c.id},q={...request(w,'causal-learning',[op]),calendarContext:{kind:'routine'}},out=prepareWorldOperation(w,q);assert.equal(academicState(out.world).students[personId].subjects.國文.state,score(academicState(w).students[personId].subjects.國文.state-25));assert.equal(prepareWorldOperation(out.world,q).duplicate,true);assert.throws(()=>applySchool(out.world,[op]),/already applied/);assert.throws(()=>applySchool(w,[{...op,delta:25}]),/precise/);const bad=structuredClone(out.world);runtimeOf(bad).history.findLast(h=>h.type==='academic').data.result.after=99;assert.throws(()=>restoreWorldState(bad),/replay mismatch/);const forged=structuredClone(out.world),h=runtimeOf(forged).history.findLast(h=>h.type==='academic');h.data.operation.delta=25;h.data.input.delta=25;h.data.result.after=score(h.data.result.before+25);const owner=runtimeOf(forged).commits.find(c=>c.id===h.operationId),payload=JSON.parse(owner.request);payload.operations[0].delta=25;owner.request=canonicalData(payload);assert.throws(()=>restoreWorldState(forged),/source|ownership|differs/);});
test('academics: makeup eligibility and failure path are real recorded operations',()=>{let w=completeAcademic(3),t=academicState(w).terms['2026:autumn'],eligible=t.results.flatMap(row=>(row.courses??[]).filter(c=>c.makeupEligible).map(c=>({personId:row.id,subject:c.subject}))).find(x=>academicState(w).students[x.personId]);assert.ok(eligible);w=academicBaseline(w,'2027-01-24',calendarDay('2027-01-24',1).slots.at(-1).id);w=applySchool(w,[{type:'academic',action:'makeup',termId:t.termId,...eligible}]);const c=readGrades(w,eligible.personId,t.termId).semester.courses.find(c=>c.subject===eligible.subject);assert.ok(c.makeup);assert.equal(c.earned,c.makeup.mark>=60?c.credits:0);assert.throws(()=>applySchool(w,[{type:'academic',action:'makeup',termId:t.termId,...eligible}]),/already|missing/);const passed=t.results.find(r=>academicState(w).students[r.id]&&r.courses.some(c=>c.earned>0));assert.throws(()=>applySchool(w,[{type:'academic',action:'makeup',termId:t.termId,personId:passed.id,subject:passed.courses.find(c=>c.earned).subject}]),/credit/);});
test('campus: legal early choice completes outcome/N6 and advances exactly once',()=>{let w=academicWorld(),q={...request(w,'first-day-action',[{type:'school-action',activity:'class-talk'}]),calendarContext:{kind:'routine'}},out=prepareWorldOperation(w,q);assert.equal(out.world.position.slotId,'p1');assert.ok(out.world.numeric.receipts.length>0);assert.equal(prepareWorldOperation(out.world,q).duplicate,true);assert.throws(()=>applySchool(w,[{type:'school-action',activity:'private-life'}]),/legal/);assert.deepEqual(restoreWorldState(JSON.stringify(out.world)),out.world);const reset=forkWorldAttempt(out.world,{attemptId:createId('attempt',['campus-retry']),seeds:{settlement:9,streams:Object.fromEntries(Object.keys(out.world.random).map((k,i)=>[k,10+i]))}});const choices=schoolActions(reset),resumed=applySchool(reset,[{type:'school-action',activity:choices.includes('automatic')?'automatic':'prepare'}]);assert.equal(resumed.identity.attemptId,reset.identity.attemptId);});
test('campus: protected normal activity replaces teaching and records one result per slot',()=>{const date='2026-09-05';let w=academicWorld(74,date,'morning');assert.equal(calendarDay(date,1).slots[0].protected,true);w=applySchool(w,[{type:'campus',activity:'automatic'}]);assert.ok(runtimeOf(w).history.some(h=>h.type==='campus'));assert.throws(()=>applySchool(w,[{type:'campus',activity:'automatic'}]),/already/);assert.equal(schoolActions(w)[0],'automatic');});

test('academics: annual average uses better original/makeup but never retake marks; one award only',async()=>{
 const {applyAcademic}=await import('../src/runtime/academics.js'),s=emptyAcademics(1),rng=createRandom(81);s.students.p=createLearner(rng);
 const c={subject:'國文',credits:4,required:true,mark:45,earned:0,makeupEligible:true,method:'unearned',makeup:{mark:70},retake:{mark:99}};
 s.terms['2026:autumn']={year:2026,grade:1,closed:true,results:[{id:'p',courses:[structuredClone(c)]}]};s.terms['2027:spring']={year:2026,grade:1,closed:true,results:[{id:'p',courses:[{...c,mark:60,earned:4,makeup:{mark:50}}]}]};
 const out=applyAcademic(s,{action:'annual-credit',termId:'2027:spring',personId:'p',subject:'國文',date:'2027-06-30'},rng);assert.equal(out.average,60);assert.equal(out.earned,4);assert.equal(out.autumnEarned,4);assert.throws(()=>applyAcademic(s,{action:'annual-credit',termId:'2027:spring',personId:'p',subject:'國文',date:'2027-06-30'},rng));
});
test('academics legacy v1: elapsed study plan and failed retake remain readable',async()=>{
 const {applyAcademic}=await import('../src/runtime/academics.js'),s=emptyAcademics(1),rng=createRandom(91);s.students.p=createLearner(rng,1);s.students.p.subjects.國文.baseline=0;s.students.p.subjects.國文.state=0;
 s.terms.t={year:2026,grade:1,closed:true,results:[{id:'p',courses:[{subject:'國文',credits:4,mark:20,earned:0}]}]};const base={termId:'t',personId:'p',subject:'國文'};
 applyAcademic(s,{...base,action:'retake-plan',date:'2027-01-25'},rng);assert.throws(()=>applyAcademic(s,{...base,action:'retake',date:'2027-01-26'},rng),/incomplete/);const out=applyAcademic(s,{...base,action:'retake',date:'2027-02-01'},rng);assert.equal(out.earned,0);assert.ok(out.retake.mark<60);
});
test('academics: admissions need chronological entrance node, can fail and retain nonuniversity routes',async()=>{
 const {applyAcademic}=await import('../src/runtime/academics.js'),s=emptyAcademics(),rng=createRandom(31);s.students.p=createLearner(rng);s.students.p.aspiration='work';s.terms.t={year:2028,grade:3,results:[{id:'p',courses:[{subject:'國文',mark:30}]}]};const input={termId:'t',personId:'p',date:'2029-01-20'};
 assert.throws(()=>applyAcademic(s,{...input,action:'admission',node:'stars'},rng),/entrance/);applyAcademic(s,{...input,action:'admission',node:'gsat'},rng);const a=applyAcademic(s,{...input,action:'admission',node:'application'},rng);assert.equal(a.accepted,false);assert.equal(a.path,'work');assert.equal(standard(rulesFor(2026),'athlete',2).pass,40);assert.equal(standard(rulesFor(2026),'skill',3).pass,60);assert.equal(standard(rulesFor(2026),'special',3).makeup,40);
});
test('academics: transfer/suspension preserves person baseline and enrollment provenance, excludes missing marks',async()=>{
 const {applyAcademic}=await import('../src/runtime/academics.js'),s=emptyAcademics(),rng=createRandom(31),input={termId:'t',year:2026,grade:1,roster:[{id:'first',personId:'p',classId:'home'}],classes:[{id:'home',size:1}],offered:null};openTerm(s,input,rng);const baseline=structuredClone(s.students.p);
 assess(s,{termId:'t',round:1,activeIds:['p']},rng);const progressed=structuredClone(s.students.p);applyAcademic(s,{...input,action:'sync',roster:[{id:'returned',personId:'p',classId:'home'},{id:'transfer',personId:'q',classId:'home'}]},rng);assert.deepEqual(s.students.p,progressed);assert.deepEqual(Object.fromEntries(Object.entries(s.students.p.subjects).map(([k,v])=>[k,v.baseline])),Object.fromEntries(Object.entries(baseline.subjects).map(([k,v])=>[k,v.baseline])));assert.equal(s.terms.t.rows[0].enrollmentId,'returned');
 for(const round of [2,3,0])assess(s,{termId:'t',round,activeIds:['q']},rng);closeTerm(s,{termId:'t'});assert.equal(s.terms.t.results.length,0); // neither has a complete set; never invent prior-school marks
});
test('campus: lunch has no activity menu and normal teaching preserves the eighteen-lesson table',async()=>{
 let w=academicWorld(74,'2026-07-20','lunch');assert.deepEqual(schoolActions(w),['automatic']);assert.equal(runtimeOf(w).plan.tables[0].lessons.length,18);assert.throws(()=>applySchool(w,[{type:'school-action',activity:'rest'}]),/legal/);
 w=applySchool(w,[{type:'school-action',activity:'automatic'}]);assert.equal(w.position.slotId,'noon');assert.equal(runtimeOf(w).plan.tables[0].lessons.length,18);
});
test('academics: publishing a real transcript grants only teacher/student knowledge and restores identically',()=>{
 let w=completeAcademic(74),personId=w.numeric.evolution.world.classroom.studentIds[0];w=applySchool(w,[{type:'academic',action:'publish',termId:'2026:autumn',personId}]);const report=runtimeOf(w).facts.find(f=>f.data.type==='academic-report');assert.ok(report);const knowers=runtimeOf(w).knowledge.filter(k=>k.factId===report.id).map(k=>k.actorId);assert.deepEqual(new Set(knowers),new Set([w.identity.playerId,personId]));assert.deepEqual(restoreWorldState(JSON.stringify(w)),w);assert.throws(()=>applySchool(w,[{type:'academic',action:'publish',termId:'2026:autumn',personId}]),/already/);
});
test('campus: long vacation requires formal event check, clips boundaries and restores its direction',async()=>{
 const {nextVacationOperation}=await import('../src/runtime/schedule.js');let w=academicWorld(74,'2026-08-17','vacation-day');w=applySchool(w,[{type:'plan-vacation',id:'school-vacation-test',weeks:2,direction:'private-life'}]);const driver=nextVacationOperation(w);assert.equal(driver.status,'event-draw-required');assert.equal(driver.direction,'private-life');assert.equal(runtimeOf(w).plan.vacation.endDate,'2026-08-23');const saved=restoreWorldState(JSON.stringify(w));assert.deepEqual(nextVacationOperation(saved),driver);assert.throws(()=>applySchool(academicWorld(),[{type:'plan-vacation',id:'illegal-camp',weeks:1,direction:'rest'}]),/unavailable/);
});
test('academics: individual verified standards and absence counts remain objective, not personality',async()=>{
 const {applyAcademic}=await import('../src/runtime/academics.js'),s=emptyAcademics(),rng=createRandom(9);openTerm(s,{termId:'t',year:2026,grade:1,roster:[{id:'enrolled',personId:'p',classId:'h'}],classes:[{id:'h',size:1}],offered:null},rng);const baseline=s.students.p.subjects.國文.baseline;
 applyAcademic(s,{action:'standard',termId:'t',personId:'p',status:{kind:'individual-plan',pass:45,makeup:30}},rng);applyAcademic(s,{action:'attendance',termId:'t',personId:'p',subject:'國文',attendance:{totalPeriods:72,unexcused:24,personal:0,exemptPersonal:0}},rng);for(const round of [0,1,2,3])assess(s,{termId:'t',round,activeIds:['p']},rng);closeTerm(s,{termId:'t'});assert.equal(s.terms.t.results[0].courses.find(c=>c.subject==='國文').mark,0);assert.equal(s.students.p.subjects.國文.baseline,baseline);assert.equal(standard(rulesFor(2026),s.students.p.status,1).pass,45);
 let w=academicWorld(),personId=w.numeric.evolution.world.classroom.studentIds[0],e=event(w,'verified-plan'),status={kind:'individual-plan',pass:45,makeup:30};e.definitionId='procedure:assessment-plan';const f=fact(e,'verified-plan',{data:{type:'academic-standard',personId,status}});w=prepareWorldOperation(w,{...request(w,'verified-plan-source',[open(e),f]),calendarContext:{kind:'procedure'}}).world;w=applySchool(w,[{type:'academic',action:'standard',personId,status,basisFactId:f.id}]);assert.deepEqual(academicState(w).students[personId].status,status);const projection=academicState(w);projection.students[personId].status.pass=99;assert.equal(academicState(w).students[personId].status.pass,45);
});
test('academics: real school transfer keeps a same-grade pupil in the actual ranking population',async()=>{
 let w=academicWorld(),personId=w.numeric.evolution.world.classroom.studentIds[0],cause=academicCause(w,personId,'國文',0,'transfer-basis');w=cause.world;
 const registry=w.numeric.evolution.world.registry,other=Object.values(registry.classes).find(c=>c.cohortStart===2026&&c.id!==registry.homeClassId),q={...request(w,'actual-same-grade-transfer',[{type:'school',basisFactId:cause.id,change:{type:'school-enroll',classId:other.id,personId,action:'change-class',source:'actual same-school transfer'}}]),calendarContext:{kind:'procedure'}};
 w=prepareWorldOperation(w,q).world;assert.equal(w.numeric.evolution.world.classroom.studentIds.length,39);assert.equal(academicState(w).terms['2026:autumn'].rows.find(r=>r.id===personId).classId,other.id);
 w=academicBaseline(w,semester('2026:autumn').exams[0].at(-1));w=applySchool(w,[{type:'academic',action:'assess',termId:'2026:autumn',round:1}]);const ranks=readRankings(w,'2026:autumn',1);assert.equal(ranks.length,400);assert.equal(ranks.find(r=>r.id===personId).classPopulation,41);assert.equal(ranks.find(r=>r.id===personId).gradePopulation,400);
});

test('academics: confirmed 07 story drives persistent learning through the 06 selected event',async()=>{const a=await academicStoryRoute(74,'listen'),b=await academicStoryRoute(74,'angry');assert.equal(a.personId,b.personId);assert.equal(academicState(a.world).students[a.personId].subjects.國文.state-academicState(b.world).students[b.personId].subjects.國文.state,25);assert.ok(runtimeOf(b.world).history.some(h=>h.type==='choice'&&h.eventId===b.eventId&&h.data.optionId==='angry'));assert.deepEqual(restoreWorldState(JSON.stringify(b.world)),b.world);const date=semester('2026:autumn').exams[0].at(-1),exam=w=>applySchool(academicBaseline(w,date),[{type:'academic',action:'assess',termId:'2026:autumn',round:1}]),aw=exam(a.world),bw=exam(b.world);assert.ok(readGrades(aw,a.personId,'2026:autumn').assessments[0].marks.國文>readGrades(bw,b.personId,'2026:autumn').assessments[0].marks.國文);});

// A1 fixed academic facts only. No game/calendar driver, year or event simulation.
const a1Records=()=>[1,2,3].flatMap(level=>['autumn','spring'].flatMap(half=>curriculum(level,'science',null,null,2,half).map(c=>({...c,level,half,mark:80,earned:c.credits}))));
function removeCredits(rows,required,credits){for(const r of [...rows].sort((a,b)=>b.credits-a.credits))if(r.required===required&&r.earned&&r.credits<=credits){r.earned=0;r.mark=35;credits-=r.credits;}assert.equal(credits,0,'fixture exact credit removal');return rows;}
for(const [name,alter,expected] of [
 ['all courses pass',r=>r,{earned:182,requiredEarned:126,electiveEarned:56,eligible:true}],
 ['one failed compulsory is not a veto',r=>removeCredits(r,true,4),{earned:178,eligible:true}],
 ['total short while category minima met',r=>removeCredits(removeCredits(r,true,24),false,16),{earned:142,eligible:false,reasons:['total-credits']}],
 ['compulsory short only',r=>removeCredits(r,true,25),{earned:157,eligible:false,reasons:['required-credits']}],
 ['elective short only',r=>removeCredits(r,false,18),{earned:164,eligible:false,reasons:['elective-credits']}],
 ['completion certificate at exactly 120',r=>removeCredits(removeCredits(r,true,36),false,26),{earned:120,certificateEligible:true,status:'completion-certificate'}],
 ['below completion certificate minimum',r=>removeCredits(removeCredits(r,true,37),false,26),{earned:119,certificateEligible:false,status:'incomplete'}],
 ['elective boundary exactly 40',r=>removeCredits(removeCredits(r,true,16),false,16),{earned:150,electiveEarned:40,eligible:true}],
 ['graduation boundary 150 with 102 required',r=>removeCredits(removeCredits(r,true,24),false,8),{earned:150,requiredEarned:102,electiveEarned:48,eligible:true}],
])test('A1 qualification: '+name,()=>{const q=graduation(alter(a1Records()),rulesFor(2026));for(const [key,value] of Object.entries(expected))assert.deepEqual(q[key],value);assert.equal(q.complete,true);assert.deepEqual(graduation([...alter(a1Records()),...alter(a1Records())],rulesFor(2026)),q);});

test('A1 qualification: missing compulsory course is study deficit, not failed-credit veto or automatic extension',()=>{
 const rows=a1Records().filter(c=>!(c.level===1&&c.half==='autumn'&&c.subject==='本土語文'));rows.push({subject:'其他選修',level:1,half:'autumn',credits:1,required:false,mark:80,earned:1});
 const q=graduation(rows,rulesFor(2026));assert.equal(q.offered,182);assert.equal(q.earned,182);assert.equal(q.complete,false);assert.equal(q.certificateEligible,false);assert.ok(q.reasons.includes('unattended-compulsory'));assert.equal(q.missingRequired.length,1);
 const conduct=graduation(a1Records(),rulesFor(2026),{netMajorDemerits:3});assert.equal(conduct.eligible,false);assert.equal(conduct.certificateEligible,true);assert.deepEqual(conduct.reasons,['conduct']);assert.equal(graduation(a1Records(),rulesFor(2026),{netMajorDemerits:2}).eligible,true);
});

async function a1Course({mark=45,mastery=95,participation=65}={}){
 const {applyAcademic}=await import('../src/runtime/academics.js'),s=emptyAcademics(),rng=createRandom(1234);s.students.p=createLearner(rng);Object.assign(s.students.p.subjects.國文,{mastery,state:65,participation,attendance:100});
 const course={subject:'國文',credits:4,required:true,originalMark:mark,mark,registered:mark,earned:0,makeupEligible:mark>=40,method:'unearned',thresholds:{pass:60,makeup:40}};
 s.terms['2026:autumn']={termId:'2026:autumn',year:2026,grade:1,closed:true,closedAt:'2027-01-22',supportPrepared:true,results:[{id:'p',courses:[course]}]};
 return {s,rng,course,applyAcademic,op:{termId:'2026:autumn',personId:'p',subject:'國文'}};
}

test('A1 makeup: later actual exam, pass registration capped, original kept, failure not guaranteed away',async()=>{
 const {s,rng,course,op,applyAcademic}=await a1Course();assert.throws(()=>applyAcademic(s,{...op,action:'makeup',date:'2027-01-22'},rng),/calendar/);
 applyAcademic(s,{...op,action:'makeup',date:'2027-01-24'},rng);assert.equal(course.earned,4);assert.equal(course.mark,60);assert.equal(course.registered,60);assert.equal(course.originalMark,45);assert.equal(s.terms[op.termId].results[0].average,60);assert.throws(()=>applyAcademic(s,{...op,action:'makeup',date:'2027-01-25'},rng));
 const weak=await a1Course({mastery:20});weak.applyAcademic(weak.s,{...weak.op,action:'makeup',date:'2027-01-24'},weak.rng);assert.equal(weak.course.earned,0);assert.equal(weak.course.mark,45);
});

test('A1 retake: recorded shared daily hours, no credit from elapsed days alone, pass after actual instruction',async()=>{
 const {academicSupport}=await import('../src/runtime/academics.js'),x=await a1Course({mastery:58,participation:100});const fixed={next:()=>.5};
 x.applyAcademic(x.s,{...x.op,action:'makeup',date:'2027-01-24'},fixed);assert.equal(x.course.earned,0);
 x.applyAcademic(x.s,{...x.op,action:'retake-plan',date:'2027-01-24'},fixed);
 assert.throws(()=>x.applyAcademic(x.s,{...x.op,action:'retake',date:'2027-03-01'},fixed),/incomplete/);
 for(const date of ['2027-01-25','2027-01-26','2027-01-27','2027-01-28','2027-01-29','2027-02-01']){const result=academicSupport(x.s,{termId:x.op.termId,date},fixed);assert.ok(result.study.reduce((n,r)=>n+r.periods,0)<=2);}
 assert.equal(x.course.retakePlan.studiedPeriods,12);assert.equal(x.course.earned,4);assert.equal(x.course.mark,60);assert.equal(x.course.originalMark,45);assert.throws(()=>x.applyAcademic(x.s,{...x.op,action:'retake',date:'2027-02-02'},fixed));
 const rs=[{...x.course,level:1,half:'autumn'}];assert.equal(graduation([...rs,...rs],rulesFor(2026)).earned,4);
});

test('A1 annual average: unequal term credits allowed, excludes retake raw score and preserves failed semester mark',async()=>{
 const x=await a1Course({mark:45});x.s.terms['2027:spring']={termId:'2027:spring',year:2026,grade:1,closed:true,closedAt:'2027-06-25',results:[{id:'p',courses:[{...x.course,credits:2,mark:80,originalMark:80,earned:2}]}]};
 x.course.retake={mark:99,registered:60,date:'2027-03-01'};x.course.mark=60;
 const result=x.applyAcademic(x.s,{action:'annual-credit',termId:'2027:spring',personId:'p',subject:'國文',date:'2027-06-25'},x.rng);assert.equal(result.average,62.5);assert.equal(x.course.earned,4);assert.equal(x.course.originalMark,45);assert.equal(x.course.mark,60);assert.equal(x.course.method,'annual-average');assert.throws(()=>x.applyAcademic(x.s,{action:'annual-credit',termId:'2027:spring',personId:'p',subject:'國文',date:'2027-06-25'},x.rng));
});

test('A1 absence: one-third unexcused/personal makes zero; approved excluded absence does not',async()=>{
 const {applyAcademic}=await import('../src/runtime/academics.js');
 for(const exempt of [0,24]){const s=emptyAcademics(),rng=createRandom(99),termId='2026:autumn';openTerm(s,{termId,year:2026,grade:1,roster:[{id:'e',personId:'p',classId:'h'}],classes:[{id:'h',size:1}],offered:null},rng);Object.assign(s.students.p.subjects.國文,{mastery:95,state:95,participation:95});
 applyAcademic(s,{action:'attendance',termId,personId:'p',subject:'國文',attendance:{totalPeriods:72,unexcused:0,personal:24,exemptPersonal:exempt}},rng);for(const round of [0,1,2,3])assess(s,{termId,round,activeIds:['p']},rng);closeTerm(s,{termId,date:'2027-01-22'});const c=s.terms[termId].results[0].courses.find(c=>c.subject==='國文');assert.equal(c.mark===0,exempt===0);assert.equal(c.earned>0,exempt>0);}
});

test('A1 supplementary course: missing past course needs review, six hours/credit, actual registered mark and no duplicates',async()=>{
 const {applyAcademic,academicSupport}=await import('../src/runtime/academics.js'),s=emptyAcademics(),rng=createRandom(9),termId='2027:autumn';s.students.p=createLearner(rng);Object.assign(s.students.p.subjects.本土語文,{mastery:95,state:95,participation:95});s.terms[termId]={termId,year:2027,grade:2,closed:false,rows:[{id:'p',courses:[]}],results:[]};
 const course={subject:'本土語文',level:1,half:'autumn',credits:1,required:true},input={action:'supplement-plan',personId:'p',termId,course,basisFactId:'review:1',date:'2027-09-01'};applyAcademic(s,input,rng);
 assert.throws(()=>applyAcademic(s,{action:'supplement',personId:'p',subject:course.subject,termId,date:'2028-01-01'},rng),/incomplete/);
 for(const date of ['2027-09-02','2027-09-03','2027-09-06'])academicSupport(s,{termId,date},rng);
 const c=s.supplements[0];assert.equal(c.plan.studiedPeriods,6);assert.equal(c.completed,true);assert.equal(c.earned,1);assert.ok(c.mark>60);assert.equal(c.registered,c.mark);assert.throws(()=>applyAcademic(s,input,rng),/retake/);
 assert.throws(()=>applyAcademic(s,{action:'recognize',personId:'p',termId,records:[{...course,mark:20,earned:1}],basisFactId:'forged'},rng),/disagree/);
});

test('A1 recovery rounding: registration 60 always grants credit, 59 does not',async()=>{
 for(const [mastery,expected] of [[59.6,60],[59.4,59]]){const x=await a1Course({mastery});x.applyAcademic(x.s,{...x.op,action:'makeup',date:'2027-01-24'},{next:()=>.5});assert.equal(x.course.mark,expected);assert.equal(x.course.earned,expected>=60?4:0);assert.equal(x.course.makeup.rawScore,mastery);}
});

test('A1 support: expired makeup is not invented later, withdrawal receives no new credits, repeat support is rejected',async()=>{
 const {academicSupport}=await import('../src/runtime/academics.js'),x=await a1Course();x.course.makeupDue='2027-01-24';
 const out=academicSupport(x.s,{termId:x.op.termId,date:'2027-03-01'},x.rng);assert.equal(out.makeups.length,0);assert.equal(x.course.makeupExpired,true);assert.equal(x.course.earned,0);assert.throws(()=>academicSupport(x.s,{termId:x.op.termId,date:'2027-03-01'},x.rng),/duplicate/);
 const y=await a1Course();y.course.makeupDue='2027-01-24';assert.throws(()=>academicSupport(y.s,{termId:y.op.termId,date:'2027-01-25',activeIds:[]},y.rng),/no due/);assert.equal(y.course.earned,0);
});

test('A1 qualification: six recorded semesters never override an unexpired study period',()=>{
 const q=graduation(a1Records(),rulesFor(2026),{studyPeriodComplete:false});assert.equal(q.eligible,false);assert.equal(q.certificateEligible,false);assert.deepEqual(q.reasons,['study-period']);
});

test('A1 compatibility: pinned S2 one-semester v1 payload restores byte-exact and retry retains its policy',async()=>{
 const {createHash}=await import('node:crypto'),{restoreRandom}=await import('../src/numeric/random.js'),{applyAcademic,academicVersion}=await import('../src/runtime/academics.js'),{eventWorld}=await import('./support/event-fixtures.js');
 let w=academicWorld(74),d=runtimeOf(w).history.find(h=>h.type==='academic').data;d.version=1;
 const rng=restoreRandom(d.randomBefore);d.result=applyAcademic(emptyAcademics(1),structuredClone(d.input),rng,1);d.randomAfter=rng.snapshot();w.random.academics=rng.snapshot();w=restoreWorldState(w);
 const meta=semester('2026:autumn');for(const round of [1,2,3,0]){w=academicBaseline(w,meta.exams[round===0?2:round-1].at(-1));w=applySchool(w,[{type:'academic',action:'assess',termId:meta.id,round}]);}w=applySchool(w,[{type:'academic',action:'close',termId:meta.id}]);
 const text=encodeSave(createSave(w));assert.equal(createHash('sha256').update(text).digest('hex'),'66b2aad8e9e98a0858ae99f50b74a32a6e6d5c8307fb2cffa919f93928e392e6','Exact old S2 completeAcademic(74), not a T4 three-year source');assert.equal(encodeSave(restoreSave(text)),text);
 const initial=eventWorld(74),retried=forkWorldAttempt(initial,{attemptId:createId('attempt',['a1-old-policy-retry']),seeds:{settlement:9,streams:Object.fromEntries(Object.keys(initial.random).map((k,i)=>[k,i+10]))}},w);
 assert.equal(academicVersion(retried),1);const resumed=applySchool(retried,[{type:'academic',action:'open',termId:'2026:autumn'}]);assert.equal(runtimeOf(resumed).history.find(h=>h.type==='academic').data.version,1);assert.deepEqual(restoreSave(encodeSave(createSave(resumed))).world,resumed);
 const tampered=structuredClone(retried);runtimeOf(tampered).history.findLast(h=>h.type==='retry').data.academicPolicy=2;assert.throws(()=>restoreWorldState(tampered),/policy/);
});

test('A1 normal end-slot: academic support is journaled automatically; final-day makeup remains pending',()=>{
 let w=academicWorld(74);const meta=semester('2026:autumn');for(const round of [1,2,3,0]){w=academicBaseline(w,meta.exams[round===0?2:round-1].at(-1));w=applySchool(w,[{type:'academic',action:'assess',termId:meta.id,round}]);}w=applySchool(w,[{type:'school-action',activity:'rest'}]);
 const support=runtimeOf(w).history.find(h=>h.type==='academic'&&h.data.input.action==='support');assert.ok(support);assert.equal(support.data.input.date,'2027-01-22');assert.equal(support.data.result.makeups.length,0);
 w=academicBaseline(w,'2027-01-24',calendarDay('2027-01-24',1).slots.at(-1).id);w=applySchool(w,[{type:'campus',activity:'rest'},{type:'finish-slot',completedActivityIds:[]}]);
 const later=runtimeOf(w).history.findLast(h=>h.type==='academic'&&h.data.input.action==='support');assert.equal(later.data.input.date,'2027-01-24');assert.ok(later.data.result.makeups.length>0);assert.deepEqual(restoreSave(encodeSave(createSave(w))).world,w);
});

test('A1 retake: later-semester applications preserve prior failed attempts and plans',async()=>{
 const {academicSupport}=await import('../src/runtime/academics.js'),x=await a1Course({mastery:20,participation:100}),fixed={next:()=>.5};x.course.makeupEligible=false;
 x.applyAcademic(x.s,{...x.op,action:'retake-plan',date:'2027-01-24'},fixed);for(const date of ['2027-01-25','2027-01-26','2027-01-27','2027-01-28','2027-01-29','2027-02-01'])academicSupport(x.s,{termId:x.op.termId,date},fixed);
 assert.equal(x.course.earned,0);assert.ok(x.course.retake);assert.throws(()=>x.applyAcademic(x.s,{...x.op,action:'retake-plan',date:'2027-02-02'},fixed),/pending/);
 x.s.terms['2027:spring']={termId:'2027:spring',year:2026,grade:1,closed:false,results:[]};x.applyAcademic(x.s,{...x.op,action:'retake-plan',date:'2027-02-15'},fixed);
 assert.equal(x.course.retakePlans.length,1);assert.equal(x.course.retakeAttempts.length,1);assert.equal(x.course.retakeAttempts[0].mark<60,true);assert.equal(x.course.retakePlan.studiedPeriods,0);
});

test('A1 support: actual 15 applicants use six periods/credit and multiple courses share one daily budget',async()=>{
 const {academicSupport}=await import('../src/runtime/academics.js'),x=await a1Course({mark:20}),fixed={next:()=>0};
 const term=x.s.terms[x.op.termId];term.supportPrepared=false;term.results=[];
 for(let n=0;n<15;n++){const id='applicant:'+n;x.s.students[id]=structuredClone(x.s.students.p);term.results.push({id,courses:[{...x.course,makeupEligible:false}, {...x.course,subject:'英文',makeupEligible:false}]});}
 delete x.s.students.p;const out=academicSupport(x.s,{termId:x.op.termId,date:'2027-01-22'},fixed);assert.equal(out.plans.length,30);assert.ok(term.results.every(r=>r.courses.every(c=>c.retakePlan.mode==='class'&&c.retakePlan.requiredPeriods===24)));
 const next=academicSupport(x.s,{termId:x.op.termId,date:'2027-01-25'},fixed);for(const id of Object.keys(x.s.students))assert.equal(next.study.filter(r=>r.personId===id).reduce((n,r)=>n+r.periods,0),2);
});

test('A1 supplementary failure: a completed unsuccessful supplement remains eligible for timed retake',async()=>{
 const {applyAcademic,academicSupport}=await import('../src/runtime/academics.js'),s=emptyAcademics(),rng=createRandom(91),fixed={next:()=>.5};s.students.p=createLearner(rng);Object.assign(s.students.p.subjects.本土語文,{mastery:20,state:65,participation:100});s.terms['2027:autumn']={termId:'2027:autumn',year:2027,grade:2,closed:false,results:[]};
 applyAcademic(s,{action:'supplement-plan',personId:'p',termId:'2027:autumn',course:{subject:'本土語文',credits:1,required:true,level:1,half:'autumn'},basisFactId:'review:failed-supplement',date:'2027-09-01'},fixed);
 for(const date of ['2027-09-02','2027-09-03','2027-09-06'])academicSupport(s,{termId:'2027:autumn',date},fixed);
 const c=s.supplements[0];assert.equal(c.completed,true);assert.equal(c.earned,0);applyAcademic(s,{action:'retake-plan',termId:'2026:autumn',personId:'p',subject:c.subject,date:'2027-09-07'},fixed);assert.equal(c.retakePlan.requiredPeriods,3);assert.equal(c.originalMark,c.mark);assert.throws(()=>applyAcademic(s,{action:'retake',termId:'2026:autumn',personId:'p',subject:c.subject,date:'2027-10-01'},fixed),/incomplete/);
});

test('A1 transfer: reviewed failed course can be retaken; already recognized credit cannot be retaken again',async()=>{
 const {applyAcademic,academicSupportDue}=await import('../src/runtime/academics.js'),x=await a1Course({mastery:20}),record={subject:'本土語文',credits:1,required:true,level:1,half:'autumn',mark:35,earned:0};
 applyAcademic(x.s,{action:'recognize',personId:'p',termId:x.op.termId,records:[record],date:'2027-01-22',basisFactId:'review:failed-course'},x.rng);
 applyAcademic(x.s,{action:'retake-plan',personId:'p',subject:record.subject,termId:x.op.termId,date:'2027-01-24'},x.rng);assert.equal(x.s.recognized[0].retakePlan.requiredPeriods,3);assert.equal(x.s.recognized[0].year,2026);
 const passed=await a1Course();passed.s.terms[passed.op.termId].rows=[{id:'p'}];applyAcademic(passed.s,{action:'recognize',personId:'p',termId:passed.op.termId,records:[{subject:'國文',credits:4,required:true,level:1,half:'autumn',mark:80,earned:4}],date:'2027-01-22',basisFactId:'review:passed-course'},passed.rng);
 assert.throws(()=>applyAcademic(passed.s,{...passed.op,action:'retake-plan',date:'2027-01-24'},passed.rng),/unearned/);assert.equal(academicSupportDue(passed.s,'2027-01-25'),false);
});

test('A1 decimal boundaries: exact 40/20/20/20 half-up without changing archived v1 arithmetic',()=>{
 assert.equal(semesterScore(2.8,[76.3,23.3,47.3]),31);assert.equal(semesterScore(29.3,[58.2,60.4,70.3]),50);
 assert.equal(semesterScore(2.8,[76.3,23.3,47.3],1),30);assert.equal(semesterScore(29.3,[58.2,60.4,70.3],1),49);
 assert.throws(()=>emptyAcademics(3),/version/);
});

test('A1 annual credit is reconsidered after a later failed spring makeup improves the registered mark',async()=>{
 const {academicSupport}=await import('../src/runtime/academics.js'),x=await a1Course({mark:62,mastery:58});x.course.earned=4;x.course.makeupEligible=false;
 const spring={...x.course,mark:55,originalMark:55,registered:55,earned:0,makeupEligible:true};x.s.terms['2027:spring']={termId:'2027:spring',year:2026,grade:1,closed:true,closedAt:'2027-06-25',results:[{id:'p',courses:[spring]}]};
 academicSupport(x.s,{date:'2027-06-25',termId:'2027:spring'},{next:()=>.5});assert.equal(spring.annual.average,58.5);assert.equal(spring.earned,0);
 academicSupport(x.s,{date:'2027-06-27',termId:'2027:spring'},{next:()=>.5});assert.equal(spring.makeup.registered,58);assert.equal(spring.annual.average,60);assert.equal(spring.earned,4);assert.equal(spring.mark,58);assert.equal(spring.originalMark,55);assert.equal(spring.method,'annual-average');assert.equal(spring.annualHistory[0].average,58.5);
});
