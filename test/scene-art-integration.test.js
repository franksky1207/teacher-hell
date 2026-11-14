import test from 'node:test';
import assert from 'node:assert/strict';
import {stableAdultArt,adultPoseForExpression,storyCostume} from '../web/story-art-context.js';
import {studentArtForActor,renderStoryScene} from '../web/story-scene.js';
import {renderScenePreview} from '../web/scene-preview.js';
import {FULL_SHEET_CASUAL_SCENES,fullSheetCrop} from '../web/full-sheet-preview.js';
import {CALENDAR_VERSION} from '../src/calendar/calendar.js';

const world=(date,slotId)=>({
 position:{date,slotId},
 extensions:{'teacher-hell/world':{plan:{startYear:2026,calendarVersion:CALENDAR_VERSION}}}
});
test('15-D: existing identity is reproducibly mapped and respects known family role',()=>{
 const father={familyRole:'father',appearance:{variant:17}};
 const mother={familyRole:'mother',appearance:{variant:17}};
 assert.match(stableAdultArt('person-A',father),/^adult-male-0[1-3]$/);
 assert.match(stableAdultArt('person-A',mother),/^adult-female-0[1-3]$/);
 assert.equal(stableAdultArt('person-A',father),stableAdultArt('person-A',structuredClone(father)));
 assert.equal(stableAdultArt('person-B',{appearance:{variant:3}}),stableAdultArt('person-B',{appearance:{variant:3}}));
 assert.equal(adultPoseForExpression('surprised'),'gesture');
 assert.equal(adultPoseForExpression('anything-unknown'),'neutral');
});
test('15-D: initial forty and only home-class entrants receive dedicated stable art',()=>{
 const initial=Array.from({length:40},(_,i)=>'p'+String(i+1));
 const registry={homeClassId:'home',cohorts:[{classId:'home',initialStudentIds:initial}],
  enrollments:[{classId:'home',personId:'transfer-A'},{classId:'other',personId:'outsider'},
   {classId:'home',personId:'transfer-B'},{classId:'home',personId:'transfer-A'}]};
 assert.equal(studentArtForActor(registry,'p1'),'student-001');
 assert.equal(studentArtForActor(registry,'p40'),'student-040');
 assert.equal(studentArtForActor(registry,'transfer-A'),'student-041');
 assert.equal(studentArtForActor(registry,'transfer-B'),'student-042');
 assert.equal(studentArtForActor(registry,'outsider'),null);
});
test('15-D: six casual outfit cells are not six emotional expression cells',()=>{
 assert.equal(FULL_SHEET_CASUAL_SCENES.length,6);
 const seen=new Set(FULL_SHEET_CASUAL_SCENES.map(([id])=>id));
 assert.equal(seen.size,6);
 for(const [id] of FULL_SHEET_CASUAL_SCENES){
  const crop=fullSheetCrop(id);
  assert.ok(crop.sx>=0&&crop.sx<1536&&crop.sy>=0&&crop.sy<2304);
 }
 assert.notDeepEqual(fullSheetCrop('grade1-autumn-trip'),fullSheetCrop('calm'));
});
test('15-D: calendar controls uniform outfit with no current-time randomization',()=>{
 const a=storyCostume(world('2026-08-03','p2'));
 const b=storyCostume(world('2026-12-03','p2'));
 assert.equal(a.wear,'uniform-summer');
 assert.equal(b.wear,'uniform-winter');
 assert.deepEqual(a,storyCostume(world('2026-08-03','p2')));
});
test('15-D: formal scene emits outfit and adult silhouette canvas without changing cast labels',()=>{
 const html=renderStoryScene({label:'已知場景',speaker:'甲',cast:[
  {id:'student-001',name:'甲',kind:'student',position:'left',speaking:true,artId:'student-001',wear:'sports-winter',cell:null,expression:'calm'},
  {id:'other',name:'乙',kind:'adult',position:'right',speaking:false,artId:'adult-female-01',expression:'happy'}
 ]});
 assert.match(html,/data-story-wear="sports-winter"/);
 assert.match(html,/data-story-adult="adult-female-01"/);
 assert.match(html,/data-adult-pose="arms-open"/);
 assert.match(html,/story-actor--listening/);
});
test('15-D: preview uses production renderer for all special art states, no save callbacks',()=>{
 for(const kind of ['one','two','adult','transfer','unknown','phone']){
  const fixture=renderScenePreview('office',kind,'uniform-winter');
  assert.match(fixture.html,/story-view--avg/);
  assert.match(fixture.html,/data-scene-wear/);
  assert.match(fixture.html,/data-action="dev-center"/);
  assert.doesNotMatch(fixture.html,/data-action="(?:load|delete|import):/);
 }
 const casual=renderScenePreview('fieldtrip','two','grade1-autumn-trip').html;
 assert.match(casual,/data-story-wear="casual"/);
 assert.match(casual,/data-story-cell="grade1-autumn-trip"/);
});
