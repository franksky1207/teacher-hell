/** Versioned game-world academic assumptions. These are not published future laws. */
import { assessmentPolicy } from './policy.js';
import { assertShape } from '../player/panel.js';
export const need=(ok,message)=>{if(!ok)throw new RangeError(`ACADEMICS: ${message}`);};
export const score=n=>Math.round(Math.max(0,Math.min(100,n))*10)/10;
export function semesterScore(ordinary,exams,version=2,policyId=null){
 const policy=assessmentPolicy(policyId);
 need([1,2].includes(version)&&exams.length===policy.rounds.length-1&&[ordinary,...exams].every(n=>Number.isFinite(n)&&n>=0&&n<=100),'four bounded marks required');
 // School marks are registered to one decimal. Integer tenths avoid a binary
 // 49.49999999999999 accidentally failing the statutory half-up boundary.
 if((version===2||policyId!==null)&&[ordinary,...exams].every(n=>Math.abs(n*10-Math.round(n*10))<1e-9))return Math.round((Math.round(ordinary*10)*4+exams.reduce((n,x,i)=>n+Math.round(x*10)*policy.weights[i+1],0))/100);
 if(policyId===null)return Math.round(ordinary*.4+exams.reduce((a,b)=>a+b,0)*.2);
 return Math.round(ordinary*.4+exams.reduce((n,x,i)=>n+x*policy.weights[i+1]/10,0));
}
export function rulesFor(year,version=2){need(Number.isInteger(year)&&year>=2026&&year<=2065,'unsupported rule year');need([1,2].includes(version),'unsupported academic version');if(version===2)return {id:'tw-108-111-assessment-2025+school-a1-v2',version:2,from:2026,until:2065,provenance:'current-law-frozen-game-policy',source:'https://edu.law.moe.gov.tw/LawContent.aspx?id=GL001247',pass:60,makeup:40,graduationCredits:150,requiredMin:102,electiveMin:40,studyCredits:182,certificateCredits:120,repeatRatio:.5};return {id:year===2026?'tw-assessment-2025-12-18+school-v1':year<2030?'school-assumption-2027-v1':'school-assumption-2030-v1',from:year===2026?2026:year<2030?2027:2030,until:year===2026?2026:year<2030?2029:2065,provenance:year===2026?'current-assessment-law+school-curriculum-assumption':'game-world-assumption',source:'https://edu.law.moe.gov.tw/LawContent.aspx?id=GL001247',pass:60,makeup:40,graduationCredits:year<2030?150:152,requiredRatio:1,electiveMin:40,repeatRatio:.5};}
export function standard(rule,status,grade){
 if(status&&typeof status==='object'){assertShape(status,['kind','pass','makeup']);need(status.kind==='individual-plan'&&Number.isFinite(status.pass)&&status.pass>0&&status.pass<=100&&Number.isFinite(status.makeup)&&status.makeup>=0&&status.makeup<status.pass,'verified individual assessment standard');return {pass:status.pass,makeup:status.makeup};}
 need(['general','special','skill','athlete'].includes(status)&&[1,2,3].includes(grade),'standard identity/grade; individualized standards require a verified plan');
 const pass=status==='general'?rule.pass:status==='special'?[40,50,60][grade-1]:status==='skill'?[50,50,60][grade-1]:[40,40,50][grade-1];
 return {pass,makeup:pass>=50?40:30};
}
function legacyCurriculum(grade,track='undecided',offered=null,teaching=null){
 need([1,2,3].includes(grade)&&['undecided','humanities','science','vocational'].includes(track),'curriculum grade/track');
 let names=grade===1?['國文','英文','數學','地理','歷史','物理','化學','公民','生物','地球科學']:grade===2?['國文','英文',track==='science'?'數學A':'數學B',...(track==='science'?['物理','化學','生物']:['地理','歷史','公民'])]:['國文','英文',track==='science'?'數學A':'數學B',...(track==='science'?['物理','化學']:track==='vocational'?['專題選修']:['歷史','公民'])];
 names.push('體育','藝術','生活科技','校訂選修','選修探索');
 let teachingSubject=teaching?.subject;if(teachingSubject==='數學'&&grade>1)teachingSubject=track==='science'?'數學A':'數學B';
 if(teachingSubject){need(Number.isInteger(teaching.periods)&&teaching.periods>0,'teaching credit load');need(!offered||offered.includes(teachingSubject),'school offering conflicts with mandatory homeroom teaching');if(!names.includes(teachingSubject))names.push(teachingSubject);}
 if(offered)names=names.filter(n=>offered.includes(n));need(names.length>=3,'school must offer core curriculum');
 const courses=names.map(subject=>({subject,credits:subject===teachingSubject?teaching.periods:subject==='選修探索'?0:['國文','英文','數學','數學A','數學B'].includes(subject)?4:2,required:!['專題選修','校訂選修','選修探索'].includes(subject)}));
 const elective=courses.find(c=>c.subject==='選修探索'),other=courses.reduce((n,c)=>n+c.credits,0);need(other<38,'academic course load exceeds the school timetable');if(elective)elective.credits=38-other;return courses;
}
// 111-year revised general-high curriculum: national compulsory 120,
// school compulsory 6, electives 56. The exact term allocation is this school's
// plan, not a national mandate. Teacher contact hours are not a credit filler.
const REQUIRED=Object.freeze({
 國文:[4,4,4,4,2,2],英文:[4,4,4,4,1,1],數學:[4,4,4,4,0,0],
 地理:[2,2,1,1,0,0],歷史:[2,2,1,1,0,0],公民:[2,2,1,1,0,0],
 物理:[2,0,0,0,0,0],化學:[0,2,0,0,0,0],生物:[1,0,1,0,0,0],地球科學:[0,1,0,1,0,0],探究與實作:[0,0,2,2,0,0],
 體育:[2,2,2,2,2,2],音樂:[2,0,2,0,0,0],美術:[0,2,0,2,0,0],藝術生活:[0,0,0,0,1,1],
 生命教育:[1,0,0,0,0,0],生涯規劃:[0,1,0,0,0,0],家政:[0,0,1,1,0,0],
 生活科技:[1,1,0,0,0,0],資訊科技:[0,0,1,1,0,0],健康與護理:[0,0,1,1,0,0],
 全民國防教育:[0,0,0,0,1,1],本土語文:[1,1,0,0,0,0],校訂必修:[1,1,1,1,1,1],
});
export const subjectFamily=subject=>({探究與實作:'生活科技',數學A:'數學',數學B:'數學',國文選修:'國文',英文選修:'英文',音樂:'藝術',美術:'藝術',藝術生活:'藝術',校訂必修:'校訂選修',資訊科技:'生活科技',家政:'生活科技',生命教育:'公民',生涯規劃:'公民',全民國防教育:'公民',健康與護理:'體育',本土語文:'國文'})[subject]??(subject.endsWith('選修')?subject.slice(0,-2):subject);
export const academicSubjects=()=>[...new Set([...Object.keys(REQUIRED),...Object.keys(REQUIRED).map(s=>s+'選修'),'數學A','數學B','國文選修','英文選修','選修探索','專題選修','藝術','校訂選修'])];
export function curriculum(grade,track='undecided',offered=null,teaching=null,version=2,half='autumn'){
 if(version===1)return legacyCurriculum(grade,track,offered,teaching);
 need(version===2&&[1,2,3].includes(grade)&&['undecided','humanities','science','vocational'].includes(track)&&['autumn','spring'].includes(half),'curriculum identity');
 const index=(grade-1)*2+(half==='spring'?1:0),math=track==='science'?'數學A':'數學B';
 const courses=Object.entries(REQUIRED).filter(([,loads])=>loads[index]>0).map(([name,loads])=>({subject:name==='數學'&&grade>1?math:name,credits:loads[index],required:true}));
 const elective=(subject,credits)=>courses.push({subject,credits,required:false});
 if(grade===1)elective('選修探索',2);
 else if(grade===2){elective(track==='science'?'物理':track==='vocational'?'生活科技':'歷史',2);elective('選修探索',2);}
 else{elective(math,4);elective('國文選修',4);elective('英文選修',4);for(const name of track==='science'?['物理','化學']:track==='vocational'?['生活科技','專題選修']:['歷史','公民'])elective(name,4);elective('選修探索',2);}
 // A subject already in the compulsory set uses an independently identified
 // elective course; it must never be overwritten/double-counted by subject key.
 for(const c of courses)if(!c.required&&courses.some(other=>other!==c&&other.subject===c.subject&&other.required))c.subject+='選修';
 let taught=teaching?.subject;if(taught==='數學'&&grade>1)taught=math;
 if(taught&&!courses.some(c=>c.subject===taught)){
  need(!offered||offered.includes(taught),'school offering conflicts with homeroom teaching');
  const donors=courses.filter(c=>!c.required).sort((a,b)=>(a.subject==='選修探索'?-1:0)-(b.subject==='選修探索'?-1:0));
  const credits=Math.min(teaching.periods,donors.reduce((n,c)=>n+c.credits,0));need(Number.isInteger(credits)&&credits>0,'elective teaching allocation');
  let remaining=credits;for(const donor of donors){const used=Math.min(remaining,donor.credits);donor.credits-=used;remaining-=used;if(!remaining)break;}elective(taught,credits);
 }
 const result=courses.filter(c=>c.credits>0&&(!offered||offered.includes(c.subject)));
 need(result.length>=3,'school must offer core curriculum');return result;
}
export const creditIdentity=r=>JSON.stringify([r.level,r.half,r.required&&['數學A','數學B'].includes(r.subject)?'數學':r.subject]);
export function creditResult(mark,course,rule,status,grade){const thresholds=standard(rule,status,grade);return {earned:mark>=thresholds.pass?course.credits:0,makeupEligible:mark>=thresholds.makeup&&mark<thresholds.pass,thresholds,method:mark>=thresholds.pass?'semester':'unearned'};}
/** Competition ranking: 1,1,3. Incomparable/missing course totals are excluded by caller. */
export function ranks(rows){need(new Set(rows.map(r=>r.id)).size===rows.length,'duplicate ranking identity');const ordered=[...rows].sort((a,b)=>(b.rankingMetric??b.weightedTotal??b.total)-(a.rankingMetric??a.weightedTotal??a.total)),byId=new Map();let rank=0,last=null;ordered.forEach((row,i)=>{const metric=row.rankingMetric??row.weightedTotal??row.total;if(metric!==last)rank=i+1;last=metric;byId.set(row.id,rank);});return rows.map(row=>({...row,rank:byId.get(row.id),population:rows.length}));}
export function graduation(records,rule,context={}){
 if(rule.version===2)return qualification(records,rule,context);
 const unique=new Map();for(const r of records){const k=JSON.stringify([r.level,r.half,r.subject]);const old=unique.get(k);if(!old||r.earned>old.earned)unique.set(k,r);}
 const rows=[...unique.values()],earned=rows.reduce((n,r)=>n+r.earned,0),required=rows.filter(r=>r.required),requiredEarned=required.reduce((n,r)=>n+r.earned,0),requiredOffered=required.reduce((n,r)=>n+r.credits,0),offered=rows.reduce((n,r)=>n+r.credits,0);
 const electiveEarned=rows.filter(r=>!r.required).reduce((n,r)=>n+r.earned,0);
 const complete=new Set(rows.map(r=>`${r.level}:${r.half}`)).size===6;
 return {earned,electiveEarned,requiredEarned,requiredOffered,complete,eligible:complete&&earned>=rule.graduationCredits&&requiredEarned>=requiredOffered*rule.requiredRatio&&electiveEarned>=rule.electiveMin,repeatEligible:offered>0&&earned<offered*rule.repeatRatio,extensionEligible:complete&&(earned<rule.graduationCredits||requiredEarned<requiredOffered*rule.requiredRatio||electiveEarned<rule.electiveMin)};
}
export function validateCourse(c){assertShape(c,['subject','credits','required']);need(typeof c.subject==='string'&&Number.isInteger(c.credits)&&c.credits>0&&typeof c.required==='boolean','course');}

function qualification(records,rule,{netMajorDemerits=0,studyPeriodComplete=true}={}){
 need(Number.isInteger(netMajorDemerits)&&netMajorDemerits>=0,'reviewed conduct record');
 const unique=new Map();for(const r of records){need([1,2,3].includes(r.level)&&['autumn','spring'].includes(r.half)&&Number.isInteger(r.credits)&&r.credits>0&&[0,r.credits].includes(r.earned)&&typeof r.required==='boolean','qualification credit record');if(r.completed===false)continue;const key=creditIdentity(r),old=unique.get(key);if(!old||r.earned>old.earned)unique.set(key,r);}
 const rows=[...unique.values()],sum=predicate=>rows.filter(predicate).reduce((n,r)=>n+r.earned,0),earned=sum(()=>true),requiredEarned=sum(r=>r.required),electiveEarned=sum(r=>!r.required),offered=rows.reduce((n,r)=>n+r.credits,0),requiredOffered=rows.filter(r=>r.required).reduce((n,r)=>n+r.credits,0);
 const missingRequired=[];for(const grade of [1,2,3])for(const half of ['autumn','spring'])for(const c of curriculum(grade,'undecided',null,null,2,half).filter(c=>c.required)){const record=unique.get(creditIdentity({...c,level:grade,half}));if(!record||record.credits<c.credits)missingRequired.push({level:grade,half,subject:c.subject,credits:c.credits-(record?.credits??0)});}
 const studied=predicate=>rows.filter(predicate).reduce((n,r)=>n+r.credits,0),studyLoads={chinese:studied(r=>r.subject.startsWith('國文')),foreignLanguage:studied(r=>r.subject.startsWith('英文')||r.subject.startsWith('第二外語')),practical:studied(r=>/探究|實作|探索|專題|校訂必修/.test(r.subject))};
 const sixTerms=new Set(rows.map(r=>`${r.level}:${r.half}`)).size===6,complete=sixTerms&&studyPeriodComplete&&offered>=rule.studyCredits&&missingRequired.length===0&&studyLoads.chinese>=24&&studyLoads.foreignLanguage>=24&&studyLoads.practical>=4;
 const reasons=[];if(!sixTerms||!studyPeriodComplete)reasons.push('study-period');if(offered<rule.studyCredits)reasons.push('required-study-load');if(missingRequired.length)reasons.push('unattended-compulsory');if(earned<rule.graduationCredits)reasons.push('total-credits');if(requiredEarned<rule.requiredMin)reasons.push('required-credits');if(electiveEarned<rule.electiveMin)reasons.push('elective-credits');if(netMajorDemerits>=3)reasons.push('conduct');if(studyLoads.chinese<24)reasons.push('chinese-study-load');if(studyLoads.foreignLanguage<24)reasons.push('foreign-language-study-load');if(studyLoads.practical<4)reasons.push('practical-study-load');
 const eligible=reasons.length===0,certificateEligible=complete&&earned>=rule.certificateCredits&&!eligible;
 return {version:2,ruleId:rule.id,earned,electiveEarned,requiredEarned,requiredOffered,offered,studyLoads,complete,eligible,certificateEligible,status:eligible?'graduation':certificateEligible?'completion-certificate':'incomplete',reasons,missingRequired,netMajorDemerits,repeatEligible:offered>0&&earned<offered*rule.repeatRatio,extensionEligible:sixTerms&&studyPeriodComplete&&reasons.some(r=>r!=='conduct')};
}
