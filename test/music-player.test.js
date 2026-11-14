import test from 'node:test';
import assert from 'node:assert/strict';
import {MUSIC_TRACKS,MUSIC_KEYS,MUSIC_STORE_KEY,parseMusicSettings,musicMoodForVisible} from '../web/music-player.js';
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
test('15-E music context is based on current disclosed scene and current visible dialogue',()=>{
 assert.equal(musicMoodForVisible({sceneName:'school-classroom'}),'school');
 assert.equal(musicMoodForVisible({sceneName:'home-living-room'}),'home');
 assert.equal(musicMoodForVisible({activities:['graduation-trip-2']}),'playful');
 assert.equal(musicMoodForVisible({text:'家長與導師爆發爭執',sceneName:'school-teachers-office'}),'conflict');
 assert.equal(musicMoodForVisible({text:'雙方終於和解',sceneName:'school-teachers-office'}),'touching');
 assert.equal(musicMoodForVisible({text:'這個命令實在荒謬'}),'absurd');
 assert.equal(musicMoodForVisible({text:'校方啟動重大調查'}),'serious');
 assert.equal(musicMoodForVisible({moodKey:'absurd',text:'早自習'}),'absurd');
 assert.equal(musicMoodForVisible({moodKey:'unrecognized'}),'school');
});
