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
  const distinct=new Set(),dates=new Map(),emotionalSlots=new Set();
  for(let n=61;n<=72;n++){
    const id=storyId(n),md=read(folder+id+'.md');
    const validation=validateStoryDraft(md,{stage:'full',...requirements});
    assert.deepEqual(validation.errors,[],id+' full validator errors'); // Includes exact slot eligibility and original seed codes
    assert.equal(validation.details.resultsChecked,8,id);
    assert.ok(md.indexOf('```avg')<md.indexOf('### 開場'),id+' raw AVG leaks into opening');
    assert.equal((md.match(/^```avg$/gm)||[]).length,1,id);
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
  assert.equal(emotionalSlots.size,4,'emotional option must not always be in the same slot');
});


test('T1-061～072: 384 causal review cells match 12 live choice-result matrices',()=>{
  const evidence=JSON.parse(read('content/events-v1/T/T1-高一上/T1-3-高一上家長日/驗收紀錄/活動前-061-072-逐格因果核對.json'));
  assert.equal(evidence.cellCount,384);
  assert.equal(Object.keys(evidence.reviews).length,12);
  for(let n=61;n<=72;n++){
    const id=storyId(n),md=read(folder+id+'.md'),entry=evidence.reviews[id];
    assert.ok(entry,id+' missing review');
    const matrixRows=md.split(/\r?\n/).filter(line=>/^\| [ABCD] \| [0124] \|/.test(line));
    assert.equal(matrixRows.length,4,id+' matrix row count');
    const matrix=Object.fromEntries(matrixRows.map(line=>{
      const fields=line.split('|').map(v=>v.trim()).filter(Boolean);
      assert.equal(fields.length,9,id+' matrix cell count');
      return [fields[0],fields.slice(1).map(Number)];
    }));
    for(let k=0;k<8;k++){
      assert.ok(!'ABCD'.split('').every(c=>matrix[c][k]===4),id+' R'+(k+1)+' indiscriminate all-four weights');
      assert.ok('ABCD'.split('').filter(c=>matrix[c][k]===0).length<=1,id+' R'+(k+1)+' too many zero weights');
    }
    assert.equal(entry.causal32Evidence.length,32,id+' review count');
    const seen=new Set();
    for(const cell of entry.causal32Evidence){
      const key=cell.choice+'-'+cell.result;
      assert.ok(/^[ABCD]$/.test(cell.choice)&&/^R[1-8]$/.test(cell.result),id+' invalid review key '+key);
      assert.ok(!seen.has(key),id+' duplicated review '+key);
      seen.add(key);
      assert.equal(cell.weight,matrix[cell.choice][Number(cell.result.slice(1))-1],id+' stale review '+key);
      assert.ok(typeof cell.reason==='string'&&cell.reason.length>=50,id+' ungrounded review '+key);
      assert.ok(typeof cell.actionPreserved==='string'&&cell.actionPreserved.length>=5,id+' missing action '+key);
    }
  }
});


test('T1-001～072: all 576 result narratives retain the reviewed length floor and valid AVG performance',()=>{
  let checked=0;
  for(let n=1;n<=72;n++){
    const id=storyId(n);
    const folder=n<=30
      ? 'content/events-v1/T/T1-高一上/T1-1-首次進班與建班/單一池/'
      : n<=60
      ? 'content/events-v1/T/T1-高一上/T1-2-高中新生適應/單一池/'
      : 'content/events-v1/T/T1-高一上/T1-3-高一上家長日/活動前/';
    const md=read(folder+id+'.md');
    const cues=JSON.parse(md.match(/\x60{3}avg\r?\n([\s\S]*?)\r?\n\x60{3}/)?.[1]??'null');
    assert.ok(cues?.results,id+' missing AVG cues');
    const opening=md.match(/### 開場[^\n]*\n([\s\S]*?)(?=### 四個最終教師選項)/)?.[1]?.trim();
    assert.ok(opening,id+' missing opening text');
    const results=[...md.matchAll(/^### (R[1-8])｜([^\r\n]+)\r?\n\s*- \*\*玩家可見結果\*\*：([^\r\n]+)/gm)]
      .map(m=>({id:m[1],title:m[2],text:m[3]}));
    assert.equal(results.length,8,id+' must preserve eight R outcomes');
    const compiled=compileStoryPreview({storyId:id,sourceMarkdown:md,opening,results});
    assert.equal(compiled.resultPages.length,8,id+' compiled results');
    for(const r of results){
      const pages=cues.results[r.id]?.pages;
      assert.ok(Array.isArray(pages)&&pages.length>=2,id+' '+r.id+' needs independent AVG pages');
      const words=[...r.text.replace(/\s/g,'')].length;
      assert.ok(words>=90,id+' '+r.id+' dropped below the verified 90-character narrative floor: '+words);
      assert.ok(pages.every(page=>typeof page.text==='string'&&page.text.trim()),id+' '+r.id+' empty cue');
      if(n>=11){
        assert.equal(pages.map(page=>page.text).join('').replace(/\s/g,''),
          r.text.replace(/\s/g,''),id+' '+r.id+' source/AVG text drift');
      }
      checked++;
    }
  }
  assert.equal(checked,576);
});
