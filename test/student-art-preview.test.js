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
