import { SUBJECT_LOAD } from '../calendar/timetable.js';
/** Academic adapter: journal is the sole authority; reads rebuild detached projections. */
import { assertShape } from '../player/panel.js';
import { restoreRandom } from '../numeric/random.js';
import { canonicalData } from '../changes/settlement.js';
import { semester,teachingTerm,latestPreparedSemester } from '../calendar/calendar.js';
import { need,score,rulesFor,standard,graduation } from '../academics/rules.js';
import { emptyAcademics,openTerm,assess,closeTerm,ranking,academicMark,createLearner } from '../academics/learning.js';
const runtime=w=>w.extensions['teacher-hell/world'];
const equal=(a,b)=>canonicalData(a)===canonicalData(b);
export function academicState(w){const s=emptyAcademics();for(const h of runtime(w).history)if(h.type==='academic')applyAcademic(s,structuredClone(h.data.input),restoreRandom(h.data.randomBefore));return s;}
function termAt(w){return teachingTerm(w.position.date)??latestPreparedSemester(w.position.date);}
export function academicInput(w,op){
 const r=runtime(w),registry=w.numeric.evolution.world.registry;need(registry,'formal school identities required');
 assertShape(op,['type','action',...['termId','round','personId','subject','basisFactId','delta','status','node','track','aspiration','offered','classSizes','attendance','records'].filter(k=>Object.hasOwn(op,k))]);
 const action=op.action;need(['recognize','attendance','retake-plan','publish','sync','open','assess','close','influence','makeup','retake','annual-credit','direction','admission','standard','participation','size'].includes(action),'unknown academic operation');
 const state=academicState(w),termId=op.termId??termAt(w).id,t=state.terms[termId],meta=semester(termId);
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
 if(['recognize','attendance','influence','standard','direction','participation','size'].includes(action)){
  const f=r.facts.find(f=>f.id===op.basisFactId);need(f&&(op.personId?f.subjectIds.includes(op.personId):f.subjectIds.includes(w.identity.playerId)),'objective causal source required');
  input.sourceOrder=f.order;
  if(action==='attendance')need(f.data.type==='academic-attendance'&&equal(f.data.change,{personId:op.personId,subject:op.subject,attendance:op.attendance}),'verified attendance source required');
  if(action==='recognize')need(f.data.type==='academic-recognition'&&equal(f.data.records,op.records),'recognized transfer/repeat credits need an actual school review');
  if(action==='influence'){need(f.data.type==='academic-influence'&&equal(f.data.change,{personId:op.personId,subject:op.subject,delta:op.delta}),'fact must authorize this precise learning consequence');}
  if(action==='standard')need(f.data.type==='academic-standard'&&f.data.personId===op.personId&&equal(f.data.status,op.status),'standard requires verified applicable identity');
  if(action==='participation')need(f.data.type==='academic-participation'&&equal(f.data.change,{personId:op.personId,subject:op.subject,delta:op.delta}),'participation source mismatch');
  if(action==='size')need(f.data.type==='school-sizes'&&equal(f.data.classSizes,op.classSizes)&&op.classSizes.every(c=>registry.classes[c.id]),'class population needs an actual school source');
 }
 if(['makeup','retake-plan','retake','annual-credit'].includes(action))need(t?.closed&&w.position.date>=meta.end,'closed marks required');
 if(action==='makeup')need(w.position.date<=new Date(Date.parse(meta.end+'T00:00:00Z')+30*86400000).toISOString().slice(0,10),'makeup window ended');
 if(action==='retake')need(w.position.date>meta.end,'retake requires later study time');
 if(action==='admission'){
  need(t?.grade===3,'admission requires senior record');const month=w.position.date.slice(5,7),windows={gsat:['01','02'],stars:['03'],application:['03','04','05','06'],subject:['07'],other:['07','08','09']};need(windows[op.node]?.includes(month),'admission node calendar window');
 }
 if(op.personId)need(w.numeric.evolution.world.people[op.personId]?.kind==='student','student identity');
 return input;
}
export function applyAcademic(s,input,rng){
 const {action,termId,personId,subject}=input,t=s.terms[termId],learner=s.students[personId];
 if(action==='open')return openTerm(s,input,rng);
 if(action==='sync'){
  need(t&&!t.closed,'open term required for roster sync');
  const added=[];for(const e of input.roster){let row=t.rows.find(r=>r.id===e.personId);if(row){row.enrollmentId=e.id;row.classId=e.classId;continue;}
   if(!s.students[e.personId])s.students[e.personId]=createLearner(rng);
   row={id:e.personId,enrollmentId:e.id,classId:e.classId,courses:t.rows[0].courses.map(c=>({...c}))};t.rows.push(row);added.push(row);
  }for(const entry of input.lightWithdrawals??[]){const index=t.light.findLastIndex(row=>row.classId===entry.classId);if(index>=0)t.light.splice(index,1);}
  return added;
 }
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
 if(action==='recognize'){s.recognized??=[];need(Array.isArray(input.records)&&input.records.length>0,'recognized credit records');for(const c of input.records){assertShape(c,['subject','credits','required','level','half','mark','earned']);need([1,2,3].includes(c.level)&&['autumn','spring'].includes(c.half)&&Number.isFinite(c.mark)&&c.mark>=0&&c.mark<=100&&Number.isInteger(c.credits)&&c.credits>0&&[0,c.credits].includes(c.earned),'recognized academic record');need(!s.recognized.some(r=>r.personId===personId&&r.subject===c.subject&&r.level===c.level&&r.half===c.half),'credit already recognized');s.recognized.push({...c,personId,basisFactId:input.basisFactId});}return input.records;}
 if(action==='standard'){standard(rulesFor(t?.year??Number(input.date.slice(0,4))),input.status,t?.grade??1);learner.status=input.status;return input.status;}
 const row=t?.results?.find(r=>r.id===personId),course=row?.courses.find(c=>c.subject===subject);
 if(action==='publish'){need(row&&t.closed,'closed transcript required');s.published??=[];const key=JSON.stringify([termId,personId]);need(!s.published.includes(key),'transcript already published');s.published.push(key);return {termId,personId,average:row.average,courses:row.courses.map(c=>({subject:c.subject,mark:c.mark,earned:c.earned})),ruleId:t.ruleId};}
 if(action==='direction'){
  need(['undecided','humanities','science','vocational'].includes(input.track)&&['university','technical','work','retake'].includes(input.aspiration),'direction');const natural=['humanities','science','vocational'],means=[['國文','歷史','公民'],['數學','物理','化學'],['生活科技','專題選修']].map(subjects=>subjects.reduce((n,s)=>n+learner.subjects[s].baseline,0)/subjects.length);learner.track=natural[rng.weightedIndex(means.map((v,i)=>1+v/20+(natural[i]===input.track?1:0)))];learner.aspiration=['university','technical','work','retake'][rng.weightedIndex([2+Math.max(...means)/30,2,1,1].map((v,i)=>v+(['university','technical','work','retake'][i]===input.aspiration?1:0)))];return {track:learner.track,aspiration:learner.aspiration};
 }

 if(action==='retake-plan'){need(course&&course.earned===0&&!course.retakePlan,'unearned course without existing retake plan required');course.retakePlan={from:input.date,requiredPeriods:course.credits*3,periodsPerDay:2};return course.retakePlan;}
 if(action==='makeup'||action==='retake'){
  if(action==='retake')need(course?.retakePlan&&(Date.parse(input.date+'T00:00:00Z')-Date.parse(course.retakePlan.from+'T00:00:00Z'))/86400000*course.retakePlan.periodsPerDay>=course.retakePlan.requiredPeriods,'retake study schedule incomplete');
  need(course&&course.earned===0&&!course[action],'credit path missing/already attempted');need(action!=='makeup'||course.makeupEligible,'not makeup eligible');
  const mark=academicMark(learner,subject,action==='retake'?-8:0,rng),pass=standard(rulesFor(t.year),learner.status,t.grade).pass;
  course[action]={mark,date:input.date,registered:mark>=pass?pass:Math.round(Math.max(mark,course.mark))};if(mark>=pass){course.earned=course.credits;course.method=action;}return {...course};
 }
 if(action==='annual-credit'){
  need(course&&termId.endsWith('spring'),'spring course required');const autumn=s.terms[`${t.year}:autumn`]?.results?.find(r=>r.id===personId)?.courses.find(c=>c.subject===subject);
  need(autumn&&autumn.credits===course.credits&&!course.annual,'matching autumn/spring credits required');const pass=standard(rulesFor(t.year),learner.status,t.grade).pass,registered=c=>c.makeup?.registered??(c.makeup?c.makeup.mark>=pass?pass:Math.round(c.makeup.mark):0),average=score((Math.max(autumn.mark,registered(autumn))+Math.max(course.mark,registered(course)))/2);
  course.annual={average,date:input.date};if(average>=pass)for(const c of [autumn,course])if(c.earned===0){c.earned=c.credits;c.method='annual-average';}return {average,earned:course.earned,autumnEarned:autumn.earned};
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
export function compileAcademic(w,op){const input=academicInput(w,op),state=academicState(w),randomBefore=structuredClone(w.random.academics??w.random.events),rng=restoreRandom(randomBefore),result=applyAcademic(state,input,rng);return {version:1,operation:structuredClone(op),input,result,randomBefore,randomAfter:rng.snapshot()};}
export function validateAcademicHistory(w){
 const s=emptyAcademics();let random=null;const r=runtime(w);
 for(const h of r.history)if(h.type==='academic'){
  const d=h.data;assertShape(d,['version','operation','input','result','randomBefore','randomAfter']);need(Object.entries(d.operation).filter(([k])=>k!=='type').every(([k,v])=>equal(d.input[k],v)),'academic operation/input differs');need(d.version===1&&d.input.action===d.operation.action&&d.input.date===h.at.date,'academic version/action/date');
  const commit=r.commits.find(c=>c.id===h.operationId&&c.attemptId===h.attemptId),request=JSON.parse(commit.request);need(request.operations.some(op=>equal(op,d.operation))||request.operations.some(op=>['story','finish-slot','school-action','campus','school','advance-time'].includes(op.type)),'academic journal ownership');
  if(random){const previous=r.history.slice(0,h.order-1).findLast(x=>x.type==='academic');if(previous?.attemptId===h.attemptId)need(equal(random,d.randomBefore),'academic RNG chain');}const rng=restoreRandom(d.randomBefore),result=applyAcademic(s,d.input,rng);need(equal(result,d.result)&&equal(rng.snapshot(),d.randomAfter),'academic deterministic replay mismatch');random=d.randomAfter;
  if(d.input.basisFactId){const f=r.facts.find(f=>f.id===d.input.basisFactId),i=d.input;need(f&&f.order<h.order&&f.order===i.sourceOrder&&f.subjectIds.includes(i.personId??w.identity.playerId),'academic causal source');
   if(['influence','participation'].includes(i.action))need(f.data.type===`academic-${i.action}`&&equal(f.data.change,{personId:i.personId,subject:i.subject,delta:i.delta}),'academic consequence changed its source');
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
export function readAcademicQualification(w,personId){const s=academicState(w),records=Object.values(s.terms).flatMap(t=>(t.results?.find(r=>r.id===personId)?.courses??[]).map(c=>({...c,year:t.year,level:t.grade,half:t.termId.endsWith('spring')?'spring':'autumn'})));records.push(...(s.recognized??[]).filter(r=>r.personId===personId));const registry=w.numeric.evolution.world.registry,entryYears=registry.enrollments.filter(e=>e.personId===personId).map(e=>registry.classes[e.classId].cohortStart),rule=rulesFor(Math.max(2026,Math.min(...entryYears,Number(w.position.date.slice(0,4))))),result=graduation(records,rule),latest=Math.max(0,...records.map(r=>r.year??0)),current=records.filter(r=>r.year===latest);result.repeatEligible=new Set(current.map(r=>r.half)).size===2&&graduation(current,rule).repeatEligible;return result;}
export function academicEligible(w,personId,condition,projection=null){const s=projection??academicState(w),t=s.terms[condition.termId],row=t?.results?.find(r=>r.id===personId);if(condition.kind==='makeup')return !!row?.courses.some(c=>c.makeupEligible&&c.earned===0);if(condition.kind==='credit-deficit')return !!row?.courses.some(c=>c.earned===0);if(condition.kind==='admission')return s.admissions.some(a=>a.personId===personId&&a.node===condition.node&&a.accepted===condition.accepted);if(condition.kind==='change'){const a=t?.assessments.find(a=>a.round===condition.from)?.marks.find(m=>m.id===personId),b=t?.assessments.find(a=>a.round===condition.to)?.marks.find(m=>m.id===personId);return !!a&&!!b&&b.marks[condition.subject]-a.marks[condition.subject]<=condition.maximum;}return false;}
