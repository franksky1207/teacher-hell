import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { performance } from 'node:perf_hooks';
import { ABILITY_NAMES, STATE_NAMES, PANEL_SOURCES, derivePanel, validateSources } from '../src/player/panel.js';
import { INITIAL_STATES, sampleAbilityFactors, initialFromFactors, createCandidate, rerollCandidate, confirmCandidate, restoreCreation } from '../src/player/creation.js';
import { createRandom } from '../src/numeric/random.js';
import { validateRecord, updateValue } from '../src/numeric/record.js';
import { normalizeWeights, weightedMean, roundForDisplay } from '../src/numeric/math.js';

const ids = { playerId:'teacher', schoolId:'private-high-school' };
const clone = x => JSON.parse(JSON.stringify(x));
const initial = () => createCandidate({ seed:1, ...ids }).candidate;
const abilityTotal = panel => ABILITY_NAMES.reduce((sum, name) => sum + panel[name], 0);
function checkInitial(sources) {
  const panel = derivePanel(sources);
  assert.equal(abilityTotal(panel), 240); // strict raw equality, no epsilon or rounding
  assert.deepEqual(Object.fromEntries(STATE_NAMES.map(name => [name, panel[name]])), INITIAL_STATES);
  for (const value of Object.values(panel)) assert.ok(value >= 0 && value <= 100);
  return panel;
}

test('all 12 source lists and inverse directions match the formal document exactly', () => {
  const text = readFileSync(new URL('../docs/02-隱藏數值與事件引擎.md', import.meta.url), 'utf8');
  let count = 0;
  for (const [name, entries] of Object.entries(PANEL_SOURCES)) {
    const line = text.split('\n').find(line => line.startsWith(`| ${name} |`) && /\d+-\d/.test(line));
    assert.ok(line);
    const expected = [...line.matchAll(/(\d+-\d)(（反向）)?/g)].map(([,code,reverse]) => [code,Boolean(reverse)]);
    assert.deepEqual(entries.map(([,code,,reverse]) => [code,reverse]), expected);
    assert.ok(entries.every(([, ,weight]) => weight > 0));
    const weights=entries.map(entry=>entry[2]), total=weights.reduce((a,b)=>a+b,0);
    assert.deepEqual(normalizeWeights(weights),weights.map(weight=>weight/total));
    assert.equal(entries.reduce((sum, entry) => sum + entry[2], 0), ABILITY_NAMES.includes(name) ? 128 : name === '熱忱' ? 8 : 16);
    count++;
  }
  assert.equal(count, 12);
  assert.deepEqual(normalizeWeights([120,2,2,2,2]), [120/128,2/128,2/128,2/128,2/128]);
  assert.equal(weightedMean([1/128,20,60,70,100],[120,2,2,2,2])*16384 % 1, 0);
});

test('actual bottom-up initialization and infeasible overlapping factors, no display adjustment', () => {
  const factors = { '3-1':40,'3-2':40,'3-3':40,'3-4':40,'1-3':40,'6-1':40,'1-4':40,'1-2':60 };
  const source = initialFromFactors(factors, ids);
  assert.deepEqual(ABILITY_NAMES.map(name => checkInitial(source)[name]), Array(6).fill(40));
  const allHigh = Object.fromEntries(Object.keys(factors).map(code => [code,code === '1-2' ? 0 : 100]));
  assert.throws(() => initialFromFactors(allHigh, ids), /Infeasible/);
  for (const invalid of [ { ...factors, '3-1':40.001 }, { ...factors,'3-1':null }, { ...factors, panel:40 }, { ...factors,'3-2':101 }, {}, { ...factors,'1-1':40 } ]) {
    assert.throws(() => initialFromFactors(invalid, ids));
  }
  assert.throws(() => initialFromFactors(factors, { ...ids,schoolId:ids.playerId }));
  assert.throws(() => createCandidate({ seed:1, ...ids, playerId:'' }));
  assert.throws(() => createCandidate({ seed:1, ...ids, playerId:null }));
  assert.throws(() => { source.person['3-1'] = 100; });
  const before = JSON.stringify(source);
  for (let i=0; i<100; i++) assert.deepEqual(derivePanel(source), derivePanel(source));
  assert.equal(JSON.stringify(source), before);
  const view = derivePanel(source); view.教學能力 = 99;
  assert.equal(derivePanel(source).教學能力, 40);
});

test('bounded rejection tests feasibility only; impossible/malformed input fails promptly', () => {
  let calls = 0;
  assert.throws(() => sampleAbilityFactors({ integer:() => { calls++; return 100; } }), /bounded attempts/);
  assert.equal(calls, 256 * 7);
  assert.throws(() => sampleAbilityFactors(null));
  for (const attempts of [0,257,1.5]) assert.throws(() => sampleAbilityFactors(createRandom(0), attempts));
  assert.throws(() => sampleAbilityFactors({ integer:() => 0.5 }));
  assert.throws(() => sampleAbilityFactors({ integer:() => 101 }));
  const forty = sampleAbilityFactors({ integer:() => 40 });
  assert.equal(checkInitial(initialFromFactors(forty, ids)).教學能力, 40);
});

test('every positive/inverse source has the correct response, including current reserve and reputation', () => {
  for (const [name, entries] of Object.entries(PANEL_SOURCES)) {
    const base = clone(initial());
    // Put all referenced sources at interior 30, away from reserve saturation.
    for (const [holder,code] of entries) {
      if (holder === 'evaluation') base.evaluations.forEach(e => { e.values[code] = 30; });
      else (holder === 'outlook' ? base.outlook.values : base[holder])[code] = 30;
    }
    // Reserve gets all oriented sources 30, so its mapped value is 40.
    if (name === '抗壓') base.person['1-2'] = 70;
    const original = derivePanel(base)[name];
    for (const [holder,code,,reverse] of entries) {
      const changed = clone(base);
      if (holder === 'evaluation') changed.evaluations[0].values[code] += 1;
      else (holder === 'outlook' ? changed.outlook.values : changed[holder])[code] += 1;
      const next = derivePanel(changed)[name];
      assert.ok(reverse ? next < original : next > original, `${name}: ${holder}/${code} direction`);
    }
  }
  const updated = clone(initial());
  updated.person = updateValue(updated.person, '3-1', 1.234567);
  const panel = derivePanel(updated);
  assert.notEqual(abilityTotal(panel), 240); // no permanent rebalancing or panel feedback
  assert.notEqual(panel.教學能力, roundForDisplay(panel.教學能力,2));
  assert.deepEqual(derivePanel(clone(updated)), panel);
});

test('reputation is attributable incoming evaluations, independent of outward feelings; N3 can replace priors', () => {
  const source = initial();
  assert.equal(derivePanel(source).聲望, 40);
  assert.notDeepEqual(source.evaluations[0].values, source.evaluations[1].values);
  const changed = clone(source);
  changed.evaluations = [
    { sourceId:'npc-a',kind:'person',targetId:ids.playerId,scope:'observed-local-evaluation',weight:1,
      values:{'8-1':100,'8-2':0,'5-3':100,'5-1':100,'5-4':0} },
    { sourceId:'parent-group',kind:'group',targetId:ids.playerId,scope:'specific-group-evaluation',weight:3,
      values:{'8-1':0,'8-2':100,'5-3':0,'5-1':0,'5-4':100} },
  ];
  assert.equal(derivePanel(changed).聲望, 25);
  assert.equal(derivePanel(changed).情緒, 100);
  changed.outlook.values['5-4'] = 100;
  assert.equal(derivePanel(changed).聲望, 25);
  assert.equal(derivePanel(changed).情緒, 87.5);
  assert.equal(source.outlook.values['5-4'], 0);
});

test('corrupt, missing, ambiguous and misdirected source envelopes are rejected', () => {
  const changes = [
    s => { s.panel = { 教學能力:100 }; },
    s => { s.person['3-1'] = NaN; },
    s => { s.person['3-1'] = null; },
    s => { delete s.life['7-1']; },
    s => { s.evaluations = []; },
    s => { s.evaluations[0].targetId = 'other'; },
    s => { s.evaluations[0].sourceId = ids.playerId; },
    s => { s.evaluations[1].sourceId = s.evaluations[0].sourceId; },
    s => { s.evaluations[0].kind = 'self'; },
    s => { s.evaluations[0].scope = ''; },
    s => { s.evaluations[0].weight = -1; },
    s => { s.evaluations[0].weight = NaN; },
    s => { s.evaluations.forEach(e => { e.weight = 0; }); },
    s => { s.evaluations[0].weight=0; s.evaluations[0].values['8-1']=null; },
    s => { s.outlook.toId = 'other'; },
    s => { s.outlook.fromId = 'other'; },
    s => { s.playerId = s.schoolId; },
    s => { Object.defineProperty(s, 'person', { get:() => ({}) }); },
  ];
  for (const change of changes) { const s=clone(initial()); change(s); assert.throws(() => derivePanel(s)); }
  assert.throws(() => validateSources(null));
  assert.throws(() => validateSources(Object.create(initial())));
});

test('candidate rerolls, confirmation, reload replay and initial/current separation', () => {
  const first = createCandidate({ seed:12345, ...ids });
  assert.equal(first.phase, 'candidate');
  assert.ok(!Object.hasOwn(first, 'current'));
  assert.deepEqual(first, createCandidate({ seed:12345,...ids }));
  assert.notDeepEqual(first.candidate, createCandidate({ seed:54321,...ids }).candidate);
  const next = rerollCandidate(first);
  assert.notDeepEqual(first.candidate, next.candidate);
  assert.deepEqual(next, rerollCandidate(restoreCreation(JSON.stringify(first))));
  assert.deepEqual(first, restoreCreation(JSON.stringify(first)));
  const confirmed = confirmCandidate(next);
  assert.equal(confirmed.phase, 'confirmed'); assert.equal(confirmed.year, 1);
  assert.deepEqual(confirmed.initial, next.candidate);
  assert.deepEqual(confirmed.current, next.candidate);
  assert.notEqual(confirmed.initial, confirmed.current);
  assert.deepEqual(confirmed.random, next.random); // confirming consumes no draw
  assert.throws(() => rerollCandidate(confirmed), /locked/);
  assert.throws(() => confirmCandidate(confirmed), /already/);
  assert.deepEqual(restoreCreation(JSON.stringify(confirmed)), confirmed);
  assert.deepEqual(derivePanel(confirmed.initial), derivePanel(confirmed.current));
  const future = clone(confirmed);
  future.current.person = updateValue(future.current.person, '3-1', 10);
  future.current.person = updateValue(future.current.person, '2-3', 20);
  future.year = 2;
  const restored = restoreCreation(future);
  assert.notEqual(abilityTotal(derivePanel(restored.current)), 240);
  assert.equal(derivePanel(restored.initial).體力, 100);
  assert.ok(derivePanel(restored.current).體力 < 100);
  assert.throws(() => { restored.initial.person['3-1']=0; });
  for (const change of [s=>{s.version=2;},s=>{s.phase='other';},s=>{s.random.state=-1;},s=>{s.candidate.person['3-1']=0;},s=>{s.candidate.person['2-3']=1;},s=>{s.panel={};}]) {
    const s=clone(first); change(s); assert.throws(() => restoreCreation(s));
  }
  for (const change of [s=>{s.year=0;},s=>{s.year=1.5;},s=>{s.current.schoolId='other';s.current.outlook.toId='other';},s=>{s.current.playerId='other';}]) {
    const s=clone(confirmed); change(s); assert.throws(() => restoreCreation(s));
  }
});

test('whole runtime graph remains acyclic, local/browser-compatible and N1 is not coupled to player', async () => {
  const root=fileURLToPath(new URL('../src/',import.meta.url)), graph=new Map();
  function scan(dir) {
    for (const entry of readdirSync(dir,{withFileTypes:true})) {
      const path=resolve(dir,entry.name);
      if(entry.isDirectory()) { scan(path); continue; }
      assert.match(entry.name,/\.js$/); assert.doesNotMatch(entry.name,/batch|^n[1-8]\./i);
      const source=readFileSync(path,'utf8').replace(/\/\*[\s\S]*?\*\/|\/\/[^\n]*/g,'');
      assert.ok(source.trim().length>100);
      assert.doesNotMatch(source,/Math\.random|Date\.now|node:|process\.|window\.|document\.|\brequire\(/);
      const deps=[...source.matchAll(/from ['"]([^'"]+)['"]/g)].map(m=>{
        assert.match(m[1],/^\.{1,2}\//); return resolve(dirname(path),m[1]);
      });
      if(path.includes('/numeric/')) deps.forEach(dep=>assert.ok(dep.includes('/numeric/')));
      graph.set(path,deps);
    }
  }
  scan(root);
  function visit(path,stack=[]) { assert.ok(!stack.includes(path)); assert.ok(graph.has(path));graph.get(path).forEach(dep=>visit(dep,[...stack,path])); }
  for (const path of graph.keys()) { visit(path); await import(path); }
  assert.equal(graph.size,22);
});

test('10,000 feasible initializations: strict totals, diversity, extrema and continuation statistics', t => {
  const rng=createRandom(20261101), n=10000, samples=[], unique=new Set(), winners=Array(6).fill(0), losers=Array(6).fill(0);
  let calls=0, maxAttempts=0, extreme, maxSpread=0;
  const tracked={ integer:(...args)=>{calls++;return rng.integer(...args);} };
  const started=performance.now();
  for (let i=0;i<n;i++) {
    const before=calls;
    const factors=sampleAbilityFactors(tracked);
    maxAttempts=Math.max(maxAttempts,(calls-before)/7);
    const sources=initialFromFactors(factors,ids), panel=checkInitial(sources);
    for(const record of [sources.person,sources.life,sources.work,sources.outlook.values,...sources.evaluations.map(e=>e.values)]) validateRecord(record);
    const values=ABILITY_NAMES.map(name=>panel[name]);
    assert.deepEqual(derivePanel(clone(sources)),panel);
    samples.push(values); unique.add(values.join(','));
    winners[values.indexOf(Math.max(...values))]++;losers[values.indexOf(Math.min(...values))]++;
    const spread=Math.max(...values)-Math.min(...values);
    if(spread>maxSpread) {maxSpread=spread;extreme={index:i,values,factors};}
  }
  const means=ABILITY_NAMES.map((_,j)=>samples.reduce((s,row)=>s+row[j],0)/n);
  const deviations=means.map((mean,j)=>Math.sqrt(samples.reduce((s,row)=>s+(row[j]-mean)**2,0)/n));
  const correlations=means.map((mean,j)=>means.map((other,k)=>samples.reduce((s,row)=>s+(row[j]-mean)*(row[k]-other),0)/n/deviations[j]/deviations[k]));
  const stats=ABILITY_NAMES.map((name,j)=>{
    const sorted=samples.map(row=>row[j]).sort((a,b)=>a-b);
    assert.ok(deviations[j]>20);assert.ok(sorted[0]<6);assert.ok(sorted.at(-1)>94);
    assert.ok(winners[j]>0 && losers[j]>0);
    return {name,mean:means[j],sd:deviations[j],min:sorted[0],p01:sorted[100],p05:sorted[500],p50:sorted[5000],p95:sorted[9500],p99:sorted[9900],max:sorted.at(-1)};
  });
  assert.equal(unique.size,n);assert.ok(maxSpread>90);
  t.diagnostic(JSON.stringify({n,stats,correlations,winners,losers,unique:unique.size,attempts:calls/7,maxAttempts,extreme,elapsedMs:performance.now()-started}));
});

test('5,000 rerolls retain bounded state and reload does not consume or skip draws', t => {
  let session=createCandidate({seed:77,...ids});
  const started=performance.now(); let maxBytes=0;
  for(let i=0;i<5000;i++) {
    session=rerollCandidate(session);checkInitial(session.candidate);
    const json=JSON.stringify(session);maxBytes=Math.max(maxBytes,json.length);
    assert.ok(json.length<2200);
    if(i%1000===0) assert.deepEqual(rerollCandidate(session),rerollCandidate(restoreCreation(json)));
  }
  assert.equal(Object.keys(session).length,4);
  t.diagnostic(JSON.stringify({rerolls:5000,maxBytes,elapsedMs:performance.now()-started}));
});

test('each projection attains 0/100 on legal current sources and matches an independent dot-product oracle', () => {
  for (const [name,entries] of Object.entries(PANEL_SOURCES)) {
    for (const level of [0,0.125,17.75,100]) {
      const sources=clone(initial());
      for(const [holder,code,,reverse] of entries) {
        const value=reverse?100-level:level;
        if(holder==='evaluation') sources.evaluations.forEach(source=>{source.values[code]=value;});
        else (holder==='outlook'?sources.outlook.values:sources[holder])[code]=value;
      }
      const expected=name==='抗壓'?Math.min(100,level/75*100):level;
      assert.equal(derivePanel(sources)[name],expected);
    }
    const sources=initial();
    const score=source=>entries.reduce((sum,[holder,code,weight,reverse])=>{
      const record=holder==='evaluation'?source:holder==='outlook'?sources.outlook.values:sources[holder];
      return sum+weight*(reverse?100-record[code]:record[code]);
    },0)/entries.reduce((sum,entry)=>sum+entry[2],0);
    let reference=name==='聲望'?(score(sources.evaluations[0].values)+score(sources.evaluations[1].values))/2:score();
    if(name==='抗壓') reference=Math.min(100,reference/75*100);
    assert.equal(derivePanel(sources)[name],reference);
  }
});
