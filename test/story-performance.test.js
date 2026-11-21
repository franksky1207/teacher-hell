import test from 'node:test';
import assert from 'node:assert/strict';
import {DEMO_STORY,validateStory} from '../src/runtime/story-content.js';
import {replayStoryPerformance} from '../src/runtime/story-performance.js';
import {compileStoryPreview,storyPreviewSlots} from '../src/runtime/story-preview-content.js';
import {storyPreviewProjection} from '../web/story-performance-preview.js';
import {renderStoryView} from '../web/story-view.js';

const roles=new Map([['student_a','student'],['staff_a','staff'],['guardian_a','guardian']]);
const cues={
 opening:{
  P01:{scene:'school:classroom',enter:['student_a'],expression:{student_a:'embarrassed'}},
  P02:{enter:['staff_a'],pose:{staff_a:'gesture'}},
  P04:{exit:['student_a'],enter:['guardian_a'],pose:{staff_a:'side'}},
  P05:{scene:'school:corridor',exit:['staff_a','guardian_a'],enter:['student_a']}
 },
 results:{R1:{expression:{student_a:'happy'}},R2:{expression:{student_a:'sad'}}}
};
function fixture(performance=cues){
 return {storyId:'T1-001',quotaDate:'2026-07-20',topicId:'T1-1',
  sourceMarkdown:performance?['```avg',JSON.stringify(performance),'```'].join('\n'):'',
  opening:[
   '- **P01｜{{student_a.name}}**：老師，我想說明。',
   '- **P02｜staff_a**：請慢慢說。',
   '- **P03｜teacher**：我正在聽。',
   '- **P04｜guardian_a**：我來了。',
   '- **P05｜旁白**：走廊安靜下來。'
  ].join('\n'),options:[...'ABCD'].map(id=>({id,text:'選項 '+id})),
  results:Array.from({length:8},(_,i)=>({id:'R'+(i+1),title:'後果',text:'結果 '+(i+1)})),matrix:{A:[0,4,1,2,4,2,1,2]}};
}
const state={page:0,showingResult:false,selected:null,resultId:'R1'};
const compile=detail=>({detail,...compileStoryPreview(detail,roles)});

test('formal story stage validates named cast and rebuilds single, dual, replacement and reentry pages',()=>{
 const content=structuredClone(DEMO_STORY);
 content.compilerContract=2;
 content.roleBindings=Object.fromEntries([...roles.keys()].map(role=>[role,{personId:role}]));
 const preview=compile(fixture());
 const pages=preview.pages.map(({text,presentation,performance,speaker},i)=>({
  order:i+1,text,presentation,performance,speaker,...(cues.opening['P0'+(i+1)]?.scene?{scene:cues.opening['P0'+(i+1)].scene}:{})
 }));
 content.stages[0].pages=pages;
 assert.equal(validateStory(content),content);
 const roleSet=new Set(['teacher',...roles.keys()]);
 const at=i=>replayStoryPerformance(structuredClone(pages),i,roleSet).page;
 assert.deepEqual(at(0).cast.map(a=>[a.role,a.position]),[['student_a','center']]);
 assert.deepEqual(at(1).cast.map(a=>[a.role,a.position]),[['student_a','left'],['staff_a','right']]);
 assert.deepEqual(at(3).cast.map(a=>[a.role,a.position]),[['guardian_a','left'],['staff_a','right']]);
 assert.equal(at(4).cast[0].expression,'embarrassed');
 assert.equal(at(4).scene,'school:corridor');
 const after=at(2);at(4);at(1);assert.deepEqual(at(2),after);
});

test('production preview calls shared art, preserves choices and independently previews all eight results',()=>{
 const detail=fixture(),before=structuredClone(detail),preview=compile(detail);
 const open=storyPreviewProjection(preview,state);
 const two=storyPreviewProjection(preview,{...state,page:1});
 assert.equal(open.entry.scene,'school-classroom');
 assert.match(renderStoryView(open.view),/data-story-portrait="student-\d+" data-expression="embarrassed" data-story-wear="uniform-summer"/);
 assert.match(renderStoryView(two.view),/data-story-adult="adult-[^"]+" data-adult-pose="gesture"/);
 assert.equal(two.view.sceneView.cast[0].artId,open.view.sceneView.cast[0].artId);
 assert.deepEqual(storyPreviewProjection(preview,{...state,page:4}).view.choices.map(o=>o.id),[...'ABCD']);
 for(const {id,text} of detail.results){
  const result=storyPreviewProjection(preview,{...state,page:4,showingResult:true,resultId:id});
  assert.equal(result.view.page.text,text);
  assert.deepEqual(result.view.choices,[]);
  if(id==='R1'||id==='R2')assert.equal(result.view.sceneView.cast[0].expression,id==='R1'?'happy':'sad');
 }
 assert.deepEqual(storyPreviewProjection(preview,{...state,page:4,showingResult:true,resultId:'R1'}).view.sceneView.cast,
  storyPreviewProjection(compile(fixture()),{...state,page:4,showingResult:true,resultId:'R1'}).view.sceneView.cast);
 assert.deepEqual(detail,before);
});

test('missing cues remain text-only and invalid cues fail clearly',()=>{
 const unmarked=compile(fixture(null));
 assert.equal(unmarked.hasAnnotations,false);
 assert.equal(storyPreviewProjection(unmarked,state).view.sceneView.cast.length,0);
 for(const [cue,message] of [
  [{scene:'school:missing'},/未知場景/],
  [{enter:['teacher']},/槽位/],
  [{enter:['student_a','staff_a','guardian_a']},/兩位/],
  [{enter:['student_a'],expression:{student_a:'unknown'}},/expression/],
  [{enter:['student_a','staff_a'],pose:{staff_a:'unknown'}},/pose/],
  [{exit:['student_a']},/未登場/],
  [null,/未知頁面欄位/]
 ]){
  assert.throws(()=>compile(fixture({opening:{P01:cue}})),message);
 }
});


test('preview identities follow declared roles, including student descriptions mentioning guardians',()=>{
 const source=[
  '- **常駐數值角色槽位**：',
  '| learner | 現任本班學生，擔心家長失望 |',
  '| caregiver | 本班學生的合法家長或實際照顧者 |',
  '| colleague | 本班規範任課教師 |',
  '- **無數值情境角色**：無'
 ].join('\n');
 assert.deepEqual([...storyPreviewSlots(source)],[['learner','student'],['caregiver','guardian'],['colleague','staff']]);
});
