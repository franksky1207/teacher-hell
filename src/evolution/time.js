import { assertShape, identifier } from '../player/panel.js';
import { createRandom, restoreRandom } from '../numeric/random.js';
import { validateWorld } from '../world/validation.js';
import { fieldRandom } from './model.js';
import { evolveWorldSnapshot } from './step.js';

/** Gregorian civil date only; no device clock, local timezone or game-calendar assumption. */
export function gameDate(date) {
  if(typeof date!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(date)||date.startsWith('0000')) throw new TypeError('Expected YYYY-MM-DD game date');
  const ms=Date.parse(`${date}T00:00:00.000Z`);
  if(!Number.isFinite(ms)||new Date(ms).toISOString().slice(0,10)!==date) throw new RangeError('Invalid civil date');
  return ms/86400000;
}
export function nextGameDate(date) {
  const next=new Date((gameDate(date)+1)*86400000).toISOString().slice(0,10);
  gameDate(next);return next;
}
export function validateEvolution(state) {
  assertShape(state,['version','world','clock','random']);
  if(state.version!==1) throw new RangeError('Unsupported evolution model version');
  validateWorld(state.world,{stage:'runtime'});
  assertShape(state.clock,['date','lastNaturalDate','schoolYearId','openingId']);
  gameDate(state.clock.date);identifier(state.clock.schoolYearId);identifier(state.clock.openingId);
  if(state.clock.lastNaturalDate!==null&&state.clock.lastNaturalDate!==state.clock.date) throw new RangeError('Natural update cursor mismatch');
  restoreRandom(state.random);
  return state;
}

/** Attach an explicitly dated baseline. Does not evolve, award tenure or create retry snapshots. */
export function startEvolution(world,{seed,date,schoolYearId,openingId}) {
  const state={version:1,world:structuredClone(world),clock:{date,lastNaturalDate:null,schoolYearId,openingId},random:createRandom(seed).snapshot()};
  return validateEvolution(state);
}
export function restoreEvolution(saved) {
  const state=typeof saved==='string'?JSON.parse(saved):saved;
  validateEvolution(state);return structuredClone(state);
}

/** Pure atomic transaction: publish/persist only the returned envelope, never half a day. */
export function advanceDay(saved,input) {
  validateEvolution(saved);
  assertShape(input,['date','schoolYearId','openingId','serviceYear']);
  gameDate(input.date);identifier(input.schoolYearId);identifier(input.openingId);
  if(!Number.isSafeInteger(input.serviceYear)||input.serviceYear<1) throw new RangeError('Invalid service year');
  const clock=saved.clock,year=saved.world.player.year;
  const sameYear=input.serviceYear===year&&input.schoolYearId===clock.schoolYearId&&input.openingId===clock.openingId;
  if(clock.lastNaturalDate===input.date) {
    if(!sameYear) throw new RangeError('Conflicting duplicate day');
    return structuredClone(saved);
  }
  const expected=clock.lastNaturalDate===null?clock.date:nextGameDate(clock.date);
  if(input.date!==expected) throw new RangeError('Days must be explicit and consecutive');
  if(!sameYear && !(clock.lastNaturalDate!==null&&input.serviceYear===year+1&&input.schoolYearId!==clock.schoolYearId&&input.openingId!==clock.openingId)) throw new RangeError('Only an explicit next-school-opening may advance service year');
  const baseline={...saved.world,player:{...saved.world.player,year:input.serviceYear}};
  const rng=restoreRandom(saved.random);
  const daySeed=fieldRandom(rng.nextUint32(),input.date,'natural-day-v1').nextUint32();
  const world=evolveWorldSnapshot(baseline,daySeed);
  const result={version:1,world,clock:{date:input.date,lastNaturalDate:input.date,schoolYearId:input.schoolYearId,openingId:input.openingId},random:rng.snapshot()};
  return validateEvolution(result);
}

/** Caller supplies every civil date and opening label; no fabricated holiday/calendar rules. */
export function advanceDays(saved,inputs) {
  if(!Array.isArray(inputs)) throw new TypeError('Explicit dated inputs required');
  let result=restoreEvolution(saved);
  for(const input of inputs) result=advanceDay(result,input);
  return result;
}
