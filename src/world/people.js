import { weightedMean } from '../numeric/math.js';
import { createRecord, validateRecord, requireValue } from '../numeric/record.js';
import { identifier } from '../player/panel.js';
import { validateRoles } from './roles.js';

const codes = (category, count) => Array.from({ length:count }, (_, i) => `${category}-${i+1}`);
export const FAMILY_CODES = Object.freeze(codes(7,4));
export const CAREGIVER_CODES = Object.freeze([1,2,3,4].flatMap(c => codes(c,4)).concat(codes(6,2),['8-3','8-4'],FAMILY_CODES));
export const STUDENT_CODES = Object.freeze([...CAREGIVER_CODES,'9-3','9-4']);
export const GROUP_CODES = Object.freeze(['9-1','9-2','6-3','6-4']);
export const SCHOOL_CODES = Object.freeze([10,11,12].flatMap(c=>codes(c,4)));

/** Independent per-field mixture, never a person archetype or moral quota. */
export function samplePersonal(code, rng) {
  if (['2-1','2-2','2-3'].includes(code)) return 100 * rng.next() ** 2;
  return rng.chance(0.25) ? 100*rng.next() : 50*(rng.next()+rng.next());
}
export function sampleRecord(applicable, rng, personal = false) {
  const result = createRecord(applicable);
  for (const code of Object.keys(result)) result[code] = personal ? samplePersonal(code,rng) : 100*rng.next();
  validateRecord(result);
  return result;
}
export function createPerson(id, kind, roleIds, rng) {
  identifier(id); validateRoles(roleIds);
  if (!['student','caregiver','other'].includes(kind)) throw new RangeError('Unknown person kind');
  return { id, kind, roleIds:[...roleIds].sort((a,b)=>a-b), familyId:null,
    values:sampleRecord(kind === 'student' ? STUDENT_CODES : CAREGIVER_CODES,rng,true) };
}

/** Apply once during initialization, after individual factors and household facts exist. */
export function withFamilyContext(person, family) {
  identifier(family.id);
  const values = { ...person.values };
  for (const code of FAMILY_CODES) values[code] = weightedMean([requireValue(values,code),requireValue(family.values,code)],[3,1]);
  for (const [trait,context] of [['1-1','7-4'],['1-2','7-2'],['1-3','7-1'],['1-4','7-4']]) {
    values[trait] = weightedMean([requireValue(values,trait),requireValue(family.values,context)],[7,1]);
  }
  return { ...person, familyId:family.id, values };
}
