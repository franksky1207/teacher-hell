import { createRandom, restoreRandom } from '../numeric/random.js';
import { restoreCreation } from '../player/creation.js';
import { identifier, assertShape } from '../player/panel.js';
import { FAMILY_CODES, SCHOOL_CODES, GROUP_CODES, createPerson, sampleRecord, withFamilyContext } from './people.js';
import { validateRoles } from './roles.js';
import { directedKey, contactKey, relationshipBasis, createRelationship, createReputation } from './relationships.js';
import { validateWorld } from './validation.js';

const clone=value=>structuredClone(value);
function put(table,id,value) { Object.defineProperty(table,id,{value,writable:true,enumerable:true,configurable:true}); }
function appendRelation(world,fromId,toId,rng) {
  const key=directedKey(fromId,toId);
  if (Object.hasOwn(world.relationships,key)) return;
  put(world.relationships,key,createRelationship(world,fromId,toId,rng));
  if (toId===world.player.current.playerId) put(world.reputations,key,createReputation(world,fromId,toId,rng));
}

/** First cohort only. Four persisted N1 streams isolate structure, people, relations and context. */
export function createWorld({ seed, player, mode='private' }) {
  const career=restoreCreation(player);
  if (career.phase!=='confirmed') throw new RangeError('Player must be confirmed first');
  if (career.year!==1) throw new RangeError('N3 creates only the first cohort');
  const seedStream=createRandom(seed), streams=Object.fromEntries(['structure','people','relationships','environment'].map(name=>[name,createRandom(seedStream.nextUint32())]));
  const id=(kind,i)=>`world:${encodeURIComponent(career.current.schoolId)}:cohort:1:${kind}:${i}`;
  const world={ version:1,player:career,school:{id:career.current.schoolId,mode,values:{}},
    classroom:{id:id('class',1),schoolId:career.current.schoolId,teacherId:career.current.playerId,studentIds:[],values:{}},
    people:{},families:{},careLinks:[],contacts:{},relationships:{},reputations:{},random:{} };
  // Individuals first, then household context; no personality depends on household size or role tag.
  for (let i=0;i<40;i++) {
    const student=createPerson(id('student',i),'student',[11],streams.people);
    put(world.people,student.id,student);world.classroom.studentIds.push(student.id);
  }
  const plans=[];
  for (const studentId of world.classroom.studentIds) {
    if (plans.length && streams.structure.chance(0.18)) plans[streams.structure.integer(0,plans.length-1)].push(studentId);
    else plans.push([studentId]);
  }
  for (const [i,studentIds] of plans.entries()) {
    const count=1+streams.structure.weightedIndex([3,5,2]), caregivers=[];
    for (let j=0;j<count;j++) caregivers.push(createPerson(id('caregiver',`${i}-${j}`),'caregiver',[19],streams.people));
    const family={id:id('family',i),values:sampleRecord(FAMILY_CODES,streams.environment)};
    put(world.families,family.id,family);
    for (const studentId of studentIds) world.people[studentId]=withFamilyContext(world.people[studentId],family);
    for (const caregiver of caregivers) {
      put(world.people,caregiver.id,withFamilyContext(caregiver,family));
      for (const studentId of studentIds) world.careLinks.push({studentId,caregiverId:caregiver.id});
    }
  }
  world.school.values=sampleRecord(SCHOOL_CODES,streams.environment);
  world.classroom.values=sampleRecord(GROUP_CODES,streams.environment);
  for (const {studentId,caregiverId} of world.careLinks) {
    appendRelation(world,studentId,caregiverId,streams.relationships);
    appendRelation(world,caregiverId,studentId,streams.relationships);
  }
  for (const studentId of world.classroom.studentIds) {
    appendRelation(world,studentId,career.current.playerId,streams.relationships);
    appendRelation(world,career.current.playerId,studentId,streams.relationships);
  }
  world.random=Object.fromEntries(Object.entries(streams).map(([name,rng])=>[name,rng.snapshot()]));
  return validateWorld(world);
}

/** No generation, repair or draws during reload. Operations below return new worlds. */
export function restoreWorld(saved, options) {
  const world=typeof saved==='string'?JSON.parse(saved):saved;
  validateWorld(world, options); return clone(world);
}

/** Stable caller IDs identify the same person; tags merge without resampling an existing individual. */
export function ensureNPCs(saved,specs) {
  validateWorld(saved,{stage:'runtime'});
  if (!Array.isArray(specs)) throw new TypeError('NPC specifications required');
  const world=clone(saved), rng=restoreRandom(world.random.people);
  for (const spec of specs) {
    assertShape(spec,['id','roleIds']);identifier(spec.id);validateRoles(spec.roleIds);
    if (Object.hasOwn(world.people,spec.id)) {
      const person=world.people[spec.id];
      person.roleIds=[...new Set([...person.roleIds,...spec.roleIds])].sort((a,b)=>a-b);
    } else {
      if ([world.school.id,world.classroom.id,world.player.current.playerId].includes(spec.id) || Object.hasOwn(world.families,spec.id)) throw new RangeError('Entity ID collision');
      put(world.people,spec.id,createPerson(spec.id,'other',spec.roleIds,rng));
    }
  }
  world.random.people=rng.snapshot();return validateWorld(world,{stage:'runtime'});
}

/** Declare supplied pre-existing acquaintance facts in one transaction, without events/draws. */
export function withAcquaintances(saved,facts) {
  validateWorld(saved,{stage:'runtime'});
  if (!Array.isArray(facts)) throw new TypeError('Acquaintance facts required');
  const world=clone(saved);
  for (const fact of facts) {
    assertShape(fact,['a','b','reference']);
    const {a,b,reference}=fact; identifier(reference);
    const key=contactKey(a,b);
    if (Object.hasOwn(world.contacts,key)) {
      if (world.contacts[key].reference!==reference) throw new RangeError('Conflicting acquaintance fact');
    } else put(world.contacts,key,{a,b,reference});
  }
  return validateWorld(world,{stage:'runtime'});
}
export function withAcquaintance(saved,a,b,reference) {
  return withAcquaintances(saved,[{a,b,reference}]);
}

/** Batch API avoids copying/validating the whole world once per new relation. */
export function ensureRelationships(saved,pairs) {
  validateWorld(saved,{stage:'runtime'});
  if (!Array.isArray(pairs)) throw new TypeError('Relationship pairs required');
  const world=clone(saved),rng=restoreRandom(world.random.relationships);
  for (const pair of pairs) {
    if (!Array.isArray(pair) || pair.length!==2) throw new TypeError('Expected directional pair');
    pair.forEach(identifier);
    if(!Object.hasOwn(world.relationships,directedKey(...pair))) relationshipBasis(world,...pair);
    appendRelation(world,...pair,rng);
  }
  world.random.relationships=rng.snapshot();return validateWorld(world,{stage:'runtime'});
}

/** N2-compatible views, not activation: never combine these with bootstrap automatically. */
export function playerEvaluationSources(world) {
  validateWorld(world,{stage:'runtime'});
  return Object.entries(world.reputations).filter(([,rep])=>rep.toId===world.player.current.playerId).map(([key,rep])=>({sourceId:rep.fromId,kind:'person',targetId:rep.toId,
    scope:rep.scope,weight:1,values:{...rep.values,...world.relationships[key].values}}))
    .map(source=>{ delete source.values['5-2'];return source; });
}
