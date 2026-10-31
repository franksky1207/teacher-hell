import test from 'node:test';
import assert from 'node:assert/strict';
import { performance } from 'node:perf_hooks';
import { createCandidate,confirmCandidate } from '../src/player/creation.js';
import { createWorld,ensureNPCs,ensureRelationships,playerEvaluationSources } from '../src/world/world.js';
import { directedKey } from '../src/world/relationships.js';
import { startEvolution,nextGameDate } from '../src/evolution/time.js';
import { startSettlement,settleResult,advanceSettlementDay,createSettlementSession,restoreSettlement,restoreSettlementCheckpoint,canonicalData } from '../src/changes/settlement.js';
import { registerPersonEvaluation } from '../src/social/reputation.js';
import { addSyntheticCohort } from '../simulation/fixtures.js';
const player=confirmCandidate(createCandidate({seed:6,playerId:'teacher',schoolId:'school'}));
const make=()=>createWorld({seed:7,player});
const natural=date=>({date,schoolYearId:'Y1',openingId:'O1',serviceYear:1});
const start=()=>startSettlement(startEvolution(make(),{seed:3,date:'2026-08-28',schoolYearId:'Y1',openingId:'O1'}),{seed:4,attemptId:'attempt'});
function request(cursor,id,operation){return {attemptId:cursor.attemptId,id,sequence:cursor.nextSequence,date:cursor.date,operation};}
const direct={type:'direct',changes:[{target:{kind:'player-person',id:'teacher'},code:'2-3',delta:3}]};

test('owned settlement session equals pure APIs across 90 dates, shocks, recovery, duplicates and JSON reload',()=>{
  let pure=start(),session=createSettlementSession(pure),date='2026-08-28';
  for(let i=0;i<90;i++) {
    if(i)date=nextGameDate(date);
    pure=advanceSettlementDay(pure,natural(date));session.advanceDay(natural(date));
    if(i%7===0) {
      const op=i%14?{type:'recovery',context:{kind:'weekend',periodId:'fixture',startHour:12,hours:4,availableHours:4,resources:1,permitted:true}}:{type:'shock',effects:[{target:{kind:'player-person',id:'teacher'},code:'2-2',severity:'major',direction:1,scale:1}]};
      const req=request(session.cursor(),`fixture:${i}`,op);
      pure=settleResult(pure,req);const receipt=session.settle(req);assert.deepEqual(receipt,pure.receipts.at(-1));
      session.settle(req);assert.deepEqual(session.snapshot(),pure);
    }
    if(i===45)session=createSettlementSession(JSON.parse(JSON.stringify(session.snapshot())));
  }
  assert.deepEqual(session.snapshot(),pure);
  assert.deepEqual(restoreSettlement(JSON.stringify(session.snapshot())),pure);
});

test('session owns all state, rejects partial updates, and locks shock target metadata against caller edits',()=>{
  const input=start(),session=createSettlementSession(input);session.advanceDay(natural('2026-08-28'));
  input.attemptId='external';const baseline=session.snapshot();
  const bad=request(session.cursor(),'invalid',{type:'direct',changes:[...direct.changes,{target:{kind:'person',id:'missing'},code:'2-1',delta:1}]});
  assert.throws(()=>session.settle(bad));assert.deepEqual(session.snapshot(),baseline);
  const req=request(session.cursor(),'shock',{type:'shock',effects:[{target:{kind:'player-person',id:'teacher'},code:'2-1',severity:'major',direction:1,scale:1}]});
  const returned=session.settle(req);req.operation.effects[0].target.id='mutated';returned.changes[0].target.id='mutated-too';
  assert.equal(session.snapshot().receipts[0].changes[0].target.id,'teacher');
  const pure=settleResult(baseline,request({attemptId:'attempt',date:'2026-08-28',nextSequence:1},'pure-shock',{type:'shock',effects:[{target:{kind:'player-person',id:'teacher'},code:'2-1',severity:'major',direction:1,scale:1}]}));
  const exported=session.snapshot();exported.receipts[0].changes[0].delta=Infinity;assert.throws(()=>createSettlementSession(exported));
  const outside=session.world();outside.player.current.person['2-3']=100;assert.notDeepEqual(outside,session.world());
  assert.equal(pure.receipts.length,1);
});

test('runtime NPC helpers preserve archived cohorts/relationships and only expose incoming player evaluations',()=>{
  const initial=make(),old=initial.classroom.studentIds[0],relation=structuredClone(initial.relationships[directedKey(old,'teacher')]);
  let world=addSyntheticCohort(initial,2,20);
  assert.equal(world.classroom.studentIds.length,40);assert.equal(Object.values(world.people).filter(p=>p.kind==='student').length,80);
  world=ensureNPCs(world,[{id:'outsider',roleIds:[35]}]);
  world=ensureRelationships(world,[[old,'teacher']]);assert.deepEqual(world.relationships[directedKey(old,'teacher')],relation);
  const [a,b]=world.classroom.studentIds;world=ensureRelationships(world,[[a,b]]);
  world=registerPersonEvaluation(world,{fromId:a,toId:b,scope:'synthetic-peer',basisId:'supplied',values:{'8-1':90,'8-2':20}});
  const views=playerEvaluationSources(world);assert.ok(views.every(v=>v.targetId==='teacher'));assert.equal(views.length,80);
});

test('receipt-indexed transactions avoid ledger-size work without dropping old replay protection',t=>{
  let baseline=advanceSettlementDay(start(),natural('2026-08-28'));
  baseline=settleResult(baseline,request({attemptId:'attempt',date:'2026-08-28',nextSequence:1},'first',direct));
  const results=[];
  for(const count of [0,1000,10000]) {
    const state=structuredClone(baseline);state.receipts=[];
    for(let i=0;i<count;i++) {const req=request({attemptId:'attempt',date:'2026-08-28',nextSequence:i+1},`saved:${i}`,direct);state.receipts.push({...structuredClone(baseline.receipts[0]),id:req.id,sequence:req.sequence,request:canonicalData(req)});}
    const began=performance.now(),session=createSettlementSession(state),restoreMs=performance.now()-began;
    const pureStart=performance.now();settleResult(state,request(session.cursor(),'pure-probe',direct));const pureMs=performance.now()-pureStart;
    const started=performance.now();for(let i=0;i<10;i++)session.settle(request(session.cursor(),`probe:${i}`,direct));
    const indexedMs=(performance.now()-started)/10;
    if(count) {const saved=JSON.parse(state.receipts[0].request),n=session.cursor().nextSequence;session.settle(saved);assert.equal(session.cursor().nextSequence,n);}
    assert.equal(session.snapshot().receipts.length,count+10);
    assert.deepEqual(restoreSettlementCheckpoint(session.checkpoint(),session.snapshot().receipts),session.snapshot());
    assert.throws(()=>restoreSettlementCheckpoint(session.checkpoint(),[]));
    results.push({count,restoreMs,pureMs,indexedMs,checkpointBytes:Buffer.byteLength(JSON.stringify(session.checkpoint())),bytes:Buffer.byteLength(JSON.stringify(session.snapshot()))});
  }
  t.diagnostic(JSON.stringify({ledgerScaling:results}));
});

test('person-factor projection is exactly equivalent for all eight ability sources under full N4 coupling',async()=>{
  const { proposeRecord,commitRecord,evolveWorldSnapshot }=await import('../src/evolution/step.js');
  let world=structuredClone(make()),record=structuredClone(world.player.current.person);
  const codes=['3-1','3-2','3-3','3-4','1-3','6-1','1-4','1-2'];
  for(let day=0;day<90;day++) {
    world.player.year=1+Math.floor(day/3);const seed=day+123;
    const holder={id:'["player-person","teacher"]',record,isPlayer:true,year:world.player.year,kind:'player-person'};
    record=commitRecord(record,proposeRecord(holder,seed),holder);
    world=evolveWorldSnapshot(world,seed);
    for(const code of codes)assert.equal(record[code],world.player.current.person[code]);
  }
});

test('unrelated NPCs, JSON key order and private-session imports do not change existing numerical streams',()=>{
  const original=make(),expanded=ensureNPCs(original,[{id:'unrelated',roleIds:[35]}]);
  function reversed(value) {if(Array.isArray(value))return value.map(reversed);if(value&&typeof value==='object')return Object.fromEntries(Object.entries(value).reverse().map(([k,v])=>[k,reversed(v)]));return value;}
  function run(world) {const s=createSettlementSession(startSettlement(startEvolution(world,{seed:9,date:'2026-08-28',schoolYearId:'Y1',openingId:'O1'}),{seed:10,attemptId:'attempt'}));let date='2026-08-28';for(let i=0;i<10;i++){s.advanceDay(natural(date));s.settle(request(s.cursor(),`change:${i}`,direct));date=nextGameDate(date);}return s.snapshot();}
  const a=run(original),b=run(expanded),c=run(reversed(original));
  assert.deepEqual(a.evolution.world.player,b.evolution.world.player);assert.deepEqual(a.random,b.random);assert.deepEqual(a.receipts,b.receipts);assert.deepEqual(a,c);
});

test('synthetic low/high current baselines never alter the validated new-career archive',async()=>{
  const {syntheticWorld}=await import('../simulation/durability.js');
  const {derivePanel,ABILITY_NAMES,STATE_NAMES}=await import('../src/player/panel.js');
  for(const profile of ['low','high','negative','recovery']) {
    const world=syntheticWorld(40,profile),panel=derivePanel(world.player.initial);
    assert.equal(ABILITY_NAMES.reduce((sum,name)=>sum+panel[name],0),240);
    assert.deepEqual(STATE_NAMES.map(n=>panel[n]),[100,100,100,40,100,100]);
  }
});

test('exact extreme class/school inputs survive natural updates, saturated impacts and latest crisis calculation',async()=>{
  const {worldCrisis}=await import('../src/assessment/crisis.js');
  for(const level of [0,100]) {
    const world=structuredClone(make());
    for(const code of Object.keys(world.classroom.values))world.classroom.values[code]=level;
    for(const code of Object.keys(world.school.values))world.school.values[code]=100-level;
    const session=createSettlementSession(startSettlement(startEvolution(world,{seed:88,date:'2026-08-28',schoolYearId:'Y1',openingId:'O1'}),{seed:89,attemptId:'attempt'}));
    session.advanceDay(natural('2026-08-28'));
    session.settle(request(session.cursor(),'extreme-context',{type:'direct',changes:[{target:{kind:'classroom',id:world.classroom.id},code:'9-1',delta:level?1000:-1000},{target:{kind:'school',id:'school'},code:'12-4',delta:level?-1000:1000}]}));
    const after=session.snapshot(),risk=worldCrisis(after.evolution.world);
    assert.equal(after.evolution.world.classroom.values['9-1'],level);
    assert.equal(after.evolution.world.school.values['12-4'],100-level);
    assert.ok(risk.score>=0&&risk.score<=100);assert.ok(!Object.hasOwn(risk,'gameOver'));
    session.advanceDay(natural('2026-08-28'));assert.deepEqual(session.snapshot(),after);
  }
});
