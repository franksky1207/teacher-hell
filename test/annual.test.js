import test from 'node:test';
import assert from 'node:assert/strict';
import { annualOpening,runAnnual } from './support/annual-scenario.js';
import { annualEvidence,ANNUAL_KEY } from '../src/runtime/annual.js';
import { prepareWorldOperation,prepareWorldSequence,forkWorldAttempt } from '../src/runtime/transactions.js';
import { runtimeOf,restoreWorldState,ATTEMPT_LINEAGE_KEY } from '../src/runtime/model.js';
import { createSave,restoreSave } from '../src/storage/format.js';
import { id,request,runtimeScenario } from './support/runtime.js';
import { openProcedure,addEvidence,resolveCase,sourceFact } from './support/procedure-scenario.js';
import { academicBaseline,applySchool } from './support/academic-scenario.js';
import { semester } from '../src/calendar/calendar.js';
import { yearData } from '../src/calendar/calendar.js';
import { eventWorld } from './support/event-fixtures.js';
import { REVIEW_KEY } from '../src/runtime/reviews.js';
const apply=(w,tag,operations)=>prepareWorldOperation(w,{...request(w,tag,operations),calendarContext:{kind:'routine'}});

test('annual: final examination day still runs every slot before the annual barrier',()=>{
 // Explicit boundary fixture, not an executed semester or annual pass.
 const initial=annualOpening({events:false});let w=eventWorld(74,yearData(2027).springFinal,'early');
 w.extensions[ANNUAL_KEY]=structuredClone(initial.extensions[ANNUAL_KEY]);w.extensions[REVIEW_KEY]=structuredClone(initial.extensions[REVIEW_KEY]);
 w=apply(w,'open-final-day',[{type:'academic',action:'open',termId:'2027:spring'}]).world;
 const next=apply(w,'finish-final-early',[{type:'school-action',activity:'class-talk'}]).world;
 assert.equal(next.position.date,w.position.date);assert.equal(next.position.slotId,'p1');
 assert.throws(()=>apply(next,'not-end-of-day',[{type:'settle-school-year'}]),/June final/);
});

test('annual: real summer opening, twelve baseline values, strict versions and early settlement rejection',()=>{
 let opening;const w=annualOpening({events:false,onOpening:x=>opening=x});
 assert.equal(w.position.date,'2026-07-20');assert.equal(Object.keys(w.extensions[ANNUAL_KEY].start.abilities).length,6);assert.equal(Object.keys(w.extensions[ANNUAL_KEY].start.states).length,6);
 assert.deepEqual(restoreSave(JSON.stringify(createSave(w,opening))).world,w);
 assert.throws(()=>apply(w,'too-early',[{type:'settle-school-year'}]),/June final/);
 const bad=structuredClone(w);bad.extensions[ANNUAL_KEY].version=2;assert.throws(()=>restoreWorldState(bad),/unsupported annual/);
 assert.equal(annualEvidence(w).rating.status,'insufficient');assert.equal(annualEvidence(w).rating.score,null);
 assert.equal(annualEvidence(w).records.some(row=>row.kind==='completion'),false);
 const altered=structuredClone(w);altered.extensions[ANNUAL_KEY].start.states.體力--;assert.throws(()=>createSave(altered,opening),/Annual observation opening differs/);
});

test('annual: atomic ordered commands reproduce normal single-command execution and reject invalid tails',()=>{
 const w=annualOpening({events:false}),before=JSON.stringify(w);
 const qs=[request(w,'batch-one',[{type:'sample',stream:'events',id:'one',weights:[1,2]}])];
 const single=prepareWorldOperation(w,qs[0]).world;qs.push(request(single,'batch-two',[{type:'sample',stream:'events',id:'two',weights:[2,1]}]));
 let i=0;const batch=prepareWorldSequence(w,()=>qs[i++]??null).world;
 assert.deepEqual(batch,prepareWorldOperation(single,qs[1]).world);assert.equal(JSON.stringify(w),before);
 i=0;assert.throws(()=>prepareWorldSequence(w,()=>i++===0?qs[0]:{...qs[1],operations:[{type:'invalid'}]}));assert.equal(JSON.stringify(w),before);
});

test('annual: genuine committee results distinguish exoneration, substantiation and lack of evidence',()=>{
 for(const [finding,quality] of [['unsubstantiated',100],['substantiated',0],['insufficient-evidence',50]]){
  let w=annualOpening({events:false});const opened=openProcedure(w,'teacher-conduct','annual-'+finding);w=addEvidence(opened.world,opened.caseId,opened.originFactId);w=resolveCase(w,opened.caseId,finding);
  const evidence=annualEvidence(w),row=evidence.records.find(row=>row.kind==='handling');
  assert.equal(row.quality,quality);assert.equal(evidence.sources.find(s=>s.id===row.id).finding,finding);
  assert.equal(evidence.rating.status,'insufficient'); // No semester transcripts or relationship observations yet.
  // An authoritative finding is not a defined career-ending sanction, even
  // when substantiated and notified through the real institutional operations.
  const beforeRetry=JSON.stringify(w);
  assert.throws(()=>forkWorldAttempt(w,{attemptId:id('attempt','finding-retry'),seeds:{settlement:33,streams:{events:44}}},w),{code:'RETRY_UNAUTHORIZED'});
  assert.equal(JSON.stringify(w),beforeRetry);
  const q=request(w,'replay-'+finding,[{type:'sample',stream:'events',id:'same',weights:[1]}]);const changed=prepareWorldOperation(w,q).world;
  assert.deepEqual(annualEvidence(changed),evidence);assert.equal(prepareWorldOperation(changed,q).duplicate,true);
 }
});

test('annual: allegation or subjective complaint without competent result is never handling failure',()=>{
 const initial=annualOpening({events:false}),opened=openProcedure(initial,'teacher-conduct','pending-annual');
 const rumor=sourceFact(opened.world,{type:'rumor',statement:'家長認為教師失職'},[initial.identity.playerId]);
 const student=initial.numeric.evolution.world.classroom.studentIds[0],claimId=id('claim','subjective-annual');
 const subjective=prepareWorldOperation(rumor.world,{...request(rumor.world,'subjective-annual',[
  {type:'claim',id:claimId,versionId:'v1',factId:opened.originFactId,statement:'學生相信教師已經失職。',sourceId:student},
  {type:'learn',actorId:student,claimId,versionId:'v1',source:{kind:'observation',actorId:student,basisFactId:opened.originFactId},belief:'believed',confidence:1}
 ]),calendarContext:{kind:'procedure'}}).world;
 assert.ok(runtimeOf(subjective).knowledge.some(k=>k.claimId===claimId&&k.belief==='believed'));
 assert.equal(annualEvidence(subjective).records.some(row=>row.kind==='handling'),false);
 assert.equal(annualEvidence(subjective).rating.status,'insufficient');
});

test('annual: sparse-event academic development uses actual marks, credits and attendance without forcing success',()=>{
 let w=annualOpening({events:false});const meta=semester('2026:autumn');
 for(const round of [1,2,3,0]){w=academicBaseline(w,meta.exams[round===0?2:round-1].at(-1));w=applySchool(w,[{type:'academic',action:'assess',termId:meta.id,round}]);}
 w=applySchool(w,[{type:'academic',action:'close',termId:meta.id}]);const evidence=annualEvidence(w);
 assert.equal(evidence.records.filter(row=>row.kind==='student').length,40);assert.equal(evidence.rating.status,'insufficient');
 assert.ok(evidence.records.filter(row=>row.kind==='student').every(row=>Number.isFinite(row.quality)&&row.accountability===100));
});

test('annual: genuine relationship observation uses own directed state; no rumor-derived relationship score',()=>{
 const w=annualOpening({events:false});assert.equal(annualEvidence(w).records.some(row=>row.kind==='relationship'),false);
 const changed=apply(w,'class-talk',[{type:'campus',activity:'class-talk'}]).world,e=annualEvidence(changed);
 assert.equal(e.records.filter(row=>row.kind==='relationship').length,1);assert.ok(e.sources.some(s=>s.nature==='recorded-directed-perception'&&s.historyIds.length>0));
 const before=JSON.stringify(changed);annualEvidence(changed);assert.equal(JSON.stringify(changed),before);
});

test('annual: import cannot erase retired attempts by stripping both derived lineage fields',()=>{
 const w=runtimeScenario(),options=tag=>({attemptId:id('attempt',tag),seeds:{settlement:33,streams:{events:44}}});
 const first=forkWorldAttempt(w,options('annual-first')),second=forkWorldAttempt(w,options('annual-second'),first);
 const bad=structuredClone(second);delete bad.extensions[ATTEMPT_LINEAGE_KEY];delete runtimeOf(bad).history.at(-1).data.attemptIds;
 assert.throws(()=>restoreSave({kind:'teacher-hell-save',version:1,world:bad,opening:w}),/lineage is missing/);
});

test('annual: real choices in the same admitted story create different official snapshot evidence',()=>{
 const a=runAnnual(annualOpening(),{option:'listen',stopDate:'2026-07-21'}).world;
 const b=runAnnual(annualOpening(),{option:'angry',stopDate:'2026-07-21'}).world;
 assert.notDeepEqual(annualEvidence(a).records.find(row=>row.kind==='snapshot'&&row.id.endsWith(':end')),annualEvidence(b).records.find(row=>row.kind==='snapshot'&&row.id.endsWith(':end')));
 assert.notDeepEqual(runtimeOf(a).history.filter(h=>h.type==='choice').map(h=>h.data.optionId),runtimeOf(b).history.filter(h=>h.type==='choice').map(h=>h.data.optionId));
 assert.equal(annualEvidence(a).rating.status,'insufficient');assert.equal(annualEvidence(b).rating.status,'insufficient');
});

test('annual: batched real school day equals individual commands including NPC, academic, N4 and N6',()=>{
 const initial=annualOpening(),requests=[];
 const batch=runAnnual(initial,{stopDate:initial.position.date,onRequest:q=>requests.push(q)}).world;
 let individual=initial;for(const q of requests)individual=prepareWorldOperation(individual,q).world;
 assert.deepEqual(batch,individual);
});
