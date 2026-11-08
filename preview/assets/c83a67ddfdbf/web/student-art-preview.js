// Student art preview: one calm base + a six-expression 3x2 face sheet per outfit.
// Student IDs are artwork IDs, never class numbers or saved NPC identifiers.
import {normalizeSixExpressionCanvas} from './face-sheet-normalize.js';
export const STUDENT_ART_IDS=Object.freeze(Array.from({length:40},(_,i)=>'student-'+String(i+1).padStart(3,'0')));
export const STUDENT_ART_OUTFITS=Object.freeze([
 ['uniform-summer','夏季制服'],['uniform-winter','冬季制服'],
 ['sports-summer','夏季運動服'],['sports-winter','冬季運動服'],
 ['casual-summer-01','夏季便服 A'],['casual-summer-02','夏季便服 B'],
 ['casual-winter-01','冬季便服 A'],['casual-winter-02','冬季便服 B']
]);
export const STUDENT_ART_EXPRESSIONS=Object.freeze([
 ['calm','平靜'],['happy','開心'],['angry','生氣'],
 ['sad','難過'],['surprised','驚訝'],['embarrassed','害羞']
]);
export const STUDENT_ART_READY=Object.freeze({'student-001':Object.freeze({'uniform-winter':'full','uniform-summer':'full','sports-summer':'full','sports-winter':'full'})});
export function studentArtAvailability(studentId,outfit){
 if(!STUDENT_ART_IDS.includes(studentId)||!STUDENT_ART_OUTFITS.some(([id])=>id===outfit))return 'missing';
 return STUDENT_ART_READY[studentId]?.[outfit]??'missing';
}
export function studentArtSheetCell(metadata,expression){
 const {sheetLayout,face,canvas}=metadata??{};
 if(!sheetLayout||!face||!canvas||sheetLayout.columns!==3||sheetLayout.rows!==2)throw new Error('六表情定位格式不正確');
 const index=sheetLayout.order?.indexOf(expression);
 if(!Number.isInteger(index)||index<0||index>5)throw new Error('表情不存在於定位資料');
 const vals=[face.x,face.y,face.width,face.height,canvas.width,canvas.height];
 if(!vals.every(Number.isInteger)||face.x<0||face.y<0||face.width<=0||face.height<=0||face.x+face.width>canvas.width||face.y+face.height>canvas.height)throw new Error('表情覆蓋座標超出母圖');
 return {sx:(index%3)*face.width,sy:Math.floor(index/3)*face.height,sw:face.width,sh:face.height,dx:face.x,dy:face.y};
}
const option=(value,label)=>`<option value="${value}">${label}</option>`;
export function renderStudentArtPrototype(){
 return `<section class="student-art-preview" aria-label="學生六表情立繪預覽">
  <div class="student-art-selectors">
   <label>學生 <select data-art-student aria-label="選擇學生">${STUDENT_ART_IDS.map((id,i)=>option(id,'學生 '+String(i+1).padStart(3,'0'))).join('')}</select></label>
   <label>服裝 <select data-art-outfit aria-label="選擇服裝">${STUDENT_ART_OUTFITS.map(([id,name])=>option(id,name)).join('')}</select></label>
  </div>
  <div class="student-art-stage"><canvas data-art-canvas width="1024" height="1536" role="img" aria-label="學生平靜母圖及臉部表情覆蓋"></canvas><p class="student-art-empty" data-art-empty hidden></p></div>
  <div class="student-art-buttons" role="group" aria-label="六種表情">${STUDENT_ART_EXPRESSIONS.map(([key,label])=>`<button type="button" data-art-expression="${key}" aria-pressed="${key==='calm'}">${label}</button>`).join('')}</div>
  <p class="student-art-status" data-art-status role="status">選擇學生與服裝，查看素材狀態。</p>
  <p class="student-art-caption">學生編號為美術素材編號，與班級座號無關。夏季與冬季制服、夏季運動服已通過預覽驗收；冬季運動服六表情待使用者實看確認。此預覽不代表正式劇情已接線。</p>
 </section>`;
}
function loadImage(url){
 return new Promise((resolve,reject)=>{const img=new Image();img.onload=()=>resolve(img);img.onerror=()=>reject(new Error('圖片載入失敗'));img.src=url;});
}
export function mountStudentArtPrototype(root){
 if(!root)return;
 const student=root.querySelector('[data-art-student]'),outfit=root.querySelector('[data-art-outfit]'),canvas=root.querySelector('[data-art-canvas]'),empty=root.querySelector('[data-art-empty]'),status=root.querySelector('[data-art-status]'),buttons=[...root.querySelectorAll('[data-art-expression]')];
 const ctx=canvas.getContext('2d');let request=0,base=null,sheet=null,metadata=null,current='calm';
 const say=(message)=>{status.textContent=message;};
 const enable=on=>buttons.forEach(b=>{b.disabled=!on;b.setAttribute('aria-pressed',String(on&&b.dataset.artExpression===current));});
 const draw=()=>{
  if(!ctx||!base)return;
  canvas.width=base.naturalWidth;canvas.height=base.naturalHeight;
  ctx.clearRect(0,0,canvas.width,canvas.height);ctx.drawImage(base,0,0);
  if(sheet&&metadata&&current!=='calm'){
   const c=studentArtSheetCell(metadata,current);
   ctx.drawImage(sheet,c.sx,c.sy,c.sw,c.sh,c.dx,c.dy,c.sw,c.sh);
  }
  buttons.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.artExpression===current)));
 };
 async function update(){
  const token=++request,id=student.value,wear=outfit.value,available=studentArtAvailability(id,wear);
  const wearLabel=STUDENT_ART_OUTFITS.find(([key])=>key===wear)?.[1]??wear;
  current='calm';base=null;sheet=null;metadata=null;enable(false);
  ctx?.clearRect(0,0,canvas.width,canvas.height);
  // Do not gate previews solely on a hardcoded catalogue: GitHub assets may
  // already be deployed while the list or a cached JS module is outdated.
  // The actual base PNG + JSON + sheet determine whether a combination exists.
  canvas.hidden=false;empty.hidden=true;say('正在檢查並載入美術素材…');
  const dir=new URL(`./assets/characters/students/${id}/`,import.meta.url);
  try{
   const baseName=`${id}-base-${wear}.png`;
   const loadedBase=await loadImage(new URL(baseName,dir).href);
   if(token!==request||!root.isConnected)return;
   base=loadedBase;
   const metaName=`${id}-face-sheet-${wear}.json`;
   const response=await fetch(new URL(metaName,dir),{cache:'no-cache'});
   if(response.status===404){
    draw();enable(false);say('目前僅有平靜母圖，六表情尚未上架。');return;
   }
   if(!response.ok)throw new Error('定位 JSON 無法讀取（HTTP '+response.status+'）');
   const loadedMeta=await response.json();
   const loadedSheet=await loadImage(new URL(`${id}-face-sheet-${wear}.png`,dir).href);
   if(token!==request||!root.isConnected)return;
   if(loadedMeta.studentId!==id||loadedMeta.outfit!==wear||loadedMeta.base!==baseName||loadedMeta.sheet!==`${id}-face-sheet-${wear}.png`)throw new Error('素材與定位 JSON 不相符');
   if(loadedBase.naturalWidth!==loadedMeta.canvas.width||loadedBase.naturalHeight!==loadedMeta.canvas.height)throw new Error('平靜母圖尺寸與 JSON 不符');
   if(loadedSheet.naturalWidth!==loadedMeta.face.width*3||loadedSheet.naturalHeight!==loadedMeta.face.height*2)throw new Error('六表情圖集尺寸與 JSON 不符');
   STUDENT_ART_EXPRESSIONS.forEach(([key])=>studentArtSheetCell(loadedMeta,key));
   // Only the older winter uniform requires preview-time normalization.
   // Other completed outfits use their own already aligned source face sheets.
   const directSheet=(wear!=='uniform-winter');
   const normalized=directSheet ? {canvas:loadedSheet} : normalizeSixExpressionCanvas(loadedBase,loadedSheet,loadedMeta);
   if(token!==request||!root.isConnected)return;
   sheet=normalized.canvas;metadata=loadedMeta;draw();enable(true);
   say(`${id.replace('student-','學生 ')}・${wearLabel}｜平靜（${wear==='sports-winter'?'冬季運動服候選，待預覽驗收':'已驗收服裝'}；六表情可切換）`);
  }catch(error){
   if(token!==request||!root.isConnected)return;
   sheet=null;metadata=null;enable(false);
   if(!base){
    canvas.hidden=true;empty.hidden=false;empty.textContent=`${id.replace('student-','學生 ')}・${wearLabel}尚無可讀取的平靜母圖`;
    say('此組合目前未有可讀取的母圖。');return;
   }
   draw();say('六表情圖集載入或定位失敗：'+error.message);
  }
 }
 root.querySelector('[data-art-student]').value='student-001';
 root.querySelector('[data-art-outfit]').value='uniform-winter';
 student.addEventListener('change',update);outfit.addEventListener('change',update);
 root.querySelector('.student-art-buttons').addEventListener('click',event=>{
  const b=event.target.closest('[data-art-expression]');
  if(!b||b.disabled||!sheet||!metadata)return;
  current=b.dataset.artExpression;draw();
  const name=STUDENT_ART_EXPRESSIONS.find(([key])=>key===current)?.[1]??current;
  say(`${student.value.replace('student-','學生 ')}・${STUDENT_ART_OUTFITS.find(([id])=>id===outfit.value)?.[1]}｜${name}（${outfit.value==='sports-winter'?'冬季運動服候選，待預覽驗收':'已驗收服裝'}）`);
 });
 void update();
}
