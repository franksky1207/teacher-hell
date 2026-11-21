import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {DEMO_STORY,validateStory} from '../src/runtime/story-content.js';
import {replayStoryPerformance} from '../src/runtime/story-performance.js';
import {compileStoryPreview,storyPreviewSlots} from '../src/runtime/story-preview-content.js';
import {AVG_DEMO_ID,loadAvgDemo,renderStoryPerformancePreview,storyPreviewProjection} from '../web/story-performance-preview.js';
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


const published=JSON.parse(readFileSync(new URL('./fixtures/published-story-slots.json',import.meta.url)));
const expectedRoles=[
 [['student_a','student']],
 [['student_a','student'],['student_b','student'],['subject_teacher_a','staff']],
 [['guardian_a','guardian'],['student_a','student']],
 [['student_a','student']],
 [['guardian_a','guardian'],['student_a','student']],
 [['student_a','student'],['subject_teacher_a','staff']]
];
const codeFence=String.fromCharCode(96).repeat(3);

function draftExcerpt(publishedCase){
 const {headings,slotTable,opening}=publishedCase;
 return [...headings.slice(0,3),slotTable,headings[3],opening,headings[4]].join('\n');
}

test('published five-section drafts resolve declared slots only, preserving reader payloads',()=>{
 for(const [i,story] of published.cases.entries()){
  const detail={...fixture(null),storyId:story.storyId,title:story.title,
   sourceMarkdown:draftExcerpt(story),opening:story.opening};
  const before=structuredClone(detail);
  const preview={detail,...compileStoryPreview(detail)};
  assert.deepEqual([...preview.slots],expectedRoles[i],story.storyId);
  assert.ok(preview.pages.every(page=>!page.annotated&&page.cast.length===0),story.storyId);
  assert.deepEqual(detail,before);
 }
 const actual=draftExcerpt(published.cases[3]);
 const elsewhere=actual.replace('## 2｜四欄創意摘要','## 2｜四欄創意摘要\n'+published.cases[2].slotTable)
  .replace('## 4｜玩家可見開場與四個行動','\n| ghost | 行政人員 | 正文 | 正文 |\n\n## 4｜玩家可見開場與四個行動');
 assert.deepEqual([...storyPreviewSlots(elsewhere)],expectedRoles[3]);
});

test('published student, caregiver and teacher slots bind distinct stable art for legal cues',()=>{
 for(const i of [1,2]){
  const story=published.cases[i],entries=expectedRoles[i];
  const first=story.opening.match(/P01｜\{\{([a-z_]+)\.name\}\}/)[1];
  const firstKind=new Map(entries).get(first);
  const second=entries.find(([,kind])=>kind!==firstKind)[0];
  const pose=Object.fromEntries(entries.filter(([slot,kind])=>[first,second].includes(slot)&&kind!=='student').map(([slot])=>[slot,'gesture']));
  const expression=Object.fromEntries(entries.filter(([slot,kind])=>[first,second].includes(slot)&&kind==='student').map(([slot])=>[slot,'sad']));
  const cues={opening:{P01:{enter:[first,second],expression,pose}},results:{R1:{speaker:second,exit:[first]}}};
  const detail={...fixture(null),storyId:story.storyId,opening:story.opening,
   sourceMarkdown:draftExcerpt(story)+'\n'+codeFence+'avg\n'+JSON.stringify(cues)+'\n'+codeFence};
  const preview={detail,...compileStoryPreview(detail)};
  const start=storyPreviewProjection(preview,state).view.sceneView;
  const end=storyPreviewProjection(preview,{...state,showingResult:true}).view.sceneView;
  assert.equal(start.cast.length,2);
  assert.notEqual(start.cast[0].id,start.cast[1].id);
  assert.match(start.cast.find(actor=>actor.kind==='student').artId,/^student-/);
  assert.match(start.cast.find(actor=>actor.kind==='adult').artId,/^adult-/);
  assert.equal(end.cast[0].id,start.cast[1].id);
  assert.equal(end.cast[0].artId,start.cast[1].artId);
  assert.deepEqual(storyPreviewProjection({detail,...compileStoryPreview(detail)},state).view.sceneView,start);
  assert.throws(()=>compileStoryPreview({...detail,opening:detail.opening.replace('{{'+first+'.name}}','{{ghost.name}}')}),/未知說話者 ghost/);
  for(const [field,value,error] of [
   ['speaker','unknown_slot',/未知說話者.*unknown_slot/],['enter',['unknown_slot'],/槽位.*unknown_slot/],
   ['exit',['unknown_slot'],/槽位.*unknown_slot/],
   ['expression',{unknown_slot:'angry'},/unknown_slot/],['pose',{unknown_slot:'gesture'},/unknown_slot/]
  ]){
   const invalid=structuredClone(cues);
   invalid.results.R1[field]=value;
   assert.throws(()=>compileStoryPreview({...detail,sourceMarkdown:draftExcerpt(story)+'\n'+codeFence+'avg\n'+JSON.stringify(invalid)+'\n'+codeFence}),error);
  }
 }
});

test('isolated full demo displays the approved actors and backgrounds, with eight repeatable results',()=>{
 const demo=loadAvgDemo();
 const at=page=>storyPreviewProjection(demo,{...state,page});
 const actor=(page,i)=>at(page).view.sceneView.cast[i];
 assert.equal(demo.detail.storyId,AVG_DEMO_ID);
 assert.equal(actor(0,0).position,'center');
 assert.deepEqual(at(1).view.sceneView.cast.map(a=>[a.position,a.speaking]),[['left',false],['right',true]]);
 assert.deepEqual(at(2).view.sceneView.cast.map(a=>[a.expression,a.speaking]),[['angry',true],['surprised',false]]);
 assert.equal(actor(3,0).expression,'angry');
 assert.equal(at(4).view.sceneView.speaker,'老師');
 assert.equal(at(4).view.sceneView.cast.length,1);
 assert.equal(at(4).entry.scene,'school-corridor');
 assert.equal(at(6).entry,at(4).entry);
 assert.equal(actor(5,1).kind,'adult');
 assert.deepEqual([5,6,7].map(page=>actor(page,1).pose),['gesture','side','arms-open']);
 assert.equal(actor(7,1).id,actor(5,1).id);
 assert.deepEqual(at(7).view.choices.map(o=>o.id),[...'ABCD']);
 for(const [i,result] of demo.detail.results.entries()){
  const selected={...state,page:7,showingResult:true,resultId:'R'+(i+1)};
  const view=storyPreviewProjection(demo,selected).view;
  assert.equal(view.page.text,result.text);
  assert.ok(view.sceneView.cast.length<=2);
  assert.deepEqual(view,storyPreviewProjection(loadAvgDemo(),selected).view);
 }
 assert.equal(demo.detail.results.length,8);
 assert.deepEqual(at(0).view,storyPreviewProjection(loadAvgDemo(),state).view);
 assert.match(renderStoryPerformancePreview({storyId:AVG_DEMO_ID,index:[],indexError:'',indexLoading:true},'').html,/value="avg-demo" selected>完整演出示範/);
});
