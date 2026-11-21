// Functional identity and authority tags; numeric holders are resolved separately.
const roles = [
  {
    "id": 1,
    "name": "校級管理"
  },
  {
    "id": 2,
    "name": "教務系統"
  },
  {
    "id": 3,
    "name": "學務系統"
  },
  {
    "id": 4,
    "name": "輔導系統"
  },
  {
    "id": 5,
    "name": "總務系統"
  },
  {
    "id": 6,
    "name": "圖書與資訊"
  },
  {
    "id": 7,
    "name": "人事與會計"
  },
  {
    "id": 8,
    "name": "一般教師"
  },
  {
    "id": 9,
    "name": "導師與教師協作"
  },
  {
    "id": 10,
    "name": "校園支援人員"
  },
  {
    "id": 11,
    "name": "導師班學生"
  },
  {
    "id": 12,
    "name": "同年級其他班學生"
  },
  {
    "id": 13,
    "name": "其他年級學生"
  },
  {
    "id": 14,
    "name": "班級幹部"
  },
  {
    "id": 15,
    "name": "學生自治與社團幹部"
  },
  {
    "id": 16,
    "name": "特定教育支持需求學生"
  },
  {
    "id": 17,
    "name": "學籍異動學生"
  },
  {
    "id": 18,
    "name": "畢業生與離校學生"
  },
  {
    "id": 19,
    "name": "主要照顧者"
  },
  {
    "id": 20,
    "name": "其他監護或照顧相關者"
  },
  {
    "id": 21,
    "name": "其他家庭成員"
  },
  {
    "id": 22,
    "name": "家長班級代表"
  },
  {
    "id": 23,
    "name": "家長組織成員"
  },
  {
    "id": 24,
    "name": "歷屆與其他班家長"
  },
  {
    "id": 25,
    "name": "教育主管機關"
  },
  {
    "id": 26,
    "name": "警政與司法"
  },
  {
    "id": 27,
    "name": "社政與兒少保護"
  },
  {
    "id": 28,
    "name": "醫療與心理專業"
  },
  {
    "id": 29,
    "name": "補習與校外教育"
  },
  {
    "id": 30,
    "name": "大學及升學相關"
  },
  {
    "id": 31,
    "name": "媒體與網路傳播"
  },
  {
    "id": 32,
    "name": "民意與社會團體"
  },
  {
    "id": 33,
    "name": "社區與商業人士"
  },
  {
    "id": 34,
    "name": "教師私人生活相關"
  },
  {
    "id": 35,
    "name": "一般民眾"
  }
];
for (const role of roles) {
  Object.freeze(role);
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
