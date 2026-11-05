/** Internal domain compiler. It never commits, rates, freezes or advances a world.
 * Both career controllers consume these operations inside their owned transaction. */
import { assertShape } from '../player/panel.js';
import { createId } from '../contracts/foundation.js';
import { canonicalData } from '../changes/settlement.js';
import { academicState,readAcademicQualification } from './academics.js';
const r=w=>w.extensions['teacher-hell/world'];
const need=(v,m)=>{if(!v)throw new RangeError(`COHORT: ${m}`);};
const same=(a,b)=>canonicalData(a)===canonicalData(b);

export function compileCohortCompletion(w,operationId,{terminal=false}={}){
 const n=w.numeric.evolution.world,registry=n.registry,classId=registry.homeClassId;
 need(!r(w).history.some(h=>h.type==='cohort-completion'&&h.data.classId===classId),'class already completed');
 need(!terminal||registry.academicYear===registry.cohortStart+2,'grade three required');
 const entries=registry.enrollments.filter(e=>e.until===null&&(terminal?e.classId===classId:registry.academicYear-registry.classes[e.classId].cohortStart>=2));
 need(same(entries.filter(e=>e.classId===classId).map(e=>e.personId),n.classroom.studentIds),'current roster differs from active enrollments');
 const academics=academicState(w),outcomes=entries.map(e=>({personId:e.personId,qualification:readAcademicQualification(w,e.personId,academics)}));
 const eventId=createId('event',[operationId,'cohort-completion']),stageId=createId('stage',[operationId,'cohort-completion']),factId=createId('fact',[operationId,'cohort-completion']),subjectIds=[w.identity.playerId,...outcomes.map(o=>o.personId)];
 const operations=[{type:'open-event',event:{schemaVersion:1,id:eventId,definitionId:'procedure:cohort-completion',contentVersion:'school-v1',type:'direct',participantIds:subjectIds,stageId,facts:[],knowledge:[],results:[],choice:null}},
  {type:'fact',id:factId,eventId,stageId,subjectIds,witnessIds:[w.identity.playerId],description:'學校依三年學業紀錄確認本屆學生畢業或延修資格，保留人物及學籍歷史。',data:{type:'cohort-completion',outcomes},categoryCodes:[],causeIds:[]},
  {type:'reveal',actorId:w.identity.playerId,factId,source:{kind:'observation',actorId:w.identity.playerId,basisFactId:factId}},
  ...outcomes.map(o=>({type:'school',basisFactId:factId,change:{type:'school-leave',personId:o.personId,status:o.qualification.eligible?'graduated':'delayed',reason:factId}}))];
 if(terminal)operations.push({type:'school',basisFactId:factId,change:{type:'school-end-homeroom',classId,reason:factId}});
 return {operations,archive:{eventId,stageId,factIds:[factId],data:{classId,outcomes}}};
}

/** Reconstruct ONLY the affiliation delta of a verified completion. Numeric values,
 * relationships, academics and all unrelated later changes remain subject to their
 * existing validators. Order, not the date alone, identifies the earlier roster. */
export function beforeCohortCompletion(w,completion){
 const n=w.numeric.evolution.world,registry=n.registry,rows=r(w).history.filter(h=>h.operationId===completion.operationId&&h.attemptId===completion.attemptId&&h.type==='school'&&h.order<completion.order);
 const enrollments=registry.enrollments.map(e=>{
  const row=rows.find(h=>h.data.change.type==='school-leave'&&h.data.change.personId===e.personId&&h.data.basisFactId===completion.factIds[0]&&e.until===h.at.date&&e.status===h.data.change.status);
  return row?{...e,until:null,status:'enrolled'}:e;
 });
 const classId=completion.data.classId,studentIds=enrollments.filter(e=>e.classId===classId&&e.until===null).map(e=>e.personId);
 const current=new Map(enrollments.filter(e=>e.until===null).map(e=>[e.personId,e]));
 const people=Object.fromEntries(Object.entries(n.people).map(([id,p])=>{
  if(p.kind!=='student')return [id,p];
  const e=current.get(id),c=e?registry.classes[e.classId]:null,role=!c?18:e.classId===classId?11:c.cohortStart===registry.cohortStart?12:13;
  return [id,{...p,roleIds:[...p.roleIds.filter(id=>![11,12,13,18].includes(id)),role].sort((a,b)=>a-b)}];
 }));
 return {...w,numeric:{...w.numeric,evolution:{...w.numeric.evolution,world:{...n,people,classroom:{...n.classroom,id:classId,studentIds,values:registry.classes[classId].values??n.classroom.values},registry:{...registry,homeClassId:classId,enrollments}}}}};
}

/** Replay membership from the original forty and actual affiliation receipts.
 * This also detects a pupil silently removed from BOTH outcomes and current registry.
 * It never interprets all historical names as still enrolled. */
function rosterFromReceipts(w,h,terminal){
 const registry=w.numeric.evolution.world.registry,cohort=registry.cohorts.find(c=>c.classId===h.data.classId);
 need(cohort,'original cohort roster missing');
 const active=new Map(cohort.initialStudentIds.map(id=>[id,cohort.classId])),used=new Set(cohort.initialStudentIds);
 for(const row of r(w).history.slice(0,h.order-1)){
  if(row.type!=='school'||row.data.basisFactId===h.factIds[0])continue;
  const op=row.data.change;
  if(op.type==='school-leave')active.delete(op.personId);
  if(op.type==='school-graduate')for(const id of op.personIds)active.delete(id);
  if(op.type==='school-enroll'||op.type==='school-transfer-complete'){
   const transfer=op.type==='school-transfer-complete'?registry.transfers.find(t=>t.id===op.id):null;
   const classId=transfer?.classId??op.classId;
   let personId=transfer?.personId??op.personId;
   if(personId===null){
    const entry=registry.enrollments.find(e=>e.classId===classId&&e.from===row.at.date&&e.reason===op.source&&!used.has(e.personId));
    need(entry,'transfer receipt lacks its durable student identity');personId=entry.personId;used.add(personId);
   }
   active.delete(personId);
   if(registry.classes[classId]?.cohortStart===cohort.startYear)active.set(personId,classId);
  }
 }
 return [...active].filter(([,classId])=>!terminal||classId===cohort.classId).map(([id])=>id);
}

/** Every archive must prove a one-to-one qualified active-roster -> causal leave.
 * Called during full restore, after the journal's facts/receipts have been checked. */
export function validateCohortCompletions(w){
 const history=r(w).history,seen=new Set();
 for(const h of history.filter(h=>h.type==='cohort-completion')){
  need(!seen.has(h.data.classId),'duplicate class completion');seen.add(h.data.classId);
  const transition=history.find(s=>s.type==='year-transition'&&s.operationId===h.operationId&&s.attemptId===h.attemptId&&s.order>h.order);
  const terminal=history.find(s=>s.type==='career-completion'&&s.operationId===h.operationId&&s.attemptId===h.attemptId&&s.order>h.order);
  const three=r(w).plan.career?.mode==='three-year';
  need(three?terminal&&!transition:transition,'completion requires its atomic year transition or complete three-year terminal');
  const success=history.find(s=>s.type==='annual-success'&&(three?s.operationId===h.operationId&&s.data.year===3:s.id===transition.data.successId)&&s.order<h.order);
  if(three)need(terminal.data.years===3&&terminal.data.annualIds.includes(success?.id)&&success.order<r(w).facts.find(f=>f.id===h.factIds[0])?.order,'three-year completion lacks its ordered annual/terminal sources');
  const owner=r(w).commits.find(c=>c.id===h.operationId&&c.attemptId===h.attemptId),operations=owner&&JSON.parse(owner.request).operations;
  need(w.extensions['teacher-hell/annual-observations']&&success&&operations?.length===1&&operations[0].type===(three?'settle-school-year':'transition-school-year'),'completion lacks its verified annual source/transaction');
  validateCohortArchive(w,h);
 }
}

/** Lower-domain archive audit, also usable on T4's not-yet-published draft.
 * This does not certify an annual result or authorize publishing a terminal. */
export function validateCohortArchive(w,h){
 const history=r(w).history;
 assertShape(h.data,['classId','outcomes']);
  const before=beforeCohortCompletion(w,h),registry=before.numeric.evolution.world.registry;
  const endings=history.filter(s=>s.type==='school'&&s.operationId===h.operationId&&s.attemptId===h.attemptId&&s.data.change.type==='school-end-homeroom');
  need(endings.length<=1,'duplicate normal duty completion');
  if(endings.length)need(endings[0].order<h.order&&same(endings[0].data,{basisFactId:h.factIds[0],change:{type:'school-end-homeroom',classId:h.data.classId,reason:h.factIds[0]}}),'normal duty completion changed its source');
  if(endings.length)need(registry.assignments.some(a=>a.personId===w.identity.playerId&&a.roleId===9&&a.classId===h.data.classId&&a.until===h.at.date&&(!w.extensions['teacher-hell/homeroom-continuity']||a.id===w.extensions['teacher-hell/homeroom-continuity'].assignmentId))&&!registry.assignments.some(a=>a.personId===w.identity.playerId&&a.roleId===9&&a.classId===h.data.classId&&a.until===null),'normal duty completion lacks its actual dated assignment end');
  const active=registry.enrollments.filter(e=>e.until===null&&e.from<=h.at.date&&(endings.length?e.classId===h.data.classId:registry.classes[e.classId].cohortStart===registry.classes[h.data.classId].cohortStart));
  need(same(active.map(e=>e.personId),h.data.outcomes.map(o=>o.personId)),'completion does not cover the actual active cohort');
  need(same(rosterFromReceipts(w,h,!!endings.length),active.map(e=>e.personId)),'completion roster differs from original roster and affiliation receipts');
  const prefix={...before,position:{...w.position,date:h.at.date},extensions:{...w.extensions,'teacher-hell/world':{...r(w),history:history.slice(0,h.order-1)}}},academics=academicState(prefix);
  const fact=r(w).facts.find(f=>f.id===h.factIds[0]);
  need(h.factIds.length===1&&fact?.eventId===h.eventId&&fact.stageId===h.stageId&&history[fact.order-1]?.operationId===h.operationId&&fact.order<h.order&&same(fact.data,{type:'cohort-completion',outcomes:h.data.outcomes})&&same(fact.subjectIds,[w.identity.playerId,...active.map(e=>e.personId)]),'completion fact differs from qualification archive');
  const rows=history.filter(s=>s.type==='school'&&s.operationId===h.operationId&&s.attemptId===h.attemptId&&s.data.change.type==='school-leave');
  need(rows.length===active.length,'missing or duplicate completion leaves');
  for(const o of h.data.outcomes){
   need(same(o.qualification,readAcademicQualification(prefix,o.personId,academics)),'cohort qualification changed');
   const matches=rows.filter(s=>s.data.change.personId===o.personId);
   need(matches.length===1&&matches[0].order>fact.order&&matches[0].order<h.order&&same(matches[0].data,{basisFactId:fact.id,change:{type:'school-leave',personId:o.personId,status:o.qualification.eligible?'graduated':'delayed',reason:fact.id}}),'individual graduation or extension lacks its ordered causal receipt');
  }
}
