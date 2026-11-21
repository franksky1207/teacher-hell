import { numericValue, finite, weightedMean, clamp } from '../numeric/math.js';
import { validateRecord, requireValue } from '../numeric/record.js';

// Entries: [holder, code, relative weight, reversed]. All listed sources matter.
const p = (code, weight, reverse = false) => ['person', code, weight, reverse];
const l = (code, weight, reverse = false) => ['life', code, weight, reverse];
const w = (code, weight, reverse = false) => ['work', code, weight, reverse];
const e = (code, weight, reverse = false) => ['evaluation', code, weight, reverse];
const definitions = {
  教學能力: [p('3-1',120),p('3-2',2),p('3-3',2),p('3-4',2),p('1-3',2)],
  班級經營: [p('3-1',1),p('3-2',2),p('3-3',1),p('1-3',1),p('6-1',120),p('3-4',1),p('1-4',2)],
  溝通協調: [p('3-1',1),p('1-3',120),p('3-2',2),p('3-4',2),p('1-2',1,true),p('6-1',2)],
  行政應對: [p('3-3',120),p('3-2',1),p('3-1',2),p('3-4',2),p('1-4',3)],
  危機處理: [p('3-2',120),p('3-3',2),p('3-4',2),p('1-2',1,true),p('3-1',1),p('1-3',2)],
  情緒調適: [p('3-4',120),p('3-2',1),p('1-2',2,true),p('1-3',2),p('1-4',3)],
  體力: [p('2-3',4,true),w('11-1',4,true),w('11-2',2),l('7-4',2),l('7-2',2,true),w('11-3',2)],
  精神: [p('2-3',2,true),p('2-2',2,true),p('2-1',2,true),l('7-4',4),w('11-1',2,true),w('11-2',2),l('7-2',2,true)],
  抗壓: [p('3-4',1),p('3-2',1),p('1-2',1,true),l('7-4',4),l('7-1',4),w('11-3',4),p('1-4',1)],
  聲望: [e('8-1',4),e('8-2',4,true),e('5-3',4),e('5-1',2),e('5-4',2,true)],
  熱忱: [p('4-1',1),p('2-4',1),p('9-3',1),w('11-1',1,true),p('2-3',1,true),l('7-4',1),l('7-1',1),w('11-2',1)],
  情緒: [p('2-1',4,true),p('2-2',4,true),p('2-3',2,true),['outlook','5-4',2,true],l('7-4',2),w('11-1',2,true)],
};
for (const entries of Object.values(definitions)) {
  entries.forEach(Object.freeze); Object.freeze(entries);
}
export const PANEL_SOURCES = Object.freeze(definitions);
export const ABILITY_NAMES = Object.freeze(Object.keys(definitions).slice(0, 6));
export const STATE_NAMES = Object.freeze(Object.keys(definitions).slice(6));

// Structural checks are confined to player JSON envelopes; numeric checks use N1.
export function assertShape(value, keys) {
  if (!value || typeof value !== 'object' || Object.getPrototypeOf(value) !== Object.prototype ||
      Reflect.ownKeys(value).length !== keys.length) throw new TypeError('Invalid player object shape');
  for (const key of keys) {
    const d = Object.getOwnPropertyDescriptor(value, key);
    if (!d || !d.enumerable || !Object.hasOwn(d, 'value')) throw new TypeError(`Missing data property: ${key}`);
  }
}
export function identifier(value) {
  if (typeof value !== 'string' || !value.trim()) throw new TypeError('Expected nonempty source identifier');
  return value;
}

/** One player's applicable sources; no panel fields or world/NPC generation. */
export function validateSources(sources, { resolveEvaluations } = {}) {
  assertShape(sources, ['playerId','schoolId','person','life','work','outlook','evaluations']);
  identifier(sources.playerId); identifier(sources.schoolId);
  if (sources.playerId === sources.schoolId) throw new RangeError('Player and school identities must differ');
  for (const record of [sources.person, sources.life, sources.work]) validateRecord(record);
  assertShape(sources.outlook, ['fromId','toId','values']);
  if (sources.outlook.fromId !== sources.playerId || sources.outlook.toId !== sources.schoolId) throw new RangeError('Invalid outward relationship direction');
  validateRecord(sources.outlook.values);
  if (!Array.isArray(sources.evaluations) || sources.evaluations.length === 0) throw new RangeError('Evaluation sources required');
  const referenced = sources.evaluations.some(source => Object.hasOwn(source, 'reference'));
  if (referenced && (!resolveEvaluations || sources.evaluations.some(source => Object.hasOwn(source, 'values')))) throw new RangeError('References require world resolution; no mixed bootstrap');
  const evaluations = referenced ? resolveEvaluations(sources.evaluations) : sources.evaluations;
  const ids = new Set();
  for (const source of evaluations) {
    assertShape(source, ['sourceId','kind','targetId','scope','weight','values']);
    identifier(source.sourceId); identifier(source.scope);
    if (!['bootstrap','person','group'].includes(source.kind) || source.targetId !== sources.playerId ||
        source.sourceId === sources.playerId || ids.has(source.sourceId)) throw new RangeError('Invalid or duplicate evaluation source');
    ids.add(source.sourceId);
    finite(source.weight);
    if (source.weight < 0) throw new RangeError('Negative evaluation weight');
    validateRecord(source.values);
  }
  // Validate every required source even when its evaluation weight is zero.
  for (const entries of Object.values(PANEL_SOURCES)) for (const [holder, code] of entries) {
    if (holder === 'evaluation') evaluations.forEach(source => requireValue(source.values, code));
    else requireValue(holder === 'outlook' ? sources.outlook.values : sources[holder], code);
  }
  return sources;
}

function project(entries, resolve) {
  return weightedMean(entries.map(([holder, code, , reverse]) => {
    const value = requireValue(resolve(holder), code);
    return reverse ? 100 - value : value;
  }), entries.map(entry => entry[2]));
}

/** Pure one-way view. No initialization special case, normalization to 240, or write-back. */
export function derivePanel(sources, options = {}) {
  let resolved;
  validateSources(sources, {resolveEvaluations: options.resolveEvaluations ? entries => (resolved = options.resolveEvaluations(entries)) : undefined});
  const evaluations = resolved ?? sources.evaluations;
  const result = {};
  for (const [name, entries] of Object.entries(PANEL_SOURCES)) {
    if (name === '聲望') {
      result[name] = weightedMean(evaluations.map(source => project(entries, () => source.values)), evaluations.map(source => source.weight));
    } else {
      const value = project(entries, holder => holder === 'outlook' ? sources.outlook.values : sources[holder]);
      // Present stress reserve can be full despite low skill when support is ample.
      result[name] = name === '抗壓' ? clamp(value / 75 * 100) : value;
    }
    numericValue(result[name]);
  }
  return result;
}
