import { aftercareOwnsSlot,aftercareActive } from './aftercare-calendar.js';
/** Background social actions compiled into the existing world transaction ledger.
 * No clock, second numeric state, formal admissions, or per-school daily agents. */
import { createId } from '../contracts/foundation.js';
import { canonicalData } from '../changes/settlement.js';
import { restoreRandom } from '../numeric/random.js';
import { forwardingProbability, adoptionProbability } from '../social/information.js';
import { prepareRelationshipChange } from '../social/relations.js';
import { directedKey } from '../world/relationships.js';
import { assertShape } from '../player/panel.js';
import { isFormal, formalSlot,planPosition } from './schedule.js';
const runtime=w=>w.extensions['teacher-hell/world'];
const need=(v,m)=>{if(!v)throw new RangeError(`NPC: ${m}`);};
const same=(a,b)=>canonicalData(a)===canonicalData(b);
export const AUTONOMY_VERSION='social-actions-v1';
export const AUTONOMY_BUDGET=12;
const id=(kind,w,...parts)=>createId(kind,[w.identity.attemptId,'npc',String(runtime(w).plan.cursor),...parts]);
const done=(w,actorId,claimId,versionId,belief)=>runtime(w).history.some(h=>h.type==='npc-update'&&h.data.decisions.some(d=>d.kind==='reaction'&&d.actorId===actorId&&d.claimId===claimId&&d.versionId===versionId&&d.basisBelief===belief));
/** Contact facts describe actual contact, not an acquaintance permission. Same slot only. */
function contacts(w){
 const r=runtime(w),n=w.numeric.evolution.world,result=r.facts.filter(f=>f.data.type==='contact'&&f.cursor===r.plan.cursor);
 if(!n.registry||!isFormal(r.plan))return result;
 const slot=w.position.slotId,students=n.classroom.studentIds,day=formalSlot(w).day;
 const currentCaregivers=new Set(n.careLinks.filter(l=>students.includes(l.studentId)).map(l=>l.caregiverId));
 const active=new Set(students);
 const seeds=[...new Set(r.knowledge.map(k=>k.actorId).concat(r.facts.filter(f=>f.categoryCodes.some(c=>['H01-1','H01-2','H09-1'].includes(c))).flatMap(f=>f.subjectIds)))].filter(id=>n.people[id]&&(students.includes(id)||currentCaregivers.has(id)||n.people[id].kind==='other'));
 for(const actorId of seeds.slice(0,40)){
  let peers=[];
  if(day.kind!=='aftercare'&&['early','lunch'].includes(slot)&&active.has(actorId))peers=students.filter(id=>id!==actorId);
  if(['private','evening','vacation-day','festival-day'].includes(slot)||['morning','afternoon'].includes(slot)&&['weekend','holiday'].includes(day.kind))peers=n.careLinks.filter(l=>l.studentId===actorId||l.caregiverId===actorId).map(l=>l.studentId===actorId?l.caregiverId:l.studentId);
  for(const toId of peers.slice(0,2))if(n.relationships[directedKey(actorId,toId)]&&!result.some(f=>f.subjectIds.includes(actorId)&&f.subjectIds.includes(toId)))result.push({id:id('fact',w,'contact',actorId,toId),subjectIds:[actorId,toId],witnessIds:[actorId,toId],data:{type:'contact'},causeIds:r.facts.filter(f=>f.subjectIds.includes(actorId)&&f.subjectIds.includes(toId)&&f.categoryCodes.some(c=>['H01-1','H01-2','H09-1'].includes(c))).slice(-1).map(f=>f.id),natural:true});
 }
 return result;
}
function formerAt(w,person){
 const r=runtime(w),registry=w.numeric.evolution.world.registry;if(person.kind!=='student'||!registry)return false;
 if(aftercareActive(w)&&registry.enrollments.some(e=>e.personId===person.id&&e.classId===registry.homeClassId))return true;
 const change=r.history.findLast(h=>h.type==='school'&&(h.data.change.personId===person.id||h.data.change.personIds?.includes(person.id)));
 if(change&&['school-leave','school-graduate'].includes(change.data.change.type))return true;
 return !registry.enrollments.some(e=>e.personId===person.id&&e.from<=w.position.date&&(e.until===null||e.until>=w.position.date));
}
export function npcGroups(w){
 const groups=new Map();for(const h of runtime(w).history)if(h.type==='npc-group'){
  const {groupId,action,memberIds,basisFactId}=h.data;
  const old=groups.get(groupId)??{id:groupId,memberIds:[],basisFactId,formedAt:h.at,ended:false};
  old.memberIds=action==='leave'?old.memberIds.filter(id=>!memberIds.includes(id)):[...new Set([...old.memberIds,...memberIds])];
  old.ended=action==='end';groups.set(groupId,old);
 }return [...groups.values()];
}
/** Pure bounded work list. Queries never advance RNG or consume eligibility. */
export function npcWork(w){
 const r=runtime(w);if(isFormal(r.plan)&&formalSlot(w).slot.protected)return [];
 const paths=contacts(w),work=[];
 for(const k of r.knowledge){
  if(k.actorId===w.identity.playerId)continue;
  const person=w.numeric.evolution.world.people[k.actorId];
  const former=formerAt(w,person);
  if(former&&!paths.some(f=>f.subjectIds.includes(k.actorId)))continue;
  const claim=r.claims.find(c=>c.id===k.claimId&&c.versionId===k.versionId);
  if(!done(w,k.actorId,k.claimId,k.versionId,k.belief))work.push({kind:'reaction',actorId:k.actorId,claimId:k.claimId,versionId:k.versionId});
  for(const f of paths)if(!r.facts.find(fact=>fact.id===claim.factId)?.data.confidential&&f.subjectIds.includes(k.actorId))for(const toId of f.subjectIds){
   if(toId===k.actorId||toId===w.identity.playerId||!w.numeric.evolution.world.people[toId])continue;
   if(r.knowledge.some(x=>x.actorId===toId&&x.claimId===claim.id))continue;
   if(r.history.some(h=>h.type==='npc-update'&&h.data.decisions.some(d=>d.kind==='forward'&&d.actorId===k.actorId&&d.toId===toId&&d.claimId===claim.id&&d.action==='forward')))continue;
   if(!w.numeric.evolution.world.relationships[directedKey(k.actorId,toId)]||!w.numeric.evolution.world.relationships[directedKey(toId,k.actorId)])continue;
   work.push({kind:'forward',actorId:k.actorId,toId,claimId:k.claimId,versionId:k.versionId,contactId:f.id});
  }
 }
 for(const f of paths)if(f.subjectIds.length===2&&f.subjectIds.every(id=>id!==w.identity.playerId&&w.numeric.evolution.world.people[id])){
  const [actorId,toId]=f.subjectIds,edge=w.numeric.evolution.world.relationships[directedKey(actorId,toId)];
  const cause=r.facts.find(c=>f.causeIds.includes(c.id)&&c.subjectIds.includes(actorId)&&c.subjectIds.includes(toId)&&c.witnessIds.includes(actorId)&&c.categoryCodes.some(code=>['H01-1','H01-2','H09-1'].includes(code)));
  if(edge&&cause&&!r.history.some(h=>h.type==='npc-update'&&h.data.decisions.some(d=>d.kind==='repair'&&d.causeId===cause.id&&d.actorId===actorId)))work.push({kind:'repair',actorId,toId,contactId:f.id,causeId:cause.id});
 }
 for(const f of paths)for(const actorId of f.subjectIds){const p=w.numeric.evolution.world.people[actorId];
  if(p&&(formerAt(w,p)||p.roleIds.includes(34))&&!r.history.some(h=>h.type==='npc-update'&&h.at.date.slice(0,4)===w.position.date.slice(0,4)&&h.data.decisions.some(d=>d.kind==='life'&&d.actorId===actorId)))work.push({kind:'life',actorId,contactId:f.id});
 }
 // Deterministic round-robin prevents a fixed leading set from monopolizing the budget.
 work.sort((a,b)=>{const left=canonicalData(a),right=canonicalData(b);return left<right?-1:left>right?1:0;});
 const targets=new Set(),eligible=work.filter(item=>{if(item.kind!=='forward')return true;const key=JSON.stringify([item.toId,item.claimId]);if(targets.has(key))return false;targets.add(key);return true;});
 const offset=eligible.length?r.plan.cursor%eligible.length:0;
 return [...eligible.slice(offset),...eligible.slice(0,offset)].slice(0,AUTONOMY_BUDGET);
}
export function claimTone(statement){return statement.includes('願意聽')?1:statement.includes('老師很急')?-1:0;}
function context(w,item){
 const r=runtime(w),c=r.claims.find(c=>c.id===item.claimId&&c.versionId===item.versionId),k=r.knowledge.find(k=>k.actorId===item.actorId&&k.claimId===item.claimId&&k.versionId===item.versionId);
 return {fact:{id:c.factId},claim:{id:c.id,factId:c.factId,versionId:c.versionId,evidence:'unverified'},knowledge:{actorId:k.actorId,claimId:c.id,knownVersions:[c.versionId],believedVersionId:k.belief==='believed'?c.versionId:null},route:{fromId:item.actorId,toId:item.toId,claimId:c.id,versionId:c.versionId,basisId:item.contactId,available:true}};
}
/** Uses N5 probabilities and N6 direct deltas; the coefficients below are engineering
 * policy parameters, never new relationship or reputation formulae. */
export function compileNpcUpdate(w){
 const r=runtime(w),operations=[],decisions=[],inputs=[],work=npcWork(w);
 const prior=r.history.some(h=>h.type==='npc-update'&&h.cursor===r.plan.cursor);
 const randomBefore=structuredClone(w.random.social??w.random.events);
 const rng=restoreRandom(randomBefore);
 const eventId=id('event',w,'background'),stageId=id('stage',w,'background');
 const event={schemaVersion:1,id:eventId,definitionId:'procedure:npc-social',contentVersion:AUTONOMY_VERSION,type:'direct',participantIds:[],stageId,facts:[],knowledge:[],results:[],choice:null};
 function fact(parts,subjects,description,data,causeIds=[],codes=[]){const fid=id('fact',w,...parts);operations.push({type:'fact',id:fid,eventId,stageId,subjectIds:[...new Set(subjects)],witnessIds:[...new Set(subjects)],description,data,categoryCodes:codes,causeIds});return fid;}
 function effect(fid,actorId,changes){if(changes.length)operations.push({type:'result',id:createId('result',[fid,actorId]),eventId,stageId,factId:fid,subjectId:actorId,facet:'npc-action',effects:[{id:createId('effect',[fid,actorId]),operation:{type:'direct',changes}}]});}
 const n=w.numeric.evolution.world;
 if(!prior)for(const contact of contacts(w).filter(f=>f.natural&&work.some(x=>x.contactId===f.id)))operations.push({type:'fact',id:contact.id,eventId,stageId,subjectIds:contact.subjectIds,witnessIds:contact.witnessIds,description:'人物依當前班級或家庭生活時段再次接觸。',data:contact.data,categoryCodes:[],causeIds:contact.causeIds});
 if(!prior)for(const [index,item] of work.entries()){
  const person=n.people[item.actorId],values=person.values;
  const knownStatement=item.kind==='reaction'?r.claims.find(c=>c.id===item.claimId&&c.versionId===item.versionId).statement:'';
  const evaluatesTeacher=knownStatement.includes('老師')||knownStatement.includes('教師');
  const teacherEdge=evaluatesTeacher?n.relationships[directedKey(item.actorId,w.identity.playerId)]:null;
  inputs.push({item:structuredClone(item),roleIds:[...person.roleIds],values:structuredClone(values),teacherEdge:teacherEdge?structuredClone(teacherEdge):null});
  const prefix=[String(index),item.kind,item.actorId];
  if(item.kind==='reaction'){
   const k=r.knowledge.find(k=>k.actorId===item.actorId&&k.claimId===item.claimId&&k.versionId===item.versionId),c=r.claims.find(c=>c.id===k.claimId&&c.versionId===k.versionId);
   // Interpret only what the person actually knows; never inspect the originating
   // story option, hidden teacher state, or the fact's private data.
   const empathetic=values['1-3']/100,calm=1-values['2-1']/100;
   const concern=k.belief==='believed'&&claimTone(c.statement)<0?2:0;
   const support=k.belief==='believed'&&claimTone(c.statement)>0?2:0;
   const action=['support','question','wait'][rng.weightedIndex([1+empathetic+calm+support+(teacherEdge?.values['5-1']??0)/100,1+values['1-4']/100+values['2-2']/100+concern+(teacherEdge?.values['5-4']??0)/100,2+values['4-2']/100])];
   const fid=fact(prefix,evaluatesTeacher?[item.actorId,w.identity.playerId]:[item.actorId],`人物依已知說法選擇${{support:'傾向支持',question:'保留質疑',wait:'觀望'}[action]}。`,{type:'npc-action',action,actorId:item.actorId,claimId:c.id,versionId:c.versionId},[c.factId]);
   const changes=[];
   if(teacherEdge&&action!=='wait'){
    const sign=action==='support'?1:-1;
    const proposal=prepareRelationshipChange({fromId:teacherEdge.fromId,toId:teacherEdge.toId,values:teacherEdge.values},{'5-1':sign,'5-4':-sign});
    for(const [code,delta] of Object.entries(proposal.deltas))changes.push({target:{kind:'relationship',id:directedKey(item.actorId,w.identity.playerId)},code,delta});
    if(n.reputations[directedKey(item.actorId,w.identity.playerId)])changes.push({target:{kind:'reputation',id:directedKey(item.actorId,w.identity.playerId)},code:sign>0?'8-1':'8-2',delta:1});
   }
   operations.find(o=>o.type==='fact'&&o.id===fid).witnessIds=[item.actorId];
   // The attitude is private; naming the teacher as subject grants no disclosure.
   effect(fid,item.actorId,changes);decisions.push({...item,action,basisBelief:k.belief,statement:c.statement,factId:fid});
  }else if(item.kind==='forward'){
   const ctx=context(w,item),from={id:item.actorId,values},to={id:item.toId,values:n.people[item.toId].values};
   const left=n.relationships[directedKey(item.actorId,item.toId)],right=n.relationships[directedKey(item.toId,item.actorId)];
   const edge=e=>({fromId:e.fromId,toId:e.toId,values:e.values});
   const p=forwardingProbability(from,edge(left),ctx).probability;
   const a=adoptionProbability(to,edge(right),ctx).probability;
   inputs.at(-1).route={to:structuredClone(to),left:structuredClone(left),right:structuredClone(right)};
   if(rng.next()>=p){decisions.push({...item,action:'silent'});continue;}
   const belief=['believed','uncertain','rejected'][rng.weightedIndex([a,1-a,(1-a)/2])];
   const sourceClaim=r.claims.find(c=>c.id===item.claimId&&c.versionId===item.versionId);
   const mode=['verbatim','partial','misread'][rng.weightedIndex([6,2,1])];
   let versionId=item.versionId;
   if(mode!=='verbatim'){
    versionId=id('claim',w,...prefix,'version');
    const statement=mode==='partial'?'轉述者只提到：'+sourceClaim.statement.split('，')[0]+'。':'轉述者推測對方是在責怪自己，原意尚未查證。';
    operations.push({type:'claim',id:item.claimId,versionId,factId:sourceClaim.factId,statement,sourceId:item.actorId});
    const accessId=fact([...prefix,'message'],[item.actorId],'轉述者寫下自己對已知消息的說法。',{type:'access',claimRefs:[{id:item.claimId,versionId}],parentVersionId:item.versionId},[item.contactId,sourceClaim.factId]);
    operations.push({type:'learn',actorId:item.actorId,claimId:item.claimId,versionId,source:{kind:'document',actorId:item.actorId,basisFactId:accessId},belief:'uncertain',confidence:.4});
   }
   operations.push({type:'learn',actorId:item.toId,claimId:item.claimId,versionId,source:{kind:'communication',actorId:item.actorId,basisFactId:item.contactId},belief,confidence:belief==='believed'?.6:.4});
   fact(prefix,[item.actorId,item.toId],'兩人接觸時轉述未經查證的說法。',{type:'npc-forward',claimId:item.claimId,versionId,parentVersionId:item.versionId,mode},[item.contactId],['H07-1']);
   decisions.push({...item,action:'forward',belief,mode,receivedVersionId:versionId});
  }else if(item.kind==='life'){
   const action=['continue','adjust','pause'][rng.weightedIndex([2,1+values['3-4']/100,1+values['2-3']/100])];
   const fid=fact(prefix,[item.actorId],'再次接觸時，人物依自身狀態延續或調整生活步調。',{type:'npc-life',action,actorId:item.actorId},[item.contactId],['H09-6']);
   effect(fid,item.actorId,action==='adjust'?[{target:{kind:'person',id:item.actorId},code:'7-4',delta:.5}]:[]);
   decisions.push({...item,action,factId:fid});
  }else{
   const edge=n.relationships[directedKey(item.actorId,item.toId)];inputs.at(-1).repairEdge=structuredClone(edge);
   const action=['repair','distant','seek-help'][rng.weightedIndex([1+values['1-3']/50+values['3-1']/50,1+values['4-2']/50,1+values['2-2']/50])];
   const fid=fact(prefix,[item.actorId,item.toId],`人物在再次接觸時選擇${{repair:'主動道歉',distant:'保持距離','seek-help':'提出尋求協助'}[action]}。`,{type:'npc-action',action,actorId:item.actorId},[item.causeId,item.contactId],action==='repair'?['H01-4']:[]);
   const proposal=prepareRelationshipChange({fromId:edge.fromId,toId:edge.toId,values:edge.values},action==='repair'?{'5-1':1,'5-4':-2}:action==='distant'?{'5-2':-1}:{});
   effect(fid,item.actorId,Object.entries(proposal.deltas).map(([code,delta])=>({target:{kind:'relationship',id:directedKey(item.actorId,item.toId)},code,delta})));
   if(action==='repair'&&!npcGroups(w).some(g=>g.id===createId('event',['cooperation',item.causeId])))operations.push({type:'npc-group',groupId:createId('event',['cooperation',item.causeId]),action:'join',memberIds:[item.actorId,item.toId],basisFactId:item.contactId});
   decisions.push({...item,action,factId:fid});
  }
 }
 if(operations.length){event.participantIds=[...new Set(operations.filter(o=>o.type==='fact').flatMap(o=>o.subjectIds))];operations.unshift({type:'open-event',event});}
 return {version:AUTONOMY_VERSION,classroom:{id:n.classroom.id,studentIds:[...n.classroom.studentIds]},inputs,decisions,operations,randomBefore,randomAfter:rng.snapshot(),duplicate:prior,beforeOrder:r.history.length};
}
/** History-only membership avoids copying N5 group scores or imposing fixed factions. */
export function checkNpcGroup(w,op){
 assertShape(op,['type','groupId','action','memberIds','basisFactId']);
 need(typeof op.groupId==='string'&&op.groupId.length>0&&['join','leave','end'].includes(op.action),'group identity/action');
 const f=runtime(w).facts.find(f=>f.id===op.basisFactId),g=npcGroups(w).find(g=>g.id===op.groupId);
 need(f&&f.cursor===runtime(w).plan.cursor&&f.data.type==='contact','current shared contact required');
 need(Array.isArray(op.memberIds)&&op.memberIds.length>0&&new Set(op.memberIds).size===op.memberIds.length&&op.memberIds.every(id=>f.subjectIds.includes(id)),'actual participants required');
 need(op.action==='join'?!g?.ended:g&&!g.ended&&op.memberIds.every(id=>g.memberIds.includes(id)),'membership transition');
 if(g&&op.action==='join')need(f.subjectIds.some(id=>g.memberIds.includes(id))&&op.memberIds.some(id=>!g.memberIds.includes(id)),'join requires existing member contact and new participant');
 if(!g)need(op.memberIds.length>=2,'formation requires shared experience');
 return {groupId:op.groupId,action:op.action,memberIds:op.memberIds,basisFactId:f.id};
}
/** Only the historical audit's mutable projection is detached. Journal, receipts
 * and immutable event carriers are read-only inputs to the pure compiler; copying
 * the entire accumulated career for every NPC observation grows quadratically. */
function auditProjection(w,h){
 const r=runtime(w),n=w.numeric.evolution.world;
 return {...w,identity:{...w.identity,attemptId:h.attemptId},position:planPosition(r.plan,h.cursor),random:{...w.random},
  numeric:{...w.numeric,evolution:{...w.numeric.evolution,world:{...n,classroom:{...n.classroom},people:{...n.people},relationships:{...n.relationships}}}},
  extensions:{...w.extensions,'teacher-hell/world':{...r,plan:{...r.plan}}}};
}
/** Import audit: reconstruct historical information and recorded numerical witnesses,
 * then recompile; also bind every generated consequence to its actual ledger row. */
export function validateNpcHistory(w){
 const r=runtime(w),seen=new Set(),randomByAttempt=new Map();
 for(const h of r.history.filter(h=>h.type==='npc-update')){
  const request=JSON.parse(r.commits.find(c=>c.id===h.operationId&&c.attemptId===h.attemptId).request);
  need(aftercareOwnsSlot(w,h)||request.operations.some(o=>o.type==='npc-update'||o.type==='finish-slot'||o.type==='story'&&o.action==='finish'||o.type==='school-action'&&r.history.some(c=>c.type==='campus'&&c.operationId===h.operationId&&c.cursor===h.cursor)&&r.history.some(c=>c.type==='slot-complete'&&c.operationId===h.operationId&&c.cursor===h.cursor)),'unowned autonomy update');
  const d=h.data;assertShape(d,['version','classroom','inputs','decisions','operations','randomBefore','randomAfter','duplicate','beforeOrder']);need(d.version===AUTONOMY_VERSION,'unsupported action version');
  need(!seen.has(h.cursor),'duplicate update at one slot');seen.add(h.cursor);
  if(randomByAttempt.has(h.attemptId))need(same(d.randomBefore,randomByAttempt.get(h.attemptId)),'random chain mismatch');randomByAttempt.set(h.attemptId,d.randomAfter);
  const at=auditProjection(w,h),a=runtime(at);
  at.numeric.evolution.world.classroom.id=d.classroom.id;at.numeric.evolution.world.classroom.studentIds=[...d.classroom.studentIds];
  need(d.classroom.studentIds.every(id=>(!w.numeric.evolution.world.registry||w.numeric.evolution.world.registry.enrollments.some(e=>e.personId===id&&e.classId===d.classroom.id))),'unknown historical class');
  a.plan.cursor=h.cursor;
  need(Number.isInteger(d.beforeOrder)&&d.beforeOrder<h.order,'action order');
  a.history=r.history.filter(x=>x.order<=d.beforeOrder);
  a.facts=r.facts.filter(x=>x.order<=d.beforeOrder);a.claims=r.claims.filter(x=>x.order<=d.beforeOrder);
  a.knowledge=structuredClone(r.knowledge.filter(x=>x.order<=d.beforeOrder));
  for(const k of a.knowledge){const acquired=r.history[k.order-1];let state={belief:acquired.data.belief,confidence:acquired.data.confidence};for(const b of a.history)if(b.type==='belief'&&b.data.actorId===k.actorId&&b.data.claimId===k.claimId&&b.data.versionId===k.versionId)state=b.data.after;Object.assign(k,state);}
  for(const input of d.inputs){need(at.numeric.evolution.world.people[input.item.actorId],'unknown input actor');at.numeric.evolution.world.people[input.item.actorId]={...at.numeric.evolution.world.people[input.item.actorId],values:input.values,roleIds:[...input.roleIds]};if(input.teacherEdge)at.numeric.evolution.world.relationships[directedKey(input.item.actorId,w.identity.playerId)]=input.teacherEdge;if(input.route){at.numeric.evolution.world.people[input.route.to.id]={...at.numeric.evolution.world.people[input.route.to.id],values:input.route.to.values};for(const e of [input.route.left,input.route.right])at.numeric.evolution.world.relationships[directedKey(e.fromId,e.toId)]=e;}if(input.repairEdge){const e=input.repairEdge;at.numeric.evolution.world.relationships[directedKey(e.fromId,e.toId)]=e;}}
  at.random.social=d.randomBefore;
  need(same(compileNpcUpdate(at),d),'action audit mismatch');
  for(const op of d.operations){
   if(op.type==='fact'){const f=r.facts.find(f=>f.id===op.id);need(f&&f.cursor===h.cursor&&same(f.data,op.data)&&same(f.subjectIds,op.subjectIds)&&same(f.witnessIds,op.witnessIds)&&f.eventId===op.eventId&&f.stageId===op.stageId&&same(f.causeIds,op.causeIds)&&f.description===op.description&&same(f.categoryCodes,op.categoryCodes),'action fact mismatch');}
   if(op.type==='claim')need(r.claims.some(c=>c.id===op.id&&c.versionId===op.versionId&&c.statement===op.statement&&c.sourceId===op.sourceId&&c.factId===op.factId),'claim version mismatch');
   if(op.type==='learn')need(r.knowledge.some(k=>k.actorId===op.actorId&&k.claimId===op.claimId&&k.versionId===op.versionId&&same(k.source,op.source)&&r.history[k.order-1].data.belief===op.belief&&r.history[k.order-1].data.confidence===op.confidence),'missing transmission');
   if(op.type==='result')need(w.events.some(e=>e.results.some(x=>x.id===op.id))&&op.effects.every(e=>[...w.numeric.receipts,...r.numericArchives.flatMap(a=>a.receipts)].some(x=>x.id===e.id&&same(JSON.parse(x.request).operation,e.operation))),'missing action settlement');
  }
 }
 if(randomByAttempt.has(w.identity.attemptId))need(same(w.random.social,randomByAttempt.get(w.identity.attemptId)),'current social random differs');
 for(const h of r.history.filter(h=>h.type==='npc-clarify')){
  const at=auditProjection(w,h),a=runtime(at);a.plan.cursor=h.cursor;
  a.knowledge=r.knowledge.filter(k=>k.order<h.data.beforeOrder);a.facts=r.facts.filter(f=>f.order<h.data.beforeOrder);a.claims=r.claims.filter(c=>c.order<h.data.beforeOrder);
  need(same(compileNpcClarification(at,h.data.operation),h.data.operations),'clarification audit');
 }
 for(const h of r.history.filter(h=>h.type==='npc-group')){const at=structuredClone(w);runtime(at).history=r.history.filter(x=>x.order<h.order);runtime(at).plan.cursor=h.cursor;need(same(checkNpcGroup(at,{type:'npc-group',...h.data}),h.data),'group audit');}
}

/** A witness may offer a sourced clarification; it revises belief, never rewrites truth. */
export function compileNpcClarification(w,op){
 assertShape(op,['type','sourceId','toId','claimId','versionId','contactId',...(Object.hasOwn(op,'evidence')?['evidence']:[])]);
 const r=runtime(w),c=r.claims.find(c=>c.id===op.claimId&&c.versionId===op.versionId);
 need(c,'clarification version');const f=r.facts.find(f=>f.id===c.factId),contact=r.facts.find(f=>f.id===op.contactId);
 const source=r.knowledge.find(k=>k.actorId===op.sourceId&&k.claimId===op.claimId&&k.versionId===op.versionId);
 need(source&&f.witnessIds.includes(op.sourceId)&&contact?.data.type==='contact'&&contact.cursor===r.plan.cursor&&contact.subjectIds.includes(op.sourceId)&&contact.subjectIds.includes(op.toId)&&op.sourceId!==op.toId,'clarification needs informed witness and current contact');
 let belief='uncertain',confidence=.5;
 if(op.evidence){
  assertShape(op.evidence,['factId','conclusion']);const evidence=r.facts.find(f=>f.id===op.evidence.factId);
  need(['believed','rejected'].includes(op.evidence.conclusion)&&evidence?.witnessIds.includes(op.sourceId)&&evidence.data?.type==='claim-evidence'&&evidence.data.claimId===c.id&&evidence.data.versionId===c.versionId&&evidence.data.conclusion===op.evidence.conclusion,'clarification evidence needs witnessed, version-specific support or refutation');
  belief=op.evidence.conclusion;confidence=.7;
 }
 const prior=r.knowledge.find(k=>k.actorId===op.toId&&k.claimId===op.claimId&&k.versionId===op.versionId);
 return prior?[{type:'belief',actorId:op.toId,claimId:c.id,versionId:c.versionId,belief,confidence}]:[{type:'learn',actorId:op.toId,claimId:c.id,versionId:c.versionId,source:{kind:'communication',actorId:op.sourceId,basisFactId:contact.id},belief,confidence}];
}
