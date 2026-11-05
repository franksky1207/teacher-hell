import test from 'node:test';
import assert from 'node:assert/strict';
import { completionContract } from './support/completion-contract.js';
import { careerEvidence,compileCareerCompletion,composeCareerEnding,validateCareerCompletion,readCareerCompletion } from '../src/runtime/career.js';
import { rateCareer } from '../src/assessment/career.js';
import { CAREER_LIMITS,gradeForScore } from '../src/assessment/grading.js';
import { restoreWorldState } from '../src/runtime/model.js';
import { annualOpening } from './support/annual-scenario.js';
import { prepareWorldOperation } from '../src/runtime/transactions.js';
import { failureRequest } from './support/failure-scenario.js';
import { memorialFromWorld,validateMemorial,retainMemorial } from '../src/storage/memorial.js';
import { createStoredSession } from '../src/storage/session.js';
import { createSave,saveToken } from '../src/storage/format.js';
const runtime=w=>w.extensions['teacher-hell/world'];
const score=w=>{const e=careerEvidence(w);return rateCareer({yearRefs:e.yearRefs,cohortRefs:e.cohortRefs},e.source);};
function completed(w){const data=compileCareerCompletion(w),r=runtime(w),operationId='contract-settle';r.history.push({id:'contract-completion',type:'career-completion',order:r.history.length+1,attemptId:w.identity.attemptId,operationId,data});r.commits.push({id:operationId,attemptId:w.identity.attemptId,request:JSON.stringify({actorId:w.identity.playerId,operations:[{type:'settle-career'}]})});return w;}

test('completion: explicit 30-year contract double is rejected as a production world; legal early settlement is rejected',()=>{
 assert.throws(()=>restoreWorldState(completionContract()));
 const w=annualOpening({events:false}),before=JSON.stringify(w);
 assert.throws(()=>prepareWorldOperation(w,failureRequest(w,[{type:'settle-career'}])),/thirty legal/);assert.equal(JSON.stringify(w),before);
 for(const years of [1,3,4,29]){const w=completionContract({years});assert.throws(()=>compileCareerCompletion(w),/thirty legal/);assert.equal(score(w).status,'insufficient');}
 const failed=completionContract();runtime(failed).history.at(-1).data.status='failure';assert.throws(()=>compileCareerCompletion(failed));
});

test('completion: actual N7 six budgets, endpoints, source-only grading and no world changes',()=>{
 const w=completionContract(),before=JSON.stringify(w),d=compileCareerCompletion(w);
 assert.equal(d.rating.status,'rated');assert.equal(d.rating.grade,gradeForScore(d.rating.score));assert.deepEqual(Object.values(CAREER_LIMITS),[30,25,15,15,10,5]);assert.equal(d.cohorts.length,10);
 assert.equal(JSON.stringify(w),before);assert.deepEqual(compileCareerCompletion(w),d);
 const e=careerEvidence(w);assert.deepEqual(d.rating,rateCareer({yearRefs:e.yearRefs,cohortRefs:e.cohortRefs},e.source));
 for(const h of runtime(w).history.filter(h=>h.type==='annual-success'))h.data.evidence.rating={score:0,grade:'F'};
 assert.deepEqual(compileCareerCompletion(w),d);
 const low=compileCareerCompletion(completionContract({quality:0,before:100,after:0}));assert.ok(low.rating.score<40,'Completion must not guarantee a passing score');
 const high=compileCareerCompletion(completionContract({quality:100,before:0,after:100}));assert.equal(high.rating.score,100);assert.equal(high.rating.grade,'SS');
});

test('completion: missing, duplicated, wrong-attempt and recycled evidence cannot make a career',()=>{
 for(const mutate of [
  w=>runtime(w).history.at(-1).data.evidence.records.splice(0,1),
  w=>runtime(w).history.at(-1).data.evidence.records.find(r=>r.kind==='completion').attemptId='revoked',
  w=>runtime(w).history.at(-1).data.evidence.records.find(r=>r.kind==='completion').outcome='failure',
  w=>runtime(w).history.at(-1).data.evidence.records.find(r=>r.kind==='handling').factId='fact:1:handling',
  w=>runtime(w).history.at(-1).data.year=29,
 ]){const w=completionContract();mutate(w);assert.throws(()=>compileCareerCompletion(w));}
 const w=completionContract(),h=runtime(w).history.at(-1);h.data.evidence.records.push(h.data.evidence.records[0]);assert.throws(()=>careerEvidence(w),/duplicate/);
 const absent=completionContract();for(const h of runtime(absent).history.filter(h=>h.type==='annual-success'))for(const row of h.data.evidence.records)if(row.kind==='handling')row.significant=false;
 assert.equal(score(absent).status,'insufficient');
});

test('completion: thirty disjoint annual sources unify into ten cohorts, affiliations remain causal and immutable',()=>{
 const w=completionContract(),registry=w.numeric.evolution.world.registry,parents=new Set();
 for(const h of runtime(w).history.filter(h=>h.type==='annual-success')){
  const index=Math.floor((h.data.year-1)/3),parent='caregiver:'+index;parents.add(parent);registry.profiles[parent]={displayName:parent};
  const row=h.data.evidence.records.find(r=>r.kind==='relationship');row.subjectId=h.data.year===30?'caregiver:0':parent;
  h.data.evidence.records.find(r=>r.id===row.factId).subjectIds=[row.subjectId];h.data.evidence.sources.find(s=>s.id===row.id).direction={fromId:row.subjectId,toId:'teacher'};
 }
 const profilesBefore=JSON.stringify(registry.profiles),e=careerEvidence(w),students=new Set();
 assert.equal(parents.size,10);assert.equal(new Set([...e.records.values()].filter(r=>r.kind==='relationship').map(r=>r.subjectId)).size,10);
 assert.equal(e.records.get('outcome:30:relationship').subjectId,'caregiver:0');assert.equal(JSON.stringify(registry.profiles),profilesBefore);
 for(const id of e.cohortRefs){const c=e.records.get(id);assert.equal(c.studentIds.length,40);assert.equal(c.enrollmentRefs.length,40);for(const s of c.studentIds){assert.ok(!students.has(s));students.add(s);}for(const ref of c.enrollmentRefs){const a=e.records.get(ref);assert.ok(e.records.has(a.basisFactId));assert.equal(a.cohortId,id);}}
 assert.equal(students.size,400);assert.ok([...parents].every(id=>!students.has(id)));assert.equal(e.yearRefs.length,30);
 const summaries=runtime(w).history.filter(h=>h.type==='annual-success');assert.notEqual(e.records.get(e.yearRefs[0]),summaries[0].data.evidence.records.at(-1));
 // Delayed qualification is descriptive, never an extra teacher penalty.
 const baseline=score(w);runtime(w).history.push({id:'graduation',type:'cohort-completion',data:{classId:'class:cohort:0',outcomes:Array.from({length:40},(_,i)=>({personId:`student:0:${i}`,qualification:{eligible:i<7}}))}});assert.deepEqual(score(w),baseline);
});

test('completion: historical support/adversity and contradictory known views coexist, secret claims stay private',()=>{
 const w=completionContract(),r=runtime(w),last=r.history.at(-1);r.facts.push({id:'known-support',eventId:'support',description:'學生來信致謝。',subjectIds:['student:0:0'],witnessIds:['teacher'],occurredAt:last.at},{id:'known-adverse',eventId:'adverse',description:'校方維持爭議安排。',subjectIds:['teacher'],witnessIds:['teacher'],occurredAt:last.at},{id:'secret',eventId:'secret',description:'不可顯示的幕後活動',subjectIds:['teacher'],witnessIds:[],occurredAt:last.at});
 r.history.push({type:'semester-review',data:{events:[{factIds:['known-support','known-adverse','secret']}]}});
 r.claims.push({id:'yes',versionId:'v1',sourceId:'student:0:0',statement:'我感謝老師。'},{id:'no',versionId:'v1',sourceId:'administrator',statement:'我反對老師。'},{id:'hidden',versionId:'v1',sourceId:'secret-person',statement:'秘密指控'});
 r.knowledge.push({actorId:'teacher',claimId:'yes',versionId:'v1'},{actorId:'teacher',claimId:'no',versionId:'v1'});
 const d=compileCareerCompletion(w),text=d.ending.text;assert.match(text,/致謝/);assert.match(text,/爭議/);assert.match(text,/感謝/);assert.match(text,/反對/);assert.doesNotMatch(text,/秘密|幕後/);
 assert.ok(d.ending.fragments.some(f=>f.layer==='subjective-known'));assert.ok(d.events.every(e=>e.id!=='secret'));
 const other=completionContract();assert.equal(compileCareerCompletion(other).rating.grade,d.rating.grade);assert.notEqual(compileCareerCompletion(other).ending.text,text);
});

test('completion: ending combines growth, exhaustion and low recognition independently of grade',()=>{
 const w=completionContract(),d=compileCareerCompletion(w),start={id:'start',abilities:Object.fromEntries(Object.keys(d.abilities).map(n=>[n,20]))},end={id:'end',abilities:Object.fromEntries(Object.keys(d.abilities).map(n=>[n,90])),states:{精神:10,體力:10,聲望:20}};
 const a=composeCareerEnding({rating:{grade:'SS'},start,end,events:[{id:'support',description:'仍有學生支持。'}],opinions:[{id:'opinion',versionId:'v1',statement:'校方不同意。',sourceId:'admin'}],unresolved:[{id:'open'}]});
 assert.match(a.text,/消耗/);assert.match(a.text,/聲望/);assert.match(a.text,/未結/);assert.match(a.text,/支持/);assert.equal(composeCareerEnding({rating:{grade:'F'},start,end}).fragments[0].text,a.fragments[0].text);
});

test('completion: frozen report is reconstructed, repeat views are deterministic, tampering is rejected',()=>{
 const w=completed(completionContract()),before=JSON.stringify(w);validateCareerCompletion(w);assert.deepEqual(readCareerCompletion(w),readCareerCompletion(w));assert.equal(JSON.stringify(w),before);
 runtime(w).history.at(-1).data.rating.score=99;assert.throws(()=>validateCareerCompletion(w),/changed/);
 const duplicate=completed(completionContract());runtime(duplicate).history.push(structuredClone(runtime(duplicate).history.at(-1)));assert.throws(()=>validateCareerCompletion(duplicate));
});

test('completion: bounded memorial has stable version/identity/checksum, no full world or hidden values',async()=>{
 const w=completed(completionContract()),m=memorialFromWorld(w),text=JSON.stringify(m);assert.ok(text.length<16000);assert.equal(m.data.cohorts.length,10);assert.equal(m.data.years,30);assert.deepEqual(validateMemorial(text),m);assert.doesNotMatch(text,/numeric|random|endRelations|evidenceRefs/);
 for(const mutate of [m=>m.version=2,m=>m.data.score=99,m=>m.id='other',m=>m.extra=true,m=>m.data.ending+='x'.repeat(70000)]){const bad=structuredClone(m);mutate(bad);assert.throws(()=>validateMemorial(bad));}
 const rows=new Map(),db={async writeMemorial(m){validateMemorial(m);const duplicate=rows.has(m.id);rows.set(m.id,structuredClone(m));return {status:'retained',duplicate};}};
 assert.equal((await retainMemorial(db,w)).duplicate,false);assert.equal((await retainMemorial(db,w)).duplicate,true);assert.equal(rows.size,1);
});

test('completion: explicit storage boundary double checks automatic archive recovery and fresh restart isolation',async()=>{
 // Only the small completed source is a double; restart target is a genuinely
 // validated untouched production opening. No fake completed source enters IndexedDB slots.
 const old=completed(completionContract()),rows=new Map();let fresh;annualOpening({events:false,onOpening:w=>fresh=w});const payload={kind:'contract-double',world:old,opening:null};let saved={payload,token:{generation:1,careerId:old.identity.careerId,attemptId:old.identity.attemptId,revision:0}},fail=true;
 const db={async read(){return structuredClone(saved);},async write(slot,p,expected){assert.deepEqual(expected,saved.token);saved={payload:structuredClone(p),token:saveToken({payload:p,generation:2})};return structuredClone(saved);},async writeMemorial(m){if(fail)throw Error('quota');validateMemorial(m);rows.set(m.id,structuredClone(m));return {status:'retained',duplicate:rows.has(m.id)};},async listMemorials(){return [...rows.values()];}};
 const s=await createStoredSession(db,1),before=structuredClone(saved);assert.equal(s.memorialStatus().status,'pending');await assert.rejects(s.restart(fresh,{expectedToken:s.snapshot().token,confirmed:true}),{code:'MEMORIAL'});assert.deepEqual(saved,before);
 fail=false;assert.equal((await s.retainMemorial()).status,'retained');await s.restart(fresh,{expectedToken:s.snapshot().token,confirmed:true});assert.deepEqual(s.snapshot().payload,createSave(fresh,fresh));assert.equal(rows.size,1);assert.equal(s.snapshot().payload.world.position.serviceYear,1);assert.notEqual(s.snapshot().payload.world.identity.careerId,old.identity.careerId);
});

test('completion: sustained real teaching is one sourced career outcome, never a volume multiplier or a replacement for missing facts',()=>{
 const w=completionContract({quality:20});
 for(const h of runtime(w).history.filter(h=>h.type==='annual-success')){const row=h.data.evidence.records.find(r=>r.kind==='handling');row.significant=false;h.data.evidence.sources.find(s=>s.id===row.id).criterion='assigned-lessons-with-confirmed-domain-results';}
 const e=careerEvidence(w),out=compileCareerCompletion(w);assert.equal(out.rating.metrics.handling,20);assert.equal(out.rating.parts.handling,6);
 assert.equal(out.rating.details.evidenceIds.filter(id=>id.endsWith(':sustained-teaching')).length,1);
 assert.equal(e.sources.find(s=>s.criterion==='thirty-year-confirmed-teaching-responsibility').outcomeRefs.length,30);
 const first=runtime(w).history.find(h=>h.type==='annual-success');first.data.evidence.sources.push(first.data.evidence.sources.find(s=>s.criterion==='assigned-lessons-with-confirmed-domain-results'));assert.deepEqual(compileCareerCompletion(w).rating,out.rating);
 first.data.evidence.records=first.data.evidence.records.filter(r=>r.id!=='fact:1:handling');assert.equal(score(w).status,'insufficient');
});

test('completion: returned assessment data cannot mutate its archived numeric snapshots',()=>{
 const w=completionContract(),before=JSON.stringify(w),d=compileCareerCompletion(w);d.states.精神=0;d.cohorts[0].years[0]=99;assert.equal(JSON.stringify(w),before);
});


test('completion: long original text remains in the full world while memorials retain bounded excerpts',()=>{
 const w=completed(completionContract()),d=runtime(w).history.at(-1).data;d.ending.text='原文'.repeat(10000);d.events=[{id:'known',eventId:'event',description:'重大歷史'.repeat(2000),subjectIds:Array.from({length:400},(_,i)=>'person:'+i),at:{date:'2056-06-30',slotId:'private'}}];
 const m=memorialFromWorld(w);assert.ok(Buffer.byteLength(JSON.stringify(m))<16000);assert.equal(m.data.events[0].subjectIds.length,8);assert.match(m.data.ending,/…$/);assert.equal(d.ending.text.length,20000);assert.ok(d.events[0].description.length>240);
});

test('completion: legitimate inter-year summer perceptions are sourced separately, without exposing unknown interactions',()=>{
 const w=completionContract({years:3}),r=runtime(w),annuals=r.history.filter(h=>h.type==='annual-success'),edge={id:'summer-edge',fromId:'student:0:0',toId:'teacher',values:{'5-1':20,'5-2':20,'5-3':20,'5-4':80}},after={...edge,values:{'5-1':80,'5-2':20,'5-3':80,'5-4':20}};
 for(const h of annuals)h.data.endRelations=[];annuals[0].data.endRelations=[edge];
 r.facts.push({id:'summer-known',witnessIds:['teacher']});
 r.history.splice(3,0,{id:'summer-effect',operationId:'summer',type:'effect',factIds:['summer-known'],data:{observed:[{target:{kind:'relationship',id:edge.id},code:'5-1',before:20,after:80}]}},{id:'opening-2',type:'academic-opening',data:{annual:{start:{year:2},relations:[after]}}});r.history.forEach((h,i)=>h.order=i+1);
 const before=JSON.stringify(w),e=careerEvidence(w),source=e.sources.find(s=>s.openingRef==='opening-2');assert.ok(source);assert.equal(source.previousAnnualRef,annuals[0].id);assert.deepEqual(source.historyIds,['summer-effect']);assert.equal(e.records.get(source.id).subjectId,'student:0:0');assert.equal(e.records.get(source.id).year,2);assert.equal(JSON.stringify(w),before);
 r.facts[0].witnessIds=[];assert.ok(!careerEvidence(w).sources.some(s=>s.openingRef==='opening-2'));
});

test('completion: affiliation reason comes from actual school action, not an invented return for every prior enrollment',()=>{
 const w=completionContract({years:3}),r=runtime(w),registry=w.numeric.evolution.world.registry,e=registry.enrollments[0];
 e.reason='actual-repeat-fact';registry.enrollments.push({...e,id:'prior-affiliation',from:'2026-07-19',until:'2026-07-20',reason:'initial'});
 r.history.push({type:'school',at:{date:e.from},data:{change:{personId:e.personId,action:'repeat'}}});
 const projected=careerEvidence(w),row=projected.records.get(`career:enrollment:${e.id}`);assert.equal(row.reason,'repeat');assert.equal(row.previousEnrollmentId,'career:enrollment:prior-affiliation');
 r.history.at(-1).data.change.action='return';assert.equal(careerEvidence(w).records.get(row.id).reason,'return');
 r.history.at(-1).data.change.action='transfer-in';assert.equal(careerEvidence(w).records.get(row.id).reason,'transfer');
});

test('completion: January enrollment belongs to its actual academic year, not the calendar-year number',()=>{
 const w=completionContract({years:3}),e=w.numeric.evolution.world.registry.enrollments[0];e.from='2027-01-10';e.until='2028-01-10';e.reason='dated-transfer';
 const row=careerEvidence(w).records.get(`career:enrollment:${e.id}`);assert.equal(row.fromYear,1);assert.equal(row.untilYear,2);
});

test('completion: later committee decisions supersede old scoring without rewriting annual history',()=>{
 const w=completionContract(),r=runtime(w),years=r.history.filter(h=>h.type==='annual-success'),first=years[0],last=years.at(-1),old=first.data.evidence.records.find(row=>row.kind==='handling');old.quality=old.completion=old.accountability=0;
 for(const [h,decisionAt,finding,id] of [[first,'2027-01-01','substantiated','old-decision'],[last,'2056-01-01','unsubstantiated','new-decision']]){h.data.evidence.sources.find(s=>s.id===h.data.evidence.records.find(row=>row.kind==='handling').id).historyIds=[id];r.history.push({id,type:'institution',data:{result:{id:'same-case',rule:'teacher-conduct',decisionAt,finding}}});}
 const before=JSON.stringify(w),e=careerEvidence(w),d=compileCareerCompletion(w);assert.equal(d.rating.metrics.handling,80);assert.equal(JSON.stringify(w),before);assert.equal(e.sources.find(s=>s.id===old.id).scoring,'superseded-committee-finding');assert.ok(!d.rating.details.evidenceIds.includes(old.id));assert.equal(old.quality,0);
});
