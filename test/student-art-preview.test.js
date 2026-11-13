import {calibrationEntry,calibratedPortraitLayout,portraitCalibrationUrl} from '../web/student-portrait-calibration.js';
import {PORTRAIT_STAGE,PORTRAIT_PREVIEW_STAGE,studentPortraitHeightRatio,portraitExpressionScales,portraitDestination} from '../web/student-portrait-layout.js';
import test from 'node:test';
import assert from 'node:assert/strict';
import {STUDENT_ART_IDS,STUDENT_ART_OUTFITS,FULL_SHEET_EXPRESSIONS,FULL_SHEET_CASUAL_SCENES,FULL_SHEET_CELL,fullSheetChoices,fullSheetCrop,fullSheetAssetUrl,renderFullSheetPreview} from '../web/full-sheet-preview.js';
test('full sheet is the only student preview, with 44 ids and 5 outfit categories',()=>{
 assert.equal(STUDENT_ART_IDS.length,44);
 assert.equal(new Set(STUDENT_ART_IDS).size,44);
 assert.equal(STUDENT_ART_OUTFITS.length,5);
 assert.deepEqual(STUDENT_ART_OUTFITS.map(([id])=>id),['uniform-summer','uniform-winter','sports-summer','sports-winter','casual']);
 assert.deepEqual(FULL_SHEET_CELL,{columns:3,rows:2,width:512,height:1152});
 const html=renderFullSheetPreview();
 assert.equal((html.match(/data-full-sheet-expression=/g)||[]).length,6);
 assert.equal((html.match(/<option value="student-/g)||[]).length,44);
 assert.equal((html.match(/<option value="(?:uniform-|sports-|casual)/g)||[]).length,5);
 assert.doesNotMatch(html,/data-art-expression=/);
 assert.match(html,/data-full-sheet-canvas width="1152" height="1152"/);
 assert.match(html,/學生 040/);
 for(let number=41;number<=44;number++){
  const id='student-'+String(number).padStart(3,'0');
  assert.ok(STUDENT_ART_IDS.includes(id));
  assert.match(html,new RegExp('value="'+id+'">備用轉入生 '+String(number).padStart(3,'0')));
 }
 assert.equal(STUDENT_ART_IDS[40],'student-041');
 assert.equal(STUDENT_ART_IDS.at(-1),'student-044');
});
test('overwritten character PNG uses the live preview asset directory and an uncached request',()=>{
 const base='https://franksky1207.github.io/teacher-hell/preview/';
 const first=fullSheetAssetUrl('student-010','uniform-summer',base,'first');
 const second=fullSheetAssetUrl('student-010','uniform-summer',base,'second');
 assert.match(first,/\/preview\/web\/assets\/characters\/students\/student-010\/student-010-full-sheet-uniform-summer\.png\?refresh=first$/);
 assert.notEqual(first,second);
 assert.doesNotMatch(first,/\/assets\/[a-f0-9]{12}\/web\/assets\//);
 assert.match(renderFullSheetPreview(),/data-full-sheet-version/);
});

test('six expressions crop 1536 x 2304 in row-major order',()=>{
 assert.deepEqual(FULL_SHEET_EXPRESSIONS.map(([id])=>fullSheetCrop(id)),[
  {sx:0,sy:0,sw:512,sh:1152},{sx:512,sy:0,sw:512,sh:1152},
  {sx:1024,sy:0,sw:512,sh:1152},{sx:0,sy:1152,sw:512,sh:1152},
  {sx:512,sy:1152,sw:512,sh:1152},{sx:1024,sy:1152,sw:512,sh:1152}
 ]);
 assert.throws(()=>fullSheetCrop('invalid'),/未知/);
 assert.throws(()=>fullSheetCrop('happy',1025,1536),/3×2/);
});

test('casual is one six-cell sheet, each scene has its own outfit and positive pose',()=>{
 assert.equal(FULL_SHEET_CASUAL_SCENES.length,6);
 assert.deepEqual(FULL_SHEET_CASUAL_SCENES.map(([id])=>id),[
  'grade1-autumn-trip','grade2-autumn-trip','grade1-spring-trip',
  'graduation-trip-1','graduation-trip-2','graduation-trip-3'
 ]);
 assert.deepEqual(fullSheetChoices('casual'),FULL_SHEET_CASUAL_SCENES);
 assert.deepEqual(fullSheetChoices('uniform-summer'),FULL_SHEET_EXPRESSIONS);
 assert.deepEqual(FULL_SHEET_CASUAL_SCENES.map(([id])=>fullSheetCrop(id)),FULL_SHEET_EXPRESSIONS.map(([id])=>fullSheetCrop(id)));
 const url=fullSheetAssetUrl('student-001','casual','https://franksky1207.github.io/teacher-hell/preview/','sample');
 assert.ok(url.endsWith('/student-001-full-sheet-casual.png?refresh=sample'));
 const html=renderFullSheetPreview();
 assert.match(html,/便服為六種開心活動情境/);
 assert.doesNotMatch(html,/casual-summer-01|casual-summer-02|casual-winter-01|casual-winter-02/);
});

test('portrait presentation preserves anatomy and shares a stable scaling factor',()=>{
 assert.equal(PORTRAIT_STAGE.width,768);
 const layout={stage:PORTRAIT_STAGE,scale:1.2,sourceWidth:512,sourceHeight:1152,bounds:[{x:40,y:100,width:400,height:900},{x:60,y:110,width:360,height:890}]};
 const a=portraitDestination(layout,0),b=portraitDestination(layout,1);
 assert.equal(a.dw,b.dw);
 assert.equal(a.dh,b.dh);
 assert.equal((a.dx+40*1.2)+(400*1.2)/2,PORTRAIT_STAGE.width/2);
 assert.equal(a.dy+(100+900)*1.2,PORTRAIT_STAGE.height-PORTRAIT_STAGE.bottom);
 assert.equal(portraitDestination(layout,2),null);
});

test('square preview stage expands horizontal room without changing sprite cells',()=>{
 assert.equal(PORTRAIT_PREVIEW_STAGE.width,1152);
 assert.equal(PORTRAIT_PREVIEW_STAGE.height,1152);
 assert.equal(PORTRAIT_PREVIEW_STAGE.width,PORTRAIT_PREVIEW_STAGE.height);
 const layout={stage:PORTRAIT_PREVIEW_STAGE,scale:1,sourceWidth:512,sourceHeight:1152,bounds:[{x:10,y:50,width:492,height:1000}]};
 const dest=portraitDestination(layout,0);
 assert.ok(dest.dx>0);
 assert.ok(dest.dx+dest.dw<PORTRAIT_PREVIEW_STAGE.width);
});

test('one student has equal visible heights for all six expressions without stretching or clipping',()=>{
 const bounds=[
  {x:40,y:40,width:360,height:1080},{x:50,y:40,width:400,height:1080},
  {x:35,y:180,width:390,height:914},{x:40,y:50,width:360,height:1080},
  {x:20,y:130,width:460,height:958},{x:45,y:50,width:380,height:1080}
 ];
 const scales=portraitExpressionScales(bounds,PORTRAIT_PREVIEW_STAGE);
 const layout={stage:PORTRAIT_PREVIEW_STAGE,bounds,scales,sourceWidth:512,sourceHeight:1152};
 const target=bounds[0].height*scales[0];
 for(let i=0;i<6;i++){
  const d=portraitDestination(layout,i);
  assert.ok(Math.abs(d.dh*1/1152*bounds[i].height-target)<1e-8);
  assert.ok(bounds[i].width*scales[i]<=PORTRAIT_PREVIEW_STAGE.maxBodyWidth+1e-8);
  assert.ok(Math.abs((d.dx+bounds[i].x*scales[i]+bounds[i].width*scales[i]/2)-PORTRAIT_PREVIEW_STAGE.width/2)<1e-8);
  assert.ok(Math.abs(d.dy+(bounds[i].y+bounds[i].height)*scales[i]-(PORTRAIT_PREVIEW_STAGE.height-PORTRAIT_PREVIEW_STAGE.bottom))<1e-8);
 }
});
test('different students retain distinct source-relative display heights',()=>{
 const tall=Array.from({length:6},()=>({x:30,y:30,width:400,height:1080}));
 const short=Array.from({length:6},()=>({x:30,y:150,width:380,height:840}));
 const t=portraitExpressionScales(tall,PORTRAIT_PREVIEW_STAGE);
 const s=portraitExpressionScales(short,PORTRAIT_PREVIEW_STAGE);
 assert.ok(t[0]*1080>s[0]*840);
 assert.equal(t[0]*1080,1000);
 assert.equal(s[0]*840,840);
});
test('wide gestures reduce the shared student height instead of clipping an expression',()=>{
 const bounds=[{x:0,y:0,width:500,height:600},...Array.from({length:5},()=>({x:100,y:0,width:300,height:900}))];
 const scales=portraitExpressionScales(bounds,PORTRAIT_STAGE);
 assert.ok(scales[0]*500<=PORTRAIT_STAGE.maxBodyWidth);
 assert.ok(Math.abs(scales[0]*600-scales[1]*900)<1e-8);
});

// Stature is derived from the approved character design, never each PNG's crop.
test('all 40 students use one approved height reference, 015 tallest',()=>{
 const ratios=Array.from({length:20},(_,i)=>studentPortraitHeightRatio('student-'+String(i+1).padStart(3,'0')));
 assert.equal(ratios.length,20);
 assert.equal(ratios[14],1);
 assert.equal(ratios[11],0.83);
 assert.equal(ratios[1],0.99);
 assert.equal(ratios[19],0.94);
 assert.equal(new Set(ratios).has(null),false);
 assert.equal(Math.max(...ratios),1);
 const female=[0.87,0.94,0.79,0.90,0.84,0.88,0.93,0.91,0.90,0.87,0.82,0.94,0.86,0.90,0.84,0.95,0.86,0.89,0.80,0.89];
 const actual=Array.from({length:20},(_,i)=>studentPortraitHeightRatio('student-'+String(i+21).padStart(3,'0')));
 assert.deepEqual(actual,female);
 assert.equal(studentPortraitHeightRatio('student-036'),0.95);
 assert.equal(studentPortraitHeightRatio('student-023'),0.79);
 assert.equal(Math.max(...ratios,...actual),1);
 assert.equal(studentPortraitHeightRatio('student-040'),0.89);
 assert.equal(studentPortraitHeightRatio('student-041'),null);
 assert.equal(studentPortraitHeightRatio('student-invalid'),null);
});
test('male stature is identical regardless of PNG crop, while six expressions remain equally tall',()=>{
 const heights=[540,650,720,800,960,1100];
 const targets=[];
 for(const [id,ratio] of [['student-002',0.99],['student-015',1],['student-012',0.83]]){
  for(const h of heights){
   const bounds=Array.from({length:6},(_,i)=>({x:20,y:40+i,width:Math.min(430,h/2),height:h}));
   const scales=portraitExpressionScales(bounds,PORTRAIT_PREVIEW_STAGE,studentPortraitHeightRatio(id));
   const visible=bounds.map((b,i)=>b.height*scales[i]);
   for(const v of visible)assert.ok(Math.abs(v-PORTRAIT_PREVIEW_STAGE.bodyHeight*ratio)<1e-8);
   targets.push({id,h,visible:visible[0]});
  }
 }
 assert.ok(targets.find(x=>x.id==='student-015').visible>targets.find(x=>x.id==='student-012').visible);
});
test('two-step height formula enlarges small female crops and shrinks large ones relative to student-015',()=>{
 const H=PORTRAIT_PREVIEW_STAGE.bodyHeight;
 for(const [id,p] of [['student-015',1],['student-022',0.94],['student-023',0.79],['student-036',0.95],['student-040',0.89]]){
  assert.equal(studentPortraitHeightRatio(id),p);
  for(const h of [400,600,800,1000,1100]){
   // Six different raw crop heights, all narrow enough to avoid width clipping.
   const bounds=Array.from({length:6},(_,i)=>({x:40,y:10,width:140+i*5,height:h-i*15}));
   const scales=portraitExpressionScales(bounds,PORTRAIT_PREVIEW_STAGE,p);
   for(let i=0;i<6;i++){
    const expected=(H/bounds[i].height)*p;
    assert.ok(Math.abs(scales[i]-expected)<1e-10,`${id}, ${h}, cell ${i}: two-step multiplication`);
    assert.ok(Math.abs(bounds[i].height*scales[i]-H*p)<1e-8);
   }
   if(h===400)assert.ok(scales[0]>1,'a small source image must be enlarged');
  }
 }
});

test('wide gestures cap male stature uniformly rather than crop or stretch',()=>{
 const bounds=[{x:0,y:0,width:500,height:450},...Array.from({length:5},()=>({x:80,y:0,width:320,height:800}))];
 const scales=portraitExpressionScales(bounds,PORTRAIT_PREVIEW_STAGE,studentPortraitHeightRatio('student-015'));
 assert.ok(bounds[0].width*scales[0]<=PORTRAIT_PREVIEW_STAGE.maxBodyWidth+1e-8);
 for(let i=1;i<6;i++)assert.ok(Math.abs(bounds[i].height*scales[i]-bounds[0].height*scales[0])<1e-8);
});

test('student and outfit selectors have bounded previous/next navigation',()=>{
 const html=renderFullSheetPreview();
 for(const kind of ['student','outfit']){
  assert.match(html,new RegExp('data-full-sheet-prev="'+kind+'"'));
  assert.match(html,new RegExp('data-full-sheet-next="'+kind+'"'));
  assert.match(html,new RegExp('data-full-sheet-prev="'+kind+'"[^>]*disabled'));
 }
 assert.equal((html.match(/data-full-sheet-(?:prev|next)=/g)||[]).length,4);
});

test('precomputed final calibration yields exact 015-relative heights without scanning PNG at runtime',()=>{
 const image={naturalWidth:1536,naturalHeight:2304};
 for(const [id,ratio] of [['student-015',1],['student-016',.94],['student-036',.95],['student-023',.79]]){
  const h=[620,700,850,920,1000,1100];
  const entry={width:1536,height:2304,bounds:h.map((height,i)=>[20,35,300+i,height]),scales:h.map(height=>1000*ratio/height)};
  const data={version:1,stage:{bodyHeight:1000},sheets:{[`${id}/uniform-summer`]:entry}};
  const layout=calibratedPortraitLayout(image,calibrationEntry(data,id,'uniform-summer'));
  for(let i=0;i<6;i++)assert.ok(Math.abs(layout.bounds[i].height*layout.scales[i]-1000*ratio)<1e-8);
 }
 assert.match(portraitCalibrationUrl('https://franksky1207.github.io/teacher-hell/preview/'),/\/preview\/web\/portrait-calibration.json$/);
 assert.equal(calibratedPortraitLayout(image,{width:1,height:1,bounds:[],scales:[]}),null);
});
