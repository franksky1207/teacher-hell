import test from 'node:test';
import assert from 'node:assert/strict';
import {STUDENT_ART_IDS,STUDENT_ART_OUTFITS,STUDENT_ART_EXPRESSIONS,studentArtAvailability,studentArtSheetCell,renderStudentArtPrototype} from '../web/student-art-preview.js';
test('forty student identities and eight Chinese outfit choices',()=>{
 assert.equal(STUDENT_ART_IDS.length,40);
 assert.equal(new Set(STUDENT_ART_IDS).size,40);
 assert.equal(STUDENT_ART_OUTFITS.length,8);
 assert.equal(STUDENT_ART_EXPRESSIONS.length,6);
 assert.equal(studentArtAvailability('student-001','uniform-winter'),'full');
 assert.equal(studentArtAvailability('student-001','uniform-summer'),'full');
 assert.equal(studentArtAvailability('student-002','uniform-winter'),'missing');
 const html=renderStudentArtPrototype();
 assert.match(html,/學生 001/);assert.match(html,/學生 040/);
 assert.match(html,/冬季制服/);assert.match(html,/冬季便服 B/);
 assert.equal((html.match(/data-art-expression=/g)||[]).length,6);
});
test('winter sheet geometry matches 223x184 tiles in row-major order',()=>{
 const m={sheetLayout:{columns:3,rows:2,order:['calm','happy','angry','sad','surprised','embarrassed']},face:{x:405,y:205,width:223,height:184},canvas:{width:1024,height:1536}};
 const cells=STUDENT_ART_EXPRESSIONS.map(([key])=>studentArtSheetCell(m,key));
 assert.deepEqual(cells.map(c=>[c.sx,c.sy]),[[0,0],[223,0],[446,0],[0,184],[223,184],[446,184]]);
 for(const cell of cells){assert.equal(cell.dx,405);assert.equal(cell.dy,205);assert.equal(cell.sw,223);assert.equal(cell.sh,184)}
 assert.throws(()=>studentArtSheetCell({...m,face:{...m.face,x:990}},'happy'),/超出母圖/);
});

import {normalizeSixExpressionPixels,repairAngryWinterCheekPixels} from '../web/face-sheet-normalize.js';
test('six-expression normalization preserves every alpha and does not alter calm',()=>{
 const w=32,h=32,pixelCount=w*h,base=new Uint8ClampedArray(pixelCount*4),sheet=new Uint8ClampedArray(pixelCount*6*4);
 for(let i=0;i<pixelCount;i++){base.set([221,163,145,255],i*4);}
 const stride=w*3;
 for(let t=0;t<6;t++){const col=t%3,row=t/3|0;for(let y=0;y<h;y++)for(let x=0;x<w;x++){
 const p=((row*h+y)*stride+col*w+x)*4;sheet.set([221,163,145,255],p);
 if(t>0&&x>22&&y>24)sheet.set([154,103,90,255],p);
 }}
 const old=sheet.slice();
 const order=['calm','happy','angry','sad','surprised','embarrassed'];
 const out=normalizeSixExpressionPixels(base,sheet,w,h,order);
 for(let y=0;y<h;y++)for(let x=0;x<w;x++){
  const p=(y*stride+x)*4;
  assert.deepEqual([...out.pixels.slice(p,p+4)],[...old.slice(p,p+4)]);
 }
 for(let i=3;i<old.length;i+=4)assert.equal(out.pixels[i],old[i]);
 const p=((h+29)*stride+25)*4;
 assert.ok(out.pixels[p]>old[p],'normalizing should reduce inappropriate skin darkness');
 assert.ok(out.changed.happy>0&&out.changed.angry>0);
});
test('rejects inconsistent six tile alpha masks instead of hiding misalignment',()=>{
 const w=24,h=24,b=new Uint8ClampedArray(w*h*4),s=new Uint8ClampedArray(w*h*6*4);
 s[3]=255;
 assert.throws(()=>normalizeSixExpressionPixels(b,s,w,h,['calm','happy','angry','sad','surprised','embarrassed']),/Alpha 遮罩不一致/);
});

test('winter angry jaw repair removes neutral-face shadow and calm mouth remnant without changing silhouette or other expressions',()=>{
 const w=223,h=184,stride=w*3,base=new Uint8ClampedArray(w*h*4);
 const sheet=new Uint8ClampedArray(w*h*6*4);
 for(let i=0;i<w*h;i++)base.set([240,202,186,253],i*4);
 for(let i=0;i<w*h*6;i++)sheet.set([240,202,186,255],i*4);
 const pos=(x,y)=>(y*stride+2*w+x)*4;
 for(let y=142;y<164;y++)for(let x=145;x<175;x++)sheet.set([83,64,61,255],pos(x,y));
 sheet.set([51,50,49,255],pos(124,144));
 // The angry mouth is to the left and must remain exactly the same.
 sheet.set([70,40,40,255],pos(90,140));
 const fixed=repairAngryWinterCheekPixels(base,sheet,w,h);
 assert.ok(fixed[pos(160,154)]>sheet[pos(160,154)],'shadow must lighten');
 assert.ok(fixed[pos(124,144)]>sheet[pos(124,144)],'old calm mouth trace must heal');
 assert.deepEqual([...fixed.slice(pos(90,140),pos(90,140)+4)],[...sheet.slice(pos(90,140),pos(90,140)+4)]);
 for(let i=0;i<sheet.length;i+=4)assert.equal(fixed[i+3],sheet[i+3],'alpha unchanged');
 assert.deepEqual([...fixed.slice(0,w*h*4)],[...sheet.slice(0,w*h*4)],'calm tile must be untouched');
});
