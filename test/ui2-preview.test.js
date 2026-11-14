import test from 'node:test';
import assert from 'node:assert/strict';
import {makeUi2PreviewState,ui2PreviewProjection,ui2PreviewAction,UI2_CASES} from '../web/ui2-preview.js';
import {renderStoryView} from '../web/story-view.js';

test('UI-2 visual fixtures render in the formal reader with no hidden world dependency',()=>{
 for(const [id] of UI2_CASES){
  const state=makeUi2PreviewState();state.caseId=id;
  const html=renderStoryView(ui2PreviewProjection(state));
  assert.match(html,/class="story-bottom-frame"/);
  assert.match(html,/story-view--avg/);
  if(id==='four')
   assert.equal((html.match(/data-story-action="select"/g)||[]).length,4);
  if(id==='narration')assert.match(html,/story-actor--narration/g);
  if(id==='dual-left')assert.match(html,/story-actor--speaking/);
 }
});
test('UI-2 rehearsal selects, cancels and confirms without using the core',()=>{
 const state=makeUi2PreviewState();state.caseId='four';
 ui2PreviewAction(state,'select','option-3');
 assert.equal(state.selected,'option-3');
 let html=renderStoryView(ui2PreviewProjection(state));
 assert.match(html,/data-story-action="confirm"/);
 assert.doesNotMatch(html,/data-story-action="select"/);
 ui2PreviewAction(state,'cancel');
 assert.equal(state.selected,null);
 html=renderStoryView(ui2PreviewProjection(state));
 assert.equal((html.match(/data-story-action="select"/g)||[]).length,4);
 ui2PreviewAction(state,'select','option-2');
 ui2PreviewAction(state,'confirm');
 assert.equal(state.confirmed,true);
 assert.equal(ui2PreviewProjection(state).choices.length,0);
 assert.doesNotMatch(renderStoryView(ui2PreviewProjection(state)),/data-story-action="select"/);
});
test('UI-2 rehearsal keeps cast stable while changing narrator and expression',()=>{
 const state=makeUi2PreviewState();
 state.caseId='dual-left';
 const a=ui2PreviewProjection(state).sceneView.cast;
 state.caseId='dual-right';state.leftExpression=2;state.rightExpression=4;
 const b=ui2PreviewProjection(state).sceneView.cast;
 assert.deepEqual(a.map(x=>[x.id,x.position]),b.map(x=>[x.id,x.position]));
 assert.equal(b[0].artId,'student-001');
 assert.equal(b[1].artId,'student-021');
 state.caseId='narration';
 assert.equal(ui2PreviewProjection(state).sceneView.cast.every(x=>!x.speaking),true);
});

test('UI-2: two expression selectors are independent of speaker and one another',()=>{
 const state=makeUi2PreviewState();
 state.caseId='dual-left';state.leftExpression=1;state.rightExpression=2;
 let cast=ui2PreviewProjection(state).sceneView.cast;
 assert.equal(cast[0].expression,'happy');assert.equal(cast[1].expression,'angry');
 state.caseId='dual-right';cast=ui2PreviewProjection(state).sceneView.cast;
 assert.equal(cast[0].expression,'happy');assert.equal(cast[1].expression,'angry');
 state.leftExpression=3;cast=ui2PreviewProjection(state).sceneView.cast;
 assert.equal(cast[0].expression,'sad');assert.equal(cast[1].expression,'angry');
 state.rightExpression=0;cast=ui2PreviewProjection(state).sceneView.cast;
 assert.equal(cast[0].expression,'sad');assert.equal(cast[1].expression,'calm');
});


test('UI-2 expression labels/order use official six-cell art names',async()=>{
 const {FULL_SHEET_EXPRESSIONS}=await import('../web/full-sheet-preview.js');
 assert.deepEqual(FULL_SHEET_EXPRESSIONS,[
  ['calm','平靜'],['happy','開心'],['angry','生氣'],
  ['sad','難過'],['surprised','驚訝'],['embarrassed','害羞']
 ]);
 for(let i=0;i<FULL_SHEET_EXPRESSIONS.length;i++){
  const state=makeUi2PreviewState();
  state.leftExpression=i;state.rightExpression=i;
  const cast=ui2PreviewProjection(state).sceneView.cast;
  assert.equal(cast[0].expression,FULL_SHEET_EXPRESSIONS[i][0]);
  assert.equal(cast[1].expression,FULL_SHEET_EXPRESSIONS[i][0]);
 }
});
