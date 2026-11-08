// Experimental full-body 3x2 sprite sheet viewer.
// This does not alter the approved calm+face-sheet rendering path.
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
export function renderFullSheetPreview(){
 return `<section class="student-art-preview full-sheet-preview" aria-label="學生 001 夏季制服完整六圖測試">
  <p class="student-art-caption">獨立試驗：學生 001｜夏季制服｜一張完整人物 3×2 六表情圖集。原本雙圖模式與已驗收素材保持不變。</p>
  <div class="student-art-stage"><canvas data-full-sheet-canvas width="342" height="768" role="img" aria-label="學生 001 夏季制服完整人物立繪"></canvas><p class="student-art-empty" data-full-sheet-error hidden></p></div>
  <div class="student-art-buttons" role="group" aria-label="切換完整六圖表情">${FULL_SHEET_EXPRESSIONS.map(([id,label])=>`<button type="button" data-full-sheet-expression="${id}" aria-pressed="${id==='calm'}" disabled>${label}</button>`).join('')}</div>
  <p class="student-art-status" data-full-sheet-status role="status">正在載入完整六圖測試素材…</p>
 </section>`;
}
export function mountFullSheetPreview(root){
 if(!root)return;
 const canvas=root.querySelector('[data-full-sheet-canvas]');
 const status=root.querySelector('[data-full-sheet-status]');
 const error=root.querySelector('[data-full-sheet-error]');
 const buttons=[...root.querySelectorAll('[data-full-sheet-expression]')];
 const ctx=canvas.getContext('2d');
 let current='calm',image=null;
 const paint=()=>{
  if(!ctx||!image)return;
  const c=fullSheetCrop(current,image.naturalWidth,image.naturalHeight);
  canvas.width=c.sw;canvas.height=c.sh;
  ctx.clearRect(0,0,c.sw,c.sh);
  ctx.drawImage(image,c.sx,c.sy,c.sw,c.sh,0,0,c.sw,c.sh);
  for(const button of buttons)button.setAttribute('aria-pressed',String(button.dataset.fullSheetExpression===current));
  status.textContent=`學生 001・夏季制服｜${FULL_SHEET_EXPRESSIONS.find(([id])=>id===current)?.[1]}（完整六圖測試，尚未驗收）`;
 };
 root.addEventListener('click',event=>{
  const button=event.target.closest('[data-full-sheet-expression]');
  if(!button||button.disabled||!image)return;
  current=button.dataset.fullSheetExpression;
  paint();
 });
 const img=new Image();
 img.onload=()=>{
  if(!root.isConnected)return;
  try{
   if(img.naturalWidth!==1026||img.naturalHeight!==1536)throw new Error('圖片尺寸不符合目前測試素材（1026 × 1536）');
   if(!ctx)throw new Error('Canvas 無法使用');
   image=img;
   buttons.forEach(button=>button.disabled=false);
   paint();
  }catch(e){error.hidden=false;error.textContent=e.message;status.textContent='完整六圖載入失敗';}
 };
 img.onerror=()=>{
  if(!root.isConnected)return;
  error.hidden=false;error.textContent='找不到完整六圖 PNG，請檢查 GitHub 素材檔案';status.textContent='完整六圖載入失敗';
 };
 img.src=new URL('./assets/characters/students/student-001/student-001-full-sheet-uniform-summer.png',import.meta.url).href;
}
