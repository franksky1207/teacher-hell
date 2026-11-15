/** 18-B2 only. Three bounded isolated story checks, not a live catalogue or whole-game test. */
import test from 'node:test';
import assert from 'node:assert/strict';
import {PILOT_18B2_STORIES,validateStory} from '../src/runtime/story-content.js';
import {apply,storyAction,advanceDemo} from './support/story-scenario.js';
import {eventWorld,definition,draw} from './support/event-fixtures.js';
import {availableStoryChoices,readStory} from '../src/runtime/story.js';
import {runtimeOf,restoreWorldState} from '../src/runtime/model.js';
import {projectIssues} from '../src/runtime/issues.js';
import {directedKey} from '../src/world/relationships.js';

/** Draw at the normal opening, then admit at the actual lunch/noon reservation. */
function beginPilot(content,slot){
 let w=eventWorld(1);
 const d=definition(content.definitionId,{topicId:content.topicId,content:{resourceId:content.resourceId,version:content.version,status:content.status}});
 d.eligibility.slotIds=[slot];
 w=apply(w,[draw([d])]);
 const selection=runtimeOf(w).history.findLast(h=>h.type==='event-selection').data.selected[0];
 assert.ok(selection,'seed must select this isolated story');
 for(let i=0;i<16&&w.position.slotId!==selection.slotId;i++)w=advanceDemo(w);
 assert.equal(w.position.slotId,selection.slotId,'reach reserved official calendar slot');
 w=apply(w,[{type:'admit-event',eventId:selection.eventId}]);
 return {world:w,eventId:selection.eventId};
}
function onLastPage(world,eventId){
 let w=world;
 for(let i=0;i<8&&readStory(w,eventId).canNext;i++)w=apply(w,[storyAction(eventId,'next')]);
 assert.equal(readStory(w,eventId).canNext,false,'all pages consumed before choosing');
 return w;
}

test('18-B2 03: contacting canteen opens a specific unresolved issue; other route does not',()=>{
 const s=PILOT_18B2_STORIES[0];
 assert.equal(validateStory(s),s);
 let {world:w,eventId}=beginPilot(s,'lunch');
 w=onLastPage(w,eventId);
 w=apply(w,[storyAction(eventId,'select','contact')]);
 assert.equal(projectIssues(w).length,0);
 w=apply(w,[storyAction(eventId,'confirm')]);
 const opened=projectIssues(w);
 assert.equal(opened.length,1);
 assert.equal(opened[0].kind,'meal-delivery-followup');
 assert.equal(opened[0].state,'open');
 assert.deepEqual(projectIssues(restoreWorldState(JSON.stringify(w))),opened);
 w=apply(w,[storyAction(eventId,'finish')]);
 for(let i=0;i<40&&!readStory(w,eventId).canResume;i++)w=advanceDemo(w);
 assert.ok(readStory(w,eventId).canResume,'bounded next-day story continuation');
 w=apply(w,[storyAction(eventId,'resume')]);
 w=onLastPage(w,eventId);
 w=apply(w,[storyAction(eventId,'select','verified')]);
 w=apply(w,[storyAction(eventId,'confirm')]);
 const closed=projectIssues(w);
 assert.equal(closed.length,1);
 assert.equal(closed[0].id,opened[0].id);
 const checked=runtimeOf(w).facts.findLast(f=>f.eventId===eventId&&f.data.type==='story-action');
 assert.ok(['delivered','not-confirmed'].includes(checked.data.variantId),'one audited outcome variant');
 assert.equal(closed[0].state,checked.data.variantId==='delivered'?'closed':'open');
 assert.equal(closed[0].latestOperation.type,checked.data.variantId==='delivered'?'close':'progress');
 const alternative=beginPilot(s,'lunch');
 const other=apply(apply(onLastPage(alternative.world,alternative.eventId),[storyAction(alternative.eventId,'select','care')]),[storyAction(alternative.eventId,'confirm')]);
 assert.equal(projectIssues(other).length,0);
});

test('18-B2 13: empathy replacement and student-to-teacher relationship stay directional',()=>{
 const story=PILOT_18B2_STORIES[1];
 assert.equal(validateStory(story),story);
 let {world:w,eventId}=beginPilot(story,'noon');
 w=onLastPage(w,eventId);
 const e=w.events.find(x=>x.id===eventId);
 const student=e.participantIds[0],teacher=w.identity.playerId;
 // The numeric source is the existing student person record, not an authored trait flag.
 const low=structuredClone(w),high=structuredClone(w);
 low.numeric.evolution.world.people[student].values['1-3']=40;
 high.numeric.evolution.world.people[student].values['1-3']=80;
 assert.ok(availableStoryChoices(low,e,story.stages[0]).some(x=>x.id==='private'));
 assert.ok(availableStoryChoices(high,e,story.stages[0]).some(x=>x.id==='empathetic'));
 const before=w.numeric.evolution.world.relationships[directedKey(student,teacher)]?.values?.['5-1'];
 w=apply(w,[storyAction(eventId,'select','consent')]);
 w=apply(w,[storyAction(eventId,'confirm')]);
 const effect=runtimeOf(w).history.filter(h=>h.type==='effect').flatMap(h=>h.data.changes);
 assert.ok(effect.some(x=>x.target.id===directedKey(student,teacher)&&x.code==='5-1'));
 assert.ok(!effect.some(x=>x.target.id===directedKey(teacher,student)&&x.code==='5-1'));
 assert.ok(before===undefined||Number.isFinite(before));
 assert.deepEqual(restoreWorldState(JSON.stringify(w)),w);
});

test('18-B2 20: only explicit teacher-to-student communication discloses the selected fact',()=>{
 const story=PILOT_18B2_STORIES[2];
 assert.equal(validateStory(story),story);
 let {world:w,eventId}=beginPilot(story,'lunch');
 w=onLastPage(w,eventId);
 const student=w.events.find(x=>x.id===eventId).participantIds[0],teacher=w.identity.playerId;
 w=apply(w,[storyAction(eventId,'select','separate')]);
 w=apply(w,[storyAction(eventId,'confirm')]);
 const r=runtimeOf(w);
 const action=r.facts.find(f=>f.eventId===eventId&&f.data.type==='story-action');
 assert.ok(action);
 assert.deepEqual(action.witnessIds,[teacher]);
 assert.ok(r.disclosures.some(d=>d.actorId===student&&d.factId===action.id&&d.source?.kind==='communication'));
 const another=w.numeric.evolution.world.classroom.studentIds.find(id=>id!==student);
 assert.ok(!r.disclosures.some(d=>d.actorId===another&&d.factId===action.id));
 const effects=r.history.filter(h=>h.type==='effect').flatMap(h=>h.data.changes);
 assert.ok(effects.some(x=>x.target.id===directedKey(student,teacher)));
 assert.deepEqual(restoreWorldState(JSON.stringify(w)),w);
});
