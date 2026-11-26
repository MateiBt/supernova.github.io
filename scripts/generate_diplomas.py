#!/usr/bin/env python3
"""
SAC 2026 Official Diploma & Certificate Generator
=================================================
Reads the complete 43-competitor SAC 2026 roster (SNG-2026-1001 .. SNG-2026-1043)
from competitions.html, inspects and optimizes all local logo assets in assets/img/
and assets/img/sponsors/ with Pillow (including automated luminance/transparency
detection for dark-slate #15161A pills and typographic fallbacks), renders:

  1. diplomas.html — standalone A4 landscape interactive inspector & batch-print tool
  2. output_diplomas/SNG-2026-10XX_<Sanitized_Name>_<Tier>.pdf — 49 print-ready PDFs
  3. output_diplomas/ALL_SAC2026_DIPLOMAS.pdf — combined 49-page print-ready PDF

Auto-detects available PDF engine: Playwright -> Headless Chrome/Edge -> WeasyPrint.
"""

from __future__ import annotations

import argparse
import base64
import html
import io
import json
import os
import re
import shutil
import subprocess
import sys
import tempfile
import unicodedata
from collections import deque
from dataclasses import dataclass, field
from pathlib import Path
from typing import Dict, List, Optional, Tuple

from PIL import Image, ImageFilter

# =============================================================================
# PATHS & CONSTANTS
# =============================================================================
REPO_ROOT = Path(__file__).resolve().parent.parent
COMPETITIONS_HTML = REPO_ROOT / "competitions.html"
ASSETS_IMG = REPO_ROOT / "assets" / "img"
SPONSORS_DIR = ASSETS_IMG / "sponsors"
SIGNATURES_DIR = ASSETS_IMG / "signatures"
DEFAULT_OUTPUT_DIR = REPO_ROOT / "output_diplomas"
DIPLOMAS_HTML_PATH = REPO_ROOT / "diplomas.html"

EVENT_PLATFORM = "Supernova Guide"
EVENT_DOMAIN = "supernovaguide.com"
EVENT_TITLE = "Supernova Astrophysics Cup — Autumn 2026 (SAC 2026)"
EVENT_SUBTITLE = "Official Season Event #01 · International Online Astrophysics Championship"
EVENT_DATES = (
    "14–21 November 2026  ·  Phase 1: Open Qualifier · 14 Nov 2026"
    "  |  Grand Final: The POTD War · 21 Nov 2026"
)
ISSUE_DATE = "November 2026"

COMMITTEE = [
    ("Matei Butnaru", "Lead Organizer, Supernova Guide", "sig_matei", "matei.png"),
    ("Albert Voicu Olteanu", "Scientific Committee, Supernova Guide", "sig_albert", "albert.png"),
    ("Mihai Teșileanu", "Scientific Committee, Supernova Guide", "sig_mihai", "mihai.png"),
]

# =============================================================================
# CLEANED INSTITUTION & COUNTRY OVERRIDES (Preserves Full Legal Names)
# =============================================================================
# Cleans minor form typos, inconsistent casing, Romanian/Turkish diacritics,
# and messy country/city formatting (e.g. "Romania , Botoşani" -> "Romania").
SCHOOL_CLEANUP: Dict[str, str] = {
    "SNG-2026-1001": 'Colegiul Național "Ion C. Brătianu", Pitești',
    "SNG-2026-1002": "Școala Gimnazială Nr. 7 Botoșani",
    "SNG-2026-1003": 'Colegiul Național "Ion C. Brătianu", Pitești',
    "SNG-2026-1004": 'Colegiul Național "Ion C. Brătianu", Pitești',
    "SNG-2026-1005": "Central Public School, Jafarpur",
    "SNG-2026-1006": "DAV Public School, Bhubaneswar",
    "SNG-2026-1007": "Orizont, Durlești",
    "SNG-2026-1008": 'Colegiul Național "Emil Racoviță", Iași',
    "SNG-2026-1009": "Mindanao State University – Marawi Senior High School",
    "SNG-2026-1010": 'Colegiul Național Pedagogic "Ștefan Velovan", Craiova',
    "SNG-2026-1011": "SMAN 1 Tanjungpinang",
    "SNG-2026-1012": "Lycée M'Hamed Bougherra",
    "SNG-2026-1013": 'Colegiul Național "Ferdinand I", Bacău',
    "SNG-2026-1014": "Melbourne High School",
    "SNG-2026-1015": "William Hopkins Middle School",
    "SNG-2026-1016": "St. Aloysius Convent High School",
    "SNG-2026-1017": "Tokuma Secondary School",
    "SNG-2026-1018": "ODA Special Boarding School",
    "SNG-2026-1019": "English School of Mongolia",
    "SNG-2026-1020": "SMP Islam De Green Camp",
    "SNG-2026-1021": "SMAN 1 Tanjungpinang",
    "SNG-2026-1022": "SMAK 2 Penabur",
    "SNG-2026-1023": "TÜBİTAK Science High School",
    "SNG-2026-1024": "DAIS, Mumbai",
    "SNG-2026-1025": "TÜBİTAK Science High School",
    "SNG-2026-1026": "Camas High School",
    "SNG-2026-1027": 'Colegiul Național "Gh. M. Murgoci", Brăila',
    "SNG-2026-1028": "Independent Student (Gap Year · Curitiba, Paraná)",
    "SNG-2026-1029": "University of Florida",
    "SNG-2026-1030": "TÜBİTAK Science High School",
    "SNG-2026-1031": 'Colegiul Național "Ion C. Brătianu", Pitești',
    "SNG-2026-1032": "MAN 2 Pekanbaru",
    "SNG-2026-1033": "SMA Negeri 1 Tanjungpinang",
    "SNG-2026-1034": "North Sydney Boys High School",
    "SNG-2026-1035": "Shri S.J. Chaudhary Vardhman Vidhyaya",
    "SNG-2026-1036": "MAN 2 Pekanbaru",
    "SNG-2026-1037": "MAN 2 Pekanbaru",
    "SNG-2026-1038": 'Colegiul Național "Mihai Eminescu", Botoșani',
    "SNG-2026-1039": 'Colegiul Național "Andrei Șaguna" Brașov',
    "SNG-2026-1040": "UNSTPB Politehnica București",
    "SNG-2026-1041": 'Liceul Teoretic "Grigore Antipa", Botoșani',
    "SNG-2026-1042": "MAN Insan Cendekia Gowa",
    "SNG-2026-1043": "DAV Public School, Bhubaneswar",
}

# =============================================================================
# OFFICIAL SAC 2026 AWARD STRUCTURE (EXACT SPECIFICATION)
# =============================================================================
# Note: SNG-2026-1003 (Badea Robert Yannis) competed SOLO in the Grand Final (#7).
FINALIST_ENTRIES = [
    {
        "rank": 1,
        "ordinal": "1st Place",
        "score": "37.0 / 45",
        "tier_key": "gold",
        "tier_label": "Gold Medal — Grand Champion",
        "tier_slug": "Gold_Medal",
        "bibs": ["SNG-2026-1039"],
        "team_name": None,
        "issue_team_diploma": False,
    },
    {
        "rank": 2,
        "ordinal": "2nd Place",
        "score": "37.0 / 45",
        "tier_key": "silver",
        "tier_label": "Silver Medal",
        "tier_slug": "Silver_Medal",
        "bibs": ["SNG-2026-1025", "SNG-2026-1030"],
        "team_name": "Team Tefla",
        "issue_team_diploma": True,
    },
    {
        "rank": 3,
        "ordinal": "3rd Place",
        "score": "35.0 / 45",
        "tier_key": "silver",
        "tier_label": "Silver Medal",
        "tier_slug": "Silver_Medal",
        "bibs": ["SNG-2026-1001", "SNG-2026-1019"],
        "team_name": "Team λεμμα",
        "issue_team_diploma": True,
    },
    {
        "rank": 4,
        "ordinal": "4th Place",
        "score": "34.0 / 45",
        "tier_key": "silver",
        "tier_label": "Silver Medal",
        "tier_slug": "Silver_Medal",
        "bibs": ["SNG-2026-1010"],
        "team_name": None,
        "issue_team_diploma": False,
    },
    {
        "rank": 5,
        "ordinal": "5th Place",
        "score": "33.0 / 45",
        "tier_key": "silver",
        "tier_label": "Silver Medal",
        "tier_slug": "Silver_Medal",
        "bibs": ["SNG-2026-1013"],
        "team_name": None,
        "issue_team_diploma": False,
    },
    {
        "rank": 6,
        "ordinal": "6th Place",
        "score": "33.0 / 45",
        "tier_key": "bronze",
        "tier_label": "Bronze Medal",
        "tier_slug": "Bronze_Medal",
        "bibs": ["SNG-2026-1008"],
        "team_name": None,
        "issue_team_diploma": False,
    },
    {
        "rank": 7,
        "ordinal": "7th Place",
        "score": "31.0 / 45",
        "tier_key": "bronze",
        "tier_label": "Bronze Medal",
        "tier_slug": "Bronze_Medal",
        "bibs": ["SNG-2026-1003"],
        "team_name": None,  # Competed Solo in Grand Final (#7), NOT a duo
        "issue_team_diploma": False,
    },
    {
        "rank": 8,
        "ordinal": "8th Place",
        "score": "28.0 / 45",
        "tier_key": "bronze",
        "tier_label": "Bronze Medal",
        "tier_slug": "Bronze_Medal",
        "bibs": ["SNG-2026-1023"],
        "team_name": None,
        "issue_team_diploma": False,
    },
    {
        "rank": 9,
        "ordinal": "9th Place",
        "score": "27.0 / 45",
        "tier_key": "bronze",
        "tier_label": "Bronze Medal",
        "tier_slug": "Bronze_Medal",
        "bibs": ["SNG-2026-1006"],
        "team_name": None,
        "issue_team_diploma": False,
    },
    {
        "rank": 10,
        "ordinal": "10th Place",
        "score": "26.0 / 45",
        "tier_key": "bronze",
        "tier_label": "Bronze Medal",
        "tier_slug": "Bronze_Medal",
        "bibs": ["SNG-2026-1011"],
        "team_name": None,
        "issue_team_diploma": False,
    },
    {
        "rank": 11,
        "ordinal": "11th Place",
        "score": "25.0 / 45",
        "tier_key": "honorable",
        "tier_label": "Honorable Mention — Grand Finalist",
        "tier_slug": "Honorable_Mention",
        "bibs": ["SNG-2026-1033"],
        "team_name": None,
        "issue_team_diploma": False,
    },
    {
        "rank": 12,
        "ordinal": "12th Place",
        "score": "25.0 / 45",
        "tier_key": "honorable",
        "tier_label": "Honorable Mention — Grand Finalist",
        "tier_slug": "Honorable_Mention",
        "bibs": ["SNG-2026-1038", "SNG-2026-1041"],
        "team_name": "Team Alternosteaua",
        "issue_team_diploma": True,
    },
    {
        "rank": 13,
        "ordinal": "13th Place",
        "score": "25.0 / 45",
        "tier_key": "honorable",
        "tier_label": "Honorable Mention — Grand Finalist",
        "tier_slug": "Honorable_Mention",
        "bibs": ["SNG-2026-1029"],
        "team_name": None,
        "issue_team_diploma": False,
    },
    {
        "rank": 14,
        "ordinal": "14th Place",
        "score": "21.0 / 45",
        "tier_key": "honorable",
        "tier_label": "Honorable Mention — Grand Finalist",
        "tier_slug": "Honorable_Mention",
        "bibs": ["SNG-2026-1012"],
        "team_name": None,
        "issue_team_diploma": False,
    },
    {
        "rank": 15,
        "ordinal": "15th Place",
        "score": "20.0 / 45",
        "tier_key": "honorable",
        "tier_label": "Honorable Mention — Grand Finalist",
        "tier_slug": "Honorable_Mention",
        "bibs": ["SNG-2026-1015"],
        "team_name": None,
        "issue_team_diploma": False,
    },
]

AMBASSADOR_ENTRIES = [
    {
        "rank": 1,
        "ordinal": "1st Ambassador",
        "bib": "SNG-2026-1011",
        "referral_note": "5 verified student referrals",
        "tier_slug": "Ambassador_1st",
    },
    {
        "rank": 2,
        "ordinal": "2nd Ambassador",
        "bib": "SNG-2026-1025",
        "referral_note": "Verified student referrals",
        "tier_slug": "Ambassador_2nd",
    },
    {
        "rank": 3,
        "ordinal": "3rd Ambassador",
        "bib": "SNG-2026-1032",
        "referral_note": "Verified student referrals",
        "tier_slug": "Ambassador_3rd",
    },
]

# Official Phase 1 Duo Pair (cleaned — omits solo meme callsign "iono bro")
PHASE1_DUO_PAIRS: Dict[str, Tuple[str, str]] = {
    "SNG-2026-1026": ("Team Pair #2", "SNG-2026-1028"),
    "SNG-2026-1028": ("Team Pair #2", "SNG-2026-1026"),
}

# =============================================================================
# 9 MANDATORY SPONSORS SPECIFICATION
# =============================================================================
SPONSOR_SPECS = [
    # Row 1 (5 sponsors)
    {
        "id": "software_bisque",
        "label": "Software Bisque",
        "row": 1,
        "files": [("software_bisque", "software_bisque.png")],
        "fallback": "SOFTWARE BISQUE",
    },
    {
        "id": "aries_productions",
        "label": "Aries Productions",
        "row": 1,
        "files": [("aries_productions", "aries_productions.png")],
        "fallback": "ARIES PRODUCTIONS",
    },
    {
        "id": "axilone_siril",
        "label": "Axilone – Astronomy & Siril",
        "row": 1,
        "files": [("axilone", "axilone.png"), ("siril", "siril.png")],
        "fallback": "AXILONE · SIRIL",
    },
    {
        "id": "pavonis",
        "label": "Pavonis Interactive",
        "row": 1,
        "files": [("pavonis", "pavonis.png")],
        "fallback": "PAVONIS INTERACTIVE",
    },
    {
        "id": "universe_sandbox",
        "label": "Giant Army · Universe Sandbox",
        "row": 1,
        "files": [("universe_sandbox", "universe_sandbox.png")],
        "fallback": "UNIVERSE SANDBOX",
    },
    # Row 2 (4 sponsors)
    {
        "id": "ksp",
        "label": "Kerbal Space Program",
        "row": 2,
        "files": [("ksp", "ksp.png")],
        "fallback": "KERBAL SPACE PROGRAM",
    },
    {
        "id": "jundroo",
        "label": "Jundroo Games",
        "row": 2,
        "files": [("jundroo", "jundroo.png")],
        "fallback": "JUNDROO GAMES",
    },
    {
        "id": "aops",
        "label": "Art of Problem Solving",
        "row": 2,
        "files": [("aops", "aops.png")],
        "fallback": "AoPS · Art of Problem Solving",
    },
    {
        "id": "photopills",
        "label": "PhotoPills",
        "row": 2,
        "files": [("photopills", "photopills.png")],
        "fallback": "PhotoPills",
        "icon_with_wordmark": True,
    },
]


# =============================================================================
# DATA STRUCTURES
# =============================================================================
@dataclass
class Competitor:
    bib: str
    name: str
    school: str
    country: str
    grade: str


@dataclass
class LogoAsset:
    key: str
    filename: str
    exists: bool
    data_uri: Optional[str]
    needs_dark_pill: bool
    width: int = 0
    height: int = 0
    opaque_white_pct: float = 0.0
    notes: str = ""


@dataclass
class CertificateSpec:
    cert_id: str
    filename: str
    tier_key: str          # gold, silver, bronze, honorable, ambassador, participation
    tier_group: str        # Filter label
    cert_heading: str      # Top uppercase heading (e.g. CERTIFICATE OF ACHIEVEMENT)
    tier_badge: str        # Main award pill text
    tier_subbadge: str     # Rank / score / referral metric
    seal_top: str          # Seal top text
    seal_main: str         # Seal big center text
    seal_bottom: str       # Seal bottom text
    intro_line: str
    recipient_title: str   # Full legal name OR Team Name (for Special Team Diplomas)
    bib_display: str       # Single bib or "SNG-2026-10XX & SNG-2026-10YY"
    footer_bib_label: str  # "Candidate Bib ID" or "Candidate Bib IDs"
    school: str
    country: str
    duo_note: Optional[str] = None
    team_members: List[Competitor] = field(default_factory=list)
    citation_html: str = ""
    is_team_diploma: bool = False


# =============================================================================
# HELPERS: SANITIZATION & ROSTER EXTRACTION
# =============================================================================
def sanitize_filename_token(text: str) -> str:
    """Convert Unicode name/title into a clean ASCII filename token."""
    # Map special Turkish, Romanian, and Greek characters cleanly before NFKD
    replacements = {
        "Ș": "S", "ș": "s", "Ş": "S", "ş": "s",
        "Ț": "T", "ț": "t", "Ţ": "T", "ţ": "t",
        "Ă": "A", "ă": "a", "Â": "A", "â": "a",
        "Î": "I", "î": "i", "İ": "I", "ı": "i",
        "Ğ": "G", "ğ": "g", "Ü": "U", "ü": "u",
        "Ö": "O", "ö": "o", "Ç": "C", "ç": "c",
        "Α": "A", "α": "a", "Β": "B", "β": "b", "Γ": "G", "γ": "g",
        "Δ": "D", "δ": "d", "Ε": "E", "ε": "e", "Ζ": "Z", "ζ": "z",
        "Η": "E", "η": "e", "Θ": "Th", "θ": "th", "Ι": "I", "ι": "i",
        "Κ": "K", "κ": "k", "Λ": "L", "λ": "l", "Μ": "M", "μ": "m",
        "Ν": "N", "ν": "n", "Ξ": "X", "ξ": "x", "Ο": "O", "ο": "o",
        "Π": "P", "π": "p", "Ρ": "R", "ρ": "r", "Σ": "S", "σ": "s", "ς": "s",
        "Τ": "T", "τ": "t", "Υ": "Y", "υ": "y", "Φ": "Ph", "φ": "ph",
        "Χ": "Ch", "χ": "ch", "Ψ": "Ps", "ψ": "ps", "Ω": "O", "ω": "o",
        "’": "", "'": "",
    }
    for src, dst in replacements.items():
        text = text.replace(src, dst)
    norm = unicodedata.normalize("NFKD", text).encode("ascii", "ignore").decode("ascii")
    norm = re.sub(r"[^A-Za-z0-9\-]+", "_", norm)
    norm = re.sub(r"_+", "_", norm).strip("_-")
    return norm or "Participant"


def clean_country(raw_country: str) -> str:
    """Normalize country name (e.g. 'Romania , Botoşani' -> 'Romania')."""
    c = (raw_country or "").strip()
    if "," in c:
        c = c.split(",", 1)[0].strip()
    lower = c.lower()
    if lower in ("romania", "românia"):
        return "Romania"
    if lower in ("turkey", "türkiye", "turkiye"):
        return "Türkiye"
    if lower in ("usa", "united states", "united states of america"):
        return "USA"
    return c


def load_roster_from_competitions_html(html_path: Path) -> Dict[str, Competitor]:
    """Parse REGISTERED_PARTICIPANTS from competitions.html (SNG-2026-1001..1043)."""
    text = html_path.read_text(encoding="utf-8")
    m = re.search(r"const\s+REGISTERED_PARTICIPANTS\s*=\s*(\[.*?\])\s*\.map\(", text, re.S)
    if not m:
        raise RuntimeError(f"Could not find REGISTERED_PARTICIPANTS array in {html_path}")
    raw_entries = json.loads(m.group(1))

    roster: Dict[str, Competitor] = {}
    for row in raw_entries:
        if row.get("isAdmin"):
            continue
        bib = str(row["bib"]).strip()
        num_match = re.fullmatch(r"SNG-2026-(\d{4})", bib)
        if not num_match:
            continue
        num = int(num_match.group(1))
        if not (1001 <= num <= 1043):
            continue

        name = str(row["name"]).strip()
        school = SCHOOL_CLEANUP.get(bib, str(row.get("school", "")).strip())
        country = clean_country(str(row.get("country", "")))
        grade = str(row.get("grade", "")).replace(" (or equivalent)", "").strip()

        roster[bib] = Competitor(
            bib=bib,
            name=name,
            school=school,
            country=country,
            grade=grade,
        )

    if len(roster) != 43:
        raise RuntimeError(f"Expected 43 student competitors (1001–1043), found {len(roster)}")
    return roster


# =============================================================================
# PILLOW LOGO INSPECTION, CLEANUP & BASE64 EMBEDDING
# =============================================================================
def _remove_outer_white_flood(im: Image.Image, white_thresh: int = 240, sat_thresh: int = 16) -> Image.Image:
    """Flood-fill outer white/transparent border pixels to transparent, preserving interior white shapes."""
    im = im.convert("RGBA")
    w, h = im.size
    px = im.load()
    visited = bytearray(w * h)
    q: deque[Tuple[int, int]] = deque()

    def is_bg(r: int, g: int, b: int, a: int) -> bool:
        if a < 20:
            return True
        mx, mn = max(r, g, b), min(r, g, b)
        return mn >= white_thresh and (mx - mn) <= sat_thresh

    for x in range(w):
        for y in (0, h - 1):
            if is_bg(*px[x, y]):
                idx = y * w + x
                if not visited[idx]:
                    visited[idx] = 1
                    q.append((x, y))
    for y in range(h):
        for x in (0, w - 1):
            if is_bg(*px[x, y]):
                idx = y * w + x
                if not visited[idx]:
                    visited[idx] = 1
                    q.append((x, y))

    while q:
        x, y = q.popleft()
        px[x, y] = (255, 255, 255, 0)
        for nx, ny in ((x - 1, y), (x + 1, y), (x, y - 1), (x, y + 1)):
            if 0 <= nx < w and 0 <= ny < h:
                idx = ny * w + nx
                if not visited[idx] and is_bg(*px[nx, ny]):
                    visited[idx] = 1
                    q.append((nx, ny))
    return im


def _clean_ksp_checkerboard(im: Image.Image) -> Image.Image:
    """Remove baked neutral checkerboard & top-left corner stamp while preserving crisp red/blue KSP logo."""
    im = im.convert("RGBA")
    w, h = im.size
    px = im.load()
    for y in range(h):
        for x in range(w):
            r, g, b, _ = px[x, y]
            # Remove tiny neutral gray corner watermark in upper-left of source PNG
            if x < int(w * 0.055) and y < int(h * 0.13):
                px[x, y] = (0, 0, 0, 0)
                continue
            sat = max(r, g, b) - min(r, g, b)
            lum = 0.299 * r + 0.587 * g + 0.114 * b
            if sat < 18 and lum > 175:
                px[x, y] = (0, 0, 0, 0)
            elif sat < 45 and lum > 180:
                alpha = int(min(255, max(0, (sat - 12) / 33.0 * 255)))
                px[x, y] = (r, g, b, alpha)
    return im


def _clean_dark_bg_white_logo(im: Image.Image) -> Image.Image:
    """Convert solid dark background into transparency around bright foreground logo (e.g. Jundroo)."""
    im = im.convert("RGBA")
    w, h = im.size
    px = im.load()
    for y in range(h):
        for x in range(w):
            r, g, b, _ = px[x, y]
            lum = 0.299 * r + 0.587 * g + 0.114 * b
            if lum <= 20:
                px[x, y] = (255, 255, 255, 0)
            elif lum < 60:
                alpha = int((lum - 20) / 40.0 * 255)
                px[x, y] = (232, 234, 240, alpha)
    return im


def _clean_solid_white_bg(im: Image.Image) -> Image.Image:
    """Remove solid white background cleanly for dark/colored wordmarks on opaque white (e.g. Axilone)."""
    im = im.convert("RGBA")
    im.thumbnail((840, 420), Image.Resampling.LANCZOS)
    w, h = im.size
    px = im.load()
    for y in range(h):
        for x in range(w):
            r, g, b, _ = px[x, y]
            sat = max(r, g, b) - min(r, g, b)
            lum = 0.299 * r + 0.587 * g + 0.114 * b
            if lum > 246 and sat < 12:
                px[x, y] = (r, g, b, 0)
            elif lum > 220 and sat < 20:
                alpha = int(max(0, min(255, (246 - lum) / 26.0 * 255)))
                px[x, y] = (r, g, b, alpha)
    return im


def inspect_and_encode_logo(key: str, path: Path) -> LogoAsset:
    """Inspect transparency/luminance with Pillow, optimize for 300+ DPI print, and base64-encode."""
    if not path.exists():
        return LogoAsset(
            key=key,
            filename=path.name,
            exists=False,
            data_uri=None,
            needs_dark_pill=False,
            notes="missing -> typographic fallback",
        )

    im = Image.open(path).convert("RGBA")
    sample = im.copy()
    sample.thumbnail((240, 240))
    sw, sh = sample.size
    corners = [
        sample.getpixel((0, 0)),
        sample.getpixel((sw - 1, 0)),
        sample.getpixel((0, sh - 1)),
        sample.getpixel((sw - 1, sh - 1)),
    ]
    corners_opaque = all(c[3] > 200 for c in corners)
    corner_lum = sum(0.299 * c[0] + 0.587 * c[1] + 0.114 * c[2] for c in corners) / 4.0

    # Pillow 14 compatibility: use get_flattened_data if available, else getdata
    raw_pixels = (
        list(sample.get_flattened_data())
        if hasattr(sample, "get_flattened_data")
        else list(sample.getdata())
    )
    opaque = [p for p in raw_pixels if p[3] >= 220]
    opq_lums = [0.299 * r + 0.587 * g + 0.114 * b for r, g, b, _ in opaque] if opaque else [0.0]
    opq_white_pct = sum(1 for l in opq_lums if l > 215) / max(1, len(opq_lums)) * 100.0
    opq_fill_ratio = len(opaque) / max(1, len(raw_pixels))

    # Detect checkerboard corners (e.g., ksp.png has alternating ~255 and ~231 neutral gray squares)
    c15 = im.getpixel((min(15, im.width - 1), 0))
    has_checkerboard = (
        corners_opaque
        and corner_lum > 220
        and abs(corners[0][0] - c15[0]) >= 15
        and max(c15[:3]) - min(c15[:3]) < 10
    )

    needs_dark_pill = False
    notes: List[str] = []

    if has_checkerboard or key == "ksp":
        im = _clean_ksp_checkerboard(im)
        notes.append("checkerboard removed")
    elif corners_opaque and corner_lum < 45.0:
        # Solid dark background with light/white logo (e.g., jundroo.png)
        needs_dark_pill = True
        im = _clean_dark_bg_white_logo(im)
        notes.append("dark-bg logo -> #15161A pill")
    elif not corners_opaque and opq_white_pct > 45.0 and opq_fill_ratio < 0.65:
        # Predominantly white foreground on transparent background (e.g., universe_sandbox.png)
        needs_dark_pill = True
        notes.append(f"white-on-alpha ({opq_white_pct:.0f}%) -> #15161A pill")
    elif key == "software_bisque":
        im = _remove_outer_white_flood(im, white_thresh=240, sat_thresh=16)
        notes.append("outer white trimmed")
    elif corners_opaque and corner_lum > 245.0 and key != "photopills":
        # Solid white background wordmark (e.g., axilone.png)
        im = _clean_solid_white_bg(im)
        notes.append("white bg keyed out")
    else:
        notes.append("light-ground native")

    # Tight crop to visible alpha bounding box
    if key == "universe_sandbox":
        im.thumbnail((560, 240), Image.Resampling.LANCZOS)
        # Trim very faint drop-shadow fringe so the wordmark fills the dark pill crisply
        alpha_mask = im.getchannel("A").point(lambda a: 255 if a > 55 else 0)
        tight = alpha_mask.getbbox()
        if tight:
            pad = 8
            tight = (
                max(0, tight[0] - pad),
                max(0, tight[1] - pad),
                min(im.width, tight[2] + pad),
                min(im.height, tight[3] + pad),
            )
            im = im.crop(tight)
    else:
        bbox = im.getbbox()
        if bbox:
            im = im.crop(bbox)
        max_dim = (360, 360) if key == "supernova" else (480, 220)
        im.thumbnail(max_dim, Image.Resampling.LANCZOS)

    buf = io.BytesIO()
    im.save(buf, format="PNG", optimize=True)
    b64 = base64.b64encode(buf.getvalue()).decode("ascii")
    return LogoAsset(
        key=key,
        filename=path.name,
        exists=True,
        data_uri=f"data:image/png;base64,{b64}",
        needs_dark_pill=needs_dark_pill,
        width=im.width,
        height=im.height,
        opaque_white_pct=opq_white_pct,
        notes=", ".join(notes),
    )


def inspect_and_encode_signature(key: str, path: Path) -> LogoAsset:
    """Process a real handwritten signature PNG if present:
    - Near-white digital backgrounds (RGB > 220) -> transparent alpha
    - Photographed paper backgrounds (e.g. shaded tan/gray paper) -> adaptive local background subtraction
    - Connected-component filter strips isolated stray dust specks before auto-cropping
    - Preserves ultra-fine pen strokes and boosts ink contrast to rich archival midnight ink
    """
    if not path.exists():
        return LogoAsset(
            key=key,
            filename=f"signatures/{path.name}",
            exists=False,
            data_uri=None,
            needs_dark_pill=False,
            notes="not provided -> printed line + verification seal",
        )

    im = Image.open(path).convert("RGBA")
    w, h = im.size
    gray = im.convert("L")
    corners = [gray.getpixel((x, y)) for x in (min(2, w - 1), max(0, w - 3)) for y in (min(2, h - 1), max(0, h - 3))]
    bg_est = sum(corners) / max(1, len(corners))

    alpha = Image.new("L", (w, h), 0)
    a_px = alpha.load()
    g_px = gray.load()
    rgba_px = im.load()

    if bg_est >= 230.0:
        # Clean white-background digital signature (RGB > 220 -> transparent alpha)
        for y in range(h):
            for x in range(w):
                r, g, b, a0 = rgba_px[x, y]
                if a0 < 15 or (r > 220 and g > 220 and b > 220):
                    a_px[x, y] = 0
                else:
                    lum = g_px[x, y]
                    strength = min(1.0, max(0.0, (220.0 - lum) / 140.0))
                    a_px[x, y] = int(min(255, (strength ** 0.65) * a0))
        mode_note = "white-bg>220 transparent"
    else:
        # Photographed paper signature: adaptive local background subtraction
        blur = gray.filter(ImageFilter.GaussianBlur(radius=18))
        b_px = blur.load()
        for y in range(h):
            for x in range(w):
                diff = b_px[x, y] - g_px[x, y]
                if diff <= 16:
                    a_px[x, y] = 0
                else:
                    strength = min(1.0, (diff - 16.0) / 30.0)
                    a_px[x, y] = int(min(255, (strength ** 0.55) * 255))
        mode_note = f"paper-bg ({bg_est:.0f}) adaptive extract"

    # Strip tiny isolated dust specks before auto-cropping via coarse component filter
    scale = min(1.0, 320.0 / max(w, h))
    sw, sh = max(1, int(w * scale)), max(1, int(h * scale))
    small_a = alpha.resize((sw, sh), Image.Resampling.BILINEAR)
    sp = small_a.load()
    vis = bytearray(sw * sh)
    kept_boxes = []
    for sy in range(sh):
        for sx in range(sw):
            if sp[sx, sy] > 18 and not vis[sy * sw + sx]:
                stack = [(sx, sy)]
                vis[sy * sw + sx] = 1
                cnt = 0
                x0 = x1 = sx
                y0 = y1 = sy
                while stack:
                    cx, cy = stack.pop()
                    cnt += 1
                    if cx < x0: x0 = cx
                    if cx > x1: x1 = cx
                    if cy < y0: y0 = cy
                    if cy > y1: y1 = cy
                    for dx in (-2, -1, 0, 1, 2):
                        for dy in (-2, -1, 0, 1, 2):
                            nx, ny = cx + dx, cy + dy
                            if 0 <= nx < sw and 0 <= ny < sh:
                                idx = ny * sw + nx
                                if not vis[idx] and sp[nx, ny] > 18:
                                    vis[idx] = 1
                                    stack.append((nx, ny))
                if cnt >= 12:
                    kept_boxes.append((x0, y0, x1 + 1, y1 + 1))

    if kept_boxes:
        bx0 = max(0, int(min(b[0] for b in kept_boxes) / scale) - 8)
        by0 = max(0, int(min(b[1] for b in kept_boxes) / scale) - 8)
        bx1 = min(w, int(max(b[2] for b in kept_boxes) / scale) + 8)
        by1 = min(h, int(max(b[3] for b in kept_boxes) / scale) + 8)
        alpha = alpha.crop((bx0, by0, bx1, by1))
        tb = alpha.point(lambda v: 255 if v > 30 else 0).getbbox()
        if tb:
            alpha = alpha.crop(tb)
    else:
        tb = alpha.getbbox()
        if tb:
            alpha = alpha.crop(tb)

    # Preserve ultra-fine pen strokes on large canvases before thumbnailing
    cw, ch = alpha.size
    flat_alpha = list(alpha.get_flattened_data()) if hasattr(alpha, "get_flattened_data") else list(alpha.getdata())
    ink_ratio = sum(1 for v in flat_alpha if v > 40) / max(1, cw * ch)
    if max(cw, ch) > 650 and ink_ratio < 0.03:
        alpha = alpha.filter(ImageFilter.MaxFilter(5))
    elif max(cw, ch) > 350 and ink_ratio < 0.06:
        alpha = alpha.filter(ImageFilter.MaxFilter(3))

    out = Image.new("RGBA", alpha.size, (20, 27, 45, 255))
    out.putalpha(alpha)
    out.thumbnail((420, 170), Image.Resampling.LANCZOS)

    buf = io.BytesIO()
    out.save(buf, format="PNG", optimize=True)
    b64 = base64.b64encode(buf.getvalue()).decode("ascii")
    return LogoAsset(
        key=key,
        filename=f"signatures/{path.name}",
        exists=True,
        data_uri=f"data:image/png;base64,{b64}",
        needs_dark_pill=False,
        width=out.width,
        height=out.height,
        notes=f"real signature ({mode_note}, ink boosted, auto-cropped)",
    )


def load_all_logo_assets() -> Dict[str, LogoAsset]:
    """Load Supernova Guide brand logo, all 9 sponsor logos, and optional committee signatures."""
    assets: Dict[str, LogoAsset] = {}
    assets["supernova"] = inspect_and_encode_logo("supernova", ASSETS_IMG / "supernova_logo.png")
    for spec in SPONSOR_SPECS:
        for key, filename in spec["files"]:
            assets[key] = inspect_and_encode_logo(key, SPONSORS_DIR / filename)
    for _, _, sig_key, sig_filename in COMMITTEE:
        assets[sig_key] = inspect_and_encode_signature(sig_key, SIGNATURES_DIR / sig_filename)
    return assets


# =============================================================================
# BUILD ALL 49 CERTIFICATE SPECIFICATIONS
# =============================================================================
def build_certificates(roster: Dict[str, Competitor]) -> List[CertificateSpec]:
    """Build exact specifications for all 49 SAC 2026 certificates."""
    certs: List[CertificateSpec] = []
    finalist_bibs = set()

    # -------------------------------------------------------------------------
    # 1–4. GRAND FINALISTS (Top 15 Entries: 18 Individuals + 3 Special Team Diplomas)
    # -------------------------------------------------------------------------
    for entry in FINALIST_ENTRIES:
        rank = entry["rank"]
        ordinal = entry["ordinal"]
        score = entry["score"]
        tier_key = entry["tier_key"]
        tier_label = entry["tier_label"]
        tier_slug = entry["tier_slug"]
        bibs = entry["bibs"]
        team_name = entry["team_name"]

        for bib in bibs:
            finalist_bibs.add(bib)
            comp = roster[bib]
            is_duo = len(bibs) == 2

            duo_note: Optional[str] = None
            if is_duo:
                partner_bib = [b for b in bibs if b != bib][0]
                partner = roster[partner_bib]
                if partner.country != comp.country:
                    duo_note = (
                        f"Official Duo Entry: {team_name}  ·  "
                        f"Teammate: {partner.name} ({partner.bib}, {partner.country})"
                    )
                else:
                    duo_note = (
                        f"Official Duo Entry: {team_name}  ·  "
                        f"Teammate: {partner.name} ({partner.bib})"
                    )

            if tier_key == "gold":
                seal_top, seal_main, seal_bottom = "SAC 2026", "1ST", "GOLD MEDAL"
                tier_group = "Gold Medal"
                citation = (
                    f"in recognition of achieving <strong>First Place Overall ({score})</strong> as "
                    f"<strong>Grand Champion</strong> of the {EVENT_TITLE}, demonstrating exceptional "
                    f"mastery of theoretical, analytical, and observational astrophysics across the "
                    f"Open Qualifier and proctored Grand Final (The&nbsp;POTD&nbsp;War)."
                )
            elif tier_key == "silver":
                seal_top, seal_main, seal_bottom = "SAC 2026", f"#{rank}", "SILVER MEDAL"
                tier_group = "Silver Medal"
                if is_duo:
                    citation = (
                        f"in recognition of earning the <strong>Silver Medal</strong> and finishing "
                        f"<strong>{ordinal} Overall ({score})</strong> as a member of <strong>{html.escape(team_name)}</strong> "
                        f"in the {EVENT_TITLE}, demonstrating outstanding astrophysical problem-solving "
                        f"across the Open Qualifier and proctored Grand Final (The&nbsp;POTD&nbsp;War)."
                    )
                else:
                    citation = (
                        f"in recognition of earning the <strong>Silver Medal</strong> and finishing "
                        f"<strong>{ordinal} Overall ({score})</strong> in the {EVENT_TITLE}, "
                        f"demonstrating outstanding command of astrophysics across the "
                        f"Open Qualifier and proctored Grand Final (The&nbsp;POTD&nbsp;War)."
                    )
            elif tier_key == "bronze":
                seal_top, seal_main, seal_bottom = "SAC 2026", f"#{rank}", "BRONZE MEDAL"
                tier_group = "Bronze Medal"
                citation = (
                    f"in recognition of earning the <strong>Bronze Medal</strong> and finishing "
                    f"<strong>{ordinal} Overall ({score})</strong> in the {EVENT_TITLE}, "
                    f"demonstrating distinguished scientific rigor across the "
                    f"Open Qualifier and proctored Grand Final (The&nbsp;POTD&nbsp;War)."
                )
            else:
                seal_top, seal_main, seal_bottom = "SAC 2026", f"#{rank}", "FINALIST"
                tier_group = "Honorable Mention"
                if is_duo:
                    citation = (
                        f"in recognition of earning an <strong>Honorable Mention</strong> as a Grand Finalist "
                        f"finishing <strong>{ordinal} Overall ({score})</strong> with <strong>{html.escape(team_name)}</strong> "
                        f"in the {EVENT_TITLE}, demonstrating strong analytical skill across the "
                        f"Open Qualifier and proctored Grand Final (The&nbsp;POTD&nbsp;War)."
                    )
                else:
                    citation = (
                        f"in recognition of earning an <strong>Honorable Mention</strong> as a Grand Finalist "
                        f"finishing <strong>{ordinal} Overall ({score})</strong> in the {EVENT_TITLE}, "
                        f"demonstrating strong analytical skill across the "
                        f"Open Qualifier and proctored Grand Final (The&nbsp;POTD&nbsp;War)."
                    )

            fname = f"{comp.bib}_{sanitize_filename_token(comp.name)}_{tier_slug}.pdf"
            certs.append(
                CertificateSpec(
                    cert_id=f"{comp.bib}-{tier_key}",
                    filename=fname,
                    tier_key=tier_key,
                    tier_group=tier_group,
                    cert_heading="CERTIFICATE OF ACHIEVEMENT",
                    tier_badge=tier_label.upper(),
                    tier_subbadge=f"{ordinal} Overall  ·  Official Score: {score}",
                    seal_top=seal_top,
                    seal_main=seal_main,
                    seal_bottom=seal_bottom,
                    intro_line="This official diploma is proudly awarded to",
                    recipient_title=comp.name,
                    bib_display=comp.bib,
                    footer_bib_label="Candidate Bib ID",
                    school=comp.school,
                    country=comp.country,
                    duo_note=duo_note,
                    citation_html=citation,
                    is_team_diploma=False,
                )
            )

        # Special Team Diploma for official Duo Finalist Teams
        if entry["issue_team_diploma"] and team_name:
            m1, m2 = roster[bibs[0]], roster[bibs[1]]
            bib_pair_short = f"{m1.bib}_{m2.bib.split('-')[-1]}"
            team_slug = sanitize_filename_token(team_name)
            team_fname = f"{bib_pair_short}_{team_slug}_{tier_slug}_Team.pdf"
            team_countries = (
                m1.country if m1.country == m2.country else f"{m1.country} & {m2.country}"
            )
            team_schools = (
                m1.school if m1.school == m2.school else f"{m1.school}  /  {m2.school}"
            )
            if tier_key == "silver":
                seal_top, seal_main, seal_bottom = "DUO TEAM", f"#{rank}", "SILVER MEDAL"
                tier_group = "Silver Medal"
                team_badge = "SILVER MEDAL — OFFICIAL DUO TEAM"
                team_subbadge = f"{ordinal} Overall  ·  Official Score: {score}"
                team_award_phrase = "the <strong>Silver Medal</strong>"
            else:
                seal_top, seal_main, seal_bottom = "DUO TEAM", f"#{rank}", "HONORABLE"
                tier_group = "Honorable Mention"
                team_badge = "HONORABLE MENTION — OFFICIAL DUO TEAM"
                team_subbadge = f"{ordinal} Overall  ·  Grand Finalist  ·  Official Score: {score}"
                team_award_phrase = "an <strong>Honorable Mention</strong> as Grand Finalists"

            team_citation = (
                f"in recognition of earning {team_award_phrase} and finishing "
                f"<strong>{ordinal} Overall ({score})</strong> as an official Duo Team in the {EVENT_TITLE}, "
                f"exemplifying collaborative excellence across the Open Qualifier and proctored Grand Final (The&nbsp;POTD&nbsp;War)."
            )
            certs.append(
                CertificateSpec(
                    cert_id=f"TEAM-{rank}-{team_slug}",
                    filename=team_fname,
                    tier_key=tier_key,
                    tier_group=tier_group,
                    cert_heading="SPECIAL TEAM DIPLOMA",
                    tier_badge=team_badge,
                    tier_subbadge=team_subbadge,
                    seal_top=seal_top,
                    seal_main=seal_main,
                    seal_bottom=seal_bottom,
                    intro_line="This official team diploma is proudly awarded to",
                    recipient_title=team_name,
                    bib_display=f"{m1.bib} & {m2.bib}",
                    footer_bib_label="Candidate Bib ID",
                    school=team_schools,
                    country=team_countries,
                    team_members=[m1, m2],
                    citation_html=team_citation,
                    is_team_diploma=True,
                )
            )

    # -------------------------------------------------------------------------
    # 5. SAC 2026 AMBASSADOR CERTIFICATES (Top 3 Verified Referrers)
    # -------------------------------------------------------------------------
    amb_place_map = {1: "1ST PLACE", 2: "2ND PLACE", 3: "3RD PLACE"}
    for amb in AMBASSADOR_ENTRIES:
        comp = roster[amb["bib"]]
        amb_rank = amb["rank"]
        amb_ordinal = amb["ordinal"]
        amb_place = amb_place_map[amb_rank]
        ref_note = amb["referral_note"]
        fname = f"{comp.bib}_{sanitize_filename_token(comp.name)}_{amb['tier_slug']}.pdf"
        citation = (
            f"in grateful recognition of achieving <strong>{amb_ordinal}</strong> among the Top 3 Verified Referrers "
            f"(<strong>{html.escape(ref_note)}</strong>) for the {EVENT_TITLE}, "
            f"advancing international student outreach and strengthening the global astrophysics olympiad community."
        )
        certs.append(
            CertificateSpec(
                cert_id=f"{comp.bib}-ambassador-{amb_rank}",
                filename=fname,
                tier_key="ambassador",
                tier_group="Ambassador",
                cert_heading="SAC 2026 AMBASSADOR CERTIFICATE",
                tier_badge=f"SAC 2026 AMBASSADOR — {amb_place}",
                tier_subbadge=f"Top 3 Verified Referrers  ·  {ref_note}",
                seal_top="AMBASSADOR",
                seal_main=f"#{amb_rank}",
                seal_bottom="OUTREACH",
                intro_line="This official certificate of distinction is proudly presented to",
                recipient_title=comp.name,
                bib_display=comp.bib,
                footer_bib_label="Candidate Bib ID",
                school=comp.school,
                country=comp.country,
                citation_html=citation,
                is_team_diploma=False,
            )
        )

    # -------------------------------------------------------------------------
    # 6. CERTIFICATES OF PARTICIPATION (All 25 Remaining Competitors)
    # -------------------------------------------------------------------------
    remaining_bibs = sorted(b for b in roster.keys() if b not in finalist_bibs)
    if len(remaining_bibs) != 25:
        raise RuntimeError(
            f"Expected 25 remaining Participation competitors, got {len(remaining_bibs)}"
        )

    for bib in remaining_bibs:
        comp = roster[bib]
        duo_note = None
        if bib in PHASE1_DUO_PAIRS:
            pair_name, partner_bib = PHASE1_DUO_PAIRS[bib]
            partner = roster[partner_bib]
            duo_note = (
                f"Official Duo Entry: {pair_name}  ·  "
                f"Teammate: {partner.name} ({partner.bib}, {partner.country})"
            )

        fname = f"{comp.bib}_{sanitize_filename_token(comp.name)}_Participation.pdf"
        citation = (
            f"in recognition of dedicated participation and scientific commitment in the "
            f"<strong>{EVENT_TITLE}</strong> (Phase 1: Open Qualifier · 14 November 2026), "
            f"representing their institution and country among 43 competitors from 12 nations."
        )
        certs.append(
            CertificateSpec(
                cert_id=f"{comp.bib}-participation",
                filename=fname,
                tier_key="participation",
                tier_group="Participation",
                cert_heading="CERTIFICATE OF PARTICIPATION",
                tier_badge="OFFICIAL PARTICIPANT",
                tier_subbadge="Phase 1: Open Qualifier  ·  International Field of 43 Competitors",
                seal_top="SAC 2026",
                seal_main="★",
                seal_bottom="VERIFIED",
                intro_line="This official certificate is proudly presented to",
                recipient_title=comp.name,
                bib_display=comp.bib,
                footer_bib_label="Candidate Bib ID",
                school=comp.school,
                country=comp.country,
                duo_note=duo_note,
                citation_html=citation,
                is_team_diploma=False,
            )
        )

    return certs


# =============================================================================
# SHARED CERTIFICATE CSS & VECTOR SVG GENERATORS
# =============================================================================
CERT_FONTS_LINK = (
    "https://fonts.googleapis.com/css2?"
    "family=Bricolage+Grotesque:wght@500;600;700;800&"
    "family=Cormorant+Garamond:ital,wght@0,600;0,700;1,500;1,600&"
    "family=Inter:wght@400;500;600;700&"
    "family=Noto+Serif:ital,wght@0,600;0,700;1,500&"
    "family=Space+Mono:wght@400;700&display=swap"
)

CERTIFICATE_CORE_CSS = r"""
/* ==========================================================================
   PRINT-EXACT A4 LANDSCAPE CERTIFICATE DESIGN (297mm x 210mm)
   ========================================================================== */
@page {
    size: A4 landscape;
    margin: 0;
}

* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
}

.cert-page {
    position: relative;
    width: 297mm;
    height: 210mm;
    overflow: hidden;
    background: radial-gradient(ellipse at 50% 42%, #FFFFFF 0%, #FCFBF7 56%, #F3EEE1 100%);
    color: #101115;
    font-family: 'Inter', 'DejaVu Sans', 'Liberation Sans', sans-serif;
    page-break-after: always;
    break-after: page;
    page-break-inside: avoid;
    break-inside: avoid;
}

.cert-page:last-child {
    page-break-after: auto;
    break-after: auto;
}

/* Tier Color Palettes */
.tier-gold {
    --tier-primary: #996E00;
    --tier-secondary: #C89B1E;
    --tier-soft: rgba(200, 155, 30, 0.11);
    --tier-border: rgba(153, 110, 0, 0.42);
    --tier-badge-bg: linear-gradient(135deg, #FFF7DF 0%, #F8E5A8 100%);
    --tier-badge-text: #6B4B00;
    --seal-ring: #B8860B;
    --seal-fill: #FDF6DF;
    --seal-accent: #8A6100;
}

.tier-silver {
    --tier-primary: #445166;
    --tier-secondary: #6C7D96;
    --tier-soft: rgba(108, 125, 150, 0.10);
    --tier-border: rgba(68, 81, 102, 0.38);
    --tier-badge-bg: linear-gradient(135deg, #F8FAFC 0%, #E2E8F0 100%);
    --tier-badge-text: #273244;
    --seal-ring: #5C6B82;
    --seal-fill: #F1F5F9;
    --seal-accent: #334155;
}

.tier-bronze {
    --tier-primary: #8C4719;
    --tier-secondary: #B86832;
    --tier-soft: rgba(184, 104, 50, 0.10);
    --tier-border: rgba(140, 71, 25, 0.40);
    --tier-badge-bg: linear-gradient(135deg, #FFF4EC 0%, #F1D3BD 100%);
    --tier-badge-text: #68310C;
    --seal-ring: #A35724;
    --seal-fill: #FBF1E9;
    --seal-accent: #7A3B12;
}

.tier-honorable {
    --tier-primary: #1B4268;
    --tier-secondary: #2D6A9F;
    --tier-soft: rgba(45, 106, 159, 0.09);
    --tier-border: rgba(27, 66, 104, 0.36);
    --tier-badge-bg: linear-gradient(135deg, #EEF6FC 0%, #D6E7F5 100%);
    --tier-badge-text: #143352;
    --seal-ring: #255885;
    --seal-fill: #EFF6FC;
    --seal-accent: #183D5E;
}

.tier-ambassador {
    --tier-primary: #0F5C52;
    --tier-secondary: #1A8476;
    --tier-soft: rgba(26, 132, 118, 0.09);
    --tier-border: rgba(15, 92, 82, 0.38);
    --tier-badge-bg: linear-gradient(135deg, #ECFBF8 0%, #CEEFE8 100%);
    --tier-badge-text: #0A433C;
    --seal-ring: #137064;
    --seal-fill: #EEFBF8;
    --seal-accent: #0C4F46;
}

.tier-participation {
    --tier-primary: #2B364C;
    --tier-secondary: #4D5E7E;
    --tier-soft: rgba(43, 54, 76, 0.07);
    --tier-border: rgba(43, 54, 76, 0.30);
    --tier-badge-bg: linear-gradient(135deg, #F5F7FA 0%, #E5E9F0 100%);
    --tier-badge-text: #222B3C;
    --seal-ring: #3D4C68;
    --seal-fill: #F4F6FA;
    --seal-accent: #273247;
}

/* Full-bleed celestial border & astrolabe watermark SVG */
.cert-bg-svg {
    position: absolute;
    inset: 0;
    width: 297mm;
    height: 210mm;
    pointer-events: none;
    z-index: 1;
}

/* Main Safe Layout Container inside geometric frame */
.cert-inner {
    position: relative;
    z-index: 2;
    width: 100%;
    height: 100%;
    padding: 13mm 17mm 12.2mm 17mm;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

/* 1. TOP HEADER BAND */
.cert-header {
    display: grid;
    grid-template-columns: 52mm 1fr 52mm;
    align-items: center;
    gap: 4mm;
    padding-bottom: 3.2mm;
    border-bottom: 0.75pt solid rgba(16, 17, 21, 0.14);
}

.brand-lockup {
    display: flex;
    align-items: center;
    gap: 3mm;
}

.brand-logo {
    width: 16.5mm;
    height: 16.5mm;
    object-fit: contain;
    flex-shrink: 0;
    border-radius: 50%;
}

.brand-text-wrap {
    display: flex;
    flex-direction: column;
    gap: 0.5mm;
}

.brand-name {
    font-family: 'Bricolage Grotesque', 'Inter', 'DejaVu Sans', sans-serif;
    font-size: 11.2pt;
    font-weight: 800;
    letter-spacing: 0.05em;
    color: #101115;
    line-height: 1.08;
    text-transform: uppercase;
}

.brand-domain {
    font-family: 'Space Mono', 'DejaVu Sans Mono', 'Liberation Mono', monospace;
    font-size: 6.7pt;
    font-weight: 700;
    color: #525C6E;
    letter-spacing: 0.04em;
}

.event-header-center {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1mm;
}

.event-subtitle {
    font-family: 'Space Mono', 'DejaVu Sans Mono', 'Liberation Mono', monospace;
    font-size: 6.2pt;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.11em;
    color: var(--tier-primary);
    white-space: nowrap;
}

.event-title {
    font-family: 'Bricolage Grotesque', 'Inter', 'DejaVu Sans', sans-serif;
    font-size: 13.4pt;
    font-weight: 800;
    color: #101115;
    letter-spacing: -0.01em;
    line-height: 1.15;
    white-space: nowrap;
}

.event-dates {
    font-family: 'Inter', 'DejaVu Sans', sans-serif;
    font-size: 6.8pt;
    font-weight: 500;
    color: #4A5568;
    letter-spacing: 0.015em;
    white-space: nowrap;
}

.seal-wrap {
    display: flex;
    justify-content: flex-end;
    align-items: center;
}

.seal-svg {
    width: 19.5mm;
    height: 19.5mm;
    display: block;
}

/* 2. AWARD BODY & RECIPIENT HERO */
.cert-body {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 1.8mm 4mm 1.4mm 4mm;
    gap: 2.0mm;
}

.cert-doc-heading {
    font-family: 'Space Mono', 'DejaVu Sans Mono', 'Liberation Mono', monospace;
    font-size: 7.5pt;
    font-weight: 700;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    color: #4A5568;
}

.tier-ribbon-block {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.1mm;
}

.tier-pill {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 1.4mm 6.5mm;
    border-radius: 99px;
    background: var(--tier-badge-bg);
    border: 0.9pt solid var(--tier-border);
    font-family: 'Bricolage Grotesque', 'Inter', 'DejaVu Sans', sans-serif;
    font-size: 11.2pt;
    font-weight: 800;
    letter-spacing: 0.09em;
    color: var(--tier-badge-text);
    line-height: 1.2;
}

.tier-subline {
    font-family: 'Space Mono', 'DejaVu Sans Mono', 'Liberation Mono', monospace;
    font-size: 7.4pt;
    font-weight: 700;
    color: var(--tier-primary);
    letter-spacing: 0.05em;
}

.intro-phrase {
    font-family: 'Cormorant Garamond', 'Noto Serif', 'DejaVu Serif', Georgia, serif;
    font-style: italic;
    font-weight: 600;
    font-size: 11.5pt;
    color: #4A5568;
    margin-top: 0.4mm;
}

.recipient-name {
    font-family: 'Cormorant Garamond', 'Noto Serif', 'DejaVu Serif', Georgia, serif;
    font-weight: 700;
    font-size: 31pt;
    line-height: 1.05;
    color: #0E1016;
    letter-spacing: 0.01em;
    padding: 0 6mm;
    max-width: 248mm;
}

.recipient-name.has-greek {
    font-family: 'Noto Serif', 'DejaVu Serif', 'Inter', 'DejaVu Sans', serif;
    font-size: 26.5pt;
    letter-spacing: 0.015em;
}

.recipient-name.name-long {
    font-size: 26.5pt;
}

.recipient-name.name-xlong {
    font-size: 23.5pt;
}

.name-rule {
    width: 78mm;
    height: 1.2pt;
    background: linear-gradient(90deg, transparent 0%, var(--tier-secondary) 22%, var(--tier-primary) 50%, var(--tier-secondary) 78%, transparent 100%);
    margin: 0.4mm auto 0.8mm auto;
}

.credentials-row {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 2.2mm;
    font-size: 8.8pt;
    color: #1F2937;
    max-width: 244mm;
    line-height: 1.35;
}

.bib-chip {
    font-family: 'Space Mono', 'DejaVu Sans Mono', 'Liberation Mono', monospace;
    font-size: 7.6pt;
    font-weight: 700;
    color: #101115;
    background: rgba(16, 17, 21, 0.06);
    border: 0.6pt solid rgba(16, 17, 21, 0.22);
    border-radius: 3.5px;
    padding: 0.5mm 2.2mm;
    letter-spacing: 0.03em;
}

.cred-sep {
    color: var(--tier-secondary);
    font-weight: 700;
}

.cred-school {
    font-weight: 600;
    color: #1E2430;
}

.cred-country {
    font-weight: 700;
    color: var(--tier-primary);
}

.duo-meta-line {
    font-family: 'Inter', 'DejaVu Sans', 'Noto Serif', sans-serif;
    font-size: 8.1pt;
    font-weight: 600;
    color: #2D3748;
    background: var(--tier-soft);
    border: 0.6pt solid var(--tier-border);
    border-radius: 4px;
    padding: 0.8mm 3.8mm;
    letter-spacing: 0.01em;
}

/* Special Team Diploma 2-Member Roster Grid */
.team-members-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(86mm, 108mm));
    gap: 5mm;
    margin-top: 0.5mm;
}

.team-member-card {
    background: rgba(255, 255, 255, 0.72);
    border: 0.7pt solid var(--tier-border);
    border-radius: 5px;
    padding: 2.1mm 4mm;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.7mm;
}

.tm-name {
    font-family: 'Cormorant Garamond', 'Liberation Serif', Georgia, serif;
    font-size: 13.5pt;
    font-weight: 700;
    color: #101115;
    line-height: 1.1;
}

.tm-meta {
    font-size: 7.4pt;
    color: #374151;
    line-height: 1.3;
}

.tm-bib {
    font-family: 'Space Mono', 'Liberation Mono', monospace;
    font-size: 6.9pt;
    font-weight: 700;
    color: var(--tier-primary);
}

.citation-text {
    font-family: 'Inter', 'DejaVu Sans', 'Noto Serif', sans-serif;
    font-size: 8.45pt;
    line-height: 1.48;
    color: #2D3748;
    max-width: 230mm;
    margin-top: 0.7mm;
    text-wrap: balance;
}

.citation-text strong {
    color: #101115;
    font-weight: 700;
}

/* 3. SIGNATURES & COMMITTEE VERIFICATION BLOCK */
.signatures-row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10mm;
    padding: 0 10mm 2.3mm 10mm;
    align-items: end;
}

.signatures-row.with-committee-seal {
    grid-template-columns: 1fr 1fr 1fr 27mm;
    gap: 7mm;
    padding: 0 6mm 2.3mm 8mm;
    align-items: end;
}

.sig-col {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
}

.sig-img-slot {
    height: 12.2mm;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    margin-bottom: 0.7mm;
}

.sig-real-img {
    max-height: 11.8mm;
    max-width: 50mm;
    width: auto;
    height: auto;
    object-fit: contain;
    display: block;
}

.sig-blank-space {
    height: 6.5mm;
}

.sig-line {
    width: 54mm;
    height: 0.75pt;
    background: rgba(16, 17, 21, 0.42);
    margin-bottom: 1.4mm;
}

.sig-name {
    font-family: 'Bricolage Grotesque', 'Inter', 'DejaVu Sans', sans-serif;
    font-size: 9.2pt;
    font-weight: 700;
    color: #101115;
    line-height: 1.15;
}

.sig-role {
    font-family: 'Inter', 'DejaVu Sans', sans-serif;
    font-size: 7pt;
    font-weight: 500;
    color: #525C6E;
    margin-top: 0.35mm;
}

.committee-seal-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-bottom: 0.4mm;
}

.committee-seal-svg {
    width: 24mm;
    height: 24mm;
    display: block;
}

/* 4. MANDATORY 9-SPONSOR BAR */
.sponsors-bar {
    background: rgba(16, 17, 21, 0.024);
    border-top: 0.7pt solid rgba(16, 17, 21, 0.14);
    border-bottom: 0.7pt solid rgba(16, 17, 21, 0.14);
    padding: 2.0mm 4mm 1.9mm 4mm;
    display: flex;
    flex-direction: column;
    gap: 1.8mm;
}

.sponsors-bar-title {
    font-family: 'Space Mono', 'Liberation Mono', monospace;
    font-size: 5.9pt;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.2em;
    color: #525C6E;
    text-align: center;
}

.sponsors-row {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    gap: 4mm;
}

.sponsor-slot {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.8mm;
    min-width: 0;
}

.sponsor-visual {
    height: 9.6mm;
    display: flex;
    align-items: center;
    justify-content: center;
}

.sponsor-visual.dark-pill {
    height: 8.2mm;
    margin: 0.7mm 0;
    background: #15161A;
    border-radius: 4.5px;
    padding: 1.1mm 3.4mm;
    border: 0.5pt solid rgba(255, 255, 255, 0.08);
}

.sponsor-img {
    max-height: 9.0mm;
    max-width: 34mm;
    width: auto;
    height: auto;
    object-fit: contain;
    display: block;
}

.sponsor-visual.dark-pill .sponsor-img {
    max-height: 6.2mm;
    max-width: 31mm;
}

.sponsor-img.img-jundroo {
    max-height: 4.6mm !important;
    max-width: 26mm !important;
}

.sponsor-img.img-axilone {
    max-height: 5.6mm;
    max-width: 26mm;
}

.sponsor-img.img-siril {
    max-height: 8.6mm;
    max-width: 9.2mm;
}

.sponsor-img.img-ksp {
    max-height: 9.0mm;
    max-width: 35mm;
}

.sponsor-img.img-aops {
    max-height: 8.0mm;
    max-width: 31mm;
}

.sponsor-img.img-photopills {
    width: 7.4mm;
    height: 7.4mm;
    border-radius: 1.8mm;
    object-fit: cover;
}

.sponsor-pair {
    display: inline-flex;
    align-items: center;
    gap: 2.2mm;
}

.sponsor-pair-sep {
    width: 0.6pt;
    height: 5.8mm;
    background: rgba(16, 17, 21, 0.2);
}

.photopills-lockup {
    display: inline-flex;
    align-items: center;
    gap: 1.8mm;
}

.photopills-wordmark {
    font-family: 'Bricolage Grotesque', 'Inter', sans-serif;
    font-size: 9.0pt;
    font-weight: 800;
    color: #15161A;
    letter-spacing: -0.01em;
}

.sponsor-fallback-pill {
    font-family: 'Bricolage Grotesque', 'Inter', sans-serif;
    font-size: 8.2pt;
    font-weight: 800;
    letter-spacing: 0.04em;
    color: #15161A;
    background: rgba(16, 17, 21, 0.05);
    border: 0.6pt solid rgba(16, 17, 21, 0.22);
    border-radius: 4px;
    padding: 1.2mm 2.8mm;
}

.sponsor-caption {
    font-family: 'Inter', sans-serif;
    font-size: 5.6pt;
    font-weight: 600;
    color: #525C6E;
    letter-spacing: 0.02em;
    white-space: nowrap;
}

/* 5. VERIFICATION FOOTER */
.cert-footer {
    padding-top: 1.7mm;
    text-align: center;
    font-family: 'Space Mono', 'Liberation Mono', monospace;
    font-size: 6.45pt;
    font-weight: 400;
    color: #4A5568;
    letter-spacing: 0.03em;
}

.cert-footer strong {
    color: #15161A;
    font-weight: 700;
}
"""


def build_celestial_background_svg() -> str:
    """Subtle geometric astrolabe border & precision celestial reticle watermark (vector SVG)."""
    # Compute 24 subtle RA tick marks around center astrolabe circle (cx=148.5, cy=97, r=58..61)
    import math

    ticks = []
    cx, cy = 148.5, 97.0
    for i in range(24):
        angle = math.radians(i * 15)
        r1 = 56.5 if i % 3 == 0 else 58.2
        r2 = 60.5
        x1 = cx + r1 * math.cos(angle)
        y1 = cy + r1 * math.sin(angle)
        x2 = cx + r2 * math.cos(angle)
        y2 = cy + r2 * math.sin(angle)
        ticks.append(f'<line x1="{x1:.2f}" y1="{y1:.2f}" x2="{x2:.2f}" y2="{y2:.2f}"/>')
    ticks_svg = "\n        ".join(ticks)

    return f"""<svg class="cert-bg-svg" viewBox="0 0 297 210" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <!-- Subtle Centered Celestial Astrolabe Watermark -->
    <g fill="none" stroke="var(--tier-primary)" opacity="0.065">
        <circle cx="148.5" cy="97" r="60.5" stroke-width="0.45"/>
        <circle cx="148.5" cy="97" r="56.0" stroke-width="0.25" stroke-dasharray="1.8 1.8"/>
        <circle cx="148.5" cy="97" r="41.0" stroke-width="0.35"/>
        <circle cx="148.5" cy="97" r="24.0" stroke-width="0.25"/>
        <!-- Oblique Ecliptic Ring (23.4 deg tilt) -->
        <ellipse cx="148.5" cy="97" rx="60.5" ry="25.0" transform="rotate(-23.4 148.5 97)" stroke-width="0.45"/>
        <ellipse cx="148.5" cy="97" rx="48.0" ry="18.0" transform="rotate(23.4 148.5 97)" stroke-width="0.25" stroke-dasharray="1.5 2"/>
        <!-- Meridian & Horizon Axes -->
        <line x1="76" y1="97" x2="221" y2="97" stroke-width="0.25"/>
        <line x1="148.5" y1="28" x2="148.5" y2="166" stroke-width="0.25"/>
        <!-- 24 Right-Ascension Hour Ticks -->
        <g stroke-width="0.35">
        {ticks_svg}
        </g>
        <!-- Tiny Star Reference Nodes -->
        <circle cx="113" cy="67" r="1.1" fill="var(--tier-primary)"/>
        <circle cx="187" cy="72" r="0.9" fill="var(--tier-primary)"/>
        <circle cx="194" cy="119" r="1.1" fill="var(--tier-primary)"/>
        <circle cx="104" cy="122" r="0.8" fill="var(--tier-primary)"/>
    </g>

    <!-- Outer Double Architectural Frame -->
    <rect x="6.5" y="6.5" width="284" height="197" fill="none" stroke="#15161A" stroke-width="0.95"/>
    <rect x="8.8" y="8.8" width="279.4" height="192.4" fill="none" stroke="var(--tier-primary)" stroke-width="0.45" opacity="0.72"/>
    <rect x="10.4" y="10.4" width="276.2" height="189.2" fill="none" stroke="var(--tier-secondary)" stroke-width="0.22" opacity="0.5"/>

    <!-- Corner Astrolabe Quadrant Ornaments -->
    <g fill="none" stroke="var(--tier-primary)" stroke-width="0.55" opacity="0.82">
        <!-- Top-Left -->
        <path d="M 8.8 21.5 A 12.7 12.7 0 0 0 21.5 8.8"/>
        <path d="M 10.4 18.2 A 7.8 7.8 0 0 0 18.2 10.4" stroke-width="0.3"/>
        <polygon points="12.6,12.6 13.8,11.8 14.6,12.6 13.8,13.4" fill="var(--tier-primary)" stroke="none"/>
        <!-- Top-Right -->
        <path d="M 288.2 21.5 A 12.7 12.7 0 0 1 275.5 8.8"/>
        <path d="M 286.6 18.2 A 7.8 7.8 0 0 1 278.8 10.4" stroke-width="0.3"/>
        <polygon points="284.4,12.6 283.2,11.8 282.4,12.6 283.2,13.4" fill="var(--tier-primary)" stroke="none"/>
        <!-- Bottom-Left -->
        <path d="M 8.8 188.5 A 12.7 12.7 0 0 1 21.5 201.2"/>
        <path d="M 10.4 191.8 A 7.8 7.8 0 0 1 18.2 199.6" stroke-width="0.3"/>
        <polygon points="12.6,197.4 13.8,196.6 14.6,197.4 13.8,198.2" fill="var(--tier-primary)" stroke="none"/>
        <!-- Bottom-Right -->
        <path d="M 288.2 188.5 A 12.7 12.7 0 0 0 275.5 201.2"/>
        <path d="M 286.6 191.8 A 7.8 7.8 0 0 0 278.8 199.6" stroke-width="0.3"/>
        <polygon points="284.4,197.4 283.2,196.6 282.4,197.4 283.2,198.2" fill="var(--tier-primary)" stroke="none"/>
    </g>

    <!-- Subtle Top & Bottom Center Compass Diamonds (centered cleanly on outer frame) -->
    <g fill="var(--tier-primary)" opacity="0.82">
        <polygon points="148.5,5.1 150.1,6.5 148.5,7.9 146.9,6.5"/>
        <polygon points="148.5,202.1 150.1,203.5 148.5,204.9 146.9,203.5"/>
    </g>
</svg>"""


def build_tier_seal_svg(seal_top: str, seal_main: str, seal_bottom: str) -> str:
    """Crisp vector celestial medallion seal in top-right header."""
    import math

    # 24-point refined geometric outer star-seal perimeter
    pts = []
    cx, cy = 40.0, 40.0
    for i in range(48):
        a = math.radians(i * 7.5 - 90)
        r = 37.5 if i % 2 == 0 else 34.4
        pts.append(f"{cx + r * math.cos(a):.2f},{cy + r * math.sin(a):.2f}")
    poly = " ".join(pts)

    main_size = "15.5" if len(seal_main) <= 3 else "12.5"
    return f"""<svg class="seal-svg" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <polygon points="{poly}" fill="var(--seal-fill)" stroke="var(--seal-ring)" stroke-width="1.35"/>
    <circle cx="40" cy="40" r="30.5" fill="none" stroke="var(--seal-ring)" stroke-width="0.9"/>
    <circle cx="40" cy="40" r="27.2" fill="none" stroke="var(--seal-ring)" stroke-width="0.45" stroke-dasharray="1.8 1.6"/>
    <text x="40" y="25.5" text-anchor="middle" font-family="Space Mono, monospace" font-size="5.6" font-weight="700" letter-spacing="0.9" fill="var(--seal-accent)">{html.escape(seal_top)}</text>
    <text x="40" y="45.5" text-anchor="middle" font-family="Bricolage Grotesque, Inter, sans-serif" font-size="{main_size}" font-weight="800" fill="var(--seal-accent)">{html.escape(seal_main)}</text>
    <text x="40" y="57.5" text-anchor="middle" font-family="Space Mono, monospace" font-size="5.3" font-weight="700" letter-spacing="0.7" fill="var(--seal-accent)">{html.escape(seal_bottom)}</text>
</svg>"""


def build_committee_verification_seal_svg(cert_id: str) -> str:
    """Crisp circular SVG verification seal reading:
    SUPERNOVA GUIDE · SCIENTIFIC COMMITTEE · VERIFIED 2026
    Uses per-certificate unique SVG path IDs so multi-page PDFs never collide.
    """
    uid = re.sub(r"[^A-Za-z0-9_-]", "_", cert_id)
    return f"""<svg class="committee-seal-svg" viewBox="0 0 110 110" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs>
        <!-- Upper circular arc (clockwise from ~160 deg to ~20 deg across 12 o'clock) -->
        <path id="cseal-top-{uid}" d="M 19.48,67.93 A 37.8,37.8 0 1,1 90.52,67.93"/>
        <!-- Lower circular arc (counter-clockwise from ~160 deg to ~20 deg across 6 o'clock so text reads upright) -->
        <path id="cseal-bot-{uid}" d="M 15.72,69.30 A 41.8,41.8 0 0,0 94.28,69.30"/>
    </defs>
    <!-- Concentric Stamp Rings -->
    <circle cx="55" cy="55" r="51.2" fill="rgba(255, 255, 255, 0.55)" stroke="var(--tier-primary)" stroke-width="1.5" opacity="0.9"/>
    <circle cx="55" cy="55" r="47.6" fill="none" stroke="var(--tier-primary)" stroke-width="0.6" opacity="0.72"/>
    <circle cx="55" cy="55" r="31.5" fill="none" stroke="var(--tier-primary)" stroke-width="0.85" opacity="0.82"/>
    <circle cx="55" cy="55" r="28.2" fill="none" stroke="var(--tier-primary)" stroke-width="0.45" stroke-dasharray="1.6 1.7" opacity="0.68"/>

    <!-- Curved Verification Ring Typography -->
    <text font-family="Space Mono, DejaVu Sans Mono, monospace" font-size="5.35" font-weight="700" letter-spacing="0.52" fill="var(--tier-primary)" opacity="0.92">
        <textPath href="#cseal-top-{uid}" startOffset="50%" text-anchor="middle">SUPERNOVA GUIDE · SCIENTIFIC COMMITTEE</textPath>
    </text>
    <text font-family="Space Mono, DejaVu Sans Mono, monospace" font-size="5.55" font-weight="700" letter-spacing="0.85" fill="var(--tier-primary)" opacity="0.92">
        <textPath href="#cseal-bot-{uid}" startOffset="50%" text-anchor="middle">· VERIFIED 2026 ·</textPath>
    </text>

    <!-- Center Celestial Compass Star & Official Stamp Label -->
    <g fill="var(--tier-primary)" opacity="0.9">
        <polygon points="55,34.5 56.9,43.2 65.5,45 56.9,46.8 55,55.5 53.1,46.8 44.5,45 53.1,43.2"/>
        <polygon points="55,39.5 56.1,43.9 60.5,45 56.1,46.1 55,50.5 53.9,46.1 49.5,45 53.9,43.9" transform="rotate(45 55 45)" opacity="0.62"/>
    </g>
    <line x1="36" y1="60.5" x2="74" y2="60.5" stroke="var(--tier-primary)" stroke-width="0.55" opacity="0.65"/>
    <text x="55" y="69.5" text-anchor="middle" font-family="Bricolage Grotesque, Inter, DejaVu Sans, sans-serif" font-size="7.4" font-weight="800" letter-spacing="0.9" fill="var(--tier-primary)">SAC 2026</text>
    <text x="55" y="76.2" text-anchor="middle" font-family="Space Mono, DejaVu Sans Mono, monospace" font-size="4.4" font-weight="700" letter-spacing="0.7" fill="var(--tier-primary)" opacity="0.82">OFFICIAL SEAL</text>
</svg>"""


def render_sponsor_bar_html(logos: Dict[str, LogoAsset]) -> str:
    """Render the mandatory 9-sponsor bottom banner across 2 balanced rows (5 + 4)."""
    def render_slot(spec: dict) -> str:
        sid = spec["id"]
        label = html.escape(spec["label"])
        fallback = html.escape(spec["fallback"])
        files = spec["files"]

        # Combined dual-logo slot (Axilone & Siril)
        if len(files) == 2:
            k1, _ = files[0]
            k2, _ = files[1]
            a1, a2 = logos[k1], logos[k2]
            if a1.exists or a2.exists:
                parts = []
                if a1.exists:
                    parts.append(f'<img class="sponsor-img img-{k1}" src="{a1.data_uri}" alt="{k1}">')
                if a1.exists and a2.exists:
                    parts.append('<span class="sponsor-pair-sep"></span>')
                if a2.exists:
                    parts.append(f'<img class="sponsor-img img-{k2}" src="{a2.data_uri}" alt="{k2}">')
                visual = f'<div class="sponsor-visual"><div class="sponsor-pair">{"".join(parts)}</div></div>'
            else:
                visual = f'<div class="sponsor-visual"><span class="sponsor-fallback-pill">{fallback}</span></div>'
            return (
                f'<div class="sponsor-slot" data-sponsor="{sid}">'
                f'{visual}<span class="sponsor-caption">{label}</span></div>'
            )

        key, _ = files[0]
        asset = logos[key]
        if not asset.exists:
            visual = f'<div class="sponsor-visual"><span class="sponsor-fallback-pill">{fallback}</span></div>'
        elif spec.get("icon_with_wordmark"):
            visual = (
                f'<div class="sponsor-visual">'
                f'<div class="photopills-lockup">'
                f'<img class="sponsor-img img-{key}" src="{asset.data_uri}" alt="{label}">'
                f'<span class="photopills-wordmark">PhotoPills</span>'
                f'</div></div>'
            )
        else:
            pill_cls = " dark-pill" if asset.needs_dark_pill else ""
            visual = (
                f'<div class="sponsor-visual{pill_cls}">'
                f'<img class="sponsor-img img-{key}" src="{asset.data_uri}" alt="{label}">'
                f'</div>'
            )
        return (
            f'<div class="sponsor-slot" data-sponsor="{sid}">'
            f'{visual}<span class="sponsor-caption">{label}</span></div>'
        )

    row1 = "".join(render_slot(s) for s in SPONSOR_SPECS if s["row"] == 1)
    row2 = "".join(render_slot(s) for s in SPONSOR_SPECS if s["row"] == 2)

    return f"""<div class="sponsors-bar">
        <div class="sponsors-bar-title">Official Tournament Partners &amp; Sponsors</div>
        <div class="sponsors-row sponsors-row-1">{row1}</div>
        <div class="sponsors-row sponsors-row-2">{row2}</div>
    </div>"""


def render_certificate_page_html(cert: CertificateSpec, logos: Dict[str, LogoAsset], sponsor_bar_html: str) -> str:
    """Render a single self-contained A4 landscape .cert-page HTML block."""
    sn = logos["supernova"]
    brand_logo_html = (
        f'<img class="brand-logo" src="{sn.data_uri}" alt="Supernova Guide Logo">'
        if sn.exists
        else ""
    )

    name_len = len(cert.recipient_title)
    has_greek = any("\u0370" <= ch <= "\u03ff" or "\u1f00" <= ch <= "\u1fff" for ch in cert.recipient_title)
    name_cls = "recipient-name"
    if has_greek:
        name_cls += " has-greek"
    if name_len > 30:
        name_cls += " name-xlong"
    elif name_len > 24:
        name_cls += " name-long"

    if cert.is_team_diploma and cert.team_members:
        member_cards = []
        for m in cert.team_members:
            member_cards.append(
                f'<div class="team-member-card">'
                f'<div class="tm-name">{html.escape(m.name)}</div>'
                f'<div class="tm-bib">{html.escape(m.bib)}</div>'
                f'<div class="tm-meta">{html.escape(m.school)} · <strong>{html.escape(m.country)}</strong></div>'
                f'</div>'
            )
        credentials_block = f'<div class="team-members-grid">{"".join(member_cards)}</div>'
    else:
        duo_html = f'<div class="duo-meta-line">{html.escape(cert.duo_note)}</div>' if cert.duo_note else ""
        credentials_block = f"""<div class="credentials-row">
            <span class="bib-chip">{html.escape(cert.bib_display)}</span>
            <span class="cred-sep">·</span>
            <span class="cred-school">{html.escape(cert.school)}</span>
            <span class="cred-sep">·</span>
            <span class="cred-country">{html.escape(cert.country)}</span>
        </div>
        {duo_html}"""

    # Signatures Block: real PNGs if available, else clean printed lines + circular SVG verification seal
    all_real_sigs = all(logos.get(sig_key) and logos[sig_key].exists for _, _, sig_key, _ in COMMITTEE)
    sig_cols = []
    for sig_name, sig_role, sig_key, _ in COMMITTEE:
        sig_asset = logos.get(sig_key)
        if sig_asset and sig_asset.exists and sig_asset.data_uri:
            sig_top_html = (
                f'<div class="sig-img-slot">'
                f'<img class="sig-real-img" src="{sig_asset.data_uri}" alt="{html.escape(sig_name)} Signature">'
                f'</div>'
            )
        else:
            sig_top_html = '<div class="sig-blank-space"></div>'
        sig_cols.append(
            f'<div class="sig-col">'
            f'{sig_top_html}'
            f'<div class="sig-line"></div>'
            f'<div class="sig-name">{html.escape(sig_name)}</div>'
            f'<div class="sig-role">{html.escape(sig_role)}</div>'
            f'</div>'
        )

    if not all_real_sigs:
        sig_row_cls = "signatures-row with-committee-seal"
        committee_seal_html = (
            f'<div class="committee-seal-wrap">'
            f'{build_committee_verification_seal_svg(cert.cert_id)}'
            f'</div>'
        )
    else:
        sig_row_cls = "signatures-row"
        committee_seal_html = ""

    bg_svg = build_celestial_background_svg()
    seal_svg = build_tier_seal_svg(cert.seal_top, cert.seal_main, cert.seal_bottom)

    return f"""<section class="cert-page tier-{cert.tier_key}" data-cert-id="{html.escape(cert.cert_id)}">
    {bg_svg}
    <div class="cert-inner">
        <header class="cert-header">
            <div class="brand-lockup">
                {brand_logo_html}
                <div class="brand-text-wrap">
                    <span class="brand-name">{html.escape(EVENT_PLATFORM)}</span>
                    <span class="brand-domain">{html.escape(EVENT_DOMAIN)}</span>
                </div>
            </div>
            <div class="event-header-center">
                <div class="event-subtitle">{html.escape(EVENT_SUBTITLE)}</div>
                <div class="event-title">{html.escape(EVENT_TITLE)}</div>
                <div class="event-dates">{html.escape(EVENT_DATES)}</div>
            </div>
            <div class="seal-wrap">
                {seal_svg}
            </div>
        </header>

        <main class="cert-body">
            <div class="cert-doc-heading">{html.escape(cert.cert_heading)}</div>
            <div class="tier-ribbon-block">
                <div class="tier-pill">{html.escape(cert.tier_badge)}</div>
                <div class="tier-subline">{html.escape(cert.tier_subbadge)}</div>
            </div>
            <div class="intro-phrase">{html.escape(cert.intro_line)}</div>
            <h1 class="{name_cls}">{html.escape(cert.recipient_title)}</h1>
            <div class="name-rule"></div>
            {credentials_block}
            <p class="citation-text">{cert.citation_html}</p>
        </main>

        <div class="{sig_row_cls}">
            {"".join(sig_cols)}
            {committee_seal_html}
        </div>

        {sponsor_bar_html}

        <footer class="cert-footer">
            Date of Issue: <strong>{ISSUE_DATE}</strong>  ·  {cert.footer_bib_label}: <strong>{html.escape(cert.bib_display)}</strong>  ·  Official verification at <strong>{EVENT_DOMAIN}</strong>
        </footer>
    </div>
</section>"""


def wrap_print_document(body_html: str, title: str = "SAC 2026 Diploma") -> str:
    """Wrap one or more .cert-page sections in a standalone print-ready HTML document."""
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>{html.escape(title)}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="{CERT_FONTS_LINK}" rel="stylesheet">
<style>
{CERTIFICATE_CORE_CSS}
html, body {{
    margin: 0;
    padding: 0;
    background: #FFFFFF;
}}
</style>
</head>
<body>
{body_html}
</body>
</html>"""


# =============================================================================
# INTERACTIVE STANDALONE INSPECTOR & BATCH-PRINT TOOL (diplomas.html)
# =============================================================================
def write_interactive_diplomas_html(
    certs: List[CertificateSpec],
    logos: Dict[str, LogoAsset],
    sponsor_bar_html: str,
    target_path: Path,
) -> None:
    """Generate standalone diplomas.html with Supernova dark workbench UI + A4 landscape print view."""
    # Deduplicate embedded base64 strings by replacing data URIs with lightweight placeholders
    # hydrated on load from a single LOGO_MAP dictionary so diplomas.html stays fast & compact.
    logo_map: Dict[str, str] = {}
    for k, asset in logos.items():
        if asset.exists and asset.data_uri:
            logo_map[k] = asset.data_uri

    # Build a placeholder-based sponsor bar and individual certificate fragments
    placeholder_logos = {
        k: LogoAsset(
            key=a.key,
            filename=a.filename,
            exists=a.exists,
            data_uri=f"__LOGO_{k}__" if a.exists else None,
            needs_dark_pill=a.needs_dark_pill,
            width=a.width,
            height=a.height,
        )
        for k, a in logos.items()
    }
    placeholder_sponsor_bar = render_sponsor_bar_html(placeholder_logos)

    cert_records = []
    for idx, c in enumerate(certs):
        page_html = render_certificate_page_html(c, placeholder_logos, placeholder_sponsor_bar)
        cert_records.append(
            {
                "index": idx,
                "id": c.cert_id,
                "filename": c.filename,
                "tierKey": c.tier_key,
                "tierGroup": c.tier_group,
                "title": c.recipient_title,
                "bib": c.bib_display,
                "school": c.school,
                "country": c.country,
                "badge": c.tier_badge,
                "subbadge": c.tier_subbadge,
                "isTeam": c.is_team_diploma,
                "html": page_html,
            }
        )

    logo_map_json = json.dumps(logo_map)
    certs_json = json.dumps(cert_records, ensure_ascii=False)
    # Escape closing script tags defensively
    certs_json = certs_json.replace("</", "<\\/")

    sn_icon = logos["supernova"].data_uri or "assets/img/supernova_logo.png"

    ui_html = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SAC 2026 Official Diploma Studio | Supernova Guide</title>
    <link rel="icon" type="image/png" href="{sn_icon}">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="{CERT_FONTS_LINK}" rel="stylesheet">
    <style>
        :root {{
            --bg-base: #0A0A0C;
            --bg-sidebar: #101115;
            --bg-card: #15161A;
            --bg-card-hover: #1C1D22;
            --accent-purple: #B39CD0;
            --accent-blue: #35E6FF;
            --accent-rose: #FFC1CC;
            --accent-green: #2BE38A;
            --accent-gold: #FFCF5C;
            --text-pure: #FFFFFF;
            --text-main: #EDEDED;
            --text-muted: #8A94A6;
            --border-subtle: rgba(255, 255, 255, 0.08);
            --border-light: rgba(255, 255, 255, 0.16);
        }}

        {CERTIFICATE_CORE_CSS}

        /* ================= WORKBENCH CHROME (SCREEN ONLY) ================= */
        body {{
            background: var(--bg-base);
            color: var(--text-main);
            font-family: 'Inter', sans-serif;
            min-height: 100vh;
            display: flex;
            overflow: hidden;
        }}

        .studio-sidebar {{
            width: 340px;
            flex-shrink: 0;
            background: var(--bg-sidebar);
            border-right: 1px solid var(--border-subtle);
            height: 100vh;
            display: flex;
            flex-direction: column;
        }}

        .studio-brand {{
            padding: 18px 20px 14px;
            border-bottom: 1px solid var(--border-subtle);
            display: flex;
            align-items: center;
            gap: 12px;
        }}

        .studio-brand img {{
            width: 40px;
            height: 40px;
            border-radius: 50%;
            object-fit: cover;
        }}

        .studio-brand h1 {{
            font-family: 'Bricolage Grotesque', sans-serif;
            font-size: 1.05rem;
            font-weight: 800;
            color: var(--text-pure);
            line-height: 1.2;
        }}

        .studio-brand p {{
            font-family: 'Space Mono', monospace;
            font-size: 0.68rem;
            color: var(--accent-gold);
            margin-top: 2px;
        }}

        .studio-controls {{
            padding: 14px 16px;
            border-bottom: 1px solid var(--border-subtle);
            display: flex;
            flex-direction: column;
            gap: 10px;
        }}

        .search-input {{
            width: 100%;
            background: var(--bg-card);
            border: 1px solid var(--border-light);
            border-radius: 8px;
            padding: 9px 12px;
            color: var(--text-pure);
            font-family: 'Space Mono', monospace;
            font-size: 0.75rem;
            outline: none;
        }}

        .search-input:focus {{
            border-color: var(--accent-blue);
        }}

        .filter-pills {{
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
        }}

        .filter-pill {{
            background: var(--bg-card);
            border: 1px solid var(--border-subtle);
            color: var(--text-muted);
            font-family: 'Space Mono', monospace;
            font-size: 0.66rem;
            font-weight: 700;
            padding: 4px 8px;
            border-radius: 6px;
            cursor: pointer;
            transition: all 0.15s ease;
        }}

        .filter-pill:hover {{
            color: var(--text-pure);
            border-color: var(--border-light);
        }}

        .filter-pill.active {{
            background: rgba(53, 230, 255, 0.14);
            color: var(--accent-blue);
            border-color: var(--accent-blue);
        }}

        .cert-list {{
            flex: 1;
            overflow-y: auto;
            padding: 10px;
            display: flex;
            flex-direction: column;
            gap: 6px;
        }}

        .cert-list-item {{
            width: 100%;
            text-align: left;
            background: var(--bg-card);
            border: 1px solid var(--border-subtle);
            border-radius: 8px;
            padding: 9px 11px;
            cursor: pointer;
            display: flex;
            flex-direction: column;
            gap: 3px;
            transition: all 0.15s ease;
        }}

        .cert-list-item:hover {{
            background: var(--bg-card-hover);
            border-color: var(--border-light);
        }}

        .cert-list-item.active {{
            background: rgba(255, 207, 92, 0.1);
            border-color: var(--accent-gold);
        }}

        .cli-top {{
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 8px;
        }}

        .cli-bib {{
            font-family: 'Space Mono', monospace;
            font-size: 0.67rem;
            font-weight: 700;
            color: var(--accent-blue);
        }}

        .cli-tier {{
            font-family: 'Space Mono', monospace;
            font-size: 0.62rem;
            font-weight: 700;
            padding: 2px 6px;
            border-radius: 4px;
            text-transform: uppercase;
        }}

        .cli-tier.t-gold {{ background: rgba(255, 207, 92, 0.2); color: var(--accent-gold); }}
        .cli-tier.t-silver {{ background: rgba(226, 232, 240, 0.16); color: #E2E8F0; }}
        .cli-tier.t-bronze {{ background: rgba(224, 159, 103, 0.18); color: #E5A470; }}
        .cli-tier.t-honorable {{ background: rgba(53, 230, 255, 0.14); color: var(--accent-blue); }}
        .cli-tier.t-ambassador {{ background: rgba(43, 227, 138, 0.16); color: var(--accent-green); }}
        .cli-tier.t-participation {{ background: rgba(179, 156, 208, 0.14); color: var(--accent-purple); }}

        .cli-name {{
            font-family: 'Bricolage Grotesque', sans-serif;
            font-size: 0.88rem;
            font-weight: 700;
            color: var(--text-pure);
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }}

        .cli-meta {{
            font-size: 0.7rem;
            color: var(--text-muted);
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }}

        /* STAGE AREA */
        .studio-main {{
            flex: 1;
            height: 100vh;
            display: flex;
            flex-direction: column;
            min-width: 0;
        }}

        .studio-toolbar {{
            background: var(--bg-sidebar);
            border-bottom: 1px solid var(--border-subtle);
            padding: 12px 22px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-wrap: wrap;
            gap: 12px;
        }}

        .toolbar-group {{
            display: flex;
            align-items: center;
            gap: 8px;
            flex-wrap: wrap;
        }}

        .tb-btn {{
            background: var(--bg-card);
            border: 1px solid var(--border-light);
            color: var(--text-pure);
            font-family: 'Inter', sans-serif;
            font-size: 0.78rem;
            font-weight: 600;
            padding: 7px 12px;
            border-radius: 7px;
            cursor: pointer;
            transition: all 0.15s ease;
        }}

        .tb-btn:hover {{
            background: var(--bg-card-hover);
            border-color: var(--accent-blue);
            color: var(--accent-blue);
        }}

        .tb-btn.primary {{
            background: var(--accent-green);
            border-color: var(--accent-green);
            color: #0A0A0C;
            font-weight: 700;
        }}

        .tb-btn.primary:hover {{
            filter: brightness(1.06);
            color: #0A0A0C;
        }}

        .tb-btn.active-mode {{
            background: rgba(255, 207, 92, 0.14);
            border-color: var(--accent-gold);
            color: var(--accent-gold);
        }}

        .tb-meta {{
            font-family: 'Space Mono', monospace;
            font-size: 0.73rem;
            color: var(--text-muted);
        }}

        .tb-meta strong {{
            color: var(--text-pure);
        }}

        .stage-viewport {{
            flex: 1;
            overflow: auto;
            padding: 26px 28px 60px;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 28px;
            background: radial-gradient(circle at 50% 0%, #151720 0%, #0A0A0C 70%);
        }}

        .cert-stage-wrapper {{
            transform-origin: top left;
            box-shadow: 0 26px 70px rgba(0, 0, 0, 0.72), 0 0 0 1px rgba(255, 255, 255, 0.08);
            border-radius: 2px;
            overflow: hidden;
        }}

        .batch-label {{
            font-family: 'Space Mono', monospace;
            font-size: 0.72rem;
            color: var(--text-muted);
            margin-bottom: 6px;
            text-align: center;
        }}

        /* ================= PRINT OVERRIDES (EXACT A4 LANDSCAPE) ================= */
        @media print {{
            html, body {{
                background: #FFFFFF !important;
                display: block !important;
                overflow: visible !important;
                height: auto !important;
                width: auto !important;
                margin: 0 !important;
                padding: 0 !important;
            }}
            .studio-sidebar,
            .studio-toolbar,
            .batch-label {{
                display: none !important;
            }}
            .studio-main,
            .stage-viewport {{
                display: block !important;
                height: auto !important;
                overflow: visible !important;
                padding: 0 !important;
                margin: 0 !important;
                background: #FFFFFF !important;
                gap: 0 !important;
            }}
            .cert-stage-wrapper {{
                transform: none !important;
                width: 297mm !important;
                height: 210mm !important;
                margin: 0 !important;
                box-shadow: none !important;
                border-radius: 0 !important;
                page-break-after: always;
                break-after: page;
            }}
            .cert-stage-wrapper:last-child {{
                page-break-after: auto;
                break-after: auto;
            }}
            .cert-page {{
                page-break-after: auto !important;
                break-after: auto !important;
            }}
        }}
    </style>
</head>
<body>
    <aside class="studio-sidebar">
        <div class="studio-brand">
            <img src="{sn_icon}" alt="Supernova Guide">
            <div>
                <h1>SAC 2026 Diploma Studio</h1>
                <p>49 Official A4 Landscape Certificates</p>
            </div>
        </div>
        <div class="studio-controls">
            <input type="text" id="search-input" class="search-input" placeholder="Search Bib, Name, Country, School...">
            <div class="filter-pills" id="filter-pills"></div>
        </div>
        <div class="cert-list" id="cert-list"></div>
    </aside>

    <div class="studio-main">
        <div class="studio-toolbar">
            <div class="toolbar-group">
                <button type="button" class="tb-btn" id="btn-prev">← Prev</button>
                <button type="button" class="tb-btn" id="btn-next">Next →</button>
                <span class="tb-meta" id="current-meta"><strong>1 / 49</strong></span>
            </div>
            <div class="toolbar-group">
                <button type="button" class="tb-btn active-mode" id="btn-mode-single">Single Inspect</button>
                <button type="button" class="tb-btn" id="btn-mode-batch">Batch Print View (Filtered)</button>
                <button type="button" class="tb-btn" id="btn-zoom-fit">Fit Width</button>
                <button type="button" class="tb-btn" id="btn-zoom-100">100%</button>
                <button type="button" class="tb-btn primary" id="btn-print">Print Current / Batch (A4 Landscape)</button>
            </div>
        </div>
        <div class="stage-viewport" id="stage-viewport"></div>
    </div>

    <script>
        const LOGO_MAP = {logo_map_json};
        const CERTIFICATES = {certs_json};

        const TIER_FILTERS = [
            {{ key: "all", label: "All" }},
            {{ key: "gold", label: "Gold" }},
            {{ key: "silver", label: "Silver" }},
            {{ key: "bronze", label: "Bronze" }},
            {{ key: "honorable", label: "Hon. Mention" }},
            {{ key: "ambassador", label: "Ambassador" }},
            {{ key: "participation", label: "Participation" }}
        ];

        let activeFilter = "all";
        let searchQuery = "";
        let viewMode = "single"; // "single" | "batch"
        let selectedId = CERTIFICATES[0]?.id || null;
        let zoomMode = "fit"; // "fit" | "100"

        function hydrateHtml(rawHtml) {{
            return rawHtml.replace(/__LOGO_([a-z0-9_]+)__/g, (_, key) => LOGO_MAP[key] || "");
        }}

        function getFilteredCerts() {{
            const q = searchQuery.trim().toLowerCase();
            return CERTIFICATES.filter(c => {{
                if (activeFilter !== "all" && c.tierKey !== activeFilter) return false;
                if (!q) return true;
                return (
                    c.bib.toLowerCase().includes(q) ||
                    c.title.toLowerCase().includes(q) ||
                    c.country.toLowerCase().includes(q) ||
                    c.school.toLowerCase().includes(q) ||
                    c.tierGroup.toLowerCase().includes(q) ||
                    c.filename.toLowerCase().includes(q)
                );
            }});
        }}

        function computeScale() {{
            if (zoomMode === "100") return 1;
            const vp = document.getElementById("stage-viewport");
            if (!vp) return 0.85;
            // 297mm ≈ 1122.5px at 96dpi
            const availW = Math.max(420, vp.clientWidth - 72);
            return Math.min(1, availW / 1122.5);
        }}

        function renderFilters() {{
            const box = document.getElementById("filter-pills");
            box.innerHTML = TIER_FILTERS.map(f => {{
                const count = f.key === "all"
                    ? CERTIFICATES.length
                    : CERTIFICATES.filter(c => c.tierKey === f.key).length;
                return `<button type="button" class="filter-pill ${{activeFilter === f.key ? 'active' : ''}}" data-filter="${{f.key}}">${{f.label}} (${{count}})</button>`;
            }}).join("");

            box.querySelectorAll(".filter-pill").forEach(btn => {{
                btn.addEventListener("click", () => {{
                    activeFilter = btn.dataset.filter;
                    const list = getFilteredCerts();
                    if (list.length && !list.some(c => c.id === selectedId)) {{
                        selectedId = list[0].id;
                    }}
                    renderAll();
                }});
            }});
        }}

        function renderList(filtered) {{
            const listEl = document.getElementById("cert-list");
            listEl.innerHTML = filtered.map(c => `
                <button type="button" class="cert-list-item ${{c.id === selectedId ? 'active' : ''}}" data-id="${{c.id}}">
                    <div class="cli-top">
                        <span class="cli-bib">${{c.bib}}</span>
                        <span class="cli-tier t-${{c.tierKey}}">${{c.isTeam ? 'Team · ' : ''}}${{c.tierGroup}}</span>
                    </div>
                    <div class="cli-name">${{c.title}}</div>
                    <div class="cli-meta">${{c.country}} · ${{c.filename}}</div>
                </button>
            `).join("");

            listEl.querySelectorAll(".cert-list-item").forEach(btn => {{
                btn.addEventListener("click", () => {{
                    selectedId = btn.dataset.id;
                    if (viewMode === "batch") {{
                        const target = document.querySelector(`[data-batch-id="${{selectedId}}"]`);
                        if (target) target.scrollIntoView({{ behavior: "smooth", block: "start" }});
                    }}
                    renderList(getFilteredCerts());
                    if (viewMode === "single") renderStage(getFilteredCerts());
                }});
            }});
        }}

        function renderStage(filtered) {{
            const vp = document.getElementById("stage-viewport");
            const meta = document.getElementById("current-meta");
            if (!filtered.length) {{
                vp.innerHTML = `<div style="color:var(--text-muted); padding:40px; font-family:'Space Mono',monospace;">No matching certificates.</div>`;
                meta.innerHTML = `<strong>0 / ${{CERTIFICATES.length}}</strong>`;
                return;
            }}

            const scale = computeScale();
            const scaledH = Math.round(793.7 * scale); // 210mm ≈ 793.7px

            if (viewMode === "single") {{
                let idx = filtered.findIndex(c => c.id === selectedId);
                if (idx < 0) {{
                    idx = 0;
                    selectedId = filtered[0].id;
                }}
                const c = filtered[idx];
                meta.innerHTML = `<strong>${{idx + 1}} / ${{filtered.length}}</strong> · ${{c.filename}}`;
                vp.innerHTML = `
                    <div style="height:${{scaledH}}px; width:${{Math.round(1122.5 * scale)}}px;">
                        <div class="cert-stage-wrapper" style="transform: scale(${{scale}}); width: 297mm; height: 210mm;">
                            ${{hydrateHtml(c.html)}}
                        </div>
                    </div>
                `;
            }} else {{
                meta.innerHTML = `<strong>Batch View: ${{filtered.length}} Certificates</strong> (Ready to Print All)`;
                vp.innerHTML = filtered.map((c, i) => `
                    <div data-batch-id="${{c.id}}" style="display:flex; flex-direction:column; align-items:center;">
                        <div class="batch-label">#${{i + 1}} · ${{c.bib}} · ${{c.title}} · ${{c.filename}}</div>
                        <div style="height:${{scaledH}}px; width:${{Math.round(1122.5 * scale)}}px;">
                            <div class="cert-stage-wrapper" style="transform: scale(${{scale}}); width: 297mm; height: 210mm;">
                                ${{hydrateHtml(c.html)}}
                            </div>
                        </div>
                    </div>
                `).join("");
            }}
        }}

        function renderAll() {{
            const filtered = getFilteredCerts();
            renderFilters();
            renderList(filtered);
            renderStage(filtered);
        }}

        document.getElementById("search-input").addEventListener("input", e => {{
            searchQuery = e.target.value;
            renderAll();
        }});

        document.getElementById("btn-prev").addEventListener("click", () => {{
            const filtered = getFilteredCerts();
            if (!filtered.length) return;
            const idx = filtered.findIndex(c => c.id === selectedId);
            const prevIdx = (idx - 1 + filtered.length) % filtered.length;
            selectedId = filtered[prevIdx].id;
            renderAll();
        }});

        document.getElementById("btn-next").addEventListener("click", () => {{
            const filtered = getFilteredCerts();
            if (!filtered.length) return;
            const idx = filtered.findIndex(c => c.id === selectedId);
            const nextIdx = (idx + 1) % filtered.length;
            selectedId = filtered[nextIdx].id;
            renderAll();
        }});

        document.getElementById("btn-mode-single").addEventListener("click", () => {{
            viewMode = "single";
            document.getElementById("btn-mode-single").classList.add("active-mode");
            document.getElementById("btn-mode-batch").classList.remove("active-mode");
            renderStage(getFilteredCerts());
        }});

        document.getElementById("btn-mode-batch").addEventListener("click", () => {{
            viewMode = "batch";
            document.getElementById("btn-mode-batch").classList.add("active-mode");
            document.getElementById("btn-mode-single").classList.remove("active-mode");
            renderStage(getFilteredCerts());
        }});

        document.getElementById("btn-zoom-fit").addEventListener("click", () => {{
            zoomMode = "fit";
            renderStage(getFilteredCerts());
        }});

        document.getElementById("btn-zoom-100").addEventListener("click", () => {{
            zoomMode = "100";
            renderStage(getFilteredCerts());
        }});

        document.getElementById("btn-print").addEventListener("click", () => {{
            window.print();
        }});

        window.addEventListener("resize", () => {{
            if (zoomMode === "fit") renderStage(getFilteredCerts());
        }});

        document.addEventListener("keydown", e => {{
            if (document.activeElement?.tagName === "INPUT") return;
            if (e.key === "ArrowRight") document.getElementById("btn-next").click();
            if (e.key === "ArrowLeft") document.getElementById("btn-prev").click();
        }});

        renderAll();
    </script>
</body>
</html>
"""
    target_path.write_text(ui_html, encoding="utf-8")


# =============================================================================
# PDF RENDERING BACKENDS (AUTO-DETECT: PLAYWRIGHT -> CHROME/EDGE -> WEASYPRINT)
# =============================================================================
def find_chrome_executable() -> Optional[str]:
    """Locate Chrome, Chromium, or Edge binary across Linux/macOS/Windows."""
    candidates = [
        "google-chrome",
        "google-chrome-stable",
        "chromium",
        "chromium-browser",
        "microsoft-edge",
        "microsoft-edge-stable",
        "/usr/bin/google-chrome",
        "/usr/bin/chromium",
        "/usr/bin/chromium-browser",
        "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
        "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
        r"C:\Program Files\Google\Chrome\Application\chrome.exe",
        r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe",
    ]
    for cand in candidates:
        found = shutil.which(cand)
        if found:
            return found
        if os.path.isfile(cand) and os.access(cand, os.X_OK):
            return cand
    return None


def detect_pdf_engine(preferred: str = "auto") -> Tuple[str, Optional[str]]:
    """Return (engine_name, executable_path)."""
    chrome_path = find_chrome_executable()

    def has_playwright() -> bool:
        try:
            import playwright.sync_api  # noqa: F401
            return True
        except ImportError:
            return False

    def has_weasyprint() -> bool:
        try:
            import weasyprint  # noqa: F401
            return True
        except ImportError:
            return False

    if preferred == "playwright":
        if not has_playwright():
            raise RuntimeError("Playwright requested but not installed.")
        return "playwright", chrome_path
    if preferred == "chrome":
        if not chrome_path:
            raise RuntimeError("Chrome/Edge requested but no executable found.")
        return "chrome", chrome_path
    if preferred == "weasyprint":
        if not has_weasyprint():
            raise RuntimeError("WeasyPrint requested but not installed.")
        return "weasyprint", None

    # Auto-detect priority: Playwright -> Headless Chrome/Edge -> WeasyPrint
    if has_playwright():
        return "playwright", chrome_path
    if chrome_path:
        return "chrome", chrome_path
    if has_weasyprint():
        return "weasyprint", None
    raise RuntimeError(
        "No PDF renderer detected. Install Playwright, Google Chrome/Edge, or WeasyPrint."
    )


def render_pdfs_playwright(
    certs: List[CertificateSpec],
    cert_html_blocks: List[str],
    output_dir: Path,
    chrome_path: Optional[str],
    make_combined: bool = True,
) -> List[Tuple[str, Path, int]]:
    """Fast single-browser Playwright renderer with Google Fonts loaded once."""
    from playwright.sync_api import sync_playwright

    results: List[Tuple[str, Path, int]] = []
    launch_kwargs: dict = {"headless": True}
    if chrome_path:
        launch_kwargs["executable_path"] = chrome_path

    shell_html = wrap_print_document('<div id="cert-root"></div>', "SAC 2026 Official Diplomas")

    with sync_playwright() as p:
        try:
            browser = p.chromium.launch(**launch_kwargs)
        except Exception:
            # Fallback to Playwright's bundled Chromium if system chrome launch fails
            browser = p.chromium.launch(headless=True)

        context = browser.new_context(viewport={"width": 1123, "height": 794})
        page = context.new_page()

        # Load shell + Google Fonts once (gracefully continues offline if network unavailable)
        try:
            page.set_content(shell_html, wait_until="networkidle", timeout=15000)
        except Exception:
            page.set_content(shell_html, wait_until="load", timeout=10000)
        page.evaluate("() => document.fonts ? document.fonts.ready : Promise.resolve()")

        pdf_opts = {
            "format": "A4",
            "landscape": True,
            "print_background": True,
            "prefer_css_page_size": True,
            "margin": {"top": "0mm", "right": "0mm", "bottom": "0mm", "left": "0mm"},
        }

        # Render each individual PDF
        for cert, block in zip(certs, cert_html_blocks):
            out_path = output_dir / cert.filename
            page.evaluate(
                """async (markup) => {
                    const root = document.getElementById('cert-root');
                    root.innerHTML = markup;
                    const imgs = Array.from(root.querySelectorAll('img'));
                    await Promise.all(imgs.map(img => img.complete ? Promise.resolve() : new Promise(r => { img.onload = img.onerror = r; })));
                    if (document.fonts) await document.fonts.ready;
                }""",
                block,
            )
            page.pdf(path=str(out_path), **pdf_opts)
            results.append((cert.tier_group, out_path, out_path.stat().st_size))

        # Render combined ALL_SAC2026_DIPLOMAS.pdf
        if make_combined and cert_html_blocks:
            combined_path = output_dir / "ALL_SAC2026_DIPLOMAS.pdf"
            combined_markup = "\n".join(cert_html_blocks)
            page.evaluate(
                """async (markup) => {
                    const root = document.getElementById('cert-root');
                    root.innerHTML = markup;
                    const imgs = Array.from(root.querySelectorAll('img'));
                    await Promise.all(imgs.map(img => img.complete ? Promise.resolve() : new Promise(r => { img.onload = img.onerror = r; })));
                    if (document.fonts) await document.fonts.ready;
                }""",
                combined_markup,
            )
            page.pdf(path=str(combined_path), **pdf_opts)
            results.append(("COMBINED", combined_path, combined_path.stat().st_size))

        browser.close()

    return results


def render_pdfs_chrome_cli(
    certs: List[CertificateSpec],
    cert_html_blocks: List[str],
    output_dir: Path,
    chrome_path: str,
    make_combined: bool = True,
) -> List[Tuple[str, Path, int]]:
    """Headless Chrome/Edge CLI fallback renderer."""
    results: List[Tuple[str, Path, int]] = []
    with tempfile.TemporaryDirectory(prefix="sac2026_diplomas_") as tmpdir:
        tmp = Path(tmpdir)

        def print_one(html_doc: str, pdf_out: Path) -> None:
            html_file = tmp / f"{pdf_out.stem}.html"
            html_file.write_text(html_doc, encoding="utf-8")
            cmd = [
                chrome_path,
                "--headless=new",
                "--disable-gpu",
                "--no-sandbox",
                "--no-pdf-header-footer",
                f"--print-to-pdf={pdf_out}",
                html_file.as_uri(),
            ]
            proc = subprocess.run(cmd, capture_output=True, text=True, timeout=60)
            if proc.returncode != 0 or not pdf_out.exists():
                raise RuntimeError(f"Chrome print-to-pdf failed for {pdf_out.name}: {proc.stderr}")

        for cert, block in zip(certs, cert_html_blocks):
            out_path = output_dir / cert.filename
            print_one(wrap_print_document(block, cert.recipient_title), out_path)
            results.append((cert.tier_group, out_path, out_path.stat().st_size))

        if make_combined and cert_html_blocks:
            combined_path = output_dir / "ALL_SAC2026_DIPLOMAS.pdf"
            print_one(
                wrap_print_document("\n".join(cert_html_blocks), "All SAC 2026 Official Diplomas"),
                combined_path,
            )
            results.append(("COMBINED", combined_path, combined_path.stat().st_size))

    return results


def render_pdfs_weasyprint(
    certs: List[CertificateSpec],
    cert_html_blocks: List[str],
    output_dir: Path,
    make_combined: bool = True,
) -> List[Tuple[str, Path, int]]:
    """WeasyPrint pure-Python fallback renderer."""
    import weasyprint

    results: List[Tuple[str, Path, int]] = []
    for cert, block in zip(certs, cert_html_blocks):
        out_path = output_dir / cert.filename
        doc = wrap_print_document(block, cert.recipient_title)
        weasyprint.HTML(string=doc, base_url=str(REPO_ROOT)).write_pdf(str(out_path))
        results.append((cert.tier_group, out_path, out_path.stat().st_size))

    if make_combined and cert_html_blocks:
        combined_path = output_dir / "ALL_SAC2026_DIPLOMAS.pdf"
        doc = wrap_print_document("\n".join(cert_html_blocks), "All SAC 2026 Official Diplomas")
        weasyprint.HTML(string=doc, base_url=str(REPO_ROOT)).write_pdf(str(combined_path))
        results.append(("COMBINED", combined_path, combined_path.stat().st_size))

    return results


# =============================================================================
# CLI ENTRYPOINT & SUMMARY TABLE
# =============================================================================
def main() -> int:
    parser = argparse.ArgumentParser(description="Generate SAC 2026 official A4 landscape diplomas.")
    parser.add_argument(
        "--output-dir",
        type=Path,
        default=DEFAULT_OUTPUT_DIR,
        help="Destination folder for generated PDFs (default: output_diplomas/)",
    )
    parser.add_argument(
        "--engine",
        choices=("auto", "playwright", "chrome", "weasyprint"),
        default="auto",
        help="PDF rendering engine (default: auto)",
    )
    parser.add_argument(
        "--only",
        type=str,
        default=None,
        help="Optional filter substring matching bib, name, or tier key (skips combined PDF unless omitted)",
    )
    parser.add_argument(
        "--no-html",
        action="store_true",
        help="Skip writing standalone diplomas.html inspector",
    )
    parser.add_argument(
        "--html-only",
        action="store_true",
        help="Only rebuild diplomas.html without re-rendering PDFs",
    )
    args = parser.parse_args()

    print("=" * 92)
    print("  SUPERNOVA ASTROPHYSICS CUP — AUTUMN 2026 (SAC 2026) · OFFICIAL DIPLOMA GENERATOR")
    print("=" * 92)

    # 1. Load & verify 43-competitor roster
    roster = load_roster_from_competitions_html(COMPETITIONS_HTML)
    print(f"[1/5] Loaded {len(roster)} competitors (SNG-2026-1001 .. SNG-2026-1043) from {COMPETITIONS_HTML.name}")

    # 2. Inspect, clean & base64-encode all local logo assets with Pillow
    logos = load_all_logo_assets()
    print("[2/5] Logo Asset Inspection (Pillow Luminance & Transparency Audit):")
    for key, asset in logos.items():
        status = "OK" if asset.exists else "FALLBACK"
        pill_tag = "DARK PILL #15161A" if asset.needs_dark_pill else "LIGHT GROUND"
        dims = f"{asset.width}x{asset.height}" if asset.exists else "—"
        print(
            f"      - {asset.filename:24s} | {status:8s} | {dims:9s} | "
            f"{pill_tag:17s} | {asset.notes}"
        )

    # 3. Build all 49 certificate specifications
    all_certs = build_certificates(roster)
    sponsor_bar_html = render_sponsor_bar_html(logos)

    # 4. Write standalone interactive diplomas.html
    if not args.no_html:
        write_interactive_diplomas_html(all_certs, logos, sponsor_bar_html, DIPLOMAS_HTML_PATH)
        print(
            f"[3/5] Wrote interactive inspector & batch-print tool: "
            f"{DIPLOMAS_HTML_PATH.name} ({DIPLOMAS_HTML_PATH.stat().st_size / 1024:.1f} KB, {len(all_certs)} certs)"
        )
    else:
        print("[3/5] Skipped diplomas.html (--no-html)")

    if args.html_only:
        print("=" * 92)
        return 0

    # Filter if --only provided
    if args.only:
        q = args.only.lower()
        target_certs = [
            c
            for c in all_certs
            if q in c.bib_display.lower()
            or q in c.recipient_title.lower()
            or q in c.tier_key.lower()
            or q in c.filename.lower()
        ]
        make_combined = False
    else:
        target_certs = all_certs
        make_combined = True

    if not target_certs:
        print(f"No certificates matched filter '{args.only}'.", file=sys.stderr)
        return 1

    # Render HTML blocks for PDF generation
    cert_html_blocks = [
        render_certificate_page_html(c, logos, sponsor_bar_html) for c in target_certs
    ]

    # 5. Detect engine and render PDFs
    args.output_dir.mkdir(parents=True, exist_ok=True)
    engine, exec_path = detect_pdf_engine(args.engine)
    engine_desc = f"{engine} ({exec_path})" if exec_path else engine
    print(f"[4/5] Rendering {len(target_certs)} individual PDFs"
          f"{' + combined ALL_SAC2026_DIPLOMAS.pdf' if make_combined else ''} via {engine_desc}...")

    if engine == "playwright":
        rendered = render_pdfs_playwright(
            target_certs, cert_html_blocks, args.output_dir, exec_path, make_combined
        )
    elif engine == "chrome":
        assert exec_path is not None
        rendered = render_pdfs_chrome_cli(
            target_certs, cert_html_blocks, args.output_dir, exec_path, make_combined
        )
    else:
        rendered = render_pdfs_weasyprint(
            target_certs, cert_html_blocks, args.output_dir, make_combined
        )

    # Summary Table
    print("[5/5] Generation Complete — Official PDF Summary Table:")
    print("-" * 106)
    print(f"{'#':>3s}  {'Tier / Category':<20s}  {'Filename':<66s}  {'Size':>9s}")
    print("-" * 106)
    total_bytes = 0
    for idx, (tier_group, path, size_bytes) in enumerate(rendered, start=1):
        total_bytes += size_bytes
        kb = size_bytes / 1024.0
        size_str = f"{kb / 1024:.2f} MB" if kb >= 1024 else f"{kb:.1f} KB"
        print(f"{idx:>3d}  {tier_group:<20s}  {path.name:<66s}  {size_str:>9s}")
    print("-" * 106)
    tier_counts: Dict[str, int] = {}
    for c in target_certs:
        tier_counts[c.tier_group] = tier_counts.get(c.tier_group, 0) + 1
    breakdown = ", ".join(f"{k}: {v}" for k, v in tier_counts.items())
    print(
        f"TOTAL: {len(rendered)} PDF file(s) in {args.output_dir.relative_to(REPO_ROOT)}/ "
        f"({total_bytes / (1024 * 1024):.2f} MB) | Breakdown -> {breakdown}"
    )
    print("=" * 92)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
