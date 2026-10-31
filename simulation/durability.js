/** Synthetic numeric pressure harness. No events, failures, narrative or gameplay pass rate. */
import assert from 'node:assert/strict';
import { writeFileSync } from 'node:fs';
import { performance } from 'node:perf_hooks';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { createCandidate,confirmCandidate } from '../src/player/creation.js';
import { ABILITY_NAMES,STATE_NAMES,derivePanel } from '../src/player/panel.js';
import { createWorld,ensureNPCs } from '../src/world/world.js';
import { validateWorld } from '../src/world/validation.js';
import { directedKey } from '../src/world/relationships.js';
import { attestPersonEvaluation,activateReputation,registerGroup,registerGroupEvaluation,deriveWorldPanel } from '../src/social/reputation.js';
import { startEvolution,nextGameDate,gameDate } from '../src/evolution/time.js';
import { proposeRecord,commitRecord } from '../src/evolution/step.js';
import { startSettlement,createSettlementSession } from '../src/changes/settlement.js';
import { shockDelta,recoveryChanges } from '../src/changes/model.js';
import { applyDelta,numericValue } from '../src/numeric/math.js';
import { createRandom } from '../src/numeric/random.js';
import { worldCrisis,crisisFromStates } from '../src/assessment/crisis.js';
import { captureAssessment } from '../src/assessment/evidence.js';
import { rateAnnual } from '../src/assessment/annual.js';
import { rateCareer } from '../src/assessment/career.js';
import { fixture,addSyntheticCohort } from './fixtures.js';
import { describe,correlation } from './statistics.js';

const digest=value=>createHash('sha256').update(JSON.stringify(value)).digest('hex');
const panelStatistics=rows=>Object.fromEntries([...ABILITY_NAMES,...STATE_NAMES].map(name=>[name,describe(rows.map(r=>r[name]))]));
const statePart=panel=>Object.fromEntries(STATE_NAMES.map(n=>[n,panel[n]]));
export function syntheticWorld(seed,profile='mixed') {
  const player=confirmCandidate(createCandidate({seed,playerId:'teacher',schoolId:'school'}));
  let world=structuredClone(createWorld({seed:seed+1,player}));
  assert.equal(ABILITY_NAMES.reduce((s,n)=>s+deriveWorldPanel(world)[n],0),240);
  assert.deepEqual(STATE_NAMES.map(n=>deriveWorldPanel(world)[n]),[100,100,100,40,100,100]);
  if(profile==='low'||profile==='high') {
    for(const code of ['3-1','3-2','3-3','3-4','1-3','6-1','1-4'])world.player.current.person[code]=profile==='low'?2:98;
    world.player.current.person['1-2']=profile==='low'?98:2;
  }
  if(profile==='negative') {world.player.current.work['11-1']=95;world.player.current.work['11-2']=5;world.school.values['12-4']=95;}
  if(profile==='recovery') {world.player.current.person['2-3']=80;world.player.current.person['2-2']=80;world.player.current.work['11-1']=20;}
  const [a,b,c]=world.classroom.studentIds;
  world=attestPersonEvaluation(world,{fromId:a,toId:'teacher',scope:'synthetic-numeric-assessment',basisId:'synthetic-input-not-history'});
  world=registerGroup(world,{id:'synthetic-group',kind:'local',scope:'numeric-fixture',memberIds:[a,b,c],values:{'9-2':60,'6-3':80,'6-4':20}});
  world=registerGroupEvaluation(world,{fromId:'synthetic-group',toId:'teacher',scope:'numeric-fixture',basisId:'supplied-not-real-event',originIds:[b],values:{'5-1':50,'5-2':50,'5-3':50,'5-4':50,'8-1':50,'8-2':50}});
  return activateReputation(world,[{sourceId:a,kind:'person',weight:1},{sourceId:'synthetic-group',kind:'group',weight:1}]);
}
function operations(session,day,profile,studentId) {
  const cursor=session.cursor(),base={attemptId:cursor.attemptId,date:cursor.date};let count=0;
  const settle=(id,operation)=>{const r=session.settle({...base,id:`synthetic:${day}:${id}`,sequence:session.cursor().nextSequence,operation});count++;return r;};
  if(day%45===0)settle('shock',{type:'shock',effects:[{target:{kind:'player-person',id:'teacher'},code:'2-3',severity:profile==='negative'?'extreme':'major',direction:day%90===0?1:-1,scale:profile==='negative'?2:1}]});
  if(profile==='negative'&&day%45===0)settle('compound-pressure',{type:'shock',effects:[
    ...['2-1','2-2'].map(code=>({target:{kind:'player-person',id:'teacher'},code,severity:'extreme',direction:1,scale:2})),
    ...['7-1','7-4'].map(code=>({target:{kind:'player-life',id:'teacher'},code,severity:'extreme',direction:-1,scale:2})),
    {target:{kind:'player-life',id:'teacher'},code:'7-2',severity:'extreme',direction:1,scale:2},
    {target:{kind:'player-work',id:'teacher'},code:'11-3',severity:'extreme',direction:-1,scale:2},
  ]});
  if(day%(profile==='recovery'?7:14)===3)settle('recovery',{type:'recovery',context:{kind:day%90<15?'holiday':'weekend',periodId:'synthetic-time-slot',startHour:12,hours:4,availableHours:6,resources:1,permitted:true}});
  if(day%120===20)settle('opinion',{type:'direct',changes:[
    {target:{kind:'reputation',id:directedKey(studentId,'teacher')},code:'8-1',delta:day%240<120?8:-8},
    {target:{kind:'reputation',id:directedKey(studentId,'teacher')},code:'8-2',delta:5},
    {target:{kind:'group-evaluation',id:directedKey('synthetic-group','teacher')},code:'8-2',delta:day%240<120?-5:5},
  ]});
  return count;
}

export function runWorldCase({seed,profile,years=30,maxDays=Infinity,progress=()=>{}}) {
  const began=performance.now(),init=performance.now();let world=syntheticWorld(seed,profile),initMs=performance.now()-init;
  let session=createSettlementSession(startSettlement(startEvolution(world,{seed:seed+2,date:'2026-08-28',schoolYearId:'synthetic-year:1',openingId:'provided-opening:1'}),{seed:seed+3,attemptId:'synthetic-attempt:1'}));
  const studentId=world.classroom.studentIds[0],initialPeople=Object.keys(world.people).length,initialPanel=deriveWorldPanel(world),rows=[],annual=[],archives=[],bands={},sizes=[],gcHeap=[],times={natural:0,transactions:0,reputation:0,crisis:0,save:0,restore:0};
  let date='2026-08-28',days=0,transactions=0,growthUp=0,growthDown=0,previous=initialPanel,replay=null;
  const sourceOnly=new Map();
  outer:for(let year=1;year<=years;year++) {
    if(year>1) {
      const old=session.snapshot();archives.push({attemptId:old.attemptId,random:old.random,receipts:old.receipts});
      session=createSettlementSession(startSettlement(old.evolution,{seed:seed+year+3,attemptId:`synthetic-attempt:${year}`}));
    }
    const nextOpening=`${2026+year}-08-28`;
    while(date<nextOpening) {
      const input={date,schoolYearId:`synthetic-year:${year}`,openingId:`provided-opening:${year}`,serviceYear:year};
      const t=performance.now();session.advanceDay(input);times.natural+=performance.now()-t;
      const tx=performance.now();transactions+=operations(session,days,profile,studentId);times.transactions+=performance.now()-tx;
      if(days%30===0) {
        world=session.world();const p=performance.now(),panel=deriveWorldPanel(world);times.reputation+=performance.now()-p;
        const c=performance.now(),risk=worldCrisis(world);times.crisis+=performance.now()-c;
        bands[risk.band]=(bands[risk.band]??0)+1;rows.push(panel);Object.values(panel).forEach(numericValue);
      }
      if(year===15&&date.endsWith('03-01'))replay={saved:session.snapshot(),date,nextDayIndex:days+1,inputs:[]};
      else if(replay&&replay.inputs.length<5) {
        replay.inputs.push({input,day:days});
        if(replay.inputs.length===5) {
          const restored=createSettlementSession(JSON.parse(JSON.stringify(replay.saved)));
          for(const step of replay.inputs){restored.advanceDay(step.input);operations(restored,step.day,profile,studentId);}
          assert.deepEqual(restored.snapshot(),session.snapshot());replay=null;
        }
      }
      if(date.endsWith('08-28')||date.endsWith('06-30')) {
        const snapshot=captureAssessment(session.world(),{id:`snapshot:${year}:${date}`,provenance:'synthetic',attemptId:`synthetic-attempt:${year}`});sourceOnly.set(snapshot.id,snapshot);
        assert.equal(rateAnnual(`missing-real-summary:${year}`,{provenance:'synthetic',resolve:id=>sourceOnly.get(id)}).status,'insufficient');
      }
      days++;date=nextGameDate(date);if(days>=maxDays)break outer;
    }
    world=session.world();const panel=deriveWorldPanel(world);
    for(const name of ABILITY_NAMES){growthUp+=panel[name]>previous[name];growthDown+=panel[name]<previous[name];}previous=panel;
    annual.push({year,panel});
    const s=performance.now(),saved=JSON.stringify(session.snapshot());times.save+=performance.now()-s;
    const r=performance.now(),restored=createSettlementSession(JSON.parse(saved));times.restore+=performance.now()-r;
    assert.deepEqual(restored.snapshot(),session.snapshot());session=restored;
    sizes.push(Buffer.byteLength(saved));if(typeof global.gc==='function'){global.gc();gcHeap.push(process.memoryUsage().heapUsed);}
    progress({seed,profile,year,days,elapsedMs:performance.now()-began,saveBytes:sizes.at(-1)});
  }
  const final=session.snapshot();world=final.evolution.world;validateWorld(world,{stage:'runtime'});
  if(maxDays===Infinity){assert.equal(world.player.year,years);assert.equal(days,gameDate(`${2026+years}-08-28`)-gameDate('2026-08-28'));}
  assert.equal(Object.keys(world.people).length,initialPeople);
  const members=world.classroom.studentIds.map(id=>world.people[id]);
  const serialized=JSON.stringify({active:final,archives});
  return {seed,profile,coverage:'continuous full world with first cohort retained; not a ten-cohort lifecycle',days,years:world.player.year,people:initialPeople,transactions,archivedAttempts:archives.length,receipts:archives.reduce((n,a)=>n+a.receipts.length,final.receipts.length),initialPanel,finalPanel:deriveWorldPanel(world),monthly:panelStatistics(rows),annual,growthUp,growthDown,bands,npcEmpathy:describe(members.map(p=>p.values['1-3'])),npcFatigue:describe(members.map(p=>p.values['2-3'])),familyStabilityCorrelation:correlation(members.map(p=>p.values['7-4']),members.map(p=>world.families[p.familyId].values['7-4'])),jsonBytes:Buffer.byteLength(serialized),yearSaveBytes:sizes,gcHeapBytes:gcHeap,timesMs:times,elapsedMs:performance.now()-began,digest:digest({active:final,archives}),assessment:'insufficient: no formal event outcomes or successful completion invented'};
}

/** Lower-layer 30 nominal years. Same N4/N6 formulas; not full date/world/lifecycle coverage. */
export function runFactorEnsemble({count=48,years=30}={}) {
  const began=performance.now(),profiles=['ordinary','low','high','negative','recovery','mixed'],rows=[],bands={};let up=0,down=0,proposals=0;
  const groups={};
  for(let index=0;index<count;index++) {
    const profile=profiles[index%profiles.length],seed=1000+index,rng=createRandom(seed);
    const state=confirmCandidate(createCandidate({seed,playerId:'teacher',schoolId:'school'})),sources=structuredClone(state.current);
    if(profile==='low'||profile==='high')for(const code of ['3-1','3-2','3-3','3-4','1-3','6-1'])sources.person[code]=profile==='low'?2:98;
    const initial=derivePanel(sources),yearValues=[];
    for(let year=1;year<=years;year++) {
      const before=derivePanel(sources);
      for(let day=0;day<365;day++) {
        const holder={id:'["player-person","teacher"]',record:sources.person,isPlayer:true,year,kind:'player-person'};
        sources.person=commitRecord(sources.person,proposeRecord(holder,rng.nextUint32()),holder);proposals++;
        if((profile==='negative'||profile==='mixed')&&day%30===0)sources.person['2-3']=applyDelta(sources.person['2-3'],shockDelta({severity:'extreme',direction:1,scale:profile==='negative'?2:1},rng));
        if((profile==='recovery'||profile==='mixed')&&day%7===0)for(const c of recoveryChanges(sources,{kind:'weekend',periodId:'synthetic-factor-time',startHour:12,hours:4,availableHours:4,resources:1,permitted:true},rng).changes){const record=c.target.kind==='player-person'?sources.person:sources.life;record[c.code]=applyDelta(record[c.code],c.delta);}
      }
      const panel=derivePanel(sources);for(const n of ABILITY_NAMES){up+=panel[n]>before[n];down+=panel[n]<before[n];}
      const risk=crisisFromStates(statePart(panel));bands[risk.band]=(bands[risk.band]??0)+1;yearValues.push(panel);Object.values(panel).forEach(numericValue);
    }
    const final=yearValues.at(-1);rows.push(final);(groups[profile]??=[]).push(final);
    assert.ok(Object.values(final).every(v=>Number.isFinite(v)&&v>=0&&v<=100));
    if(index===0)assert.equal(initial.聲望,40);
  }
  return {coverage:'person-factor projection only; 365-day nominal years, not a full world/calendar',count,years,personDays:proposals,growthUp:up,growthDown:down,bands,final:panelStatistics(rows),groups:Object.fromEntries(Object.entries(groups).map(([k,v])=>[k,panelStatistics(v)])),elapsedMs:performance.now()-began};
}

/** Ten independent supplied cohorts, sampled numeric windows and synthetic grading evidence. */
export function runCohortProbe() {
  const began=performance.now(),f=fixture(),rng=createRandom(333);let world=syntheticWorld(77),cohort=0;
  const yearlyScores=[],beforeCounts=[];
  for(let year=1;year<=30;year++) {
    const current=Math.floor((year-1)/3);
    if(current!==cohort){world=addSyntheticCohort(world,current,500+current);cohort=current;}
    world.player.year=year; // Explicit synthetic sampled-year baseline, not a clock jump in a live run.
    const record=f.records.get(`cohort:${current}`);record.studentIds=[...world.classroom.studentIds];
    const attemptId=`attempt:${year}`,start=captureAssessment(world,{id:`start:${year}`,provenance:'synthetic',attemptId});
    let session=createSettlementSession(startSettlement(startEvolution(world,{seed:year,date:`${2025+year}-08-28`,schoolYearId:`sample:${year}`,openingId:`sample-opening:${year}`}),{seed:year+100,attemptId}));
    let date=`${2025+year}-08-28`;for(let day=0;day<3;day++){session.advanceDay({date,schoolYearId:`sample:${year}`,openingId:`sample-opening:${year}`,serviceYear:year});date=nextGameDate(date);}
    world=session.world();const end=captureAssessment(world,{id:`end:${year}`,provenance:'synthetic',attemptId});
    f.records.set(start.id,start);f.records.set(end.id,end);
    const student=f.records.get(`outcome:${year}:student`);student.subjectId=world.classroom.studentIds[0];f.records.get(student.factId).subjectIds=[student.subjectId];
    for(const kind of ['handling','student','relationship','quality','continuity','contribution']){const r=f.records.get(`outcome:${year}:${kind}`);r.quality=rng.uniform(0,100);r.completion=rng.uniform(0,100);r.accountability=rng.uniform(0,100);}
    const result=rateAnnual(`year:${year}`,f.source);assert.equal(result.status,'synthetic');yearlyScores.push(result.score);beforeCounts.push(Object.keys(world.people).length);
  }
  world=ensureNPCs(world,[{id:'late-unrelated',roleIds:[35]}]);
  const t=performance.now(),total=rateCareer({yearRefs:f.yearRefs,cohortRefs:f.cohortRefs},f.source),careerMs=performance.now()-t;
  assert.equal(total.status,'synthetic');assert.equal(total.details.cohorts.length,10);
  return {coverage:'ten supplied synthetic cohorts, 90 sampled natural days; not continuous lifecycle',students:Object.values(world.people).filter(p=>p.kind==='student').length,people:Object.keys(world.people).length,relationships:Object.keys(world.relationships).length,peopleByYear:beforeCounts,annual:describe(yearlyScores),careerScore:total.score,careerGrade:total.grade,careerMs,jsonBytes:Buffer.byteLength(JSON.stringify({world,records:[...f.records]})),elapsedMs:performance.now()-began};
}

if(process.argv[1]===fileURLToPath(import.meta.url)) {
  const outIndex=process.argv.indexOf('--output'),output=outIndex>=0?process.argv[outIndex+1]:'/tmp/teacher-hell-durability.json';
  const short=process.argv.includes('--short-only');
  if(short) {
    const began=performance.now(),profiles=['ordinary','low','high','negative','recovery','mixed'],cases=[];
    for(let i=0;i<48;i++) {cases.push(runWorldCase({seed:2000+i,profile:profiles[i%6],years:1,maxDays:30}));if(i%8===7)process.stderr.write(JSON.stringify({shortWorlds:i+1})+'\n');}
    writeFileSync(output,JSON.stringify({kind:'synthetic-short-world-verification',cases,final:panelStatistics(cases.map(c=>c.finalPanel)),elapsedMs:performance.now()-began},null,2)+'\n');
  } else {
  const quick=process.argv.includes('--quick'),began=performance.now(),worlds=[];
  for(const [seed,profile] of [[11,'mixed'],[37,'recovery']])worlds.push(runWorldCase({seed,profile,years:quick?1:30,maxDays:quick?30:Infinity,progress:row=>process.stderr.write(JSON.stringify({progress:row})+'\n')}));
  const report={kind:'synthetic-numeric-verification-not-gameplay',worlds,ensemble:runFactorEnsemble({count:quick?6:48,years:quick?1:30}),cohorts:runCohortProbe(),elapsedMs:performance.now()-began};
  writeFileSync(output,JSON.stringify(report,null,2)+'\n');process.stdout.write(JSON.stringify({report:output,elapsedMs:report.elapsedMs,worldDays:worlds.map(w=>w.days)})+'\n');
  }
}
