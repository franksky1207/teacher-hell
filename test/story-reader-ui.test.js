import test from 'node:test';
import assert from 'node:assert/strict';
import {selectOptions,filterStories,neighboringIds,sanitizeReaderPreferences,safeDetailPath,validateReaderIndex,validateReaderDetail,topicDisplayName,poolDisplayName,readerTechnicalTables,READER_STATES} from '../story-reader/reader-core.js';

const stories=[
 {storyId:'T1-002',draftRef:'T-DRAFT-0002',title:'我在哪一班',type:'T',topicId:'T1-1',poolId:'T1-1:single',summary:{事件起因:'首次點名'},detail:'stories/T1-002.json'},
 {storyId:'T1-003',draftRef:'T-DRAFT-0003',title:'我的名字',type:'T',topicId:'T1-1',poolId:'T1-1:single',summary:{核心衝突:'同學稱呼'},detail:'stories/T1-003.json'},
 {storyId:'T2-001',draftRef:'T-DRAFT-0040',title:'班呼練習',type:'T',topicId:'T2-1',poolId:'T2-1:before',summary:{導師困境:'如何參與'},detail:'stories/T2-001.json'},
 {storyId:'G-0001',draftRef:'G-DRAFT-0001',title:'生活瑣事',type:'G',topicId:null,poolId:null,summary:{事件起因:'校園生活'},detail:'stories/G-0001.json'}
];
test('search title, ID, draft reference, summary and combined semester/topic/pool filters',()=>{
 assert.deepEqual(filterStories(stories,{query:'我在哪'}).map(x=>x.storyId),['T1-002']);
 assert.deepEqual(filterStories(stories,{query:'t-draft-0003'}).map(x=>x.storyId),['T1-003']);
 assert.deepEqual(filterStories(stories,{query:'首次點名'}).map(x=>x.storyId),['T1-002']);
 assert.deepEqual(filterStories(stories,{semester:'T1',topic:'T1-1',pool:'T1-1:single'}).map(x=>x.storyId),['T1-002','T1-003']);
 assert.deepEqual(filterStories(stories,{semester:'G'}).map(x=>x.storyId),['G-0001']);
 assert.equal(filterStories(stories,{semester:'T2',query:'不存在'}).length,0);
});
test('previous/next respects filtered reading order',()=>{
 assert.deepEqual(neighboringIds(stories,'T1-002'),{previous:null,next:'T1-003'});
 assert.deepEqual(neighboringIds(stories.slice(0,2),'T1-003'),{previous:'T1-002',next:null});
});
test('theme and font size use safe defaults and range',()=>{
 assert.deepEqual(sanitizeReaderPreferences({theme:'dark',size:100}),{theme:'dark',size:25});
 assert.deepEqual(sanitizeReaderPreferences({theme:'bad',size:'x'}),{theme:'paper',size:18});
});
test('rejects path traversal and mismatched index detail paths',()=>{
 assert.equal(safeDetailPath('stories/T1-002.json'),'stories/T1-002.json');
 assert.throws(()=>safeDetailPath('../secrets.json'),/非法/);
 assert.throws(()=>validateReaderIndex({schemaVersion:1,count:1,stories:[{...stories[0],detail:'../oops'}]}),/路徑/);
 assert.deepEqual(validateReaderIndex({schemaVersion:1,count:4,stories}),stories);
 assert.throws(()=>validateReaderIndex({schemaVersion:1,count:2,stories:[stories[0],stories[0]]}),/重複/);
});
test('detail must match index and have four choices and eight results',()=>{
 const valid={storyId:'T1-002',options:Array(4).fill({}),results:Array(8).fill({}),matrix:{A:[],B:[],C:[],D:[]}};
 assert.equal(validateReaderDetail(valid,stories[0]),valid);
 assert.throws(()=>validateReaderDetail({...valid,storyId:'T1-003'},stories[0]),/不完整/);
});

test('dropdown values use the selected field and parent filter',()=>{
 assert.deepEqual(selectOptions(stories,'topicId'),['T1-1','T2-1']);
 assert.deepEqual(selectOptions(stories,'poolId',s=>s.topicId==='T1-1'),['T1-1:single']);
 assert.deepEqual(selectOptions(stories,'topicId',s=>s.type==='G'),[]);
});

test('topic and pool dropdown display official Chinese event titles, preserving original IDs',()=>{
 assert.equal(topicDisplayName('T1-5'),'首次校慶擺攤');
 assert.equal(topicDisplayName('T4-2'),'畢業旅行行前安排');
 assert.equal(poolDisplayName('T1-5:before'),'首次校慶擺攤（活動前）');
 assert.equal(poolDisplayName('T1-5:after'),'首次校慶擺攤（活動後）');
 assert.equal(poolDisplayName('T1-1:single'),'首次進班與建班');
 assert.equal(poolDisplayName('G-0001'), 'G-0001');
});

test('technical tables split eight results into teacher states and independent NPC deltas',()=>{
 const results=[
  {id:'R1',playerStates:'1,2,-1,0',deltas:'student_a:5-1:+2; student_b:9-3:-3'},
  {id:'R2',playerStates:'-2,0,1,2',deltas:'student_a:5-1:-1'},
  {id:'R3',playerStates:'0,0,1,1',deltas:'無'}
 ];
 const parsed=readerTechnicalTables(results);
 assert.deepEqual(READER_STATES,['精神','熱忱','情緒','掌控']);
 assert.deepEqual(parsed.actors,['student_a','student_b']);
 assert.deepEqual(parsed.codes,['5-1','9-3']);
 assert.deepEqual(parsed.rows[0].stateValues,[1,2,-1,0]);
 assert.equal(parsed.rows[0].deltaMap['student_a:5-1'],2);
 assert.equal(parsed.rows[0].deltaMap['student_b:9-3'],-3);
 assert.deepEqual(parsed.rows[1].stateValues,[-2,0,1,2]);
 assert.equal(parsed.rows[1].deltaMap['student_b:9-3'],undefined);
 assert.equal(parsed.rows[2].deltaValid,true);
 assert.deepEqual(parsed.rows[2].deltaMap,{});
});
test('technical tables fail visibly for malformed values rather than inventing zeros',()=>{
 const parsed=readerTechnicalTables([{id:'R8',deltas:'student_a:5-1:+x',playerStates:'1,2,3'}]);
 assert.equal(parsed.rows[0].deltaValid,false);
 assert.equal(parsed.rows[0].stateValues,null);
});
