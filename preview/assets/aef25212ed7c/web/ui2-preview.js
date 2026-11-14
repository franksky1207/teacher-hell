/** UI-2 developer-only visual fixtures; all rendering goes through formal story-view.
 * No event engine, save slots, world mutations, or fictional disclosures. */
import {renderStoryView} from './story-view.js';
import {mountStoryPortraits} from './story-portraits.js';
import {FULL_SHEET_EXPRESSIONS} from './full-sheet-preview.js';
const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','\'':'&#39;'}[c]));
// Use the same six-cell source and order as the original student art preview.
const expressions=FULL_SHEET_EXPRESSIONS.map(([id])=>id);
const labels=FULL_SHEET_EXPRESSIONS.map(([,label])=>label);
const sampleOptions=['分別了解經過','立即介入調停','尋求同事協助','我真的受夠了！'];
export const UI2_CASES=Object.freeze([
 ['narration','旁白・雙人正常亮度'],['single','單人對話'],['dual-left','雙人・左側發言'],
 ['dual-right','雙人・右側發言'],['four','固定四選項'],['pages','劇情翻頁']
]);
export function makeUi2PreviewState(){return {caseId:'dual-left',leftExpression:0,rightExpression:0,page:0,selected:null,confirmed:false};}
function actor(id,name,position,speaking,expression){
 return {id,name,kind:'student',position,speaking,expression,artId:id,tone:0};
}
export function ui2PreviewProjection(state){
 const id=UI2_CASES.some(x=>x[0]===state.caseId)?state.caseId:'dual-left';
 const left=actor('student-001','林同學',id==='single'?'center':'left',id==='single'||id==='dual-left',expressions[state.leftExpression]??'calm');
 const right=actor('student-021','陳同學','right',id==='dual-right',expressions[state.rightExpression]??'calm');
 const cast=id==='single'?[left]:[left,right];
 const narrator=id==='narration';
 const speaker=narrator?'旁白':id==='dual-right'?'陳同學':'林同學';
 if(narrator)cast.forEach(a=>a.speaking=false);
 const total=id==='pages'?3:1;
 const page=Math.max(0,Math.min(total-1,state.page));
 const text=id==='pages'?[
  '早自習剛結束，教室裡仍有零星談話聲。',
  '兩位同學走到講桌旁，希望老師能先聽聽他們的想法。',
  '你留意到兩人說法有所不同，決定先把事情釐清。'
 ][page]:narrator?'午后的陽光穿過窗邊。兩位同學站在講桌前，等待老師回應。':id==='four'?'兩位同學對剛剛發生的事情有不同說法。你打算怎麼處理？':'老師，我想先說明事情的經過。可以聽我們說完嗎？';
 const options=(state.confirmed?[]:id==='four'?sampleOptions:[]).map((text,i)=>({id:'option-'+i,text}));
 const chosen=options.find(x=>x.id===state.selected);
 const confirmation=chosen?{optionId:chosen.id,text:chosen.text}:null;
 const finish=state.confirmed||total===1&&!options.length||id==='pages'&&page===total-1;
 return {page:{presentation:narrator?'narration':'dialogue',speaker:narrator?null:cast.find(a=>a.speaking)?.id??left.id,text,cast:[]},
  pageIndex:page,pageCount:total,canPrevious:page>0,canNext:page<total-1,
  choices:chosen?[]:options,confirmation,canFinish:finish&&!confirmation,
  waiting:false,canResume:false,ended:false,
  sceneView:{label:'開發驗收場景',speaker,cast}};
}
export function renderUi2Preview(state){
 const chosen=UI2_CASES.find(x=>x[0]===state.caseId);
 const desktop=new URL('./web/assets/backgrounds/desktop/school-classroom-day.webp',document.baseURI).href;
 const mobile=new URL('./web/assets/backgrounds/mobile/school-classroom-day.webp',document.baseURI).href;
 return `<main class="game game--story ui2-preview" style="--ui2-bg-desktop:url('${desktop}');--ui2-bg-mobile:url('${mobile}')">
  <div class="top">UI-2｜正式劇情畫面視覺驗收・示範資料，不會寫入遊戲</div>
  <nav class="ui2-preview-tools" aria-label="劇情預覽控制">
   <label>情境 <select data-ui2-case>${UI2_CASES.map(([id,label])=>`<option value="${id}" ${state.caseId===id?'selected':''}>${escape(label)}</option>`).join('')}</select></label>
   <label>左邊表情 <select data-ui2-left-expression>${expressions.map((x,i)=>`<option value="${i}" ${state.leftExpression===i?'selected':''}>${labels[i]}</option>`).join('')}</select></label><label>右邊表情 <select data-ui2-right-expression>${expressions.map((x,i)=>`<option value="${i}" ${state.rightExpression===i?'selected':''}>${labels[i]}</option>`).join('')}</select></label>
   <button type="button" data-action="dev-center">返回測試中心</button>
  </nav>
  ${renderStoryView(ui2PreviewProjection(state))}
  <p class="ui2-preview-caption" role="status">${state.confirmed?'已示範確認，沒有實際寫入任何遊戲資料。':'場景、人物、選項均為展示資料；選項點擊只模擬呈現。'}　${escape(chosen?.[1]??'')}</p>
 </main>`;
}
export function mountUi2Preview(root){void mountStoryPortraits(root);}
export function ui2PreviewAction(state,action,optionId){
 if(action==='select'&&/^option-[0-7]$/.test(optionId)){
  const choices=ui2PreviewProjection(state).choices;
  if(choices.some(x=>x.id===optionId))state.selected=optionId;
 }else if(action==='cancel')state.selected=null;
 else if(action==='confirm'&&state.selected!==null){state.confirmed=true;state.selected=null;}
 else if(action==='next')state.page=Math.min(2,state.page+1);
 else if(action==='previous')state.page=Math.max(0,state.page-1);
 else if(action==='finish')state.confirmed=true;
}
