/** Offline H1 projection. Dates are school-world assumptions, never official admissions dates. */
import { weekday,datesBetween,requireCalendar as need } from './civil.js';
export const SENIOR_CALENDAR_VERSION='tw-school-2026-2065-senior-h1-v2';
export function compileSeniorCalendar(base){
 const holidays=new Map(base.holidays),nodes=[];
 for(const y of base.years){
  const autumn=base.years.flatMap(y=>y.terms).find(t=>t.id===`${y.year}:autumn`),spring=y.terms.find(t=>t.id===`${y.year}:spring`);
  const windows=[['gsat',1,y.summerCamp,y.summerCampEnd],...['09','10','12'].map((m,i)=>['gsat',i+2,`${y.year}-${m}-01`,`${y.year}-${m}-${m==='09'?30:31}`])];
  if(spring)for(const [i,m] of ['03','05'].entries())windows.push(['subject',i+1,`${y.year}-${m}-01`,`${y.year}-${m}-31`<spring.end?`${y.year}-${m}-31`:spring.end]);
  for(const [family,sequence,from,to] of windows){
   const term=family==='gsat'?autumn:spring;if(!term)continue;
   const start=from<term.start&&!(family==='gsat'&&sequence===1)?term.start:from;
   const date=datesBetween(start,to).find(d=>weekday(d)<=5&&!holidays.has(d)&&!term.exams.flat().includes(d)&&!y.activities.some(a=>a.date===d&&a.grades.includes(3))&&!nodes.some(n=>n.date===d));
   need(date,'SENIOR_COLLISION',`No legal mock window ${y.year} ${family} ${sequence}`);
   nodes.push({id:`mock:${family}:${y.year}:${sequence}`,kind:`mock-${family}`,date,grades:[3],slots:['all'],family,sequence,semesterId:term.id,academicYear:term.academicYear,countsTowardSemester:false,resultScope:family==='subject'?'eligible-route-students':'senior-students',eligibilityContract:family==='subject'?'h3-subject-route-v1':null,provenance:'school-world-h1-v1'});
  }
 }
 // The fixed 2026-cohort senior year uses four two-day mock exams.
 const cohortMocks=[
  ['2028-07-27','2028-07-28'],
  ['2028-09-06','2028-09-07'],
  ['2028-10-26','2028-10-27'],
  ['2028-12-13','2028-12-14']
 ];
 for(let i=0;i<cohortMocks.length;i++){
  const n=nodes.find(n=>n.id==='mock:gsat:2028:'+(i+1));
  need(n,'SENIOR_COLLISION','Missing 2028 GSAT mock '+(i+1));
  n.date=cohortMocks[i][0];n.dates=cohortMocks[i];
  for(const d of n.dates)need(weekday(d)<=5&&!new Map(base.holidays).has(d),'SENIOR_COLLISION','Illegal 2028 mock date '+d);
 }
 // A formal public exam is one protected multi-day node, never three mock attempts.
 nodes.push({id:'formal:gsat:2029',kind:'formal-gsat',date:'2029-01-20',dates:['2029-01-20','2029-01-21','2029-01-22'],grades:[3],slots:['all'],family:'gsat',sequence:0,semesterId:'2028:autumn',academicYear:2028,countsTowardSemester:false,resultScope:'eligible-senior-students',eligibilityContract:'h3-gsat-registration-v1',provenance:'school-world-cohort-2026-v1'});
 // Fixed school-world deadline windows. No actual university or department roster.
 const admissions=[
  ['gsat-score','2029-02-26','2029-02-26'],
  ['stars-rank','2029-03-02','2029-03-02'],
  ['stars-school-selection','2029-03-05','2029-03-09'],
  ['stars-registration','2029-03-14','2029-03-15'],
  ['stars-results','2029-03-21','2029-03-21'],
  ['application-registration','2029-03-22','2029-03-23'],
  ['application-first-stage-results','2029-03-30','2029-03-30'],
  ['application-document-upload','2029-04-26','2029-05-04'],
  ['application-interview-window','2029-05-14','2029-05-27'],
  ['application-second-stage-results','2029-05-31','2029-05-31'],
  ['application-preference-registration','2029-06-07','2029-06-08'],
  ['application-distribution-results','2029-06-12','2029-06-12'],
  ['application-waiver','2029-06-12','2029-06-14'],
  ['subject-registration','2029-06-05','2029-06-19']
 ].map(([kind,start,end])=>({id:'admission:'+kind+':2029',kind,start,end,grades:[3],provenance:'school-world-cohort-2026-v1'}));
 return {version:SENIOR_CALENDAR_VERSION,baseVersion:base.version,provenance:'Deterministic school-world exam and admission projections. Not official future schedules.',nodes,admissions};
}
