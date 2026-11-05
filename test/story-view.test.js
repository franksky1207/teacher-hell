import test from 'node:test';
import assert from 'node:assert/strict';
import {renderStoryView} from '../web/story-view.js';

const read=(changes={})=>({page:{text:'老師聽見學生說話。',speaker:null,presentation:'narration',cast:[]},pageIndex:0,pageCount:3,canPrevious:false,canNext:true,choices:[],confirmation:null,canFinish:false,waiting:false,canResume:false,ended:false,...changes});
test('Phase 13-A: story pages show legal navigation without premature finish',()=>{
 const page=renderStoryView(read());assert.match(page,/下一頁/);assert.doesNotMatch(page,/上一頁|確認選擇|data-story-action="finish"/);
 const last=renderStoryView(read({pageIndex:2,canNext:false,canPrevious:true,canFinish:true}));assert.match(last,/上一頁/);assert.match(last,/data-story-action="finish"/);assert.doesNotMatch(last,/下一頁/);
});
test('Phase 13-A: choices and confirmation remain distinct controls',()=>{
 const choices=renderStoryView(read({pageIndex:2,canNext:false,choices:[{id:'listen',text:'先聽學生說明'},{id:'express',text:'表達疲憊'}]}));
 assert.equal((choices.match(/data-story-action="select"/g)||[]).length,2);assert.doesNotMatch(choices,/data-story-action="confirm"/);
 const confirmed=renderStoryView(read({pageIndex:2,canNext:false,confirmation:{optionId:'listen',text:'先聽學生說明'}}));
 assert.match(confirmed,/data-story-action="confirm"/);assert.match(confirmed,/data-story-action="cancel"/);assert.doesNotMatch(confirmed,/data-story-action="select"/);
});
test('Phase 13-A: untrusted text and attributes are escaped',()=>{
 const html=renderStoryView(read({page:{text:'<img src=x onerror=alert(1)>',speaker:null,presentation:'dialogue'},pageIndex:2,canNext:false,choices:[{id:'x" onclick="x',text:'<script>alert(1)</script>'}]}));
 assert.doesNotMatch(html,/<img|<script|\\sonclick=\"/);assert.match(html,/&lt;img/);assert.match(html,/&quot;/);
});
test('Phase 13-A: incomplete readStory projection is rejected',()=>{
 assert.throws(()=>renderStoryView(null));assert.throws(()=>renderStoryView(read({pageIndex:3})));
});
