"""Legacy importer for image-based CBT data from supplied PDFs.

Requires Poppler (pdftotext/pdftoppm) and Pillow. Some PDF Korean fonts have
no text mapping: page crops, not incomplete extracted text, are authoritative.
Reviewed text editions must not be overwritten by this incomplete text layer.
Validate the current text edition with: node csia/tomato/test.cjs
"""
import io
import json
import re
import subprocess
import sys
import unicodedata
import xml.etree.ElementTree as ET
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent
NS = {"h": "http://www.w3.org/1999/xhtml"}
CIRCLES = "①②③④"
SECTIONS = [
    {"name": "1과목: 증권분석", "end": 15},
    {"name": "2과목: 증권시장", "end": 35},
    {"name": "3과목: 금융상품 및 직무윤리", "end": 65},
    {"name": "4과목: 법규 및 세제", "end": 100},
]


def command(*args):
    return subprocess.check_output(args, stderr=subprocess.DEVNULL)


def read_pdf(path, answer=False):
    root = ET.fromstring(command("pdftotext", "-bbox-layout", str(path), "-"))
    pages = []
    anchors = []
    for page in root.findall(".//h:page", NS):
        words = [
            dict(text=w.text or "", **{k: float(v) for k, v in w.attrib.items()})
            for w in page.findall(".//h:word", NS)
        ]
        pages.append(words)
        for w in sorted(words, key=lambda w: (w["yMin"], w["xMin"])):
            pattern = r"\d{2,3}\.?" if answer else r"\d{1,3}\."
            if not (re.fullmatch(pattern, w["text"]) and
                    84 < w["xMin"] < 97 and 80 < w["yMin"] < 775):
                continue
            number = int(w["text"].rstrip("."))
            if answer:
                choices = [v for v in words if v["text"] in CIRCLES
                           and abs(v["yMin"] - w["yMin"]) < 2
                           and 120 < v["xMin"] < 155]
                if len(choices) != 1:
                    continue
            top = w["yMin"]
            if not answer:
                preceding = [v["yMin"] for v in words
                             if (re.fullmatch(r"[★☆]{3}", v["text"])
                                 and 0 < top - v["yMin"] < 26)
                             or (re.match(r"제[1-4]과목", v["text"])
                                 and 0 < top - v["yMin"] < 85)]
                top = min([top, *preceding])
            anchors.append({
                "id": number, "page": len(pages), "y": top,
                **({"answer": CIRCLES.index(choices[0]["text"]) + 1} if answer else {}),
            })
    assert [a["id"] for a in anchors] == list(range(1, 101)), (path.name, anchors)
    if answer:
        # Independently compare all explanation headings with the answer table.
        words = pages[1]
        table = {}
        for w in words:
            if not (re.fullmatch(r"\d{2,3}", w["text"]) and 150 < w["xMin"] < 480):
                continue
            matches = [v for v in words if v["text"] in CIRCLES
                       and abs(v["xMin"] - w["xMin"]) < 4
                       and 10 < v["yMin"] - w["yMin"] < 15]
            if len(matches) == 1:
                table[int(w["text"])] = CIRCLES.index(matches[0]["text"]) + 1
        assert len(table) == 100, (path.name, len(table))
        for anchor in anchors:
            anchor["tableAnswer"] = table[anchor["id"]]
            if anchor["answer"] != anchor["tableAnswer"]:
                print(f"Source conflict: {path.name}, Q{anchor['id']}: "
                      f"table={anchor['tableAnswer']}, explanation={anchor['answer']}")
    return pages, anchors


def regions(pages, anchors, index):
    start = anchors[index]
    end = anchors[index + 1] if index + 1 < len(anchors) else {
        "page": len(pages), "y": 778
    }
    result = []
    for page in range(start["page"], end["page"] + 1):
        top = start["y"] - 5 if page == start["page"] else 85
        bottom = end["y"] - 6 if page == end["page"] else 778
        if bottom > top:
            result.append({"page": page, "box": [75, top, 525, bottom]})
    return result


def text_in(pages, boxes):
    lines = {}
    for region in boxes:
        x1, y1, x2, y2 = region["box"]
        for w in pages[region["page"] - 1]:
            if x1 <= w["xMin"] < x2 and y1 <= w["yMin"] < y2:
                key = (region["page"], round(w["yMin"]))
                lines.setdefault(key, []).append(w)
    return "\n".join(" ".join(w["text"] for w in sorted(lines[k], key=lambda w: w["xMin"]))
                     for k in sorted(lines))


def render(path, pages, crops, folder, kind, check):
    for page_number in sorted({r["page"] for boxes in crops for r in boxes}):
        if not check:
            image = Image.open(io.BytesIO(command(
                "pdftoppm", "-f", str(page_number), "-l", str(page_number),
                "-r", "144", "-singlefile", str(path)
            )))
            if kind == "question":
                image.save(folder / f"page-{page_number}.webp", quality=88)
        for number, boxes in enumerate(crops, 1):
            for part, region in enumerate(boxes, 1):
                if region["page"] != page_number:
                    continue
                target = folder / f"{kind}-{number}-{part}.webp"
                if check:
                    assert target.is_file(), target
                    with Image.open(target) as crop:
                        assert crop.width == 900 and crop.height > 0
                else:
                    image.crop(tuple(round(v * 2) for v in region["box"])).save(target, quality=90)
        if not check:
            image.close()


def main():
    check = "--check" in sys.argv
    target = ROOT / "data.js"
    if target.exists():
        existing = json.loads(target.read_text().split("=", 1)[1].strip().removesuffix(";"))
        if any(q.get("textReady") for exam in existing.values() for q in exam.get("questions", [])):
            raise SystemExit("Reviewed text edition exists; refusing to overwrite text or cleaned images. "
                             "Validate with: node csia/tomato/test.cjs")
    sources = {}
    for path in ROOT.joinpath("pdfs").glob("*.pdf"):
        name = unicodedata.normalize("NFC", path.name)
        number = int(re.search(r"(\d)회", name)[1])
        sources.setdefault(number, {})["answer" if "정답" in name else "question"] = path
    if not sources:
        raise SystemExit("No supplied PDFs found; existing data and images were not changed.")
    registry = {}
    for number, files in sorted(sources.items()):
        answer_pages, answer_anchors = read_pdf(files["answer"], answer=True)
        entry = {
            "title": f"홀인원 적중모의고사 제{number}회",
            "subtitle": "2025년 11월 대비 · 사용자 제공 원문",
            "sections": SECTIONS,
            "answerPdf": "tomato/pdfs/" + unicodedata.normalize("NFC", files["answer"].name),
            "available": "question" in files,
        }
        if not entry["available"]:
            print(f"Round {number}: no question PDF; omitted from exam list.")
            continue
        registry[f"tomato-2025-11-{number}"] = entry
        question_pages, question_anchors = read_pdf(files["question"])
        entry["questionPdf"] = "tomato/pdfs/" + unicodedata.normalize("NFC", files["question"].name)
        folder = ROOT / "images" / str(number)
        folder.mkdir(parents=True, exist_ok=True)
        q_crops = [regions(question_pages, question_anchors, i) for i in range(100)]
        a_crops = [regions(answer_pages, answer_anchors, i) for i in range(100)]
        questions = []
        for i in range(100):
            text = text_in(question_pages, q_crops[i])
            text = re.sub(r"(?m)^제[1-4]과목[^\n]*\n?", "", text).strip()
            # Keep the full image as the question, including options, diagrams,
            # tables, superscripts and Korean glyphs missing from the text layer.
            mapped = len(re.findall("[가-힣]", text)) > 5
            stars = re.search(r"[★☆]{3}", text)
            option_parts = re.split(r"[①②③④]", text)
            has_options = mapped and re.findall(r"[①②③④]", text) == list(CIRCLES)
            prompt = re.sub(r"^[★☆\s]*\d+\.\s*", "", option_parts[0]).strip()
            questions.append({
                "id": i + 1,
                "category": next(s["name"] for s in SECTIONS if i + 1 <= s["end"]),
                "difficulty": stars[0].count("★") if stars else None,
                "question": prompt if has_options else "원문 문항과 보기를 읽고 답을 선택하세요.",
                "options": [part.strip() for part in option_parts[1:]] if has_options else
                           [f"원문 {c}번 보기 선택" for c in CIRCLES],
                "correctAnswer": answer_anchors[i]["tableAnswer"],
                "answerNote": (
                    f"원문 정답표는 {answer_anchors[i]['tableAnswer']}번, "
                    f"해설 표기는 {answer_anchors[i]['answer']}번으로 서로 다릅니다. "
                    "채점은 제공된 정답표 기준이며 해설 원문을 함께 확인하세요."
                    if answer_anchors[i]["answer"] != answer_anchors[i]["tableAnswer"] else None
                ),
                "explanation": "사용자 제공 정답·해설 원문 (2025년 11월 대비)",
                "sourceText": text if mapped else None,
                "questionImages": [f"tomato/images/{number}/question-{i+1}-{j+1}.webp"
                                   for j in range(len(q_crops[i]))],
                "explanationImages": [f"tomato/images/{number}/answer-{i+1}-{j+1}.webp"
                                      for j in range(len(a_crops[i]))],
                "pageImage": f"tomato/images/{number}/page-{question_anchors[i]['page']}.webp",
                "questionRegions": q_crops[i],
                "explanationRegions": a_crops[i],
            })
        entry["questions"] = questions
        render(files["question"], question_pages, q_crops, folder, "question", check)
        render(files["answer"], answer_pages, a_crops, folder, "answer", check)
        print(f"Round {number}: 100 questions, 400 options, 100 verified answers/explanations.")
    output = "window.TOMATO_EXAMS = " + json.dumps(registry, ensure_ascii=False, indent=2) + ";\n"
    if check:
        assert target.read_text() == output, "Generated data differs; rebuild it."
    else:
        target.write_text(output)


if __name__ == "__main__":
    main()
