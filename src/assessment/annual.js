import { ABILITY_NAMES, STATE_NAMES } from '../player/panel.js';
import { weightedMean } from '../numeric/math.js';
import { sourceReader, idList, insufficient, uniqueOutcomes } from './evidence.js';
import { ANNUAL_LIMITS, development, mean, outcomeScore, scoredResult } from './grading.js';

export function checkIdentity(record,summary) {
  if(record.playerId!==summary.playerId||record.schoolId!==summary.schoolId||record.year!==summary.year||(Object.hasOwn(record,'attemptId')&&record.attemptId!==summary.attemptId)) throw new RangeError('Assessment identity/year/attempt mismatch');
}
export function loadYear(reader,ref) {
  const summary=reader.read(ref,'year-summary');if(!summary)return null;
  const cohort=reader.read(summary.cohortId,'cohort');
  if(cohort&&(cohort.playerId!==summary.playerId||cohort.schoolId!==summary.schoolId||!cohort.years.includes(summary.year))) throw new RangeError('Annual cohort mismatch');
  const start=reader.read(summary.startRef,'snapshot'),end=reader.read(summary.endRef,'snapshot'),completion=reader.read(summary.completionRef,'completion');
  for(const record of [start,end,completion]) if(record)checkIdentity(record,summary);
  if(start&&end&&start.classroom.id!==end.classroom.id) throw new RangeError('Class assignment changed within assessed year');
  if(completion) for(const id of idList(completion.basisIds)) {
    const fact=reader.read(id,'fact');
    if(fact) {checkIdentity(fact,summary);if(!fact.subjectIds.includes(summary.playerId)) throw new RangeError('Completion fact lacks assessed player');}
  }
  if(cohort&&start&&end&&start.students.concat(end.students).some(s=>!cohort.studentIds.includes(s.id))) throw new RangeError('Snapshot student absent from cohort');
  const rows=idList(summary.evidenceRefs,{empty:true}).map(id=>reader.read(id,'outcome')).filter(Boolean);
  for(const row of rows) {
    checkIdentity(row,summary);
    const fact=reader.read(row.factId,'fact');
    if(fact) {checkIdentity(fact,summary);if(!fact.subjectIds.includes(row.subjectId)) throw new RangeError('Outcome subject absent from fact');}
    if(row.cohortId!==summary.cohortId) throw new RangeError('Wrong outcome cohort');
    if(row.kind==='student'&&start&&end&&!start.students.concat(end.students).some(s=>s.id===row.subjectId)) throw new RangeError('Student evidence lacks enrollment');
  }
  return {summary,start,end,completion,cohort,rows:uniqueOutcomes(rows)};
}
export function developmentMetrics(start,end,rows) {
  const after=new Map(end.students.map(s=>[s.id,s])),pairs=start.students.filter(s=>after.has(s.id));
  if(!pairs.length) return null;
  const classroom=mean(['order','cooperation'].map(k=>development(start.classroom[k],end.classroom[k])));
  const students=mean(pairs.map(s=>mean(['belonging','safety'].map(k=>development(s[k],after.get(s.id)[k])))));
  const outcomes=outcomeScore(rows.filter(r=>r.kind==='student'));
  return {score:weightedMean([classroom,students,outcomes],[4,3,3]),classroom,students,outcomes,comparedStudents:pairs.length};
}
export function growthMetric(start,end) {return mean(ABILITY_NAMES.map(n=>development(start.abilities[n],end.abilities[n])));}
export function stateMetric(snapshot) {return mean(STATE_NAMES.map(n=>snapshot.states[n]));}
function comparison(start,end) {
  return {abilities:Object.fromEntries(ABILITY_NAMES.map(n=>[n,end.abilities[n]-start.abilities[n]])),states:Object.fromEntries(STATE_NAMES.map(n=>[n,end.states[n]-start.states[n]]))};
}
export function rateAnnual(summaryRef,source) {
  const reader=sourceReader(source),year=loadYear(reader,summaryRef);
  if(!year||reader.missing.length)return insufficient(reader.missing);
  const {summary,start,end,completion,rows}=year;
  if(completion.outcome!=='success')return {status:'not-successful',score:null,grade:null,comparison:comparison(start,end)};
  const missing=['handling','student','relationship'].filter(kind=>!rows.some(r=>r.kind===kind)).map(kind=>({id:summary.id,reason:`missing-${kind}-outcomes`}));
  if(missing.length)return insufficient(missing);
  const students=developmentMetrics(start,end,rows);
  if(!students)return insufficient([{id:summary.id,reason:'no-comparable-students'}]);
  const metrics={handling:outcomeScore(rows.filter(r=>r.kind==='handling')),students:students.score,relationships:outcomeScore(rows.filter(r=>r.kind==='relationship')),states:stateMetric(end),growth:growthMetric(start,end)};
  return scoredResult(reader.provenance,ANNUAL_LIMITS,metrics,{year:summary.year,attemptId:summary.attemptId,evidenceIds:rows.filter(r=>['handling','student','relationship'].includes(r.kind)).map(r=>r.id),students,comparison:comparison(start,end)});
}
