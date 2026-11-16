/** C-batch focused integration: T01/T02 immutable resolvers and publication isolation. */
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {T01_BATCH_RECORDS} from '../src/runtime/content/t01.js';
import {T02_BATCH_RECORDS} from '../src/runtime/content/t02.js';
import {T02_ISOLATED_IDS} from '../src/runtime/content/t02-isolation.js';
import {T01_DRAFT_STORIES,T02_DRAFT_STORIES,t01DraftCatalogue,t02DraftCatalogue,resolveStory,validateStoryReference} from '../src/runtime/story-content.js';
import {buildEventCandidates,validateEventDefinitions} from '../src/runtime/event-candidates.js';
import {eventWorld} from './support/event-fixtures.js';
const read=p=>JSON.parse(readFileSync(new URL('../'+p,import.meta.url),'utf8'));
test('C: both authoring catalogues preserve 408 immutable engineering stories',()=>{
 assert.equal(T01_BATCH_RECORDS.length,200);assert.equal(T02_BATCH_RECORDS.length,208);
 assert.equal(T01_DRAFT_STORIES.length,200);assert.equal(T02_DRAFT_STORIES.length,208);
 const all=[...T01_BATCH_RECORDS,...T02_BATCH_RECORDS], ids=new Set(all.map(r=>r.definition.id));
 assert.equal(ids.size,408);
 for(const r of all){
  assert.equal(r.story.status,'engineering-test');
  assert.equal(r.definition.content.status,'engineering-test');
  assert.equal(r.story.resourceId,r.definition.id);
  assert.equal(resolveStory(r.definition.content).resourceId,r.story.resourceId);
  assert.equal(validateStoryReference(r.definition).resourceId,r.story.resourceId);
 }
});
test('C: T02 registry keeps 17 blocked/held recoverable but excluded; T01 lacks invented per-ID holds',()=>{
 const register=read('work/18b-global-event-isolation.json');
 assert.equal(register.t01.authorCount,200);
 assert.deepEqual(register.t01.confirmedIndividualBlockedIds,[]);
 assert.deepEqual(register.t01.confirmedIndividualHeldIds,[]);
 const ids=register.t02.entries.map(r=>r.id).sort();
 assert.deepEqual([...T02_ISOLATED_IDS],ids);
 assert.equal(register.t02.entries.filter(e=>e.status==='blocked').length,9);
 assert.equal(register.t02.entries.filter(e=>e.status==='held').length,8);
 const catalogue=t02DraftCatalogue(),chosen=new Set(catalogue.definitions.map(d=>d.id));
 assert.equal(catalogue.definitions.length,191);
 for(const id of ids){
  assert.equal(chosen.has(id),false);
  assert.equal(T02_BATCH_RECORDS.some(r=>r.definition.id===id),true);
 }
});
test('C: no T01/T02 records can enter the formal pool; both catalogues require engineering opt-in',()=>{
 const a=t01DraftCatalogue(),b=t02DraftCatalogue();
 assert.equal(a.engineering,true);assert.equal(b.engineering,true);
 assert.equal(a.definitions.length,200);assert.equal(b.definitions.length,191);
 validateEventDefinitions(a.definitions);validateEventDefinitions(b.definitions);
 assert.equal(a.bindings.length,200);assert.equal(b.bindings.length,191);
 const w=eventWorld(1,'2028-09-11','early');
 assert.equal(buildEventCandidates(w,a.definitions,{engineering:false}).candidates.length,0);
 assert.equal(buildEventCandidates(w,b.definitions,{engineering:false}).candidates.length,0);
});
