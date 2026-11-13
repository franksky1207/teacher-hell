/** 14-F1: saved annual/failure results only; never infer a grade on failure.
 * No gameplay writes, no hidden outcome projection or second assessment engine.
 */
import {ABILITY_NAMES,STATE_NAMES} from '../src/player/panel.js';
import {failureResult} from '../src/runtime/homeroom.js';
import {readSemesterReviews} from '../src/runtime/reviews.js';
import {projectNotebookTasks} from './notebook-tasks.js';

const esc=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const fmt=n=>Number.isFinite(n)?String(Math.round(n*100)/100):'—';
const names=[...ABILITY_NAMES,...STATE_NAMES];
export function projectYearResult(world){
 const history=world?.extensions?.['teacher-hell/world']?.history;
 if(!Array.isArray(history))throw new TypeError('Missing formal world history');
 const failure=failureResult(world),success=history.findLast(h=>h.type==='annual-success');
 const record=failure??success;
 if(!record)return null;
 const failed=record.type==='annual-failure',data=record.data;
 const current=world.position.serviceYear===data.year;
 const rating=failed?null:data.evidence?.rating??null;
 const reports=readSemesterReviews(world).filter(x=>x.attemptId===record.attemptId&&x.periodId.startsWith(String(world.extensions['teacher-hell/world'].plan.startYear+data.year-1)+':'));
 const events=[...new Set(reports.flatMap(x=>x.events.map(e=>e.summary).filter(Boolean)))].slice(0,10);
 const causeIds=failed?new Set(data.sourceHistoryIds??[]):new Set();
 const causes=failed?history.filter(h=>causeIds.has(h.id)&&h.type==='homeroom-result').map(h=>h.data?.description).filter(Boolean):[];
 // Pending items are only represented as a count; the independent notebook
 // remains the authority for details, deadlines and eligible actions.
 const pending=failed&&current?projectNotebookTasks(world).items.length:null;
 return {id:record.id,kind:failed?'failure':'success',year:data.year,date:data.at?.date??record.at?.date??'',
  summary:data.summary??'',grade:rating?.grade??null,score:rating?.score??null,
  comparison:Object.fromEntries(names.map(name=>[name,data.comparison?.[name]??null])),
  events,causes:[...new Set(causes)],pending,retryEligible:failed&&current,
  failureId:failed?record.id:null};
}
export function renderYearResult(result,page=0){
 if(!result||!['failure','success'].includes(result.kind)||!Number.isInteger(page)||page<0||page>3)throw new TypeError('Invalid annual result or page');
 const failed=result.kind==='failure',title=failed?'本學年導師職務中斷':'本學年正式結算',head='<p class="notebook-hint">遊玩第 '+esc(result.year)+' 學年・'+esc(result.date)+'・第 '+(page+1)+'／4 頁</p>';
 const summary=result.summary?'<p class="year-result-summary">'+esc(result.summary)+'</p>':'<p>本學年的正式結果已記錄。</p>';
 const pairs=names.map(name=>{const v=result.comparison[name];return '<tr><th scope="row">'+esc(name)+'</th><td>'+fmt(v?.start)+'</td><td>'+fmt(v?.end)+'</td><td>'+(typeof v?.delta==='number'&&v.delta>0?'+':'')+fmt(v?.delta)+'</td></tr>';}).join('');
 const causes=result.causes??[],events=result.events??[];
 const contents=[
  '<h3>'+esc(title)+'</h3>'+summary+(failed?'<p>此結果不是年度評級，也不代表相關處分一定合法。</p>':'<p>正式評等：'+esc(result.grade??'未評定')+'・分數 '+fmt(result.score)+'</p>'),
  '<h3>教師能力與狀態變化</h3><div class="year-result-table-wrap"><table class="year-result-table"><thead><tr><th>項目</th><th>學年初</th><th>結算時</th><th>變化</th></tr></thead><tbody>'+pairs+'</tbody></table></div>',
  '<h3>本學年已保存的重要紀錄</h3>'+(causes.length?'<h4>導師職務中斷的已知原因</h4><ul>'+causes.map(e=>'<li>'+esc(e)+'</li>').join('')+'</ul>':'')+
   (events.length?'<h4>學期回顧的重要事件</h4><ul>'+events.map(e=>'<li>'+esc(e)+'</li>').join('')+'</ul>':'<p>沒有可引用的已保存重要事件摘要。</p>')+
   (result.pending===null?'':'<p>目前筆記本列有 '+result.pending+' 項未完成的已知待辦，詳情仍以原本筆記本為準。</p>'),
  '<h3>'+esc(failed?'後續安排':'學年成果已保存')+'</h3>'+(failed?
   '<p>可以從當前學期的檢查點重新挑戰：上學期從暑輔第一天開始，下學期從上學期期末結算完成後接續。先前學期及學年的成果保留，本次失敗嘗試的變化會撤銷。</p><p>重試需再次確認；不會刪除其他存檔。</p>':
   '<p>本學年的正式結果已保存。接續遊戲仍依原本校曆與事件流程進行。</p>')+
   (result.retryEligible?'<p><button type="button" data-action="year-retry">確認重試本學期</button></p>':'')
 ];
 return '<section class="year-result" aria-label="'+esc(title)+'">'+head+contents[page]+'<nav class="year-result-nav" aria-label="學年結果分頁">'+
  '<button type="button" data-action="year-result-page:'+(page-1)+'" '+(page===0?'disabled':'')+'>上一頁</button>'+
  '<span>'+(page+1)+'／4</span>'+
  '<button type="button" data-action="year-result-page:'+(page+1)+'" '+(page===3?'disabled':'')+'>下一頁</button>'+
  '</nav></section>';
}
