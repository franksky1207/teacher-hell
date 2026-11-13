// Shared transparent-bounds portrait layout for preview and future game dialogue sprites.
// Source cell stays 512×1152; the display canvas is wider to preserve broad shoulders.
export const PORTRAIT_STAGE=Object.freeze({width:768,height:1152,bodyHeight:1000,maxBodyWidth:690,bottom:18});
// Square preview stage: wider room for gestures, responsive on phones without changing PNGs.
export const PORTRAIT_PREVIEW_STAGE=Object.freeze({width:1152,height:1152,bodyHeight:1000,maxBodyWidth:1000,bottom:18});
// Approved 44-student relative heights (015 = 100%), independent of PNG crop.
// Both genders share a single presentation scale, not actual heights in centimeters.
const MALE_HEIGHT_RATIOS=Object.freeze([
  0.91,0.99,0.85,0.96,0.93,0.90,0.89,0.93,0.90,0.87,
  0.97,0.83,0.98,0.90,1.00,0.94,0.91,0.86,0.93,0.94
]);
// Female students 021–040 follow the same 015 = 100% reference.
const FEMALE_HEIGHT_RATIOS=Object.freeze([
  0.87,0.94,0.79,0.90,0.84,0.88,0.93,0.91,0.90,0.87,
  0.82,0.94,0.86,0.90,0.84,0.95,0.86,0.89,0.80,0.89
]);
// Transfer reserves 041–044 use the same highest-student reference; no new baseline.
const TRANSFER_HEIGHT_RATIOS=Object.freeze([0.95,0.93,0.91,0.85]);
export function studentPortraitHeightRatio(id){
 const match=/^student-(\d{3})$/.exec(String(id));
 if(!match)return null;
 const number=Number(match[1]);
 if(number>=1&&number<=20)return MALE_HEIGHT_RATIOS[number-1];
 if(number>=21&&number<=40)return FEMALE_HEIGHT_RATIOS[number-21];
 if(number>=41&&number<=44)return TRANSFER_HEIGHT_RATIOS[number-41];
 return null;
}
const EXPRESSIONS=6;
export function analyzePortraitSheet(image,stage=PORTRAIT_STAGE,studentId=null){
 const w=image.naturalWidth||image.width,h=image.naturalHeight||image.height;
 if(!w||!h||w%3||h%2)throw new Error('人物六圖尺寸不正確');
 const cw=w/3,ch=h/2;
 const scratch=document.createElement('canvas');
 scratch.width=cw;scratch.height=ch;
 const ctx=scratch.getContext('2d',{willReadFrequently:true});
 if(!ctx)throw new Error('無法分析人物透明區域');
 const bounds=[];
 for(let index=0;index<EXPRESSIONS;index++){
  ctx.clearRect(0,0,cw,ch);
  ctx.drawImage(image,(index%3)*cw,Math.floor(index/3)*ch,cw,ch,0,0,cw,ch);
  const pixels=ctx.getImageData(0,0,cw,ch).data;
  let left=cw,top=ch,right=-1,bottom=-1;
  // Ignore faint anti-aliasing and isolated fringe pixels.
  for(let y=0;y<ch;y+=2)for(let x=0;x<cw;x+=2){
   if(pixels[(y*cw+x)*4+3]<96)continue;
   left=Math.min(left,x);right=Math.max(right,x);
   top=Math.min(top,y);bottom=Math.max(bottom,y);
  }
  bounds.push(right<0?null:{x:left,y:top,width:right-left+2,height:bottom-top+2});
 }
 const sizes=bounds.filter(Boolean);
 if(!sizes.length)throw new Error('圖片沒有可見人物');
 // All 44 art profiles share a fixed height target relative to student-015.
 const scales=portraitExpressionScales(bounds,stage,studentPortraitHeightRatio(studentId));
 return {bounds,scales,sourceWidth:cw,sourceHeight:ch,stage};
}
// Match visible height within each student while preserving aspect ratio and margins.
// An explicit height ratio overrides source-crop height for all 40 approved students.
export function portraitExpressionScales(bounds,stage=PORTRAIT_STAGE,heightRatio=null){
 const sizes=bounds.filter(b=>b&&b.height>0&&b.width>0);
 if(!sizes.length)return bounds.map(()=>null);
 const heights=sizes.map(b=>b.height).sort((a,b)=>a-b);
 const referenceHeight=heights[Math.floor(heights.length/2)];
 const requestedHeight=(Number.isFinite(heightRatio)&&heightRatio>0&&heightRatio<=1)
  ?stage.bodyHeight*heightRatio:referenceHeight;
 const safeHeight=Math.max(1,stage.height-stage.bottom-12);
 // Wide gestures set a shared upper limit so all six expressions stay equally tall.
 const targetHeight=Math.min(requestedHeight,stage.bodyHeight,safeHeight,
  ...sizes.map(b=>stage.maxBodyWidth*b.height/b.width));
 return bounds.map(b=>b&&b.height>0?targetHeight/b.height:null);
}
export function portraitDestination(layout,index){
 const b=layout.bounds[index];
 if(!b)return null;
 const {stage}=layout;
 const scale=layout.scales?.[index]??layout.scale;
 if(!Number.isFinite(scale)||scale<=0)return null;
 return {
  dx:(stage.width-b.width*scale)/2-b.x*scale,
  dy:stage.height-stage.bottom-(b.y+b.height)*scale,
  dw:layout.sourceWidth*scale,dh:layout.sourceHeight*scale
 };
}
