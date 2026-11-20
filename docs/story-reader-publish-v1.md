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
