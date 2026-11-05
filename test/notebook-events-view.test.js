import test from 'node:test';
import assert from 'node:assert/strict';
import {renderNotebookView} from '../web/notebook-view.js';
test('14-C: event tab is populated from supplied safe projection',()=>{
 const html=renderNotebookView({date:'2026-11-06',grade:2,tab:'events',events:{entries:[{kind:'fact',learnedDate:'2026-11-06',occurredDate:null,text:'已知事實'}]}});
 assert.match(html,/已知事實/);assert.doesNotMatch(html,/此分類內容尚未接入/);
 assert.match(html,/aria-labelledby="notebook-tab-events"/);
});
