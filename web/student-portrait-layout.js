// Shared transparent-bounds portrait layout for preview and future game dialogue sprites.
// Source cell stays 512×1152; the display canvas is wider to preserve broad shoulders.
export const PORTRAIT_STAGE=Object.freeze({width:768,height:1152,bodyHeight:1000,maxBodyWidth:690,bottom:18});
// Square preview stage: wider room for gestures, responsive on phones without changing PNGs.
export const PORTRAIT_PREVIEW_STAGE=Object.freeze({width:1152,height:1152,bodyHeight:1000,maxBodyWidth:1000,bottom:18});
const EXPRESSIONS=6;
export function analyzePortraitSheet(image,stage=PORTRAIT_STAGE){
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
 // The six expressions of THIS student share one visible target height.
 // Different students keep their own reference height; never normalize all 40 to 1000px.
 const scales=portraitExpressionScales(bounds,stage);
 return {bounds,scales,sourceWidth:cw,sourceHeight:ch,stage};
}
// Match visible height within one student while preserving proportions and safe margins.
// The median visible height is this sheet's own reference, NOT a class-wide constant.
export function portraitExpressionScales(bounds,stage=PORTRAIT_STAGE){
 const sizes=bounds.filter(b=>b&&b.height>0&&b.width>0);
 if(!sizes.length)return bounds.map(()=>null);
 const heights=sizes.map(b=>b.height).sort((a,b)=>a-b);
 const referenceHeight=heights[Math.floor(heights.length/2)];
 const safeHeight=Math.max(1,stage.height-stage.bottom-12);
 // Wide gestures set a shared upper limit so all six expressions stay equally tall.
 const targetHeight=Math.min(referenceHeight,stage.bodyHeight,safeHeight,
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
