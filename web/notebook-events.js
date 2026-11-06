/** Phase 14-C: the teacher's disclosed knowledge, never an omniscient event log. */
import {notebookRoster} from './notebook-roster.js';
import {readPlayerView} from '../src/runtime/views.js';
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const dateOf=moment=>typeof moment?.date==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(moment.date)?moment.date:null;
const yearOf=date=>date?date.slice(0,4):'unknown';
const attitudes={believed:'紀錄中採信',uncertain:'尚待確認',rejected:'紀錄中未採信'};
export const EVENT_PAGE_SIZE=12;
export function projectNotebookEvents(world){
 const view=readPlayerView(world),roster=notebookRoster(world);
 const names=new Map();
 for(const student of roster?.students??[]){
  names.set(student.id,student.name);
  for(const caregiver of student.caregivers??[])names.set(caregiver.id,caregiver.name);
 }
 names.set(world.identity.playerId,'老師');
 const originByFact=new Map(world.extensions['teacher-hell/world'].facts.map(f=>[f.id,f.eventId]));
 const entries=[],seenFacts=new Set(),seenClaims=new Set();
 for(const f of view.facts){
  if(seenFacts.has(f.id))continue;
  seenFacts.add(f.id);
  entries.push({kind:'fact',learnedDate:dateOf(f.learnedAt),
   occurredDate:dateOf(f.occurredAt),text:f.description,eventId:originByFact.get(f.id)??null,subjectNames:(f.subjectIds??[]).map(id=>names.get(id)).filter(Boolean)});
 }
 for(const c of view.claims){
  const key=JSON.stringify([c.claimId,c.versionId]);
  if(seenClaims.has(key))continue;
  seenClaims.add(key);
  entries.push({kind:'claim',learnedDate:dateOf(c.acquiredAt),occurredDate:null,
   text:c.statement,sourceName:names.get(c.sourceId)??'來源未標示',
   belief:attitudes[c.belief]??'紀錄中態度未標示'});
 }
 // Sort by the date the teacher could know about it, not the hidden event chronology.
 entries.sort((a,b)=>(b.learnedDate??'').localeCompare(a.learnedDate??'')||(a.kind===b.kind?0:a.kind==='fact'?-1:1));
 return {entries};
}
export function renderNotebookEvents(data,{year='all',kind='all',page=1,search='',mode='time'}={}){
 if(!data||!Array.isArray(data.entries))throw new TypeError('Invalid event notebook projection');
 if(typeof search!=='string'||!['time','event'].includes(mode))throw new RangeError('Invalid event query');
 if(!['all','fact','claim'].includes(kind)||typeof year!=='string'||!Number.isSafeInteger(page)||page<1)throw new RangeError('Invalid event history filter');
 const years=[...new Set(data.entries.map(e=>yearOf(e.learnedDate)))].sort((a,b)=>b.localeCompare(a));
 if(year!=='all'&&!years.includes(year))throw new RangeError('Unknown event history year');
 const filtered=data.entries.filter(e=>(kind==='all'||e.kind===kind)&&(year==='all'||yearOf(e.learnedDate)===year)&&[e.text,e.sourceName,e.belief,...(e.subjectNames??[])].some(v=>String(v??'').includes(search)));
 if(mode==='event')filtered.sort((a,b)=>String(a.eventId??a.text).localeCompare(String(b.eventId??b.text),'zh-Hant')||(a.learnedDate??'').localeCompare(b.learnedDate??''));
 const pages=Math.max(1,Math.ceil(filtered.length/EVENT_PAGE_SIZE));
 const actualPage=Math.min(page,pages);
 const visible=filtered.slice((actualPage-1)*EVENT_PAGE_SIZE,actualPage*EVENT_PAGE_SIZE);
 const choose=(label,action,active)=>`<button type="button" data-action="${action}" class="${active?'notebook-history-active':''}" aria-pressed="${active}">${esc(label)}</button>`;
 const yearOptions=['all',...years].map(y=>choose(y==='all'?'全部年份':y==='unknown'?'日期未標示':y+' 年','notebook-event-year:'+y,year===y)).join('');
 const kinds=[['all','全部'],['fact','已知事實'],['claim','已知說法']].map(([id,label])=>choose(label,'notebook-event-kind:'+id,kind===id)).join('');
 const cards=visible.map(e=>{
  const date=e.learnedDate??'日期未標示';
  const summary=e.kind==='fact'
   ?(e.occurredDate&&e.occurredDate!==e.learnedDate?`<span>事情發生：${esc(e.occurredDate)}</span>`:'')
   :`<span>來源：${esc(e.sourceName??'來源未標示')}</span><span>${esc(e.belief??'紀錄中態度未標示')}</span>`;
  return `<article class="notebook-history-item"><div class="notebook-history-meta"><span>${esc(date)} 得知</span>${e.subjectNames?.length?`<span>相關人物：${esc(e.subjectNames.join('、'))}</span>`:''}<strong>${e.kind==='fact'?'已知事實':'已知說法'}</strong>${summary}</div><p>${esc(e.text)}</p></article>`;
 }).join('');
 const pagination=`<nav class="notebook-history-pagination" aria-label="事件紀錄分頁"><button type="button" data-action="notebook-event-page:${actualPage-1}" ${actualPage===1?'disabled':''}>上一頁</button><span>${actualPage}／${pages}</span><button type="button" data-action="notebook-event-page:${actualPage+1}" ${actualPage===pages?'disabled':''}>下一頁</button></nav>`;
 return `<section class="notebook-history" aria-label="已知事件歷史"><p class="notebook-hint">依教師得知日期排序，可查閱不同年份的已知紀錄；說法不等於已證實的事實。重要事件回顧於學期回顧分類呈現。</p><div class="notebook-history-kinds"><button type="button" data-action="notebook-event-view:time" aria-pressed="${mode==='time'}">依時間</button><button type="button" data-action="notebook-event-view:event" aria-pressed="${mode==='event'}">依事件內容</button></div><label class="notebook-search-label">搜尋紀錄 <input type="search" data-notebook-search="events" aria-label="搜尋歷史紀錄" value="${esc(search)}" placeholder="摘要、說法、來源"></label><div class="notebook-history-years" aria-label="選擇年份">${yearOptions}</div><div class="notebook-history-kinds" aria-label="紀錄類型">${kinds}</div><p class="notebook-history-count">符合條件：${filtered.length} 筆</p><div class="notebook-history-items">${cards||'<p>目前沒有符合條件的已知紀錄。</p>'}</div>${pagination}</section>`;
}
