import { FIELDS, fieldDefinition } from '../numeric/dictionary.js';
import { finite, numericValue, reflectDelta, inRange } from '../numeric/math.js';
import { createRandom } from '../numeric/random.js';

const profile = (kind, probability, amplitude, spike=amplitude, spikeProbability=0, shortTerm=false) =>
  Object.freeze({kind,probability,amplitude,spike,spikeProbability,shortTerm});
const stable=profile('trait',.01,.06), skill=profile('skill',.08,.6);
const feeling=profile('transient',.65,8,20,.02,true), motivation=profile('adaptive',.08,.5,.5,0,true);
const held=profile('evidence-held',0,0), group=profile('group',.18,2), life=profile('life',.08,.4,.4,0,true);
const organization=profile('organization',.04,.25), work=profile('work',.4,5,12,.01,true);
const resource=profile('resource',.06,.5,.5,0,true), info=profile('information',.02,.1);
const policy=profile('external',.03,.25);
function classification(code) {
  const category=Number(code.split('-')[0]);
  if(category===1) return stable;
  if(category===2) return feeling;
  if(category===3) return skill;
  if(category===4) return motivation;
  if(category===5 || ['8-1','8-2'].includes(code)) return held;
  if(category===6) return ['6-3','6-4'].includes(code)?group:stable;
  if(category===7) return life;
  if(category===8) return info;
  if(category===9) return ['9-1','9-2'].includes(code)?group:motivation;
  if(category===10) return organization;
  if(category===11) return ['11-1','11-2'].includes(code)?work:resource;
  return code==='12-2'?group:policy;
}
export const FIELD_DYNAMICS = Object.freeze(Object.fromEntries(FIELDS.map(f=>[f.code,classification(f.code)])));
export function fieldDynamics(code) { fieldDefinition(code); return FIELD_DYNAMICS[code]; }
function serviceYear(year) {
  if(!Number.isSafeInteger(year)||year<1) throw new RangeError('Service year must be a positive safe integer');
  return year;
}
/** Annual expected practice tendency, not an annual award. */
export function annualGrowthRate(year) {
  serviceYear(year);
  return year===1?0:2.4/(1+(year-2)/6);
}
export function dailyStability(year) { return .35+.65/Math.sqrt(serviceYear(year)); }
/** Explicit ordinary/natural channel only. Never apply this to a direct major shock. */
export function stabilizeOrdinaryDelta(delta,year) { return finite(delta)*dailyStability(year); }
export const TRAINABLE_FACTORS=Object.freeze({'3-1':1,'3-2':1,'3-3':1,'3-4':1,'6-1':.6,'1-3':.35});

/** FNV-1a namespace -> N1 uint32 seed. This is stream addressing, not another PRNG.
 * The daily root draw is independent of holder count and traversal order.
 */
export function fieldRandom(daySeed, holderId, code) {
  if(!Number.isInteger(daySeed)||daySeed<0||daySeed>0xffffffff||typeof holderId!=='string'||typeof code!=='string') throw new TypeError('Invalid stream address');
  let hash=2166136261;
  for(const unit of JSON.stringify([daySeed,holderId,code])) {
    // Unicode iteration is deterministic; include both UTF-16 units for astral IDs.
    for(let i=0;i<unit.length;i++) hash=Math.imul(hash^unit.charCodeAt(i),16777619)>>>0;
  }
  return createRandom(hash);
}

/** Autonomous bounded change. Caller supplies the previous value, not another projection. */
export function naturalDelta(value,code,rng,{isPlayer=false,year=1,practiceScale=1}={}) {
  numericValue(value);serviceYear(year);
  const model=fieldDynamics(code),gain=isPlayer?(TRAINABLE_FACTORS[code]??0):0;
  inRange(practiceScale,0,1);
  const probability=gain ? .08 : model.probability;
  if(!rng.chance(probability)) return 0;
  let amplitude=gain && code==='1-3' ? .25 : gain && code==='6-1' ? .4 : model.amplitude;
  if(model.spikeProbability && rng.chance(model.spikeProbability)) amplitude=model.spike;
  let delta=(rng.next()*2-1)*amplitude;
  if(gain) delta+=annualGrowthRate(year)*gain*practiceScale*(1-value/100)/(365*probability);
  return reflectDelta(value,delta)-value;
}
