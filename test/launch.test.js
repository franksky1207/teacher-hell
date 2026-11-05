import test from 'node:test';
import assert from 'node:assert/strict';
import { createCandidate, rerollCandidate } from '../src/player/creation.js';
import { createCareerOpening } from '../src/runtime/opening.js';
import { teacherTenure } from '../src/runtime/schedule.js';
import { createSave, encodeSave, restoreSave } from '../src/storage/format.js';

test('formal launch preserves rerolled candidate and round trips all three difficulties',()=>{
 const candidate=rerollCandidate(createCandidate({seed:12,playerId:'teacher',schoolId:'school'}));
 for(const [difficulty,tenure] of [['easy',20],['normal',10],['hard',1]]){
  const w=createCareerOpening({candidate,seed:18,taipeiDate:'2026-11-05',difficulty,subject:'國文',careerKey:difficulty});
  assert.equal(teacherTenure(w),tenure); assert.equal(w.position.serviceYear,1);
  assert.equal(w.extensions['teacher-hell/world'].plan.subject,'國文');
  assert.equal(w.numeric.evolution.world.player.version,difficulty==='hard'?1:2);
  const restored=restoreSave(encodeSave(createSave(w,w)));
  assert.deepEqual(restored.world,w);
 }
});
