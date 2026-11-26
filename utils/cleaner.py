#!/usr/bin/env python3
"""
Repository maintenance & catalog cleaner utility for MateiBt/supernova.github.io.

Performs two tasks:
1. HYG star catalog cleaning (existing behavior): filters hyg_v42.csv down to
   stars with apparent magnitude <= 6.5 and writes hyg_catalog.csv when the
   raw hyg_v42.csv input is present.
2. difficultyMap synchronization: parses all uniqueId entries from
   js/data/rotations_data.js and all problem IDs from practice/*.html (both
   inline HTML problem references and the JS data modules imported via
   js/render_problems.js), verifies every ID is registered in difficultyMap
   inside js/auth.js with its matching difficulty ('easy', 'medium', 'hard',
   or 'theory'), prints any missing or mismatched IDs clearly, and updates
   js/auth.js in place (unless --check is passed).

Usage:
    python3 utils/cleaner.py          # Run HYG cleaner (if present) and sync difficultyMap
    python3 utils/cleaner.py --check  # Dry-run: exit 1 if any IDs are missing or mismatched
"""

from __future__ import annotations

import argparse
import csv
import re
import sys
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
VALID_DIFFICULTIES = {"easy", "medium", "hard", "theory"}

# Existing HYG catalog cleaning parameters
INPUT_FILENAME = "hyg_v42.csv"
OUTPUT_FILENAME = "hyg_catalog.csv"
MAGNITUDE_LIMIT = 6.5


def clean_hyg_catalog() -> None:
    """Filter hyg_v42.csv to magnitude <= 6.5 if the raw catalog exists on disk."""
    candidates = [
        Path(INPUT_FILENAME),
        REPO_ROOT / INPUT_FILENAME,
        REPO_ROOT / "data" / INPUT_FILENAME,
    ]
    input_path = next((p for p in candidates if p.is_file()), None)
    if input_path is None:
        print(f"[HYG Catalog] '{INPUT_FILENAME}' not found; skipping star catalog cleaning.")
        return

    output_path = input_path.parent / OUTPUT_FILENAME
    print(f"[HYG Catalog] Cleaning stellar catalog ({input_path})...")

    with open(input_path, "r", encoding="utf-8") as f_in, \
         open(output_path, "w", newline="", encoding="utf-8") as f_out:
        reader = csv.reader(f_in)
        writer = csv.writer(f_out)

        header = next(reader)
        writer.writerow(header)

        rows_kept = 0
        rows_dropped = 0

        for row in reader:
            if len(row) <= 13:
                continue
            try:
                mag = float(row[13])
                if mag <= MAGNITUDE_LIMIT:
                    writer.writerow(row)
                    rows_kept += 1
                else:
                    rows_dropped += 1
            except ValueError:
                writer.writerow(row)

    print("[HYG Catalog] Cleaning complete!")
    print(f"[HYG Catalog] Kept (<= {MAGNITUDE_LIMIT}): {rows_kept}")
    print(f"[HYG Catalog] Dropped: {rows_dropped}")


def _strip_js_comments_preserving_strings(src: str) -> str:
    """Remove // and /* */ comments outside JS string/template literals."""
    out: list[str] = []
    i, n = 0, len(src)
    while i < n:
        ch = src[i]
        if ch in ('"', "'", "`"):
            quote = ch
            out.append(ch)
            i += 1
            while i < n:
                c = src[i]
                out.append(c)
                if c == "\\" and i + 1 < n:
                    out.append(src[i + 1])
                    i += 2
                    continue
                if c == quote:
                    i += 1
                    break
                i += 1
            continue
        if ch == "/" and i + 1 < n and src[i + 1] == "/":
            nl = src.find("\n", i)
            if nl == -1:
                break
            out.append("\n")
            i = nl + 1
            continue
        if ch == "/" and i + 1 < n and src[i + 1] == "*":
            end = src.find("*/", i + 2)
            if end == -1:
                break
            out.append("\n" * src[i : end + 2].count("\n"))
            i = end + 2
            continue
        out.append(ch)
        i += 1
    return "".join(out)


def parse_js_problem_objects(js_path: Path) -> list[tuple[str, str, str]]:
    """
    Extract (uniqueId, difficultyClass, source_relpath) pairs from a JS data file.
    Scans top-level object literals containing `uniqueId: "..."` and `difficultyClass: "..."`.
    """
    if not js_path.is_file():
        return []
    rel = js_path.relative_to(REPO_ROOT).as_posix()
    text = _strip_js_comments_preserving_strings(js_path.read_text(encoding="utf-8"))

    # Match each object block starting around uniqueId up to the next uniqueId or array end.
    id_matches = list(re.finditer(r"""\buniqueId\s*:\s*["']([^"']+)["']""", text))
    results: list[tuple[str, str, str]] = []

    for idx, m in enumerate(id_matches):
        uid = m.group(1).strip()
        start = max(0, m.start() - 400)
        end = id_matches[idx + 1].start() if idx + 1 < len(id_matches) else len(text)
        # Prefer fields after uniqueId first, then fall back to fields slightly before uniqueId
        forward_slice = text[m.end() : min(end, m.end() + 1200)]
        diff_m = re.search(r"""\bdifficultyClass\s*:\s*["']([^"']+)["']""", forward_slice)
        if not diff_m:
            back_slice = text[start : m.start()]
            diff_m = re.search(r"""\bdifficultyClass\s*:\s*["']([^"']+)["']""", back_slice)
        diff = diff_m.group(1).strip().lower() if diff_m else "easy"
        if diff not in VALID_DIFFICULTIES:
            diff = "easy"
        results.append((uid, diff, rel))

    return results


def parse_practice_html_problems() -> list[tuple[str, str, str]]:
    """
    Parse problem IDs from practice/*.html:
    1. Any inline problem IDs defined directly in practice/*.html
       (uniqueId, data-problem-id, handleProblemSolved('...'), toggleProblemSolved('...')).
    2. All JS data modules loaded by practice/*.html (e.g. ../js/render_problems.js ->
       ./data/usaaao_*.js).
    """
    practice_dir = REPO_ROOT / "practice"
    if not practice_dir.is_dir():
        return []

    found: dict[str, tuple[str, str]] = {}
    imported_js_files: list[Path] = []
    seen_js: set[Path] = set()

    def queue_js(path: Path) -> None:
        resolved = path.resolve()
        if resolved.is_file() and resolved not in seen_js:
            seen_js.add(resolved)
            imported_js_files.append(resolved)

    inline_id_patterns = [
        re.compile(r"""\buniqueId\s*:\s*["']([^"']+)["']"""),
        re.compile(r"""data-problem-id\s*=\s*["']([^"']+)["']"""),
        re.compile(r"""(?:handleProblemSolved|toggleProblemSolved)\s*\(\s*["']([^"'${}]+)["']\s*\)"""),
    ]
    script_src_re = re.compile(r"""<script[^>]+src\s*=\s*["']([^"']+\.js)["']""", re.IGNORECASE)
    es_import_re = re.compile(r"""import\s+[^;]*?from\s+["'](\.[^"']+\.js)["']""")

    for html_file in sorted(practice_dir.glob("*.html")):
        rel = html_file.relative_to(REPO_ROOT).as_posix()
        html = html_file.read_text(encoding="utf-8", errors="replace")

        # 1. Scan inline problem IDs in HTML
        for pat in inline_id_patterns:
            for m in pat.finditer(html):
                pid = m.group(1).strip()
                if not pid or "${" in pid:
                    continue
                window = html[max(0, m.start() - 300) : min(len(html), m.end() + 400)]
                dm = re.search(
                    r"""(?:difficultyClass\s*:\s*["']|diff-)(easy|medium|hard|theory)\b""",
                    window,
                    re.IGNORECASE,
                )
                diff = dm.group(1).lower() if dm else "easy"
                found.setdefault(pid, (diff, rel))

        # 2. Discover local JS modules imported by practice/*.html (excluding auth/mobile_nav)
        for sm in script_src_re.finditer(html):
            src = sm.group(1).strip()
            if src.startswith(("http://", "https://", "//")):
                continue
            js_path = (html_file.parent / src).resolve()
            if js_path.name in {"auth.js", "mobile_nav.js"}:
                continue
            queue_js(js_path)

    # Follow ES6 relative imports from discovered JS files (e.g. render_problems.js -> data/usaaao_*.js)
    idx = 0
    while idx < len(imported_js_files):
        js_path = imported_js_files[idx]
        idx += 1
        js_text = js_path.read_text(encoding="utf-8", errors="replace")
        for im in es_import_re.finditer(js_text):
            queue_js((js_path.parent / im.group(1)).resolve())

        for uid, diff, rel in parse_js_problem_objects(js_path):
            found.setdefault(uid, (diff, rel))
            # Match js/render_problems.js & js/auth.js convention for multi-question IDs
            # (e.g., q17_18_usaaao_2022 -> q17-18_usaaao_2022).
            multi_m = re.match(r"^(q\d+)_(\d+)(_usaaao_\d{4})$", uid)
            if multi_m:
                alias = f"{multi_m.group(1)}-{multi_m.group(2)}{multi_m.group(3)}"
                found.setdefault(alias, (diff, rel))

    return [(uid, diff, rel) for uid, (diff, rel) in found.items()]


def parse_difficulty_map(auth_text: str) -> tuple[dict[str, str], re.Match]:
    """Parse export const difficultyMap = { ... }; from js/auth.js."""
    block_m = re.search(
        r"(export\s+const\s+difficultyMap\s*=\s*\{)(.*?)(\r?\n\};)",
        auth_text,
        re.DOTALL,
    )
    if not block_m:
        raise RuntimeError("Could not locate 'export const difficultyMap = { ... };' in js/auth.js")

    entries: dict[str, str] = {}
    for em in re.finditer(r"""['"]([^'"]+)['"]\s*:\s*['"]([^'"]+)['"]""", block_m.group(2)):
        entries[em.group(1)] = em.group(2)
    return entries, block_m


def _insert_or_update_difficulty_map(
    auth_path: Path,
    missing: list[tuple[str, str, str]],
    mismatched: list[tuple[str, str, str, str]],
) -> None:
    """Update js/auth.js difficultyMap in place, preserving line endings."""
    raw = auth_path.read_bytes()
    eol = "\r\n" if b"\r\n" in raw else "\n"
    text = raw.decode("utf-8")

    _, block_m = parse_difficulty_map(text)
    body = block_m.group(2)

    # 1. Fix any mismatched difficulties in place
    for uid, _old_diff, new_diff, _src in mismatched:
        pat = re.compile(rf"""(['"]{re.escape(uid)}['"]\s*:\s*['"])[^'"]+(['"])""")
        body, count = pat.subn(rf"\g<1>{new_diff}\g<2>", body, count=1)
        if count != 1:
            raise RuntimeError(f"Failed to update mismatched entry {uid!r} in difficultyMap")

    # 2. Insert missing IDs cleanly into matching sections (or at the end of difficultyMap)
    if missing:
        remaining: list[tuple[str, str, str]] = []
        for uid, diff, src in missing:
            # Try inserting multi-question USAAAO 2022/YYYY entries right after their year header section
            year_m = re.search(r"_usaaao_(\d{4})$", uid)
            inserted = False
            if year_m:
                year = year_m.group(1)
                sec_pat = re.compile(
                    rf"(// --- USAAAO {year}[^\r\n]*\r?\n(?:[ \t]*['\"][^'\"]+['\"]\s*:\s*['\"][^'\"]+['\"],?\r?\n)+)"
                )
                sec_m = sec_pat.search(body)
                if sec_m:
                    sec_block = sec_m.group(1)
                    # Ensure last line of section has a trailing comma
                    sec_block = re.sub(r"(['\"])(\r?\n)$", r"\1,\2", sec_block)
                    new_line = f"    '{uid}': '{diff}',{eol}"
                    body = body[: sec_m.start()] + sec_block + new_line + body[sec_m.end() :]
                    inserted = True
            elif uid.startswith("potd_"):
                sec_pat = re.compile(
                    r"(// --- POTD Rotations[^\r\n]*\r?\n(?:[ \t]*['\"][^'\"]+['\"]\s*:\s*['\"][^'\"]+['\"],?\r?\n)+)"
                )
                sec_m = sec_pat.search(body)
                if sec_m:
                    sec_block = re.sub(r"(['\"])(\r?\n)$", r"\1,\2", sec_m.group(1))
                    new_line = f"    '{uid}': '{diff}',{eol}"
                    body = body[: sec_m.start()] + sec_block + new_line + body[sec_m.end() :]
                    inserted = True
            elif uid.startswith(("potw_", "potm_")):
                sec_pat = re.compile(
                    r"(// --- POTW & POTM Rotations[^\r\n]*\r?\n(?:[ \t]*['\"][^'\"]+['\"]\s*:\s*['\"][^'\"]+['\"],?\r?\n)+)"
                )
                sec_m = sec_pat.search(body)
                if sec_m:
                    sec_block = re.sub(r"(['\"])(\r?\n)$", r"\1,\2", sec_m.group(1))
                    new_line = f"    '{uid}': '{diff}',{eol}"
                    body = body[: sec_m.start()] + sec_block + new_line + body[sec_m.end() :]
                    inserted = True

            if not inserted:
                remaining.append((uid, diff, src))

        if remaining:
            # Ensure the final existing entry in difficultyMap has a trailing comma before appending
            body = re.sub(r"(['\"])([ \t]*)$", r"\1,\2", body)
            lines = [f"{eol}{eol}    // --- Auto-Registered Problem IDs ---"]
            for i, (uid, diff, _src) in enumerate(remaining):
                comma = "," if i < len(remaining) - 1 else ""
                lines.append(f"    '{uid}': '{diff}'{comma}")
            body = body + eol.join(lines)

    updated = text[: block_m.start(2)] + body + text[block_m.end(2) :]
    auth_path.write_bytes(updated.encode("utf-8"))


def verify_and_sync_difficulty_map(check_only: bool = False) -> int:
    """
    Verify that every uniqueId in js/data/rotations_data.js and every problem ID
    from practice/*.html (and its imported data modules) is registered in
    difficultyMap inside js/auth.js with the matching difficulty.
    """
    rotations_path = REPO_ROOT / "js" / "data" / "rotations_data.js"
    auth_path = REPO_ROOT / "js" / "auth.js"

    rotation_items = parse_js_problem_objects(rotations_path)
    practice_items = parse_practice_html_problems()

    # Merge preserving insertion order (rotations first, then practice problem bank)
    all_items: list[tuple[str, str, str]] = []
    seen_ids: set[str] = set()
    for uid, diff, src in rotation_items + practice_items:
        if uid not in seen_ids:
            seen_ids.add(uid)
            all_items.append((uid, diff, src))

    auth_text = auth_path.read_text(encoding="utf-8")
    diff_map, _ = parse_difficulty_map(auth_text)

    missing: list[tuple[str, str, str]] = []
    mismatched: list[tuple[str, str, str, str]] = []

    for uid, expected_diff, src in all_items:
        if uid not in diff_map:
            missing.append((uid, expected_diff, src))
        elif diff_map[uid] != expected_diff:
            mismatched.append((uid, diff_map[uid], expected_diff, src))

    print("\n[difficultyMap Sync]")
    print(f"  Rotations IDs parsed (js/data/rotations_data.js): {len(rotation_items)}")
    print(f"  Practice IDs parsed  (practice/*.html & data):    {len(practice_items)}")
    print(f"  Unique problem IDs checked:                       {len(all_items)}")
    print(f"  Registered entries in js/auth.js difficultyMap:   {len(diff_map)}")

    if not missing and not mismatched:
        print("  Status: OK — every rotation and practice problem ID is registered with matching difficulty.")
        return 0

    if missing:
        print(f"\n  Missing from difficultyMap ({len(missing)}):")
        for uid, diff, src in missing:
            print(f"    - '{uid}': '{diff}'  (from {src})")

    if mismatched:
        print(f"\n  Difficulty mismatches in difficultyMap ({len(mismatched)}):")
        for uid, old_diff, new_diff, src in mismatched:
            print(f"    - '{uid}': '{old_diff}' -> '{new_diff}'  (from {src})")

    if check_only:
        print("\n  Check failed (--check mode): js/auth.js was not modified.")
        return 1

    _insert_or_update_difficulty_map(auth_path, missing, mismatched)
    print(f"\n  Updated js/auth.js: added {len(missing)} missing ID(s) and fixed {len(mismatched)} mismatch(es).")
    return 0


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Clean HYG star catalog (when present) and verify/sync difficultyMap in js/auth.js."
    )
    parser.add_argument(
        "--check",
        action="store_true",
        help="Check only without modifying js/auth.js (exits 1 if missing/mismatched IDs are found).",
    )
    args = parser.parse_args()

    clean_hyg_catalog()
    return verify_and_sync_difficulty_map(check_only=args.check)


if __name__ == "__main__":
    raise SystemExit(main())
