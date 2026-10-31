import { validateRecord, requireValue } from '../numeric/record.js';
import { reflectDelta } from '../numeric/math.js';
import { fieldRandom, naturalDelta, stabilizeOrdinaryDelta, fieldDynamics, TRAINABLE_FACTORS } from './model.js';

const key=(kind,id)=>JSON.stringify([kind,id]);
/** Canonical holder references; player sources are not duplicated in the NPC map. */
export function evolutionHolders(world) {
  const current=world.player.current,player=current.playerId;
  const activeStudents=new Set(world.classroom.studentIds);
  return [
    ...['person','life','work'].map(name=>({id:key(`player-${name}`,player),record:current[name],isPlayer:true,year:world.player.year,kind:`player-${name}`})),
    ...Object.values(world.people).map(p=>({id:key('person',p.id),record:p.values,isPlayer:false,year:1,kind:'person',familyId:p.familyId,schoolExposure:p.kind==='student'&&activeStudents.has(p.id) ? .25 : 0})),
    ...Object.values(world.families).map(f=>({id:key('family',f.id),record:f.values,isPlayer:false,year:1,kind:'family'})),
    ...Object.values(world.social?.groups ?? {}).filter(g=>g.kind==='local').map(g=>({id:key('group',g.id),record:g.values,isPlayer:false,year:1,kind:'group'})),
    {id:key('classroom',world.classroom.id),record:world.classroom.values,isPlayer:false,year:1,kind:'classroom'},
    {id:key('school',world.school.id),record:world.school.values,isPlayer:false,year:1,kind:'school'},
  ];
}

/** A pure proposal from one previous-state snapshot; null/missing is never imputed. */
export function proposeRecord(holder,daySeed) {
  validateRecord(holder.record);
  const result={};
  const trains=holder.isPlayer&&Object.keys(holder.record).some(code=>Object.hasOwn(TRAINABLE_FACTORS,code)&&holder.record[code]!==null);
  const context=trains?{...holder,practiceScale:.25+.75*requireValue(holder.record,'3-4')/100}:holder;
  for(const code of Object.keys(holder.record).sort()) {
    if(holder.record[code]===null) continue; // Preserve an explicitly unset applicable field.
    result[code]=naturalDelta(holder.record[code],code,fieldRandom(daySeed,holder.id,code),context);
  }
  return result;
}

/** Exactly one coupling pass using only autonomous, already bounded proposals.
 * Reciprocal fatigue/anxiety links never read a coupled result, so depth stays one.
 */
export function coupledChanges(holder,base,all) {
  const result={...base}, local=base;
  const add=(target,source,weight)=>{
    if(!Object.hasOwn(result,target)) return;
    result[target]+=source*weight;
  };
  const from=(target,source,code,weight)=>{
    if(source&&Object.hasOwn(source,code)) add(target,source[code],weight);
  };
  if(holder.kind==='person' || holder.kind==='player-person') {
    const workId=holder.isPlayer?key('player-work',JSON.parse(holder.id)[1]):null;
    const work=all.get(workId);
    // Only assigned students share school work context; unrelated NPCs have no inferred exposure.
    const exposure=holder.isPlayer?1:(holder.schoolExposure??0);
    const driver=holder.isPlayer?work:all.get('school-driver');
    from('2-3',driver,'11-1',.18*exposure);
    from('2-3',driver,'11-2',-.12*exposure);
    from('2-3',local,'2-2',.12);
    from('2-2',local,'2-3',.12);
    if(holder.familyId) {
      const family=all.get(key('family',holder.familyId));
      if(!family) throw new RangeError('Missing household proposal');
      for(const code of ['7-1','7-2','7-3','7-4']) from(code,family,code,.25);
    }
  }
  if(holder.kind==='player-work' || holder.kind==='school') from('11-2',local,'11-1',-.25);
  return result;
}

/** Only touches existing assigned natural channels. N1 reflection is for natural noise only. */
export function commitRecord(record,changes,{isPlayer=false,year=1}={}) {
  validateRecord(record);
  const result={...record};
  for(const [code,delta] of Object.entries(changes)) {
    if(!Object.hasOwn(record,code) || record[code]===null) throw new RangeError('Cannot update missing/unset field');
    result[code]=reflectDelta(record[code],isPlayer&&fieldDynamics(code).shortTerm?stabilizeOrdinaryDelta(delta,year):delta);
  }
  return result;
}

/** Caller validates world once at transaction boundaries. No clock/year changes here. */
export function evolveWorldSnapshot(world,daySeed) {
  const result=structuredClone(world),before=evolutionHolders(world),after=evolutionHolders(result);
  const proposals=new Map(before.map(holder=>[holder.id,proposeRecord(holder,daySeed)]));
  proposals.set('school-driver',proposals.get(key('school',world.school.id)));
  const targets=new Map(after.map(holder=>[holder.id,holder.record]));
  for(const holder of before) {
    const next=commitRecord(holder.record,coupledChanges(holder,proposals.get(holder.id),proposals),holder);
    Object.assign(targets.get(holder.id),next);
  }
  return result;
}
