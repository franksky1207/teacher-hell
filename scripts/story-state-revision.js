import {createHash} from 'node:crypto';
export const manuscriptDigest=text=>createHash('sha256').update(text).digest('hex');
const stateLine=/^(\s*- \*\*玩家四狀態\*\*[^：\r\n]*：)[^\r\n]*$/gm;
export function stateMatrix(text){
 const values=[...text.matchAll(stateLine)].map(match=>match[0].slice(match[0].indexOf('：')+1).trim().replaceAll('`','').split(/[,，]/).map(v=>v.trim()));
 if(values.length!==8||values.some(row=>row.length!==4||row.some(v=>!/^[-+]?\d+$/.test(v))))throw Error('修訂稿需八組四整數');
 return values.map(row=>row.map(Number));
}
export function unchangedStory(original,revised){
 // Everything except the eight numerical state fields must match byte for byte.
 return original.replace(stateLine,'$1<states>')===revised.replace(stateLine,'$1<states>');
}
export function validateStateRevision(prior,request,validateDraft){
 const target=request.targetStateRulesVersion??2,source=prior.stateRulesVersion??1;
 if(prior.status!=='locked'||![2,3].includes(target)||source>=target||(target===2&&(source!==1||prior.manuscriptVersions?.length)))throw Error('僅接受locked教師四狀態升版；V1→V2限一次修訂');
 if(request.expectedManuscriptDigest!==prior.manuscriptDigest||request.expectedReviewDigest!==prior.review.digest)throw Error('原SHA已改變，請重新讀取');
 if(manuscriptDigest(request.originalMarkdown??'')!==prior.manuscriptDigest||manuscriptDigest(request.originalReviewText??'')!==prior.review.digest)throw Error('原稿或原審查SHA不符');
 if(manuscriptDigest(request.markdown??'')!==request.manuscriptDigest||manuscriptDigest(request.reviewText??'')!==request.reviewDigest)throw Error('新版SHA不符');
 if(!unchangedStory(request.originalMarkdown,target===3?request.markdown.replace(/^\| state_rules_version｜數值規則版本 \| 3 \|\r?\n/m,'').replaceAll('**玩家四狀態**（精神、熱忱、情緒、掌控）','**玩家四狀態**（體力、精神、熱忱、情緒）'):request.markdown))throw Error('只准修改八結果教師四狀態數值');
 const before=stateMatrix(request.originalMarkdown),after=stateMatrix(request.markdown);
 if(target===2&&JSON.stringify(before)===JSON.stringify(after))throw Error('四狀態未修訂');
 const oldReview=JSON.parse(request.originalReviewText),newReview=JSON.parse(request.reviewText),{stateRevision,...preserved}=newReview;
 if(target===3&&oldReview.stateRevision)preserved.stateRevision=stateRevision?.previousRevision;
 if(JSON.stringify(oldReview)!==JSON.stringify(preserved))throw Error('原七項審查、六選三與因果證據須完整保留');
 const proof=stateRevision;
 if(!proof||proof.kind!==`teacher-states-v${source}-to-v${target}`||proof.verdict!=='approved'||!String(proof.reviewer??'').trim()||proof.storyId!==prior.storyId||proof.version!==target||
 proof.originalManuscriptDigest!==prior.manuscriptDigest||proof.originalReviewDigest!==prior.review.digest||proof.manuscriptDigest!==request.manuscriptDigest||
 JSON.stringify(proof.before)!==JSON.stringify(before)||JSON.stringify(proof.after)!==JSON.stringify(after)||!proof.otherFieldsUnchanged||
 !Array.isArray(proof.causality)||proof.causality.length!==8||proof.causality.some((r,i)=>r.result!=='R'+(i+1)||!Array.isArray(r.states)||r.states.length!==4||r.states.some(s=>typeof s!=='string'||s.trim().length<12))||
 typeof proof.distributionReview!=='string'||proof.distributionReview.trim().length<16)throw Error('缺少完整V'+target+'修訂審查證據');
 const report=validateDraft(request.markdown,'full');
 if(!report.mechanicalPass||report.details?.stateRulesVersion!==target)throw Error('修訂版full V'+target+'未通過：'+JSON.stringify(report.errors));
 if(JSON.stringify(proof.mechanicalReport)!==JSON.stringify(report))throw Error('修訂審查的機械報告與正式full不符');
 const occupied=new Set([prior,...(prior.manuscriptVersions??[])].flatMap(v=>[v.manuscriptPath,v.review.filePath]));
 for(const path of [request.manuscriptPath,request.reviewFile])if(typeof path!=='string'||!path.startsWith('content/events-v1/正式成品/')||path.includes('..')||path.includes('\\')||occupied.has(path))throw Error('新版須使用不同正式成品路徑，禁止覆寫歷史');
 if(!request.manuscriptPath.endsWith('.md')||!request.reviewFile.endsWith('.json'))throw Error('新版檔案類型錯誤');
 return report;
}
