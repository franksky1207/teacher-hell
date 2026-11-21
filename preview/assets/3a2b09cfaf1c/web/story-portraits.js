/** Formal and developer preview use identical image sources and body-height rules.
 * Visual loads never read or mutate saves. Four outfit sheets have expressions;
 * the casual sheet has six fixed event costumes, not facial expressions.
 */
import {PORTRAIT_PREVIEW_STAGE,portraitDestination,analyzePortraitSheet,portraitExpressionScales} from './student-portrait-layout.js';
import {loadPortraitCalibration,calibrationEntry,calibratedPortraitLayout} from './student-portrait-calibration.js';
import {fullSheetCrop,fullSheetAssetUrl,FULL_SHEET_EXPRESSIONS,FULL_SHEET_CASUAL_SCENES,STUDENT_ART_OUTFITS} from './full-sheet-preview.js';
import {NPC_SILHOUETTE_IDS,NPC_SILHOUETTE_POSES,npcSilhouetteAssetUrl} from './npc-silhouette-preview.js';

const MAX_IMAGES=10;
const images=new Map();
const adultLayouts=new Map();
function cachedImage(key,url){
 if(images.has(key)){
  const cached=images.get(key);images.delete(key);images.set(key,cached);return cached;
 }
 const image=new Image();
 const task=new Promise((resolve,reject)=>{
  image.onload=()=>resolve(image);
  image.onerror=()=>{images.delete(key);reject(new Error('Art unavailable'));};
 });
 images.set(key,task);
 while(images.size>MAX_IMAGES)images.delete(images.keys().next().value);
 image.src=url;
 return task;
}
export function clearStoryArtCache(){images.clear();adultLayouts.clear();}
function isStudent(id){return /^student-0(?:[0-3][0-9]|4[0-4])$/.test(id);}
const legalWear=new Set(STUDENT_ART_OUTFITS.map(([key])=>key));
const legalCasual=new Set(FULL_SHEET_CASUAL_SCENES.map(([key])=>key));
const expressionKeys=FULL_SHEET_EXPRESSIONS.map(([key])=>key);
function indexFor(wear,expression,cell){
 if(wear==='casual')return FULL_SHEET_CASUAL_SCENES.findIndex(([key])=>key===cell);
 return expressionKeys.indexOf(expression);
}
/** Notebook portraits crop to the approved alpha bounds in one source-to-canvas pass.
 * Unlike the wide 1152-square dialogue stage, a vertical identity portrait does
 * not waste pixels on transparent stage margins and stays clear when displayed small.
 */
export function notebookPortraitCrop(entry,index,sourceWidth,sourceHeight){
 const b=entry?.bounds?.[index];
 if(!Array.isArray(b)||b.length!==4||b.some(v=>!Number.isFinite(v))||b[2]<=0||b[3]<=0)return null;
 const cw=sourceWidth/3,ch=sourceHeight/2;
 const padding=18;
 const sx=Math.max(0,Math.floor(b[0]-padding));
 const sy=Math.max(0,Math.floor(b[1]-padding));
 const right=Math.min(cw,Math.ceil(b[0]+b[2]+padding));
 const bottom=Math.min(ch,Math.ceil(b[1]+b[3]+padding));
 if(right<=sx||bottom<=sy)return null;
 const sw=right-sx,sh=bottom-sy;
 const width=640,height=900,margin=20;
 const scale=Math.min((width-2*margin)/sw,(height-2*margin)/sh);
 return {sx,sy,sw,sh,dx:(width-sw*scale)/2,dy:height-margin-sh*scale,
  dw:sw*scale,dh:sh*scale,width,height};
}
async function paintStudent(canvas,manifest){
 const id=canvas.dataset.storyPortrait;
 if(!isStudent(id))return;
 let wear=canvas.dataset.storyWear??'uniform-summer';
 if(!legalWear.has(wear))wear='uniform-summer';
 const expression=canvas.dataset.expression??'calm',cell=canvas.dataset.storyCell??'';
 const index=indexFor(wear,expression,cell);
 if(index<0||wear==='casual'&&!legalCasual.has(cell))return;
 let entry=calibrationEntry(manifest,id,wear);
 // Missing outfit does NOT silently substitute a different outfit.
 if(!entry)return;
 try{
  const image=await cachedImage('student/'+id+'/'+wear+'/'+entry.sha256,
   fullSheetAssetUrl(id,wear,document.baseURI,entry.sha256));
  if(!canvas.isConnected)return;
  const layout=calibratedPortraitLayout(image,entry);
  const crop=fullSheetCrop(wear==='casual'?cell:expression,image.naturalWidth,image.naturalHeight);
  const notebook=canvas.closest('.notebook-student-portrait');
  const dest=notebook?notebookPortraitCrop(entry,index,image.naturalWidth,image.naturalHeight):
   layout&&portraitDestination(layout,index);
  const ctx=canvas.getContext('2d');
  if(!ctx||!dest)return;
  canvas.width=notebook?dest.width:PORTRAIT_PREVIEW_STAGE.width;
  canvas.height=notebook?dest.height:PORTRAIT_PREVIEW_STAGE.height;
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.imageSmoothingEnabled=true;ctx.imageSmoothingQuality='high';
  if(notebook){
   ctx.drawImage(image,crop.sx+dest.sx,crop.sy+dest.sy,dest.sw,dest.sh,
    dest.dx,dest.dy,dest.dw,dest.dh);
  }else{
   ctx.drawImage(image,crop.sx,crop.sy,crop.sw,crop.sh,dest.dx,dest.dy,dest.dw,dest.dh);
  }
  if(canvas.isConnected){
   canvas.closest('.story-actor')?.classList.add('story-actor--art-ready');
   canvas.closest('.notebook-student-portrait')?.classList.add('notebook-student-portrait--art-ready');
  }
 }catch{ /* Keep existing neutral shape, never block game or saves. */ }
}
async function paintAdult(canvas){
 const id=canvas.dataset.storyAdult,pose=canvas.dataset.adultPose??'neutral';
 const person=NPC_SILHOUETTE_IDS.find(a=>a.id===id);
 if(!person)return;
 const index=NPC_SILHOUETTE_POSES.findIndex(([key])=>key===pose);
 if(index<0)return;
 try{
  const image=await cachedImage('adult/'+id,npcSilhouetteAssetUrl(id,document.baseURI,'formal'));
  if(!canvas.isConnected||image.naturalWidth!==1536||image.naturalHeight!==2304)return;
  let layout=adultLayouts.get(id);
  if(!layout){
   const scanned=analyzePortraitSheet(image,PORTRAIT_PREVIEW_STAGE);
   if(scanned.bounds.some(b=>!b))return;
   layout={...scanned,scales:portraitExpressionScales(scanned.bounds,PORTRAIT_PREVIEW_STAGE,person.ratio)};
   adultLayouts.set(id,layout);
  }
  const dest=portraitDestination(layout,index),ctx=canvas.getContext('2d');
  if(!dest||!ctx)return;
  canvas.width=PORTRAIT_PREVIEW_STAGE.width;canvas.height=PORTRAIT_PREVIEW_STAGE.height;
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.drawImage(image,(index%3)*512,Math.floor(index/3)*1152,512,1152,
   dest.dx,dest.dy,dest.dw,dest.dh);
  if(canvas.isConnected)canvas.closest('.story-actor')?.classList.add('story-actor--art-ready');
 }catch{ /* CSS fallback remains visible. */ }
}
export async function mountStoryPortraits(root){
 const studentTargets=[...root.querySelectorAll('canvas[data-story-portrait]')];
 const adultTargets=[...root.querySelectorAll('canvas[data-story-adult]')];
 if(!studentTargets.length&&!adultTargets.length)return;
 // Adults must not depend on the student manifest existing.
 const jobs=adultTargets.map(paintAdult);
 if(studentTargets.length){
  jobs.push(loadPortraitCalibration().then(manifest=>
   Promise.all(studentTargets.map(c=>paintStudent(c,manifest)))).catch(()=>{}));
 }
 await Promise.allSettled(jobs);
}
