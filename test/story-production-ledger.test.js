import {calendarDay,gradeAt,SENIOR_CALENDAR_VERSION,examSchedule} from '../src/calendar/calendar.js';
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,mkdtempSync,writeFileSync,rmSync,existsSync,symlinkSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {spawnSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import {seedCodesFromMarkdown,topicIdsFromMarkdown,validateStoryDraft} from '../scripts/story-draft-validator.js';
import {initialProductionLedger,readTopicWindows,extractDraftSummary,duplicateCandidates,ledgerProgress,validateLedger,changeProductionLedger,storyPlaybackWindow,queryTWindowEligibility} from '../scripts/story-production-ledger.js';
const file=path=>readFileSync(new URL(path,import.meta.url),'utf8');
const seeds=seedCodesFromMarkdown(file('../docs/事件四數值三層平衡種子2400組.md'));
const topics=topicIdsFromMarkdown(file('../docs/T1-T6-特定故事20主題與觸發日期.md'));
const windows=readTopicWindows(file('../docs/T1-T6-特定故事20主題與觸發日期.md'));
const base=file('./fixtures/17d-draft-sample-s0451.md');
const validate=(s,stage)=>validateStoryDraft(s,{stage,seeds,topics,windows});
const context={seeds,windows,validateDraft:validate};
const act=(state,action,ref='T-DRAFT-001',extra={})=>changeProductionLedger(state,{action,ref,owner:'ChatGPT',...extra},context);
const reason='這組四碼可從學生承擔的班務壓力與導師安排配合形成合理因果';
const proof={verdict:'approved',reviewer:'ChatGPT',
 ordinaryChoiceSelection:{ordinaryCandidates:Array.from({length:6},(_,i)=>({id:i+1,action:'隔離普通行動候選'+(i+1)})),selectedIds:[1,3,5],finalChoiceMap:{A:'emotional',B:3,C:1,D:5}},
 storyAndRoles:'已逐條核對人物身分、出場和導師合法處理權責，未給臨時角色數值。',
 fourCodes:'四個固定碼均由本班學生合法持有，故事中對起因或反應有實際作用。',
 fourChoices:'四個具體教師行動對應不同已完成客觀事實，也有合理取捨。',
 eightResults:'八個共用結果有不同事實或人物反應，結算不以R編號強制好壞。',
 causal32:'針對全部32條選項到結果的可能性逐格檢視既成事實及因果。',
 timeAndLaw:'確認T合法日期及人物當時可知的事情，教師沒有越過自己職權。',
 duplicates:'已對照同批和跨T/G摘要檢索候選，核對起因、衝突及導師選擇的差異。'
};
function draft(id='T-DRAFT-001',seedId='S0001',type='T'){
 let s=base.replaceAll('SAMPLE-S0451-01',id);
 if(type==='T')s=s.replace('| `event_type`｜事件類型 | G |','| `event_type`｜事件類型 | T |')
 .replace('| `t_topic_id`｜T主題ID | 無 |','| `t_topic_id`｜T主題ID | T1-1 |')
 .replace('| `required_window`｜必要合法日期／活動窗口 | 無 |','| `required_window`｜必要合法日期／活動窗口 | T1-1:single |');
 const previous=seeds.get('S0451'),codes=seeds.get(seedId);
 s=s.replace('- **種子ID**：S0451','- **種子ID**：'+seedId);
 s=s.replace('- **本篇四碼**：'+previous.join('／'),'- **本篇四碼**：'+codes.join('／'));
 for(let i=0;i<4;i++){
  s=s.replace('| '+previous[i]+' | student_a |','| '+codes[i]+' | student_a |');
  s=s.replaceAll('student_a:'+previous[i]+':','student_a:'+codes[i]+':');
 }
 if(id!=='T-DRAFT-001')s=s.replace('工作負荷累積、回覆又少','工作負荷累積、回覆又少，故事候選'+id+'有獨立觀察');
 return s;
}
const prop=(L,s,id='T-DRAFT-001',date='2026-07-20')=>act(L,'propose',id,{markdown:s,date});
const reserve=(L,id='T-DRAFT-001',sid='S0001')=>act(L,'reserve',id,{seedId:sid,reason});
const lock=(L,s,id='T-DRAFT-001',review=proof)=>act(L,'lock',id,{markdown:s,review,reviewFile:'content/reviews/'+id+'.json',reviewDigest:'d'.repeat(64),manuscriptPath:'content/drafts/'+id+'.md',manuscriptDigest:createHash('sha256').update(s).digest('hex')});

// Inspect raw rows before Map/Set parsing can hide duplicates or skipped rows.
test('batch08 fixed seed rows, legal codes and all three balance layers',()=>{
 const path='../docs/事件四數值三層平衡種子2400組.md',source=file(path);
 const raw=source.split(/\r?\n/).map((line,i)=>({line,n:i+1})).filter(x=>/^\|\s*S/.test(x.line));
 assert.equal(raw.length,2400,path+' row count');
 const ids=new Set(),combos=new Map(),counts=new Map(),groups=new Map(),pairs=new Map();
 const bump=(map,key)=>map.set(key,(map.get(key)||0)+1);
 for(const {line,n} of raw){
  const [id,...codes]=line.trim().slice(1,-1).split('|').map(x=>x.trim()),where=path+':'+n+' '+id;
  assert.match(id,/^S(?:0[0-9]{3}|1[0-9]{3}|2[0-3][0-9]{2}|2400)$/,where);
  assert.ok(!ids.has(id),where+' duplicate ID');ids.add(id);
  assert.equal(codes.length,4,where+' expected four codes');
  for(const c of codes)assert.match(c,/^(?:[1-9]|1[0-2])-[1-4]$/,where+' invalid '+c);
  assert.equal(new Set(codes.map(c=>c.split('-')[0])).size,4,where+' expected four categories');
  const key=[...codes].sort().join(',');
  assert.ok(!combos.has(key),where+' duplicate combination of '+combos.get(key));combos.set(key,id);
  assert.deepEqual(seeds.get(id),codes,where+' parser mismatch');
  for(const c of codes)bump(counts,c);
  for(let i=0;i<4;i++)for(let j=i+1;j<4;j++){
   bump(groups,[codes[i].split('-')[0],codes[j].split('-')[0]].sort().join(','));
   bump(pairs,[codes[i],codes[j]].sort().join(','));
  }
 }
 for(let i=1;i<=2400;i++)assert.ok(ids.has('S'+String(i).padStart(4,'0')),path+' missing ID '+i);
 assert.equal(counts.size,48);for(const [c,n] of counts)assert.equal(n,200,path+' '+c+' expected 200');
 const histogram=map=>Object.fromEntries([...new Set(map.values())].sort((a,b)=>a-b).map(n=>[n,[...map.values()].filter(v=>v===n).length]));
 assert.equal(groups.size,66);assert.deepEqual(histogram(groups),{218:54,219:12});
 assert.equal(pairs.size,1056);assert.deepEqual(histogram(pairs),{13:384,14:672});
 assert.equal([...counts.values()].reduce((a,b)=>a+b,0),9600);
 for(const map of [groups,pairs])assert.equal([...map.values()].reduce((a,b)=>a+b,0),14400);
});
test('batch08 T20 raw rows, 119 pairs, 108 calendar-legal dates and shared quotas',()=>{
 const path='../docs/T1-T6-特定故事20主題與觸發日期.md';
 const raw=file(path).split(/\r?\n/).map((line,i)=>({line,n:i+1})).filter(x=>/^\|\s*\*\*T[1-6]-/.test(x.line));
 assert.equal(raw.length,20);const ids=new Set(),terms=Array.from({length:6},()=>({topics:0,days:new Set()}));let total=0;
 for(const {line,n} of raw){
  const row=line.slice(1,-1).split('|').map(x=>x.trim()),id=row[0].replaceAll('**',''),where=path+':'+n+' '+id;
  assert.match(id,/^T[1-6]-[1-9]$/);assert.ok(!ids.has(id),where+' duplicate');ids.add(id);
  const parsed=readTopicWindows(line).topics.get(id),actual=windows.topics.get(id);
  assert.deepEqual(actual,parsed,where+' parser mismatch');assert.equal(actual.size,Number(row[3]),where+' declared date count');
  const term=terms[Number(id[1])-1];term.topics++;total+=actual.size;
  for(const date of actual){
   term.days.add(date);const d=calendarDay(date,gradeAt(date,2026),SENIOR_CALENDAR_VERSION);
   assert.ok(['school','summer-camp','winter-camp'].includes(d.kind),where+' '+date+' actual kind '+d.kind);
   assert.equal(d.exam,false,where+' '+date+' exam');assert.equal(d.activities.length,0,where+' '+date+' activities '+JSON.stringify(d.activities));
   assert.equal(d.holiday.length,0,where+' '+date+' holiday');
   assert.ok(windows.days.get(date).has(id),where+' '+date+' lost overlap');
  }
 }
 assert.deepEqual(new Set(windows.topics.keys()),ids);assert.deepEqual(topics,ids);
 assert.deepEqual(terms.map(t=>t.topics),[5,1,2,2,5,5]);assert.deepEqual(terms.map(t=>t.days.size),[29,7,15,9,23,25]);
 assert.equal(total,119);assert.equal(windows.days.size,108);assert.equal(windows.days.size*6,648);
 assert.equal([...windows.days].reduce((n,[,ts])=>n+ts.size,0),119);
});
test('fresh ledger zero counts, test fixture never counts',()=>{
 const L=initialProductionLedger(),r=ledgerProgress(L,{seeds,windows});
 assert.equal(r.locked.total,0);assert.equal(r.seedStatus.unused,2400);assert.equal(r.tagPercent.G02,null);
 assert.throws(()=>act(L,'propose','SAMPLE-S0451-01',{markdown:base,date:'2026-07-20'}),/試作/);
});
test('T lifecycle: propose, reserve, lock; only lock gets T1-001',()=>{
 const s=draft();assert.equal(validate(s,'full').mechanicalPass,true);
 const a=prop(initialProductionLedger(),s),b=reserve(a.ledger),c=lock(b.ledger,s);
 assert.equal(a.change.storyId,null);assert.equal(b.change.storyId,null);
 assert.equal(c.change.storyId,'T1-001');assert.equal(c.change.status,'locked');
 assert.equal(ledgerProgress(c.ledger,{seeds,windows}).seedStatus.unused,2399);
 assert.equal(ledgerProgress(c.ledger,{seeds,windows}).tagOccurrences,3);
 assert.throws(()=>act(c.ledger,'release','T-DRAFT-001',{reason:'已鎖資料不能放回'}),/已鎖定/);
});
test('seed conflict between two candidates, then release and reuse',()=>{
 const a=prop(initialProductionLedger(),draft());
 const b=prop(a.ledger,draft('T-DRAFT-002','S0002'),'T-DRAFT-002');
 const c=reserve(b.ledger);
 assert.throws(()=>reserve(c.ledger,'T-DRAFT-002','S0001'),/已被暫用/);
 const d=act(c.ledger,'release','T-DRAFT-001',{reason:'四碼與故事核心衝突仍無法相容'});
 const e=reserve(d.ledger,'T-DRAFT-002','S0001');
 assert.equal(e.change.seedId,'S0001');assert.equal(ledgerProgress(e.ledger,{seeds,windows}).seedStatus.reserved,1);
});
test('wrong T date, early G, duplicated synopsis and wrong AI owner rejected',()=>{
 const L=initialProductionLedger(),s=draft();
 assert.throws(()=>prop(L,s,'T-DRAFT-001','2026-09-03'),/不符/);
 assert.throws(()=>act(L,'propose','G-DRAFT-001',{markdown:draft('G-DRAFT-001','S2400','G')}),/T648/);
 const a=prop(L,s);
 assert.throws(()=>prop(a.ledger,s.replaceAll('T-DRAFT-001','T-DRAFT-002'),'T-DRAFT-002'),/完全相同/);
 assert.throws(()=>changeProductionLedger(a.ledger,{action:'reserve',ref:'T-DRAFT-001',owner:'OtherAI',seedId:'S0001',reason},context),/原登記負責者/);
});
test('lock gates missing review, low-evidence review, wrong seed and invalid weights',()=>{
 const s=draft(),L=reserve(prop(initialProductionLedger(),s).ledger).ledger;
 assert.throws(()=>lock(L,s,'T-DRAFT-001',null),/審查/);
 assert.throws(()=>lock(L,s,'T-DRAFT-001',{...proof,causal32:'好'}),/證據不足/);
 assert.throws(()=>lock(L,s,'T-DRAFT-001',{...proof,isFixture:true}),/試作不得鎖定/);
 assert.throws(()=>lock(L,s.replace('S0001','S0002')),/稿件與登記內容不同/);
 assert.throws(()=>lock(L,s.replace('| A | 4 | 2 | 1 |','| A | 5 | 2 | 1 |')),/機械驗收未通過/);
});
test('reject frees seed and logs failure; revise cannot stealth-change the seed',()=>{
 const s=draft(),L=reserve(prop(initialProductionLedger(),s).ledger).ledger;
 const a=act(L,'reject','T-DRAFT-001',{reason:'實際人物與故事起因不合理，故退件'});
 assert.equal(a.change.seedId,null);assert.equal(a.change.status,'rejected');
 assert.equal(a.ledger.candidates['T-DRAFT-001'].reason,'實際人物與故事起因不合理，故退件');
 assert.throws(()=>reserve(a.ledger),/退件/);
 assert.throws(()=>act(L,'revise','T-DRAFT-001',{markdown:s.replace('S0001','S0002'),reason:'想改成另一組種子'}),/種子與占用種子不同/);
});
test('semantic hints include same causal scenario; never report automatic semantic approval',()=>{
 const a=prop(initialProductionLedger(),draft());
 const second=draft('T-DRAFT-002','S0002').replace('教師必須在立即澄清','教師需要在立即澄清');
 const b=prop(a.ledger,second,'T-DRAFT-002');
 const pairs=duplicateCandidates(extractDraftSummary(second).summary,b.ledger,'T-DRAFT-002');
 assert.ok(pairs.some(x=>x.ref==='T-DRAFT-001'));
 assert.ok(pairs.every(x=>typeof x.score==='number'));
});
test('T same calendar day cannot lock seven events, across themes shared quota',()=>{
 const L=initialProductionLedger();
 for(let i=0;i<7;i++)L.candidates['COUNT-'+i]={
  draftRef:'COUNT-'+i,owner:'Sim',type:'T',status:'locked',date:'2028-12-01',
  topicId:i%2?'T5-2':'T5-3',poolId:(i%2?'T5-2':'T5-3')+':before',tags:['G02'],summary:{事件起因:''+i},seedId:'S'+String(i+1).padStart(4,'0'),
  storyId:'T5-'+String(i+1).padStart(3,'0'),manuscriptDigest:'a'.repeat(64),manuscriptPath:'content/drafts/count-'+i+'.md',review:{digest:'a'.repeat(64),filePath:'content/reviews/count-'+i+'.json'}
 };
 assert.throws(()=>validateLedger(L,{seeds,windows}),/超出配額/);
 delete L.candidates['COUNT-6'];assert.equal(validateLedger(L,{seeds,windows}).days.get('2028-12-01'),6);
});
test('simulated 648 T locks allow first G (never actual content inventory)',()=>{
 const L=initialProductionLedger();let n=0;const counters={};
 for(const [day,ts] of windows.days){
  const theme=[...ts][0],prefix=theme.split('-')[0];
  for(let i=0;i<6;i++){
   n++;counters[prefix]=(counters[prefix]||0)+1;const ref='SIM-T-'+n;
   L.candidates[ref]={draftRef:ref,owner:'Sim',type:'T',status:'locked',date:day,topicId:theme,poolId:windows.topicPools.get(theme).find(id=>windows.pools.get(id).dates.has(day)),
    tags:['G01'],summary:{事件起因:'synthetic'+n,核心衝突:'test'+n,導師困境:'check'+n},
    seedId:'S'+String(n).padStart(4,'0'),
    storyId:prefix+'-'+String(counters[prefix]).padStart(3,'0'),manuscriptDigest:'b'.repeat(64),manuscriptPath:'content/drafts/sim-'+n+'.md',review:{digest:'b'.repeat(64),filePath:'content/reviews/sim-'+n+'.json'}};
  }
 }
 assert.equal(n,648);assert.equal(validateLedger(L,{seeds,windows}).T,648);
 const g=draft('G-DRAFT-001','S2400','G');
 const a=act(L,'propose','G-DRAFT-001',{markdown:g});
 const b=reserve(a.ledger,'G-DRAFT-001','S2400');
 const c=lock(b.ledger,g,'G-DRAFT-001');
 assert.equal(c.change.storyId,'G-0001');
 const full=c.ledger;
 full.candidates['SIM-T-1'].tags=['G01','G02','G02'];
 full.candidates['G-DRAFT-001'].tags=['G02','G03'];
 const other=draft('G-DRAFT-002','S0649','G');
 const pending=act(full,'propose','G-DRAFT-002',{markdown:other}).ledger;
 let mixed=reserve(pending,'G-DRAFT-002','S0649').ledger;
 for(const ref of ['G-DRAFT-003','G-DRAFT-004']){
  const proposal=act(mixed,'propose',ref,{markdown:draft(ref,'S0650','G')}).ledger;
  mixed=ref.endsWith('004')?act(proposal,'reject',ref,{reason:'隔離候選已有更合適的故事安排'}).ledger:proposal;
 }
 const progress=ledgerProgress(mixed,context);
 assert.deepEqual(progress.locked,{T:648,G:1,total:649});
 assert.deepEqual(progress.stats,{proposed:1,reserved:1,rejected:1,locked:649,revoked:0});
 assert.deepEqual(progress.seedStatus,{total:2400,unused:1750,reserved:1,locked:649});
 assert.equal(progress.remainingT,0);assert.equal(progress.remainingG,1751);
 assert.equal(progress.tagOccurrences,651);
 assert.deepEqual(Object.values(progress.tagCounts),[648,2,1,0,0,0,0,0,0,0,0]);
 assert.deepEqual(Object.values(progress.tagPercent),[99.539,0.307,0.154,0,0,0,0,0,0,0,0]);
 const fixture=structuredClone(full);
 fixture.candidates['TEST-G']= {...fixture.candidates['G-DRAFT-001'],draftRef:'TEST-G'};
 assert.throws(()=>ledgerProgress(fixture,context),/帳本候選資料錯誤/);
 // Only inventory rows in memory: no fixture manuscripts or formal production IDs are written.
 for(let i=2;i<=1752;i++){
  const ref='SIM-G-'+i;
  full.candidates[ref]={...full.candidates['G-DRAFT-001'],draftRef:ref,
   storyId:'G-'+String(i).padStart(4,'0'),seedId:'S'+String(647+i).padStart(4,'0')};
 }
 assert.equal(ledgerProgress(full,context).remainingG,0);
 const overflow={...full.candidates['G-DRAFT-001'],draftRef:'SIM-G-overflow',storyId:'G-1753',seedId:'S2401'};
 full.candidates[overflow.draftRef]=overflow;
 const extendedSeeds=new Map(seeds).set('S2401',seeds.get('S2400'));
 assert.throws(()=>validateLedger(full,{...context,seeds:extendedSeeds}),/超出配額/);
});


test('batch09 review structure and manuscript mapping enforced by lock',async t=>{
 const s=draft(),L=reserve(prop(initialProductionLedger(),s).ledger).ledger;
 assert.equal(lock(L,s).change.status,'locked');
 const cases=[
  ['missing selection',r=>delete r.ordinaryChoiceSelection],
  ['five candidates',r=>r.ordinaryChoiceSelection.ordinaryCandidates.pop()],
  ['seven candidates',r=>r.ordinaryChoiceSelection.ordinaryCandidates.push({id:7,action:'多餘'})],
  ['duplicate ID',r=>r.ordinaryChoiceSelection.ordinaryCandidates[5].id=5],
  ['missing ID',r=>delete r.ordinaryChoiceSelection.ordinaryCandidates[5].id],
  ['out of range ID',r=>r.ordinaryChoiceSelection.ordinaryCandidates[5].id=7],
  ['blank action',r=>r.ordinaryChoiceSelection.ordinaryCandidates[0].action='  '],
  ['non-string action',r=>r.ordinaryChoiceSelection.ordinaryCandidates[0].action=123],
  ['two selected',r=>r.ordinaryChoiceSelection.selectedIds.pop()],
  ['four selected',r=>r.ordinaryChoiceSelection.selectedIds.push(6)],
  ['duplicate selected',r=>r.ordinaryChoiceSelection.selectedIds=[1,1,3]],
  ['string ID',r=>r.ordinaryChoiceSelection.ordinaryCandidates[0].id='1'],
  ['null candidate',r=>r.ordinaryChoiceSelection.ordinaryCandidates[0]=null],
  ['two selected',r=>r.ordinaryChoiceSelection.selectedIds=[1,3]],
  ['four selected',r=>r.ordinaryChoiceSelection.selectedIds=[1,2,3,5]],
  ['duplicate selected',r=>r.ordinaryChoiceSelection.selectedIds=[1,1,5]],
  ['unknown selected',r=>r.ordinaryChoiceSelection.selectedIds=[1,3,7]],
  ['string selected',r=>r.ordinaryChoiceSelection.selectedIds=['1',3,5]],
  ['missing mapping',r=>delete r.ordinaryChoiceSelection.finalChoiceMap.D],
  ['extra mapping',r=>r.ordinaryChoiceSelection.finalChoiceMap.E=5],
  ['duplicate mapping',r=>r.ordinaryChoiceSelection.finalChoiceMap.D=1],
  ['unselected mapping',r=>r.ordinaryChoiceSelection.finalChoiceMap.D=2],
  ['invalid mapping',r=>r.ordinaryChoiceSelection.finalChoiceMap.D='5'],
  ['no emotional',r=>r.ordinaryChoiceSelection.finalChoiceMap.A=2],
  ['two emotional',r=>r.ordinaryChoiceSelection.finalChoiceMap.B='emotional'],
  ['wrong emotional position',r=>Object.assign(r.ordinaryChoiceSelection.finalChoiceMap,{A:3,B:'emotional'})]
 ];
 for(const [name,mutate] of cases)await t.test(name,()=>{
  const r=structuredClone(proof);mutate(r);assert.throws(()=>lock(L,s,'T-DRAFT-001',r),/六選三/);
  assert.equal(L.candidates['T-DRAFT-001'].status,'reserved');
 });
 for(const name of ['storyAndRoles','fourCodes','fourChoices','eightResults','causal32','timeAndLaw','duplicates'])await t.test('retain '+name,()=>{
  const r=structuredClone(proof);delete r[name];assert.throws(()=>lock(L,s,'T-DRAFT-001',r),/證據不足/);
 });
});

const windowDraft=(topicId,poolId,id='T-DRAFT-001')=>draft(id).replace('T主題ID | T1-1','T主題ID | '+topicId).replace('活動窗口 | T1-1:single','活動窗口 | '+poolId);
const windowStory=(topicId,phase)=>{const pool=windows.pools.get(topicId+':'+phase);return {type:'T',topicId,poolId:pool.poolId,date:[...pool.dates][0]}};
const query=(story,date,extra={})=>queryTWindowEligibility(story,{date,topicId:story.topicId,phase:windows.pools.get(story.poolId).phase,grade:Math.ceil(Number(story.topicId[1])/2),...extra},windows);
test('batch10 all T20 pool partitions preserve 119 pairs / 108 days and phase distinctions',()=>{
 assert.equal(windows.pools.size,26);assert.equal(windows.topicPools.size,20);
 for(const [topicId,dates] of windows.topics){
  const poolDates=windows.topicPools.get(topicId).flatMap(id=>[...windows.pools.get(id).dates]);
  assert.deepEqual(new Set(poolDates),dates,topicId);assert.equal(poolDates.length,dates.size,topicId+' disjoint phases');
 }
 for(const [topicId,before,after] of [['T1-3',2,2],['T1-4',5,2],['T2-1',5,2],['T3-1',5,2],['T4-1',2,2],['T5-1',1,1]]){
  assert.equal(windows.pools.get(topicId+':before').dates.size,before);
  assert.equal(windows.pools.get(topicId+':after').dates.size,after);
 }
 assert.equal(windows.pools.get('T5-5:before').dates.size,15);
 assert.equal(windows.pools.get('T1-1:single').dates.size,5);
 for(const topic of ['T1-5','T3-2','T6-3']){
  const pool=windows.pools.get(topic+':single');assert.equal(pool.phaseConfirmed,false);assert.deepEqual(pool.dates,windows.topics.get(topic));
 }
 assert.equal([...windows.pools.values()].reduce((n,p)=>n+p.dates.size,0),119);
 assert.equal(windows.days.size,108);assert.equal(windows.days.size*6,648);
});
test('batch10 parser refuses missing, duplicated, unknown and incomplete pool metadata',()=>{
 const row=file('../docs/T1-T6-特定故事20主題與觸發日期.md').split('\n').find(l=>l.startsWith('| **T1-4**'));
 for(const spec of ['', 'before:4,after:2','before:6,after:2','before:5,before:2','single:5,after:2','before:5,after:2;unknown']){
  assert.throws(()=>readTopicWindows(row.replace('before:5,after:2',spec)),/故事池|池別|註記/);
 }
 assert.throws(()=>readTopicWindows(row+'\n'+row),/重複T主題/);
});
test('batch10 before/after pools share all their own days but never cross phases',()=>{
 for(const topic of ['T1-4','T4-1','T5-1'])for(const phase of ['before','after']){
  const story=windowStory(topic,phase),pool=storyPlaybackWindow(story,windows);
  for(const day of pool.dates)assert.equal(query(story,day).windowEligible,true,topic+' '+phase+' '+day);
  const other=windows.pools.get(topic+':'+(phase==='before'?'after':'before'));
  for(const day of other.dates)assert.equal(query(story,day).windowEligible,false);
  assert.equal(query(story,pool.dates[0],{phase:phase==='before'?'after':'before'}).windowEligible,false);
  assert.equal(query(story,pool.dates[0],{grade:Math.ceil(Number(topic[1])/2)===1?2:1}).windowEligible,false);
 }
 for(const [topic,phase] of [['T1-1','single'],['T5-5','before'],['T6-5','before']]){
  const story=windowStory(topic,phase);for(const day of storyPlaybackWindow(story,windows).dates)assert.equal(query(story,day).windowEligible,true);
 }
 const s=windowStory('T1-4','before');
 const examDate=examSchedule('2026:autumn',1)[0].dates[0];
 for(const date of ['2026-11-11','2026-11-07','2026-10-09',examDate,'bad'])assert.equal(query(s,date).windowEligible,false,date);
 // Inject a forbidden date into an isolated pool to verify the calendar guard independently.
 for(const date of ['2026-11-11','2026-11-07','2026-10-09',examDate]){
  const local=readTopicWindows(file('../docs/T1-T6-特定故事20主題與觸發日期.md'));
  local.pools.get(s.poolId).dates.add(date);
  const r=queryTWindowEligibility(s,{date,topicId:s.topicId,phase:'before',grade:1},local);
  assert.ok(r.reasons.includes('calendar-forbidden'),date);
 }
});
test('batch10 overlapping themes retain identity without adding dates or capacity',()=>{
 const s=windowStory('T5-2','before'),other=windowStory('T5-3','before');
 assert.deepEqual(storyPlaybackWindow(s,windows).dates,storyPlaybackWindow(other,windows).dates);
 assert.equal(query(s,'2028-12-04').windowEligible,true);assert.equal(s.date,'2028-12-01');
 assert.equal(query(s,'2028-12-04',{topicId:'T5-3'}).windowEligible,false);
 const count=windows.days.size;
 storyPlaybackWindow(s,windows).dates.push('invented');
 assert.equal(windows.pools.get(s.poolId).dates.size,5);assert.equal(windows.days.size,count);
});
test('batch10 published-and-known prerequisites remain unresolved by a valid date',()=>{
 for(const topic of ['T6-1','T6-2']){
  const s=windowStory(topic,'after'),r=query(s,s.date);
  assert.equal(r.windowEligible,true);assert.equal(r.scope,'window-and-calendar-only');
  assert.ok(r.requiredChecks.includes('results-published'));assert.ok(r.requiredChecks.includes('participant-informed'));
  assert.ok(r.requiredChecks.includes('story-not-yet-triggered'));assert.ok(r.requiredChecks.includes('roles-present-and-authorized'));
 }
 const s=windowStory('T1-5','single');assert.ok(query(s,s.date).requiredChecks.includes('phase-boundary-review'));
});
test('batch10 proposal, revise and lock keep the pool immutable and failures isolated',()=>{
 const s=windowDraft('T1-4','T1-4:before'),empty=initialProductionLedger(),snapshot=structuredClone(empty);
 for(const [md,date] of [[s,'2026-11-12'],[s.replace('T1-4:before','T1-3:before'),'2026-11-04'],[s.replace('T1-4:before','T1-4:unknown'),'2026-11-04']]){
  assert.throws(()=>prop(empty,md,'T-DRAFT-001',date),/不符|機械檢查/);assert.deepEqual(empty,snapshot);
 }
 const a=prop(empty,s,'T-DRAFT-001','2026-11-04').ledger;
 assert.equal(a.candidates['T-DRAFT-001'].poolId,'T1-4:before');assert.equal(a.candidates['T-DRAFT-001'].date,'2026-11-04');
 const L=reserve(a).ledger,original=structuredClone(L),after=s.replace('T1-4:before','T1-4:after');
 assert.throws(()=>act(L,'revise','T-DRAFT-001',{markdown:after,reason:'嘗試改成活動後'}),/故事池/);
 assert.throws(()=>lock(L,after),/稿件與登記內容不同/);assert.deepEqual(L,original);
 const done=lock(L,s).ledger,record=done.candidates['T-DRAFT-001'];
 for(const date of ['2026-11-04','2026-11-05','2026-11-06','2026-11-09','2026-11-10'])assert.equal(query(record,date).windowEligible,true);
 assert.equal(ledgerProgress(done,{seeds,windows}).locked.T,1);assert.equal(validateLedger(done,{seeds,windows}).days.get('2026-11-04'),1);
 const broken=structuredClone(L);broken.candidates['T-DRAFT-001'].poolId='T1-4:after';assert.throws(()=>validateLedger(broken,{seeds,windows}),/窗口不合法/);
 const noPool=structuredClone(L);delete noPool.candidates['T-DRAFT-001'].poolId;assert.throws(()=>validateLedger(noPool,{seeds,windows}),/窗口不合法/);
 const post=prop(empty,windowDraft('T1-4','T1-4:after'),'T-DRAFT-001','2026-11-12').ledger;
 assert.equal(query(post.candidates['T-DRAFT-001'],'2026-11-13').windowEligible,true);
 assert.equal(query(post.candidates['T-DRAFT-001'],'2026-11-10').windowEligible,false);
});


test('batch10 CLI reads source pools and previews proposals with an isolated ledger',()=>{
 const dir=mkdtempSync(join(tmpdir(),'teacher-window-'));
 try{
  const ledgerPath=join(dir,'ledger.json'),draftPath=join(dir,'draft.md'),initial=JSON.stringify(initialProductionLedger());
  writeFileSync(ledgerPath,initial);writeFileSync(draftPath,windowDraft('T1-4','T1-4:before'));
  const cli=(...args)=>spawnSync(process.execPath,['scripts/manage-story-production.mjs',...args,'--ledger',ledgerPath],{cwd:new URL('..',import.meta.url),encoding:'utf8'});
  const lookup=cli('windows','--topic','T1-4');assert.equal(lookup.status,0,lookup.stderr);
  const pools=JSON.parse(lookup.stdout).pools;assert.deepEqual(pools.map(p=>[p.phase,p.dates.length]),[['before',5],['after',2]]);
  const preview=cli('propose','--ref','T-DRAFT-001','--owner','ChatGPT','--file',draftPath,'--date','2026-11-04');
  assert.equal(preview.status,0,preview.stderr);assert.equal(JSON.parse(preview.stdout).applied,false);
  const invalid=cli('propose','--ref','T-DRAFT-001','--owner','ChatGPT','--file',draftPath,'--date','2026-11-12');assert.equal(invalid.status,1);
  const check=spawnSync(process.execPath,['scripts/check-story-draft.mjs','--input',draftPath,'--stage','summary'],{cwd:new URL('..',import.meta.url),encoding:'utf8'});
  assert.equal(check.status,0,check.stderr);
  const proposed=prop(initialProductionLedger(),windowDraft('T1-4','T1-4:before'),'T-DRAFT-001','2026-11-04').ledger;
  writeFileSync(ledgerPath,JSON.stringify(proposed));
  const byRef=cli('windows','--ref','T-DRAFT-001');assert.equal(byRef.status,0,byRef.stderr);
  const w=JSON.parse(byRef.stdout).window;assert.equal(w.quotaDate,'2026-11-04');assert.equal(w.dates.length,5);
  assert.equal(readFileSync(ledgerPath,'utf8'),JSON.stringify(proposed));
 }finally{rmSync(dir,{recursive:true,force:true})}
});

test('batch10 a seventh lock across overlapping pools fails without seed or ledger mutation',()=>{
 const L=initialProductionLedger();
 for(let i=0;i<6;i++)L.candidates['COUNT-'+i]={
  draftRef:'COUNT-'+i,owner:'Sim',type:'T',status:'locked',date:'2028-12-01',topicId:i%2?'T5-2':'T5-3',poolId:(i%2?'T5-2':'T5-3')+':before',
  tags:['G02'],summary:{事件起因:''+i},seedId:'S'+String(i+1).padStart(4,'0'),storyId:'T5-'+String(i+1).padStart(3,'0'),
  manuscriptDigest:'a'.repeat(64),manuscriptPath:'content/drafts/count-'+i+'.md',review:{digest:'a'.repeat(64),filePath:'content/reviews/count-'+i+'.json'}
 };
 assert.equal(validateLedger(L,{seeds,windows}).days.get('2028-12-01'),6);
 const s=draft('T-DRAFT-007','S0007').replace('T主題ID | T1-1','T主題ID | T5-3').replace('活動窗口 | T1-1:single','活動窗口 | T5-3:before');
 const proposed=prop(L,s,'T-DRAFT-007','2028-12-01').ledger;
 const reserved=reserve(proposed,'T-DRAFT-007','S0007').ledger,snapshot=structuredClone(reserved);
 assert.throws(()=>lock(reserved,s,'T-DRAFT-007'),/六篇配額已滿/);assert.deepEqual(reserved,snapshot);
 assert.equal(validateLedger(reserved,{seeds,windows}).T,6);assert.equal(reserved.candidates['T-DRAFT-007'].status,'reserved');
});

test('batch11 protected transitions preserve ledger, history and formal numbering',()=>{
 const story=draft(),ref='T-DRAFT-001',second='T-DRAFT-002';
 const preassigned=story.replace('【待驗收鎖定後由管理端配號】','T1-009');
 assert.throws(()=>prop(initialProductionLedger(),preassigned),/配號/);
 for(const id of ['S0001','T1-1','T1-001','G-0001']){
  assert.throws(()=>prop(initialProductionLedger(),story.replaceAll(ref,id),id),/候選ID不得/);
 }
 const proposed=prop(initialProductionLedger(),story).ledger;
 assert.equal(proposed.candidates[ref].seedId,null);
 const held=reserve(proposed).ledger,snapshot=structuredClone(held);
 assert.throws(()=>act(held,'revise',ref,{markdown:preassigned}),/配號/);
 assert.throws(()=>lock(held,preassigned),/配號/);
 assert.throws(()=>act(held,'revise',ref,{markdown:draft(ref,'S0001','G')}),/T-G/);
 assert.throws(()=>act(held,'revise',ref,{markdown:windowDraft('T1-4','T1-4:before')}),/T主題/);
 for(const action of ['revise','reserve','release','reject','lock']){
  assert.throws(()=>act(held,action,ref,{owner:'Other'}),/原登記負責者/);
 }
 assert.deepEqual(held,snapshot);
 const revised=act(held,'revise',ref,{markdown:story,reason:'已核對摘要'}).ledger;
 const locked=lock(revised,story).ledger;
 assert.deepEqual(locked.history.map(row=>[row.revision,row.action,row.seedId,row.storyId]),[
  [1,'propose',null,null],[2,'reserve','S0001',null],[3,'revise','S0001',null],[4,'lock','S0001','T1-001']
 ]);
 const stable=structuredClone(locked);
 for(const action of ['release','reject','revise','reserve','lock'])assert.throws(()=>act(locked,action),/已鎖定/);
 assert.deepEqual(locked,stable);
 const other=draft(second,'S0002');
 const candidate=prop(locked,other,second).ledger;
 assert.throws(()=>reserve(candidate,second,'S0001'),/已被暫用或鎖定/);
 const next=lock(reserve(candidate,second,'S0002').ledger,other,second).ledger;
 assert.equal(next.candidates[second].storyId,'T1-002');
 const forged=structuredClone(next);
 forged.candidates[second].storyId='T1-001';
 assert.throws(()=>validateLedger(forged,context),/正式故事缺ID/);
 const rejected=act(candidate,'reject',second,{reason:'已確認衝突缺乏可行的教師行動'}).ledger;
 assert.throws(()=>prop(rejected,other,second),/已存在/);
 assert.throws(()=>act(rejected,'revise',second,{markdown:other}),/已退件/);
 assert.equal(rejected.history.at(-1).action,'reject');
});

const cli=(ledgerPath,...args)=>spawnSync(process.execPath,['scripts/manage-story-production.mjs',...args,'--ledger',ledgerPath],{cwd:new URL('..',import.meta.url),encoding:'utf8'});
const ok=result=>{assert.equal(result.status,0,result.stderr);return JSON.parse(result.stdout)};
const fail=(result,pattern)=>{assert.equal(result.status,1,result.stdout);assert.match(result.stderr,pattern)};

test('batch11 CLI revision, lock contention, report guard and two Git copies',t=>{
 const dir=mkdtempSync(join(tmpdir(),'teacher-ledger-git-'));
 t.after(()=>rmSync(dir,{recursive:true,force:true}));
 function git(cwd,...args){
  return spawnSync('git',['-c','user.name=Ledger Test','-c','user.email=ledger@example.invalid','-c','commit.gpgsign=false','-C',cwd,...args],{encoding:'utf8'});
 }
 function run(cwd,...args){
  const result=git(cwd,...args);assert.equal(result.status,0,result.stderr);return result.stdout.trim();
 }
 run(dir,'init','--bare','remote');
 run(dir,'clone','remote','a');
 const a=join(dir,'a'),b=join(dir,'b'),ledgerA=join(a,'ledger.json'),ledgerB=join(b,'ledger.json');
 let L=prop(initialProductionLedger(),draft()).ledger;
 L=prop(L,draft('T-DRAFT-002','S0002'),'T-DRAFT-002').ledger;
 const start=JSON.stringify(L);
 writeFileSync(ledgerA,start);
 run(a,'add','ledger.json');run(a,'commit','-m','baseline');run(a,'push','origin','HEAD:refs/heads/main');
 run(dir,'clone','--branch','main','remote','b');
 const baseline=run(b,'rev-parse','HEAD:ledger.json');
 const take=(ref,owner='ChatGPT')=>['reserve','--ref',ref,'--owner',owner,'--seed','S0001','--reason',reason];
 const apply=['--apply','--expect-revision','2'];
 const first=take('T-DRAFT-001'),second=take('T-DRAFT-002');
 assert.equal(ok(cli(ledgerA,...first)).applied,false);
 fail(cli(ledgerA,...first,'--apply'),/expect-revision/);
 fail(cli(ledgerA,...take('T-DRAFT-001','Other'),...apply),/原登記負責者/);
 fail(cli(ledgerA,'audit','--json',ledgerA),/不得覆寫/);
 const lockfile=ledgerA+'.lock';
 writeFileSync(lockfile,'other writer');
 fail(cli(ledgerA,...first,...apply),/EEXIST/);
 assert.equal(readFileSync(lockfile,'utf8'),'other writer');
 assert.equal(readFileSync(ledgerA,'utf8'),start);
 rmSync(lockfile);
 assert.equal(ok(cli(ledgerA,...first,...apply)).progress.revision,3);
 const saved=readFileSync(ledgerA,'utf8');
 fail(cli(ledgerA,...first,...apply),/只能對尚未暫用|修訂版已改變/);
 fail(cli(ledgerA,...second,...apply),/種子已被暫用|修訂版已改變/);
 const release=['release','--ref','T-DRAFT-001','--owner','ChatGPT','--reason','隔離案例的種子必須退還'];
 fail(cli(ledgerA,...release,...apply),/修訂版已改變/);
 assert.equal(readFileSync(ledgerA,'utf8'),saved);
 assert.equal(existsSync(lockfile),false);
 run(a,'commit','-am','reserve A');run(a,'push','origin','HEAD:main');
 assert.equal(ok(cli(ledgerB,...second,...apply)).progress.revision,3);
 run(b,'commit','-am','reserve B');
 run(b,'fetch','origin','main');
 assert.notEqual(run(b,'rev-parse','FETCH_HEAD:ledger.json'),baseline);
 assert.equal(JSON.parse(run(b,'show','FETCH_HEAD:ledger.json')).revision,3);
 assert.match(git(b,'push','origin','HEAD:main').stderr,/non-fast-forward/);
 assert.match(git(b,'merge','FETCH_HEAD').stdout,/CONFLICT.*ledger.json/);
 assert.equal(run(a,'show','HEAD:ledger.json'),saved.trim());
});

test('batch11 audit checks both raw hashes and rejects unsafe evidence paths',t=>{
 const dir=mkdtempSync(new URL('../.ledger-audit-',import.meta.url));
 const outside=mkdtempSync(join(tmpdir(),'teacher-outside-'));
 t.after(()=>{rmSync(dir,{recursive:true,force:true});rmSync(outside,{recursive:true,force:true})});
 const story=draft(),ledger=join(dir,'ledger.json'),md=join(dir,'draft.md'),review=join(dir,'review.json');
 writeFileSync(ledger,JSON.stringify(reserve(prop(initialProductionLedger(),story).ledger).ledger));
 writeFileSync(md,story);writeFileSync(review,JSON.stringify(proof));
 const command=['lock','--ref','T-DRAFT-001','--owner','ChatGPT','--file',md,'--review',review,'--apply','--expect-revision','2'];
 assert.equal(ok(cli(ledger,...command)).change.storyId,'T1-001');
 const locked=JSON.parse(readFileSync(ledger,'utf8'));
 assert.equal(ok(cli(ledger,'audit')).audit.lockedFilesChecked,1);
 function problems(){
  const result=cli(ledger,'audit');
  assert.equal(result.status,1,result.stderr);
  return JSON.parse(result.stdout).audit.problems.map(p=>p.reason).join('\n');
 }
 writeFileSync(md,story+'\n');writeFileSync(review,JSON.stringify(proof)+'\n');
 assert.match(problems(),/完整稿 SHA256不一致[\s\S]*內容審查紀錄 SHA256不一致/);
 writeFileSync(md,story);writeFileSync(review,JSON.stringify(proof));
 writeFileSync(join(outside,'external.md'),story);
 rmSync(md);symlinkSync(join(outside,'external.md'),md);
 assert.match(problems(),/實際路徑/);
 const row=locked.candidates['T-DRAFT-001'];
 row.manuscriptPath='test/fixtures/17d-draft-sample-s0451.md';
 row.review.filePath='scripts/story-production-ledger.js';
 writeFileSync(ledger,JSON.stringify(locked));
 assert.match(problems(),/完整稿無法稽核[\s\S]*內容審查紀錄無法稽核/);
});

test('batch11 complete duplicate retrieval spans T/G and active states without semantic verdict',t=>{
 const dir=mkdtempSync(join(tmpdir(),'teacher-duplicates-'));
 t.after(()=>rmSync(dir,{recursive:true,force:true}));
 const summary={
  事件起因:'林同學遺失班費收據後家長要求說明',
  核心衝突:'家長要求公開班費明細，班級需要維護學生隱私',
  導師困境:'導師要在快速澄清和保護當事人之間決定'
 };
 const different={...summary,核心衝突:'班費支付設備造成課程預算短缺',導師困境:'導師決定延後設備採購或向行政申請預算'};
 const baseLedger=prop(initialProductionLedger(),draft()).ledger;
 const query=baseLedger.candidates['T-DRAFT-001'];
 query.summary=summary;
 const row=(ref,status,type,text,extra={})=>({...query,draftRef:ref,status,type,summary:text,...extra});
 const add=record=>{baseLedger.candidates[record.draftRef]=record};
 add(row('EXACT-001','proposed','T',Object.fromEntries(Object.entries(summary).map(([k,v])=>[k,v+'。 ']))));
 add(row('OTHER-TOPIC','reserved','T',{...summary,事件起因:summary.事件起因.replace('林','王').replace('遺失','弄丟')},
  {seedId:'S0001',date:'2026-11-04',topicId:'T1-4',poolId:'T1-4:before'}));
 add(row('REJECTED-001','rejected','T',summary));
 add(row('DIFFERENT-001','proposed','T',different));
 for(let i=0;i<10;i++)add(row('MORE-'+i,'proposed','T',{...summary,導師困境:summary.導師困境+'補充'+i}));
 const evidence=lock(reserve(prop(initialProductionLedger(),draft()).ledger).ledger,draft()).ledger.candidates['T-DRAFT-001'];
 const crossType=row('CROSS-G','locked','G',{...summary,導師困境:summary.導師困境.replace('決定','取捨')},
  {...evidence,draftRef:'CROSS-G',type:'G',topicId:null,poolId:null,date:null,storyId:'G-0001',seedId:'S0002',
   summary:{...summary,導師困境:summary.導師困境.replace('決定','取捨')}});
 const cross=duplicateCandidates(summary,{candidates:{...baseLedger.candidates,'CROSS-G':crossType}},query.draftRef);
 assert.equal(cross.find(x=>x.ref==='CROSS-G').status,'locked');
 assert.equal(cross.find(x=>x.ref==='CROSS-G').type,'G');
 assert.ok(cross.find(x=>x.ref==='OTHER-TOPIC').score>cross.find(x=>x.ref==='DIFFERENT-001').score);
 assert.equal(cross[0].ref,'EXACT-001');assert.equal(cross[0].exact,true);
 assert.equal(cross.some(x=>x.ref==='REJECTED-001'||x.ref===query.draftRef),false);
 const ledger=join(dir,'ledger.json');
 writeFileSync(ledger,JSON.stringify(baseLedger));
 const result=ok(cli(ledger,'duplicates','--ref',query.draftRef));
 assert.equal(result.possiblePairs.length,13);
 assert.deepEqual(result.possiblePairs,duplicateCandidates(summary,baseLedger,query.draftRef));
 assert.match(result.warning,/零候選也不等於自動通過/);
});

test('batch12 isolated T CLI lifecycle, failures and evidence audit',t=>{
 const dir=mkdtempSync(new URL('../.ledger-batch12-',import.meta.url));
 t.after(()=>rmSync(dir,{recursive:true,force:true}));
 const ledger=join(dir,'ledger.json'),md=join(dir,'draft.md'),summaryPath=join(dir,'summary.md'),review=join(dir,'review.json');
 const main='T-DRAFT-001',other='T-DRAFT-002',story=draft(),second=draft(other);
 writeFileSync(ledger,JSON.stringify(initialProductionLedger()));
 const read=()=>JSON.parse(readFileSync(ledger,'utf8'));
 const manage=(...args)=>cli(ledger,...args);
 const args=(action,ref,...extra)=>[action,'--ref',ref,'--owner','ChatGPT',...extra];
 const write=(action,ref,...extra)=>{
  const revision=read().revision;
  const response=ok(manage(...args(action,ref,...extra),'--apply','--expect-revision',String(revision)));
  assert.equal(response.applied,true);
  assert.equal(read().revision,revision+1);
  return response.change;
 };
 const refused=(pattern,...command)=>{
  const before=readFileSync(ledger,'utf8');
  fail(manage(...command),pattern);
  assert.equal(readFileSync(ledger,'utf8'),before);
  assert.equal(existsSync(ledger+'.lock'),false);
 };
 const refuseWrite=(pattern,action,ref,...extra)=>refused(pattern,...args(action,ref,...extra),'--apply','--expect-revision',String(read().revision));
 const check=(stage,path)=>{
  const result=spawnSync(process.execPath,['scripts/check-story-draft.mjs','--stage',stage,'--input',path],{cwd:new URL('..',import.meta.url),encoding:'utf8'});
  assert.equal(result.status,0,result.stdout+result.stderr);
 };
 const date=['--date','2026-07-20'],src=['--file',summaryPath,...date],hold=['--seed','S0001','--reason',reason];
 const lockFiles=['--file',md,'--review',review];
 const releaseReason=['--reason','隔離測試確認同一組種子能重新分派'];
 const summaryOf=text=>text.split('## 3｜')[0];
 writeFileSync(summaryPath,summaryOf(story).replace('核心衝突','缺少必要欄'));
 refuseWrite(/摘要/, 'propose',main,...src);
 writeFileSync(summaryPath,summaryOf(story));
 check('summary',summaryPath);
 refuseWrite(/故事池|窗口/, 'propose',main,'--file',summaryPath,'--date','2026-11-04');
 const before=readFileSync(ledger,'utf8');
 assert.equal(ok(manage(...args('propose',main,...src))).applied,false);
 assert.equal(readFileSync(ledger,'utf8'),before);
 assert.equal(write('propose',main,...src).seedId,null);
 assert.equal(ok(manage('available','--seed','S0001')).status,'available');
 writeFileSync(summaryPath,summaryOf(story).replaceAll(main,other));
 refuseWrite(/完全相同/, 'propose',other,...src);
 writeFileSync(summaryPath,summaryOf(second));
 assert.ok(write('propose',other,...src).similarCount>0);
 writeFileSync(md,story);
 writeFileSync(review,JSON.stringify(proof));
 refuseWrite(/已暫用/, 'lock',main,...lockFiles);
 assert.equal(write('reserve',main,...hold).seedId,'S0001');
 refuseWrite(/已被暫用/, 'reserve',other,...hold);
 assert.equal(write('release',main,...releaseReason).seedId,null);
 assert.equal(ok(manage('available','--seed','S0001')).status,'available');
 assert.equal(write('reserve',other,...hold).seedId,'S0001');
 assert.equal(write('reject',other,...releaseReason).status,'rejected');
 refuseWrite(/已存在/, 'propose',other,...src);
 refuseWrite(/已退件/, 'reserve',other,...hold);
 refused(/修訂版已改變/,...args('reserve',main,...hold),'--apply','--expect-revision','0');
 assert.equal(write('reserve',main,...hold).seedId,'S0001');
 const revised=story.replace('工作負荷累積、回覆又少','班務分工未明，工作負荷累積、回覆又少');
 writeFileSync(summaryPath,summaryOf(revised));
 assert.equal(write('revise',main,'--file',summaryPath).seedId,'S0001');
 refuseWrite(/登記內容不同/, 'lock',main,...lockFiles);
 const competing='T-DRAFT-003';
 writeFileSync(summaryPath,summaryOf(draft(competing,'S0003')));
 assert.ok(write('propose',competing,...src).similarCount>0);
 const matches=ok(manage('duplicates','--ref',main)).possiblePairs;
 assert.ok(matches.some(pair=>pair.ref===competing));
 assert.ok(matches.every(pair=>pair.ref!==other));
 writeFileSync(md,revised.split('## 5｜')[0]);
 check('choices',md);
 writeFileSync(md,revised);
 check('full',md);
 for(const [broken,pattern] of [
  [revised+'\n## 6｜第五個行動\n| E | 額外行動 |',/section_id/],
  [revised.replace('- **種子ID**：S0001','- **種子ID**：S0002'),/登記內容不同/],
  [revised.replace('- **本篇四碼**：'+seeds.get('S0001').join('／'),'- **本篇四碼**：'+seeds.get('S0002').join('／')),/seed_mismatch/],
  [revised.replace('| true |','| false |'),/emotional/],
  [revised.replace('| A | 4 | 2 | 1 |','| A | 7 | 2 | 1 |'),/matrix_weight/],
  [revised.replace('G02、G03、G10','G11、G03、G10'),/登記內容不同/]
 ]){
  assert.notEqual(broken,revised);
  writeFileSync(md,broken);
  refuseWrite(pattern,'lock',main,...lockFiles);
 }
 writeFileSync(md,revised);
 for(const [bad,pattern] of [
  [{...proof,reviewer:123},/核准者/],
  [{...proof,verdict:'pending'},/核准者/],
  [{...proof,duplicates:''},/證據不足/],
  [{...proof,ordinaryChoiceSelection:{...proof.ordinaryChoiceSelection,selectedIds:[1,1,3]}},/六選三/]
 ]){
  writeFileSync(review,JSON.stringify(bad));
  refuseWrite(pattern,'lock',main,...lockFiles);
 }
 writeFileSync(review,JSON.stringify(proof));
 const ready=readFileSync(ledger,'utf8');
 const preview=ok(manage(...args('lock',main,...lockFiles)));
 assert.equal(preview.applied,false);
 assert.equal(preview.change.storyId,null);
 assert.equal(readFileSync(ledger,'utf8'),ready);
 assert.equal(write('lock',main,...lockFiles).storyId,'T1-001');
 const status=ok(manage('status')).progress;
 assert.deepEqual(status.locked,{T:1,G:0,total:1});
 assert.deepEqual(status.seedStatus,{total:2400,unused:2399,reserved:0,locked:1});
 assert.equal(status.tagOccurrences,3);
 for(const tag of extractDraftSummary(revised).tags)assert.equal(status.tagCounts[tag],1);
 assert.equal(ok(manage('audit')).audit.lockedFilesChecked,1);
 for(const [path,source,label] of [[md,revised,'完整稿'],[review,JSON.stringify(proof),'內容審查紀錄']]){
  writeFileSync(path,source+'\n');
  const audit=manage('audit');
  assert.equal(audit.status,1);
  assert.match(JSON.parse(audit.stdout).audit.problems[0].reason,new RegExp(label+' SHA256不一致'));
  writeFileSync(path,source);
 }
 for(const action of ['revise','release','lock'])refuseWrite(/已鎖定/,action,main,...lockFiles,...releaseReason);
 assert.equal(ok(manage('audit')).audit.pass,true);
});

test('post-lock revocation keeps historical ID and SHA, restores quota and seed availability',()=>{
 const first=draft(),second=draft('T-DRAFT-002','S0001');
 const locked=lock(reserve(prop(initialProductionLedger(),first).ledger).ledger,first).ledger;
 const original=structuredClone(locked.candidates['T-DRAFT-001']);
 assert.throws(()=>act(locked,'revoke','T-DRAFT-001',{reason:'太短'}),/撤銷須附/);
 const changed=act(locked,'revoke','T-DRAFT-001',{reason:'首次進班不是公物交接責任爭議的必要成立條件'}).ledger;
 assert.equal(locked.candidates['T-DRAFT-001'].status,'locked');
 const old=changed.candidates['T-DRAFT-001'];
 assert.equal(old.status,'revoked');assert.equal(old.seedId,'S0001');assert.equal(old.storyId,'T1-001');
 assert.equal(old.manuscriptDigest,original.manuscriptDigest);assert.deepEqual(old.review,original.review);
 assert.equal(old.revocation.revision,4);assert.equal(changed.history.at(-1).action,'revoke');
 assert.equal(ledgerProgress(changed,context).locked.T,0);
 assert.equal(ledgerProgress(changed,context).seedStatus.unused,2400);
 assert.equal(ledgerProgress(changed,context).stats.revoked,1);
 assert.equal(validateLedger(changed,context).days.size,0);
 for(const action of ['revoke','revise','release','reject','reserve','lock'])
  assert.throws(()=>act(changed,action,'T-DRAFT-001',{reason:'不許重複處理歷史資料'}));
 const next=lock(reserve(prop(changed,second,'T-DRAFT-002').ledger,'T-DRAFT-002','S0001').ledger,second,'T-DRAFT-002').ledger;
 assert.equal(next.candidates['T-DRAFT-002'].storyId,'T1-002');
 assert.equal(validateLedger(next,context).usedSeeds,1);
 assert.equal(validateLedger(next,context).days.get('2026-07-20'),1);
 const collision=structuredClone(next);collision.candidates['T-DRAFT-001'].storyId='T1-002';
 assert.throws(()=>validateLedger(collision,context),/正式故事缺ID/);
 const broken=structuredClone(next);broken.candidates['T-DRAFT-001'].revocation=null;
 assert.throws(()=>validateLedger(broken,context),/撤銷作品缺少/);
});

test('T1-1 replacement 0031: all three mechanical stages and editorial review are lockable',()=>{
 const storyPath='../content/events-v1/正式成品/T/T1-高一上/T1-1-首次進班與建班/單一池/T-DRAFT-0031.md';
 const reviewPath='../content/events-v1/正式成品/T/T1-高一上/T1-1-首次進班與建班/單一池/T-DRAFT-0031.review.json';
 const manuscript=file(storyPath),reviewText=file(reviewPath),review=JSON.parse(reviewText);
 for(const stage of ['summary','choices','full']){
  const result=validate(manuscript,stage);
  assert.equal(result.mechanicalPass,true,stage+' '+JSON.stringify(result.errors));
 }
 assert.equal(review.causalMatrix.length,32);
 const ref='T-DRAFT-0031';
 const proposed=prop(initialProductionLedger(),manuscript,ref).ledger;
 const reserved=reserve(proposed,ref,'S1392').ledger;
 const out=act(reserved,'lock',ref,{
  markdown:manuscript,review,
  reviewFile:'content/events-v1/正式成品/T/T1-高一上/T1-1-首次進班與建班/單一池/T-DRAFT-0031.review.json',
  reviewDigest:createHash('sha256').update(reviewText).digest('hex'),
  manuscriptPath:'content/events-v1/正式成品/T/T1-高一上/T1-1-首次進班與建班/單一池/T-DRAFT-0031.md',
  manuscriptDigest:createHash('sha256').update(manuscript).digest('hex')
 });
 assert.equal(out.change.status,'locked');
 console.log('REPLACEMENT_SHA256',createHash('sha256').update(manuscript).digest('hex'),createHash('sha256').update(reviewText).digest('hex'));
});
