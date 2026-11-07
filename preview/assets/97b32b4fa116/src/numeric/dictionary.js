// Canonical names and definitions: docs/02, 12 × 4 dictionary.
const categories = [
  {
    "id": 1,
    "name": "人格與行為",
    "fields": [
      {
        "code": "1-1",
        "name": "責任感",
        "description": "對應承擔事項的重視傾向"
      },
      {
        "code": "1-2",
        "name": "衝動性",
        "description": "受到刺激時立即行動的傾向"
      },
      {
        "code": "1-3",
        "name": "同理心",
        "description": "顧及他人處境的傾向"
      },
      {
        "code": "1-4",
        "name": "原則性",
        "description": "面對壓力時維持自身立場的傾向"
      }
    ]
  },
  {
    "id": 2,
    "name": "情緒與身心",
    "fields": [
      {
        "code": "2-1",
        "name": "憤怒",
        "description": "當下對抗或激動情緒"
      },
      {
        "code": "2-2",
        "name": "焦慮",
        "description": "對不確定後果的擔憂"
      },
      {
        "code": "2-3",
        "name": "疲勞",
        "description": "近期身心疲憊程度"
      },
      {
        "code": "2-4",
        "name": "愉悅",
        "description": "當下正向情緒"
      }
    ]
  },
  {
    "id": 3,
    "name": "能力與熟練",
    "fields": [
      {
        "code": "3-1",
        "name": "溝通能力",
        "description": "表達及理解資訊的熟練程度"
      },
      {
        "code": "3-2",
        "name": "判斷能力",
        "description": "分析情境與後果的熟練程度"
      },
      {
        "code": "3-3",
        "name": "執行能力",
        "description": "落實計畫與責任的能力"
      },
      {
        "code": "3-4",
        "name": "學習適應能力",
        "description": "從經歷學習及應對新情境的能力"
      }
    ]
  },
  {
    "id": 4,
    "name": "動機與需求",
    "fields": [
      {
        "code": "4-1",
        "name": "成就動機",
        "description": "追求成果與達成目標的傾向"
      },
      {
        "code": "4-2",
        "name": "安全需求",
        "description": "重視保障與穩定的程度"
      },
      {
        "code": "4-3",
        "name": "自主需求",
        "description": "希望自行決定的程度"
      },
      {
        "code": "4-4",
        "name": "認同需求",
        "description": "重視被肯定與接納的程度"
      }
    ]
  },
  {
    "id": 5,
    "name": "人際關係",
    "fields": [
      {
        "code": "5-1",
        "name": "信任",
        "description": "對指定對象可靠性的主觀預期"
      },
      {
        "code": "5-2",
        "name": "親近",
        "description": "與指定對象建立情感聯繫的程度"
      },
      {
        "code": "5-3",
        "name": "尊重",
        "description": "對指定對象的認可程度"
      },
      {
        "code": "5-4",
        "name": "不滿",
        "description": "對指定對象累積的負面感受"
      }
    ]
  },
  {
    "id": 6,
    "name": "群體與社交",
    "fields": [
      {
        "code": "6-1",
        "name": "群體影響力",
        "description": "人物對所屬群體的影響程度"
      },
      {
        "code": "6-2",
        "name": "從眾傾向",
        "description": "人物受到群體行為影響的傾向"
      },
      {
        "code": "6-3",
        "name": "群體凝聚力",
        "description": "群體成員維持共同認同與行動的程度"
      },
      {
        "code": "6-4",
        "name": "群體排他傾向",
        "description": "群體對外來者或不同立場的排拒傾向"
      }
    ]
  },
  {
    "id": 7,
    "name": "家庭與生活",
    "fields": [
      {
        "code": "7-1",
        "name": "家庭支持",
        "description": "家庭能提供協助的程度"
      },
      {
        "code": "7-2",
        "name": "家庭負擔",
        "description": "家庭責任與衝突造成的負擔"
      },
      {
        "code": "7-3",
        "name": "生活資源",
        "description": "可運用的生活資源充足程度"
      },
      {
        "code": "7-4",
        "name": "生活穩定度",
        "description": "日常生活條件的穩定程度"
      }
    ]
  },
  {
    "id": 8,
    "name": "聲譽與資訊",
    "fields": [
      {
        "code": "8-1",
        "name": "正面聲譽",
        "description": "指定評價者或群體的正向評價程度"
      },
      {
        "code": "8-2",
        "name": "負面聲譽",
        "description": "指定評價者或群體的負向評價程度"
      },
      {
        "code": "8-3",
        "name": "訊息採信傾向",
        "description": "接受尚未充分查證消息的傾向"
      },
      {
        "code": "8-4",
        "name": "傳播傾向",
        "description": "主動分享訊息的傾向"
      }
    ]
  },
  {
    "id": 9,
    "name": "班級與校園",
    "fields": [
      {
        "code": "9-1",
        "name": "班級秩序",
        "description": "班級日常規範與運作穩定程度"
      },
      {
        "code": "9-2",
        "name": "合作氣氛",
        "description": "班級成員互相協助的程度"
      },
      {
        "code": "9-3",
        "name": "歸屬感",
        "description": "人物覺得被指定群體接納的程度"
      },
      {
        "code": "9-4",
        "name": "校園安全感",
        "description": "人物對校園安全與受保護的主觀感受"
      }
    ]
  },
  {
    "id": 10,
    "name": "學校與管理",
    "fields": [
      {
        "code": "10-1",
        "name": "組織支援意願",
        "description": "相關組織或管理者願意提供協助的程度"
      },
      {
        "code": "10-2",
        "name": "監督強度",
        "description": "管理者檢查、追蹤與要求回報的程度"
      },
      {
        "code": "10-3",
        "name": "管理彈性",
        "description": "管理者考慮合理例外的意願"
      },
      {
        "code": "10-4",
        "name": "組織協作度",
        "description": "處室與教職員協同工作的程度"
      }
    ]
  },
  {
    "id": 11,
    "name": "資源與工作",
    "fields": [
      {
        "code": "11-1",
        "name": "工作負荷",
        "description": "指定期間內工作需求的相對程度"
      },
      {
        "code": "11-2",
        "name": "時間餘裕",
        "description": "指定期間能自行安排時間的餘裕程度"
      },
      {
        "code": "11-3",
        "name": "人力支援",
        "description": "可用協助人力相對需求的充足程度"
      },
      {
        "code": "11-4",
        "name": "工作資源",
        "description": "工具、設備、經費等工作資源充足程度"
      }
    ]
  },
  {
    "id": 12,
    "name": "外部與制度",
    "fields": [
      {
        "code": "12-1",
        "name": "政策變動程度",
        "description": "指定期間的政策與行政要求變化程度"
      },
      {
        "code": "12-2",
        "name": "社會關注度",
        "description": "外界對特定事件或議題的關注程度"
      },
      {
        "code": "12-3",
        "name": "外部干預強度",
        "description": "校外人士或組織試圖影響處理的程度"
      },
      {
        "code": "12-4",
        "name": "外部問責強度",
        "description": "校外制度或機關要求說明與查核的程度"
      }
    ]
  }
];
for (const category of categories) {
  category.fields.forEach(Object.freeze);
  Object.freeze(category.fields);
  Object.freeze(category);
}
export const CATEGORIES = Object.freeze(categories);
export const FIELDS = Object.freeze(CATEGORIES.flatMap(category =>
  category.fields.map(field => Object.freeze({ ...field, categoryId: category.id, categoryName: category.name }))));
const byCode = new Map(FIELDS.map(field => [field.code, field]));
export function isCode(code) { return typeof code === 'string' && byCode.has(code); }
export function fieldDefinition(code) {
  if (!isCode(code)) throw new RangeError(`Unknown numeric code: ${String(code)}`);
  return byCode.get(code);
}
