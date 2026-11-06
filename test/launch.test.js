import test from 'node:test';
import assert from 'node:assert/strict';
import { createCandidate, rerollCandidate } from '../src/player/creation.js';
import { createCareerOpening } from '../src/runtime/opening.js';
import { teacherTenure } from '../src/runtime/schedule.js';
import { createSave, encodeSave, restoreSave } from '../src/storage/format.js';

test('formal launch preserves rerolled candidate and round trips all three difficulties',()=>{
 const candidate=rerollCandidate(createCandidate({seed:12,playerId:'teacher',schoolId:'school'}));
 for(const [difficulty,tenure] of [['easy',20],['normal',10],['hard',1]])for(const taipeiDate of ['2026-11-05','2027-12-01','2028-12-01']){
  const w=createCareerOpening({candidate,seed:18,taipeiDate,difficulty,subject:'國文',careerKey:`${difficulty}-${taipeiDate}`});
  assert.equal(teacherTenure(w),tenure); assert.equal(w.position.serviceYear,1);
  assert.equal(w.extensions['teacher-hell/world'].plan.startYear,2026);
  assert.equal(w.extensions['teacher-hell/world'].plan.subject,'國文');
  assert.equal(w.numeric.evolution.world.player.version,difficulty==='hard'?1:2);
  const restored=restoreSave(encodeSave(createSave(w,w)));
  assert.deepEqual(restored.world,w);
 }
});

test('experienced launch accepts the complete uint32 seed range',()=>{
 const candidate=createCandidate({seed:12,playerId:'teacher',schoolId:'school'});
 for(const seed of [0,0x80000000,0xffffffff]){
  const w=createCareerOpening({candidate,seed,taipeiDate:'2026-11-05',difficulty:'easy',subject:'英文',careerKey:`seed-${seed}`});
  assert.equal(teacherTenure(w),20);
  assert.deepEqual(restoreSave(encodeSave(createSave(w,w))).world,w);
 }
});
