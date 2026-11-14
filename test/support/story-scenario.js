/** Engineering scenario; never part of the public content catalogue. */
import { eventWorld,definition,binding } from './event-fixtures.js';
import { prepareWorldOperation } from '../../src/runtime/transactions.js';
import { runtimeOf,restoreWorldState } from '../../src/runtime/model.js';
import { createId } from '../../src/contracts/foundation.js';
import { formalSlot } from '../../src/runtime/schedule.js';
import { DEMO_STORY } from '../../src/runtime/story-content.js';
import { readStory } from '../../src/runtime/story.js';
export function storyRequest(w,operations){return {id:createId('operation',['story-scenario',String(runtimeOf(w).revision)]),attemptId:w.identity.attemptId,expectedRevision:runtimeOf(w).revision,actorId:w.identity.playerId,preconditions:[],operations};}
export const apply=(w,ops)=>prepareWorldOperation(w,storyRequest(w,ops)).world;
export const storyAction=(eventId,action,optionId=null)=>({type:'story',eventId,action,optionId});
export function demoDefinition(content=DEMO_STORY){const d=definition(content.definitionId,{topicId:content.topicId,content:{resourceId:content.resourceId,version:content.version,status:content.status}});d.eligibility.slotIds=['early'];return d;}
export function beginDemo(seed=1,content=DEMO_STORY,date=null){let w=date?eventWorld(seed,date,'vacation-day'):eventWorld(seed);const d=demoDefinition(content);if(date)d.eligibility.slotIds=['vacation-day'];w=apply(w,[{type:'register-event-catalogue',catalogueId:'engineering:story-demo-v1',definitions:[d],bindings:[binding(d)],engineering:true}]);w=apply(w,[{type:'draw-events',catalogueId:'engineering:story-demo-v1'}]);const selected=runtimeOf(w).history.find(h=>h.type==='event-selection').data.selected[0];if(!selected)throw Error('Demo seed produced no event');w=apply(w,[{type:'admit-event',eventId:selected.eventId}]);return {world:w,eventId:selected.eventId};}
export function advanceDemo(w){const r=runtimeOf(w),ops=[];if(!r.history.some(h=>h.type==='slot-complete'&&h.cursor===r.plan.cursor))ops.push({type:'finish-slot',completedActivityIds:formalSlot(w).slot.activityIds});ops.push({type:'advance-time',planId:r.plan.id,steps:1});return apply(w,ops);}
export function completeRoute(optionId='listen'){
 let {world:w,eventId}=beginDemo();const action=(a,id=null)=>{w=apply(w,[storyAction(eventId,a,id)]);};
 while(readStory(w,eventId).canNext)action('next');action('select',optionId);action('cancel');action('select',optionId);action('confirm');const immediate=readStory(w,eventId);action('finish');
 const saved=JSON.stringify(w);w=restoreWorldState(saved);const restored=JSON.stringify(w)===saved;
 while(!readStory(w,eventId).canResume)w=advanceDemo(w);action('resume');while(readStory(w,eventId).canNext)action('next');action('select','plan');action('confirm');action('finish');
 return {world:w,eventId,report:{route:optionId,choices:runtimeOf(w).history.filter(h=>h.type==='choice').map(h=>h.data.optionId),stages:runtimeOf(w).history.filter(h=>h.type==='story'&&['start','resume'].includes(h.data.action.action)).map(h=>({stage:h.data.state.stage,date:h.at.date})),immediate:immediate.result,final:readStory(w,eventId),facts:runtimeOf(w).facts.map(f=>({description:f.description,causeIds:f.causeIds})),restored}};
}
