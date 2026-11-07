import { fieldDefinition } from '../numeric/dictionary.js';

// Functional tags only; references may belong to another holder/context.
const roles = [
  {"id":1,"name":"校級管理","references":["1-4","3-2","4-1","10-2","10-3","10-1"]},
  {"id":2,"name":"教務系統","references":["1-1","3-3","3-4","10-2","10-4","11-1"]},
  {"id":3,"name":"學務系統","references":["1-4","2-1","3-1","3-2","10-3","11-1"]},
  {"id":4,"name":"輔導系統","references":["1-3","2-3","3-1","3-2","4-2","7-1"]},
  {"id":5,"name":"總務系統","references":["1-1","3-3","4-2","10-4","11-3","11-4"]},
  {"id":6,"name":"圖書與資訊","references":["1-1","3-3","3-4","10-4","11-4"]},
  {"id":7,"name":"人事與會計","references":["1-4","3-2","3-3","4-2","10-2","11-1"]},
  {"id":8,"name":"一般教師","references":["1-1","2-3","3-1","3-4","11-2","11-1"]},
  {"id":9,"name":"導師與教師協作","references":["1-3","2-3","3-1","3-3","5-1","11-1"]},
  {"id":10,"name":"校園支援人員","references":["1-1","2-3","3-3","5-3","11-3"]},
  {"id":11,"name":"導師班學生","references":["1-2","2-2","3-4","9-2","5-1","9-3"]},
  {"id":12,"name":"同年級其他班學生","references":["1-3","2-4","4-4","5-2","6-2"]},
  {"id":13,"name":"其他年級學生","references":["1-2","3-4","4-3","6-1","6-4"]},
  {"id":14,"name":"班級幹部","references":["1-1","3-1","3-3","4-4","6-1","9-1"]},
  {"id":15,"name":"學生自治與社團幹部","references":["1-4","3-1","3-3","4-1","4-3","6-1"]},
  {"id":16,"name":"特定教育支持需求學生","references":["2-2","3-4","5-1","7-1","9-3","9-4"]},
  {"id":17,"name":"學籍異動學生","references":["2-2","3-4","4-2","5-2","7-4","9-3"]},
  {"id":18,"name":"畢業生與離校學生","references":["3-4","4-1","4-3","5-1","7-4"]},
  {"id":19,"name":"主要照顧者","references":["1-1","2-2","4-2","5-1","7-1","7-2"]},
  {"id":20,"name":"其他監護或照顧相關者","references":["1-3","3-1","4-2","5-3","7-2"]},
  {"id":21,"name":"其他家庭成員","references":["1-3","2-4","5-2","7-1","7-4"]},
  {"id":22,"name":"家長班級代表","references":["1-1","3-1","4-4","5-3","6-1","8-4"]},
  {"id":23,"name":"家長組織成員","references":["1-4","3-2","4-1","6-1","8-4","6-3"]},
  {"id":24,"name":"歷屆與其他班家長","references":["1-3","4-2","5-1","7-4","8-3"]},
  {"id":25,"name":"教育主管機關","references":["1-4","3-2","3-3","10-3","12-1","12-4"]},
  {"id":26,"name":"警政與司法","references":["1-4","3-2","3-1","4-2","12-4"]},
  {"id":27,"name":"社政與兒少保護","references":["1-3","3-1","3-2","4-2","7-2","11-3"]},
  {"id":28,"name":"醫療與心理專業","references":["1-3","2-3","3-1","3-2","3-4"]},
  {"id":29,"name":"補習與校外教育","references":["1-1","3-1","3-4","4-1","8-1","11-1"]},
  {"id":30,"name":"大學及升學相關","references":["3-1","3-2","4-1","8-1","12-1"]},
  {"id":31,"name":"媒體與網路傳播","references":["1-4","3-1","8-2","8-3","8-4","12-2"]},
  {"id":32,"name":"民意與社會團體","references":["1-4","4-1","4-4","6-1","8-4","12-3"]},
  {"id":33,"name":"社區與商業人士","references":["1-1","3-1","4-2","5-4","7-3","8-4"]},
  {"id":34,"name":"教師私人生活相關","references":["1-3","2-4","4-3","5-2","7-1","7-4"]},
  {"id":35,"name":"一般民眾","references":["1-2","1-3","2-4","4-3","8-3"]},
];
for (const role of roles) {
  role.references.forEach(fieldDefinition);
  Object.freeze(role.references); Object.freeze(role);
}
export const ROLES = Object.freeze(roles);
export function roleDefinition(id) {
  if (!Number.isInteger(id) || id < 1 || id > 35) throw new RangeError('Unknown role tag');
  return ROLES[id - 1];
}
export function validateRoles(ids) {
  if (!Array.isArray(ids) || ids.length === 0 || new Set(ids).size !== ids.length) throw new RangeError('Unique role tags required');
  for (const id of ids) roleDefinition(id);
  return ids;
}
