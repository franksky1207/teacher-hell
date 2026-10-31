import test from 'node:test';
import assert from 'node:assert/strict';
import { performance } from 'node:perf_hooks';
import { createRandom } from '../src/numeric/random.js';
import { createCandidate,confirmCandidate } from '../src/player/creation.js';
import { derivePanel,ABILITY_NAMES } from '../src/player/panel.js';
import { createWorld } from '../src/world/world.js';
import { naturalDelta,annualGrowthRate,dailyStability } from '../src/evolution/model.js';
import { proposeRecord,commitRecord,coupledChanges } from '../src/evolution/step.js';
import { startEvolution,advanceDay,nextGameDate,restoreEvolution } from '../src/evolution/time.js';

function summary(values) {
  const sorted=[...values].sort((a,b)=>a-b),n=values.length,mean=values.reduce((a,b)=>a+b,0)/n;
  return {n,mean,sd:Math.sqrt(values.reduce((s,x)=>s+(x-mean)**2,0)/n),min:sorted[0],p05:sorted[Math.floor(n*.05)],p50:sorted[Math.floor(n*.5)],p95:sorted[Math.floor(n*.95)],max:sorted.at(-1)};
}
function correlation(a,b) {
  const x=summary(a),y=summary(b);
  return a.reduce((sum,value,i)=>sum+(value-x.mean)*(b[i]-y.mean),0)/a.length/x.sd/y.sd;
}
const factorCodes=['3-1','3-2','3-3','3-4','1-3','6-1','1-4','1-2'];

test('25,000 draws per class: slow traits, skill variability, fast tails and symmetric tenure damping',t=>{
  const stats={};
  for(const code of ['1-1','3-1','2-1','11-1','7-1','10-1','5-1']) {
    const rng=createRandom(20261101),deltas=[];let zero=0,positive=0,negative=0;
    for(let i=0;i<25000;i++) {
      const delta=naturalDelta(50,code,rng);
      deltas.push(delta);if(delta===0) zero++;else if(delta>0) positive++;else negative++;
    }
    stats[code]={...summary(deltas),zero,positive,negative};
  }
  assert.ok(stats['1-1'].sd<stats['3-1'].sd&&stats['3-1'].sd<stats['2-1'].sd);
  assert.ok(stats['2-1'].max>15&&stats['2-1'].min< -15);
  assert.ok(stats['1-1'].zero>24000);assert.equal(stats['5-1'].zero,25000);
  assert.ok(Math.abs(stats['2-1'].positive-stats['2-1'].negative)<500);
  const rookie=[],veteran=[];const rng=createRandom(88);
  for(let i=0;i<25000;i++) {
    const raw=naturalDelta(50,'2-1',rng);
    rookie.push(commitRecord({'2-1':50},{'2-1':raw},{isPlayer:true,year:1})['2-1']-50);
    veteran.push(commitRecord({'2-1':50},{'2-1':raw},{isPlayer:true,year:30})['2-1']-50);
  }
  const ratio=summary(veteran).sd/summary(rookie).sd;
  assert.ok(Math.abs(ratio-dailyStability(30))<1e-12);
  const left=createRandom(98),right=createRandom(712),rawA=[],rawB=[],coupledA=[],coupledB=[];
  const holder={id:'correlation',kind:'person',isPlayer:false,schoolExposure:0};
  for(let i=0;i<25000;i++) {
    const a=naturalDelta(50,'2-3',left),b=naturalDelta(50,'2-2',right);
    const coupled=coupledChanges(holder,{'2-3':a,'2-2':b},new Map());
    rawA.push(a);rawB.push(b);coupledA.push(coupled['2-3']);coupledB.push(coupled['2-2']);
    assert.ok(Math.abs(coupled['2-3'])<=22.4+1e-12&&Math.abs(coupled['2-2'])<=22.4+1e-12);
  }
  const rawCorrelation=correlation(rawA,rawB),coupledCorrelation=correlation(coupledA,coupledB);
  assert.ok(Math.abs(rawCorrelation)<.03);assert.ok(coupledCorrelation>.18&&coupledCorrelation<.3);
  t.diagnostic(JSON.stringify({drawsPerClass:25000,stats,stabilityRatio:ratio,rawCorrelation,coupledCorrelation}));
});

test('24 teacher factor trajectories over 30 nominal years: gradual growth, annual declines and retained diversity',t=>{
  const started=performance.now(),first=[],last=[],annualChanges=[],cohorts=Array.from({length:30},()=>[]);
  let declines=0,increases=0,allAnnualDeclines=0,saturation=0,total=0,example,topChanges=0;
  for(let i=0;i<24;i++) {
    const candidate=createCandidate({seed:i+1,playerId:`teacher-${i}`,schoolId:'school'}).candidate;
    let record=Object.fromEntries(factorCodes.map(code=>[code,i===0?0:i===1?100:candidate.person[code]]));
    const panel=()=>derivePanel({...candidate,person:{...candidate.person,...record}});
    let prior=ABILITY_NAMES.map(name=>panel()[name]);first.push(...prior);
    const firstTop=prior.indexOf(Math.max(...prior));
    const root=createRandom(0x12340000+i);
    for(let year=1;year<=30;year++) {
      const holder={id:`factor-pressure-${i}`,kind:'player-person',record,isPlayer:true,year};
      for(let day=0;day<365;day++) {
        holder.record=record;record=commitRecord(record,proposeRecord(holder,root.nextUint32()),holder);
        for(const value of Object.values(record)) assert.ok(Number.isFinite(value)&&value>=0&&value<=100);
      }
      const current=ABILITY_NAMES.map(name=>panel()[name]);
      let falling=0;
      current.forEach((value,j)=>{
        const change=value-prior[j];annualChanges.push(change);
        if(change<0) {declines++;falling++;example??={trajectory:i,year,ability:ABILITY_NAMES[j],change};}else if(change>0) increases++;
        saturation+=Number(value<1||value>99);total++;
      });
      if(falling===6) allAnnualDeclines++;
      cohorts[year-1].push(...current);prior=current;
    }
    last.push(...prior);topChanges+=Number(firstTop!==prior.indexOf(Math.max(...prior)));
    if(i===0) assert.ok(Math.max(...prior)<60); // low factors do not automatically catch high factors
    if(i===1) assert.ok(Math.min(...prior)>70); // high ability is not normalized back to 50
  }
  const firstStats=summary(first),lastStats=summary(last);
  assert.ok(lastStats.mean>firstStats.mean+3&&lastStats.mean<80);
  const startEndCorrelation=correlation(first,last);
  assert.ok(startEndCorrelation>.7&&topChanges>0);
  assert.ok(lastStats.sd>15);assert.ok(declines>500&&increases>declines);
  assert.ok(saturation/total<.1);
  assert.ok(last.some((value,i)=>value<first[i]));
  assert.ok(cohorts[0].some(value=>value>90)&&cohorts[29].some(value=>value<10));
  t.diagnostic(JSON.stringify({trajectories:24,days:24*30*365,factorUpdates:24*30*365*8,first:firstStats,last:lastStats,annualChange:summary(annualChanges),startEndCorrelation,topChanges,declines,increases,allAnnualDeclines,saturationFraction:saturation/total,example,yearMeans:cohorts.map(row=>summary(row).mean),rates:[1,2,5,10,20,30].map(year=>[year,annualGrowthRate(year)]),elapsedMs:performance.now()-started}));
});

test('128 extreme/ordinary NPC processes over 30 years do not collapse to 50 or accumulate boundary atoms',t=>{
  const stats={},started=performance.now();
  for(const code of ['1-1','3-1','2-1','11-1']) {
    const values=[],changes=[];let stagnant=0,boundary=0;
    for(let i=0;i<128;i++) {
      const rng=createRandom(7000+i),initial=i%2?5:95;let value=initial;
      for(let day=0;day<30*365;day++) {
        const delta=naturalDelta(value,code,rng);value+=delta;
        assert.ok(Number.isFinite(value)&&value>=0&&value<=100);
        stagnant+=Number(delta===0);boundary+=Number(value===0||value===100);
      }
      values.push(value);changes.push(value-initial);
    }
    stats[code]={...summary(values),change:summary(changes),unchangedDays:stagnant,boundaryDays:boundary};
    assert.ok(stats[code].sd>20);assert.ok(boundary<10);
    if(code==='1-1') {assert.ok(values.filter(v=>v<10).length>50);assert.ok(values.filter(v=>v>90).length>50);}
    else assert.ok(values.some(v=>v<10)&&values.some(v=>v>90));
  }
  t.diagnostic(JSON.stringify({trajectoriesPerCode:128,daysPerTrajectory:10950,stats,elapsedMs:performance.now()-started}));
});

test('four full worlds evolve 90 consecutive days, including experienced/extreme baselines and reload replay',t=>{
  const rows=[];
  for(let i=0;i<4;i++) {
    const player=confirmCandidate(createCandidate({seed:i+21,playerId:'teacher',schoolId:'school'}));
    const world=structuredClone(createWorld({seed:i,player}));world.player.year=[1,2,10,30][i];
    if(i===2) for(const code of ['2-1','2-2','2-3']) world.player.current.person[code]=100;
    if(i===3) for(const code of ['2-1','2-2','2-3']) world.player.current.person[code]=0;
    const year=world.player.year,schoolYearId=`pressure-${year}`,openingId=`opening-${year}`;
    let state=startEvolution(world,{seed:9090+i,date:'2026-07-01',schoolYearId,openingId});
    const beforeBytes=JSON.stringify(state).length,started=performance.now();let date=state.clock.date;
    for(let day=0;day<90;day++) {
      const input={date,schoolYearId,openingId,serviceYear:year};
      const previous=state;state=advanceDay(state,input);
      if(day%30===0) {
        assert.deepEqual(advanceDay(restoreEvolution(JSON.stringify(previous)),input),state);
        assert.deepEqual(advanceDay(state,input),state);
      }
      assert.equal(state.world.player.year,year);date=nextGameDate(date);
    }
    assert.deepEqual(state.world.player.initial,world.player.initial);
    assert.deepEqual(state.world.relationships,world.relationships);assert.deepEqual(state.world.reputations,world.reputations);
    assert.equal(derivePanel(state.world.player.current).聲望,40);
    assert.notDeepEqual(state.world.people,world.people);assert.notDeepEqual(state.world.school.values,world.school.values);
    const afterBytes=JSON.stringify(state).length;
    assert.ok(Math.abs(afterBytes-beforeBytes)<5000); // no per-day history/stream maps accumulate
    rows.push({year,days:90,elapsedMs:performance.now()-started,beforeBytes,afterBytes,initialPanel:derivePanel(world.player.current),finalPanel:derivePanel(state.world.player.current)});
  }
  t.diagnostic(JSON.stringify({fullWorldPressure:rows}));
});
