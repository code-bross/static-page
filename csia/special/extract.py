"""Regenerate web assets: uv run --with pymupdf python csia/special/extract.py"""

import json
from pathlib import Path

import pymupdf


ROOT = Path(__file__).resolve().parent
IDS = ["lecture-1", "lecture-2", "lecture-3-4", "lecture-5",
       "lecture-6", "lecture-7", "lecture-8"]


def main():
    sources = sorted((ROOT / "pdf").glob("*.pdf"))
    if len(sources) != len(IDS):
        raise ValueError("Expected seven lecture PDFs")
    lectures = []
    for lecture_id, source in zip(IDS, sources):
        with pymupdf.open(source) as document:
            # The repeated rotated logo is a separate image, not the teaching diagrams.
            watermarks = {
                image[0]
                for page in document
                for image in page.get_images()
                if image[2:4] == (595, 222)
            }
            for xref in watermarks:
                document[0].delete_image(xref)
            directory = ROOT / "images" / lecture_id
            directory.mkdir(parents=True, exist_ok=True)
            pages = []
            omitted = []
            for index, page in enumerate(document):
                # These five files start with the same outlined-text usage notice.
                if index == 0 and lecture_id not in ("lecture-1", "lecture-2"):
                    omitted.append(index + 1)
                    (directory / "page-001.jpg").unlink(missing_ok=True)
                    continue
                for block in page.get_text("dict")["blocks"]:
                    for line in block.get("lines", []):
                        for span in line["spans"]:
                            if "토마토패스" in span["text"] or "tomatopass" in span["text"]:
                                page.add_redact_annot(span["bbox"], fill=(1, 1, 1))
                # Keep intersecting charts and line art intact; remove only branding text.
                page.apply_redactions(images=0, graphics=0)
                text = page.get_text().strip()
                image_path = directory / f"page-{index + 1:03}.jpg"
                pixmap = page.get_pixmap(matrix=pymupdf.Matrix(2, 2), alpha=False)
                pixmap.save(image_path, jpg_quality=88)
                pages.append({
                    "number": index + 1,
                    "image": image_path.relative_to(ROOT).as_posix(),
                    "width": pixmap.width,
                    "height": pixmap.height,
                    "text": text,
                })
            lectures.append({
                "id": lecture_id,
                "pdf": source.relative_to(ROOT).as_posix(),
                "totalPages": len(document),
                "omittedPages": omitted,
                "pages": pages,
            })
            print(f"{source.name}: {len(pages)} learning pages")
    (ROOT / "pages.js").write_text(
        "window.SPECIAL_PAGES = " + json.dumps(lectures, ensure_ascii=False) + ";\n",
        encoding="utf-8",
    )


if __name__ == "__main__":
    main()
