/** 16-B focused read-only navigation and formal story persistence checks.
 * Pure projections only; this is not a browser or real IndexedDB test.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import {beginDemo} from './support/story-scenario.js';
import {currentStory,makeStoryRequest} from '../web/story-controller.js';
import {renderStoryView} from '../web/story-view.js';
import {projectNotebookPeople} from '../web/notebook-people.js';
import {projectNotebookEvents} from '../web/notebook-events.js';
import {renderNotebookView} from '../web/notebook-view.js';
import {prepareWorldOperation} from '../src/runtime/transactions.js';

test('16-B: opening notebook views between story pages is read-only and retains current story position',()=>{
 const {world}=beginDemo();
 const original=JSON.stringify(world),before=currentStory(world);
 assert.ok(before?.canNext);
 const people=projectNotebookPeople(world),events=projectNotebookEvents(world);
 const peopleHtml=renderNotebookView({date:world.position.date,grade:1,tab:'people',people});
 const historyHtml=renderNotebookView({date:world.position.date,grade:1,tab:'events',events});
 assert.match(peopleHtml,/class="notebook"/);
 assert.match(historyHtml,/class="notebook"/);
 assert.match(renderStoryView(currentStory(world)),/data-story-action="next"/);
 assert.deepEqual(currentStory(world),before);
 assert.equal(JSON.stringify(world),original);
});

test('16-B: formal story page and unconfirmed option survive re-read without extra settlement',()=>{
 let {world}=beginDemo();
 const first=currentStory(world);
 world=prepareWorldOperation(world,makeStoryRequest(world,first.eventId,'next')).world;
 assert.equal(currentStory(JSON.parse(JSON.stringify(world))).pageIndex,1);
 while(currentStory(world).canNext){
  const view=currentStory(world);
  world=prepareWorldOperation(world,makeStoryRequest(world,view.eventId,'next')).world;
 }
 const beforeChoice=structuredClone(world.numeric);
 const view=currentStory(world);
 world=prepareWorldOperation(world,makeStoryRequest(world,view.eventId,'select','listen')).world;
 const saved=JSON.stringify(world),restored=JSON.parse(saved);
 const selected=currentStory(restored);
 assert.equal(selected.confirmation?.optionId,'listen');
 projectNotebookPeople(restored);
 projectNotebookEvents(restored);
 assert.equal(JSON.stringify(restored),saved);
 assert.deepEqual(currentStory(restored),selected);
 // Reading and selecting (without confirming) cannot settle numeric outcomes.
 assert.deepEqual(restored.numeric,beforeChoice);
});
