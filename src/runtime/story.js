import { targetRecord } from '../changes/targets.js';
import { applyDelta } from '../numeric/math.js';
/** Story transitions are compiled into existing world operations by transactions.js. */
import { resolveStory,storyDigest } from './story-content.js';
import { createId } from '../contracts/foundation.js';
import { canonicalData } from '../changes/settlement.js';
import { deriveWorldPanel } from '../social/reputation.js';
import { formalSlot } from './schedule.js';
import { assertShape } from '../player/panel.js';
const r=w=>w.extensions['teacher-hell/world'];
const need=(v,m)=>{if(!v)throw new RangeError(`STORY: ${m}`);};
const same=(a,b)=>canonicalData(a)===canonicalData(b);
export function storyContent(w,eventId){
 const s=r(w).history.filter(h=>h.type==='event-selection').flatMap(h=>h.data.selected).find(s=>s.eventId===eventId);
 if(!s)return null;
 try{return resolveStory(s.content);}catch(error){if(s.content.status==='ready'||s.content.resourceId.startsWith('engineering:'))throw error;return null;}
}
export function storyState(w,eventId){return r(w).history.findLast(h=>h.type==='story'&&h.eventId===eventId)?.data.state??null;}
const stageId=(e,c,id)=>id===c.entry?createId('stage',[e.id,'initial']):createId('stage',[e.id,c.version,id]);
function carrier(c,id){const s=c.stages.find(s=>s.id===id);return s.choices.length?{nodeId:id,options:s.choices.map(o=>({id:o.id,emotional:o.emotional})),confirmedOptionId:null}:null;}
function due(date,days){return new Date(Date.parse(date+'T00:00:00Z')+days*86400000).toISOString().slice(0,10);}
export function availableStoryChoices(w,e,stage){return stage.choices.filter(option=>(option.requires??[]).every(condition=>{
 if(condition.type==='fact')return r(w).facts.some(f=>f.id===condition.id);
 const target={kind:condition.role==='teacher'?`player-${condition.holder}`:'person',id:condition.role==='teacher'?w.identity.playerId:e.participantIds[condition.role==='companion'?1:0]};
 try{const value=targetRecord(w.numeric.evolution.world,target)[condition.code];return Number.isFinite(value)&&value>=condition.min&&value<=condition.max;}catch{return false;}
}));}
export function compileStory(w,op){
 assertShape(op,['type','eventId','action','optionId']);need(op.type==='story','operation');const e=w.events.find(e=>e.id===op.eventId),c=storyContent(w,op.eventId);need(e&&c,'registered admitted playable event');
 need(!formalSlot(w).slot.protected,'protected activity');
 const previous=storyState(w,e.id);need(!previous||previous.contentDigest===storyDigest(c),'content version changed in place; retain old resource or migrate explicitly');
 const state=previous?structuredClone(previous):{contentDigest:storyDigest(c),stage:c.entry,page:0,pending:null,mode:'reading',next:null,dueDate:null,basisFactId:null,panelDelta:Object.fromEntries(Object.keys(deriveWorldPanel(w.numeric.evolution.world)).map(k=>[k,0]))};
 const s=c.stages.find(s=>s.id===state.stage),operations=[],inputs=[];
 if(['select','confirm'].includes(op.action))for(const option of s.choices)for(const condition of option.requires??[])if(condition.type==='numeric'){const target={kind:condition.role==='teacher'?`player-${condition.holder}`:'person',id:condition.role==='teacher'?w.identity.playerId:e.participantIds[condition.role==='companion'?1:0]};const value=targetRecord(w.numeric.evolution.world,target)[condition.code];need(Number.isFinite(value),'missing qualification field');inputs.push({target,code:condition.code,value});}
 need(op.action==='select'?typeof op.optionId==='string':op.optionId===null,'option only on select');
 if(op.action==='start'){need(!previous,'already started');
  for(const stage of c.stages)for(const option of stage.choices)for(const change of option.outcome.changes){const target={kind:change.role==='teacher'?`player-${change.holder}`:'person',id:change.role==='teacher'?w.identity.playerId:e.participantIds[change.role==='companion'?1:0]};need(Object.hasOwn(targetRecord(w.numeric.evolution.world,target),change.code),'missing outcome field on bound actor');}
  for(const stage of c.stages){for(const page of stage.pages)for(const actor of [...page.cast.map(a=>a.role),...(page.speaker?[page.speaker]:[])])need(actor!=='companion'||e.participantIds[1],'missing cast binding');for(const option of stage.choices)for(const claim of option.outcome.claims)need(claim.role!=='companion'||e.participantIds[1],'missing claim actor');}
  e.choice=carrier(c,c.entry);
  if(c.premise){const fid=createId('fact',[e.id,c.version,'premise']),subjects=[...new Set([...e.participantIds,w.identity.playerId])];operations.push({type:'fact',id:fid,eventId:e.id,stageId:e.stageId,subjectIds:subjects,witnessIds:subjects,description:c.premise.description,data:structuredClone(c.premise.data),categoryCodes:[],causeIds:[]},{type:'reveal',actorId:w.identity.playerId,factId:fid,source:{kind:'observation',actorId:w.identity.playerId,basisFactId:fid}});state.basisFactId=fid;}
 }
 else {
  need(previous&&state.mode!=='ended','event ended or not started');
  if(op.action==='previous'||op.action==='next'){
   need(state.mode==='reading','reading only');const n=state.page+(op.action==='next'?1:-1);need(n>=0&&n<s.pages.length,'page boundary');state.page=n;
  }else if(op.action==='select'){
   need(['reading','confirming'].includes(state.mode)&&state.page===s.pages.length-1,'decision on last page');need(availableStoryChoices(w,e,s).some(o=>o.id===op.optionId),'illegal or unavailable option');state.pending=op.optionId;state.mode='confirming';
  }else if(op.action==='cancel'){
   need(state.mode==='confirming','no pending confirmation');state.pending=null;state.mode='reading';
  }else if(op.action==='confirm'){
   need(state.mode==='confirming'&&state.pending!==null,'secondary confirmation required');need(availableStoryChoices(w,e,s).some(o=>o.id===state.pending),'option qualification changed');const o=s.choices.find(o=>o.id===state.pending),out=o.outcome;
   operations.push({type:'confirm-choice',eventId:e.id,stageId:e.stageId,optionId:o.id,optionText:o.text});
   const fid=createId('fact',[e.id,c.version,s.id,o.id]);const actors={teacher:w.identity.playerId,participant:e.participantIds[0],...(e.participantIds.length>1?{companion:e.participantIds[1]}:{})};
   const subjects=[...new Set(Object.values(actors))];
   operations.push({type:'fact',id:fid,eventId:e.id,stageId:e.stageId,subjectIds:subjects,witnessIds:subjects,description:out.fact,data:{type:'story-action',optionId:o.id,contentVersion:c.version},categoryCodes:out.historyCodes,causeIds:state.basisFactId?[state.basisFactId]:[]});
   operations.push({type:'reveal',actorId:actors.teacher,factId:fid,source:{kind:'observation',actorId:actors.teacher,basisFactId:fid}});
   for(const [i,q] of out.claims.entries()){
    const id=createId('claim',[fid,String(i)]),actorId=actors[q.role];
    operations.push({type:'claim',id,versionId:c.version,factId:fid,statement:q.statement,sourceId:actorId});
    operations.push({type:'learn',actorId,claimId:id,versionId:c.version,source:{kind:'observation',actorId,basisFactId:fid},belief:q.belief,confidence:.6});
    if(q.visible&&actorId!==actors.teacher){operations.push({type:'fact',id:createId('fact',[id,'contact']),eventId:e.id,stageId:e.stageId,subjectIds:subjects,witnessIds:subjects,description:'當事人向教師表達自己的看法。',data:{type:'contact'},categoryCodes:[],causeIds:[fid]});operations.push({type:'learn',actorId:actors.teacher,claimId:id,versionId:c.version,source:{kind:'communication',actorId,basisFactId:createId('fact',[id,'contact'])},belief:'uncertain',confidence:.5});}
   }
   if(!r(w).history.some(h=>h.type==='event-exposure'&&h.eventId===e.id))operations.push({type:'event-exposure',eventId:e.id,participantIds:[...e.participantIds].filter(id=>id!==w.identity.playerId),basisFactId:fid});
   const changes=out.changes.map(x=>({target:{kind:x.role==='teacher'?`player-${x.holder}`:'person',id:actors[x.role]},code:x.code,delta:x.delta}));
   operations.push({type:'result',id:createId('result',[fid]),eventId:e.id,stageId:e.stageId,factId:fid,subjectId:actors.teacher,facet:'confirmed-action',effects:[{id:createId('effect',[fid]),operation:{type:'direct',changes}}]});
   state.basisFactId=fid;state.pending=null;state.next=out.next.stage;state.dueDate=due(w.position.date,out.next.afterDays);state.mode='result';
  }else if(op.action==='finish'){
   need(state.mode==='result'||state.mode==='reading'&&!s.choices.length&&state.page===s.pages.length-1,'finish after result or final narrative page');
   if(state.mode==='reading'){
    const fid=createId('fact',[e.id,c.version,s.id,'narrative-complete']);
    const subjects=[...new Set([...e.participantIds,w.identity.playerId])];
    operations.push({type:'fact',id:fid,eventId:e.id,stageId:e.stageId,subjectIds:subjects,witnessIds:[w.identity.playerId],description:'教師完成本階段的閱讀與觀察。',data:{type:'story-observation',contentVersion:c.version},categoryCodes:[],causeIds:state.basisFactId?[state.basisFactId]:[]});
    operations.push({type:'reveal',actorId:w.identity.playerId,factId:fid,source:{kind:'observation',actorId:w.identity.playerId,basisFactId:fid}});
    state.basisFactId=fid;state.next=s.next.stage;state.dueDate=due(w.position.date,s.next.afterDays);
   }
   if(state.next===null){need(state.basisFactId,'ending needs a causal fact');state.mode='ended';operations.push({type:'event-lifecycle',eventId:e.id,status:'ended',basisFactId:state.basisFactId});}
   else if(state.dueDate>w.position.date){state.mode='waiting';operations.push({type:'event-lifecycle',eventId:e.id,status:'waiting',basisFactId:state.basisFactId});}
   else enter();
   // A stage consumes its current slot. Immediate stages share that slot until completion.
   if(['waiting','ended'].includes(state.mode))operations.push({type:'finish-slot',completedActivityIds:[]});
  }else if(op.action==='resume'){
   need(state.mode==='waiting'&&state.dueDate<=w.position.date,'follow-up not due');
   operations.push({type:'event-lifecycle',eventId:e.id,status:'active',basisFactId:state.basisFactId});enter();
  }else throw new RangeError('STORY: unknown action');
 }
 function enter(){state.stage=state.next;state.next=null;state.dueDate=null;state.page=0;state.mode='reading';operations.push({type:'stage',eventId:e.id,fromStageId:e.stageId,stageId:stageId(e,c,state.stage),choice:carrier(c,state.stage)});}
 return {state,operations,inputs};
}
export function guardStoryOperation(w,op,internal){
 if(op.type==='story'||!r(w).history.some(h=>h.type==='event-selection'))return;
 if(internal&&!['finish-slot','advance-time'].includes(op.type))return;
 if(['finish-slot','advance-time'].includes(op.type)){
  need(!w.events.some(e=>{const s=storyState(w,e.id);return e.id!==internal&&storyContent(w,e.id)&&(!s||!['waiting','ended'].includes(s.mode)||s.mode==='waiting'&&s.dueDate<=w.position.date&&!formalSlot(w).slot.protected);}), 'unfinished story or due follow-up blocks time');return;
 }
 let id=op.eventId;
 if(!id&&op.factId)id=r(w).facts.find(f=>f.id===op.factId)?.eventId;
 if(!id&&op.claimId){const f=r(w).claims.find(c=>c.id===op.claimId&&c.versionId===op.versionId)?.factId;id=r(w).facts.find(x=>x.id===f)?.eventId;}
 if(id&&['stage','result','confirm-choice','fact','link-fact','claim','learn','belief','reveal','event-lifecycle','event-exposure'].includes(op.type))need(!storyContent(w,id),'playable consequences require story operation');
}
export function readStory(w,eventId){
 const c=storyContent(w,eventId),state=storyState(w,eventId);need(c&&state,'story not started');const s=c.stages.find(s=>s.id===state.stage),e=w.events.find(e=>e.id===eventId);
 const actor=role=>role==='teacher'?w.identity.playerId:e.participantIds[role==='companion'?1:0];
 const p=s.pages[state.page];
 return {eventId,page:{...structuredClone(p),speaker:p.speaker===null?null:actor(p.speaker),cast:p.cast.map(a=>({...a,actorId:actor(a.role)}))},pageIndex:state.page,pageCount:s.pages.length,
 canPrevious:state.mode==='reading'&&state.page>0,canNext:state.mode==='reading'&&state.page<s.pages.length-1,
 choices:state.mode==='reading'&&state.page===s.pages.length-1?availableStoryChoices(w,e,s).map(o=>({id:o.id,text:o.text})):[],
 confirmation:state.mode==='confirming'?{optionId:state.pending,text:s.choices.find(o=>o.id===state.pending).text}:null,
 canFinish:state.mode==='result'||state.mode==='reading'&&!s.choices.length&&state.page===s.pages.length-1,waiting:state.mode==='waiting',canResume:state.mode==='waiting'&&state.dueDate<=w.position.date&&!formalSlot(w).slot.protected,ended:state.mode==='ended',teacherDelta:state.panelDelta,
 result:state.mode==='result'||state.mode==='ended'?r(w).disclosures.filter(d=>d.actorId===w.identity.playerId&&e.facts.some(f=>f.id===d.factId)).map(d=>r(w).facts.find(f=>f.id===d.factId).description):[]};
}
/** Audit action transitions and compiled consequences, never trust saved stage/page labels. */
export function validateStoryHistory(w){
 const selected=new Map(r(w).history.filter(h=>h.type==='event-selection').flatMap(h=>h.data.selected).map(s=>[s.eventId,s]));
 if(!selected.size)return;
 for(const e of w.events){if(!selected.has(e.id))continue;const c=storyContent(w,e.id);if(!c)continue;
  const entries=r(w).history.filter(h=>h.type==='story'&&h.eventId===e.id);need(entries.length,'admitted story missing start');let previous=null;
  for(const h of entries){
   const commit=r(w).commits.find(q=>q.id===h.operationId),request=JSON.parse(commit.request);let op=request.operations.find(o=>o.type==='story'&&o.eventId===e.id);
   if(!op&&request.operations.some(o=>o.type==='admit-event'&&o.eventId===e.id))op={type:'story',eventId:e.id,action:'start',optionId:null};
   need(op&&same(op,h.data.action),'history action differs');
   const atWorld=structuredClone(w);atWorld.position={...atWorld.position,...h.at};r(atWorld).plan.cursor=h.cursor;
   r(atWorld).history=r(w).history.filter(x=>x.order<h.order&&!(x.operationId===h.operationId&&x.eventId===e.id));
   const ae=atWorld.events.find(x=>x.id===e.id);ae.stageId=stageId(e,c,previous?.stage??c.entry);ae.choice=carrier(c,previous?.stage??c.entry);
   for(const input of h.data.inputs){need(Number.isFinite(input.value)&&input.value>=0&&input.value<=100,'invalid qualification witness');targetRecord(atWorld.numeric.evolution.world,input.target)[input.code]=input.value;}
   const compiled=compileStory(atWorld,op);need(same(compiled.inputs,h.data.inputs),'qualification witness differs');
   if(op.action==='confirm'){
    const effect=r(w).history.find(x=>x.operationId===h.operationId&&x.type==='effect'&&x.eventId===e.id);need(effect,'missing effect audit');
    const before=structuredClone(w.numeric.evolution.world),after=structuredClone(before);
    for(const x of effect.data.observed){const change=effect.data.changes.find(c=>same(c.target,x.target)&&c.code===x.code);need(change&&x.after===applyDelta(x.before,change.delta),'invalid numerical observation');targetRecord(before,x.target)[x.code]=x.before;targetRecord(after,x.target)[x.code]=x.after;}
    const a=deriveWorldPanel(before),b=deriveWorldPanel(after);compiled.state.panelDelta=Object.fromEntries(Object.keys(a).map(k=>[k,compiled.state.panelDelta[k]+(b[k]-a[k])]));
   }
   need(same(compiled.state,h.data.state)&&same(compiled.operations,h.data.operations),'illegal story transition or consequences');
   for(const operation of compiled.operations){
    if(operation.type==='fact'){const f=r(w).facts.find(f=>f.id===operation.id);need(f&&f.description===operation.description&&same(f.data,operation.data)&&same(f.subjectIds,operation.subjectIds)&&same(f.witnessIds,operation.witnessIds)&&same(f.categoryCodes,operation.categoryCodes)&&same(f.causeIds,operation.causeIds)&&f.eventId===e.id&&f.stageId===operation.stageId,'fact differs from action');}
    if(operation.type==='learn'){const learned=r(w).knowledge.find(k=>k.actorId===operation.actorId&&k.claimId===operation.claimId&&k.versionId===operation.versionId);need(learned&&same(learned.source,operation.source)&&r(w).history[learned.order-1].data.belief===operation.belief&&r(w).history[learned.order-1].data.confidence===operation.confidence,'knowledge differs from action');}
    if(operation.type==='reveal')need(r(w).disclosures.some(d=>d.actorId===operation.actorId&&d.factId===operation.factId&&same(d.source,operation.source)),'disclosure differs from action');
    if(operation.type==='result'){const result=e.results.find(x=>x.id===operation.id);need(result&&result.factId===operation.factId&&result.stageId===operation.stageId&&result.subjectId===operation.subjectId&&result.facet===operation.facet&&same(result.effectIds,operation.effects.map(e=>e.id)),'missing causal result');for(const eff of operation.effects){const nr=w.numeric.receipts.find(x=>x.id===eff.id)??r(w).numericArchives.flatMap(a=>a.receipts).find(x=>x.id===eff.id);need(nr&&same(JSON.parse(nr.request).operation,eff.operation),'N6 differs from action');}}
   }
   previous=h.data.state;
  }
  for(const h of r(w).history.filter(x=>x.eventId===e.id&&x.type!=='story')){
   const owner=entries.find(x=>x.operationId===h.operationId);
   const request=JSON.parse(r(w).commits.find(q=>q.id===h.operationId).request);
   const external=r(w).history.find(x=>x.operationId===h.operationId&&['npc-update','npc-clarify'].includes(x.type)&&x.data.operations.some(o=>h.type==='claim'?o.type==='claim'&&o.id===h.data.claimId&&o.versionId===h.data.versionId:['knowledge','belief'].includes(h.type)&&['learn','belief'].includes(o.type)&&o.actorId===h.data.actorId&&o.claimId===h.data.claimId&&(o.versionId===h.data.versionId||h.type==='belief'&&o.belief==='believed'&&same(h.data.after,{belief:'uncertain',confidence:.4}))));
   if(external&&['claim','knowledge','belief'].includes(h.type)){
    const background=r(w).history.find(x=>x.operationId===h.operationId&&['npc-update','npc-clarify'].includes(x.type));
    need(background&&background.data.operations.some(o=>h.type==='claim'?o.type==='claim'&&o.id===h.data.claimId&&o.versionId===h.data.versionId:['learn','belief'].includes(o.type)&&o.actorId===h.data.actorId&&o.claimId===h.data.claimId&&(o.versionId===h.data.versionId||h.type==='belief'&&o.belief==='believed'&&same(h.data.after,{belief:'uncertain',confidence:.4}))),'unowned external knowledge change');
    continue;
   }
   need(owner&&!request.operations.some(o=>o.eventId===e.id&&!['story','admit-event'].includes(o.type)),'unowned playable consequence');
   const operations=owner.data.operations;
   if(h.type==='claim'){const claim=r(w).claims.find(c=>c.id===h.data.claimId);need(operations.some(o=>o.type==='claim'&&o.id===claim.id&&o.statement===claim.statement&&o.sourceId===claim.sourceId),'claim changed');}
   if(h.type==='fact')need(operations.some(o=>o.type==='fact'&&o.id===h.data.factId),'extra fact');
  }
  need(e.stageId===stageId(e,c,previous.stage),'current stage changed');const expected=carrier(c,previous.stage);if(expected&&['result','waiting','ended'].includes(previous.mode)){const selected=entries.findLast(h=>h.data.action.action==='confirm'&&h.data.state.stage===previous.stage);expected.confirmedOptionId=selected?.data.operations.find(o=>o.type==='confirm-choice')?.optionId??null;}
  need(same(e.choice,expected),'choice differs');
  const original=r(w).history.filter(h=>h.type==='event-selection').flatMap(h=>h.data.selected).find(s=>s.eventId===e.id);
  need(same(e.participantIds,[...new Set([...original.participantIds,...(e.facts.length?[w.identity.playerId]:[])])]),'participants changed');
 }
}
