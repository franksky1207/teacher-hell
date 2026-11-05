import { createRandom } from '../../src/numeric/random.js';
/** Reproducible engineering scenarios; all changes use the production transaction. */
import { beginDemo,apply,storyAction,advanceDemo } from './story-scenario.js';
import { eventWorld } from './event-fixtures.js';
import { readStory } from '../../src/runtime/story.js';
import { runtimeOf,restoreWorldState } from '../../src/runtime/model.js';
import { createId } from '../../src/contracts/foundation.js';
import { prepareWorldOperation } from '../../src/runtime/transactions.js';
import { readPlayerView } from '../../src/runtime/views.js';
import { buildEventCandidates } from '../../src/runtime/event-candidates.js';
import { definition } from './event-fixtures.js';
export function npcRequest(w,operations){return {id:createId('operation',['npc-scenario',String(runtimeOf(w).revision)]),attemptId:w.identity.attemptId,expectedRevision:runtimeOf(w).revision,actorId:w.identity.playerId,preconditions:[],calendarContext:{kind:'procedure'},operations};}
export function npcApply(w,operations){return prepareWorldOperation(w,npcRequest(w,operations)).world;}
export function npcRoute(option='listen',seed=1,{socialSeed=15,finish=true}={}){let {world:w,eventId}=beginDemo(seed);w.random.social=createRandom(socialSeed).snapshot();while(readStory(w,eventId).canNext)w=apply(w,[storyAction(eventId,'next')]);w=apply(w,[storyAction(eventId,'select',option)]);w=apply(w,[storyAction(eventId,'confirm')]);
 const a=w.events.find(e=>e.id===eventId).participantIds[0],b=w.numeric.evolution.world.careLinks.find(l=>l.studentId===a).caregiverId;
 const contactEventId=createId('event',[eventId,'family-contact']),stageId=createId('stage',[contactEventId]);
 w=npcApply(w,[{type:'open-event',event:{schemaVersion:1,id:contactEventId,definitionId:'procedure:npc-family-message',contentVersion:'1',type:'direct',participantIds:[a,b],stageId,facts:[],knowledge:[],results:[],choice:null}},{type:'fact',id:createId('fact',[contactEventId]),eventId:contactEventId,stageId,subjectIds:[a,b],witnessIds:[a,b],description:'學生透過已建立的家庭訊息聯繫照顧者，教師不在場。',data:{type:'contact'},categoryCodes:[],causeIds:[runtimeOf(w).claims.find(c=>c.sourceId===a).factId]}]);
 if(finish){w=apply(w,[storyAction(eventId,'finish')]);w=advanceDemo(w);w=npcApply(w,[{type:'npc-update'}]);}return {world:w,eventId};}
export function peerScenario(seed=1){
 let w=eventWorld(seed);const [a,b]=w.numeric.evolution.world.classroom.studentIds;
 const eventId=createId('event',['npc-peer',String(seed)]),stageId=createId('stage',[eventId]);
 const conflictId=createId('fact',[eventId,'conflict']),contactId=createId('fact',[eventId,'contact']);
 w=npcApply(w,[{type:'open-event',event:{schemaVersion:1,id:eventId,definitionId:'procedure:peer-contact',contentVersion:'1',type:'direct',participantIds:[a,b],stageId,facts:[],knowledge:[],results:[],choice:null}},
 {type:'fact',id:conflictId,eventId,stageId,subjectIds:[a,b],witnessIds:[a,b],description:'兩位學生對合作安排發生口頭爭執。',data:{type:'peer-conflict'},categoryCodes:['H01-1'],causeIds:[]},
 {type:'fact',id:contactId,eventId,stageId,subjectIds:[a,b],witnessIds:[a,b],description:'兩人再度碰面，教師不在場。',data:{type:'contact'},categoryCodes:[],causeIds:[conflictId]}]);
 return {world:w,a,b,conflictId,contactId};
}
export function npcReport(w){
 const r=runtimeOf(w),updates=r.history.filter(h=>h.type==='npc-update');
 const d=definition('test:npc-followup');d.topicId='E02-01';d.eligibility.facts=updates.flatMap(h=>h.data.decisions.filter(d=>d.factId).map(d=>({id:d.factId,participant:true}))).slice(0,1);
 const before=JSON.stringify(w),restored=restoreWorldState(before);
 const request=JSON.parse(r.commits.at(-1).request),resend=prepareWorldOperation(restored,request);
 return {resend:resend.duplicate&&JSON.stringify(resend.world)===before,knowledge:r.knowledge.map(k=>({actorId:k.actorId,claimId:k.claimId,versionId:k.versionId,source:k.source,belief:k.belief})),consequences:r.history.filter(h=>h.type==='effect'&&w.events.find(e=>e.id===h.eventId)?.definitionId==='procedure:npc-social').map(h=>h.data.observed),objectiveActions:r.facts.filter(f=>f.data.type?.startsWith('npc-')).map(f=>({id:f.id,description:f.description,data:f.data,causeIds:f.causeIds})),position:w.position,decisions:updates.flatMap(h=>h.data.decisions),player:readPlayerView(w),candidateCount:r.plan.validation==='fixed-calendar-v1'?buildEventCandidates(w,[d],{engineering:true}).candidates.length:null,restored:JSON.stringify(restored)===before,formalSelections:r.history.filter(h=>h.type==='event-selection').length,numericReceipts:w.numeric.receipts.length};
}
export function informationScenario(seed=1){
 let {world:w,a,b,conflictId,contactId}=peerScenario(seed);const claimId=createId('claim',[conflictId]);
 w=npcApply(w,[{type:'claim',id:claimId,versionId:'original',factId:conflictId,statement:'兩人對合作安排的理解不同，原因仍待確認。',sourceId:a},{type:'learn',actorId:a,claimId,versionId:'original',source:{kind:'observation',actorId:a,basisFactId:conflictId},belief:'believed',confidence:.7}]);
 return {world:w,a,b,conflictId,contactId,claimId};
}
