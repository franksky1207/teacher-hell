import {PORTRAIT_STAGE,portraitDestination} from '../web/student-portrait-layout.js';
import test from 'node:test';
import assert from 'node:assert/strict';
import {STUDENT_ART_IDS,STUDENT_ART_OUTFITS,FULL_SHEET_EXPRESSIONS,FULL_SHEET_CELL,fullSheetCrop,renderFullSheetPreview} from '../web/full-sheet-preview.js';
test('full sheet is the only student preview, with 40 ids and 8 outfits',()=>{
 assert.equal(STUDENT_ART_IDS.length,40);
 assert.equal(new Set(STUDENT_ART_IDS).size,40);
 assert.equal(STUDENT_ART_OUTFITS.length,8);
 assert.deepEqual(FULL_SHEET_CELL,{columns:3,rows:2,width:512,height:1152});
 const html=renderFullSheetPreview();
 assert.equal((html.match(/data-full-sheet-expression=/g)||[]).length,6);
 assert.equal((html.match(/<option value="student-/g)||[]).length,40);
 assert.equal((html.match(/<option value="(?:uniform-|sports-|casual-)/g)||[]).length,8);
 assert.doesNotMatch(html,/data-art-expression=/);
 assert.match(html,/學生 040/);
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
