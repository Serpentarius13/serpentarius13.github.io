#!/usr/bin/env python3
"""Parse Obsidian kanban todos from markdown and regenerate contents.html."""

import html
import json
import re
import sys
from pathlib import Path
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parent
LINKS_JSON = ROOT / "links.json"
CONTENTS_HTML = ROOT / "index.html"

SOURCE_SECTIONS = ("todo", "started", "backlog", )
HEADER_RE = re.compile(r"^## (\w+)\s*$")
TODO_RE = re.compile(r"^- \[ \] (https?://\S+)(?:\s+(.*))?$")


def parse_md(text: str) -> dict[str, list[dict[str, str]]]:
    found: dict[str, list[dict[str, str]]] = {name: [] for name in SOURCE_SECTIONS}
    current: str | None = None

    for line in text.splitlines():
        header = HEADER_RE.match(line.strip())
        if header:
            name = header.group(1).lower()
            current = name if name in SOURCE_SECTIONS else None
            continue
        if not current:
            continue
        match = TODO_RE.match(line.strip())
        if not match:
            continue
        url, label = match.group(1), (match.group(2) or "").strip() or match.group(1)
        found[current].append({"url": url, "text": label})

    return found


def load_links() -> dict:
    if LINKS_JSON.exists():
        return json.loads(LINKS_JSON.read_text(encoding="utf-8"))
    return {
        "sections": [
            {"id": name, "title": name.capitalize(), "links": []}
            for name in SOURCE_SECTIONS
        ]
    }


def merge_links(data: dict, parsed: dict[str, list[dict[str, str]]]) -> int:
    by_id = {section["id"]: section for section in data["sections"]}
    for name in SOURCE_SECTIONS:
        by_id.setdefault(name, {"id": name, "title": name.capitalize(), "links": []})

    existing = {
        (link["url"], link["text"])
        for section in data["sections"]
        for link in section["links"]
    }
    changes = 0

    for name in SOURCE_SECTIONS:
        for link in parsed[name]:
            key = (link["url"], link["text"])
            if key in existing:
                continue
            by_id[name]["links"].append({"url": link["url"], "text": link["text"]})
            existing.add(key)
            changes += 1

    data["sections"] = [by_id[name] for name in SOURCE_SECTIONS if name in by_id]
    return changes


def shorten_url(url: str, max_len: int = 44) -> str:
    parsed = urlparse(url)
    host = parsed.netloc.removeprefix("www.")
    display = host + parsed.path
    if parsed.query:
        display += "?" + parsed.query
    if len(display) <= max_len:
        return display
    return display[: max_len - 1] + "…"


def render_html(data: dict) -> str:
    sections_html = []
    for section in data["sections"]:
        if not section["links"]:
            continue
        items = "\n".join(
            f'      <li>'
            f'<a href="{html.escape(link["url"])}">{html.escape(shorten_url(link["url"]))}</a>'
            f' <span class="label">{html.escape(link["text"])}</span>'
            f"</li>"
            for link in section["links"]
        )
        sections_html.append(
            f'  <section id="{html.escape(section["id"])}">\n'
            f'    <h2>{html.escape(section["title"])}</h2>\n'
            f"    <ul>\n{items}\n    </ul>\n"
            f"  </section>"
        )

    body = "\n\n".join(sections_html) if sections_html else "  <p>No articles yet.</p>"

    return f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Articles to Read</title>
  <style>
    * {{ box-sizing: border-box; }}
    body {{
      font-family: system-ui, -apple-system, sans-serif;
      max-width: 42rem;
      margin: 0;
      padding: 2.5rem 1.75rem 3rem;
      line-height: 1.6;
      color: #1a1a1a;
      background: #fafafa;
      text-align: left;
    }}
    h1 {{
      margin: 0 0 2rem;
      font-size: 1.75rem;
      font-weight: 600;
      letter-spacing: -0.02em;
    }}
    section {{
      margin-bottom: 2.25rem;
    }}
    h2 {{
      margin: 0 0 0.75rem;
      font-size: 1.1rem;
      font-weight: 600;
      color: #444;
      text-transform: capitalize;
    }}
    ul {{
      margin: 0;
      padding: 0 0 0 1.4rem;
      list-style-type: disc;
    }}
    li {{
      margin: 0.55rem 0;
      padding-left: 0.25rem;
    }}
    li::marker {{
      color: #6366f1;
      font-size: 1.1em;
    }}
    a {{
      color: #4338ca;
      text-decoration: none;
      border-bottom: 1px solid transparent;
      transition: border-color 0.15s;
      font-family: ui-monospace, monospace;
      font-size: 0.9em;
    }}
    a:hover {{
      border-bottom-color: #4338ca;
    }}
    .label {{
      color: #333;
    }}
  </style>
</head>
<body>
  <h1>Articles to Read</h1>

{body}
</body>
</html>
"""


def main() -> int:
    source = Path(sys.argv[1] if len(sys.argv) > 1 else "/home/shared/archlinuxenjoyer/articles to read.md")
    if not source.is_file():
        print(f"error: source not found: {source}", file=sys.stderr)
        return 1

    parsed = parse_md(source.read_text(encoding="utf-8"))
    data = load_links()
    changes = merge_links(data, parsed)

    LINKS_JSON.write_text(json.dumps(data, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    CONTENTS_HTML.write_text(render_html(data), encoding="utf-8")

    total = sum(len(section["links"]) for section in data["sections"])
    print(f"updated {changes} link(s), {total} total")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
