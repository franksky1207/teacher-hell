import {renderSpecialStoryBody} from '../web/story-formats.js';
import {projectStoryScene,renderStoryScene} from '../web/story-scene.js';
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
 const content={pageIndex:2,canNext:false,canFinish:true,resultConfirmed:true,result:['教師已知道<事實>。'],
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
 const html=renderStoryView(read({pageIndex:2,canNext:false,canPrevious:false,canFinish:true,resultConfirmed:true,result:['已知事實'],teacherDelta:{}}));
 assert.match(html,/data-story-action="finish"/);
 assert.doesNotMatch(html,/data-story-action="previous"|data-story-action="cancel"|data-story-action="confirm"|data-story-advance/);
});
test('13-C: eight options render eight controls without padding',()=>{
 const eight=Array.from({length:8},(_,i)=>({id:'option-'+i,text:'選項'+(i+1)}));
 const html=renderStoryView(read({pageIndex:2,canNext:false,choices:eight}));
 assert.equal((html.match(/data-story-action="select"/g)||[]).length,8);
 assert.doesNotMatch(html,/data-story-action="confirm"|data-story-action="finish"/);
});

test('13-C: narrative-only final page does not claim a confirmed result',()=>{
 const html=renderStoryView(read({pageIndex:2,canNext:false,canFinish:true,result:[],teacherDelta:{}}));
 assert.doesNotMatch(html,/aria-label="事件結果"/);
 assert.match(html,/data-story-action="finish"/);
});

test('13-D: two participants render distinct placeholders, expressions and active speaker',()=>{
 const w={identity:{playerId:'teacher'},numeric:{evolution:{world:{people:{s1:{kind:'student'},a1:{kind:'other'}},registry:{profiles:{s1:{displayName:'陳同學',appearance:{variant:11}},a1:{displayName:'林主任'}}}}}}};
 const page={scene:'school:counselling-corner',presentation:'dialogue',text:'請說',speaker:'s1',cast:[{actorId:'s1',position:'left',expression:'happy'},{actorId:'a1',position:'right',expression:'angry'}]};
 const projected=projectStoryScene(w,{page}),html=renderStoryScene(projected);
 assert.equal(projected.cast.length,2);assert.equal(projected.speaker,'陳同學');assert.equal(projected.cast[0].tone,5);
 assert.match(html,/story-actor--student/);assert.match(html,/story-actor--adult/);
 assert.match(html,/story-actor--speaking/);assert.match(html,/data-expression="happy"/);assert.match(html,/data-expression="angry"/);
 assert.match(renderStoryView({page,pageIndex:0,pageCount:1,canFinish:true,sceneView:projected}),/陳同學/);
});
test('13-D: phone has no remote portrait, narrator has none, teacher has none',()=>{
 const w={identity:{playerId:'teacher'},numeric:{evolution:{world:{people:{s1:{kind:'student'}},registry:{profiles:{s1:{displayName:'王同學'}}}}}}};
 const page={scene:'school:counselling-corner',text:'內容',speaker:'teacher',cast:[{actorId:'s1',position:'center',expression:'calm'}]};
 assert.equal(projectStoryScene(w,{page:{...page,presentation:'dialogue'}}).speaker,'老師');
 const phone=projectStoryScene(w,{page:{...page,presentation:'phone',speaker:'s1'}});
 assert.equal(phone.cast.length,0);assert.doesNotMatch(renderStoryScene(phone),/story-actor--student/);
 const narrator=projectStoryScene(w,{page:{...page,presentation:'narration',speaker:null,cast:[]}});
 assert.equal(narrator.speaker,'旁白');assert.equal(narrator.cast.length,0);
});
test('13-D: bound cast only; names and scene labels are escaped',()=>{
 const w={identity:{playerId:'teacher'},numeric:{evolution:{world:{people:{s1:{kind:'student'},secret:{kind:'student'}},registry:{profiles:{s1:{displayName:'<script>不安全</script>'},secret:{displayName:'秘密角色'}}}}}}};
 const scene=projectStoryScene(w,{page:{scene:'unknown',presentation:'dialogue',text:'內容',speaker:'s1',cast:[{actorId:'s1',position:'left',expression:'surprised'}]}});
 const html=renderStoryScene(scene);
 assert.match(html,/&lt;script&gt;/);assert.doesNotMatch(html,/<script>|秘密角色/);
 assert.equal(scene.label,'目前場景');
 assert.throws(()=>renderStoryScene({...scene,cast:[...scene.cast,...scene.cast,...scene.cast]}),TypeError);
});
test('13-D: re-projected previous page restores expression and position',()=>{
 const w={identity:{playerId:'teacher'},numeric:{evolution:{world:{people:{s1:{kind:'student'}},registry:{profiles:{s1:{displayName:'吳同學'}}}}}}};
 const page={scene:'school:counselling-corner',presentation:'dialogue',text:'內容',speaker:'s1'};
 const a=renderStoryScene(projectStoryScene(w,{page:{...page,cast:[{actorId:'s1',position:'left',expression:'sad'}]}}));
 const b=renderStoryScene(projectStoryScene(w,{page:{...page,cast:[{actorId:'s1',position:'right',expression:'happy'}]}}));
 assert.match(a,/story-actor--left/);assert.match(a,/data-expression="sad"/);
 assert.match(b,/story-actor--right/);assert.match(b,/data-expression="happy"/);
});

test('13-E: phone scene has a caller panel but never invents duration or buttons',()=>{
 const html=renderStoryView(read({page:{text:'請問老師在嗎？',speaker:'caller',presentation:'phone'},pageIndex:0,sceneView:{speaker:'家長',cast:[],label:'校園談話角落'}}));
 assert.match(html,/aria-label="電話通話"/);
 assert.match(html,/家長/);
 assert.doesNotMatch(html,/story-scene|掛斷|00:00|通話秒數/);
});
test('13-E: chat bubbles show source speakers and only supplied read history',()=>{
 const html=renderStoryView(read({page:{text:'第二句',speaker:'student',presentation:'chat'},chatMessages:[{speaker:'家長',text:'第一句',own:false},{speaker:'老師',text:'第二句',own:true}]}));
 assert.match(html,/aria-label="聊天紀錄"/);
 assert.match(html,/story-chat-line--own/);
 assert.match(html,/第一句/);
 assert.match(html,/第二句/);
 assert.doesNotMatch(html,/story-scene/);
 const attack=renderSpecialStoryBody('chat','內容','老師',[{speaker:'<img>',text:'<script>惡意</script>',own:false}]);
 assert.doesNotMatch(attack,/<img>|<script>/);
 assert.match(attack,/&lt;script&gt;/);
});
test('13-E: notice, email and news use distinct escaped document displays',()=>{
 for(const type of ['notice','email','news']){
  const html=renderStoryView(read({page:{text:'公告<重要>內容',speaker:null,presentation:type}}));
  assert.match(html,new RegExp('data-story-format="'+type+'"'));
  assert.match(html,/story-document/);
  assert.match(html,/公告&lt;重要&gt;內容/);
  assert.doesNotMatch(html,/story-scene/);
 }
 assert.throws(()=>renderSpecialStoryBody('chat','x','老師',[{speaker:null,text:'x'}]),TypeError);
});

test('13-F: long content preserves safe text and controls without prematurely choosing',()=>{
 const many='很長的對話。'.repeat(120);
 const eight=Array.from({length:8},(_,i)=>({id:'option-'+i,text:'回應'+i+'：'+many}));
 const html=renderStoryView(read({page:{text:many,speaker:null,presentation:'narration'},pageIndex:2,canNext:false,choices:eight}));
 assert.equal((html.match(/data-story-action="select"/g)||[]).length,8);
 assert.doesNotMatch(html,/data-story-action="confirm"|data-story-action="finish"/);
 assert.match(html,/很長的對話/);
});
test('13-F: scrolling chat or documents does not introduce extra story operations',()=>{
 const h=renderStoryView(read({page:{text:'已讀',speaker:'s',presentation:'chat'},chatMessages:Array.from({length:25},(_,i)=>({speaker:'家長',text:'訊息'+i,own:false}))}));
 assert.equal((h.match(/data-story-action="next"/g)||[]).length,1);
 assert.equal((h.match(/data-story-advance="next"/g)||[]).length,1);
 assert.match(h,/訊息24/);
 const doc=renderStoryView(read({page:{text:'通知'.repeat(300),speaker:null,presentation:'notice'}}));
 assert.equal((doc.match(/data-story-action="next"/g)||[]).length,1);
 assert.match(doc,/story-document/);
});
