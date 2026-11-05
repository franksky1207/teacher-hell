/** Isolated engineering fixtures. All changes execute the production world transaction. */
import { eventWorld } from './event-fixtures.js';
import { request,event,fact,open,id } from './runtime.js';
import { prepareWorldOperation } from '../../src/runtime/transactions.js';
import { runtimeOf } from '../../src/runtime/model.js';
import { institutionState } from '../../src/runtime/procedures.js';
export function procedureWorld(seed=74,date=null,slot=null){return eventWorld(seed,date,slot);}
export function offices(w,role){return w.numeric.evolution.world.registry.assignments.filter(a=>a.roleId===role&&a.until===null).map(a=>a.personId);}
export function executeProcedure(w,change,actorId=null,tag=null){
 actorId??=offices(w,1)[0];tag??='institution-'+runtimeOf(w).revision;
 const e=event(w,tag);e.definitionId='procedure:institution-source';e.participantIds=[...new Set([w.identity.playerId,actorId])];
 const f=fact(e,tag,{subjectIds:e.participantIds,witnessIds:e.participantIds,categoryCodes:[],data:{type:'institution-action',operation:change}});
 const operation={type:'institution',actorId,basisFactId:f.id,change};
 const q={...request(w,tag,[open(e),f,operation]),calendarContext:{kind:'procedure'}};
 return {...prepareWorldOperation(w,q),request:q,operation};
}
export function sourceFact(w,data,subjects,witnesses=subjects,tag=null){tag??='source-'+runtimeOf(w).revision;const e=event(w,tag);e.definitionId='procedure:source';e.participantIds=[...new Set([...subjects,...witnesses])];const f=fact(e,tag,{subjectIds:subjects,witnessIds:witnesses,categoryCodes:[],data});const q={...request(w,tag,[open(e),f]),calendarContext:{kind:'procedure'}};return {world:prepareWorldOperation(w,q).world,fact:f};}
export function openProcedure(w,kind='bullying',tag=kind,flags={}){
 const subjectIds=w.numeric.evolution.world.classroom.studentIds.slice(0,2),respondentId=kind==='teacher-conduct'||kind==='employment'?w.identity.playerId:subjectIds[1],handlerId=offices(w,['counselling','self-harm'].includes(kind)?4:kind==='employment'?7:3)[0];
 if(respondentId!==null&&!subjectIds.includes(respondentId))subjectIds.push(respondentId);
 flags={childProtection:false,suicideBehavior:false,emergency:false,outsideJurisdiction:false,...flags};
 const origin=sourceFact(w,{type:'procedure-signal',kind,flags,subjectIds,respondentId},subjectIds,[subjectIds[0]],tag+'-signal');
 const change={action:'open',id:'case:'+tag,kind,subjectIds,respondentId,handlerId,originFactId:origin.fact.id,flags};const out=executeProcedure(origin.world,change,handlerId,tag+'-open');return {...out,caseId:change.id,originFactId:origin.fact.id};
}
export function caseStep(w,caseId,step,resolutionFactId=null){const c=institutionState(w).cases.find(c=>c.id===caseId);return executeProcedure(w,{action:'step',caseId,step,resolutionFactId},c.handlerId).world;}
export function addEvidence(w,caseId,originFactId,tag='one',integrity='complete',contradicts=[]){
 const c=institutionState(w).cases.find(c=>c.id===caseId),f=runtimeOf(w).facts.find(f=>f.id===originFactId);return executeProcedure(w,{action:'evidence',caseId,id:'evidence:'+tag,factId:f.id,sourceId:f.witnessIds[0],occurredAt:f.occurredAt,custodianId:c.handlerId,accessIds:[c.handlerId],integrity,contradicts},c.handlerId).world;
}
/** Real 06 candidate draw → 07 selected pending/confirmed story → institution journal. */
export async function dutyStoryRoute(seed=74,response='accept',{date=null,slot=null}={}){
 const {createRandom}=await import('../../src/numeric/random.js'),{DUTY_STORY}=await import('../../src/runtime/story-content.js'),{demoDefinition,storyAction}=await import('./story-scenario.js'),{binding}=await import('./event-fixtures.js');
 let w=procedureWorld(seed,date,slot);w.random.events=createRandom(1).snapshot();
 w=executeProcedure(w,{action:'duty-offer',id:'duty:story',personId:w.identity.playerId,kind:'project',description:'整理跨學期資料',until:'2028-06-30',endCondition:'計畫交付或撤銷',mandatory:false}).world;
 const formal=ops=>{const q=request(w,'duty-story-'+runtimeOf(w).revision,ops);const out=prepareWorldOperation(w,q);w=out.world;return {...out,request:q};};
 const d=demoDefinition(DUTY_STORY);d.topicId=DUTY_STORY.topicId;d.eligibility.slotIds=[slot??'early'];d.eligibility.people=['staff'];d.eligibility.roleIds=[1];formal([{type:'register-event-catalogue',catalogueId:'engineering:duty-story',definitions:[d],bindings:[binding(d)],engineering:true}]);formal([{type:'draw-events',catalogueId:'engineering:duty-story'}]);
 const selected=runtimeOf(w).history.findLast(h=>h.type==='event-selection').data.selected[0];if(!selected)throw Error('fixed duty seed produced no story');formal([{type:'admit-event',eventId:selected.eventId}]);formal([storyAction(selected.eventId,'select',response)]);const pending=clone(w);const confirmed=formal([storyAction(selected.eventId,'confirm')]);return {...confirmed,pending,eventId:selected.eventId};
}
const clone=x=>structuredClone(x);
export function addOfficialBody(w,caseId,body='bullying-committee'){
 // Qualifying identities are sourced school operations; no persona or relationship reset.
 const principal=offices(w,1)[0],authority='official:education';
 const seed=sourceFact(w,{type:'personnel-order'},[...new Set([w.identity.playerId,principal,authority,...Array.from({length:10},(_,i)=>'official:investigator:'+i)].filter(id=>id===w.identity.playerId||w.numeric.evolution.world.people[id]))],[principal],'external-source-'+runtimeOf(w).revision);w=seed.world;
 const ops=[{type:'school',basisFactId:seed.fact.id,change:{type:'school-staff',personId:authority,roleIds:[25]}},...Array.from({length:10},(_,i)=>({type:'school',basisFactId:seed.fact.id,change:{type:'school-staff',personId:'official:investigator:'+i,roleIds:[25]}}))];
 w=prepareWorldOperation(w,{...request(w,'external-staff-'+runtimeOf(w).revision,ops),calendarContext:{kind:'procedure'}}).world;
 const ids=[authority,...Array.from({length:10},(_,i)=>'official:investigator:'+i)],appointments=sourceFact(w,{type:'external-appointment'},ids,[principal]);w=appointments.world;
 const appointmentsOps=ids.filter(personId=>!w.numeric.evolution.world.registry.assignments.some(a=>a.id==='external-appointment:'+personId)).map(personId=>({type:'school',basisFactId:appointments.fact.id,change:{type:'school-assignment',id:'external-appointment:'+personId,personId,roleId:25,classId:null,endsId:null}}));
 if(appointmentsOps.length)w=prepareWorldOperation(w,{...request(w,'external-appointments-'+runtimeOf(w).revision,appointmentsOps),calendarContext:{kind:'procedure'}}).world;
 const memberFactIds=[],memberIds=[],panel=['bullying-panel','gender-panel','teacher-panel'].includes(body),actual=[offices(w,1)[0],w.numeric.evolution.world.careLinks[5].caregiverId,offices(w,3)[1],offices(w,8)[0],'official:investigator:4',w.numeric.evolution.world.classroom.studentIds[3]],count=body==='bullying-committee'?6:['teacher-admission','bullying-review'].includes(body)?3:5;for(let i=0;i<count;i++){
  const personId=panel?'official:investigator:'+(body==='teacher-panel'?i+5:i):body==='teacher-admission'?[actual[1],actual[3],actual[4]][i]:body==='bullying-review'?[actual[0],actual[1],actual[3]][i]:body==='teacher-appeal-panel'?offices(w,8)[i]:actual[i],record=sourceFact(w,{type:'committee-qualification',body,personId,gender:i<3?'female':'male',external:panel||body==='teacher-admission'&&i===2||i===4,expert:panel||body==='teacher-admission'&&i===2||i===4,profession:'law',representation:body==='teacher-admission'?['parent','teacher','expert'][i]:body==='bullying-review'?['principal','parent','teacher'][i]:body==='teacher-appeal-panel'?'nonadministrative-teacher':panel?'expert':['principal','parent',body==='bullying-committee'?'student-affairs':'administrator','teacher','expert','student'][i]},[personId,authority],[authority]);w=record.world;memberFactIds.push(record.fact.id);memberIds.push(personId);
 }
 const bodyId='body:'+caseId+':'+body;w=executeProcedure(w,{action:'constitute',id:bodyId,caseId,body,memberFactIds,until:'2027-07-20'},principal).world;return {world:w,bodyId,memberIds};
}
export function resolveCase(w,caseId,finding='insufficient-evidence'){
 const c=institutionState(w).cases.find(c=>c.id===caseId),body=addOfficialBody(w,caseId,c.rule.body);w=body.world;if(c.rule.investigator!==c.rule.body){const investigator=addOfficialBody(w,caseId,c.rule.investigator);w=investigator.world;}
 let admissionId=null;if(c.rule.admission){const admission=addOfficialBody(w,caseId,c.rule.admission);w=admission.world;const resolution=sourceFact(w,{type:'admission-resolution',caseId,bodyId:admission.bodyId,accepted:true,signerIds:admission.memberIds},c.subjectIds,admission.memberIds);w=resolution.world;admissionId=resolution.fact.id;}
 w=caseStep(w,caseId,'accept',admissionId);if(['bullying','teacher-conduct'].includes(c.kind))w=caseStep(w,caseId,'panel');w=caseStep(w,caseId,'investigate');
 const hearing=sourceFact(w,{type:'hearing-opportunity',caseId},c.subjectIds,[c.handlerId]);w=hearing.world;
 const resolution=sourceFact(w,{type:'committee-resolution',caseId,body:c.rule.body,bodyId:body.bodyId,finding,evidenceIds:institutionState(w).cases.find(c=>c.id===caseId).evidenceIds,signerIds:body.memberIds,hearingFactId:hearing.fact.id},[...c.subjectIds,...body.memberIds],[...body.memberIds,c.handlerId]);
 w=caseStep(resolution.world,caseId,'decide',resolution.fact.id);w=caseStep(w,caseId,'notify');return w;
}
