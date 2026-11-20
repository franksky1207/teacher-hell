import test from 'node:test';
import {readFileSync} from 'node:fs';
import assert from 'node:assert/strict';
import {STATE_GROUPS,validateStoryDraft,seedCodesFromMarkdown,topicIdsFromMarkdown} from '../scripts/story-draft-validator.js';
import {readTopicWindows} from '../scripts/story-production-ledger.js';
const windows=readTopicWindows(readFileSync(new URL('../docs/T1-T6-特定故事20主題與觸發日期.md',import.meta.url),'utf8'));
const seeds=seedCodesFromMarkdown('| S1461 | 1-1 | 2-3 | 7-4 | 9-1 |');
const topics=topicIdsFromMarkdown('| **T1-1** | 首次進班 |');
const code='§';
function draft(){
 const results=Array.from({length:8},(_,i)=>[
  '### R'+(i+1)+'｜後果'+(i+1),
  '- **玩家可見結果**：學生產生第'+(i+1)+'種不同的反應。',
  '- **客觀後果**：無',
  '- **合法底層增減**：student_a:1-1:+2',
  '- **玩家四狀態**（體力、精神、熱忱、情緒）：1,1,1,1'
 ].join('\n')).join('\n');
 return [
 '## 1｜故事基本資料與必要資格',
 '| 欄位鍵 | 填寫值 |','|---|---|',
 '| §draft_ref§｜稿件暫識別 | SAMPLE-1461 |',
 '| §story_id§｜正式故事ID | 【待驗收鎖定後由管理端配號】 |',
 '| §event_type§｜事件類型 | G |',
 '| §t_topic_id§｜T主題ID | 無 |',
 '| §tags§｜T/G共用11類多標籤 | G02、G04 |',
 '| §required_window§｜必要合法日期／活動窗口 | 無 |',
 '| §required_conditions§｜必要人物／資格／已知條件 | 本班學生 |',
 '## 2｜四欄創意摘要',
 '| 固定欄位 | 故事摘要 |','|---|---|',
 '| 事件起因 | 學生早自習無法完成任務 |',
 '| 核心衝突 | 學習責任與家庭作息衝突 |',
 '| 導師困境 | 規範與支持之間取捨 |',
 '| 故事獨特性 | 學生當場提出不同替代方案 |',
 '## 3｜四碼種子及角色槽位',
 '- **種子ID**：S1461',
 '- **本篇四碼**：1-1／2-3／7-4／9-1',
 '- **選角方向**：偏負向',
 '- **常駐數值角色槽位**：',
 '| 槽位鍵 | 人物資格／類別 | 必要在籍、關係、職權與知情限制 | 參與四碼抽選／合法結算 |',
 '|---|---|---|---|',
 '| §student_a§ | 本班學生 | 在籍當日知情 | 是，四碼合法 |',
 '- **無數值情境角色**：無',
 '- **四碼的必要因果用途**：',
 '| 種子碼 | 合法持有者槽位 | 如何實際參與故事起因／衝突／人物反應／結果 |',
 '|---|---|---|',
 '| 1-1 | student_a | 反映責任感 |',
 '| 2-3 | student_a | 疲勞促成起因 |',
 '| 7-4 | student_a | 家庭作息狀況 |',
 '| 9-1 | student_a | 如何看待導師規範 |',
 '## 4｜玩家可見開場與四個行動',
 '### 開場（依自然閱讀長度分頁）',
 '- **P01｜旁白**：學生今天早上又沒交自主學習表。',
 '### 四個最終教師選項（內部固定A～D；玩家顯示另外隨機排列）',
 '| 選項ID | 玩家可見短句（當下可做的行動） | §emotional§ | 教師已完成的客觀行動／確認事實 | 採取此方案的實際取捨（不顯示玩家） |',
 '|---|---|---|---|---|',
 '| A | 確認學生情況 | false | 已詢問原因 | 可了解但耗時 |',
 '| B | 我實在擔心，陪同評估 | true | 已陪同到健康中心 | 顧健康但耽誤其他事 |',
 '| C | 登記未交 | false | 已記錄 | 公平但壓力增加 |',
 '| D | 改派較短任務 | false | 已改派任務 | 有彈性但標準不同 |',
 '## 5｜R1～R8共用結果、結算與4×8因果矩陣',
 results,
 '### 四選項對八共用結果的權重',
 '| 選項／結果 | R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 |',
 '|---|---:|---:|---:|---:|---:|---:|---:|---:|',
 ...'ABCD'.split('').map(c=>'| '+c+' | 4 | 2 | 1 | 4 | 2 | 1 | 4 | 2 |'),
 '- **0權重因果理由**：無'
 ].join('\n').replaceAll('§',String.fromCharCode(96));
}
const audit=(s,stage='full')=>validateStoryDraft(s,{stage,stateRulesVersion:2,seeds,topics,windows});
test('seed source syntax is parsed correctly',()=>assert.deepEqual(seeds.get('S1461'),['1-1','2-3','7-4','9-1']));
test('a synthetic full filled draft passes mechanical checking, without narrative approval',()=>{
 const r=audit(draft());assert.equal(r.mechanicalPass,true,JSON.stringify(r.errors));assert.ok(r.warnings.length>0);
});
test('summary and four-choice stages do not require R results',()=>{
 const partial=draft().split('## 5｜')[0];
 assert.equal(audit(partial,'summary').mechanicalPass,true);
 assert.equal(audit(partial,'choices').mechanicalPass,true,JSON.stringify(audit(partial,'choices').errors));
 assert.equal(audit(partial,'full').mechanicalPass,false);
});
test('rejects missing metadata or mismatched real seed',()=>{
 assert.ok(audit(draft().replace('| G |','| 【T或G】 |')).errors.some(x=>x.code==='metadata'));
 assert.ok(audit(draft().replace('1-1／2-3／7-4／9-1','1-1／2-3／7-4／9-2')).errors.some(x=>x.code==='seed_mismatch'));
});
test('rejects role eligibility, invalid value changes and excessive eight-result means',()=>{
 assert.ok(audit(draft().replaceAll('student_a:1-1:+2','teacher:9-1:+2')).errors.some(x=>x.code==='delta_eligibility'));
 assert.ok(audit(draft().replace('student_a:1-1:+2','student_a:1-1:+9')).errors.some(x=>x.code==='delta_range'));
 assert.ok(audit(draft().replaceAll('student_a:1-1:+2','student_a:1-1:+4')).errors.some(x=>x.code==='delta_mean'));
 assert.ok(audit(draft().replaceAll('1,1,1,1','3,0,0,0')).errors.some(x=>x.code==='state_mean'));
});
test('rejects malformed weights, zero limit, and missing impossible-link explanations',()=>{
 const a='| A | 4 | 2 | 1 | 4 | 2 | 1 | 4 | 2 |';
 assert.ok(audit(draft().replace(a,'| A | 0 | 0 | 0 | 4 | 2 | 1 | 4 | 2 |')).errors.some(x=>x.code==='matrix_row_zero'));
 assert.ok(audit(draft().replace(a,'| A | 0 | 0 | 0 | 4 | 2 | 1 | 4 | 2 |')).errors.some(x=>x.code==='zero_reason'));
 assert.ok(audit(draft().replace(a,'| A | 5 | 2 | 1 | 4 | 2 | 1 | 4 | 2 |')).errors.some(x=>x.code==='matrix_weight'));
});

test('topic IDs must be actual table identifiers, not story IDs',()=>{
 const real=topicIdsFromMarkdown('| **T1-1** | 確認主題 |\n正式故事ID範例 T1-001');
 assert.equal(real.has('T1-1'),true);
 assert.equal(real.has('T1-001'),false);
});
test('guardian phrasing is recognized as a guardian, not a student',()=>{
 const s=draft().replace('本班學生 | 在籍當日知情','本班學生家長 | 在籍當日知情');
 assert.equal(audit(s,'choices').mechanicalPass,true,JSON.stringify(audit(s,'choices').errors));
});

test('S0451 isolated draft fixture passes all three mechanical stages without claiming formal acceptance',()=>{
 const fixture=readFileSync(new URL('./fixtures/17d-draft-sample-s0451.md',import.meta.url),'utf8');
 const fullSeeds=seedCodesFromMarkdown(readFileSync(new URL('../docs/事件四數值三層平衡種子2400組.md',import.meta.url),'utf8'));
 const fullTopics=topicIdsFromMarkdown(readFileSync(new URL('../docs/T1-T6-特定故事20主題與觸發日期.md',import.meta.url),'utf8'));
 assert.equal(fullSeeds.size,2400);
 assert.equal(fullTopics.size,20);
 for(const stage of ['summary','choices','full']){
  const report=validateStoryDraft(fixture,{stage,stateRulesVersion:2,seeds:fullSeeds,topics:fullTopics});
  assert.equal(report.mechanicalPass,true,stage+': '+JSON.stringify(report.errors));
 }
 assert.match(fixture,/SAMPLE-S0451-01/);
 assert.match(fixture,/【待驗收鎖定後由管理端配號】/);
});

const rejected=(s,code,stage='full')=>assert.ok(audit(s,stage).errors.some(e=>e.code===code),code+': '+JSON.stringify(audit(s,stage).errors));
const optionFlags=(s,ids)=>s.replace(/^(\| ([A-D]) \|[^\n]*?\| )(true|false)( \|.*)$/gm,(_,a,id,flag,z)=>a+String(ids.includes(id))+z);
test('batch09 emotional counts 0 through 4 and sole emotional A through D',async t=>{
 for(let n=0;n<=4;n++)await t.test('count '+n,()=>{
  const r=audit(optionFlags(draft(),'ABCD'.slice(0,n)),'choices');
  assert.equal(r.errors.some(e=>e.code==='emotional'),n!==1);
 });
 for(const id of 'ABCD')await t.test('sole '+id,()=>assert.equal(audit(optionFlags(draft(),id)).mechanicalPass,true));
});
test('batch09 stages, metadata, tables and placeholders reject malformed drafts',async t=>{
 const cases=[
  ['missing section',s=>s.replace('## 2｜','## X｜'),'section','summary'],
  ['duplicate section',s=>s+'\n## 2｜重複\n','section_duplicate','summary'],
  ['missing field',s=>s.replace(/^.*required_conditions.*\n/m,''),'metadata','summary'],
  ['missing window',s=>s.replace(/^.*required_window.*\n/m,''),'metadata','summary'],
  ['missing story ID field',s=>s.replace(/^.*story_id.*\n/m,''),'story_id','summary'],
  ['wrong story ID',s=>s.replace('【待驗收鎖定後由管理端配號】','T1-001'),'story_id','summary'],
  ['bad draft ID',s=>s.replace('SAMPLE-1461','??'),'draft_ref','summary'],
  ['duplicate metadata',s=>s.replace('## 2｜','| `event_type`｜事件類型 | G |\n## 2｜'),'metadata_duplicate','summary'],
  ['bad metadata columns',s=>s.replace('| G |','| G | extra |'),'metadata_format','summary'],
  ['invalid type',s=>s.replace('| G |','| P |'),'type','summary'],
  ['placeholder',s=>s.replace('學生早自習無法完成任務','【待填】'),'summary','summary'],
  ['duplicate summary',s=>s.replace('## 3｜','| 事件起因 | 重複 |\n## 3｜'),'summary','summary'],
  ['bad tag',s=>s.replace('G02、G04','G00'),'tags','summary'],
  ['duplicate tag',s=>s.replace('G02、G04','G02、G02'),'tags','summary'],
  ['G topic',s=>s.replace('T主題ID | 無','T主題ID | T1-1'),'topic','summary'],
  ['T unknown topic',s=>s.replace('| G |','| T |').replace('T主題ID | 無','T主題ID | T1-999'),'topic','summary'],
  ['invalid flag',s=>s.replace('| true |','| TRUE |'),'choice_flag','choices'],
  ['missing choice',s=>s.replace(/^\| D \| 改派.*\n/m,''),'choice_missing','choices'],
  ['duplicate choice',s=>s.replace('| D | 改派','| A | 改派'),'choice_duplicate','choices'],
  ['fifth choice',s=>s.replace('## 5｜','| E | 新行動 | false | 已完成 | 有取捨 |\n## 5｜'),'choice_format','choices'],
  ['bad choice columns',s=>s.replace('| A | 確認學生情況 |','| A | 多一欄 | 確認學生情況 |'),'choice_format','choices'],
  ['blank action',s=>s.replace('確認學生情況','【待填】'),'choice_blank','choices'],
  ['opening placeholder',s=>s.replace('學生今天早上又沒交自主學習表。','【待填】'),'opening','choices'],
  ['unknown interpolation',s=>s.replace('確認學生情況','確認{{ghost.name}}情況'),'placeholder','choices']
 ];
 for(const [name,mutate,code,stage] of cases)await t.test(name,()=>rejected(mutate(draft()),code,stage));
 const summary=draft().split('## 3｜')[0];assert.equal(audit(summary,'summary').mechanicalPass,true);
 const validT=summary.replace('| G |','| T |').replace('T主題ID | 無','T主題ID | T1-1').replace('活動窗口 | 無','活動窗口 | T1-1:single');
 assert.equal(audit(validT,'summary').mechanicalPass,true,JSON.stringify(audit(validT,'summary').errors));
 rejected(summary,'section','choices');
});
test('batch09 seed, whole-NPC eligibility, causes and illegal settlements',async t=>{
 const cases=[
  ['unknown seed',s=>s.replace('S1461','S9999'),'seed'],
  ['seed suffix',s=>s.replace('S1461','S1461junk'),'seed'],
  ['duplicate code',s=>s.replace('1-1／2-3／7-4／9-1','1-1／1-1／7-4／9-1'),'codes'],
  ['illegal code',s=>s.replace('1-1／2-3／7-4／9-1','13-1／2-3／7-4／9-1'),'codes'],
  ['unknown slot',s=>s.replace('| 1-1 | student_a |','| 1-1 | ghost |'),'cause_holder'],
  ['missing cause',s=>s.replace(/^\| 1-1 \| student_a.*\n/m,''),'cause_missing'],
  ['blank cause',s=>s.replace('反映責任感','【待填】'),'cause_missing'],
  ['duplicate cause',s=>s.replace('- **四碼的必要因果用途**：','- **四碼的必要因果用途**：\n| 1-1 | student_a | 重複 |'),'cause_duplicate'],
  ['partial staff holder',s=>s.replace('本班學生 | 在籍','一般校內教職員 | 在籍'),'slot_eligibility'],
  ['context holder',s=>s.replace('本班學生 | 在籍','其他班學生 | 在籍'),'slot_type'],
  ['external teacher',s=>s.replace('本班學生 | 在籍','校外教師 | 在籍'),'slot_type'],
  ['reserved teacher slot',s=>s.replace('| `student_a` |','| `teacher` |'),'slot_format'],
  ['duplicate slot',s=>s.replace('- **無數值情境角色**：','| student_a | 本班學生 | 在籍 | 是 |\n- **無數值情境角色**：'),'slot_duplicate'],
  ['teacher relationship cause',s=>s.replace('| 9-1 | student_a |','| 9-1 | teacher |'),'cause_eligibility'],
  ['teacher relationship settlement',s=>s.replace('student_a:1-1:+2','teacher:9-1:+2'),'delta_eligibility'],
  ['context settlement',s=>s.replace('student_a:1-1:+2','ghost:1-1:+2'),'delta_holder'],
  ['nonseed settlement',s=>s.replace('student_a:1-1:+2','student_a:4-1:+2'),'delta_code'],
  ['six ability settlement',s=>s.replace('student_a:1-1:+2','teacher:teaching:+2'),'delta_format'],
  ['duplicate delta',s=>s.replace('student_a:1-1:+2','student_a:1-1:+2;student_a:1-1:-2'),'delta_duplicate'],
  ['decimal delta',s=>s.replace('student_a:1-1:+2','student_a:1-1:+0.5'),'delta_format']
 ];
 for(const [name,mutate,code] of cases)await t.test(name,()=>rejected(mutate(draft()),code));
 assert.equal(audit(draft().replace('本班學生 | 在籍','實際參與導師班規範的任課教師 | 在籍')).mechanicalPass,true);
 assert.equal(audit(draft().replace('student_a:1-1:+2','teacher:1-1:+2')).mechanicalPass,true);
});
test('batch09 R IDs, result text, numeric limits and equal means',async t=>{
 const cases=[
  ['missing R',s=>s.replace('### R8｜','### X8｜'),'result_missing'],
  ['duplicate R',s=>s.replace('### R8｜','### R7｜'),'result_duplicate'],
  ['extra R',s=>s+'\n### R9｜多餘\n','result_count'],
  ['illegal R',s=>s.replace('### R8｜','### R09｜'),'result_id'],
  ['blank result',s=>s.replace('學生產生第1種不同的反應。','【待填】'),'result_text'],
  ['blank fact',s=>s.replace('**客觀後果**：無','**客觀後果**：'),'result_fact'],
  ['same text',s=>s.replace('學生產生第2種不同的反應。','學生產生第1種不同的反應。'),'result_same'],
  ['positive delta overflow',s=>s.replace('student_a:1-1:+2','student_a:1-1:+9'),'delta_range'],
  ['negative delta overflow',s=>s.replace('student_a:1-1:+2','student_a:1-1:-9'),'delta_range'],
  ['positive state overflow',s=>s.replace('1,1,1,1','7,0,0,0'),'state_range'],
  ['negative state overflow',s=>s.replace('1,1,1,1','-7,0,0,0'),'state_range'],
  ['state decimal',s=>s.replace('1,1,1,1','0.5,0,0,0'),'state_format'],
  ['state missing',s=>s.replace('1,1,1,1','0,0,0'),'state_format'],
  ['positive mean',s=>s.replaceAll('student_a:1-1:+2','student_a:1-1:+4'),'delta_mean'],
  ['negative mean',s=>s.replaceAll('student_a:1-1:+2','student_a:1-1:-4'),'delta_mean'],
  ['positive state mean',s=>s.replaceAll('1,1,1,1','3,0,0,0'),'state_mean'],
  ['negative state mean',s=>s.replaceAll('1,1,1,1','-3,0,0,0'),'state_mean']
 ];
 for(const [name,mutate,code] of cases)await t.test(name,()=>rejected(mutate(draft()),code));
 // Values are independent of matrix weights; equal means at both boundaries pass.
 for(const sign of [1,-1]){
  const s=draft().replaceAll('student_a:1-1:+2','student_a:1-1:'+sign*3).replaceAll('1,1,1,1',sign*2+',1,1,1');
  assert.equal(audit(s).mechanicalPass,true);
 }
 let i=0;const balanced=draft().replaceAll('student_a:1-1:+2',()=> 'student_a:1-1:'+(i++%2?'-8':'+8')).replaceAll('1,1,1,1',()=> (i++%2?'-6':'6')+',1,1,1');
 assert.equal(audit(balanced).mechanicalPass,true);
});
test('batch09 matrix dimensions, values, zeros and reachability',async t=>{
 const row='| A | 4 | 2 | 1 | 4 | 2 | 1 | 4 | 2 |';
 const cases=[
  ['missing row',s=>s.replace(row,''),'matrix_missing'],
  ['duplicate row',s=>s.replace(row,row+'\n'+row),'matrix_duplicate'],
  ['extra row',s=>s.replace(row,row+'\n'+row.replace('| A |','| E |')),'matrix_id'],
  ['missing column',s=>s.replace(row,'| A | 4 | 2 | 1 | 4 | 2 | 1 | 4 |'),'matrix_weight'],
  ['extra column',s=>s.replace(row,row+' 2 |'),'matrix_weight'],
  ['bad header',s=>s.replace('R7 | R8 |','R8 | R7 |'),'matrix_header'],
  ['bad weight',s=>s.replace(row,row.replace('4 | 2','3 | 2')),'matrix_weight'],
  ['three row zeros',s=>s.replace(row,'| A | 0 | 0 | 0 | 4 | 2 | 1 | 4 | 2 |'),'matrix_row_zero'],
  ['two column zeros',s=>s.replace(/\| ([AB]) \| 4 \| 2/g,'| $1 | 0 | 2'),'matrix_column_zero'],
  ['unreachable row',s=>s.replace(row,'| A | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |'),'matrix_unreachable'],
  ['missing zero reason',s=>s.replace(row,row.replace('4 | 2','0 | 2')),'zero_reason']
 ];
 for(const [name,mutate,code] of cases)await t.test(name,()=>rejected(mutate(draft()),code));
 const legal=draft().replace(row,'| A | 0 | 0 | 1 | 4 | 2 | 1 | 4 | 2 |').replace('**0權重因果理由**：無','**0權重因果理由**：A→R1：行動已排除；A→R2：事實不相容');
 assert.equal(audit(legal).mechanicalPass,true,JSON.stringify(audit(legal).errors));
 rejected(legal.replace('；A→R2：事實不相容',''),'zero_reason');
 assert.equal(audit(draft()).mechanicalPass,true); // no zeros is legal
});


test('batch09 incomplete role type and opening pages are rejected',()=>{
 rejected(draft().replace('本班學生 | 在籍','【本班學生】 | 在籍'),'slot_incomplete','choices');
 rejected(draft().replace('學生今天早上又沒交自主學習表。',''),'opening','choices');
 rejected(draft().replace('### 四個最終教師選項','- **P01｜旁白**：另一頁。\n### 四個最終教師選項'),'opening_duplicate','choices');
});


test('batch10 draft required_window is an authoritative pool identity',()=>{
 const fullTopics=new Set(windows.topics.keys());
 const check=s=>validateStoryDraft(s,{stage:'summary',stateRulesVersion:2,seeds,topics:fullTopics,windows});
 const s=draft().replace('| G |','| T |').replace('T主題ID | 無','T主題ID | T1-4').replace('活動窗口 | 無','活動窗口 | T1-4:before');
 assert.equal(check(s).mechanicalPass,true);
 for(const value of ['2026/11/04','T1-4:unknown','T1-3:before','前5日'])assert.ok(check(s.replace('活動窗口 | T1-4:before','活動窗口 | '+value)).errors.some(e=>e.code==='window'));
 assert.ok(validateStoryDraft(s,{stage:'summary',stateRulesVersion:2,seeds,topics:fullTopics}).errors.some(e=>e.code==='window'));
 assert.equal(check(draft()).mechanicalPass,true); // G needs no pool.
 assert.ok(check(draft().replace('活動窗口 | 無','活動窗口 | T1-4:before')).errors.some(e=>e.code==='window'));
});

test('batch12 canonical stage sections and illegal numeric headings',async t=>{
 const full=draft(),summary=full.split('## 3｜')[0],choices=full.split('## 5｜')[0];
 for(const [stage,source] of [['summary',summary],['choices',choices],['full',full]])assert.equal(audit(source,stage).mechanicalPass,true);
 const section=i=>new RegExp('^## '+i+'｜.*$','m');
 const inserted='## 6｜補充\n| E | 第五個行動 | false | 已通知 | 另一種取捨 |\n### R9｜新增結果\n';
 const cases=[
  ['trailing sixth',full+'\n'+inserted,'full','section_id'],
  ['inserted sixth',full.replace('## 5｜',inserted+'## 5｜'),'full','section_id'],
  ['hidden fifth option',full.replace('## 4｜',inserted+'## 4｜'),'choices','section_id'],
  ['illegal number in summary',summary+'\n## 12｜額外區','summary','section_id'],
  ['fullwidth numeric heading',full+'\n  ## ６｜額外區','full','section_id'],
  ['missing summary',summary.split('## 2｜')[0],'summary','section'],
  ['missing choices',choices.split('## 4｜')[0],'choices','section'],
  ['missing results',choices,'full','section'],
  ['unfinished section title',full.replace(section(2),'## 2｜【待填】'),'full','section_title'],
  ['unfinished choice',full.replace('已詢問原因','【待填】'),'choices','choice_blank'],
  ['unfinished result',full.replace('學生產生第1種不同的反應。','【待填】'),'full','result_text']
 ];
 for(let i=1;i<=5;i++)cases.push(['duplicate section '+i,full.replace(section(i),title=>title+'\n'+title),'full','section_duplicate']);
 for(const [name,source,stage,code] of cases)await t.test(name,()=>{
  const result=audit(source,stage);
  assert.equal(result.mechanicalPass,false);
  assert.ok(result.errors.some(error=>error.code===code),JSON.stringify(result.errors));
 });
 assert.equal(audit(full+'\n一般敘事段落提到第六節。').mechanicalPass,true);
});

const withStates=values=>{
 let index=0;
 return draft().replace(/(\*\*玩家四狀態\*\*[^：\n]*：)[^\n]*/g,(_,label)=>label+values[index++].join(','));
};
test('V2 row and column zero boundaries, distribution and nonbinding warnings',()=>{
 const values=Array.from({length:8},(_,i)=>Array.from({length:4},(_,j)=>j===i%4?0:(i<4?j+1:-(j+1))));
 const result=audit(withStates(values)),stats=result.details.stateDistribution;
 assert.equal(result.mechanicalPass,true,JSON.stringify(result.errors));
 assert.equal(stats.complete,true);assert.equal(stats.zeroTotal,8);
 assert.deepEqual(stats.zeroByResult,Object.fromEntries(values.map((_,i)=>['R'+(i+1),1])));
 assert.deepEqual(stats.absoluteCounts,{0:8,1:6,2:6,3:6,4:6,5:0,6:0});
 for(const name of ['體力','精神','熱忱','情緒'])assert.deepEqual(stats.byState[name],{zeros:2,positive:3,negative:3,mean:0});
 assert.equal(stats.identicalResultCount,0);
 for(const count of [2,3,4]){
  const bad=structuredClone(values);bad[0]=Array.from({length:4},(_,i)=>i<count?0:1);
  const report=audit(withStates(bad));assert.equal(report.mechanicalPass,false);
  assert.ok(report.errors.some(e=>e.code==='state_zero_row'&&e.detail.includes('R1')));
 }
 const bad=structuredClone(values);bad[1]=[0,1,1,1];
 const report=audit(withStates(bad));assert.ok(report.errors.some(e=>e.code==='state_zero_column'&&e.detail.includes('體力')));
 const noZeros=audit(withStates(Array(8).fill([1,-1,1,-1])));
 assert.equal(noZeros.mechanicalPass,true);assert.equal(noZeros.details.stateDistribution.zeroTotal,0);
 assert.equal(noZeros.details.stateDistribution.identicalResultCount,8);
 assert.deepEqual(noZeros.details.stateDistribution.identicalGroups,[['R1','R2','R3','R4','R5','R6','R7','R8']]);
 assert.ok(noZeros.warnings.some(w=>w.includes('全為±1')));
});
test('V2 full integer ranges and exact equal mean boundaries in every state',()=>{
 for(const sign of [-1,1]){
  const balanced=Array.from({length:8},(_,i)=>Array(4).fill((i%2?1:-1)*6));
  assert.equal(audit(withStates(balanced)).mechanicalPass,true);
  balanced[0][0]=sign*7;rejected(withStates(balanced),'state_range');
  const boundary=Array.from({length:8},()=>Array(4).fill(sign*2));
  assert.equal(audit(withStates(boundary)).mechanicalPass,true);
  boundary[0]=Array(4).fill(sign*3);
  assert.equal(audit(withStates(boundary)).errors.filter(e=>e.code==='state_mean').length,4);
 }
});
test('V2 malformed results are excluded and do not produce misleading aggregate errors',()=>{
 const broken=draft().replace('1,1,1,1','3.5,0,0,0');
 const r=audit(broken);assert.equal(r.mechanicalPass,false);
 assert.equal(r.details.stateDistribution.complete,false);
 assert.equal(r.details.stateDistribution.resultsParsed,7);
 assert.equal(r.details.stateDistribution.byState['體力'].mean,null);
 assert.equal(r.errors.filter(e=>e.code.startsWith('state_')).length,1);
 assert.equal(r.errors.find(e=>e.code==='state_format').detail.includes('R1'),true);
 for(const stage of ['summary','choices'])assert.equal(audit(broken,stage).details.stateDistribution,null);
});


function draftV3(){
 let i=0;
 const cols=[STATE_GROUPS.A,STATE_GROUPS.B,STATE_GROUPS.C,STATE_GROUPS.D];
 return draft().replace('## 1｜故事基本資料與必要資格','## 1｜故事基本資料與必要資格\n| state_rules_version｜數值規則版本 | 3 |')
  .replace(/- \*\*玩家四狀態\*\*（體力、精神、熱忱、情緒）：[^\n]*/g,()=>'- **玩家四狀態**（精神、熱忱、情緒、掌控）：'+cols.map((arr,j)=>arr[(i+j*2)%8]).join(',')+(++i&&''));
}
test('V3 NPC averages beyond ±3 pass while single ±8 remains enforced',()=>{
 const s=draftV3().replaceAll('student_a:1-1:+2','student_a:1-1:+8');
 const result=validateStoryDraft(s,{stage:'full',seeds,topics,windows});
 assert.equal(result.mechanicalPass,true,JSON.stringify(result.errors));
 assert.ok(result.details.npcAudit.warningIds.includes('npc_single_actor'));
 assert.ok(result.details.npcAudit.warningIds.includes('npc_all_zero_code:student_a:2-3'));
 assert.equal(result.details.npcAudit.byActor.student_a.byCode['1-1'].positive,8);
 assert.ok(validateStoryDraft(s.replace('student_a:1-1:+8','student_a:1-1:+9'),{stage:'full',seeds,topics,windows}).errors.some(e=>e.code==='delta_range'));
});
test('V3 NPC multiple valid slots get independent opposite delta statistics',()=>{
 const s=draftV3().replace('| \`student_a\` | 本班學生 | 在籍當日知情 | 是，四碼合法 |','| \`student_a\` | 本班學生 | 在籍當日知情 | 是，四碼合法 |\n| student_b | 本班學生 | 在籍當日知情 | 是，四碼合法 |')
  .replaceAll('- **合法底層增減**：student_a:1-1:+2','- **合法底層增減**：student_a:1-1:+2; student_b:1-1:-1');
 const result=validateStoryDraft(s,{stage:'full',seeds,topics,windows});
 assert.equal(result.mechanicalPass,true,JSON.stringify(result.errors));
 assert.equal(result.details.npcAudit.actorCount,2);
 assert.equal(result.details.npcAudit.activeActorCount,2);
 assert.equal(result.details.npcAudit.byActor.student_b.byCode['1-1'].negative,8);
 assert.ok(!result.details.npcAudit.warningIds.some(x=>x.startsWith('npc_identical_pattern')));
});
