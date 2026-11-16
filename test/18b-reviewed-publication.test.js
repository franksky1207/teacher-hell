import test from 'node:test';
import assert from 'node:assert/strict';
import {T01_BATCH_RECORDS} from '../src/runtime/content/t01.js';
import {T02_BATCH_RECORDS} from '../src/runtime/content/t02.js';
import {T02_ISOLATED_IDS} from '../src/runtime/content/t02-isolation.js';
import {T01_T02_PUBLISHED_STORIES,t01T02PublishedCatalogue,resolveStory,validateStoryReference} from '../src/runtime/story-content.js';
import {validateEventDefinitions,buildEventCandidates} from '../src/runtime/event-candidates.js';
import {eventWorld} from './support/event-fixtures.js';
import {registerEventCatalogue} from '../src/runtime/event-selection.js';
import {planProgression,progressionContext} from '../src/runtime/progression.js';

test('18-B: 390 accepted v2 are ready, preserve all v1 drafts and the exact 18 holds',()=>{
 const catalogue=t01T02PublishedCatalogue();
 assert.equal(catalogue.engineering,false);
 assert.equal(catalogue.catalogueId,'content:18b-t01-t02-reviewed-v2');
 assert.equal(T01_BATCH_RECORDS.length,200);
 assert.equal(T02_BATCH_RECORDS.length,208);
 assert.equal(T02_ISOLATED_IDS.length,18);
 assert.equal(new Set(T02_ISOLATED_IDS).size,18);
 assert.ok(T02_ISOLATED_IDS.includes('content:18b-t02-05-23'));
 assert.equal(T01_T02_PUBLISHED_STORIES.length,390);
 assert.equal(catalogue.definitions.length,391); // 390 plus existing guidance
 assert.equal(catalogue.bindings.length,391);
 validateEventDefinitions(catalogue.definitions);
 const published=new Set(catalogue.definitions.map(d=>d.id));
 for(const id of T02_ISOLATED_IDS)assert.ok(!published.has(id),id);
 for(const record of [...T01_BATCH_RECORDS,...T02_BATCH_RECORDS]){
  const approved=!T02_ISOLATED_IDS.includes(record.definition.id);
  const draft=resolveStory({resourceId:record.story.resourceId,version:'1'});
  assert.equal(draft.status,'engineering-test',record.definition.id);
  assert.equal(record.story.status,'engineering-test',record.definition.id);
  assert.equal(published.has(record.definition.id),approved,record.definition.id);
  if(approved){
   const production=resolveStory({resourceId:record.story.resourceId,version:'2'});
   assert.equal(production.status,'ready',record.definition.id);
   const definition=catalogue.definitions.find(d=>d.id===record.definition.id);
   assert.equal(definition.content.version,'2');
   assert.equal(validateStoryReference(definition).resourceId,record.story.resourceId);
  }else{
   assert.throws(()=>resolveStory({resourceId:record.story.resourceId,version:'2'}));
  }
 }
});

test('18-B: official catalogue creates candidates without engineering switch',()=>{
 const w=eventWorld(1,'2028-09-11','early');
 const catalogue=t01T02PublishedCatalogue();
 assert.equal(registerEventCatalogue(w,catalogue).catalogueId,catalogue.catalogueId);
 const chosen=buildEventCandidates(w,catalogue.definitions,{engineering:false});
 assert.ok(Array.isArray(chosen.candidates));
 assert.ok(chosen.candidates.every(c=>c.content.status==='ready'));
 assert.ok(chosen.candidates.every(c=>!T02_ISOLATED_IDS.includes(c.definitionId)));
});

test('18-B: school progression registers v2 once and then draws from it',()=>{
 const w=eventWorld(1,'2028-09-11','early');
 const c=progressionContext(w);
 c.schoolEnabled=true;
 c.failed=false;c.completed=false;c.pendingReview=null;c.aftercare=null;
 c.stories=[];c.reserved=[];c.catalogueIds=[];c.dayDrawn=false;c.slotComplete=false;
 const init=planProgression(c);
 assert.equal(init.status,'action');
 assert.equal(init.request.operations[0].type,'register-event-catalogue');
 assert.equal(init.request.operations[0].catalogueId,'content:18b-t01-t02-reviewed-v2');
 c.catalogueIds=['content:18b-t01-t02-reviewed-v2'];
 const draw=planProgression(c);
 assert.equal(draw.request.operations[0].type,'draw-events');
 assert.equal(draw.request.operations[0].catalogueId,'content:18b-t01-t02-reviewed-v2');
});
