// Experimental full-body 3x2 sprite sheet viewer.
// This does not alter the approved calm+face-sheet rendering path.
import {STUDENT_ART_IDS,STUDENT_ART_OUTFITS} from './student-art-preview.js';
export const FULL_SHEET_EXPRESSIONS=Object.freeze([
 ['calm','平靜'],['happy','開心'],['angry','生氣'],
 ['sad','難過'],['surprised','驚訝'],['embarrassed','害羞']
]);
export const FULL_SHEET_CELL=Object.freeze({columns:3,rows:2,width:342,height:768});
export function fullSheetCrop(expression,width=1026,height=1536){
 const index=FULL_SHEET_EXPRESSIONS.findIndex(([id])=>id===expression);
 if(index<0)throw new Error('未知的完整六圖表情');
 if(width%3||height%2||width<=0||height<=0)throw new Error('完整六圖的 3×2 尺寸不正確');
 const sw=width/3,sh=height/2;
 return {sx:(index%3)*sw,sy:Math.floor(index/3)*sh,sw,sh};
}
const option=(value,label)=>`<option value="${value}">${label}</option>`;
export function renderFullSheetPreview(){
 return `<section class="student-art-preview full-sheet-preview" aria-label="完整人物六表情圖集測試">
  <div class="student-art-selectors">
   <label>學生 <select data-full-sheet-student aria-label="選擇學生">${STUDENT_ART_IDS.map((id,i)=>option(id,'學生 '+String(i+1).padStart(3,'0'))).join('')}</select></label>
   <label>服裝 <select data-full-sheet-outfit aria-label="選擇服裝">${STUDENT_ART_OUTFITS.map(([id,name])=>option(id,name)).join('')}</select></label>
  </div>
  <p class="student-art-caption">學生編號為美術素材編號，與班級座號無關。這裡僅測試完整人物 3×2 六表情圖集；已驗收的雙圖預覽保持不變。</p>
  <div class="student-art-stage"><canvas data-full-sheet-canvas width="342" height="768" role="img" aria-label="完整人物六表情立繪"></canvas><p class="student-art-empty" data-full-sheet-error hidden></p></div>
  <div class="student-art-buttons" role="group" aria-label="切換完整六圖表情">${FULL_SHEET_EXPRESSIONS.map(([id,label])=>`<button type="button" data-full-sheet-expression="${id}" aria-pressed="${id==='calm'}" disabled>${label}</button>`).join('')}</div>
  <p class="student-art-status" data-full-sheet-status role="status">正在載入完整六圖測試素材…</p>
 </section>`;
}
export function mountFullSheetPreview(root){
 if(!root)return;
 const student=root.querySelector('[data-full-sheet-student]');
 const outfit=root.querySelector('[data-full-sheet-outfit]');
 const canvas=root.querySelector('[data-full-sheet-canvas]');
 const status=root.querySelector('[data-full-sheet-status]');
 const error=root.querySelector('[data-full-sheet-error]');
 const buttons=[...root.querySelectorAll('[data-full-sheet-expression]')];
 const ctx=canvas.getContext('2d');
 let current='calm',image=null,request=0;
 const setEnabled=enabled=>buttons.forEach(button=>{
  button.disabled=!enabled;
  button.setAttribute('aria-pressed',String(enabled&&button.dataset.fullSheetExpression===current));
 });
 const label=()=>STUDENT_ART_OUTFITS.find(([id])=>id===outfit.value)?.[1]??outfit.value;
 const paint=()=>{
  if(!ctx||!image)return;
  const c=fullSheetCrop(current,image.naturalWidth,image.naturalHeight);
  canvas.width=c.sw;canvas.height=c.sh;
  ctx.clearRect(0,0,c.sw,c.sh);
  ctx.drawImage(image,c.sx,c.sy,c.sw,c.sh,0,0,c.sw,c.sh);
  setEnabled(true);
  status.textContent=`${student.value.replace('student-','學生 ')}・${label()}｜${FULL_SHEET_EXPRESSIONS.find(([id])=>id===current)?.[1]}（完整六圖測試，尚未驗收）`;
 };
 function update(){
  const token=++request,id=student.value,wear=outfit.value;
  current='calm';image=null;setEnabled(false);
  ctx?.clearRect(0,0,canvas.width,canvas.height);
  canvas.hidden=false;error.hidden=true;error.textContent='';
  status.textContent=`${id.replace('student-','學生 ')}・${label()}｜正在載入完整六圖…`;
  const img=new Image();
  img.onload=()=>{
   if(token!==request||!root.isConnected)return;
   try{
    if(!ctx)throw new Error('Canvas 無法使用');
    fullSheetCrop('calm',img.naturalWidth,img.naturalHeight);
    image=img;paint();
   }catch(e){
    canvas.hidden=true;error.hidden=false;error.textContent=e.message;
    status.textContent='完整六圖載入失敗';
   }
  };
  img.onerror=()=>{
   if(token!==request||!root.isConnected)return;
   canvas.hidden=true;error.hidden=false;
   error.textContent=`${id.replace('student-','學生 ')}・${label()} 尚無完整六圖測試素材`;
   status.textContent='此組合尚未製作完整六圖（不影響原雙圖素材）';
  };
  img.src=new URL(`./assets/characters/students/${id}/${id}-full-sheet-${wear}.png`,import.meta.url).href;
 }
 student.value='student-001';outfit.value='uniform-summer';
 student.addEventListener('change',update);
 outfit.addEventListener('change',update);
 root.addEventListener('click',event=>{
  const button=event.target.closest('[data-full-sheet-expression]');
  if(!button||button.disabled||!image)return;
  current=button.dataset.fullSheetExpression;
  paint();
 });
 update();
}
