import test from 'node:test';
import assert from 'node:assert/strict';
import {STUDENT_ART_IDS,STUDENT_ART_OUTFITS,STUDENT_ART_EXPRESSIONS,studentArtAvailability,studentArtSheetCell,renderStudentArtPrototype} from '../web/student-art-preview.js';
test('forty student identities and eight Chinese outfit choices',()=>{
 assert.equal(STUDENT_ART_IDS.length,40);
 assert.equal(new Set(STUDENT_ART_IDS).size,40);
 assert.equal(STUDENT_ART_OUTFITS.length,8);
 assert.equal(STUDENT_ART_EXPRESSIONS.length,6);
 assert.equal(studentArtAvailability('student-001','uniform-winter'),'full');
 assert.equal(studentArtAvailability('student-001','uniform-summer'),'base');
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
