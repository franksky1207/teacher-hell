import { assertShape, STATE_NAMES, identifier } from '../player/panel.js';
import { numericValue, weightedMean } from '../numeric/math.js';
import { deriveWorldPanel } from '../social/reputation.js';

export const CRISIS_WEIGHTS=Object.freeze({體力:20,精神:25,抗壓:20,聲望:5,熱忱:15,情緒:15});
export const CRISIS_THRESHOLDS=Object.freeze({體力:30,精神:35,抗壓:30,聲望:20,熱忱:25,情緒:30});
export function crisisBand(score) {
  numericValue(score);
  return score>=70?'一般':score>=55?'初期警訊':score>=40?'明顯危機':score>=25?'高度危機':'極度危機';
}
/** Numeric kernel for fixtures; production entry reads the authoritative world below. */
export function crisisFromStates(states) {
  assertShape(states,STATE_NAMES);Object.values(states).forEach(numericValue);
  const score=weightedMean(STATE_NAMES.map(n=>states[n]),STATE_NAMES.map(n=>CRISIS_WEIGHTS[n]));
  const single=Object.fromEntries(STATE_NAMES.map(name=>[name,{
    hit:states[name]<=CRISIS_THRESHOLDS[name],
    depth:Math.max(0,(CRISIS_THRESHOLDS[name]-states[name])/CRISIS_THRESHOLDS[name]),
    category:name==='聲望'?'external':'internal',
  }]));
  return {score,band:crisisBand(score),compositeDepth:Math.max(0,(70-score)/70),single};
}
export function worldCrisis(world) {
  const panel=deriveWorldPanel(world);
  return crisisFromStates(Object.fromEntries(STATE_NAMES.map(n=>[n,panel[n]])));
}
/** One entry per candidate; max channel depth avoids repeated eligibility/weighting.
 * Caller-provided objective eligibility is mandatory. No draw, event or failure outcome. */
export function crisisCandidateParameters(world,candidates) {
  const risk=worldCrisis(world),ids=new Set();
  if(!Array.isArray(candidates)) throw new TypeError('Explicit candidates required');
  return candidates.map(candidate=>{
    assertShape(candidate,['id','eligible','channels']);identifier(candidate.id);
    if(ids.has(candidate.id)||typeof candidate.eligible!=='boolean'||!Array.isArray(candidate.channels)||!candidate.channels.length||new Set(candidate.channels).size!==candidate.channels.length) throw new RangeError('Invalid or repeated candidate');
    ids.add(candidate.id);
    let opened=false,depth=0;
    for(const channel of candidate.channels) {
      if(channel==='composite') {opened ||= risk.band!=='一般';depth=Math.max(depth,risk.compositeDepth);}
      else {
        if(!Object.hasOwn(risk.single,channel)) throw new RangeError('Unknown risk channel');
        opened ||= risk.single[channel].hit;depth=Math.max(depth,risk.single[channel].depth);
      }
    }
    return {id:candidate.id,eligible:candidate.eligible,opened:candidate.eligible&&opened,multiplier:candidate.eligible?1+4*depth:0};
  });
}
