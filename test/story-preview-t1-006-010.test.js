import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {compileStoryPreview} from '../src/runtime/story-preview-content.js';

const base='content/events-v1/T/T1-高一上/T1-1-首次進班與建班/單一池/';
const id=n=>'T1-'+String(n).padStart(3,'0');
const scene=page=>page.cast.map(actor=>actor.role);
const story=async n=>{
 const key=id(n);
 const sourceMarkdown=await readFile(new URL('../'+base+key+'.md',import.meta.url),'utf8');
 const opening=sourceMarkdown.match(/### 開場[^\n]*\n([\s\S]*?)(?=### 四個最終教師選項)/)?.[1]?.trim();
 const results=[...sourceMarkdown.matchAll(/^### (R[1-8])｜([^\r\n]+)\r?\n\s*- \*\*玩家可見結果\*\*：([^\r\n]+)/gm)]
 .map(match=>({id:match[1],title:match[2],text:match[3]}));
 assert.ok(opening,key+' missing opening');
 assert.equal(results.length,8,key+' missing R');
 const preview=compileStoryPreview({storyId:key,sourceMarkdown,opening,results});
 return {preview,sourceMarkdown,results};
};
test('T1-006..010 complete AVG outcomes: 40 R, 128 pages, 5 event soundtracks',async()=>{
 const totals={R:0,pages:0};
 const music=['school','conflict','serious','serious','school'];
 for(let n=6;n<=10;n++){
  const {preview,results}=await story(n);
  assert.equal(preview.music,music[n-6]);
  assert.equal(preview.pages.length,3);
  assert.equal(preview.resultPages.length,8);
  for(let i=0;i<8;i++){
   const pages=preview.resultPages[i];
   assert.ok(pages.length>=2,id(n)+' R'+(i+1)+' lacks pages');
   assert.equal(preview.results[i],pages[0]);
   for(const page of pages){
    assert.ok(page.text.trim());
    assert.ok(page.cast.length<=2);
    if(page.speaker&&page.speaker!=='teacher')assert.ok(scene(page).includes(page.speaker),'off-stage speaker');
    if(page.presentation==='narration')assert.equal(page.speaker,null,'narration speaker');
    if(['dialogue','phone','chat'].includes(page.presentation))assert.ok(page.speaker);
   }
   assert.equal(results[i].id,'R'+(i+1));
   totals.R++;totals.pages+=pages.length;
  }
 }
 assert.deepEqual(totals,{R:40,pages:128});
});
test('T1-008 role and confidentiality: subject teacher never shares stage with private student',async()=>{
 const {preview}=await story(8);
 for(const pages of preview.resultPages){
  for(const page of pages)assert.ok(!(scene(page).includes('subject_teacher_a')&&scene(page).includes('student_a')),'subject teacher confronts private source');
 }
 for(const i of [1,3,4,7])assert.ok(preview.resultPages[i].some(page=>scene(page).includes('subject_teacher_a')));
 for(const i of [0,2,5,6])assert.ok(preview.resultPages[i].every(page=>!scene(page).includes('subject_teacher_a')));
});
test('T1-009 anonymous authors remain unknown; private paper scenes have no forced student sprite',async()=>{
 const {preview}=await story(9);
 for(const i of [1,4])assert.ok(preview.resultPages[i].every(page=>!scene(page).includes('student_a')));
 assert.equal(scene(preview.resultPages[7][0]).length,0);
 assert.deepEqual(scene(preview.resultPages[7].at(-1)),['student_a']);
});
test('T1-006 and T1-007 and T1-010 keep two participating students available for reply',async()=>{
 for(const i of [6,7,10]){
  const {preview}=await story(i);
  for(const p of preview.resultPages.flat())assert.deepEqual(new Set(scene(p)),new Set(['student_a','student_b']));
 }
});
