import test from 'node:test';
import assert from 'node:assert/strict';
import { performance } from 'node:perf_hooks';
import { createRandom } from '../src/numeric/random.js';
import { derivePanel } from '../src/player/panel.js';
import { createCandidate,confirmCandidate } from '../src/player/creation.js';
import { createWorld,ensureRelationships,ensureNPCs } from '../src/world/world.js';
import { directedKey } from '../src/world/relationships.js';
import { startEvolution,advanceDay,nextGameDate } from '../src/evolution/time.js';
import { deriveWorldPanel,attestPersonEvaluation,activateReputation,registerGroup,registerGroupEvaluation,registerPersonEvaluation } from '../src/social/reputation.js';
import { SHOCK_RANGES,shockDelta,RECOVERY_PROFILES,recoveryChanges,validateRecovery } from '../src/changes/model.js';
import { targetRecord } from '../src/changes/targets.js';
import { canonicalData,startSettlement,restoreSettlement,validateSettlement,settleResult,settleResults,advanceSettlementDay,advanceSchedule } from '../src/changes/settlement.js';
const copy=x=>structuredClone(x);
const player=confirmCandidate(createCandidate({seed:3,playerId:'teacher',schoolId:'school'}));
const makeWorld=()=>createWorld({seed:8,player});
const natural=date=>({date,schoolYearId:'Y1',openingId:'O1',serviceYear:1});
function start(world=makeWorld(),attemptId='Y1:A1') {
  let e=startEvolution(world,{seed:100,date:'2026-08-28',schoolYearId:'Y1',openingId:'O1'});
  e=advanceDay(e,natural('2026-08-28'));
  return startSettlement(e,{seed:200,attemptId});
}
const target=(kind='player-person',id='teacher')=>({kind,id});
const change=(code,delta,t=target())=>({target:t,code,delta});
const request=(state,id,operation)=>({attemptId:state.attemptId,id,sequence:state.receipts.length+1,date:state.evolution.clock.date,operation});
const direct=(state,id,changes)=>request(state,id,{type:'direct',changes});
const context=(kind='weekend',hours=4)=>({kind,periodId:'provided-period',startHour:12,hours,availableHours:8,resources:1,permitted:true});
function strained(seed=1) {
  const world=copy(makeWorld()),rng=createRandom(seed),s=world.player.current;
  for(const code of ['2-1','2-2','2-3']) s.person[code]=rng.uniform(20,90);
  s.person['2-4']=rng.uniform(10,70);s.life['7-4']=rng.uniform(20,80);
  s.work['11-1']=80;s.work['11-2']=10;
  return world;
}

test('direct changes saturate sequentially, permit extremes, and never apply tenure reduction',()=>{
  let s=start();s.evolution.world.player.current.person['2-3']=20;
  const before=copy(s);
  const r=direct(s,'one',[change('2-3',-50),change('2-3',10),change('2-2',0),change('2-1',.25)]);
  const a=settleResult(s,r);assert.equal(a.evolution.world.player.current.person['2-3'],10);
  assert.equal(a.evolution.world.player.current.person['2-1'],s.evolution.world.player.current.person['2-1']+.25);
  assert.deepEqual(s,before);
  const b=settleResult(a,direct(a,'two',[change('2-3',Number.MAX_VALUE),change('2-3',-Number.MAX_VALUE)]));
  assert.equal(b.evolution.world.player.current.person['2-3'],0);
  const senior=copy(s);senior.evolution.world.player.year=30;
  const old=settleResult(senior,r);
  assert.deepEqual(old.evolution.world.player.current,a.evolution.world.player.current);
  let repeated=s;for(let i=0;i<4;i++) repeated=settleResult(repeated,direct(repeated,`hit:${i}`,[change('3-1',-30)]));
  assert.equal(repeated.evolution.world.player.current.person['3-1'],0);
  assert.deepEqual(b.evolution.clock,s.evolution.clock);assert.deepEqual(b.evolution.random,s.evolution.random);
});

test('confirmation IDs, strict order, retry namespace and JSON preserve once-only results',()=>{
  const s=start(),r=request(s,'shock',{type:'shock',effects:[{target:target(),code:'2-3',severity:'extreme',direction:1,scale:2}]});
  const next=settleResult(s,r);
  assert.deepEqual(settleResult(next,r),next);
  assert.deepEqual(settleResult(restoreSettlement(JSON.stringify(next)),copy(r)),next);
  assert.throws(()=>settleResult(next,{...r,operation:{type:'direct',changes:[]}}));
  assert.throws(()=>settleResult(s,{...r,sequence:2}));
  assert.throws(()=>settleResult(s,{...r,date:'2026-08-29'}));
  assert.throws(()=>settleResult(s,{...r,attemptId:'Y1:A2'}));
  const retry=start(s.evolution.world,'Y1:A2');
  assert.equal(settleResult(retry,{...r,attemptId:'Y1:A2'}).receipts.length,1);
  assert.deepEqual(settleResults(s,[r,r]),next);
  const bad=copy(next);bad.receipts[0].sequence=2;assert.throws(()=>restoreSettlement(bad));
  const changed=copy(next);changed.receipts[0].request='{}';assert.throws(()=>restoreSettlement(changed));
});

test('illegal multi-holder transactions and malformed JSON inputs reject atomically without drawing',()=>{
  const s=start(),snapshot=copy(s);
  for(const invalid of [change('49-1',1),change('2-3',NaN),change('2-3',Infinity),change('8-1',2),change('2-1',1,target('person','missing')),change('聲望',10),change('2-1',3,target('panel'))]) {
    assert.throws(()=>settleResult(s,direct(s,'invalid',[change('2-3',25),invalid])));
    assert.deepEqual(s,snapshot);
  }
  const unset=copy(s);unset.evolution.world.player.current.person['2-3']=null;
  assert.throws(()=>settleResult(unset,direct(unset,'null',[change('2-3',1)])));
  const r=direct(s,'getter',[]);let called=false;
  Object.defineProperty(r.operation.changes,0,{enumerable:true,get(){called=true;return change('2-3',1);}});
  assert.throws(()=>settleResult(s,r));assert.equal(called,false);
  for(const value of [undefined,()=>{},[,,],Object.assign([],{extra:1}),{bad:undefined}]) assert.throws(()=>canonicalData(value));
  assert.equal(canonicalData({b:2,a:[1,null]}),canonicalData({a:[1,null],b:2}));
  const baseline=startEvolution(makeWorld(),{seed:1,date:'2026-08-28',schoolYearId:'Y1',openingId:'O1'});
  const pending=startSettlement(baseline,{seed:1,attemptId:'a'});
  assert.throws(()=>settleResult(pending,direct(pending,'too-early',[])));
});

test('all canonical holders update independently; formal source changes rederive reputation',()=>{
  let w=makeWorld();const [a,b]=w.classroom.studentIds;
  w=attestPersonEvaluation(w,{fromId:a,toId:'teacher',scope:'assessment',basisId:'provided'});
  w=ensureRelationships(w,[[a,b]]);
  w=registerPersonEvaluation(w,{fromId:a,toId:b,scope:'peer',basisId:'peer-basis',values:{'8-1':90,'8-2':90}});
  w=registerGroup(w,{id:'club',kind:'local',scope:'club',memberIds:[a,b],values:{'9-2':60,'6-3':80,'6-4':10}});
  w=registerGroupEvaluation(w,{fromId:'club',toId:'teacher',scope:'club',basisId:'club-basis',originIds:[b],values:{'5-1':50,'5-2':50,'5-3':50,'5-4':50,'8-1':50,'8-2':50}});
  w=activateReputation(w,[{sourceId:a,kind:'person',weight:1},{sourceId:'club',kind:'group',weight:1}]);
  const s=start(w),before=copy(s.evolution.world),incoming=directedKey(a,'teacher');
  const family=Object.keys(w.families)[0];
  const changes=[change('2-3',10),change('7-4',-10,target('player-life')),change('11-1',20,target('player-work')),change('5-4',15,target('player-outlook')),change('2-1',15,target('person',a)),change('7-1',-10,target('family',family)),change('9-1',-20,target('classroom',w.classroom.id)),change('6-3',10,target('group','club')),change('12-4',30,target('school','school')),change('5-1',-10,target('relationship',incoming)),change('8-1',10,target('reputation',incoming)),change('8-2',10,target('reputation',incoming)),change('8-1',-20,target('reputation',directedKey(a,b))),change('8-2',30,target('group-evaluation',directedKey('club','teacher')))];
  const out=settleResult(s,direct(s,'multi',changes)),after=out.evolution.world;
  assert.deepEqual(after.player.initial,before.player.initial);
  assert.deepEqual(after.relationships[directedKey('teacher',a)],before.relationships[directedKey('teacher',a)]);
  assert.deepEqual(after.people[b],before.people[b]);
  assert.notEqual(deriveWorldPanel(after).聲望,deriveWorldPanel(before).聲望);
  assert.equal(after.reputations[incoming].values['8-2'],Math.min(100,before.reputations[incoming].values['8-2']+10));
  assert.equal(targetRecord(after,target('group',w.classroom.id)),after.classroom.values);
  assert.equal(targetRecord(after,target('group','school')),after.school.values);
  assert.throws(()=>targetRecord(after,target('group','missing')));
  assert.throws(()=>targetRecord(after,target('player-person','other')));
});

test('50,000 samples per shock class preserve reference ranges, tails, signs and fixed-seed independence',t=>{
  const stats={};
  for(const [severity,[lo,hi]] of Object.entries(SHOCK_RANGES)) {
    const rng=createRandom(123),again=createRandom(123);let sum=0,negativeSum=0,min=Infinity,max=0,inside=0,small=0,large=0;
    for(let i=0;i<50000;i++) {
      const d=shockDelta({severity,direction:1,scale:1},rng);
      const negative=shockDelta({severity,direction:-1,scale:1},again);
      assert.ok(Math.abs(d+negative/1.15)<1e-12);negativeSum+=negative;
      min=Math.min(min,d);max=Math.max(max,d);sum+=d;
      if(d<lo)small++;else if(d>hi)large++;else inside++;
    }
    assert.ok(inside/50000>.83&&inside/50000<.87);assert.ok(small>4000&&large>2000);
    stats[severity]={mean:sum/50000,negativeMean:negativeSum/50000,min,max,referenceFraction:inside/50000};
  }
  assert.ok(stats.extreme.max>100);
  assert.equal(shockDelta({severity:'major',direction:0,scale:10},createRandom(1)),0);
  for(const bad of [{severity:'bad',direction:1,scale:1},{severity:'daily',direction:2,scale:1},{severity:'daily',direction:1,scale:-1},{severity:'extreme',direction:1,scale:Number.MAX_VALUE}]) assert.throws(()=>shockDelta(bad,createRandom(1)));
  t.diagnostic(JSON.stringify(stats));
});

test('recovery contexts validate time/resources and use distinct raw skills without tenure guarantees',()=>{
  const s=strained().player.current;
  for(const kind of Object.keys(RECOVERY_PROFILES)) {
    const c=context(kind),rng=createRandom(5),a=recoveryChanges(s,c,rng);
    assert.deepEqual(a,recoveryChanges(s,c,createRandom(5)));
    assert.ok(a.changes.every(c=>c.target.kind.startsWith('player-')));
  }
  for(const mutate of [c=>{c.hours=0;},c=>{c.hours=10;},c=>{c.resources=0;},c=>{c.permitted=false;},c=>{c.startHour=23;},c=>{c.kind='event';},c=>{c.availableHours=25;}]) {const c=context();mutate(c);assert.throws(()=>validateRecovery(c));}
  let settled=start(strained()),r=request(settled,'rest',{type:'recovery',context:context()});
  const before=copy(settled),after=settleResult(settled,r);
  assert.deepEqual(settleResult(after,r),after);assert.deepEqual(settled,before);
  assert.throws(()=>settleResult(after,request(after,'renamed',{type:'recovery',context:{...context(),periodId:'renamed'}})));
  assert.deepEqual(after.evolution.clock,settled.evolution.clock);
  assert.deepEqual(after.evolution.world.player.initial,settled.evolution.world.player.initial);
});

test('weekend rates count actual N2 state improvement, separately from favorable attempts and full states',t=>{
  const rng=createRandom(20261101);const stats={};
  for(const ability of [0,40,100]) {
    const w=strained(10),sources=w.player.current;
    for(const code of ['3-1','3-2','3-3','3-4']) sources.person[code]=ability;
    const before=derivePanel(sources);let attempted=0,actual=0,negative=0,none=0,opportunities=0,totalMagnitude=0;
    for(let i=0;i<10000;i++) {
      const out=recoveryChanges(sources,context(),rng),changed={player:{current:copy(sources)}};
      attempted+=out.favorableAttempt;opportunities+=out.opportunity;
      for(const c of out.changes) {const record=targetRecord(changed,c.target);record[c.code]+=c.delta;totalMagnitude+=Math.abs(c.delta);}
      const after=derivePanel(changed.player.current),names=['體力','精神','抗壓','聲望','熱忱','情緒'];
      const improved=names.some(n=>after[n]>before[n]);actual+=improved;none+=!improved;negative+=names.some(n=>after[n]<before[n]);
    }
    assert.equal(opportunities,10000);assert.ok(actual/10000>=.70&&actual/10000<=.80);assert.equal(actual,attempted);assert.ok(none>0&&negative>0);
    stats[ability]={samples:10000,opportunities,favorableAttempts:attempted,actualImproved:actual,noImprovement:none,negative,meanAbsDelta:totalMagnitude/10000};
  }
  const full=makeWorld().player.current;let actual=0,attempts=0;
  for(let i=0;i<1000;i++) {
    const out=recoveryChanges(full,context(),rng),changed={player:{current:copy(full)}};
    attempts+=out.favorableAttempt;assert.equal(out.opportunity,false);
    if(out.favorableAttempt) assert.equal(out.changes.length,0);
    for(const c of out.changes) targetRecord(changed,c.target)[c.code]+=c.delta;
    const before=derivePanel(full),after=derivePanel(changed.player.current);
    actual+=['體力','精神','抗壓','聲望','熱忱','情緒'].some(name=>after[name]>before[name]);
  }
  assert.equal(actual,0);stats.full={samples:1000,favorableAttempts:attempts,actualImproved:actual,opportunities:0};
  assert.ok(stats[100].meanAbsDelta>stats[0].meanAbsDelta);
  t.diagnostic(JSON.stringify(stats));
});

test('holiday daily fold equals fast schedule, keeps natural RNG separate and avoids forced full recovery',()=>{
  const s=start(strained()),days=[];let slow=s,date=s.evolution.clock.date;
  for(let i=0;i<14;i++) {
    if(i)date=nextGameDate(date);
    const n=natural(date);slow=advanceSettlementDay(slow,n);
    const r=request(slow,`holiday:${i}`,{type:'recovery',context:context('holiday',8)});
    days.push({natural:n,results:[r]});slow=settleResult(slow,r);
  }
  const fast=advanceSchedule(s,days);assert.deepEqual(fast,slow);
  assert.deepEqual(restoreSettlement(JSON.stringify(fast)),fast);
  assert.deepEqual(advanceSettlementDay(fast,natural(date)),fast);
  assert.deepEqual(fast.evolution.world.relationships,s.evolution.world.relationships);
  assert.deepEqual(fast.evolution.world.reputations,s.evolution.world.reputations);
  assert.ok(deriveWorldPanel(fast.evolution.world).精神<100);
  assert.ok(fast.evolution.world.player.current.work['11-1']>0);
  assert.equal(deriveWorldPanel(fast.evolution.world).聲望,40);
  assert.equal(fast.receipts.length,14);
  assert.throws(()=>settleResult(fast,{...days[0].results[0],id:'old-period-again',sequence:15}));
  const source=strained().player.current;
  for(let seed=0;seed<100;seed++) {
    const short=recoveryChanges(source,context('holiday',1),createRandom(seed));
    const long=recoveryChanges(source,context('holiday',8),createRandom(seed));
    if(short.favorableAttempt) {assert.ok(Math.abs(long.changes[0].delta)>Math.abs(short.changes[0].delta));assert.ok(Math.abs(long.changes[0].delta)<100);}
  }
});

test('receipt storage grows per result without world snapshots; sustained alternating transactions stay bounded',t=>{
  let s=start(strained());const began=performance.now();
  for(let i=0;i<300;i++) s=settleResult(s,direct(s,`alternating:${i}`,[change('2-3',i%2?25:-40)]));
  const transactionMs=(performance.now()-began)/300;
  const fat=s.evolution.world.player.current.person['2-3'];assert.ok(fat>=0&&fat<=100);
  let retainedHeapDelta=null;
  if(typeof global.gc==='function') {
    global.gc();const before=process.memoryUsage().heapUsed;
    for(let i=0;i<20;i++) validateSettlement(s);
    global.gc();retainedHeapDelta=process.memoryUsage().heapUsed-before;
  }
  const ledgerBytes=Buffer.byteLength(JSON.stringify(s.receipts)),worldBytes=Buffer.byteLength(JSON.stringify(s.evolution.world));
  assert.ok(ledgerBytes<worldBytes);assert.ok(s.receipts.every(r=>!Object.hasOwn(r,'world')));
  const replay=restoreSettlement(JSON.stringify(s));assert.deepEqual(replay,s);
  const capacity=copy(s),template=capacity.receipts[0],points=[];
  for(const n of [1000,5000,10000]) {
    while(capacity.receipts.length<n) {
      const sequence=capacity.receipts.length+1,id=`capacity:${sequence}`,r={...template,id,sequence};
      const req=JSON.parse(template.request);req.id=id;req.sequence=sequence;r.request=canonicalData(req);
      capacity.receipts.push(r);
    }
    const started=performance.now();validateSettlement(capacity);
    points.push({receipts:n,bytes:Buffer.byteLength(JSON.stringify(capacity.receipts)),validationMs:performance.now()-started});
  }
  t.diagnostic(JSON.stringify({actualTransactions:300,transactionMs,retainedHeapDelta,ledgerBytes,worldBytes,capacity:points,heapMB:process.memoryUsage().heapUsed/1024**2}));
});

test('N4/N6 cursors remain independent, batch failure publishes nothing, and receipt corruption is rejected',()=>{
  const s=start(strained()),snapshot=copy(s);
  const r=request(s,'random-shock',{type:'shock',effects:[{target:target(),code:'2-3',severity:'major',direction:1,scale:1}]});
  const hit=settleResult(s,r);
  assert.deepEqual(hit.evolution.random,s.evolution.random);assert.notDeepEqual(hit.random,s.random);
  const next=advanceSettlementDay(hit,natural('2026-08-29'));
  assert.deepEqual(next.random,hit.random);
  assert.deepEqual(next.evolution.random,advanceSettlementDay(s,natural('2026-08-29')).evolution.random);
  const invalid={...direct(s,'bad',[change('bad-code',2)]),sequence:2};
  assert.throws(()=>settleResults(s,[r,invalid]));assert.deepEqual(s,snapshot);
  const rest=settleResult(s,request(s,'recovery',{type:'recovery',context:context()}));
  const changes=[
    state=>{state.version=2;},state=>{state.receipts[0].recovery=null;},
    state=>{state.receipts[0].recovery.improved=['not-a-state'];},
    state=>{state.receipts[0].recovery.favorableAttempt=1;},
    state=>{state.receipts[0].date='2026-08-29';},
    state=>{state.receipts[0].request=state.receipts[0].request.replace('weekend','unknown');},
  ];
  for(const mutate of changes){const bad=copy(rest);mutate(bad);assert.throws(()=>restoreSettlement(bad));}
  const good=settleResult(s,direct(s,'raw',[change('2-3',2)]));
  const changed=copy(good);changed.receipts[0].changes[0].delta=3;assert.throws(()=>restoreSettlement(changed));
  assert.throws(()=>settleResult(s,request(s,'unknown',{type:'event'})));
  assert.throws(()=>settleResults(s,null));assert.throws(()=>advanceSchedule(s,null));
});

test('500 holiday trajectories and one 400-NPC transaction retain heterogeneous bounded outcomes',t=>{
  const base=strained(7).player.current,initial=derivePanel(base),names=['體力','精神','抗壓','熱忱','情緒'];
  let shortGain=0,longGain=0,allFull=0,negativeDays=0;
  const longGains=[];
  for(let seed=0;seed<500;seed++) {
    const short={player:{current:copy(base)}},long={player:{current:copy(base)}},rng=createRandom(seed);
    const one=recoveryChanges(short.player.current,context('holiday',1),createRandom(seed));
    for(const c of one.changes) targetRecord(short,c.target)[c.code]+=c.delta;
    for(let day=0;day<14;day++) {
      const result=recoveryChanges(long.player.current,context('holiday',8),rng);
      negativeDays+=!result.favorableAttempt&&result.changes.length>0;
      for(const c of result.changes) targetRecord(long,c.target)[c.code]+=c.delta;
    }
    const shortPanel=derivePanel(short.player.current),longPanel=derivePanel(long.player.current);
    shortGain+=names.reduce((sum,name)=>sum+shortPanel[name]-initial[name],0)/names.length;
    const gain=names.reduce((sum,name)=>sum+longPanel[name]-initial[name],0)/names.length;
    longGain+=gain;longGains.push(gain);allFull+=names.every(name=>longPanel[name]===100);
  }
  assert.ok(longGain>shortGain);assert.equal(allFull,0);assert.ok(negativeDays>0);
  let world=ensureNPCs(makeWorld(),Array.from({length:400},(_,i)=>({id:`bulk:${i}`,roleIds:[8]})));
  const s=start(world),changes=[];
  for(let i=0;i<400;i++) {changes.push(change('2-1',i%2?25:-40,target('person',`bulk:${i}`)));changes.push(change('2-2',i%3?-10:15,target('person',`bulk:${i}`)));}
  const began=performance.now(),out=settleResult(s,direct(s,'many-npc',changes)),transactionMs=performance.now()-began;
  for(const c of changes) {
    const before=targetRecord(s.evolution.world,c.target)[c.code],after=targetRecord(out.evolution.world,c.target)[c.code];
    assert.equal(after,Math.max(0,Math.min(100,before+c.delta)));
  }
  assert.deepEqual(out.evolution.world.classroom,s.evolution.world.classroom);
  assert.deepEqual(restoreSettlement(JSON.stringify(out)),out);
  longGains.sort((a,b)=>a-b);
  t.diagnostic(JSON.stringify({holidayTrajectories:500,activeRecoveryDays:7000,meanShortGain:shortGain/500,meanLongGain:longGain/500,longGainMin:longGains[0],longGainMedian:longGains[250],longGainMax:longGains.at(-1),allFull,negativeDays,updatedNPCs:400,changes:800,transactionMs}));
});
