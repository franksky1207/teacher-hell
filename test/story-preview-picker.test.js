import test from 'node:test';
import assert from 'node:assert/strict';
import {pickAvgStories,renderAvgStoryPicker,storyPickerGroup} from '../web/story-preview-picker.js';

const make=(prefix,n,extra={})=>Array.from({length:n},(_,i)=>({
 storyId:prefix+'-'+String(i+1).padStart(prefix==='G'?4:3,'0'),title:prefix+' 故事 '+(i+1),...extra
}));
test('AVG story picker: T is grouped by term and official topic',()=>{
 const stories=[...make('T1',60,{type:'T'}),...make('T2',10,{type:'T'})]
 .map(s=>({...s,topicId:s.storyId.startsWith('T2')?'T2-1':Number(s.storyId.slice(3))<=30?'T1-1':'T1-2'}));
 assert.equal(pickAvgStories(stories,{kind:'T',term:'T1'}).length,60);
 assert.equal(pickAvgStories(stories,{kind:'T',term:'T1',topic:'T1-1'}).length,30);
 assert.equal(pickAvgStories(stories,{kind:'T',topic:'T1-2'}).length,30);
 assert.match(renderAvgStoryPicker(stories,{kind:'T',term:'T1'}),/T1-2/);
});
test('AVG story picker: all 1752 G are in 36 groups with a final pair',()=>{
 const stories=make('G',1752,{type:'G'});
 assert.equal(pickAvgStories(stories,{kind:'G',group:'1'}).length,50);
 assert.equal(pickAvgStories(stories,{kind:'G',group:'35'}).length,50);
 assert.deepEqual(pickAvgStories(stories,{kind:'G',group:'36'}).map(s=>s.storyId),['G-1751','G-1752']);
 assert.equal((renderAvgStoryPicker(stories,{kind:'G',group:'36'}).match(/data-action="avg-select-story:/g)??[]).length,2);
 assert.equal((renderAvgStoryPicker(stories,{kind:'G'}).match(/data-action="avg-select-story:/g)??[]).length,50);
});
test('AVG story picker: P1/P2 fifty per group, P4 events independently fifty per group',()=>{
 const p1=make('P1',122,{type:'P'});
 const p2=make('P2',51,{type:'P'});
 const p4=make('P4',125,{type:'P'}).map((s,i)=>({...s,eventId:i<75?'家長日':'段考'}));
 const stories=[...p1,...p2,...p4];
 assert.equal(pickAvgStories(stories,{kind:'P',pClass:'P1',group:'3'}).length,22);
 assert.equal(pickAvgStories(stories,{kind:'P',pClass:'P2',group:'2'}).length,1);
 assert.equal(pickAvgStories(stories,{kind:'P',pClass:'P4',event:'家長日',group:'1'}).length,50);
 assert.equal(pickAvgStories(stories,{kind:'P',pClass:'P4',event:'家長日',group:'2'}).length,25);
 assert.equal(pickAvgStories(stories,{kind:'P',pClass:'P4',event:'段考',group:'1'}).length,50);
 assert.equal(storyPickerGroup(p4[75],stories),1);
 assert.match(renderAvgStoryPicker(stories,{kind:'P',pClass:'P4',event:'段考'}),/段考/);
});
test('AVG story picker: search by ID or title without loading full story data',()=>{
 const stories=[{storyId:'T1-006',type:'T',topicId:'T1-1',title:'冷氣再冷一點'},
 {storyId:'T1-007',type:'T',topicId:'T1-1',title:'舊綽號'}];
 assert.deepEqual(pickAvgStories(stories,{kind:'T',query:'冷氣'}).map(s=>s.storyId),['T1-006']);
 assert.deepEqual(pickAvgStories(stories,{kind:'T',query:'007'}).map(s=>s.storyId),['T1-007']);
});

import {adjacentAvgResultId} from '../web/story-performance-preview.js';
test('AVG result previous/next cycles seamlessly through R1–R8',()=>{
 const preview={detail:{results:Array.from({length:8},(_,i)=>({id:'R'+(i+1)}))}};
 assert.equal(adjacentAvgResultId(preview,'R1',-1),'R8');
 assert.equal(adjacentAvgResultId(preview,'R1',1),'R2');
 assert.equal(adjacentAvgResultId(preview,'R5',1),'R6');
 assert.equal(adjacentAvgResultId(preview,'R8',1),'R1');
 assert.equal(adjacentAvgResultId(preview,'R8',-1),'R7');
 assert.equal(adjacentAvgResultId(preview,'R1',0),'R1');
 assert.equal(adjacentAvgResultId(preview,'unknown',1),'unknown');
});

// The story preview is a single stage; cast and story edits must remain in the modal
// until the explicit confirmation action is clicked.
test('AVG settings selector exposes explicit confirmation and does not autostart upon story choice',async()=>{
 const {readFile}=await import('node:fs/promises');
 const src=await readFile(new URL('../web/game.js',import.meta.url),'utf8');
 assert.match(src,/async function chooseAvgDraftStory\(id\)/);
 assert.match(src,/if\(action\.startsWith\('avg-select-story:'\)\)\{await chooseAvgDraftStory/);
 assert.match(src,/if\(action==='avg-start'\)\{confirmAvgDraft\(\)/);
 assert.match(src,/draft\.preview=await loadStoryPreview\(avgPreview\.base,summary\)/);
 assert.match(src,/if\(same\)\{\s*avgPreview\.castSelection=/);
 assert.doesNotMatch(src,/async function startAvgPreview\(\)/);
});
