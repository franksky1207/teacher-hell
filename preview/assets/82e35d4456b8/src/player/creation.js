import { createRandom, restoreRandom } from '../numeric/random.js';
import { numericValue } from '../numeric/math.js';
import { validateRecord, requireValue } from '../numeric/record.js';
import { PANEL_SOURCES, ABILITY_NAMES, STATE_NAMES, derivePanel, assertShape, identifier } from './panel.js';

export const INITIAL_STATES = Object.freeze({ 體力:100, 精神:100, 抗壓:100, 聲望:40, 熱忱:100, 情緒:100 });
// Aggregate the same model matrix; never maintain a second set of coefficients.
const columns = new Map();
for (const name of ABILITY_NAMES) for (const [,code,weight,reverse] of PANEL_SOURCES[name]) {
  const column = columns.get(code) ?? { weight:0, reverse };
  if (column.reverse !== reverse) throw new Error('Inconsistent factor direction');
  column.weight += weight;
  columns.set(code, column);
}
const SOLVED_CODE = '3-2';
const TOTAL_NUMERATOR = 240 * 128;

function freezeTree(value) {
  if (value && typeof value === 'object' && !Object.isFrozen(value)) {
    Object.values(value).forEach(freezeTree); Object.freeze(value);
  }
  return value;
}
function copy(value) { return JSON.parse(JSON.stringify(value)); }

/** Exact bounded affine slice sampler. Rejection concerns feasibility only, never personality/extremes. */
export function sampleAbilityFactors(rng, maxAttempts = 256) {
  if (!rng || typeof rng.integer !== 'function' || !Number.isInteger(maxAttempts) || maxAttempts < 1 || maxAttempts > 256) throw new TypeError('Invalid bounded sampler');
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    let numerator = TOTAL_NUMERATOR;
    const factors = {};
    for (const [code, { weight, reverse }] of columns) {
      if (code === SOLVED_CODE) continue;
      const oriented = rng.integer(0, 100);
      if (!Number.isInteger(oriented)) throw new TypeError('Random integer required');
      numericValue(oriented);
      numerator -= weight * oriented;
      factors[code] = reverse ? 100 - oriented : oriented;
    }
    const solved = numerator / columns.get(SOLVED_CODE).weight;
    if (solved >= 0 && solved <= 100) return { ...factors, [SOLVED_CODE]: solved };
  }
  throw new RangeError('No feasible ability factors within bounded attempts');
}

/** Explicit bottom-up construction for generated factors and mathematical fixtures.
 * It accepts only actually feasible factors, never an arbitrary panel vector.
 */
export function initialFromFactors(factors, { playerId, schoolId }) {
  identifier(playerId); identifier(schoolId);
  validateRecord(factors);
  if (Object.keys(factors).length !== columns.size) throw new RangeError('Exactly the eight ability factors are required');
  let numerator = 0;
  for (const [code, { weight, reverse }] of columns) {
    const value = requireValue(factors, code);
    // Generated factors lie on a dyadic lattice. External factors must preserve it.
    if (!Number.isInteger(value * 128)) throw new RangeError('Initial factors must use the 1/128 grid');
    numerator += weight * (reverse ? 100 - value : value);
  }
  if (numerator !== TOTAL_NUMERATOR) throw new RangeError('Infeasible initial factor total');
  const sources = {
    playerId, schoolId,
    person: { ...factors, '2-1':0, '2-2':0, '2-3':0, '2-4':100, '4-1':100, '9-3':100 },
    // Personal perceived support and current work context, not generated family/NPC facts.
    life: { '7-1':100, '7-2':0, '7-4':100 },
    work: { '11-1':0, '11-2':100, '11-3':100 },
    outlook: { fromId:playerId, toId:schoolId, values:{ '5-4':0 } },
    evaluations: [30,50].map((value, i) => ({
      sourceId:`bootstrap:${i === 0 ? 'unfamiliarity' : 'professional-entry'}`,
      kind:'bootstrap', targetId:playerId,
      scope:'provisional-unacquainted-prior; not observed NPC opinion or historical complaint',
      weight:1,
      values:{ '8-1':value, '8-2':100-value, '5-3':value, '5-1':value, '5-4':100-value },
    })),
  };
  validateInitial(sources);
  return freezeTree(sources);
}

function validateInitial(sources) {
  const panel = derivePanel(sources);
  if (ABILITY_NAMES.reduce((sum, name) => sum + panel[name], 0) !== 240) throw new RangeError('Initial ability sum must be exactly 240');
  for (const name of STATE_NAMES) if (panel[name] !== INITIAL_STATES[name]) throw new RangeError(`Invalid initial state: ${name}`);
}

/** Persist this returned envelope atomically in a future storage layer; no I/O here. */
export function createCandidate({ seed, playerId, schoolId }) {
  const rng = createRandom(seed);
  const candidate = initialFromFactors(sampleAbilityFactors(rng), { playerId, schoolId });
  return freezeTree({ version:1, phase:'candidate', candidate, random:rng.snapshot() });
}

export function restoreCreation(saved, options = {}) {
  const state = typeof saved === 'string' ? JSON.parse(saved) : saved;
  if (!state || !['candidate','confirmed'].includes(state.phase)) throw new TypeError('Unknown creation phase');
  const candidate = state.phase === 'candidate';
  assertShape(state, candidate ? ['version','phase','candidate','random'] : ['version','phase','initial','current','year','random',...(state.version===2?['origin']:[])]);
  if (![1,2].includes(state.version)||candidate&&state.version!==1) throw new RangeError('Unsupported creation version');
  restoreRandom(state.random); // Validate without consuming a draw.
  if(state.version===1)validateInitial(candidate ? state.candidate : state.initial);
  else {
    assertShape(state.origin,['version','kind','seed','count','staffIds','base']);
    if(state.origin.version!==1||state.origin.kind!=='experienced')throw new RangeError('Unknown veteran origin');
    const expected=experiencedProfile(state.origin).sources;
    if(!sameCreationData(state.initial,expected))throw new RangeError('Veteran initial sources differ from reproducible origin');
  }
  if (!candidate) {
    derivePanel(state.current, options); // Current abilities may grow; no 240/fixed-state constraint.
    if (!Number.isSafeInteger(state.year) || state.year < 1 ||
        state.initial.playerId !== state.current.playerId || state.initial.schoolId !== state.current.schoolId) throw new RangeError('Career identity/year mismatch');
  }
  return freezeTree(copy(state));
}

export function rerollCandidate(saved) {
  const state = restoreCreation(saved);
  if (state.phase !== 'candidate') throw new RangeError('Initial configuration is locked');
  const rng = restoreRandom(state.random);
  const candidate = initialFromFactors(sampleAbilityFactors(rng), state.candidate);
  return freezeTree({ version:1, phase:'candidate', candidate, random:rng.snapshot() });
}

export function confirmCandidate(saved) {
  const state = restoreCreation(saved);
  if (state.phase !== 'candidate') throw new RangeError('Career is already confirmed');
  return freezeTree({ version:1, phase:'confirmed', initial:state.candidate, current:copy(state.candidate), year:1, random:state.random });
}

// Bounded background composition, not nine/nineteen simulated school years.
const EXPERIENCE_TYPES=Object.freeze(['instruction','mediation','collaboration','administration','workload']);
const EXPERIENCE_LABELS=Object.freeze({instruction:'教學調整',mediation:'班級衝突協調',collaboration:'同事合作',administration:'行政溝通',workload:'工作與生活調整','school-service':'校務服務協調'});
const EXPERIENCE_FACTORS=Object.freeze([['3-1','6-1'],['1-3','3-2'],['3-1','1-3'],['3-3','1-4'],['3-4','1-2']]);
export function experiencedProfile({seed,base,count,staffIds}) {
  validateInitial(base);
  if(![4,6].includes(count)||!Array.isArray(staffIds)||staffIds.length!==3||new Set(staffIds).size!==3)throw new RangeError('Bounded veteran background required');
  staffIds.forEach(identifier);
  if(staffIds.some(id=>[base.playerId,base.schoolId].includes(id)))throw new RangeError('Staff identities required');
  const rng=createRandom(seed),sources=copy(base),episodes=[];
  const bounded=(v)=>Math.max(0,Math.min(100,v));
  for(let i=0;i<count;i++){
    const drawnType=rng.integer(0,EXPERIENCE_TYPES.length-1),type=i===count-1?3:drawnType,outcome=rng.weightedIndex([2,2,6])-1,intensity=rng.integer(12,32);
    const kind=i===count-1?'school-service':EXPERIENCE_TYPES[type];
    const entry={id:`background:${seed}:${i}`,type:kind,outcome,intensity,summary:`曾投入${EXPERIENCE_LABELS[kind]}，回顧成效${outcome<0?'不如預期':outcome===0?'有限':'有所改善'}。`};episodes.push(entry);
    for(const [j,code] of EXPERIENCE_FACTORS[type].entries()){
      const change=(outcome===0?rng.integer(-2,3):outcome*intensity)*(j===1 ? 0.6 : 1)*(code==='1-2'?-1:1);
      sources.person[code]=bounded(sources.person[code]+change);
    }
  }
  // Independent present circumstances; seniority never grants full reserves.
  const burden=episodes.reduce((sum,e)=>sum-e.outcome*e.intensity,0)/count;
  for(const code of ['2-1','2-2','2-3'])sources.person[code]=bounded(rng.integer(5,55)+burden*.4);
  for(const code of ['2-4','4-1','9-3'])sources.person[code]=rng.integer(35,95);
  sources.life={'7-1':rng.integer(30,95),'7-2':rng.integer(5,55),'7-4':rng.integer(35,95)};
  sources.work={'11-1':bounded(rng.integer(15,75)+burden*.5),'11-2':rng.integer(30,95),'11-3':rng.integer(35,95)};
  sources.outlook.values['5-4']=rng.integer(5,65);
  const opinions=staffIds.map((id,i)=>{
    const outcome=episodes[i].outcome,draw=()=>bounded(rng.integer(20,80)+outcome*12);
    const incoming={'5-1':draw(),'5-2':rng.integer(15,75),'5-3':draw(),'5-4':100-draw()},outgoing={'5-1':draw(),'5-2':rng.integer(15,75),'5-3':draw(),'5-4':100-draw()},reputation={'8-1':draw(),'8-2':100-draw()};
    return {id,basisId:episodes[i].id,incoming,outgoing,reputation};
  });
  sources.evaluations=opinions.map(o=>({sourceId:o.id,kind:'person',targetId:base.playerId,scope:`pre-play opinion:${o.basisId}`,weight:1,values:{...o.incoming,...o.reputation}}));
  const duty=rng.chance(.5)?null:['subject-convenor','curriculum-committee','student-support-group'][rng.integer(0,2)];
  derivePanel(sources);
  return {sources,episodes,opinions,duty};
}
export function createExperiencedPlayer(player,{seed,count,staffIds}){
  const novice=restoreCreation(player);
  if(novice.version!==1||novice.phase!=='confirmed'||novice.year!==1||!sameCreationData(novice.initial,novice.current))throw new RangeError('Untouched novice sources required');
  const origin={version:1,kind:'experienced',seed,count,staffIds:[...staffIds],base:copy(novice.initial)},profile=experiencedProfile(origin);
  return restoreCreation({version:2,phase:'confirmed',initial:profile.sources,current:copy(profile.sources),year:1,random:novice.random,origin});
}

export function sameCreationData(a,b){if(a===b)return true;if(!a||!b||typeof a!=='object'||typeof b!=='object')return false;const keys=Object.keys(a);return Array.isArray(a)===Array.isArray(b)&&keys.length===Object.keys(b).length&&keys.every(k=>Object.hasOwn(b,k)&&sameCreationData(a[k],b[k]));}
