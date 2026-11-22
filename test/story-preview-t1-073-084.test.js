import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {validateStoryDraft,seedCodesFromMarkdown,topicIdsFromMarkdown} from '../scripts/story-draft-validator.js';
import {readTopicWindows} from '../scripts/story-windows.js';
import {compileStoryPreview} from '../src/runtime/story-preview-content.js';
import {storyVisibleLength,storyAvgVisibleLength} from '../scripts/story-visible-length.js';

const read=path=>readFileSync(new URL('../'+path,import.meta.url),'utf8');
const folder='content/events-v1/T/T1-高一上/T1-3-高一上家長日/活動後/';
const topicText=read('docs/T1-T6-特定故事20主題與觸發日期.md');
const requirements={
  seeds:seedCodesFromMarkdown(read('docs/事件四數值三層平衡種子2400組.md')),
  topics:topicIdsFromMarkdown(topicText),
  windows:readTopicWindows(topicText)
};
const storyId=n=>'T1-'+String(n).padStart(3,'0');

test('T1-073～084: twelve V3 drafts, 96 distinct results, dialogue-first AVG, legal seeds and windows',()=>{
  let totalResults=0,openingPages=0,resultPageTotal=0;
  const distinct=new Set(),dates=new Map(),emotionalSlots=new Set(),v3Signatures=new Set();
  for(let n=73;n<=84;n++){
    const id=storyId(n),md=read(folder+id+'.md');
    const validation=validateStoryDraft(md,{stage:'full',...requirements});
    assert.deepEqual(validation.errors,[],id+' full validator errors');
    assert.equal(validation.details.resultsChecked,8,id);
    assert.ok(md.indexOf('```avg')<md.indexOf('### 開場'),id+' raw AVG leaks into opening');
    assert.equal((md.match(/^```avg$/gm)||[]).length,1,id);
    const byState=validation.details.stateDistribution.byState;
    v3Signatures.add(['精神','熱忱','情緒','掌控'].map(k=>byState[k].group).join(','));
    const opening=md.match(/### 開場[^\n]*\n([\s\S]*?)(?=### 四個最終教師選項)/)?.[1]?.trim();
    const results=[...md.matchAll(/^### (R[1-8])｜([^\r\n]+)\r?\n\s*- \*\*玩家可見結果\*\*：([^\r\n]+)/gm)].map(m=>({id:m[1],title:m[2],text:m[3]}));
    assert.equal(results.length,8,id);
    const finalOptions=[...md.matchAll(/^\| ([ABCD]) \| [^\n|]+ \| (true|false) \|/gm)];
    assert.equal(finalOptions.length,4,id+' missing choices');
    const emotional=finalOptions.filter(x=>x[2]==='true');
    assert.equal(emotional.length,1,id+' emotional choice count');
    emotionalSlots.add(emotional[0][1]);
    const preview=compileStoryPreview({storyId:id,sourceMarkdown:md,opening,results});
    assert.equal(preview.pages.length,3,id);
    assert.equal(preview.resultPages.length,8,id);
    for(let i=0;i<8;i++){
      const pages=preview.resultPages[i];
      assert.ok(pages.length>=2,id+' R'+(i+1)+' should have multiple pages');
      assert.ok(pages.some(p=>p.presentation!=='narration'),id+' R'+(i+1)+' should include character dialogue/chat/phone');
      const visibleWords=storyVisibleLength(results[i].text);
      assert.ok(visibleWords>=90,id+' R'+(i+1)+' prose too short: '+visibleWords);
      assert.ok(storyAvgVisibleLength(pages)>0,id+' R'+(i+1)+' AVG visible length must be > 0');
      assert.ok(!pages.some(p=>/```avg|"opening"\s*:|"results"\s*:/.test(p.text)),id+' raw AVG exposed');
      for(const page of pages){
        assert.ok(page.cast.length<=2,id+' casts >2');
        if(page.presentation==='narration'){
          assert.equal(page.speaker,null,id+' narration must have null speaker');
          assert.ok(!page.cast.some(c=>c.role.startsWith('guardian_')),id+' R'+(i+1)+' remote guardian sprite leaked into narration');
        }
        if(page.speaker&&page.speaker!=='teacher')assert.ok(page.cast.some(c=>c.role===page.speaker),id+' R'+(i+1)+' speaker missing from cast');
      }
      distinct.add(id+':'+results[i].title);
      resultPageTotal+=pages.length;
    }
    const day=md.match(/\| `quota_date`｜配額歸屬日 \| (\d{4}-\d{2}-\d{2}) \|/)?.[1];
    assert.ok(day,id+' quota date missing');
    dates.set(day,(dates.get(day)||0)+1);
    openingPages+=preview.pages.length;totalResults+=results.length;
  }
  assert.deepEqual(Object.fromEntries(dates),{'2026-09-07':6,'2026-09-08':6});
  assert.equal(totalResults,96);
  assert.equal(openingPages,36);
  assert.ok(resultPageTotal>=288);
  assert.equal(distinct.size,96);
  assert.equal(emotionalSlots.size,4,'emotional option must not always be in the same slot');
  assert.ok(v3Signatures.size>=8,'V3 four-state group combinations should not be templated identically');
});

test('T1-073～084: 384 causal review cells match 12 live choice-result matrices without all-4 rows',()=>{
  const evidence=JSON.parse(read('content/events-v1/T/T1-高一上/T1-3-高一上家長日/驗收紀錄/活動後-073-084-逐格因果核對.json'));
  assert.equal(evidence.cellCount,384);
  assert.equal(Object.keys(evidence.reviews).length,12);
  for(let n=73;n<=84;n++){
    const id=storyId(n),md=read(folder+id+'.md'),entry=evidence.reviews[id];
    assert.ok(entry,id+' missing review');
    const matrixRows=md.split(/\r?\n/).filter(line=>/^\| [ABCD] \| [0124] \|/.test(line));
    assert.equal(matrixRows.length,4,id+' matrix row count');
    const matrix=Object.fromEntries(matrixRows.map(line=>{
      const fields=line.split('|').map(v=>v.trim()).filter(Boolean);
      assert.equal(fields.length,9,id+' matrix cell count');
      const weights=fields.slice(1).map(Number);
      assert.ok(weights.some(w=>w!==4),id+' '+fields[0]+' cannot be all 4s');
      return [fields[0],weights];
    }));
    assert.equal(entry.causal32Evidence.length,32,id+' causal32Evidence length');
    const seen=new Set();
    for(const cell of entry.causal32Evidence){
      const key=cell.choice+'->'+cell.result;
      assert.ok(!seen.has(key),id+' duplicate '+key);
      seen.add(key);
      assert.equal(cell.weight,matrix[cell.choice][Number(cell.result.slice(1))-1],id+' '+key+' weight mismatch');
      assert.ok(cell.compatibility&&cell.causalDirection&&cell.actionPreserved&&cell.reason.length>=16,id+' '+key+' incomplete');
    }
  }
});


test('story visible length never counts P page markers or speaker labels',()=>{
  const marked='- **P01｜旁白**：週一家長來電。\n- **P02｜{{student_a.name}}**：老師，我有問題！';
  const unmarked='週一家長來電。老師，我有問題！';
  assert.equal(storyVisibleLength(marked),storyVisibleLength(unmarked));
  assert.equal(storyVisibleLength('P03｜旁白：請看這份摘要。'),storyVisibleLength('請看這份摘要。'));
  assert.equal(storyVisibleLength('這一句真的提到 P01｜旁白，不是頁面標頭。'),storyVisibleLength('這一句真的提到 P01｜旁白，不是頁面標頭。'));
});


test('T1-073–084: 384 distinct evidence mechanisms and no known cross-choice AVG presuppositions',()=>{
  const evidence=JSON.parse(read('content/events-v1/T/T1-高一上/T1-3-高一上家長日/驗收紀錄/活動後-073-084-逐格因果核對.json'));
  const mechanisms=new Set();
  let count=0;
  for(let n=73;n<=84;n++){
    const id=storyId(n),md=read(folder+id+'.md');
    const choices=Object.fromEntries([...md.matchAll(/^\\| ([ABCD]) \\| [^\\n|]+ \\| (?:true|false) \\| ([^\\n|]+) \\|/gm)].map(m=>[m[1],m[2]]));
    const entry=evidence.reviews[id];
    assert.ok(entry,id+' causal evidence missing');
    for(const cell of entry.causal32Evidence){
      count++;
      assert.equal(cell.actionPreserved,choices[cell.choice],id+' '+cell.choice+cell.result+' source action mismatch');
      assert.ok(cell.reason.includes(cell.actionPreserved),id+' '+cell.choice+cell.result+' ignores teacher action');
      assert.ok(!/事件仍可透過當事人後續自主反應自然發展至此結果|具有一定抑制或緩衝作用|在因果上具顯著促進效果/.test(cell.reason),id+' generic justification');
      const mechanism=cell.reason.split('；').slice(1).join('；').split('。權重')[0];
      assert.ok(mechanism.length>=12,id+' '+cell.choice+cell.result+' insufficient causal mechanism');
      assert.ok(!mechanisms.has(mechanism),id+' '+cell.choice+cell.result+' duplicated mechanism');
      mechanisms.add(mechanism);
    }
    const avg=JSON.parse(md.match(/```avg\\n([\\s\\S]*?)\\n```/)[1]);
    const allPages=Object.values(avg.results).flatMap(r=>r.pages).map(p=>p.text).join('\\n');
    assert.doesNotMatch(allPages,/我的致謝只針對熱心|你剛剛稱讚表很完整|我剛才不該在班上泛提/,id+' option-specific fact leaks into AVG');
  }
  assert.equal(count,384);
  assert.equal(mechanisms.size,384);
});
