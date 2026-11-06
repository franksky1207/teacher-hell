# 開發預覽部署

預覽使用 `development` IndexedDB 命名空間，與 `player` 分開；網址是公開可讀的開發預覽，不應放秘密或玩家資料。正式遊戲尚未發布。

從整合分支手動執行 `npm ci --ignore-scripts`，再執行 `npm run deploy:preview`。指令建立必要產物，取回 `gh-pages`，只替換其 `preview/` 並保留根目錄其他檔案，使用普通 push 防止覆蓋並行更新。GitHub Pages 從 `gh-pages` 根目錄發布，故固定網址為 `https://franksky1207.github.io/teacher-hell/preview/`。每次一般程式 push 不會部署；部署不執行自然三年或 30 年模擬。指令需對儲存庫有 push 權限，並要求本機 git 已設定提交者身分。

若 Pages 尚未啟用，儲存庫擁有者在 GitHub 的 Settings → Pages → Build and deployment 選擇 Deploy from a branch、`gh-pages`、`/(root)`，按 Save。發布後應等 Pages 建置完成，再開啟上述網址並確認載入、資源及重整；Actions 成功本身不代表網址已可用。
