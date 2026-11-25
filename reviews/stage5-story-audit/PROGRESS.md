# 第五階段：T1～T6 故事品質審查與集中修正

- **故事審查基準 SHA**：`0d80d456e2905b35db096e9179069d783a66a249`
- **指定工作分支**：`work/t1-t6-natural-dialogue-pass-20261125`
- **審查紀錄位置**：`reviews/stage5-story-audit/`
- **故事總數**：648 篇
- **第一輪完整審查**：648／648 篇（100%）
- **正式完成（T1、T2 包含必要第二輪複核）**：648／648 篇
- **已定位 A 級錯誤**：77 項
- **已定位 B 級品質問題**：344 項
- **C 級觀察事項**：61 項
- **第一步總檢**：T1～T6 共 648 篇已完成並保存審查紀錄。
- **第二步集中修正**：T1～T6 已完成 421 項 A／B 修正及驗收，61 項 C 級觀察已修正或合理保留。

## 六學期完成進度

| 學期 | 故事總數 | 第一輪完成 | 第二輪完成 | 正式完成 | A 級 | B 級 | C 級 |
|---|---:|---:|---:|---:|---:|---:|---:|
| T1 高一上 | 174 | 174 | 174 | 174 | 36 | 79 | 49 |
| T2 高一下 | 42 | 42 | 42 | 42 | 2 | 5 | 11 |
| T3 高二上 | 90 | 90 | 不適用 | 90 | 19 | 15 | 0 |
| T4 高二下 | 54 | 54 | 不適用 | 54 | 4 | 33 | 0 |
| T5 高三上 | 138 | 138 | 不適用 | 138 | 14 | 65 | 0 |
| T6 高三下 | 150 | 150 | 不適用 | 150 | 2 | 147 | 1 |
| **合計** | **648** | **648** | T1/T2 已完成 | **648** | **77** | **344** | **61** |

## T5 已完成的第一步審查

T5-001～T5-138 共 138 篇均已針對開場 P、四選項 A～D、八結局 R1～R8 與 AVG 原始頁面建立逐篇審查紀錄，依故事基準 SHA 固定來源。各故事的全文、頁面、選項與對照資訊分批存於以下 **16** 份 `T5/audit-*.json`：

- `T5/audit-001-009.json`
- `T5/audit-010-018.json`
- `T5/audit-019-027.json`
- `T5/audit-028-036.json`
- `T5/audit-037-045.json`
- `T5/audit-046-054.json`
- `T5/audit-055-063.json`
- `T5/audit-064-072.json`
- `T5/audit-073-081.json`
- `T5/audit-082-090.json`
- `T5/audit-091-099.json`
- `T5/audit-100-108.json`
- `T5/audit-109-117.json`
- `T5/audit-118-126.json`
- `T5/audit-127-135.json`
- `T5/audit-136-138.json`

- **Markdown 玩家可見 R 結果與 AVG 合併文字相符**：1,104／1,104。文字一致不代表演出語意無缺陷；AVG 台詞錯置已另列 A 級。
- **無 A／B 問題的完整審查篇數**：61 篇。
- **已定位待修 A／B 問題的篇數**：77 篇。
- **T5 問題總數**：79 項（A 14、B 65、C 0），詳見 `T5/findings.json` 及 `T5/report.md`。
- 第一步留下的 79 個編號均已在第二步修正及驗收；詳見本頁末段與逐項紀錄。


## T6 第一輪全篇故事品質審查（已完成並保存）

- **T6-001～T6-150 150／150 篇**，已建立全部 P、四個教師選項、八結局、AVG 分頁及數值檢查證據，總計開場 452 頁、選項 600、結局 1,200。
- **1,200／1,200** Markdown 結局文字與 AVG 文字合併後一致（忽略空白）；不因此宣稱所有 AVG 演出均無任何其他風險。
- **已定位 A 級 2、B 級 147、C 級 1，總計 150 項**，其中 **110 篇有待修 A／B 問題、40 篇審查後未定位 A／B 問題**。
- A 類：T6-002／R1 清單數量與動作前後不明；T6-135 校園明火風險未在教師四選項先行控制。
- B 類：八 R 標題機械剪裁 47、四選項取捨套版 76、四碼用途套版 20、教師策略重疊 3、R1 額外教師承諾銜接不足 1。
- C 類：T6-052／R4 約 88 字，僅觀察，不依字數視為待修。
- 詳見 `T6/report.md`、`T6/findings.json`、`T6/coverage.json`、`T6/audit-summary.json`、11 份 `T6/screen-*.json` 與 11 份 `T6/hard-*.json`。
- **第五階段第一步 T1～T6 共 648／648 篇已建立正式審查紀錄**；此數字代表已完成找問題，不代表原稿已修好或已取得 S2～S6 的正式核准。原始故事、AVG、四碼、V3、4×8及 main 均未改動。
- 此小節保留第一步的審查範圍與結果。第二步施工結果見下方 [T6 第二步集中修正](#t6-第二步集中修正2026-11-26)。

## T1 第二步集中修正

- **施工狀態**：已完成並驗收。實際修改 104 篇，其中 47 篇更動 AVG 區塊以外的 Markdown，96 篇更新內嵌 AVG。
- **A 級 36 項**：已修正 36 項、未完成 0 項。
- **B 級 79 項**：已修正 79 項、未完成 0 項。
- **C 級 49 項**：已修正 40 項、合理保留 9 項、未完成 0 項。
- **逐項結果**：見 [T1 findings.json](T1/findings.json)。A／B 沿用原編號，C 依原批次觀察順序補上追蹤編號。
- **定向驗證**：104 篇通過原稿格式、AVG 播放編譯與數值比對。逐項確認受影響的 Markdown 與 AVG；原審查證據仍可在第一步批次查閱。
- **既有驗證**：閱讀器匯出及播放測試 649 項全通過。另跑的 166 項回歸測試中 159 項通過、7 項失敗。施工前已有 3 個失敗的測試，涉及 90 字門檻及 T1-151 舊選項文案快照，其中兩個在施工後先遇到逐字比對或遠端演員斷言。新增 4 個失敗的測試，涉及遠端說話者須同框，以及原稿說話者標記與 AVG 台詞逐字相等。這批修正依現行規格改用遠端演出或獨立說話者欄位，並逐項核對受影響的故事事實。

## T1 第二步驗證修補（2026-11-25）

- T1 A 36／B 79 修正及 C 40 修正、9 合理保留，沿用原審查紀錄，不重新審查。
- 已修正測試中遠端電話與訊息說話者必須實體登場的過時假設，及 Markdown 旁白的角色引介移入 AVG `speaker` 後產生的逐字與字數差異。
- T1-082 R1 正文與 AVG 同步補足收束；T1-062 R2 AVG 引介標點與正文一致。
- 原本臨時新增的 `t1-stage5-regression.yml` 自動觸發工作流程在本次提交刪除；Draft PR #130 已關閉、未合併。
- **驗證界線**：前一次 Actions 最後仍有 2 個失敗測試；本次已針對錯誤內容修改，但依使用者指定不再觸發 Actions，因此尚無修正後完整 CI 全綠紀錄。


## T2 第二步集中修正（2026-11-25）

- T2-001～T2-042 共 42 篇，實際修正 13 篇。其中 8 篇同步更動玩家可見結果與 AVG，其餘 5 篇只調整 AVG 表情。
- A 級 2 項全數修正並驗收，未完成 0 項。B 級 5 項全數修正並驗收，未完成 0 項。
- C 級 11 筆中 9 筆已修正、2 筆合理保留、0 筆未完成。T2-021 的兩輪紀錄共用一次修正，T2-038 的 C 級與 B 級紀錄共用 R7 P3 修正。
- A／B 實作與驗收見 [T2 findings.json](T2/findings.json)。C 級逐項理由與原始觀察見 [T2 report.md](T2/report.md#第二步-c-級逐項處理)。
- 42 篇通過 V3 正式稿驗證、閱讀器解析及 AVG 播放編譯，涵蓋 126 個開場頁、1,104 個結果頁。336 個 Markdown 結果與 AVG 合併文字逐字一致，另逐項核對改動的說話者與表情。
- 對照施工基準 `31307c6f2`，42 篇的四碼、角色資格、V3 四狀態、合法底層增減及 4×8 矩陣共 1,344 格均維持原值。
- 本地故事格式、閱讀器匯出、AVG 播放、角色連續性與相關回歸測試共 812 項全數通過。定向驗證未發現這批修正造成的新問題。未執行或觸發 GitHub Actions。

## T3 第二步集中修正（2026-11-25）

- T3-001～T3-090 共 90 篇，實際修改 27 篇。A 級 19 項、B 級 15 項均已修正並驗收，各級未完成 0 項。
- 逐項修正位置、實作、Markdown／AVG 同步範圍及驗證結果已記入 [T3 findings.json](T3/findings.json) 及 [總修正清單](correction-list.md)，沿用原 34 組編號。第一步的報告、覆蓋資料與原始證據均保留。
- 90 篇通過 V3 正式稿驗證、閱讀器解析、AVG 演出編譯及播放投影。確認 270 頁開場、360 個選項、720 個結局及 2,676 個結果頁。720 個結局的 Markdown 與 AVG 合併文字逐字一致。
- 對照施工前 `e013b2013fda58ce8c60d0da72ee25826b68ccac`，故事 ID、日期、觸發條件、選項及客觀行動、八個結果的客觀後果、四碼及角色資格、合法底層增減、精神／熱忱／情緒／掌控四狀態與 2,880 格權重均一致。其他學期原稿未更動。
- 定向單元測試、閱讀器與 AVG 播放合計 813 項全通過。廣域故事回歸 897 項中 894 項通過、3 項失敗，已在施工前基準重現同樣失敗，分別為 T1-041 R8 分頁、13-G HTML 開頭比對及故事控制器科目變數替換。未改動測試，未發現本批修正造成的新回歸。


## T4 第二步集中修正（2026-11-25）

- T4-001～T4-054 共 54 篇，實際修改 33 篇。A 級 4／4、B 級 33／33 均已修正並驗收，各級未完成 0 項。
- T4-025～054 共 30 篇的 120 選項重新編寫短句、已完成的教師行動與取捨。逐篇以正文和客觀後果核對 A～D 對 R1～R8 的全部 960 格語意相容性。原 37 個編號、修正位置、保留的故事事實、選項對應權重及逐列因果說明見 [T4 findings.json](T4/findings.json) 及 [總修正清單](correction-list.md)。
- 定向檢查涵蓋 54 篇正式稿、167 個 P 開場頁、216 個教師選項、432 個結局及 1,241 個 AVG 結果頁。全部通過 V3、閱讀器解析、AVG 編譯／演出投影與結局文字比對。另逐頁核對 T4-001／015／021／039／046／050 的演出或人物修正。
- 對照施工前 `bdeaa5f4515ca329b72eb4293c400bc957194584`，故事 ID、事件窗口、觸發條件、四碼、角色資格、選項情緒標記、八個結果的客觀後果、合法底層增減、精神／熱忱／情緒／掌控及 1,728 格權重均一致。第一步報告與六份原始證據保留。
- 既有故事、閱讀器、AVG 與因果測試 931 項，施工前後均為 930 通過、1 失敗。既有失敗為 `T1-001～072: all 576 results use visible-text-only length audit and valid AVG performance`（`test/story-preview-t1-061-072.test.js:104`），前後均在 `T1-046 R8 needs independent AVG pages` 斷言失敗。未發現新回歸，未執行 Actions。

## T5 第二步集中修正（2026-11-26）

- 以 `0d49982770e1b6ee831e2b9726ecdca609a62dbe` 為施工基準。T5 共 138 篇，修改正式原稿 77 篇。A 級 14／14、B 級 65／65 已修正及驗收，兩級未完成均為 0 項。
- A 級逐頁核對實際發話者、旁白、場景、在場角色和表情。T5-066 P02 保留匿名提問，由旁白引述。T5-037 R8 在首段保留一次刪欄，尾段交代清單只在受邀時使用及停止收集評分。
- T5-079～138 共 480 個結局標題逐一比對各自的正文與客觀後果，確認閱讀器匯出與 AVG 使用相同標題。T5-013、061、072、075 更新八列選項短句、行動及取捨，逐格核對 A～D 和 R1～R8 共 128 格因果相容性。逐篇八標題與逐格理由見 [T5 findings.json](T5/findings.json) 及 [總修正清單](correction-list.md)。
- 138 篇均通過 V3 原稿檢查、閱讀器解析與 AVG 演出編譯。419 個開場頁、552 個選項、1,104 個結局與 3,511 個 AVG 結果頁均完成核對。1,104 個結局的 Markdown 和 AVG 串接文字全數相符（忽略空白）。Chrome 本地端逐頁播放通過，同樣重現基準版的 favicon 與立繪校準檔 404。
- 逐篇對照故事 ID、日期與觸發、NPC 四碼與合法資格、底層增減、精神／熱忱／情緒／掌控和八結局客觀後果。4,416 格原權重逐格一致，第一步報告、覆蓋資料及 16 份原始證據保留。
- 既有故事、閱讀器、AVG 與內容回歸測試，施工前後均為 935 通過、1 失敗。兩次均是 T1-056 R3 的獨立 AVG 分頁既有失敗（`test/story-preview-t1-061-072.test.js:129`）。本次本地建置通過。
- `npm test` 施工前後均為 449 通過、87 失敗，失敗名稱及錯誤訊息一致，包含既有校曆版本、評量時序、存檔契約及生涯身分問題。故事路線回歸兩條通過，T5-049～138 的 90 份既有驗收證據通過結構、角色和權重檢查。本次修正未引入新的測試失敗。

## T6 第二步集中修正（2026-11-26）

- 施工基準為 `092a60266cb6071152315c868a651e6c7e4d9330`。150 篇正式稿中，實際修改有 A／B 問題的 110 篇，其餘 40 篇與基準逐字相同。A 2／2、B 147／147 完成，C 1／1 合理保留。沿用原 150 個 finding ID，保留第一步報告、覆蓋資料與分段原始證據。
- T6-002 R1 把三個原方向一次留在待查清單，後續只補查核欄。T6-135 在 P03 先制止點火、收妥現場打火機並清空紙箱旁走道，再進四選項。T6-044 R1 用原先已成立的私下談話銜接自願分享，保留未公開級分和本人決定分享對象。三篇均核對 Markdown／AVG。
- T6-002～048 的 376 個結局標題逐一對照正文及客觀後果。76 篇 304 個教師選項各自說清能完成的協助和實際代價。T6-109～128 的 80 列四碼用途逐列對照合法持碼者、正式定義及結果。T6-052 R4 約 88 個可見字，保留學生拒絕排名、製表者停止追問的完整收束。
- T6-050、055、072 的 96 格及 T6-135 的 32 格各有語意銜接理由，另核對 T6-002 R1 與 T6-044 R1 各自的四個入口。所有選項的情緒標記一致。逐篇對照故事 ID、配額日、窗口與觸發條件、角色及持碼資格、四碼、合法增減、V3 四狀態及 4,800 格權重。T6-135 R1 的安全行動移到共同開場，保留無火替代與學生協商的結果。
- 4,800 格權重依故事 ID、A～D、R1～R8 排列，緊湊 JSON 的施工前後 SHA-256 均為 `d7827e2405b9ae3bfd5b4e97c4e91b4cda1a655b28f69d44646436c2e8c82438`。
- 150 篇通過 V3 正式稿驗證、閱讀器解析及 AVG 編譯，涵蓋 452 頁開場、600 個選項、1,200 個結果與 3,479 頁 AVG 結果頁。1,200 個結果的 Markdown 和 AVG 合併文字一致（忽略空白）。演出資料依頁比對說話者、呈現方式、在場演員、表情及遠端演出，並核對閱讀器與演出的標題來源。
- 逐項修改、標題前後對照、四欄取捨、四碼用途及個別權重理由見 [T6 findings.json](T6/findings.json) 與 [總修正清單](correction-list.md)。

## 六學期第二步結案核對

| 學期 | 正式稿 | 已修正及驗收 A | 已修正及驗收 B | C 已修正 | C 合理保留 |
|---|---:|---:|---:|---:|---:|
| T1 | 174 | 36 | 79 | 40 | 9 |
| T2 | 42 | 2 | 5 | 9 | 2 |
| T3 | 90 | 19 | 15 | 0 | 0 |
| T4 | 54 | 4 | 33 | 0 | 0 |
| T5 | 138 | 14 | 65 | 0 | 0 |
| T6 | 150 | 2 | 147 | 0 | 1 |
| **合計** | **648** | **77** | **344** | **49** | **12** |

- 六學期 648 篇均可解析為四個選項及八個結果，故事 ID 唯一。結案狀態以各學期的正式 findings 為準，T2 的 11 筆 C 級取自該學期報告。A／B 修正及驗收結論 421 筆、C 級處理結論 61 筆。
- 本次檔案差異只有上述 110 篇 T6 正式稿和 3 個審查紀錄檔。指定分支上的前五學期施工與第一步證據沿原歷史保留。

### T6 本地驗證與既存失敗

- 廣域故事格式、閱讀器、AVG、角色連續性及因果相關測試合計 865 項，施工前後均為 864 通過、1 失敗。兩次失敗皆為 `T1-001～072: all 576 results use visible-text-only length audit and valid AVG performance`，在 `test/story-preview-t1-061-072.test.js:145` 的可見字長最小值檢查回報 111 項。施工前已修正的 T1-056 R3 分頁並非本次出現的斷言。
- 故事路線測試 2 條通過，本地建置通過。Chromium 逐篇播放施工前後各 150 篇，均完成 452 頁開場、600 個選項顯示及 3,479 頁結果。兩次皆出現本地預覽的 favicon 和立繪校準檔 404，仍能完成播放。
- `npm test` 施工前後各 536 項，均為 449 通過、87 失敗，沒有新增或消失的失敗。下列逐項保留測試名稱、定位與前後相同的回報原因。

- H2 roster production: release after a departure and later arrival replays by exact prefix through save roundtrip（test/academic-roster.test.js:32:1） — CALENDAR_VERSION: CALENDAR_VERSION: Unsupported three-year calendar version
- academics: production term, four assessments, queries consume no RNG and save roundtrip（test/academics.test.js:23:1） — INVALID: ACADEMICS: assessment must run after the last exam session on its actual final day
- academics: makeup eligibility and failure path are real recorded operations（test/academics.test.js:25:1） — INVALID: ACADEMICS: assessment must run after the last exam session on its actual final day
- campus: legal early choice completes outcome/N6 and advances exactly once（test/academics.test.js:26:1） — SNAPSHOT: Formal retry snapshots belong only to initial summer opening or a subsequent actual autumn opening
- academics: publishing a real transcript grants only teacher/student knowledge and restores identically（test/academics.test.js:53:1） — INVALID: ACADEMICS: assessment must run after the last exam session on its actual final day
- academics: real school transfer keeps a same-grade pupil in the actual ranking population（test/academics.test.js:64:1） — Expected values to be strictly equal: 0 !== 400
- academics: confirmed 07 story drives persistent learning through the 06 selected event（test/academics.test.js:71:1） — Untouched veteran sources changed
- A1 compatibility: pinned S2 one-semester v1 payload restores byte-exact and retry retains its policy（test/academics.test.js:152:1） — INVALID: ACADEMICS: assessment must run after the last exam session on its actual final day
- A1 normal end-slot: academic support is journaled automatically; final-day makeup remains pending（test/academics.test.js:163:1） — INVALID: ACADEMICS: assessment must run after the last exam session on its actual final day
- H4 one weekly operation traverses original slots and emits one summary, with replay and retry（test/aftercare.test.js:41:1） — Expected values to be strictly equal: 0 !== 6
- H4 final partial week stops at June boundary without settling or entering July（test/aftercare.test.js:49:1） — Expected values to be strictly equal: + actual - expected + 'vacation-day' - 'private'
- H4 real May review feeds graduation without recalculating qualifications or admissions（test/aftercare.test.js:69:1） — INVALID: CAMPUS: choose a legal free action; real todos use their story continuation
- H4 weekly CAS failure rolls back; retry, stale peer, export/import and resume preserve receipts（test/aftercare.test.js:98:1） — The input did not match the regular expression /quota/. Input: "TypeError: Cannot read properties of null (reading 'extensions')" runtime (file:///workspace/work/teacher-hell-t6/src/runtime/retry-checkpoint.js:6:20) retrySemester (file:///workspac…
- H4 actual pre-H4 saves preserve old history and adopt explicitly from their current cursor（test/aftercare.test.js:107:1） — VERSION: Unsupported save format/version
- H4 legacy unadmitted classroom reservations retire additively without replaying a class event（test/aftercare.test.js:119:1） — VERSION: Unsupported save format/version
- H4 ceremony reads genuine published offers while June allocations and later results stay absent（test/aftercare.test.js:130:1） — Expected values to be strictly equal: + actual - expected + '2029-06-12' - '2029-06-11' ^
- annual: real summer opening, twelve baseline values, strict versions and early settlement rejection（test/annual.test.js:27:1） — Expected values to be strictly equal: 4 !== 6
- annual: sparse-event academic development uses actual marks, credits and attendance without forcing success（test/annual.test.js:76:1） — INVALID: ACADEMICS: assessment must run after the last exam session on its actual final day
- annual: import cannot erase retired attempts by stripping both derived lineage fields（test/annual.test.js:91:1） — The input did not match the regular expression /lineage is missing/. Input: 'WorldError: VERSION: Unsupported save format/version' name: 'WorldError' ensure (file:///workspace/work/teacher-hell-t6/src/runtime/model.js:32:74) checkedSave (file:///w…
- annual: future years and cohorts cannot be injected before a completed legal year（test/annual.test.js:113:1） — INVALID: Expected a finite number
- annual: placement is a ready school decision with genuine objection choices and no first-cohort redraw（test/annual.test.js:122:1） — INVALID: Expected a finite number
- crisis fixed weights, exact bands, parallel single thresholds and external reputation semantics（test/assessment.test.js:28:1） — Expected a finite number
- world crisis resolves formal reputation, ignores tenure directly, and returns candidate parameters once（test/assessment.test.js:50:1） — Expected a finite number
- N4 evolution and N6 confirmed impacts/recovery rederive risk without mutating receipts（test/assessment.test.js:66:1） — Expected a finite number
- annual evidence number is normalized, responsibility matters, and reused prestige is not another score（test/assessment.test.js:122:1） — Invalid player object shape
- 100,000 seeded state vectors are monotone, bounded, repeatable and preserve independent threshold signals（test/assessment.test.js:149:1） — Expected a finite number
- constant scores preserve exact thresholds under unequal weights; ordinary volume cannot erase major failure（test/assessment.test.js:191:1） — Expected a finite number
- adjacent representable thresholds and 200,000 integer vectors agree with exact integer arithmetic（test/assessment.test.js:207:1） — Expected a finite number
- npc: both story choices generate distinct known claims and persistent reactions without new admissions（test/autonomy.test.js:11:1） — The expression evaluated to a falsy value: assert.ok(report.candidateCount>0)
- npc: missing contact path cannot transmit and protected activities do no background work（test/autonomy.test.js:34:1） — Expected values to be strictly deep-equal: + actual - expected + [ +   { +     actorId: 'world:school:cohort:1:student:0', +     claimId: 'claim:["fact:[\\"event:[\\\\\\"npc-peer\\\\\\",\\\\\\"1\\\\\\"]\\",\\"conflict\\"]"]', +     kind: 'reaction…
- npc: retained pre-opening social history audits its recorded attempt after a new attempt is initialized（test/autonomy.test.js:86:1） — SNAPSHOT: Initial opening snapshot precedes the first world action
- calendar-integration T1: all difficulties create play year one with no veteran awards, histories or relations（test/calendar-integration.test.js:23:1） — MODE: Only current three-year career identity is supported
- calendar-integration T1: year two/three tenure derives from legal autumn opening without synthetic successes（test/calendar-integration.test.js:34:1） — MODE: Only current three-year career identity is supported
- calendar-integration T1: creation dates keep the fixed 2026 opening and timetable/slot checks（test/calendar-integration.test.js:53:1） — MODE: Only current three-year career identity is supported
- calendar-integration T1: forged difficulty, tenure, mode and twentieth play year are rejected（test/calendar-integration.test.js:64:1） — MODE: Only current three-year career identity is supported
- calendar-integration T2: real seeded openings preserve novice contracts, streams, roster and teaching load（test/calendar-integration.test.js:84:1） — MODE: Only current three-year career identity is supported
- 500 holiday trajectories and one 400-NPC transaction retain heterogeneous bounded outcomes（test/changes.test.js:255:1） — The expression evaluated to a falsy value: assert.ok(longGain>shortGain)
- T3 domain transaction: no public half-completion or unsourced normal duty end; ordinary sub-38 protection is unchanged（test/cohort.test.js:108:1） — INVALID: Expected a finite number
- T3 30-year domain transaction probe: common leaves still feed school-year and new forty-person cohort, with duplicate-ID protection（test/cohort.test.js:130:1） — Synthetic baseline cannot move backwards
- three-year only: obsolete 30-year settlement is rejected without changing the world（test/completion.test.js:17:1） — INVALID: Expected a finite number
- evolution T2 contract: runtime passes 20/10/1 tenure once, leaves play year and NPC evolution intact（test/evolution.test.js:222:1） — INVALID: Expected a finite number
- failure: real healthy teacher, notice, cross-day executed unfair replacement, unique known terminal and no success grade（test/failure.test.js:17:1） — MODE: A three-year career identity is required
- failure: ordinary pressure via real choices opens N7 crisis and naturally becomes effective resignation; no injected states（test/failure.test.js:27:1） — MODE: A three-year career identity is required
- failure: thoughts, pending resignation, interim notice and effective pre-execution remedy do not end the year（test/failure.test.js:35:1） — MODE: A three-year career identity is required
- failure: actual support/temporary cover can improve the same threatened world without erasing retained crisis（test/failure.test.js:42:1） — MODE: A three-year career identity is required
- failure: full three retries, reload/export/import, CAS, wrong authorization, rollback and pristine opening isolation（test/failure.test.js:47:1） — MODE: A three-year career identity is required
- failure: legacy annual saves remain compatible, explicit opening-only opt-in and unknown extension versions reject（test/failure.test.js:71:1） — MODE: A three-year career identity is required
- synthetic low/high current baselines never alter the validated new-career archive（test/integration.test.js:101:1） — "Cannot find module '/workspace/work/teacher-hell-t6/simulation/durability.js' imported from /workspace/work/teacher-hell-t6/test/integration.test.js"
- exact extreme class/school inputs survive natural updates, saturated impacts and latest crisis calculation（test/integration.test.js:111:1） — Expected a finite number
- 14-D: closed academic semester remains computed but release is deferred in notebook（test/notebook-academics.test.js:24:1） — INVALID: ACADEMICS: assessment must run after the last exam session on its actual final day
- 14-D: score publication begins the next calendar day for all three exam rounds（test/notebook-academics.test.js:51:1） — Expected values to be strictly equal: false !== true
- 14-D: term close on final day keeps third exam, term mark and credits undisclosed（test/notebook-academics.test.js:64:1） — INVALID: ACADEMICS: assessment must run after the last exam session on its actual final day
- H5 legacy H1 transcript does not invent a policy before formal adoption（test/notebook-academics.test.js:83:1） — VERSION: Unsupported save format/version
- 14-E: initial notebook contains no fabricated semester, year or ending（test/notebook-reviews.test.js:15:1） — MODE: A three-year career identity is required
- 14-E: last semester day creates pending formal report without academic grades（test/notebook-reviews.test.js:23:1） — MODE: A three-year career identity is required
- 14-E: real pending-review acknowledgment is timeless, persisted and cannot repeat（test/notebook-reviews.test.js:50:1） — MODE: A three-year career identity is required
- all 12 source lists and inverse directions match the formal document exactly（test/player.test.js:23:1） — The expression evaluated to a falsy value: assert.ok(line)
- candidate rerolls, confirmation, reload replay and initial/current separation（test/player.test.js:146:1） — Expected values to be strictly equal: undefined !== 100
- H5 controller emits checked actions and deterministic revision ids without mutating state（test/progression.test.js:23:1） — INVALID: Expected a finite number
- H5 real old June terminal selects the unique annual entry, never another week（test/progression.test.js:34:1） — VERSION: Unsupported save format/version
- H5 narrow academic lifecycle reads and controller contexts cannot mutate their source（test/progression.test.js:55:1） — INVALID: Expected a finite number
- H5 ordered formal controller requests replay identically to individual transactions（test/progression.test.js:61:1） — INVALID: Expected a finite number
- H5 notebook lists semesters chronologically and defaults to senior autumn, with formal academic-year labels（test/progression.test.js:67:1） — "Cannot read properties of undefined (reading 'map')"
- H5 frozen senior summer mock is a legal first-slot transition and future timetable boundary（test/progression.test.js:72:1） — SLOT: Unknown 2028-07-24 grade 3 slot morning
- H5 validation reference indexes release after success and failure without hiding live mutations（test/progression.test.js:80:1） — INVALID: Expected a finite number
- school: ten cohort engineering baselines retain histories, household links and bounded daily work（test/school.test.js:80:1） — Synthetic baseline cannot move backwards
- school: calendar 2026-2065 dates, initial reference migration and operation resends（test/school.test.js:99:1） — RANGE: Outside three-year cohort calendar
- school: official bootstrap supplies real timetable classes and a recoverable opening snapshot（test/school.test.js:106:1） — MODE: A three-year career identity is required
- H2-A: original five terms keep exact policies; senior school marks and individual credits use one contract（test/senior-academics.test.js:36:1） — INVALID: CAMPUS: choose a legal free action; real todos use their story continuation
- H2-A: learner standards, attendance zero, integer credits and 30-year grade-three policy stay intact（test/senior-academics.test.js:44:1） — Expected values to be strictly equal: + actual - expected + 'senior-spring-h2-v1' - 'standard'
- H2-B: May computation is unique, unpublished and provisional; future instruction is never granted（test/senior-academics.test.js:52:1） — INVALID: CAMPUS: choose a legal free action; real todos use their story continuation
- H2-B notebook: no unpublished-score or aggregate leak, one graduation column, no ghost third exam（test/senior-academics.test.js:59:1） — INVALID: CAMPUS: choose a legal free action; real todos use their story continuation
- H2-B: real May slots publish, remedy, accumulate actual hours and review before ceremony（test/senior-academics.test.js:66:1） — INVALID: CAMPUS: choose a legal free action; real todos use their story continuation
- H2-B: graduation and pending results derive from six real term records, not an assigned graduation rate（test/senior-academics.test.js:73:1） — INVALID: CAMPUS: choose a legal free action; real todos use their story continuation
- H2-C: June teacher boundary consumes frozen May results; no second scoring, credits or review（test/senior-academics.test.js:78:1） — INVALID: CAMPUS: choose a legal free action; real todos use their story continuation
- H2-D: actual pre-H2 v2 save replays exactly, old three-exam transcript and original calendar stay frozen（test/senior-academics.test.js:86:1） — VERSION: Unsupported save format/version
- H2-D: H1 unversioned senior log adopts by an appended operation, preserving every old mark and row（test/senior-academics.test.js:90:1） — VERSION: Unsupported save format/version
- H2-D: imports reject changed term policy, calendar, final marks, sources, future completion and review outcomes（test/senior-academics.test.js:97:1） — INVALID: CAMPUS: choose a legal free action; real todos use their story continuation
- H2-D CAS: May close rolls back failed writes, commits once, exports/reloads and rejects stale peers（test/senior-academics.test.js:103:1） — INVALID: CAMPUS: choose a legal free action; real todos use their story continuation
- H2-D CAS: completion evidence and May qualification review publish atomically and deduplicate（test/senior-academics.test.js:107:2） — INVALID: CAMPUS: choose a legal free action; real todos use their story continuation
- H2-B domain unit: late verified attendance zero preserves assessments and cannot award unfinished credits（test/senior-academics.test.js:111:1） — ACADEMICS: publication before computation or duplicate
- three-year v2 save: three slots, export/import, retry opening, no obsolete memorial side effects（test/storage.test.js:12:1） — INVALID: Expected a finite number
- storage T1: all three slots retain mode, difficulty, locked year and tenure through CAS/export/import/reload（test/storage.test.js:164:1） — INVALID: Expected a finite number
- storage T2 integration: actual veteran failure restores source values, contacts, responsibility and clean opening through retry/CAS/import（test/storage.test.js:196:1） — INVALID: Expected a finite number
- T4 A: world projection scales actual teaching to three sources and quality to first two endpoints; prior background and annual grades do not score（test/three-year.test.js:34:1） — Expected values to be strictly equal: + actual - expected + 'rated' - 'synthetic'
- T4 B: genuine three-mode openings preserve tenure and reject early completion without publishing partial data（test/three-year.test.js:57:1） — INVALID: Expected a finite number
- T4 B: confirmed three-year stories retain their actual panel sources across later state changes（test/three-year.test.js:115:1） — INVALID: Expected a finite number

## T1-001～072 短結局字數規格複核（2026-11-26）

- 依唯一正式規範 `docs/story-production-v1/05-故事品質與驗收契約.md`，少於 70 字應優先複核、70～89 字須檢視人物反應及收束；**90 字是一般參考起點，不是強制最低字數**。
- 經 `scripts/story-visible-length.js` 計算，576 個結果中有 **111 個低於 90 字**，已按故事 ID、結局、全文、實際字數及逐筆理由保存在 `reviews/stage5-story-audit/T1/short-result-review-*.json` 四份紀錄；本次 111 筆均判定合理保留，不以重複敘述補字。
- 修正 `test/story-preview-t1-061-072.test.js`：取消舊的 `under90===0` 機械退件，改為逐筆核對短篇清單及文字專屬複核證據。若短篇被新增、刪除、改字、改標題或字數變化，測試均要求重建對應審查紀錄；仍保留 AVG 分頁、合法角色、結局文字一致等既有檢查。
- 未修改任何故事正文、AVG、四碼、V3 或 4×8 權重；本次僅調整與正式規範不一致的字數硬斷言，不改其他回歸測試或流程。
- **驗證邊界**：以 GitHub 原稿與審查證據做定向靜態核對，未在本輪執行完整本地 Node 測試或 GitHub Actions。短篇字數複核不取代第五階段原有 A／B 審查結論，也不保證 648 篇沒有未發現問題。
