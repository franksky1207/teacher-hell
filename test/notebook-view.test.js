import test from 'node:test';
import assert from 'node:assert/strict';
import {NOTEBOOK_TABS,renderNotebookView} from '../web/notebook-view.js';
const render=(tab='overview',extra={})=>renderNotebookView({date:'2026-11-05',grade:2,tab,...extra});
test('14-A: six unique notebook categories with one selected tab',()=>{
 const html=render();
 assert.equal(NOTEBOOK_TABS.length,6);
 assert.equal(new Set(NOTEBOOK_TABS.map(t=>t.id)).size,6);
 assert.equal((html.match(/role="tab"/g)||[]).length,6);
 assert.equal((html.match(/aria-selected="true"/g)||[]).length,1);
 assert.match(html,/notebook-tab-overview/);
});
test('14-A: navigation keeps the same public context without inventing data',()=>{
 for(const tab of NOTEBOOK_TABS){
  const html=render(tab.id);
  assert.match(html,new RegExp('aria-labelledby="notebook-tab-'+tab.id+'"'));
  if(tab.id==='overview'){assert.match(html,/2026-11-05/);assert.match(html,/高二/);}
  else {assert.match(html,/尚未接入/);assert.doesNotMatch(html,/NPC|成功率|隱藏數值|測試事件/);}
  assert.doesNotMatch(html,/data-story-action|data-story-advance/);
 }
});
test('14-A: readonly completion badge and date stay safe and accurate',()=>{
 const html=render('overview',{readonly:true});
 assert.match(html,/已完成生涯・唯讀/);
 assert.match(render('overview',{readonly:false}),/目前生涯・唯讀查閱/);
 assert.throws(()=>renderNotebookView({date:'<script>',grade:1}),TypeError);
 assert.throws(()=>renderNotebookView({date:'2026-11-05',grade:4}),TypeError);
 assert.throws(()=>render('missing'),RangeError);
});
test('14-A: notebook shell does not depend on internal world values',()=>{
 const html=render();
 assert.doesNotMatch(html,/data-operation|data-story-action|data-action="advance-time"|secret/);
 assert.equal((html.match(/id="notebook-content"/g)||[]).length,1);
});
