# 故事量產 V1 第13批整合白名單

> 歷史紀錄。當時的路徑與操作保留供追溯，現行流程見[故事製作目錄](https://github.com/franksky1207/teacher-hell/tree/content/events-production-v1/content/events-v1)。

- 主＝`main`，`5293a9f2b6bfec8a4774630d78baa97a9fffae8c`。
- 暫＝`docs/teacher-centered-stats-20261117`，`a850d7009dece4d019fbf3b7fc8ff02b7b5b7be8`，相對 main 有225個提交及35個差異檔。
- 本批＝基於主分支新寫的整合說明或局部編輯。第13批分支 `integration/story-production-v1` 以主分支 SHA 為直接父提交的基準。

| 相對路徑 | 處置 | 來源 | 原因與依賴 | 驗收與風險 |
|---|---|---|---|---|
| `.github/workflows/story-production-ledger-focused.yml` | D 排除 | 暫 | 推送只接受舊暫存分支且路徑只涵蓋工作流程本身。原工作使用兩份已納入測試及 .nvmrc。 | Node 24.19.0 相容。第14批調整觸發，核對既有 Foundation checks。 |
| `data/story-production-ledger.json` | A 新增 | 暫 | 唯一正式帳本，供管理 CLI 使用。 | 與來源一致，schemaVersion 1、revision 0、candidates {}、history []。 |
| `docs/01-世界角色與記憶.md` | C main保留 | 主 | 保留既有世界與角色契約。V1故事持碼依新版01。 | 既有內容逐位元組保留。 |
| `docs/02-隱藏數值與事件引擎.md` | C main保留 | 主 | 保留既有引擎與數值解說。新版01引用其0.01內部精度與整數顯示段。 | 新版持碼與舊引擎字典有差異，接線前須對帳。 |
| `docs/03-劇情與事件呈現.md` | C main保留 | 主 | 保留現行劇情呈現。五區塊製作與驗收依新版03～05。 | 檔案維持現行版本。 |
| `docs/05-未定案與工作方式.md` | C main保留 | 主 | 原工程協作與未定案事項保留。V1製作狀態依新版00。 | 檔案維持現行版本。 |
| `docs/06-介面與美術規劃.md` | C main保留 | 主 | 原介面與美術規劃保留，離線工具無UI依賴。 | 檔案維持現行版本。 |
| `docs/07-課表與校曆規劃.md` | C main保留 | 主 | 保留正式校曆規劃。新版02搭配 src/calendar 與T20引用。 | 校曆檔與暫存分支工具依賴版本一致。 |
| `docs/17D-事件內容量產SOP.md` | B 修改 | 主＋第14批 | 舊17D原開頭自稱現行權威，前置一段轉接至00及03～06。新版02沿用第13批移入的P四狀態契約。 | 舊正文完整保留。 |
| `docs/17D-正式故事稿Markdown範本.md` | D 排除 | 暫 | 五區塊及檢查器欄位已由新版04承接。 | 保留欄位鍵及區塊標題。 |
| `docs/17D-量產登記與去重工具操作.md` | D 排除 | 暫 | 新版06已收錄帳本命令、狀態轉移、版本、SHA和審查。 | 新版03直接引用06。 |
| `docs/18A-事件量產工具使用規範.md` | C main保留 | 主 | 舊內容稽核用途獨立，繼續搭配 content:audit。 | 保留既有工具與用法。 |
| `docs/18B-事件數值與量產成本精簡討論紀錄-20261116.md` | C main保留 | 主 | 原成本與數值討論保留。暫存版補充屬歷史資料。 | V1工具無依賴。 |
| `docs/18C-導師中心關係與35類人物數值重配討論紀錄-20261117.md` | D 排除 | 暫 | B、C、D-1已核對，新版01足以判定各類持碼及9-1例外。 | H-2初值、J-1權重留在固定SHA研究。V1完整極性與現行引擎接線仍待對帳。 |
| `docs/18D-教師難度與四狀態多輪模擬比較紀錄-20261117.md` | D 排除 | 暫 | 四狀態與稿件門檻由新版01、05承接。 | 難度、恢復、保底試算留作研究，舊K段落不適用V1。 |
| `docs/PLAN-故事量產V1-15批收斂整合計畫-20261119.md` | D 排除 | 暫 | 新版00用固定SHA保留第08～12批驗收追溯。 | 創作規格依新版00～06。 |
| `docs/T1-T6-時間專屬事件131主題規劃.md` | C main保留 | 主 | 保留既有131主題檔作歷史資料，V1使用T20。 | 未套用暫存分支刪除。 |
| `docs/T1-T6-特定故事20主題與觸發日期.md` | A 新增 | 暫 | T主題、配額日期與播放池的唯一資料來源，供02、CLI、測試讀取。 | 來源逐位元組一致，20主題、26池、119配對、108日。 |
| `docs/story-production-v1/00-總覽與規格狀態.md` | A 新增 | 暫＋本批 | 作者入口與規格狀態，連接01～06、資料與歷史驗收。 | 移除現行入口對暫存計畫的依賴。 |
| `docs/story-production-v1/01-人物數值與四碼資格.md` | A 新增 | 暫＋本批 | 人物四碼、18關係語意、群組持碼、選角資格及候選界線。 | 核對18C B／C／D-1、18D及main精度段。 |
| `docs/story-production-v1/02-事件分類與時間資格.md` | A 新增 | 暫＋本批 | T/G/P/H4日型、窗口、多標籤與P逐篇結算，依T20及既有校曆。 | 補17D F節，校正06窗口錨點。 |
| `docs/story-production-v1/03-故事創作精簡SOP.md` | A 新增 | 暫＋本批 | 十步SOP，依01、02、04、05、06和兩支CLI。 | 校正情緒、六選三、T池ID與配額日操作。 |
| `docs/story-production-v1/04-五區塊故事稿範本.md` | A 新增 | 暫＋本批 | 唯一五區塊稿件範本，供稿件檢查器使用。 | 鍵名、表頭與區塊標題保留，更新填值提示。 |
| `docs/story-production-v1/05-故事品質與驗收契約.md` | A 新增 | 暫＋本批 | 品質與驗收契約，供03、04、06及審查作業引用。 | 校正T窗口與隔離驗收狀態。 |
| `docs/story-production-v1/06-種子與量產管理.md` | A 新增 | 暫＋第14批 | 帳本命令、審查JSON及SHA，依02、05、T20、種子與正式帳本。第14批修正CLI分支稱呼。 | 相對路徑及錨點已核對。 |
| `docs/事件四數值三層平衡種子2400組.md` | B 修改 | 主＋本批 | 只把兩條過時說明換成新版01、02、06指引，保留唯一固定來源。 | 2,400列、ID、四碼及順序均一致。 |
| `package.json` | A 修改 | 主＋暫 | 加四項量產指令，使用兩支CLI及兩份測試。 | 其餘鍵、指令、依賴和鎖檔維持main。 |
| `scripts/check-story-draft.mjs` | A 新增 | 暫 | 稿件CLI，引用 validator、ledger 模組及兩份資料表。 | 語法與模組連結通過，完整測試第14批。 |
| `scripts/manage-story-production.mjs` | A 新增 | 暫 | 帳本CLI，引用兩模組、正式帳本和兩份資料表。 | 語法與模組連結通過，完整測試第14批。 |
| `scripts/story-draft-validator.js` | A 新增 | 暫 | 三階段稿件驗證，引用 ledger 窗口解析。 | 語法與模組連結通過，完整測試第14批。 |
| `scripts/story-production-ledger.js` | A 新增 | 暫 | 離線帳本及窗口核心，引用既有 src/calendar/calendar.js。 | 語法與模組連結通過，完整測試第14批。 |
| `test/fixtures/17d-draft-sample-s0451.md` | A 新增 | 暫 | S0451隔離素材，供兩份測試讀取。 | 來源一致，帳本無候選或正式作品。 |
| `test/story-draft-validator.test.js` | A 新增 | 暫 | 五區塊回歸，依兩模組、S0451和兩份資料表。 | 語法與模組連結通過，完整測試第14批。 |
| `test/story-production-ledger.test.js` | A 新增 | 暫 | 第11～12批隔離閉環回歸，依CLI、兩模組、校曆、S0451和兩份資料表。 | 語法與模組連結通過，完整測試第14批。 |
| `web/assets/zero-tg-day-lines.json` | D 排除 | 暫 | 零T/G日旁白資源，屬未接線的遊戲呈現。 | V1稿件與帳本工具均無引用。 |
| `docs/story-production-v1-integration.md` | A 新增 | 本批 | 工程白名單、靜態驗收與第14批交接。 | 逐一對照35個上游差異及分支完整變更。 |
| `.github/workflows/story-production-v1-focused.yml` | A 新增 | 第14批 | 以 .nvmrc、四個量產工具及兩份測試提供專用 CI。 | 單一唯讀工作、路徑過濾、固定事件SHA、正式帳本差異檢查。 |

## 歷史依賴

- 17D舊範本與操作說明分別由04、06承接。暫存17D與main不同，02移入缺少的逐篇四狀態規格。詳細P子類及優先次序的歷史來源保留可查。 [暫存17D固定版](https://github.com/franksky1207/teacher-hell/blob/a850d7009dece4d019fbf3b7fc8ff02b7b5b7be8/docs/17D-事件內容量產SOP.md)
- 18C B／C／D-1對應01的個人碼、關係碼、持碼群組及例外。H-2初值、J-1六能力與18D各組難度／恢復／保底屬候選研究。 [18C固定版](https://github.com/franksky1207/teacher-hell/blob/a850d7009dece4d019fbf3b7fc8ff02b7b5b7be8/docs/18C-導師中心關係與35類人物數值重配討論紀錄-20261117.md) · [18D固定版](https://github.com/franksky1207/teacher-hell/blob/a850d7009dece4d019fbf3b7fc8ff02b7b5b7be8/docs/18D-教師難度與四狀態多輪模擬比較紀錄-20261117.md)
- E 待決（非第14批阻斷）為新版數值語意與完整選角極性在遊戲引擎的映射。既有引擎與V1部分代碼語意不同，18C B節也只列部分方向，不以舊字典補定。等到選角接線前須裁定並完成對帳。離線驗證器目前只檢查稿件欄位、持碼與方向標記。
- P2的保底40維持候選。P篇數、頻率、新抽篇權重與三年平衡仍待後續定案，均不阻斷第14批離線CI。

## 第13批靜態驗收

- 共19個變更，17新增、2修改、0刪除，逐項比對白名單。4個工具、2份測試、S0451、T20與空帳本均和暫存SHA逐位元組相同。
- Node 24.19.0 靜態剖析及連結通過，含6個入口與其遞迴依賴，共22個模組（含Node內建模組）。73處相對連結可解析，含06指向02的窗口錨點。
- 解析比對2,400組固定種子的ID、四碼與順序。T20解析為20主題、26池、119個主題日期配對及108個不重複日期，保留3個待確認單池與2個公布知情窗口。
- 空帳本與來源相同。package.json在補入指定四項指令後，其餘資料和main一致。校曆、程式執行入口、既有工作流程與部署設定均保留。

## 第14批交接

- 對照main與本分支的PR差異，確認只含白名單。以Node 24.19.0執行兩份定向測試，核對CI觸發分支及工具、資料、測試路徑。
- `package.json`已列入既有 `verify.yml` 的 main PR 路徑，建立PR時會觸發其既有 Foundation checks。定向量產工作流程的觸發調整及驗證留第14批。
- 第13批僅執行靜態驗收，保留既有驗收的172項結果供歷史追溯。 [第12批固定版紀錄](https://github.com/franksky1207/teacher-hell/blob/a850d7009dece4d019fbf3b7fc8ff02b7b5b7be8/docs/PLAN-故事量產V1-15批收斂整合計畫-20261119.md)

## 第14批正式CI與差異驗收

- 基準 `main` 為 `5293a9f2b6bfec8a4774630d78baa97a9fffae8c`。本批從 `6ecdf6be8a32a62ef5b411c1b28de93d41ef7da8` 開始，正式CI驗收提交為 `27bf54f352468fac1291cdedfde9fca818eadf6e`。驗收紀錄另以僅修改本檔的提交留存。
- 最終三點差異為18新增、3修改、0刪除，21檔均在白名單。第14批新增專用workflow，為舊17D加轉接註記，並把06的CLI說明改指本分支。未修改工具、測試、遊戲引擎、介面、校曆、存檔或部署設定。既有 Foundation checks 與舊 content:audit 保留。
- 核對82處相對連結與錨點、2,400個種子的ID／四碼／順序、48碼各200次及兩層配對分布。T20保留20主題、119主題日期配對、108日及26池。正式帳本前後為同一Git blob `08112447768f4927222206a2e3e15bb121ef6c8b`，schemaVersion 1、revision 0、候選及歷史均空，T 0／648、G 0／1752、全庫0／2400。
- **Story production V1 focused checks** 由整合分支push自動觸發。查核日誌中的實際checkout SHA與Node 24.19.0，工作結論為 **success**。執行 `node --test --test-isolation=none test/story-draft-validator.test.js test/story-production-ledger.test.js`，共172項，通過172、失敗0、跳過0、取消0，正式帳本差異檢查通過。 [GitHub Actions run 44541266407](https://github.com/franksky1207/teacher-hell/actions/runs/44541266407)
- 專用流程已設定整合分支push、針對main的PR與手動觸發。本批實驗證push。GitHub要求手動觸發的workflow先存在於預設分支，現階段可從已完成run手動重跑。未建立PR。
- 第15批先核對main與整合分支的最新SHA，確認CI驗收提交至當前分支HEAD僅有本檔紀錄差異，再依授權建立PR並核對PR事件檢查。P2保底、抽篇配置、三年平衡、選角極性映射、遊戲接線與實際故事品質仍屬各自後續工作。
