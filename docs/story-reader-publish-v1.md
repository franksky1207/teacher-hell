# 故事閱讀器發布

[公開預覽](https://franksky1207.github.io/teacher-hell/stories/)預設從 `content/events-production-v1` 取材。當 T、G、P 目錄下的 Markdown 或閱讀器發布程式有推送，GitHub Actions 讀取來源分支當時最新內容，自動匯出並只替換 `gh-pages/stories/`。Pages 部署需要時間，`stories/release.json` 可核對來源分支、Git commit 與篇數。

日常只需要正常 Git commit 和 push。閱讀器發布時執行匯出及公開索引檢查。工具改動由獨立定向 CI 驗證，故事的機械與 GPT 驗收依[05](./story-production-v1/05-故事品質與驗收契約.md)獨立進行。

未來整合到 `main` 後，把 GitHub Actions repository variable `STORY_READER_SOURCE_BRANCH` 設成 `main`。工作流程已監聽兩個分支；來源修改後推送到新來源或手動啟動一次發布即可。其餘 Pages 路徑由原工作流程維護。
