import { fixture } from '../simulation/fixtures.js';
import test from 'node:test';
import assert from 'node:assert/strict';
import { performance } from 'node:perf_hooks';
import { weightedMean } from '../src/numeric/math.js';
import { createRandom } from '../src/numeric/random.js';
import { STATE_NAMES } from '../src/player/panel.js';
import { createCandidate,confirmCandidate } from '../src/player/creation.js';
import { createWorld } from '../src/world/world.js';
import { directedKey } from '../src/world/relationships.js';
import { attestPersonEvaluation,activateReputation,deriveWorldPanel } from '../src/social/reputation.js';
import { startEvolution,advanceDay } from '../src/evolution/time.js';
import { startSettlement,settleResult,advanceSettlementDay,restoreSettlement } from '../src/changes/settlement.js';
import { CRISIS_WEIGHTS,CRISIS_THRESHOLDS,crisisBand,crisisFromStates,worldCrisis,crisisCandidateParameters } from '../src/assessment/crisis.js';
import { ANNUAL_LIMITS,CAREER_LIMITS,gradeForScore,development,outcomeScore } from '../src/assessment/grading.js';
import { captureAssessment } from '../src/assessment/evidence.js';
import { rateAnnual } from '../src/assessment/annual.js';
import { rateCareer } from '../src/assessment/career.js';

const copy=x=>structuredClone(x);
const states=n=>Object.fromEntries(STATE_NAMES.map(name=>[name,n]));
const player=confirmCandidate(createCandidate({seed:3,playerId:'teacher',schoolId:'school'}));
const make=()=>createWorld({seed:9,player});
/** Synthetic evidence authority only. No fixture claims real events or game outcomes. */

const career=f=>rateCareer({yearRefs:f.yearRefs,cohortRefs:f.cohortRefs},f.source);

test('crisis fixed weights, exact bands, parallel single thresholds and external reputation semantics',()=>{
  assert.deepEqual(Object.values(CRISIS_WEIGHTS),[20,25,20,5,15,15]);assert.equal(Object.values(CRISIS_WEIGHTS).reduce((a,b)=>a+b),100);
  assert.deepEqual(Object.values(CRISIS_THRESHOLDS),[30,35,30,20,25,30]);
  for(const [value,band] of [[100,'一般'],[70,'一般'],[55,'初期警訊'],[40,'明顯危機'],[25,'高度危機'],[0,'極度危機']]) {
    assert.equal(crisisFromStates(states(value)).band,band);
    assert.equal(crisisBand(value),band);
    if(value>0&&value<100) {assert.equal(crisisBand(value+1e-10),band);assert.notEqual(crisisBand(value-1e-10),band);}
  }
  for(const name of STATE_NAMES) {
    const at=states(100);at[name]=CRISIS_THRESHOLDS[name];
    assert.equal(crisisFromStates(at).single[name].hit,true);
    at[name]+=1e-10;assert.equal(crisisFromStates(at).single[name].hit,false);
    at[name]-=2e-10;assert.equal(crisisFromStates(at).single[name].hit,true);
  }
  const low=states(100);low.聲望=0;const risk=crisisFromStates(low);
  assert.equal(risk.score,95);assert.equal(risk.band,'一般');assert.equal(risk.single.聲望.category,'external');
  assert.ok(STATE_NAMES.filter(n=>n!=='聲望').every(n=>!risk.single[n].hit));
  const zero=crisisFromStates(states(0));assert.equal(zero.score,0);assert.ok(Object.values(zero.single).every(s=>s.hit));assert.ok(!Object.hasOwn(zero,'gameOver'));
  for(const n of [NaN,Infinity,-1,101])assert.throws(()=>crisisFromStates(states(n)));
  assert.throws(()=>crisisFromStates({...states(50),教學能力:100}));
});

test('world crisis resolves formal reputation, ignores tenure directly, and returns candidate parameters once',()=>{
  let w=attestPersonEvaluation(make(),{fromId:make().classroom.studentIds[0],toId:'teacher',scope:'provided',basisId:'provided-assessment'});
  const id=w.classroom.studentIds[0];w=activateReputation(w,[{sourceId:id,kind:'person',weight:1}]);
  const key=directedKey(id,'teacher');w.relationships[key].values={'5-1':0,'5-2':100,'5-3':0,'5-4':100};w.reputations[key].values={'8-1':0,'8-2':100};
  const before=copy(w),risk=worldCrisis(w);assert.equal(risk.single.聲望.hit,true);assert.equal(deriveWorldPanel(w).聲望,0);
  const old=copy(w);old.player.year=30;assert.deepEqual(worldCrisis(old),risk);
  const highSkill=copy(w);highSkill.player.current.person['3-1']=100;highSkill.player.current.person['3-3']=100;assert.deepEqual(worldCrisis(highSkill),risk);
  const rows=crisisCandidateParameters(w,[{id:'external-risk',eligible:true,channels:['聲望','composite']},{id:'not-qualified',eligible:false,channels:['聲望']}]);
  assert.equal(rows[0].opened,true);assert.equal(rows[0].multiplier,5);assert.equal(rows[1].multiplier,0);
  assert.deepEqual(w,before);
  const updated=copy(w);updated.reputations[key].values['8-1']=100;assert.equal(worldCrisis(updated).single.聲望.hit,false);
  assert.throws(()=>crisisCandidateParameters(w,[{id:'same',eligible:true,channels:['聲望']},{id:'same',eligible:true,channels:['精神']}]));
  assert.throws(()=>crisisCandidateParameters(w,[{id:'bad',eligible:true,channels:['聲望','聲望']}]));
  assert.throws(()=>crisisCandidateParameters(w,[{id:'bad',eligible:true,channels:['unknown']}]));
});

test('N4 evolution and N6 confirmed impacts/recovery rederive risk without mutating receipts',()=>{
  const w=make();let e=startEvolution(w,{seed:10,date:'2026-08-28',schoolYearId:'Y1',openingId:'O1'});
  const day=date=>({date,schoolYearId:'Y1',openingId:'O1',serviceYear:1});
  e=advanceDay(e,day('2026-08-28'));let s=startSettlement(e,{seed:20261101,attemptId:'attempt'});
  const req=(id,operation)=>({attemptId:s.attemptId,id,sequence:s.receipts.length+1,date:s.evolution.clock.date,operation});
  const start=worldCrisis(s.evolution.world).score;
  s=settleResult(s,req('impact',{type:'direct',changes:['2-1','2-2','2-3'].map(code=>({target:{kind:'player-person',id:'teacher'},code,delta:100}))}));
  assert.ok(worldCrisis(s.evolution.world).score<start);
  s=settleResult(s,req('rest',{type:'recovery',context:{kind:'weekend',periodId:'weekend',startHour:12,hours:4,availableHours:4,resources:1,permitted:true}}));
  s=advanceSettlementDay(s,day('2026-08-29'));
  const saved=JSON.stringify(s),risk=worldCrisis(s.evolution.world);
  for(let i=0;i<10;i++)assert.deepEqual(worldCrisis(s.evolution.world),risk);
  assert.equal(JSON.stringify(s),saved);assert.deepEqual(worldCrisis(restoreSettlement(saved).evolution.world),risk);
  const snap=captureAssessment(s.evolution.world,{id:'snapshot',provenance:'synthetic',attemptId:s.attemptId});assert.equal(snap.states.聲望,deriveWorldPanel(s.evolution.world).聲望);
});

test('raw grade boundaries never use display rounding; development rewards actual change and high maintenance',()=>{
  for(const [value,grade] of [[100,'SS'],[95,'SS'],[90,'S'],[80,'A'],[70,'B'],[60,'C'],[50,'D'],[40,'E'],[0,'F']]) {
    assert.equal(gradeForScore(value),grade);
    if(value>0&&value<100){assert.equal(gradeForScore(value+1e-10),grade);assert.notEqual(gradeForScore(value-1e-10),grade);}
  }
  assert.equal(gradeForScore(94.999999),'S');assert.equal(Math.round(94.999999),95);
  assert.equal(development(0,100),100);assert.equal(development(100,0),0);assert.equal(development(100,100),85);
  assert.ok(development(20,70)>development(60,70));assert.ok(development(20,20)<development(90,90));
  assert.deepEqual(Object.values(ANNUAL_LIMITS),[35,25,15,15,10]);assert.deepEqual(Object.values(CAREER_LIMITS),[30,25,15,15,10,5]);
});

test('annual evidence-backed metrics respect budgets, endpoints, source dedup and explicit synthetic labeling',()=>{
  for(const [q,b,a,score] of [[100,0,100,100],[0,100,0,0]]) {
    const f=fixture(1,q,b,a),out=rateAnnual(f.yearRefs[0],f.source);
    assert.equal(out.status,'synthetic');assert.equal(out.score,score);assert.equal(out.grade,score?'SS':'F');
  }
  const f=fixture(1),before=JSON.stringify([...f.records]),out=rateAnnual(f.yearRefs[0],f.source);
  for(const [name,limit] of Object.entries(ANNUAL_LIMITS))assert.ok(out.parts[name]>=0&&out.parts[name]<=limit);
  assert.equal(JSON.stringify([...f.records]),before);
  const summary=f.records.get('year:1');summary.evidenceRefs.push(...summary.evidenceRefs);
  assert.deepEqual(rateAnnual('year:1',f.source),out);
  const higher=f.records.get('outcome:1:handling');higher.quality=100;assert.ok(rateAnnual('year:1',f.source).score>out.score);
  assert.equal(rateAnnual('year:1',f.source).parts.relationships,out.parts.relationships);
  const high=fixture(1,100,100,100);assert.ok(rateAnnual('year:1',high.source).score>=95);
  const low=fixture(1,0,0,0);assert.ok(rateAnnual('year:1',low.source).score<40);
});

test('missing facts/outcomes/completion cannot be replaced by N6 receipts, defaults or successful-looking numbers',()=>{
  const f=fixture(1);assert.equal(rateAnnual('year:1').status,'insufficient');
  f.records.delete('fact:1:handling');let out=rateAnnual('year:1',f.source);assert.equal(out.status,'insufficient');assert.equal(out.score,null);
  const g=fixture(1);g.records.get('year:1').evidenceRefs=[];
  out=rateAnnual('year:1',g.source);assert.equal(out.status,'insufficient');assert.equal(out.missing.length,3);
  g.records.get('completion:1').outcome='failure';out=rateAnnual('year:1',g.source);assert.equal(out.status,'not-successful');assert.equal(out.grade,null);assert.ok(out.comparison);
  const receipt=fixture(1);receipt.records.set('outcome:1:handling',{id:'outcome:1:handling',sequence:1,date:'2026-08-28',changes:[]});assert.throws(()=>rateAnnual('year:1',receipt.source));
  const mixed=fixture(1);assert.throws(()=>rateAnnual('year:1',{...mixed.source,provenance:'formal'}));
  const missingCompletion=fixture(1);missingCompletion.records.delete('completion-fact:1');assert.equal(rateAnnual('year:1',missingCompletion.source).status,'insufficient');
  const falseFact=fixture(1);falseFact.records.get('fact:1:student').confirmed=false;assert.throws(()=>rateAnnual('year:1',falseFact.source));
  const alias=fixture(1),row=copy(alias.records.get('outcome:1:handling'));row.id='alias';alias.records.set('alias',row);alias.records.get('year:1').evidenceRefs.push('alias');assert.throws(()=>rateAnnual('year:1',alias.source));
});

test('annual evidence number is normalized, responsibility matters, and reused prestige is not another score',()=>{
  const f=fixture(1),baseline=rateAnnual('year:1',f.source);
  for(let i=0;i<100;i++) {
    const row=copy(f.records.get('outcome:1:handling')),fact=copy(f.records.get(row.factId));row.id=`extra:${i}`;row.factId=`extra-fact:${i}`;fact.id=row.factId;
    f.records.set(row.id,row);f.records.set(fact.id,fact);f.records.get('year:1').evidenceRefs.push(row.id);
  }
  assert.ok(Math.abs(rateAnnual('year:1',f.source).score-baseline.score)<1e-12);
  const a={...f.records.get('outcome:1:handling'),quality:100,completion:100,accountability:100,responsibility:1};
  const b={...a,quality:0,completion:0,accountability:0,responsibility:.1};assert.ok(outcomeScore([a,b])>90);
  const originalRelations=baseline.parts.relationships;
  f.records.get('end:1').states.聲望=0;const changed=rateAnnual('year:1',f.source);
  assert.equal(changed.parts.relationships,originalRelations);assert.ok(changed.parts.states<baseline.parts.states);
  assert.throws(()=>{f.records.get('end:1').states.聲望=NaN;rateAnnual('year:1',f.source);});
});

test('career independently scores 30 summaries and ten cohorts; year ratings are never averaged',()=>{
  const f=fixture(),before=JSON.stringify([...f.records]),out=career(f);
  assert.equal(out.status,'synthetic');assert.equal(out.details.cohorts.length,10);assert.equal(out.details.years,30);
  for(const [key,limit] of Object.entries(CAREER_LIMITS))assert.ok(out.parts[key]>=0&&out.parts[key]<=limit);
  const annualAverage=f.yearRefs.reduce((sum,id)=>sum+rateAnnual(id,f.source).score,0)/30;assert.notEqual(out.score,annualAverage);
  assert.equal(JSON.stringify([...f.records]),before);
  const duplicate=copy(f.records.get('year:1').evidenceRefs);f.records.get('year:1').evidenceRefs.push(...duplicate);assert.deepEqual(career(f),out);
  const low=fixture(30,0,100,0);assert.equal(career(low).score,0);
  const max=fixture(30,100,0,100);assert.equal(career(max).score,100);
  const noContribution=fixture();for(const r of noContribution.records.values())if(['continuity','contribution'].includes(r.kind))r.quality=r.completion=r.accountability=0;
  assert.equal(career(noContribution).parts.contribution,0);
  const weak=fixture();for(const r of weak.records.values())if(r.kind==='cohort'&&r.id==='cohort:0')r.importance=.1;
  weak.records.get('end:3').classroom.order=0;assert.notEqual(career(weak).parts.cohorts,out.parts.cohorts);
});

test('career requires complete evidence and rejects recycled students, wrong attempts and conflicting facts',()=>{
  const short=fixture(29);assert.equal(career(short).status,'insufficient');assert.equal(career(fixture(3)).grade,null);
  const mutations=[
    f=>{f.records.get('cohort:1').studentIds[0]=f.records.get('cohort:0').studentIds[0];},
    f=>{f.records.get('completion:2').attemptId='failed-retry';},
    f=>{f.records.get('year:2').year=1;},
    f=>{f.records.get('year:2').schoolId='other';},
    f=>{f.records.get('cohort:1').years=[4,5,7];},
    f=>{f.records.get('fact:2:handling').subjectIds=['stranger'];},
    f=>{f.records.get('outcome:2:handling').factId='fact:1:handling';},
    f=>{f.records.get('end:2').year=1;},
    f=>{f.records.get('end:2').attemptId='discarded-attempt';},
  ];
  for(const mutate of mutations){const f=fixture();mutate(f);assert.throws(()=>career(f));}
  const failure=fixture();failure.records.get('completion:30').outcome='failure';assert.equal(career(failure).status,'not-successful');
  const missing=fixture();missing.records.delete('outcome:10:student');assert.equal(career(missing).status,'insufficient');
  const none=fixture();for(const row of none.records.values())if(row.kind==='handling')row.significant=false;assert.equal(career(none).status,'insufficient');
  const noQuality=fixture();for(const summary of noQuality.records.values())if(summary.kind==='year-summary')summary.evidenceRefs=summary.evidenceRefs.filter(id=>!id.endsWith(':quality'));assert.equal(career(noQuality).status,'insufficient');
});

test('100,000 seeded state vectors are monotone, bounded, repeatable and preserve independent threshold signals',t=>{
  const rng=createRandom(20261101),bands={},began=performance.now();let sum=0,min=100,max=0,parallel=0;
  for(let i=0;i<100000;i++) {
    const s=Object.fromEntries(STATE_NAMES.map(name=>[name,rng.uniform(0,100)])),risk=crisisFromStates(s),name=STATE_NAMES[i%6];
    sum+=risk.score;min=Math.min(min,risk.score);max=Math.max(max,risk.score);bands[risk.band]=(bands[risk.band]??0)+1;
    parallel+=risk.band==='一般'&&Object.values(risk.single).some(x=>x.hit);
    const higher={...s,[name]:Math.min(100,s[name]+5)},next=crisisFromStates(higher);
    assert.ok(next.score>=risk.score&&next.compositeDepth<=risk.compositeDepth);assert.ok(next.single[name].depth<=risk.single[name].depth);
    if(i%1000===0)assert.deepEqual(crisisFromStates(JSON.parse(JSON.stringify(s))),risk);
  }
  assert.ok(parallel>0);assert.ok(min<15&&max>85);assert.ok(sum/100000>49&&sum/100000<51);
  t.diagnostic(JSON.stringify({stateVectors:100000,mean:sum/100000,min,max,bands,normalCompositeButSingleHit:parallel,elapsedMs:performance.now()-began}));
});

test('2,000 annual and 300 career synthetic samples retain score diversity, sensitivity, JSON replay and bounded memory',t=>{
  const rng=createRandom(99),began=performance.now(),scores=[],careerScores=[];let bytes=0;
  for(let i=0;i<2000;i++) {
    const f=fixture(1,rng.uniform(0,100),rng.uniform(0,100),rng.uniform(0,100));
    const out=rateAnnual('year:1',f.source);assert.ok(out.score>=0&&out.score<=100);scores.push(out.score);
    if(i%100===0){const data=JSON.parse(JSON.stringify([...f.records]));const records=new Map(data);assert.deepEqual(rateAnnual('year:1',{provenance:'synthetic',resolve:id=>records.get(id)}),out);}
  }
  for(let i=0;i<300;i++) {
    const f=fixture(30,rng.uniform(0,100),rng.uniform(0,100),rng.uniform(0,100));const out=career(f);
    assert.ok(out.score>=0&&out.score<=100);careerScores.push(out.score);
    if(i%30===0){const records=new Map(JSON.parse(JSON.stringify([...f.records])));assert.deepEqual(rateCareer({yearRefs:f.yearRefs,cohortRefs:f.cohortRefs},{provenance:'synthetic',resolve:id=>records.get(id)}),out);bytes=Buffer.byteLength(JSON.stringify([...f.records]));}
  }
  const stats=values=>({min:Math.min(...values),max:Math.max(...values),mean:values.reduce((a,b)=>a+b)/values.length});
  assert.ok(stats(scores).max-stats(scores).min>70);assert.ok(stats(careerScores).max-stats(careerScores).min>70);
  let retainedHeapDelta=null,retainedHeapSamples=null;
  if(typeof global.gc==='function') {
    const f=fixture();
    for(let i=0;i<100;i++)career(f); // Warm the stable source shape before measuring.
    global.gc();const before=process.memoryUsage().heapUsed;retainedHeapSamples=[];
    for(let batch=0;batch<4;batch++){
      for(let i=0;i<100;i++)career(f);
      global.gc();retainedHeapSamples.push(process.memoryUsage().heapUsed-before);
    }
    retainedHeapDelta=retainedHeapSamples.at(-1);
  }
  t.diagnostic(JSON.stringify({annual:stats(scores),annualSamples:2000,career:stats(careerScores),careerSamples:300,careerFixtureBytes:bytes,retainedHeapDelta,retainedHeapSamples,elapsedMs:performance.now()-began,heapMB:process.memoryUsage().heapUsed/1024**2}));
});

test('constant scores preserve exact thresholds under unequal weights; ordinary volume cannot erase major failure',()=>{
  for(const value of [0,25,40,50,55,60,70,80,90,95,100]) {
    assert.equal(weightedMean(Array(10).fill(value),[1,2,3,4,5,6,7,8,9,10]),value);
    assert.equal(crisisFromStates(states(value)).score,value);
    const row=fixture(1,value).records.get('outcome:1:handling');
    const result=outcomeScore([row,{...row,importance:.123,responsibility:.97}]);
    assert.equal(result,value);assert.equal(gradeForScore(result),gradeForScore(value));
  }
  assert.throws(()=>weightedMean([95,95],[0,0]));
  assert.throws(()=>weightedMean([95,95],[1,NaN]));
  const f=fixture(1,0,40,80),major=f.records.get('outcome:1:handling');
  const rows=[major];
  for(let i=0;i<1000;i++)rows.push({...major,id:`ordinary:${i}`,factId:`ordinary-fact:${i}`,quality:100,completion:100,accountability:100,significant:false});
  assert.equal(outcomeScore(rows),25);
});

test('adjacent representable thresholds and 200,000 integer vectors agree with exact integer arithmetic',()=>{
  function adjacent(value,up) {const view=new DataView(new ArrayBuffer(8));view.setFloat64(0,value);view.setBigUint64(0,view.getBigUint64(0)+(up?1n:-1n));return view.getFloat64(0);}
  for(const threshold of [25,40,55,70]) {
    assert.equal(crisisFromStates(states(adjacent(threshold,true))).band,crisisBand(threshold));
    assert.notEqual(crisisFromStates(states(adjacent(threshold,false))).band,crisisBand(threshold));
  }
  for(const threshold of [40,50,60,70,80,90,95]) {
    assert.equal(gradeForScore(adjacent(threshold,true)),gradeForScore(threshold));
    assert.notEqual(gradeForScore(adjacent(threshold,false)),gradeForScore(threshold));
  }
  const rng=createRandom(66);
  for(let i=0;i<200000;i++) {
    const s=Object.fromEntries(STATE_NAMES.map(name=>[name,rng.integer(0,100)]));
    const exact=STATE_NAMES.reduce((total,name)=>total+s[name]*CRISIS_WEIGHTS[name],0)/100;
    assert.equal(crisisFromStates(s).band,crisisBand(exact));
  }
});

test('formal authority adapter is contract-tested with an explicit mock, not real gameplay evidence',()=>{
  const f=fixture(1);
  // Test double only: no real success, fact or outcome is created by production code.
  for(const record of f.records.values())record.provenance='formal';
  const source={provenance:'formal',resolve:id=>f.records.get(id)};
  assert.equal(rateAnnual('year:1',source).status,'rated');
  f.records.delete('cohort:0');assert.equal(rateAnnual('year:1',source).status,'insufficient');
  const noMatching=fixture(1);noMatching.records.get('end:1').students=[];
  assert.equal(rateAnnual('year:1',noMatching.source).status,'insufficient');
  const wrong=fixture(1);wrong.records.get('outcome:1:student').subjectId='not-enrolled';
  wrong.records.get('fact:1:student').subjectIds=['not-enrolled'];assert.throws(()=>rateAnnual('year:1',wrong.source));
});
