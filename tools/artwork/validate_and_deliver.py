#!/usr/bin/env python3
"""15-B two-stage artwork validation and handoff. No ZIP, GitHub writes or deployment.

Requires Pillow: python -m pip install Pillow
Example:
 python tools/artwork/validate_and_deliver.py --student 001 --outfit sports-summer --base candidate.png
 python tools/artwork/validate_and_deliver.py --student 001 --outfit sports-summer --base base.png --sheet sheet.png --json face.json
"""
from __future__ import annotations

import argparse
import hashlib
import json
import re
import shutil
import sys
from pathlib import Path

try:
    from PIL import Image
except ImportError:
    sys.exit("缺少 Pillow：請先執行 python -m pip install Pillow")

OUTFITS = (
    "uniform-summer", "uniform-winter", "sports-summer", "sports-winter",
    "casual-summer-01", "casual-summer-02",
    "casual-winter-01", "casual-winter-02",
)
EMOTIONS = ("calm", "happy", "angry", "sad", "surprised", "embarrassed")
REPOSITORY = "https://github.com/franksky1207/teacher-hell"
EXPECTED_CANVAS = (1024, 1536)  # Current student-001 standard; configurable per approved master.


def fail(message: str) -> None:
    raise ValueError(message)


def dimensions(value: str) -> tuple[int, int]:
    match = re.fullmatch(r"([1-9][0-9]*)x([1-9][0-9]*)", value)
    if not match:
        raise argparse.ArgumentTypeError("請使用 WIDTHxHEIGHT，例如 1024x1536")
    return int(match[1]), int(match[2])


def load_png(path: Path) -> Image.Image:
    if not path.is_file():
        fail(f"找不到檔案：{path}")
    with Image.open(path) as opened:
        if opened.format != "PNG" or opened.mode != "RGBA":
            fail(f"{path.name} 必須為真正的 RGBA PNG（目前為 {opened.format}/{opened.mode}）")
        opened.load()
        return opened.copy()


def check_transparency(img: Image.Image, label: str) -> dict:
    alpha = img.getchannel("A")
    lo, hi = alpha.getextrema()
    if lo == 255:
        fail(f"{label} 完全不透明，可能是漸層或假透明背景")
    if hi == 0:
        fail(f"{label} 完全透明，沒有可用的美術內容")
    w, h = img.size
    # Boundary pixels should mostly be transparent for an isolated character.
    sample = list(alpha.crop((0, 0, w, 1)).getdata())
    sample += list(alpha.crop((0, h - 1, w, h)).getdata())
    sample += list(alpha.crop((0, 0, 1, h)).getdata())
    sample += list(alpha.crop((w - 1, 0, w, h)).getdata())
    opaque_edges = sum(a >= 16 for a in sample) / len(sample)
    if opaque_edges > 0.25:
        fail(f"{label} 畫布邊界有過多非透明像素（{opaque_edges:.1%}），疑似背景或裁切")
    return {"alpha_min": lo, "alpha_max": hi, "nontransparent_edge_ratio": round(opaque_edges, 4)}


def integer(value, name, *, minimum=0) -> int:
    if isinstance(value, bool) or not isinstance(value, int) or value < minimum:
        fail(f"JSON {name} 必須為大於等於 {minimum} 的整數")
    return value


def verify_sheet(sheet: Image.Image, info: dict, base: Image.Image, student: str, outfit: str, base_name: str, sheet_name: str, base_bytes: bytes) -> dict:
    if not isinstance(info, dict):
        fail("JSON 必須是物件")
    if info.get("version") != 1:
        fail("JSON version 必須為 1")
    if info.get("studentId") != student or info.get("outfit") != outfit:
        fail("JSON 的 studentId／outfit 與輸入不一致")
    if info.get("base") != base_name or info.get("sheet") != sheet_name:
        fail("JSON base／sheet 檔名不符合正式命名")
    canvas = info.get("canvas", {})
    face = info.get("face", {})
    layout = info.get("sheetLayout", {})
    if not all(isinstance(x, dict) for x in (canvas, face, layout)):
        fail("JSON canvas、face、sheetLayout 必須為物件")
    if (canvas.get("width"), canvas.get("height")) != base.size:
        fail("JSON canvas 尺寸與母圖不符")
    if layout.get("columns") != 3 or layout.get("rows") != 2 or layout.get("order") != list(EMOTIONS):
        fail("JSON 六表情格順序必須為 calm,happy,angry / sad,surprised,embarrassed")
    x = integer(face.get("x"), "face.x")
    y = integer(face.get("y"), "face.y")
    w = integer(face.get("width"), "face.width", minimum=1)
    h = integer(face.get("height"), "face.height", minimum=1)
    if x + w > base.width or y + h > base.height:
        fail("JSON face 範圍超出母圖")
    if sheet.size != (3 * w, 2 * h):
        fail("Sprite Sheet 實際尺寸不等於 face.width×3、face.height×2")
    digest = hashlib.sha256(base_bytes).hexdigest()
    if info.get("baseSha256") != digest:
        fail("JSON baseSha256 與母圖 bytes 不一致")
    if "transitionMs" in info:
        integer(info["transitionMs"], "transitionMs")
    # Validate compositing all six cells, not their artistic quality.
    for index, emotion in enumerate(EMOTIONS):
        sx = (index % 3) * w
        sy = (index // 3) * h
        crop = sheet.crop((sx, sy, sx + w, sy + h))
        if crop.getchannel("A").getextrema()[1] == 0:
            fail(f"{emotion} 貼片完全透明")
        test = base.copy()
        test.alpha_composite(crop, dest=(x, y))
        if test.size != base.size:
            fail(f"{emotion} 合成尺寸異常")
    return {"face": {"x": x, "y": y, "width": w, "height": h},
            "sheet_size": list(sheet.size), "base_sha256": digest,
            "composite_tested": list(EMOTIONS)}


def main() -> int:
    parser = argparse.ArgumentParser(description="15-B 素材檢查及使用者手動上傳前交付；不產 ZIP、不上傳、不部署")
    parser.add_argument("--student", required=True, help="001～040 或 student-001")
    parser.add_argument("--outfit", choices=OUTFITS, required=True)
    parser.add_argument("--base", required=True, type=Path)
    parser.add_argument("--sheet", type=Path)
    parser.add_argument("--json", dest="json_file", type=Path)
    parser.add_argument("--canvas", type=dimensions, default=EXPECTED_CANVAS)
    parser.add_argument("--delivery-dir", type=Path, default=Path("artwork-delivery"))
    args = parser.parse_args()

    value = args.student.removeprefix("student-")
    if not re.fullmatch(r"[0-9]{3}", value) or not 1 <= int(value) <= 40:
        parser.error("--student 必須是 001～040 或 student-001～student-040")
    if bool(args.sheet) != bool(args.json_file):
        parser.error("--sheet 與 --json 必須同時指定")
    student = f"student-{value}"
    folder = f"web/assets/characters/students/{student}"
    base_name = f"{student}-base-{args.outfit}.png"
    sheet_name = f"{student}-face-sheet-{args.outfit}.png"
    json_name = f"{student}-face-sheet-{args.outfit}.json"
    stage = "six_expressions" if args.sheet else "calm_base"
    report = {
        "status": "FAIL", "stage": stage, "student": student, "outfit": args.outfit,
        "github_folder_url": f"{REPOSITORY}/tree/main/{folder}",
        "github_target_folder": folder, "files": [],
        "handoff": {
            "upload_actor": "user",
            "upload_state": "NOT_UPLOADED_BY_THIS_TOOL",
            "preview_state": "NOT_CONNECTED_BY_THIS_TOOL",
            "requires_explicit_preview_request": True,
            "next_step": ("交付母圖 PNG 和 GitHub 資料夾網址；使用者確認母圖後再製作六表情"
                          if stage == "calm_base" else
                          "交付六表情 PNG、定位 JSON 與 GitHub 資料夾網址；使用者自行上傳並另行下達接入預覽站指令"),
        },
        "visual_review": {
            "status": "REVIEW",
            "requirements": [
                "只有單一人物美術；禁止規劃圖、文字、表格、浮水印及拼版",
                "對照核准母圖確認基本臉型、五官、神韻與身形",
                "髮型、馬尾、髮夾、髮飾、姿勢與配件可自由變化",
                "沒有破圖、異常手指、錯誤服裝或不自然裁切",
                "六表情疊回後沒有五官重影、嚴重臉頰陰影及錯位（有圖集時）",
            ],
        },
    }
    try:
        base = load_png(args.base)
        if base.size != args.canvas:
            fail(f"母圖尺寸 {base.size} 不等於預期 {args.canvas}")
        report["base_alpha"] = check_transparency(base, "母圖")
        entries = [(args.base, base_name)] if stage == "calm_base" else []
        if args.sheet:
            sheet = load_png(args.sheet)
            report["sheet_alpha"] = check_transparency(sheet, "Sprite Sheet")
            data = json.loads(args.json_file.read_text(encoding="utf-8"))
            report["sheet_check"] = verify_sheet(
                sheet, data, base, student, args.outfit, base_name,
                sheet_name, args.base.read_bytes()
            )
            entries.extend([(args.sheet, sheet_name), (args.json_file, json_name)])
        # Only deliver files for this stage. Never upload, edit Pages, or mark visual approval.
        # Flat student folder only; reject overwrites.
        target = args.delivery_dir / folder
        if any((target / name).exists() for _, name in entries):
            fail(f"交付資料夾已有同名檔案：{target}；請先人工確認，程式不覆寫")
        target.mkdir(parents=True, exist_ok=True)
        for source, name in entries:
            shutil.copyfile(source, target / name)
            if (target / name).read_bytes() != source.read_bytes():
                fail(f"複製驗證失敗：{name}")
            report["files"].append({"filename": name, "local_path": str(target / name),
                                    "sha256": hashlib.sha256(source.read_bytes()).hexdigest()})
        report["status"] = "REVIEW"  # Technical checks passed; user upload and visual approval are separate.
        report["handoff"]["download_files"] = [item["local_path"] for item in report["files"]]
        report["technical_checks"] = "PASS"
    except (OSError, ValueError, json.JSONDecodeError) as exc:
        report["error"] = str(exc)
    print(json.dumps(report, ensure_ascii=False, indent=2))
    return 0 if report["status"] == "REVIEW" else 1


if __name__ == "__main__":
    raise SystemExit(main())
