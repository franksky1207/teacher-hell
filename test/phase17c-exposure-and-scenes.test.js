import test from 'node:test';
import assert from 'node:assert/strict';
import {originalCohortExposure,studentCandidateCoverage} from '../src/runtime/student-exposure.js';
import {eventWorld,definition} from './support/event-fixtures.js';
import {beginDemo,apply,storyAction} from './support/story-scenario.js';
import {readStory} from '../src/runtime/story.js';
import {restoreWorldState} from '../src/runtime/model.js';
import {validateStory,DEMO_STORY} from '../src/runtime/story-content.js';
import {STORY_SCENE_LOCATIONS,STORY_SCENE_IDS} from '../src/runtime/story-scenes.js';
import {BACKGROUND_ENTRIES} from '../web/background-scenes.js';
import {selectScene} from '../web/scene-context.js';
import {projectStoryScene,expressionsThroughPage} from '../web/story-scene.js';

test('17-C: original 40 are tracked without inventing exposures, quotas or outcomes',()=>{
 const w=eventWorld(),snapshot=JSON.stringify(w),audit=originalCohortExposure(w);
 assert.equal(audit.initialCount,40);
 assert.equal(audit.unseenCount,40);
 assert.equal(audit.observedCount,0);
 assert.equal(audit.students.length,40);
 assert.equal(new Set(audit.students.map(s=>s.id)).size,40);
 assert.ok(audit.students.every(s=>s.substantiveCount===0&&s.active));
 const none=studentCandidateCoverage(w,[],{engineering:true});
 assert.equal(none.candidateCount,0);
 assert.equal(none.unseenWithoutCandidateCount,40);
 const eligible=studentCandidateCoverage(w,[definition()],{engineering:true});
 assert.equal(eligible.candidateCount,40);
 assert.equal(eligible.unseenEligibleCount,40);
 assert.equal(JSON.stringify(w),snapshot,'diagnostics must be read-only');
});

test('17-C: substantive exposure begins only after confirmed action and survives reload',()=>{
 let {world:w,eventId}=beginDemo();
 assert.equal(originalCohortExposure(w).observedCount,0);
 while(readStory(w,eventId).canNext)w=apply(w,[storyAction(eventId,'next')]);
 w=apply(w,[storyAction(eventId,'select','listen')]);
 assert.equal(originalCohortExposure(w).observedCount,0);
 w=apply(w,[storyAction(eventId,'confirm')]);
 const audit=originalCohortExposure(w);
 assert.equal(audit.observedCount,1);
 assert.equal(audit.unseenCount,39);
 const restored=restoreWorldState(JSON.stringify(w));
 assert.deepEqual(originalCohortExposure(restored),audit);
});

test('17-C: all authored physical locations reference existing artwork and validate',()=>{
 const backed=new Set(BACKGROUND_ENTRIES.map(e=>e.scene));
 assert.ok(STORY_SCENE_IDS.length>=27);
 assert.ok(STORY_SCENE_IDS.every(id=>backed.has(STORY_SCENE_LOCATIONS[id].scene)));
 const content=structuredClone(DEMO_STORY);
 content.stages[0].pages[0].scene='school:health-room';
 assert.doesNotThrow(()=>validateStory(content));
 content.stages[0].pages[0].scene='outside:not-an-existing-place';
 assert.throws(()=>validateStory(content),/SCENE/);
});

test('17-C: authored locations win over slot fallback; unknown location never invents artwork',()=>{
 assert.equal(selectScene({slotId:'early',sceneTag:'school:health-room'}).scene,'school-health-room');
 assert.equal(selectScene({slotId:'p4',sceneTag:'outside:cafe'}).scene,'outside-cafe');
 assert.equal(selectScene({slotId:'private',sceneTag:'graduation:evening-party'}).scene,'graduation-evening-party');
 assert.equal(selectScene({slotId:'early',sceneTag:'nonexistent:scene'}).scene,'school-classroom');
});

test('17-C: all six actor expressions remain author-controlled and restored by page replay',()=>{
 const all=['calm','happy','angry','sad','surprised','embarrassed'];
 const world={identity:{playerId:'teacher'},numeric:{evolution:{world:{people:{student:{kind:'student'}},registry:{profiles:{student:{displayName:'學生'}}}}}}};
 for(const expression of all){
  const page={scene:'school:health-room',text:'對話',presentation:'dialogue',speaker:'student',cast:[{role:'participant',actorId:'student',position:'center',expression}]};
  const scene=projectStoryScene(world,{page},new Map([['participant',expression]]));
  assert.equal(scene.cast[0].expression,expression);
  assert.equal(scene.label,'健康中心');
  assert.equal(expressionsThroughPage([{...page,speaker:'participant'}],0).get('participant'),expression);
 }
});
