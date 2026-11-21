import {contextMusic,eventMusic,slotActivityKinds} from './music-context.js';
import {AVG_DEMO_DETAIL,AVG_DEMO_ID} from './story-performance-demo.js';
export {AVG_DEMO_ID};
import {compileStoryPreview} from '../src/runtime/story-preview-content.js';
import {calendarDay,CALENDAR_VERSION,gradeAt} from '../src/calendar/calendar.js';
import {selectScene} from './scene-context.js';
import {projectStoryScene} from './story-scene.js';
import {renderStoryView} from './story-view.js';
import {renderPreviewCastControls,previewCastWorld,overridePreviewAdultArt} from './story-preview-cast.js';

const esc=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const validId=id=>typeof id==='string'&&/^(?:T[1-6]-\d+|G-\d+|P[1-6]-\d+)$/.test(id);
const hasIds=(items,ids)=>Array.isArray(items)&&items.length===ids.length&&ids.every(id=>items.some(item=>item?.id===id&&typeof item.text==='string'));

export async function loadStoryIndex(base){
 const index=await readJson(new URL('index.json',base));
 if(index?.schemaVersion!==1||!Array.isArray(index.stories)||index.count!==index.stories.length)throw Error('故事索引格式不符');
 const ids=new Set();
 for(const item of index.stories){
  if(!validId(item.storyId)||ids.has(item.storyId)||item.detail!=='stories/'+item.storyId+'.json')throw Error('故事索引格式不符');
  ids.add(item.storyId);
 }
 return index.stories;
}

export async function loadStoryPreview(base,summary){
 if(!validId(summary.storyId))throw Error('故事編號不符');
 const detail=await readJson(new URL('stories/'+summary.storyId+'.json',base));
 if(detail?.storyId!==summary.storyId||typeof detail.opening!=='string'||
  !hasIds(detail.options,[...'ABCD'])||!hasIds(detail.results,Array.from({length:8},(_,i)=>'R'+(i+1))))throw Error('這篇故事的開場、四個選項或八種結果不完整');
 return preparePreview(detail);
}

export function loadAvgDemo(){return preparePreview(AVG_DEMO_DETAIL);}

function preparePreview(detail){
 const preview={detail,...compileStoryPreview(detail)};
 return {...preview,sample:sampleWorld(preview)};
}

async function readJson(url){
 const response=await fetch(url);
 if(!response.ok)throw Error('無法讀取故事資料（'+response.status+'）');
 return response.json();
}

function sampleWorld(preview){
 // The published reader has no player or saved cast. Bind declared slots to
 // isolated sample identities, then use the same identity-to-art projection.
 const {detail,slots}=preview;
 const date=detail.quotaDate??null;
 const year=date?Number(date.slice(0,4)):null;
 const semester=Number(detail.topicId?.[1]);
 const grade=Number.isInteger(semester)&&semester>=1&&semester<=6?Math.ceil(semester/2):1;
 const day=date?calendarDay(date,grade,CALENDAR_VERSION):null;
 const startYear=day?year-grade+1-(gradeAt(date,year)===1?0:1):null;
 const slot=day?.slots.find(s=>s.id==='early')??day?.slots[0];
 const initial=Array.from({length:40},(_,i)=>'avg-preview-student-'+i);
 const actors=new Map([['teacher','avg-preview-teacher']]);
 const profiles={},people={};
 const names={student:'學生',guardian:'家長',staff:'教職員'};
 const counts={student:0,guardian:0,staff:0};
 let start=0;
 for(const char of detail.storyId)start=(Math.imul(start,31)+char.charCodeAt(0))>>>0;
 for(const [role,kind] of slots){
  const number=counts[kind]++;
  const id=kind==='student'&&number<40?initial[(start+number)%40]:'avg-preview-'+detail.storyId+'-'+role;
  actors.set(role,id);
  profiles[id]={displayName:'試演'+names[kind]+String.fromCharCode(65+number)};
  people[id]={kind};
 }
 const world={identity:{playerId:actors.get('teacher')},position:date&&slot?{date,slotId:slot.id}:null,
  extensions:{'teacher-hell/world':{plan:{startYear,calendarVersion:CALENDAR_VERSION}}},
  numeric:{evolution:{world:{people,registry:{homeClassId:'avg-preview-class',cohorts:[{classId:'avg-preview-class',initialStudentIds:initial}],profiles}}}}};
 return {world,actors,profiles,context:{slotId:slot?.id,dayKind:day?.kind,grade,termId:day?.term?.id??day?.courseSemesterId,
  activityKinds:slotActivityKinds(day,slot?.id)}};
}

export function storyPreviewProjection(preview,state){
 const {detail,pages,results}=preview;
 const resultIndex=state.showingResult?detail.results.findIndex(item=>item.id===state.resultId):-1;
 const group=resultIndex>=0?(preview.resultPages?.[resultIndex]??[results[resultIndex]]):null;
 const resultPage=Math.max(0,Math.min(group?.length-1??0,state.resultPage??0));
 const result=group?.[resultPage]??null;
 const page=result??pages[state.page];
 const last=state.page===pages.length-1;
 const chosen=detail.options.find(option=>option.id===state.selected);
 const {world,actors,profiles,context}=previewCastWorld(preview,state.castSelection)??sampleWorld(preview);
 const display=text=>text.replace(/\{\{\s*([a-z][a-z0-9_]*)\.name\s*\}\}/g,(token,role)=>{
  if(role==='teacher')return '老師';
  return profiles[actors.get(role)]?.displayName??token;
 }).replace(/\{\{\s*teacher\.subject\s*\}\}/g,'數學');
 const boundPage={...page,text:display(page.text),speaker:actors.get(page.speaker)??null,
  cast:page.cast.map(actor=>({...actor,actorId:actors.get(actor.role)}))};
 const sceneView=overridePreviewAdultArt(projectStoryScene(world,{page:boundPage}),actors,preview.slots,state.castSelection);
 if(!page.speaker&&page.label&&!result)sceneView.speaker=display(page.label);
 const entry=selectScene({...context,sceneTag:page.scene});
 let chatMessages;
 if(page.presentation==='chat'){
  let first=result?resultPage:state.page;
  const sequence=result?group:pages;
  while(first>0&&sequence[first-1].presentation==='chat')first--;
  chatMessages=sequence.slice(first,(result?resultPage:state.page)+1).map(message=>({
   speaker:message.speaker==='teacher'?'老師':profiles[actors.get(message.speaker)]?.displayName??'訊息',
   text:display(message.text),own:message.speaker==='teacher'
  }));
 }
 return {entry,page,view:{page:boundPage,sceneView,chatMessages,pageIndex:result?resultPage:state.page,pageCount:result?group.length:pages.length,
  canPrevious:result?resultPage>0:!chosen&&state.page>0,canNext:result?resultPage<group.length-1:!last,
  choices:!result&&last&&!chosen?detail.options.map(option=>({...option,text:display(option.text)})):[],
  confirmation:!result&&chosen?{optionId:chosen.id,text:display(chosen.text)}:null}};
}

export function renderStoryPerformancePreview(state,modeControl){
 const working=state.loading;
 const options=state.index.map(item=>`<option value="${item.storyId}"${item.storyId===state.storyId?' selected':''}>${esc(item.storyId+'｜'+item.title)}</option>`).join('');
 const projection=state.preview?storyPreviewProjection(state.preview,state):null;
 const available=projection?.page.annotated?'本頁已套用演出標記。角色與時段採試演設定。':
  state.preview?.hasAnnotations?'本頁沒有新的演出標記。':'這篇尚未提供演出標記。可閱讀文字及測試四個選項與八種結果。';
 const resultControl=state.showingResult?`<label>故事結果 <select data-avg-result>${state.preview.detail.results.map(r=>
  `<option value="${r.id}"${state.resultId===r.id?' selected':''}>${esc(r.id+'｜'+r.title)}</option>`).join('')}</select></label>
  <button type="button" data-action="avg-back-opening">回到開場</button>`:'';
 const activeId=state.preview?.detail.storyId;
 const demo=state.storyId===AVG_DEMO_ID;
 const activeLabel=activeId===AVG_DEMO_ID?'完整演出示範':activeId;
 const startLabel=state.storyId===activeId?'重新開始':'開始測試';
 const published=options||`<option disabled>${state.indexLoading?'載入中…':'目前無可選故事'}</option>`;
 const sample=state.preview?.sample;
 const music=eventMusic(state.preview?.music,contextMusic(sample?.context));
 return {music,entry:projection?.entry,html:`<main class="game game--story ui2-preview avg-story-preview">
  <div class="top">${modeControl}</div>
  <nav class="ui2-preview-tools" aria-label="正式故事測試">
   <label>試演內容 <select data-avg-story${working?' disabled':''}>
    <option value="${AVG_DEMO_ID}"${demo?' selected':''}>完整演出示範</option>
    <optgroup label="已發布正式故事">${published}</optgroup>
   </select></label>
   ${state.preview?.detail.storyId===state.storyId?renderPreviewCastControls(state.preview,state.castSelection):''}
   <button type="button" data-action="avg-start"${working?' disabled':''}>${startLabel}</button>
   ${state.indexError?'<button type="button" data-action="avg-reload-index">重新載入正式故事</button>':''}
   ${resultControl}
   <button type="button" data-action="dev-center">返回測試中心</button>
  </nav>
  ${projection?renderStoryView(projection.view):'<section class="avg-preview-empty">選擇試演內容後開始測試。</section>'}
  <p class="ui2-preview-caption" role="status">${esc(state.error|| (working?'正在載入故事…':activeLabel?activeLabel+'｜'+available+(state.showingResult?' 八種結果皆可手動試演。':'') : '試演不會改動玩家存檔。'))} ${esc(state.indexError)} <span data-avg-background-status></span></p>
 </main>`};
}
