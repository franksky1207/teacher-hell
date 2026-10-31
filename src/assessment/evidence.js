import { assertShape, identifier, ABILITY_NAMES, STATE_NAMES } from '../player/panel.js';
import { numericValue, probability } from '../numeric/math.js';
import { deriveWorldPanel } from '../social/reputation.js';
import { requireValue } from '../numeric/record.js';
import { OUTCOME_KINDS } from './grading.js';

export function idList(values,{empty=false}={}) {
  if(!Array.isArray(values)||(!empty&&!values.length)) throw new TypeError('Reference list required');
  values.forEach(identifier);
  // forEach skips holes: reject sparse arrays explicitly.
  if(Object.keys(values).length!==values.length) throw new TypeError('Dense reference list required');
  return [...new Set(values)];
}
export function yearNumber(year) {
  if(!Number.isInteger(year)||year<1||year>30) throw new RangeError('Assessment year must be 1..30');
}
function header(record,kind,provenance) {
  identifier(record.id);
  if(record.kind!==kind||record.provenance!==provenance) throw new RangeError('Wrong assessment source kind/provenance');
}
export function validateSnapshot(s,provenance) {
  assertShape(s,['id','kind','provenance','playerId','schoolId','year','attemptId','abilities','states','classroom','students']);header(s,'snapshot',provenance);
  identifier(s.playerId);identifier(s.schoolId);identifier(s.attemptId);yearNumber(s.year);
  if(s.playerId===s.schoolId) throw new RangeError('Snapshot identity collision');
  assertShape(s.abilities,ABILITY_NAMES);assertShape(s.states,STATE_NAMES);
  [...Object.values(s.abilities),...Object.values(s.states)].forEach(numericValue);
  assertShape(s.classroom,['id','order','cooperation']);identifier(s.classroom.id);numericValue(s.classroom.order);numericValue(s.classroom.cooperation);
  if(!Array.isArray(s.students)) throw new RangeError('Student snapshot required');
  const ids=new Set();
  for(const student of s.students) {
    assertShape(student,['id','belonging','safety']);identifier(student.id);
    if(ids.has(student.id)||[s.playerId,s.schoolId,s.classroom.id].includes(student.id)) throw new RangeError('Repeated student snapshot');ids.add(student.id);
    numericValue(student.belonging);numericValue(student.safety);
  }
  return s;
}
/** Historical report projection, not a second current-state authority. */
export function captureAssessment(world,{id,provenance,attemptId}) {
  identifier(id);identifier(attemptId);if(!['formal','synthetic'].includes(provenance)) throw new RangeError('Explicit provenance required');
  const panel=deriveWorldPanel(world);
  return validateSnapshot({id,kind:'snapshot',provenance,playerId:world.player.current.playerId,schoolId:world.school.id,year:world.player.year,attemptId,
    abilities:Object.fromEntries(ABILITY_NAMES.map(n=>[n,panel[n]])),states:Object.fromEntries(STATE_NAMES.map(n=>[n,panel[n]])),
    classroom:{id:world.classroom.id,order:requireValue(world.classroom.values,'9-1'),cooperation:requireValue(world.classroom.values,'9-2')},
    students:world.classroom.studentIds.map(id=>({id,belonging:requireValue(world.people[id].values,'9-3'),safety:requireValue(world.people[id].values,'9-4')})),
  },provenance);
}
export function validateSummary(s,p) {
  assertShape(s,['id','kind','provenance','playerId','schoolId','year','attemptId','cohortId','startRef','endRef','completionRef','evidenceRefs']);header(s,'year-summary',p);
  ['playerId','schoolId','attemptId','cohortId','startRef','endRef','completionRef'].forEach(k=>identifier(s[k]));yearNumber(s.year);idList(s.evidenceRefs,{empty:true});return s;
}
function validateFact(r,p) {
  assertShape(r,['id','kind','provenance','playerId','schoolId','year','attemptId','confirmed','subjectIds']);header(r,'fact',p);
  ['playerId','schoolId','attemptId'].forEach(k=>identifier(r[k]));yearNumber(r.year);idList(r.subjectIds);
  if(r.confirmed!==true) throw new RangeError('Objective fact must be confirmed');return r;
}
function validateCompletion(r,p) {
  assertShape(r,['id','kind','provenance','playerId','schoolId','year','attemptId','outcome','basisIds']);header(r,'completion',p);
  ['playerId','schoolId','attemptId'].forEach(k=>identifier(r[k]));yearNumber(r.year);idList(r.basisIds);
  if(!['success','failure','pending'].includes(r.outcome)) throw new RangeError('Unknown externally confirmed outcome');return r;
}
function validateOutcome(r,p) {
  assertShape(r,['id','kind','provenance','factId','playerId','schoolId','year','attemptId','cohortId','subjectId','importance','responsibility','quality','completion','accountability','significant']);
  if(!OUTCOME_KINDS.includes(r.kind)||r.provenance!==p) throw new RangeError('Formal outcome evidence required; numeric receipts are not outcomes');
  ['id','factId','playerId','schoolId','attemptId','cohortId','subjectId'].forEach(k=>identifier(r[k]));yearNumber(r.year);
  for(const k of ['quality','completion','accountability']) numericValue(r[k]);
  probability(r.importance);probability(r.responsibility);
  if(!r.importance||!r.responsibility||typeof r.significant!=='boolean') throw new RangeError('Outcome responsibility/importance required');return r;
}
function validateCohort(r,p) {
  assertShape(r,['id','kind','provenance','playerId','schoolId','years','studentIds','importance']);header(r,'cohort',p);
  identifier(r.playerId);identifier(r.schoolId);probability(r.importance);
  if(!r.importance||idList(r.studentIds).length!==r.studentIds.length||!Array.isArray(r.years)||r.years.length!==3) throw new RangeError('Three-year cohort required');
  r.years.forEach(yearNumber);
  if(r.years[1]!==r.years[0]+1||r.years[2]!==r.years[1]+1||r.studentIds.some(id=>[r.playerId,r.schoolId].includes(id))) throw new RangeError('Invalid cohort enrollment/years');
  return r;
}
export function sourceReader(source) {
  const missing=[],cache=new Map();
  if(source!==undefined) {
    assertShape(source,['provenance','resolve']);
    if(!['formal','synthetic'].includes(source.provenance)||typeof source.resolve!=='function') throw new TypeError('Explicit read-only evidence authority required');
  }
  function read(id,kind) {
    identifier(id);
    const record=cache.has(id)?cache.get(id):source?.resolve(id);
    cache.set(id,record);
    if(record===undefined||record===null) {missing.push({id,reason:'missing-reference'});return null;}
    if(record.id!==id) throw new RangeError('Authority reference mismatch');
    if(kind==='snapshot') validateSnapshot(record,source.provenance);
    else if(kind==='year-summary') validateSummary(record,source.provenance);
    else if(kind==='fact') validateFact(record,source.provenance);
    else if(kind==='completion') validateCompletion(record,source.provenance);
    else if(kind==='cohort') validateCohort(record,source.provenance);
    else validateOutcome(record,source.provenance);
    return record;
  }
  return {read,missing,provenance:source?.provenance ?? null};
}
export const insufficient=missing=>({status:'insufficient',score:null,grade:null,missing});
/** One canonical result per fact. Repeated identical references are harmless. */
export function uniqueOutcomes(rows) {
  const byId=new Map(),facts=new Map();
  for(const row of rows) {
    if(byId.has(row.id)) continue;
    if(facts.has(row.factId)) throw new RangeError('Same fact has multiple outcome identities');
    byId.set(row.id,row);facts.set(row.factId,row.id);
  }
  return [...byId.values()];
}
