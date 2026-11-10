/** Phase 13-D: visual placeholders sourced from the current legal story page. */
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const positions=new Set(['left','right','center']);
const expressions=new Set(['calm','happy','angry','sad','surprised','embarrassed']);
// Stable initial cohort order is gender-balanced and independent of the seat list or name.
// New arrivals / other classes are not assigned arbitrary portrait identities.
export function studentArtForActor(registry,id){
 const initial=registry?.cohorts?.find(c=>c.classId===registry.homeClassId)?.initialStudentIds;
 if(!Array.isArray(initial)||initial.length!==40)return null;
 const index=initial.indexOf(id);
 return index<0?null:'student-'+String(index+1).padStart(3,'0');
}
export function projectStoryScene(world,view){
 const page=view?.page,worldData=world?.numeric?.evolution?.world;
 if(!page||typeof page.text!=='string'||!worldData?.registry||!worldData?.people)throw new TypeError('Invalid story scene');
 const cast=page.presentation==='phone'?[]:(page.cast??[]).slice(0,2).map(entry=>{
  const id=entry.actorId,student=worldData.people[id]?.kind==='student',profile=worldData.registry.profiles?.[id];
  return {name:typeof profile?.displayName==='string'&&profile.displayName.trim()?profile.displayName:student?'學生':'對話人物',
   kind:student?'student':'adult',position:positions.has(entry.position)?entry.position:'center',
   expression:expressions.has(entry.expression)?entry.expression:'calm',
   tone:student&&Number.isSafeInteger(profile?.appearance?.variant)?profile.appearance.variant%6:0,
   artId:student?studentArtForActor(worldData.registry,id):null,
   speaking:id===page.speaker,id};
 });
 const castActor=Array.isArray(page.cast)?page.cast.find(a=>a.actorId===page.speaker):null;
 const knownProfile=castActor?worldData.registry.profiles?.[castActor.actorId]:null;
 const knownName=typeof knownProfile?.displayName==='string'&&knownProfile.displayName.trim()?knownProfile.displayName:null;
 const speaker=page.speaker===null?'旁白':page.speaker===world.identity.playerId?'老師':cast.find(a=>a.id===page.speaker)?.name??knownName??(page.presentation==='phone'?'通話':'對話');
 return {label:page.scene==='school:counselling-corner'?'校園談話角落':'目前場景',cast,speaker};
}
export function renderStoryScene(scene){
 if(!scene||!Array.isArray(scene.cast)||scene.cast.length>2)throw new TypeError('Invalid scene cast');
 const actors=scene.cast.map(a=>{
  const kind=a.kind==='student'?'student':'adult',pos=positions.has(a.position)?a.position:'center',exp=expressions.has(a.expression)?a.expression:'calm',tone=Number.isInteger(a.tone)&&a.tone>=0&&a.tone<6?a.tone:0;
  const artId=kind==='student'&&/^student-0(?:[0-3][0-9]|40)$/.test(a.artId??'')?a.artId:null;
  return `<div class="story-actor story-actor--${kind} story-actor--${pos} story-actor--tone-${tone} story-actor--${a.speaking?'speaking':'listening'}${artId?' story-actor--illustrated':''}" data-expression="${exp}" aria-label="${esc(a.name)}"><div class="story-actor-shape" aria-hidden="true"><div class="story-actor-head"><i class="story-actor-face"></i></div><div class="story-actor-body"></div></div>${artId?`<canvas class="story-portrait-canvas" data-story-portrait="${artId}" data-expression="${exp}" width="1152" height="1152" aria-hidden="true"></canvas>`:''}<span class="story-actor-name">${esc(a.name)}</span></div>`;
 }).join('');
 return `<div class="story-scene" aria-label="場景演出"><span class="story-scene-label">${esc(scene.label)}</span><div class="story-stage">${actors}</div></div>`;
}
