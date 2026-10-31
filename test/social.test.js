import test from 'node:test';
import assert from 'node:assert/strict';
import { performance } from 'node:perf_hooks';
import { createRandom } from '../src/numeric/random.js';
import { createCandidate, confirmCandidate } from '../src/player/creation.js';
import { derivePanel } from '../src/player/panel.js';
import { createWorld, restoreWorld, ensureNPCs, ensureRelationships } from '../src/world/world.js';
import { directedKey } from '../src/world/relationships.js';
import { validateWorld } from '../src/world/validation.js';
import { resolveWorldEvaluations } from '../src/world/evaluations.js';
import { initializeSocial, attestPersonEvaluation, registerGroup, registerGroupEvaluation, registerPersonEvaluation, activateReputation, deriveWorldPanel, evaluationView } from '../src/social/reputation.js';
import { relationshipVector, relationshipView, combineRelationships, prepareRelationshipChange } from '../src/social/relations.js';
import { groupProfile, participationWeight, organizationProfile } from '../src/social/groups.js';
import { adoptionProbability, forwardingProbability, validateInformationContext } from '../src/social/information.js';
import { evolutionHolders } from '../src/evolution/step.js';
import { startEvolution, advanceDay } from '../src/evolution/time.js';
const copy = x=>structuredClone(x);
const player = confirmCandidate(createCandidate({seed:3,playerId:'teacher',schoolId:'school'}));
const make = ()=>createWorld({seed:5,player});
const four = n=>Object.fromEntries(['5-1','5-2','5-3','5-4'].map(code=>[code,n]));
const six = n=>({...four(n),'8-1':n,'8-2':n});
const selection = (sourceId,kind='person',weight=1)=>({sourceId,kind,weight});
function attest(world,id) { return attestPersonEvaluation(world,{fromId:id,toId:'teacher',scope:'provided-assessment',basisId:`basis:${id}`}); }
function fixture() {
  let world=make(); const ids=world.classroom.studentIds.slice(0,3);
  for(const id of ids) world=attest(world,id);
  return {world,ids};
}
function group(world,id,members,origins,values=six(90)) {
  world=registerGroup(world,{id,kind:'local',scope:'club',memberIds:members,values:{'9-2':80,'6-3':100,'6-4':0}});
  return registerGroupEvaluation(world,{fromId:id,toId:'teacher',scope:'club-assessment',basisId:`basis:${id}`,originIds:origins,values});
}
const context = ()=>({fact:{id:'fact'},claim:{id:'claim',factId:'fact',versionId:'v1',evidence:'unverified'},knowledge:{actorId:'sender',claimId:'claim',knownVersions:['v1'],believedVersionId:null},route:{fromId:'sender',toId:'listener',claimId:'claim',versionId:'v1',basisId:'existing-contact',available:true}});
const actor = (id,n=50)=>({id,values:{'8-3':n,'8-4':n,'3-1':n,'3-2':n,'6-1':n}});
const relation = (fromId,toId,n=50)=>({fromId,toId,values:four(n)});

test('directional vectors preserve independent extremes, unknowns, and validated proposals',()=>{
  const world=make(), id=world.classroom.studentIds[0], other=world.classroom.studentIds[1];
  const before=JSON.stringify(world);
  assert.notDeepEqual(relationshipView(world,id,'teacher'),relationshipView(world,'teacher',id));
  assert.deepEqual(relationshipView(world,id,other),{status:'unknown',fromId:id,toId:other});
  for(const n of [0,100]) assert.deepEqual(relationshipVector(four(n)),four(n));
  const mixed={'5-1':100,'5-2':0,'5-3':100,'5-4':100};
  const sources=[{id:'e1',fromId:id,toId:'teacher',weight:1,values:mixed},{id:'e2',fromId:id,toId:'teacher',weight:3,values:four(0)}];
  assert.deepEqual(combineRelationships(id,'teacher',sources).values,{'5-1':25,'5-2':0,'5-3':25,'5-4':25});
  assert.throws(()=>combineRelationships('teacher',id,sources));
  assert.throws(()=>combineRelationships(id,'teacher',[sources[0],sources[0]]));
  assert.throws(()=>relationshipVector({'5-1':null}));
  assert.throws(()=>relationshipView(world,'missing',id));
  const proposal=prepareRelationshipChange({fromId:id,toId:'teacher',values:mixed},{'5-1':-200,'5-4':1000});
  assert.deepEqual(proposal.before,mixed); assert.equal(proposal.deltas['5-4'],1000);
  assert.throws(()=>prepareRelationshipChange({fromId:id,toId:'teacher',values:mixed},{'8-1':2}));
  assert.throws(()=>prepareRelationshipChange({fromId:id,toId:'teacher',values:mixed},{'5-1':NaN}));
  assert.equal(JSON.stringify(world),before);
});

test('new game 40 survives social registration; actual directed sources retire active bootstrap completely',()=>{
  const original=make(), id=original.classroom.studentIds[0];
  assert.equal(deriveWorldPanel(original).聲望,40);
  let world=initializeSocial(original);
  assert.equal(deriveWorldPanel(world).聲望,40);
  assert.throws(()=>activateReputation(world,[selection(id)]));
  world=attest(world,id); assert.equal(deriveWorldPanel(world).聲望,40);
  const before=copy(world), active=activateReputation(world,[selection(id)]);
  const key=directedKey(id,'teacher'), r=world.relationships[key].values, e=world.reputations[key].values;
  const expected=(4*e['8-1']+4*(100-e['8-2'])+4*r['5-3']+2*r['5-1']+2*(100-r['5-4']))/16;
  assert.ok(Math.abs(deriveWorldPanel(active).聲望-expected)<1e-12);
  assert.ok(active.player.current.evaluations.every(e=>e.reference&&!e.values&&e.kind!=='bootstrap'));
  assert.equal(derivePanel(active.player.initial).聲望,40);
  assert.deepEqual(world,before); assert.deepEqual(active.relationships,world.relationships);
  assert.throws(()=>derivePanel(active.player.current));
  assert.deepEqual(deriveWorldPanel(restoreWorld(JSON.stringify(active))),deriveWorldPanel(active));
  const changed=copy(active); for(const c of Object.keys(changed.relationships[directedKey('teacher',id)].values)) changed.relationships[directedKey('teacher',id)].values[c]=0;
  assert.equal(deriveWorldPanel(changed).聲望,deriveWorldPanel(active).聲望);
  assert.throws(()=>activateReputation(active,[]));
  assert.throws(()=>activateReputation(active,[selection(id),selection(id)]));
  assert.throws(()=>activateReputation(active,[selection('teacher')]));
  assert.throws(()=>attest(active,id));
  assert.equal(evaluationView(world,'missing','teacher').status,'unknown');
  assert.equal(evaluationView(world,id,'teacher').status,'known');
});

test('groups overlap without synchronizing members; duplicate represented voices are rejected',()=>{
  let {world,ids}=fixture(); const personal=copy(world.people);
  world=group(world,'club-a',ids,[ids[0]],{'5-1':100,'5-2':0,'5-3':100,'5-4':0,'8-1':100,'8-2':0});
  world=group(world,'club-b',ids,[ids[1]],{'5-1':0,'5-2':100,'5-3':0,'5-4':100,'8-1':0,'8-2':100});
  assert.equal(deriveWorldPanel(activateReputation(world,[selection('club-a','group')])).聲望,100);
  assert.equal(deriveWorldPanel(activateReputation(world,[selection('club-b','group')])).聲望,0);
  assert.equal(deriveWorldPanel(activateReputation(world,[selection('club-a','group'),selection('club-b','group')])).聲望,50);
  assert.deepEqual(world.people,personal);
  assert.throws(()=>activateReputation(world,[selection(ids[0]),selection('club-a','group')]));
  world=group(world,'club-c',ids,[ids[0]]);
  assert.throws(()=>activateReputation(world,[selection('club-a','group'),selection('club-c','group')]));
  assert.throws(()=>group(world,'bad',ids,['missing']));
  assert.throws(()=>registerGroup(world,{id:'teacher',kind:'local',scope:'x',memberIds:ids,values:{'9-2':1,'6-3':2,'6-4':3}}));
  const bad=copy(world); bad.social.groupEvaluations[directedKey('club-a','teacher')].values['8-1']=null;
  assert.throws(()=>validateWorld(bad));
});

test('semantic pools cap headcount influence while within-pool confidence matters',()=>{
  let world=make();
  const ids=world.classroom.studentIds;
  // Controlled mathematical fixtures, not production interaction generation.
  for(const id of ids) {
    const key=directedKey(id,'teacher');
    Object.assign(world.relationships[key].values,{'5-1':100,'5-3':100,'5-4':0});
    world.reputations[key].values={'8-1':100,'8-2':0};
    world=attest(world,id);
  }
  const caregiver=Object.values(world.people).find(p=>p.kind==='caregiver').id;
  world=group(world,'opposition',[caregiver],[caregiver],{'5-1':0,'5-2':100,'5-3':0,'5-4':100,'8-1':0,'8-2':100});
  for(const count of [1,10,40]) {
    const active=activateReputation(world,[...ids.slice(0,count).map(id=>selection(id)),selection('opposition','group')]);
    assert.ok(Math.abs(deriveWorldPanel(active).聲望-50)<1e-12);
    const views=resolveWorldEvaluations(active,active.player.current.evaluations);
    assert.ok(Math.abs(views.filter(v=>v.kind==='person').reduce((sum,v)=>sum+v.weight,0)-.5)<1e-12);
  }
  const low=ids[1], key=directedKey(low,'teacher');
  world.relationships[key].values=four(0); world.relationships[key].values['5-4']=100;
  world.reputations[key].values={'8-1':0,'8-2':100};
  assert.ok(deriveWorldPanel(activateReputation(world,[selection(ids[0],'person',1),selection(low,'person',.1)])).聲望>90);
  for(const weight of [0,-1,2,NaN]) assert.throws(()=>activateReputation(world,[selection(ids[0],'person',weight)]));
});

test('group, class and organization formulas preserve independent authoritative coordinates',()=>{
  const values={'9-1':100,'9-2':0,'6-3':100,'6-4':0}; const before=copy(values);
  assert.deepEqual(groupProfile(values,{classroom:true}),{order:100,cooperation:0,cohesion:100,exclusion:0,openness:100,coordination:62.5});
  assert.equal(groupProfile({...values,'6-4':100}).cohesion,100);
  assert.equal(participationWeight({'6-1':100,'6-2':0},values),50);
  assert.deepEqual(organizationProfile({'10-1':100,'10-2':0,'10-3':0,'10-4':100}),{support:75,oversight:0});
  assert.deepEqual(values,before); assert.throws(()=>groupProfile({'6-3':100}));
  let world=make(); world=registerGroup(world,{id:world.classroom.id,kind:'classroom',scope:'class',memberIds:world.classroom.studentIds,values:null});
  assert.equal(world.social.groups[world.classroom.id].values,null);
});

test('fact, knowledge, belief and route contracts gate probability without modifying any state',()=>{
  const ctx=context(), before=JSON.stringify(ctx), a=actor('listener'), r=relation('listener','sender');
  assert.equal(validateInformationContext(ctx),ctx);
  for(const mutate of [c=>{c.route.available=false;},c=>{c.knowledge.knownVersions=[];}]) {
    const c=copy(ctx); mutate(c);
    assert.deepEqual(adoptionProbability(a,r,c).eligible,false);
    assert.equal(adoptionProbability(a,r,c).probability,null);
  }
  assert.equal(adoptionProbability(a,null,ctx).reason,'unknown-relationship');
  for(const mutate of [c=>{c.claim.factId='other';},c=>{c.knowledge.believedVersionId='unknown';},c=>{c.route.fromId='stranger';},c=>{c.route.versionId='v2';},c=>{c.route.available=1;},c=>{c.knowledge.knownVersions=['v1','v1'];}]) {
    const c=copy(ctx);mutate(c);assert.throws(()=>adoptionProbability(a,r,c));
  }
  assert.throws(()=>adoptionProbability(a,relation('sender','listener'),ctx));
  assert.throws(()=>adoptionProbability(actor('sender'),r,ctx));
  const bad=copy(a);bad.values['8-3']=null;const unavailable=copy(ctx);unavailable.route.available=false;
  assert.throws(()=>adoptionProbability(bad,r,unavailable));
  assert.equal(JSON.stringify(ctx),before);
  assert.equal(ctx.knowledge.believedVersionId,null);
});

test('adoption and forwarding remain stochastic at extremes with meaningful independent sensitivity',()=>{
  const ctx=context(), a=actor('listener'), r=relation('listener','sender');
  const p=adoptionProbability(a,r,ctx).probability;
  const trust=copy(r);trust.values['5-1']=100;
  assert.ok(adoptionProbability(a,trust,ctx).probability>p);
  trust.values['5-1']=0;assert.ok(adoptionProbability(a,trust,ctx).probability<p);
  const judge=copy(a);judge.values['3-2']=100;
  assert.ok(adoptionProbability(judge,r,ctx).probability<p);
  for(const evidence of ['supported','contested']) {const c=copy(ctx);c.claim.evidence=evidence;assert.equal(adoptionProbability(a,r,c).probability>p,evidence==='supported');}
  const sender=actor('sender'), outgoing=relation('sender','listener');
  const fp=forwardingProbability(sender,outgoing,ctx).probability;
  sender.values['8-4']=100;assert.ok(forwardingProbability(sender,outgoing,ctx).probability>fp);
  const rng=createRandom(123), repeats=createRandom(123);let yes=0,no=0;
  for(let i=0;i<2000;i++){const result=rng.chance(p);assert.equal(result,repeats.chance(p));result?yes++:no++;}
  assert.ok(yes>0&&no>0);
  for(let bits=0;bits<512;bits++) {
    const values=actor('listener',0), rel=relation('listener','sender',0);
    const fields=[...Object.keys(values.values).map(code=>[values.values,code]),...Object.keys(rel.values).map(code=>[rel.values,code])];
    fields.forEach(([v,c],i)=>{v[c]=(bits>>i)&1?100:0;});
    const ap=adoptionProbability(values,rel,ctx).probability;
    values.id='sender'; rel.fromId='sender';rel.toId='listener';
    const f=forwardingProbability(values,rel,ctx).probability;
    assert.ok(ap>.02&&ap<.98&&f>.02&&f<.98);
  }
});

test('50,000 seeded heterogeneous candidates: bounded probabilities, sensitivity and reproducible diversity',t=>{
  const rng=createRandom(20261101), ctx=context(); let minA=1,maxA=0,sumA=0,minF=1,maxF=0,sumF=0;
  const before=JSON.stringify(ctx);
  for(let i=0;i<50000;i++) {
    const a=actor('listener'), r=relation('listener','sender');
    for(const code of Object.keys(a.values)) a.values[code]=rng.uniform(0,100);
    for(const code of Object.keys(r.values)) r.values[code]=rng.uniform(0,100);
    const p=adoptionProbability(a,r,ctx).probability;
    const higher=copy(r);higher.values['5-1']=100;
    assert.ok(adoptionProbability(a,higher,ctx).probability>=p);
    a.id='sender';r.fromId='sender';r.toId='listener';
    const f=forwardingProbability(a,r,ctx).probability;
    assert.ok(p>0&&p<1&&f>0&&f<1);
    minA=Math.min(minA,p);maxA=Math.max(maxA,p);sumA+=p;
    minF=Math.min(minF,f);maxF=Math.max(maxF,f);sumF+=f;
  }
  assert.ok(maxA-minA>.5&&maxF-minF>.5);
  assert.equal(JSON.stringify(ctx),before);
  t.diagnostic(JSON.stringify({samples:50000,adoption:{min:minA,max:maxA,mean:sumA/50000},forwarding:{min:minF,max:maxF,mean:sumF/50000}}));
});

test('formal reputation survives natural days, service-year transition and JSON replay',()=>{
  let {world,ids}=fixture();world=group(world,'daily-group',ids,[ids[1]]);world=activateReputation(world,[selection(ids[0])]);
  assert.ok(evolutionHolders(world).some(h=>h.kind==='group'&&h.record===world.social.groups['daily-group'].values));
  const reputation=deriveWorldPanel(world).聲望, relationships=copy(world.relationships), reputations=copy(world.reputations);
  let time=startEvolution(world,{seed:20,date:'2026-08-28',schoolYearId:'Y1',openingId:'O1'});
  time=advanceDay(time,{date:'2026-08-28',schoolYearId:'Y1',openingId:'O1',serviceYear:1});
  time=advanceDay(time,{date:'2026-08-29',schoolYearId:'Y2',openingId:'O2',serviceYear:2});
  assert.equal(deriveWorldPanel(time.world).聲望,reputation);
  assert.deepEqual(time.world.relationships,relationships);assert.deepEqual(time.world.reputations,reputations);
  assert.deepEqual(deriveWorldPanel(restoreWorld(JSON.stringify(time.world),{stage:'runtime'})),deriveWorldPanel(time.world));
});

test('sparse multi-cohort capacity: 2,000 evaluations, 100 overlapping groups, stable sources and JSON',t=>{
  const began=performance.now(), baseline=make();
  const specs=Array.from({length:2000},(_,i)=>({id:`extra:${i}`,roleIds:[1]}));
  let world=initializeSocial(ensureNPCs(baseline,specs));
  const social=world.social, playerId='teacher';
  // Bulk saved-data fixture: existing directed contacts and provided opinions, not event simulation.
  for(let i=0;i<2000;i++) {
    const id=`extra:${i}`, key=directedKey(id,playerId), contactKey=JSON.stringify([id,playerId].sort());
    world.contacts[contactKey]={a:id,b:playerId,reference:`declared:${i}`};
    world.relationships[key]={fromId:id,toId:playerId,basis:{kind:'declared-acquaintance',referenceId:contactKey},values:four(i%101)};
    world.reputations[key]={fromId:id,toId:playerId,scope:'provided',values:{'8-1':i%101,'8-2':100-i%101}};
    social.attestations[key]={fromId:id,toId:playerId,scope:'provided',basisId:`assessment:${i}`};
  }
  for(let i=0;i<100;i++) {
    const id=`group:${i}`,members=Array.from({length:40},(_,j)=>`extra:${(i*20+j)%2000}`);
    social.groups[id]={id,kind:'local',scope:'club',memberIds:members,values:{'9-2':i,'6-3':100-i,'6-4':i}};
    social.groupEvaluations[directedKey(id,playerId)]={fromId:id,toId:playerId,scope:'club',basisId:`groupbasis:${i}`,originIds:[members[0]],values:six(i)};
  }
  validateWorld(world,{stage:'runtime'});
  world=activateReputation(world,specs.map(s=>selection(s.id)));
  const value=deriveWorldPanel(world).聲望, saved=JSON.stringify(world), start=performance.now();
  for(let i=0;i<10;i++) assert.equal(deriveWorldPanel(world).聲望,value);
  const aggregationMs=(performance.now()-start)/10;
  let retainedHeapDelta = null;
  if (typeof global.gc === 'function') {
    global.gc(); const before = process.memoryUsage().heapUsed;
    for(let i=0;i<20;i++) deriveWorldPanel(world);
    global.gc(); retainedHeapDelta = process.memoryUsage().heapUsed-before;
  }
  assert.equal(deriveWorldPanel(restoreWorld(saved,{stage:'runtime'})).聲望,value);
  const expanded=ensureNPCs(world,[{id:'newcomer',roleIds:[1]}]);
  assert.equal(deriveWorldPanel(expanded).聲望,value);
  assert.equal(Object.keys(expanded.relationships).length,Object.keys(world.relationships).length);
  assert.ok(Object.keys(world.relationships).length<5000);
  t.diagnostic(JSON.stringify({people:Object.keys(world.people).length,groups:100,sources:2000,relationships:Object.keys(world.relationships).length,jsonBytes:Buffer.byteLength(saved),retainedHeapDelta,aggregationMs,totalMs:performance.now()-began,heapMB:process.memoryUsage().heapUsed/1024**2}));
});

test('saved social contracts reject corruption, missing authority, mixed bootstrap and scope changes',()=>{
  let {world,ids}=fixture();world=group(world,'club',ids,[ids[1]]);
  world=activateReputation(world,[selection(ids[0]),selection('club','group')]);
  const ref=world.player.current.evaluations[0];
  const changes=[
    w=>{w.social.version=2;},
    w=>{w.player.current.evaluations=resolveWorldEvaluations(w,w.player.current.evaluations);},
    w=>{w.social.extra=1;},
    w=>{w.social.groups.club.kind='unknown';},
    w=>{w.social.groups.club.memberIds.push(ids[0]);},
    w=>{w.social.groups.club.values['9-2']=101;},
    w=>{w.social.attestations[ref.reference.key].toId=ids[1];},
    w=>{w.social.attestations[ref.reference.key].basisId='';},
    w=>{delete w.social.attestations[ref.reference.key];},
    w=>{delete w.relationships[ref.reference.key];},
    w=>{delete w.reputations[ref.reference.key];},
    w=>{w.social.groupEvaluations[directedKey('club','teacher')].originIds=['teacher'];},
    w=>{w.social.groupEvaluations[directedKey('club','teacher')].toId='missing';},
    w=>{w.player.current.evaluations[0].reference.key=directedKey('teacher',ids[0]);},
    w=>{w.player.current.evaluations[0].reference.type='unknown';},
    w=>{w.player.current.evaluations[0].kind='group';},
    w=>{w.player.current.evaluations[0].scope='another-scope';},
    w=>{w.player.current.evaluations.push(copy(w.player.initial.evaluations[0]));},
    w=>{w.player.current.evaluations[0].weight=0;},
  ];
  for(const mutate of changes) { const changed=copy(world);mutate(changed);assert.throws(()=>restoreWorld(changed)); }
  assert.throws(()=>activateReputation(world,[{...selection(ids[0]),extra:true}]));
  assert.throws(()=>activateReputation(world,[selection(ids[0],'bootstrap')]));
  assert.throws(()=>evaluationView(world,'','teacher'));
  assert.throws(()=>evaluationView(world,ids[0],'teacher','unknown'));
  assert.deepEqual(restoreWorld(world),world);
});

test('independent NPC→NPC opinion can be registered from supplied data without becoming player reputation',()=>{
  let world=make();const [a,b,c]=world.classroom.studentIds;
  world=ensureRelationships(world,[[a,b],[c,b]]);
  const baseline=deriveWorldPanel(world).聲望;
  world=registerPersonEvaluation(world,{fromId:a,toId:b,scope:'provided-peer-assessment',basisId:'provided-basis-a',values:{'8-1':100,'8-2':100}});
  world=registerPersonEvaluation(world,{fromId:c,toId:b,scope:'provided-peer-assessment',basisId:'provided-basis-c',values:{'8-1':0,'8-2':0}});
  assert.deepEqual(evaluationView(world,a,b).values,{'8-1':100,'8-2':100});
  assert.deepEqual(evaluationView(world,c,b).values,{'8-1':0,'8-2':0});
  assert.equal(evaluationView(world,b,a).status,'unknown');
  assert.equal(deriveWorldPanel(world).聲望,baseline);
  assert.throws(()=>activateReputation(world,[selection(a)]));
  assert.throws(()=>registerPersonEvaluation(world,{fromId:a,toId:b,scope:'x',basisId:'x',values:{'8-1':20,'8-2':30}}));
  assert.deepEqual(restoreWorld(JSON.stringify(world)),world);
});
