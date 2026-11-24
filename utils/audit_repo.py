#!/usr/bin/env python3
"""
Repository audit & auto-fix script for MateiBt/supernova.github.io.

Checks all HTML and JS files for:
1. Broken relative paths to assets/img/, css/, js/ (including js/auth.js),
   handouts/, practice/, and internal .html redirects (especially ../ prefixes
   inside practice/ and handouts/).
2. Leftover legacy styling (#050b14 backgrounds, sharp 2px borders, Unsplash URLs,
   Bootstrap/Tailwind, inline Firebase config, defunct polyfill.io) and mismatched
   or undefined handout CSS classes (.quiz-zone, .resources-zone, .comments-zone).
3. Syllabus labeling mismatches across problems.html, handouts/, practice/, and
   js/data/usaaao_*.js (including static HTML titles/eyebrows/headings and checking
   for legacy labels like "Chapter 6: Cosmology & Galaxies").
4. Unclosed, nested, or mismatched MathJax delimiters ($, $$, \\(...\\), \\[...\\])
   inside problem sets, handouts, MathJax-enabled HTML pages, and JS data files.

Usage:
    python3 utils/audit_repo.py          # Audit only (JSON report to stdout, summary to stderr)
    python3 utils/audit_repo.py --fix    # Apply deterministic fixes, then re-run audit
"""

from __future__ import annotations

import argparse
import json
import os
import re
import sys
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent

# Canonical 16-module syllabus metadata:
# stem -> (code, track_accent, handout_eyebrow, handout_title, practice_eyebrow, practice_title, practice_desc, logo_from_subfolder)
CANONICAL_MODULES: dict[str, dict[str, str]] = {
    "positional_celestial_mechanics": {
        "code": "T1",
        "accent": "#B39CD0",
        "handout_eyebrow": "Theory Track · Module 01 · Theoretical Handout",
        "handout_title": "1. Positional Astronomy & Celestial Mechanics",
        "practice_eyebrow": "Theory Track · Module 01",
        "practice_title": "Positional Astronomy & Celestial Mechanics",
        "practice_desc": "The Celestial Sphere, spherical trigonometry, and Keplerian orbital mechanics.",
        "logo": "../assets/img/theory/positional_celestial_mechanics_logo.png",
        "canonical_module_name": "Positional Astronomy and Celestial Mechanics",
    },
    "radiation_relativity": {
        "code": "T2",
        "accent": "#B39CD0",
        "handout_eyebrow": "Theory Track · Module 02 · Theoretical Handout",
        "handout_title": "2. Radiation Physics & Relativity Fundamentals",
        "practice_eyebrow": "Theory Track · Module 02",
        "practice_title": "Radiation Physics & Relativity Fundamentals",
        "practice_desc": "Continuous spectrum of light, special relativity, and light-matter interaction.",
        "logo": "../assets/img/theory/radiation_relativity_logo.png",
        "canonical_module_name": "Radiation Physics and Relativity Fundamentals",
    },
    "astronomical_instrumentation": {
        "code": "T3",
        "accent": "#B39CD0",
        "handout_eyebrow": "Theory Track · Module 03 · Theoretical Handout",
        "handout_title": "3. Astronomical Instrumentation",
        "practice_eyebrow": "Theory Track · Module 03",
        "practice_title": "Astronomical Instrumentation",
        "practice_desc": "Geometric optics, aperture synthesis, resolving power, and CCD detectors.",
        "logo": "../assets/img/theory/astronomical_instrumentation_logo.png",
        "canonical_module_name": "Astronomical Instrumentation",
    },
    "stellar_parameters": {
        "code": "T4",
        "accent": "#B39CD0",
        "handout_eyebrow": "Theory Track · Module 04 · Theoretical Handout",
        "handout_title": "4. Stellar Parameters & Spectral Classification",
        "practice_eyebrow": "Theory Track · Module 04",
        "practice_title": "Stellar Parameters & Spectral Classification",
        "practice_desc": "Binary star systems, stellar radii/masses, and the OBAFGKM spectral sequence.",
        "logo": "../assets/img/theory/stellar_parameters_logo.png",
        "canonical_module_name": "Stellar Parameters and Spectral Classification",
    },
    "stellar_structure": {
        "code": "T5",
        "accent": "#B39CD0",
        "handout_eyebrow": "Theory Track · Module 05 · Theoretical Handout",
        "handout_title": "5. Stellar Structure & Atmospheres",
        "practice_eyebrow": "Theory Track · Module 05",
        "practice_title": "Stellar Structure & Atmospheres",
        "practice_desc": "Hydrostatic equilibrium, radiative transfer, solar physics, and stellar interiors.",
        "logo": "../assets/img/theory/stellar_structure_logo.png",
        "canonical_module_name": "Stellar Structure and Atmospheres",
    },
    "interstellar_medium": {
        "code": "T6",
        "accent": "#B39CD0",
        "handout_eyebrow": "Theory Track · Module 06 · Theoretical Handout",
        "handout_title": "6. Interstellar Medium & Star Formation",
        "practice_eyebrow": "Theory Track · Module 06",
        "practice_title": "Interstellar Medium & Star Formation",
        "practice_desc": "Jeans criteria, molecular cloud collapse, extinction, and protostellar jets.",
        "logo": "../assets/img/theory/interstellar_medium_logo.png",
        "canonical_module_name": "Interstellar Medium and Star Formation",
    },
    "stellar_evolution": {
        "code": "T7",
        "accent": "#B39CD0",
        "handout_eyebrow": "Theory Track · Module 07 · Theoretical Handout",
        "handout_title": "7. Stellar Evolution",
        "practice_eyebrow": "Theory Track · Module 07",
        "practice_title": "Stellar Evolution",
        "practice_desc": "Main-sequence lifetimes, post-main-sequence branches, pulsation, and supernovae.",
        "logo": "../assets/img/theory/stellar_evolution_logo.png",
        "canonical_module_name": "Stellar Evolution",
    },
    "stellar_remnants": {
        "code": "T8",
        "accent": "#B39CD0",
        "handout_eyebrow": "Theory Track · Module 08 · Theoretical Handout",
        "handout_title": "8. Stellar Remnants & General Relativity",
        "practice_eyebrow": "Theory Track · Module 08",
        "practice_title": "Stellar Remnants & General Relativity",
        "practice_desc": "White dwarfs, neutron stars, Schwarzschild black holes, and close binaries.",
        "logo": "../assets/img/theory/stellar_remnants_logo.png",
        "canonical_module_name": "Stellar Remnants and General Relativity",
    },
    "planetary_systems": {
        "code": "T9",
        "accent": "#B39CD0",
        "handout_eyebrow": "Theory Track · Module 09 · Theoretical Handout",
        "handout_title": "9. Planetary Systems & Formation",
        "practice_eyebrow": "Theory Track · Module 09",
        "practice_title": "Planetary Systems & Formation",
        "practice_desc": "Solar system dynamics, exoplanet transit/RV detection, and planetary atmospheres.",
        "logo": "../assets/img/theory/planetary_systems_logo.png",
        "canonical_module_name": "Planetary Systems and Formation",
    },
    "galactic_structure": {
        "code": "T10",
        "accent": "#B39CD0",
        "handout_eyebrow": "Theory Track · Module 10 · Theoretical Handout",
        "handout_title": "10. Galactic Structure",
        "practice_eyebrow": "Theory Track · Module 10",
        "practice_title": "Galactic Structure",
        "practice_desc": "The Milky Way morphology, Oort constants, differential rotation, and dark matter halos.",
        "logo": "../assets/img/theory/galactic_structure_logo.png",
        "canonical_module_name": "Galactic Structure",
    },
    "galactic_evolution": {
        "code": "T11",
        "accent": "#B39CD0",
        "handout_eyebrow": "Theory Track · Module 11 · Theoretical Handout",
        "handout_title": "11. Galactic Evolution & Active Galaxies",
        "practice_eyebrow": "Theory Track · Module 11",
        "practice_title": "Galactic Evolution & Active Galaxies",
        "practice_desc": "Galaxy interactions, supermassive black holes, AGN unified model, and relativistic jets.",
        "logo": "../assets/img/theory/galactic_evolution_logo.png",
        "canonical_module_name": "Galactic Evolution and Active Galaxies",
    },
    "cosmology": {
        "code": "T12",
        "accent": "#B39CD0",
        "handout_eyebrow": "Theory Track · Module 12 · Theoretical Handout",
        "handout_title": "12. Cosmology & Structure of the Universe",
        "practice_eyebrow": "Theory Track · Module 12",
        "practice_title": "Cosmology & Structure of the Universe",
        "practice_desc": "Friedmann equations, Hubble flow, cosmic microwave background, and early universe.",
        "logo": "../assets/img/theory/cosmology_logo.png",
        "canonical_module_name": "Cosmology and the Structure of the Universe",
    },
    "data_methods_plotting": {
        "code": "D1",
        "accent": "#35E6FF",
        "handout_eyebrow": "Data Analysis Track · Module 01 · Theoretical Handout",
        "handout_title": "1. Methods & Plotting Guide",
        "practice_eyebrow": "Data Analysis Track · Module 01",
        "practice_title": "Methods & Plotting",
        "practice_desc": "Error propagation, weighted linear regression, linearization, and residual plotting.",
        "logo": "../assets/img/data_analysis/methods_plotting_logo.png",
        "canonical_module_name": "Methods & Plotting",
    },
    "data_full_sets": {
        "code": "D2",
        "accent": "#35E6FF",
        "handout_eyebrow": "Data Analysis Track · Module 02 · Theoretical Handout",
        "handout_title": "2. Interpreting Full Data Sets",
        "practice_eyebrow": "Data Analysis Track · Module 02",
        "practice_title": "Full Data Sets",
        "practice_desc": "Comprehensive real-world datasets from past IOAA exams: light curves and spectra.",
        "logo": "../assets/img/data_analysis/methods_plotting_logo.png",
        "canonical_module_name": "Full Data Sets",
    },
    "obs_blind_map": {
        "code": "O1",
        "accent": "#FFC1CC",
        "handout_eyebrow": "Observational Track · Manual 01 · Theoretical Handout",
        "handout_title": "Blind Map Observation Manual",
        "practice_eyebrow": "Observational Track · Module 01",
        "practice_title": "Blind Map Practice",
        "practice_desc": "Naked-eye star identification, constellation boundaries, and coordinate estimation.",
        "logo": "../assets/img/observational/blind_map_logo.png",
        "canonical_module_name": "Blind Map Practice",
    },
    "obs_telescope": {
        "code": "O2",
        "accent": "#FFC1CC",
        "handout_eyebrow": "Observational Track · Manual 02 · Theoretical Handout",
        "handout_title": "Practical Telescope Operations Manual",
        "practice_eyebrow": "Observational Track · Module 02",
        "practice_title": "Telescope Practice",
        "practice_desc": "Equatorial mount calibration, polar alignment, FOV mapping, and deep-sky pointing.",
        "logo": "../assets/img/theory/astronomical_instrumentation_logo.png",
        "canonical_module_name": "Telescope Practice",
    },
}

CODE_TO_CANONICAL_NAME = {m["code"]: m["canonical_module_name"] for m in CANONICAL_MODULES.values()}

HTML_ATTR_PATH_RE = re.compile(
    r"""(?:href|src)\s*=\s*["']([^"'#?]+)(?:[#?][^"']*)?["']""",
    re.IGNORECASE,
)

JS_STRING_PATH_RE = re.compile(
    r"""["'`](\.\.?/(?:assets|css|js|handouts|practice|data)/[^"'`#?]+|(?:assets/img|css|js|handouts|practice|data)/[^"'`#?]+)["'`]"""
)

JS_HTML_REDIRECT_RE = re.compile(
    r"""location\.href\s*=\s*["']([^"'#?]+\.html)["']""",
    re.IGNORECASE,
)

LEGACY_PATTERNS = {
    "legacy_bg_050b14": re.compile(r"#050b14", re.IGNORECASE),
    "unsplash_url": re.compile(r"unsplash\.com", re.IGNORECASE),
    "sharp_2px_border": re.compile(r"border(?:-(?:top|right|bottom|left))?\s*:\s*2px\b", re.IGNORECASE),
    "mismatched_handout_class": re.compile(r"\b(?:quiz-zone|resources-zone|comments-zone)\b"),
    "forbidden_framework": re.compile(r"(?:bootstrap(?:\.min)?\.(?:css|js)|tailwindcss|cdn\.tailwindcss\.com)", re.IGNORECASE),
    "defunct_polyfill_io": re.compile(r"polyfill\.io", re.IGNORECASE),
}

INLINE_FIREBASE_RE = re.compile(r"(?:firebaseConfig|initializeApp\s*\()", re.IGNORECASE)

CANONICAL_MATHJAX_BLOCK = """    <!-- MathJax v3 -->
    <script>
        window.MathJax = {
            tex: {
                inlineMath: [['$', '$'], ['\\\\(', '\\\\)']],
                displayMath: [['$$', '$$'], ['\\\\[', '\\\\]']],
                processEscapes: true
            }
        };
    </script>
    <script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>"""


def iter_repo_files() -> tuple[list[Path], list[Path]]:
    html_files: list[Path] = []
    js_files: list[Path] = []
    for root, dirs, files in os.walk(REPO_ROOT):
        dirs[:] = [d for d in sorted(dirs) if d not in {".git", ".agents", "node_modules"}]
        for fname in sorted(files):
            p = Path(root) / fname
            if p.suffix.lower() == ".html":
                html_files.append(p)
            elif p.suffix.lower() == ".js":
                js_files.append(p)
    return html_files, js_files


def is_external_or_dynamic(path_str: str) -> bool:
    s = path_str.strip()
    if not s:
        return True
    if s.startswith(("http://", "https://", "//", "mailto:", "tel:", "data:", "javascript:", "blob:")):
        return True
    if "${" in s or "{{" in s or "+" in s:
        return True
    return False


def resolve_relative_path(source_file: Path, raw_path: str) -> Path:
    if raw_path.startswith("/"):
        return (REPO_ROOT / raw_path.lstrip("/")).resolve()
    return (source_file.parent / raw_path).resolve()


def html_escape_amp(text: str) -> str:
    return text.replace("&", "&amp;")


def apply_fixes() -> list[str]:
    """Apply deterministic repository fixes across handouts/, practice/, js/data/, and competitions.html."""
    changes: list[str] = []

    # 1. Fix USAAAO .png -> .jpeg and add ../ prefix in js/data/usaaao_*.js + unify moduleName labels
    usaaao_img_re = re.compile(
        r"""src="(?:assets/img/)(USAAAO_\d{4}/Q[\d-]+_USAAAO_\d{4})\.png" """.rstrip()
    )
    module_pair_re = re.compile(
        r'(module:\s*"([^"]+)",\s*\n\s*moduleName:\s*")([^"]+)(")'
    )
    for js_file in sorted((REPO_ROOT / "js" / "data").glob("usaaao_*.js")):
        orig = js_file.read_text(encoding="utf-8")
        updated = orig

        def _fix_usaaao_img(m: re.Match) -> str:
            rel_img = m.group(1) + ".jpeg"
            if (REPO_ROOT / "assets" / "img" / rel_img).exists():
                return f'src="../assets/img/{rel_img}"'
            return m.group(0)

        updated = usaaao_img_re.sub(_fix_usaaao_img, updated)

        def _fix_module_name(m: re.Match) -> str:
            code = m.group(2)
            canonical = CODE_TO_CANONICAL_NAME.get(code)
            if canonical and m.group(3) != canonical:
                return f"{m.group(1)}{canonical}{m.group(4)}"
            return m.group(0)

        updated = module_pair_re.sub(_fix_module_name, updated)

        if updated != orig:
            js_file.write_text(updated, encoding="utf-8")
            changes.append(f"Fixed USAAAO image paths/moduleName in {js_file.relative_to(REPO_ROOT).as_posix()}")

    # 2. Fix missing logo paths + static module labels in all 15 placeholder handouts/*.html
    for html_file in sorted((REPO_ROOT / "handouts").glob("*.html")):
        stem = html_file.stem
        if stem == "positional_celestial_mechanics" or stem not in CANONICAL_MODULES:
            continue
        meta = CANONICAL_MODULES[stem]
        orig = html_file.read_text(encoding="utf-8")
        updated = orig

        # Replace missing logos inside HANDOUT_REGISTRY
        updated = updated.replace(
            "../assets/img/data_analysis/full_data_sets_logo.png",
            "../assets/img/data_analysis/methods_plotting_logo.png",
        )
        updated = updated.replace(
            "../assets/img/observational/telescope_practice_logo.png",
            "../assets/img/theory/astronomical_instrumentation_logo.png",
        )

        # Hydrate static HTML defaults to match this module's canonical syllabus metadata
        updated = re.sub(
            r"<title>.*?</title>",
            f"<title>{html_escape_amp(meta['handout_title'])} — Handout | Supernova Guide</title>",
            updated,
            count=1,
        )
        updated = re.sub(
            r'(<img id="handout-logo" src=")[^"]+(")',
            rf"\g<1>{meta['logo']}\g<2>",
            updated,
            count=1,
        )
        updated = re.sub(
            r'(<span id="handout-eyebrow">)[^<]*(</span>)',
            rf"\g<1>{html_escape_amp(meta['handout_eyebrow'])}\g<2>",
            updated,
            count=1,
        )
        updated = re.sub(
            r'(<h1 id="handout-title">)[^<]*(</h1>)',
            rf"\g<1>{html_escape_amp(meta['handout_title'])}\g<2>",
            updated,
            count=1,
        )
        updated = re.sub(
            r'(<a id="handout-practice-link" href=")[^"]+(")',
            rf"\g<1>../practice/{stem}.html\g<2>",
            updated,
            count=1,
        )

        if updated != orig:
            html_file.write_text(updated, encoding="utf-8")
            changes.append(f"Updated static labels & logo paths in {html_file.relative_to(REPO_ROOT).as_posix()}")

    # 3. Fix missing logo paths, static module labels, sidebar dashboard link, and MathJax v3 config in practice/*.html
    old_mathjax_block_re = re.compile(
        r"""    <!-- MathJax -->\n    <script src="https://polyfill\.io/v3/polyfill\.min\.js\?features=es6"></script>\n    <script id="MathJax-script" async src="https://cdn\.jsdelivr\.net/npm/mathjax@3/es5/tex-mml-chtml\.js"></script>"""
    )
    for html_file in sorted((REPO_ROOT / "practice").glob("*.html")):
        stem = html_file.stem
        if stem not in CANONICAL_MODULES:
            continue
        meta = CANONICAL_MODULES[stem]
        orig = html_file.read_text(encoding="utf-8")
        updated = orig

        # Replace defunct polyfill.io with canonical MathJax v3 configuration
        updated = old_mathjax_block_re.sub(lambda _: CANONICAL_MATHJAX_BLOCK, updated)

        # Replace missing logos inside MODULE_REGISTRY
        updated = updated.replace(
            "../assets/img/data_analysis/full_data_sets_logo.png",
            "../assets/img/data_analysis/methods_plotting_logo.png",
        )
        updated = updated.replace(
            "../assets/img/observational/telescope_practice_logo.png",
            "../assets/img/theory/astronomical_instrumentation_logo.png",
        )

        # Fix static sidebar dashboard link (../index.html -> ../dashboard.html)
        updated = updated.replace(
            '<li><a href="../index.html" class="nav-item"><i class="fa-solid fa-border-all"></i> Dashboard</a></li>',
            '<li><a href="../dashboard.html" class="nav-item"><i class="fa-solid fa-border-all"></i> Dashboard</a></li>',
        )

        # Hydrate static HTML defaults to match this module's canonical syllabus metadata
        updated = re.sub(
            r"<title>.*?</title>",
            f"<title>{html_escape_amp(meta['practice_title'])} — Practice | Supernova Guide</title>",
            updated,
            count=1,
        )
        updated = re.sub(
            r'(<img id="mod-logo" src=")[^"]+(")',
            rf"\g<1>{meta['logo']}\g<2>",
            updated,
            count=1,
        )
        updated = re.sub(
            r'(<span class="eyebrow" id="mod-eyebrow">)[^<]*(</span>)',
            rf"\g<1>{html_escape_amp(meta['practice_eyebrow'])}\g<2>",
            updated,
            count=1,
        )
        updated = re.sub(
            r'(<h1 id="mod-title">)[^<]*(</h1>)',
            rf"\g<1>{html_escape_amp(meta['practice_title'])}\g<2>",
            updated,
            count=1,
        )
        updated = re.sub(
            r'(<p id="mod-desc">)[^<]*(</p>)',
            rf"\g<1>{html_escape_amp(meta['practice_desc'])}\g<2>",
            updated,
            count=1,
        )
        updated = re.sub(
            r'(<a id="mod-handout-link" href=")[^"]+(")',
            rf"\g<1>../handouts/{stem}.html\g<2>",
            updated,
            count=1,
        )
        updated = re.sub(
            r'(<a id="empty-handout-btn" href=")[^"]+(")',
            rf"\g<1>../handouts/{stem}.html\g<2>",
            updated,
            count=1,
        )

        if updated != orig:
            html_file.write_text(updated, encoding="utf-8")
            changes.append(f"Updated MathJax config, static labels & logo paths in {html_file.relative_to(REPO_ROOT).as_posix()}")

    # 4. Escape literal US currency dollar signs in competitions.html body so MathJax doesn't misparse them
    comp_file = REPO_ROOT / "competitions.html"
    if comp_file.exists():
        orig_lines = comp_file.read_text(encoding="utf-8").splitlines(keepends=True)
        new_lines = []
        in_script = False
        in_style = False
        changed = False
        for line in orig_lines:
            if re.search(r"<script\b", line, re.I) and not re.search(r"</script>", line, re.I):
                in_script = True
            if re.search(r"<style\b", line, re.I) and not re.search(r"</style>", line, re.I):
                in_style = True

            if not in_script and not in_style:
                # Escape literal currency amounts like $2,300+ or $695 that are not already escaped
                fixed_line = re.sub(r"(?<!\\)\$(\d[\d,+]*)", r"\\$\1", line)
                if fixed_line != line:
                    changed = True
                new_lines.append(fixed_line)
            else:
                new_lines.append(line)

            if re.search(r"</script>", line, re.I):
                in_script = False
            if re.search(r"</style>", line, re.I):
                in_style = False

        if changed:
            comp_file.write_text("".join(new_lines), encoding="utf-8")
            changes.append("Escaped literal currency '$' signs in competitions.html for MathJax v3")

    return changes


def check_paths_in_html(html_file: Path) -> list[dict]:
    issues = []
    rel_file = html_file.relative_to(REPO_ROOT).as_posix()
    text = html_file.read_text(encoding="utf-8", errors="replace")
    lines = text.splitlines()

    in_script = False
    for lineno, line in enumerate(lines, start=1):
        for match in HTML_ATTR_PATH_RE.finditer(line):
            raw = match.group(1).strip()
            if is_external_or_dynamic(raw):
                continue
            if in_script and not re.search(r"<script\b", line, re.IGNORECASE):
                continue
            target = resolve_relative_path(html_file, raw)
            if not target.exists():
                issues.append({
                    "file": rel_file,
                    "line": lineno,
                    "kind": "html_attr",
                    "path": raw,
                })

        for match in JS_STRING_PATH_RE.finditer(line):
            raw = match.group(1).strip()
            if is_external_or_dynamic(raw):
                continue
            target = resolve_relative_path(html_file, raw)
            if not target.exists():
                if not any(i["line"] == lineno and i["path"] == raw for i in issues):
                    issues.append({
                        "file": rel_file,
                        "line": lineno,
                        "kind": "js_string_in_html",
                        "path": raw,
                    })

        if re.search(r"<script\b[^>]*>", line, re.IGNORECASE) and not re.search(r"</script>", line, re.IGNORECASE):
            in_script = True
        elif re.search(r"</script>", line, re.IGNORECASE):
            in_script = False

    # Enforce ../js/auth.js inside practice/ and handouts/
    if html_file.parent.name in {"practice", "handouts"}:
        for lineno, line in enumerate(lines, start=1):
            if re.search(r"""src\s*=\s*["']js/auth\.js["']""", line):
                issues.append({
                    "file": rel_file,
                    "line": lineno,
                    "kind": "missing_parent_prefix_auth",
                    "path": "js/auth.js",
                })

    return issues


def check_paths_in_js(js_file: Path) -> tuple[list[dict], list[dict]]:
    """Return (broken_paths, missing_binary_assets) found in a JS file."""
    broken = []
    missing_binaries = []
    rel_file = js_file.relative_to(REPO_ROOT).as_posix()
    text = js_file.read_text(encoding="utf-8", errors="replace")
    lines = text.splitlines()

    for lineno, line in enumerate(lines, start=1):
        stripped = line.strip()
        if stripped.startswith("//") or stripped.startswith("*"):
            continue

        # Check asset/script/style paths
        for match in JS_STRING_PATH_RE.finditer(line):
            raw = match.group(1).strip()
            if is_external_or_dynamic(raw):
                continue
            # For js/data/usaaao_*.js, images are rendered inside practice/*.html so ../assets/img/... is required
            if rel_file.startswith("js/data/usaaao_") and raw.startswith("assets/"):
                broken.append({
                    "file": rel_file,
                    "line": lineno,
                    "kind": "missing_parent_prefix_in_problem_data",
                    "path": raw,
                })
                continue

            candidates = [
                (REPO_ROOT / raw.lstrip("/")).resolve(),
                (js_file.parent / raw).resolve(),
                (REPO_ROOT / "practice" / raw).resolve(),
                (REPO_ROOT / "handouts" / raw).resolve(),
            ]
            if not any(c.exists() for c in candidates):
                # Distinguish wrong extension (fixable) from never-uploaded binary figure
                stem_target = (REPO_ROOT / raw.lstrip("./")).resolve()
                alt_exists = any(
                    stem_target.with_suffix(ext).exists()
                    for ext in (".jpeg", ".jpg", ".png", ".webp", ".svg")
                )
                entry = {
                    "file": rel_file,
                    "line": lineno,
                    "kind": "wrong_extension" if alt_exists else "missing_binary_asset",
                    "path": raw,
                }
                if alt_exists:
                    broken.append(entry)
                else:
                    missing_binaries.append(entry)

        # Check location.href HTML redirects
        for match in JS_HTML_REDIRECT_RE.finditer(line):
            raw = match.group(1).strip()
            if is_external_or_dynamic(raw):
                continue
            candidates = [
                (REPO_ROOT / raw.lstrip("/")).resolve(),
                (REPO_ROOT / "practice" / raw).resolve(),
            ]
            if not any(c.exists() for c in candidates):
                broken.append({
                    "file": rel_file,
                    "line": lineno,
                    "kind": "broken_js_redirect",
                    "path": raw,
                })

    return broken, missing_binaries


def check_legacy_and_classes(file_path: Path) -> list[dict]:
    issues = []
    rel_file = file_path.relative_to(REPO_ROOT).as_posix()
    text = file_path.read_text(encoding="utf-8", errors="replace")
    lines = text.splitlines()

    for lineno, line in enumerate(lines, start=1):
        for rule_name, regex in LEGACY_PATTERNS.items():
            if regex.search(line):
                issues.append({
                    "file": rel_file,
                    "line": lineno,
                    "rule": rule_name,
                    "snippet": line.strip()[:140],
                })
        if file_path.suffix.lower() == ".html" and INLINE_FIREBASE_RE.search(line):
            issues.append({
                "file": rel_file,
                "line": lineno,
                "rule": "inline_firebase_config",
                "snippet": line.strip()[:140],
            })
    return issues


def check_handout_chapter_css_classes() -> list[dict]:
    """Verify all CSS classes used inside handouts/t1_chapters/*.html are defined."""
    issues = []
    pcm = REPO_ROOT / "handouts" / "positional_celestial_mechanics.html"
    if not pcm.exists():
        return issues
    pcm_css = "".join(re.findall(r"<style[^>]*>(.*?)</style>", pcm.read_text(encoding="utf-8"), re.S))
    parent_classes = set(re.findall(r"\.([a-zA-Z_-][a-zA-Z0-9_-]*)\b", pcm_css))

    chapters_dir = REPO_ROOT / "handouts" / "t1_chapters"
    if not chapters_dir.exists():
        return issues
    for ch in sorted(chapters_dir.glob("*.html")):
        txt = ch.read_text(encoding="utf-8", errors="replace")
        if not txt.strip():
            continue
        ch_css = "".join(re.findall(r"<style[^>]*>(.*?)</style>", txt, re.S))
        ch_classes = set(re.findall(r"\.([a-zA-Z_-][a-zA-Z0-9_-]*)\b", ch_css))
        used = set()
        for m in re.finditer(r'class=["\']([^"\']+)["\']', txt):
            for cls in m.group(1).split():
                if not cls.startswith(("fa-", "fas", "far", "fab")):
                    used.add(cls)
        undefined = sorted(used - parent_classes - ch_classes)
        for cls in undefined:
            issues.append({
                "file": ch.relative_to(REPO_ROOT).as_posix(),
                "line": 1,
                "rule": "undefined_handout_css_class",
                "snippet": f".{cls}",
            })
    return issues


def check_syllabus_labels(html_files: list[Path], js_files: list[Path]) -> list[dict]:
    issues = []
    suspicious_re = re.compile(
        r"Chapter\s*6\s*:\s*Cosmology|Cosmology\s*(?:&|&amp;)\s*Galaxies",
        re.IGNORECASE,
    )
    for f in html_files + js_files:
        rel_file = f.relative_to(REPO_ROOT).as_posix()
        text = f.read_text(encoding="utf-8", errors="replace")
        for lineno, line in enumerate(text.splitlines(), start=1):
            if suspicious_re.search(line):
                issues.append({
                    "file": rel_file,
                    "line": lineno,
                    "rule": "legacy_syllabus_label",
                    "snippet": line.strip()[:140],
                })

    # Verify static title & eyebrow in handouts/*.html and practice/*.html
    for folder_name in ("handouts", "practice"):
        folder = REPO_ROOT / folder_name
        if not folder.exists():
            continue
        for html_file in sorted(folder.glob("*.html")):
            stem = html_file.stem
            if stem not in CANONICAL_MODULES:
                continue
            meta = CANONICAL_MODULES[stem]
            text = html_file.read_text(encoding="utf-8", errors="replace")
            rel_file = html_file.relative_to(REPO_ROOT).as_posix()
            expected_eyebrow = meta["handout_eyebrow"] if folder_name == "handouts" else meta["practice_eyebrow"]
            expected_title = meta["handout_title"] if folder_name == "handouts" else meta["practice_title"]
            if expected_eyebrow not in text and html_escape_amp(expected_eyebrow) not in text:
                issues.append({
                    "file": rel_file,
                    "line": 1,
                    "rule": "missing_canonical_eyebrow",
                    "snippet": f"Expected '{expected_eyebrow}'",
                })
            if expected_title not in text and html_escape_amp(expected_title) not in text:
                issues.append({
                    "file": rel_file,
                    "line": 1,
                    "rule": "missing_canonical_title",
                    "snippet": f"Expected '{expected_title}'",
                })

    # Verify moduleName consistency in js/data/usaaao_*.js
    module_pair_re = re.compile(r'module:\s*"([^"]+)",\s*\n\s*moduleName:\s*"([^"]+)"')
    for js_file in sorted((REPO_ROOT / "js" / "data").glob("usaaao_*.js")):
        rel_file = js_file.relative_to(REPO_ROOT).as_posix()
        text = js_file.read_text(encoding="utf-8", errors="replace")
        for m in module_pair_re.finditer(text):
            code, name = m.group(1), m.group(2)
            expected = CODE_TO_CANONICAL_NAME.get(code)
            if expected and name != expected:
                lineno = text[: m.start()].count("\n") + 1
                issues.append({
                    "file": rel_file,
                    "line": lineno,
                    "rule": "inconsistent_module_name",
                    "snippet": f"{code}: found '{name}', expected '{expected}'",
                })

    return issues


UNIFIED_SIDEBAR_HREFS = [
    "../dashboard.html", "../challenges.html", "../planetariu.html", "../problems.html",
    "../courses.html", "../competitions.html", "../analytics.html", "../tools.html",
    "../notebook.html", "../resources.html", "../profile.html", "../community.html",
]

ACCENT_RGB = {"#B39CD0": "179, 156, 208", "#35E6FF": "53, 230, 255", "#FFC1CC": "255, 193, 204"}


def check_module_shells() -> list[dict]:
    """Verify the standardized outer shell of all 16 practice/ and handouts/ module pages
    (mirroring handouts/positional_celestial_mechanics.html) and problems.html links."""
    issues: list[dict] = []

    def add(rel: str, rule: str, snippet: str) -> None:
        issues.append({"file": rel, "line": 1, "rule": rule, "snippet": snippet})

    sidebar_re = re.compile(r'<aside class="sidebar">(.*?)</aside>', re.S)
    for stem, meta in CANONICAL_MODULES.items():
        for folder in ("handouts", "practice"):
            f = REPO_ROOT / folder / f"{stem}.html"
            rel = f"{folder}/{stem}.html"
            if not f.exists():
                add(rel, "missing_module_page", "File does not exist")
                continue
            text = f.read_text(encoding="utf-8", errors="replace")
            accent = meta["accent"]

            if not re.search(rf"--track-accent:\s*{re.escape(accent)};", text, re.I):
                add(rel, "wrong_track_accent", f"Expected --track-accent: {accent}")
            if f"--track-accent-rgb: {ACCENT_RGB[accent]};" not in text:
                add(rel, "wrong_track_accent_rgb", f"Expected --track-accent-rgb: {ACCENT_RGB[accent]}")
            style = "".join(re.findall(r"<style[^>]*>(.*?)</style>", text, re.S))
            for selector in (r"\.nav-item\.active", r"\.toc-btn\.active", r"\.chapter-badge", r"\.handout-note"):
                m = re.search(selector + r"\s*\{([^}]*)\}", style)
                if m and "179, 156, 208" in m.group(1):
                    add(rel, "hardcoded_theory_tint", f"{selector} uses hardcoded purple instead of --track-accent-rgb")

            sb = sidebar_re.search(text)
            if not sb:
                add(rel, "missing_unified_sidebar", '<aside class="sidebar"> not found')
            else:
                for href in UNIFIED_SIDEBAR_HREFS:
                    if f'href="{href}"' not in sb.group(1):
                        add(rel, "incomplete_unified_sidebar", f"Sidebar missing link {href}")
                for needle in ('id="btn-logout"', 'class="sidebar-close-btn"', 'class="nav-item active"'):
                    if needle not in sb.group(1):
                        add(rel, "incomplete_unified_sidebar", f"Sidebar missing {needle}")
            for needle in ('class="mobile-topbar"', 'id="sidebar-backdrop"', 'class="module-hero"',
                           'class="hero-icon"', f'src="{meta["logo"]}"', 'class="hero-actions"',
                           'href="../problems.html" class="btn-nav-pill"'):
                if needle not in text:
                    add(rel, "incomplete_module_shell", f"Missing {needle}")

            if folder == "handouts":
                for needle in ('class="reader-grid"', 'class="toc-panel"', 'class="toc-btn',
                               'id="toggle-view-mode"', 'id="view-mode-label"', 'id="handout-reader-panels"',
                               f'href="../practice/{stem}.html" class="btn-nav-pill primary-pill"',
                               'src="../js/handout_reader.js"'):
                    if needle not in text:
                        add(rel, "incomplete_handout_reader", f"Missing {needle}")
                targets = re.findall(r'class="toc-btn[^"]*" data-target="([^"]+)"', text)
                if len(targets) != len(set(targets)):
                    add(rel, "duplicate_toc_target", "TOC data-target values must be unique")
                if 'data-chapter-path="' not in text:
                    panels = re.findall(r'<article class="subchapter-panel[^"]*"[^>]*data-sub="([^"]+)"', text)
                    if panels != targets:
                        add(rel, "toc_panel_mismatch", f"TOC {targets} vs panels {panels}")
                    if text.count('class="subchapter-nav-bar"') != len(panels):
                        add(rel, "missing_subchapter_nav", "Every subchapter panel needs Previous/Next buttons")
            else:
                if f'id="mod-handout-link" href="../handouts/{stem}.html"' not in text:
                    add(rel, "broken_module_crosslink", f"Missing link to ../handouts/{stem}.html")

    problems = REPO_ROOT / "problems.html"
    if problems.exists():
        ptext = problems.read_text(encoding="utf-8", errors="replace")
        for stem in CANONICAL_MODULES:
            for folder in ("practice", "handouts"):
                if f'href="{folder}/{stem}.html"' not in ptext:
                    add("problems.html", "missing_hub_link", f"Missing link to {folder}/{stem}.html")
    return issues


def strip_html_scripts_and_styles(html: str) -> str:
    def _preserve_newlines(match: re.Match) -> str:
        return "\n" * match.group(0).count("\n")

    cleaned = re.sub(r"<script\b[^>]*>.*?</script>", _preserve_newlines, html, flags=re.IGNORECASE | re.DOTALL)
    cleaned = re.sub(r"<style\b[^>]*>.*?</style>", _preserve_newlines, cleaned, flags=re.IGNORECASE | re.DOTALL)
    cleaned = re.sub(r"<!--.*?-->", _preserve_newlines, cleaned, flags=re.DOTALL)
    cleaned = re.sub(r"<code\b[^>]*>.*?</code>", _preserve_newlines, cleaned, flags=re.IGNORECASE | re.DOTALL)
    cleaned = re.sub(r"<pre\b[^>]*>.*?</pre>", _preserve_newlines, cleaned, flags=re.IGNORECASE | re.DOTALL)
    return cleaned


def scan_mathjax_delimiters(text: str, rel_file: str, line_offset: int = 0) -> list[dict]:
    issues = []
    i = 0
    n = len(text)
    line = 1 + line_offset
    open_delim = None
    open_line = 0

    while i < n:
        ch = text[i]
        if ch == "\n":
            line += 1
            i += 1
            continue

        if ch == "\\" and i + 1 < n:
            nxt = text[i + 1]
            if nxt == "$":
                i += 2
                continue
            if nxt == "(":
                if open_delim is None:
                    open_delim = "\\("
                    open_line = line
                else:
                    issues.append({
                        "file": rel_file,
                        "line": line,
                        "rule": "nested_mathjax_open",
                        "snippet": f"Found '\\(' while '{open_delim}' opened on line {open_line} is still open",
                    })
                i += 2
                continue
            if nxt == ")":
                if open_delim == "\\(":
                    open_delim = None
                else:
                    issues.append({
                        "file": rel_file,
                        "line": line,
                        "rule": "unmatched_mathjax_close",
                        "snippet": f"Found '\\)' without matching '\\(' (open={open_delim!r})",
                    })
                i += 2
                continue
            if nxt == "[":
                if open_delim is None:
                    open_delim = "\\["
                    open_line = line
                else:
                    issues.append({
                        "file": rel_file,
                        "line": line,
                        "rule": "nested_mathjax_open",
                        "snippet": f"Found '\\[' while '{open_delim}' opened on line {open_line} is still open",
                    })
                i += 2
                continue
            if nxt == "]":
                if open_delim == "\\[":
                    open_delim = None
                else:
                    issues.append({
                        "file": rel_file,
                        "line": line,
                        "rule": "unmatched_mathjax_close",
                        "snippet": f"Found '\\]' without matching '\\[' (open={open_delim!r})",
                    })
                i += 2
                continue
            i += 2
            continue

        if ch == "$":
            if i + 1 < n and text[i + 1] == "{":
                i += 2
                continue
            if i + 1 < n and text[i + 1] == "$":
                if open_delim is None:
                    open_delim = "$$"
                    open_line = line
                elif open_delim == "$$":
                    open_delim = None
                else:
                    issues.append({
                        "file": rel_file,
                        "line": line,
                        "rule": "mismatched_mathjax",
                        "snippet": f"Found '$$' while '{open_delim}' opened on line {open_line} is still open",
                    })
                    open_delim = None
                i += 2
                continue
            else:
                if open_delim is None:
                    open_delim = "$"
                    open_line = line
                elif open_delim == "$":
                    open_delim = None
                else:
                    issues.append({
                        "file": rel_file,
                        "line": line,
                        "rule": "mismatched_mathjax",
                        "snippet": f"Found '$' while '{open_delim}' opened on line {open_line} is still open",
                    })
                i += 1
                continue

        if open_delim in ("$", "\\(") and ch == "<":
            if re.match(r"</(?:p|div|li|td|th|article|section|h[1-6])>", text[i : i + 15], re.IGNORECASE):
                issues.append({
                    "file": rel_file,
                    "line": open_line,
                    "rule": "unclosed_inline_math_before_block_end",
                    "snippet": f"Inline '{open_delim}' opened on line {open_line} not closed before block end at line {line}",
                })
                open_delim = None

        i += 1

    if open_delim is not None:
        issues.append({
            "file": rel_file,
            "line": open_line,
            "rule": "unclosed_mathjax_eof",
            "snippet": f"Delimiter '{open_delim}' opened on line {open_line} was never closed",
        })

    return issues


def check_mathjax_in_js_data(js_file: Path) -> list[dict]:
    issues = []
    rel_file = js_file.relative_to(REPO_ROOT).as_posix()
    text = js_file.read_text(encoding="utf-8", errors="replace")

    if not any(tok in text for tok in ("$", "\\(", "\\)", "\\[", "\\]")):
        return issues

    i, n, line = 0, len(text), 1
    while i < n:
        ch = text[i]
        if ch == "\n":
            line += 1
            i += 1
            continue
        if ch == "/" and i + 1 < n and text[i + 1] == "/":
            nl = text.find("\n", i)
            if nl == -1:
                break
            i = nl + 1
            line += 1
            continue
        if ch == "/" and i + 1 < n and text[i + 1] == "*":
            end = text.find("*/", i + 2)
            if end == -1:
                break
            line += text[i : end + 2].count("\n")
            i = end + 2
            continue
        if ch in ('"', "'", "`"):
            quote = ch
            start_line = line
            i += 1
            buf = []
            while i < n:
                c = text[i]
                if c == "\\" and i + 1 < n:
                    nxt = text[i + 1]
                    if nxt == "\\":
                        buf.append("\\")
                    elif nxt == "n":
                        buf.append("\n")
                    elif nxt == quote:
                        buf.append(quote)
                    else:
                        buf.append("\\" + nxt)
                    i += 2
                    continue
                if c == quote:
                    i += 1
                    break
                if c == "\n":
                    line += 1
                buf.append(c)
                i += 1
            s = "".join(buf)
            if any(tok in s for tok in ("$", "\\(", "\\)", "\\[", "\\]")):
                for si in scan_mathjax_delimiters(s, rel_file, line_offset=start_line - 1):
                    si["string_preview"] = s[:120].replace("\n", " ")
                    issues.append(si)
            continue
        i += 1
    return issues


def run_audit() -> dict:
    html_files, js_files = iter_repo_files()
    report = {
        "scanned": {"html_files": len(html_files), "js_files": len(js_files)},
        "broken_paths": [],
        "missing_binary_assets": [],
        "legacy_styling_and_classes": [],
        "syllabus_mismatches": [],
        "mathjax_issues": [],
        "module_shell_issues": [],
    }

    for f in html_files:
        report["broken_paths"].extend(check_paths_in_html(f))
        report["legacy_styling_and_classes"].extend(check_legacy_and_classes(f))

        rel_file = f.relative_to(REPO_ROOT).as_posix()
        text = f.read_text(encoding="utf-8", errors="replace")
        if rel_file.startswith(("handouts/", "practice/")) or "mathjax" in text.lower():
            cleaned = strip_html_scripts_and_styles(text)
            report["mathjax_issues"].extend(scan_mathjax_delimiters(cleaned, rel_file))

    report["legacy_styling_and_classes"].extend(check_handout_chapter_css_classes())

    for f in js_files:
        broken, missing_bins = check_paths_in_js(f)
        report["broken_paths"].extend(broken)
        report["missing_binary_assets"].extend(missing_bins)
        report["legacy_styling_and_classes"].extend(check_legacy_and_classes(f))
        rel_file = f.relative_to(REPO_ROOT).as_posix()
        if rel_file.startswith("js/data/") or "exam" in rel_file or "problem" in rel_file:
            report["mathjax_issues"].extend(check_mathjax_in_js_data(f))

    report["syllabus_mismatches"] = check_syllabus_labels(html_files, js_files)
    report["module_shell_issues"] = check_module_shells()
    return report


def main() -> int:
    parser = argparse.ArgumentParser(description="Audit (and optionally fix) MateiBt/supernova.github.io.")
    parser.add_argument("--fix", action="store_true", help="Apply deterministic fixes before auditing.")
    args = parser.parse_args()

    if args.fix:
        changes = apply_fixes()
        print(f"Applied {len(changes)} automated fix group(s):", file=sys.stderr)
        for ch in changes:
            print(f"  - {ch}", file=sys.stderr)

    report = run_audit()
    print(json.dumps(report, indent=2))

    actionable_total = (
        len(report["broken_paths"])
        + len(report["legacy_styling_and_classes"])
        + len(report["syllabus_mismatches"])
        + len(report["mathjax_issues"])
        + len(report["module_shell_issues"])
    )
    print("\n=== AUDIT SUMMARY ===", file=sys.stderr)
    print(f"HTML files scanned:    {report['scanned']['html_files']}", file=sys.stderr)
    print(f"JS files scanned:      {report['scanned']['js_files']}", file=sys.stderr)
    print(f"Broken paths:          {len(report['broken_paths'])}", file=sys.stderr)
    print(f"Missing binary assets: {len(report['missing_binary_assets'])}", file=sys.stderr)
    print(f"Legacy/CSS issues:     {len(report['legacy_styling_and_classes'])}", file=sys.stderr)
    print(f"Syllabus issues:       {len(report['syllabus_mismatches'])}", file=sys.stderr)
    print(f"MathJax issues:        {len(report['mathjax_issues'])}", file=sys.stderr)
    print(f"Module shell issues:   {len(report['module_shell_issues'])}", file=sys.stderr)
    print(f"Actionable findings:   {actionable_total}", file=sys.stderr)
    return 1 if actionable_total > 0 else 0


if __name__ == "__main__":
    raise SystemExit(main())
