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
  assertShape(state, candidate ? ['version','phase','candidate','random'] : ['version','phase','initial','current','year','random']);
  if (state.version !== 1) throw new RangeError('Unsupported creation version');
  restoreRandom(state.random); // Validate without consuming a draw.
  validateInitial(candidate ? state.candidate : state.initial);
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
