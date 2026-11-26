// js/planetarium/app.js
// Main entry point for the Supernova Guide 3D Observatory & Interactive Planetarium.

import { auth } from '../auth.js';
import { onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js';
import { State, saveObserverSite, getDisplayName } from './state.js';
import { loadCatalog, searchCatalog } from './catalog.js';
import { PlanetariumEngine } from './engine.js';
import { DrillController } from './drills.js';
import {
    computeLSTHours,
    equatorialToHorizontal,
    angularSeparationDeg,
    formatRA,
    formatDec,
    formatAngleDMS,
    formatAzimuthCardinal,
    formatTimeMs
} from './astronomy.js';
import { IAU_CONSTELLATIONS } from './catalog_data.js';
import {
    syncUserElo,
    getLocalPracticeBestMap,
    renderGlobalDrillLeaderboard,
    renderEloLeaderboard,
    renderConstellationLeaderboard,
    renderPersonalRecordsAndHistory
} from './leaderboards.js';

const PRESET_SITES = [
    { label: 'Bucharest Observatory', lat: 44.43, lon: 26.10 },
    { label: 'Royal Obs. Greenwich', lat: 51.48, lon: 0.00 },
    { label: 'Mauna Kea, Hawaii', lat: 19.82, lon: -155.47 },
    { label: 'ESO Paranal, Chile', lat: -24.63, lon: -70.40 },
    { label: 'Mount Wilson, CA', lat: 34.22, lon: -118.06 },
    { label: 'Sydney Observatory', lat: -33.86, lon: 151.20 }
];

let drills = null;
let toastTimer = null;
let searchResults = [];
let searchActiveIndex = -1;
let telemetryClockId = null;

function showToast(message, tone = 'info') {
    const el = document.getElementById('obs-toast');
    if (!el) return;
    el.textContent = message;
    el.className = `obs-toast visible ${tone}`;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
        el.classList.remove('visible');
    }, 3200);
}

function escapeHtml(str) {
    return String(str ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

/* =========================================================
   1. SIDEBAR COLLAPSIBLE RAIL & DRAWER MANAGEMENT
   ========================================================= */
function initSidebarRail() {
    const sidebar = document.getElementById('obs-sidebar');
    const railToggle = document.getElementById('btn-rail-toggle');
    if (!sidebar || !railToggle) return;

    railToggle.addEventListener('click', () => {
        const isCollapsed = sidebar.classList.toggle('rail-collapsed');
        railToggle.setAttribute('aria-expanded', String(!isCollapsed));
        railToggle.title = isCollapsed ? 'Expand navigation rail' : 'Collapse navigation rail';
    });

    // Clicking outside an expanded desktop sidebar gently collapses it back to rail
    document.addEventListener('pointerdown', (e) => {
        if (window.innerWidth > 800 && !sidebar.classList.contains('rail-collapsed')) {
            if (!sidebar.contains(e.target)) {
                sidebar.classList.add('rail-collapsed');
                railToggle.setAttribute('aria-expanded', 'false');
            }
        }
    });

    const logoutBtn = document.getElementById('btn-logout');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            signOut(auth).then(() => {
                window.location.href = 'index.html';
            }).catch(() => {});
        });
    }
}

function openObservatoryDrawer(tabName = 'drills') {
    const drawer = document.getElementById('obs-drawer');
    const backdrop = document.getElementById('obs-drawer-backdrop');
    if (!drawer) return;

    drawer.classList.add('open');
    if (backdrop) backdrop.classList.add('active');
    switchDrawerTab(tabName);

    document.querySelectorAll('.hud-mode-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.drawerTab === tabName);
    });
}

function closeObservatoryDrawer() {
    const drawer = document.getElementById('obs-drawer');
    const backdrop = document.getElementById('obs-drawer-backdrop');
    if (drawer) drawer.classList.remove('open');
    if (backdrop) backdrop.classList.remove('active');
    document.querySelectorAll('.hud-mode-btn').forEach(btn => btn.classList.remove('active'));
}

function switchDrawerTab(tabName) {
    document.querySelectorAll('.drawer-tab-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.tab === tabName);
    });
    document.querySelectorAll('.drawer-panel').forEach(panel => {
        panel.classList.toggle('active', panel.id === `drawer-panel-${tabName}`);
    });
    if (tabName === 'records') {
        refreshAllLeaderboards();
    } else if (tabName === 'constellations') {
        renderConstellationDirectory();
    }
}

function initDrawerControls() {
    document.querySelectorAll('.hud-mode-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const tab = btn.dataset.drawerTab;
            const drawer = document.getElementById('obs-drawer');
            const isAlreadyOpen = drawer?.classList.contains('open') && btn.classList.contains('active');
            if (isAlreadyOpen) closeObservatoryDrawer();
            else openObservatoryDrawer(tab);
        });
    });

    document.querySelectorAll('.drawer-tab-btn').forEach(btn => {
        btn.addEventListener('click', () => switchDrawerTab(btn.dataset.tab));
    });

    const closeBtn = document.getElementById('btn-drawer-close');
    const backdrop = document.getElementById('obs-drawer-backdrop');
    if (closeBtn) closeBtn.addEventListener('click', closeObservatoryDrawer);
    if (backdrop) backdrop.addEventListener('click', closeObservatoryDrawer);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeObservatoryDrawer();
            closeSitePopover();
            hideSearchDropdown();
        }
    });
}

/* =========================================================
   2. TARGET TELEMETRY HUD & ANGULAR SEPARATION
   ========================================================= */
function selectObservatoryObject(obj, shouldSlew = false) {
    if (!obj) {
        if (!State.referencePinned) {
            State.selectedObject = null;
            State.previousObject = null;
        } else {
            State.selectedObject = null;
        }
        if (State.engine) State.engine.setObservatorySelection(null, null);
        renderTelemetryCard();
        return;
    }

    if (State.selectedObject && State.selectedObject.id !== obj.id) {
        if (!State.referencePinned) {
            State.previousObject = State.selectedObject;
        }
    }
    State.selectedObject = obj;

    if (State.engine) {
        State.engine.setObservatorySelection(State.selectedObject, State.previousObject);
        if (shouldSlew) {
            State.engine.slewToRaDec(obj.ra, obj.dec, obj.isDSO ? 34 : 38);
        }
    }
    renderTelemetryCard();
}

function renderTelemetryCard() {
    const card = document.getElementById('telemetry-card');
    if (!card) return;

    const obj = State.selectedObject;
    if (!obj || State.isSessionActive) {
        card.classList.remove('visible');
        return;
    }

    card.classList.add('visible');

    const titleEl = document.getElementById('tel-name');
    const subEl = document.getElementById('tel-designations');
    const typeBadge = document.getElementById('tel-type-badge');
    const conBtn = document.getElementById('tel-constellation');
    const raEl = document.getElementById('tel-ra');
    const decEl = document.getElementById('tel-dec');
    const altEl = document.getElementById('tel-alt');
    const azEl = document.getElementById('tel-az');
    const horizonEl = document.getElementById('tel-horizon');
    const magEl = document.getElementById('tel-mag');
    const spectEl = document.getElementById('tel-spect');
    const distEl = document.getElementById('tel-dist');
    const sepBox = document.getElementById('tel-sep-box');
    const sepVal = document.getElementById('tel-sep-val');
    const sepRef = document.getElementById('tel-sep-ref');
    const pinBtn = document.getElementById('btn-tel-pin');

    if (titleEl) {
        titleEl.textContent = obj.properName || obj.displayName;
    }

    if (subEl) {
        const parts = [];
        if (obj.isDSO) {
            parts.push(obj.id);
            if (obj.ngc && obj.ngc !== obj.id) parts.push(obj.ngc);
        } else {
            if (obj.bayerSymbol && obj.bayerSymbol !== obj.properName) parts.push(obj.bayerSymbol);
            if (obj.bayerName && obj.bayerName !== obj.bayerSymbol) parts.push(obj.bayerName);
            if (obj.flamsteedName && obj.flamsteedName !== obj.bayerName) parts.push(obj.flamsteedName);
            if (obj.hip) parts.push(`HIP ${obj.hip}`);
            if (obj.hd) parts.push(`HD ${obj.hd}`);
        }
        subEl.textContent = parts.join(' · ') || 'Catalog Object';
    }

    if (typeBadge) {
        typeBadge.textContent = obj.isDSO ? 'DSO' : 'STAR';
        typeBadge.className = `tel-kind-badge ${obj.isDSO ? 'dso' : 'star'}`;
    }

    if (conBtn) {
        conBtn.textContent = `${obj.constellationFull} (${obj.constellation || '—'})`;
        conBtn.dataset.con = obj.constellation || '';
    }

    if (raEl) raEl.textContent = formatRA(obj.ra);
    if (decEl) decEl.textContent = formatDec(obj.dec);

    const hz = equatorialToHorizontal(obj.ra, obj.dec, State.observer.lat, State.observer.lon, new Date());
    if (altEl) altEl.textContent = `${hz.alt >= 0 ? '+' : ''}${hz.alt.toFixed(1)}°`;
    if (azEl) azEl.textContent = `${hz.az.toFixed(1)}° ${formatAzimuthCardinal(hz.az)}`;
    if (horizonEl) {
        const above = hz.alt >= 0;
        horizonEl.textContent = above ? 'Above Horizon' : 'Below Horizon';
        horizonEl.className = `tel-horizon-pill ${above ? 'above' : 'below'}`;
    }

    if (magEl) magEl.textContent = `${obj.mag.toFixed(2)} mag`;
    if (spectEl) spectEl.textContent = obj.isDSO ? obj.subtype : (obj.spectralClass || obj.subtype);

    if (distEl) {
        if (!obj.isDSO && obj.distPc) {
            const ly = obj.distPc * 3.26156;
            distEl.textContent = ly >= 1000 ? `${(ly / 1000).toFixed(1)}k ly` : `${ly.toFixed(1)} ly`;
        } else {
            distEl.textContent = obj.isDSO ? 'Deep Sky' : '—';
        }
    }

    // Angular separation vs previously selected object
    if (sepBox && sepVal && sepRef) {
        if (State.previousObject && State.previousObject.id !== obj.id) {
            const sep = angularSeparationDeg(State.previousObject, obj);
            sepBox.style.display = 'flex';
            sepRef.textContent = State.previousObject.properName || State.previousObject.displayName;
            sepVal.textContent = `${sep.toFixed(2)}° (${formatAngleDMS(sep)})`;
        } else {
            sepBox.style.display = 'none';
        }
    }

    if (pinBtn) {
        pinBtn.classList.toggle('active', State.referencePinned);
        pinBtn.innerHTML = State.referencePinned
            ? '<i class="fa-solid fa-thumbtack"></i> Unpin Ref'
            : '<i class="fa-solid fa-thumbtack"></i> Pin Ref';
    }
}

function initTelemetryCardActions() {
    const closeBtn = document.getElementById('btn-tel-close');
    const slewBtn = document.getElementById('btn-tel-slew');
    const pinBtn = document.getElementById('btn-tel-pin');
    const clearSepBtn = document.getElementById('btn-tel-clear-sep');
    const conBtn = document.getElementById('tel-constellation');

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            State.referencePinned = false;
            selectObservatoryObject(null, false);
        });
    }
    if (slewBtn) {
        slewBtn.addEventListener('click', () => {
            if (State.selectedObject && State.engine) {
                State.engine.slewToRaDec(State.selectedObject.ra, State.selectedObject.dec, 28);
            }
        });
    }
    if (pinBtn) {
        pinBtn.addEventListener('click', () => {
            if (!State.selectedObject) return;
            if (State.referencePinned) {
                State.referencePinned = false;
                showToast('Reference anchor released.', 'info');
            } else {
                State.previousObject = State.selectedObject;
                State.referencePinned = true;
                showToast(`Pinned ${State.selectedObject.properName || State.selectedObject.displayName} as separation anchor.`, 'info');
            }
            renderTelemetryCard();
        });
    }
    if (clearSepBtn) {
        clearSepBtn.addEventListener('click', () => {
            State.previousObject = null;
            State.referencePinned = false;
            if (State.engine) State.engine.setObservatorySelection(State.selectedObject, null);
            renderTelemetryCard();
        });
    }
    if (conBtn) {
        conBtn.addEventListener('click', () => {
            const abbr = conBtn.dataset.con;
            const con = State.catalog?.constellations.find(c => c.abbr === abbr);
            if (con && State.engine) {
                State.engine.slewToRaDec(con.ra, con.dec, 50);
                showToast(`Slewing to ${con.name} (${con.abbr})`, 'info');
            }
        });
    }
}

/* =========================================================
   3. INSTANT GO-TO OBJECT SEARCH
   ========================================================= */
function hideSearchDropdown() {
    const list = document.getElementById('goto-results');
    if (list) list.classList.remove('open');
    searchActiveIndex = -1;
}

function executeGoToResult(item) {
    if (!item || !State.engine) return;
    hideSearchDropdown();

    const inp = document.getElementById('goto-search-input');
    if (inp) inp.blur();

    if (item.kind === 'constellation') {
        if (!State.overlays.constellationLines && !State.isSessionActive) {
            toggleOverlaySetting('constellationLines', true);
        }
        State.engine.slewToRaDec(item.ra, item.dec, 52);
        showToast(`Slewed to ${item.title} (${item.data.abbr})`, 'info');
    } else {
        const obj = item.data;
        if (!obj.isDSO && obj.mag > State.overlays.magLimit && !State.isSessionActive) {
            setMagLimit(Math.min(6.5, Math.ceil(obj.mag * 10) / 10));
        }
        if (obj.isDSO && !State.overlays.dsoMarkers && !State.isSessionActive) {
            toggleOverlaySetting('dsoMarkers', true);
        }
        selectObservatoryObject(obj, true);
    }
}

function renderSearchDropdown() {
    const list = document.getElementById('goto-results');
    if (!list) return;
    if (searchResults.length === 0) {
        list.innerHTML = '<div class="goto-empty">No celestial objects matched your query.</div>';
        list.classList.add('open');
        return;
    }

    list.innerHTML = searchResults.map((item, idx) => `
        <button type="button" class="goto-item ${idx === searchActiveIndex ? 'active' : ''}" data-idx="${idx}">
            <div class="goto-item-main">
                <span class="goto-item-title">${escapeHtml(item.title)}</span>
                <span class="goto-item-sub">${escapeHtml(item.subtitle)}</span>
            </div>
            <span class="goto-badge ${item.kind}">${escapeHtml(item.badge)}</span>
        </button>
    `).join('');
    list.classList.add('open');

    list.querySelectorAll('.goto-item').forEach(btn => {
        btn.addEventListener('click', () => {
            const idx = parseInt(btn.dataset.idx, 10);
            executeGoToResult(searchResults[idx]);
        });
    });
}

function initGoToSearch() {
    const inp = document.getElementById('goto-search-input');
    const clearBtn = document.getElementById('goto-search-clear');
    const wrap = document.getElementById('goto-search-wrap');
    if (!inp) return;

    inp.addEventListener('input', () => {
        const q = inp.value.trim();
        if (clearBtn) clearBtn.style.display = q ? 'inline-flex' : 'none';
        if (!q) {
            hideSearchDropdown();
            return;
        }
        searchResults = searchCatalog(q, State.catalog, 10);
        searchActiveIndex = searchResults.length > 0 ? 0 : -1;
        renderSearchDropdown();
    });

    inp.addEventListener('focus', () => {
        if (inp.value.trim().length > 0) {
            searchResults = searchCatalog(inp.value.trim(), State.catalog, 10);
            searchActiveIndex = searchResults.length > 0 ? 0 : -1;
            renderSearchDropdown();
        }
    });

    inp.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown') {
            if (searchResults.length === 0) return;
            e.preventDefault();
            searchActiveIndex = (searchActiveIndex + 1) % searchResults.length;
            renderSearchDropdown();
        } else if (e.key === 'ArrowUp') {
            if (searchResults.length === 0) return;
            e.preventDefault();
            searchActiveIndex = (searchActiveIndex - 1 + searchResults.length) % searchResults.length;
            renderSearchDropdown();
        } else if (e.key === 'Enter') {
            if (searchResults.length > 0) {
                e.preventDefault();
                executeGoToResult(searchResults[Math.max(0, searchActiveIndex)]);
            }
        } else if (e.key === 'Escape') {
            hideSearchDropdown();
            inp.blur();
        }
    });

    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            inp.value = '';
            clearBtn.style.display = 'none';
            hideSearchDropdown();
            inp.focus();
        });
    }

    document.addEventListener('pointerdown', (e) => {
        if (wrap && !wrap.contains(e.target)) {
            hideSearchDropdown();
        }
    });

    // Quick `/` shortcut to focus Go-To Object Search when not typing in an input
    document.addEventListener('keydown', (e) => {
        if (e.key === '/' && !State.isSessionActive && !e.ctrlKey && !e.metaKey) {
            const tag = (document.activeElement?.tagName || '').toLowerCase();
            if (tag !== 'input' && tag !== 'textarea' && tag !== 'select') {
                e.preventDefault();
                inp.focus();
                inp.select();
            }
        }
    });
}

/* =========================================================
   4. OBSERVATORY CONTROL DOCK, MAG LIMIT & OBSERVER SITE
   ========================================================= */
function toggleOverlaySetting(key, forceVal = null) {
    if (State.isSessionActive) {
        showToast('Observatory overlays are locked during blind-map drills.', 'warn');
        return;
    }
    const next = forceVal !== null ? Boolean(forceVal) : !State.overlays[key];
    State.overlays[key] = next;

    if (State.engine) {
        State.engine.applySettings({ [key]: next });
    }

    const btn = document.querySelector(`.dock-toggle[data-layer="${key}"]`);
    if (btn) {
        btn.classList.toggle('active', next);
        btn.setAttribute('aria-pressed', String(next));
    }
}

function setMagLimit(val) {
    const clamped = Math.max(1.5, Math.min(6.5, parseFloat(val) || 6.5));
    State.overlays.magLimit = clamped;
    const slider = document.getElementById('mag-limit-slider');
    const readout = document.getElementById('mag-limit-val');
    if (slider) slider.value = clamped.toFixed(1);
    if (readout) readout.textContent = clamped.toFixed(1);
    if (State.engine && !State.isSessionActive) {
        State.engine.applySettings({ magLimit: clamped });
    }
}

function closeSitePopover() {
    const pop = document.getElementById('site-popover');
    if (pop) pop.classList.remove('open');
}

function updateSiteDisplay() {
    const latStr = `${Math.abs(State.observer.lat).toFixed(1)}°${State.observer.lat >= 0 ? 'N' : 'S'}`;
    const lonStr = `${Math.abs(State.observer.lon).toFixed(1)}°${State.observer.lon >= 0 ? 'E' : 'W'}`;
    const chip = document.getElementById('hud-site-coords');
    if (chip) chip.textContent = `${latStr} ${lonStr}`;
    const latInp = document.getElementById('inp-site-lat');
    const lonInp = document.getElementById('inp-site-lon');
    if (latInp) latInp.value = State.observer.lat.toFixed(2);
    if (lonInp) lonInp.value = State.observer.lon.toFixed(2);
}

function initControlDock() {
    document.querySelectorAll('.dock-toggle[data-layer]').forEach(btn => {
        const key = btn.dataset.layer;
        btn.classList.toggle('active', Boolean(State.overlays[key]));
        btn.setAttribute('aria-pressed', String(Boolean(State.overlays[key])));
        btn.addEventListener('click', () => toggleOverlaySetting(key));
    });

    const slider = document.getElementById('mag-limit-slider');
    if (slider) {
        slider.value = State.overlays.magLimit.toFixed(1);
        slider.addEventListener('input', () => setMagLimit(slider.value));
    }

    const btnZoomIn = document.getElementById('btn-zoom-in');
    const btnZoomOut = document.getElementById('btn-zoom-out');
    if (btnZoomIn) btnZoomIn.addEventListener('click', () => State.engine?.zoomBy(-8));
    if (btnZoomOut) btnZoomOut.addEventListener('click', () => State.engine?.zoomBy(8));

    // Dock collapse/expand pill
    const dock = document.getElementById('obs-control-dock');
    const dockCollapseBtn = document.getElementById('btn-dock-collapse');
    if (dock && dockCollapseBtn) {
        dockCollapseBtn.addEventListener('click', () => {
            const collapsed = dock.classList.toggle('collapsed');
            dockCollapseBtn.setAttribute('aria-expanded', String(!collapsed));
            dockCollapseBtn.innerHTML = collapsed
                ? '<i class="fa-solid fa-sliders"></i><span>Controls</span>'
                : '<i class="fa-solid fa-chevron-down"></i>';
        });
    }

    // Observer Site popover
    const siteTrigger = document.getElementById('btn-site-popover');
    const sitePopover = document.getElementById('site-popover');
    const sitePresetsEl = document.getElementById('site-presets');
    const btnApplySite = document.getElementById('btn-apply-site');

    if (sitePresetsEl) {
        sitePresetsEl.innerHTML = PRESET_SITES.map((s, idx) => `
            <button type="button" class="site-preset-btn" data-idx="${idx}">${s.label}</button>
        `).join('');
        sitePresetsEl.querySelectorAll('.site-preset-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const s = PRESET_SITES[parseInt(btn.dataset.idx, 10)];
                saveObserverSite(s.lat, s.lon, s.label);
                State.engine?.setObserver(s.lat, s.lon);
                updateSiteDisplay();
                renderTelemetryCard();
                closeSitePopover();
                showToast(`Observer site set to ${s.label}.`, 'info');
            });
        });
    }

    if (siteTrigger && sitePopover) {
        siteTrigger.addEventListener('click', (e) => {
            e.stopPropagation();
            sitePopover.classList.toggle('open');
        });
        document.addEventListener('pointerdown', (e) => {
            if (!sitePopover.contains(e.target) && !siteTrigger.contains(e.target)) {
                closeSitePopover();
            }
        });
    }

    if (btnApplySite) {
        btnApplySite.addEventListener('click', () => {
            const lat = parseFloat(document.getElementById('inp-site-lat')?.value);
            const lon = parseFloat(document.getElementById('inp-site-lon')?.value);
            if (isNaN(lat) || isNaN(lon) || lat < -90 || lat > 90 || lon < -180 || lon > 180) {
                showToast('Enter valid latitude (−90 to +90) and longitude (−180 to +180).', 'warn');
                return;
            }
            saveObserverSite(lat, lon, 'Custom Site');
            State.engine?.setObserver(lat, lon);
            updateSiteDisplay();
            renderTelemetryCard();
            closeSitePopover();
            showToast('Custom observatory coordinates applied.', 'info');
        });
    }

    updateSiteDisplay();

    // Live UTC & Local Sidereal Time clock (1 Hz)
    const updateClock = () => {
        const now = new Date();
        const utcEl = document.getElementById('hud-utc-clock');
        const lstEl = document.getElementById('hud-lst-clock');
        if (utcEl) {
            const hh = String(now.getUTCHours()).padStart(2, '0');
            const mm = String(now.getUTCMinutes()).padStart(2, '0');
            const ss = String(now.getUTCSeconds()).padStart(2, '0');
            utcEl.textContent = `${hh}:${mm}:${ss} UTC`;
        }
        if (lstEl) {
            const lstH = computeLSTHours(now, State.observer.lon);
            const h = Math.floor(lstH);
            const m = Math.floor((lstH - h) * 60);
            lstEl.textContent = `LST ${String(h).padStart(2, '0')}h ${String(m).padStart(2, '0')}m`;
        }
        if (State.selectedObject && !State.isSessionActive) {
            renderTelemetryCard();
        }
    };
    updateClock();
    telemetryClockId = setInterval(updateClock, 1000);
}

/* =========================================================
   5. TRAINING, CONSTELLATIONS (88), 1V1 ARENA & RECORDS DRAWER
   ========================================================= */
function bindOptionGroup(containerSelector, onSelect) {
    const container = document.querySelector(containerSelector);
    if (!container) return;
    container.querySelectorAll('.seg-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            container.querySelectorAll('.seg-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            onSelect(btn.dataset.val);
        });
    });
}

function renderConstellationDirectory(filterStr = '') {
    const grid = document.getElementById('constellation-grid');
    if (!grid || !State.catalog) return;

    const q = filterStr.trim().toLowerCase();
    const bestMap = getLocalPracticeBestMap();
    const list = State.catalog.constellations.filter(
        c => !q || c.name.toLowerCase().includes(q) || c.abbr.toLowerCase().includes(q)
    );

    if (list.length === 0) {
        grid.innerHTML = '<div class="obs-lb-empty">No IAU constellations match that filter.</div>';
        return;
    }

    grid.innerHTML = list.map(c => {
        const best = bestMap[c.abbr];
        const pbBadge = best
            ? `<span class="con-pb"><i class="fa-solid fa-bolt"></i> ${formatTimeMs(best.timeMs)}</span>`
            : `<span class="con-count">${c.starCount} stars</span>`;
        return `
            <div class="con-card" data-abbr="${c.abbr}">
                <div class="con-card-head">
                    <span class="con-abbr">${c.abbr}</span>
                    ${pbBadge}
                </div>
                <div class="con-name">${escapeHtml(c.name)}</div>
                <div class="con-actions">
                    <button type="button" class="con-act-btn slew" data-action="slew" data-abbr="${c.abbr}" title="Slew observatory to ${escapeHtml(c.name)}">
                        <i class="fa-solid fa-crosshairs"></i> Slew
                    </button>
                    <button type="button" class="con-act-btn drill" data-action="drill" data-abbr="${c.abbr}" title="Start isolated star drill for ${escapeHtml(c.name)}">
                        <i class="fa-solid fa-play"></i> Drill
                    </button>
                </div>
            </div>
        `;
    }).join('');

    grid.querySelectorAll('.con-act-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const abbr = btn.dataset.abbr;
            const action = btn.dataset.action;
            const con = State.catalog.constellations.find(c => c.abbr === abbr);
            if (!con) return;
            if (action === 'slew') {
                if (!State.overlays.constellationLines && !State.isSessionActive) {
                    toggleOverlaySetting('constellationLines', true);
                }
                State.engine?.slewToRaDec(con.ra, con.dec, 50);
                closeObservatoryDrawer();
                showToast(`Slewing to ${con.name} (${con.abbr})`, 'info');
            } else if (action === 'drill') {
                closeObservatoryDrawer();
                drills?.startConstellationPractice(abbr);
            }
        });
    });
}

function refreshAllLeaderboards() {
    const target = document.querySelector('#rec-target-group .seg-btn.active')?.dataset.val || 'stars';
    const mode = document.querySelector('#rec-mode-group .seg-btn.active')?.dataset.val || 'name';
    const diff = document.querySelector('#rec-diff-group .seg-btn.active')?.dataset.val || 'medium';
    const time = document.querySelector('#rec-time-group .seg-btn.active')?.dataset.val || '5';

    renderGlobalDrillLeaderboard(document.getElementById('records-global-list'), { target, mode, diff, time });

    const eloMode = document.querySelector('#rec-elo-mode-group .seg-btn.active')?.dataset.val || 'name';
    renderEloLeaderboard(document.getElementById('records-elo-list'), eloMode);

    const conAbbr = document.getElementById('records-con-select')?.value || 'Ori';
    renderConstellationLeaderboard(document.getElementById('records-con-list'), conAbbr);

    renderPersonalRecordsAndHistory(
        document.getElementById('records-personal-list'),
        document.getElementById('records-history-list')
    );
}

function updateOperatorEloBadges() {
    const mode = State.arenaConfig.skillMode || 'name';
    const currentElo = State.myElo[mode] || 1200;
    const badge = document.getElementById('hud-elo-val');
    if (badge) badge.textContent = String(currentElo);
    const arenaElo = document.getElementById('arena-my-elo');
    if (arenaElo) arenaElo.textContent = `${currentElo} ELO`;
}

function initDrawerForms() {
    // 1. Blind-Map Drill Config
    bindOptionGroup('#drill-target-group', (val) => { State.drillConfig.target = val; });
    bindOptionGroup('#drill-mode-group', (val) => { State.drillConfig.mode = val; });
    bindOptionGroup('#drill-diff-group', (val) => { State.drillConfig.diff = val; });
    bindOptionGroup('#drill-time-group', (val) => { State.drillConfig.time = val; });

    const btnStartDrill = document.getElementById('btn-start-drill');
    if (btnStartDrill) {
        btnStartDrill.addEventListener('click', () => {
            closeObservatoryDrawer();
            drills?.startBlindDrill();
        });
    }

    // 2. Constellation search filter
    const conSearch = document.getElementById('constellation-filter-input');
    if (conSearch) {
        conSearch.addEventListener('input', () => renderConstellationDirectory(conSearch.value));
    }

    // 3. 1v1 Arena Config
    const syncArenaSubpanels = () => {
        const opp = State.arenaConfig.opponentType;
        const botPanel = document.getElementById('arena-bot-panel');
        const localPanel = document.getElementById('arena-local-panel');
        const onlinePanel = document.getElementById('arena-online-panel');
        const btnLaunch = document.getElementById('btn-launch-arena');

        if (botPanel) botPanel.style.display = opp === 'bot' ? 'block' : 'none';
        if (localPanel) localPanel.style.display = opp === 'local' ? 'block' : 'none';
        if (onlinePanel) onlinePanel.style.display = opp === 'online-ranked' ? 'block' : 'none';

        if (btnLaunch) {
            if (opp === 'online-ranked') {
                btnLaunch.disabled = true;
                btnLaunch.textContent = 'Host or Join a Room Above';
            } else {
                btnLaunch.disabled = false;
                btnLaunch.textContent = opp === 'bot' ? 'Start 1v1 vs Bot' : 'Start Local 1v1 Match';
            }
        }
    };

    bindOptionGroup('#arena-opp-group', (val) => {
        State.arenaConfig.opponentType = val;
        syncArenaSubpanels();
    });
    bindOptionGroup('#arena-skill-group', (val) => {
        State.arenaConfig.skillMode = val;
        updateOperatorEloBadges();
    });
    bindOptionGroup('#arena-bot-acc-group', (val) => {
        State.arenaConfig.botAccuracy = parseFloat(val) || 0.7;
    });
    syncArenaSubpanels();

    const btnHostRoom = document.getElementById('btn-arena-host');
    const btnJoinRoom = document.getElementById('btn-arena-join');
    const btnCopyRoom = document.getElementById('btn-arena-copy-code');
    const btnLaunchArena = document.getElementById('btn-launch-arena');

    if (btnHostRoom) {
        btnHostRoom.addEventListener('click', () => {
            const code = drills?.hostOnlineRoom();
            if (code) showToast(`Room ${code} created. Share the code with your opponent.`, 'info');
        });
    }
    if (btnJoinRoom) {
        btnJoinRoom.addEventListener('click', () => {
            const code = document.getElementById('arena-join-code')?.value || '';
            drills?.joinOnlineRoom(code);
        });
    }
    if (btnCopyRoom) {
        btnCopyRoom.addEventListener('click', () => {
            const code = document.getElementById('arena-room-code')?.textContent?.trim();
            if (code && code !== '------' && navigator.clipboard) {
                navigator.clipboard.writeText(code).then(() => showToast(`Copied room code ${code}.`, 'info')).catch(() => {});
            }
        });
    }
    if (btnLaunchArena) {
        btnLaunchArena.addEventListener('click', () => {
            if (State.arenaConfig.opponentType === 'online-ranked') {
                closeObservatoryDrawer();
                drills?.launchHostedOnlineMatch();
            } else {
                const p1 = document.getElementById('arena-p1-name')?.value || '';
                const p2 = document.getElementById('arena-p2-name')?.value || '';
                closeObservatoryDrawer();
                drills?.startLocalOrBotArena(p1, p2);
            }
        });
    }

    // 4. Records Subtabs & Filters
    document.querySelectorAll('.rec-subtab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const sub = btn.dataset.sub;
            document.querySelectorAll('.rec-subtab-btn').forEach(b => b.classList.toggle('active', b.dataset.sub === sub));
            document.querySelectorAll('.rec-subpanel').forEach(p => p.classList.toggle('active', p.id === `rec-sub-${sub}`));
            refreshAllLeaderboards();
        });
    });

    bindOptionGroup('#rec-target-group', refreshAllLeaderboards);
    bindOptionGroup('#rec-mode-group', refreshAllLeaderboards);
    bindOptionGroup('#rec-diff-group', refreshAllLeaderboards);
    bindOptionGroup('#rec-time-group', refreshAllLeaderboards);
    bindOptionGroup('#rec-elo-mode-group', refreshAllLeaderboards);

    const conSelect = document.getElementById('records-con-select');
    if (conSelect) {
        conSelect.innerHTML = Object.entries(IAU_CONSTELLATIONS)
            .sort((a, b) => a[1].localeCompare(b[1]))
            .map(([abbr, name]) => `<option value="${abbr}" ${abbr === 'Ori' ? 'selected' : ''}>${name} (${abbr})</option>`)
            .join('');
        conSelect.addEventListener('change', refreshAllLeaderboards);
    }
}

/* =========================================================
   6. BOOTSTRAP LIVE 3D OBSERVATORY IMMEDIATELY
   ========================================================= */
async function bootstrapPlanetarium() {
    initSidebarRail();
    initDrawerControls();
    initTelemetryCardActions();
    initGoToSearch();
    initControlDock();
    initDrawerForms();

    const stage = document.getElementById('sky-canvas-stage');
    const overlayCanvas = document.getElementById('sky-overlay-2d');
    const loadingBadge = document.getElementById('sky-loading-badge');

    // Initialize 3D celestial engine immediately
    const engine = new PlanetariumEngine(stage, overlayCanvas);
    State.engine = engine;
    engine.setObserver(State.observer.lat, State.observer.lon);

    engine.onViewChange = (fov) => {
        const fovEl = document.getElementById('dock-fov-readout');
        if (fovEl) fovEl.textContent = `${Math.round(fov)}° FOV`;
    };

    drills = new DrillController({
        onSessionChange: (isActive) => {
            const topHud = document.getElementById('obs-top-hud');
            const controlDock = document.getElementById('obs-control-dock');
            if (topHud) topHud.classList.toggle('hidden-for-drill', isActive);
            if (controlDock) controlDock.classList.toggle('hidden-for-drill', isActive);
            renderTelemetryCard();
        },
        onRecordsRefresh: () => {
            updateOperatorEloBadges();
            renderConstellationDirectory();
        },
        onToast: showToast
    });

    engine.onObjectClick = (hit) => {
        if (State.isSessionActive) {
            drills.handleSkyClick(hit);
        } else {
            selectObservatoryObject(hit, false);
        }
    };

    engine.start();

    // Load HYG starfield + verified Messier/Caldwell DSOs
    try {
        const catalog = await loadCatalog();
        State.catalog = catalog;
        engine.loadCatalogIntoScene(catalog);
        engine.applySettings({
            ...State.overlays,
            dsoPointVisible: true,
            isDrillActive: false
        });

        renderConstellationDirectory();

        if (loadingBadge) {
            loadingBadge.textContent = `${catalog.stars.length.toLocaleString()} stars · ${catalog.dsos.length} DSOs · 88 IAU constellations`;
            setTimeout(() => loadingBadge.classList.add('fade-out'), 1800);
        }
    } catch (err) {
        if (loadingBadge) {
            loadingBadge.textContent = 'Catalog load failed — check data/hyg_catalog.csv';
            loadingBadge.classList.add('error');
        }
        console.error('[Planetarium] Catalog load error:', err);
    }

    // Bind Firebase Auth state from js/auth.js
    onAuthStateChanged(auth, async (user) => {
        State.currentUser = user || null;
        const userChip = document.getElementById('hud-user-name');
        if (userChip) {
            userChip.textContent = user ? getDisplayName() : 'Guest';
        }
        await syncUserElo();
        updateOperatorEloBadges();
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootstrapPlanetarium);
} else {
    bootstrapPlanetarium();
}
