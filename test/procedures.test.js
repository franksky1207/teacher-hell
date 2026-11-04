import test from 'node:test';
import assert from 'node:assert/strict';
import { procedureWorld,offices,executeProcedure,openProcedure,caseStep,addEvidence,sourceFact } from './support/procedure-scenario.js';
import { institutionState } from '../src/runtime/procedures.js';
import { deadline,rulesForProcedure,workingDay } from '../src/runtime/institution-rules.js';
import { runtimeOf,restoreWorldState } from '../src/runtime/model.js';
import { prepareWorldOperation } from '../src/runtime/transactions.js';
import { createSave,encodeSave,restoreSave } from '../src/storage/format.js';
import { academicBaseline } from './support/academic-scenario.js';
import { request } from './support/runtime.js';
import { buildEventCandidates } from '../src/runtime/event-candidates.js';
import { definition } from './support/event-fixtures.js';

test('procedures: different official periods, frozen future versions and holiday rules',()=>{
 assert.equal(rulesForProcedure('bullying','2026-07-20').accept.unit,'working-days');assert.equal(rulesForProcedure('gender','2026-07-20').accept.unit,'days');assert.equal(rulesForProcedure('gender','2030-01-01').assumption,'frozen-game-world-assumption');assert.notEqual(rulesForProcedure('teacher-conduct','2026-07-20').id,rulesForProcedure('teacher-conduct','2026-11-01').id);
 assert.equal(deadline('2026-07-24',{unit:'working-days',value:3}),'2026-07-29');assert.equal(deadline('2026-07-24',{unit:'days',value:3}),'2026-07-27');assert.equal(deadline('2026-01-31',{unit:'months',value:1}),'2026-02-28');assert.equal(workingDay('2026-07-22'),true);
});
test('procedures: sourced parallel cases immediately protect/report without drawing formal events',()=>{
 let w=procedureWorld(),out=openProcedure(w,'bullying','bullying',{childProtection:true});w=out.world;w=openProcedure(w,'gender').world;w=openProcedure(w,'self-harm','risk',{suicideBehavior:false,emergency:true}).world;
 const s=institutionState(w);assert.equal(s.cases.length,3);assert.equal(s.cases[0].finding,null);assert.ok(s.cases[0].obligations.filter(o=>o.automatic).every(o=>o.completedAt));assert.ok(!s.cases[2].obligations.some(o=>o.id==='suicide-report'));assert.ok(s.cases[2].obligations.some(o=>o.id==='emergency-response'&&o.completedAt));assert.equal(runtimeOf(w).history.filter(h=>h.type==='event-selection').length,0);assert.equal(runtimeOf(w).plan.tables[0].lessons.length,18);assert.deepEqual(restoreWorldState(JSON.stringify(w)),w);
});
test('procedures: exact source authorization, forged classification, authority, atomic rollback and dedup',()=>{
 let w=procedureWorld();const out=openProcedure(w);w=out.world;assert.equal(prepareWorldOperation(w,out.request).duplicate,true);assert.throws(()=>executeProcedure(w,{...out.operation.change,id:'another'},offices(w,8)[0]),/source|authority|handler/);
 const q=request(w,'bad-procedure',[out.operation,{type:'nonsense'}]);assert.throws(()=>prepareWorldOperation(w,q));assert.deepEqual(restoreWorldState(w),w);
 const bad=structuredClone(w);runtimeOf(bad).history.find(h=>h.type==='institution').data.result.finding='substantiated';assert.throws(()=>restoreWorldState(bad),/replay/);
});
test('procedures: duties accept/refuse/negotiate, finite tenure, handover and no timetable/numeric duplication',()=>{
 let w=procedureWorld();const player=w.identity.playerId,offer=id=>({action:'duty-offer',id,personId:player,kind:'project',description:'跨學期整理校務資料',until:'2028-06-30',endCondition:'計畫驗收或撤銷',mandatory:false});
 for(const [i,response] of ['accept','refuse','negotiate'].entries()){w=executeProcedure(w,offer('duty:'+i)).world;w=executeProcedure(w,{action:'duty-response',id:'duty:'+i,response},player).world;}
 const s=institutionState(w);assert.deepEqual(s.duties.map(d=>d.status),['active','declined','pending-resolution']);const holderId=offices(w,8)[0];w=executeProcedure(w,{action:'duty-change',id:'duty:0',mode:'handover',holderId,until:'2028-06-30'}).world;assert.equal(institutionState(w).duties[0].holderId,holderId);assert.equal(runtimeOf(w).plan.tables[0].lessons.length,18);assert.equal(w.numeric.receipts.length,0);assert.deepEqual(restoreSave(encodeSave(createSave(w))).world,w);
});
test('procedures: evidence provenance/custody/contradiction persists; accusation never establishes finding',()=>{
 let out=openProcedure(procedureWorld(),'teacher-conduct'),w=addEvidence(out.world,out.caseId,out.originFactId);w=addEvidence(w,out.caseId,out.originFactId,'contradiction','partial',['evidence:one']);const c=institutionState(w).cases[0];assert.equal(c.finding,null);assert.equal(institutionState(w).evidence[1].integrity,'partial');assert.throws(()=>caseStep(w,out.caseId,'decide'),/investigation/);
 const e=institutionState(w).evidence[0];assert.throws(()=>executeProcedure(w,{action:'evidence',caseId:out.caseId,id:'fake',factId:out.originFactId,sourceId:e.sourceId,occurredAt:{date:'2026-07-19',slotId:'early'},custodianId:c.handlerId,accessIds:[c.handlerId],integrity:'complete',contradicts:[]},c.handlerId),/forge/);
});
test('procedures: holidays and protected activity preserve deadlines, no automatic penalties',()=>{
 let out=openProcedure(procedureWorld(74,'2026-09-04','early'),'gender'),w=out.world;const before=institutionState(w).cases[0].obligations.find(o=>o.id==='accept-notice').due;
 w=academicBaseline(w,'2026-09-05','morning');w=executeProcedure(w,{action:'tick'},offices(w,3)[0]).world;assert.equal(institutionState(w).cases[0].obligations.find(o=>o.id==='accept-notice').due,before);assert.equal(w.numeric.receipts.length,0);assert.equal(runtimeOf(w).history.filter(h=>h.type==='event-selection').length,0);
 w=academicBaseline(w,'2026-10-01','early');w=executeProcedure(w,{action:'tick'},offices(w,3)[0]).world;assert.ok(institutionState(w).cases[0].obligations.find(o=>o.id==='accept-notice').overdueAt);assert.equal(institutionState(w).cases[0].finding,null);
});
test('procedures: case state is a qualification in original candidate pool without K changes',()=>{
 const out=openProcedure(procedureWorld()),d=definition('procedure-gate');d.eligibility.procedure=[{kind:'bullying',status:'received'}];assert.equal(buildEventCandidates(out.world,[d],{engineering:true}).candidates.length,2);d.eligibility.procedure[0].status='closed';assert.equal(buildEventCandidates(out.world,[d],{engineering:true}).candidates.length,0);
});

test('procedures: 06→07 duty choices preserve secondary confirmation, once-only institution outcome and emotional protest',async()=>{
 const {dutyStoryRoute}=await import('./support/procedure-scenario.js');
 for(const [response,status] of [['accept','active'],['refuse','declined'],['negotiate','pending-resolution'],['protest','pending-resolution']]){
  const out=await dutyStoryRoute(74,response);assert.equal(institutionState(out.pending).duties[0].status,'offered');assert.equal(institutionState(out.world).duties[0].status,status);assert.equal(prepareWorldOperation(out.world,out.request).duplicate,true);assert.deepEqual(restoreWorldState(JSON.stringify(out.world)),out.world);assert.equal(runtimeOf(out.world).plan.tables[0].lessons.length,18);
 }
});

test('procedures: competent independent panel, actual evidence and hearing produce insufficient-evidence without teacher failure',async()=>{
 const {resolveCase}=await import('./support/procedure-scenario.js');let out=openProcedure(procedureWorld(),'teacher-conduct'),w=addEvidence(out.world,out.caseId,out.originFactId);w=resolveCase(w,out.caseId);const c=institutionState(w).cases[0];assert.equal(c.finding,'insufficient-evidence');assert.equal(c.status,'notified');assert.ok(c.appealDue);assert.equal(w.position.serviceYear,1);assert.deepEqual(restoreWorldState(JSON.stringify(w)),w);assert.throws(()=>caseStep(w,c.id,'decide'),/investigation/);assert.throws(()=>caseStep(w,c.id,'close'),/appeal/);
});
test('procedures: confidential evidence grants no automatic knowledge, rejects unauthorized communication and never enters NPC forwarding',async()=>{
 const {npcWork}=await import('../src/runtime/autonomy.js');let out=openProcedure(procedureWorld()),w=out.world,c=institutionState(w).cases[0],student=c.subjectIds[0],parent=w.numeric.evolution.world.careLinks.find(l=>l.studentId===student).caregiverId;
 const doc=sourceFact(w,{type:'testimony',confidential:true,accessIds:[student,c.handlerId]},c.subjectIds,[student]);w=doc.world;w=addEvidence(w,c.id,doc.fact.id);
 const claimId=(await import('../src/contracts/foundation.js')).createId('claim',['private-case']);
 const ops=[{type:'claim',id:claimId,versionId:'1',factId:doc.fact.id,statement:'我目前只提供一部分資料。',sourceId:student},{type:'learn',actorId:student,claimId,versionId:'1',source:{kind:'observation',actorId:student,basisFactId:doc.fact.id},belief:'uncertain',confidence:.4}];
 w=prepareWorldOperation(w,{...request(w,'private-student',ops),calendarContext:{kind:'procedure'}}).world;
 assert.ok(npcWork(w).some(x=>x.kind==='reaction'&&x.actorId===student));assert.ok(!npcWork(w).some(x=>x.kind==='forward'&&x.claimId===claimId));assert.ok(!runtimeOf(w).knowledge.some(k=>k.actorId===parent||k.actorId===w.identity.playerId));
 const contact=sourceFact(w,{type:'contact'},[student,parent]);w=contact.world;assert.throws(()=>prepareWorldOperation(w,{...request(w,'illegal-private-forward',[{type:'learn',actorId:parent,claimId,versionId:'1',source:{kind:'communication',actorId:student,basisFactId:contact.fact.id},belief:'believed',confidence:.8}]),calendarContext:{kind:'procedure'}}),/Confidential/);
});

test('procedures: effective school rules, instructions and actual deviations remain distinct; board cannot appoint',()=>{
 let w=procedureWorld();const policy={action:'policy',id:'support-rule',layer:'school-rule',replacesId:null,text:'計畫額外職責需書面來源並提供支援',until:null,legalBasisId:null,clauses:{extraDutyMandatory:true,support:'available',benefits:'normal',review:'collegial'}};
 assert.throws(()=>executeProcedure(w,policy,offices(w,1)[1]),/principal/);w=executeProcedure(w,policy).world;w=executeProcedure(w,{...policy,id:'boss-instruction',layer:'instruction',text:'主管要求所有教師承擔'}).world;
 const offer={action:'duty-offer',id:'mandatory-duty',personId:w.identity.playerId,kind:'temporary-assistance',description:'整理必要資料',until:'2026-08-01',endCondition:'資料交付',mandatory:true,policyId:'boss-instruction'};
 assert.throws(()=>executeProcedure(w,offer),/formal school rule/);w=executeProcedure(w,{...offer,policyId:'support-rule'}).world;w=executeProcedure(w,{action:'duty-response',id:offer.id,response:'refuse'},w.identity.playerId).world;assert.equal(institutionState(w).duties[0].status,'pending-resolution');assert.equal(institutionState(w).policies.length,2);
 const d=definition('policy-qualified');d.eligibility.procedure=[{kind:'policy:school-rule',status:'support-rule'}];assert.equal(buildEventCandidates(w,[d],{engineering:true}).candidates.length,40);
});
test('procedures: eight typed routes persist distinct measures; counselling never invents a suicide report',()=>{
 let w=procedureWorld();for(const kind of ['bullying','gender','teacher-conduct','safety','self-harm','counselling','administrative-review','employment'])w=openProcedure(w,kind,'typed-'+kind).world;
 const s=institutionState(w);assert.equal(s.cases.length,8);assert.equal(new Set(s.cases.map(c=>c.rule.id)).size,8);assert.ok(!s.cases.find(c=>c.kind==='counselling').obligations.some(o=>o.id==='suicide-report'));assert.throws(()=>caseStep(w,'case:typed-employment','close'),/pending investigation/);assert.deepEqual(restoreWorldState(JSON.stringify(w)),w);
});

test('procedures: Saturday legal expiry rolls only to Monday morning and reports retain hour bounds',async()=>{
 const {deadlineMinute,minuteOfMoment}=await import('../src/runtime/institution-rules.js');const p={unit:'days',value:4,rollHoliday:true},due=deadlineMinute('2026-07-21',p);assert.equal(deadline('2026-07-21',p),'2026-07-27');assert.ok(minuteOfMoment({date:'2026-07-27',slotId:'morning'})<due);assert.ok(minuteOfMoment({date:'2026-07-27',slotId:'afternoon'})>due);
 const out=openProcedure(procedureWorld(),'safety','hours',{emergency:true}),c=institutionState(out.world).cases[0];assert.equal(c.obligations.find(o=>o.id==='urgent-education-report').dueMinute-minuteOfMoment(c.openedAt),120);assert.equal(c.obligations.find(o=>o.id==='school-safety-report').dueMinute-minuteOfMoment(c.openedAt),4320);
});
test('procedures: teacher appeal clock pauses only on sourced litigation and restarts from actual resumption',async()=>{
 const {addOfficialBody}=await import('./support/procedure-scenario.js');let out=openProcedure(procedureWorld(),'employment','appeal-clock'),w=addOfficialBody(out.world,out.caseId,'teacher-appeal-panel').world,c=institutionState(w).cases[0];
 const basis=sourceFact(w,{type:'appeal-clock-basis',caseId:c.id,reason:'related-litigation'},c.subjectIds,['official:education']);w=basis.world;w=executeProcedure(w,{action:'appeal-clock',caseId:c.id,mode:'suspend',reasonFactId:basis.fact.id},c.handlerId).world;assert.ok(institutionState(w).cases[0].obligations.find(o=>o.id==='investigation').suspendedAt);
 w=academicBaseline(w,'2026-08-03','early');const restart=sourceFact(w,{type:'appeal-clock-basis',caseId:c.id,reason:'related-litigation-ended'},c.subjectIds,['official:education']);w=restart.world;w=executeProcedure(w,{action:'appeal-clock',caseId:c.id,mode:'resume',reasonFactId:restart.fact.id},c.handlerId).world;const o=institutionState(w).cases[0].obligations.find(o=>o.id==='investigation');assert.equal(o.suspendedAt,null);assert.equal(o.due,deadline('2026-08-03',{unit:'months',value:3,rollHoliday:true}));assert.deepEqual(restoreWorldState(JSON.stringify(w)),w);
});

test('procedures: appeal remand needs independent authority and material grounds, preserves findings in history and requires a new investigation mandate',async()=>{
 const {resolveCase}=await import('./support/procedure-scenario.js');const out=openProcedure(procedureWorld(),'teacher-conduct','remand');let w=resolveCase(addEvidence(out.world,out.caseId,out.originFactId),out.caseId);w=caseStep(w,out.caseId,'appeal');const c=institutionState(w).cases[0];
 const forged=sourceFact(w,{type:'appeal-resolution',caseId:c.id,body:'competent-authority',outcome:'remand',reason:'new-evidence'},c.subjectIds,[c.handlerId]);assert.throws(()=>executeProcedure(forged.world,{action:'remand',caseId:c.id,resolutionFactId:forged.fact.id},c.handlerId),/independent authority/);
 const valid=sourceFact(w,{type:'appeal-resolution',caseId:c.id,body:'competent-authority',outcome:'remand',reason:'new-evidence'},c.subjectIds,['official:education']);w=executeProcedure(valid.world,{action:'remand',caseId:c.id,resolutionFactId:valid.fact.id},c.handlerId).world;assert.equal(institutionState(w).cases[0].finding,null);assert.ok(institutionState(w).cases[0].history.some(h=>h.action==='decide'));assert.throws(()=>caseStep(w,c.id,'investigate'),/investigation body/);assert.deepEqual(restoreWorldState(JSON.stringify(w)),w);
});
test('procedures: necessary measures complete and a reasoned case can actually close after its preserved remedy window',async()=>{
 const {resolveCase}=await import('./support/procedure-scenario.js');const out=openProcedure(procedureWorld(),'teacher-conduct','closure');let w=resolveCase(addEvidence(out.world,out.caseId,out.originFactId),out.caseId);w=academicBaseline(w,'2026-08-20','vacation-day');w=caseStep(w,out.caseId,'close');const c=institutionState(w).cases[0];assert.equal(c.status,'closed');assert.equal(c.finding,'insufficient-evidence');assert.equal(c.closedAt.date,'2026-08-20');assert.deepEqual(restoreSave(encodeSave(createSave(w))).world,w);
});

test('procedures: same-day principal replacement removes old appointment authority while preserving the natural person',()=>{
 let w=procedureWorld(),old=offices(w,1)[0],next=offices(w,1)[1],root=w.numeric.evolution.world.registry.assignments.find(a=>a.personId===old&&a.roleId===1).id;
 const cause=sourceFact(w,{type:'personnel-order'},[old,next]);w=cause.world;w=prepareWorldOperation(w,{...request(w,'replace-principal',[{type:'school',basisFactId:cause.fact.id,change:{type:'school-assignment',id:'appointment:successor-principal',personId:next,roleId:1,classId:null,endsId:root}}]),calendarContext:{kind:'procedure'}}).world;
 const offer={action:'duty-offer',id:'after-replacement',personId:w.identity.playerId,kind:'project',description:'合法新任校長指派',until:'2026-08-01',endCondition:'交付',mandatory:false};assert.throws(()=>executeProcedure(w,offer,old),/principal authority/);w=executeProcedure(w,offer,next).world;assert.equal(institutionState(w).duties[0].issuerId,next);assert.ok(w.numeric.evolution.world.people[old]);assert.deepEqual(restoreWorldState(JSON.stringify(w)),w);
});
