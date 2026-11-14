import test from 'node:test';
import assert from 'node:assert/strict';
import {PHASE17D_READY_STORIES,phase17dSampleCatalogue,validateStory,validateStoryReference} from '../src/runtime/story-content.js';
import {validateEventDefinitions,buildEventCandidates} from '../src/runtime/event-candidates.js';
import {beginDemo,apply,storyAction,advanceDemo} from './support/story-scenario.js';
import {readStory,storyState} from '../src/runtime/story.js';
import {runtimeOf,restoreWorldState} from '../src/runtime/model.js';
import {eventWorld} from './support/event-fixtures.js';

const atChoices=(world,eventId)=>{
 let w=world;
 while(readStory(w,eventId).canNext)w=apply(w,[storyAction(eventId,'next')]);
 return w;
};
const confirm=(w,eventId,id)=>apply(apply(w,[storyAction(eventId,'select',id)]),[storyAction(eventId,'confirm')]);

test('17-D: three independently authored ready themes are legal, unique and enumerable',()=>{
 assert.deepEqual(PHASE17D_READY_STORIES.map(s=>s.topicId),['T01-01','T10-04','T14-01']);
 const op=phase17dSampleCatalogue();
 assert.equal(op.engineering,false);assert.equal(op.definitions.length,3);
 assert.equal(op.bindings.length,3);
 assert.doesNotThrow(()=>validateEventDefinitions(op.definitions));
 for(const s of PHASE17D_READY_STORIES){
  assert.doesNotThrow(()=>validateStory(s));
  const d=op.definitions.find(d=>d.id===s.definitionId);
  assert.equal(validateStoryReference(d),s);
  assert.ok(s.stages.every(stage=>stage.choices.length===4));
  assert.ok(s.stages.every(stage=>stage.choices.some(o=>o.emotional)));
  assert.ok(s.stages.every(stage=>stage.choices.some(o=>o.variants?.length>=2)||s.topicId==='T01-01'));
 }
 assert.deepEqual(op.definitions.find(d=>d.topicId==='T14-01').eligibility.people,['staff']);
 assert.deepEqual(op.bindings.map(b=>b.valence),['neutral','positive','neutral']);
 const w=eventWorld();
 assert.ok(buildEventCandidates(w,op.definitions,{engineering:false}).candidates.every(c=>!c.definitionId.startsWith('engineering:')));
});

test('17-D: three distinct events are executable through existing world transactions',()=>{
 for(const [i,story] of PHASE17D_READY_STORIES.entries()){
  const {world,eventId}=beginDemo(1,story),w=atChoices(world,eventId);
  const options=readStory(w,eventId).choices;
  assert.equal(options.length,4);
  assert.equal(new Set(options.map(x=>x.id)).size,4);
  const selected=story.topicId==='T01-01'?'micro':story.topicId==='T10-04'?'team':'handoff';
  const done=confirm(w,eventId,selected),saved=restoreWorldState(JSON.stringify(done));
  assert.deepEqual(readStory(done,eventId),readStory(saved,eventId));
  assert.equal(runtimeOf(done).history.findLast(h=>h.type==='choice')?.data.optionId,selected);
  const fact=runtimeOf(done).facts.findLast(f=>f.data?.type==='story-action');
  assert.equal(fact.data.optionId,selected);
  assert.ok(fact.data.variantId,'representative multi-outcome variant must be stored');
  assert.throws(()=>apply(done,[storyAction(eventId,'confirm')]));
  assert.equal(fact.subjectIds.length>=1,true);
 }
});

test('17-D: unfinished learning plan has a causal next-day follow-up, not a fabricated new event',()=>{
 const story=PHASE17D_READY_STORIES[0],{world,eventId}=beginDemo(1,story);
 let w=confirm(atChoices(world,eventId),eventId,'micro');
 const original=runtimeOf(w).history.filter(h=>h.type==='event-selection').length;
 w=apply(w,[storyAction(eventId,'finish')]);
 let count=0;
 while(!readStory(w,eventId).canResume&&count++<25)w=advanceDemo(w);
 assert.ok(readStory(w,eventId).canResume);
 w=apply(w,[storyAction(eventId,'resume')]);
 w=atChoices(w,eventId);
 assert.equal(readStory(w,eventId).choices.length,4);
 w=confirm(w,eventId,'acknowledge');
 w=apply(w,[storyAction(eventId,'finish')]);
 assert.equal(readStory(w,eventId).ended,true);
 assert.equal(runtimeOf(w).history.filter(h=>h.type==='event-selection').length,original);
 const facts=runtimeOf(w).facts.filter(f=>f.data?.type==='story-action');
 assert.equal(facts.length,2);
 assert.ok(facts[1].causeIds.includes(facts[0].id));
});

test('17-D: ready sample catalogue registers with the real event authority, not only a mock dictionary',()=>{
 const w=eventWorld();
 const op=phase17dSampleCatalogue();
 const admitted=apply(w,[op]);
 const catalogue=runtimeOf(admitted).history.find(h=>h.type==='event-catalogue'&&h.data.catalogueId===op.catalogueId);
 assert.ok(catalogue);
 assert.equal(catalogue.data.definitions.length,3);
 assert.deepEqual(catalogue.data.definitions.map(d=>d.topicId),['T01-01','T10-04','T14-01']);
 assert.equal(admitted.events.length,0,'registration alone must not spawn incidents');
});
