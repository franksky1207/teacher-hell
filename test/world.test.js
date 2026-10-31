import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { performance } from 'node:perf_hooks';
import { createRandom } from '../src/numeric/random.js';
import { FIELDS } from '../src/numeric/dictionary.js';
import { readField } from '../src/numeric/record.js';
import { confirmCandidate, createCandidate, INITIAL_STATES } from '../src/player/creation.js';
import { derivePanel, ABILITY_NAMES, STATE_NAMES, validateSources } from '../src/player/panel.js';
import { ROLES, roleDefinition, validateRoles } from '../src/world/roles.js';
import { STUDENT_CODES, CAREGIVER_CODES, FAMILY_CODES, createPerson, withFamilyContext, sampleRecord } from '../src/world/people.js';
import { directedKey, contactKey } from '../src/world/relationships.js';
import { validateWorld } from '../src/world/validation.js';
import { createWorld, restoreWorld, ensureNPCs, ensureRelationships, withAcquaintance, withAcquaintances, playerEvaluationSources } from '../src/world/world.js';

const player=confirmCandidate(createCandidate({seed:20261101,playerId:'teacher',schoolId:'school'}));
const make=(seed=1)=>createWorld({seed,player});
const copy=x=>structuredClone(x);
function playerIntact(world) {
  assert.deepEqual(world.player,player);
  const panel=derivePanel(world.player.current);
  assert.equal(ABILITY_NAMES.reduce((s,name)=>s+panel[name],0),240);
  assert.deepEqual(Object.fromEntries(STATE_NAMES.map(name=>[name,panel[name]])),INITIAL_STATES);
}

test('all 35 functional roles exactly match formal names/references and cover 48 fields',()=>{
  const source=readFileSync(new URL('../docs/01-世界角色與記憶.md',import.meta.url),'utf8');
  const expected=[...source.matchAll(/^\| (\d+) \| ([^|]+) \| (.*) \| (\d+) \|$/gm)].map(([,id,name,refs])=>({id:Number(id),name:name.trim(),references:[...refs.matchAll(/`(\d+-\d)`/g)].map(m=>m[1])}));
  assert.equal(expected.length,35);assert.deepEqual(ROLES,expected);
  const union=new Set(ROLES.flatMap(role=>role.references));
  assert.equal(union.size,48);assert.deepEqual([...union].sort(),FIELDS.map(f=>f.code).sort());
  for(const role of ROLES) {assert.ok(role.references.length>=4&&role.references.length<=6);assert.equal(roleDefinition(role.id),role);}
  assert.throws(()=>{ROLES[0].references.push('1-1');});
  for(const roles of [[],[1,1],[0],[36],['1'],null]) assert.throws(()=>validateRoles(roles));
  const base=['1-1','1-2','1-3','1-4','2-1','2-2','2-3','2-4','3-1','3-2','3-3','3-4','4-1','4-2','4-3','4-4','6-1','6-2','8-3','8-4','7-1','7-2','7-3','7-4'];
  assert.deepEqual(CAREGIVER_CODES,base);assert.equal(CAREGIVER_CODES.length,24);
  assert.deepEqual(STUDENT_CODES,[...base,'9-3','9-4']);assert.equal(STUDENT_CODES.length,26);
  assert.match(source,/核心學生個人候選欄位共26項/);assert.match(source,/家長個人候選欄位共24項/);
});

test('first cohort has 40 independent students, valid shared households and non-bijective care',()=>{
  const world=make();playerIntact(world);validateWorld(world);
  assert.equal(world.classroom.studentIds.length,40);
  const students=Object.values(world.people).filter(p=>p.kind==='student'),caregivers=Object.values(world.people).filter(p=>p.kind==='caregiver');
  assert.equal(students.length,40);assert.notEqual(caregivers.length,40);
  assert.ok(Object.keys(world.families).length<40);
  for(const p of students) assert.deepEqual(Object.keys(p.values),STUDENT_CODES);
  for(const p of caregivers) assert.deepEqual(Object.keys(p.values),CAREGIVER_CODES);
  assert.equal(new Set(students.map(p=>JSON.stringify(p.values))).size,40);
  assert.ok(students.some(p=>world.careLinks.filter(link=>link.studentId===p.id).length>1));
  assert.ok(caregivers.some(p=>world.careLinks.filter(link=>link.caregiverId===p.id).length>1));
  assert.deepEqual(Object.keys(world.classroom.values).sort(),['9-1','9-2','6-3','6-4'].sort());
  for(const p of students) {
    assert.equal(readField(p.values,'5-1').status,'not-applicable');
    assert.equal(readField(p.values,'9-1').status,'not-applicable');
    assert.notDeepEqual(Object.fromEntries(FAMILY_CODES.map(code=>[code,p.values[code]])),world.families[p.familyId].values);
  }
  assert.equal(Object.keys(world.relationships).length,80+2*world.careLinks.length);
  assert.ok(Object.keys(world.relationships).length<Object.keys(world.people).length*4);
  assert.equal(Object.keys(world.reputations).length,40);
  assert.equal(Object.keys(world.contacts).length,0);
  assert.ok(!Object.hasOwn(world,'history'));
});

test('family influence is bounded, independent of structure and never copies objective facts',()=>{
  const raw=createPerson('child','student',[11],createRandom(9));
  const low={id:'house-a',values:Object.fromEntries(FAMILY_CODES.map(code=>[code,0]))};
  const high={id:'house-b',values:Object.fromEntries(FAMILY_CODES.map(code=>[code,100]))};
  const a=withFamilyContext(raw,low),b=withFamilyContext(raw,high);
  assert.equal(raw.familyId,null);assert.equal(a.familyId,'house-a');
  for(const code of FAMILY_CODES) {
    assert.equal(a.values[code],raw.values[code]*0.75);
    assert.equal(b.values[code],raw.values[code]*0.75+25);
  }
  for(const code of ['1-1','1-2','1-3','1-4']) assert.equal(b.values[code]-a.values[code],12.5);
  for(const code of ['2-1','2-2','2-3','3-1']) assert.equal(a.values[code],b.values[code]);
  assert.throws(()=>createPerson('a','bad',[1],createRandom(0)));
  assert.throws(()=>createPerson('','student',[11],createRandom(0)));
  assert.throws(()=>sampleRecord(['1-1','1-1'],createRandom(0)));
  assert.throws(()=>sampleRecord(['49-1'],createRandom(0)));
  assert.throws(()=>sampleRecord(null,createRandom(0)));
  assert.throws(()=>withFamilyContext(raw,{id:'missing',values:{}}));
});

test('same seed/input replays all fields; mode and teacher ability do not dictate NPC personality',()=>{
  const one=make(99),two=make(99),other=make(100);
  assert.deepEqual(one,two);assert.notDeepEqual(one.people,other.people);
  assert.deepEqual(restoreWorld(JSON.stringify(one)),one);
  const publicWorld=createWorld({seed:99,player,mode:'public'});
  assert.deepEqual(publicWorld.people,one.people);assert.deepEqual(publicWorld.families,one.families);
  const differentTeacher=confirmCandidate(createCandidate({seed:12,playerId:'teacher',schoolId:'school'}));
  const changed=createWorld({seed:99,player:differentTeacher});
  assert.deepEqual(changed.people,one.people);assert.deepEqual(changed.classroom.values,one.classroom.values);
  assert.throws(()=>createWorld({seed:0,player:createCandidate({seed:0,playerId:'t',schoolId:'s'})}));
  const later=copy(player);later.year=2;assert.throws(()=>createWorld({seed:0,player:later}));
  assert.throws(()=>createWorld({seed:0,player,mode:'unknown'}));
});

test('35 tags can create/merge on-demand people without fixed headcounts or role personality',()=>{
  const world=make();
  const specs=ROLES.map(role=>({id:`optional-${role.id}`,roleIds:[role.id]}));
  const extended=ensureNPCs(world,specs);
  assert.equal(Object.keys(extended.people).length,Object.keys(world.people).length+35);
  const again=ensureNPCs(restoreWorld(JSON.stringify(extended)),specs);
  assert.deepEqual(again,extended);
  const one=ensureNPCs(world,[{id:'same-person',roleIds:[8]}]);
  const otherTag=ensureNPCs(world,[{id:'same-person',roleIds:[1]}]);
  assert.deepEqual(one.people['same-person'].values,otherTag.people['same-person'].values);
  const merged=ensureNPCs(one,[{id:'same-person',roleIds:[1,9]}]);
  assert.deepEqual(merged.people['same-person'].roleIds,[1,8,9]);
  assert.deepEqual(merged.people['same-person'].values,one.people['same-person'].values);
  assert.deepEqual(merged.random,one.random);
  assert.equal(Object.keys(merged.people).length,Object.keys(one.people).length);
  assert.deepEqual(merged.school,world.school);
  for(const spec of [{id:'teacher',roleIds:[8]},{id:'school',roleIds:[1]},{id:Object.keys(world.families)[0],roleIds:[1]},{id:'',roleIds:[1]},{id:'bad',roleIds:[36]}]) assert.throws(()=>ensureNPCs(world,[spec]));
  assert.throws(()=>ensureNPCs(world,null));
  assert.deepEqual(ensureNPCs(world,[]),world);
  // IDs are exact keys, never object prototype selectors.
  const odd=ensureNPCs(world,[{id:'__proto__',roleIds:[35]}]);
  assert.equal(odd.people.__proto__.id,'__proto__');validateWorld(restoreWorld(JSON.stringify(odd)));
});

test('directional relations use existing facts; missing is not zero and lazy results persist',()=>{
  const world=make(),student=world.classroom.studentIds[0],teacher=player.current.playerId;
  const caregiver=world.careLinks.find(link=>link.studentId===student).caregiverId;
  const forward=world.relationships[directedKey(student,teacher)],reverse=world.relationships[directedKey(teacher,student)];
  assert.notDeepEqual(forward.values,reverse.values);assert.ok(forward.values['5-1']>0);
  assert.deepEqual(Object.keys(forward.values),['5-1','5-2','5-3','5-4']);
  assert.equal(forward.basis.kind,'teacher-assignment');
  assert.ok(!Object.hasOwn(world.relationships,directedKey(caregiver,teacher)));
  const initialized=ensureRelationships(world,[[caregiver,teacher],[teacher,caregiver],[caregiver,teacher]]);
  assert.equal(Object.keys(initialized.relationships).length,Object.keys(world.relationships).length+2);
  assert.equal(initialized.relationships[directedKey(caregiver,teacher)].basis.kind,'care-assignment');
  assert.deepEqual(ensureRelationships(restoreWorld(JSON.stringify(initialized)),[[caregiver,teacher],[teacher,caregiver]]),initialized);
  assert.deepEqual(ensureRelationships(world,[[caregiver,teacher]]),ensureRelationships(restoreWorld(JSON.stringify(world)),[[caregiver,teacher]]));
  const a=student,b=world.classroom.studentIds.find(id=>world.people[id].familyId!==world.people[a].familyId);
  const classmates=ensureRelationships(world,[[a,b],[b,a]]);
  assert.equal(classmates.relationships[directedKey(a,b)].basis.kind,'same-class');
  // Adding another factual basis must not invalidate or reroll an existing relationship.
  const known=withAcquaintance(classmates,a,b,'supplied-pre-entry-context');
  assert.deepEqual(known.relationships,classmates.relationships);
  let extended=ensureNPCs(world,[{id:'outside',roleIds:[35]}]);
  assert.throws(()=>ensureRelationships(extended,[['outside',student]]),/basis/);
  extended=withAcquaintance(extended,'outside',student,'supplied-pre-entry-context');
  const related=ensureRelationships(extended,[['outside',student],[student,'outside']]);
  assert.equal(related.relationships[directedKey('outside',student)].basis.kind,'declared-acquaintance');
  assert.deepEqual(withAcquaintance(related,'outside',student,'supplied-pre-entry-context'),related);
  assert.throws(()=>withAcquaintance(related,'outside',student,'different-source'));
  assert.throws(()=>withAcquaintance(world,'missing',student,'reference'));
  assert.throws(()=>ensureRelationships(world,[[student,student]]));
  assert.throws(()=>ensureRelationships(world,[[student,'missing']]));
  assert.throws(()=>ensureRelationships(world,[[student]]));
  assert.throws(()=>ensureRelationships(world,null));
  assert.deepEqual(ensureRelationships(world,[]),world);
});

test('NPC evaluations are attributable views; bootstrap is neither cloned nor double-counted',()=>{
  const world=make(),views=playerEvaluationSources(world);
  assert.equal(views.length,40);assert.equal(new Set(views.map(v=>v.sourceId)).size,40);
  assert.ok(new Set(views.map(v=>JSON.stringify(v.values))).size>35);
  assert.ok(views.every(v=>v.kind==='person'&&v.targetId==='teacher'&&world.people[v.sourceId]));
  validateSources({...world.player.current,evaluations:views}); // contract only, no activation
  playerIntact(world);
  assert.ok(world.player.current.evaluations.every(e=>e.kind==='bootstrap'));
  const first=views[0],key=directedKey(first.sourceId,'teacher');
  assert.equal(first.values['5-1'],world.relationships[key].values['5-1']);
  assert.equal(first.values['8-1'],world.reputations[key].values['8-1']);
  first.values['5-1']=0;assert.notEqual(world.relationships[key].values['5-1'],0);
  assert.ok(Object.values(world.reputations).every(rep=>!Object.hasOwn(rep.values,'5-1')));
});

test('world restore rejects corruption, dangling references, wrong holders and implicit repairs',()=>{
  const base=make(),student=base.classroom.studentIds[0],familyId=base.people[student].familyId,key=Object.keys(base.relationships)[0];
  const changes=[
    w=>{w.version=2;},w=>{w.extra={};},w=>{w.classroom.studentIds.pop();},w=>{w.classroom.studentIds[1]=student;},
    w=>{w.people[student].id='wrong';},w=>{w.people[student].familyId='missing';},w=>{delete w.people[student].values['9-4'];},
    w=>{w.people[student].values['5-1']=0;},w=>{w.people[student].values['1-1']=null;},w=>{w.people[student].values['1-1']=Infinity;},
    w=>{w.people[student].roleIds=[35];},w=>{w.families[familyId].values['7-1']=101;},w=>{w.families.extra={id:'extra',values:{'7-1':0,'7-2':0,'7-3':0,'7-4':0}};},
    w=>{w.careLinks=w.careLinks.filter(link=>link.studentId!==student);},w=>{w.careLinks.push(w.careLinks[0]);},
    w=>{w.careLinks[0].caregiverId='missing';},w=>{w.classroom.values['chaos']=0;},w=>{w.school.id='other';},
    w=>{w.relationships[key].fromId='missing';},w=>{w.relationships[key].basis.referenceId='fake';},w=>{w.relationships[key].values['5-1']=NaN;},
    w=>{w.reputations.fake={fromId:student,toId:'teacher',scope:'bad',values:{'8-1':1,'8-2':1}};},
    w=>{delete w.reputations[directedKey(student,'teacher')];},w=>{w.random.people.state=-1;},w=>{w.player.current.person['3-1']=null;},
    w=>{w.contacts.fake={a:student,b:student,reference:'fake'};},
  ];
  for(const change of changes) {const w=copy(base);change(w);assert.throws(()=>restoreWorld(w));}
  assert.deepEqual(restoreWorld(base),base);
});

function summary(values) {
  const sorted=[...values].sort((a,b)=>a-b),n=values.length,mean=values.reduce((a,b)=>a+b,0)/n;
  return {n,mean,sd:Math.sqrt(values.reduce((s,x)=>s+(x-mean)**2,0)/n),min:sorted[0],p01:sorted[Math.floor(n*.01)],p05:sorted[Math.floor(n*.05)],p50:sorted[Math.floor(n*.5)],p95:sorted[Math.floor(n*.95)],p99:sorted[Math.floor(n*.99)],max:sorted.at(-1)};
}
function correlation(pairs) {
  const x=pairs.map(p=>p[0]),y=pairs.map(p=>p[1]),a=summary(x),b=summary(y);
  return pairs.reduce((s,[u,v])=>s+(u-a.mean)*(v-b.mean),0)/pairs.length/a.sd/b.sd;
}

test('300 full worlds: independent individuals, family correlations, extremes and linear initial storage',t=>{
  const codes=['1-3','2-1','3-1','7-1'];
  const data=Object.fromEntries(['student','caregiver'].flatMap(kind=>codes.map(code=>[`${kind}/${code}`,[]])));
  const familyFeelings=[],familyTraits=[],parentChild=[],compositionTraits=[],siblingDifferences=[],groupScores=[],worldPeople=[],families=[],careCounts=[],sizes=[],generation=[],restoration=[];
  let contrasts=0,students=0,caregivers=0,example;
  for(let seed=0;seed<300;seed++) {
    const start=performance.now(),world=make(seed);generation.push(performance.now()-start);playerIntact(world);
    const serialized=JSON.stringify(world);sizes.push(serialized.length);
    const restoreStart=performance.now();assert.deepEqual(restoreWorld(serialized),world);restoration.push(performance.now()-restoreStart);
    worldPeople.push(Object.keys(world.people).length);families.push(Object.keys(world.families).length);
    const members=new Map(),careByStudent=new Map();
    for(const link of world.careLinks) {
      if(!careByStudent.has(link.studentId)) careByStudent.set(link.studentId,[]);
      careByStudent.get(link.studentId).push(world.people[link.caregiverId]);
      const child=world.people[link.studentId],adult=world.people[link.caregiverId];
      parentChild.push([child.values['2-1'],adult.values['2-1']]);
      if(child.values['2-1']<20&&child.values['2-2']<20&&(adult.values['2-1']>80||adult.values['2-2']>80)) {
        contrasts++;example??={seed,student:child.id,caregiver:adult.id,childAnger:child.values['2-1'],adultAnger:adult.values['2-1'],childAnxiety:child.values['2-2'],adultAnxiety:adult.values['2-2']};
      }
    }
    for(const p of Object.values(world.people)) {
      for(const code of codes) data[`${p.kind}/${code}`].push(p.values[code]);
      if(p.kind==='student') {
        students++;
        const family=world.families[p.familyId];
        familyFeelings.push([family.values['7-1'],p.values['7-1']]);familyTraits.push([family.values['7-1'],p.values['1-3']]);
        const count=careByStudent.get(p.id).length;careCounts.push(count);compositionTraits.push([count,p.values['1-3']]);
        if(!members.has(p.familyId)) members.set(p.familyId,[]);members.get(p.familyId).push(p);
      } else caregivers++;
    }
    for(const group of members.values()) if(group.length>1) siblingDifferences.push(Math.abs(group[0].values['1-3']-group[1].values['1-3']));
    groupScores.push(world.classroom.values['9-1']);
    assert.equal(Object.keys(world.relationships).length,80+2*world.careLinks.length);
    assert.ok(Object.keys(world.relationships).length<=320); // at most 3 caregivers per student, no all-pairs matrix
  }
  const stats=Object.fromEntries(Object.entries(data).map(([key,values])=>[key,summary(values)]));
  for(const kind of ['student','caregiver']) {
    assert.ok(stats[`${kind}/3-1`].sd>20);assert.ok(stats[`${kind}/3-1`].min<1&&stats[`${kind}/3-1`].max>99);
    assert.ok(stats[`${kind}/2-1`].min<.01&&stats[`${kind}/2-1`].max>99);
    assert.ok(stats[`${kind}/1-3`].min<10&&stats[`${kind}/1-3`].max>90);
  }
  const correlations={familyFeeling:correlation(familyFeelings),familyEmpathy:correlation(familyTraits),parentChildAnger:correlation(parentChild),caregiverCountEmpathy:correlation(compositionTraits)};
  assert.ok(correlations.familyFeeling>.2&&correlations.familyFeeling<.7);
  assert.ok(correlations.familyEmpathy>.05&&correlations.familyEmpathy<.4);
  assert.ok(Math.abs(correlations.parentChildAnger)<.1);assert.ok(Math.abs(correlations.caregiverCountEmpathy)<.1);
  assert.ok(siblingDifferences.some(diff=>diff>50));assert.ok(contrasts>100);
  const group=summary(groupScores);assert.ok(group.sd>22&&group.min<3&&group.max>97);
  assert.ok(new Set(worldPeople).size>10);assert.ok(new Set(families).size>10);
  t.diagnostic(JSON.stringify({worlds:300,students,caregivers,stats,correlations,siblingDifference:summary(siblingDifferences),contrasts,example,group,worldPeople:summary(worldPeople),families:summary(families),caregiversPerStudent:summary(careCounts),jsonCharacters:summary(sizes),generationMs:summary(generation),restorationMs:summary(restoration)}));
});

test('batch lazy initialization scales with explicit entities/edges and reuses all saved outcomes',t=>{
  const base=make(7),rows=[];
  for(const n of [0,250,500,1000]) {
    const start=performance.now();
    const specs=Array.from({length:n},(_,i)=>({id:`capacity-npc-${i}`,roleIds:[35]}));
    let world=ensureNPCs(base,specs);
    const npcMs=performance.now()-start;
    const facts=specs.map(s=>({a:s.id,b:'teacher',reference:'capacity-fixture; supplied initial contact'}));
    const contactStart=performance.now();world=withAcquaintances(world,facts);const contactMs=performance.now()-contactStart;
    const pairs=specs.map(s=>[s.id,'teacher']);const relationStart=performance.now();world=ensureRelationships(world,pairs);const relationMs=performance.now()-relationStart;
    const reload=restoreWorld(JSON.stringify(world));
    assert.deepEqual(ensureRelationships(reload,pairs),world);
    assert.deepEqual(ensureNPCs(reload,specs),world);
    assert.deepEqual(withAcquaintances(reload,facts),world);
    assert.equal(Object.keys(world.people).length,Object.keys(base.people).length+n);
    assert.equal(Object.keys(world.relationships).length,Object.keys(base.relationships).length+n);
    assert.equal(Object.keys(world.reputations).length,40+n);
    assert.equal(world.random.environment.state,base.random.environment.state);
    assert.equal(world.random.structure.state,base.random.structure.state);
    playerIntact(world);
    rows.push({added:n,people:Object.keys(world.people).length,relationships:Object.keys(world.relationships).length,characters:JSON.stringify(world).length,npcMs,contactMs,relationMs});
  }
  const growthA=rows[2].characters-rows[1].characters,growthB=rows[3].characters-rows[2].characters;
  assert.ok(growthB/growthA>1.9&&growthB/growthA<2.1);
  assert.throws(()=>withAcquaintances(base,null));
  t.diagnostic(JSON.stringify({capacity:rows}));
});
