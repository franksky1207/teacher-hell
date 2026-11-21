import {
 filterStories, selectOptions, neighboringIds, sanitizeReaderPreferences, topicDisplayName, poolDisplayName,
 safeDetailPath, validateReaderIndex, validateReaderDetail, readerTechnicalTables, READER_STATES, projectReaderText, renderStoryText, SCHOOL_SUBJECTS
} from './reader-core.js?v=862d8c1a604c8ccee4be49d8a5c74bb16ecb6c17';

const $=id=>document.getElementById(id);
const state={previewSubject:'數學',all:[],filtered:[],selected:null,detail:null,request:0,cache:new Map(),
  filters:{query:'',semester:'',topic:'',pool:''},prefs:sanitizeReaderPreferences()};
const PREF_KEY='teacher-hell-story-reader-prefs-v1';
const LAST_KEY='teacher-hell-story-reader-last-v1';
const DATA_BASE=new URL('./data/',import.meta.url);
const $status=$('reader-status');
const make=(tag,className,text)=>{
 const node=document.createElement(tag);
 if(className)node.className=className;
 if(text!==undefined)node.textContent=String(text);
 return node;
};
const setText=(id,text)=>{$(id).textContent=text??''};
function stored(key){
 try{return localStorage.getItem(key)}catch{return null}
}
function save(key,value){try{localStorage.setItem(key,value)}catch{}}
function preferences(){
 try{state.prefs=sanitizeReaderPreferences(JSON.parse(stored(PREF_KEY)||'{}'))}
 catch{state.prefs=sanitizeReaderPreferences()}
 document.body.dataset.theme=state.prefs.theme;
 document.documentElement.style.setProperty('--reading-size',state.prefs.size+'px');
 $('theme').value=state.prefs.theme;
 setText('font-size',state.prefs.size);
}
function updatePrefs(changes){
 state.prefs=sanitizeReaderPreferences({...state.prefs,...changes});
 save(PREF_KEY,JSON.stringify(state.prefs));
 preferences();
}
function setStatus(message,{error=false}={}){
 $status.textContent=message;
 $status.style.color=error?'#b44337':'';
}
function appendLabelValue(parent,label,value){
 const wrap=make('div','detail-list-item');
 const strong=make('strong','',label+'：');
 const span=make('span','',value??'');
 wrap.append(strong,span);
 parent.append(wrap);
 return wrap;
}
function addSummary(detail){
 const root=$('summary-content');root.replaceChildren();
 const data=detail.summary??{};
 for(const label of ['事件起因','核心衝突','導師困境','故事獨特性']){
  const row=make('div','summary-row'),dt=make('dt','',label),dd=make('dd','',data[label]??'');
  row.append(dt,dd);root.append(row);
 }
 if(detail.requiredConditions){
  const row=make('div','summary-row'),dt=make('dt','','必要條件'),dd=make('dd','',detail.requiredConditions);
  row.append(dt,dd);root.append(row);
 }
}
function addOptions(detail){
 const root=$('options-content');root.replaceChildren();
 for(const option of detail.options){
  const card=make('div','option-block');
  const label=make('div','option-label');
  label.append(make('strong','',option.id),make('span','',option.text));
  card.append(label);
  const extra=make('div','option-extra');
  appendLabelValue(extra,'已完成行動',option.action||'無');
  appendLabelValue(extra,'取捨',option.tradeoff||'無');
  if(option.emotional)appendLabelValue(extra,'情緒選項','是');
  card.append(extra);root.append(card);
 }
}
function addResults(detail){
 const root=$('results-content');root.replaceChildren();
 for(const result of detail.results){
  const card=make('section','result-block');
  const label=make('div','result-label');
  label.append(make('strong','',result.id),make('span','',result.title));
  card.append(label,make('p','result-main',result.text));
  const extra=make('div','result-extra');
  appendLabelValue(extra,'客觀後果',result.consequence||'無');
  card.append(extra);root.append(card);
 }
}
function technicalTable(headers,records,{firstHeader='結果'}={}){
 const scroll=make('div','matrix-scroller');
 const table=make('table','matrix technical-table');
 const thead=make('thead'),head=make('tr');
 for(const label of [firstHeader,...headers])head.append(make('th','',label));
 thead.append(head);table.append(thead);
 const tbody=make('tbody');
 for(const record of records){
  const tr=make('tr');
  tr.append(make('th','',record.label));
  for(const value of record.values){
   const text=value===null?'—':String(value);
   const cell=make('td','',text);
   if(typeof value==='number'){
    cell.classList.add(value>0?'delta-positive':value<0?'delta-negative':'delta-neutral');
    cell.textContent=value>0?'+'+value:String(value);
   }
   tr.append(cell);
  }
  tbody.append(tr);
 }
 table.append(tbody);scroll.append(table);
 return scroll;
}
function addTechnical(detail){
 const root=$('technical-content');root.replaceChildren();
 const tags=detail.tags?.join('、')||'無';
 const info=make('div','detail-list');
 for(const [label,value] of [
  ['正式故事ID',detail.storyId],
  ['類型／主題',detail.type+'／'+(detail.topicId||'無')],
  ['正式故事池',detail.poolId||'無'],['配額日期',detail.quotaDate||'無'],
  ['四碼種子',detail.seedId||'無'],['G分類標籤',tags]
 ])appendLabelValue(info,label,value);
 root.append(info,make('h4','','4×8 因果權重矩陣'));
 const matrixRows=['A','B','C','D'].map(id=>({label:id,values:detail.matrix?.[id]??[]}));
 // Display 4/2/1/0 as relative weights, never as percentages.
 root.append(technicalTable(['R1','R2','R3','R4','R5','R6','R7','R8'],matrixRows,{firstHeader:'選項'}));
 root.append(make('p','technical-hint','權重說明：4＝高、2＝中、1＝低、0＝不可達；每個選項各自換算機率，不是百分比。'));

 const parsed=readerTechnicalTables(detail.results);
 root.append(make('h4','','教師四狀態｜八結果對照'));
 root.append(technicalTable(READER_STATES,parsed.rows.map(x=>({
  label:x.id,values:x.stateValues??READER_STATES.map(()=>null)
 }))));
 root.append(make('p','technical-hint','＋表示增加，−表示減少，0表示不變；此表列的是原稿結算值，不是故事抽中機率。'));

 root.append(make('h4','','NPC 四碼｜各人各結果增減'));
 if(!parsed.actors.length){
  root.append(make('p','technical-hint','這篇沒有NPC底層變動。'));
 }else{
  for(const actor of parsed.actors){
   root.append(make('h5','technical-actor',actor));
   const codes=parsed.codes.filter(code=>parsed.rows.some(x=>Object.hasOwn(x.deltaMap,actor+':'+code)));
   root.append(technicalTable(codes,parsed.rows.map(x=>({
    label:x.id,values:codes.map(code=>x.deltaMap[actor+':'+code]??(x.deltaValid?0:null))
   }))));
  }
  root.append(make('p','technical-hint','欄位為種子碼；＋／−／0依原稿逐結果列出。原稿未列出的合法增減視為0；未能解析的格式以「—」標示，應回原稿核對。'));
 }
 if(parsed.rows.some(x=>!x.deltaValid||!x.stateValues))
  root.append(make('p','technical-warning','部分數值格式未能解析，請展開原始稿檢查，系統未更動原始數值。'));


}
function setExpanded(button,expanded){
 const target=$(button.dataset.target);
 target.hidden=!expanded;
 button.setAttribute('aria-expanded',String(expanded));
 button.textContent=expanded?'收合':'展開';
}
function resetSections(){
 document.querySelectorAll('.section-toggle').forEach(button=>
  setExpanded(button,button.dataset.target!=='technical-content'));
}
function presentStory(source,record,{reset=true}={}){
 state.detail=source;
 const detail=projectReaderText(source,state.previewSubject);
 setText('story-meta',[record.type,record.topicId,record.poolId].filter(Boolean).join(' · '));
 setText('story-title',detail.title);
 setText('story-subtitle',[record.storyId,record.quotaDate].filter(Boolean).join(' · '));
 const partial=Boolean(detail.previewIssue);
 $('structured-preview').hidden=partial;
 $('source-preview').hidden=!partial;
 setText('source-preview',partial?detail.sourceMarkdown:'');
 $('story-content').hidden=false;
 if(partial){
  setStatus('此篇以原稿預覽。'+detail.previewIssue);
  return;
 }
 addSummary(detail);
 setText('opening-content',detail.opening??'');
 addOptions(detail);
 addResults(detail);
 addTechnical(detail);
 if(reset)resetSections();
 setStatus('');
}
function updateNeighbors(){
 const {previous,next}=neighboringIds(state.filtered,state.selected);
 for(const id of ['previous','previous-bottom'])$(id).disabled=!previous;
 for(const id of ['next','next-bottom'])$(id).disabled=!next;
}
function storyButton(record){
 const button=make('button','story-item');
 button.type='button';
 button.setAttribute('role','listitem');
 button.setAttribute('aria-current',String(record.storyId===state.selected));
 button.append(make('span','item-name',renderStoryText(record.title,state.previewSubject)));
 button.append(make('span','item-sub',[record.storyId,record.poolId].filter(Boolean).join(' · ')));
 button.addEventListener('click',()=>selectStory(record.storyId));
 return button;
}
function drawList(){
 $('story-list').replaceChildren();
 // Render only the index entries: no story detail is fetched until selected.
 const fragment=document.createDocumentFragment();
 for(const record of state.filtered)fragment.append(storyButton(record));
 $('story-list').append(fragment);
 setText('story-count',state.all.length+' 篇');
 setText('list-meta','符合條件 '+state.filtered.length+' 篇');
 updateNeighbors();
}
function updateSelect(id,values,formatter){
 const select=$(id),current=select.value;
 select.replaceChildren(new Option(id==='topic'?'全部主題':'全部故事池',''));
 for(const value of values)select.add(new Option(formatter?formatter(value):value,value));
 select.value=values.includes(current)?current:'';
}
function syncFilters(){
 const topics=selectOptions(state.all,'topicId',story=>
  !state.filters.semester||(state.filters.semester==='G'?
    story.type==='G':story.topicId?.split('-')[0]===state.filters.semester));
 updateSelect('topic',topics,topicDisplayName);
 state.filters.topic=$('topic').value;
 const pools=selectOptions(state.all,'poolId',story=>
  (!state.filters.semester||(state.filters.semester==='G'?
    story.type==='G':story.topicId?.split('-')[0]===state.filters.semester))&&
  (!state.filters.topic||story.topicId===state.filters.topic));
 updateSelect('pool',pools,poolDisplayName);
 state.filters.pool=$('pool').value;
 state.filtered=filterStories(state.all,state.filters);
 drawList();
}
function updateSelectionInList(){
 document.querySelectorAll('.story-item').forEach((button,i)=>
  button.setAttribute('aria-current',String(state.filtered[i]?.storyId===state.selected)));
 updateNeighbors();
}
function mobileClose(){
 if(window.matchMedia('(max-width: 850px)').matches){
  $('library').dataset.collapsed='true';
  $('mobile-list').setAttribute('aria-expanded','false');
 }
}
async function selectStory(id,{keepScroll=false}={}){
 const record=state.all.find(s=>s.storyId===id);
 if(!record)return;
 const seq=++state.request;
 state.selected=id;
 updateSelectionInList();
 $('story-content').hidden=true;
 setStatus('正在讀取「'+record.title+'」…');
 try{
  let detail=state.cache.get(id);
  if(!detail){
   const url=new URL(safeDetailPath(record.detail),DATA_BASE);
   if(state.sourceCommit)url.searchParams.set('source',state.sourceCommit);
   const response=await fetch(url,{cache:'no-store'});
   if(!response.ok)throw Error('HTTP '+response.status);
   detail=validateReaderDetail(await response.json(),record);
   // Simple bounded cache; navigation among many thousands cannot accumulate 2,400 full texts.
   if(state.cache.size>=8)state.cache.delete(state.cache.keys().next().value);
   state.cache.set(id,detail);
  }
  if(seq!==state.request)return;
  presentStory(detail,record);
  save(LAST_KEY,id);
  history.replaceState(null,'',location.pathname+location.search+'#'+encodeURIComponent(id));
  mobileClose();
  if(!keepScroll)window.scrollTo({top:0,behavior:'instant'});
 }catch(error){
  if(seq!==state.request)return;
  $('story-content').hidden=true;
  setStatus('讀取故事失敗：'+error.message+'。可重新選擇故事再試一次。',{error:true});
 }
}
function selectAdjacent(direction){
 const ids=neighboringIds(state.filtered,state.selected);
 const nextId=direction==='previous'?ids.previous:ids.next;
 if(nextId)selectStory(nextId);
}
async function bootstrap(){
 preferences();
 for(const [name,label] of [['T1','T1 高一上'],['T2','T2 高一下'],['T3','T3 高二上'],
  ['T4','T4 高二下'],['T5','T5 高三上'],['T6','T6 高三下'],['G','G 通用']]){
  $('semester').add(new Option(label,name));
 }
 const response=await fetch(new URL('./data/index.json',import.meta.url),{cache:'no-store'});
 if(!response.ok)throw Error('索引 HTTP '+response.status+'；目前尚未發布閱讀資料');
 const index=await response.json();
 state.all=validateReaderIndex(index);
 state.sourceCommit=index.sourceCommit;
 setText('catalog-warnings',(index.warnings??[]).join('；'));
 syncFilters();
 const fromHash=decodeURIComponent(location.hash.slice(1));
 const first=state.all.find(x=>x.storyId===fromHash)?.storyId||
  state.all.find(x=>x.storyId===stored(LAST_KEY))?.storyId||state.all[0]?.storyId;
 if(first)await selectStory(first,{keepScroll:true});
 else setStatus('目前尚無故事。');
}
const previewSubject=$('preview-subject');
for(const subject of SCHOOL_SUBJECTS)previewSubject.add(new Option(subject,subject));
previewSubject.value=state.previewSubject;
previewSubject.addEventListener('change',()=>{
 state.previewSubject=previewSubject.value;
 drawList();
 const record=state.all.find(story=>story.storyId===state.detail?.storyId);
 if(record?.storyId===state.selected&&state.detail)presentStory(state.detail,record,{reset:false});
});
$('theme').addEventListener('change',e=>updatePrefs({theme:e.target.value}));
$('font-less').addEventListener('click',()=>updatePrefs({size:state.prefs.size-1}));
$('font-more').addEventListener('click',()=>updatePrefs({size:state.prefs.size+1}));
$('search').addEventListener('input',e=>{state.filters.query=e.target.value;syncFilters()});
$('semester').addEventListener('change',e=>{
 state.filters.semester=e.target.value;state.filters.topic='';state.filters.pool='';
 $('topic').value='';$('pool').value='';syncFilters();
});
$('topic').addEventListener('change',e=>{
 state.filters.topic=e.target.value;state.filters.pool='';$('pool').value='';syncFilters();
});
$('pool').addEventListener('change',e=>{state.filters.pool=e.target.value;syncFilters()});
$('clear-filters').addEventListener('click',()=>{
 state.filters={query:'',semester:'',topic:'',pool:''};
 $('search').value='';$('semester').value='';$('topic').value='';$('pool').value='';
 syncFilters();
});
for(const id of ['previous','previous-bottom'])$(id).addEventListener('click',()=>selectAdjacent('previous'));
for(const id of ['next','next-bottom'])$(id).addEventListener('click',()=>selectAdjacent('next'));
document.querySelectorAll('.section-toggle').forEach(button=>
 button.addEventListener('click',()=>setExpanded(button,button.getAttribute('aria-expanded')!=='true')));
$('mobile-list').addEventListener('click',()=>{
 const expanded=$('library').dataset.collapsed==='true';
 $('library').dataset.collapsed=expanded?'false':'true';
 $('mobile-list').setAttribute('aria-expanded',String(expanded));
 if(expanded)$('search').focus();
});
if(window.matchMedia('(max-width: 850px)').matches)$('library').dataset.collapsed='true';
bootstrap().catch(error=>setStatus('無法載入故事庫：'+error.message,{error:true}));
