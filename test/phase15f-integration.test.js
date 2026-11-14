/** 15-F integration boundaries: no full-game traversal or persistent writes. */
import test from 'node:test';
import assert from 'node:assert/strict';
import {beginDemo} from './support/story-scenario.js';
import {projectNotebookPeople,renderNotebookPeople} from '../web/notebook-people.js';
import {studentArtForActor,projectStoryScene,renderStoryScene} from '../web/story-scene.js';
import {storyCostume} from '../web/story-art-context.js';
import {selectScene,sceneImageUrls} from '../web/scene-context.js';
import {MUSIC_TRACKS,musicMoodForVisible,parseMusicSettings} from '../web/music-player.js';

test('15-F: a student keeps the same identity across story and notebook; display is read-only',()=>{
 const {world}=beginDemo();
 const before=JSON.stringify(world);
 const data=projectNotebookPeople(world);
 const student=data.people.find(p=>p.kind==='student');
 assert.ok(student);
 const registry=world.numeric.evolution.world.registry;
 const artId=studentArtForActor(registry,student.id);
 assert.match(artId,/^student-0[0-4][0-9]$/);
 const wear=storyCostume(world);
 const portrait=renderNotebookPeople(data,student.id,'','student',{artId,...wear});
 assert.match(portrait,/data-action="notebook-portrait-toggle"/);
 assert.match(portrait,new RegExp('data-story-portrait="'+artId+'"'));
 assert.match(portrait,/data-expression="happy"/);
 assert.match(portrait,/notebook-student-portrait"[^>]* hidden/);
 // A cast is derived only from the visible page, not relationship or opinion data.
 const view={page:{text:'學生打招呼。',presentation:'dialogue',speaker:student.id,
  cast:[{role:'student',actorId:student.id,position:'left',expression:'calm'}]}};
 const projected=projectStoryScene(world,view);
 assert.equal(projected.cast[0].artId,artId);
 assert.equal(projected.cast[0].wear,wear.wear);
 const scene=renderStoryScene(projected);
 assert.match(scene,new RegExp('data-story-portrait="'+artId+'"'));
 assert.match(scene,/data-expression="calm"/);
 assert.equal(JSON.stringify(world),before);
});

test('15-F: adult notebook records cannot receive a student image, remote phone cast stays hidden',()=>{
 const {world}=beginDemo();
 const people=projectNotebookPeople(world);
 const adult=people.people.find(p=>p.kind==='caregiver');
 assert.ok(adult);
 const html=renderNotebookPeople(people,adult.id,'','caregiver',
  {artId:'student-001',wear:'uniform-summer'});
 assert.doesNotMatch(html,/notebook-portrait-toggle|data-story-portrait/);
 const view={page:{text:'家長來電。',presentation:'phone',speaker:adult.id,
  cast:[{role:'parent',actorId:adult.id,position:'right',expression:'angry'}]}};
 const phone=projectStoryScene(world,view);
 assert.deepEqual(phone.cast,[]);
 assert.doesNotMatch(renderStoryScene(phone),/data-story-portrait|data-story-adult/);
});

test('15-F: background and soundtrack follow disclosed location; unknown art does not invent a place',()=>{
 const home=selectScene({slotId:'private',presentation:'phone'});
 assert.equal(home.scene,'home-living-room');
 const office=selectScene({slotId:'p4',presentation:'phone'});
 assert.equal(office.scene,'school-teachers-office');
 const unresolved=selectScene({slotId:'travel-day',sceneTag:'unknown:location'});
 assert.equal(unresolved.scene,'outside-neutral');
 const urls=sceneImageUrls(home,'https://example.test/teacher-hell/preview/');
 assert.ok(urls.desktop.includes('/web/assets/backgrounds/desktop/'));
 assert.ok(urls.mobile.includes('/web/assets/backgrounds/mobile/'));
 assert.equal(musicMoodForVisible({sceneName:home.scene,slotId:'private'}),'home');
 assert.equal(musicMoodForVisible({sceneName:office.scene,text:'家長與老師爭執'}),'conflict');
 assert.equal(musicMoodForVisible({sceneName:office.scene,text:'一般行政通知'}),'school');
});

test('15-F: seven audio keys are immutable source metadata and player preferences stay outside world',()=>{
 const {world}=beginDemo(),before=JSON.stringify(world);
 assert.equal(MUSIC_TRACKS.length,7);
 assert.equal(new Set(MUSIC_TRACKS.map(t=>t.key)).size,7);
 assert.deepEqual(parseMusicSettings('{"enabled":false,"volume":0.27}'),{enabled:false,volume:0.27});
 assert.equal(musicMoodForVisible({moodKey:'unexpected',sceneName:'school-classroom'}),'school');
 assert.equal(JSON.stringify(world),before);
});
