/** Reproducible text entry; no parallel simulator, UI, deployment or player database. */
import { mkdir,writeFile } from 'node:fs/promises';
import { performance } from 'node:perf_hooks';
import { pathToFileURL } from 'node:url';
import { procedureWorld,offices,executeProcedure,openProcedure,caseStep,addEvidence,resolveCase,dutyStoryRoute,sourceFact } from '../test/support/procedure-scenario.js';
import { institutionState } from '../src/runtime/procedures.js';
import { runtimeOf,restoreWorldState } from '../src/runtime/model.js';
import { prepareWorldOperation } from '../src/runtime/transactions.js';
import { createSave,encodeSave,restoreSave } from '../src/storage/format.js';
import { request } from '../test/support/runtime.js';
import { academicBaseline } from '../test/support/academic-scenario.js';
import { formalSlot,nextVacationOperation } from '../src/runtime/schedule.js';
import { npcWork } from '../src/runtime/autonomy.js';
import { readActorView } from '../src/runtime/views.js';
import { createId } from '../src/contracts/foundation.js';
export async function procedureScenario(name,seed=74){
 let w,notes={};
 if(name==='A'){
  const routes=[];for(const response of ['accept','refuse','negotiate','protest']){const out=await dutyStoryRoute(seed,response);routes.push({response,duty:institutionState(out.world).duties[0],receipt:out.receipt});if(response==='accept')w=out.world;}
  // Finish/advance the consumed story slot before later institutional work.
  const out=executeProcedure(w,{action:'duty-change',id:'duty:story',mode:'handover',holderId:offices(w,8)[0],until:'2028-06-30'});w=out.world;
  w=executeProcedure(w,{action:'duty-change',id:'duty:story',mode:'end',holderId:offices(w,8)[0],until:null}).world;notes={routes,lessons:runtimeOf(w).plan.tables[0].lessons.length};
 }else if(name==='B'){
  const out=openProcedure(procedureWorld(seed),'gender','report',{childProtection:true,emergency:true});w=out.world;notes={eventSelections:runtimeOf(w).history.filter(h=>h.type==='event-selection').length,measures:institutionState(w).cases[0].obligations};
 }else if(name==='C'){
  const out=openProcedure(procedureWorld(seed),'teacher-conduct','complaint');w=out.world;const c=institutionState(w).cases[0];for(const [i,statement] of ['我記得老師推了同學。','我看到老師拉住快跌倒的同學。'].entries()){
   const sourceId=c.subjectIds[i],record=sourceFact(w,{type:'testimony-statement'},c.subjectIds,[sourceId]);w=record.world;const claimId=createId('claim',[c.id,'testimony',String(i)]);
   w=prepareWorldOperation(w,{...request(w,'testimony-'+i,[{type:'claim',id:claimId,versionId:'1',factId:record.fact.id,statement,sourceId},{type:'learn',actorId:sourceId,claimId,versionId:'1',source:{kind:'observation',actorId:sourceId,basisFactId:record.fact.id},belief:'believed',confidence:.6}]),calendarContext:{kind:'procedure'}}).world;
   w=addEvidence(w,c.id,record.fact.id,i?'partial':'one',i?'partial':'complete',i?['evidence:one']:[]);
  }w=resolveCase(w,out.caseId);notes={finding:institutionState(w).cases[0].finding,teacherContinues:true};
 }else if(name==='D'){
  const out=openProcedure(procedureWorld(seed)),c=institutionState(out.world).cases[0],student=c.subjectIds[0];w=out.world;const parent=w.numeric.evolution.world.careLinks.find(l=>l.studentId===student).caregiverId;
  const doc=sourceFact(w,{type:'testimony',confidential:true,accessIds:[student,c.handlerId]},c.subjectIds,[student]);w=addEvidence(doc.world,c.id,doc.fact.id);
  const claimId=createId('claim',['procedure-demo-private']),ops=[{type:'claim',id:claimId,versionId:'1',factId:doc.fact.id,statement:'我提供的證詞仍有缺漏。',sourceId:student},{type:'learn',actorId:student,claimId,versionId:'1',source:{kind:'observation',actorId:student,basisFactId:doc.fact.id},belief:'uncertain',confidence:.4}];w=prepareWorldOperation(w,{...request(w,'demo-private',ops),calendarContext:{kind:'procedure'}}).world;
  w=prepareWorldOperation(w,{...request(w,'private-npc-reaction',[{type:'npc-update'}]),calendarContext:{kind:'procedure'}}).world;
  notes={actualNpcDecisions:runtimeOf(w).history.filter(h=>h.type==='npc-update').flatMap(h=>h.data.decisions),student:readActorView(w,student).claims,parent:readActorView(w,parent).claims,teacher:readActorView(w,w.identity.playerId).claims,supervisor:readActorView(w,c.handlerId).claims,legalNpcWork:npcWork(w),automaticSchoolDisclosure:false};
 }else if(name==='E'){
  const out=openProcedure(procedureWorld(seed,'2026-09-04','private'),'gender','across-activity');w=out.world;const trace=[];
  for(let i=0;i<5;i++){const slot=formalSlot(w);trace.push({at:w.position,protected:slot.slot.protected,activityIds:slot.slot.activityIds});w=prepareWorldOperation(w,{...request(w,'activity-step-'+i,[{type:'finish-slot',completedActivityIds:slot.slot.activityIds},{type:'advance-time',planId:runtimeOf(w).plan.id,steps:1}]),calendarContext:{kind:'procedure'}}).world;}
  const holiday=openProcedure(procedureWorld(seed,'2026-08-17','vacation-day'),'counselling','vacation');let v=holiday.world;
  v=prepareWorldOperation(v,{...request(v,'vacation-plan',[{type:'plan-vacation',id:'procedure-vacation',weeks:1,direction:'rest'}]),calendarContext:{kind:'routine'}}).world;
  const driverBefore=nextVacationOperation(v);v=prepareWorldOperation(v,driverBefore.request).world;
  const pending=await dutyStoryRoute(seed,'negotiate',{date:'2026-08-17',slot:'vacation-day'});let decisionWorld=pending.pending;
  decisionWorld=prepareWorldOperation(decisionWorld,{...request(decisionWorld,'pending-vacation-plan',[{type:'plan-vacation',id:'pending-vacation',weeks:1,direction:'private-life'}]),calendarContext:{kind:'routine'}}).world;
  const interrupted=nextVacationOperation(restoreWorldState(decisionWorld));if(interrupted.status!=='decision-required')throw Error('vacation skipped required player decision');
  decisionWorld=prepareWorldOperation(decisionWorld,request(decisionWorld,'vacation-confirm',[{type:'story',eventId:pending.eventId,action:'confirm',optionId:null}])).world;
  decisionWorld=prepareWorldOperation(decisionWorld,request(decisionWorld,'vacation-finish',[{type:'story',eventId:pending.eventId,action:'finish',optionId:null}])).world;
  const resumed=nextVacationOperation(decisionWorld);notes={interrupted,resumed:resumed.status,resumedDirection:resumed.direction,trace,vacationDate:v.position.date,driverAfter:nextVacationOperation(restoreWorldState(v)),eventsAdded:runtimeOf(w).history.filter(h=>h.type==='event-selection').length};
 }else if(name==='F'){
  w=procedureWorld(seed);w=executeProcedure(w,{action:'duty-offer',id:'duty:long',personId:w.identity.playerId,kind:'project',description:'跨學期多年計畫',until:'2030-06-30',endCondition:'交接或完成',mandatory:false}).world;w=executeProcedure(w,{action:'duty-response',id:'duty:long',response:'accept'},w.identity.playerId).world;
  let repeated;for(const kind of ['gender','bullying','counselling','employment']){const out=openProcedure(w,kind,'parallel-'+kind);w=out.world;repeated=out.request;}
  const before=JSON.stringify(w),serialized=encodeSave(createSave(w)),start=performance.now(),restored=restoreSave(serialized).world,restoreMs=performance.now()-start;const duplicate=prepareWorldOperation(restored,repeated);if(JSON.stringify(duplicate.world)!==before)throw Error('restore/resend changed world');
  const old=offices(w,3)[0],next=offices(w,3)[1],caseId=institutionState(w).cases.find(c=>c.kind==='gender').id;w=executeProcedure(w,{action:'handover',caseId,handlerId:next}).world;
  const personnel=sourceFact(w,{type:'personnel-order'},[old],[offices(w,1)[0]]);w=personnel.world;w=prepareWorldOperation(w,{...request(w,'personnel-change',[{type:'school',basisFactId:personnel.fact.id,change:{type:'school-staff',personId:old,roleIds:[8]}},{type:'school',basisFactId:personnel.fact.id,change:{type:'school-assignment',id:'appointment:former-handler',personId:old,roleId:8,classId:null,endsId:w.numeric.evolution.world.registry.assignments.find(a=>a.personId===old&&a.roleId===3&&a.until===null).id}}]),calendarContext:{kind:'procedure'}}).world;
  notes={bytes:new TextEncoder().encode(serialized).length,restoreMs,duplicate:duplicate.duplicate,personIdPreserved:!!w.numeric.evolution.world.people[old],newHandler:next,historyPreserved:institutionState(w).cases.find(c=>c.id===caseId).history};
 }else throw Error('scenario A–F required');
 const encoded=encodeSave(createSave(w));if(JSON.stringify(restoreSave(encoded).world)!==JSON.stringify(w))throw Error('save roundtrip mismatch');
 return {scenario:name,seed,kind:'production-world-operations-on-engineering-fixture',position:w.position,notes,state:institutionState(w),receipts:runtimeOf(w).commits,saveBytes:new TextEncoder().encode(encoded).length,world:w};
}
async function main(){
 const arg=process.argv.find(a=>a.startsWith('--scenario=')),names=arg?[arg.split('=')[1]]:['A','B','C','D','E','F'],seed=Number(process.argv.find(a=>a.startsWith('--seed='))?.split('=')[1]??74),reports=[];await mkdir('work/procedures',{recursive:true});
 for(const name of names){const report=await procedureScenario(name,seed);await writeFile('work/procedures/'+name+'.json',JSON.stringify(report,null,2)+'\n');reports.push({scenario:name,position:report.position,notes:report.notes,saveBytes:report.saveBytes,cases:report.state.cases.length,duties:report.state.duties.length,restored:true});console.log(JSON.stringify(reports.at(-1),null,2));}
 await writeFile('work/procedures/summary.json',JSON.stringify(reports,null,2)+'\n');
}
if(process.argv[1]&&pathToFileURL(process.argv[1]).href===import.meta.url)main().catch(e=>{console.error(e);process.exitCode=1;});
