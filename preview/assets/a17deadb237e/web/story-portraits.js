/** Formal story art uses exactly the preview's published, precomputed pixel scales. */
import {PORTRAIT_PREVIEW_STAGE,portraitDestination} from './student-portrait-layout.js';
import {loadPortraitCalibration,calibrationEntry,calibratedPortraitLayout} from './student-portrait-calibration.js';
import {fullSheetCrop,fullSheetAssetUrl,FULL_SHEET_EXPRESSIONS} from './full-sheet-preview.js';
const artCache=new Map();
function imageFor(id,wear,entry){
 const key=`${id}/${wear}/${entry.sha256}`;
 if(!artCache.has(key)){
  const img=new Image();
  const result=new Promise((resolve,reject)=>{img.onload=()=>resolve(img);img.onerror=()=>reject(new Error('Portrait art missing'));});
  img.src=fullSheetAssetUrl(id,wear,document.baseURI,entry.sha256);
  artCache.set(key,result);
 }
 return artCache.get(key);
}
export async function mountStoryPortraits(root){
 const targets=[...root.querySelectorAll('canvas[data-story-portrait]')];
 if(!targets.length)return;
 const manifest=await loadPortraitCalibration();
 for(const canvas of targets){
  if(!canvas.isConnected)continue;
  const id=canvas.dataset.storyPortrait,expression=canvas.dataset.expression;
  if(!/^student-0(?:[0-3][0-9]|40)$/.test(id)||!FULL_SHEET_EXPRESSIONS.some(([name])=>name===expression))continue;
  const wear='uniform-summer'; // Formal costume selection will supply a valid tag later.
  const entry=calibrationEntry(manifest,id,wear);
  if(!entry)continue;
  try{
   const image=await imageFor(id,wear,entry);
   if(!canvas.isConnected)continue;
   const layout=calibratedPortraitLayout(image,entry),index=FULL_SHEET_EXPRESSIONS.findIndex(([name])=>name===expression);
   if(!layout||index<0)continue;
   const c=fullSheetCrop(expression,image.naturalWidth,image.naturalHeight),d=portraitDestination(layout,index);
   if(!d)continue;
   canvas.width=PORTRAIT_PREVIEW_STAGE.width;canvas.height=PORTRAIT_PREVIEW_STAGE.height;
   const ctx=canvas.getContext('2d');
   if(!ctx)continue;
   ctx.clearRect(0,0,canvas.width,canvas.height);
   ctx.drawImage(image,c.sx,c.sy,c.sw,c.sh,d.dx,d.dy,d.dw,d.dh);
   canvas.closest('.story-actor')?.classList.add('story-actor--art-ready');
  }catch{ /* Keep the neutral legacy silhouette; story and saves always continue. */ }
 }
}
