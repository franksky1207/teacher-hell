import {PORTRAIT_PREVIEW_STAGE,analyzePortraitSheet,portraitDestination} from './student-portrait-layout.js';
// Complete student six-cell preview: four six-expression uniforms/sportswear and one six-scene casual sheet.
export const STUDENT_ART_IDS=Object.freeze(Array.from({length:40},(_,i)=>'student-'+String(i+1).padStart(3,'0')));
export const STUDENT_ART_OUTFITS=Object.freeze([
 ['uniform-summer','夏季制服'],['uniform-winter','冬季制服'],
 ['sports-summer','夏季運動服'],['sports-winter','冬季運動服'],
 ['casual','便服']
]);
export const FULL_SHEET_EXPRESSIONS=Object.freeze([
 ['calm','平靜'],['happy','開心'],['angry','生氣'],
 ['sad','難過'],['surprised','驚訝'],['embarrassed','害羞']
]);
export const FULL_SHEET_CASUAL_SCENES=Object.freeze([
 ['grade1-autumn-trip','高一上・冬 A'],['grade2-autumn-trip','高二上・冬 B'],
 ['grade1-spring-trip','高一下・夏 A'],['graduation-trip-1','畢旅第 1 天・夏 B'],
 ['graduation-trip-2','畢旅第 2 天・夏 C'],['graduation-trip-3','畢旅第 3 天・夏 D']
]);
export const FULL_SHEET_CELL=Object.freeze({columns:3,rows:2,width:512,height:1152});
export const fullSheetChoices=wear=>wear==='casual'?FULL_SHEET_CASUAL_SCENES:FULL_SHEET_EXPRESSIONS;
export function fullSheetCrop(expression,width=1536,height=2304){
 const index=FULL_SHEET_EXPRESSIONS.findIndex(([id])=>id===expression);
 const sceneIndex=FULL_SHEET_CASUAL_SCENES.findIndex(([id])=>id===expression);
 const cellIndex=index>=0?index:sceneIndex;
 if(cellIndex<0)throw new Error('未知的完整六圖表情或活動情境');
 if(width%3||height%2||width<=0||height<=0)throw new Error('完整六圖的 3×2 尺寸不正確');
 const sw=width/3,sh=height/2;
 return {sx:(cellIndex%3)*sw,sy:Math.floor(cellIndex/3)*sh,sw,sh};
}
const option=(value,label)=>`<option value="${value}">${label}</option>`;
// Always load the current published PNG directory, not a snapshot under a versioned JS module.
export function fullSheetAssetUrl(id,wear,baseUrl,nonce){
 const url=new URL(`./web/assets/characters/students/${id}/${id}-full-sheet-${wear}.png`,baseUrl);
 url.searchParams.set('refresh',String(nonce));
 return url.href;
}
export const FULL_SHEET_PREVIEW_VERSION=import.meta.url.match(/\/assets\/([a-f0-9]{12})\/web\//)?.[1]??'本機開發版';
export function renderFullSheetPreview(){
 return `<section class="student-art-preview full-sheet-preview" aria-label="完整人物六格圖集測試">
  <div class="student-art-selectors">
   <label>學生 <span class="student-art-stepper"><button type="button" data-full-sheet-prev="student" aria-label="上一位學生" disabled>‹</button><select data-full-sheet-student aria-label="選擇學生">${STUDENT_ART_IDS.map((id,i)=>option(id,'學生 '+String(i+1).padStart(3,'0'))).join('')}</select><button type="button" data-full-sheet-next="student" aria-label="下一位學生">›</button></span></label>
   <label>服裝 <span class="student-art-stepper"><button type="button" data-full-sheet-prev="outfit" aria-label="上一套服裝" disabled>‹</button><select data-full-sheet-outfit aria-label="選擇服裝">${STUDENT_ART_OUTFITS.map(([id,name])=>option(id,name)).join('')}</select><button type="button" data-full-sheet-next="outfit" aria-label="下一套服裝">›</button></span></label>
  </div>
  <p class="student-art-caption">學生編號為美術素材編號，與班級座號無關。這裡測試完整人物 3×2 六格圖集：制服／運動服為六表情，便服為六種開心活動情境。</p>
  <div class="student-art-stage"><canvas data-full-sheet-canvas width="1152" height="1152" role="img" aria-label="完整人物六表情立繪"></canvas><p class="student-art-empty" data-full-sheet-error hidden></p></div>
  <div class="student-art-buttons" role="group" aria-label="切換六格表情">${FULL_SHEET_EXPRESSIONS.map(([id,label])=>`<button type="button" data-full-sheet-expression="${id}" aria-pressed="${id==='calm'}" disabled>${label}</button>`).join('')}</div>
  <p class="student-art-status" data-full-sheet-status role="status">正在載入完整六圖測試素材…</p>
  <p class="student-art-caption" data-full-sheet-version>預覽程式版本：${FULL_SHEET_PREVIEW_VERSION}｜學生圖片每次切換皆重新讀取目前發布的檔案</p>
 </section>`;
}
export function mountFullSheetPreview(root){
 if(!root)return;
 const student=root.querySelector('[data-full-sheet-student]');
 const outfit=root.querySelector('[data-full-sheet-outfit]');
 const navigators=[...root.querySelectorAll('[data-full-sheet-prev],[data-full-sheet-next]')];
 const canvas=root.querySelector('[data-full-sheet-canvas]');
 const status=root.querySelector('[data-full-sheet-status]');
 const error=root.querySelector('[data-full-sheet-error]');
 const buttons=[...root.querySelectorAll('[data-full-sheet-expression]')];
 const ctx=canvas.getContext('2d');
 let current='calm',image=null,layout=null,request=0;
 const choices=()=>fullSheetChoices(outfit.value);
 const syncChoices=()=>{
  const selected=choices();
  buttons.forEach((button,index)=>{
   const [key,text]=selected[index];
   button.dataset.fullSheetExpression=key;
   button.textContent=text;
  });
  root.querySelector('.student-art-buttons')?.setAttribute('aria-label',outfit.value==='casual'?'切換便服活動情境':'切換六格表情');
 };
 const setEnabled=enabled=>buttons.forEach(button=>{
  button.disabled=!enabled;
  button.setAttribute('aria-pressed',String(enabled&&button.dataset.fullSheetExpression===current));
 });
 const label=()=>STUDENT_ART_OUTFITS.find(([id])=>id===outfit.value)?.[1]??outfit.value;
 const syncNavigators=()=>{
  for(const button of navigators){
   const values=button.dataset.fullSheetPrev==='student'||button.dataset.fullSheetNext==='student'
    ?STUDENT_ART_IDS:STUDENT_ART_OUTFITS.map(([id])=>id);
   const selected=button.dataset.fullSheetPrev==='student'||button.dataset.fullSheetNext==='student'?student:outfit;
   const index=values.indexOf(selected.value);
   button.disabled=index<0||(button.hasAttribute('data-full-sheet-prev')?index===0:index===values.length-1);
  }
 };
 const step=(kind,direction)=>{
  const values=kind==='student'?STUDENT_ART_IDS:STUDENT_ART_OUTFITS.map(([id])=>id);
  const select=kind==='student'?student:outfit;
  const next=values.indexOf(select.value)+direction;
  if(next<0||next>=values.length)return;
  select.value=values[next];
  update();
 };
 const paint=()=>{
  if(!ctx||!image)return;
  const c=fullSheetCrop(current,image.naturalWidth,image.naturalHeight);
  canvas.width=PORTRAIT_PREVIEW_STAGE.width;canvas.height=PORTRAIT_PREVIEW_STAGE.height;
  ctx.clearRect(0,0,canvas.width,canvas.height);
  const index=choices().findIndex(([id])=>id===current);
  const dest=portraitDestination(layout,index);
  if(dest)ctx.drawImage(image,c.sx,c.sy,c.sw,c.sh,dest.dx,dest.dy,dest.dw,dest.dh);
  setEnabled(true);
  status.textContent=`${student.value.replace('student-','學生 ')}・${label()}｜${choices().find(([id])=>id===current)?.[1]}（完整六格）`;
 };
 function update(){
  syncNavigators();
  const token=++request,id=student.value,wear=outfit.value;
  current=choices()[0][0];syncChoices();image=null;layout=null;setEnabled(false);
  ctx?.clearRect(0,0,canvas.width,canvas.height);
  canvas.hidden=false;error.hidden=true;error.textContent='';
  status.textContent=`${id.replace('student-','學生 ')}・${label()}｜正在載入完整六格…`;
  const img=new Image();
  img.onload=()=>{
   if(token!==request||!root.isConnected)return;
   try{
    if(!ctx)throw new Error('Canvas 無法使用');
    fullSheetCrop(current,img.naturalWidth,img.naturalHeight);
    layout=analyzePortraitSheet(img,PORTRAIT_PREVIEW_STAGE,id);
    image=img;paint();
   }catch(e){
    canvas.hidden=true;error.hidden=false;error.textContent=e.message;
    status.textContent='完整六格載入失敗';
   }
  };
  img.onerror=()=>{
   if(token!==request||!root.isConnected)return;
   canvas.hidden=true;error.hidden=false;
   error.textContent=`${id.replace('student-','學生 ')}・${label()} 尚無完整六格測試素材`;
   status.textContent='此組合尚未製作完整六格';
  };
  img.src=fullSheetAssetUrl(id,wear,document.baseURI,`${Date.now()}-${token}`);
 }
 student.value='student-001';outfit.value='uniform-summer';
 student.addEventListener('change',update);
 outfit.addEventListener('change',update);
 for(const button of navigators)button.addEventListener('click',()=>{
  if(button.disabled)return;
  step(button.dataset.fullSheetPrev??button.dataset.fullSheetNext,button.hasAttribute('data-full-sheet-prev')?-1:1);
 });
 root.addEventListener('click',event=>{
  const button=event.target.closest('[data-full-sheet-expression]');
  if(!button||button.disabled||!image)return;
  current=button.dataset.fullSheetExpression;
  paint();
 });
 update();
}
