# 15-B-L1｜student-001 精準局部覆蓋驗證

**這是利用現有六張完整 PNG 自動裁切的局部替換，非新生圖，也不等於任意髮型／服裝的真分層。**
方法：固定身體 PNG 在臉部區域透明挖空，再用同一共用座標疊回 calm＋五表情局部 PNG；透明髮絲也保留原像素。
畫布：1024×1536；共用局部：[372, 208, 680, 449]；精準重建 **6/6**。

| 表情 | 原圖 RGB 差異範圍 | 逐像素重建 | 圖片輸出 |
|---|---|---|---|
| calm | calm 底圖 | PASS | artwork/prototypes/l1-face-layers/student-001-face-calm.png |
| happy | [411, 243, 645, 422] | PASS | artwork/prototypes/l1-face-layers/student-001-face-happy.png |
| surprised | [395, 232, 657, 435] | PASS | artwork/prototypes/l1-face-layers/student-001-face-surprised.png |
| angry | [386, 222, 666, 433] | PASS | artwork/prototypes/l1-face-layers/student-001-face-angry.png |
| sad | [389, 227, 658, 415] | PASS | artwork/prototypes/l1-face-layers/student-001-face-sad.png |
| embarrassed | [392, 231, 652, 432] | PASS | artwork/prototypes/l1-face-layers/student-001-face-embarrassed.png |

精準還原是檔案檢驗，不代表交叉淡化必然比已核准的完整 PNG 更自然；此點留待 L2 目視測試。
L1 不修改正式預覽畫面、人物映射、事件或存檔。
