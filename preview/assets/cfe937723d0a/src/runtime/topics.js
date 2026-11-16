/** Legacy E codes remain valid for existing internal stories; new first-release content uses T codes. */
const LEGACY_EVENT_TOPICS = Object.freeze([
  {
    "id": "E01-01",
    "name": "成績突然下滑",
    "categoryId": "E01",
    "categoryName": "學生學習與課業",
    "status": "unwritten"
  },
  {
    "id": "E01-02",
    "name": "考試作弊或學術誠信爭議",
    "categoryId": "E01",
    "categoryName": "學生學習與課業",
    "status": "unwritten"
  },
  {
    "id": "E01-03",
    "name": "作業與學習態度問題",
    "categoryId": "E01",
    "categoryName": "學生學習與課業",
    "status": "unwritten"
  },
  {
    "id": "E01-04",
    "name": "學習能力落差",
    "categoryId": "E01",
    "categoryName": "學生學習與課業",
    "status": "unwritten"
  },
  {
    "id": "E01-05",
    "name": "升學選擇衝突",
    "categoryId": "E01",
    "categoryName": "學生學習與課業",
    "status": "unwritten"
  },
  {
    "id": "E01-06",
    "name": "學習進步與突破",
    "categoryId": "E01",
    "categoryName": "學生學習與課業",
    "status": "unwritten"
  },
  {
    "id": "E01-07",
    "name": "課程及評量爭議",
    "categoryId": "E01",
    "categoryName": "學生學習與課業",
    "status": "unwritten"
  },
  {
    "id": "E01-08",
    "name": "學生提出特殊學習需求",
    "categoryId": "E01",
    "categoryName": "學生學習與課業",
    "status": "unwritten"
  },
  {
    "id": "E02-01",
    "name": "遲到、缺曠與請假爭議",
    "categoryId": "E02",
    "categoryName": "學生行為與管教",
    "status": "unwritten"
  },
  {
    "id": "E02-02",
    "name": "校規違反或管教衝突",
    "categoryId": "E02",
    "categoryName": "學生行為與管教",
    "status": "unwritten"
  },
  {
    "id": "E02-03",
    "name": "手機及電子設備爭議",
    "categoryId": "E02",
    "categoryName": "學生行為與管教",
    "status": "unwritten"
  },
  {
    "id": "E02-04",
    "name": "上課干擾與秩序失控",
    "categoryId": "E02",
    "categoryName": "學生行為與管教",
    "status": "unwritten"
  },
  {
    "id": "E02-05",
    "name": "學生隱瞞或說謊",
    "categoryId": "E02",
    "categoryName": "學生行為與管教",
    "status": "unwritten"
  },
  {
    "id": "E02-06",
    "name": "學生反抗、拒絕配合",
    "categoryId": "E02",
    "categoryName": "學生行為與管教",
    "status": "unwritten"
  },
  {
    "id": "E02-07",
    "name": "正向行為與主動承擔",
    "categoryId": "E02",
    "categoryName": "學生行為與管教",
    "status": "unwritten"
  },
  {
    "id": "E02-08",
    "name": "處置不當或管教申訴",
    "categoryId": "E02",
    "categoryName": "學生行為與管教",
    "status": "unwritten"
  },
  {
    "id": "E03-01",
    "name": "朋友爭執與冷戰",
    "categoryId": "E03",
    "categoryName": "學生人際與情感",
    "status": "unwritten"
  },
  {
    "id": "E03-02",
    "name": "排擠、霸凌疑慮",
    "categoryId": "E03",
    "categoryName": "學生人際與情感",
    "status": "unwritten"
  },
  {
    "id": "E03-03",
    "name": "戀愛與感情糾紛",
    "categoryId": "E03",
    "categoryName": "學生人際與情感",
    "status": "unwritten"
  },
  {
    "id": "E03-04",
    "name": "秘密、傳聞與誤會",
    "categoryId": "E03",
    "categoryName": "學生人際與情感",
    "status": "unwritten"
  },
  {
    "id": "E03-05",
    "name": "跨班及跨年級糾紛",
    "categoryId": "E03",
    "categoryName": "學生人際與情感",
    "status": "unwritten"
  },
  {
    "id": "E03-06",
    "name": "學生主動和解",
    "categoryId": "E03",
    "categoryName": "學生人際與情感",
    "status": "unwritten"
  },
  {
    "id": "E03-07",
    "name": "同儕互助與友情建立",
    "categoryId": "E03",
    "categoryName": "學生人際與情感",
    "status": "unwritten"
  },
  {
    "id": "E03-08",
    "name": "群體分裂與結盟",
    "categoryId": "E03",
    "categoryName": "學生人際與情感",
    "status": "unwritten"
  },
  {
    "id": "E04-01",
    "name": "情緒崩潰與求助",
    "categoryId": "E04",
    "categoryName": "學生身心與個人困境",
    "status": "unwritten"
  },
  {
    "id": "E04-02",
    "name": "心理壓力或適應困難",
    "categoryId": "E04",
    "categoryName": "學生身心與個人困境",
    "status": "unwritten"
  },
  {
    "id": "E04-03",
    "name": "健康問題或突發不適",
    "categoryId": "E04",
    "categoryName": "學生身心與個人困境",
    "status": "unwritten"
  },
  {
    "id": "E04-04",
    "name": "校園安全與保護事件",
    "categoryId": "E04",
    "categoryName": "學生身心與個人困境",
    "status": "unwritten"
  },
  {
    "id": "E04-05",
    "name": "家庭變故影響學生",
    "categoryId": "E04",
    "categoryName": "學生身心與個人困境",
    "status": "unwritten"
  },
  {
    "id": "E04-06",
    "name": "學生失聯或重大缺席",
    "categoryId": "E04",
    "categoryName": "學生身心與個人困境",
    "status": "unwritten"
  },
  {
    "id": "E04-07",
    "name": "學生獲得支持與改善",
    "categoryId": "E04",
    "categoryName": "學生身心與個人困境",
    "status": "unwritten"
  },
  {
    "id": "E04-08",
    "name": "特殊支持與轉介協調",
    "categoryId": "E04",
    "categoryName": "學生身心與個人困境",
    "status": "unwritten"
  },
  {
    "id": "E05-01",
    "name": "家長質疑教師決定",
    "categoryId": "E05",
    "categoryName": "家長與親師關係",
    "status": "unwritten"
  },
  {
    "id": "E05-02",
    "name": "家長過度要求或干預",
    "categoryId": "E05",
    "categoryName": "家長與親師關係",
    "status": "unwritten"
  },
  {
    "id": "E05-03",
    "name": "親師溝通誤解",
    "categoryId": "E05",
    "categoryName": "家長與親師關係",
    "status": "unwritten"
  },
  {
    "id": "E05-04",
    "name": "家長間意見衝突",
    "categoryId": "E05",
    "categoryName": "家長與親師關係",
    "status": "unwritten"
  },
  {
    "id": "E05-05",
    "name": "家長正式申訴",
    "categoryId": "E05",
    "categoryName": "家長與親師關係",
    "status": "unwritten"
  },
  {
    "id": "E05-06",
    "name": "家長提供資源或協助",
    "categoryId": "E05",
    "categoryName": "家長與親師關係",
    "status": "unwritten"
  },
  {
    "id": "E05-07",
    "name": "家長公開支持或緩頰",
    "categoryId": "E05",
    "categoryName": "家長與親師關係",
    "status": "unwritten"
  },
  {
    "id": "E05-08",
    "name": "家長失聯或拒絕合作",
    "categoryId": "E05",
    "categoryName": "家長與親師關係",
    "status": "unwritten"
  },
  {
    "id": "E06-01",
    "name": "臨時行政交辦",
    "categoryId": "E06",
    "categoryName": "行政與校務管理",
    "status": "unwritten"
  },
  {
    "id": "E06-02",
    "name": "行政責任推卸",
    "categoryId": "E06",
    "categoryName": "行政與校務管理",
    "status": "unwritten"
  },
  {
    "id": "E06-03",
    "name": "校規與規章執行爭議",
    "categoryId": "E06",
    "categoryName": "行政與校務管理",
    "status": "unwritten"
  },
  {
    "id": "E06-04",
    "name": "行政決策反覆變動",
    "categoryId": "E06",
    "categoryName": "行政與校務管理",
    "status": "unwritten"
  },
  {
    "id": "E06-05",
    "name": "處室溝通與協作失敗",
    "categoryId": "E06",
    "categoryName": "行政與校務管理",
    "status": "unwritten"
  },
  {
    "id": "E06-06",
    "name": "行政主動支援",
    "categoryId": "E06",
    "categoryName": "行政與校務管理",
    "status": "unwritten"
  },
  {
    "id": "E06-07",
    "name": "考核、督導與究責",
    "categoryId": "E06",
    "categoryName": "行政與校務管理",
    "status": "unwritten"
  },
  {
    "id": "E06-08",
    "name": "重大校務決策或人事變動",
    "categoryId": "E06",
    "categoryName": "行政與校務管理",
    "status": "unwritten"
  },
  {
    "id": "E07-01",
    "name": "同事合作或互相支援",
    "categoryId": "E07",
    "categoryName": "教師同儕與職場",
    "status": "unwritten"
  },
  {
    "id": "E07-02",
    "name": "教學理念衝突",
    "categoryId": "E07",
    "categoryName": "教師同儕與職場",
    "status": "unwritten"
  },
  {
    "id": "E07-03",
    "name": "同事失誤連帶影響",
    "categoryId": "E07",
    "categoryName": "教師同儕與職場",
    "status": "unwritten"
  },
  {
    "id": "E07-04",
    "name": "職場流言與人際摩擦",
    "categoryId": "E07",
    "categoryName": "教師同儕與職場",
    "status": "unwritten"
  },
  {
    "id": "E07-05",
    "name": "工作分配不公平",
    "categoryId": "E07",
    "categoryName": "教師同儕與職場",
    "status": "unwritten"
  },
  {
    "id": "E07-06",
    "name": "教師被表揚或獲得肯定",
    "categoryId": "E07",
    "categoryName": "教師同儕與職場",
    "status": "unwritten"
  },
  {
    "id": "E07-07",
    "name": "職場施壓或權力衝突",
    "categoryId": "E07",
    "categoryName": "教師同儕與職場",
    "status": "unwritten"
  },
  {
    "id": "E07-08",
    "name": "同事關係修復與和解",
    "categoryId": "E07",
    "categoryName": "教師同儕與職場",
    "status": "unwritten"
  },
  {
    "id": "E08-01",
    "name": "班級幹部運作問題",
    "categoryId": "E08",
    "categoryName": "班級經營與集體活動",
    "status": "unwritten"
  },
  {
    "id": "E08-02",
    "name": "班級凝聚與合作",
    "categoryId": "E08",
    "categoryName": "班級經營與集體活動",
    "status": "unwritten"
  },
  {
    "id": "E08-03",
    "name": "班級活動籌備",
    "categoryId": "E08",
    "categoryName": "班級經營與集體活動",
    "status": "unwritten"
  },
  {
    "id": "E08-04",
    "name": "班級活動突發狀況",
    "categoryId": "E08",
    "categoryName": "班級經營與集體活動",
    "status": "unwritten"
  },
  {
    "id": "E08-05",
    "name": "集體違規或抵制",
    "categoryId": "E08",
    "categoryName": "班級經營與集體活動",
    "status": "unwritten"
  },
  {
    "id": "E08-06",
    "name": "班級競賽與榮譽",
    "categoryId": "E08",
    "categoryName": "班級經營與集體活動",
    "status": "unwritten"
  },
  {
    "id": "E08-07",
    "name": "班級氣氛惡化",
    "categoryId": "E08",
    "categoryName": "班級經營與集體活動",
    "status": "unwritten"
  },
  {
    "id": "E08-08",
    "name": "班級重大轉折或共同回憶",
    "categoryId": "E08",
    "categoryName": "班級經營與集體活動",
    "status": "unwritten"
  },
  {
    "id": "E09-01",
    "name": "校慶或大型活動",
    "categoryId": "E09",
    "categoryName": "校園活動與突發事故",
    "status": "unwritten"
  },
  {
    "id": "E09-02",
    "name": "運動賽事與競賽",
    "categoryId": "E09",
    "categoryName": "校園活動與突發事故",
    "status": "unwritten"
  },
  {
    "id": "E09-03",
    "name": "校外教學及旅行",
    "categoryId": "E09",
    "categoryName": "校園活動與突發事故",
    "status": "unwritten"
  },
  {
    "id": "E09-04",
    "name": "設備故障與環境問題",
    "categoryId": "E09",
    "categoryName": "校園活動與突發事故",
    "status": "unwritten"
  },
  {
    "id": "E09-05",
    "name": "校園意外或緊急事故",
    "categoryId": "E09",
    "categoryName": "校園活動與突發事故",
    "status": "unwritten"
  },
  {
    "id": "E09-06",
    "name": "天災及停課應變",
    "categoryId": "E09",
    "categoryName": "校園活動與突發事故",
    "status": "unwritten"
  },
  {
    "id": "E09-07",
    "name": "校園安全爭議",
    "categoryId": "E09",
    "categoryName": "校園活動與突發事故",
    "status": "unwritten"
  },
  {
    "id": "E09-08",
    "name": "活動成功及意外收穫",
    "categoryId": "E09",
    "categoryName": "校園活動與突發事故",
    "status": "unwritten"
  },
  {
    "id": "E10-01",
    "name": "班級群組爭議",
    "categoryId": "E10",
    "categoryName": "網路、媒體與社會輿論",
    "status": "unwritten"
  },
  {
    "id": "E10-02",
    "name": "學生網路言行風波",
    "categoryId": "E10",
    "categoryName": "網路、媒體與社會輿論",
    "status": "unwritten"
  },
  {
    "id": "E10-03",
    "name": "未證實傳聞擴散",
    "categoryId": "E10",
    "categoryName": "網路、媒體與社會輿論",
    "status": "unwritten"
  },
  {
    "id": "E10-04",
    "name": "社群公開指控教師",
    "categoryId": "E10",
    "categoryName": "網路、媒體與社會輿論",
    "status": "unwritten"
  },
  {
    "id": "E10-05",
    "name": "影片、照片或對話外流",
    "categoryId": "E10",
    "categoryName": "網路、媒體與社會輿論",
    "status": "unwritten"
  },
  {
    "id": "E10-06",
    "name": "媒體報導與輿論擴大",
    "categoryId": "E10",
    "categoryName": "網路、媒體與社會輿論",
    "status": "unwritten"
  },
  {
    "id": "E10-07",
    "name": "公開澄清或正面聲援",
    "categoryId": "E10",
    "categoryName": "網路、媒體與社會輿論",
    "status": "unwritten"
  },
  {
    "id": "E10-08",
    "name": "網路事件後續反轉",
    "categoryId": "E10",
    "categoryName": "網路、媒體與社會輿論",
    "status": "unwritten"
  },
  {
    "id": "E11-01",
    "name": "教育政策或課綱變動",
    "categoryId": "E11",
    "categoryName": "校外制度與社會介入",
    "status": "unwritten"
  },
  {
    "id": "E11-02",
    "name": "教育主管機關查核",
    "categoryId": "E11",
    "categoryName": "校外制度與社會介入",
    "status": "unwritten"
  },
  {
    "id": "E11-03",
    "name": "民意代表或團體介入",
    "categoryId": "E11",
    "categoryName": "校外制度與社會介入",
    "status": "unwritten"
  },
  {
    "id": "E11-04",
    "name": "警政與司法事件",
    "categoryId": "E11",
    "categoryName": "校外制度與社會介入",
    "status": "unwritten"
  },
  {
    "id": "E11-05",
    "name": "社政及兒少保護介入",
    "categoryId": "E11",
    "categoryName": "校外制度與社會介入",
    "status": "unwritten"
  },
  {
    "id": "E11-06",
    "name": "校外教育機構爭議",
    "categoryId": "E11",
    "categoryName": "校外制度與社會介入",
    "status": "unwritten"
  },
  {
    "id": "E11-07",
    "name": "外部資源與專業協助",
    "categoryId": "E11",
    "categoryName": "校外制度與社會介入",
    "status": "unwritten"
  },
  {
    "id": "E11-08",
    "name": "制度調整與調查結果",
    "categoryId": "E11",
    "categoryName": "校外制度與社會介入",
    "status": "unwritten"
  },
  {
    "id": "E12-01",
    "name": "家庭與親友互動",
    "categoryId": "E12",
    "categoryName": "教師私人生活與職涯",
    "status": "unwritten"
  },
  {
    "id": "E12-02",
    "name": "私人感情與社交",
    "categoryId": "E12",
    "categoryName": "教師私人生活與職涯",
    "status": "unwritten"
  },
  {
    "id": "E12-03",
    "name": "生活開銷與財務壓力",
    "categoryId": "E12",
    "categoryName": "教師私人生活與職涯",
    "status": "unwritten"
  },
  {
    "id": "E12-04",
    "name": "健康、疲勞與休息",
    "categoryId": "E12",
    "categoryName": "教師私人生活與職涯",
    "status": "unwritten"
  },
  {
    "id": "E12-05",
    "name": "休閒旅行與個人興趣",
    "categoryId": "E12",
    "categoryName": "教師私人生活與職涯",
    "status": "unwritten"
  },
  {
    "id": "E12-06",
    "name": "進修與專業成長",
    "categoryId": "E12",
    "categoryName": "教師私人生活與職涯",
    "status": "unwritten"
  },
  {
    "id": "E12-07",
    "name": "私人生活受到學校工作干擾",
    "categoryId": "E12",
    "categoryName": "教師私人生活與職涯",
    "status": "unwritten"
  },
  {
    "id": "E12-08",
    "name": "職涯選擇與長期人生轉折",
    "categoryId": "E12",
    "categoryName": "教師私人生活與職涯",
    "status": "unwritten"
  }
].map(Object.freeze));
/** Phase 17-B: first-release 16×8 topic dictionary, sourced from docs/03. */
export const V2_EVENT_TOPICS = Object.freeze([
  {
    "id": "T01-01",
    "name": "學習動機、拖延與自我管理",
    "categoryId": "T01",
    "categoryName": "課堂教學與學習發展",
    "status": "unwritten"
  },
  {
    "id": "T01-02",
    "name": "成績起伏與科目落差",
    "categoryId": "T01",
    "categoryName": "課堂教學與學習發展",
    "status": "unwritten"
  },
  {
    "id": "T01-03",
    "name": "作業、小考與補救學習",
    "categoryId": "T01",
    "categoryName": "課堂教學與學習發展",
    "status": "unwritten"
  },
  {
    "id": "T01-04",
    "name": "評分公平、考卷與成績爭議",
    "categoryId": "T01",
    "categoryName": "課堂教學與學習發展",
    "status": "unwritten"
  },
  {
    "id": "T01-05",
    "name": "作弊、抄襲與學術誠信",
    "categoryId": "T01",
    "categoryName": "課堂教學與學習發展",
    "status": "unwritten"
  },
  {
    "id": "T01-06",
    "name": "學習方法、時間安排與策略調整",
    "categoryId": "T01",
    "categoryName": "課堂教學與學習發展",
    "status": "unwritten"
  },
  {
    "id": "T01-07",
    "name": "課堂教法差異與學生回饋",
    "categoryId": "T01",
    "categoryName": "課堂教學與學習發展",
    "status": "unwritten"
  },
  {
    "id": "T01-08",
    "name": "學習突破、成果展示與成就",
    "categoryId": "T01",
    "categoryName": "課堂教學與學習發展",
    "status": "unwritten"
  },
  {
    "id": "T02-01",
    "name": "高一選課、高二選組及轉組",
    "categoryId": "T02",
    "categoryName": "課程選擇、學籍與升學",
    "status": "unwritten"
  },
  {
    "id": "T02-02",
    "name": "學習歷程檔案與多元表現",
    "categoryId": "T02",
    "categoryName": "課程選擇、學籍與升學",
    "status": "unwritten"
  },
  {
    "id": "T02-03",
    "name": "必修學分、補考、重修及畢業資格",
    "categoryId": "T02",
    "categoryName": "課程選擇、學籍與升學",
    "status": "unwritten"
  },
  {
    "id": "T02-04",
    "name": "校內排名、推薦名額與公平爭議",
    "categoryId": "T02",
    "categoryName": "課程選擇、學籍與升學",
    "status": "unwritten"
  },
  {
    "id": "T02-05",
    "name": "繁星推薦與學生家長協調",
    "categoryId": "T02",
    "categoryName": "課程選擇、學籍與升學",
    "status": "unwritten"
  },
  {
    "id": "T02-06",
    "name": "申請入學、備審資料及面試",
    "categoryId": "T02",
    "categoryName": "課程選擇、學籍與升學",
    "status": "unwritten"
  },
  {
    "id": "T02-07",
    "name": "分科測驗、志願選填與落點抉擇",
    "categoryId": "T02",
    "categoryName": "課程選擇、學籍與升學",
    "status": "unwritten"
  },
  {
    "id": "T02-08",
    "name": "技職、就業及非典型升學道路",
    "categoryId": "T02",
    "categoryName": "課程選擇、學籍與升學",
    "status": "unwritten"
  },
  {
    "id": "T03-01",
    "name": "身心障礙學生的合理調整與協作",
    "categoryId": "T03",
    "categoryName": "差異化支持與校園適應",
    "status": "unwritten"
  },
  {
    "id": "T03-02",
    "name": "注意力、神經多樣性與課堂需求",
    "categoryId": "T03",
    "categoryName": "差異化支持與校園適應",
    "status": "unwritten"
  },
  {
    "id": "T03-03",
    "name": "學習障礙、學習困難及補救支持",
    "categoryId": "T03",
    "categoryName": "差異化支持與校園適應",
    "status": "unwritten"
  },
  {
    "id": "T03-04",
    "name": "資優、特殊才能與學習落差",
    "categoryId": "T03",
    "categoryName": "差異化支持與校園適應",
    "status": "unwritten"
  },
  {
    "id": "T03-05",
    "name": "轉入轉出、休復學與班級適應",
    "categoryId": "T03",
    "categoryName": "差異化支持與校園適應",
    "status": "unwritten"
  },
  {
    "id": "T03-06",
    "name": "長期缺課後返校及學習銜接",
    "categoryId": "T03",
    "categoryName": "差異化支持與校園適應",
    "status": "unwritten"
  },
  {
    "id": "T03-07",
    "name": "語言文化、身分差異與融入班級",
    "categoryId": "T03",
    "categoryName": "差異化支持與校園適應",
    "status": "unwritten"
  },
  {
    "id": "T03-08",
    "name": "學生自我倡議、同儕支持及資源連結",
    "categoryId": "T03",
    "categoryName": "差異化支持與校園適應",
    "status": "unwritten"
  },
  {
    "id": "T04-01",
    "name": "遲到、請假、曠課與公假認定",
    "categoryId": "T04",
    "categoryName": "出缺勤、生活常規與管教",
    "status": "unwritten"
  },
  {
    "id": "T04-02",
    "name": "制服、服儀、校園生活規範",
    "categoryId": "T04",
    "categoryName": "出缺勤、生活常規與管教",
    "status": "unwritten"
  },
  {
    "id": "T04-03",
    "name": "手機、上課裝置與分心問題",
    "categoryId": "T04",
    "categoryName": "出缺勤、生活常規與管教",
    "status": "unwritten"
  },
  {
    "id": "T04-04",
    "name": "課堂秩序與干擾他人",
    "categoryId": "T04",
    "categoryName": "出缺勤、生活常規與管教",
    "status": "unwritten"
  },
  {
    "id": "T04-05",
    "name": "學生隱瞞、說法反覆與誤解",
    "categoryId": "T04",
    "categoryName": "出缺勤、生活常規與管教",
    "status": "unwritten"
  },
  {
    "id": "T04-06",
    "name": "衝突管教、拒絕配合與對話",
    "categoryId": "T04",
    "categoryName": "出缺勤、生活常規與管教",
    "status": "unwritten"
  },
  {
    "id": "T04-07",
    "name": "菸品、電子煙及其他違規行為",
    "categoryId": "T04",
    "categoryName": "出缺勤、生活常規與管教",
    "status": "unwritten"
  },
  {
    "id": "T04-08",
    "name": "管教界線、不當處置與救濟",
    "categoryId": "T04",
    "categoryName": "出缺勤、生活常規與管教",
    "status": "unwritten"
  },
  {
    "id": "T05-01",
    "name": "朋友磨合、爭執與冷戰",
    "categoryId": "T05",
    "categoryName": "同儕友情、群體與霸凌",
    "status": "unwritten"
  },
  {
    "id": "T05-02",
    "name": "小團體、排擠與關係霸凌疑慮",
    "categoryId": "T05",
    "categoryName": "同儕友情、群體與霸凌",
    "status": "unwritten"
  },
  {
    "id": "T05-03",
    "name": "言語或肢體衝突與求助",
    "categoryId": "T05",
    "categoryName": "同儕友情、群體與霸凌",
    "status": "unwritten"
  },
  {
    "id": "T05-04",
    "name": "跨班、跨年級及社團人際摩擦",
    "categoryId": "T05",
    "categoryName": "同儕友情、群體與霸凌",
    "status": "unwritten"
  },
  {
    "id": "T05-05",
    "name": "傳言、祕密與信任危機",
    "categoryId": "T05",
    "categoryName": "同儕友情、群體與霸凌",
    "status": "unwritten"
  },
  {
    "id": "T05-06",
    "name": "朋友間合作、道歉與和解",
    "categoryId": "T05",
    "categoryName": "同儕友情、群體與霸凌",
    "status": "unwritten"
  },
  {
    "id": "T05-07",
    "name": "同儕扶持、義氣與保護界線",
    "categoryId": "T05",
    "categoryName": "同儕友情、群體與霸凌",
    "status": "unwritten"
  },
  {
    "id": "T05-08",
    "name": "集體氛圍、結盟與同儕壓力",
    "categoryId": "T05",
    "categoryName": "同儕友情、群體與霸凌",
    "status": "unwritten"
  },
  {
    "id": "T06-01",
    "name": "單戀、告白與交往煩惱",
    "categoryId": "T06",
    "categoryName": "青春感情、性平與界線",
    "status": "unwritten"
  },
  {
    "id": "T06-02",
    "name": "分手、嫉妒與關係衝突",
    "categoryId": "T06",
    "categoryName": "青春感情、性平與界線",
    "status": "unwritten"
  },
  {
    "id": "T06-03",
    "name": "伴侶控制、跟蹤或威脅疑慮",
    "categoryId": "T06",
    "categoryName": "青春感情、性平與界線",
    "status": "unwritten"
  },
  {
    "id": "T06-04",
    "name": "性別刻板印象與不友善言語",
    "categoryId": "T06",
    "categoryName": "青春感情、性平與界線",
    "status": "unwritten"
  },
  {
    "id": "T06-05",
    "name": "性別認同、身體界線與尊重",
    "categoryId": "T06",
    "categoryName": "青春感情、性平與界線",
    "status": "unwritten"
  },
  {
    "id": "T06-06",
    "name": "不受歡迎接觸與性騷擾疑慮",
    "categoryId": "T06",
    "categoryName": "青春感情、性平與界線",
    "status": "unwritten"
  },
  {
    "id": "T06-07",
    "name": "私密影像、合成性影像與保護",
    "categoryId": "T06",
    "categoryName": "青春感情、性平與界線",
    "status": "unwritten"
  },
  {
    "id": "T06-08",
    "name": "性別事件通報、保密及支持",
    "categoryId": "T06",
    "categoryName": "青春感情、性平與界線",
    "status": "unwritten"
  },
  {
    "id": "T07-01",
    "name": "考試焦慮、自我要求與失落",
    "categoryId": "T07",
    "categoryName": "身心健康、壓力與輔導",
    "status": "unwritten"
  },
  {
    "id": "T07-02",
    "name": "情緒困擾與學生主動求助",
    "categoryId": "T07",
    "categoryName": "身心健康、壓力與輔導",
    "status": "unwritten"
  },
  {
    "id": "T07-03",
    "name": "拒學想法、退縮與出席困難",
    "categoryId": "T07",
    "categoryName": "身心健康、壓力與輔導",
    "status": "unwritten"
  },
  {
    "id": "T07-04",
    "name": "睡眠不足、疲勞及過勞作息",
    "categoryId": "T07",
    "categoryName": "身心健康、壓力與輔導",
    "status": "unwritten"
  },
  {
    "id": "T07-05",
    "name": "生病、受傷與健康中心處理",
    "categoryId": "T07",
    "categoryName": "身心健康、壓力與輔導",
    "status": "unwritten"
  },
  {
    "id": "T07-06",
    "name": "自傷風險、危機辨識與保護",
    "categoryId": "T07",
    "categoryName": "身心健康、壓力與輔導",
    "status": "unwritten"
  },
  {
    "id": "T07-07",
    "name": "輔導、醫療、跨專業轉介與追蹤",
    "categoryId": "T07",
    "categoryName": "身心健康、壓力與輔導",
    "status": "unwritten"
  },
  {
    "id": "T07-08",
    "name": "復原、支持網絡與日常小進步",
    "categoryId": "T07",
    "categoryName": "身心健康、壓力與輔導",
    "status": "unwritten"
  },
  {
    "id": "T08-01",
    "name": "父母期待與學生成長衝突",
    "categoryId": "T08",
    "categoryName": "家庭處境、照顧與經濟",
    "status": "unwritten"
  },
  {
    "id": "T08-02",
    "name": "家庭成員關係緊張或重組",
    "categoryId": "T08",
    "categoryName": "家庭處境、照顧與經濟",
    "status": "unwritten"
  },
  {
    "id": "T08-03",
    "name": "主要照顧者更換及聯絡安排",
    "categoryId": "T08",
    "categoryName": "家庭處境、照顧與經濟",
    "status": "unwritten"
  },
  {
    "id": "T08-04",
    "name": "家庭經濟壓力與學費資源",
    "categoryId": "T08",
    "categoryName": "家庭處境、照顧與經濟",
    "status": "unwritten"
  },
  {
    "id": "T08-05",
    "name": "家務、照顧責任與課業拉扯",
    "categoryId": "T08",
    "categoryName": "家庭處境、照顧與經濟",
    "status": "unwritten"
  },
  {
    "id": "T08-06",
    "name": "親子溝通改善與互相理解",
    "categoryId": "T08",
    "categoryName": "家庭處境、照顧與經濟",
    "status": "unwritten"
  },
  {
    "id": "T08-07",
    "name": "家庭突發變故與生活銜接",
    "categoryId": "T08",
    "categoryName": "家庭處境、照顧與經濟",
    "status": "unwritten"
  },
  {
    "id": "T08-08",
    "name": "家庭支持、才藝資源與溫暖互動",
    "categoryId": "T08",
    "categoryName": "家庭處境、照顧與經濟",
    "status": "unwritten"
  },
  {
    "id": "T09-01",
    "name": "家長對教學或管教提出質疑",
    "categoryId": "T09",
    "categoryName": "親師合作、家長社群與申訴",
    "status": "unwritten"
  },
  {
    "id": "T09-02",
    "name": "家長高頻訊息與聯絡時間界線",
    "categoryId": "T09",
    "categoryName": "親師合作、家長社群與申訴",
    "status": "unwritten"
  },
  {
    "id": "T09-03",
    "name": "親師誤解、轉述與資訊落差",
    "categoryId": "T09",
    "categoryName": "親師合作、家長社群與申訴",
    "status": "unwritten"
  },
  {
    "id": "T09-04",
    "name": "家長間立場分歧與群組爭執",
    "categoryId": "T09",
    "categoryName": "親師合作、家長社群與申訴",
    "status": "unwritten"
  },
  {
    "id": "T09-05",
    "name": "家長不易聯繫或拒絕合作",
    "categoryId": "T09",
    "categoryName": "親師合作、家長社群與申訴",
    "status": "unwritten"
  },
  {
    "id": "T09-06",
    "name": "正式陳情、申訴與釐清程序",
    "categoryId": "T09",
    "categoryName": "親師合作、家長社群與申訴",
    "status": "unwritten"
  },
  {
    "id": "T09-07",
    "name": "家長資源、志工及班級協助",
    "categoryId": "T09",
    "categoryName": "親師合作、家長社群與申訴",
    "status": "unwritten"
  },
  {
    "id": "T09-08",
    "name": "親師關係修復、肯定與感謝",
    "categoryId": "T09",
    "categoryName": "親師合作、家長社群與申訴",
    "status": "unwritten"
  },
  {
    "id": "T10-01",
    "name": "班級幹部輪替、分工與責任",
    "categoryId": "T10",
    "categoryName": "班級日常、幹部與學生亮點",
    "status": "unwritten"
  },
  {
    "id": "T10-02",
    "name": "座位、值日生與班務小摩擦",
    "categoryId": "T10",
    "categoryName": "班級日常、幹部與學生亮點",
    "status": "unwritten"
  },
  {
    "id": "T10-03",
    "name": "午餐、打掃、午休與校園趣事",
    "categoryId": "T10",
    "categoryName": "班級日常、幹部與學生亮點",
    "status": "unwritten"
  },
  {
    "id": "T10-04",
    "name": "同學才藝、興趣與隱藏亮點",
    "categoryId": "T10",
    "categoryName": "班級日常、幹部與學生亮點",
    "status": "unwritten"
  },
  {
    "id": "T10-05",
    "name": "師生玩笑、誤會與荒謬小事",
    "categoryId": "T10",
    "categoryName": "班級日常、幹部與學生亮點",
    "status": "unwritten"
  },
  {
    "id": "T10-06",
    "name": "學生主動幫忙與善意驚喜",
    "categoryId": "T10",
    "categoryName": "班級日常、幹部與學生亮點",
    "status": "unwritten"
  },
  {
    "id": "T10-07",
    "name": "班級默契、共同目標與合作",
    "categoryId": "T10",
    "categoryName": "班級日常、幹部與學生亮點",
    "status": "unwritten"
  },
  {
    "id": "T10-08",
    "name": "三年日常回憶與成長轉折",
    "categoryId": "T10",
    "categoryName": "班級日常、幹部與學生亮點",
    "status": "unwritten"
  },
  {
    "id": "T11-01",
    "name": "社團選擇、投入與退出",
    "categoryId": "T11",
    "categoryName": "社團、校園活動與公共參與",
    "status": "unwritten"
  },
  {
    "id": "T11-02",
    "name": "競賽、表演與成果發表",
    "categoryId": "T11",
    "categoryName": "社團、校園活動與公共參與",
    "status": "unwritten"
  },
  {
    "id": "T11-03",
    "name": "體育活動與班級榮譽",
    "categoryId": "T11",
    "categoryName": "社團、校園活動與公共參與",
    "status": "unwritten"
  },
  {
    "id": "T11-04",
    "name": "校慶、園遊會的籌備與善後",
    "categoryId": "T11",
    "categoryName": "社團、校園活動與公共參與",
    "status": "unwritten"
  },
  {
    "id": "T11-05",
    "name": "校外教學、旅行的前後互動",
    "categoryId": "T11",
    "categoryName": "社團、校園活動與公共參與",
    "status": "unwritten"
  },
  {
    "id": "T11-06",
    "name": "學生自治、公共提案與討論",
    "categoryId": "T11",
    "categoryName": "社團、校園活動與公共參與",
    "status": "unwritten"
  },
  {
    "id": "T11-07",
    "name": "服務學習、志工與社區參與",
    "categoryId": "T11",
    "categoryName": "社團、校園活動與公共參與",
    "status": "unwritten"
  },
  {
    "id": "T11-08",
    "name": "活動計畫落差、意外收穫與回憶",
    "categoryId": "T11",
    "categoryName": "社團、校園活動與公共參與",
    "status": "unwritten"
  },
  {
    "id": "T12-01",
    "name": "社群群組與公開留言衝突",
    "categoryId": "T12",
    "categoryName": "數位生活、AI與網路傳播",
    "status": "unwritten"
  },
  {
    "id": "T12-02",
    "name": "網路身分、帳號冒用與詐騙",
    "categoryId": "T12",
    "categoryName": "數位生活、AI與網路傳播",
    "status": "unwritten"
  },
  {
    "id": "T12-03",
    "name": "網路霸凌、截圖傳播與匿名爆料",
    "categoryId": "T12",
    "categoryName": "數位生活、AI與網路傳播",
    "status": "unwritten"
  },
  {
    "id": "T12-04",
    "name": "照片影片、個資及對話外流",
    "categoryId": "T12",
    "categoryName": "數位生活、AI與網路傳播",
    "status": "unwritten"
  },
  {
    "id": "T12-05",
    "name": "生成式AI作業、輔助與誠信爭議",
    "categoryId": "T12",
    "categoryName": "數位生活、AI與網路傳播",
    "status": "unwritten"
  },
  {
    "id": "T12-06",
    "name": "AI深偽、錯誤資訊與辨識",
    "categoryId": "T12",
    "categoryName": "數位生活、AI與網路傳播",
    "status": "unwritten"
  },
  {
    "id": "T12-07",
    "name": "直播、網路創作與正向影響",
    "categoryId": "T12",
    "categoryName": "數位生活、AI與網路傳播",
    "status": "unwritten"
  },
  {
    "id": "T12-08",
    "name": "網路輿論擴大、澄清與後續",
    "categoryId": "T12",
    "categoryName": "數位生活、AI與網路傳播",
    "status": "unwritten"
  },
  {
    "id": "T13-01",
    "name": "科任與導師溝通及課堂交接",
    "categoryId": "T13",
    "categoryName": "同事合作、教學專業與職場",
    "status": "unwritten"
  },
  {
    "id": "T13-02",
    "name": "教師合作備課與資源共享",
    "categoryId": "T13",
    "categoryName": "同事合作、教學專業與職場",
    "status": "unwritten"
  },
  {
    "id": "T13-03",
    "name": "教學理念、評量與管教觀念分歧",
    "categoryId": "T13",
    "categoryName": "同事合作、教學專業與職場",
    "status": "unwritten"
  },
  {
    "id": "T13-04",
    "name": "跨處室合作、求援與責任界線",
    "categoryId": "T13",
    "categoryName": "同事合作、教學專業與職場",
    "status": "unwritten"
  },
  {
    "id": "T13-05",
    "name": "同事失誤、代課與工作連帶影響",
    "categoryId": "T13",
    "categoryName": "同事合作、教學專業與職場",
    "status": "unwritten"
  },
  {
    "id": "T13-06",
    "name": "職場八卦、誤解與信任",
    "categoryId": "T13",
    "categoryName": "同事合作、教學專業與職場",
    "status": "unwritten"
  },
  {
    "id": "T13-07",
    "name": "教師考核、研習及專業成長",
    "categoryId": "T13",
    "categoryName": "同事合作、教學專業與職場",
    "status": "unwritten"
  },
  {
    "id": "T13-08",
    "name": "同事支持、和解與職場情誼",
    "categoryId": "T13",
    "categoryName": "同事合作、教學專業與職場",
    "status": "unwritten"
  },
  {
    "id": "T14-01",
    "name": "臨時交辦與大量行政表件",
    "categoryId": "T14",
    "categoryName": "私校行政、招生與工作制度",
    "status": "unwritten"
  },
  {
    "id": "T14-02",
    "name": "招生、宣傳與國中端活動壓力",
    "categoryId": "T14",
    "categoryName": "私校行政、招生與工作制度",
    "status": "unwritten"
  },
  {
    "id": "T14-03",
    "name": "少子化、招生變化與班級編制",
    "categoryId": "T14",
    "categoryName": "私校行政、招生與工作制度",
    "status": "unwritten"
  },
  {
    "id": "T14-04",
    "name": "升學榜單、績效與校方期待",
    "categoryId": "T14",
    "categoryName": "私校行政、招生與工作制度",
    "status": "unwritten"
  },
  {
    "id": "T14-05",
    "name": "留校自習、輔導課與工時安排",
    "categoryId": "T14",
    "categoryName": "私校行政、招生與工作制度",
    "status": "unwritten"
  },
  {
    "id": "T14-06",
    "name": "校方決策反覆、層級指令與卸責",
    "categoryId": "T14",
    "categoryName": "私校行政、招生與工作制度",
    "status": "unwritten"
  },
  {
    "id": "T14-07",
    "name": "聘任考核、職務安排與勞動爭議",
    "categoryId": "T14",
    "categoryName": "私校行政、招生與工作制度",
    "status": "unwritten"
  },
  {
    "id": "T14-08",
    "name": "資源配置、人事異動與校務改革",
    "categoryId": "T14",
    "categoryName": "私校行政、招生與工作制度",
    "status": "unwritten"
  },
  {
    "id": "T15-01",
    "name": "意外傷害、設備故障與環境風險",
    "categoryId": "T15",
    "categoryName": "校園安全、通報與外部制度",
    "status": "unwritten"
  },
  {
    "id": "T15-02",
    "name": "校外交通、通勤與返家安全",
    "categoryId": "T15",
    "categoryName": "校園安全、通報與外部制度",
    "status": "unwritten"
  },
  {
    "id": "T15-03",
    "name": "災害、停課與緊急應變",
    "categoryId": "T15",
    "categoryName": "校園安全、通報與外部制度",
    "status": "unwritten"
  },
  {
    "id": "T15-04",
    "name": "疑似霸凌、師生衝突與法定程序",
    "categoryId": "T15",
    "categoryName": "校園安全、通報與外部制度",
    "status": "unwritten"
  },
  {
    "id": "T15-05",
    "name": "兒少保護、家暴疑慮與跨網絡支援",
    "categoryId": "T15",
    "categoryName": "校園安全、通報與外部制度",
    "status": "unwritten"
  },
  {
    "id": "T15-06",
    "name": "違法犯罪、警政或司法協作",
    "categoryId": "T15",
    "categoryName": "校園安全、通報與外部制度",
    "status": "unwritten"
  },
  {
    "id": "T15-07",
    "name": "主管機關查核、制度變動與調查",
    "categoryId": "T15",
    "categoryName": "校園安全、通報與外部制度",
    "status": "unwritten"
  },
  {
    "id": "T15-08",
    "name": "校園危機後的復原、改善與信任",
    "categoryId": "T15",
    "categoryName": "校園安全、通報與外部制度",
    "status": "unwritten"
  },
  {
    "id": "T16-01",
    "name": "親人、家庭與生活責任",
    "categoryId": "T16",
    "categoryName": "教師私人生活、休息與人生",
    "status": "unwritten"
  },
  {
    "id": "T16-02",
    "name": "友情、戀愛與私人社交",
    "categoryId": "T16",
    "categoryName": "教師私人生活、休息與人生",
    "status": "unwritten"
  },
  {
    "id": "T16-03",
    "name": "生活開銷、財務與居住安排",
    "categoryId": "T16",
    "categoryName": "教師私人生活、休息與人生",
    "status": "unwritten"
  },
  {
    "id": "T16-04",
    "name": "睡眠、健康、休息與復原",
    "categoryId": "T16",
    "categoryName": "教師私人生活、休息與人生",
    "status": "unwritten"
  },
  {
    "id": "T16-05",
    "name": "嗜好、旅行、娛樂與小確幸",
    "categoryId": "T16",
    "categoryName": "教師私人生活、休息與人生",
    "status": "unwritten"
  },
  {
    "id": "T16-06",
    "name": "教師生活遭到家長或校務打擾",
    "categoryId": "T16",
    "categoryName": "教師私人生活、休息與人生",
    "status": "unwritten"
  },
  {
    "id": "T16-07",
    "name": "自我價值、職涯猶豫與成長",
    "categoryId": "T16",
    "categoryName": "教師私人生活、休息與人生",
    "status": "unwritten"
  },
  {
    "id": "T16-08",
    "name": "日常荒謬、意外緣分與人生轉機",
    "categoryId": "T16",
    "categoryName": "教師私人生活、休息與人生",
    "status": "unwritten"
  }
].map(Object.freeze));
export const EVENT_TOPICS = Object.freeze([...LEGACY_EVENT_TOPICS,...V2_EVENT_TOPICS]);
export const TOPIC_IDS = Object.freeze(EVENT_TOPICS.map(t=>t.id));
