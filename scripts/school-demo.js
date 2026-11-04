/** Engineering CLI only: fixed dated baselines call the production school operations. */
import { mkdir,writeFile } from 'node:fs/promises';
import { performance } from 'node:perf_hooks';
import { academicWorld,academicBaseline,academicCause,applySchool,completeAcademic,academicStoryRoute } from '../test/support/academic-scenario.js';
import { academicState,readGrades,readRankings } from '../src/runtime/academics.js';
import { schoolActions } from '../src/runtime/campus.js';
import { runtimeOf,restoreWorldState } from '../src/runtime/model.js';
import { prepareWorldOperation } from '../src/runtime/transactions.js';
import { request } from '../test/support/runtime.js';
import { semester } from '../src/calendar/calendar.js';
import { createSave,encodeSave,restoreSave } from '../src/storage/format.js';
const args=Object.fromEntries(process.argv.slice(2).map(a=>{const [k,v]=a.replace(/^--/,'').split('=');return [k,v];}));
for(const key of Object.keys(args))if(!['scenario','seed'].includes(key))throw Error('Use --scenario=A|B|C|D|E|F|all --seed=74');
const seed=Number(args.seed??74),scenario=args.scenario??'all';if(!Number.isInteger(seed)||!['A','B','C','D','E','F','all'].includes(scenario))throw Error('Invalid scenario/seed');
await mkdir('work',{recursive:true});
const reports={provenance:'engineering fixed legal date baselines; skipped dates are not full-semester gameplay',seed,scenarios:{}};
async function save(name,w,report){const text=encodeSave(createSave(w)),before=performance.now(),restored=restoreSave(text);if(JSON.stringify(restored.world)!==JSON.stringify(w))throw Error('Save mismatch');await writeFile(`work/school-${name}.json`,text);reports.scenarios[name]={...report,saveBytes:Buffer.byteLength(text),restoreMs:performance.now()-before,restored:true};}
for(const name of scenario==='all'?['A','B','C','D','E','F']:[scenario]){
 const begin=performance.now();
 if(name==='A'){
  let w=academicWorld(seed),start=w.position,actions=[];
  while(w.position.date===start.date){const choices=schoolActions(w),activity=choices.includes('automatic')?'automatic':choices.includes('routine')?'routine':choices.includes('prepare')?'prepare':choices.includes('supervise')?'supervise':'rest';actions.push({at:w.position,activity});w=applySchool(w,[{type:'school-action',activity}]);}
  await save(name,w,{actions,lessonCount:runtimeOf(w).history.filter(h=>h.type==='campus'&&h.data.slot.lesson).length,numericReceipts:w.numeric.receipts.length});
 }else if(name==='B'||name==='D'||name==='F'){
  let w=completeAcademic(seed),state=academicState(w),term=state.terms['2026:autumn'];
  if(name==='D'){
   const candidate=term.results.flatMap(row=>(row.courses??[]).filter(c=>c.makeupEligible&&state.students[row.id]).map(c=>({personId:row.id,subject:c.subject})))[0];if(!candidate)throw Error('Seed has no makeup candidate; use seed 74');
   w=applySchool(w,[{type:'academic',action:'makeup',termId:term.termId,...candidate}]);const course=readGrades(w,candidate.personId,term.termId).semester.courses.find(c=>c.subject===candidate.subject);
   let duplicateRejected=false;try{applySchool(w,[{type:'academic',action:'makeup',termId:term.termId,...candidate}]);}catch{duplicateRejected=true;}
   await save(name,w,{candidate,course,duplicateRejected});
  }else if(name==='F'){
   const personId=w.numeric.evolution.world.classroom.studentIds[0],q={...request(w,'publish-fixed',[{type:'academic',action:'publish',termId:term.termId,personId}]),calendarContext:{kind:'procedure'}},result=prepareWorldOperation(w,q);w=restoreWorldState(JSON.stringify(result.world));await save(name,w,{exactRandom:JSON.stringify(w.random)===JSON.stringify(result.world.random),resend:prepareWorldOperation(w,q).duplicate,studentKnows:runtimeOf(w).knowledge.some(k=>k.actorId===personId)});
  }else{const ids=w.numeric.evolution.world.classroom.studentIds;await save(name,w,{student:readGrades(w,ids[0],term.termId),ranking:readRankings(w,term.termId).filter(row=>ids.includes(row.id)).map(({id,total,average,classRank,gradeRank,gradePopulation})=>({id,total,average,classRank,gradeRank,gradePopulation}))});}
 }else if(name==='C'){
  const meta=semester('2026:autumn'),outputs=[];let personId;
  for(const option of ['listen','angry']){const route=await academicStoryRoute(seed,option);let w=route.world;personId=route.personId;const basis=runtimeOf(w).history.findLast(h=>h.type==='academic'&&h.data.operation.action==='influence');w=academicBaseline(w,meta.exams[0].at(-1));w=applySchool(w,[{type:'academic',action:'assess',termId:meta.id,round:1}]);outputs.push({option,eventId:route.eventId,basisFactId:basis.data.input.basisFactId,grade:readGrades(w,personId,meta.id).assessments,state:academicState(w).students[personId].subjects.國文.state});await writeFile(`work/school-C-${option}.json`,encodeSave(createSave(w)));}
  reports.scenarios.C={personId,outputs};
 }else if(name==='E'){
  let w=academicWorld(seed,'2026-09-05','morning');w=applySchool(w,[{type:'school-action',activity:'automatic'}]);const outcomes=runtimeOf(w).history.filter(h=>h.type==='campus');await save(name,w,{outcomes:outcomes.map(h=>({at:h.at,activityIds:h.data.slot.activityIds,lesson:h.data.slot.lesson})),formalAdmissions:runtimeOf(w).history.filter(h=>h.data.calendarAdmission).length});
 }
 reports.scenarios[name].elapsedMs=performance.now()-begin;
 console.log('Scenario',name,JSON.stringify(reports.scenarios[name]));
}
await writeFile('work/school-demo-report.json',JSON.stringify(reports,null,2)+'\n');
