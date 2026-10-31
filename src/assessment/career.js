import { assertShape } from '../player/panel.js';
import { weightedMean } from '../numeric/math.js';
import { sourceReader, idList, insufficient, uniqueOutcomes } from './evidence.js';
import { loadYear, developmentMetrics, growthMetric, stateMetric } from './annual.js';
import { CAREER_LIMITS, outcomeScore, scoredResult } from './grading.js';

export function rateCareer(input,source) {
  assertShape(input,['yearRefs','cohortRefs']);
  const {yearRefs,cohortRefs}=input;
  const reader=sourceReader(source),years=idList(yearRefs,{empty:true}).map(ref=>loadYear(reader,ref)).filter(Boolean).sort((a,b)=>a.summary.year-b.summary.year);
  const cohorts=idList(cohortRefs,{empty:true}).map(ref=>reader.read(ref,'cohort')).filter(Boolean).sort((a,b)=>a.years[0]-b.years[0]);
  if(reader.missing.length)return insufficient(reader.missing);
  if(years.length!==30||cohorts.length!==10)return insufficient([{id:'career',reason:'requires-30-years-and-10-cohorts'}]);
  const first=years[0].summary;
  const completionIds=new Set(),snapshotOwners=new Map();
  for(let i=0;i<30;i++) {
    const y=years[i],s=y.summary;
    if(s.year!==i+1||s.playerId!==first.playerId||s.schoolId!==first.schoolId||completionIds.has(s.completionRef)) throw new RangeError('Invalid career year/identity/completion');
    completionIds.add(s.completionRef);
    for(const snapshot of [y.start,y.end]) {
      if(snapshotOwners.has(snapshot.id)&&snapshotOwners.get(snapshot.id)!==s.year) throw new RangeError('Snapshot reused across years');
      snapshotOwners.set(snapshot.id,s.year);
    }
    if(y.completion.outcome!=='success')return {status:'not-successful',score:null,grade:null,year:s.year};
  }
  const allStudents=new Set(),cohortMetrics=[];
  const rows=uniqueOutcomes(years.flatMap(y=>y.rows));
  const required=['handling','student','relationship','quality','continuity','contribution'];
  const missing=required.filter(k=>!rows.some(r=>r.kind===k&&(k!=='handling'||r.significant))).map(k=>({id:'career',reason:`missing-${k}-outcomes`}));
  if(missing.length)return insufficient(missing);
  for(let i=0;i<10;i++) {
    const cohort=cohorts[i],expected=[i*3+1,i*3+2,i*3+3];
    if(cohort.playerId!==first.playerId||cohort.schoolId!==first.schoolId||cohort.years.some((y,j)=>y!==expected[j]))throw new RangeError('Invalid three-year cohort');
    const members=new Set(cohort.studentIds);
    for(const id of members) {if(allStudents.has(id))throw new RangeError('Core student reused across cohorts');allStudents.add(id);}
    const ownYears=years.slice(i*3,i*3+3);
    if(ownYears.some(y=>y.summary.cohortId!==cohort.id||y.start.students.concat(y.end.students).some(s=>!members.has(s.id))))throw new RangeError('Cohort enrollment/summary mismatch');
    const ownRows=rows.filter(r=>r.cohortId===cohort.id&&r.kind==='student');
    if(!ownRows.length)return insufficient([{id:cohort.id,reason:'missing-student-outcomes'}]);
    const metrics=developmentMetrics(ownYears[0].start,ownYears[2].end,ownRows);
    if(!metrics)return insufficient([{id:cohort.id,reason:'no-comparable-students'}]);
    cohortMetrics.push({id:cohort.id,importance:cohort.importance,...metrics});
  }
  const select=kind=>rows.filter(r=>r.kind===kind);
  const continuity=outcomeScore(select('continuity')),contribution=outcomeScore(select('contribution'));
  const metrics={handling:outcomeScore(select('handling').filter(r=>r.significant)),cohorts:weightedMean(cohortMetrics.map(c=>c.score),cohortMetrics.map(c=>c.importance)),relationships:outcomeScore(select('relationship')),growth:growthMetric(years[0].start,years[29].end),quality:weightedMean([stateMetric(years[29].end),outcomeScore(select('quality'))],[1,1]),contribution:weightedMean([continuity,contribution],[2,3])};
  return scoredResult(reader.provenance,CAREER_LIMITS,metrics,{years:30,cohorts:cohortMetrics,evidenceIds:rows.map(r=>r.id),continuity,contribution});
}
