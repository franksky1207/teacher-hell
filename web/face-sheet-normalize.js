// Six-expression color normalization. Pure pixel processing with no person-specific RGB constants.
// The region proportions are a first-pass neutral-skin estimate; every outfit needs visual QA.
const clamp=v=>Math.max(0,Math.min(1,v));
const smooth=(a,b,x)=>{const t=clamp((x-a)/(b-a));return t*t*(3-2*t);};
const srgb=v=>{v/=255;return v<=0.04045?v/12.92:Math.pow((v+0.055)/1.055,2.4);};
function lab(r,g,b){
 const R=srgb(r),G=srgb(g),B=srgb(b);
 const x=(.4124564*R+.3575761*G+.1804375*B)/.95047;
 const y=(.2126729*R+.7151522*G+.072175*B);
 const z=(.0193339*R+.1191920*G+.9503041*B)/1.08883;
 const f=v=>v>0.008856451679?Math.cbrt(v):(7.787037037*v+16/116);
 const fx=f(x),fy=f(y),fz=f(z);
 return [116*fy-16,500*(fx-fy),200*(fy-fz)];
}
function median(sorted){if(!sorted.length)throw new Error('母圖鼻側取樣範圍為空');return sorted[(sorted.length-1)>>1];}
function blurMask(source,w,h){
 const sigma=1.3,r=4,k=[];let sum=0;
 for(let i=-r;i<=r;i++){const weight=Math.exp(-i*i/(2*sigma*sigma));k.push(weight);sum+=weight;}
 const tmp=new Float32Array(source.length),out=new Float32Array(source.length);
 for(let y=0;y<h;y++)for(let x=0;x<w;x++){let v=0;for(let t=-r;t<=r;t++)v+=source[y*w+Math.max(0,Math.min(w-1,x+t))]*k[t+r];tmp[y*w+x]=v/sum;}
 for(let y=0;y<h;y++)for(let x=0;x<w;x++){let v=0;for(let t=-r;t<=r;t++)v+=tmp[Math.max(0,Math.min(h-1,y+t))*w+x]*k[t+r];out[y*w+x]=v/sum;}
 return out;
}
function asBytes(v,len,name){if(!v||v.length!==len)throw new Error(name+' 的像素資料長度不符');}
export function normalizeSixExpressionPixels(basePixels,sheetPixels,w,h,order){
 if(!Number.isInteger(w)||!Number.isInteger(h)||w<24||h<24)throw new Error('臉部尺寸不適用');
 const size=w*h;asBytes(basePixels,size*4,'母圖');asBytes(sheetPixels,size*6*4,'圖集');
 if(order?.join(',')!=='calm,happy,angry,sad,surprised,embarrassed')throw new Error('六表情順序不符合 SOP');
 const stride=w*3,firstAlpha=new Uint8Array(size);
 for(let y=0;y<h;y++)for(let x=0;x<w;x++)firstAlpha[y*w+x]=sheetPixels[(y*stride+x)*4+3];
 for(let index=1;index<6;index++){const col=index%3,row=index/3|0;for(let y=0;y<h;y++)for(let x=0;x<w;x++){
  if(sheetPixels[((row*h+y)*stride+col*w+x)*4+3]!==firstAlpha[y*w+x])throw new Error('六格 Alpha 遮罩不一致，必須先重做對位');
 }}
 const nose=[];
 for(let y=Math.floor(h*.44);y<Math.floor(h*.58);y++)for(let x=Math.floor(w*.43);x<Math.floor(w*.59);x++){
  const i=(y*w+x)*4;nose.push([basePixels[i],basePixels[i+1],basePixels[i+2]]);
 }
 const luminances=nose.map(v=>(v[0]+v[1]+v[2])/3).sort((a,b)=>a-b);
 const threshold=luminances[Math.floor(.65*(luminances.length-1))];
 const refs=nose.filter(v=>(v[0]+v[1]+v[2])/3>=threshold);
 const reference=[0,1,2].map(k=>median(refs.map(v=>v[k]).sort((a,b)=>a-b)));
 const refLab=lab(...reference),skin=new Float32Array(size),region=new Float32Array(size);
 for(let y=0;y<h;y++)for(let x=0;x<w;x++){const j=y*w+x,i=j*4;
  const l=lab(basePixels[i],basePixels[i+1],basePixels[i+2]);
  const dist=Math.hypot(l[0]-refLab[0],l[1]-refLab[1],l[2]-refLab[2]);
  skin[j]=smooth(33,17,dist);
  const u=x/w,v=y/h;
  const right=smooth(.56,.66,u)*smooth(.54,.72,v);
  const left=(1-smooth(.25,.39,u))*smooth(.63,.77,v);
  region[j]=Math.max(right,left);
 }
 const soft=blurMask(skin,w,h),out=new Uint8ClampedArray(sheetPixels),changed={};
 for(let index=0;index<6;index++){const col=index%3,row=index/3|0;let count=0;
  for(let y=0;y<h;y++)for(let x=0;x<w;x++){const baseIndex=(y*w+x)*4,sheetIndex=((row*h+y)*stride+col*w+x)*4,j=y*w+x;
   const a=sheetPixels[sheetIndex+3]/255;let dark=0;
   for(let k=0;k<3;k++){
    const b=basePixels[baseIndex+k],p=sheetPixels[sheetIndex+k];
    dark+=(b-(p*a+b*(1-a)))/3;
   }
   const correction=region[j]*soft[j]*smooth(3,16,dark);
   if(correction>.05)count++;
   for(let k=0;k<3;k++)out[sheetIndex+k]=Math.round(sheetPixels[sheetIndex+k]*(1-correction)+basePixels[baseIndex+k]*correction);
  }
  changed[order[index]]=count;
 }
 return {pixels:out,changed};
}
// Preview-stage repair for a *measured* garment/face combination.
// The root issue here is not only cheek shading: a fragment of the calm mouth
// survives to the right of the angry mouth. Restoring calm pixels alone would
// restore that old mouth stroke, so the final small area needs skin healing.
// Keep the mouth and the ORIGINAL outer jaw outline; do not shift either.
export function repairAngryWinterCheekPixels(basePixels,sheetPixels,w,h){
 if(w!==223||h!==184)throw new Error('校正區域需依服裝重新定位');
 const width=w*3, result=new Uint8ClampedArray(sheetPixels), angryX=w*2;
 // Stage 1: replace the non-expression inner right cheek with its calm baseline,
 // feathering away from the *new* angry mouth. Original outline is untouched.
 for(let y=0;y<h;y++)for(let x=0;x<w;x++){
  const boundary=133-Math.max(0,Math.min(50,y-125))*.85;
  const mx=clamp((x-boundary)/6),my=clamp((y-121)/8);
  const weight=(mx*mx*(3-2*mx))*(my*my*(3-2*my));
  if(weight<=0)continue;
  const src=(y*w+x)*4,dst=(y*width+angryX+x)*4;
  for(let k=0;k<3;k++)result[dst+k]=Math.round(result[dst+k]*(1-weight)+basePixels[src+k]*weight);
 }
 // Stage 2: the remaining *calm mouth* remnant is at the right of angry's mouth.
 // Heal it from clean nearby baseline skin; never touch the angry mouth.
 for(let y=134;y<=152;y++)for(let x=116;x<=138;x++){
  const r=((x-124)/13)**2+((y-144)/8)**2;
  if(r>1)continue;
  const weight=clamp((1-r)*5);
  const src=((y-15)*w+Math.min(w-1,x+13))*4;
  const dst=(y*width+angryX+x)*4;
  for(let k=0;k<3;k++)result[dst+k]=Math.round(result[dst+k]*(1-weight)+basePixels[src+k]*weight);
 }
 return result;
}

export function normalizeSixExpressionCanvas(base,sheet,metadata){
 const {face,canvas,sheetLayout}=metadata;
 const w=face.width,h=face.height;
 const b=document.createElement('canvas');b.width=w;b.height=h;
 const bc=b.getContext('2d',{willReadFrequently:true});
 bc.drawImage(base,face.x,face.y,w,h,0,0,w,h);
 const a=document.createElement('canvas');a.width=w*3;a.height=h*2;
 const ac=a.getContext('2d',{willReadFrequently:true});ac.drawImage(sheet,0,0);
 const original=ac.getImageData(0,0,a.width,a.height);
 const basePixels=bc.getImageData(0,0,w,h).data;
 const result=normalizeSixExpressionPixels(basePixels,original.data,w,h,sheetLayout.order);
 // Outfit-specific calibration, not a fixed rule for other students' faces.
 const calibrated=(metadata.studentId==='student-001'&&metadata.outfit==='uniform-winter')
  ?repairAngryWinterCheekPixels(basePixels,result.pixels,w,h):result.pixels;
 original.data.set(calibrated);ac.putImageData(original,0,0);
 return {canvas:a,changed:result.changed};
}
