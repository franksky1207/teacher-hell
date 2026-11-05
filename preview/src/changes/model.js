import { finite, probability, weightedMean } from '../numeric/math.js';
import { requireValue } from '../numeric/record.js';
import { assertShape, identifier } from '../player/panel.js';

export const SHOCK_RANGES = Object.freeze(Object.fromEntries(Object.entries({daily:[1,5],ordinary:[5,12],major:[12,25],extreme:[25,50]}).map(([k,v])=>[k,Object.freeze(v)])));
/** Reference-centered triangular magnitude with explicit small and heavy-tail components. */
export function validateShock({severity,direction,scale}) {
  if (!Object.hasOwn(SHOCK_RANGES,severity) || ![-1,0,1].includes(direction)) throw new RangeError('Invalid shock classification');
  finite(scale); if (scale<0) throw new RangeError('Negative shock scale');
}
export function shockDelta(parameters,rng) {
  validateShock(parameters);
  const {severity,direction,scale}=parameters;
  if (direction===0 || scale===0) return 0;
  const [lo,hi]=SHOCK_RANGES[severity], branch=rng.next();
  let magnitude;
  if (branch<.1) magnitude=lo*rng.next();
  else if (branch<.95) magnitude=lo+(hi-lo)*(rng.next()+rng.next())/2;
  else magnitude=hi*(1+2*rng.next());
  const result=direction*magnitude*scale*(direction<0?1.15:1);
  finite(result); return result;
}

const definitions={
  rest:{rate:.06,skills:['3-2','3-4'],weights:[1,3]},
  weekend:{rate:.06,skills:['3-2','3-4'],weights:[1,2]},
  hobby:{rate:.065,skills:['3-3','3-4'],weights:[2,1]},
  family:{rate:.055,skills:['3-1','1-3'],weights:[2,1]},
  travel:{rate:.06,skills:['3-2','3-3'],weights:[1,1]},
  leave:{rate:.065,skills:['3-2','3-4'],weights:[2,1]},
  support:{rate:.07,skills:['3-1','3-3'],weights:[2,1]},
  counseling:{rate:.075,skills:['3-1','3-4'],weights:[1,2]},
  holiday:{rate:.06,skills:['3-3','3-4'],weights:[1,2]},
};
for (const d of Object.values(definitions)) {Object.freeze(d.skills);Object.freeze(d.weights);Object.freeze(d);}
export const RECOVERY_PROFILES=Object.freeze(definitions);
export function validateRecovery(context) {
  assertShape(context,['kind','periodId','startHour','hours','availableHours','resources','permitted']);
  identifier(context.kind);identifier(context.periodId);
  if (!Object.hasOwn(RECOVERY_PROFILES,context.kind)) throw new RangeError('Unknown recovery context');
  for(const key of ['startHour','hours','availableHours']) finite(context[key]);
  probability(context.resources);
  if (context.permitted!==true || context.resources===0 || context.startHour<0 || context.hours<=0 || context.availableHours>24 || context.hours>context.availableHours || context.startHour+context.hours>24) throw new RangeError('Recovery lacks time, permission or resources');
  return context;
}
const recoveryFields=[['person','2-1',-1],['person','2-2',-1],['person','2-3',-1],['person','2-4',1],['life','7-4',1]];
/** Only raw sources control efficiency. No tenure or derived ability panel input. */
export function recoveryChanges(sources,context,rng) {
  validateRecovery(context);
  const profile=RECOVERY_PROFILES[context.kind];
  const ability=weightedMean(profile.skills.map(code=>requireValue(sources.person,code)),profile.weights);
  const efficiency=(.55+.9*ability/100)*context.resources;
  const fields=recoveryFields.map(([holder,code,direction])=>({holder,code,direction,value:requireValue(sources[holder],code)}));
  const opportunities=fields.filter(f=>f.direction===1?f.value<100:f.value>0);
  const branch=rng.next(), favorableAttempt=branch<.75;
  const polarity=favorableAttempt?1:branch>=.8?-1:0;
  const candidates=polarity===1?opportunities:polarity===-1?fields.filter(f=>f.direction===1?f.value>0:f.value<100):[];
  if (!candidates.length) return {favorableAttempt,opportunity:opportunities.length>0,changes:[]};
  const f=candidates[rng.integer(0,candidates.length-1)], direction=f.direction*polarity;
  const room=direction===1?100-f.value:f.value;
  // Fractional headroom recovery: longer duration increases potential, never resets all states.
  const fraction=-Math.expm1(-profile.rate*context.hours*efficiency*(.6+.8*rng.next())*(polarity===1?1:.5));
  return {favorableAttempt,opportunity:opportunities.length>0,changes:[{target:{kind:`player-${f.holder}`,id:sources.playerId},code:f.code,delta:direction*room*fraction}]};
}
