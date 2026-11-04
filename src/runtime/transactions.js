import { compileAcademic,academicState } from './academics.js';
import { compileCampus,schoolEnabled,schoolActions,schoolEventOccupied } from './campus.js';
import { formalSlot } from './schedule.js';
import { semester,teachingTerm } from '../calendar/calendar.js';
import { createRelationship, createReputation, directedKey, contactKey } from '../world/relationships.js';
import { compileNpcUpdate, checkNpcGroup, compileNpcClarification } from './autonomy.js';
import { compileStory, guardStoryOperation, storyContent } from './story.js';
import { registerEventCatalogue, selectWorldEvents, admissionEvent, lifecycleChange, eventExposure, guardSelectedProgress } from './event-selection.js';
import { initializeRegistry, schoolCatalogue } from '../world/registry.js';
import { careerRange } from '../calendar/calendar.js';
import { SUBJECT_LOAD } from '../calendar/timetable.js';
import { executeSchool, arrangeReplenishment, dueTransfers } from './school.js';
import { deriveWorldPanel } from '../social/reputation.js';
import { STATE_NAMES } from '../player/panel.js';
import { isFormal, planPosition, planVacation, createCalendarBaseline, guardCalendarOperation, calendarAdmission, finishCalendarSlot, advanceFormalSlot, prepareSemester } from './schedule.js';
import { createId, validateId, validateEventEnvelope, restoreFoundationEnvelope, schoolEnrollmentReferences } from '../contracts/foundation.js';
import { canonicalData, createSettlementSession, startSettlement } from '../changes/settlement.js';
import { targetRecord } from '../changes/targets.js';
import { createRandom, restoreRandom } from '../numeric/random.js';
import { assertShape, identifier } from '../player/panel.js';
import { probability } from '../numeric/math.js';
import { validateRoles } from '../world/roles.js';
import { WORLD_KEY, WorldError, ensure, same, runtimeOf, key, momentOf, knownActor, findEvent, findFact, findClaim, findKnowledge, knowledgeReferences, validatePlan, validateSource, restoreWorldState } from './model.js';

const clone=value=>structuredClone(value);
function history(world,command,type,eventId,stageId,factIds,data) {
  const r=runtimeOf(world),order=r.history.length+1;
  const entry={id:createId('history',[world.identity.attemptId,command.id,String(order)]),order,operationId:command.id,attemptId:world.identity.attemptId,
    type,eventId,stageId,factIds:[...factIds],at:momentOf(world),cursor:r.plan.cursor,data:clone(data)};
  r.history.push(entry);return entry;
}
function atCurrentStage(world,eventId,stageId) {
  const event=findEvent(world,eventId);ensure(event.stageId===stageId,'STAGE','Operation targets a different current stage');return event;
}
function involve(event,...ids) { event.participantIds=[...new Set([...event.participantIds,...ids])]; }
function syncReferences(world) { for(const event of world.events)event.knowledge=knowledgeReferences(world,event); }
function naturalAt(world,numericSession,position) {
  numericSession.advanceDay({date:position.date,schoolYearId:position.schoolYearId,openingId:position.openingId,serviceYear:position.serviceYear});
}
function preconditions(world,conditions) {
  ensure(Array.isArray(conditions),'SCHEMA','Preconditions required');
  for(const c of conditions){
    if(c.type==='at') {assertShape(c,['type','date','slotId']);ensure(same(momentOf(world),{date:c.date,slotId:c.slotId}),'PRECONDITION','Wrong date/slot');}
    else if(c.type==='fact') {assertShape(c,['type','id']);findFact(world,c.id);}
    else if(c.type==='knows') {assertShape(c,['type','actorId','claimId','versionId']);ensure(findKnowledge(world,c.actorId,c.claimId,c.versionId),'PRECONDITION','Actor lacks required information');}
    else if(c.type==='choice-open') {assertShape(c,['type','eventId','stageId']);const e=atCurrentStage(world,c.eventId,c.stageId);ensure(e.choice&&e.choice.confirmedOptionId===null,'PRECONDITION','Choice is not open');}
    else throw new WorldError('PRECONDITION','Unknown precondition');
  }
}
function execute(world,command,op,numericSession,receipt,selectedAdmission=false,storyInternal=false,npcInternal=false) {
  const r=runtimeOf(world);
  guardStoryOperation(world,op,storyInternal||npcInternal);
  if(!npcInternal&&!(storyInternal&&op.type==='academic'))guardCalendarOperation(world,command,op);
  guardSelectedProgress(world,op);
  if(op.type==='academic'){
    ensure(command.actorId===world.identity.playerId,'ACTOR','Academic operations belong to the teacher');
    world.numeric=numericSession.snapshot();const data=compileAcademic(world,op);world.random.academics=data.randomAfter;history(world,command,'academic',null,null,op.basisFactId?[op.basisFactId]:[],data);
    if(op.action==='publish'){
      const make=kind=>createId(kind,[world.identity.attemptId,'academic-report',data.input.termId,op.personId]),eventId=make('event'),stageId=make('stage'),factId=make('fact'),claimId=make('claim'),accessId=createId('fact',[factId,'student-access']),teacher=world.identity.playerId;
      const children=[{type:'open-event',event:{schemaVersion:1,id:eventId,definitionId:'procedure:academic-report',contentVersion:'school-v1',type:'direct',participantIds:[teacher,op.personId],stageId,facts:[],knowledge:[],results:[],choice:null}},
       {type:'fact',id:factId,eventId,stageId,subjectIds:[teacher,op.personId],witnessIds:[teacher],description:'學校完成當期客觀成績通知。',data:{type:'academic-report',...data.result},categoryCodes:[],causeIds:[]},
       {type:'claim',id:claimId,versionId:'report-v1',factId,statement:'學生取得本學期成績通知，平均為'+data.result.average+'。',sourceId:teacher},
       {type:'learn',actorId:teacher,claimId,versionId:'report-v1',source:{kind:'observation',actorId:teacher,basisFactId:factId},belief:'believed',confidence:1},
       {type:'fact',id:accessId,eventId,stageId,subjectIds:[op.personId],witnessIds:[op.personId],description:'學生取得自己的成績通知。',data:{type:'access',claimRefs:[{id:claimId,versionId:'report-v1'}]},categoryCodes:[],causeIds:[factId]},
       {type:'learn',actorId:op.personId,claimId,versionId:'report-v1',source:{kind:'document',actorId:op.personId,basisFactId:accessId},belief:'believed',confidence:1}];
      for(const child of children)numericSession=execute(world,command,child,numericSession,receipt,false,false,true);
    }
  } else if(op.type==='campus'){
    assertShape(op,['type','activity']);world.numeric=numericSession.snapshot();const data=compileCampus(world,op.activity);
    for(const child of data.operations)numericSession=execute(world,command,child,numericSession,receipt,false,false,true);
    world.random.campus=data.randomAfter;history(world,command,'campus',null,null,[],data);
  } else if(op.type==='school-action'){
    assertShape(op,['type','activity']);ensure(schoolEnabled(world),'SCHOOL','Open academic term before school actions');
    numericSession=execute(world,command,{type:'campus',activity:op.activity},numericSession,receipt);
    numericSession=execute(world,command,{type:'finish-slot',completedActivityIds:formalSlot(world).slot.activityIds},numericSession,receipt);
    return execute(world,command,{type:'advance-time',planId:r.plan.id,steps:1},numericSession,receipt);
  } else if(op.type==='npc-update'){
    assertShape(op,['type']);world.numeric=numericSession.snapshot();
    const data=compileNpcUpdate(world);
    if(data.duplicate)return numericSession;
    if(!data.decisions.length)return numericSession;
    for(const child of data.operations)numericSession=execute(world,command,child,numericSession,receipt,false,false,true);
    world.random.social=data.randomAfter;
    history(world,command,'npc-update',null,null,[],data);
  } else if(op.type==='npc-clarify'){
    const beforeOrder=r.history.length+1,operations=compileNpcClarification(world,op);
    for(const child of operations)numericSession=execute(world,command,child,numericSession,receipt,false,false,true);
    history(world,command,'npc-clarify',null,null,[],{operation:op,operations,beforeOrder});
  } else if(op.type==='npc-group'){
    history(world,command,'npc-group',null,null,[op.basisFactId],checkNpcGroup(world,op));
  } else if(op.type==='story'){
    ensure(command.actorId===world.identity.playerId,'ACTOR','Only the player operates a story');
    if(op.action==='confirm')naturalAt(world,numericSession,world.position);
    world.numeric=numericSession.snapshot();
    const compiled=compileStory(world,op);
    const beforePanel=deriveWorldPanel(numericSession.world());
    for(const child of compiled.operations)numericSession=execute(world,command,child,numericSession,receipt,false,op.eventId);
    const panel=deriveWorldPanel(numericSession.world());
    compiled.state.panelDelta=Object.fromEntries(Object.keys(panel).map(k=>[k,compiled.state.panelDelta[k]+(op.action==='confirm'?panel[k]-beforePanel[k]:0)]));
    history(world,command,'story',op.eventId,world.events.find(e=>e.id===op.eventId).stageId,[],{action:clone(op),state:compiled.state,operations:compiled.operations,inputs:compiled.inputs});
  } else if(op.type==='register-event-catalogue'){
    history(world,command,'event-catalogue',null,null,[],registerEventCatalogue(world,op));
  } else if(op.type==='draw-events'){
    world.numeric=numericSession.snapshot();
    const data=selectWorldEvents(world,op,command,receipt);
    history(world,command,'event-selection',null,null,[],data);
  } else if(op.type==='admit-event'){
    const event=admissionEvent(world,op);
    numericSession=execute(world,command,{type:'open-event',event},numericSession,receipt,true);
    history(world,command,'event-lifecycle',event.id,event.stageId,[],{previous:'reserved',status:'active',basisFactId:null});
    if(storyContent(world,event.id))numericSession=execute(world,command,{type:'story',eventId:event.id,action:'start',optionId:null},numericSession,receipt);
  } else if(op.type==='event-exposure'){
    const data=eventExposure(world,op),event=findEvent(world,op.eventId);
    history(world,command,'event-exposure',event.id,event.stageId,[op.basisFactId],data);
  } else if(op.type==='event-lifecycle'){
    const data=lifecycleChange(world,op),event=findEvent(world,op.eventId);
    history(world,command,'event-lifecycle',event.id,event.stageId,[op.basisFactId],data);
  } else if(op.type==='school'){
    const result=executeSchool(world,op,numericSession);
    history(world,command,'school',null,null,op.basisFactId===null?[]:[op.basisFactId],result.data);
    world.numeric=clone(result.snapshot);
    numericSession=createSettlementSession(result.snapshot);
    if(schoolEnabled(world)&&['school-enroll','school-leave','school-transfer-complete'].includes(op.change.type)){const term=teachingTerm(world.position.date);if(term&&academicState(world).terms[term.id]&&!academicState(world).terms[term.id].closed)return execute(world,command,{type:'academic',action:'sync',termId:term.id},numericSession,receipt,false,false,true);}
    return numericSession;
  } else if(op.type==='open-event') {
    assertShape(op,['type','event']);validateEventEnvelope(op.event);
    ensure(selectedAdmission||/^(synthetic:|procedure:|activity:)/.test(op.event.definitionId),'EVENT_SELECTION','Formal events must use a locked selection admission');
    ensure(!world.events.some(e=>e.id===op.event.id),'DUPLICATE','Event ID already exists');
    ensure(!op.event.facts.length&&!op.event.knowledge.length&&!op.event.results.length&&op.event.choice?.confirmedOptionId==null,'SCHEMA','Open an empty event; create facts/results through operations');
    ensure(!r.stages.some(s=>s.id===op.event.stageId),'DUPLICATE','Stage already exists');
    op.event.participantIds.forEach(id=>knownActor(world,id));world.events.push(clone(op.event));
    const admission=npcInternal?null:calendarAdmission(world,command);
    const h=history(world,command,'stage',op.event.id,op.event.stageId,[],{definitionId:op.event.definitionId,...(admission?{calendarAdmission:admission}:{})});
    r.stages.push({id:op.event.stageId,eventId:op.event.id,order:h.order});
  } else if(op.type==='fact') {
    assertShape(op,['type','id','eventId','stageId','subjectIds','witnessIds','description','data','categoryCodes','causeIds']);
    const event=atCurrentStage(world,op.eventId,op.stageId);validateId(op.id,'fact');identifier(op.description);
    ensure(!r.facts.some(f=>f.id===op.id),'DUPLICATE','Objective fact already exists');
    ensure(Array.isArray(op.subjectIds)&&op.subjectIds.length>0&&Array.isArray(op.witnessIds)&&Array.isArray(op.causeIds),'SCHEMA','Explicit fact subjects, witnesses and causes required');
    [...op.subjectIds,...op.witnessIds].forEach(id=>knownActor(world,id));op.causeIds.forEach(id=>findFact(world,id));
    involve(event,...op.subjectIds,...op.witnessIds);
    const h=history(world,command,'fact',event.id,event.stageId,op.causeIds,{factId:op.id});
    const fact={id:op.id,eventId:event.id,stageId:event.stageId,subjectIds:clone(op.subjectIds),witnessIds:clone(op.witnessIds),description:op.description,
      occurredAt:momentOf(world),cursor:r.plan.cursor,order:h.order,categoryCodes:clone(op.categoryCodes),causeIds:clone(op.causeIds),data:clone(op.data)};
    r.facts.push(fact);event.facts.push({id:fact.id,subjectIds:clone(fact.subjectIds),occurredAt:momentOf(world)});
    if(fact.data.type==='contact'){
      const snapshot=numericSession.snapshot(),n=snapshot.evolution.world,rng=restoreRandom(n.random.relationships);
      for(const a of fact.subjectIds)for(const b of fact.subjectIds)if(a!==b&&!n.relationships[directedKey(a,b)]){
        const contact=contactKey(a,b);n.contacts[contact]??={a,b,reference:fact.id};
        n.relationships[directedKey(a,b)]=createRelationship(n,a,b,rng);
        if(b===world.identity.playerId)n.reputations[directedKey(a,b)]=createReputation(n,a,b,rng);
      }
      n.random.relationships=rng.snapshot();numericSession=createSettlementSession(snapshot);world.numeric=clone(snapshot);
    }

  } else if(op.type==='link-fact') {
    assertShape(op,['type','eventId','stageId','factId']);const e=atCurrentStage(world,op.eventId,op.stageId),f=findFact(world,op.factId);
    ensure(!e.facts.some(ref=>ref.id===f.id),'DUPLICATE','Fact already linked');involve(e,...f.subjectIds);
    e.facts.push({id:f.id,subjectIds:clone(f.subjectIds),occurredAt:clone(f.occurredAt)});
    history(world,command,'link',e.id,e.stageId,[f.id],{});
  } else if(op.type==='claim') {
    assertShape(op,['type','id','versionId','factId','statement','sourceId']);validateId(op.id,'claim');identifier(op.versionId);identifier(op.statement);knownActor(world,op.sourceId);
    const fact=findFact(world,op.factId);ensure(!r.claims.some(c=>c.id===op.id&&c.versionId===op.versionId),'DUPLICATE','Claim version already exists');
    const h=history(world,command,'claim',fact.eventId,fact.stageId,[fact.id],{claimId:op.id,versionId:op.versionId});
    r.claims.push({id:op.id,versionId:op.versionId,factId:fact.id,statement:op.statement,sourceId:op.sourceId,at:momentOf(world),cursor:r.plan.cursor,order:h.order});
  } else if(op.type==='learn') {
    assertShape(op,['type','actorId','claimId','versionId','source','belief','confidence']);const c=findClaim(world,op.claimId,op.versionId),f=findFact(world,c.factId);
    ensure(['believed','rejected','uncertain'].includes(op.belief),'KNOWLEDGE','Invalid belief');probability(op.confidence);
    ensure(!findKnowledge(world,op.actorId,c.id,c.versionId),'DUPLICATE','Version already known; revise belief explicitly');
    validateSource(world,op.actorId,f.id,c.id,c.versionId,op.source,momentOf(world),r.plan.cursor,r.history.length+1);
    const h=history(world,command,'knowledge',f.eventId,f.stageId,[f.id],{actorId:op.actorId,claimId:c.id,versionId:c.versionId,belief:op.belief,confidence:op.confidence});
    r.knowledge.push({actorId:op.actorId,factId:f.id,claimId:c.id,versionId:c.versionId,acquiredAt:momentOf(world),cursor:r.plan.cursor,order:h.order,source:clone(op.source),belief:op.belief,confidence:op.confidence});
    if(op.belief==='believed')for(const old of r.knowledge.filter(k=>k.actorId===op.actorId&&k.claimId===c.id&&k.versionId!==c.versionId&&k.belief==='believed')){
      const before={belief:old.belief,confidence:old.confidence};old.belief='uncertain';old.confidence=.4;
      history(world,command,'belief',f.eventId,f.stageId,[f.id],{actorId:old.actorId,claimId:old.claimId,versionId:old.versionId,before,after:{belief:old.belief,confidence:old.confidence}});
    }
    for(const event of world.events)if(event.facts.some(ref=>ref.id===f.id)&&!storyContent(world,event.id))involve(event,op.actorId,op.source.actorId);
  } else if(op.type==='belief') {
    assertShape(op,['type','actorId','claimId','versionId','belief','confidence']);
    ensure(['believed','rejected','uncertain'].includes(op.belief),'KNOWLEDGE','Invalid belief');probability(op.confidence);
    const k=findKnowledge(world,op.actorId,op.claimId,op.versionId);ensure(k,'KNOWLEDGE','Cannot believe an unknown version');
    const f=findFact(world,k.factId);const before={belief:k.belief,confidence:k.confidence};k.belief=op.belief;k.confidence=op.confidence;
    history(world,command,'belief',f.eventId,f.stageId,[f.id],{actorId:k.actorId,claimId:k.claimId,versionId:k.versionId,before,after:{belief:k.belief,confidence:k.confidence}});
    if(k.belief==='believed')for(const old of r.knowledge.filter(x=>x!==k&&x.actorId===k.actorId&&x.claimId===k.claimId&&x.belief==='believed')){
      const before={belief:old.belief,confidence:old.confidence};old.belief='uncertain';old.confidence=.4;
      history(world,command,'belief',f.eventId,f.stageId,[f.id],{actorId:old.actorId,claimId:old.claimId,versionId:old.versionId,before,after:{belief:old.belief,confidence:old.confidence}});
    }

  } else if(op.type==='reveal') {
    assertShape(op,['type','actorId','factId','source']);const f=findFact(world,op.factId);
    ensure(!r.disclosures.some(d=>d.actorId===op.actorId&&d.factId===f.id),'DUPLICATE','Fact already disclosed');
    validateSource(world,op.actorId,f.id,null,null,op.source,momentOf(world),r.plan.cursor,r.history.length+1);
    const h=history(world,command,'disclosure',f.eventId,f.stageId,[f.id],{actorId:op.actorId});
    r.disclosures.push({actorId:op.actorId,factId:f.id,at:momentOf(world),cursor:r.plan.cursor,order:h.order,source:clone(op.source)});
  } else if(op.type==='result') {
    assertShape(op,['type','id','eventId','stageId','factId','subjectId','facet','effects']);const event=atCurrentStage(world,op.eventId,op.stageId),fact=findFact(world,op.factId);
    validateId(op.id,'result');identifier(op.facet);knownActor(world,op.subjectId);
    ensure(event.facts.some(ref=>ref.id===fact.id)&&fact.subjectIds.includes(op.subjectId),'REFERENCE','Result lacks linked fact/subject');
    ensure(!world.events.some(e=>e.results.some(result=>result.id===op.id||(e.id===op.eventId&&result.stageId===op.stageId&&key(result.factId,result.subjectId,result.facet)===key(op.factId,op.subjectId,op.facet)))),'DUPLICATE','Result or semantic consequence already settled');
    ensure(Array.isArray(op.effects),'SCHEMA','Effects required');
    const result={id:op.id,stageId:op.stageId,factId:fact.id,subjectId:op.subjectId,facet:op.facet,effectIds:[],settlementId:createId('settlement',[world.identity.attemptId,command.id])};
    for(const effect of op.effects){
      assertShape(effect,['id','operation']);validateId(effect.id,'effect');ensure(!r.effects.some(e=>e.id===effect.id),'DUPLICATE','Effect already settled');
      naturalAt(world,numericSession,world.position);const cursor=numericSession.cursor(),before=numericSession.world();
      const numerical=numericSession.settle({attemptId:world.identity.attemptId,id:effect.id,sequence:cursor.nextSequence,date:world.position.date,operation:effect.operation});
      const after=numericSession.world(),observed=new Map();
      for(const change of numerical.changes)observed.set(key(change.target,change.code),{target:change.target,code:change.code,before:targetRecord(before,change.target)[change.code],after:targetRecord(after,change.target)[change.code]});
      const h=history(world,command,'effect',event.id,event.stageId,[fact.id],{resultId:result.id,effectId:effect.id,numericReceiptId:numerical.id,changes:numerical.changes,observed:[...observed.values()]});
      r.effects.push({id:effect.id,resultId:result.id,attemptId:world.identity.attemptId,numericReceiptId:numerical.id,order:h.order});result.effectIds.push(effect.id);receipt.numericReceiptIds.push(effect.id);
    }
    event.results.push(result);history(world,command,'result',event.id,event.stageId,[fact.id],{resultId:result.id});
  } else if(op.type==='confirm-choice') {
    assertShape(op,['type','eventId','stageId','optionId','optionText']);identifier(op.optionText);
    ensure(command.actorId===world.identity.playerId,'ACTOR','Only the player confirms teacher choices');
    const event=atCurrentStage(world,op.eventId,op.stageId),choice=event.choice;
    ensure(choice&&choice.confirmedOptionId===null,'CHOICE','Decision already locked or absent');
    ensure(choice.options.some(o=>o.id===op.optionId),'CHOICE','Unknown option');choice.confirmedOptionId=op.optionId;
    history(world,command,'choice',event.id,event.stageId,[],{actorId:command.actorId,nodeId:choice.nodeId,optionId:op.optionId,optionText:op.optionText});
  } else if(op.type==='stage') {
    assertShape(op,['type','eventId','fromStageId','stageId','choice']);const event=atCurrentStage(world,op.eventId,op.fromStageId);validateId(op.stageId,'stage');
    ensure(op.choice?.confirmedOptionId==null,'CHOICE','A new stage cannot pre-confirm a choice');
    ensure(event.choice===null||event.choice.confirmedOptionId!==null,'CHOICE','Cannot abandon an unresolved decision');
    ensure(!r.stages.some(s=>s.id===op.stageId),'DUPLICATE','Stage ID already used');event.stageId=op.stageId;event.choice=clone(op.choice);
    const h=history(world,command,'stage',event.id,event.stageId,[],{previousStageId:op.fromStageId});r.stages.push({id:op.stageId,eventId:event.id,order:h.order});
  } else if(op.type==='plan-vacation') {
    const panel=deriveWorldPanel(numericSession.world());planVacation(world,op,Object.fromEntries(STATE_NAMES.map(k=>[k,panel[k]])));history(world,command,'vacation-plan',null,null,[],{id:op.id,direction:op.direction,weeks:op.weeks});
  } else if(op.type==='finish-slot') {
    if(schoolEnabled(world)&&!schoolEventOccupied(world)&&!r.history.some(h=>h.type==='campus'&&h.cursor===r.plan.cursor)){
      const activity=r.plan.vacation?.direction??(schoolActions(world).includes('automatic')?'automatic':null);
      ensure(activity,'SCHOOL_ACTION','Choose the legal routine activity before completing this slot');
      numericSession=execute(world,command,{type:'campus',activity},numericSession,receipt);
    }
    if(schoolEnabled(world)){
      const term=teachingTerm(world.position.date);
      if(term){const savedTerm=academicState(world).terms[term.id];if(!savedTerm)numericSession=execute(world,command,{type:'academic',action:'open',termId:term.id},numericSession,receipt,false,false,true);}
      if(term&&!term.camp){const meta=semester(term.id),grade=formalSlot(world).day.grade,exams=grade===2&&meta.grade2SecondExam?[meta.exams[0],meta.grade2SecondExam,meta.exams[2]]:meta.exams;
        for(const round of [1,2,3,0])if(['p8','dinner','study1','study2','study3','private'].includes(world.position.slotId)&&world.position.date===exams[round===0?2:round-1].at(-1)&&!r.history.some(h=>h.type==='academic'&&h.data.input.termId===term.id&&h.data.input.action==='assess'&&h.data.input.round===round))numericSession=execute(world,command,{type:'academic',action:'assess',termId:term.id,round},numericSession,receipt,false,false,true);
      }
    }
    if(schoolEnabled(world)){const term=teachingTerm(world.position.date),day=formalSlot(world).day;if(term&&!term.camp&&world.position.date===semester(term.id).end&&day.slots.at(-1).id===world.position.slotId&&!academicState(world).terms[term.id]?.closed)numericSession=execute(world,command,{type:'academic',action:'close',termId:term.id},numericSession,receipt,false,false,true);}
    numericSession=execute(world,command,{type:'npc-update'},numericSession,receipt);
    finishCalendarSlot(world,op);naturalAt(world,numericSession,world.position);history(world,command,'slot-complete',null,null,[],{activityIds:op.completedActivityIds});
  } else if(op.type==='prepare-semester') {
    prepareSemester(world,op);history(world,command,'timetable',null,null,[],{semesterId:op.semesterId});
  } else if(op.type==='advance-time') {
    assertShape(op,['type','planId','steps']);ensure(op.planId===r.plan.id&&Number.isInteger(op.steps)&&op.steps>0,'TIME','Invalid time progression');
    if(isFormal(r.plan)){
      naturalAt(world,numericSession,world.position);
      if(r.plan.vacation&&world.position.date===r.plan.vacation.endDate){const task=r.plan.vacation,panel=deriveWorldPanel(numericSession.world()),after=Object.fromEntries(STATE_NAMES.map(k=>[k,panel[k]]));history(world,command,'vacation-summary',null,null,[],{...task,after,delta:Object.fromEntries(STATE_NAMES.map(k=>[k,after[k]-task.before[k]]))});r.plan.vacation=null;}
      advanceFormalSlot(world,op);naturalAt(world,numericSession,world.position);
    }else{
      ensure(r.plan.cursor+op.steps<r.plan.positions.length,'TIME','Supplied schedule exhausted');
      naturalAt(world,numericSession,world.position);
      for(let i=0;i<op.steps;i++){r.plan.cursor++;world.position=clone(r.plan.positions[r.plan.cursor]);naturalAt(world,numericSession,world.position);}
    }
    for(;;){
      const pending=dueTransfers(numericSession.world(),world.position.date)[0];if(!pending)break;
      const completed=executeSchool(world,pending,numericSession);
      history(world,command,'school',null,null,[pending.basisFactId],completed.data);numericSession=createSettlementSession(completed.snapshot);world.numeric=clone(completed.snapshot);
    }
    if(schoolEnabled(world)){const term=teachingTerm(world.position.date),saved=term?academicState(world).terms[term.id]:null;if(saved&&!saved.closed&&numericSession.world().classroom.studentIds.some(id=>!saved.rows.some(row=>row.id===id)))numericSession=execute(world,command,{type:'academic',action:'sync',termId:term.id},numericSession,receipt,false,false,true);}
    history(world,command,'time',null,null,[],{planId:r.plan.id,steps:op.steps});
  } else if(op.type==='sample') {
    assertShape(op,['type','stream','id','weights']);identifier(op.id);
    ensure(Object.hasOwn(world.random,op.stream),'RANDOM','Unknown managed stream');ensure(!receipt.draws.some(d=>d.id===op.id),'DUPLICATE','Draw ID already used within operation');
    const rng=restoreRandom(world.random[op.stream]),index=rng.weightedIndex(op.weights);world.random[op.stream]=rng.snapshot();
    receipt.draws.push({id:op.id,stream:op.stream,index,weights:clone(op.weights)});
  } else if(op.type==='enrollment-reference') {
    ensure(!numericSession.world().registry,'ENROLLMENT','Registry-managed affiliations cannot use reference-only enrollment writes');
    assertShape(op,['type','record','basisFactId']);ensure(findFact(world,op.basisFactId).subjectIds.includes(op.record.personId),'REFERENCE','Enrollment lacks a fact about this person');ensure(!world.enrollments.some(e=>e.id===op.record.id),'DUPLICATE','Enrollment ID already exists');
    world.enrollments.push(clone(op.record));history(world,command,'enrollment',null,null,[op.basisFactId],{enrollmentId:op.record.id});
  } else if(op.type==='role') {
    assertShape(op,['type','personId','roleIds','basisFactId']);ensure(findFact(world,op.basisFactId).subjectIds.includes(op.personId),'REFERENCE','Role lacks a fact about this person');validateRoles(op.roleIds);knownActor(world,op.personId);
    const person=world.numeric.evolution.world.people[op.personId];ensure(person,'ACTOR','Player roles are not mutable through the NPC role adapter');
    const numericWorld=numericSession.world(),before=clone(numericWorld.people[op.personId].roleIds);
    numericWorld.people[op.personId].roleIds=clone(op.roleIds);
    // Numeric-session replacement is handled below, preserving N6 receipts/PRNG.
    const next=numericSession.snapshot();next.evolution.world=numericWorld;
    history(world,command,'role',null,null,[op.basisFactId],{personId:op.personId,before,after:op.roleIds});return createSettlementSession(next);
  } else throw new WorldError('OPERATION',`Unknown operation type ${op.type}`);
  return numericSession;
}

/** Adopt an empty v1 carrier explicitly; historical carriers need supplied domain migration,
 * never infer truth or effects from phase-01 reference-only synthetic data. */
export function startWorld(foundation,plan) {
  const world=restoreFoundationEnvelope(foundation);
  ensure(!Object.hasOwn(world.extensions,WORLD_KEY),'VERSION','Runtime already exists; use restoreWorldState');
  ensure(world.events.length===0,'MIGRATION','Reference-only events require explicit domain import, not invented facts');
  const supplied=isFormal(plan)?clone(plan):{...clone(plan),cursor:0};validatePlan(supplied);ensure(same(planPosition(supplied),world.position),'TIME','Plan must begin at the existing position');
  world.extensions[WORLD_KEY]={version:1,revision:0,plan:supplied,facts:[],claims:[],knowledge:[],disclosures:[],history:[],commits:[],stages:[],effects:[],numericArchives:[]};
  return restoreWorldState(world);
}

/** Pure preparation. All changes occur on a detached draft; callers publish the returned
 * world only after success. No callbacks, platform I/O, global state or implicit draws. */
export function prepareWorldOperation(saved,request) {
  try {
    const world=restoreWorldState(saved);canonicalData(request);
    assertShape(request,['id','attemptId','expectedRevision','actorId','preconditions','operations',...(Object.hasOwn(request,'calendarContext')?['calendarContext']:[])]);
    validateId(request.id,'operation');identifier(request.attemptId);knownActor(world,request.actorId);
    ensure(request.attemptId===world.identity.attemptId,'ATTEMPT','Wrong attempt');
    const r=runtimeOf(world),encoded=canonicalData(request),prior=r.commits.find(c=>c.id===request.id&&c.attemptId===request.attemptId);
    if(prior){ensure(prior.request===encoded,'CONFLICT','Operation ID reused with different content');return {world,receipt:clone(prior),duplicate:true};}
    ensure(request.expectedRevision===r.revision,'STALE','World revision changed');preconditions(world,request.preconditions);
    ensure(Array.isArray(request.operations)&&request.operations.length>0,'SCHEMA','Nonempty operations required');
    const storyIds=request.operations.filter(o=>o.type==='story'||o.type==='admit-event').map(o=>o.eventId);
    ensure(new Set(storyIds).size===storyIds.length,'STORY','One story action per event per transaction');
    const command=clone(request),offset=r.history.length;
    const receipt={id:command.id,attemptId:command.attemptId,revision:r.revision+1,request:encoded,historyIds:[],numericReceiptIds:[],draws:[]};
    let numerical=createSettlementSession(world.numeric);
    for(const operation of command.operations)numerical=execute(world,command,operation,numerical,receipt);
    const arrangement=arrangeReplenishment(world,command,numerical);
    if(arrangement){history(world,command,'school',null,null,[arrangement.data.basisFactId],arrangement.data);numerical=createSettlementSession(arrangement.snapshot);}
    world.numeric=numerical.snapshot();
    const school=world.numeric.evolution.world;
    if(school.registry)world.enrollments=schoolEnrollmentReferences(school);
    if(school.registry&&command.operations.some(op=>op.type==='school'&&['school-enroll','school-leave','school-graduate'].includes(op.change.type))){
      const count=school.classroom.studentIds.length;
      const allGraduated=count===0&&command.operations.some(op=>op.type==='school'&&op.change.type==='school-graduate')&&school.registry.enrollments.filter(e=>e.classId===school.classroom.id).every(e=>e.until!==null);
      ensure(count>=38||allGraduated,'ENROLLMENT','Sub-38 exceptional rule is undecided');
    }
    syncReferences(world);r.revision++;
    receipt.historyIds=r.history.slice(offset).map(h=>h.id);r.commits.push(receipt);
    return {world:restoreWorldState(world),receipt:clone(receipt),duplicate:false};
  } catch(error) {
    if(error instanceof WorldError)throw error;
    throw new WorldError(error.code??'INVALID',error.message);
  }
}
function freeze(value) { if(value&&typeof value==='object'&&!Object.isFrozen(value)){Object.values(value).forEach(freeze);Object.freeze(value);}return value; }
/** Exclusive owner. Prepare does not publish. Batch 03 persists ticket.world and receipt
 * in one DB transaction before commit(ticket). A discarded ticket consumes no RNG. */
export function createWorldSession(saved) {
  let state=restoreWorldState(saved);const tickets=new WeakMap();
  return Object.freeze({
    snapshot:()=>clone(state),
    prepare(request){const result=prepareWorldOperation(state,request),ticket=freeze({baseRevision:runtimeOf(state).revision,...clone(result)});tickets.set(ticket,result);return ticket;},
    commit(ticket){
      const result=tickets.get(ticket);ensure(result,'TICKET','Unknown or already committed draft');
      ensure(ticket.baseRevision===runtimeOf(state).revision,'STALE','Another draft was committed');
      state=result.world;tickets.delete(ticket);return clone(result.receipt);
    },
    discard(ticket){ensure(tickets.delete(ticket),'TICKET','Unknown draft');},
  });
}

/** Explicit retry initialization from an opening snapshot, not from the failed world.
 * Annual authorization/snapshot selection belongs to batch 11; seeds are caller-owned.
 * Retain only the snapshot's legitimate history and archive its original N6 ledger.
 */
export function forkWorldAttempt(openingSnapshot,{attemptId,seeds}) {
  const world=restoreWorldState(openingSnapshot),r=runtimeOf(world);validateId(attemptId,'attempt');
  ensure(attemptId!==world.identity.attemptId&&!r.commits.some(c=>c.attemptId===attemptId),'ATTEMPT','Attempt ID must be fresh');
  canonicalData(seeds);assertShape(seeds,['settlement','streams']);assertShape(seeds.streams,Object.keys(world.random));
  const old=world.numeric;r.numericArchives.push({attemptId:old.attemptId,random:old.random,receipts:old.receipts});
  world.numeric=startSettlement(old.evolution,{seed:seeds.settlement,attemptId});world.identity.attemptId=attemptId;
  for(const name of Object.keys(world.random))world.random[name]=createRandom(seeds.streams[name]).snapshot();
  const id=createId('operation',[attemptId,'initialize-retry']);
  const request={id,attemptId,seeds:clone(seeds),openingRevision:r.revision};
  const h=history(world,request,'retry',null,null,[],{previousAttemptId:old.attemptId,openingRevision:r.revision});
  r.revision++;r.commits.push({id,attemptId,revision:r.revision,request:canonicalData(request),historyIds:[h.id],numericReceiptIds:[],draws:[]});
  return restoreWorldState(world);
}

export function startCalendarWorld(foundation,options){const adopted=createCalendarBaseline(foundation,options);return startWorld(adopted.foundation,adopted.plan);}

/** Bootstrap the real school catalogue through the same checked initial transaction.
 * Preview generation is a detached proposal only; the committed operation owns RNG/history.
 */
export function startSchoolCareer(foundation,{startYear,subject,seed}){
 ensure(foundation.enrollments.length===0,'MIGRATION','Reference-only affiliations need explicit migration');
 const preview=clone(foundation.numeric.evolution.world);
 initializeRegistry(preview,{academicYear:startYear,date:careerRange(startYear).start});
 const baseline=startCalendarWorld(foundation,{startYear,subject,seed,classes:schoolCatalogue(preview,Object.keys(SUBJECT_LOAD)),homeClassId:preview.classroom.id});
 return prepareWorldOperation(baseline,{id:createId('operation',[baseline.identity.careerId,'initialize-school']),attemptId:baseline.identity.attemptId,expectedRevision:0,actorId:baseline.identity.playerId,preconditions:[],calendarContext:{kind:'procedure'},operations:[{type:'school',basisFactId:null,change:{type:'school-initialize',academicYear:startYear}}]}).world;
}
