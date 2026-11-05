/** Fixed engineering baselines, explicit skipped dates; operations use the production runtime. */
import { eventWorld } from './event-fixtures.js';
import { prepareWorldOperation } from '../../src/runtime/transactions.js';
import { runtimeOf,restoreWorldState } from '../../src/runtime/model.js';
import { request,event,fact,open } from './runtime.js';
import { positionFor,cursorFor,semester,latestPreparedSemester } from '../../src/calendar/calendar.js';
import { startEvolution } from '../../src/evolution/time.js';
import { startSettlement } from '../../src/changes/settlement.js';
export function applySchool(w,ops,tag=null){return prepareWorldOperation(w,{...request(w,tag??'academic-'+runtimeOf(w).revision,ops),calendarContext:{kind:'routine'}}).world;}
export function academicWorld(seed=74,date=null,slot=null){let w=eventWorld(seed,date,slot);return applySchool(w,[{type:'academic',action:'open',termId:latestPreparedSemester(w.position.date).id}]);}
export function academicBaseline(w,date,slot='private'){
 w=structuredClone(w);const p=positionFor(date,slot,2026);w.position=p;runtimeOf(w).plan.cursor=cursorFor(date,slot,2026);
 // Explicit engineering date baseline: preserve prior receipts, but do not claim skipped daily evolution.
 w.numeric.evolution.clock.date=date;w.numeric.evolution.clock.lastNaturalDate=null;return restoreWorldState(w);
}
export function academicCause(w,personId,subject,delta,tag='influence'){
 const e=event(w,tag);e.definitionId='procedure:academic-source';e.participantIds=[w.identity.playerId,personId];
 const f=fact(e,tag,{subjectIds:e.participantIds,witnessIds:[personId],data:{type:'academic-influence',change:{personId,subject,delta}}});
 return {world:prepareWorldOperation(w,{...request(w,'cause-'+tag,[open(e),f]),calendarContext:{kind:'procedure'}}).world,id:f.id};
}
export function completeAcademic(seed=74){let w=academicWorld(seed),meta=semester('2026:autumn');for(const round of [1,2,3,0]){w=academicBaseline(w,meta.exams[round===0?2:round-1].at(-1));w=applySchool(w,[{type:'academic',action:'assess',termId:meta.id,round}]);}return applySchool(w,[{type:'academic',action:'close',termId:meta.id}]);}

/** Production 06 selection + 07 confirmation + 09 learning; no fabricated score premise. */
export async function academicStoryRoute(seed=74,option='listen'){
 const {createRandom}=await import('../../src/numeric/random.js'),{ACADEMIC_STORY}=await import('../../src/runtime/story-content.js'),{demoDefinition,storyAction}=await import('./story-scenario.js'),{binding}=await import('./event-fixtures.js'),{readStory}=await import('../../src/runtime/story.js');
 let w=eventWorld(seed);w.random.events=createRandom(1).snapshot();w=applySchool(w,[{type:'academic',action:'open',termId:'2026:autumn'}]);
 const formal=ops=>{w=prepareWorldOperation(w,request(w,'academic-story-'+runtimeOf(w).revision,ops)).world;};
 const d=demoDefinition(ACADEMIC_STORY);formal([{type:'register-event-catalogue',catalogueId:'engineering:academic-story',definitions:[d],bindings:[binding(d)],engineering:true}]);formal([{type:'draw-events',catalogueId:'engineering:academic-story'}]);const selected=runtimeOf(w).history.findLast(h=>h.type==='event-selection').data.selected[0];if(!selected)throw Error('Fixed event seed produced no story');formal([{type:'admit-event',eventId:selected.eventId}]);
 const personId=w.events.find(e=>e.id===selected.eventId).participantIds[0];while(readStory(w,selected.eventId).canNext)formal([storyAction(selected.eventId,'next')]);formal([storyAction(selected.eventId,'select',option)]);formal([storyAction(selected.eventId,'confirm')]);formal([storyAction(selected.eventId,'finish')]);return {world:w,personId,eventId:selected.eventId};
}
