# Repository Conventions (`AGENTS.md`)

All changes to `MateiBt/supernova.github.io` must strictly adhere to the conventions below.

## 1. Stack & Directory Structure
- **Tech Stack**: Vanilla HTML5, CSS3, and modular ES6 JavaScript in `js/`.
- **Directory Layout**:
  - Root (`/`): Core application pages only (e.g., `index.html`, `dashboard.html`, `planetarium.html`, `problems.html`, `courses.html`, `exam.html`, etc.).
  - `practice/`: All 16 problem sets.
  - `handouts/`: All 16 theoretical handouts.
  - `js/`: Modular ES6 JavaScript files.

## 2. Design Tokens & Typography
- **Canonical Dark Palette** (use CSS custom properties, never hardcode legacy `#050b14` colors):
  - `--bg-base: #0A0A0C`
  - `--bg-sidebar: #101115`
  - `--bg-card: #15161A`
  - `--bg-card-hover: #1C1D22`
  - `--accent-purple: #B39CD0` (Theory)
  - `--accent-blue: #35E6FF` (Data Analysis)
  - `--accent-rose: #FFC1CC` / `--accent-green: #2BE38A` (Observational)
  - `--accent-gold: #FFCF5C`
- **Typography**:
  - `Bricolage Grotesque`
  - `Inter`
  - `Space Mono`
- **Forbidden Frameworks**: Never inject Bootstrap, Tailwind, or legacy `#050b14` colors.

## 3. Authentication & MathJax
- **Firebase Authentication**: Never put inline Firebase config in HTML files. Always import `js/auth.js` (or `../js/auth.js` from subfolders such as `practice/` or `handouts/`).
- **MathJax v3**:
  - Inline math: `$...$` or `\(...\)`
  - Display equations: `$$...$$` or `\[...\]`

## 4. Safety Rules
- **3D & Orbital Mechanics**: Do **not** modify 3D coordinate math or orbital mechanics formulas inside `planetarium.html` or `index.html` without explicit instruction.
