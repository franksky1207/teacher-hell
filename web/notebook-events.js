/** Phase 14-C: the teacher's disclosed knowledge, never an omniscient event log. */
import {notebookRoster} from './notebook-roster.js';
import {readPlayerView} from '../src/runtime/views.js';
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const dateOf=moment=>typeof moment?.date==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(moment.date)?moment.date:null;
const yearOf=date=>date?date.slice(0,4):'unknown';
const termOf=date=>{if(!date)return 'unknown';const [y,m]=date.split('-').map(Number);return (m>=8?y:y-1)+':'+(m>=8?'autumn':'spring');};
const termLabel=id=>id==='unknown'?'日期未標示':id.replace(/^(\d{4}):(autumn|spring)$/,(_,year,season)=>year+'學年度'+(season==='autumn'?'上':'下')+'學期');
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
 const runtime=world.extensions['teacher-hell/world'];
 const originByFact=new Map(runtime.facts.map(f=>[f.id,f.eventId]));
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
 // Explicit retrospective layer: only objective facts that already happened.
 // The teacher-known feed remains separate; never pass NPC raw values.
 const knownIds=new Set(view.facts.map(f=>f.id));
 for(const f of runtime.facts){
  if(knownIds.has(f.id)||!f.occurredAt?.date||f.occurredAt.date>world.position.date)continue;
  entries.push({kind:'objective',learnedDate:dateOf(f.occurredAt),occurredDate:dateOf(f.occurredAt),
   text:f.description,eventId:f.eventId,subjectNames:(f.subjectIds??[]).map(id=>names.get(id)).filter(Boolean),
   causes:(f.causeIds??[]).map(id=>runtime.facts.find(previous=>previous.id===id)?.description).filter(Boolean),retrospective:true});
 }
 for(const c of view.choices??[]){
  entries.push({kind:'choice',learnedDate:dateOf(c.at),occurredDate:dateOf(c.at),eventId:c.eventId,
   text:c.optionText??c.text??'曾作出正式事件選擇',subjectNames:[]});
 }
 // Sort by the date the teacher could know about it, not the hidden event chronology.
 entries.sort((a,b)=>(b.learnedDate??'').localeCompare(a.learnedDate??'')||(a.kind===b.kind?0:a.kind==='fact'?-1:1));
 return {entries,currentTerm:termOf(world.position.date)};
}
export function renderNotebookEvents(data,{year='all',kind='all',page=1,search='',mode='time',term=null}={}){
 if(!data||!Array.isArray(data.entries))throw new TypeError('Invalid event notebook projection');
 if(typeof search!=='string'||!['time','event'].includes(mode))throw new RangeError('Invalid event query');
 if(!['all','fact','claim','objective','choice'].includes(kind)||typeof year!=='string'||!Number.isSafeInteger(page)||page<1)throw new RangeError('Invalid event history filter');
 const years=[...new Set(data.entries.map(e=>yearOf(e.learnedDate)))].sort((a,b)=>b.localeCompare(a));
 if(year!=='all'&&!years.includes(year))throw new RangeError('Unknown event history year');
 const terms=[...new Set(data.entries.map(e=>termOf(e.learnedDate)))].sort((a,b)=>b.localeCompare(a));
 const selectedTerm=term??(terms.includes(data.currentTerm)?data.currentTerm:'all');
 if(selectedTerm!=='all'&&!terms.includes(selectedTerm)&&selectedTerm!=='unknown')throw new RangeError('Unknown term');
 const periodMatches=e=>selectedTerm==='all'||termOf(e.learnedDate)===selectedTerm;
 const matches=e=>(kind==='all'||e.kind===kind)&&(year==='all'||yearOf(e.learnedDate)===year)&&periodMatches(e)&&[e.text,e.sourceName,e.belief,...(e.subjectNames??[])].some(v=>String(v??'').includes(search));
 const matched=data.entries.filter(matches);
 // In event mode, a matching stage reveals the full already-disclosed development
 // of that same event across terms, without surfacing undisclosed backstage facts.
 const relevantIds=new Set(mode==='event'?matched.map(e=>e.eventId).filter(Boolean):[]);
 const filtered=mode==='event'?data.entries.filter(e=>matches(e)||e.eventId&&relevantIds.has(e.eventId)):matched;
 if(mode==='event')filtered.sort((a,b)=>String(a.eventId??a.text).localeCompare(String(b.eventId??b.text),'zh-Hant')||(a.learnedDate??'').localeCompare(b.learnedDate??''));
 const pages=Math.max(1,Math.ceil(filtered.length/EVENT_PAGE_SIZE));
 const actualPage=Math.min(page,pages);
 const visible=filtered.slice((actualPage-1)*EVENT_PAGE_SIZE,actualPage*EVENT_PAGE_SIZE);
 const choose=(label,action,active)=>`<button type="button" data-action="${action}" class="${active?'notebook-history-active':''}" aria-pressed="${active}">${esc(label)}</button>`;
 const yearOptions=['all',...years].map(y=>choose(y==='all'?'全部年份':y==='unknown'?'日期未標示':y+' 年','notebook-event-year:'+y,year===y)).join('');
 const kinds=[['all','全部'],['fact','已知事實'],['claim','已知說法'],['objective','歷史客觀事實'],['choice','教師決策']].map(([id,label])=>choose(label,'notebook-event-kind:'+id,kind===id)).join('');
 const termOptions=['all',...terms].map(t=>choose(t==='all'?'全部學期':termLabel(t),'notebook-event-term:'+t,selectedTerm===t)).join('');
 const cards=visible.map(e=>{
  const date=e.learnedDate??'日期未標示';
  const summary=['fact','objective','choice'].includes(e.kind)
   ?(e.occurredDate&&e.occurredDate!==e.learnedDate?`<span>事情發生：${esc(e.occurredDate)}</span>`:'')
   :`<span>來源：${esc(e.sourceName??'來源未標示')}</span><span>${esc(e.belief??'紀錄中態度未標示')}</span>`;
  return `<article class="notebook-history-item"><div class="notebook-history-meta"><span>${esc(date)} 得知</span>${e.subjectNames?.length?`<span>相關人物：${esc(e.subjectNames.join('、'))}</span>`:''}<strong>${({fact:'已知事實',claim:'已知說法',objective:'歷史客觀事實（當時未公開）',choice:'教師決策'})[e.kind]??'歷史紀錄'}</strong>${summary}</div><p>${esc(e.text)}</p>${e.causes?.length?`<p>已發生的前因：${esc(e.causes.join('；'))}</p>`:''}</article>`;
 }).join('');
 const pagination=`<nav class="notebook-history-pagination" aria-label="事件紀錄分頁"><button type="button" data-action="notebook-event-page:${actualPage-1}" ${actualPage===1?'disabled':''}>上一頁</button><span>${actualPage}／${pages}</span><button type="button" data-action="notebook-event-page:${actualPage+1}" ${actualPage===pages?'disabled':''}>下一頁</button></nav>`;
 return `<section class="notebook-history" aria-label="已知事件歷史"><p class="notebook-hint">依日期查看已知發展及分層歷史回顧；客觀幕後紀錄不等於教師當時知情，人物說法不等於事實。重要事件回顧於學期回顧分類呈現。</p><div class="notebook-history-kinds"><button type="button" data-action="notebook-event-view:time" aria-pressed="${mode==='time'}">依時間</button><button type="button" data-action="notebook-event-view:event" aria-pressed="${mode==='event'}">依事件內容</button></div><label class="notebook-search-label">搜尋紀錄 <input type="search" data-notebook-search="events" aria-label="搜尋歷史紀錄" value="${esc(search)}" placeholder="摘要、說法、來源"></label><div class="notebook-history-years" aria-label="選擇學期">${termOptions}</div><div class="notebook-history-years" aria-label="選擇年份">${yearOptions}</div><div class="notebook-history-kinds" aria-label="紀錄類型">${kinds}</div><p class="notebook-history-count">符合條件：${filtered.length} 筆</p><div class="notebook-history-items">${cards||'<p>目前沒有符合條件的已知紀錄。</p>'}</div>${pagination}</section>`;
}
