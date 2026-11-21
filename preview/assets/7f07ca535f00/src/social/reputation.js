import { derivePanel, assertShape, identifier } from '../player/panel.js';
import { validateWorld } from '../world/validation.js';
import { resolveWorldEvaluations } from '../world/evaluations.js';
import { directedKey } from '../world/relationships.js';

const clone = value => JSON.parse(JSON.stringify(value));
function edit(world, mutate) {
  validateWorld(world,{stage:'runtime'});
  const next = clone(world);
  next.social ??= {version:1,groups:{},groupEvaluations:{},attestations:{}};
  mutate(next);
  validateWorld(next,{stage:'runtime'});
  return next;
}
function insert(table,key,value) {
  if (Object.hasOwn(table,key)) throw new RangeError('Assessment already registered; event updates belong to N6');
  Object.defineProperty(table,key,{value:clone(value),enumerable:true,writable:true,configurable:true});
}
export function initializeSocial(world) { return edit(world,()=>{}); }
export function registerGroup(world,group) { return edit(world,next=>insert(next.social.groups,group.id,group)); }
/** Caller supplies a real assessment basis; does not invent interaction or revise opinions. */
export function attestPersonEvaluation(world,assessment) {
  return edit(world,next=>insert(next.social.attestations,directedKey(assessment.fromId,assessment.toId),assessment));
}
/** Register supplied initial opinion for an established edge, including NPC→NPC.
 * Existing canonical opinions cannot be overwritten by this initialization interface. */
export function registerPersonEvaluation(world,assessment) {
  assertShape(assessment,['fromId','toId','scope','basisId','values']);
  return edit(world,next=>{
    const {fromId,toId,scope,basisId,values} = assessment, key = directedKey(fromId,toId);
    insert(next.reputations,key,{fromId,toId,scope,values});
    insert(next.social.attestations,key,{fromId,toId,scope,basisId});
  });
}
export function registerGroupEvaluation(world,assessment) {
  return edit(world,next=>insert(next.social.groupEvaluations,directedKey(assessment.fromId,assessment.toId),assessment));
}
export function activateReputation(world,selections) {
  if (!Array.isArray(selections) || !selections.length) throw new RangeError('Actual sources required');
  return edit(world,next=>{
    next.player.current.evaluations = selections.map(selection=>{
      assertShape(selection,['sourceId','kind','weight']);
      const {sourceId,kind,weight} = selection;
      identifier(sourceId);
      if (!['person','group'].includes(kind)) throw new RangeError('Invalid source kind');
      const targetId = next.player.current.playerId, key = directedKey(sourceId,targetId);
      const assessment = kind === 'person'?next.social.attestations[key]:next.social.groupEvaluations[key];
      if (!assessment) throw new RangeError('No supplied assessment basis');
      return {sourceId,kind,targetId,scope:assessment.scope,weight,reference:{type:kind === 'person'?'person-evaluation':'group-evaluation',key}};
    });
  });
}
export function deriveWorldPanel(world) {
  validateWorld(world,{stage:'runtime'});
  return derivePanel(world.player.current,{resolveEvaluations:entries=>resolveWorldEvaluations(world,entries)});
}
export function evaluationView(world,fromId,toId,kind = 'person') {
  validateWorld(world,{stage:'runtime'});
  identifier(fromId); identifier(toId);
  const key = directedKey(fromId,toId);
  const source = kind === 'person'?world.reputations[key]:world.social?.groupEvaluations[key];
  if (!['person','group'].includes(kind)) throw new RangeError('Unknown evaluation kind');
  return source?{status:'known',kind,...clone(source)}:{status:'unknown',kind,fromId,toId};
}
