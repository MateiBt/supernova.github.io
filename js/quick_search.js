// js/quick_search.js
// Lightweight, zero-dependency command palette (Ctrl+K / Cmd+K) for Supernova Guide.
// Indexes all 16 curriculum modules (Handouts + Practice), active POTD/POTW/POTM rotations,
// and core tools (Planetarium, Mistake Notebook, IAU Constants Vault, Analytics, etc.).

import { EPOCH_UTC, CYCLE_MS, potdProblems, potwProblems, potmProblems } from './data/rotations_data.js';

const IN_SUBFOLDER = /\/(practice|handouts)\//i.test(window.location.pathname);
const BASE_PREFIX = IN_SUBFOLDER ? '../' : '';
const IS_MAC = typeof navigator !== 'undefined' && /Mac|iPhone|iPad|iPod/i.test(navigator.platform || navigator.userAgent || '');
const SHORTCUT_LABEL = IS_MAC ? '⌘K' : 'Ctrl K';

const MODULES = [
    { code: 'T1',  stem: 'positional_celestial_mechanics', title: '1. Positional Astronomy & Celestial Mechanics', track: 'Theory', accent: '#B39CD0', keywords: 'celestial sphere spherical trigonometry refraction kepler orbits vis-viva lagrange hohmann roche mechanics' },
    { code: 'T2',  stem: 'radiation_relativity',           title: '2. Radiation Physics & Relativity Fundamentals', track: 'Theory', accent: '#B39CD0', keywords: 'blackbody planck wien stefan boltzmann special relativity lorentz doppler synchrotron radiative transfer' },
    { code: 'T3',  stem: 'astronomical_instrumentation',   title: '3. Astronomical Instrumentation', track: 'Theory', accent: '#B39CD0', keywords: 'optics telescope focal ratio plate scale diffraction rayleigh resolving power interferometry ccd snr photometry' },
    { code: 'T4',  stem: 'stellar_parameters',             title: '4. Stellar Parameters & Spectral Classification', track: 'Theory', accent: '#B39CD0', keywords: 'binary stars spectroscopic eclipsing boltzmann saha equation hr diagram hertzsprung russell obafgkm spectra' },
    { code: 'T5',  stem: 'stellar_structure',              title: '5. Stellar Structure & Atmospheres', track: 'Theory', accent: '#B39CD0', keywords: 'hydrostatic equilibrium virial polytrope radiative convective transport pp chain cno fusion solar interior parker wind' },
    { code: 'T6',  stem: 'interstellar_medium',            title: '6. Interstellar Medium & Star Formation', track: 'Theory', accent: '#B39CD0', keywords: 'ism dust extinction reddening stromgren sphere h ii region jeans mass collapse molecular cloud imf salpeter' },
    { code: 'T7',  stem: 'stellar_evolution',              title: '7. Stellar Evolution', track: 'Theory', accent: '#B39CD0', keywords: 'main sequence red giant branch agb cepheid variable period luminosity supernova core collapse type ia' },
    { code: 'T8',  stem: 'stellar_remnants',               title: '8. Stellar Remnants & General Relativity', track: 'Theory', accent: '#B39CD0', keywords: 'white dwarf degeneracy chandrasekhar neutron star pulsar tov black hole schwarzschild gravitational waves lensing' },
    { code: 'T9',  stem: 'planetary_systems',              title: '9. Planetary Systems & Formation', track: 'Theory', accent: '#B39CD0', keywords: 'planets equilibrium temperature albedo atmosphere scale height tidal forces roche exoplanet transit radial velocity' },
    { code: 'T10', stem: 'galactic_structure',             title: '10. Galactic Structure', track: 'Theory', accent: '#B39CD0', keywords: 'milky way morphology disk halo differential rotation oort constants 21 cm rotation curve dark matter virial' },
    { code: 'T11', stem: 'galactic_evolution',             title: '11. Galactic Evolution & Active Galaxies', track: 'Theory', accent: '#B39CD0', keywords: 'galaxy mergers tully fisher agn quasar seyfert blazar eddington luminosity supermassive black hole superluminal jet' },
    { code: 'T12', stem: 'cosmology',                      title: '12. Cosmology & Structure of the Universe', track: 'Theory', accent: '#B39CD0', keywords: 'friedmann equations lcdm hubble redshift lookback time comoving luminosity angular distance bbn cmb universe' },
    { code: 'D1',  stem: 'data_methods_plotting',          title: '1. Methods & Plotting', track: 'Data Analysis', accent: '#35E6FF', keywords: 'statistics error propagation variance least squares linear regression chi squared residuals linearization plotting' },
    { code: 'D2',  stem: 'data_full_sets',                 title: '2. Full Data Sets', track: 'Data Analysis', accent: '#35E6FF', keywords: 'ioaa data analysis light curve period folding spectral line fitting color magnitude diagram isochrone cluster' },
    { code: 'O1',  stem: 'obs_blind_map',                  title: '1. Blind Map Practice', track: 'Observational', accent: '#FFC1CC', keywords: 'sky chart blind map constellations messier caldwell star hopping summer triangle ra dec ecliptic galactic circumpolar' },
    { code: 'O2',  stem: 'obs_telescope',                  title: '2. Telescope Practice', track: 'Observational', accent: '#FFC1CC', keywords: 'equatorial mount polar alignment drift timing eyepiece fov magnification dawes limit ccd exposure observing manual' }
];

function getLiveIndex(list, cycleMs) {
    if (!list || !list.length) return 0;
    const now = Date.now();
    if (now < EPOCH_UTC) return 0;
    const idx = Math.floor((now - EPOCH_UTC) / cycleMs);
    return Math.min(Math.max(0, idx), list.length - 1);
}

function buildSearchIndex() {
    const items = [];

    // 1. Active POTD / POTW / POTM Rotations
    const potdIdx = getLiveIndex(potdProblems, CYCLE_MS.potd);
    const potwIdx = getLiveIndex(potwProblems, CYCLE_MS.potw);
    const potmIdx = getLiveIndex(potmProblems, CYCLE_MS.potm);

    const curPotd = potdProblems[potdIdx];
    const curPotw = potwProblems[potwIdx];
    const curPotm = potmProblems[potmIdx];

    if (curPotd) {
        items.push({
            id: 'rot-potd',
            group: 'Active Rotations',
            badge: `POTD #${potdIdx + 1}`,
            accent: '#FFCF5C',
            icon: 'fa-solid fa-sun',
            title: curPotd.title,
            subtitle: `Active Problem of the Day · ${curPotd.scheduledDate} · ${curPotd.module}`,
            url: 'challenges.html',
            keywords: `potd daily problem rotation active ${curPotd.uniqueId} ${curPotd.scheduledDate} ${curPotd.module} ${curPotd.author}`
        });
    }
    if (curPotw) {
        items.push({
            id: 'rot-potw',
            group: 'Active Rotations',
            badge: `POTW #${potwIdx + 1}`,
            accent: '#35E6FF',
            icon: 'fa-solid fa-calendar-week',
            title: curPotw.title,
            subtitle: `Active Problem of the Week · ${curPotw.scheduledDate} · ${curPotw.module}`,
            url: 'challenges.html#potw',
            keywords: `potw weekly problem rotation active ${curPotw.uniqueId} ${curPotw.scheduledDate} ${curPotw.module} ${curPotw.author}`
        });
    }
    if (curPotm) {
        items.push({
            id: 'rot-potm',
            group: 'Active Rotations',
            badge: `POTM #${potmIdx + 1}`,
            accent: '#B39CD0',
            icon: 'fa-solid fa-meteor',
            title: curPotm.title,
            subtitle: `Active Problem of the Month · ${curPotm.scheduledDate} · ${curPotm.module}`,
            url: 'challenges.html#potm',
            keywords: `potm monthly problem rotation active ${curPotm.uniqueId} ${curPotm.scheduledDate} ${curPotm.module} ${curPotm.author}`
        });
    }
    items.push({
        id: 'rot-archive',
        group: 'Active Rotations',
        badge: 'ARCHIVE',
        accent: '#8A94A6',
        icon: 'fa-solid fa-clock-rotate-left',
        title: 'Past Rotations Archive (POTD · POTW · POTM)',
        subtitle: `Browse ${potdProblems.length} POTDs, ${potwProblems.length} POTWs, and ${potmProblems.length} POTM with solutions`,
        url: 'challenges.html#archive',
        keywords: 'archive past potd potw potm solutions history rotations'
    });

    // 2. Core Tools & Platform Pages
    const coreTools = [
        {
            id: 'tool-planetarium',
            badge: 'TOOL',
            accent: '#35E6FF',
            icon: 'fa-solid fa-satellite-dish',
            title: 'Planetarium',
            subtitle: 'Interactive 3D celestial sphere, constellations, Messier catalog & star chart',
            url: 'planetariu.html',
            keywords: 'planetarium 3d sky map star chart constellations messier celestial sphere simulator'
        },
        {
            id: 'tool-notebook',
            badge: 'TOOL',
            accent: '#FFC1CC',
            icon: 'fa-solid fa-book-open',
            title: 'Mistake Notebook',
            subtitle: 'Track conceptual pitfalls, problem errors, and personal revision notes',
            url: 'notebook.html',
            keywords: 'mistake notebook notes errors review study log'
        },
        {
            id: 'tool-constants',
            badge: 'VAULT',
            accent: '#FFCF5C',
            icon: 'fa-solid fa-atom',
            title: 'IAU Constants Vault',
            subtitle: 'Official IAU & IOAA physical constants table with one-click copy',
            url: 'tools.html#iau-constants',
            keywords: 'iau constants vault physical constants G c h kb sigma au parsec solar mass radius luminosity copy'
        },
        {
            id: 'tool-analytics',
            badge: 'TOOL',
            accent: '#2BE38A',
            icon: 'fa-solid fa-chart-simple',
            title: 'Analytics',
            subtitle: 'Progress diagnostics, module completion bars, difficulty counts & streaks',
            url: 'analytics.html',
            keywords: 'analytics progress stats diagnostics streaks rank mastery'
        },
        {
            id: 'tool-calculators',
            badge: 'TOOL',
            accent: '#35E6FF',
            icon: 'fa-solid fa-calculator',
            title: 'Formula & Calculators',
            subtitle: 'Distance modulus, Keplerian orbit, and telescope/CCD calculators',
            url: 'tools.html',
            keywords: 'formula tools calculators distance modulus kepler telescope plate scale'
        },
        {
            id: 'page-dashboard',
            badge: 'HUB',
            accent: '#35E6FF',
            icon: 'fa-solid fa-border-all',
            title: 'Dashboard',
            subtitle: 'Rank progress, solved problems overview, active rotations & live courses',
            url: 'dashboard.html',
            keywords: 'dashboard home overview'
        },
        {
            id: 'page-hub',
            badge: 'HUB',
            accent: '#B39CD0',
            icon: 'fa-solid fa-rocket',
            title: 'Study & Practice Hub',
            subtitle: 'All 16 curriculum modules across Theory, Data Analysis & Observational tracks',
            url: 'problems.html',
            keywords: 'study practice hub problems curriculum modules syllabus'
        },
        {
            id: 'page-courses',
            badge: 'LIVE',
            accent: '#B39CD0',
            icon: 'fa-solid fa-circle-play',
            title: 'Supernova Courses',
            subtitle: 'Live introductory astronomy lectures at 18:00 UT',
            url: 'courses.html',
            keywords: 'courses lectures classes live sessions'
        },
        {
            id: 'page-competitions',
            badge: 'CUP',
            accent: '#FFCF5C',
            icon: 'fa-solid fa-trophy',
            title: 'Seasonal Competitions',
            subtitle: 'Supernova seasonal astronomy cups, rules & candidate rosters',
            url: 'competitions.html',
            keywords: 'competitions sac cups contests olympiad exams'
        },
        {
            id: 'page-library',
            badge: 'REF',
            accent: '#8A94A6',
            icon: 'fa-solid fa-book-atlas',
            title: 'External Library & Databases',
            subtitle: 'Recommended textbooks, catalogs, astrophotography planners & references',
            url: 'resources.html',
            keywords: 'external library resources textbooks databases catalogs'
        },
        {
            id: 'page-community',
            badge: 'SOCIAL',
            accent: '#8A94A6',
            icon: 'fa-solid fa-users',
            title: 'Community',
            subtitle: 'Join the Supernova Guide Discord server & Olympiad study groups',
            url: 'community.html',
            keywords: 'community discord server discussion'
        },
        {
            id: 'page-profile',
            badge: 'ACCT',
            accent: '#8A94A6',
            icon: 'fa-solid fa-gear',
            title: 'Settings & Profile',
            subtitle: 'Account settings, avatar customization, rank badge & solved history',
            url: 'profile.html',
            keywords: 'settings profile account avatar username'
        }
    ];
    for (const tool of coreTools) {
        items.push({ ...tool, group: 'Core Tools & Pages' });
    }

    // 3. All 16 Curriculum Modules — Handouts
    for (const mod of MODULES) {
        const isObs = mod.code.startsWith('O');
        items.push({
            id: `handout-${mod.code}`,
            group: 'Curriculum Handouts',
            badge: `${mod.code} · ${isObs ? 'MANUAL' : 'HANDOUT'}`,
            accent: mod.accent,
            icon: 'fa-solid fa-book-open-reader',
            title: `${mod.title} — ${isObs ? 'Manual' : 'Handout'}`,
            subtitle: `${mod.track} Track · ${mod.code} Theoretical Reader & TOC`,
            url: `handouts/${mod.stem}.html`,
            keywords: `${mod.code} handout manual theory notes derivations reader ${mod.track} ${mod.keywords}`
        });
    }

    // 4. All 16 Curriculum Modules — Practice Problem Sets
    for (const mod of MODULES) {
        items.push({
            id: `practice-${mod.code}`,
            group: 'Practice Problem Sets',
            badge: `${mod.code} · PRACTICE`,
            accent: mod.accent,
            icon: 'fa-solid fa-pen-to-square',
            title: `${mod.title} — Practice`,
            subtitle: `${mod.track} Track · ${mod.code} Indexed Olympiad Problem Set`,
            url: `practice/${mod.stem}.html`,
            keywords: `${mod.code} practice problems exercises usaaao ioaa set ${mod.track} ${mod.keywords}`
        });
    }

    return items;
}

function escapeHtml(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

function highlightMatch(text, tokens) {
    const safe = escapeHtml(text);
    if (!tokens.length) return safe;
    const escapedTokens = tokens
        .filter((t) => t.length >= 2)
        .map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    if (!escapedTokens.length) return safe;
    const re = new RegExp(`(${escapedTokens.join('|')})`, 'gi');
    return safe.replace(re, '<mark class="qs-mark">$1</mark>');
}

function scoreItem(item, query, tokens) {
    if (!tokens.length) return 1;
    const codeBadge = item.badge.toLowerCase();
    const title = item.title.toLowerCase();
    const subtitle = item.subtitle.toLowerCase();
    const group = item.group.toLowerCase();
    const haystack = `${codeBadge} ${title} ${subtitle} ${group} ${item.keywords.toLowerCase()}`;

    for (const tok of tokens) {
        if (!haystack.includes(tok)) return 0;
    }

    let score = 10;
    if (codeBadge === query || codeBadge.startsWith(`${query} `)) score += 120;
    if (title.startsWith(query)) score += 90;
    else if (title.includes(query)) score += 60;
    if (subtitle.includes(query)) score += 25;
    for (const tok of tokens) {
        if (codeBadge.startsWith(tok)) score += 40;
        if (title.includes(tok)) score += 20;
    }
    return score;
}

function injectStyles() {
    if (document.getElementById('supernova-quick-search-styles')) return;
    const style = document.createElement('style');
    style.id = 'supernova-quick-search-styles';
    style.textContent = `
        /* --- QUICK SEARCH TRIGGER BAR --- */
        .qs-header-right {
            display: flex;
            align-items: center;
            gap: 12px;
            flex-wrap: wrap;
        }
        .qs-module-topbar {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            margin-bottom: -10px;
        }
        .qs-trigger {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            min-width: 220px;
            max-width: 300px;
            padding: 9px 12px 9px 14px;
            border-radius: 10px;
            background: #15161A;
            border: 1px solid rgba(255, 255, 255, 0.14);
            color: #8A94A6;
            font-family: 'Inter', -apple-system, sans-serif;
            font-size: 0.84rem;
            font-weight: 500;
            cursor: pointer;
            transition: border-color 0.2s ease, background-color 0.2s ease, color 0.2s ease, box-shadow 0.2s ease;
            text-align: left;
            flex-shrink: 0;
        }
        .qs-trigger:hover,
        .qs-trigger:focus-visible {
            background: #1C1D22;
            border-color: #35E6FF;
            color: #FFFFFF;
            box-shadow: 0 0 0 3px rgba(53, 230, 255, 0.12);
            outline: none;
        }
        .qs-trigger i {
            color: #35E6FF;
            font-size: 0.85rem;
            flex-shrink: 0;
        }
        .qs-trigger-text {
            flex: 1;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .qs-kbd {
            font-family: 'Space Mono', monospace;
            font-size: 0.68rem;
            font-weight: 700;
            color: #35E6FF;
            background: rgba(53, 230, 255, 0.08);
            border: 1px solid rgba(53, 230, 255, 0.28);
            border-radius: 6px;
            padding: 2px 6px;
            line-height: 1.2;
            flex-shrink: 0;
        }
        .qs-trigger.qs-nav-trigger {
            min-width: 175px;
            padding: 8px 10px 8px 12px;
            background: rgba(21, 22, 26, 0.88);
        }
        .qs-mobile-btn {
            display: none;
            width: 40px;
            height: 40px;
            border-radius: 8px;
            background: #15161A;
            border: 1px solid rgba(255, 255, 255, 0.15);
            color: #35E6FF;
            align-items: center;
            justify-content: center;
            font-size: 0.98rem;
            cursor: pointer;
            flex-shrink: 0;
            margin-left: auto;
            margin-right: 8px;
            transition: border-color 0.2s ease, background-color 0.2s ease, color 0.2s ease;
        }
        .qs-mobile-btn:hover,
        .qs-mobile-btn:focus-visible {
            border-color: #35E6FF;
            background: #1C1D22;
            color: #FFFFFF;
            outline: none;
        }
        @media (max-width: 960px) {
            .qs-trigger.qs-nav-trigger {
                min-width: auto;
                padding: 8px 10px;
            }
            .qs-trigger.qs-nav-trigger .qs-trigger-text,
            .qs-trigger.qs-nav-trigger .qs-kbd {
                display: none;
            }
        }
        @media (max-width: 800px) {
            .qs-mobile-btn {
                display: inline-flex;
            }
            .qs-module-topbar {
                display: none;
            }
            .top-header .qs-trigger {
                width: 100%;
                max-width: 100%;
                min-width: 0;
            }
            .qs-header-right {
                width: 100%;
            }
        }

        /* --- COMMAND PALETTE OVERLAY & MODAL --- */
        .qs-backdrop {
            position: fixed;
            inset: 0;
            z-index: 9500;
            background: rgba(10, 10, 12, 0.78);
            backdrop-filter: blur(6px);
            -webkit-backdrop-filter: blur(6px);
            display: none;
            align-items: flex-start;
            justify-content: center;
            padding: min(11vh, 88px) 16px 24px;
        }
        .qs-backdrop.qs-open {
            display: flex;
            animation: qsFadeIn 0.14s ease-out;
        }
        @keyframes qsFadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        .qs-dialog {
            width: 100%;
            max-width: 640px;
            max-height: min(76vh, 620px);
            background: #15161A;
            border: 1px solid rgba(53, 230, 255, 0.32);
            border-radius: 16px;
            box-shadow: 0 24px 64px rgba(0, 0, 0, 0.78), 0 0 0 1px rgba(53, 230, 255, 0.08);
            display: flex;
            flex-direction: column;
            overflow: hidden;
            color: #EDEDED;
            font-family: 'Inter', -apple-system, sans-serif;
            transform-origin: top center;
            animation: qsScaleIn 0.15s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes qsScaleIn {
            from { opacity: 0; transform: translateY(-8px) scale(0.985); }
            to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .qs-input-row {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 15px 18px;
            background: #101115;
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }
        .qs-input-row i {
            color: #35E6FF;
            font-size: 1.05rem;
            flex-shrink: 0;
        }
        .qs-input {
            flex: 1;
            min-width: 0;
            background: transparent;
            border: none;
            color: #FFFFFF;
            font-family: 'Inter', -apple-system, sans-serif;
            font-size: 0.98rem;
            font-weight: 500;
            outline: none;
        }
        .qs-input::placeholder {
            color: #8A94A6;
        }
        .qs-clear-btn,
        .qs-esc-btn {
            background: #15161A;
            border: 1px solid rgba(255, 255, 255, 0.14);
            color: #8A94A6;
            font-family: 'Space Mono', monospace;
            font-size: 0.68rem;
            padding: 4px 8px;
            border-radius: 6px;
            cursor: pointer;
            flex-shrink: 0;
            transition: border-color 0.16s ease, color 0.16s ease;
        }
        .qs-clear-btn {
            display: none;
        }
        .qs-clear-btn.qs-visible {
            display: inline-flex;
        }
        .qs-clear-btn:hover,
        .qs-esc-btn:hover {
            border-color: #35E6FF;
            color: #FFFFFF;
        }
        .qs-results {
            flex: 1;
            overflow-y: auto;
            padding: 8px 10px 12px;
            overscroll-behavior: contain;
        }
        .qs-results::-webkit-scrollbar {
            width: 6px;
        }
        .qs-results::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.14);
            border-radius: 99px;
        }
        .qs-group-label {
            font-family: 'Space Mono', monospace;
            font-size: 0.67rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            color: #8A94A6;
            padding: 10px 10px 6px;
        }
        .qs-item {
            display: flex;
            align-items: center;
            gap: 12px;
            width: 100%;
            padding: 10px 12px;
            border-radius: 10px;
            border: 1px solid transparent;
            border-left: 3px solid transparent;
            background: transparent;
            color: #EDEDED;
            text-decoration: none;
            cursor: pointer;
            transition: background-color 0.12s ease, border-color 0.12s ease;
        }
        .qs-item.qs-active {
            background: #1C1D22;
            border-color: rgba(53, 230, 255, 0.25);
            border-left-color: #35E6FF;
        }
        .qs-item-icon {
            width: 34px;
            height: 34px;
            border-radius: 8px;
            background: #101115;
            border: 1px solid rgba(255, 255, 255, 0.08);
            display: inline-flex;
            align-items: center;
            justify-content: center;
            font-size: 0.9rem;
            flex-shrink: 0;
        }
        .qs-item-body {
            flex: 1;
            min-width: 0;
            display: flex;
            flex-direction: column;
            gap: 2px;
        }
        .qs-item-title {
            font-family: 'Bricolage Grotesque', 'Inter', sans-serif;
            font-size: 0.92rem;
            font-weight: 600;
            color: #FFFFFF;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .qs-item-sub {
            font-size: 0.77rem;
            color: #8A94A6;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .qs-item-badge {
            font-family: 'Space Mono', monospace;
            font-size: 0.65rem;
            font-weight: 700;
            padding: 3px 7px;
            border-radius: 99px;
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.12);
            white-space: nowrap;
            flex-shrink: 0;
        }
        .qs-mark {
            background: rgba(53, 230, 255, 0.2);
            color: #35E6FF;
            border-radius: 3px;
            padding: 0 2px;
        }
        .qs-empty {
            padding: 36px 20px;
            text-align: center;
            color: #8A94A6;
            font-size: 0.88rem;
        }
        .qs-empty strong {
            color: #FFFFFF;
        }
        .qs-footer {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
            flex-wrap: wrap;
            padding: 10px 16px;
            background: #101115;
            border-top: 1px solid rgba(255, 255, 255, 0.08);
            font-family: 'Space Mono', monospace;
            font-size: 0.68rem;
            color: #8A94A6;
        }
        .qs-hints {
            display: flex;
            align-items: center;
            gap: 12px;
            flex-wrap: wrap;
        }
        .qs-hint-key {
            display: inline-block;
            padding: 1px 5px;
            border-radius: 4px;
            background: #15161A;
            border: 1px solid rgba(255, 255, 255, 0.15);
            color: #35E6FF;
            margin-right: 4px;
        }
        @media (max-width: 520px) {
            .qs-backdrop {
                padding: 12px 10px;
            }
            .qs-dialog {
                max-height: 84vh;
                border-radius: 14px;
            }
            .qs-item-badge {
                display: none;
            }
        }
    `;
    document.head.appendChild(style);
}

function createTriggerButton(extraClass = '') {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `qs-trigger${extraClass ? ' ' + extraClass : ''}`;
    btn.setAttribute('data-quick-search-trigger', '');
    btn.setAttribute('aria-label', `Quick search (${SHORTCUT_LABEL})`);
    btn.innerHTML = `<i class="fa-solid fa-magnifying-glass" aria-hidden="true"></i><span class="qs-trigger-text">Quick search…</span><kbd class="qs-kbd">${SHORTCUT_LABEL}</kbd>`;
    return btn;
}

function mountTriggers(openFn) {
    // 1. Mobile sticky topbar icon button (<= 800px)
    const mobileTopbar = document.querySelector('.mobile-topbar');
    const mobileToggle = mobileTopbar ? mobileTopbar.querySelector('.mobile-menu-toggle') : null;
    if (mobileTopbar && mobileToggle && !mobileTopbar.querySelector('.qs-mobile-btn')) {
        const mobBtn = document.createElement('button');
        mobBtn.type = 'button';
        mobBtn.className = 'qs-mobile-btn';
        mobBtn.setAttribute('data-quick-search-trigger', '');
        mobBtn.setAttribute('aria-label', 'Open quick search');
        mobBtn.innerHTML = '<i class="fa-solid fa-magnifying-glass" aria-hidden="true"></i>';
        mobileTopbar.insertBefore(mobBtn, mobileToggle);
    }

    // 2. Root app pages with .top-header
    const topHeader = document.querySelector('.top-header');
    if (topHeader && !topHeader.querySelector('[data-quick-search-trigger]')) {
        const trigger = createTriggerButton();
        const headerActions = topHeader.querySelector('.header-actions');
        if (headerActions) {
            headerActions.insertBefore(trigger, headerActions.firstChild);
        } else {
            const userProfile = topHeader.querySelector('.user-profile');
            if (userProfile) {
                const wrapper = document.createElement('div');
                wrapper.className = 'qs-header-right';
                topHeader.insertBefore(wrapper, userProfile);
                wrapper.appendChild(trigger);
                wrapper.appendChild(userProfile);
            } else {
                topHeader.appendChild(trigger);
            }
        }
    }

    // 3. Module pages (practice/*.html & handouts/*.html) with .module-hero
    const moduleHero = document.querySelector('.module-hero');
    if (!topHeader && moduleHero && moduleHero.parentElement && !document.querySelector('.qs-module-topbar')) {
        const strip = document.createElement('div');
        strip.className = 'qs-module-topbar';
        strip.appendChild(createTriggerButton());
        moduleHero.parentElement.insertBefore(strip, moduleHero);
    }

    // 4. Landing page (index.html) top navigation bar
    const landingActions = document.querySelector('nav .nav-actions');
    if (!topHeader && !moduleHero && landingActions && !landingActions.querySelector('[data-quick-search-trigger]')) {
        landingActions.insertBefore(createTriggerButton('qs-nav-trigger'), landingActions.firstChild);
    }

    // Bind click handler on all triggers (both injected and any pre-existing ones)
    document.querySelectorAll('[data-quick-search-trigger]').forEach((el) => {
        if (el.dataset.qsBound === '1') return;
        el.dataset.qsBound = '1';
        el.addEventListener('click', (e) => {
            e.preventDefault();
            openFn();
        });
    });
}

function initQuickSearch() {
    if (window.__supernovaQuickSearchInit) return;
    window.__supernovaQuickSearchInit = true;

    injectStyles();

    const index = buildSearchIndex();
    let isOpen = false;
    let filtered = index;
    let activeIdx = 0;
    let lastFocused = null;

    // Build command palette DOM
    const backdrop = document.createElement('div');
    backdrop.className = 'qs-backdrop';
    backdrop.id = 'supernova-quick-search';
    backdrop.setAttribute('role', 'dialog');
    backdrop.setAttribute('aria-modal', 'true');
    backdrop.setAttribute('aria-label', 'Supernova Quick Search');
    backdrop.innerHTML = `
        <div class="qs-dialog">
            <div class="qs-input-row">
                <i class="fa-solid fa-magnifying-glass" aria-hidden="true"></i>
                <input
                    type="text"
                    class="qs-input"
                    id="qs-search-input"
                    placeholder="Search modules (T1–T12, D1–D2, O1–O2), POTD/POTW/POTM, or tools…"
                    autocomplete="off"
                    spellcheck="false"
                    aria-label="Quick search command palette"
                    aria-controls="qs-results-list"
                    aria-autocomplete="list"
                >
                <button type="button" class="qs-clear-btn" id="qs-clear-btn" aria-label="Clear search">Clear</button>
                <button type="button" class="qs-esc-btn" id="qs-esc-btn" aria-label="Close search">ESC</button>
            </div>
            <div class="qs-results" id="qs-results-list" role="listbox"></div>
            <div class="qs-footer">
                <div class="qs-hints">
                    <span><span class="qs-hint-key">↑</span><span class="qs-hint-key">↓</span>Navigate</span>
                    <span><span class="qs-hint-key">↵</span>Open</span>
                    <span><span class="qs-hint-key">Esc</span>Close</span>
                </div>
                <span id="qs-count-label">${index.length} indexed</span>
            </div>
        </div>
    `;
    document.body.appendChild(backdrop);

    const inputEl = backdrop.querySelector('#qs-search-input');
    const clearBtn = backdrop.querySelector('#qs-clear-btn');
    const escBtn = backdrop.querySelector('#qs-esc-btn');
    const resultsEl = backdrop.querySelector('#qs-results-list');
    const countLabel = backdrop.querySelector('#qs-count-label');

    function navigateTo(item) {
        if (!item) return;
        const target = BASE_PREFIX + item.url;
        closePalette();

        // Handle in-page hash navigation smoothly (e.g., tools.html -> tools.html#iau-constants)
        const [targetPath, targetHash] = item.url.split('#');
        const currentFile = window.location.pathname.split('/').pop() || 'index.html';
        if (!IN_SUBFOLDER && targetHash && currentFile === targetPath) {
            window.location.hash = targetHash;
            const anchorEl = document.getElementById(targetHash);
            if (anchorEl) anchorEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
            return;
        }
        window.location.href = target;
    }

    function updateActiveDom() {
        const rows = resultsEl.querySelectorAll('.qs-item');
        rows.forEach((row, idx) => {
            const active = idx === activeIdx;
            row.classList.toggle('qs-active', active);
            row.setAttribute('aria-selected', active ? 'true' : 'false');
            if (active) {
                inputEl.setAttribute('aria-activedescendant', row.id);
                row.scrollIntoView({ block: 'nearest' });
            }
        });
    }

    function renderResults(rawQuery) {
        const q = rawQuery.trim().toLowerCase();
        const tokens = q ? q.split(/\s+/).filter(Boolean) : [];
        clearBtn.classList.toggle('qs-visible', rawQuery.length > 0);

        if (!tokens.length) {
            filtered = index;
        } else {
            filtered = index
                .map((item) => ({ item, score: scoreItem(item, q, tokens) }))
                .filter((entry) => entry.score > 0)
                .sort((a, b) => b.score - a.score)
                .map((entry) => entry.item);
        }

        activeIdx = 0;
        countLabel.textContent = `${filtered.length} result${filtered.length === 1 ? '' : 's'}`;

        if (!filtered.length) {
            inputEl.removeAttribute('aria-activedescendant');
            resultsEl.innerHTML = `<div class="qs-empty">No matches for <strong>"${escapeHtml(rawQuery.trim())}"</strong>.<br>Try a module code (<code>T1</code>, <code>D1</code>, <code>O2</code>), <code>POTD</code>, <code>Planetarium</code>, or <code>IAU Constants</code>.</div>`;
            return;
        }

        const parts = [];
        let lastGroup = null;
        filtered.forEach((item, idx) => {
            if (!tokens.length && item.group !== lastGroup) {
                parts.push(`<div class="qs-group-label">${escapeHtml(item.group)}</div>`);
                lastGroup = item.group;
            }
            const href = escapeHtml(BASE_PREFIX + item.url);
            parts.push(`
                <a
                    href="${href}"
                    class="qs-item${idx === 0 ? ' qs-active' : ''}"
                    id="qs-opt-${idx}"
                    role="option"
                    aria-selected="${idx === 0 ? 'true' : 'false'}"
                    data-qs-idx="${idx}"
                >
                    <span class="qs-item-icon" style="color:${item.accent};"><i class="${item.icon}" aria-hidden="true"></i></span>
                    <span class="qs-item-body">
                        <span class="qs-item-title">${highlightMatch(item.title, tokens)}</span>
                        <span class="qs-item-sub">${highlightMatch(item.subtitle, tokens)}</span>
                    </span>
                    <span class="qs-item-badge" style="color:${item.accent}; border-color:${item.accent}44;">${escapeHtml(item.badge)}</span>
                </a>
            `);
        });
        resultsEl.innerHTML = parts.join('');
        inputEl.setAttribute('aria-activedescendant', 'qs-opt-0');
        resultsEl.scrollTop = 0;
    }

    function openPalette() {
        if (isOpen) return;
        isOpen = true;
        lastFocused = document.activeElement;
        backdrop.classList.add('qs-open');
        inputEl.value = '';
        renderResults('');
        requestAnimationFrame(() => inputEl.focus());
    }

    function closePalette() {
        if (!isOpen) return;
        isOpen = false;
        backdrop.classList.remove('qs-open');
        if (lastFocused && typeof lastFocused.focus === 'function') {
            lastFocused.focus();
        }
    }

    // Mouse interactions inside results
    resultsEl.addEventListener('mousemove', (e) => {
        const row = e.target.closest('.qs-item[data-qs-idx]');
        if (!row) return;
        const idx = Number(row.dataset.qsIdx);
        if (!Number.isNaN(idx) && idx !== activeIdx) {
            activeIdx = idx;
            const rows = resultsEl.querySelectorAll('.qs-item');
            rows.forEach((r, i) => {
                r.classList.toggle('qs-active', i === activeIdx);
                r.setAttribute('aria-selected', i === activeIdx ? 'true' : 'false');
            });
            inputEl.setAttribute('aria-activedescendant', `qs-opt-${activeIdx}`);
        }
    });

    resultsEl.addEventListener('click', (e) => {
        const row = e.target.closest('.qs-item[data-qs-idx]');
        if (!row) return;
        e.preventDefault();
        const idx = Number(row.dataset.qsIdx);
        navigateTo(filtered[idx]);
    });

    // Input & button controls
    inputEl.addEventListener('input', () => renderResults(inputEl.value));
    clearBtn.addEventListener('click', () => {
        inputEl.value = '';
        renderResults('');
        inputEl.focus();
    });
    escBtn.addEventListener('click', closePalette);
    backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) closePalette();
    });

    // Keyboard navigation: Ctrl+K / Cmd+K globally; Up/Down/Enter/Esc while open
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
            e.preventDefault();
            if (isOpen) closePalette();
            else openPalette();
            return;
        }

        if (!isOpen) return;

        if (e.key === 'Escape') {
            e.preventDefault();
            closePalette();
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (!filtered.length) return;
            activeIdx = (activeIdx + 1) % filtered.length;
            updateActiveDom();
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (!filtered.length) return;
            activeIdx = (activeIdx - 1 + filtered.length) % filtered.length;
            updateActiveDom();
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (filtered[activeIdx]) navigateTo(filtered[activeIdx]);
        }
    });

    mountTriggers(openPalette);

    // Expose programmatic API for debugging or custom triggers
    window.openQuickSearch = openPalette;
    window.closeQuickSearch = closePalette;
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initQuickSearch);
} else {
    initQuickSearch();
}
