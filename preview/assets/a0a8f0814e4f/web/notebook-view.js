import {renderNotebookReviews,renderNotebookCareer} from './notebook-reviews.js';
import {renderNotebookAcademics} from './notebook-academics.js';
import {renderNotebookEvents} from './notebook-events.js';
import {renderNotebookPeople} from './notebook-people.js';
import {renderNotebookTasks} from './notebook-tasks.js';
/** Read-only notebook composition; only prevalidated public projections enter this view. */
const esc=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export const NOTEBOOK_TABS=Object.freeze([
 {id:'people',label:'人物',description:'人物與已知關係'},
 {id:'events',label:'歷史紀錄',description:'時間及事件回顧'},
 {id:'tasks',label:'待辦事項',description:'尚未完成的正式責任'}
]);
const HISTORY_SECTIONS=Object.freeze([{id:'events',label:'時間／事件'},{id:'academics',label:'學業成績'},{id:'semesters',label:'學期與學年'},{id:'career',label:'生涯結局'}]);
export function renderNotebookView({date,grade,readonly=false,tab='people',people=null,selectedPersonId=null,personCategory='student',personSearch='',events=null,eventYear='all',eventKind='all',eventPage=1,eventSearch='',eventView='time',eventTerm=null,academics=null,reviews=null,selectedReview=null,career=null,tasks=null,portrait=null}){
 if(typeof date!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(date)||![1,2,3].includes(grade))throw new TypeError('Invalid notebook public context');
 const chosen=NOTEBOOK_TABS.find(x=>x.id===tab)||HISTORY_SECTIONS.find(x=>x.id===tab);
 if(!chosen)throw new RangeError('Unknown notebook tab');
 const section=tab==='people'?'people':tab==='tasks'?'tasks':'events';
 const tabs=NOTEBOOK_TABS.map(item=>`<button type="button" role="tab" id="notebook-tab-${item.id}" aria-controls="notebook-content" aria-selected="${item.id===section}" data-action="notebook-tab:${item.id}" class="notebook-tab${item.id===section?' notebook-tab--active':''}">${esc(item.label)}</button>`).join('');
 const innerTabs=section==='events'?'<nav class="notebook-subtabs" aria-label="歷史分類">'+HISTORY_SECTIONS.map(t=>`<button type="button" data-action="notebook-tab:${t.id}" aria-pressed="${tab===t.id}">${esc(t.label)}</button>`).join('')+'</nav>':'';
 const body=tab==='people'&&people?renderNotebookPeople(people,selectedPersonId,personSearch,personCategory,portrait)
  :tab==='tasks'&&tasks?renderNotebookTasks(tasks)
  :tab==='events'&&events?renderNotebookEvents(events,{year:eventYear,kind:eventKind,page:eventPage,search:eventSearch,mode:eventView,term:eventTerm})
  :tab==='academics'&&academics?renderNotebookAcademics(academics)
  :tab==='semesters'&&reviews?renderNotebookReviews(reviews,selectedReview)
  :tab==='career'&&career?renderNotebookCareer(career)
  :`<div class="notebook-empty"><h3>${esc(chosen.label)}</h3><p>${esc(chosen.description)}</p><p>正在查閱正式保存紀錄。</p></div>`;

 return `<div class="notebook" aria-label="筆記本"><nav class="notebook-tabs" role="tablist" aria-label="筆記本分類">${tabs}</nav><section class="notebook-content" id="notebook-content" role="tabpanel" aria-labelledby="notebook-tab-${section}">${innerTabs}${body}</section></div>`;
}
