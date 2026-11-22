import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {validateStoryDraft,seedCodesFromMarkdown,topicIdsFromMarkdown} from '../scripts/story-draft-validator.js';
import {readTopicWindows} from '../scripts/story-windows.js';
import {compileStoryPreview} from '../src/runtime/story-preview-content.js';

const read=path=>readFileSync(new URL('../'+path,import.meta.url),'utf8');
const folder='content/events-v1/T/T1-高一上/T1-3-高一上家長日/活動前/';
const topicText=read('docs/T1-T6-特定故事20主題與觸發日期.md');
const requirements={
  seeds:seedCodesFromMarkdown(read('docs/事件四數值三層平衡種子2400組.md')),
  topics:topicIdsFromMarkdown(topicText),
  windows:readTopicWindows(topicText)
};
const storyId=n=>'T1-'+String(n).padStart(3,'0');

test('T1-061～072: twelve V3 drafts, 96 distinct results, legal seeds and windows',()=>{
  let totalResults=0,openingPages=0;
  const distinct=new Set(),dates=new Map();
  for(let n=61;n<=72;n++){
    const id=storyId(n),md=read(folder+id+'.md');
    const validation=validateStoryDraft(md,{stage:'full',...requirements});
    assert.deepEqual(validation.errors,[],id+' full validator errors');
    assert.equal(validation.details.resultsChecked,8,id);
    assert.ok(md.indexOf('```avg')<md.indexOf('### 開場'),id+' raw AVG leaks into opening');
    assert.equal((md.match(/^```avg$/gm)||[]).length,1,id);
    const opening=md.match(/### 開場[^\n]*\n([\s\S]*?)(?=### 四個最終教師選項)/)?.[1]?.trim();
    const results=[...md.matchAll(/^### (R[1-8])｜([^\r\n]+)\r?\n\s*- \*\*玩家可見結果\*\*：([^\r\n]+)/gm)].map(m=>({id:m[1],title:m[2],text:m[3]}));
    assert.equal(results.length,8,id);
    const preview=compileStoryPreview({storyId:id,sourceMarkdown:md,opening,results});
    assert.equal(preview.pages.length,3,id);
    assert.equal(preview.resultPages.length,8,id);
    for(let i=0;i<8;i++){
      const pages=preview.resultPages[i];
      assert.ok(pages.length>=2,id+' R'+(i+1)+' should have multiple pages');
      const original=results[i].text.replace(/\s/g,'');
      const rendered=pages.map(p=>p.text).join('').replace(/\s/g,'');
      assert.equal(rendered,original,id+' R'+(i+1)+' text and AVG mismatch');
      assert.ok([...original].length>=90,id+' R'+(i+1)+' prose warning');
      assert.ok(!pages.some(p=>/```avg|"opening"\s*:|"results"\s*:/.test(p.text)),id+' raw AVG exposed');
      for(const page of pages){
        assert.ok(page.cast.length<=2,id+' casts >2');
        if(page.speaker&&page.speaker!=='teacher')assert.ok(page.cast.some(c=>c.role===page.speaker));
      }
      distinct.add(id+':'+results[i].title);
    }
    const day=md.match(/\| `quota_date`｜配額歸屬日 \| (\d{4}-\d{2}-\d{2}) \|/)?.[1];
    assert.ok(day,id+' quota date missing');
    dates.set(day,(dates.get(day)||0)+1);
    openingPages+=preview.pages.length;totalResults+=results.length;
  }
  assert.deepEqual(Object.fromEntries(dates),{'2026-09-03':6,'2026-09-04':6});
  assert.equal(totalResults,96);
  assert.equal(openingPages,36);
  assert.equal(distinct.size,96);
});
