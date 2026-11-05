import test from 'node:test';
import assert from 'node:assert/strict';
import { fixture } from '../simulation/fixtures.js';
import { rateThreeYearCareer,rateCareer } from '../src/assessment/career.js';
import { CAREER_LIMITS,gradeForScore } from '../src/assessment/grading.js';
import { careerEvidence,compileThreeYearCareerCompletion,validateCareerCompletion,composeCareerEnding } from '../src/runtime/career.js';
import { completionContract } from './support/completion-contract.js';
import { annualOpening } from './support/annual-scenario.js';
import { prepareWorldOperation } from '../src/runtime/transactions.js';
import { runtimeOf,restoreWorldState } from '../src/runtime/model.js';
import { request } from './support/runtime.js';
import { teacherTenure } from '../src/runtime/schedule.js';
import { memorialFromWorld } from '../src/storage/memorial.js';
const score=f=>rateThreeYearCareer({yearRefs:f.yearRefs,cohortRefs:f.cohortRefs},f.source);

test('T4 A: three-year N7 uses the unchanged six weights and thresholds, with high, low and F results',()=>{
 assert.deepEqual(Object.values(CAREER_LIMITS),[30,25,15,15,10,5]);
 const high=score(fixture(3,100,0,100)),low=score(fixture(3,0,100,0));
 assert.equal(high.score,100);assert.equal(high.grade,'SS');assert.equal(low.score,0);assert.equal(low.grade,'F');
 for(const [n,g] of [[95,'SS'],[90,'S'],[80,'A'],[70,'B'],[60,'C'],[50,'D'],[40,'E'],[39.99,'F']])assert.equal(gradeForScore(n),g);
 assert.equal(Object.values(high.parts).reduce((a,b)=>a+b,0),high.score);
 assert.equal(high.details.years,3);assert.equal(high.details.cohorts.length,1);
 const short=fixture(3,65,30,70),long=fixture(30,65,30,70);
 assert.ok(Math.abs(score(short).score-rateCareer({yearRefs:long.yearRefs,cohortRefs:long.cohortRefs},long.source).score)<1e-10,'same endpoint and outcome quality must not be penalized or boosted by span');
});

test('T4 A: source cardinality and missing evidence fail explicitly; no zeros, annual-average or 30-year fallback',()=>{
 const f=fixture(3);assert.equal(rateCareer({yearRefs:f.yearRefs,cohortRefs:f.cohortRefs},f.source).status,'insufficient');
 for(const years of [1,2,6,30])assert.equal(score(fixture(years)).status,'insufficient');
 f.records.delete('outcome:2:relationship');assert.equal(score(f).status,'insufficient');
 const failed=fixture(3);failed.records.get('completion:3').outcome='failure';assert.equal(score(failed).status,'not-successful');
 const duplicated=fixture(3);duplicated.records.get('year:3').completionRef='completion:2';assert.throws(()=>score(duplicated));
});

test('T4 A: world projection scales actual teaching to three sources and quality to first two endpoints; prior background and annual grades do not score',()=>{
 const w=completionContract({years:3});
 for(const h of runtimeOf(w).history.filter(h=>h.type==='annual-success')){
  const row=h.data.evidence.records.find(r=>r.kind==='handling');row.significant=false;
  h.data.evidence.sources.find(s=>s.id===row.id).criterion='assigned-lessons-with-confirmed-domain-results';
 }
 const e=careerEvidence(w,{years:3}),s=e.sources.find(s=>s.criterion==='three-year-confirmed-teaching-responsibility');
 assert.equal(s.outcomeRefs.length,3);assert.equal(e.sources.filter(s=>s.criterion==='historical-six-state-endpoint').length,2);
 const rate=x=>{const e=careerEvidence(x,{years:3});return rateThreeYearCareer({yearRefs:e.yearRefs,cohortRefs:e.cohortRefs},e.source);};
 const before=rate(w);assert.equal(before.status,'rated');
 w.numeric.evolution.world.background={inventedPastAnnualGrades:Array(19).fill('SS')};
 for(const h of runtimeOf(w).history.filter(h=>h.type==='annual-success'))h.data.evidence.rating={score:0,grade:'F'};
 assert.deepEqual(rate(w),before);assert.throws(()=>restoreWorldState(w)); // Explicit contract double, never a production source.
});

test('T4 A: three-year ending reuses factual and subjective fragments with references; grades do not invent gratitude or tragedy',()=>{
 const f=fixture(3),start=f.records.get('start:1'),end=f.records.get('end:3');
 const opts={start,end,years:3,events:[{id:'known-event',description:'已知事件仍留有爭議。'}],opinions:[{id:'known-opinion',versionId:'v1',sourceId:'student',statement:'我仍不同意老師。'}],unresolved:[{id:'pending-story'}]};
 const high=composeCareerEnding({...opts,rating:{grade:'SS'}}),low=composeCareerEnding({...opts,rating:{grade:'F'}});
 assert.match(high.text,/三個學年/);assert.doesNotMatch(high.text,/三十/);assert.equal(high.text,low.text);
 assert.ok(high.fragments.every(f=>f.refs.length));assert.match(high.text,/不同意/);assert.match(high.text,/未結/);
});

test('T4 B: genuine three-mode openings preserve tenure and reject early completion without publishing partial data',()=>{
 for(const difficulty of ['easy','normal','hard']){
  const w=annualOpening({difficulty}),before=JSON.stringify(w);
  assert.equal(teacherTenure(w),({easy:20,normal:10,hard:1})[difficulty]);assert.equal(w.position.serviceYear,1);
  assert.throws(()=>prepareWorldOperation(w,{...request(w,'early-T4',[{type:'settle-school-year'}]),calendarContext:{kind:'routine'}}),/June final/);
  assert.throws(()=>compileThreeYearCareerCompletion(w),/three legal successful/);
  assert.equal(JSON.stringify(w),before);assert.equal(memorialFromWorld(w),null);
 }
});

/** A: explicit N7/ending adapter double. Full restore must reject this; no
 * fixture-produced annual success is ever used as continuous acceptance. */
function threeYearContract(){
 const w=completionContract({years:3}),r=runtimeOf(w),n=w.numeric.evolution.world;
 r.plan={startYear:2026,validation:'fixed-calendar-v2',career:{version:1,mode:'three-year',difficulty:'hard'}};
 w.position={date:'2029-06-29',slotId:'private',serviceYear:3};
 n.classroom={id:n.registry.cohorts[0].classId,studentIds:[]};n.registry.academicYear=2028;
 n.registry.assignments=[{personId:w.identity.playerId,roleId:9,classId:n.classroom.id,until:w.position.date}];
 for(const e of n.registry.enrollments)e.until=w.position.date;
 const annual=r.history.at(-1);annual.operationId='contract-T4';annual.at={date:w.position.date,slotId:w.position.slotId};
 r.history.push({id:'contract-T3-archive',type:'cohort-completion',operationId:annual.operationId,attemptId:w.identity.attemptId,order:r.history.length+1,at:{...annual.at},data:{classId:n.classroom.id,outcomes:n.registry.enrollments.map((e,i)=>({personId:e.personId,qualification:{eligible:i<20}}))}});
 return w;
}

test('T4 A: three-year ending and qualification summaries have actual source references and never create a memorial',()=>{
 const w=threeYearContract(),d=compileThreeYearCareerCompletion(w);
 assert.equal(d.mode,'three-year');assert.equal(d.years,3);assert.equal(d.cohorts.length,1);
 assert.deepEqual(d.rating.details.scale.weights,CAREER_LIMITS);assert.deepEqual(d.annualIds,['annual:1','annual:2','annual:3']);
 assert.equal(d.cohorts[0].qualification.eligible,20);assert.equal(d.cohorts[0].qualification.notYetEligible,20);
 assert.match(d.ending.text,/20人符合畢業資格，20人/);assert.ok(d.ending.fragments.every(f=>f.refs.length));
 runtimeOf(w).history.push({type:'career-completion',data:d});assert.equal(memorialFromWorld(w),null);
 assert.throws(()=>restoreWorldState(w));
});


test('T4 A: terminal receipt, order, evidence and ending are recomputed; altered, absent and repeated receipts fail',()=>{
 const w=threeYearContract(),r=runtimeOf(w),annual=r.history.findLast(h=>h.type==='annual-success');
 const completion={id:'contract-final',type:'career-completion',operationId:annual.operationId,attemptId:w.identity.attemptId,order:r.history.length+1,at:{...annual.at},data:compileThreeYearCareerCompletion(w)};
 r.history.push(completion);r.commits.push({id:annual.operationId,attemptId:w.identity.attemptId,request:JSON.stringify({actorId:w.identity.playerId,operations:[{type:'settle-school-year'}]})});
 validateCareerCompletion(w);
 for(const mutate of [
  x=>runtimeOf(x).history.at(-1).data.rating.score++,
  x=>runtimeOf(x).history.at(-1).data.ending.fragments[0].refs=[],
  x=>runtimeOf(x).history.at(-1).data.annualIds.pop(),
  x=>runtimeOf(x).commits[0].attemptId='other-attempt',
  x=>runtimeOf(x).commits=[],
  x=>runtimeOf(x).history.pop(),
  x=>runtimeOf(x).history.push(structuredClone(completion)),
  x=>runtimeOf(x).history.push({type:'time',order:completion.order+1}),
 ]){const bad=structuredClone(w);mutate(bad);assert.throws(()=>validateCareerCompletion(bad));}
 assert.throws(()=>restoreWorldState(w));
});

test('T4 B: confirmed three-year stories retain their actual panel sources across later state changes',async()=>{
 const {runAnnual}=await import('./support/annual-scenario.js');
 const opening=annualOpening({difficulty:'easy'}),w=runAnnual(opening,{stopDate:opening.position.date}).world;
 const confirmed=runtimeOf(w).history.find(h=>h.type==='story'&&h.data.action.action==='confirm');
 assert.equal(confirmed.data.panelWitnessVersion,1);assert.ok(confirmed.data.inputs.some(i=>i.target.kind==='player-life'&&i.code==='7-4'));
 // Explicit lower-level numeric endpoint probe, NOT an executed future year.
 // A later state cannot be used to reconstruct the earlier clamped panel delta.
 const probe=structuredClone(w);probe.numeric.evolution.world.player.current.life['7-4']=0;
 assert.doesNotThrow(()=>restoreWorldState(probe));
 const bad=structuredClone(w);runtimeOf(bad).history.find(h=>h.id===confirmed.id).data.state.panelDelta.體力++;
 assert.throws(()=>restoreWorldState(bad),/illegal story/);
});
