import { ABILITY_NAMES, STATE_NAMES } from '../src/player/panel.js';
import { createCandidate,confirmCandidate } from '../src/player/creation.js';
import { createWorld } from '../src/world/world.js';
import { validateWorld } from '../src/world/validation.js';
const states=n=>Object.fromEntries(STATE_NAMES.map(name=>[name,n]));
const abilities=n=>Object.fromEntries(ABILITY_NAMES.map(name=>[name,n]));
/** Synthetic assessment evidence only; never real gameplay outcomes. */
export function fixture(years=30,quality=80,before=40,after=80) {
  const records=new Map(),yearRefs=[],cohortRefs=[];
  const put=r=>{records.set(r.id,r);return r.id;};
  for(let c=0;c<Math.ceil(years/3);c++) {
    const id=`cohort:${c}`,studentIds=Array.from({length:40},(_,i)=>`student:${c}:${i}`);
    cohortRefs.push(put({id,kind:'cohort',provenance:'synthetic',playerId:'teacher',schoolId:'school',years:[c*3+1,c*3+2,c*3+3],studentIds,importance:c%2?.5:1}));
  }
  for(let year=1;year<=years;year++) {
    const cohortId=`cohort:${Math.floor((year-1)/3)}`,attemptId=`attempt:${year}`;
    const header={provenance:'synthetic',playerId:'teacher',schoolId:'school',year,attemptId};
    const snapshot=(id,value)=>({id,kind:'snapshot',provenance:'synthetic',playerId:'teacher',schoolId:'school',year,attemptId,abilities:abilities(value),states:states(value),classroom:{id:`class:${cohortId}`,order:value,cooperation:value},students:records.get(cohortId).studentIds.map(id=>({id,belonging:value,safety:value}))});
    const startRef=put(snapshot(`start:${year}`,before)),endRef=put(snapshot(`end:${year}`,after));
    const completionFact=put({id:`completion-fact:${year}`,kind:'fact',...header,confirmed:true,subjectIds:['teacher']});
    const completionRef=put({id:`completion:${year}`,kind:'completion',...header,outcome:'success',basisIds:[completionFact]});
    const evidenceRefs=[];
    for(const kind of ['handling','student','relationship','quality','continuity','contribution']) {
      const subjectId=kind==='student'?records.get(cohortId).studentIds[0]:'teacher';
      const factId=put({id:`fact:${year}:${kind}`,kind:'fact',...header,confirmed:true,subjectIds:[subjectId]});
      evidenceRefs.push(put({id:`outcome:${year}:${kind}`,kind,...header,factId,cohortId,subjectId,importance:year%2?.6:1,responsibility:.8,quality,completion:quality,accountability:quality,significant:kind==='handling'}));
    }
    yearRefs.push(put({id:`year:${year}`,kind:'year-summary',...header,cohortId,startRef,endRef,completionRef,evidenceRefs}));
  }
  return {records,yearRefs,cohortRefs,source:{provenance:'synthetic',resolve:id=>records.get(id)}};
}

/** Supplied synthetic cohort input, not graduation/lifecycle gameplay.
 * Keep all old people, households, relationships and opinions for reference/capacity tests.
 */
export function addSyntheticCohort(saved,index,seed) {
  const world=structuredClone(saved),teacher=world.player.current.playerId;
  const player=confirmCandidate(createCandidate({seed,playerId:teacher,schoolId:`synthetic-cohort-${index}`}));
  const incoming=createWorld({seed,player});
  Object.assign(world.people,incoming.people);Object.assign(world.families,incoming.families);
  world.careLinks.push(...incoming.careLinks);
  for(const [key,relation] of Object.entries(incoming.relationships)) {
    if(relation.basis.referenceId===incoming.classroom.id)relation.basis.referenceId=world.classroom.id;
    world.relationships[key]=relation;
  }
  Object.assign(world.reputations,incoming.reputations);
  world.classroom.studentIds=incoming.classroom.studentIds;
  world.classroom.values=incoming.classroom.values;
  return validateWorld(world,{stage:'runtime'});
}
