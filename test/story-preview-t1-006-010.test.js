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
 assert.equal(totals.R,40);
 assert.ok(totals.pages>=80,'all endings remain multi-page');
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

test('T1-006..010: result pages explicitly direct all visible faces and adult poses',async()=>{
 const expressions=new Set(['calm','happy','angry','sad','surprised','embarrassed']);
 const poses=new Set(['neutral','side','hand-on-hip','arms-open','gesture','weight-shift']);
 let totalPages=0,expressed=0,posed=0;
 for(let n=6;n<=10;n++){
  const {preview,sourceMarkdown}=await story(n);
  const cues=JSON.parse(sourceMarkdown.match(/```avg\s*([\s\S]*?)```/)?.[1]??'null');
  assert.ok(cues,id(n)+' missing AVG directives');
  const signatures=new Set();
  for(let i=0;i<8;i++){
   const pages=preview.resultPages[i],instructions=cues.results['R'+(i+1)].pages;
   assert.equal(pages.length,instructions.length);
   const sequence=[];
   for(let j=0;j<pages.length;j++){
    const page=pages[j],source=instructions[j],active=new Set(page.cast.map(actor=>actor.role));
    totalPages++;
    // No arbitrary actors solely for expressions: secret papers stay empty.
    if(active.size){
     for(const [role,expression] of Object.entries(source.expression??{})){
      assert.ok(active.has(role),'off-stage expression '+role);
      assert.ok(expressions.has(expression),'unsupported expression '+expression);
      assert.equal(page.cast.find(actor=>actor.role===role).expression,expression);
     }
     expressed++;
    }else assert.equal(source.expression,undefined,'no expressions in anonymous empty scenes');
    for(const [role,pose] of Object.entries(source.pose??{})){
     assert.equal(n,8,'adult pose used in non-adult story');
     assert.equal(role,'subject_teacher_a');
     assert.ok(active.has(role));
     assert.ok(poses.has(pose));posed++;
    }
    sequence.push(page.cast.map(actor=>actor.role+':'+actor.expression).join(','));
   }
   signatures.add(sequence.join('|'));
  }
  assert.ok(signatures.size>=4,id(n)+' all R endings look too similar');
 }
 assert.ok(totalPages>=80);
 assert.ok(expressed>0);
 assert.ok(posed>=4);
});
