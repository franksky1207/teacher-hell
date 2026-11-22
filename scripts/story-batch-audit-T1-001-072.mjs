import fs from 'node:fs';
import path from 'node:path';

const ROOT = 'content/events-v1/T/T1-高一上';
const START = 1, END = 72;
const groups = [
  [1,1,0,0,-1,-1,-2,-2],
  [2,0,-1,-1,-1,-1,-1,-1],
  [1,1,0,-1,-1,-1,-1,-2],
  [2,1,0,-1,-1,-1,-2,-2],
  [1,1,1,0,-1,-2,-2,-2],
].map(values => [...values].sort((a,b)=>a-b).join(','));
const problems = [];
let checked = 0, checkedResults = 0, directMatches = 0, pages = 0;
const fail = (id, issue) => problems.push('T1-' + id + ': ' + issue);
function findFiles(dir, found=[]) {
  for(const ent of fs.readdirSync(dir, {withFileTypes:true})) {
    const full=path.join(dir, ent.name);
    if(ent.isDirectory()) findFiles(full, found);
    else if(ent.isFile() && /^T1-0\d{2}\.md$/.test(ent.name)) found.push(full);
  }
  return found;
}
function canonical(s) {
  return String(s||'').replace(/\{\{[^{}]*\}\}/g,'').replace(/[\s「」『』]/g,'');
}
const allFiles = findFiles(ROOT);
for(let n=START;n<=END;n++) {
  const id=String(n).padStart(3,'0');
  const candidates=allFiles.filter(f=>path.basename(f)=== 'T1-'+id+'.md');
  if(candidates.length!==1){fail(id,'file count '+candidates.length);continue;}
  const raw=fs.readFileSync(candidates[0],'utf8');
  const code=[...raw.matchAll(/```avg\s*([\s\S]*?)```/g)];
  if(code.length!==1){fail(id,'AVG block count '+code.length);continue;}
  let avg;
  try {avg=JSON.parse(code[0][1]);} catch(e){fail(id,'JSON parse: '+e.message);continue;}
  const start=raw.indexOf('### 開場');
  if(start===-1||code[0].index>start) fail(id,'AVG code block not before opening');
  const headings=[1,2,3,4,5].map(k => raw.includes('## '+k+'｜'));
  if(headings.some(v=>!v)) fail(id,'missing five-section heading');
  const opening=Object.values(avg.opening||{});
  if(opening.length===0)fail(id,'empty opening');
  const matrixBlock=raw.match(/### 四選項對八共用結果的權重([\s\S]*?)(?=\n## |$)/)?.[1]||'';
  const rows=matrixBlock.split('\n').filter(line=>/^\| [ABCD] \|/.test(line)).map(line=>line.split('|').slice(2,10).map(s=>Number(s.trim())));
  if(rows.length!==4||rows.some(r=>r.length!==8||r.some(v=>![0,1,2,4].includes(v)))) fail(id,'invalid 4×8 matrix');
  else {
    for(let r=0;r<4;r++) {
      if(rows[r].filter(v=>v===0).length>2)fail(id,'row '+r+' has >2 zeros');
      if(rows[r].every(v=>v===0))fail(id,'row '+r+' has no feasible result');
    }
    for(let col=0;col<8;col++)
      if(rows.filter(r=>r[col]===0).length>1)fail(id,'R'+(col+1)+' has >1 incompatible choice');
  }
  const stateRows=[];
  for(let k=1;k<=8;k++) {
    const key='R'+k;
    const result=avg.results?.[key];
    if(!result||!Array.isArray(result.pages)||!result.pages.length){fail(id,key+' missing pages');continue;}
    checkedResults++;pages+=result.pages.length;
    for(const [i,page] of result.pages.entries())
      if(typeof page.text!=='string'||!page.text.trim())fail(id,key+' page '+(i+1)+' empty text');
    const block=raw.match(new RegExp('### '+key+'｜([\\s\\S]*?)(?=\\n### R[1-8]｜|\\n### 四選項對八共用結果的權重|$)'))?.[1]||'';
    if(!block)fail(id,key+' missing original block');
    const original=block.match(/^- \*\*玩家可見結果\*\*：(.+)$/m)?.[1];
    if(!original)fail(id,key+' missing visible outcome');
    else if(n>=11){
      const performed=result.pages.map(p=>p.text).join('');
      if(canonical(original)!==canonical(performed))fail(id,key+' original/AVG discrepancy');
      else directMatches++;
    }
    const states=block.match(/^- \*\*玩家四狀態\*\*（精神、熱忱、情緒、掌控）：([^\n]+)$/m)?.[1];
    if(!states)fail(id,key+' missing four states');
    else {
      const nums=states.split(',').map(x=>Number(x.trim()));
      if(nums.length!==4||nums.some(v=>!Number.isInteger(v)))fail(id,key+' four-state format');
      else { stateRows.push(nums); if(nums.filter(v=>v===0).length>2)fail(id,key+' >2 zero states');}
    }
    const deltas=block.match(/^- \*\*合法底層增減\*\*：([^\n]+)$/m)?.[1];
    if(!deltas)fail(id,key+' missing NPC deltas');
    else for(const item of deltas.split(';')) {
      const delta=item.match(/:([+-]?\d+)\s*$/);
      if(!delta||Math.abs(Number(delta[1]))>8)fail(id,key+' invalid NPC delta '+item.trim().slice(0,35));
    }
  }
  if(stateRows.length===8) {
    const assigned=[];
    for(let col=0;col<4;col++) {
      const values=stateRows.map(r=>r[col]),sig=[...values].sort((a,b)=>a-b).join(',');
      if(!groups.includes(sig))fail(id,'V3 state col '+col+' invalid distribution');
      assigned.push(sig);
      if(values.reduce((s,v)=>s+v,0)!==-4)fail(id,'V3 state col '+col+' sum != -4');
    }
    if(new Set(assigned).size!==4)fail(id,'four state columns reused same group');
  }
  checked++;
}
console.log(JSON.stringify({checked,checkedResults,pages,directMatches,issues:problems.length},null,2));
if(problems.length) {for(const p of problems) console.error(p); process.exitCode=1;}
