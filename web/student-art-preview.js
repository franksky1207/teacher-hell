/** Phase 15-B preview-only artwork entrypoint. Does not choose a real NPC or modify story/save data. */
export const STUDENT_001_EXPRESSIONS=Object.freeze({calm:'平靜',happy:'開心',surprised:'驚訝',angry:'生氣',sad:'難過',embarrassed:'尷尬'});
export function studentArtUrl(expression){
 if(!Object.hasOwn(STUDENT_001_EXPRESSIONS,expression))throw new RangeError('Unknown prototype expression');
 const name=expression==='calm'?'student-001-base-uniform-summer.png':`student-001-expression-${expression}.png`;
 return new URL(`./assets/characters/students/${expression==='calm'?'base':'expressions'}/${name}`,import.meta.url).href;
}
export function renderStudentArtPrototype(){
 return `<section class="student-art-preview" aria-label="student-001立繪原型">
   <p>這是已接入遊戲預覽的立繪素材入口；目前只有第一名學生的美術原型，不會套用到其他學生或更動存檔。</p>
   <div class="student-art-stage" aria-label="立繪顯示區">
     <img class="student-art-fixed" src="${studentArtUrl('calm')}" alt="" decoding="async">
     <img class="student-art-fade student-art-fade--visible" src="${studentArtUrl('calm')}" alt="" decoding="async">
     <img class="student-art-fade" src="${studentArtUrl('calm')}" alt="" decoding="async">
   </div>
   <div class="student-art-buttons" role="group" aria-label="選擇立繪表情">${Object.entries(STUDENT_001_EXPRESSIONS).map(([key,label])=>`<button type="button" data-art-expression="${key}" aria-pressed="${key==='calm'}">${label}</button>`).join('')}</div>
   <p class="student-art-status" role="status">平靜｜人物原地切換，約180毫秒交叉淡化</p>
 </section>`;
}
export function mountStudentArtPrototype(root){
 const layers=[...root.querySelectorAll('.student-art-fade')];
 const status=root.querySelector('.student-art-status');
 const controls=root.querySelector('.student-art-buttons');
 if(layers.length!==2||!status||!controls)throw new TypeError('Invalid artwork preview root');
 const cache=new Map();
 let current='calm',front=0,version=0;
 function preload(key){
  if(!cache.has(key)){
   const img=new Image();img.src=studentArtUrl(key);
   cache.set(key,new Promise(resolve=>{if(img.complete)resolve(img.naturalWidth>0);else {img.onload=()=>resolve(true);img.onerror=()=>resolve(false)}}));
  }
  return cache.get(key);
 }
 for(const key of Object.keys(STUDENT_001_EXPRESSIONS))void preload(key);
 async function choose(key){
  if(!Object.hasOwn(STUDENT_001_EXPRESSIONS,key)||key===current)return;
  const id=++version;
  if(!await preload(key)){if(id===version)status.textContent='圖片無法載入，已保留原表情';return;}
  if(id!==version||!root.isConnected)return;
  const incoming=1-front,outgoing=front;
  layers[outgoing].src=studentArtUrl(current);
  layers[outgoing].style.transition='none';
  layers[outgoing].classList.toggle('student-art-fade--visible',current!=='calm');
  layers[incoming].src=studentArtUrl(key);
  layers[incoming].style.transition='none';
  layers[incoming].classList.remove('student-art-fade--visible');
  void layers[incoming].offsetWidth;
  for(const layer of layers)layer.style.transition='';
  layers[incoming].classList.toggle('student-art-fade--visible',key!=='calm');
  layers[outgoing].classList.remove('student-art-fade--visible');
  current=key;front=incoming;
  controls.querySelectorAll('[data-art-expression]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.artExpression===key)));
  status.textContent=STUDENT_001_EXPRESSIONS[key]+'｜原地交叉淡化';
 }
 controls.addEventListener('click',event=>{const button=event.target.closest('[data-art-expression]');if(button&&controls.contains(button))void choose(button.dataset.artExpression);});
}
