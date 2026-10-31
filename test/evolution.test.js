import test from 'node:test';
import assert from 'node:assert/strict';
import { FIELDS } from '../src/numeric/dictionary.js';
import { applyDelta, reflectDelta } from '../src/numeric/math.js';
import { createRandom } from '../src/numeric/random.js';
import { updateValue } from '../src/numeric/record.js';
import { createCandidate,confirmCandidate } from '../src/player/creation.js';
import { derivePanel,ABILITY_NAMES } from '../src/player/panel.js';
import { createWorld,ensureNPCs,restoreWorld } from '../src/world/world.js';
import { validateWorld } from '../src/world/validation.js';
import { directedKey } from '../src/world/relationships.js';
import { FIELD_DYNAMICS,fieldDynamics,fieldRandom,naturalDelta,annualGrowthRate,dailyStability,stabilizeOrdinaryDelta } from '../src/evolution/model.js';
import { evolutionHolders,proposeRecord,coupledChanges,commitRecord,evolveWorldSnapshot } from '../src/evolution/step.js';
import { gameDate,nextGameDate,startEvolution,advanceDay,advanceDays,restoreEvolution,validateEvolution } from '../src/evolution/time.js';

const player=confirmCandidate(createCandidate({seed:1,playerId:'teacher',schoolId:'school'}));
const world=createWorld({seed:11,player});
const config={seed:20261101,date:'2026-08-28',schoolYearId:'SY-1',openingId:'actual-opening-1'};
const start=()=>startEvolution(world,config);
const input=(date,year=1)=>({date,schoolYearId:`SY-${year}`,openingId:`actual-opening-${year}`,serviceYear:year});
const total=sources=>ABILITY_NAMES.reduce((sum,name)=>sum+derivePanel(sources)[name],0);
const copy=x=>structuredClone(x);

test('48 dynamics profiles are complete, semantic, immutable, with held evidence channels',()=>{
  assert.deepEqual(Object.keys(FIELD_DYNAMICS),FIELDS.map(f=>f.code));
  for(const field of FIELDS) {const p=fieldDynamics(field.code);assert.ok(p.probability>=0&&p.probability<=1);assert.ok(p.amplitude>=0);assert.ok(Object.isFrozen(p));}
  for(const code of ['5-1','5-2','5-3','5-4','8-1','8-2']) {
    assert.equal(fieldDynamics(code).probability,0);assert.equal(naturalDelta(80,code,createRandom(0)),0);
  }
  assert.ok(fieldDynamics('1-1').amplitude<fieldDynamics('3-1').amplitude);
  assert.ok(fieldDynamics('3-1').amplitude<fieldDynamics('2-1').amplitude);
  assert.throws(()=>fieldDynamics('49-1'));
  assert.throws(()=>naturalDelta(null,'2-1',createRandom(0)));
  assert.throws(()=>{FIELD_DYNAMICS['1-1'].amplitude=100;});
});

test('natural reflection is bounded, distinct from direct saturation, and never hides invalid inputs',()=>{
  assert.equal(reflectDelta(100,20),80);assert.equal(reflectDelta(0,-20),20);
  assert.equal(reflectDelta(30,250),80);assert.equal(reflectDelta(30,-250),20);
  assert.equal(reflectDelta(33.125,0),33.125);
  assert.equal(applyDelta(100,20),100);assert.equal(applyDelta(0,-20),0);
  for(const delta of [Number.MAX_VALUE,-Number.MAX_VALUE]) assert.ok(Number.isFinite(reflectDelta(40,delta)));
  for(const bad of [null,NaN,Infinity,'1']) assert.throws(()=>reflectDelta(40,bad));
  assert.throws(()=>reflectDelta(101,0));
  const rng=createRandom(5);let max=0;
  for(let i=0;i<10000;i++) {
    const x=rng.next()*100,delta=(rng.next()-.5)*4000,value=reflectDelta(x,delta);
    assert.ok(value>=0&&value<=100);max=Math.max(max,Math.abs(value-x));
    assert.ok(Math.abs(reflectDelta(value,0)-value)<1e-12);
  }
  assert.ok(max>90);
});

test('civil game dates validate Gregorian leap days without a host clock/calendar',()=>{
  assert.equal(nextGameDate('2028-02-28'),'2028-02-29');assert.equal(nextGameDate('2028-02-29'),'2028-03-01');
  assert.equal(nextGameDate('2026-12-31'),'2027-01-01');assert.equal(nextGameDate('0001-01-01'),'0001-01-02');
  for(const date of ['2026-02-29','2026-04-31','2026-13-01','2026-1-01','0000-01-01','2026-01-01T00:00:00Z',null]) assert.throws(()=>gameDate(date));
  assert.throws(()=>nextGameDate('9999-12-31'));
});

test('daily atomic idempotency, strict date order and reload preserve draws/results',()=>{
  const baseline=start(),before=JSON.stringify(baseline);
  const first=advanceDay(baseline,input(config.date));
  assert.deepEqual(first,advanceDay(start(),input(config.date)));
  assert.equal(JSON.stringify(baseline),before);
  assert.notDeepEqual(first.random,baseline.random);
  assert.deepEqual(first,advanceDay(first,input(config.date)));
  assert.deepEqual(first,advanceDay(restoreEvolution(JSON.stringify(first)),input(config.date)));
  assert.deepEqual(first.world.player.initial,world.player.initial);
  assert.deepEqual(first.world.relationships,world.relationships);
  assert.deepEqual(first.world.reputations,world.reputations);
  assert.deepEqual(first.world.player.current.evaluations,world.player.current.evaluations);
  assert.equal(derivePanel(first.world.player.current).聲望,40);
  assert.deepEqual(first.world.random,world.random);
  for(const bad of [input('2026-08-27'),input('2026-08-30'),input(config.date,2),input('2026-08-29',3),{...input('2026-08-29'),openingId:'changed'}]) assert.throws(()=>advanceDay(first,bad));
  assert.throws(()=>advanceDay(baseline,input('2026-08-29')));
  assert.throws(()=>advanceDay(baseline,input(config.date,2)));
  const next=advanceDay(first,input('2026-08-29'));
  assert.deepEqual(next,advanceDay(restoreEvolution(JSON.stringify(first)),input('2026-08-29')));
  assert.deepEqual(advanceDays(baseline,[input(config.date),input('2026-08-29')]),next);
  assert.throws(()=>advanceDays(baseline,[input(config.date),input('2026-08-30')]));
  assert.deepEqual(JSON.stringify(baseline),before);
  assert.deepEqual(advanceDays(baseline,[]),baseline);
  assert.throws(()=>advanceDays(baseline,null));
});

test('school openings alone advance tenure; June, summer and August 1 have no automatic switch',()=>{
  const base=startEvolution(world,{...config,date:'2026-07-31'});
  const july=advanceDay(base,input('2026-07-31')),august=advanceDay(july,input('2026-08-01'));
  assert.equal(august.world.player.year,1);assert.equal(august.clock.openingId,config.openingId);
  const opening=advanceDay(august,input('2026-08-02',2)); // deliberately supplied fixture, no fixed real opening date
  assert.equal(opening.world.player.year,2);
  assert.deepEqual(advanceDay(opening,input('2026-08-02',2)),opening);
  assert.throws(()=>advanceDay(opening,input('2026-08-02',3)));
  assert.deepEqual(opening.world.player.initial,world.player.initial);
  const june=startEvolution(world,{...config,date:'2026-06-30'});
  assert.equal(advanceDay(june,input('2026-06-30')).world.player.year,1);
  // A saved opening baseline can independently replay without accumulating revoked results.
  assert.deepEqual(advanceDay(restoreEvolution(JSON.stringify(august)),input('2026-08-02',2)),opening);
});

test('runtime legality separates archival initial constraints from evolving current values',()=>{
  const changed=copy(world);
  changed.player.current.person=updateValue(changed.player.current.person,'3-1',10);
  changed.player.current.person=updateValue(changed.player.current.person,'2-3',40);
  changed.player.year=10;
  const sameSourcesOlder=copy(world);sameSourcesOlder.player.year=30;
  assert.deepEqual(derivePanel(sameSourcesOlder.player.current),derivePanel(world.player.current));
  assert.notEqual(total(changed.player.current),240);
  assert.equal(total(changed.player.initial),240);
  validateWorld(changed,{stage:'runtime'});
  assert.deepEqual(restoreWorld(changed,{stage:'runtime'}),changed);
  validateEvolution(startEvolution(changed,config));
  const roster=copy(world);roster.classroom.studentIds.pop();
  assert.throws(()=>validateWorld(roster));validateWorld(roster,{stage:'runtime'});
  assert.throws(()=>validateWorld(world,{stage:'unknown'}));
  const malformed=copy(world);malformed.careLinks[0].studentId={};
  assert.throws(()=>validateWorld(malformed,{stage:'runtime'}));
  const invalidBasis=copy(world),care=world.careLinks[0];
  invalidBasis.people.null={...copy(world.people[care.caregiverId]),id:'null'};
  invalidBasis.careLinks.push({studentId:care.studentId,caregiverId:'null'});
  const [a,b]=world.classroom.studentIds;
  invalidBasis.relationships[directedKey(a,b)]={fromId:a,toId:b,basis:{kind:'care-assignment',referenceId:world.classroom.id},values:{'5-1':50,'5-2':50,'5-3':50,'5-4':50}};
  assert.throws(()=>validateWorld(invalidBasis,{stage:'runtime'}));
  const corrupt=copy(changed);corrupt.player.initial.person['3-1']=0;
  assert.throws(()=>validateWorld(corrupt,{stage:'runtime'}));
});

test('adding unrelated NPCs or reversing JSON iteration order does not alter existing outcomes',()=>{
  const baseline=start(),added=copy(baseline);
  added.world=ensureNPCs(added.world,[{id:'unrelated-outside-NPC',roleIds:[35]}]);
  const one=advanceDay(baseline,input(config.date)),two=advanceDay(added,input(config.date));
  for(const id of Object.keys(one.world.people)) assert.deepEqual(one.world.people[id],two.world.people[id]);
  assert.deepEqual(one.world.player,two.world.player);assert.deepEqual(one.world.school,two.world.school);
  assert.deepEqual(one.random,two.random);
  function reverse(value) {
    if(Array.isArray(value)) return value.map(reverse);
    if(value&&typeof value==='object') return Object.fromEntries(Object.entries(value).reverse().map(([k,v])=>[k,reverse(v)]));
    return value;
  }
  assert.deepEqual(one,advanceDay(reverse(baseline),reverse(input(config.date))));
  assert.deepEqual(evolveWorldSnapshot(world,42),evolveWorldSnapshot(reverse(world),42));
});

test('one-depth coupling uses only autonomous proposals; unset sources/targets are never imputed',()=>{
  const holder={id:JSON.stringify(['player-person','teacher']),kind:'player-person',isPlayer:true,year:9,record:{'2-2':50,'2-3':50,'7-1':null}};
  const base={'2-2':10,'2-3':-4};
  const all=new Map([[JSON.stringify(['player-work','teacher']),{'11-1':5,'11-2':-2}]]);
  const coupled=coupledChanges(holder,base,all);
  assert.ok(Math.abs(coupled['2-3']-(-4+.18*5-.12*(-2)+.12*10))<1e-12);
  assert.equal(coupled['2-2'],10+.12*(-4));
  assert.ok(!Object.hasOwn(coupled,'7-1'));
  const result=commitRecord(holder.record,coupled,holder);
  const scale=dailyStability(9);
  assert.ok(Math.abs(result['2-2']-(50+coupled['2-2']*scale))<1e-12); // exactly once, not scale²
  assert.equal(result['7-1'],null);
  const proposed=proposeRecord({...holder,record:{'2-1':null,'1-1':5}},100);
  assert.ok(!Object.hasOwn(proposed,'2-1'));assert.ok(!Object.hasOwn(proposed,'1-2'));
  assert.throws(()=>commitRecord(holder.record,{'7-1':1}));assert.throws(()=>commitRecord(holder.record,{'1-1':1}));
  assert.deepEqual(base,{'2-2':10,'2-3':-4});
  const missing={...holder,isPlayer:false,kind:'person',familyId:'missing'};
  assert.throws(()=>coupledChanges(missing,base,new Map()));
});

test('tenure is diminishing, symmetric for ordinary deltas, never applied to direct N1 inputs',()=>{
  assert.equal(annualGrowthRate(1),0);assert.equal(dailyStability(1),1);
  assert.ok(annualGrowthRate(2)>annualGrowthRate(10)&&annualGrowthRate(10)>annualGrowthRate(30));
  assert.ok(dailyStability(30)>.35&&dailyStability(30)<dailyStability(10));
  for(const year of [1,2,10,30]) for(const delta of [.1,1,10,25]) {
    assert.equal(stabilizeOrdinaryDelta(-delta,year),-stabilizeOrdinaryDelta(delta,year));
    assert.ok(Math.abs(stabilizeOrdinaryDelta(delta,year))<=Math.abs(delta));
  }
  assert.equal(applyDelta(90,-80),10); // direct major input, no age argument or hidden daily shield
  for(const bad of [0,-1,1.5,NaN,'1']) {assert.throws(()=>annualGrowthRate(bad));assert.throws(()=>dailyStability(bad));}
  assert.throws(()=>stabilizeOrdinaryDelta(NaN,1));
  assert.throws(()=>fieldRandom(NaN,'a','b'));assert.throws(()=>fieldRandom(1,null,'b'));
  // First year gives no extra tenure award, identical autonomous skill noise to a nonplayer.
  assert.equal(naturalDelta(40,'3-1',createRandom(50),{isPlayer:true,year:1}),naturalDelta(40,'3-1',createRandom(50)));
});

test('corrupt cursor, date, random and current sources fail without modifying a prior snapshot',()=>{
  const baseline=start();
  for(const change of [s=>{s.version=2;},s=>{s.clock.lastNaturalDate='2026-08-27';},s=>{s.clock.date='2026-02-30';},s=>{s.random.state=-1;},s=>{s.world.player.current.life['7-1']=null;}]) {
    const bad=copy(baseline);change(bad);assert.throws(()=>restoreEvolution(bad));assert.throws(()=>advanceDay(bad,input(config.date)));
  }
  assert.deepEqual(restoreEvolution(JSON.stringify(baseline)),baseline);
  assert.throws(()=>advanceDay(baseline,{...input(config.date),serviceYear:1.5}));
  assert.throws(()=>advanceDay(baseline,{...input(config.date),extra:true}));
});


test('growth readiness is read once from pre-update adaptation, not a hidden factor or panel bonus',()=>{
  let exercised=false;
  for(let seed=0;seed<2000;seed++) {
    const holder={id:'readiness-fixture',kind:'player-person',isPlayer:true,year:10,record:{'3-1':40,'3-4':0}};
    const low=proposeRecord(holder,seed);
    const high=proposeRecord({...holder,record:{'3-1':40,'3-4':100}},seed);
    if(low['3-1']!==0) {
      assert.ok(high['3-1']>low['3-1']);exercised=true;break;
    }
  }
  assert.ok(exercised);
  assert.throws(()=>proposeRecord({id:'unset',isPlayer:true,year:10,record:{'3-1':40,'3-4':null}},1));
  assert.throws(()=>naturalDelta(40,'3-1',createRandom(0),{practiceScale:2}));
});


test('school workload coupling requires actual class membership, not a generic NPC role',()=>{
  const all=new Map([['school-driver',{'11-1':10}]]),base={'2-3':0};
  const outside={id:'outside',kind:'person',isPlayer:false,schoolExposure:0,record:{'2-3':50}};
  assert.equal(coupledChanges(outside,base,all)['2-3'],0);
  assert.ok(Math.abs(coupledChanges({...outside,schoolExposure:.25},base,all)['2-3']-.45)<1e-12);
  const holders=evolutionHolders(world);
  assert.ok(holders.filter(h=>h.kind==='person'&&h.schoolExposure>0).length===40);
});
