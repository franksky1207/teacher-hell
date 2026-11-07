import test from 'node:test';
import assert from 'node:assert/strict';
import {CATALOG,APPEARANCE_CATALOG_VERSION,appearanceCounts,assignAppearances,appearanceMetrics,safeAppearance,hashAppearance} from '../scripts/appearance-l3.js';

const roster=(count=40)=>Array.from({length:count},(_,i)=>({
 personId:'student:stable-'+String(i).padStart(3,'0'),
 variant:(1109*i+421)%65536,
 gender:i<count/2?'male':'female'
}));
const config=(careerId,orderedRoster)=>({careerId,orderedRoster});
const serial=a=>JSON.stringify([...a]);
test('L3 capacity reports theory, synthetic compatibility and actual artwork separately',()=>{
 const c=appearanceCounts();
 assert.equal(c.theoretical,2160);
 assert.equal(c.excluded,144);
 assert.equal(c.syntheticallyLegal,2016);
 assert.equal(c.actualInterchangeableHairCount,0);
 assert.equal(c.actualValidatedCompositeCount,0);
 assert.equal(CATALOG.length,new Set(CATALOG.map(o=>[o.prototype,o.hair,o.color,o.eyes,o.accessory].join('/'))).size);
 assert.ok(APPEARANCE_CATALOG_VERSION);
});
test('40 students in each of three save slots have zero exact combinations and explicit genders',()=>{
 const assignments=[1,2,3].map(slot=>assignAppearances(config('career-slot-'+slot,roster())));
 for(const assigned of assignments){
  assert.equal(assigned.size,40);
  const m=appearanceMetrics(assigned);
  assert.equal(m.exactDuplicateCount,0);
  assert.equal(m.population,40);
  for(const s of roster())assert.equal(assigned.get(s.personId).gender,s.gender);
 }
 assert.notEqual(serial(assignments[0]),serial(assignments[1]));
 assert.notEqual(serial(assignments[1]),serial(assignments[2]));
});
test('repeatable after save/reload/year transitions/desktop phone; independent of call order',()=>{
 const a=assignAppearances(config('career-slot-1',roster()));
 assignAppearances(config('career-slot-3',roster()));
 assert.equal(serial(assignAppearances(config('career-slot-1',roster()))),serial(a));
 assert.equal(hashAppearance('person-id'),hashAppearance('person-id'));
});
test('incoming students appended to immutable history do not rearrange earlier assignments',()=>{
 const original=roster(),old=assignAppearances(config('career',original));
 const newcomers=[{personId:'transfer:001',variant:3846,gender:'male'},
 {personId:'transfer:002',variant:11151,gender:'female'}];
 const more=assignAppearances(config('career',[...original,...newcomers]));
 for(const s of original)assert.deepEqual(old.get(s.personId),more.get(s.personId));
 assert.equal(appearanceMetrics(more).exactDuplicateCount,0);
 // An outgoing or absent student must still be kept in the historic ledger.
 assert.deepEqual(more.get(original[4].personId),old.get(original[4].personId));
});
test('three-year reenrollment uses immutable identity and stable roster receipt ordering',()=>{
 const people=roster();
 const first=assignAppearances(config('cohort:one',people));
 const third=assignAppearances(config('cohort:one',people));
 for(const s of people)assert.deepEqual(first.get(s.personId),third.get(s.personId));
});
test('single saved profile seed is not treated as authoritative gender',()=>{
 const people=[{personId:'one',variant:8,gender:'female'},{personId:'two',variant:9,gender:'male'}];
 const a=assignAppearances(config('gender',people));
 assert.equal(a.get('one').gender,'female');
 assert.equal(a.get('two').gender,'male');
});
test('school can hold upper-cap 42 with no exact duplicate',()=>{
 const a=assignAppearances(config('max-42',roster(42)));
 assert.equal(a.size,42);assert.equal(appearanceMetrics(a).exactDuplicateCount,0);
});
test('missing or unapproved art always falls back without inventing student identities',()=>{
 assert.deepEqual(safeAppearance(()=>false,{prototype:'approved-student-001'}),{kind:'placeholder',id:'student-silhouette'});
 assert.deepEqual(safeAppearance(()=>true,{prototype:'F01'}),{kind:'placeholder',id:'student-silhouette'});
 assert.deepEqual(safeAppearance(name=>name==='student-001-base.png',{prototype:'approved-student-001'}),{kind:'image',id:'student-001-base.png'});
});
test('invalid duplicate IDs and broken profile parameters reject instead of reshuffling',()=>{
 assert.throws(()=>assignAppearances(config('c',[roster(2)[0],roster(2)[0]])),/Duplicate/);
 assert.throws(()=>assignAppearances(config('c',[{personId:'x',variant:65536,gender:'male'}])),/Student must/);
 assert.throws(()=>assignAppearances(config('',roster())),/careerId/);
});
test('synthetic catalog capacity >40 in each gender (not actual art)',()=>{
 for(const gender of ['male','female'])assert.ok(CATALOG.filter(x=>x.gender===gender).length>40);
});
