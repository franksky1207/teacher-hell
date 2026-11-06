import test from 'node:test';
import assert from 'node:assert/strict';
import {renderNotebookView} from '../web/notebook-view.js';
test('14-D: notebook academic tab uses formal projection and preserves six tabs',()=>{
 const html=renderNotebookView({date:'2026-11-06',grade:1,tab:'academics',academics:{students:[],terms:[],selectedId:null}});
 assert.match(html,/學業成績與學分/);
 assert.equal((html.match(/role="tab"/g)||[]).length,3);
 assert.doesNotMatch(html,/此分類內容尚未接入/);
});
