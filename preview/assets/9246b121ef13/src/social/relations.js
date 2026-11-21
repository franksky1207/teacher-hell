import { assertShape, identifier } from '../player/panel.js';
import { validateRecord, requireValue } from '../numeric/record.js';
import { finite, weightedMean } from '../numeric/math.js';
import { directedKey, personValues, RELATION_CODES } from '../world/relationships.js';

export function relationshipVector(values) {
  validateRecord(values);
  return Object.fromEntries(RELATION_CODES.map(code=>[code,requireValue(values,code)]));
}
export function relationshipView(world,fromId,toId) {
  identifier(fromId); identifier(toId); personValues(world,fromId); personValues(world,toId);
  if (fromId === toId) throw new RangeError('Self relationship unsupported');
  const relation = world.relationships[directedKey(fromId,toId)];
  return relation?{status:'known',fromId,toId,values:relationshipVector(relation.values)}:{status:'unknown',fromId,toId};
}
/** Explicit same-direction evidence only; never reads history or the reverse edge. */
export function combineRelationships(fromId,toId,sources) {
  identifier(fromId); identifier(toId);
  if (fromId === toId || !Array.isArray(sources) || !sources.length) throw new RangeError('Directed sources required');
  const seen = new Set();
  for (const source of sources) {
    assertShape(source,['id','fromId','toId','weight','values']); identifier(source.id);
    if (source.fromId !== fromId || source.toId !== toId || seen.has(source.id)) throw new RangeError('Duplicate or reversed evidence');
    seen.add(source.id); relationshipVector(source.values);
  }
  return {fromId,toId,values:Object.fromEntries(RELATION_CODES.map(code=>[code,weightedMean(sources.map(s=>requireValue(s.values,code)),sources.map(s=>s.weight))]))};
}
/** Validated delta proposal only. N6 chooses shock/recovery and applies it once. */
export function prepareRelationshipChange(relation,deltas) {
  assertShape(relation,['fromId','toId','values']); identifier(relation.fromId); identifier(relation.toId);
  if (relation.fromId === relation.toId) throw new RangeError('Self relationship unsupported');
  const before = relationshipVector(relation.values);
  assertShape(deltas,Object.keys(deltas ?? {}));
  for (const [code,delta] of Object.entries(deltas)) {
    if (!RELATION_CODES.includes(code)) throw new RangeError('Not a relationship field');
    finite(delta);
  }
  return {fromId:relation.fromId,toId:relation.toId,before,deltas:{...deltas}};
}
