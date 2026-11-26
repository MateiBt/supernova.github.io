/**
 * Supernova Guide — Shared Handout Reader (ES6 module)
 *
 * Powers the standardized reader shell used by every handouts/<module>.html page:
 *   - Sticky left "Contents" TOC (.toc-panel with .toc-btn[data-target])
 *   - Single Subchapter View (default) with Previous / Next .subchapter-nav-bar buttons
 *   - Full Continuous View toggle (#toggle-view-mode / #view-mode-label)
 *
 * Content sources (both supported on the same page):
 *   1. Static panels: <article class="subchapter-panel" data-sub="2.1"> placed directly
 *      inside #handout-reader-panels.
 *   2. Lazily fetched chapter files: if #handout-reader-panels has
 *      data-chapter-path="./t1_chapters/ch{n}.html", each chapter is fetched into
 *      <div class="chapter-slot" id="ch-slot-{n}">. Missing (404) or empty (0-byte)
 *      chapter files fall back to structured "In Production" subchapter panels.
 *
 * Any subchapter panel lacking a .subchapter-nav-bar receives one automatically, with
 * Previous disabled on the first subchapter and Next disabled on the last.
 */

const reader = document.getElementById('handout-reader-panels');
const toggleViewBtn = document.getElementById('toggle-view-mode');
const viewModeLabel = document.getElementById('view-mode-label');
const mainScroll = document.getElementById('main-scroll-container') || document.querySelector('.dashboard-main');
const tocButtons = Array.from(document.querySelectorAll('.toc-btn[data-target]'));

const order = tocButtons.map((btn) => btn.dataset.target);
const chapterSrc = reader ? reader.dataset.chapterPath || '' : '';
const moduleCode = reader ? reader.dataset.moduleCode || '' : '';
const loadedChapters = new Set();
const pendingChapters = new Map();

let isContinuousMode = false;
let activeSubId = order[0] || null;
let scrollObserver = null;

function escapeHtml(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

function subTitle(subId) {
    const btn = tocButtons.find((b) => b.dataset.target === subId);
    if (!btn) return subId;
    const label = btn.querySelector('span');
    return (label ? label.textContent : btn.textContent).trim();
}

function chapterOf(subId) {
    return String(subId).split('.')[0];
}

function panelFor(subId) {
    if (!reader) return null;
    return Array.from(reader.querySelectorAll('.subchapter-panel')).find((p) => p.dataset.sub === subId) || null;
}

function buildNavBar(subId) {
    const idx = order.indexOf(subId);
    const prevId = idx > 0 ? order[idx - 1] : null;
    const nextId = idx >= 0 && idx < order.length - 1 ? order[idx + 1] : null;

    const prevBtn = prevId
        ? `<button type="button" class="btn-step" data-step-target="${escapeHtml(prevId)}"><i class="fa-solid fa-arrow-left"></i> Prev: ${escapeHtml(subTitle(prevId))}</button>`
        : '<button type="button" class="btn-step" disabled><i class="fa-solid fa-arrow-left"></i> Previous</button>';
    const nextBtn = nextId
        ? `<button type="button" class="btn-step" data-step-target="${escapeHtml(nextId)}">Next: ${escapeHtml(subTitle(nextId))} <i class="fa-solid fa-arrow-right"></i></button>`
        : '<button type="button" class="btn-step" disabled>Next <i class="fa-solid fa-arrow-right"></i></button>';

    const bar = document.createElement('div');
    bar.className = 'subchapter-nav-bar';
    bar.innerHTML = `${prevBtn}${nextBtn}`;
    return bar;
}

function decoratePanels(root) {
    if (!root) return;
    root.querySelectorAll('.subchapter-panel[data-sub]').forEach((panel) => {
        if (!panel.querySelector('.subchapter-nav-bar')) {
            panel.appendChild(buildNavBar(panel.dataset.sub));
        }
    });
}

function fallbackPanelsHtml(chapterNum, subIds) {
    const file = chapterSrc.replace('{n}', chapterNum);
    return subIds.map((subId) => `
        <article class="subchapter-panel" id="sub-${escapeHtml(subId.replace(/\./g, '-'))}" data-sub="${escapeHtml(subId)}">
            <span class="chapter-badge">${moduleCode ? `${escapeHtml(moduleCode)} · ` : ''}Chapter ${escapeHtml(chapterNum)} · In Production</span>
            <h2>${escapeHtml(subTitle(subId))}</h2>
            <p>This subchapter (<code>${escapeHtml(file.replace(/^\.\//, 'handouts/'))}</code>) is currently being compiled. Rigorous derivations, worked Olympiad examples, and figures will appear here as soon as it is published.</p>
            <div class="handout-note">Use the <strong>Contents</strong> panel or the Previous / Next buttons below to keep reading the chapters that are already available.</div>
        </article>
    `).join('');
}

async function ensureChapterLoaded(chapterNum) {
    if (!chapterSrc || loadedChapters.has(chapterNum)) return;
    if (pendingChapters.has(chapterNum)) return pendingChapters.get(chapterNum);

    const slot = document.getElementById(`ch-slot-${chapterNum}`);
    if (!slot) {
        loadedChapters.add(chapterNum);
        return;
    }

    const task = (async () => {
        const subIds = order.filter((id) => chapterOf(id) === chapterNum);
        try {
            const response = await fetch(chapterSrc.replace('{n}', chapterNum));
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const html = await response.text();
            // Static hosts return 200 OK with an empty body for 0-byte placeholder files.
            if (!html.trim()) throw new Error('Empty chapter file');
            slot.innerHTML = html;

            // Guarantee a panel for every TOC entry of this chapter, even if the file is partial.
            const missing = subIds.filter((id) => !panelFor(id));
            if (missing.length) slot.insertAdjacentHTML('beforeend', fallbackPanelsHtml(chapterNum, missing));
        } catch (err) {
            slot.innerHTML = fallbackPanelsHtml(chapterNum, subIds);
        }
        decoratePanels(slot);
        if (isContinuousMode) slot.querySelectorAll('.subchapter-panel').forEach((p) => observePanel(p));
        loadedChapters.add(chapterNum);
        pendingChapters.delete(chapterNum);
    })();

    pendingChapters.set(chapterNum, task);
    return task;
}

async function ensureAllLoaded() {
    if (!chapterSrc) return;
    const chapters = Array.from(new Set(order.map(chapterOf)));
    await Promise.all(chapters.map((n) => ensureChapterLoaded(n)));
}

function setActiveToc(subId) {
    tocButtons.forEach((btn) => {
        const isActive = btn.dataset.target === subId;
        btn.classList.toggle('active', isActive);
        if (isActive) btn.setAttribute('aria-current', 'true');
        else btn.removeAttribute('aria-current');
    });
}

function scrollMainTo(el) {
    if (!mainScroll) return;
    if (!el) {
        mainScroll.scrollTo({ top: 0, behavior: 'smooth' });
        return;
    }
    const offset = el.getBoundingClientRect().top - mainScroll.getBoundingClientRect().top + mainScroll.scrollTop - 16;
    mainScroll.scrollTo({ top: Math.max(0, offset), behavior: 'smooth' });
}

function isTocStacked() {
    return window.matchMedia('(max-width: 1100px)').matches;
}

async function typeset(el) {
    if (el && window.MathJax && window.MathJax.typesetPromise) {
        await window.MathJax.typesetPromise([el]).catch(() => {});
    }
}

async function switchSubchapter(subId, opts = {}) {
    if (!subId || !order.includes(subId)) return;
    await ensureChapterLoaded(chapterOf(subId));

    activeSubId = subId;
    setActiveToc(subId);

    reader.querySelectorAll('.subchapter-panel').forEach((panel) => {
        panel.classList.toggle('active', panel.dataset.sub === subId);
    });

    const activePanel = panelFor(subId);

    if (!opts.silentScroll) {
        if (isContinuousMode || isTocStacked()) {
            scrollMainTo(activePanel);
        } else {
            scrollMainTo(null);
        }
    }

    if (!opts.skipHash && activePanel && activePanel.id && history.replaceState) {
        history.replaceState(null, '', `#${activePanel.id}`);
    }

    await typeset(activePanel);
}

function observePanel(panel) {
    if (scrollObserver && panel) scrollObserver.observe(panel);
}

function startScrollSpy() {
    if (!('IntersectionObserver' in window) || !mainScroll) return;
    scrollObserver = new IntersectionObserver((entries) => {
        if (!isContinuousMode) return;
        const visible = entries
            .filter((e) => e.isIntersecting)
            .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length) {
            activeSubId = visible[0].target.dataset.sub;
            setActiveToc(activeSubId);
        }
    }, { root: mainScroll, rootMargin: '0px 0px -65% 0px', threshold: 0 });
    reader.querySelectorAll('.subchapter-panel').forEach((p) => observePanel(p));
}

function stopScrollSpy() {
    if (scrollObserver) scrollObserver.disconnect();
    scrollObserver = null;
}

async function setContinuousMode(on) {
    isContinuousMode = on;
    if (on) await ensureAllLoaded();
    reader.classList.toggle('continuous-mode', on);
    if (viewModeLabel) viewModeLabel.textContent = on ? 'Single Subchapter View' : 'Full Continuous View';
    if (toggleViewBtn) toggleViewBtn.setAttribute('aria-pressed', on ? 'true' : 'false');

    if (on) {
        startScrollSpy();
        await typeset(reader);
        scrollMainTo(panelFor(activeSubId));
    } else {
        stopScrollSpy();
        await switchSubchapter(activeSubId);
    }
}

function initialSubFromHash() {
    const hash = decodeURIComponent(window.location.hash || '').replace(/^#/, '');
    if (!hash) return null;
    if (order.includes(hash)) return hash;
    const match = hash.match(/^sub-(.+)$/);
    if (match) {
        const candidate = order.find((id) => id.replace(/\./g, '-') === match[1]);
        if (candidate) return candidate;
    }
    return null;
}

function init() {
    if (!reader || !order.length) return;

    // Expose for inline onclick="switchSubchapter('x.y')" handlers inside chapter files.
    window.switchSubchapter = (subId) => switchSubchapter(subId);

    decoratePanels(reader);

    tocButtons.forEach((btn) => {
        btn.addEventListener('click', () => switchSubchapter(btn.dataset.target));
    });

    reader.addEventListener('click', (e) => {
        const stepBtn = e.target.closest('.btn-step[data-step-target]');
        if (stepBtn && !stepBtn.disabled) {
            e.preventDefault();
            switchSubchapter(stepBtn.dataset.stepTarget);
        }
    });

    if (toggleViewBtn) {
        toggleViewBtn.setAttribute('aria-pressed', 'false');
        toggleViewBtn.addEventListener('click', () => setContinuousMode(!isContinuousMode));
    }

    const initial = initialSubFromHash() || order[0];
    switchSubchapter(initial, { silentScroll: true, skipHash: !initialSubFromHash() });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
