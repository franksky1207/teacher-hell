/** Versioned game-world academic assumptions. These are not published future laws. */
import { assertShape } from '../player/panel.js';
export const need=(ok,message)=>{if(!ok)throw new RangeError(`ACADEMICS: ${message}`);};
export const score=n=>Math.round(Math.max(0,Math.min(100,n))*10)/10;
export function semesterScore(ordinary,exams){need(exams.length===3&&[ordinary,...exams].every(n=>Number.isFinite(n)&&n>=0&&n<=100),'four bounded marks required');return Math.round(ordinary*.4+exams.reduce((a,b)=>a+b,0)*.2);}
export function rulesFor(year){need(Number.isInteger(year)&&year>=2026&&year<=2065,'unsupported rule year');return {id:year===2026?'tw-assessment-2025-12-18+school-v1':year<2030?'school-assumption-2027-v1':'school-assumption-2030-v1',from:year===2026?2026:year<2030?2027:2030,until:year===2026?2026:year<2030?2029:2065,provenance:year===2026?'current-assessment-law+school-curriculum-assumption':'game-world-assumption',source:'https://edu.law.moe.gov.tw/LawContent.aspx?id=GL001247',pass:60,makeup:40,graduationCredits:year<2030?150:152,requiredRatio:1,electiveMin:40,repeatRatio:.5};}
export function standard(rule,status,grade){
 if(status&&typeof status==='object'){assertShape(status,['kind','pass','makeup']);need(status.kind==='individual-plan'&&Number.isFinite(status.pass)&&status.pass>0&&status.pass<=100&&Number.isFinite(status.makeup)&&status.makeup>=0&&status.makeup<status.pass,'verified individual assessment standard');return {pass:status.pass,makeup:status.makeup};}
 need(['general','special','skill','athlete'].includes(status)&&[1,2,3].includes(grade),'standard identity/grade; individualized standards require a verified plan');
 const pass=status==='general'?rule.pass:status==='special'?[40,50,60][grade-1]:status==='skill'?[50,50,60][grade-1]:[40,40,50][grade-1];
 return {pass,makeup:pass>=50?40:30};
}
export function curriculum(grade,track='undecided',offered=null,teaching=null){
 need([1,2,3].includes(grade)&&['undecided','humanities','science','vocational'].includes(track),'curriculum grade/track');
 let names=grade===1?['國文','英文','數學','地理','歷史','物理','化學','公民','生物','地球科學']:grade===2?['國文','英文',track==='science'?'數學A':'數學B',...(track==='science'?['物理','化學','生物']:['地理','歷史','公民'])]:['國文','英文',track==='science'?'數學A':'數學B',...(track==='science'?['物理','化學']:track==='vocational'?['專題選修']:['歷史','公民'])];
 names.push('體育','藝術','生活科技','校訂選修','選修探索');
 let teachingSubject=teaching?.subject;if(teachingSubject==='數學'&&grade>1)teachingSubject=track==='science'?'數學A':'數學B';
 if(teachingSubject){need(Number.isInteger(teaching.periods)&&teaching.periods>0,'teaching credit load');need(!offered||offered.includes(teachingSubject),'school offering conflicts with mandatory homeroom teaching');if(!names.includes(teachingSubject))names.push(teachingSubject);}
 if(offered)names=names.filter(n=>offered.includes(n));need(names.length>=3,'school must offer core curriculum');
 const courses=names.map(subject=>({subject,credits:subject===teachingSubject?teaching.periods:subject==='選修探索'?0:['國文','英文','數學','數學A','數學B'].includes(subject)?4:2,required:!['專題選修','校訂選修','選修探索'].includes(subject)}));
 const elective=courses.find(c=>c.subject==='選修探索'),other=courses.reduce((n,c)=>n+c.credits,0);need(other<38,'academic course load exceeds the school timetable');if(elective)elective.credits=38-other;return courses;
}
export function creditResult(mark,course,rule,status,grade){const thresholds=standard(rule,status,grade);return {earned:mark>=thresholds.pass?course.credits:0,makeupEligible:mark>=thresholds.makeup&&mark<thresholds.pass,thresholds,method:mark>=thresholds.pass?'semester':'unearned'};}
/** Competition ranking: 1,1,3. Incomparable/missing course totals are excluded by caller. */
export function ranks(rows){need(new Set(rows.map(r=>r.id)).size===rows.length,'duplicate ranking identity');const ordered=[...rows].sort((a,b)=>(b.rankingMetric??b.weightedTotal??b.total)-(a.rankingMetric??a.weightedTotal??a.total)),byId=new Map();let rank=0,last=null;ordered.forEach((row,i)=>{const metric=row.rankingMetric??row.weightedTotal??row.total;if(metric!==last)rank=i+1;last=metric;byId.set(row.id,rank);});return rows.map(row=>({...row,rank:byId.get(row.id),population:rows.length}));}
export function graduation(records,rule){
 const unique=new Map();for(const r of records){const k=JSON.stringify([r.level,r.half,r.subject]);const old=unique.get(k);if(!old||r.earned>old.earned)unique.set(k,r);}
 const rows=[...unique.values()],earned=rows.reduce((n,r)=>n+r.earned,0),required=rows.filter(r=>r.required),requiredEarned=required.reduce((n,r)=>n+r.earned,0),requiredOffered=required.reduce((n,r)=>n+r.credits,0),offered=rows.reduce((n,r)=>n+r.credits,0);
 const electiveEarned=rows.filter(r=>!r.required).reduce((n,r)=>n+r.earned,0);
 const complete=new Set(rows.map(r=>`${r.level}:${r.half}`)).size===6;
 return {earned,electiveEarned,requiredEarned,requiredOffered,complete,eligible:complete&&earned>=rule.graduationCredits&&requiredEarned>=requiredOffered*rule.requiredRatio&&electiveEarned>=rule.electiveMin,repeatEligible:offered>0&&earned<offered*rule.repeatRatio,extensionEligible:complete&&(earned<rule.graduationCredits||requiredEarned<requiredOffered*rule.requiredRatio||electiveEarned<rule.electiveMin)};
}
export function validateCourse(c){assertShape(c,['subject','credits','required']);need(typeof c.subject==='string'&&Number.isInteger(c.credits)&&c.credits>0&&typeof c.required==='boolean','course');}
