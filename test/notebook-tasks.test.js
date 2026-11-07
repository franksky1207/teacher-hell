import test from 'node:test';
import assert from 'node:assert/strict';
import {storyTaskAvailability,renderNotebookTasks} from '../web/notebook-tasks.js';

test('14-F2: only the exact active story is directly navigable',()=>{
 const status={mode:'reading',dueDate:null};
 const same=storyTaskAvailability(status,{activeEventId:'event:ready',eventId:'event:ready',date:'2026-11-07'});
 assert.equal(same.availability,'ready');
 assert.equal(same.navigation,'story');
 const different=storyTaskAvailability(status,{activeEventId:'event:other',eventId:'event:ready',date:'2026-11-07'});
 assert.equal(different.navigation,null);
 assert.equal(different.availability,'blocked');
});
test('14-F2: waiting events never offer premature actions',()=>{
 const early=storyTaskAvailability({mode:'waiting',dueDate:'2026-11-09'},{activeEventId:null,eventId:'event:later',date:'2026-11-07'});
 assert.equal(early.availability,'waiting');
 assert.match(early.hint,/2026-11-09/);
 assert.equal(early.navigation,null);
 const dueButBlocked=storyTaskAvailability({mode:'waiting',dueDate:'2026-11-01'},{activeEventId:null,eventId:'event:later',date:'2026-11-07'});
 assert.equal(dueButBlocked.navigation,null);
 assert.doesNotMatch(dueButBlocked.hint,/立即處理/);
});
test('14-F2: only ready story renders jump; procedural duties stay read-only',()=>{
 const data={date:'2026-11-07',items:[
 {id:'story:e1',eventId:'e1',label:'事件待辦',context:'事件後續',due:null,overdue:false,availability:'ready',navigation:'story',hint:'可返回'},
 {id:'case:untrusted',eventId:'e1',label:'依法通報',context:'校務程序',due:'2026-11-07',overdue:true,availability:'procedural',navigation:null,hint:'依正式程序'},
 {id:'story:e2',eventId:'e2',label:'稍後接續',context:'事件後續',due:'2026-11-09',availability:'waiting',navigation:null,hint:'尚待校曆'}
 ]};
 const html=renderNotebookTasks(data);
 assert.equal((html.match(/data-action="notebook-task-story:/g)||[]).length,1);
 assert.match(html,/data-action="notebook-task-story:e1"/);
 assert.doesNotMatch(html,/notebook-task-story:e2/);
 assert.match(html,/期限已過/);
 assert.match(html,/依正式程序/);
});
test('14-F2: task identifiers and hints escape HTML',()=>{
 const html=renderNotebookTasks({items:[{id:'story:bad',eventId:'e" onclick="bad',availability:'ready',navigation:'story',label:'<img src=x>',context:'事件',hint:'<script>hi</script>',due:null}]});
 assert.match(html,/notebook-task-story:e&quot; onclick=&quot;bad/);
 assert.doesNotMatch(html,/data-action="notebook-task-story:e" onclick="bad/);
 assert.match(html,/&lt;script&gt;hi&lt;\/script&gt;/);
 assert.throws(()=>renderNotebookTasks({items:null}),TypeError);
});
