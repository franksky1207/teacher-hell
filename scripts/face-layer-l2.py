#!/usr/bin/env python3
"""15-B-L2 offline, focused comparison checks. Not a browser or visual judgment."""
from html.parser import HTMLParser
import json
from pathlib import Path
import re
import subprocess
import sys
from PIL import Image, ImageChops

ROOT = Path(__file__).resolve().parents[1]
HTML = ROOT / "artwork/prototypes/student-001-layer-compare.html"
L1 = ROOT / "artwork/prototypes/l1-face-layers"
OUT = ROOT / "artwork/prototypes/l2-layer-compare"
CALM = ROOT / "artwork/masters/students/student-001-base.png"
ORIG = ROOT / "artwork/prototypes"
KEYS = ("calm", "happy", "surprised", "angry", "sad", "embarrassed")

class Inspect(HTMLParser):
    def __init__(self):
        super().__init__()
        self.assets = []
        self.buttons = []
        self.scripts = []
        self.inside_script = False
    def handle_starttag(self, tag, attrs):
        d = dict(attrs)
        if tag == "img" and d.get("src"):
            self.assets.append(d["src"])
        if tag == "button" and "data-expression" in d:
            self.buttons.append(d["data-expression"])
        if tag == "script" and "src" not in d:
            self.inside_script = True
    def handle_endtag(self, tag):
        if tag == "script":
            self.inside_script = False
    def handle_data(self, data):
        if self.inside_script:
            self.scripts.append(data)

def compare():
    OUT.mkdir(parents=True, exist_ok=True)
    source = HTML.read_text(encoding="utf8")
    dom = Inspect()
    dom.feed(source)
    errors = []
    if tuple(dom.buttons) != KEYS:
        errors.append("six expression controls missing or out of order")
    if not all((HTML.parent / p).is_file() for p in dom.assets):
        errors.append("A panel image path missing")
    if "l1-face-layers/student-001-face-" not in source:
        errors.append("B patch path missing")
    if "l1-face-layers/student-001-body-face-window.png" not in source:
        errors.append("B body path missing")
    if "prefers-reduced-motion" not in source or "@media(max-width:680px)" not in source:
        errors.append("responsive/reduced-motion CSS absent")
    if "DURATION=180" not in source or "cancelAnimationFrame" not in source:
        errors.append("180ms or interrupted transition handling missing")
    if "new ImageData" not in source or "const av=a[i+3]*q" not in source:
        errors.append("premultiplied-alpha interpolation missing")
    if not dom.scripts:
        errors.append("no inline script")
    else:
        run = subprocess.run(["node", "--check"], input="\n".join(dom.scripts), text=True,
                             capture_output=True, check=False)
        if run.returncode:
            errors.append("JavaScript syntax: " + run.stderr.strip()[:500])

    original_sizes = []
    layers = []
    diff_pixel_counts = {}
    report_l1 = json.loads((L1 / "analysis.json").read_text(encoding="utf8"))
    roi = report_l1.get("common_roi")
    if roi != [372, 208, 680, 449]:
        errors.append("unexpected L1 facial ROI")
    with Image.open(CALM) as file:
        base = file.convert("RGBA")
    with Image.open(L1 / "student-001-body-face-window.png") as file:
        body = file.convert("RGBA")
    if base.size != body.size or base.size != (1024, 1536):
        errors.append("incorrect full-body canvas")
    if roi:
        x0,y0,x1,y1 = roi
        if body.crop((x0,y0,x1,y1)).getbbox() is not None:
            errors.append("body facial window is not fully transparent")
    for key in KEYS:
        full_path = CALM if key == "calm" else ORIG / f"student-001-expression-{key}.png"
        patch_path = L1 / f"student-001-face-{key}.png"
        original_sizes.append(full_path.stat().st_size)
        layers.append(patch_path.stat().st_size)
        with Image.open(full_path) as file:
            expected=file.convert("RGBA")
        with Image.open(patch_path) as file:
            patch=file.convert("RGBA")
        if roi and patch.size != (x1-x0,y1-y0):
            errors.append(f"invalid face patch dimensions: {key}")
        assembled=body.copy()
        assembled.alpha_composite(patch,(roi[0],roi[1]))
        if (ImageChops.difference(assembled.convert("RGB"),expected.convert("RGB")).getbbox() is not None
                or ImageChops.difference(assembled.getchannel("A"),expected.getchannel("A")).getbbox() is not None):
            errors.append(f"lossless reconstruction failed: {key}")
        if key != "calm":
            difference=ImageChops.difference(base.convert("RGB"),expected.convert("RGB"))
            diff_pixel_counts[key]=sum(1 for value in difference.convert("L").getdata() if value>0)

    full_size=sum(original_sizes)
    partial_size=body_path_size=(L1 / "student-001-body-face-window.png").stat().st_size
    partial_size+=sum(layers)
    saved=full_size-partial_size
    result={
        "type":"static offline L2 checks; not browser/device/visual acceptance",
        "status":"PASS" if not errors else "FAIL",
        "expressions_checked":len(KEYS),
        "lossless_reconstruction":not any("reconstruction" in err for err in errors),
        "canvas":[1024,1536],
        "facial_roi":roi,
        "full_png_total_bytes":full_size,
        "body_window_bytes":body_path_size,
        "six_face_patch_bytes":sum(layers),
        "layered_total_bytes":partial_size,
        "total_byte_reduction":saved,
        "reduction_percent":round(100*saved/full_size,2),
        "pixel_change_counts":diff_pixel_counts,
        "errors":errors,
    }
    (OUT / "analysis.json").write_text(json.dumps(result,ensure_ascii=False,indent=2)+"\n",encoding="utf8")
    md=[
        "# 15-B-L2｜完整 PNG（A）與局部臉部（B）精準檢查",
        "",
        "**本次只驗檔案／語法與容量，不假稱已完成手機或桌機目視驗收。**",
        "",
        f"- 自檢：**{result['status']}**；六種表情逐像素還原：{'通過' if result['lossless_reconstruction'] else '未通過'}。",
        f"- 原完整六張 PNG：**{full_size:,} bytes**。",
        f"- 新分層 1 張固定底圖＋6 張臉部圖：**{partial_size:,} bytes**（其中底圖 {body_path_size:,} bytes，臉部合計 {sum(layers):,} bytes）。",
        f"- 以原檔案實際 bytes 比較：**{result['reduction_percent']:.2f}%** 減量；非宣稱瀏覽器快取、解碼耗時或 FPS 改善。",
        f"- 共用臉部矩形：{roi}；同一畫布為 1024×1536。",
        "- 兩方案同步互動頁：[`student-001-layer-compare.html`](../student-001-layer-compare.html)。",
        "- 兩邊約 180 ms：A 保留完整 calm 底圖並以 CSS 淡化完整五種表情；B 的背景不重新繪製，只在同畫布局部區域做 premultiplied-alpha 線性插值，再用 Canvas 更新該區域。",
        "- B 的透明髮絲與五官在靜態端點精準還原；**交叉淡化的中間畫面效果、手機效能、連點觀感尚待 L2／整批部署後真人驗收**。",
        "- 由於尚無其他髮型及服裝部件，不能宣稱那些組合經視覺驗證；正式人物顯示和存檔資料未變。",
        "",
        "## 風險與結論",
        "",
        "- A 是使用者已認可的展示基準，不能因 B 檔案較小就直接替換正式程式。",
        "- B 的局部像素混色在較慢的手機 CPU 上可能比 CSS 原生圖片淡化耗費更多計算；實際效能尚未測量。",
        "- 手機直式、桌機橫式共用同一等比畫布；版面 CSS 已就位，**未執行瀏覽器 UI 驗收**。",
        "- **L2 技術原型與精準自檢完成；正式切換方式暫不改動，視覺優劣留待三批完成後一起比較**。",
        "",
    ]
    (OUT / "REPORT.md").write_text("\n".join(md),encoding="utf8")
    print(json.dumps({"status":result["status"],"reduction_percent":result["reduction_percent"],"errors":errors},ensure_ascii=False))
    return not errors

if __name__ == "__main__":
    sys.exit(0 if compare() else 1)
