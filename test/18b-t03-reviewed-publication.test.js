import test from 'node:test';
import assert from 'node:assert/strict';
import {T03_BATCH_RECORDS} from '../src/runtime/content/t03.js';
import {T03_ISOLATED_IDS} from '../src/runtime/content/t03-isolation.js';
import {T03_DRAFT_STORIES,T01_T02_T03_PUBLISHED_STORIES,t01T02T03PublishedCatalogue,resolveStory,validateStoryReference} from '../src/runtime/story-content.js';
import {validateEventDefinitions,buildEventCandidates} from '../src/runtime/event-candidates.js';
import {eventWorld} from './support/event-fixtures.js';
import {registerEventCatalogue} from '../src/runtime/event-selection.js';
import {planProgression,progressionContext} from '../src/runtime/progression.js';

test('T03 227 v1 immutable; exactly 201 v2 ready, 26 excluded',()=>{
 assert.equal(T03_BATCH_RECORDS.length,227);
 assert.equal(T03_DRAFT_STORIES.length,227);
 assert.equal(T03_ISOLATED_IDS.length,26);
 assert.equal(new Set(T03_ISOLATED_IDS).size,26);
 assert.equal(T01_T02_T03_PUBLISHED_STORIES.length,201);
 const cat=t01T02T03PublishedCatalogue();
 assert.equal(cat.engineering,false);
 assert.equal(cat.definitions.length,592); // 390 old + 201 new + 1 guidance
 assert.equal(cat.bindings.length,592);
 validateEventDefinitions(cat.definitions);
 const publicIds=new Set(cat.definitions.map(x=>x.id));
 for(const r of T03_BATCH_RECORDS){
  const id=r.definition.id;
  assert.equal(resolveStory({resourceId:r.story.resourceId,version:'1'}).status,'engineering-test');
  if(T03_ISOLATED_IDS.includes(id)){
   assert.ok(!publicIds.has(id),id);
   assert.throws(()=>resolveStory({resourceId:r.story.resourceId,version:'2'}));
  }else{
   assert.ok(publicIds.has(id),id);
   assert.equal(resolveStory({resourceId:r.story.resourceId,version:'2'}).status,'ready');
   assert.equal(validateStoryReference(cat.definitions.find(x=>x.id===id)).resourceId,r.story.resourceId);
  }
 }
});

test('T03 formal catalogue is selectable and contains no held content',()=>{
 const w=eventWorld(1,'2028-09-11','early'),cat=t01T02T03PublishedCatalogue();
 assert.equal(registerEventCatalogue(w,cat).catalogueId,cat.catalogueId);
 const result=buildEventCandidates(w,cat.definitions,{engineering:false});
 assert.ok(Array.isArray(result.candidates));
 assert.ok(result.candidates.every(x=>x.content.status==='ready'&&!T03_ISOLATED_IDS.includes(x.definitionId)));
});

test('T03 new and existing careers draw only from versioned 591-story catalogue',()=>{
 const w=eventWorld(1,'2028-09-11','early'),c=progressionContext(w);
 Object.assign(c,{schoolEnabled:true,failed:false,completed:false,pendingReview:null,aftercare:null,stories:[],reserved:[],dayDrawn:false,slotComplete:false,catalogueIds:[]});
 const init=planProgression(c);
 assert.equal(init.request.operations[0].catalogueId,'content:18b-t01-t02-t03-reviewed-v2');
 c.catalogueIds=['content:18b-t01-t02-reviewed-v2'];
 assert.equal(planProgression(c).request.operations[0].catalogueId,'content:18b-t01-t02-t03-reviewed-v2');
 c.catalogueIds.push('content:18b-t01-t02-t03-reviewed-v2');
 const draw=planProgression(c);
 assert.equal(draw.request.operations[0].type,'draw-events');
 assert.equal(draw.request.operations[0].catalogueId,'content:18b-t01-t02-t03-reviewed-v2');
});
