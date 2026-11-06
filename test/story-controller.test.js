import test from 'node:test';
import assert from 'node:assert/strict';
import {currentStory,makeStoryRequest} from '../web/story-controller.js';
import {beginDemo,apply,storyAction} from './support/story-scenario.js';
import {readStory} from '../src/runtime/story.js';
import {prepareWorldOperation} from '../src/runtime/transactions.js';
const issue=(world,action,optionId=null)=>{
 const view=currentStory(world);
 const request=makeStoryRequest(world,view.eventId,action,optionId);
 return prepareWorldOperation(world,request).world;
};
test('13-B: untouched opening has no fabricated playable story',async()=>{
 // Formal opening is already exercised by launch tests; lack of event selections
 // is the only prerequisite for a null reader.
 const {world}=beginDemo();
 const clean=structuredClone(world);clean.extensions['teacher-hell/world'].history=[];
 clean.events=[];assert.equal(currentStory(clean),null);
});
test('13-B: formal readStory projection persists page and permits previous',()=>{
 const {world,eventId}=beginDemo();assert.equal(currentStory(world).eventId,eventId);
 const w=issue(world,'next');
 assert.equal(readStory(w,eventId).pageIndex,1);
 const restored=structuredClone(w);
 assert.equal(currentStory(restored).pageIndex,1);
 const back=issue(restored,'previous');
 assert.equal(readStory(back,eventId).pageIndex,0);
});
test('13-B: all story actions are guarded and dispatched through formal transaction',()=>{
 const {world,eventId}=beginDemo();
 assert.throws(()=>makeStoryRequest(world,eventId,'finish'));
 assert.throws(()=>makeStoryRequest(world,eventId,'select','listen'));
 assert.throws(()=>makeStoryRequest(world,'event:incorrect','next'));
 const w=issue(world,'next');
 assert.equal(w.extensions['teacher-hell/world'].revision,world.extensions['teacher-hell/world'].revision+1);
 assert.equal(w.extensions['teacher-hell/world'].history.filter(h=>h.type==='story').at(-1).data.action.action,'next');
});
test('13-B: choice selection is persisted; no local simulated result',()=>{
 let {world,eventId}=beginDemo();
 while(currentStory(world).canNext)world=issue(world,'next');
 world=issue(world,'select','listen');
 assert.equal(currentStory(world).confirmation.optionId,'listen');
 world=issue(world,'cancel');
 assert.equal(currentStory(world).confirmation,null);
 assert.throws(()=>makeStoryRequest(world,eventId,'confirm'));
});

test('13-C: cancel and reselect do not settle; confirm settles once and locks rollback',()=>{
 let {world,eventId}=beginDemo();
 while(currentStory(world).canNext)world=issue(world,'next');
 const numericBefore=structuredClone(world.numeric);
 world=issue(world,'select','listen');
 assert.deepEqual(world.numeric,numericBefore);
 world=issue(world,'cancel');
 world=issue(world,'select','angry');
 assert.deepEqual(world.numeric,numericBefore);
 assert.equal(currentStory(world).confirmation.optionId,'angry');
 world=issue(world,'confirm');
 assert.equal(world.extensions['teacher-hell/world'].history.filter(h=>h.type==='story'&&h.eventId===eventId&&h.data.action.action==='confirm').length,1);
 assert.equal(currentStory(world).canFinish,true);
 assert.equal(currentStory(world).canPrevious,false);
 assert.throws(()=>makeStoryRequest(world,eventId,'cancel'));
 assert.throws(()=>makeStoryRequest(world,eventId,'confirm'));
 assert.throws(()=>makeStoryRequest(world,eventId,'previous'));
 assert.notDeepEqual(world.numeric,numericBefore);
});
test('13-C: restored result and formally deferred follow-up do not settle twice',()=>{
 let {world,eventId}=beginDemo();
 while(currentStory(world).canNext)world=issue(world,'next');
 world=issue(world,'select','listen');
 world=issue(world,'confirm');
 const restored=structuredClone(world);
 assert.deepEqual(currentStory(restored).teacherDelta,currentStory(world).teacherDelta);
 assert.deepEqual(currentStory(restored).result,currentStory(world).result);
 world=issue(restored,'finish');
 assert.equal(world.extensions['teacher-hell/world'].history.filter(h=>h.type==='story').at(-1).data.state.mode,'waiting');
 assert.equal(currentStory(world),null);
 assert.throws(()=>makeStoryRequest(world,eventId,'resume'));
 assert.equal(world.extensions['teacher-hell/world'].history.filter(h=>h.type==='choice').length,1);
});
test('13-C: immediate successor stays in the same admitted story',async()=>{
 const {IMMEDIATE_STORY}=await import('../src/runtime/story-content.js');
 let {world,eventId}=beginDemo(1,IMMEDIATE_STORY);
 while(currentStory(world).canNext)world=issue(world,'next');
 world=issue(world,'select','listen');world=issue(world,'confirm');world=issue(world,'finish');
 assert.equal(currentStory(world).pageIndex,0);
 assert.equal(world.extensions['teacher-hell/world'].history.filter(h=>h.type==='choice').length,1);
 assert.equal(world.extensions['teacher-hell/world'].history.filter(h=>h.type==='event-selection').length,1);
});

test('13-C: resultConfirmed matches persisted formal mode, not the button text',()=>{
 let {world}=beginDemo();
 assert.equal(currentStory(world).resultConfirmed,false);
 while(currentStory(world).canNext)world=issue(world,'next');
 world=issue(world,'select','listen');
 assert.equal(currentStory(world).resultConfirmed,false);
 world=issue(world,'confirm');
 assert.equal(currentStory(world).resultConfirmed,true);
 assert.equal(currentStory(structuredClone(world)).resultConfirmed,true);
});
