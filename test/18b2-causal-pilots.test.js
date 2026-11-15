/** 18-B2 only. Three bounded isolated story checks, not a live catalogue or whole-game test. */
import test from 'node:test';
import assert from 'node:assert/strict';
import {PILOT_18B2_STORIES,validateStory} from '../src/runtime/story-content.js';
import {beginDemo,apply,storyAction,advanceDemo} from './support/story-scenario.js';
import {availableStoryChoices,readStory} from '../src/runtime/story.js';
import {runtimeOf,restoreWorldState} from '../src/runtime/model.js';
import {projectIssues} from '../src/runtime/issues.js';
import {directedKey} from '../src/world/relationships.js';

test('18-B2 03: contacting canteen opens a specific unresolved issue; other route does not',()=>{
 const s=PILOT_18B2_STORIES[0];
 assert.equal(validateStory(s),s);
 let {world:w,eventId}=beginDemo(1,s);
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
 w=apply(w,[storyAction(eventId,'select','verified')]);
 w=apply(w,[storyAction(eventId,'confirm')]);
 const closed=projectIssues(w);
 assert.equal(closed.length,1);
 assert.equal(closed[0].id,opened[0].id);
 assert.equal(closed[0].state,'closed');
 const alternative=beginDemo(1,s);
 const other=apply(apply(alternative.world,[storyAction(alternative.eventId,'select','care')]),[storyAction(alternative.eventId,'confirm')]);
 assert.equal(projectIssues(other).length,0);
});

test('18-B2 13: empathy replacement and student-to-teacher relationship stay directional',()=>{
 const story=PILOT_18B2_STORIES[1];
 assert.equal(validateStory(story),story);
 let {world:w,eventId}=beginDemo(1,story);
 const e=w.events.find(x=>x.id===eventId);
 const student=e.participantIds[0],teacher=w.identity.playerId;
 // The numeric source is the existing student person record, not an authored trait flag.
 const original=availableStoryChoices(w,e,story.stages[0]).map(x=>x.id);
 assert.ok(original.includes('private')||original.includes('empathetic'));
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
 let {world:w,eventId}=beginDemo(1,story);
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
