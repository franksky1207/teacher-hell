/** Versioned school-world dates, NOT announced official future examination dates.
 * Personal examinations do not insert/remove teacher calendar slots. */
import { calendarDay,SENIOR_CALENDAR_VERSION,seniorCalendar } from './calendar.js';
import { addDays,freezeData } from './civil.js';
export const ADMISSIONS_POLICY='tw-senior-admissions-h3-v1';
const cache=new Map();
export function admissionCalendar(cohort,version){
 if(version!==SENIOR_CALENDAR_VERSION)return [];
 if(cache.has(cohort))return cache.get(cohort);
 const fall=cohort+2,spring=cohort+3;
 const free=date=>{for(let n=0;n<21;n++,date=addDays(date,1)){const d=calendarDay(date,3,version);if(d.kind==='school'&&!d.holiday.length&&!d.exam&&!d.activities.length)return date;}throw new Error('admissions calendar window exhausted');};
 const dates=[['special-register',`${fall}-10-16`],['special-result',`${fall}-12-08`],['special-confirm',`${fall}-12-15`],['gsat-register',`${fall}-11-09`],['listening-exam',`${fall}-10-21`],['listening-release',`${fall}-10-30`],['gsat-exam',`${spring}-01-29`],['skills-exam',`${spring}-02-02`],['gsat-release',`${spring}-02-26`],['stars-nominate',`${spring}-03-05`],['stars-screen',`${spring}-03-19`],['stars-second-round',`${spring}-03-20`],['application-register',`${spring}-03-26`],['application-screen',`${spring}-04-16`],['application-review',`${spring}-05-15`],['application-result',`${spring}-05-28`],['stars8-interview',`${spring}-05-21`],['stars8-result',`${spring}-06-04`],['application-allocation',`${spring}-06-11`],['application-confirm',`${spring}-06-13`],['subject-register',`${spring}-06-18`]];
 const nodes=dates.map(([id,date])=>({id,date:['gsat-exam','listening-exam','skills-exam'].includes(id)?date:free(date),kind:id,...(id==='gsat-exam'?{dates:[`${spring}-01-27`,`${spring}-01-28`,`${spring}-01-29`]}:{}),policy:ADMISSIONS_POLICY,provenance:'versioned-game-school-date; not official future announcement',countsTowardSemester:false}));
 for(const node of seniorCalendar.nodes.filter(n=>n.academicYear===fall&&n.kind.startsWith('mock-')))nodes.push({id:node.id,date:node.date,kind:node.kind,sequence:node.sequence,policy:ADMISSIONS_POLICY,provenance:node.provenance,countsTowardSemester:false});
 const result=freezeData(nodes.sort((a,b)=>a.date.localeCompare(b.date)||a.id.localeCompare(b.id)));cache.set(cohort,result);return result;
}
