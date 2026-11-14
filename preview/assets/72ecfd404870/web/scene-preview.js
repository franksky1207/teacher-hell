/** Read-only 15-D scene inspection using the formal story renderer. */
import {SCENE_CASES,selectScene} from './scene-context.js';
import {ui2PreviewProjection,makeUi2PreviewState} from './ui2-preview.js';
import {renderStoryView} from './story-view.js';
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function renderScenePreview(id='opening',castMode='two'){
 const item=SCENE_CASES.find(x=>x.id===id)??SCENE_CASES[0];
 const entry=selectScene(item.context),simulateMissing=item.context.simulateMissing===true;
 const chosen=['one','two','phone'].includes(castMode)?castMode:'two';
 const state=makeUi2PreviewState();state.caseId=chosen==='one'?'single':'dual-left';
 const view=ui2PreviewProjection(state);
 if(chosen==='phone'||item.context.presentation==='phone'){
  view.page={...view.page,presentation:'phone',text:'您好，我是導師，目前正在確認班級相關事項。'};
  view.sceneView={...view.sceneView,cast:[],speaker:'學生家長'};
 }else view.page={...view.page,text:'老師正在目前的位置與同學談話。此處只示範背景與人物顯示，不更動遊戲資料。'};
 return {entry,simulateMissing,html:`<main class="game game--story scene-preview" data-has-scene="${!!entry}">
  <div class="top">15-D｜場景與人物演出驗收・示範資料，不寫入存檔</div>
  <div class="scene-preview__tools">
   <label>場景 <select data-scene-case>${SCENE_CASES.map(c=>`<option value="${esc(c.id)}" ${item.id===c.id?'selected':''}>${esc(c.label)}</option>`).join('')}</select></label>
   <label>人物 <select data-scene-cast>${[['one','單人'],['two','雙人'],['phone','電話（無遠端人物）']].map(([key,label])=>`<option value="${key}" ${chosen===key?'selected':''}>${label}</option>`).join('')}</select></label>
   <button type="button" data-action="dev-center">返回測試中心</button>
  </div>
  ${renderStoryView(view)}
  <p class="scene-preview__caption" role="status">${entry?'背景：'+esc(entry.sceneLabel)+'／'+esc(entry.variant):'沒有可信的所在地：使用中性降級背景'}。電話／通訊不依遠端對象切換地點。<span class="scene-preview__load" aria-live="polite"></span></p>
 </main>`};
}
