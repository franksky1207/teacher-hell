/** Academic state is independent of the 48 personality/state fields. */
import { assessmentPolicy,isSeniorTerm } from './policy.js';
import { need,score,semesterScore,creditResult,rulesFor,curriculum,ranks,academicSubjects,subjectFamily } from './rules.js';
export const emptyAcademics=(version=2)=>{need([1,2].includes(version),'academic state version');return {...version===2?{version:2}:{},students:{},terms:{},influences:[],admissions:[]};};
const jitter=(rng,width)=>(rng.next()+rng.next()-1)*width;
export function createLearner(rng,version=2){const level=version===2?(rng.uniform(35,85)+rng.uniform(35,85)+rng.uniform(35,85))/3:rng.uniform(35,85);const learner={subjects:Object.fromEntries((version===2?academicSubjects():['國文','英文','數學','數學A','數學B','地理','歷史','物理','化學','公民','生物','地球科學','專題選修','體育','藝術','生活科技','校訂選修','選修探索']).map(s=>{const baseline=score(level+jitter(rng,22));return [s,{baseline,...version===2?{mastery:baseline}:{},state:score(65+jitter(rng,15)),participation:score(65+jitter(rng,15)),attendance:100}];})),status:'general',track:'undecided',aspiration:['university','work','technical'][rng.integer(0,2)]};if(version===2)for(const [name,subject] of Object.entries(learner.subjects)){const parent=learner.subjects[subjectFamily(name)];if(parent&&parent!==subject){subject.baseline=score(parent.baseline+jitter(rng,6));subject.mastery=subject.baseline;}}return learner;}
export function academicMark(learner,subject,difficulty,rng,ordinary=false){const s=learner.subjects[subject];need(s,'unknown academic subject');if(s.mastery!==undefined)return score((ordinary?s.mastery*.45+s.participation*.35+s.attendance*.2:s.mastery-difficulty)+(s.state-65)*.18+jitter(rng,ordinary?2:6));return score(s.baseline+(s.state-65)*.18+(ordinary?(s.participation-65)*.08-(100-s.attendance)*.25: -difficulty)+jitter(rng,ordinary?2:6));}
export function openTerm(state,input,rng){
 const {termId,year,grade,roster,classes,offered}=input;if(input.assessmentPolicy)need(grade===3&&termId.endsWith(':spring')&&input.assessmentWindow?.assessmentPolicy===input.assessmentPolicy,'term policy grade/semester');need(!state.terms[termId]&&roster.length>0,'term exists or empty roster');
 for(const e of roster){if(!state.students[e.personId])state.students[e.personId]=createLearner(rng,state.version??1);for(const subject of Object.values(state.students[e.personId].subjects)){subject.attendance=100;delete subject.absence;}}
 const rows=roster.map(e=>({id:e.personId,enrollmentId:e.id,classId:e.classId,courses:curriculum(grade,state.students[e.personId].track,offered,input.teaching??null,state.version??1,termId.endsWith('spring')?'spring':'autumn')}));
 const light=[];for(const c of classes)if(!roster.some(e=>e.classId===c.id))for(let i=0;i<c.size;i++){
  const learner=createLearner(rng,state.version??1);light.push({id:`rank:${termId}:${c.id}:${i}`,classId:c.id,learner,courses:curriculum(grade,'undecided',offered,input.teaching??null,state.version??1,termId.endsWith('spring')?'spring':'autumn')});
 }
 state.terms[termId]={termId,year,grade,...(input.assessmentPolicy?{assessmentPolicy:assessmentPolicy(input.assessmentPolicy).id,assessmentWindow:structuredClone(input.assessmentWindow)}:{}),ruleId:rulesFor(year,state.version??1).id,rows,light,assessments:[],closed:false};return {studentIds:rows.map(r=>r.id),lightCount:light.length};
}
export function assess(state,input,rng){
 const t=state.terms[input.termId];need(t&&!t.closed&&assessmentPolicy(t.assessmentPolicy??null).rounds.includes(input.round),'assessment term/round');need(!t.assessments.some(a=>a.round===input.round),'assessment already recorded');
 const rows=t.rows.filter(row=>input.activeIds.includes(row.id));const subjects=[...new Set([...rows,...t.light].flatMap(r=>r.courses.map(c=>c.subject)))].sort();
 const difficulty=Object.fromEntries(subjects.map(s=>[s,input.round===0?0:score(10+jitter(rng,8))-10]));
 if(state.version===2)for(const row of [...rows,...t.light]){const learner=state.students[row.id]??row.learner;for(const c of row.courses){const subject=learner.subjects[c.subject];subject.mastery=score(subject.mastery+(100-subject.mastery)*.045*(subject.state/100)*(subject.participation/100)*(subject.attendance/100));}}
 const marks=[...rows,...t.light].map(row=>({id:row.id,classId:row.classId,marks:Object.fromEntries(row.courses.map(c=>[c.subject,academicMark(state.students[row.id]??row.learner,c.subject,difficulty[c.subject],rng,input.round===0)]))}));
 for(const row of marks){const source=[...rows,...t.light].find(r=>r.id===row.id),weighted=source.courses.reduce((n,c)=>n+row.marks[c.subject]*c.credits,0),credits=source.courses.reduce((n,c)=>n+c.credits,0);row.average=score(weighted/credits);}
 const result={round:input.round,difficulty,marks};t.assessments.push(result);return result;
}
export function closeTerm(state,input){
 const t=state.terms[input.termId],policy=assessmentPolicy(t?.assessmentPolicy??null);need(t&&!t.closed&&t.assessments.length===policy.rounds.length&&policy.rounds.every(round=>t.assessments.some(a=>a.round===round)),'exact term policy assessments required');
 const result=[];for(const row of [...t.rows,...t.light]){
  if(state.students[row.id]&&input.activeIds&&!input.activeIds.includes(row.id))continue;
  const sets=policy.rounds.map(round=>t.assessments.find(a=>a.round===round).marks.find(m=>m.id===row.id));if(sets.some(x=>!x))continue;
  const courses=row.courses.map(c=>{const absence=state.students[row.id]?.subjects[c.subject]?.absence,blocked=absence&&(absence.unexcused+absence.personal-absence.exemptPersonal)*3>=absence.totalPeriods;const mark=blocked?0:semesterScore(sets[0].marks[c.subject],sets.slice(1).map(m=>m.marks[c.subject]),state.version??1,t.assessmentPolicy??null);return {...c,mark,...(isSeniorTerm(t)?{completed:false}:{}),...state.version===2?{originalMark:mark,registered:mark}:{},...creditResult(mark,c,rulesFor(t.year,state.version??1),state.students[row.id]?.status??'general',t.grade)};});
  const resultRow={id:row.id,classId:row.classId,courses,total:Math.round(courses.reduce((n,c)=>n+c.mark,0)*10)/10,weightedTotal:Math.round(courses.reduce((n,c)=>n+c.mark*c.credits,0)*10)/10,average:score(courses.reduce((n,c)=>n+c.mark*c.credits,0)/courses.reduce((n,c)=>n+c.credits,0)),signature:row.courses.map(c=>c.subject).sort().join('|')};if(!state.students[row.id])delete resultRow.courses;result.push(resultRow);
 }
 t.results=result;t.closed=true;if(state.version===2||isSeniorTerm(t))t.closedAt=input.date;
 // Lightweight students retain only objective marks, never NPCs or lifetime learner states.
 for(const row of t.light){delete row.learner;delete row.courses;}
 return result;
}
export function ranking(term,round='semester',activeIds=null){
 let rows=round==='semester'?(term.results??[]):(term.assessments.find(a=>a.round===round)?.marks??[]).map(m=>({...m,total:Math.round(Object.values(m.marks).reduce((a,b)=>a+b,0)*10)/10,average:m.average,signature:Object.keys(m.marks).sort().join('|')}));
 if(activeIds)rows=rows.filter(r=>!term.rows.some(x=>x.id===r.id)||activeIds.includes(r.id));
 rows=rows.map(row=>({...row,rankingMetric:row.average}));
 const gradeGroups=new Map(),classGroups=new Map();for(const row of rows){for(const [map,key] of [[gradeGroups,'same-grade'],[classGroups,row.classId]]){const list=map.get(key)??[];list.push(row);map.set(key,list);}}
 const grades=new Map([...gradeGroups.values()].flatMap(list=>ranks(list).map(row=>[row.id,row]))),classes=new Map([...classGroups.values()].flatMap(list=>ranks(list).map(row=>[row.id,row])));
 return rows.map(row=>({...row,gradeRank:grades.get(row.id).rank,gradePopulation:grades.get(row.id).population,classRank:classes.get(row.id).rank,classPopulation:classes.get(row.id).population}));
}
