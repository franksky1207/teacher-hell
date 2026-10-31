import { assertShape, identifier } from '../player/panel.js';
import { restoreCreation } from '../player/creation.js';
import { restoreRandom } from '../numeric/random.js';
import { validateRecord, requireValue } from '../numeric/record.js';
import { validateRoles } from './roles.js';
import { STUDENT_CODES, CAREGIVER_CODES, FAMILY_CODES, GROUP_CODES, SCHOOL_CODES } from './people.js';
import { RELATION_CODES, REPUTATION_CODES, directedKey, contactKey, personValues, relationshipBasis } from './relationships.js';

function table(value) { assertShape(value,Object.keys(value ?? {})); return Object.entries(value); }
export function exactRecord(value,codes) {
  validateRecord(value); assertShape(value,codes);
  codes.forEach(code=>requireValue(value,code));
}
function uniqueList(ids) {
  if (!Array.isArray(ids) || new Set(ids).size!==ids.length) throw new RangeError('Expected unique IDs');
  ids.forEach(identifier);
}

/** O(people + care links + stored relationships); no all-pairs traversal. */
export function validateWorld(world) {
  assertShape(world,['version','player','school','classroom','people','families','careLinks','contacts','relationships','reputations','random']);
  if (world.version!==1) throw new RangeError('Unsupported world version');
  const player=restoreCreation(world.player);
  if (player.phase!=='confirmed') throw new RangeError('Confirm player before world initialization');
  const playerId=player.current.playerId;
  assertShape(world.school,['id','mode','values']);
  if (world.school.id!==player.current.schoolId || !['private','public'].includes(world.school.mode)) throw new RangeError('School mismatch');
  exactRecord(world.school.values,SCHOOL_CODES);
  assertShape(world.classroom,['id','schoolId','teacherId','studentIds','values']);
  const classroom=world.classroom;
  identifier(classroom.id);
  if (classroom.schoolId!==world.school.id || classroom.teacherId!==playerId) throw new RangeError('Invalid class assignment');
  uniqueList(classroom.studentIds);
  if (classroom.studentIds.length!==40) throw new RangeError('First cohort must start with 40 students');
  exactRecord(classroom.values,GROUP_CODES);
  const ids=new Set([playerId,world.school.id,classroom.id]);
  if (ids.size!==3) throw new RangeError('Entity identity collision');
  const familyCounts=new Map();
  for (const [id,family] of table(world.families)) {
    assertShape(family,['id','values']); identifier(id);
    if (id!==family.id || ids.has(id)) throw new RangeError('Family identity collision');
    ids.add(id); familyCounts.set(id,{students:0,caregivers:0});
    exactRecord(family.values,FAMILY_CODES);
  }
  let students=0;
  for (const [id,person] of table(world.people)) {
    assertShape(person,['id','kind','roleIds','familyId','values']); identifier(id);
    if (id!==person.id || ids.has(id) || !['student','caregiver','other'].includes(person.kind)) throw new RangeError('Invalid person identity');
    ids.add(id); validateRoles(person.roleIds);
    exactRecord(person.values,person.kind==='student'?STUDENT_CODES:CAREGIVER_CODES);
    if (person.kind==='other') {
      if (person.familyId!==null) throw new RangeError('Other NPC household must be established separately');
    } else {
      const family=familyCounts.get(person.familyId);
      if (!family) throw new RangeError('Dangling family reference');
      if (person.kind==='student') {
        students++; family.students++;
        if (!person.roleIds.includes(11)) throw new RangeError('Missing core student tag');
      } else {
        family.caregivers++;
        if (!person.roleIds.includes(19)) throw new RangeError('Missing caregiver tag');
      }
    }
  }
  if (students!==40 || classroom.studentIds.some(id=>!Object.hasOwn(world.people,id) || world.people[id].kind!=='student')) throw new RangeError('Invalid core student membership');
  for (const count of familyCounts.values()) if (!count.students || !count.caregivers) throw new RangeError('Orphan household');
  if (!Array.isArray(world.careLinks)) throw new TypeError('Care links required');
  const links=new Set(), caredFor=new Set(), activeCaregivers=new Set();
  for (const link of world.careLinks) {
    assertShape(link,['studentId','caregiverId']);
    const student=Object.hasOwn(world.people,link.studentId)?world.people[link.studentId]:null;
    const caregiver=Object.hasOwn(world.people,link.caregiverId)?world.people[link.caregiverId]:null;
    const key=directedKey(link.studentId,link.caregiverId);
    if (!student || !caregiver || student.kind!=='student' || caregiver.kind!=='caregiver' || student.familyId!==caregiver.familyId || links.has(key)) throw new RangeError('Invalid care link');
    links.add(key); caredFor.add(student.id); activeCaregivers.add(caregiver.id);
  }
  if (caredFor.size!==40 || Object.values(world.people).some(p=>p.kind==='caregiver' && !activeCaregivers.has(p.id))) throw new RangeError('Missing care association');
  for (const [key,contact] of table(world.contacts)) {
    assertShape(contact,['a','b','reference']); identifier(contact.reference);
    personValues(world,contact.a); personValues(world,contact.b);
    if (contact.a===contact.b || key!==contactKey(contact.a,contact.b)) throw new RangeError('Invalid contact');
  }
  for (const [key,relation] of table(world.relationships)) {
    assertShape(relation,['fromId','toId','basis','values']);
    if (key!==directedKey(relation.fromId,relation.toId)) throw new RangeError('Invalid relationship key');
    assertShape(relation.basis,['kind','referenceId']);
    const expected=relationshipBasis(world,relation.fromId,relation.toId);
    if (expected.kind!==relation.basis.kind || expected.referenceId!==relation.basis.referenceId) throw new RangeError('Invalid relationship basis');
    exactRecord(relation.values,RELATION_CODES);
    if (relation.toId===playerId && !Object.hasOwn(world.reputations,key)) throw new RangeError('Missing incoming expectation');
  }
  for (const [key,reputation] of table(world.reputations)) {
    assertShape(reputation,['fromId','toId','scope','values']); identifier(reputation.scope);
    if (!Object.hasOwn(world.relationships,key) || key!==directedKey(reputation.fromId,reputation.toId) || reputation.toId!==playerId) throw new RangeError('Dangling reputation source');
    exactRecord(reputation.values,REPUTATION_CODES);
  }
  for (const evaluation of player.current.evaluations) {
    if (evaluation.kind==='person') personValues(world,evaluation.sourceId);
    if (evaluation.kind==='group' && ![classroom.id,world.school.id].includes(evaluation.sourceId)) throw new RangeError('Unknown evaluation group');
  }
  assertShape(world.random,['structure','people','relationships','environment']);
  Object.values(world.random).forEach(restoreRandom);
  return world;
}
