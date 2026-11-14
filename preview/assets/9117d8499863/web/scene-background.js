/** 15-D: per-surface background loading with small, bounded decode cache.
 * Each target has its own revision so a stale preview cannot alter the game.
 * The only gradient fallback is for missing/invalid artwork.
 */
import {sceneImageUrls} from './scene-context.js';
const query=window.matchMedia('(max-width:650px), (orientation:portrait)');
const neutralDesktop='linear-gradient(135deg,#263a52,#121f34)';
const neutralMobile='linear-gradient(180deg,#30445b,#131f33)';
const surfaces=new Map();
const decoded=new Map();
const MAX_SCENES=6;
function imageFor(url){
 if(decoded.has(url)){const found=decoded.get(url);decoded.delete(url);decoded.set(url,found);return found;}
 const img=new Image();
 const task=new Promise((resolve,reject)=>{
  img.onload=()=>resolve(img);
  img.onerror=()=>{decoded.delete(url);reject(new Error('Background unavailable'));};
 });
 decoded.set(url,task);
 while(decoded.size>MAX_SCENES)decoded.delete(decoded.keys().next().value);
 img.src=url;
 return task;
}
export function clearSceneImageCache(){decoded.clear();}
function update(target,item){
 if(!target.isConnected)return;
 const token=++item.revision;
 const prefix=item.preview?'--scene-preview-':'--current-scene-';
 target.style.setProperty(prefix+'desktop',neutralDesktop);
 target.style.setProperty(prefix+'mobile',neutralMobile);
 const fail=()=>{
  if(item.revision!==token||!target.isConnected)return;
  target.dataset.sceneAsset='neutral';
  if(item.caption)item.caption.textContent='背景素材無法使用，已改為中性背景；遊戲進度不受影響。';
 };
 if(!item.entry){fail();return;}
 target.dataset.sceneAsset='loading';
 if(item.simulateMissing){fail();return;}
 const orientation=query.matches?'mobile':'desktop';
 const urls=sceneImageUrls(item.entry,document.baseURI);
 if(!urls?.[orientation]){fail();return;}
 const url=urls[orientation];
 imageFor(url).then(img=>{
  if(item.revision!==token||!target.isConnected)return;
  const ratio=query.matches?9/16:16/9;
  if(!img.naturalWidth||!img.naturalHeight||Math.abs(img.naturalWidth/img.naturalHeight-ratio)>.015){fail();return;}
  target.style.setProperty(prefix+orientation,'url("'+url+'")');
  target.dataset.sceneAsset='ready';
  if(item.caption)item.caption.textContent='背景已成功載入（'+(orientation==='mobile'?'直式':'橫式')+'）。';
 }).catch(fail);
}
query.addEventListener('change',()=>{
 for(const [target,item] of surfaces){
  if(!target.isConnected){surfaces.delete(target);continue;}
  update(target,item);
 }
});
export function mountSceneBackground(target,entry,{preview=false,simulateMissing=false,caption=null}={}){
 if(!target)throw new TypeError('Missing scene background target');
 const previous=surfaces.get(target);
 const item={entry,preview,simulateMissing,caption,revision:previous?.revision??0};
 surfaces.set(target,item);
 // Preview nodes are replaced frequently; clean dead nodes now.
 for(const node of surfaces.keys())if(!node.isConnected)surfaces.delete(node);
 update(target,item);
}
