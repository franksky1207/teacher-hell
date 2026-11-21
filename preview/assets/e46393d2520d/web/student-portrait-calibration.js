/** Shared *final* portrait calibration. Published alongside the current preview art.
 * Formal dialogue never rescans PNG alpha; incomplete/missing art keeps the placeholder. */
import {PORTRAIT_PREVIEW_STAGE} from './student-portrait-layout.js';
let calibrationRequest=null;
export const portraitCalibrationUrl=base=>new URL('./web/portrait-calibration.json',base).href;
export function loadPortraitCalibration(base=document.baseURI){
 if(!calibrationRequest){
  calibrationRequest=fetch(portraitCalibrationUrl(base)).then(r=>r.ok?r.json():null).catch(()=>null);
 }
 return calibrationRequest;
}
export function calibratedPortraitLayout(image,entry){
 if(!entry||!Array.isArray(entry.bounds)||entry.bounds.length!==6||
  !Array.isArray(entry.scales)||entry.scales.length!==6||
  entry.width!==(image.naturalWidth||image.width)||entry.height!==(image.naturalHeight||image.height))return null;
 const bounds=entry.bounds.map(a=>Array.isArray(a)&&a.length===4?{x:a[0],y:a[1],width:a[2],height:a[3]}:null);
 if(bounds.some(b=>!b||b.height<=0||b.width<=0))return null;
 if(entry.scales.some(s=>!Number.isFinite(s)||s<=0))return null;
 return {bounds,scales:entry.scales,sourceWidth:entry.width/3,sourceHeight:entry.height/2,stage:PORTRAIT_PREVIEW_STAGE};
}
export function calibrationEntry(manifest,id,wear){
 return manifest?.version===1&&manifest?.stage?.bodyHeight===1000?manifest.sheets?.[`${id}/${wear}`]??null:null;
}
