/** Offline H1 projection. Dates are school-world assumptions, never official admissions dates. */
import { weekday,datesBetween,requireCalendar as need } from './civil.js';
export const SENIOR_CALENDAR_VERSION='tw-school-2026-2065-senior-h1-v1';
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
 return {version:SENIOR_CALENDAR_VERSION,baseVersion:base.version,provenance:'Deterministic school mock windows: summer, Sep/Oct/Dec; Mar/May. Not official exam or admission dates.',nodes};
}
