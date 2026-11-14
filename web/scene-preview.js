/** Read-only 15-D scene, outfit, identity and display regression fixtures.
 * The exact production renderer and portrait loader draw all examples.
 */
import {SCENE_CASES,selectScene} from './scene-context.js';
import {ui2PreviewProjection,makeUi2PreviewState} from './ui2-preview.js';
import {renderStoryView} from './story-view.js';
import {STUDENT_ART_OUTFITS,FULL_SHEET_CASUAL_SCENES} from './full-sheet-preview.js';
import {stableAdultArt,adultPoseForExpression} from './story-art-context.js';
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','\'':'&#39;'}[c]));
const outfitChoices=Object.freeze([
 ['auto','依場景示範'],...STUDENT_ART_OUTFITS.filter(([id])=>id!=='casual'),
 ...FULL_SHEET_CASUAL_SCENES.map(([id,label])=>[id,'便服｜'+label])
]);
const casualCases=new Set(FULL_SHEET_CASUAL_SCENES.map(([id])=>id));
function chooseWear(item,requested){
 if(requested==='auto'){
  if(item.id==='fieldtrip')return {wear:'casual',cell:'grade1-autumn-trip'};
  if(item.id==='trip')return {wear:'casual',cell:'graduation-trip-2'};
  if(item.id==='sports')return {wear:'sports-summer',cell:null};
  if(item.id==='vacation'||item.id==='weekend')return {wear:'uniform-summer',cell:null};
  return {wear:'uniform-summer',cell:null};
 }
 if(casualCases.has(requested))return {wear:'casual',cell:requested};
 if(STUDENT_ART_OUTFITS.some(([key])=>key===requested&&key!=='casual'))return {wear:requested,cell:null};
 return {wear:'uniform-summer',cell:null};
}
export function renderScenePreview(id='opening',castMode='two',wearMode='auto'){
 const item=SCENE_CASES.find(x=>x.id===id)??SCENE_CASES[0];
 const entry=selectScene(item.context),simulateMissing=item.context.simulateMissing===true;
 const chosen=['one','two','phone','adult','transfer','unknown'].includes(castMode)?castMode:'two';
 const state=makeUi2PreviewState();state.caseId=chosen==='one'?'single':'dual-left';
 const view=ui2PreviewProjection(state),costume=chooseWear(item,wearMode);
 if(chosen==='phone'||item.context.presentation==='phone'){
  view.page={...view.page,presentation:'phone',text:'您好，我是導師，目前正在確認班級相關事項。'};
  view.sceneView={...view.sceneView,cast:[],speaker:'學生家長'};
 }else{
  view.page={...view.page,text:'本畫面展示正式劇情的背景、服裝、人物與姿勢，不建立事件、不更動存檔。'};
  if(chosen==='adult'){
   view.sceneView.cast=[
    {id:'sample-adult-A',name:'人物甲',kind:'adult',position:'left',speaking:true,
     expression:'calm',artId:stableAdultArt('sample-adult-A',{appearance:{variant:42}})},
    {id:'sample-adult-B',name:'人物乙',kind:'adult',position:'right',speaking:false,
     expression:'happy',artId:stableAdultArt('sample-adult-B',{appearance:{variant:113}})}
   ];
   view.sceneView.speaker='人物甲';
  }else if(chosen==='transfer'){
   view.sceneView.cast=[{id:'sample-transfer',name:'轉入生',kind:'student',position:'center',speaking:true,
    expression:'calm',artId:'student-041',wear:costume.wear,cell:costume.cell}];
   view.sceneView.speaker='轉入生';
  }else if(chosen==='unknown'){
   view.sceneView.cast=[{id:'sample-unknown',name:'未確認身分',kind:'adult',position:'center',
    speaking:true,expression:'calm',artId:null}];
   view.sceneView.speaker='未確認身分';
  }else{
   view.sceneView.cast=view.sceneView.cast.map(person=>({...person,wear:costume.wear,cell:costume.cell}));
  }
 }
 const note=costume.wear==='casual'?'便服格位：'+costume.cell:costume.wear;
 return {entry,simulateMissing,html:`<main class="game game--story scene-preview" data-has-scene="${!!entry}">
  <div class="top">15-D｜場景與人物演出驗收・示範資料，不寫入存檔</div>
  <div class="scene-preview__tools">
   <label>場景 <select data-scene-case>${SCENE_CASES.map(c=>`<option value="${esc(c.id)}" ${item.id===c.id?'selected':''}>${esc(c.label)}</option>`).join('')}</select></label>
   <label>人物 <select data-scene-cast>${[['one','單人'],['two','雙人'],['adult','成人剪影'],['transfer','轉入生'],['unknown','無公開外貌'],['phone','電話（不顯示對方）']].map(([key,label])=>`<option value="${key}" ${chosen===key?'selected':''}>${label}</option>`).join('')}</select></label>
   <label>服裝 <select data-scene-wear>${outfitChoices.map(([key,label])=>`<option value="${key}" ${wearMode===key?'selected':''}>${esc(label)}</option>`).join('')}</select></label>
   <button type="button" data-action="dev-center">返回測試中心</button>
  </div>
  ${renderStoryView(view)}
  <p class="scene-preview__caption" role="status">${entry?'背景：'+esc(entry.sceneLabel)+'／'+esc(entry.variant):'未指定背景'}｜服裝：${esc(note)}。電話不顯示遠端人物。<span class="scene-preview__load" aria-live="polite"></span></p>
 </main>`};
}
