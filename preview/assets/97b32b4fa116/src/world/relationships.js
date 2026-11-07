import { weightedMean } from '../numeric/math.js';
import { requireValue } from '../numeric/record.js';

export const RELATION_CODES = Object.freeze(['5-1','5-2','5-3','5-4']);
export const REPUTATION_CODES = Object.freeze(['8-1','8-2']);
export const directedKey = (fromId,toId) => JSON.stringify([fromId,toId]);
export const contactKey = (a,b) => JSON.stringify([a,b].sort());
export function personValues(world,id) {
  if (id === world.player.current.playerId) return world.player.current.person;
  if (!Object.hasOwn(world.people,id)) throw new RangeError('Unknown person');
  return world.people[id].values;
}

/** A shared setting is an initial basis, not evidence of friendship or past events. */
export function relationshipBasis(world,a,b) {
  personValues(world,a); personValues(world,b);
  if (a === b) throw new RangeError('Self relationship is not supported');
  const left=Object.hasOwn(world.people,a)?world.people[a]:null;
  const right=Object.hasOwn(world.people,b)?world.people[b]:null;
  if (left?.familyId && left.familyId === right?.familyId) return {kind:'household',referenceId:left.familyId};
  const students=world.classroom.studentIds, teacher=world.classroom.teacherId;
  if ((a===teacher && students.includes(b)) || (b===teacher && students.includes(a))) return {kind:'teacher-assignment',referenceId:world.classroom.id};
  if (students.includes(a) && students.includes(b)) return {kind:'same-class',referenceId:world.classroom.id};
  const caregiver=a===teacher?right:b===teacher?left:null;
  if (caregiver?.kind==='caregiver' && world.careLinks.some(link=>link.caregiverId===caregiver.id && students.includes(link.studentId))) return {kind:'care-assignment',referenceId:world.classroom.id};
  if (Object.hasOwn(world.contacts,contactKey(a,b))) return {kind:'declared-acquaintance',referenceId:contactKey(a,b)};
  throw new RangeError('No established initial contact basis');
}

/** Direction-specific initial priors; no interaction update or propagation. */
export function createRelationship(world,fromId,toId,rng) {
  const basis=relationshipBasis(world,fromId,toId), from=personValues(world,fromId), to=personValues(world,toId);
  const draw=()=>100*rng.next();
  const support=basis.kind==='household'?requireValue(world.families[basis.referenceId].values,'7-1'):draw();
  return {fromId,toId,basis,values:{
    '5-1':weightedMean([draw(),requireValue(from,'1-3'),requireValue(to,'3-1'),100-requireValue(from,'2-2'),support],[8,2,2,2,2]),
    '5-2':weightedMean([draw(),requireValue(from,'2-4'),support],[12,2,2]),
    '5-3':weightedMean([draw(),requireValue(to,'3-2'),requireValue(to,'3-1')],[12,2,2]),
    '5-4':weightedMean([draw(),requireValue(from,'2-1'),requireValue(from,'2-2')],[12,2,2]),
  }};
}
export function createReputation(world,fromId,toId,rng) {
  const from=personValues(world,fromId);
  return {fromId,toId,scope:'initial-expectation; not observed history',values:{
    '8-1':weightedMean([100*rng.next(),requireValue(from,'1-3')],[3,1]),
    '8-2':weightedMean([100*rng.next(),requireValue(from,'2-2')],[3,1]),
  }};
}
