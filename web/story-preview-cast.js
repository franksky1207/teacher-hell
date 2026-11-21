/** AVG 開發預覽角色外貌選擇：只改畫面，不寫入遊戲世界或存檔。 */
import {NPC_SILHOUETTE_IDS} from './npc-silhouette-preview.js';

const students=Array.from({length:44},(_,i)=>'student-'+String(i+1).padStart(3,'0'));
const adults=new Set(NPC_SILHOUETTE_IDS.map(entry=>entry.id));
const escapeHtml=value=>String(value).replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));

export function choosePreviewCast(preview,current,role,artId){
 const kind=preview?.slots?.get(role);
 if(!kind)return {error:'故事中不存在這個人物槽位'};
 const valid=artId===''||(kind==='student'?students.includes(artId):adults.has(artId));
 if(!valid)return {error:'人物素材編號不合法'};
 if(kind==='student'&&artId&&Object.entries(current).some(([other,id])=>other!==role&&preview.slots.get(other)==='student'&&id===artId))
  return {error:'同篇故事不同學生槽位不能選同一位學生'};
 return {selection:{...current,[role]:artId}};
}

export function renderPreviewCastControls(preview,selection={}){
 if(!preview?.slots?.size)return '';
 const kindLabel={student:'學生',guardian:'家長／照顧者',staff:'教職員'};
 const controls=[...preview.slots].map(([role,kind])=>{
  const list=kind==='student'?students.map((id,i)=>[id,'學生 '+id.slice(-3)+(i>=40?'（轉入生）':'')]):NPC_SILHOUETTE_IDS.map(({id,name})=>[id,name]);
  return '<label>'+escapeHtml(role)+'（'+escapeHtml(kindLabel[kind]??'常駐角色')+'） <select data-avg-cast-role="'+escapeHtml(role)+'">'+
   '<option value="">自動分配</option>'+list.map(([id,label])=>'<option value="'+id+'"'+(selection[role]===id?' selected':'')+'>'+escapeHtml(label)+'</option>').join('')+
   '</select></label>';
 }).join('');
 return '<span class="avg-cast-choices" role="group" aria-label="人物外貌選擇">'+controls+'</span>';
}

export function previewCastWorld(preview,selection={}){
 const sample=preview.sample;
 if(!sample)return null;
 const {world,actors,profiles,context}=sample;
 const studentRoles=[...preview.slots].filter(([,kind])=>kind==='student').map(([role])=>role);
 if(!studentRoles.some(role=>students.includes(selection[role])))return sample;
 const copy=structuredClone(world),registry=copy.numeric.evolution.world.registry;
 const people=copy.numeric.evolution.world.people;
 const initial=registry.cohorts.find(group=>group.classId===registry.homeClassId).initialStudentIds;
 const identities=[...initial,...Array.from({length:4},(_,i)=>'avg-preview-transfer-'+(i+1))];
 const assigned=new Map(actors),used=new Set();
 for(const role of studentRoles){
  const i=students.indexOf(selection[role]);
  if(i<0)continue;
  assigned.set(role,identities[i]);used.add(identities[i]);
 }
 for(const role of studentRoles){
  if(students.includes(selection[role]))continue;
  const current=assigned.get(role);
  const available=used.has(current)?identities.find(id=>!used.has(id)):current;
  if(!available)continue;
  assigned.set(role,available);used.add(available);
 }
 const mappedProfiles={...profiles};
 studentRoles.forEach((role,index)=>{
  const personId=assigned.get(role),number=identities.indexOf(personId)+1;
  if(!personId||number<1)return;
  const displayName='試演學生'+String.fromCharCode(65+index)+'（外貌 '+String(number).padStart(3,'0')+'）';
  const profile={...profiles[actors.get(role)],displayName};
  registry.profiles[personId]=profile;mappedProfiles[personId]=profile;people[personId]={kind:'student'};
  if(number>40){
   registry.enrollments??=[];
   if(!registry.enrollments.some(x=>x.personId===personId))registry.enrollments.push({personId,classId:registry.homeClassId});
  }
 });
 return {world:copy,actors:assigned,profiles:mappedProfiles,context};
}

export function overridePreviewAdultArt(sceneView,actors,slots,selection={}){
 const reverse=new Map([...actors].map(([role,id])=>[id,role]));
 for(const actor of sceneView.cast??[]){
  const role=reverse.get(actor.id);
  if(role&&slots.get(role)!=='student'&&adults.has(selection[role]))actor.artId=selection[role];
 }
 return sceneView;
}
