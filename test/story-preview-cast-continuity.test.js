import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {compileStoryPreview} from '../src/runtime/story-preview-content.js';

const base='content/events-v1/T/T1-高一上/T1-1-首次進班與建班/單一池/';
const readStory=async n=>{
 const id='T1-'+String(n).padStart(3,'0');
 const md=await readFile(new URL('../'+base+id+'.md',import.meta.url),'utf8');
 const opening=md.match(/### 開場[^\n]*\n([\s\S]*?)(?=### 四個最終教師選項)/)?.[1]?.trim();
 const results=[...md.matchAll(/^### (R[1-8])｜([^\r\n]+)\r?\n\s*- \*\*玩家可見結果\*\*：([^\r\n]+)/gm)]
  .map(m=>({id:m[1],title:m[2],text:m[3]}));
 assert.ok(opening,id+' opening missing');
 assert.equal(results.length,8,id+' R results missing');
 const detail={storyId:id,opening,results,sourceMarkdown:md};
 return compileStoryPreview(detail);
};
const cast=page=>page.cast.map(a=>a.role);
test('T1-001 to T1-005: all 40 results compile as independent multi-page stage sequences',async()=>{
 let total=0;
 for(let n=1;n<=5;n++){
  const p=await readStory(n);
  assert.equal(p.resultPages.length,8);
  for(const [i,pages] of p.resultPages.entries()){
   assert.ok(pages.length>=2,'T1-'+n+' R'+(i+1)+' must be staged');
   for(const [k,page] of pages.entries()){
    assert.ok(page.text.trim(),'T1-'+n+' R'+(i+1)+' page '+(k+1));
    assert.ok(page.cast.length<=2,'stage capacity');
    if(page.presentation==='dialogue')assert.ok(page.speaker,'dialogue must have actor');
    if(page.presentation==='narration')assert.equal(page.speaker,null,'narration must have no speaker');
    // Remote phone/chat/email speakers are not physically present in the scene.
    if(page.speaker&&page.speaker!=='teacher'&&!['phone','chat','email'].includes(page.presentation))assert.ok(cast(page).includes(page.speaker),'on-site speaker must be on stage');
   }
   total+=pages.length;
  }
 }
 assert.ok(total>=80,'all 40 endings remain multi-page');
});
test('T1-004: R3 concludes on student B rather than student A and staff; R8 returns to class',async()=>{
 const p=await readStory(4);
 const lastR3=p.resultPages[2].at(-1);
 assert.equal(lastR3.scene,'school:classroom');
 assert.deepEqual(cast(p.resultPages[2][0]),['subject_teacher_a']);
 assert.deepEqual(cast(p.resultPages[2][2]),['student_a','student_b']);
 assert.deepEqual(cast(lastR3),['student_b']);
 assert.ok(lastR3.text.includes('學生'),'ending must mention student perspective');
 const lastR8=p.resultPages[7].at(-1);
 assert.equal(lastR8.scene,'school:classroom');
 assert.deepEqual(cast(lastR8),['student_a','student_b']);
 assert.ok(!cast(lastR8).includes('subject_teacher_a'));
});
test('T1-005: remote family conversations cannot leave guardian sprites in school narration',async()=>{
 const p=await readStory(5);
 for(const i of [0,1,3,5]){
  const pages=p.resultPages[i];
  assert.ok(['phone','chat'].includes(pages[0].presentation));
  for(const page of pages.slice(1))assert.ok(!cast(page).includes('guardian_a'));
 }
 for(const i of [1,3]){
  assert.deepEqual(cast(p.resultPages[i].at(-1)),['student_a']);
  assert.equal(p.resultPages[i].at(-1).scene,'school:classroom');
 }
 const parentFirst=p.resultPages[4];
 assert.equal(parentFirst[0].scene,'school:teachers-office');
 assert.deepEqual(cast(parentFirst[0]),[]);
 assert.equal(parentFirst[1].presentation,'phone');
 assert.equal(parentFirst[1].speaker,'guardian_a');
 assert.equal(parentFirst[2].scene,'school:classroom');
 assert.deepEqual(cast(parentFirst[2]),['student_a']);
 assert.deepEqual(cast(parentFirst[3]),['student_a']);
 for(const i of [2,6,7]){
  assert.equal(p.resultPages[i].at(-1).scene,'school:teachers-office');
  assert.deepEqual(cast(p.resultPages[i].at(-1)),[]);
 }
});
