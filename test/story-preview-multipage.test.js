import test from 'node:test';
import assert from 'node:assert/strict';
import {compileStoryPreview} from '../src/runtime/story-preview-content.js';
import {visiblePreviewCastRoles} from '../web/story-preview-cast.js';

const markdown=(cues)=>[
 '## 3｜四碼種子及角色槽位',
 '- **常駐數值角色槽位**：',
 '| 槽位鍵 | 人物資格／類別 | 必要限制 | 結算 |',
 '| --- | --- | --- | --- |',
 '| student_a | 本班學生 | 合法 | 無 |',
 '| staff_a | 校內教職員 | 合法 | 無 |',
 '## 4｜玩家可見開場與四個行動',
 '```avg',JSON.stringify(cues),'```'
].join('\n');
const makeDetail=(results)=>({
 storyId:'T1-001',music:'school',title:'多頁結果測試',
 opening:'- **P01｜student_a**：老師，我想問一件事。',
 options:['A','B','C','D'].map(id=>({id,text:id})),
 results:Array.from({length:8},(_,i)=>({id:'R'+(i+1),title:'結果'+(i+1),text:'原結果事實'+(i+1)})),
 sourceMarkdown:markdown({
  opening:{P01:{scene:'school:classroom',enter:['student_a'],speaker:'student_a'}},
  results
 })
});
test('AVG: a result may have independent dialogue/narration/actor pages',()=>{
 const detail=makeDetail({R1:{pages:[
  {text:'老師，我有問題。',speaker:'student_a',expression:{student_a:'surprised'}},
  {text:'你看見學生整理了資料。',speaker:null,presentation:'narration'},
  {text:'我來協助。',speaker:'staff_a',exit:['student_a'],enter:['staff_a'],pose:{staff_a:'gesture'}}
 ]},R2:{speaker:'student_a',expression:{student_a:'happy'}}});
 const preview=compileStoryPreview(detail);
 assert.deepEqual(preview.resultPages.map(pages=>pages.length),[3,1,1,1,1,1,1,1]);
 assert.deepEqual(preview.resultPages[0].map(page=>page.speaker),['student_a',null,'staff_a']);
 assert.deepEqual(preview.resultPages[0].map(page=>page.cast.map(actor=>actor.role)),[['student_a'],['student_a'],['staff_a']]);
 assert.equal(preview.resultPages[1][0].cast[0].role,'student_a');
 assert.equal(preview.resultPages[1][0].cast[0].expression,'happy');
 assert.equal(preview.resultPages[1][0].text,'原結果事實2');
 assert.equal(preview.results[0],preview.resultPages[0][0]);
 assert.equal(detail.results[0].text,'原結果事實1');
 assert.deepEqual([...visiblePreviewCastRoles(preview)],['student_a','staff_a']);
});
test('AVG: original R cue remains a one-page result; unannotated results remain readable',()=>{
 const p=compileStoryPreview(makeDetail({R1:{speaker:'student_a'}}));
 assert.equal(p.resultPages[0].length,1);
 assert.equal(p.resultPages[0][0].text,'原結果事實1');
 assert.equal(p.resultPages[1].length,1);
 assert.equal(p.resultPages[1][0].presentation,'narration');
 assert.equal(p.resultPages[1][0].text,'原結果事實2');
});
test('AVG: invalid result page script is rejected without fallback',()=>{
 const invalid=[
  {pages:[]},
  {pages:[{text:'',speaker:'student_a'}]},
  {pages:[{text:'x',speaker:'unknown'}]},
  {pages:[{text:'x',speaker:'staff_a'}]},
  {pages:[{text:'x',speaker:'student_a'}],speaker:'student_a'},
  {text:'不可改寫原文',speaker:'student_a'}
 ];
 for(const cue of invalid)assert.throws(()=>compileStoryPreview(makeDetail({R1:cue})),/AVG 演出/);
});
test('AVG: opening actors are snapshot-isolated across results',()=>{
 const p=compileStoryPreview(makeDetail({R1:{pages:[
  {text:'離開',speaker:null,exit:['student_a'],presentation:'narration'},
  {text:'老師，我來了。',speaker:'staff_a',enter:['staff_a']}
 ]},R2:{speaker:'student_a'}}));
 assert.deepEqual(p.resultPages[0][1].cast.map(x=>x.role),['staff_a']);
 assert.deepEqual(p.resultPages[1][0].cast.map(x=>x.role),['student_a']);
});
