import { SUBJECT_LOAD } from '../calendar/timetable.js';
/** Academic adapter: journal is the sole authority; reads rebuild detached projections. */
import { assertShape } from '../player/panel.js';
import { restoreRandom } from '../numeric/random.js';
import { canonicalData } from '../changes/settlement.js';
import { semester,teachingTerm,latestPreparedSemester,calendarDay,gradeAt } from '../calendar/calendar.js';
import { need,score,rulesFor,standard,graduation,creditIdentity,curriculum } from '../academics/rules.js';
import { emptyAcademics,openTerm,assess,closeTerm,ranking,academicMark,createLearner } from '../academics/learning.js';
const runtime=w=>w.extensions['teacher-hell/world'];
const equal=(a,b)=>canonicalData(a)===canonicalData(b);
export const academicVersion=w=>runtime(w).history.find(h=>h.type==='academic')?.data.version??runtime(w).history.findLast(h=>h.type==='retry')?.data.academicPolicy??2;
const versionOf=s=>s.version??1;
const addDays=(date,n)=>new Date(Date.parse(date+'T00:00:00Z')+n*86400000).toISOString().slice(0,10);
const annualAverage=(autumn,spring,pass,version)=>{const registered=c=>c.makeup?.registered??(c.makeup?c.makeup.mark>=pass?pass:Math.round(c.makeup.mark):0);return score((Math.max(version===2?autumn.originalMark??autumn.mark:autumn.mark,registered(autumn))+Math.max(version===2?spring.originalMark??spring.mark:spring.mark,registered(spring)))/2);};
const supplementTermId=c=>`${c.year+(c.half==='spring'?1:0)}:${c.half}`;
const reviewedCourses=s=>s.version===2?[...(s.supplements??[]).filter(c=>c.completed),...(s.recognized??[])]:[];
function termForInput(s,input){
 if(s.terms[input.termId])return s.terms[input.termId];
 if(!['retake-plan','retake'].includes(input.action))return undefined;
 const courses=reviewedCourses(s).filter(c=>c.personId===input.personId&&supplementTermId(c)===input.termId);
 return courses.length?{termId:input.termId,year:courses[0].year,grade:courses[0].level,closed:true,closedAt:courses[0].date,results:[{id:input.personId,courses}]}:undefined;
}
// Only an exclusive, unpublished ordered-command draft may follow its journal.
// Import validation still independently replays every academic row below.
const projections=new WeakMap();
export function withAcademicProjection(w,work){
 need(!projections.has(w),'academic projection already owned');projections.set(w,{state:emptyAcademics(academicVersion(w)),cursor:0});
 try{return work();}finally{projections.delete(w);}
}
export function academicState(w){
 const owned=projections.get(w),s=owned?.state??emptyAcademics(academicVersion(w)),history=runtime(w).history;
 for(let i=owned?.cursor??0;i<history.length;i++){const h=history[i];if(h.type==='academic')applyAcademic(s,structuredClone(h.data.input),restoreRandom(h.data.randomBefore),h.data.version);}
 if(owned){owned.cursor=history.length;return structuredClone(s);}return s;
}
function termAt(w){return teachingTerm(w.position.date)??latestPreparedSemester(w.position.date);}
export function academicInput(w,op){
 const r=runtime(w),registry=w.numeric.evolution.world.registry;need(registry,'formal school identities required');
 assertShape(op,['type','action',...['termId','round','personId','subject','basisFactId','delta','status','node','track','aspiration','offered','classSizes','attendance','records','course','netMajorDemerits'].filter(k=>Object.hasOwn(op,k))]);
 const action=op.action;need(['support','supplement-plan','supplement','conduct','recognize','attendance','retake-plan','publish','sync','open','assess','close','influence','makeup','retake','annual-credit','direction','admission','standard','participation','size'].includes(action),'unknown academic operation');
 const state=academicState(w),termId=op.termId??termAt(w).id,t=termForInput(state,{...op,termId}),meta=semester(termId);
 const input={action,date:w.position.date,termId,...Object.fromEntries(Object.entries(op).filter(([k])=>!['type','action','termId'].includes(k)))};
 if(action==='open'||action==='sync'){
  need(termAt(w).id===termId,'cannot open another semester');
  const tracked=new Set(t?.rows.map(row=>row.id)??[]),home=registry.classes[registry.homeClassId];
  const roster=registry.enrollments.filter(e=>e.until===null&&(e.classId===registry.homeClassId||action==='sync'&&tracked.has(e.personId)&&registry.classes[e.classId].cohortStart===home.cohortStart));
  if(action==='sync')input.lightWithdrawals=roster.filter(e=>!tracked.has(e.personId)).flatMap(e=>{const previous=registry.enrollments.filter(old=>old.personId===e.personId&&old.id!==e.id&&old.until!==null).at(-1);return previous&&previous.classId!==registry.homeClassId&&registry.classes[previous.classId].cohortStart===home.cohortStart?[{personId:e.personId,classId:previous.classId}]:[];});
  const grade=registry.academicYear-registry.classes[registry.homeClassId].cohortStart+1;
  input.year=meta.academicYear;input.grade=grade;input.roster=roster.map(e=>({id:e.id,personId:e.personId,classId:e.classId}));
  input.classes=Object.values(registry.classes).filter(c=>c.cohortStart===registry.classes[registry.homeClassId].cohortStart).map(c=>({id:c.id,size:state.sizes?.[c.id]??40}));
  input.offered=op.offered??null;input.teaching=r.plan.subject?{subject:r.plan.subject,periods:SUBJECT_LOAD[r.plan.subject][1]}:null;
  if(op.offered){const source=r.facts.find(f=>f.id===op.basisFactId);need(source?.data.type==='school-offerings'&&source.subjectIds.includes(w.identity.playerId)&&equal(source.data.offered,op.offered),'nondefault offerings require school authority');input.sourceOrder=source.order;}
 }
 if(['assess','close'].includes(action)){
  need(t,'open academic term first');input.activeIds=registry.enrollments.filter(e=>e.until===null&&t.rows.some(row=>row.id===e.personId&&row.enrollmentId===e.id)).map(e=>e.personId);
  if(action==='assess'){
   need([0,1,2,3].includes(op.round),'round');const dates=op.round===0?meta.exams[2]:(op.round===2&&t.grade===2&&meta.grade2SecondExam?meta.grade2SecondExam:meta.exams[op.round-1]);
   need(w.position.date===dates.at(-1)&&['p8','dinner','study1','study2','study3','private'].includes(w.position.slotId),'assessment must run after the last exam session on its actual final day');
  }else need(w.position.date>=meta.end,'semester not ended');
 }
 if(['conduct','supplement-plan','recognize','attendance','influence','standard','direction','participation','size'].includes(action)){
  const f=r.facts.find(f=>f.id===op.basisFactId);need(f&&(op.personId?f.subjectIds.includes(op.personId):f.subjectIds.includes(w.identity.playerId)),'objective causal source required');
  input.sourceOrder=f.order;
  if(action==='conduct')need(f.data.type==='academic-conduct'&&f.data.reviewed===true&&f.data.netMajorDemerits===op.netMajorDemerits,'verified conduct review required');
  if(action==='supplement-plan')need(f.data.type==='academic-supplement'&&equal(f.data.course,op.course),'verified supplementary course review required');
  if(action==='attendance')need(f.data.type==='academic-attendance'&&equal(f.data.change,{personId:op.personId,subject:op.subject,attendance:op.attendance}),'verified attendance source required');
  if(action==='recognize')need(f.data.type==='academic-recognition'&&equal(f.data.records,op.records),'recognized transfer/repeat credits need an actual school review');
  if(action==='influence'){need(f.data.type==='academic-influence'&&equal(f.data.change,{personId:op.personId,subject:op.subject,delta:op.delta}),'fact must authorize this precise learning consequence');}
  if(action==='standard')need(f.data.type==='academic-standard'&&f.data.personId===op.personId&&equal(f.data.status,op.status),'standard requires verified applicable identity');
  if(action==='participation')need(f.data.type==='academic-participation'&&equal(f.data.change,{personId:op.personId,subject:op.subject,delta:op.delta}),'participation source mismatch');
  if(action==='size')need(f.data.type==='school-sizes'&&equal(f.data.classSizes,op.classSizes)&&op.classSizes.every(c=>registry.classes[c.id]),'class population needs an actual school source');
 }
 if(action==='support')input.activeIds=registry.enrollments.filter(e=>e.until===null&&state.students[e.personId]).map(e=>e.personId);
 if(op.personId&&academicVersion(w)===2&&['makeup','retake-plan','retake','supplement-plan','supplement'].includes(action))need(registry.enrollments.some(e=>e.personId===op.personId&&e.until===null),'remedial study requires current enrollment');
 if(action==='support')need(w.position.slotId===calendarDay(w.position.date,gradeAt(w.position.date,r.plan.startYear)).slots.at(-1).id,'academic support settles at the actual day end');
 if(['support','supplement-plan','supplement','conduct'].includes(action))need(academicVersion(w)===2,'v2 academic policy required');
 if(['makeup','retake-plan','retake','annual-credit'].includes(action))need(t?.closed&&w.position.date>=meta.end,'closed marks required');
 if(action==='makeup'&&academicVersion(w)===2)need(w.position.date>=addDays(meta.end,2),'makeup requires its scheduled later date');
 if(action==='makeup')need(w.position.date<=new Date(Date.parse(meta.end+'T00:00:00Z')+30*86400000).toISOString().slice(0,10),'makeup window ended');
 if(action==='supplement-plan'){const now=semester(termAt(w).id),grade=registry.academicYear-registry.cohortStart+1,c=op.course;need(c&&c.level<=grade&&(c.level<grade||c.half==='autumn'&&now.id.endsWith('spring')),'supplement requires a past missing course');}
 if(action==='retake')need(w.position.date>meta.end,'retake requires later study time');
 if(action==='admission'){
  need(t?.grade===3,'admission requires senior record');const month=w.position.date.slice(5,7),windows={gsat:['01','02'],stars:['03'],application:['03','04','05','06'],subject:['07'],other:['07','08','09']};need(windows[op.node]?.includes(month),'admission node calendar window');
 }
 if(op.personId)need(w.numeric.evolution.world.people[op.personId]?.kind==='student','student identity');
 return input;
}
export function applyAcademic(s,input,rng,version=versionOf(s)){
 need(version===versionOf(s),'academic policy cannot change during replay');
 const {action,termId,personId,subject}=input,t=termForInput(s,input),learner=s.students[personId];
 if(action==='open')return openTerm(s,input,rng);
 if(action==='sync'){
  need(t&&!t.closed,'open term required for roster sync');
  const added=[];for(const e of input.roster){let row=t.rows.find(r=>r.id===e.personId);if(row){row.enrollmentId=e.id;row.classId=e.classId;continue;}
   if(!s.students[e.personId])s.students[e.personId]=createLearner(rng,version);
   row={id:e.personId,enrollmentId:e.id,classId:e.classId,courses:t.rows[0].courses.map(c=>({...c}))};t.rows.push(row);added.push(row);
  }for(const entry of input.lightWithdrawals??[]){const index=t.light.findLastIndex(row=>row.classId===entry.classId);if(index>=0)t.light.splice(index,1);}
  return added;
 }
 if(action==='support')return academicSupport(s,input,rng);
 if(action==='assess')return assess(s,input,rng);
 if(action==='close')return closeTerm(s,input);
 if(action==='size'){s.sizes??={};for(const c of input.classSizes){need(Number.isInteger(c.size)&&c.size>=0&&c.size<=100,'class size');s.sizes[c.id]=c.size;}return input.classSizes;}
 need(learner,'student has no academic record');
 if(action==='influence'||action==='participation'){
  need(learner.subjects[subject]&&Number.isFinite(input.delta)&&Math.abs(input.delta)<=30,'bounded subject consequence');
  need(!s.influences.some(i=>i.basisFactId===input.basisFactId&&i.personId===personId&&i.subject===subject),'same cause already applied');
  const target=action==='influence'?'state':'participation',before=learner.subjects[subject][target];learner.subjects[subject][target]=score(before+input.delta);s.influences.push({...input});return {before,after:learner.subjects[subject][target]};
 }
 if(action==='attendance'){const a=input.attendance;assertShape(a,['totalPeriods','unexcused','personal','exemptPersonal']);need(Object.values(a).every(Number.isInteger)&&a.totalPeriods>0&&a.unexcused>=0&&a.personal>=0&&a.exemptPersonal>=0&&a.exemptPersonal<=a.personal&&a.unexcused+a.personal<=a.totalPeriods,'attendance counts');need(learner.subjects[subject]&&t.rows.find(r=>r.id===personId)?.courses.some(c=>c.subject===subject&&c.credits*18===a.totalPeriods),'attendance course load');learner.subjects[subject].attendance=score(100*(1-(a.unexcused+a.personal-a.exemptPersonal)/a.totalPeriods));learner.subjects[subject].absence=structuredClone(a);return learner.subjects[subject].attendance;}
 if(action==='recognize'){s.recognized??=[];need(Array.isArray(input.records)&&input.records.length>0,'recognized credit records');for(const c of input.records){assertShape(c,['subject','credits','required','level','half','mark','earned']);need([1,2,3].includes(c.level)&&['autumn','spring'].includes(c.half)&&Number.isFinite(c.mark)&&c.mark>=0&&c.mark<=100&&Number.isInteger(c.credits)&&c.credits>0&&[0,c.credits].includes(c.earned),'recognized academic record');if(version===2){need(typeof c.required==='boolean'&&((c.mark>=standard(rulesFor(t?.year??2026,2),learner.status,c.level).pass)===(c.earned===c.credits)),'recognized mark and credit disagree');}
 need(!s.recognized.some(r=>r.personId===personId&&r.subject===c.subject&&r.level===c.level&&r.half===c.half),'credit already recognized');const context=t??Object.values(s.terms).findLast(term=>term.rows?.some(row=>row.id===personId));if(version===2)need(context,'recognition requires a current academic record');s.recognized.push({...c,...version===2?{year:context.year-(context.grade-c.level),date:input.date,originalMark:c.mark,registered:c.mark,completed:true,makeupEligible:false}:{},personId,basisFactId:input.basisFactId});}return input.records;}
 if(action==='standard'){standard(rulesFor(t?.year??Number(input.date.slice(0,4)),version),input.status,t?.grade??1);learner.status=input.status;return input.status;}
 if(action==='conduct'){need(version===2&&Number.isInteger(input.netMajorDemerits)&&input.netMajorDemerits>=0,'reviewed demerits');s.conduct??={};s.conduct[personId]={netMajorDemerits:input.netMajorDemerits,basisFactId:input.basisFactId,date:input.date};return s.conduct[personId];}
 if(action==='supplement-plan'){
  need(version===2,'supplement version');const c=input.course;assertShape(c,['subject','credits','required','level','half']);
  const expected=curriculum(c.level,learner.track,null,null,2,c.half).find(x=>creditIdentity({...x,level:c.level,half:c.half})===creditIdentity(c));
  need(expected&&c.required===expected.required&&c.credits===expected.credits,'reviewed supplementary curriculum');
  const existing=[...Object.values(s.terms).flatMap(term=>(term.results?.find(r=>r.id===personId)?.courses??[]).map(x=>({...x,level:term.grade,half:term.termId.endsWith('spring')?'spring':'autumn'}))),...(s.recognized??[]).filter(r=>r.personId===personId),...(s.supplements??[]).filter(r=>r.personId===personId)];
  need(!existing.some(r=>creditIdentity(r)===creditIdentity(c)),'studied course requires retake, not supplement');
  s.supplements??=[];const record={...c,year:t.year-(t.grade-c.level),personId,mark:0,registered:0,earned:0,completed:false,basisFactId:input.basisFactId,plan:{from:input.date,requiredPeriods:c.credits*6,studiedPeriods:0,mode:'individual',lastStudyDate:null}};s.supplements.push(record);return record;
 }
 if(action==='supplement'){
  const c=s.supplements?.find(c=>c.personId===personId&&c.subject===subject&&!c.completed);need(c?.plan.studiedPeriods>=c.plan.requiredPeriods,'supplement study schedule incomplete');
  const rawScore=academicMark(learner,subject,0,rng),mark=Math.round(rawScore),pass=standard(rulesFor(2026,2),learner.status,c.level).pass;c.rawScore=rawScore;c.originalMark=mark;c.mark=c.registered=mark;c.earned=mark>=pass?c.credits:0;c.completed=true;c.method=c.earned?'supplement':'unearned';c.date=input.date;return {...c};
 }
 const row=t?.results?.find(r=>r.id===personId),course=[row?.courses.find(c=>c.subject===subject),...reviewedCourses(s).filter(c=>c.personId===personId&&c.subject===subject&&supplementTermId(c)===termId)].filter(Boolean).sort((a,b)=>b.earned-a.earned)[0];
 if(action==='publish'){need(row&&t.closed,'closed transcript required');s.published??=[];const key=JSON.stringify([termId,personId]);need(!s.published.includes(key),'transcript already published');s.published.push(key);return {termId,personId,average:row.average,courses:row.courses.map(c=>({subject:c.subject,mark:c.mark,earned:c.earned})),ruleId:t.ruleId};}
 if(action==='direction'){
  need(['undecided','humanities','science','vocational'].includes(input.track)&&['university','technical','work','retake'].includes(input.aspiration),'direction');const natural=['humanities','science','vocational'],means=[['國文','歷史','公民'],['數學','物理','化學'],['生活科技','專題選修']].map(subjects=>subjects.reduce((n,s)=>n+learner.subjects[s].baseline,0)/subjects.length);learner.track=natural[rng.weightedIndex(means.map((v,i)=>1+v/20+(natural[i]===input.track?1:0)))];learner.aspiration=['university','technical','work','retake'][rng.weightedIndex([2+Math.max(...means)/30,2,1,1].map((v,i)=>v+(['university','technical','work','retake'][i]===input.aspiration?1:0)))];return {track:learner.track,aspiration:learner.aspiration};
 }

 if(action==='retake-plan'){
  need(course&&course.earned===0&&(version===1?!course.retakePlan:!course.retakePlan||course.retakePlan.completed&&course.retake?.termSequence<Object.keys(s.terms).length),'unearned course without pending retake plan required');
  if(version===2){if(course.retakePlan){course.retakePlans??=[];course.retakePlans.push(structuredClone(course.retakePlan));course.retakeAttempts??=[];course.retakeAttempts.push(structuredClone(course.retake));delete course.retake;}course.supportDecisionTermCount=Object.keys(s.terms).length;}
  course.retakePlan={from:input.date,requiredPeriods:course.credits*3,periodsPerDay:2,...version===2?{mode:'individual',studiedPeriods:0,lastStudyDate:null}:{}};return course.retakePlan;
 }
 if(action==='makeup'||action==='retake'){
  if(action==='retake'&&version===1)need(course?.retakePlan&&(Date.parse(input.date+'T00:00:00Z')-Date.parse(course.retakePlan.from+'T00:00:00Z'))/86400000*course.retakePlan.periodsPerDay>=course.retakePlan.requiredPeriods,'retake study schedule incomplete');
  if(action==='retake'&&version===2)need(course?.retakePlan?.studiedPeriods>=course.retakePlan.requiredPeriods,'retake study schedule incomplete');
  need(course&&course.earned===0&&!course[action],'credit path missing/already attempted');need(action!=='makeup'||course.makeupEligible,'not makeup eligible');
  if(action==='makeup'&&version===2)need(input.date>=addDays(t.closedAt,2)&&input.date<=addDays(t.closedAt,30),'makeup calendar window');
  const rawScore=academicMark(learner,subject,version===1&&action==='retake'?-8:0,rng),mark=version===2?Math.round(rawScore):rawScore,pass=standard(rulesFor(t.year,version),learner.status,t.grade).pass;
  if(version===2&&action==='retake')course.retakePlan.completed=true;course[action]={mark,date:input.date,...version===2?{rawScore}:{},...version===2&&action==='retake'?{termSequence:Object.keys(s.terms).length}:{},registered:mark>=pass?pass:Math.round(Math.max(mark,course.mark))};if(mark>=pass){course.earned=course.credits;course.method=action;}if(version===2){course.mark=course.registered=course[action].registered;if(row)refreshRow(row);}return {...course};
 }
 if(action==='annual-credit'){
  need(course&&termId.endsWith('spring'),'spring course required');const autumn=s.terms[`${t.year}:autumn`]?.results?.find(r=>r.id===personId)?.courses.find(c=>c.subject===subject);
  need(autumn&&(version===2||autumn.credits===course.credits),'matching autumn/spring credits required');const pass=standard(rulesFor(t.year,version),learner.status,t.grade).pass,average=annualAverage(autumn,course,pass,version);
  need(!course.annual||version===2&&average>course.annual.average,'annual result unchanged/already awarded');if(course.annual){course.annualHistory??=[];course.annualHistory.push({...course.annual});}course.annual={average,date:input.date};if(average>=pass)for(const c of [autumn,course])if(c.earned===0){c.earned=c.credits;c.method='annual-average';}return {average,earned:course.earned,autumnEarned:autumn.earned};
 }
 if(action==='admission'){
  need(!s.admissions.some(a=>a.personId===personId&&a.year===t.year&&a.node===input.node),'node already resolved');
  const marks=(t.results?.find(r=>r.id===personId)??Object.values(s.terms).findLast(term=>term.results?.some(r=>r.id===personId))?.results?.find(r=>r.id===personId))?.courses??Object.values(learner.subjects).map(x=>({mark:x.baseline})),average=marks.reduce((n,c)=>n+c.mark,0)/marks.length;
  if(['stars','application','subject'].includes(input.node))need(s.admissions.some(a=>a.personId===personId&&a.year===t.year&&a.node==='gsat'),'entrance exam node required');
  const exam=score(average+(rng.next()+rng.next()-1)*10),eligible=learner.aspiration!=='work'&&(input.node!=='stars'||average>=80),accepted=input.node!=='gsat'&&input.node!=='other'&&eligible&&rng.next()<Math.max(.05,Math.min(.9,(exam-35)/70));
  const result={personId,year:t.year,node:input.node,date:input.date,exam,eligible,accepted,path:accepted?learner.aspiration:learner.aspiration==='work'?'work':input.node==='other'?'technical-or-work':'pending-other-route'};s.admissions.push(result);return result;
 }
 throw new RangeError('Unknown academic action');
}
export function compileAcademic(w,op){const input=academicInput(w,op),state=academicState(w),randomBefore=structuredClone(w.random.academics??w.random.events),rng=restoreRandom(randomBefore),result=applyAcademic(state,input,rng);return {version:academicVersion(w),operation:structuredClone(op),input,result,randomBefore,randomAfter:rng.snapshot()};}
export function validateAcademicHistory(w){
 const s=emptyAcademics(academicVersion(w));let random=null;const r=runtime(w);
 for(const h of r.history.filter(h=>h.type==='retry'&&h.data.academicPolicy!==undefined)){const owner=r.commits.find(c=>c.id===h.operationId&&c.attemptId===h.attemptId);need([1,2].includes(h.data.academicPolicy)&&h.data.academicPolicy===academicVersion(w)&&JSON.parse(owner.request).academicPolicy===h.data.academicPolicy,'retry academic policy differs from its receipt');}
 for(const h of r.history)if(h.type==='academic'){
  const d=h.data;assertShape(d,['version','operation','input','result','randomBefore','randomAfter']);need(Object.entries(d.operation).filter(([k])=>k!=='type').every(([k,v])=>equal(d.input[k],v)),'academic operation/input differs');need([1,2].includes(d.version)&&d.version===academicVersion(w)&&d.input.action===d.operation.action&&d.input.date===h.at.date,'academic version/action/date');
  const commit=r.commits.find(c=>c.id===h.operationId&&c.attemptId===h.attemptId),request=JSON.parse(commit.request);need(request.operations.some(op=>equal(op,d.operation))||request.operations.some(op=>['story','finish-slot','school-action','campus','school','advance-time'].includes(op.type)),'academic journal ownership');
  if(random){const previous=r.history.slice(0,h.order-1).findLast(x=>x.type==='academic');if(previous?.attemptId===h.attemptId)need(equal(random,d.randomBefore),'academic RNG chain');}const rng=restoreRandom(d.randomBefore),result=applyAcademic(s,d.input,rng,d.version);need(equal(result,d.result)&&equal(rng.snapshot(),d.randomAfter),'academic deterministic replay mismatch');random=d.randomAfter;
  if(d.input.basisFactId){const f=r.facts.find(f=>f.id===d.input.basisFactId),i=d.input;need(f&&f.order<h.order&&f.order===i.sourceOrder&&f.subjectIds.includes(i.personId??w.identity.playerId),'academic causal source');
   if(['influence','participation'].includes(i.action))need(f.data.type===`academic-${i.action}`&&equal(f.data.change,{personId:i.personId,subject:i.subject,delta:i.delta}),'academic consequence changed its source');
   if(i.action==='conduct')need(f.data.type==='academic-conduct'&&f.data.reviewed===true&&f.data.netMajorDemerits===i.netMajorDemerits,'conduct review source changed');
   if(i.action==='supplement-plan')need(f.data.type==='academic-supplement'&&equal(f.data.course,i.course),'supplement review source changed');
   if(i.action==='standard')need(f.data.type==='academic-standard'&&f.data.personId===i.personId&&equal(f.data.status,i.status),'academic standard changed its source');
   if(i.action==='attendance')need(f.data.type==='academic-attendance'&&equal(f.data.change,{personId:i.personId,subject:i.subject,attendance:i.attendance}),'attendance changed its source');
   if(i.action==='recognize')need(f.data.type==='academic-recognition'&&equal(f.data.records,i.records),'recognized credits changed their source');
   if(i.action==='size')need(f.data.type==='school-sizes'&&equal(f.data.classSizes,i.classSizes),'population changed its source');
   if(i.offered)need(f.data.type==='school-offerings'&&equal(f.data.offered,i.offered),'offerings changed their source');
  }
  if(d.input.action==='open'||d.input.action==='sync'){const meta=semester(d.input.termId),registry=w.numeric.evolution.world.registry,home=registry.classes[d.input.roster[0]?.classId];need(d.input.teaching===null||equal(d.input.teaching,{subject:r.plan.subject,periods:SUBJECT_LOAD[r.plan.subject][1]}),'academic teaching load differs from timetable');need(meta.academicYear===d.input.year&&home&&d.input.grade===d.input.year-home.cohortStart+1,'academic year/grade metadata');need(new Set(d.input.classes.map(c=>c.id)).size===d.input.classes.length&&d.input.classes.every(c=>registry.classes[c.id]?.cohortStart===home.cohortStart&&Number.isInteger(c.size)&&c.size>=0&&c.size<=100),'academic grade class catalogue');}
  if(d.input.roster)for(const e of d.input.roster)need(w.numeric.evolution.world.registry.enrollments.some(x=>x.id===e.id&&x.personId===e.personId&&x.classId===e.classId&&x.from<=h.at.date&&(x.until===null||x.until>=h.at.date)),'academic enrollment identity');
 }
 if(random&&r.history.findLast(h=>h.type==='academic')?.attemptId===w.identity.attemptId)need(equal(random,w.random.academics),'academic random head');
}
export function readGrades(w,personId,termId){const t=academicState(w).terms[termId];if(!t)return null;const row=t.rows.find(r=>r.id===personId);need(row,'only full homeroom transcript available');return structuredClone({termId,personId,courses:row.courses,assessments:t.assessments.map(a=>({round:a.round,marks:a.marks.find(m=>m.id===personId)?.marks??null})),semester:t.results?.find(r=>r.id===personId)??null});}
export function readRankings(w,termId,round='semester',{population='recorded'}={}){const t=academicState(w).terms[termId];need(t&&['recorded','current'].includes(population),'term/population');const active=population==='current'?w.numeric.evolution.world.registry.enrollments.filter(e=>e.until===null&&t.rows.some(row=>row.id===e.personId&&row.enrollmentId===e.id)).map(e=>e.personId):null;return ranking(t,round,active);}
export function readAcademicQualification(w,personId,projection=null){
 const s=projection??academicState(w),version=versionOf(s),registry=w.numeric.evolution.world.registry,enrollments=registry.enrollments.filter(e=>e.personId===personId),cohort=registry.classes[enrollments.at(-1)?.classId]?.cohortStart;
 const records=Object.values(s.terms).flatMap(t=>(t.results?.find(r=>r.id===personId)?.courses??[]).map(c=>({...c,year:t.year,level:t.grade,half:t.termId.endsWith('spring')?'spring':'autumn'})));
 for(const r of [...(s.recognized??[]),...(s.supplements??[])].filter(r=>r.personId===personId))records.push(version===2?{...r,year:r.year??cohort+r.level-1}:r);
 const entryYears=enrollments.map(e=>registry.classes[e.classId].cohortStart),rule=rulesFor(Math.max(2026,Math.min(...entryYears,Number(w.position.date.slice(0,4)))),version);
 const studyPeriodComplete=version===1||Number.isInteger(cohort)&&w.position.date>=semester(`${cohort+3}:spring`).end;
 const result=graduation(records,rule,{netMajorDemerits:s.conduct?.[personId]?.netMajorDemerits??0,studyPeriodComplete}),latest=Math.max(0,...records.map(r=>r.year??0)),current=records.filter(r=>r.year===latest);
 result.repeatEligible=new Set(current.map(r=>r.half)).size===2&&graduation(current,rule).repeatEligible;return result;
}
export function academicEligible(w,personId,condition,projection=null){const s=projection??academicState(w),t=s.terms[condition.termId],row=t?.results?.find(r=>r.id===personId);if(condition.kind==='makeup')return s.version===2?fullCourses(s).some(x=>x.t.termId===condition.termId&&x.row.id===personId&&x.course.makeupEligible&&x.course.earned===0):!!row?.courses.some(c=>c.makeupEligible&&c.earned===0);if(condition.kind==='credit-deficit')return s.version===2?fullCourses(s).some(x=>x.t.termId===condition.termId&&x.row.id===personId&&x.course.earned===0):!!row?.courses.some(c=>c.earned===0);if(condition.kind==='admission')return s.admissions.some(a=>a.personId===personId&&a.node===condition.node&&a.accepted===condition.accepted);if(condition.kind==='change'){const a=t?.assessments.find(a=>a.round===condition.from)?.marks.find(m=>m.id===personId),b=t?.assessments.find(a=>a.round===condition.to)?.marks.find(m=>m.id===personId);return !!a&&!!b&&b.marks[condition.subject]-a.marks[condition.subject]<=condition.maximum;}return false;}


function refreshRow(row){
 row.total=scoreTotal(row.courses,c=>c.mark);row.weightedTotal=scoreTotal(row.courses,c=>c.mark*c.credits);row.average=score(row.weightedTotal/row.courses.reduce((n,c)=>n+c.credits,0));
}
const scoreTotal=(courses,fn)=>Math.round(courses.reduce((n,c)=>n+fn(c),0)*10)/10;
const retakeRequestDue=(s,c)=>!c.earned&&c.supportDecisionTermCount!==Object.keys(s.terms).length&&(!c.makeupEligible||c.makeup||c.makeupExpired)&&(!c.retakePlan||c.retakePlan.completed);
const fullCourses=s=>{
 const rows=[...Object.values(s.terms).filter(t=>t.closed).flatMap(t=>(t.results??[]).filter(r=>s.students[r.id]).flatMap(row=>row.courses.map(course=>({t,row,course})))),...reviewedCourses(s).map(course=>({t:{termId:supplementTermId(course),year:course.year,grade:course.level,closed:true,closedAt:course.date},row:{id:course.personId,courses:[course]},course}))],unique=new Map();
 for(const x of rows){const key=x.row.id+'/'+creditIdentity({...x.course,level:x.t.grade,half:x.t.termId.endsWith('spring')?'spring':'autumn'}),old=unique.get(key);if(!old||x.course.earned>old.course.earned)unique.set(key,x);}return [...unique.values()];
};
function annualReviews(s,active){const pending=[];for(const t of Object.values(s.terms).filter(t=>t.closed&&t.termId.endsWith('spring')))for(const row of t.results.filter(r=>active(r.id)&&s.students[r.id]))for(const c of row.courses){const autumn=s.terms[`${t.year}:autumn`]?.results?.find(r=>r.id===row.id)?.courses.find(a=>a.subject===c.subject),pass=standard(rulesFor(t.year,2),s.students[row.id].status,t.grade).pass;if(autumn&&(!c.annual||annualAverage(autumn,c,pass,2)>c.annual.average))pending.push({t,row,c});}return pending;}
export function academicSupportDue(s,date,activeIds=null){
 const active=id=>activeIds===null||activeIds.includes(id);
 if(s.version!==2||s.supportDates?.includes(date))return false;
 return annualReviews(s,active).length>0||Object.values(s.terms).some(t=>t.closed&&!t.supportPrepared)||fullCourses(s).some(({row,course:c})=>active(row.id)&&c.earned===0&&(retakeRequestDue(s,c)||c.makeupDue&&date>=c.makeupDue&&!c.makeup||c.retakePlan&&!c.retakePlan.completed&&date>c.retakePlan.from))||(s.supplements??[]).some(c=>active(c.personId)&&!c.completed&&date>c.plan.from);
}
/** School support is an academic journal operation at an actually visited date.
 * Two face-to-face study periods per student/day, shared across all pending
 * courses. No calendar jumps, no instant final-day credits, no new world engine. */
export function academicSupport(s,input,rng){
 need(s.version===2&&academicSupportDue(s,input.date,input.activeIds??null),'no due academic support or duplicate date');
 const active=id=>!input.activeIds||input.activeIds.includes(id),courses=()=>fullCourses(s).filter(item=>active(item.row.id));
 s.supportDates??=[];s.supportDates.push(input.date);const out={prepared:[],makeups:[],plans:[],study:[],retakes:[],supplements:[],annual:[],expired:[]};
 const plan=({t,row,course:c})=>{
  if(!retakeRequestDue(s,c))return;
  c.supportDecisionTermCount=Object.keys(s.terms).length;
  // Requests model student participation, not a teacher guarantee of credit.
  const learner=s.students[row.id],participation=learner.subjects[c.subject].participation;
  if(rng.next()>=.25+participation*.0065)return;
  if(c.retakePlan){c.retakePlans??=[];c.retakePlans.push(structuredClone(c.retakePlan));c.retakeAttempts??=[];c.retakeAttempts.push(structuredClone(c.retake));delete c.retake;}
  c.retakePlan={from:input.date,requiredPeriods:c.credits*3,periodsPerDay:2,mode:'individual',studiedPeriods:0,lastStudyDate:null};out.plans.push({personId:row.id,termId:t.termId,subject:c.subject,mode:'individual'});
 };
 for(const t of Object.values(s.terms))if(t.closed&&!t.supportPrepared){
  t.supportPrepared=true;out.prepared.push(t.termId);
  if(t.termId.endsWith('spring'))for(const row of t.results.filter(r=>s.students[r.id]&&active(r.id)))for(const c of row.courses){const a=s.terms[`${t.year}:autumn`]?.results?.find(r=>r.id===row.id)?.courses.find(a=>a.subject===c.subject);if(a&&!c.annual)out.annual.push({personId:row.id,subject:c.subject,...applyAcademic(s,{action:'annual-credit',termId:t.termId,personId:row.id,subject:c.subject,date:input.date},rng)});}
  for(const item of courses().filter(item=>item.t===t)){const c=item.course;if(!c.earned&&c.makeupEligible)c.makeupDue=addDays(t.closedAt,2);else if(!c.earned)plan(item);}
 }
 for(const item of courses()){const {t,row,course:c}=item;if(!c.earned&&c.makeupDue&&input.date>=c.makeupDue&&!c.makeup){
  if(input.date>addDays(t.closedAt,30)){c.makeupExpired=true;delete c.makeupDue;plan(item);out.expired.push({personId:row.id,subject:c.subject});continue;}
  out.makeups.push({personId:row.id,termId:t.termId,subject:c.subject,...applyAcademic(s,{action:'makeup',termId:t.termId,personId:row.id,subject:c.subject,date:input.date},rng)});if(!c.earned)plan(item);
 }}
 // A later spring makeup may improve the annual average even if it still fails.
 for(const {t,row,c} of annualReviews(s,active))out.annual.push({personId:row.id,subject:c.subject,...applyAcademic(s,{action:'annual-credit',termId:t.termId,personId:row.id,subject:c.subject,date:input.date},rng)});
 for(const item of courses())if(retakeRequestDue(s,item.course))plan(item);
 // Group only actual same-day applicants, not everybody with an insufficient mark.
 for(const p of out.plans){const applicants=out.plans.filter(q=>q.termId===p.termId&&q.subject===p.subject);if(applicants.length>=15){const c=courses().find(x=>x.t.termId===p.termId&&x.row.id===p.personId&&x.course.subject===p.subject).course;c.retakePlan.mode=p.mode='class';c.retakePlan.requiredPeriods=c.credits*6;}}
 const weekday=new Date(input.date+'T00:00:00Z').getUTCDay();
 if(weekday!==0&&weekday!==6)for(const [personId,learner] of Object.entries(s.students)){
  if(!active(personId))continue;let budget=2;const tasks=[...courses().filter(x=>x.row.id===personId&&!x.course.earned&&x.course.retakePlan&&!x.course.retakePlan.completed).map(x=>({...x,plan:x.course.retakePlan,kind:'retake'})),...(s.supplements??[]).filter(c=>c.personId===personId&&!c.completed).map(c=>({course:c,plan:c.plan,kind:'supplement'}))];
  for(const task of tasks){const {course:c,plan:p}=task;if(!budget||input.date<=p.from)continue;const periods=Math.min(budget,p.requiredPeriods-p.studiedPeriods);if(periods<=0)continue;
   p.studiedPeriods+=periods;p.lastStudyDate=input.date;budget-=periods;const subject=learner.subjects[c.subject];subject.mastery=score(subject.mastery+(100-subject.mastery)*.012*periods*(subject.state/100)*(subject.participation/100));out.study.push({personId,subject:c.subject,periods});
   if(p.studiedPeriods===p.requiredPeriods){const result=applyAcademic(s,{action:task.kind,termId:task.t?.termId??input.termId,personId,subject:c.subject,date:input.date},rng);out[task.kind==='retake'?'retakes':'supplements'].push({personId,subject:c.subject,...result});}
  }
 }
 return out;
}
export const qualificationDisposition=q=>q.version===2?(q.eligible?'graduated':q.certificateEligible?'course-completed':'incomplete'):(q.eligible?'graduated':'delayed');
