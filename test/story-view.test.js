import test from 'node:test';
import assert from 'node:assert/strict';
import {renderStoryView} from '../web/story-view.js';
const choices=[{id:'listen',text:'先聽學生說明'},{id:'emotion',text:'表達疲憊'},{id:'defer',text:'明天再談'}];
const read=(changes={})=>({page:{text:'學生開口說話。',speaker:null,presentation:'narration',cast:[]},pageIndex:0,pageCount:3,canPrevious:false,canNext:true,choices:[],confirmation:null,canFinish:false,waiting:false,canResume:false,ended:false,...changes});
test('13-A: legal next/previous navigation and no blank-area finish',()=>{
 const first=renderStoryView(read());assert.match(first,/data-story-advance="next"/);assert.match(first,/data-story-action="next"/);assert.doesNotMatch(first,/data-story-action="previous"|data-story-action="finish"/);
 const last=renderStoryView(read({pageIndex:2,canNext:false,canPrevious:true,canFinish:true}));assert.match(last,/data-story-action="previous"/);assert.match(last,/data-story-action="finish"/);assert.doesNotMatch(last,/data-story-advance|data-story-action="next"/);
});
test('13-A: choices, cancellation, confirmation are distinct',()=>{
 const list=renderStoryView(read({pageIndex:2,canNext:false,choices}));assert.equal((list.match(/data-story-action="select"/g)||[]).length,3);assert.doesNotMatch(list,/data-story-action="confirm"|data-story-advance/);
 const confirmation=renderStoryView(read({pageIndex:2,canNext:false,confirmation:{optionId:'listen',text:choices[0].text}}));assert.match(confirmation,/data-story-action="cancel"/);assert.match(confirmation,/data-story-action="confirm"/);assert.doesNotMatch(confirmation,/data-story-action="select"|data-story-advance/);
});
test('13-A: result/waiting/ended actions are guarded',()=>{
 assert.match(renderStoryView(read({pageIndex:2,canNext:false,canFinish:true})),/data-story-action="finish"/);
 assert.match(renderStoryView(read({waiting:true,canNext:false,canResume:true})),/data-story-action="resume"/);
 assert.doesNotMatch(renderStoryView(read({waiting:true,canNext:false})),/data-story-action="/);
 assert.doesNotMatch(renderStoryView(read({ended:true,canNext:false,canFinish:true})),/data-story-action="/);
});
test('13-A: presentation kinds, text escaping, and safe option attributes',()=>{
 for(const presentation of ['dialogue','narration','phone','chat'])assert.match(renderStoryView(read({page:{text:'第一句\n第二句',speaker:null,presentation}})),new RegExp('data-story-format="'+presentation+'"'));
 const html=renderStoryView(read({pageIndex:2,canNext:false,page:{text:'<img src=x onerror=1>',speaker:null,presentation:'chat'},choices:[...choices.slice(0,2),{id:'x" onclick="evil',text:'<script>evil</script>'}]}));
 assert.doesNotMatch(html,/<img|<script| onclick="evil"/);assert.match(html,/&lt;img/);assert.match(html,/&quot;/);assert.doesNotMatch(html,/成功率|data-result/);
});
test('13-A: rejects invalid projection and option counts',()=>{
 assert.throws(()=>renderStoryView(null),TypeError);assert.throws(()=>renderStoryView(read({pageIndex:3})),TypeError);
 assert.throws(()=>renderStoryView(read({pageIndex:2,canNext:false,choices:choices.slice(0,2)})),RangeError);
 assert.throws(()=>renderStoryView(read({pageIndex:2,canNext:false,choices:Array(9).fill(choices[0])})),RangeError);
});

test('13-C: only confirmed disclosures and public, rounded panel changes are shown',()=>{
 const content={pageIndex:2,canNext:false,canFinish:true,result:['教師已知道<事實>。'],
  teacherDelta:{教學能力:1.8,精神:-2.1,體力:0.2,隱藏參數:99}};
 const html=renderStoryView(read(content));
 assert.match(html,/aria-label="事件結果"/);
 assert.match(html,/教師已知道&lt;事實&gt;/);
 assert.match(html,/教學能力 \+2/);
 assert.match(html,/精神 -2/);
 assert.doesNotMatch(html,/隱藏參數|體力 \+0|<事實>/);
 const before=renderStoryView(read({...content,canFinish:false,choices}));
 assert.doesNotMatch(before,/aria-label="事件結果"/);
 const pending=renderStoryView(read({...content,canFinish:false,confirmation:{optionId:'listen',text:choices[0].text}}));
 assert.doesNotMatch(pending,/aria-label="事件結果"/);
});
test('13-C: confirmed result has no previous/cancel/reconfirm action',()=>{
 const html=renderStoryView(read({pageIndex:2,canNext:false,canPrevious:false,canFinish:true,result:['已知事實'],teacherDelta:{}}));
 assert.match(html,/data-story-action="finish"/);
 assert.doesNotMatch(html,/data-story-action="previous"|data-story-action="cancel"|data-story-action="confirm"|data-story-advance/);
});
test('13-C: eight options render eight controls without padding',()=>{
 const eight=Array.from({length:8},(_,i)=>({id:'option-'+i,text:'選項'+(i+1)}));
 const html=renderStoryView(read({pageIndex:2,canNext:false,choices:eight}));
 assert.equal((html.match(/data-story-action="select"/g)||[]).length,8);
 assert.doesNotMatch(html,/data-story-action="confirm"|data-story-action="finish"/);
});
