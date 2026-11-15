import test from 'node:test';
import assert from 'node:assert/strict';
import {runtimeScenario,request,event,fact,open,id} from './support/runtime.js';
import {prepareWorldOperation,forkWorldAttempt} from '../src/runtime/transactions.js';
import {runtimeOf,restoreWorldState} from '../src/runtime/model.js';
import {issueId,issueOperationId,projectIssues,readIssue} from '../src/runtime/issues.js';
import {storyHistoryView} from '../src/runtime/story-history-view.js';
const apply=(w,tag,ops)=>prepareWorldOperation(w,request(w,tag,ops)).world;
const causal=(e,tag,operations,causeIds=[])=>fact(e,tag,{data:{causality:{version:1,operations}},causeIds});
const opening=(e,key='transport',tag='root')=>({type:'open',localKey:key,kind:'transport-arrangement',actors:[e.participantIds[1]],details:'Confirmed arrangement needs coordination',evidenceFactIds:[id('fact',tag)]});
function setup(){const original=runtimeScenario(),e=event(original),root=causal(e,'root',[opening(e),opening(e,'promise')]);return {original,e,w:apply(original,'open',[open(e),root]),root};}
const update=(type,issue,previous,evidence,extra={})=>({type,issueId:issue,expectedPreviousOperation:previous,evidenceFactIds:[evidence],...(type==='progress'?{assessment:'improved',details:'Observed new arrangement'}:{reason:type==='close'?'fulfilled':'withdrawn'}),...extra});

test('1 uniqueness: two same-kind issues, separate roots and ordered local operations',()=>{
 let {w,e,root}=setup();const a=issueId(root.id,'transport'),b=issueId(root.id,'promise');
 assert.notEqual(a,b);assert.equal(projectIssues(w).length,2);
 const next=causal(e,'progress',[update('progress',a,issueOperationId(root.id,0),id('fact','progress'))],[root.id]);
 w=apply(w,'progress',[next]);assert.equal(readIssue(w,a).latestOperation.factId,next.id);
 assert.equal(readIssue(w,b).latestOperation.id,issueOperationId(root.id,1));
 const other=causal(e,'other-root',[opening(e,'transport','other-root')]);w=apply(w,'other-root',[other]);
 assert.equal(projectIssues(w).length,3);assert.notEqual(issueId(other.id,'transport'),a);
 const duplicate=causal(e,'duplicate',[opening(e,'x','duplicate'),opening(e,'x','duplicate')]);assert.throws(()=>apply(w,'duplicate',[duplicate]),/duplicate localKey/);
 const local=causal(e,'local',[opening(e,'x','local'),update('progress',issueId(id('fact','local'),'x'),issueOperationId(id('fact','local'),0),id('fact','local'))]);
 w=apply(w,'local',[local]);assert.equal(readIssue(w,issueId(local.id,'x')).latestOperation.index,1);
 assert.equal(readIssue(w,b).state,'open');
});

test('2 lifecycle: evidence, terminal transitions, invalidation and recurrence',()=>{
 let {w,e,root}=setup();const a=issueId(root.id,'transport'),b=issueId(root.id,'promise');
 const push=(tag,op,causes=[root.id])=>causal(e,tag,[op],causes);
 for(const [tag,op,causes,pattern] of [
  ['missing',update('progress',a,issueOperationId(root.id,0),'missing'),[root.id],/evidence/],
  ['wrong',update('progress','wrong',issueOperationId(root.id,0),id('fact','wrong')),[root.id],/unknown issue/],
  ['stale',update('progress',a,issueOperationId(root.id,1),id('fact','stale')),[root.id],/stale/],
  ['no-root',update('progress',a,issueOperationId(root.id,0),id('fact','no-root')),[],/explicit causes/],
  ['self',update('progress',a,issueOperationId(id('fact','self'),0),id('fact','self')),[root.id],/stale/]
 ])assert.throws(()=>apply(w,tag,[push(tag,op,causes)]),pattern);
 assert.throws(()=>apply(w,'self-cause',[push('self-cause',update('close',a,issueOperationId(root.id,0),id('fact','self-cause')),[root.id,id('fact','self-cause')])]),/REFERENCE|CAUSALITY/);
 assert.throws(()=>apply(w,'version',[fact(e,'version',{data:{causality:{version:2,operations:[]}}})]),/version/);
 assert.throws(()=>apply(w,'unknown-field',[causal(e,'unknown-field',[{...opening(e,'x','unknown-field'),severity:5}]) ]));
 assert.throws(()=>apply(w,'bad-actor',[causal(e,'bad-actor',[{...opening(e,'x','bad-actor'),actors:['missing']}])]),/subjects/);
 const progress=push('progress',update('progress',a,issueOperationId(root.id,0),id('fact','progress')));w=apply(w,'progress',[progress]);
 assert.throws(()=>apply(w,'lost-previous',[push('lost-previous',update('close',a,issueOperationId(progress.id,0),id('fact','lost-previous')))]),/explicit causes/);
 const end=push('close',update('close',a,issueOperationId(progress.id,0),id('fact','close')),[root.id,progress.id]);w=apply(w,'close',[end]);
 assert.equal(readIssue(w,a).state,'closed');assert.ok(readIssue(w,a).evidenceFacts.some(f=>f.id===end.id));
 for(const type of ['close','progress','invalidate'])assert.throws(()=>apply(w,'after-'+type,[push('after-'+type,update(type,a,issueOperationId(end.id,0),id('fact','after-'+type)),[root.id,end.id])]),/terminal/);
 const withdrawn=push('withdrawn',update('invalidate',b,issueOperationId(root.id,1),id('fact','withdrawn')));w=apply(w,'withdrawn',[withdrawn]);
 assert.equal(readIssue(w,b).state,'invalidated');assert.equal(readIssue(w,a).state,'closed');
 const recurrence=causal(e,'recurrence',[{...opening(e,'transport','recurrence'),evidenceFactIds:[id('fact','recurrence'),root.id]}],[root.id]);w=apply(w,'recurrence',[recurrence]);
 assert.equal(readIssue(w,issueId(recurrence.id,'transport')).state,'open');
 const forward=push('forward',update('progress',issueId(recurrence.id,'transport'),issueOperationId(recurrence.id,0),id('fact','future')),[recurrence.id]);
 assert.throws(()=>apply(w,'forward',[forward,fact(e,'future')]),/evidence/);
 const forged=structuredClone(w);runtimeOf(forged).facts.find(f=>f.id===end.id).data.causality.operations[0].expectedPreviousOperation='forged';assert.throws(()=>restoreWorldState(forged),/stale/);
});

test('3 history, atomic transactions, legacy restore and attempt isolation',()=>{
 let {original,w,e,root}=setup();const a=issueId(root.id,'transport');
 assert.deepEqual(projectIssues(restoreWorldState(JSON.stringify(original))),[]);
 const originalNumeric=structuredClone(w.numeric),before=JSON.stringify(w);
 const end=causal(e,'end',[update('close',a,issueOperationId(root.id,0),id('fact','end'))],[root.id]);
 const q=request(w,'end',[end]);
 assert.throws(()=>prepareWorldOperation(w,{...q,operations:[end,causal(e,'bad',[update('progress',a,issueOperationId(end.id,0),id('fact','bad'))],[root.id,end.id])]}),/terminal/);
 assert.equal(JSON.stringify(w),before);
 w=prepareWorldOperation(w,q).world;assert.deepEqual(w.numeric,originalNumeric);
 assert.equal(prepareWorldOperation(w,q).duplicate,true);assert.deepEqual(prepareWorldOperation(w,q).world,w);
 assert.throws(()=>apply(w,'other-transaction',[causal(e,'again',[update('close',a,issueOperationId(end.id,0),id('fact','again'))],[root.id,end.id])]),/terminal/);
 const boundary=runtimeOf(w).facts.find(f=>f.id===end.id).order;
 assert.equal(storyHistoryView(w,{beforeOrder:boundary}).issue(a).state,'open');
 assert.equal(storyHistoryView(w,{beforeOrder:boundary+1}).issue(a).state,'closed');
 assert.equal(readIssue(w,a,{beforeOrder:root.order??1}),null);
 assert.throws(()=>projectIssues(w,{beforeOrder:runtimeOf(w).history.length+2}),/boundary/);
 assert.deepEqual(projectIssues(restoreWorldState(JSON.stringify(w))),projectIssues(w));
 const detached=readIssue(w,a);detached.latestOperation.type='tampered';detached.evidenceFacts[0].description='edited';assert.equal(readIssue(w,a).latestOperation.type,'close');
 const retry=forkWorldAttempt(original,{attemptId:id('attempt','issues-retry'),seeds:{settlement:31,streams:Object.fromEntries(Object.keys(original.random).map(k=>[k,32]))}});
 assert.deepEqual(projectIssues(retry),[]);assert.equal(readIssue(w,a).state,'closed');
 const re=event(retry,'retry'),retryRoot=causal(re,'retry-root',[opening(re,'transport','retry-root')]);
 const rw=apply(retry,'retry-open',[open(re),retryRoot]);assert.equal(projectIssues(rw).length,1);assert.equal(readIssue(rw,a),null);assert.equal(projectIssues(w).length,2);
});
