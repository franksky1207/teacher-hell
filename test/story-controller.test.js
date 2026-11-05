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
