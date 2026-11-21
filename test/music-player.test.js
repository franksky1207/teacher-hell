import {contextMusic,gameMusic} from '../web/music-context.js';
import {DEMO_STORY,validateStory} from '../src/runtime/story-content.js';
import {compileStoryPreview} from '../src/runtime/story-preview-content.js';
import {loadAvgDemo,renderStoryPerformancePreview} from '../web/story-performance-preview.js';
import test from 'node:test';
import assert from 'node:assert/strict';
import {MUSIC_TRACKS,MUSIC_KEYS,MUSIC_STORE_KEY,parseMusicSettings} from '../web/music-player.js';
test('15-E seven CC0 tracks have unique production audio keys and provenance',()=>{
 assert.equal(MUSIC_TRACKS.length,7);
 assert.equal(new Set(MUSIC_TRACKS.map(t=>t.key)).size,7);
 assert.deepEqual(MUSIC_TRACKS.map(t=>t.key),['school','conflict','serious','home','playful','touching','absurd']);
 for(const t of MUSIC_TRACKS){assert.ok(MUSIC_KEYS.has(t.key));assert.ok(t.source.startsWith('https://opengameart.org/'));assert.equal(t.license,'CC0');}
 assert.ok(MUSIC_STORE_KEY.includes('music'));
});
test('15-E settings are clamped and tolerate blocked or broken local storage data',()=>{
 assert.deepEqual(parseMusicSettings(null),{enabled:true,volume:0.65});
 assert.deepEqual(parseMusicSettings('invalid'),{enabled:true,volume:0.65});
 assert.deepEqual(parseMusicSettings('{"enabled":false,"volume":2}'),{enabled:false,volume:1});
 assert.deepEqual(parseMusicSettings('{"enabled":true,"volume":-1}'),{enabled:true,volume:0});
});
test('daily music uses structured calendar contexts, while event music has priority',()=>{
 assert.equal(contextMusic({slotId:'early',text:'荒謬、衝突、和解或重大調查'}),'school');
 assert.equal(contextMusic({slotId:'private'}),'home');
 assert.equal(contextMusic({opening:true,slotId:'private'}),'school');
 assert.equal(contextMusic({slotId:'travel-day'}),'school');
 assert.equal(contextMusic({slotId:'private',activityKinds:['christmas']}),'school');
 for(const kind of ['anniversary','fair','sports','field-trip','graduation-trip-2']){
  assert.equal(contextMusic({activityKinds:[kind]}),'playful');
 }
 assert.equal(contextMusic({activityKinds:['graduation']}),'touching');
 const home={slotId:'private'},fair={activityKinds:['fair']};
 assert.equal(gameMusic(null,{music:'conflict'},home),'conflict');
 assert.equal(gameMusic(null,{music:'absurd',type:'P'},home),'absurd');
 assert.equal(gameMusic(null,{music:'serious'},fair),'serious');
 assert.equal(gameMusic(null,null,fair),'playful');
 assert.equal(gameMusic(null,null,home),'home');
});

test('event and released-story schemas share the exact seven keys and keep legacy reads legal',()=>{
 const detail={opening:'開場',results:[{id:'R1',text:'結尾'}]};
 for(const key of MUSIC_KEYS){
  assert.equal(validateStory({...structuredClone(DEMO_STORY),music:key}).music,key);
  assert.equal(compileStoryPreview({...detail,music:key}).music,key);
 }
 assert.equal(compileStoryPreview(detail).music,undefined);
 assert.equal(compileStoryPreview({...detail,sourceMarkdown:'## 1｜資料\n| `music`｜配樂 | absurd |'}).music,'absurd');
 assert.throws(()=>compileStoryPreview({...detail,music:'bgm01'}),/bgm01/);
 assert.throws(()=>validateStory({...structuredClone(DEMO_STORY),music:null}),/音樂/);
 assert.throws(()=>compileStoryPreview({...detail,results:[{...detail.results[0],music:'home'}]}),/整篇故事/);
 const wrong=structuredClone(DEMO_STORY);
 wrong.stages[0].pages[0].music='school';
 assert.throws(()=>validateStory(wrong));
});

test('AVG demo keeps touching through dialogue, confirmation and every result',()=>{
 const preview=loadAvgDemo(),state={index:[],storyId:preview.detail.storyId,indexError:'',preview,selected:null,resultId:'R1'};
 const music=view=>renderStoryPerformancePreview({...state,...view},'').music;
 for(let page=0;page<preview.pages.length;page++)assert.equal(music({page}),'touching');
 for(const option of preview.detail.options)assert.equal(music({page:7,selected:option.id}),'touching');
 for(const outcome of preview.detail.results)assert.equal(music({page:7,showingResult:true,resultId:outcome.id}),'touching');
});
