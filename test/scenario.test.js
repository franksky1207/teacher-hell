import test from 'node:test';
import assert from 'node:assert/strict';
import { foundationScenario } from './support/scenarios.js';
import { restoreFoundationEnvelope } from '../src/contracts/foundation.js';
import { restoreRandom } from '../src/numeric/random.js';
import { advanceSettlementDay, settleResult } from '../src/changes/settlement.js';

test('scenario: reset replays seed and independent fixtures share no mutable state', () => {
  const a=foundationScenario(11), b=foundationScenario(11), other=foundationScenario(37);
  assert.deepEqual(a,b); assert.notDeepEqual(a.numeric.evolution.world.people,other.numeric.evolution.world.people);
  a.events[0].choice.confirmedOptionId='one';
  assert.equal(b.events[0].choice.confirmedOptionId,null);
  assert.deepEqual(foundationScenario(11),b);
});

test('scenario: serialized carrier preserves numeric and extra PRNG continuation', () => {
  const a=foundationScenario(11), b=restoreFoundationEnvelope(JSON.stringify(a));
  const input={date:a.position.date,schoolYearId:a.position.schoolYearId,openingId:a.position.openingId,serviceYear:1};
  const run=env=>{
    const day=advanceSettlementDay(env.numeric,input);
    return settleResult(day,{attemptId:day.attemptId,id:'synthetic-numeric-request',sequence:1,date:input.date,
      operation:{type:'direct',changes:[{target:{kind:'player-person',id:'teacher'},code:'2-3',delta:2}]}});
  };
  assert.deepEqual(run(a),run(b));
  const left=restoreRandom(a.random.events),right=restoreRandom(b.random.events);
  assert.deepEqual(Array.from({length:50},()=>left.nextUint32()),Array.from({length:50},()=>right.nextUint32()));
  assert.equal(a.numeric.receipts.length,0); // No world coordinator or storage was executed.
});
