/** Versioned school-world dates, NOT announced official future examination dates.
 * Personal examinations do not insert/remove teacher calendar slots. */
import { SENIOR_CALENDAR_VERSION,seniorCalendar } from './calendar.js';
import { freezeData } from './civil.js';
export const ADMISSIONS_POLICY='tw-senior-admissions-h3-v1';
const cache=new Map();
export function admissionCalendar(cohort,version){
 if(version!==SENIOR_CALENDAR_VERSION||cohort!==2026)return [];
 const cacheKey=version+':'+cohort;if(cache.has(cacheKey))return cache.get(cacheKey);
 const dates=[['special-register','2028-10-16'],['special-result','2028-12-08'],['special-confirm','2028-12-15'],['gsat-register','2028-11-09'],['listening-exam','2028-10-21'],['listening-exam-second','2028-12-16'],['listening-release','2028-10-30'],['gsat-exam','2029-01-22'],['skills-exam','2029-02-02'],['gsat-release','2029-02-26'],['stars-nominate','2029-03-05'],['stars-screen','2029-03-19'],['stars-second-round','2029-03-22'],['application-register','2029-03-23'],['application-screen','2029-03-30'],['application-review','2029-05-28'],['application-result','2029-05-31'],['stars8-interview','2029-05-20'],['stars8-result','2029-06-04'],['application-allocation','2029-06-12'],['application-confirm','2029-06-14'],['subject-register','2029-06-19']];

 // Commitments and public outcomes are fixed to the game-world 2029 cohort calendar.
 // A node occurs on the closing/result date, while windows retain their start/end dates.
 // The fixed 2029 admissions calendar is authoritative; H3 milestone aliases are projections of its windows.
 const fixedAdmissionWindows=new Map(seniorCalendar.admissions.map(node=>[node.kind,[node.start,node.end]]));
 const milestoneToAdmission={
  'gsat-release':'gsat-score','stars-nominate':'stars-school-selection','stars-screen':'stars-results',
  'application-register':'application-registration','application-screen':'application-first-stage-results',
  'application-result':'application-second-stage-results','application-allocation':'application-distribution-results',
  'application-confirm':'application-waiver','subject-register':'subject-registration'
 };
 const cohort2029={
  'special-register':'2028-10-16','special-result':'2028-12-07','special-confirm':'2028-12-15',
  'gsat-register':'2028-11-09','listening-exam':'2028-10-21','listening-exam-second':'2028-12-16',
  'listening-release':'2028-10-31','gsat-exam':'2029-01-22','skills-exam':'2029-02-02',
  'stars-second-round':'2029-03-22','application-review':'2029-05-28',
  'stars8-interview':'2029-05-20','stars8-result':'2029-06-04'
 };
 for(const [milestone,kind] of Object.entries(milestoneToAdmission)){
  const window=fixedAdmissionWindows.get(kind);
  if(!window)throw Error('Missing authoritative admission window '+kind);
  cohort2029[milestone]=window[1];
 }
 const cohortWindows={
  'stars-nominate':fixedAdmissionWindows.get('stars-school-selection'),
  'application-register':fixedAdmissionWindows.get('application-registration'),
  'application-review':[fixedAdmissionWindows.get('application-document-upload')[0],fixedAdmissionWindows.get('application-interview-window')[1]],
  'subject-register':fixedAdmissionWindows.get('subject-registration')
 };
 const nodes=dates.map(([id,date])=>{
  const actualDate=cohort2029[id];
  if(!actualDate)throw Error('Unmapped 2029 admissions milestone '+id);
  const examDates=['2029-01-20','2029-01-21','2029-01-22'];
  return {id,date:actualDate,kind:id,...(id==='gsat-exam'?{dates:examDates}:{}),...((cohortWindows[id]||fixedAdmissionWindows.get(milestoneToAdmission[id]))?{window:cohortWindows[id]||fixedAdmissionWindows.get(milestoneToAdmission[id])}:{}),policy:ADMISSIONS_POLICY,provenance:'versioned-game-school-date; not official future announcement',countsTowardSemester:false};
 });
 for(const node of seniorCalendar.nodes.filter(n=>n.academicYear===2028&&n.kind.startsWith('mock-')))nodes.push({id:node.id,date:node.dates?.at(-1)??node.date,kind:node.kind,sequence:node.sequence,policy:ADMISSIONS_POLICY,provenance:node.provenance,countsTowardSemester:false});
 const result=freezeData(nodes.sort((a,b)=>a.date.localeCompare(b.date)||a.id.localeCompare(b.id)));cache.set(cacheKey,result);return result;
}
