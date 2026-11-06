import test from 'node:test';
import assert from 'node:assert/strict';
import {mergeNameHistory,NAME_MEMORY_LIMIT} from '../src/storage/name-memory.js';
import {preferUnusedOpeningNames} from '../src/runtime/opening-name-memory.js';
import {GIVEN_NAME_CATALOG,surnameOf} from '../src/world/name-catalog.js';

test('Name memory is bounded, LRU, shared independently of any save slot',()=>{
 const previous=Array.from({length:NAME_MEMORY_LIMIT+100},(_,i)=>'名字'+i);
 const merged=mergeNameHistory(previous,['名字30','全新名字']);
 assert.equal(merged.length,NAME_MEMORY_LIMIT);
 assert.equal(merged.at(-1),'全新名字');
 assert.equal(merged.at(-2),'名字30');
 assert.equal(merged.filter(x=>x==='名字30').length,1);
 assert.ok(!merged.includes('名字0'));
 assert.deepEqual(mergeNameHistory(['甲','乙'],['甲']),['乙','甲']);
});
test('Opening prefers unused names across separate careers but does not rewrite saved names',()=>{
 const profiles={},male=GIVEN_NAME_CATALOG.male,female=GIVEN_NAME_CATALOG.female;
 for(let i=0;i<40;i++){
  profiles['student'+i]={displayName:'陳'+(i<20?male[i]:female[i-20]),gender:i<20?'male':'female',appearance:{variant:i}};
 }
 const proposal={identity:{careerId:'new-career'},numeric:{evolution:{world:{registry:{profiles}}}}};
 const original=Object.values(profiles).map(p=>p.displayName.slice(surnameOf(p.displayName).length));
 const oldCareerNames=original.slice(0,25);
 const result=preferUnusedOpeningNames(proposal,oldCareerNames);
 const selected=Object.values(profiles).map(p=>p.displayName.slice(surnameOf(p.displayName).length));
 assert.equal(result.replaced,25);
 assert.equal(new Set(selected).size,40);
 assert.ok(selected.every(name=>!oldCareerNames.includes(name)));
 const before=JSON.stringify(proposal);
 preferUnusedOpeningNames(proposal,oldCareerNames);
 assert.equal(JSON.stringify(proposal),before,'Reselecting under unchanged history is idempotent');
});
