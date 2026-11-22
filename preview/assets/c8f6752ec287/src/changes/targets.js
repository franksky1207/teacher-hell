import { assertShape, identifier } from '../player/panel.js';
import { requireValue } from '../numeric/record.js';

/** Resolve canonical holders only. Never creates a missing person, edge or field. */
export function targetRecord(world,target,{receiptDate=null}={}) {
  assertShape(target,['kind','id']); identifier(target.kind); identifier(target.id);
  const own = (table,id) => {
    if (!Object.hasOwn(table ?? {},id)) throw new RangeError('Unknown numeric holder');
    return table[id].values;
  };
  if (['player-person','player-life','player-work','player-outlook'].includes(target.kind)) {
    if (target.id !== world.player.current.playerId) throw new RangeError('Wrong player target');
    const name = target.kind.slice(7);
    return name === 'outlook'?world.player.current.outlook.values:world.player.current[name];
  }
  if (target.kind === 'person') return own(world.people,target.id);
  if (target.kind === 'family') return own(world.families,target.id);
  if (target.kind === 'relationship') return own(world.relationships,target.id);
  if (target.kind === 'reputation') return own(world.reputations,target.id);
  if (target.kind === 'group-evaluation') return own(world.social?.groupEvaluations,target.id);
  // Historical receipts may read the former homeroom's archived holder. New
  // operations never pass receiptDate and cannot mutate a sealed class.
  if(receiptDate!==null&&['classroom','group'].includes(target.kind)){
    const r=world.registry,c=r?.classes[target.id];
    if(c?.values&&r.cohorts.some(cohort=>cohort.classId===target.id)&&r.assignments.some(a=>a.personId===world.player.current.playerId&&a.roleId===9&&a.classId===target.id&&a.from<=receiptDate&&a.until!==null&&receiptDate<=a.until))return c.values;
  }
  if (target.kind === 'group') {
    if (target.id === world.classroom.id) return world.classroom.values;
    if (target.id === world.school.id) return world.school.values;
    const group = world.social?.groups;
    if (!Object.hasOwn(group ?? {},target.id) || group[target.id].kind !== 'local') throw new RangeError('Unknown group');
    return group[target.id].values;
  }
  if (target.kind === 'classroom' && target.id === world.classroom.id) return world.classroom.values;
  if (target.kind === 'school' && target.id === world.school.id) return world.school.values;
  throw new RangeError('Unknown numeric target kind');
}
export function validateChange(world,change,options) {
  assertShape(change,['target','code','delta']);
  const record=targetRecord(world,change.target,options);
  requireValue(record,change.code);
  return record;
}
