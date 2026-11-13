import {BACKGROUND_GROUPS,BACKGROUND_ENTRIES,BACKGROUND_VARIANT_LABELS,backgroundUrl} from './background-scenes.js';
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function renderBackgroundPreview(){
 return `<section class="background-preview" aria-label="背景圖預覽">
  <div class="background-layout">
   <aside class="background-sidebar" data-bg-sidebar>
    <button type="button" class="background-sidebar-toggle" data-bg-toggle aria-expanded="false">選擇分類與場所 ▾</button>
    <nav class="background-scene-navigation" data-bg-nav aria-label="背景場景選擇"></nav>
   </aside>
   <div class="background-main">
    <div class="background-controls"><div class="background-directions" role="group" aria-label="圖片方向">
     <button type="button" data-bg-direction="desktop" aria-pressed="true">橫式</button><button type="button" data-bg-direction="mobile" aria-pressed="false">直式</button>
    </div><div class="background-variants" data-bg-variants role="group" aria-label="時段"></div></div>
    <div class="background-image-wrap" data-bg-wrap>
     <div class="background-frame background-frame--desktop" data-bg-frame>
      <img data-bg-image alt="" hidden>
      <p class="background-missing" data-bg-missing role="status">尚未製作背景</p>
      <div class="background-cast" data-bg-cast hidden aria-hidden="true"></div>
     </div>
    </div>
    <div class="background-nav-step"><button type="button" data-bg-prev>‹ 上一張</button><span data-bg-index>1／41</span><button type="button" data-bg-next>下一張 ›</button></div>
    <div class="background-tools"><label>畫面遮擋測試 <select data-bg-cast-choice><option value="none">純背景</option><option value="one">單人＋對話框</option><option value="two">雙人＋對話框</option></select></label><button type="button" data-bg-expand>放大檢視</button></div>
    <p class="background-status" data-bg-status role="status"></p>
    <p class="background-help">手機與桌機都能切換兩種圖片方向。缺少正式圖片時會顯示提示，不會用另一方向代替。</p>
   </div>
  </div>
 </section>`;
}
export function mountBackgroundPreview(root){
 if(!root)return;
 const nav=root.querySelector('[data-bg-nav]'),sidebar=root.querySelector('[data-bg-sidebar]'),toggle=root.querySelector('[data-bg-toggle]');
 const variants=root.querySelector('[data-bg-variants]'),frame=root.querySelector('[data-bg-frame]'),image=root.querySelector('[data-bg-image]'),missing=root.querySelector('[data-bg-missing]');
 const cast=root.querySelector('[data-bg-cast]'),choice=root.querySelector('[data-bg-cast-choice]'),indexLabel=root.querySelector('[data-bg-index]'),status=root.querySelector('[data-bg-status]');
 const prev=root.querySelector('[data-bg-prev]'),next=root.querySelector('[data-bg-next]'),wrap=root.querySelector('[data-bg-wrap]');
 let index=0,direction='desktop',expanded='school',request=0;
 const selected=()=>BACKGROUND_ENTRIES[index];
 const renderNav=()=>{
  nav.innerHTML=BACKGROUND_GROUPS.map(g=>{
   const entries=BACKGROUND_ENTRIES.filter(x=>x.group===g.id),open=expanded===g.id;
   return '<div class="background-group"><button type="button" class="background-group-title" data-bg-group="'+esc(g.id)+'" aria-expanded="'+open+'">'+esc(g.label)+'（'+entries.length+'）</button>'+
    (open?'<div class="background-scene-list">'+g.scenes.map(s=>'<button type="button" data-bg-scene="'+esc(s.id)+'" aria-current="'+(s.id===selected().scene)+'">'+esc(s.label)+'</button>').join('')+'</div>':'')+'</div>';
  }).join('');
 };
 const renderVariants=()=>{
  const e=selected(),scene=BACKGROUND_GROUPS.find(g=>g.id===e.group).scenes.find(s=>s.id===e.scene);
  variants.innerHTML=scene.variants.map(v=>'<button type="button" data-bg-variant="'+esc(v)+'" aria-pressed="'+(e.variant===v)+'">'+BACKGROUND_VARIANT_LABELS[v]+'</button>').join('');
 };
 const drawCast=()=>{
  const type=choice.value;
  cast.hidden=type==='none';
  cast.innerHTML=type==='none'?'':'<div class="background-people">'+Array.from({length:type==='two'?2:1},()=>'<span class="background-test-person"></span>').join('')+'</div><div class="background-test-dialog">對話框遮擋測試（示意）</div>';
 };
 const update=()=>{
  const e=selected(),token=++request;
  renderNav();renderVariants();drawCast();
  frame.classList.toggle('background-frame--desktop',direction==='desktop');
  frame.classList.toggle('background-frame--mobile',direction==='mobile');
  root.querySelectorAll('[data-bg-direction]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.bgDirection===direction)));
  prev.disabled=index===0;next.disabled=index===BACKGROUND_ENTRIES.length-1;
  indexLabel.textContent=(index+1)+'／'+BACKGROUND_ENTRIES.length;
  image.hidden=true;image.removeAttribute('src');missing.hidden=false;missing.textContent='正在檢查背景…';
  status.textContent=e.groupLabel+'／'+e.sceneLabel+'／'+BACKGROUND_VARIANT_LABELS[e.variant]+'｜'+(direction==='desktop'?'橫式':'直式');
  const url=backgroundUrl(e,direction,document.baseURI),candidate=new Image();
  candidate.onload=()=>{
   if(token!==request||!root.isConnected)return;
   const ratio=direction==='desktop'?16/9:9/16;
   if(Math.abs(candidate.naturalWidth/candidate.naturalHeight-ratio)>.015){missing.textContent='圖片比例不符（預期 '+(direction==='desktop'?'16:9':'9:16')+'）';return;}
   image.alt=e.sceneLabel+'／'+BACKGROUND_VARIANT_LABELS[e.variant]+'／'+(direction==='desktop'?'橫式':'直式');
   image.src=url;image.hidden=false;missing.hidden=true;
  };
  candidate.onerror=()=>{if(token===request&&root.isConnected){missing.textContent=(direction==='desktop'?'橫式':'直式')+'背景尚未製作或載入失敗：'+e.filename;}};
  candidate.src=url;
 };
 const pick=i=>{if(i<0||i>=BACKGROUND_ENTRIES.length)return;index=i;expanded=selected().group;update();};
 nav.addEventListener('click',ev=>{
  const group=ev.target.closest('[data-bg-group]');
  if(group){expanded=expanded===group.dataset.bgGroup?'':group.dataset.bgGroup;renderNav();return;}
  const scene=ev.target.closest('[data-bg-scene]');
  if(scene){pick(BACKGROUND_ENTRIES.findIndex(e=>e.scene===scene.dataset.bgScene));sidebar.classList.remove('background-sidebar--open');toggle.setAttribute('aria-expanded','false');}
 });
 variants.addEventListener('click',ev=>{
  const b=ev.target.closest('[data-bg-variant]');if(!b)return;
  const e=selected();pick(BACKGROUND_ENTRIES.findIndex(x=>x.scene===e.scene&&x.variant===b.dataset.bgVariant));
 });
 root.querySelectorAll('[data-bg-direction]').forEach(b=>b.addEventListener('click',()=>{direction=b.dataset.bgDirection;update();}));
 prev.addEventListener('click',()=>pick(index-1));next.addEventListener('click',()=>pick(index+1));
 choice.addEventListener('change',drawCast);
 toggle.addEventListener('click',()=>{const open=sidebar.classList.toggle('background-sidebar--open');toggle.setAttribute('aria-expanded',String(open));});
 root.querySelector('[data-bg-expand]').addEventListener('click',()=>{
  if(document.fullscreenElement===wrap){document.exitFullscreen?.();return;}
  if(wrap.requestFullscreen){wrap.requestFullscreen().catch(()=>{status.textContent+='｜此瀏覽器不支援全螢幕，已維持大圖預覽';});}
  else status.textContent+='｜此瀏覽器不支援全螢幕';
 });
 update();
}
