/** record-v1: read-only, fail-closed qualifications over existing journal projections.
 * No grades, admissions results, publications, RNG or saved state are changed here.
 */
import {assertShape} from '../player/panel.js';
import {creditIdentity} from '../academics/rules.js';
import {isSeniorTerm} from '../academics/policy.js';
import {calendarDay} from '../calendar/calendar.js';
import {addDays} from '../calendar/civil.js';
export const ACADEMIC_RECORD_QUERIES=Object.freeze(['required-credit-deficit','credit-deficit','makeup-failed','makeup-one-point-short','makeup-due-today','makeup-due-tomorrow','remedial-credit-yesterday']);
export const ENTRANCE_RECORD_QUERIES=Object.freeze(['stars-admitted','application-screened','application-mixed-offers','application-all-rejected','application-interview-rejected']);
export function validateRecordCondition(c,queries){
 assertShape(c,['kind','query','subject']);
 if(c.kind!=='record-v1'||!queries.includes(c.query)||!['participant','caregiver-student'].includes(c.subject))throw new RangeError('RECORD_QUALIFICATION: unknown version/query/subject');
}
/** Never pick an arbitrary child or match a caregiver's ID to an entrance profile. */
export function qualificationStudent(w,personId,subject){
 const n=w?.numeric?.evolution?.world;
 if(!n)return null;
 if(subject==='participant')return n.people[personId]?.kind==='student'?personId:null;
 if(subject!=='caregiver-student'||n.people[personId]?.kind!=='caregiver')return null;
 const ids=[...new Set(n.careLinks.filter(l=>l.caregiverId===personId&&n.people[l.studentId]?.kind==='student'&&n.registry.enrollments.some(e=>e.personId===l.studentId&&e.classId===n.registry.homeClassId&&e.until===null&&e.from<=w.position.date)).map(l=>l.studentId))];
 return ids.length===1?ids[0]:null;
}
const occurred=(date,today)=>typeof date==='string'&&date<=today;
/** Preserve course identity and use the best earned record, including recognized credits. */
function coursesFor(s,id,date){
 const records=Object.values(s.terms).filter(t=>t.closed&&occurred(t.closedAt,date)&&(!isSeniorTerm(t)||occurred(t.publishedAt,date))).flatMap(t=>(t.results?.find(r=>r.id===id)?.courses??[]).map(c=>({c,level:t.grade,half:t.termId.endsWith('spring')?'spring':'autumn',term:t})));
 for(const c of [...(s.recognized??[]),...(s.supplements??[])])if(c.personId===id&&c.completed&&occurred(c.date,date))records.push({c,level:c.level,half:c.half,term:null});
 const unique=new Map();
 for(const r of records){const key=creditIdentity({...r.c,level:r.level,half:r.half}),old=unique.get(key);if(!old||r.c.earned>old.c.earned)unique.set(key,r);}
 return [...unique.values()];
}
export function academicRecordEligible(w,personId,condition,s){
 validateRecordCondition(condition,ACADEMIC_RECORD_QUERIES);
 const id=qualificationStudent(w,personId,condition.subject),date=w.position.date;
 if(s.version!==2||!id||!s.students[id])return false;
 const records=coursesFor(s,id,date),deficit=records.filter(({c})=>c.completed!==false&&c.earned===0);
 if(condition.query==='required-credit-deficit')return deficit.some(({c})=>c.required===true);
 if(condition.query==='credit-deficit')return deficit.length>0;
 if(condition.query==='remedial-credit-yesterday')return records.some(({c})=>c.completed!==false&&c.earned>0&&['makeup','retake'].includes(c.method)&&c[c.method]?.date===addDays(date,-1));
 if(['makeup-failed','makeup-one-point-short'].includes(condition.query))return deficit.some(({c})=>occurred(c.makeup?.date,date)&&Number.isFinite(c.thresholds?.pass)&&c.makeup.mark<c.thresholds.pass&&(condition.query==='makeup-failed'||c.thresholds.pass-c.makeup.mark===1));
 const target=addDays(date,condition.query==='makeup-due-tomorrow'?1:0);
 return records.some(({c,term,level})=>{
  if(!term||c.earned!==0||!c.makeupEligible||c.makeup||c.makeupExpired||c.makeupDue!==target||target>addDays(term.closedAt,30))return false;
  const day=calendarDay(target,level,w.extensions['teacher-hell/world'].plan.calendarVersion);
  if(day.kind!=='school'||day.holiday.length||day.activities.length||day.exam)return false;
  if(isSeniorTerm(term)&&target>term.assessmentWindow.makeupUntil)return false;
  return true;
 });
}
export function entranceRecordEligible(s,personId,condition,w){
 validateRecordCondition(condition,ENTRANCE_RECORD_QUERIES);
 const id=qualificationStudent(w,personId,condition.subject),p=s.entrance?.students[id],date=w?.position.date;
 if(!id||!p)return false;
 const completed=node=>s.entrance.completed.some(n=>n.id===node&&occurred(n.date,date));
 const offers=(p.offers??[]).filter(o=>occurred(o.publishedAt,date));
 if(condition.query==='stars-admitted')return p.stars?.status==='admitted'&&offers.some(o=>['stars','stars8'].includes(o.route)&&o.programmeId===p.stars.programmeId&&o.publishedStatus==='regular'&&['regular','confirmed'].includes(o.status));
 if(condition.query==='application-screened')return completed('application-screen')&&(p.applications??[]).some(a=>a.status==='screened'&&occurred(a.screenedAt,date));
 if(!completed('application-result'))return false;
 const apps=(p.applications??[]).filter(a=>['application','technical'].includes(a.route));
 const published=a=>occurred(a.publishedAt,date)&&occurred(a.reviewedAt,date);
 if(condition.query==='application-mixed-offers'){
  const results=apps.filter(published).map(a=>offers.find(o=>o.programmeId===a.programmeId&&o.route===a.route&&o.publishedStatus===a.status&&o.status===a.status));
  return results.some(o=>o?.status==='regular')&&results.some(o=>o?.status==='waitlist')&&new Set(results.filter(Boolean).map(o=>o.programmeId)).size>=2;
 }
 const rejected=a=>a.status==='rejected'&&(published(a)||occurred(a.screenedAt,date)&&!a.reviewedAt);
 // Both stories say the student's application failed, not merely one preference.
 return apps.length>0&&apps.every(rejected)&&(condition.query!=='application-interview-rejected'||apps.some(a=>published(a)&&a.status==='rejected'));
}
