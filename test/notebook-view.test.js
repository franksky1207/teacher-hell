import test from 'node:test';
import assert from 'node:assert/strict';
import {NOTEBOOK_TABS,renderNotebookView} from '../web/notebook-view.js';
const render=(tab='people',extra={})=>renderNotebookView({date:'2026-11-05',grade:2,tab,...extra});
test('14-A: three approved notebook sections with one selected tab',()=>{
 const html=render();
 assert.equal(NOTEBOOK_TABS.length,3);
 assert.equal(new Set(NOTEBOOK_TABS.map(t=>t.id)).size,6);
 assert.equal((html.match(/role="tab"/g)||[]).length,3);
 assert.equal((html.match(/aria-selected="true"/g)||[]).length,1);
 assert.match(html,/notebook-tab-people/);
});
test('14-A: navigation keeps the same public context without inventing data',()=>{
 for(const tab of NOTEBOOK_TABS){
  const html=render(tab.id);
  assert.match(html,new RegExp('aria-labelledby="notebook-tab-'+tab.id+'"'));
  if(tab.id==='people'){assert.match(html,/人物/);}
  else {assert.match(html,/正在查閱正式保存紀錄/);assert.doesNotMatch(html,/NPC|成功率|隱藏數值|測試事件/);}
  assert.doesNotMatch(html,/data-story-action|data-story-advance/);
 }
});
test('14-A: readonly completion badge and date stay safe and accurate',()=>{
 const html=render('people',{readonly:true});
 assert.match(html,/人物/);
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

test('14-B: people tab renders only supplied public roster and no internal state',async()=>{
 const {renderNotebookPeople}=await import('../web/notebook-people.js');
 const data={className:'智班',people:[{id:'s1',name:'陳同學',kind:'student',relation:'導師班學生'},{id:'p1',name:'林家長',kind:'caregiver',relation:'學生家長',relatedTo:['陳同學']}],facts:[],claims:[]};
 const html=renderNotebookView({date:'2026-11-05',grade:2,tab:'people',people:data});
 assert.match(html,/陳同學/);assert.match(html,/林家長/);
 assert.match(html,/學生 1 人・家長 1 人/);
 assert.doesNotMatch(html,/隱藏|data-story-action|data-action="advance-time"/);
 const p=renderNotebookPeople(data,'p1');
 assert.match(p,/相關學生：陳同學/);
 assert.throws(()=>renderNotebookPeople(data,'not-a-person'),RangeError);
});
test('14-B: only disclosed facts tied to subject and claims tied to source display',async()=>{
 const {renderNotebookPeople}=await import('../web/notebook-people.js');
 const data={className:'智班',people:[{id:'a',name:'甲同學',kind:'student',relation:'導師班學生'},{id:'b',name:'乙同學',kind:'student',relation:'導師班學生'}],
 facts:[{description:'已揭露甲事實',subjectIds:['a']},{description:'不可顯示乙事實',subjectIds:['b']}],
 claims:[{statement:'甲的已知說法',sourceId:'a',belief:'uncertain'},{statement:'乙的私人說法',sourceId:'b',belief:'believed'}]};
 const html=renderNotebookPeople(data,'a');
 assert.match(html,/已揭露甲事實|甲的已知說法/);
 assert.doesNotMatch(html,/不可顯示乙事實|乙的私人說法/);
 assert.match(html,/尚待確認/);
});
test('14-B: escaping names, malicious identifiers and disclosed strings',async()=>{
 const {renderNotebookPeople}=await import('../web/notebook-people.js');
 const data={className:'<校名>',people:[{id:'a" onclick="bad',name:'<script>危險</script>',kind:'student',relation:'學生'}],
 facts:[{description:'<img src=x>',subjectIds:['a" onclick="bad']}],claims:[]};
 const html=renderNotebookPeople(data,'a" onclick="bad');
 assert.doesNotMatch(html,/<script>|<img|onclick="bad"/);
 assert.match(html,/&lt;script&gt;/);assert.match(html,/&lt;img/);
});
