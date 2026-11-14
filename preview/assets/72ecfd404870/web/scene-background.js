/** Resolve only the image required for the current device, and show a neutral
 * gradient when absent or invalid. Display-only: never touches game data.
 */
import {sceneImageUrls} from './scene-context.js';
const mobile=window.matchMedia('(max-width:650px), (orientation:portrait)');
const neutralDesktop='linear-gradient(135deg,#263a52,#121f34)';
const neutralMobile='linear-gradient(180deg,#30445b,#131f33)';
let revision=0,active=null;
const property=mode=>mode==='preview'?'--scene-preview-':'--current-scene-';
function update(){
 if(!active)return;
 const {target,entry,preview,simulateMissing,caption}=active;
 if(!target.isConnected)return;
 const key=++revision,prefix=property(preview?'preview':'game');
 target.style.setProperty(prefix+'desktop',neutralDesktop);
 target.style.setProperty(prefix+'mobile',neutralMobile);
 const fallback=()=>{if(key!==revision||!target.isConnected)return;
  target.dataset.sceneAsset='neutral';if(caption)caption.textContent='背景素材無法使用，已改為中性背景；遊戲進度不受影響。';};
 if(!entry){target.dataset.sceneAsset='neutral';return;}
 target.dataset.sceneAsset='loading';
 if(simulateMissing){fallback();return;}
 const orientation=mobile.matches?'mobile':'desktop';
 const urls=sceneImageUrls(entry,document.baseURI);
 if(!urls){fallback();return;}
 const img=new Image();
 img.onload=()=>{
  if(key!==revision||!target.isConnected)return;
  const required=mobile.matches?9/16:16/9;
  if(!img.naturalWidth||!img.naturalHeight||Math.abs(img.naturalWidth/img.naturalHeight-required)>.015){fallback();return;}
  target.style.setProperty(prefix+orientation,'url("'+urls[orientation]+'")');
  target.dataset.sceneAsset='ready';
  if(caption)caption.textContent='背景已成功載入（'+(orientation==='mobile'?'直式':'橫式')+'）。';
 };
 img.onerror=fallback;
 img.src=urls[orientation];
}
mobile.addEventListener('change',()=>{if(active?.target.isConnected)update();});
export function mountSceneBackground(target,entry,{preview=false,simulateMissing=false,caption=null}={}){
 if(!target)throw new TypeError('Missing scene background target');
 active={target,entry,preview,simulateMissing,caption};
 update();
}
