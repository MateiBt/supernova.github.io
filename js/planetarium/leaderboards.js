// js/planetarium/leaderboards.js
// Firebase Realtime Database synchronization for Personal Records, Global Drill Leaderboards,
// Constellation Practice Bests, Ranked 1v1 ELO Standings, and Match History.
// Strictly preserves all existing RTDB paths & keys so existing user ELO & scores stay intact.

import { State, db, getDisplayName } from './state.js';
import {
    ref,
    get,
    push,
    update,
    serverTimestamp
} from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js';
import {
    formatDate,
    formatTimeMs,
    formatPoints
} from './astronomy.js';
import {
    SKILL_MODE_LABELS,
    TARGET_POOL_LABELS,
    DIFFICULTY_SHORT_LABELS,
    IAU_CONSTELLATIONS
} from './catalog_data.js';

const STORAGE_KEY_NEW = 'planetarium_practice_lb';
const STORAGE_KEY_LEGACY = 'planetariu_practice_lb';

function escapeHtml(str) {
    return String(str ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

export function getLocalPracticeRecords() {
    const merged = [];
    for (const key of [STORAGE_KEY_LEGACY, STORAGE_KEY_NEW]) {
        try {
            const raw = localStorage.getItem(key);
            if (raw) {
                const parsed = JSON.parse(raw);
                if (Array.isArray(parsed)) merged.push(...parsed);
            }
        } catch {
            // Ignore malformed local entries
        }
    }
    return merged;
}

export function getLocalPracticeBestMap() {
    const all = getLocalPracticeRecords();
    const map = {};
    for (const rec of all) {
        if (!rec || !rec.constellation) continue;
        const curr = map[rec.constellation];
        if (!curr || rec.points > curr.points || (rec.points === curr.points && rec.timeMs < curr.timeMs)) {
            map[rec.constellation] = rec;
        }
    }
    return map;
}

/**
 * Load user's persisted ELO map from users/${uid}/elo (verbatim legacy path).
 */
export async function syncUserElo() {
    if (!State.currentUser) {
        State.myElo = { name: 1200, type: 1200, mag: 1200, position: 1200 };
        return State.myElo;
    }
    try {
        const snap = await get(ref(db, `users/${State.currentUser.uid}/elo`));
        if (snap.exists()) {
            State.myElo = { name: 1200, type: 1200, mag: 1200, position: 1200, ...snap.val() };
        } else {
            State.myElo = { name: 1200, type: 1200, mag: 1200, position: 1200 };
            await update(ref(db, `users/${State.currentUser.uid}/elo`), State.myElo);
        }
    } catch {
        // Keep defaults if offline or rules disallow anonymous read
    }
    return State.myElo;
}

/**
 * Push a completed singleplayer timed drill score to leaderboards/global (verbatim schema).
 */
export function saveDrillScore() {
    if (!State.currentUser || State.sessionKind !== 'drill' || State.drillConfig.time === 'unlimited') return;
    const dName = getDisplayName();
    const avgLen = State.score > 0 ? parseFloat((State.totalLettersGuessed / State.score).toFixed(1)) : 0;
    const rate = State.score > 0 ? parseFloat((State.totalPlayTimeSec / State.score).toFixed(2)) : 0;

    const payload = {
        user: dName,
        target: State.drillConfig.target,
        mode: State.drillConfig.mode,
        diff: State.drillConfig.diff,
        time: State.drillConfig.time,
        points: State.score,
        avgNameLength: State.drillConfig.mode === 'name' ? avgLen : 0,
        date: new Date().toISOString(),
        rate,
        timestamp: serverTimestamp()
    };
    push(ref(db, 'leaderboards/global'), payload).catch(() => {});
}

/**
 * Save isolated constellation practice run to leaderboards/practice & localStorage.
 */
export function savePracticeScore(timeMs) {
    if (!State.practiceConstellation) return;
    const dName = getDisplayName();
    const payload = {
        user: dName,
        constellation: State.practiceConstellation,
        mode: 'name',
        points: State.score,
        timeMs: Math.round(timeMs),
        date: new Date().toISOString(),
        timestamp: serverTimestamp()
    };

    try {
        const existing = getLocalPracticeRecords();
        existing.push({ ...payload, timestamp: Date.now() });
        localStorage.setItem(STORAGE_KEY_NEW, JSON.stringify(existing.slice(-200)));
    } catch {
        // Ignore storage quota issues
    }

    if (State.currentUser) {
        push(ref(db, 'leaderboards/practice'), payload).catch(() => {});
    }
}

/**
 * Apply ELO rating delta (K=32) after a Ranked Online 1v1 match and persist to
 * users/${uid}/elo, users/${uid}/history, and leaderboards/elo/${mode}/${uid}.
 */
export function recordRankedEloResult(myScore, oppScore, oppName, oppElo, mode) {
    const currentElo = State.myElo[mode] || 1200;
    const S = myScore > oppScore ? 1 : (myScore === oppScore ? 0.5 : 0);
    const E = 1 / (1 + Math.pow(10, ((oppElo || 1200) - currentElo) / 400));
    const newElo = Math.round(currentElo + 32 * (S - E));
    const diff = newElo - currentElo;

    State.myElo[mode] = newElo;

    if (State.currentUser) {
        const uid = State.currentUser.uid;
        const dName = getDisplayName();
        update(ref(db, `users/${uid}/elo`), State.myElo).catch(() => {});
        push(ref(db, `users/${uid}/history`), {
            opponent: oppName,
            mode,
            score: myScore,
            oppScore,
            eloChange: diff,
            newElo,
            date: new Date().toISOString()
        }).catch(() => {});
        update(ref(db, `leaderboards/elo/${mode}/${uid}`), {
            user: dName,
            elo: newElo
        }).catch(() => {});
    }

    return { currentElo, newElo, diff };
}

/**
 * Render Global Timed Drill leaderboard inside the Records drawer.
 */
export async function renderGlobalDrillLeaderboard(listEl, filters) {
    if (!listEl) return;
    listEl.innerHTML = '<li class="obs-lb-empty"><i class="fa-solid fa-circle-notch fa-spin"></i> Loading global records...</li>';

    try {
        const snap = await get(ref(db, 'leaderboards/global'));
        const scores = [];
        if (snap.exists()) {
            snap.forEach(child => scores.push(child.val()));
        }

        const filtered = scores.filter(
            s => s.mode === filters.mode
                && s.diff === filters.diff
                && String(s.time) === String(filters.time)
                && s.target === filters.target
                && !s.constellation
        );

        const bestByUser = {};
        for (const sc of filtered) {
            const curr = bestByUser[sc.user];
            if (!curr || sc.points > curr.points || (sc.points === curr.points && (sc.avgNameLength || 0) > (curr.avgNameLength || 0))) {
                bestByUser[sc.user] = sc;
            }
        }

        const sorted = Object.values(bestByUser).sort((a, b) => {
            if (b.points !== a.points) return b.points - a.points;
            return (b.avgNameLength || 0) - (a.avgNameLength || 0);
        });

        if (sorted.length === 0) {
            listEl.innerHTML = '<li class="obs-lb-empty">No records logged for this filter yet.</li>';
            return;
        }

        const myName = getDisplayName();
        listEl.innerHTML = sorted.slice(0, 12).map((sc, idx) => {
            const isMe = State.currentUser && sc.user === myName;
            const rateBadge = sc.rate ? `<span class="obs-lb-meta">${sc.rate}s/obj</span>` : '';
            return `
                <li class="obs-lb-row ${isMe ? 'is-me' : ''}">
                    <div class="obs-lb-left">
                        <span class="obs-lb-rank">#${idx + 1}</span>
                        <div>
                            <div class="obs-lb-name">${escapeHtml(sc.user)}</div>
                            <div class="obs-lb-sub">${formatDate(sc.date)}</div>
                        </div>
                    </div>
                    <div class="obs-lb-right">
                        <span class="obs-lb-val">${formatPoints(sc.points)} pts</span>
                        ${rateBadge}
                    </div>
                </li>
            `;
        }).join('');
    } catch {
        listEl.innerHTML = '<li class="obs-lb-empty">Sign in or reconnect to view global records.</li>';
    }
}

/**
 * Render Ranked ELO leaderboard for a given skill mode (leaderboards/elo/${mode}).
 */
export async function renderEloLeaderboard(listEl, mode = 'name') {
    if (!listEl) return;
    listEl.innerHTML = '<li class="obs-lb-empty"><i class="fa-solid fa-circle-notch fa-spin"></i> Loading ELO standings...</li>';

    try {
        const snap = await get(ref(db, `leaderboards/elo/${mode}`));
        const players = [];
        if (snap.exists()) {
            snap.forEach(child => players.push(child.val()));
        }
        players.sort((a, b) => (b.elo || 0) - (a.elo || 0));

        if (players.length === 0) {
            listEl.innerHTML = '<li class="obs-lb-empty">No ranked standings recorded for this mode yet.</li>';
            return;
        }

        const myName = getDisplayName();
        listEl.innerHTML = players.slice(0, 20).map((p, idx) => {
            const isMe = State.currentUser && p.user === myName;
            return `
                <li class="obs-lb-row ${isMe ? 'is-me' : ''}">
                    <div class="obs-lb-left">
                        <span class="obs-lb-rank">#${idx + 1}</span>
                        <span class="obs-lb-name">${escapeHtml(p.user)}</span>
                    </div>
                    <div class="obs-lb-right">
                        <span class="obs-lb-elo"><i class="fa-solid fa-star"></i> ${p.elo}</span>
                    </div>
                </li>
            `;
        }).join('');
    } catch {
        listEl.innerHTML = '<li class="obs-lb-empty">Sign in to sync ranked ELO standings.</li>';
    }
}

/**
 * Render Constellation Practice leaderboard (leaderboards/practice).
 */
export async function renderConstellationLeaderboard(listEl, abbr) {
    if (!listEl) return;
    listEl.innerHTML = '<li class="obs-lb-empty"><i class="fa-solid fa-circle-notch fa-spin"></i> Loading constellation records...</li>';

    try {
        const snap = await get(ref(db, 'leaderboards/practice'));
        const rows = [];
        if (snap.exists()) {
            snap.forEach(child => rows.push(child.val()));
        }
        const filtered = rows.filter(r => r.constellation === abbr);
        const bestByUser = {};
        for (const sc of filtered) {
            const curr = bestByUser[sc.user];
            if (!curr || sc.points > curr.points || (sc.points === curr.points && sc.timeMs < curr.timeMs)) {
                bestByUser[sc.user] = sc;
            }
        }
        const sorted = Object.values(bestByUser).sort((a, b) => {
            if (b.points !== a.points) return b.points - a.points;
            return a.timeMs - b.timeMs;
        });

        if (sorted.length === 0) {
            listEl.innerHTML = `<li class="obs-lb-empty">No runs logged yet for ${escapeHtml(IAU_CONSTELLATIONS[abbr] || abbr)}.</li>`;
            return;
        }

        const myName = getDisplayName();
        listEl.innerHTML = sorted.slice(0, 10).map((sc, idx) => `
            <li class="obs-lb-row ${State.currentUser && sc.user === myName ? 'is-me' : ''}">
                <div class="obs-lb-left">
                    <span class="obs-lb-rank">#${idx + 1}</span>
                    <div>
                        <div class="obs-lb-name">${escapeHtml(sc.user)}</div>
                        <div class="obs-lb-sub">${formatDate(sc.date)}</div>
                    </div>
                </div>
                <div class="obs-lb-right">
                    <span class="obs-lb-val">${formatPoints(sc.points)} pts</span>
                    <span class="obs-lb-time">${formatTimeMs(sc.timeMs)}</span>
                </div>
            </li>
        `).join('');
    } catch {
        listEl.innerHTML = '<li class="obs-lb-empty">Unable to fetch constellation records right now.</li>';
    }
}

/**
 * Render authenticated operator's personal top drills & 1v1 ranked match history.
 */
export async function renderPersonalRecordsAndHistory(personalEl, historyEl) {
    if (!State.currentUser) {
        if (personalEl) personalEl.innerHTML = '<li class="obs-lb-empty">Sign in via Supernova Guide to track personal drill records.</li>';
        if (historyEl) historyEl.innerHTML = '<li class="obs-lb-empty">Sign in to view your 1v1 Ranked match log.</li>';
        return;
    }

    const dName = getDisplayName();

    if (personalEl) {
        personalEl.innerHTML = '<li class="obs-lb-empty"><i class="fa-solid fa-circle-notch fa-spin"></i> Syncing personal bests...</li>';
        try {
            const snap = await get(ref(db, 'leaderboards/global'));
            const all = [];
            if (snap.exists()) snap.forEach(c => all.push(c.val()));
            const mine = all
                .filter(s => s.user === dName && s.time !== 'unlimited' && !s.constellation)
                .sort((a, b) => b.points - a.points)
                .slice(0, 6);

            if (mine.length === 0) {
                personalEl.innerHTML = '<li class="obs-lb-empty">Complete a timed blind-map drill to log your first record.</li>';
            } else {
                personalEl.innerHTML = mine.map(sc => `
                    <li class="obs-lb-row">
                        <div class="obs-lb-left">
                            <div>
                                <div class="obs-lb-name">${escapeHtml(SKILL_MODE_LABELS[sc.mode] || sc.mode)} · <span>${escapeHtml(TARGET_POOL_LABELS[sc.target] || sc.target)}</span></div>
                                <div class="obs-lb-sub">${escapeHtml(DIFFICULTY_SHORT_LABELS[sc.diff] || sc.diff)} · ${sc.time}m · ${formatDate(sc.date)}</div>
                            </div>
                        </div>
                        <div class="obs-lb-right">
                            <span class="obs-lb-val">${formatPoints(sc.points)} pts</span>
                            ${sc.rate ? `<span class="obs-lb-meta">${sc.rate}s/obj</span>` : ''}
                        </div>
                    </li>
                `).join('');
            }
        } catch {
            personalEl.innerHTML = '<li class="obs-lb-empty">Could not sync personal records.</li>';
        }
    }

    if (historyEl) {
        historyEl.innerHTML = '<li class="obs-lb-empty"><i class="fa-solid fa-circle-notch fa-spin"></i> Loading match history...</li>';
        try {
            const snap = await get(ref(db, `users/${State.currentUser.uid}/history`));
            const history = [];
            if (snap.exists()) snap.forEach(c => history.push(c.val()));
            history.sort((a, b) => new Date(b.date) - new Date(a.date));

            if (history.length === 0) {
                historyEl.innerHTML = '<li class="obs-lb-empty">No ranked 1v1 matches played yet.</li>';
            } else {
                historyEl.innerHTML = history.slice(0, 12).map(m => {
                    const cls = m.eloChange > 0 ? 'win' : (m.eloChange < 0 ? 'loss' : 'draw');
                    const outcome = m.eloChange > 0 ? 'WIN' : (m.eloChange < 0 ? 'LOSS' : 'DRAW');
                    const sign = m.eloChange > 0 ? '+' : '';
                    return `
                        <li class="obs-lb-row">
                            <div class="obs-lb-left">
                                <div>
                                    <div class="obs-lb-name">vs ${escapeHtml(m.opponent)}</div>
                                    <div class="obs-lb-sub">${escapeHtml(SKILL_MODE_LABELS[m.mode] || m.mode)} · ${formatDate(m.date)}</div>
                                </div>
                            </div>
                            <div class="obs-lb-right">
                                <span class="obs-match-badge ${cls}">${outcome} ${sign}${m.eloChange}</span>
                                <span class="obs-lb-sub">${formatPoints(m.score)} – ${formatPoints(m.oppScore)}</span>
                            </div>
                        </li>
                    `;
                }).join('');
            }
        } catch {
            historyEl.innerHTML = '<li class="obs-lb-empty">Could not load match history.</li>';
        }
    }
}
