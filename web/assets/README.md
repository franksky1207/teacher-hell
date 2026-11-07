# 《教師荒謬地獄》美術與音樂素材目錄（15-B）

本目錄於第15批開發分支先建立資料夾，不代表已完成素材或接線。依 [15-B 正式美術原型規範](../../docs/15-B-正式美術原型規範.md) 製作，正式素材一次一張，不用拼版。

## 使用方式

- `artwork/`（儲存庫根目錄）：**不會**被現有網頁 build 複製；放原始母圖、分層來源與未通過的原型。
- `web/assets/`：**會**被目前 `scripts/project.js` 複製至 `dist/web/assets/`；僅放核准後的正式輸出。現有 Pages 部署會將 `dist/web` 放在帶版本的 `preview/assets/<commit>/web/`，所以正式程式應以相對於自身模組的安全 URL 連結，不得寫死根目錄 `/assets/`。
- `web/assets/characters/students/`：`base/` 身形／臉部原型、`hair/` 髮型、`expressions/` 六表情、`clothing/` 制服／運動服／便服、`accessories/` 眼鏡配件。
- `web/assets/characters/adults/`：非學生共用深色剪影；`graduates/`：成年畢業生剪影。
- `web/assets/backgrounds/desktop/`、`mobile/`：**同場景分別製作**的橫式／直式背景，名稱使用相同 `scene-id`，禁止從橫圖裁切成手機圖。
- `web/assets/audio/bgm/`：後續第15-E批七類授權確認的背景音樂。
- `web/assets/manifests/`：未來建立資產登錄、版本、SHA、原始尺寸、授權及對應表；目前未提供虛假 manifest。

## 命名與核准

- 檔名一律小寫英文字母、數字與連字號；不拿學生姓名當永久 ID。例：`student-base-01.webp`、`student-01-happy.webp`、`classroom-a.webp`。
- 在 `artwork/masters/backgrounds/desktop/` 與 `mobile/` 放相同場景識別的**獨立母圖**；正式輸出依裝置分放 `web/assets/backgrounds/`。
- 第一張人物母圖、男女制服、成人剪影及首組雙背景須由使用者核准；未核准、未通過分層驗收的圖片只留 `artwork/prototypes/`，不能直接搬到 `web/assets/`。
- 將來可依素材增加子資料夾，但優先保持此根架構，勿把每一張新增圖都另建一層資料夾。

## 不用 Codex 時如何上傳

1. ChatGPT 生成**單張**圖片後，使用對話中的圖片儲存／下載功能把原檔儲存到電腦（如需要透明背景，先確認確實含 alpha）。
2. 開啟 GitHub 的 `feat/phase15-art-music-20261107` 分支，在對應資料夾按 **Add file → Upload files**（手機瀏覽器亦可使用網頁上傳）。
3. 選取該圖片、檢查檔案名稱及上傳目標路徑，提交至**開發分支**，不要選到 `main`。
4. 如需提供圖片檔讓 ChatGPT 幫忙檢查或處理，可再上傳至此對話；等正式核准後才放到 `web/assets/`。

注意：GitHub 裡的圖片不會因為存進資料夾就自動出現在遊戲中，後續仍需將正式顯示層接到 manifest 與圖片路徑。未經使用者授權不部署、合併或更改遊戲核心。
