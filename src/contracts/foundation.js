/** Versioned transport contracts, not a world engine, event runner or save store.
 * N1–N8 stay opaque and authoritative inside numeric; no fields are added there.
 */
import { assertShape, identifier } from '../player/panel.js';
import { canonicalData, validateSettlement } from '../changes/settlement.js';
import { gameDate } from '../evolution/time.js';
import { restoreRandom } from '../numeric/random.js';

const kinds = new Set(['career','attempt','cohort','class','enrollment','event','stage','fact','claim','result','effect','settlement']);
function fail(path, message) { throw new RangeError(`${path}: ${message}`); }
function shape(value, keys, path) {
  try { assertShape(value, keys); } catch { fail(path, `expected fields ${keys.join(', ')}`); }
}
function text(value, path) {
  try { identifier(value); } catch { fail(path, 'expected nonempty string'); }
}
function list(value, path, read, { empty = true } = {}) {
  if (!Array.isArray(value) || (!empty && !value.length)) fail(path, 'expected array');
  value.forEach((entry, index) => read(entry, `${path}[${index}]`));
}
function distinct(values, path) {
  if (new Set(values).size !== values.length) fail(path, 'duplicate identity');
}
function strings(values, path, options) {
  list(values, path, text, options); distinct(values, path);
}
function ref(value, kind, path) {
  try { validateId(value, kind); } catch { fail(path, `expected canonical ${kind} ID`); }
}

/** Explicit caller-owned parts; never a clock, random draw or implicit counter.
 * JSON tuples avoid delimiter collisions. Existing N1–N8 person IDs are NOT renamed.
 */
export function createId(kind, parts) {
  if (!kinds.has(kind)) fail('id.kind', 'unknown namespace');
  canonicalData(parts);
  list(parts, 'id.parts', text, { empty: false });
  return `${kind}:${JSON.stringify(parts)}`;
}
export function validateId(value, kind) {
  if (!kinds.has(kind) || typeof value !== 'string' || !value.startsWith(`${kind}:`)) fail('id', 'wrong namespace');
  let parts;
  try { parts = JSON.parse(value.slice(kind.length + 1)); } catch { fail('id', 'invalid tuple'); }
  if (createId(kind, parts) !== value) fail('id', 'noncanonical encoding');
  return value;
}

/** slotId is an opaque calendar key: ordering/occupancy belongs to batches 02/04. */
export function validateMoment(moment, path = 'moment') {
  shape(moment, ['date','slotId'], path);
  try { gameDate(moment.date); } catch { fail(`${path}.date`, 'invalid civil date'); }
  text(moment.slotId, `${path}.slotId`);
  return moment;
}
function enrollment(record, path) {
  shape(record, ['id','personId','cohortId','classId','from','until'], path);
  ref(record.id, 'enrollment', `${path}.id`); text(record.personId, `${path}.personId`);
  ref(record.cohortId, 'cohort', `${path}.cohortId`); ref(record.classId, 'class', `${path}.classId`);
  validateMoment(record.from, `${path}.from`);
  if (record.until !== null) {
    validateMoment(record.until, `${path}.until`);
    if (record.until.date < record.from.date) fail(path, 'enrollment ends before it starts');
  }
}

/** Minimal event reference/choice carrier. No eligibility, weights or result draws.
 * Fact references carry objective occurrence only; claims and acquisition are separate.
 * Results identify subject + facet independently of event/fact and numeric receipt IDs.
 */
export function validateEventEnvelope(event, path = 'event') {
  canonicalData(event); // Reject getters, sparse arrays, undefined and non-JSON data first.
  shape(event, ['schemaVersion','id','definitionId','contentVersion','type','participantIds','stageId','facts','knowledge','results','choice'], path);
  if (event.schemaVersion !== 1) fail(`${path}.schemaVersion`, 'unsupported version');
  ref(event.id, 'event', `${path}.id`); ref(event.stageId, 'stage', `${path}.stageId`);
  text(event.definitionId, `${path}.definitionId`); text(event.contentVersion, `${path}.contentVersion`);
  if (!['direct','cumulative'].includes(event.type)) fail(`${path}.type`, 'expected direct or cumulative');
  strings(event.participantIds, `${path}.participantIds`, { empty: false });
  const participant = (id, p) => { text(id, p); if (!event.participantIds.includes(id)) fail(p, 'unknown participant'); };
  list(event.facts, `${path}.facts`, (fact, p) => {
    shape(fact, ['id','subjectIds','occurredAt'], p); ref(fact.id, 'fact', `${p}.id`);
    strings(fact.subjectIds, `${p}.subjectIds`, { empty: false });
    fact.subjectIds.forEach(id => participant(id, `${p}.subjectIds`));
    validateMoment(fact.occurredAt, `${p}.occurredAt`);
  });
  distinct(event.facts.map(f => f.id), `${path}.facts`);
  const facts = new Map(event.facts.map(f => [f.id, f]));
  list(event.knowledge, `${path}.knowledge`, (known, p) => {
    shape(known, ['actorId','factId','claimId','versionId','sourceId','acquiredAt','believed'], p);
    participant(known.actorId, `${p}.actorId`); participant(known.sourceId, `${p}.sourceId`);
    ref(known.factId, 'fact', `${p}.factId`); ref(known.claimId, 'claim', `${p}.claimId`);
    text(known.versionId, `${p}.versionId`); validateMoment(known.acquiredAt, `${p}.acquiredAt`);
    if (typeof known.believed !== 'boolean') fail(`${p}.believed`, 'expected boolean');
    if (!facts.has(known.factId)) fail(`${p}.factId`, 'missing fact reference');
    if (known.acquiredAt.date < facts.get(known.factId).occurredAt.date) fail(p, 'acquisition precedes occurrence');
  });
  distinct(event.knowledge.map(k => JSON.stringify([k.actorId,k.claimId,k.versionId])), `${path}.knowledge`);
  const claims = new Map();
  for (const k of event.knowledge) {
    if (claims.has(k.claimId) && claims.get(k.claimId) !== k.factId) fail(`${path}.knowledge`, 'claim points to conflicting facts');
    claims.set(k.claimId, k.factId);
  }
  list(event.results, `${path}.results`, (result, p) => {
    shape(result, ['id','factId','subjectId','facet','effectIds','settlementId'], p);
    ref(result.id, 'result', `${p}.id`); ref(result.factId, 'fact', `${p}.factId`);
    participant(result.subjectId, `${p}.subjectId`); text(result.facet, `${p}.facet`);
    if (!facts.get(result.factId)?.subjectIds.includes(result.subjectId)) fail(p, 'result subject absent from fact');
    strings(result.effectIds, `${p}.effectIds`);
    result.effectIds.forEach(id => ref(id, 'effect', `${p}.effectIds`));
    ref(result.settlementId, 'settlement', `${p}.settlementId`);
  });
  distinct(event.results.map(r => r.id), `${path}.results`);
  distinct(event.results.map(r => JSON.stringify([r.factId,r.subjectId,r.facet])), `${path}.results.facets`);
  distinct(event.results.flatMap(r => r.effectIds), `${path}.results.effects`);
  if (event.choice !== null) {
    const c = event.choice, p = `${path}.choice`;
    shape(c, ['nodeId','options','confirmedOptionId'], p); text(c.nodeId, `${p}.nodeId`);
    list(c.options, `${p}.options`, (option, q) => {
      shape(option, ['id','emotional'], q); text(option.id, `${q}.id`);
      if (typeof option.emotional !== 'boolean') fail(q, 'expected emotional marker');
    });
    if (c.options.length < 3 || c.options.length > 8 || !c.options.some(o => o.emotional)) fail(p, 'requires 3–8 options including emotion');
    distinct(c.options.map(o => o.id), `${p}.options`);
    if (c.confirmedOptionId !== null && !c.options.some(o => o.id === c.confirmedOptionId)) fail(p, 'unknown confirmed option');
  }
  return event;
}

/** The outer version describes transport only, not a promise of save compatibility.
 * Batch 02 owns command/commit invariants; 03 owns disk atomicity/migrations; 04 owns calendar legality.
 */
export function validateFoundationEnvelope(value) {
  canonicalData(value);
  shape(value, ['kind','schemaVersion','versions','identity','position','numeric','random','enrollments','events','extensions'], 'foundation');
  if (value.kind !== 'teacher-hell-foundation' || value.schemaVersion !== 1) fail('foundation', 'unsupported transport');
  shape(value.versions, ['world','save','rules','content','assets'], 'versions');
  for (const k of ['world','save']) if (value.versions[k] !== 1) fail(`versions.${k}`, 'unsupported version; explicit migration required');
  for (const k of ['rules','content','assets']) text(value.versions[k], `versions.${k}`);
  shape(value.identity, ['careerId','attemptId','playerId','schoolId'], 'identity');
  ref(value.identity.careerId, 'career', 'identity.careerId');
  // Legacy attempt IDs remain valid. New callers should use createId('attempt', ...).
  for (const k of ['attemptId','playerId','schoolId']) text(value.identity[k], `identity.${k}`);
  shape(value.position, ['date','slotId','schoolYearId','openingId','serviceYear','statisticsPeriodId'], 'position');
  validateMoment({date:value.position.date,slotId:value.position.slotId}, 'position');
  for (const k of ['schoolYearId','openingId','statisticsPeriodId']) text(value.position[k], `position.${k}`);
  if (!Number.isInteger(value.position.serviceYear) || value.position.serviceYear < 1 || value.position.serviceYear > 30) fail('position.serviceYear', 'expected 1–30');
  validateSettlement(value.numeric); // Original v1 validation, no rewrites or repair.
  const { world, clock } = value.numeric.evolution;
  for (const [actual, expected, path] of [
    [value.identity.attemptId,value.numeric.attemptId,'identity.attemptId'],
    [value.identity.playerId,world.player.current.playerId,'identity.playerId'],
    [value.identity.schoolId,world.school.id,'identity.schoolId'],
    [value.position.serviceYear,world.player.year,'position.serviceYear'],
    ...['date','schoolYearId','openingId'].map(k => [value.position[k],clock[k],`position.${k}`]),
  ]) if (actual !== expected) fail(path, 'numeric authority mismatch');
  shape(value.random, Object.keys(value.random ?? {}), 'random');
  for (const [name, snapshot] of Object.entries(value.random)) {
    text(name, 'random.stream');
    if (['creation','structure','people','relationships','environment','natural','settlement'].includes(name)) fail('random.stream', 'numeric streams stay inside numeric');
    restoreRandom(snapshot);
  }
  list(value.enrollments, 'enrollments', enrollment);
  distinct(value.enrollments.map(e => e.id), 'enrollments');
  const people = new Set([world.player.current.playerId, ...Object.keys(world.people)]);
  for (const e of value.enrollments) if (!people.has(e.personId)) fail('enrollments.personId', 'missing numeric person');
  list(value.events, 'events', validateEventEnvelope);
  distinct(value.events.map(e => e.id), 'events');
  const factRefs = new Map();
  for (const event of value.events) for (const fact of event.facts) {
    const encoded = canonicalData(fact);
    if (factRefs.has(fact.id) && factRefs.get(fact.id) !== encoded) fail('events.facts', 'conflicting shared fact reference');
    factRefs.set(fact.id, encoded);
  }
  distinct(value.events.flatMap(e => e.results.map(r => r.id)), 'events.results');
  distinct(value.events.flatMap(e => e.results.flatMap(r => r.effectIds)), 'events.effects');
  for (const e of value.events) for (const id of e.participantIds) if (!people.has(id)) fail('events.participantIds', 'missing numeric person');
  shape(value.extensions, Object.keys(value.extensions ?? {}), 'extensions');
  for (const name of Object.keys(value.extensions)) if (!/^[a-z][a-z0-9-]*\/[a-z][a-z0-9-]*$/.test(name)) fail('extensions', 'use owner/name namespace');
  return value;
}

/** Detach plain validated JSON without consuming RNG or claiming persistence. */
export function restoreFoundationEnvelope(saved) {
  const value = typeof saved === 'string' ? JSON.parse(saved) : saved;
  validateFoundationEnvelope(value);
  return structuredClone(value);
}
