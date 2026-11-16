/** B-batch isolated source/linkage gate; no full-year sim and no publishing. */
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
import {T02_DRAFT_STORIES,t02DraftCatalogue,resolveStory,validateStoryReference} from '../src/runtime/story-content.js';
import {T02_ISOLATED_IDS} from '../src/runtime/content/t02-isolation.js';
import {T02_BATCH_RECORDS} from '../src/runtime/content/t02.js';
import {validateEventDefinitions,buildEventCandidates} from '../src/runtime/event-candidates.js';
import {eventWorld} from './support/event-fixtures.js';
const registry=JSON.parse(readFileSync(new URL('../work/18b-global-event-isolation.json',import.meta.url),'utf8'));
const blocked=new Set(registry.t02.entries.map(e=>e.id));
test('T02 B: all 208 immutable source records resolve; 17 tracked exclusions stay outside catalogue',()=>{
 assert.equal(T02_DRAFT_STORIES.length,208);
 assert.equal(T02_BATCH_RECORDS.length,208);
 assert.equal(blocked.size,17);
 assert.deepEqual([...blocked].sort(),[...T02_ISOLATED_IDS].sort());
 assert.equal(registry.t02.entries.filter(e=>e.status==='blocked').length,9);
 assert.equal(registry.t02.entries.filter(e=>e.status==='held').length,8);
 for(const {story,definition} of T02_BATCH_RECORDS){
  assert.equal(story.status,'engineering-test');
  assert.equal(definition.content.status,'engineering-test');
  assert.equal(resolveStory(definition.content).resourceId,story.resourceId);
  validateStoryReference(definition);
 }
 const c=t02DraftCatalogue();
 assert.equal(c.engineering,true);
 assert.equal(c.definitions.length,191);
 assert.equal(c.bindings.length,191);
 assert.equal(c.catalogueId.startsWith('engineering:'),true);
 assert.equal(c.definitions.some(d=>blocked.has(d.id)),false);
 assert.equal(c.definitions.every(d=>d.content.status==='engineering-test'),true);
 validateEventDefinitions(c.definitions);
 const formal=buildEventCandidates(eventWorld(1,'2028-09-11','early'),c.definitions,{engineering:false});
 assert.equal(formal.candidates.length,0,'formal content remains closed even if catalogue is supplied');
});
test('T02 B: regenerated JS equals author JSON and global isolation index',()=>{
 assert.doesNotThrow(()=>execFileSync(process.execPath,['scripts/sync-t02-drafts.mjs','--check'],{cwd:new URL('../',import.meta.url),stdio:'pipe'}));
});
