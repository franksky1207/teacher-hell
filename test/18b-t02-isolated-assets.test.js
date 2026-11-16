/** T02 B: limited JS resource and isolation handoff checks. No gameplay simulation. */
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {validateStory,validateStoryReference,resolveStory,T02_DRAFT_STORIES,t02DraftCatalogue} from '../src/runtime/story-content.js';
import {T02_ISOLATED_IDS} from '../src/runtime/content/t02-isolation.js';
import {T02_BATCH_RECORDS} from '../src/runtime/content/t02.js';
import {validateEventDefinitions,buildEventCandidates} from '../src/runtime/event-candidates.js';
import {eventWorld} from './support/event-fixtures.js';
const read=p=>JSON.parse(readFileSync(new URL('../'+p,import.meta.url),'utf8'));
test('B: 208 assets preserve source JSON and validate immutable references',()=>{
 const authored=Array.from({length:8},(_,i)=>read('work/18b-t02-0'+(i+1)+'-authoring.json').records).flat();
 assert.equal(authored.length,208);assert.equal(T02_BATCH_RECORDS.length,208);
 assert.equal(T02_DRAFT_STORIES.length,208);
 for(let i=0;i<208;i++){
  const src=authored[i],asset=T02_BATCH_RECORDS[i];
  assert.deepEqual(asset,{story:src.story,definition:src.definition,binding:src.binding});
  assert.equal(asset.story.status,'engineering-test');assert.equal(asset.definition.content.status,'engineering-test');
  assert.strictEqual(validateStory(asset.story).resourceId,src.story.resourceId);
  assert.equal(validateStoryReference(asset.definition).resourceId,src.story.resourceId);
  assert.equal(resolveStory(asset.definition.content).definitionId,src.definition.id);
 }
});
test('B: 18 blocked/held never enter the T02 opt-in engineering catalogue',()=>{
 const registry=read('work/18b-global-event-isolation.json');
 const expected=registry.t02.entries.map(e=>e.id).sort();
 assert.deepEqual([...T02_ISOLATED_IDS],expected);
 assert.equal(registry.t02.entries.filter(x=>x.status==='blocked').length,9);
 assert.equal(registry.t02.entries.filter(x=>x.status==='held').length,9);
 const catalogue=t02DraftCatalogue(),ids=new Set(catalogue.definitions.map(d=>d.id));
 assert.equal(catalogue.engineering,true);
 assert.equal(catalogue.definitions.length,190);
 assert.equal(catalogue.bindings.length,190);
 validateEventDefinitions(catalogue.definitions);
 for(const id of expected){assert.equal(ids.has(id),false,id);assert.ok(T02_BATCH_RECORDS.some(r=>r.definition.id===id),'original source must stay retrievable');}
 assert.equal(new Set(catalogue.bindings.map(x=>x.definitionId)).size,190);
});
test('B: formal candidate pool stays closed even when isolated catalogue is supplied',()=>{
 const catalogue=t02DraftCatalogue();
 const formal=buildEventCandidates(eventWorld(1,'2028-09-11','early'),catalogue.definitions,{engineering:false});
 assert.equal(formal.candidates.length,0);
});
