import { requireValue, validateRecord } from '../numeric/record.js';
import { weightedMean } from '../numeric/math.js';

export function groupProfile(values,{classroom = false} = {}) {
  validateRecord(values);
  const cooperation = requireValue(values,'9-2'), cohesion = requireValue(values,'6-3'), exclusion = requireValue(values,'6-4');
  const result = {cooperation,cohesion,exclusion,openness:100-exclusion};
  if (classroom) result.order = requireValue(values,'9-1');
  result.coordination = classroom?weightedMean([result.order,cooperation,cohesion],[2,3,3]):weightedMean([cooperation,cohesion],[1,1]);
  return result;
}
export function participationWeight(person,group) {
  validateRecord(person);
  return weightedMean([requireValue(person,'6-1'),requireValue(person,'6-2'),groupProfile(group).cooperation],[3,1,2]);
}
export function organizationProfile(values) {
  validateRecord(values);
  return {support:weightedMean(['10-1','10-3','10-4'].map(code=>requireValue(values,code)),[2,1,1]),oversight:requireValue(values,'10-2')};
}
