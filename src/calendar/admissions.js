/** Versioned school-world dates, NOT announced official future examination dates.
 * Personal examinations do not insert/remove teacher calendar slots. */
import { calendarDay,SENIOR_CALENDAR_VERSION,LEGACY_SENIOR_CALENDAR_VERSION,seniorCalendar } from './calendar.js';
import { LEGACY_SENIOR_CALENDAR } from './senior-fixed-v1.js';
import { addDays,freezeData } from './civil.js';
export const ADMISSIONS_POLICY='tw-senior-admissions-h3-v1';
const cache=new Map();
export function admissionCalendar(cohort,version){
 if(![SENIOR_CALENDAR_VERSION,LEGACY_SENIOR_CALENDAR_VERSION].includes(version))return [];
 const cacheKey=version+':'+cohort;if(cache.has(cacheKey))return cache.get(cacheKey);
 const fall=cohort+2,spring=cohort+3;
 const free=date=>{for(let n=0;n<21;n++,date=addDays(date,1)){const d=calendarDay(date,3,version);if(d.kind==='school'&&!d.holiday.length&&!d.exam&&!d.activities.length)return date;}throw new Error('admissions calendar window exhausted');};
 const dates=[['special-register',`${fall}-10-16`],['special-result',`${fall}-12-08`],['special-confirm',`${fall}-12-15`],['gsat-register',`${fall}-11-09`],['listening-exam',`${fall}-10-21`],['listening-release',`${fall}-10-30`],['gsat-exam',`${spring}-01-29`],['skills-exam',`${spring}-02-02`],['gsat-release',`${spring}-02-26`],['stars-nominate',`${spring}-03-05`],['stars-screen',`${spring}-03-19`],['stars-second-round',`${spring}-03-20`],['application-register',`${spring}-03-26`],['application-screen',`${spring}-04-16`],['application-review',`${spring}-05-15`],['application-result',`${spring}-05-28`],['stars8-interview',`${spring}-05-21`],['stars8-result',`${spring}-06-04`],['application-allocation',`${spring}-06-11`],['application-confirm',`${spring}-06-13`],['subject-register',`${spring}-06-18`]];
 const game2029=cohort===2026&&version===SENIOR_CALENDAR_VERSION;
 // Commitments and public outcomes are fixed to the game-world 2029 cohort calendar.
 // A node occurs on the closing/result date, while windows retain their start/end dates.
 const cohort2029={
  'special-register':'2028-10-16','special-result':'2028-12-07','special-confirm':'2028-12-15',
  'gsat-register':'2028-11-09','listening-exam':'2028-10-21','listening-release':'2028-10-31',
  'gsat-exam':'2029-01-22','skills-exam':'2029-02-02','gsat-release':'2029-02-26',
  'stars-nominate':'2029-03-09','stars-screen':'2029-03-21','stars-second-round':'2029-03-22',
  'application-register':'2029-03-23','application-screen':'2029-03-30',
  'application-review':'2029-05-28','application-result':'2029-05-31',
  'stars8-interview':'2029-05-20','stars8-result':'2029-06-04',
  'application-allocation':'2029-06-12','application-confirm':'2029-06-14',
  'subject-register':'2029-06-19'
 };
 const cohortWindows={
  'stars-nominate':['2029-03-05','2029-03-09'],
  'application-register':['2029-03-22','2029-03-23'],
  'application-review':['2029-04-26','2029-05-28'],
  'subject-register':['2029-06-05','2029-06-19']
 };
 const nodes=dates.map(([id,date])=>{
  const actualDate=game2029?cohort2029[id]:(['gsat-exam','listening-exam','skills-exam'].includes(id)?date:free(date));
  if(!actualDate)throw Error('Unmapped 2029 admissions milestone '+id);
  const examDates=game2029?['2029-01-20','2029-01-21','2029-01-22']:[`${spring}-01-27`,`${spring}-01-28`,`${spring}-01-29`];
  return {id,date:actualDate,kind:id,...(id==='gsat-exam'?{dates:examDates}:{}),...(game2029&&cohortWindows[id]?{window:cohortWindows[id]}:{}),policy:ADMISSIONS_POLICY,provenance:'versioned-game-school-date; not official future announcement',countsTowardSemester:false};
 });
 for(const node of (version===LEGACY_SENIOR_CALENDAR_VERSION?LEGACY_SENIOR_CALENDAR:seniorCalendar).nodes.filter(n=>n.academicYear===fall&&n.kind.startsWith('mock-')))nodes.push({id:node.id,date:node.dates?.at(-1)??node.date,kind:node.kind,sequence:node.sequence,policy:ADMISSIONS_POLICY,provenance:node.provenance,countsTowardSemester:false});
 const result=freezeData(nodes.sort((a,b)=>a.date.localeCompare(b.date)||a.id.localeCompare(b.id)));cache.set(cacheKey,result);return result;
}
