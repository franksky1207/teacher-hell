/** Phase 14-B: official roster + teacher-disclosed knowledge only. No private NPC state. */
import {teacherDisplayName} from '../src/runtime/teacher-profile.js';
import {notebookRoster} from './notebook-roster.js';
import {readPlayerView} from '../src/runtime/views.js';
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const beliefs={believed:'目前相信',uncertain:'尚待確認',rejected:'目前不採信'};
export function projectNotebookPeople(world){
 const roster=notebookRoster(world);
 const known=readPlayerView(world);
 if(!roster)return {className:'導師班',people:[],facts:[],claims:[]};
 const map=new Map();
 for(const student of roster.students){
  map.set(student.id,{id:student.id,name:student.name,kind:'student',relation:roster.archived?'原導師班學生（依封存紀錄查閱）':'導師班學生'});
  for(const carer of student.caregivers??[]){
   const existing=map.get(carer.id);
   if(existing){if(!existing.relatedTo.includes(student.name))existing.relatedTo.push(student.name);}
   else map.set(carer.id,{id:carer.id,name:carer.name,kind:'caregiver',relation:'學生家長',relatedTo:[student.name]});
  }
 }
 // Extra people enter the notebook only after a teacher-visible disclosure.
 const profiles=world.numeric.evolution.world.registry?.profiles??{};
 const knownIds=new Set(known.claims.map(c=>c.sourceId));
 for(const id of knownIds){
  if(id===world.identity.playerId||map.has(id)||!profiles[id])continue;
  map.set(id,{id,name:profiles[id].displayName,kind:'other',relation:'已知校內相關人物'});
 }
 // Do not derive friendship from hidden numeric relationship vectors.
 const relations=[],edgeIds=new Set(),teacherId=world.identity.playerId;
 const add=(a,b,label)=>{
  if((a!==teacherId&&!map.has(a))||(b!==teacherId&&!map.has(b))||a===b)return;
  const key=JSON.stringify([[a,b].sort(),label]);
  if(edgeIds.has(key))return;edgeIds.add(key);relations.push({a,b,label});
 };
 for(const student of roster.students){
  add(teacherId,student.id,'導師班');
  for(const carer of student.caregivers??[])add(student.id,carer.id,'家長與學生');
 }
 for(const id of knownIds)add(teacherId,id,'曾接觸／提供說法');
 for(const f of known.facts){
  const subjects=(f.subjectIds??[]).filter(id=>map.has(id));
  for(let i=0;i<subjects.length;i++)for(let j=i+1;j<subjects.length;j++)add(subjects[i],subjects[j],'共同已知事件');
 }
 // Only teacher-visible disclosures. A source is not treated as the subject of a claim.
 return {className:roster.className,people:[...map.values()],relations,teacher:{id:teacherId,name:teacherDisplayName(world)},
  facts:known.facts.map(f=>({description:f.description,subjectIds:f.subjectIds,occurredAt:f.occurredAt})),
  claims:known.claims.map(c=>({statement:c.statement,sourceId:c.sourceId,belief:c.belief}))};
}
export function renderNotebookPeople(data,selectedId=null,search='',category='student'){
 if(!data||!Array.isArray(data.people)||!Array.isArray(data.facts)||!Array.isArray(data.claims))throw new TypeError('Invalid notebook people projection');
 const selected=selectedId===null?null:data.people.find(p=>p.id===selectedId);
 if(selectedId!==null&&!selected)throw new RangeError('Unknown notebook person');
 if(typeof search!=='string')throw new TypeError('Invalid person search');
 if(!['student','caregiver','other'].includes(category))throw new RangeError('Unknown person category');
 const studentCount=data.people.filter(p=>p.kind==='student').length;
 const parentCount=data.people.filter(p=>p.kind==='caregiver').length;
 const otherCount=data.people.filter(p=>p.kind==='other').length;
 const filtered=data.people.filter(p=>p.kind===category&&(p.name.includes(search)||p.relation.includes(search)||(p.relatedTo??[]).some(name=>name.includes(search))));
 const roster=filtered.map(p=>`<button type="button" class="notebook-person${selected?.id===p.id?' notebook-person--active':''}" data-action="notebook-person:${esc(p.id)}" aria-pressed="${selected?.id===p.id}"><span>${esc(p.name)}</span><small>${p.kind==='student'?'學生':p.kind==='caregiver'?'家長':'其他'}</small></button>`).join('');
 let details='<p>請選擇人物查看教師目前已知的紀錄。</p>';
 const categories=[['student','學生',studentCount],['caregiver','家長',parentCount],['other','其他人',otherCount]].map(([id,label,count])=>`<button type="button" data-action="notebook-person-category:${id}" aria-pressed="${category===id}" class="${category===id?'notebook-person--active':''}">${label}（${count}）</button>`).join('');
 if(selected){
  const facts=data.facts.filter(f=>Array.isArray(f.subjectIds)&&f.subjectIds.includes(selected.id));
  const claims=data.claims.filter(c=>c.sourceId===selected.id);
  const relation=selected.kind==='caregiver'? `<p>相關學生：${esc((selected.relatedTo??[]).join('、'))}</p>`:'';
  const factList=facts.length?`<ul>${facts.map(f=>`<li>${esc(f.description)}</li>`).join('')}</ul>`:'<p>目前沒有已揭露的相關事件資訊。</p>';
  const claimList=claims.length?`<ul>${claims.map(c=>`<li>${esc(c.statement)}（${beliefs[c.belief]??'待確認'}）</li>`).join('')}</ul>`:'<p>目前沒有由此人物提供且已知的說法。</p>';
  details=`<h3>${esc(selected.name)}</h3><p>${esc(selected.relation)}</p>${relation}<h4>已知事實</h4>${factList}<h4>此人物提供的說法</h4>${claimList}`;
 }
 return `<section class="notebook-people" aria-label="人物紀錄"><p class="notebook-people-summary">${esc(data.className)}・學生 ${studentCount} 人・家長 ${parentCount} 人・其他 ${otherCount} 人</p><nav class="notebook-person-categories" aria-label="人物身分類別">${categories}</nav><label class="notebook-search-label">搜尋人物 <input type="search" data-notebook-search="people" aria-label="搜尋人物姓名" value="${esc(search)}" placeholder="姓名或身分"></label><div class="notebook-people-layout"><div class="notebook-person-list" aria-label="人物名單">${roster||'<p>目前沒有可查閱的人物。</p>'}</div><div class="notebook-person-details" aria-live="polite">${details}<section class="notebook-relations" aria-label="目前已知關係"><h4>已知人物關係圖</h4><div class="notebook-relation-links">${(data.relations??[]).filter(edge=>!selected||edge.a===selected.id||edge.b===selected.id).slice(0,100).map(edge=>{const a=data.people.find(p=>p.id===edge.a)??(data.teacher?.id===edge.a?data.teacher:null),b=data.people.find(p=>p.id===edge.b)??(data.teacher?.id===edge.b?data.teacher:null);return `<div class="notebook-relation-pair"><span class="notebook-relation-node">${esc(a?.name??'人物')}</span><span class="notebook-relation-edge">${esc(edge.label)}</span><span class="notebook-relation-node">${esc(b?.name??'人物')}</span></div>`;}).join('')||'<p>目前沒有可確認的已知連結。</p>'}</div><p class="notebook-hint">家庭與共同事件只代表已知關聯，不能推定感情、信任或立場；選擇人物可縮小顯示範圍。</p></section></div></div></section>`;
}
