/** Three focused groups for the 24 known blockers, not a batch content audit. */
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
import {academicEligible,applyAcademic} from '../src/runtime/academics.js';
import {entranceCondition} from '../src/runtime/entrance.js';
import {qualificationStudent} from '../src/runtime/record-qualifications.js';
import {SENIOR_CALENDAR_VERSION,assessmentCalendar} from '../src/calendar/calendar.js';
import {SENIOR_ASSESSMENT_POLICY} from '../src/academics/policy.js';
import {emptyAcademics} from '../src/academics/learning.js';
import {createRandom} from '../src/numeric/random.js';
import {validateEventDefinitions,buildEventCandidates} from '../src/runtime/event-candidates.js';
import {validateStory} from '../src/runtime/story-content.js';
import {eventWorld} from './support/event-fixtures.js';
const read=p=>JSON.parse(readFileSync(new URL('../'+p,import.meta.url),'utf8'));
const condition=(query,subject='participant')=>({kind:'record-v1',query,subject});
function world(date='2029-05-10'){
 return {position:{date},numeric:{evolution:{world:{people:{s:{kind:'student'},other:{kind:'student'},parent:{kind:'caregiver'}},careLinks:[{caregiverId:'parent',studentId:'s'}],registry:{homeClassId:'class',enrollments:[{personId:'s',classId:'class',from:'2026-09-01',until:null}]}}}},extensions:{'teacher-hell/world':{plan:{calendarVersion:SENIOR_CALENDAR_VERSION}}}};
}
function transcript({senior=false}={}){
 const s=emptyAcademics(2),rng=createRandom(7),termId=senior?'2029:spring':'2028:autumn';
 const input={action:'open',termId,year:2028,grade:3,date:senior?'2029-02-15':'2028-09-01',roster:[{personId:'s',id:'enrollment',classId:'class'}],classes:[{id:'class',size:1}],offered:null,teaching:null,...(senior?{assessmentPolicy:SENIOR_ASSESSMENT_POLICY,assessmentWindow:assessmentCalendar(termId,3,SENIOR_CALENDAR_VERSION)}:{})};
 applyAcademic(s,input,rng);
 // Deterministic existing assessment evidence; close and makeup use original production calculations.
 const t=s.terms[termId],subjects=t.rows[0].courses.map(c=>c.subject);
 t.assessments=(senior?[0,1,2]:[0,1,2,3]).map(round=>({round,marks:[{id:'s',marks:Object.fromEntries(subjects.map(name=>[name,50]))}]}));
 applyAcademic(s,{action:'close',termId,date:senior?'2029-05-08':'2029-01-20',activeIds:['s']},rng);
 if(senior)applyAcademic(s,{action:'release',termId,date:'2029-05-09'},rng);
 return {s,t,termId,rng,c:t.results[0].courses.find(c=>c.required)};
}
const freeze=x=>{if(x&&typeof x==='object'){Object.values(x).forEach(freeze);Object.freeze(x);}return x;};

test('last24 academic: precise existing course history, publication, dates and read-only behavior',()=>{
 const w=world(),{s,t,c,termId,rng}=transcript();
 assert.equal(academicEligible(w,'s',condition('required-credit-deficit'),s),true);
 assert.equal(academicEligible(w,'other',condition('required-credit-deficit'),s),false);
 assert.equal(academicEligible(w,'parent',condition('credit-deficit','caregiver-student'),s),true);
 const electives=structuredClone(s);electives.terms[termId].results[0].courses=electives.terms[termId].results[0].courses.filter(c=>!c.required);
 assert.equal(academicEligible(w,'s',condition('required-credit-deficit'),electives),false,'an arbitrary failed elective cannot substitute for a required-course deficit');
 const covered=structuredClone(s);covered.terms[termId].results[0].courses=[structuredClone(c)];
 covered.recognized=[{...c,personId:'s',level:3,half:'autumn',completed:true,date:'2029-02-01',earned:c.credits}];
 assert.equal(academicEligible(w,'s',condition('required-credit-deficit'),covered),false,'recognized credit covers the same course identity');
 s.students.s.subjects[c.subject].mastery=59;s.students.s.subjects[c.subject].state=65;
 const steady={next:()=>.5};
 applyAcademic(s,{action:'makeup',personId:'s',subject:c.subject,termId,date:'2029-01-22'},steady);
 assert.equal(c.makeup.mark,59);
 assert.equal(academicEligible(w,'s',condition('makeup-one-point-short'),s),true);
 assert.equal(academicEligible(w,'s',condition('makeup-failed'),s),true);
 const late=structuredClone(s);late.terms[termId].results[0].courses.find(x=>x.subject===c.subject).makeup.date='2030-01-01';
 assert.equal(academicEligible(w,'s',condition('makeup-one-point-short'),late),false);
 s.students.s.subjects[c.subject].mastery=70;
 applyAcademic(s,{action:'retake-plan',personId:'s',subject:c.subject,termId,date:'2029-04-20'},rng);
 c.retakePlan.studiedPeriods=c.retakePlan.requiredPeriods;
 applyAcademic(s,{action:'retake',personId:'s',subject:c.subject,termId,date:'2029-05-09'},steady);
 assert.equal(c.earned,c.credits);
 assert.equal(academicEligible(w,'s',condition('makeup-one-point-short'),s),false,'a passed retake is not a current failed makeup deficit');
 assert.equal(academicEligible(w,'s',condition('remedial-credit-yesterday'),s),true);
 assert.equal(academicEligible(world('2029-05-11'),'s',condition('remedial-credit-yesterday'),s),false);
 const pending=transcript({senior:true});
 applyAcademic(pending.s,{action:'support',date:'2029-05-09',activeIds:['s'],studyAllowed:true},pending.rng);
 assert.equal(academicEligible(w,'s',condition('makeup-due-today'),pending.s),true);
 assert.equal(academicEligible(world('2029-05-09'),'s',condition('makeup-due-tomorrow'),pending.s),true);
 assert.equal(academicEligible(world('2029-05-11'),'s',condition('makeup-due-today'),pending.s),false);
 pending.t.publishedAt='2029-05-11';
 assert.equal(academicEligible(w,'s',condition('makeup-due-today'),pending.s),false,'sealed senior marks do not qualify');
 const before=JSON.stringify(s);freeze(s);freeze(w);
 assert.equal(academicEligible(w,'s',condition('remedial-credit-yesterday'),s),true);
 assert.equal(JSON.stringify(s),before,'read cannot change an academic projection');
 // Legacy term-based conditions retain their original behavior.
 assert.equal(academicEligible(w,'s',{kind:'credit-deficit',termId},s),true);
});

test('last24 entrance: personal published outcomes and unambiguous caregiver links',()=>{
 const w=world('2029-05-29'),s={entrance:{completed:[{id:'application-result',date:'2029-05-28'},{id:'application-screen',date:'2029-04-16'}],students:{s:{stars:{status:'nominated',programmeId:'star'},applications:[],offers:[]},other:{applications:[],offers:[]}}}};
 const p=s.entrance.students.s,check=q=>entranceCondition(s,'s',condition(q),w);
 assert.equal(check('stars-admitted'),false);
 p.stars.status='interview-eligible';assert.equal(check('stars-admitted'),false);
 p.stars.status='admitted';p.offers.push({programmeId:'star',route:'stars',publishedStatus:'regular',status:'confirmed',publishedAt:'2029-03-19'});
 assert.equal(check('stars-admitted'),true);
 p.offers[0].publishedAt='2030-01-01';assert.equal(check('stars-admitted'),false);p.offers=[];
 const app=(id,status)=>({programmeId:id,route:'application',status,screenedAt:'2029-04-16',reviewedAt:'2029-05-15',publishedAt:'2029-05-28'});
 const offer=(id,status)=>({programmeId:id,route:'application',status,publishedStatus:status,publishedAt:'2029-05-28'});
 p.applications=[app('a','regular')];p.offers=[offer('a','regular')];assert.equal(check('application-mixed-offers'),false);
 p.applications.push(app('b','waitlist'));p.offers.push(offer('b','waitlist'));assert.equal(check('application-mixed-offers'),true);
 assert.equal(check('application-all-rejected'),false);
 p.applications[1].publishedAt='2030-01-01';assert.equal(check('application-mixed-offers'),false);
 p.applications=[app('a','rejected'),app('b','rejected')];
 assert.equal(check('application-all-rejected'),true);assert.equal(check('application-interview-rejected'),true);
 p.applications[1].status='waitlist';assert.equal(check('application-all-rejected'),false);
 p.applications=[{programmeId:'a',route:'application',status:'rejected',screenedAt:'2029-04-16'}];
 assert.equal(check('application-all-rejected'),true);assert.equal(check('application-interview-rejected'),false,'screen rejection does not invent an interview');
 assert.equal(entranceCondition(s,'other',condition('application-all-rejected'),w),false);
 p.applications=[{programmeId:'a',route:'application',status:'screened',screenedAt:'2029-04-16'}];
 assert.equal(entranceCondition(s,'parent',condition('application-screened','caregiver-student'),w),true);
 assert.equal(entranceCondition(s,'parent',condition('application-screened'),w),false);
 w.numeric.evolution.world.careLinks.push({caregiverId:'parent',studentId:'other'});
 w.numeric.evolution.world.registry.enrollments.push({personId:'other',classId:'class',from:'2026-09-01',until:null});
 assert.equal(qualificationStudent(w,'parent','caregiver-student'),null,'never select one of two possible children arbitrarily');
 assert.equal(entranceCondition(s,'parent',condition('application-screened','caregiver-student'),w),false);
 w.numeric.evolution.world.registry.enrollments[1].until='2029-05-01';
 assert.equal(qualificationStudent(w,'parent','caregiver-student'),'s');
 const before=JSON.stringify(s);freeze(s);freeze(w);
 assert.equal(entranceCondition(s,'parent',condition('application-screened','caregiver-student'),w),true);
 assert.equal(JSON.stringify(s),before);
});

test('last24 contracts: only listed qualifications change; original stories/numbers and legacy APIs preserved',()=>{
 const input=read('work/18b-t02-hydrogen-corrections.json').last24Corrections;
 const selected=[];
 for(const topic of [...new Set(input.inputIds.map(k=>k.slice(0,2)))]){
  const path=`work/18b-t02-${topic}-authoring.json`,now=read(path).records;
  const old=JSON.parse(execFileSync('git',['show',`${input.base}:${path}`],{encoding:'utf8',maxBuffer:2e6})).records;
  for(const id of input.inputIds.filter(k=>k.startsWith(topic+'-'))){
   const r=now.find(r=>r.definition.id.endsWith(id)),prior=old.find(r=>r.definition.id.endsWith(id));selected.push(r);
   assert.deepEqual(r.story,prior.story,id+' story unchanged');assert.deepEqual(r.binding,prior.binding,id+' binding unchanged');
   for(const key of ['coreCodes','additionalCodes','weights','directions'])assert.deepEqual(r.definition[key],prior.definition[key],id+' '+key);
   validateStory(r.story);
   if(input.remaining[id])assert.deepEqual(r,prior,id+' remains isolated and unchanged');
  }
 }
 assert.equal(selected.length,24);validateEventDefinitions(selected.map(r=>r.definition));
 const r=selected.find(r=>r.definition.id.endsWith('03-01'));
 const broken=structuredClone(r.definition);broken.eligibility.academic[0].query='anything-failed';assert.throws(()=>validateEventDefinitions([broken]));
 broken.eligibility.academic[0]={kind:'record-v2',query:'credit-deficit',subject:'participant'};assert.throws(()=>validateEventDefinitions([broken]));
 const w=eventWorld(1,'2029-05-10','early');
 assert.equal(buildEventCandidates(w,[r.definition],{engineering:true}).candidates.length,0,'candidate path must execute academic predicate');
 const parent=selected.find(r=>r.definition.id.endsWith('06-03'));
 assert.equal(buildEventCandidates(w,[parent.definition],{engineering:true}).candidates.length,0,'candidate path rejects caregiver without student admission evidence');
 assert.equal(buildEventCandidates(w,selected.map(r=>r.definition)).candidates.length,0,'engineering drafts remain outside formal pool');
});
