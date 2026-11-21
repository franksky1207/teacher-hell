import {PORTRAIT_PREVIEW_STAGE,analyzePortraitSheet,portraitExpressionScales,portraitDestination} from './student-portrait-layout.js';

// Fixed 18 identities, filenames and relative display heights from the 15-B silhouette SOP.
const TYPES=Object.freeze([
 ['young-male','青年男',[.96,.95,.97]],
 ['young-female','青年女',[.91,.90,.93]],
 ['male','成年男',[.95,.94,.96]],
 ['female','成年女',[.90,.89,.92]],
 ['senior-male','老年男',[.91,.90,.92]],
 ['senior-female','老年女',[.86,.85,.88]]
]);
export const NPC_SILHOUETTE_IDS=Object.freeze(TYPES.flatMap(([kind,label,heights])=>
 heights.map((ratio,index)=>Object.freeze({id:'adult-'+kind+'-0'+(index+1),name:label+' '+(index+1),ratio}))
));
export const NPC_SILHOUETTE_POSES=Object.freeze([
 ['neutral','自然站立'],['side','微側身'],['hand-on-hip','單手叉腰'],
 ['arms-open','雙臂微張'],['gesture','單手示意'],['weight-shift','偏重心']
]);
export function npcSilhouetteAssetUrl(id,baseUrl,nonce){
 const url=new URL('./web/assets/characters/adults/'+id+'.png',baseUrl);
 url.searchParams.set('refresh',String(nonce));
 return url.href;
}
export function renderNpcSilhouettePreview(){
 return `<section class="student-art-preview npc-silhouette-preview" aria-label="NPC 剪影六姿勢預覽">
  <div class="student-art-selectors">
   <label>剪影原型 <span class="student-art-stepper"><button type="button" data-npc-prev aria-label="上一種剪影" disabled>‹</button><select data-npc-select aria-label="選擇剪影原型">${NPC_SILHOUETTE_IDS.map(({id,name})=>`<option value="${id}">${name}</option>`).join('')}</select><button type="button" data-npc-next aria-label="下一種剪影">›</button></span></label>
   <label>檢視背景 <select data-npc-background aria-label="剪影預覽背景"><option value="light">淺色</option><option value="dark">深色</option></select></label>
  </div>
  <p class="student-art-caption">通用 NPC 剪影採 3×2 六姿勢（不是學生六表情），主體近黑、固定灰白細外框；實際素材尚未提交時會顯示缺圖提示。</p>
  <div class="student-art-stage npc-silhouette-stage npc-silhouette-stage--light" data-npc-stage><canvas data-npc-canvas width="1152" height="1152" role="img" aria-label="NPC 六姿勢剪影"></canvas><p class="student-art-empty" data-npc-error hidden></p></div>
  <div class="student-art-buttons" role="group" aria-label="切換剪影姿勢">${NPC_SILHOUETTE_POSES.map(([id,label],i)=>`<button type="button" data-npc-pose="${id}" aria-pressed="${i===0}" disabled>${label}</button>`).join('')}</div>
  <p class="student-art-status" data-npc-status role="status">正在載入剪影素材…</p>
  <p class="student-art-caption">顯示高度依 SOP 相對於最高學生 100% 校正；每次切換皆讀取目前發布素材。</p>
 </section>`;
}
export function mountNpcSilhouettePreview(root){
 if(!root)return;
 const select=root.querySelector('[data-npc-select]');
 const back=root.querySelector('[data-npc-background]');
 const stage=root.querySelector('[data-npc-stage]');
 const canvas=root.querySelector('[data-npc-canvas]');
 const status=root.querySelector('[data-npc-status]');
 const error=root.querySelector('[data-npc-error]');
 const buttons=[...root.querySelectorAll('[data-npc-pose]')];
 const prev=root.querySelector('[data-npc-prev]');
 const next=root.querySelector('[data-npc-next]');
 const ctx=canvas.getContext('2d');
 let current='neutral',image=null,layout=null,request=0;
 const selected=()=>NPC_SILHOUETTE_IDS.find(entry=>entry.id===select.value);
 const syncNav=()=>{
  const index=NPC_SILHOUETTE_IDS.findIndex(entry=>entry.id===select.value);
  prev.disabled=index<=0;next.disabled=index>=NPC_SILHOUETTE_IDS.length-1;
 };
 const setEnabled=enabled=>buttons.forEach(button=>{
  button.disabled=!enabled;
  button.setAttribute('aria-pressed',String(enabled&&button.dataset.npcPose===current));
 });
 const paint=()=>{
  if(!image||!ctx||!layout)return;
  const index=NPC_SILHOUETTE_POSES.findIndex(([id])=>id===current);
  const width=image.naturalWidth/3,height=image.naturalHeight/2;
  const dest=portraitDestination(layout,index);
  canvas.width=PORTRAIT_PREVIEW_STAGE.width;canvas.height=PORTRAIT_PREVIEW_STAGE.height;
  ctx.clearRect(0,0,canvas.width,canvas.height);
  if(dest)ctx.drawImage(image,(index%3)*width,Math.floor(index/3)*height,width,height,dest.dx,dest.dy,dest.dw,dest.dh);
  setEnabled(true);
  status.textContent=selected().name+'｜'+NPC_SILHOUETTE_POSES[index][1]+'｜相對高度 '+Math.round(selected().ratio*100)+'%';
 };
 const fail=message=>{
  canvas.hidden=true;error.hidden=false;error.textContent=message;
  status.textContent='此剪影尚無可用的正式素材';setEnabled(false);
 };
 const update=()=>{
  syncNav();
  const token=++request,entry=selected();
  current='neutral';image=null;layout=null;setEnabled(false);
  ctx?.clearRect(0,0,canvas.width,canvas.height);
  canvas.hidden=false;error.hidden=true;error.textContent='';
  status.textContent=entry.name+'｜正在載入六姿勢…';
  const img=new Image();
  img.onload=()=>{
   if(token!==request||!root.isConnected)return;
   try{
    if(!ctx)throw Error('Canvas 無法使用');
    if(img.naturalWidth!==1536||img.naturalHeight!==2304)throw Error('剪影尺寸不符 1536×2304');
    const analyzed=analyzePortraitSheet(img,PORTRAIT_PREVIEW_STAGE);
    layout={...analyzed,scales:portraitExpressionScales(analyzed.bounds,PORTRAIT_PREVIEW_STAGE,entry.ratio)};
    if(analyzed.bounds.some(b=>!b))throw Error('剪影六格有空白格');
    image=img;paint();
   }catch(e){fail(entry.name+'｜'+e.message);}
  };
  img.onerror=()=>{if(token===request&&root.isConnected)fail(entry.name+' 尚無完整六姿勢剪影素材');};
  img.src=npcSilhouetteAssetUrl(entry.id,document.baseURI,Date.now()+'-'+token);
 };
 const step=direction=>{
  const index=NPC_SILHOUETTE_IDS.findIndex(entry=>entry.id===select.value)+direction;
  if(index<0||index>=NPC_SILHOUETTE_IDS.length)return;
  select.value=NPC_SILHOUETTE_IDS[index].id;update();
 };
 prev.addEventListener('click',()=>step(-1));
 next.addEventListener('click',()=>step(1));
 select.addEventListener('change',update);
 back.addEventListener('change',()=>{stage.classList.toggle('npc-silhouette-stage--dark',back.value==='dark');stage.classList.toggle('npc-silhouette-stage--light',back.value!=='dark');});
 buttons.forEach(button=>button.addEventListener('click',()=>{if(!image||button.disabled)return;current=button.dataset.npcPose;paint();}));
 update();
}
