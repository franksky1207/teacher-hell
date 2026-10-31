import { assertShape, identifier } from '../player/panel.js';
import { normalizeWeights, probability } from '../numeric/math.js';
import { validateRecord, requireValue } from '../numeric/record.js';
import { directedKey, personValues } from './relationships.js';

const codes = ['5-1','5-2','5-3','5-4','8-1','8-2'];
function unique(ids) {
  if (!Array.isArray(ids) || !ids.length || new Set(ids).size !== ids.length) throw new RangeError('Nonempty unique provenance required');
  ids.forEach(identifier);
}
export function validateSocial(world) {
  const social = world.social;
  assertShape(social,['version','groups','groupEvaluations','attestations']);
  if (social.version !== 1) throw new RangeError('Unknown social version');
  if (world.player.current.evaluations.some(entry=>entry.kind !== 'bootstrap' && !Object.hasOwn(entry,'reference'))) throw new RangeError('Managed opinions must reference authoritative data');
  for (const name of ['groups','groupEvaluations','attestations']) assertShape(social[name],Object.keys(social[name] ?? {}));
  for (const [id,g] of Object.entries(social.groups)) {
    assertShape(g,['id','kind','scope','memberIds','values']); identifier(id); identifier(g.scope);
    if (g.id !== id || !['classroom','school','local'].includes(g.kind)) throw new RangeError('Invalid group');
    unique(g.memberIds); g.memberIds.forEach(actor=>personValues(world,actor));
    if (g.kind === 'local') {
      if ([world.school.id,world.classroom.id,world.player.current.playerId].includes(id) || Object.hasOwn(world.people,id) || Object.hasOwn(world.families,id)) throw new RangeError('Group identity collision');
      assertShape(g.values,['9-2','6-3','6-4']); validateRecord(g.values);
      Object.keys(g.values).forEach(code=>requireValue(g.values,code));
    } else if (g.values !== null || id !== world[g.kind === 'school'?'school':'classroom'].id) throw new RangeError('Group must reference its authoritative holder');
  }
  for (const [key,a] of Object.entries(social.attestations)) {
    assertShape(a,['fromId','toId','scope','basisId']); identifier(a.scope); identifier(a.basisId);
    identifier(a.fromId); identifier(a.toId); personValues(world,a.fromId); personValues(world,a.toId);
    if (a.fromId === a.toId || key !== directedKey(a.fromId,a.toId) || !Object.hasOwn(world.reputations,key) || !Object.hasOwn(world.relationships,key)) throw new RangeError('Missing directed assessment');
  }
  for (const [key,a] of Object.entries(social.groupEvaluations)) {
    assertShape(a,['fromId','toId','scope','basisId','originIds','values']); identifier(a.scope); identifier(a.basisId);
    identifier(a.fromId); identifier(a.toId); personValues(world,a.toId);
    const group = Object.hasOwn(social.groups,a.fromId)?social.groups[a.fromId]:null;
    if (!group || key !== directedKey(a.fromId,a.toId)) throw new RangeError('Invalid group assessment');
    unique(a.originIds);
    if (a.originIds.some(id=>id === a.toId || !group.memberIds.includes(id))) throw new RangeError('Invalid represented origins');
    assertShape(a.values,codes); validateRecord(a.values); codes.forEach(code=>requireValue(a.values,code));
  }
  return social;
}

/** Resolve references into ephemeral N2 views; equal budgets per present semantic pool. */
export function resolveWorldEvaluations(world, entries) {
  validateSocial(world);
  const seen = new Set(), voices = new Set(), pools = new Map();
  const resolved = entries.map(entry => {
    assertShape(entry,['sourceId','kind','targetId','scope','weight','reference']);
    identifier(entry.sourceId); identifier(entry.scope); probability(entry.weight);
    assertShape(entry.reference,['type','key']);
    if (!entry.weight || seen.has(entry.sourceId) || entry.targetId !== world.player.current.playerId || entry.sourceId === entry.targetId) throw new RangeError('Invalid evaluation reference');
    seen.add(entry.sourceId);
    const key = directedKey(entry.sourceId,entry.targetId);
    if (entry.reference.key !== key) throw new RangeError('Wrong evaluation direction');
    let values, origins, pool, assessment;
    if (entry.kind === 'person' && entry.reference.type === 'person-evaluation') {
      assessment = world.social.attestations[key];
      if (!assessment) throw new RangeError('Assessment basis required before activation');
      const person = world.people[entry.sourceId];
      values = {...world.relationships[key].values,...world.reputations[key].values};
      delete values['5-2']; // N2 reputation does not consume closeness.
      origins = [entry.sourceId];
      pool = person.kind === 'student'?'students':person.kind === 'caregiver'?'caregivers':person.roleIds.some(id=>id<=10)?'professionals':'outside';
    } else if (entry.kind === 'group' && entry.reference.type === 'group-evaluation') {
      assessment = world.social.groupEvaluations[key];
      if (!assessment) throw new RangeError('Unknown group evaluation');
      values = assessment.values; origins = assessment.originIds; pool = 'groups';
    } else throw new RangeError('Unknown reference type');
    if (entry.scope !== assessment.scope) throw new RangeError('Assessment scope mismatch');
    for (const origin of origins) {
      if (voices.has(origin)) throw new RangeError('Repeated represented voice');
      voices.add(origin);
    }
    const view = {sourceId:entry.sourceId,kind:entry.kind,targetId:entry.targetId,scope:entry.scope,weight:entry.weight,values};
    if (!pools.has(pool)) pools.set(pool,[]);
    pools.get(pool).push(view);
    return view;
  });
  for (const views of pools.values()) {
    const weights = normalizeWeights(views.map(view=>view.weight));
    views.forEach((view,i)=>{
      view.weight = weights[i]/pools.size;
      if (view.weight === 0) throw new RangeError('Pool weight is below representable precision');
    });
  }
  return resolved;
}
