import { readAcademicQualification } from './academics.js';
/** School domain adapter for the existing atomic world transaction. */
import { assertShape } from '../player/panel.js';
import { applySchoolOperation, enrollmentEligibility, homeroomMovementBudget } from '../world/registry.js';
import { ensureRelationships } from '../world/world.js';
import { yearData } from '../calendar/calendar.js';
import { ensure, runtimeOf, findFact } from './model.js';

export function executeSchool(world,op,numericSession){
 assertShape(op,['type','change','basisFactId']);
 const change=op.change,at=world.position.date,plan=runtimeOf(world).plan;
 let numeric=numericSession.world();
 const original=numeric.registry,originalPeople=new Set(Object.keys(numeric.people));
 if(change.type==='school-initialize'){
  ensure(op.basisFactId===null&&!original&&world.enrollments.length===0&&runtimeOf(world).revision===0,'MIGRATION','School initialization requires an untouched runtime');
  ensure(change.academicYear===(plan.startYear??Number(at.slice(0,4))),'TIME','Initial school year differs from calendar');
 }else if(['school-year','school-cohort'].includes(change.type)){
  ensure(op.basisFactId===null,'SCHEMA','Annual school structure uses the calendar boundary');
  const target=change.academicYear??original?.academicYear;
  const y=yearData(target),dayBefore=new Date(Date.parse(`${y.summerCamp}T00:00:00Z`)-86400000).toISOString().slice(0,10);
  ensure(at>=dayBefore&&at<=y.autumnStart,'TIME','Annual affiliations change only at the summer opening boundary');
  if(change.type==='school-year')ensure(target===Number(at.slice(0,4)),'TIME','School year cannot run ahead of time');
 }else{
  ensure(op.basisFactId!==null,'REFERENCE','School changes require an objective causal fact');
  const fact=findFact(world,op.basisFactId);
  if(change.type==='school-graduate')ensure(change.personIds.every(id=>fact.subjectIds.includes(id)),'REFERENCE','Graduation cause must cover every student');
  if(change.personId!==null&&change.personId!==undefined&&numeric.people[change.personId])ensure(fact.subjectIds.includes(change.personId),'REFERENCE','School cause does not concern this person');
  else ensure(fact.subjectIds.includes(world.identity.playerId),'REFERENCE','New identity or arrangement requires a school/teacher cause');
 }
 if(change.type==='school-end-homeroom'){
  const fact=findFact(world,op.basisFactId);
  ensure(fact.data.type==='cohort-completion'&&change.reason===fact.id&&fact.subjectIds.includes(world.identity.playerId),'REFERENCE','Normal duty completion requires its objective cohort fact');
 }
 if(change.type==='school-transfer-plan')ensure(change.source===op.basisFactId,'REFERENCE','Transfer arrangement must retain its causal fact');
 if(change.type==='school-transfer-complete'){const t=numeric.registry?.transfers.find(t=>t.id===change.id);ensure(t?.source===op.basisFactId,'REFERENCE','Transfer completion changed its cause');}
 if(runtimeOf(world).history.some(h=>h.type==='academic')){
  if(change.type==='school-leave'&&change.status==='graduated')ensure(readAcademicQualification(world,change.personId).eligible,'ACADEMIC_QUALIFICATION','Graduation requires actual recorded credits');
  if(change.type==='school-graduate')ensure(change.personIds.every(id=>readAcademicQualification(world,id).eligible),'ACADEMIC_QUALIFICATION','Graduation requires actual recorded credits');
  if(change.type==='school-leave'&&change.status==='course-completed')ensure(readAcademicQualification(world,change.personId).certificateEligible,'ACADEMIC_QUALIFICATION','Course completion certificate requires recorded study and credits');
  if(change.type==='school-leave'&&change.status==='incomplete'){const q=readAcademicQualification(world,change.personId);ensure(q.version===2&&!q.eligible&&!q.certificateEligible,'ACADEMIC_QUALIFICATION','Incomplete qualification differs');}
  if(change.type==='school-enroll'&&change.action==='repeat')ensure(readAcademicQualification(world,change.personId).repeatEligible,'ACADEMIC_QUALIFICATION','Repeat requires an actual academic qualification');
 }
 numeric=applySchoolOperation(numeric,change,at);
 // New families receive the existing N3 priors, never a second numeric formula.
 const pairs=[];
 for(const link of numeric.careLinks){
  if(!originalPeople.has(link.studentId))pairs.push([link.studentId,link.caregiverId],[link.caregiverId,link.studentId]);
 }
 for(const id of numeric.classroom.studentIds)pairs.push([id,world.identity.playerId],[world.identity.playerId,id]);
 numeric=ensureRelationships(numeric,pairs);
 const next=numericSession.snapshot();next.evolution.world=numeric;
 return {snapshot:next,data:{change:structuredClone(change),basisFactId:op.basisFactId}};
}

/** A08 replenishment is an arrangement first; execution rechecks the actual roster. */
export function arrangeReplenishment(world,command,numericSession){
 const numeric=numericSession.world(),r=numeric.registry;
 if(!r||r.academicYear-r.cohortStart>2||numeric.classroom.studentIds.length!==38||homeroomMovementBudget(numeric).joined>=2||r.transfers.some(t=>t.classId===r.homeClassId&&t.status==='scheduled'))return null;
 const cause=[...runtimeOf(world).history].reverse().find(h=>h.type==='school'&&h.factIds.length)?.factIds[0];
 ensure(cause,'REFERENCE','A depleted roster requires an established cause');
 const dueDate=new Date(Date.parse(`${world.position.date}T00:00:00Z`)+7*86400000).toISOString().slice(0,10);
 const op={type:'school',basisFactId:cause,change:{type:'school-transfer-plan',id:`replenish:${command.id}`,classId:r.homeClassId,personId:null,dueDate,source:cause}};
 return executeSchool(world,op,numericSession);
}
export function dueTransfers(numeric,at){
 return (numeric.registry?.transfers??[]).filter(t=>t.status==='scheduled'&&t.dueDate<=at&&(!t.id.startsWith('replenish:')||numeric.classroom.studentIds.length===38)&&enrollmentEligibility(numeric,{...t,action:'transfer-in'}).eligible).map(t=>({type:'school',basisFactId:t.source,change:{type:'school-transfer-complete',id:t.id}}));
}
