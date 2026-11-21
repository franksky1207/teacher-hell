import {renderBackgroundPreview,mountBackgroundPreview} from './background-preview.js';
import {renderFullSheetPreview,mountFullSheetPreview} from './full-sheet-preview.js';
import {renderNpcSilhouettePreview,mountNpcSilhouettePreview} from './npc-silhouette-preview.js';

export const ART_PREVIEW_CATEGORIES=Object.freeze([
 ['students','學生立繪'],
 ['silhouettes','NPC 剪影'],
 ['backgrounds','背景圖']
]);

export function renderArtPreview(){
 return `<section class="art-preview" aria-label="美術素材預覽">
  <label class="art-preview-category">素材分類
   <select data-art-preview-category aria-label="選擇美術素材分類">
    ${ART_PREVIEW_CATEGORIES.map(([id,name])=>`<option value="${id}">${name}</option>`).join('')}
   </select>
  </label>
  <div data-art-preview-content></div>
 </section>`;
}

export function mountArtPreview(root){
 if(!root)return;
 const category=root.querySelector('[data-art-preview-category]');
 const content=root.querySelector('[data-art-preview-content]');
 const show=()=>{
  if(category.value==='backgrounds'){
   content.innerHTML=renderBackgroundPreview();
   mountBackgroundPreview(content.querySelector('.background-preview'));
  }else if(category.value==='silhouettes'){
   content.innerHTML=renderNpcSilhouettePreview();
   mountNpcSilhouettePreview(content.querySelector('.npc-silhouette-preview'));
  }else{
   content.innerHTML=renderFullSheetPreview();
   mountFullSheetPreview(content.querySelector('.full-sheet-preview'));
  }
 };
 category.addEventListener('change',show);
 show();
}
