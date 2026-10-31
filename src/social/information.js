import { assertShape, identifier } from '../player/panel.js';
import { validateRecord, requireValue } from '../numeric/record.js';
import { probability } from '../numeric/math.js';
import { relationshipVector } from './relations.js';

/** References separate objective fact, claim version, source knowledge and candidate route. */
export function validateInformationContext(context) {
  assertShape(context,['fact','claim','knowledge','route']);
  const {fact,claim,knowledge,route} = context;
  assertShape(fact,['id']); identifier(fact.id);
  assertShape(claim,['id','factId','versionId','evidence']);
  [claim.id,claim.factId,claim.versionId].forEach(identifier);
  if (claim.factId !== fact.id || !['unverified','supported','contested'].includes(claim.evidence)) throw new RangeError('Invalid claim reference');
  assertShape(knowledge,['actorId','claimId','knownVersions','believedVersionId']);
  identifier(knowledge.actorId); identifier(knowledge.claimId);
  if (!Array.isArray(knowledge.knownVersions) || new Set(knowledge.knownVersions).size !== knowledge.knownVersions.length) throw new RangeError('Invalid known versions');
  knowledge.knownVersions.forEach(identifier);
  if (knowledge.believedVersionId !== null && !knowledge.knownVersions.includes(knowledge.believedVersionId)) throw new RangeError('Belief must identify a known version');
  assertShape(route,['fromId','toId','claimId','versionId','basisId','available']);
  [route.fromId,route.toId,route.claimId,route.versionId,route.basisId].forEach(identifier);
  if (typeof route.available !== 'boolean' || route.fromId === route.toId || route.fromId !== knowledge.actorId || route.claimId !== claim.id || knowledge.claimId !== claim.id || route.versionId !== claim.versionId) throw new RangeError('Invalid candidate path');
  return context;
}
const interior = z => probability(.02 + .96/(1+Math.exp(-z)));
function calculate(mode,actor,relation,context) {
  validateInformationContext(context);
  assertShape(actor,['id','values']); identifier(actor.id); validateRecord(actor.values);
  const {route,knowledge,claim} = context;
  const fromId = mode === 'adoption'?route.toId:route.fromId;
  const toId = mode === 'adoption'?route.fromId:route.toId;
  if (actor.id !== fromId) throw new RangeError('Wrong actor for probability');
  const own = code => requireValue(actor.values,code)/100-.5;
  // Validate applicable numerical inputs even if the route is unavailable.
  const base = mode === 'adoption'?-.4+1.6*own('8-3')+.4*own('3-1')-.7*own('3-2'):
    -.7+1.8*own('8-4')+.8*own('6-1')+.5*own('8-3');
  let values;
  if (relation !== null) {
    assertShape(relation,['fromId','toId','values']);
    if (relation.fromId !== fromId || relation.toId !== toId) throw new RangeError('Wrong relationship direction');
    values = relationshipVector(relation.values);
  }
  if (!route.available) return {eligible:false,probability:null,reason:'no-available-path'};
  if (!knowledge.knownVersions.includes(route.versionId)) return {eligible:false,probability:null,reason:'source-does-not-know-version'};
  if (!values) return {eligible:false,probability:null,reason:'unknown-relationship'};
  const r = code => values[code]/100-.5;
  const z = mode === 'adoption'?base+r('5-1')+.5*r('5-3')-.3*r('5-4')+({supported:.7,contested:-.7,unverified:0}[claim.evidence]):
    base+.4*r('5-2')+.3*r('5-1')-.4*r('5-4');
  return {eligible:true,probability:interior(z)};
}
export const adoptionProbability = (actor,relation,context) => calculate('adoption',actor,relation,context);
export const forwardingProbability = (actor,relation,context) => calculate('forwarding',actor,relation,context);
