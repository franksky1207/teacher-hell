# 第三批：故事閱讀器獨立發布

正式網址：https://franksky1207.github.io/teacher-hell/stories/

來源固定為 `content/events-production-v1` 的正式帳本及 SHA256 相符的 locked 原稿。`revoked` 與未完成稿不匯出。索引與單篇全文分離，不改故事、種子或帳本。

## 固定更新流程

在量產分支推送帳本、正式成品 Markdown、閱讀器、出口／發布腳本或定向測試變更，會觸發 `.github/workflows/story-reader-publish.yml`。一般文件變更不觸發。Actions 永遠 checkout 量產分支最新版本，先執行語法、定向測試及正式匯出，再只替換 gh-pages 的 `stories/`。`stories/release.json` 記錄來源 SHA、帳本 revision 與篇數。

不需要合併 main、部署遊戲或逐篇修改 UI。workflow_dispatch 在非預設分支新增 workflow 時，GitHub 可能尚未提供手動按鈕；正常使用量產分支的 paths-filtered push 即可。

亦可於乾淨的量產分支執行：

```bash
git fetch origin content/events-production-v1:refs/remotes/origin/content/events-production-v1
bash scripts/deploy-story-reader.sh
```

腳本要求 HEAD 等於已 fetch 的量產分支。每次更新以最新 gh-pages 作父提交，只 stage `stories/`，核對其他路徑無差異；普通 push 遇到競爭時，最多五次重新取最新 Pages tree、重建發布提交。不使用強制推送。若舊預覽發布先開始、稍後遭遇新 Pages 提交，其原有腳本會安全拒絕推送，需重新執行該預覽工作。

## 測試中心最小發布

`web/game.js` 六張卡片沿用樣式與原有五個 action；新增 `story-reader` action 導向相對預覽目錄的 `../stories/`，不載入故事資料。

main 僅保存這個檔案的最小差異；本次提交使用 `[skip ci]`，避免既有 web/game.js push 監聽觸發大型預覽重建。既有預覽正式模組及備份 `preview/web/game.js` 只套用相同差異，HTML 僅為 game.js 增加本次入口版本查詢參數。未重建遊戲或複製美術素材；下次正常預覽部署會從 main 保留入口。

## 第二批定向修正

`selectOptions(stories,field,parentFilter)` 的定義移除未使用的多餘 key 參數，修正呼叫與定義錯位導致主題／故事池選單空白。新增涵蓋欄位與父篩選的回歸測試。

既有第一、二批文件為歷史批次記錄；本文件補充其第三批正式接線與發布方式。

## 本次正式驗收紀錄（2026-11-20 UTC）

- 原有 7 項定向測試先通過；修正選單後共 8 項通過。出口、reader、reader-core、game 的 Node 語法檢查及發布腳本 bash 語法通過。
- 帳本 revision 94：locked 30、revoked 1。正式匯出 30 篇；撤銷的 T1-001 不在索引。逐篇匯出測試核對四選項／八結果，另抽查 T1-002、T1-016、T1-031 的客觀後果與完整原稿逐字相等。
- 正式網址 Chromium/CDP：1440×1000 桌面雙欄及 390×844 手機直式單欄、無水平溢出、手機目錄開合、三種下拉選單、標題／ID／摘要搜尋、前後篇、字級、三配色、重載後記住偏好／故事均通過。四選項與八結果預設展開，技術與原稿可展開。重載只取得一篇全文，沒有全庫全文下載。
- 正式 `/preview/` 可開啟；五個既有入口實際開啟成功，第六個「閱讀故事」直接前往正式 `/stories/` 並載入全文，無須存檔。
- Pages 發布前基準 `90ac371`；除 `stories/` 與三個必要預覽檔案（index.html、web/game.js、assets/56e28df9fee6/web/game.js）外，所有既有 blob 都相同，刪除檔案為零。帳本、正式成品與種子沒有修改。
- Actions：獨立閱讀器發布 `44655993971` 成功；UI 定向檢查 `44655994151` 成功；包含閱讀器與入口的 Pages 發布 `44656045803` 成功。先前僅入口的 Pages 執行 `44656008619` 被後續合併內容的 Pages 發布取代而取消，不是程式測試失敗。
- 閱讀器發布來源 `210638e88e9b043402ac2b66d99e5d72b6520efd`，gh-pages 閱讀器提交 `b1ea15286013c2ea96288a7bd28c327580696e0c`。入口來源為量產分支 `270b827`／`e4fb8fa`、main `8f62666`／`980a59b`；Pages 入口提交 `7a54246`／書本圖示補正 `cb30752`。
- 限制：手機為 Chromium 裝置尺寸模擬，未測實體手機或 Safari。現有鎖定稿均屬 T1-1；其他學期／G 以既有純函式測試涵蓋，沒有捏造正式資料。舊預覽發布腳本遇到同時推送會拒絕而不覆蓋，閱讀器發布流程本身會重試。

書本圖示補正的最終 Pages Action `44656270961` 亦部署成功；正式網址回讀確認書本圖示及「閱讀故事」入口已更新。
