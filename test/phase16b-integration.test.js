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
 const saved=JSON.stringify(world);
 const restored=JSON.parse(saved);
 const page=currentStory(restored);
 assert.equal(page.pageIndex,1);
 projectNotebookPeople(restored);
 projectNotebookEvents(restored);
 assert.equal(JSON.stringify(restored),saved);
 assert.deepEqual(currentStory(restored),page);
 // No new transaction or numeric update occurs from querying the same view.
 assert.deepEqual(restored.numeric,world.numeric);
});
