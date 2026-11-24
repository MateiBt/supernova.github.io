// js/planetarium/drills.js
// Exam-grade Blind-Map Drills, Isolated Constellation Practice (all 88 IAU constellations),
// and 1v1 Ranked ELO Arena (Online RTDB rooms, Practice Bot, Local 1v1) over the live 3D sky.

import { State, db, getDisplayName } from './state.js';
import {
    ref,
    set,
    get,
    update,
    onValue,
    onDisconnect,
    remove
} from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js';
import {
    getLevenshteinDistance,
    formatClockSec,
    formatTimeMs,
    formatPoints,
    shuffleArray
} from './astronomy.js';
import {
    IAU_CONSTELLATIONS,
    OBJECT_TYPE_LABELS,
    STAR_TYPE_KEYS,
    DSO_TYPE_KEYS,
    SKILL_MODE_LABELS,
    DIFFICULTY_SHORT_LABELS,
    TARGET_POOL_LABELS
} from './catalog_data.js';
import { filterDsoByDifficulty, normalizeQuery } from './catalog.js';
import {
    saveDrillScore,
    savePracticeScore,
    recordRankedEloResult
} from './leaderboards.js';

export class DrillController {
    constructor(callbacks = {}) {
        this.callbacks = callbacks; // { onSessionChange, onRecordsRefresh, onToast }
        this.selectedTypes = new Set();
        this._bindDom();
    }

    _bindDom() {
        this.els = {
            hudBar: document.getElementById('drill-hud-bar'),
            modeBadge: document.getElementById('drill-mode-badge'),
            promptEl: document.getElementById('drill-prompt'),
            scoreEl: document.getElementById('drill-score'),
            streakEl: document.getElementById('drill-streak'),
            mistakesEl: document.getElementById('drill-mistakes'),
            timerEl: document.getElementById('drill-timer'),
            sparklineEl: document.getElementById('drill-sparkline'),
            arenaStrip: document.getElementById('drill-arena-strip'),
            exitBtn: document.getElementById('btn-exit-drill'),

            answerDock: document.getElementById('drill-answer-dock'),
            feedbackEl: document.getElementById('drill-feedback'),
            nameWrap: document.getElementById('drill-name-wrap'),
            nameInput: document.getElementById('drill-name-input'),
            magWrap: document.getElementById('drill-mag-wrap'),
            magInput: document.getElementById('drill-mag-input'),
            typeWrap: document.getElementById('drill-type-wrap'),
            typeGrid: document.getElementById('drill-type-grid'),
            posHint: document.getElementById('drill-pos-hint'),
            submitBtn: document.getElementById('btn-drill-submit'),

            summaryModal: document.getElementById('session-summary-overlay'),
            summaryTitle: document.getElementById('summary-title'),
            summarySubtitle: document.getElementById('summary-subtitle'),
            summaryStats: document.getElementById('summary-stats'),
            summaryNote: document.getElementById('summary-note'),
            btnSummaryReplay: document.getElementById('btn-summary-replay'),
            btnSummaryClose: document.getElementById('btn-summary-close'),

            roomCodeDisplay: document.getElementById('arena-room-code'),
            roomStatusEl: document.getElementById('arena-room-status'),
            joinCodeInput: document.getElementById('arena-join-code'),
            btnLaunchArena: document.getElementById('btn-launch-arena')
        };

        if (this.els.exitBtn) {
            this.els.exitBtn.addEventListener('click', () => this.stopSession(false));
        }

        if (this.els.submitBtn) {
            this.els.submitBtn.addEventListener('click', () => this.submitCurrentAnswer());
        }

        if (this.els.nameInput) {
            this.els.nameInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    this.submitCurrentAnswer();
                }
            });
        }

        if (this.els.magInput) {
            this.els.magInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    this.submitCurrentAnswer();
                }
            });
        }

        if (this.els.btnSummaryClose) {
            this.els.btnSummaryClose.addEventListener('click', () => {
                this.hideSummary();
            });
        }

        if (this.els.btnSummaryReplay) {
            this.els.btnSummaryReplay.addEventListener('click', () => {
                const lastKind = this._lastFinishedKind;
                const lastCon = this._lastFinishedConstellation;
                this.hideSummary();
                if (lastKind === 'practice' && lastCon) {
                    this.startConstellationPractice(lastCon);
                } else if (lastKind === 'arena' && !State.arenaIsOnline) {
                    this.startLocalOrBotArena();
                } else {
                    this.startBlindDrill();
                }
            });
        }
    }

    _toast(msg, tone = 'info') {
        if (this.callbacks.onToast) this.callbacks.onToast(msg, tone);
    }

    _scheduleTimeout(fn, delayMs) {
        const id = setTimeout(() => {
            State.roundTimeoutIds = State.roundTimeoutIds.filter(t => t !== id);
            fn();
        }, delayMs);
        State.roundTimeoutIds.push(id);
        return id;
    }

    _clearTimers() {
        if (State.sessionTimerId) {
            clearInterval(State.sessionTimerId);
            State.sessionTimerId = null;
        }
        if (State.turnTimerId) {
            clearInterval(State.turnTimerId);
            State.turnTimerId = null;
        }
        for (const id of State.roundTimeoutIds) {
            clearTimeout(id);
        }
        State.roundTimeoutIds = [];
    }

    _detachOnlineListeners() {
        if (State.lobbyUnsub) { State.lobbyUnsub(); State.lobbyUnsub = null; }
        if (State.stateUnsub) { State.stateUnsub(); State.stateUnsub = null; }
        if (State.actionUnsub) { State.actionUnsub(); State.actionUnsub = null; }
        if (State.playersUnsub) { State.playersUnsub(); State.playersUnsub = null; }
    }

    _enterBlindSky(targetPool, keepConstellationLines = false) {
        if (!State.savedOverlaysBeforeDrill) {
            State.savedOverlaysBeforeDrill = { ...State.overlays };
        }
        if (State.engine) {
            State.engine.setObservatorySelection(null, null);
            State.engine.applySettings({
                equatorialGrid: false,
                altAzGrid: false,
                eclipticPlane: false,
                constellationLines: keepConstellationLines,
                constellationBoundaries: false,
                starLabels: false,
                dsoMarkers: false,
                magLimit: 6.5,
                dsoPointVisible: targetPool === 'dso',
                isDrillActive: true
            });
        }
    }

    _restoreObservatorySky() {
        if (State.engine) {
            State.engine.setPrimaryHighlight(null);
            const restored = State.savedOverlaysBeforeDrill || State.overlays;
            State.engine.applySettings({
                ...restored,
                dsoPointVisible: true,
                isDrillActive: false
            });
            State.engine.setObservatorySelection(State.selectedObject, State.previousObject);
        }
        State.savedOverlaysBeforeDrill = null;
    }

    _getActiveSkillMode() {
        if (State.sessionKind === 'practice') return 'name';
        if (State.sessionKind === 'arena') return State.arenaConfig.skillMode;
        return State.drillConfig.mode;
    }

    _pickRandomTarget() {
        if (!State.catalog) return null;
        const pool = State.sessionKind === 'arena' ? 'stars' : State.drillConfig.target;
        const diff = State.sessionKind === 'arena' ? 'medium' : State.drillConfig.diff;

        let maxMag = 6.5;
        if (diff === 'easy') maxMag = 2.0;
        else if (diff === 'medium') maxMag = 4.0;
        else if (diff === 'hard') maxMag = 5.0;

        let candidates;
        if (pool === 'dso') {
            candidates = filterDsoByDifficulty(State.catalog.dsos, diff);
        } else {
            candidates = State.catalog.stars.filter(s => s.mag <= maxMag && s.bayerName);
        }

        if (candidates.length === 0) {
            candidates = State.catalog.stars.filter(s => s.mag <= 3.5 && s.properName);
        }

        // Prefer named targets (90%) while keeping unnamed Bayer stars in the pool for exam realism
        const named = candidates.filter(c => c.correctName && c.correctName !== '');
        const unnamed = candidates.filter(c => !c.correctName);

        let picked;
        if (named.length > 0 && unnamed.length > 0) {
            const bucket = Math.random() < 0.88 ? named : unnamed;
            picked = bucket[Math.floor(Math.random() * bucket.length)];
        } else {
            picked = candidates[Math.floor(Math.random() * candidates.length)];
        }

        // Avoid immediate back-to-back repeat
        if (State.currentTarget && picked && picked.id === State.currentTarget.id && candidates.length > 1) {
            const idx = candidates.indexOf(picked);
            picked = candidates[(idx + 1) % candidates.length];
        }
        return picked;
    }

    /**
     * Launch a Singleplayer Blind-Map Drill directly over the live 3D sky.
     */
    startBlindDrill() {
        this._clearTimers();
        this._detachOnlineListeners();

        State.sessionKind = 'drill';
        State.isSessionActive = true;
        State.practiceConstellation = null;
        State.arenaIsOnline = false;
        State.score = 0;
        State.mistakes = 0;
        State.streak = 0;
        State.totalLettersGuessed = 0;
        State.totalPlayTimeSec = 0;
        State.performanceHistory = [];
        State.isTimerPaused = false;

        this._enterBlindSky(State.drillConfig.target, false);
        this._showDrillChrome(
            `${SKILL_MODE_LABELS[State.drillConfig.mode]} · ${TARGET_POOL_LABELS[State.drillConfig.target]} · ${DIFFICULTY_SHORT_LABELS[State.drillConfig.diff]}`
        );
        this._startSessionClock();
        this._nextRound();

        if (this.callbacks.onSessionChange) this.callbacks.onSessionChange(true, 'drill');
    }

    /**
     * Launch Isolated Constellation Practice for any of the 88 IAU constellations.
     */
    startConstellationPractice(abbr) {
        if (!State.catalog || !IAU_CONSTELLATIONS[abbr]) return;
        const pool = State.catalog.stars.filter(
            s => s.constellation === abbr && (s.bayerName || s.properName)
        );
        if (pool.length === 0) {
            this._toast(`No cataloged practice stars found for ${IAU_CONSTELLATIONS[abbr]}.`, 'warn');
            return;
        }

        this._clearTimers();
        this._detachOnlineListeners();

        State.sessionKind = 'practice';
        State.isSessionActive = true;
        State.practiceConstellation = abbr;
        State.practiceQueue = shuffleArray(pool);
        State.practiceIndex = 0;
        State.practiceElapsedMs = 0;
        State.practiceLastTickMs = performance.now();
        State.score = 0;
        State.mistakes = 0;
        State.streak = 0;
        State.totalLettersGuessed = 0;
        State.totalPlayTimeSec = 0;
        State.performanceHistory = [];
        State.isTimerPaused = false;

        this._enterBlindSky('stars', true);
        this._showDrillChrome(`Constellation Drill · ${IAU_CONSTELLATIONS[abbr]} (${abbr})`);
        this._startSessionClock();
        this._nextRound();

        if (this.callbacks.onSessionChange) this.callbacks.onSessionChange(true, 'practice');
    }

    /**
     * Launch a 1v1 Arena match vs Practice Bot or Local Hot-Seat player.
     */
    startLocalOrBotArena(p1NameInput = '', p2NameInput = '') {
        this._clearTimers();
        this._detachOnlineListeners();

        State.sessionKind = 'arena';
        State.isSessionActive = true;
        State.practiceConstellation = null;
        State.arenaIsOnline = false;
        State.arenaRole = null;
        State.arenaRoomCode = null;
        State.arenaRound = 1;
        State.arenaTurnIndex = 0;
        State.score = 0;
        State.mistakes = 0;
        State.streak = 0;
        State.performanceHistory = [];
        State.isTimerPaused = false;

        const isBot = State.arenaConfig.opponentType === 'bot';
        const p1Name = p1NameInput.trim() || getDisplayName();
        const p2Name = p2NameInput.trim() || (isBot ? `Observatory Bot (${Math.round(State.arenaConfig.botAccuracy * 100)}%)` : 'Player 2');

        State.arenaPlayers = {
            p1: { name: p1Name, score: 0, timeMs: 0, streak: 0, history: [], isBot: false },
            p2: { name: p2Name, score: 0, timeMs: 0, streak: 0, history: [], isBot, botAcc: State.arenaConfig.botAccuracy }
        };
        State.arenaOrder = ['p1', 'p2'];
        State.arenaIsMyTurn = true;

        this._enterBlindSky('stars', false);
        this._showDrillChrome(`1v1 Arena · ${SKILL_MODE_LABELS[State.arenaConfig.skillMode]}`);
        this._renderArenaStrip();
        this._nextRound();

        if (this.callbacks.onSessionChange) this.callbacks.onSessionChange(true, 'arena');
    }

    /**
     * Host an Online Ranked 1v1 Room under lobbies/${roomCode} (preserving exact Firebase RTDB schema).
     */
    hostOnlineRoom() {
        this._detachOnlineListeners();
        const code = Math.random().toString(36).substring(2, 8).toUpperCase();
        State.arenaIsOnline = true;
        State.arenaRole = 'host';
        State.arenaRoomCode = code;
        State.arenaConfig.opponentType = 'online-ranked';

        const myName = getDisplayName();
        const myElo = State.myElo[State.arenaConfig.skillMode] || 1200;

        const roomRef = ref(db, `lobbies/${code}`);
        set(roomRef, {
            status: 'waiting',
            mode: State.arenaConfig.skillMode,
            players: {
                [State.myClientId]: {
                    name: myName,
                    score: 0,
                    timeMs: 0,
                    elo: myElo,
                    streak: 0,
                    history: []
                }
            }
        }).catch(() => {
            this._toast('Could not connect to Firebase lobby. Check sign-in or network.', 'error');
        });
        onDisconnect(roomRef).remove();

        if (this.els.roomCodeDisplay) this.els.roomCodeDisplay.textContent = code;
        if (this.els.roomStatusEl) this.els.roomStatusEl.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin"></i> Waiting for opponent to join room <strong>${code}</strong>...`;
        if (this.els.btnLaunchArena) {
            this.els.btnLaunchArena.disabled = true;
            this.els.btnLaunchArena.textContent = 'Waiting for Opponent...';
        }

        State.lobbyUnsub = onValue(roomRef, (snap) => {
            const data = snap.val();
            if (!data) return;
            State.arenaPlayers = data.players || {};
            const count = Object.keys(State.arenaPlayers).length;
            if (count >= 2 && data.status === 'waiting') {
                const opp = Object.entries(State.arenaPlayers).find(([id]) => id !== State.myClientId);
                const oppName = opp ? opp[1].name : 'Challenger';
                if (this.els.roomStatusEl) {
                    this.els.roomStatusEl.innerHTML = `<i class="fa-solid fa-circle-check" style="color:var(--accent-green);"></i> <strong>${oppName}</strong> joined (${opp?.[1]?.elo || 1200} ELO). Ready to launch!`;
                }
                if (this.els.btnLaunchArena) {
                    this.els.btnLaunchArena.disabled = false;
                    this.els.btnLaunchArena.textContent = 'Launch Ranked 1v1 Match';
                }
            }
            if (data.status === 'playing' && !State.isSessionActive) {
                this._enterOnlineArenaMatch();
            }
        });

        return code;
    }

    /**
     * Join an existing Online Ranked 1v1 Room by 6-character code.
     */
    async joinOnlineRoom(rawCode) {
        const code = (rawCode || '').trim().toUpperCase();
        if (code.length < 4) {
            this._toast('Enter a valid 6-character room code.', 'warn');
            return false;
        }
        this._detachOnlineListeners();

        const roomRef = ref(db, `lobbies/${code}`);
        try {
            const snap = await get(roomRef);
            if (!snap.exists()) {
                this._toast(`Room ${code} was not found.`, 'error');
                return false;
            }
            const data = snap.val();
            if (data.status !== 'waiting') {
                this._toast(`Room ${code} is already in progress.`, 'warn');
                return false;
            }

            State.arenaIsOnline = true;
            State.arenaRole = 'guest';
            State.arenaRoomCode = code;
            State.arenaConfig.opponentType = 'online-ranked';
            if (data.mode) State.arenaConfig.skillMode = data.mode;

            const myName = getDisplayName();
            const myElo = State.myElo[State.arenaConfig.skillMode] || 1200;

            await update(ref(db, `lobbies/${code}/players/${State.myClientId}`), {
                name: myName,
                score: 0,
                timeMs: 0,
                elo: myElo,
                streak: 0,
                history: []
            });

            if (this.els.roomStatusEl) {
                this.els.roomStatusEl.innerHTML = `<i class="fa-solid fa-circle-check" style="color:var(--accent-green);"></i> Connected to <strong>${code}</strong>. Waiting for host to start...`;
            }
            if (this.els.btnLaunchArena) {
                this.els.btnLaunchArena.disabled = true;
                this.els.btnLaunchArena.textContent = 'Waiting for Host...';
            }

            State.lobbyUnsub = onValue(roomRef, (liveSnap) => {
                const live = liveSnap.val();
                if (!live) {
                    if (State.isSessionActive) {
                        this._toast('Host closed the online room.', 'warn');
                        this.stopSession(false);
                    }
                    return;
                }
                State.arenaPlayers = live.players || {};
                if (live.status === 'playing' && !State.isSessionActive) {
                    this._enterOnlineArenaMatch();
                }
            });
            return true;
        } catch {
            this._toast('Unable to join room. Check connection.', 'error');
            return false;
        }
    }

    launchHostedOnlineMatch() {
        if (!State.arenaIsOnline || State.arenaRole !== 'host' || !State.arenaRoomCode) return;
        const order = Object.keys(State.arenaPlayers);
        if (order.length < 2) {
            this._toast('Wait for an opponent to join before launching.', 'warn');
            return;
        }
        const firstTarget = this._pickRandomTarget();
        update(ref(db, `lobbies/${State.arenaRoomCode}`), {
            status: 'playing',
            state: {
                targetId: firstTarget.id,
                turnIndex: 0,
                currentRound: 1,
                order,
                gameMode: State.arenaConfig.skillMode
            }
        }).catch(() => {});
    }

    _enterOnlineArenaMatch() {
        this._clearTimers();
        State.sessionKind = 'arena';
        State.isSessionActive = true;
        State.practiceConstellation = null;
        State.performanceHistory = [];
        State.isTimerPaused = false;

        this._enterBlindSky('stars', false);
        this._showDrillChrome(`Ranked 1v1 · ${SKILL_MODE_LABELS[State.arenaConfig.skillMode]}`);
        this._renderArenaStrip();

        const code = State.arenaRoomCode;
        State.stateUnsub = onValue(ref(db, `lobbies/${code}/state`), (snap) => {
            const data = snap.val();
            if (data) this._syncOnlineState(data);
        });

        State.playersUnsub = onValue(ref(db, `lobbies/${code}/players`), (snap) => {
            const p = snap.val();
            if (p) {
                State.arenaPlayers = p;
                this._renderArenaStrip();
            }
        });

        State.actionUnsub = onValue(ref(db, `lobbies/${code}/lastAction`), (snap) => {
            const action = snap.val();
            if (!action) return;
            State.isTimerPaused = true;
            const pName = State.arenaPlayers[action.playerId]?.name || 'Player';
            if (action.correct) {
                this._showFeedback(`${pName} acquired target (+${formatPoints(action.points)} pts)`, 'correct');
                if (State.engine) State.engine.setPrimaryHighlight(State.currentTarget, 0x2be38a);
            } else {
                const prefix = action.timeout ? 'Time expired · ' : 'Missed · ';
                this._showFeedback(`${prefix}${pName} — Answer: ${action.answerLabel || 'N/A'}`, 'wrong');
                if (State.engine) State.engine.setPrimaryHighlight(State.currentTarget, 0xff5c7a);
            }
            if (this.els.submitBtn) this.els.submitBtn.style.display = 'none';

            if (State.arenaRole === 'host') {
                this._scheduleTimeout(() => {
                    let nextTurn = (State.arenaTurnIndex + 1) % State.arenaOrder.length;
                    let nextRound = State.arenaRound;
                    if (nextTurn === 0) nextRound++;
                    const nextTarget = this._pickRandomTarget();
                    update(ref(db, `lobbies/${code}/state`), {
                        turnIndex: nextTurn,
                        currentRound: nextRound,
                        targetId: nextTarget ? nextTarget.id : State.currentTarget.id
                    }).catch(() => {});
                }, 2200);
            }
        });

        if (this.callbacks.onSessionChange) this.callbacks.onSessionChange(true, 'arena');
    }

    _syncOnlineState(data) {
        State.arenaOrder = data.order || [];
        State.arenaTurnIndex = data.turnIndex || 0;
        State.arenaRound = data.currentRound || 1;
        if (data.gameMode) State.arenaConfig.skillMode = data.gameMode;

        if (State.arenaRound > State.arenaConfig.maxRounds) {
            this.stopSession(true);
            return;
        }

        State.currentTarget = State.catalog.objects.find(o => o.id === data.targetId) || State.catalog.stars[0];
        const activeId = State.arenaOrder[State.arenaTurnIndex];
        const activePlayer = State.arenaPlayers[activeId] || { name: 'Player' };
        State.arenaIsMyTurn = activeId === State.myClientId;
        State.targetStartMs = performance.now();

        this._renderArenaStrip();
        this._renderScoreAndStats();
        this._prepareSkillInput(State.arenaConfig.skillMode);

        if (State.engine) {
            State.engine.setPrimaryHighlight(State.currentTarget, State.arenaIsMyTurn ? 0x35e6ff : 0xffcf5c);
            if (State.arenaConfig.skillMode !== 'position') {
                State.engine.slewToRaDec(State.currentTarget.ra, State.currentTarget.dec, 44);
            }
        }

        if (State.arenaIsMyTurn) {
            this._setPrompt(`<span class="accent-cyan">YOUR TURN</span> · ${this._buildPromptText(State.arenaConfig.skillMode, State.currentTarget)}`);
            this._setInputEnabled(true);
        } else {
            this._setPrompt(`<span class="accent-gold">${activePlayer.name}</span> is answering...`);
            this._setInputEnabled(false);
        }

        this._startTurnShotClock(true);
    }

    _showDrillChrome(badgeText) {
        if (this.els.hudBar) this.els.hudBar.classList.add('active');
        if (this.els.answerDock) this.els.answerDock.classList.add('active');
        if (this.els.modeBadge) this.els.modeBadge.textContent = badgeText;
        if (this.els.arenaStrip) {
            this.els.arenaStrip.style.display = State.sessionKind === 'arena' ? 'flex' : 'none';
        }
        this._renderScoreAndStats();
        this._renderSparkline();
    }

    _hideDrillChrome() {
        if (this.els.hudBar) this.els.hudBar.classList.remove('active');
        if (this.els.answerDock) this.els.answerDock.classList.remove('active');
    }

    _startSessionClock() {
        if (State.sessionTimerId) clearInterval(State.sessionTimerId);

        if (State.sessionKind === 'practice') {
            State.practiceLastTickMs = performance.now();
            State.sessionTimerId = setInterval(() => {
                const now = performance.now();
                const delta = now - State.practiceLastTickMs;
                State.practiceLastTickMs = now;
                if (!State.isTimerPaused) {
                    State.practiceElapsedMs += delta;
                    State.totalPlayTimeSec = State.practiceElapsedMs / 1000;
                    if (this.els.timerEl) {
                        this.els.timerEl.textContent = formatTimeMs(State.practiceElapsedMs + State.mistakes * 3000);
                    }
                }
            }, 40);
            return;
        }

        if (State.drillConfig.time === 'unlimited') {
            let elapsed = 0;
            if (this.els.timerEl) this.els.timerEl.textContent = '00:00';
            State.sessionTimerId = setInterval(() => {
                if (State.isTimerPaused) return;
                elapsed++;
                State.totalPlayTimeSec++;
                if (this.els.timerEl) this.els.timerEl.textContent = formatClockSec(elapsed);
            }, 1000);
        } else {
            State.remainingSec = parseInt(State.drillConfig.time, 10) * 60;
            if (this.els.timerEl) this.els.timerEl.textContent = formatClockSec(State.remainingSec);
            State.sessionTimerId = setInterval(() => {
                if (State.isTimerPaused) return;
                State.remainingSec--;
                State.totalPlayTimeSec++;
                if (State.remainingSec <= 0) {
                    if (this.els.timerEl) this.els.timerEl.textContent = '00:00';
                    this.stopSession(true);
                } else if (this.els.timerEl) {
                    this.els.timerEl.textContent = formatClockSec(State.remainingSec);
                }
            }, 1000);
        }
    }

    _startTurnShotClock(isOnline = false) {
        if (State.turnTimerId) clearInterval(State.turnTimerId);
        State.arenaTurnSeconds = 15;
        State.isTimerPaused = false;
        if (this.els.timerEl) this.els.timerEl.textContent = '00:15';

        State.turnTimerId = setInterval(() => {
            if (State.isTimerPaused) return;
            State.arenaTurnSeconds = Math.max(0, State.arenaTurnSeconds - 1);
            if (this.els.timerEl) {
                this.els.timerEl.textContent = `00:${String(State.arenaTurnSeconds).padStart(2, '0')}`;
            }
            if (State.arenaTurnSeconds <= 0) {
                clearInterval(State.turnTimerId);
                State.turnTimerId = null;
                if (isOnline) {
                    if (State.arenaRole === 'host') this._advanceOnlineTimeout();
                } else {
                    this._gradeAndAdvance(false, State.currentTarget, true, 0);
                }
            }
        }, 1000);
    }

    _advanceOnlineTimeout() {
        State.isTimerPaused = true;
        const activeId = State.arenaOrder[State.arenaTurnIndex];
        const activePlayer = State.arenaPlayers[activeId] || { history: [], timeMs: 0 };
        const history = (activePlayer.history || []).slice();
        history.push({ correct: false, time: 15000 });
        if (history.length > 20) history.shift();

        update(ref(db, `lobbies/${State.arenaRoomCode}/players/${activeId}`), {
            streak: 0,
            history,
            timeMs: (activePlayer.timeMs || 0) + 15000
        }).catch(() => {});

        update(ref(db, `lobbies/${State.arenaRoomCode}/lastAction`), {
            playerId: activeId,
            correct: false,
            points: 0,
            time: 15000,
            answerLabel: this._buildAnswerLabel(State.currentTarget, State.arenaConfig.skillMode),
            timeout: true,
            timestamp: Date.now()
        }).catch(() => {});
    }

    _buildPromptText(skill, target) {
        const refLabel = target.bayerSymbol || target.bayerName || target.id;
        if (skill === 'position') {
            const namePart = target.properName ? `${target.properName} (${refLabel})` : refLabel;
            return `Locate on sky sphere: <strong>${namePart}</strong>`;
        }
        if (skill === 'type') {
            return `Classify highlighted object: <strong>${refLabel}</strong>`;
        }
        if (skill === 'mag') {
            return `Estimate apparent magnitude (m<sub>V</sub>) of <strong>${refLabel}</strong>`;
        }
        if (target.isDSO) {
            return `Identify highlighted Deep Sky Object (Messier / NGC / Name)`;
        }
        return `Identify proper English name of highlighted star <span class="muted">(leave blank if unnamed)</span>`;
    }

    _buildAnswerLabel(target, skill) {
        if (!target) return 'N/A';
        if (skill === 'type') {
            if (target.isDSO) return OBJECT_TYPE_LABELS[target.correctType] || target.subtype;
            return (target.correctTypes || ['single']).map(t => OBJECT_TYPE_LABELS[t] || t).join(', ');
        }
        if (skill === 'mag') return `${target.mag.toFixed(2)} mag`;
        if (skill === 'position') return target.properName || target.bayerName || target.id;
        if (target.isDSO) return target.properName ? `${target.id} · ${target.properName}` : target.id;
        return target.properName || 'None (unnamed star)';
    }

    _prepareSkillInput(skill) {
        this.selectedTypes.clear();
        State.pendingPositionPick = null;

        if (this.els.feedbackEl) {
            this.els.feedbackEl.className = 'drill-feedback';
            this.els.feedbackEl.textContent = '';
            this.els.feedbackEl.style.display = 'none';
        }
        if (this.els.nameWrap) this.els.nameWrap.style.display = skill === 'name' ? 'flex' : 'none';
        if (this.els.magWrap) this.els.magWrap.style.display = skill === 'mag' ? 'flex' : 'none';
        if (this.els.typeWrap) this.els.typeWrap.style.display = skill === 'type' ? 'flex' : 'none';
        if (this.els.posHint) {
            this.els.posHint.style.display = skill === 'position' ? 'flex' : 'none';
            this.els.posHint.textContent = 'Click directly on the matching star or DSO on the sky sphere.';
        }

        if (this.els.nameInput) this.els.nameInput.value = '';
        if (this.els.magInput) this.els.magInput.value = '';

        if (this.els.submitBtn) {
            this.els.submitBtn.style.display = skill === 'position' ? 'inline-flex' : 'inline-flex';
            this.els.submitBtn.disabled = skill === 'position';
            this.els.submitBtn.textContent = skill === 'position' ? 'Confirm Selection' : 'Submit';
        }

        if (skill === 'type' && this.els.typeGrid) {
            const isDsoTarget = State.currentTarget && State.currentTarget.isDSO;
            const keys = isDsoTarget ? DSO_TYPE_KEYS : STAR_TYPE_KEYS;
            this.els.typeGrid.innerHTML = keys.map(k => `
                <button type="button" class="drill-type-pill" data-type="${k}">${OBJECT_TYPE_LABELS[k]}</button>
            `).join('');
            this.els.typeGrid.querySelectorAll('.drill-type-pill').forEach(btn => {
                btn.addEventListener('click', () => {
                    if (State.sessionKind === 'arena' && !State.arenaIsMyTurn) return;
                    const key = btn.dataset.type;
                    if (isDsoTarget) {
                        this.selectedTypes.clear();
                        this.els.typeGrid.querySelectorAll('.drill-type-pill').forEach(b => b.classList.remove('selected'));
                        this.selectedTypes.add(key);
                        btn.classList.add('selected');
                    } else {
                        if (this.selectedTypes.has(key)) {
                            this.selectedTypes.delete(key);
                            btn.classList.remove('selected');
                        } else {
                            this.selectedTypes.add(key);
                            btn.classList.add('selected');
                        }
                    }
                });
            });
        }
    }

    _setInputEnabled(enabled) {
        if (this.els.nameInput) this.els.nameInput.disabled = !enabled;
        if (this.els.magInput) this.els.magInput.disabled = !enabled;
        if (this.els.submitBtn) {
            const skill = this._getActiveSkillMode();
            this.els.submitBtn.disabled = !enabled || (skill === 'position' && !State.pendingPositionPick);
        }
    }

    _setPrompt(html) {
        if (this.els.promptEl) this.els.promptEl.innerHTML = html;
    }

    _showFeedback(html, tone) {
        if (!this.els.feedbackEl) return;
        this.els.feedbackEl.innerHTML = html;
        this.els.feedbackEl.className = `drill-feedback ${tone}`;
        this.els.feedbackEl.style.display = 'block';
    }

    _nextRound() {
        if (!State.isSessionActive) return;

        if (State.sessionKind === 'arena') {
            if (State.arenaRound > State.arenaConfig.maxRounds) {
                this.stopSession(true);
                return;
            }
        }

        if (State.sessionKind === 'practice') {
            if (State.practiceIndex >= State.practiceQueue.length) {
                this.stopSession(true);
                return;
            }
            State.currentTarget = State.practiceQueue[State.practiceIndex];
        } else {
            State.currentTarget = this._pickRandomTarget();
        }

        if (!State.currentTarget) {
            this.stopSession(false);
            return;
        }

        const skill = this._getActiveSkillMode();
        State.targetStartMs = performance.now();
        State.isTimerPaused = false;

        this._prepareSkillInput(skill);
        this._renderScoreAndStats();
        this._renderSparkline();

        if (State.sessionKind === 'arena') {
            this._renderArenaStrip();
            const activeId = State.arenaOrder[State.arenaTurnIndex];
            const activePlayer = State.arenaPlayers[activeId];
            const colorHex = activeId === 'p1' ? 0x35e6ff : 0xffcf5c;
            State.arenaIsMyTurn = !activePlayer.isBot;

            if (State.engine) {
                if (skill !== 'position') {
                    State.engine.setPrimaryHighlight(State.currentTarget, colorHex);
                    State.engine.slewToRaDec(State.currentTarget.ra, State.currentTarget.dec, 44);
                } else {
                    State.engine.setPrimaryHighlight(null);
                }
            }

            this._startTurnShotClock(false);

            if (activePlayer.isBot) {
                this._setPrompt(`<span class="accent-gold">${activePlayer.name}</span> is analyzing the starfield...`);
                this._setInputEnabled(false);
                const delay = 1800 + Math.random() * 2400;
                this._scheduleTimeout(() => {
                    if (!State.isSessionActive || State.sessionKind !== 'arena' || State.isTimerPaused) return;
                    const botCorrect = Math.random() < (activePlayer.botAcc || 0.7);
                    this._gradeAndAdvance(botCorrect, State.currentTarget, false, botCorrect ? 1 : 0);
                }, delay);
            } else {
                const badgeClass = activeId === 'p1' ? 'accent-cyan' : 'accent-gold';
                this._setPrompt(`<span class="${badgeClass}">${activePlayer.name}'s Turn</span> · ${this._buildPromptText(skill, State.currentTarget)}`);
                this._setInputEnabled(true);
                this._focusActiveInput(skill);
            }
            return;
        }

        // Singleplayer Blind Drill or Isolated Constellation Practice
        this._setPrompt(this._buildPromptText(skill, State.currentTarget));
        this._setInputEnabled(true);

        if (State.engine) {
            if (skill === 'position') {
                State.engine.setPrimaryHighlight(null);
            } else {
                State.engine.setPrimaryHighlight(State.currentTarget, 0xffcf5c);
                State.engine.slewToRaDec(State.currentTarget.ra, State.currentTarget.dec, 42);
            }
        }
        this._focusActiveInput(skill);
    }

    _focusActiveInput(skill) {
        this._scheduleTimeout(() => {
            if (skill === 'name' && this.els.nameInput && !this.els.nameInput.disabled) {
                this.els.nameInput.focus();
            } else if (skill === 'mag' && this.els.magInput && !this.els.magInput.disabled) {
                this.els.magInput.focus();
            }
        }, 80);
    }

    /**
     * Called by app.js when the user clicks an object on the 3D sphere during an active drill.
     */
    handleSkyClick(clickedObj) {
        if (!State.isSessionActive || State.isTimerPaused) return false;
        const skill = this._getActiveSkillMode();
        if (skill !== 'position') return true; // Absorb clicks during non-position drills
        if (State.sessionKind === 'arena' && !State.arenaIsMyTurn) return true;
        if (!clickedObj) return true;

        State.pendingPositionPick = clickedObj;
        if (State.engine) {
            State.engine.setPrimaryHighlight(clickedObj, 0x35e6ff);
        }
        if (this.els.posHint) {
            this.els.posHint.innerHTML = `Selected <strong>${clickedObj.bayerSymbol || clickedObj.id}</strong> — press <em>Confirm Selection</em> or click another star.`;
        }
        if (this.els.submitBtn) this.els.submitBtn.disabled = false;
        return true;
    }

    submitCurrentAnswer() {
        if (!State.isSessionActive || State.isTimerPaused || !State.currentTarget) return;
        if (State.sessionKind === 'arena' && !State.arenaIsMyTurn) return;

        const skill = this._getActiveSkillMode();
        const target = State.currentTarget;

        if (skill === 'position') {
            if (!State.pendingPositionPick) return;
            const correct = State.pendingPositionPick.id === target.id;
            this._gradeAndAdvance(correct, State.pendingPositionPick, false, correct ? 1 : 0);
            return;
        }

        if (skill === 'name') {
            const raw = this.els.nameInput ? this.els.nameInput.value : '';
            const norm = normalizeQuery(raw);
            let isCorrect = false;

            if (!target.correctName && !target.isDSO) {
                isCorrect = norm === '' || norm === 'none' || norm === 'unnamed' || norm === 'n/a';
            } else {
                const accepted = [target.correctName, ...(target.altNames || [])]
                    .map(normalizeQuery)
                    .filter(Boolean);
                if (target.isDSO) {
                    accepted.push(normalizeQuery(target.id));
                    accepted.push(normalizeQuery(target.id.replace(/\s+/g, '')));
                }
                for (const candidate of accepted) {
                    if (norm === candidate || norm.replace(/\s+/g, '') === candidate.replace(/\s+/g, '')) {
                        isCorrect = true;
                        break;
                    }
                    const tol = candidate.length >= 9 ? 2 : (candidate.length >= 5 ? 1 : 0);
                    if (tol > 0 && norm.length >= 4 && getLevenshteinDistance(norm, candidate) <= tol) {
                        isCorrect = true;
                        break;
                    }
                }
            }
            this._gradeAndAdvance(isCorrect, target, false, isCorrect ? 1 : 0);
            return;
        }

        if (skill === 'type') {
            if (this.selectedTypes.size === 0) {
                this._toast('Select at least one classification option.', 'warn');
                return;
            }
            const picked = [...this.selectedTypes];
            if (target.isDSO) {
                const ok = picked[0] === target.correctType;
                this._gradeAndAdvance(ok, target, false, ok ? 1 : 0);
            } else {
                const truth = target.correctTypes && target.correctTypes.length > 0 ? target.correctTypes : ['single'];
                const hits = picked.filter(p => truth.includes(p)).length;
                const falsePos = picked.filter(p => !truth.includes(p)).length;
                const earned = Math.max(0, (hits - falsePos * 0.5) / truth.length);
                const rounded = Math.round(earned * 100) / 100;
                this._gradeAndAdvance(rounded > 0, target, false, rounded);
            }
            return;
        }

        if (skill === 'mag') {
            const val = parseFloat(this.els.magInput ? this.els.magInput.value : '');
            if (isNaN(val)) {
                this._toast('Enter a numerical magnitude estimate.', 'warn');
                return;
            }
            const err = Math.abs(val - target.mag);
            let pts = 0;
            if (err <= 0.25) pts = 1;
            else if (err <= 0.55) pts = 0.5;
            else if (err <= 0.85) pts = 0.25;
            this._gradeAndAdvance(pts > 0, target, false, pts);
        }
    }

    _gradeAndAdvance(isCorrect, starRef, isTimeout = false, earnedPoints = 1) {
        State.isTimerPaused = true;
        if (State.turnTimerId) {
            clearInterval(State.turnTimerId);
            State.turnTimerId = null;
        }
        if (this.els.submitBtn) this.els.submitBtn.style.display = 'none';

        const elapsedMs = performance.now() - State.targetStartMs;
        const skill = this._getActiveSkillMode();
        const answerLabel = this._buildAnswerLabel(State.currentTarget, skill);

        // 1v1 Arena branch
        if (State.sessionKind === 'arena') {
            if (State.arenaIsOnline) {
                const me = State.arenaPlayers[State.myClientId] || { name: getDisplayName(), score: 0, timeMs: 0, streak: 0, history: [] };
                const history = (me.history || []).slice();
                history.push({ correct: isCorrect, time: elapsedMs });
                if (history.length > 20) history.shift();
                const updated = {
                    ...me,
                    score: (me.score || 0) + (isCorrect ? earnedPoints : 0),
                    streak: isCorrect ? (me.streak || 0) + 1 : 0,
                    timeMs: (me.timeMs || 0) + elapsedMs,
                    history
                };
                update(ref(db, `lobbies/${State.arenaRoomCode}/players/${State.myClientId}`), updated).catch(() => {});
                update(ref(db, `lobbies/${State.arenaRoomCode}/lastAction`), {
                    playerId: State.myClientId,
                    correct: isCorrect,
                    points: isCorrect ? earnedPoints : 0,
                    time: elapsedMs,
                    answerLabel,
                    timeout: isTimeout,
                    timestamp: Date.now()
                }).catch(() => {});
                return;
            }

            const activeId = State.arenaOrder[State.arenaTurnIndex];
            const player = State.arenaPlayers[activeId];
            if (!player.history) player.history = [];
            player.history.push({ correct: isCorrect, time: elapsedMs });
            if (player.history.length > 20) player.history.shift();
            player.timeMs += elapsedMs;
            if (isCorrect) {
                player.score += earnedPoints;
                player.streak = (player.streak || 0) + 1;
            } else {
                player.streak = 0;
            }

            this._renderArenaStrip();
            if (isCorrect) {
                this._showFeedback(`${player.name} acquired target (+${formatPoints(earnedPoints)} pts)`, 'correct');
                if (State.engine) State.engine.setPrimaryHighlight(State.currentTarget, 0x2be38a);
            } else {
                const prefix = isTimeout ? 'Shot clock expired · ' : 'Missed · ';
                this._showFeedback(`${prefix}Correct: <strong>${answerLabel}</strong>`, 'wrong');
                if (State.engine) {
                    State.engine.setPrimaryHighlight(State.currentTarget, 0xff5c7a);
                    if (skill === 'position') State.engine.slewToRaDec(State.currentTarget.ra, State.currentTarget.dec, 42);
                }
            }

            this._scheduleTimeout(() => {
                State.arenaTurnIndex++;
                if (State.arenaTurnIndex >= State.arenaOrder.length) {
                    State.arenaTurnIndex = 0;
                    State.arenaRound++;
                }
                this._nextRound();
            }, 2100);
            return;
        }

        // Singleplayer Blind-Map Drill & Constellation Practice branch
        State.performanceHistory.push({ correct: isCorrect, time: elapsedMs });
        if (State.performanceHistory.length > 20) State.performanceHistory.shift();

        if (isCorrect) {
            State.score += earnedPoints;
            State.streak++;
            if (skill === 'name') {
                State.totalLettersGuessed += State.currentTarget.correctName ? State.currentTarget.correctName.length : 0;
            }
            const ptsNote = earnedPoints < 1 ? ` (+${formatPoints(earnedPoints)} pts · actual ${State.currentTarget.mag.toFixed(2)})` : '';
            this._showFeedback(`Target acquired.${ptsNote}`, 'correct');
            if (State.engine) State.engine.setPrimaryHighlight(State.currentTarget, 0x2be38a);
            this._renderScoreAndStats();
            this._renderSparkline();

            this._scheduleTimeout(() => {
                if (State.sessionKind === 'practice') State.practiceIndex++;
                this._nextRound();
            }, 900);
        } else {
            State.mistakes++;
            State.streak = 0;
            this._showFeedback(`Incorrect · Answer: <strong>${answerLabel}</strong>`, 'wrong');
            if (State.engine) {
                State.engine.setPrimaryHighlight(starRef || State.currentTarget, 0xff5c7a);
                if (skill === 'position') {
                    State.engine.setPrimaryHighlight(State.currentTarget, 0x2be38a);
                    State.engine.slewToRaDec(State.currentTarget.ra, State.currentTarget.dec, 42);
                }
            }
            this._renderScoreAndStats();
            this._renderSparkline();

            this._scheduleTimeout(() => {
                if (State.sessionKind === 'practice') {
                    const missed = State.practiceQueue.splice(State.practiceIndex, 1)[0];
                    if (missed) State.practiceQueue.push(missed);
                }
                this._nextRound();
            }, 2600);
        }
    }

    _renderScoreAndStats() {
        if (this.els.scoreEl) {
            if (State.sessionKind === 'practice') {
                this.els.scoreEl.textContent = `${formatPoints(State.score)} / ${State.practiceQueue.length}`;
            } else if (State.sessionKind === 'arena') {
                this.els.scoreEl.textContent = `R${Math.min(State.arenaRound, State.arenaConfig.maxRounds)}/${State.arenaConfig.maxRounds}`;
            } else {
                this.els.scoreEl.textContent = `${formatPoints(State.score)} pts`;
            }
        }
        if (this.els.streakEl) this.els.streakEl.textContent = String(State.streak);
        if (this.els.mistakesEl) this.els.mistakesEl.textContent = String(State.mistakes);
    }

    _renderArenaStrip() {
        if (!this.els.arenaStrip) return;
        const activeId = State.arenaOrder[State.arenaTurnIndex];
        this.els.arenaStrip.innerHTML = State.arenaOrder.map((id, idx) => {
            const p = State.arenaPlayers[id];
            if (!p) return '';
            const isActive = id === activeId;
            const accent = idx === 0 ? 'cyan' : 'gold';
            return `
                <div class="arena-pill ${isActive ? 'active' : ''} ${accent}">
                    <span class="arena-pill-name">${p.name}</span>
                    <span class="arena-pill-score">${formatPoints(p.score || 0)}</span>
                </div>
            `;
        }).join('');
    }

    _renderSparkline() {
        if (!this.els.sparklineEl) return;
        const hist = State.performanceHistory;
        if (!hist || hist.length === 0) {
            this.els.sparklineEl.innerHTML = '';
            return;
        }
        const bars = hist.slice(-14).map((entry, idx) => {
            const h = Math.max(4, Math.min(20, Math.round(22 - Math.min(entry.time, 12000) / 650)));
            const color = entry.correct ? '#2BE38A' : '#FF5C7A';
            const x = idx * 7;
            return `<rect x="${x}" y="${22 - h}" width="4.5" height="${h}" rx="1.5" fill="${color}" />`;
        }).join('');
        this.els.sparklineEl.innerHTML = `<svg width="${Math.min(hist.length, 14) * 7}" height="22" viewBox="0 0 ${Math.min(hist.length, 14) * 7} 22" aria-hidden="true">${bars}</svg>`;
    }

    /**
     * End any active Drill / Practice / 1v1 Arena session and restore Observatory roam cleanly.
     */
    stopSession(completed = false) {
        if (!State.isSessionActive) return;

        const kind = State.sessionKind;
        const conAbbr = State.practiceConstellation;
        const wasOnline = State.arenaIsOnline;
        const roomCode = State.arenaRoomCode;
        const wasHost = State.arenaRole === 'host';

        this._clearTimers();
        this._detachOnlineListeners();

        let summaryData = null;

        if (kind === 'practice' && conAbbr) {
            const finalMs = State.practiceElapsedMs + State.mistakes * 3000;
            if (completed || State.score > 0) savePracticeScore(finalMs);
            summaryData = {
                title: completed ? `${IAU_CONSTELLATIONS[conAbbr]} Mastered` : `${IAU_CONSTELLATIONS[conAbbr]} Drill Paused`,
                subtitle: `Isolated Constellation Practice · ${conAbbr}`,
                stats: [
                    { label: 'Cleared', value: `${formatPoints(State.score)} / ${State.practiceQueue.length}` },
                    { label: 'Net Time', value: formatTimeMs(finalMs) },
                    { label: 'Mistakes', value: String(State.mistakes) }
                ],
                note: State.mistakes > 0 ? `Includes +${State.mistakes * 3}.0s penalty for ${State.mistakes} missed star${State.mistakes === 1 ? '' : 's'}.` : 'Clean sweep — zero missed stars.'
            };
        } else if (kind === 'drill') {
            if (completed || State.score > 0) saveDrillScore();
            const totalAttempts = State.performanceHistory.length;
            const acc = totalAttempts > 0 ? Math.round((State.performanceHistory.filter(h => h.correct).length / totalAttempts) * 100) : 0;
            const rate = State.score > 0 ? `${(State.totalPlayTimeSec / State.score).toFixed(1)}s/obj` : '—';
            summaryData = {
                title: completed ? 'Blind-Map Drill Complete' : 'Drill Summary',
                subtitle: `${SKILL_MODE_LABELS[State.drillConfig.mode]} · ${TARGET_POOL_LABELS[State.drillConfig.target]} · ${DIFFICULTY_SHORT_LABELS[State.drillConfig.diff]}`,
                stats: [
                    { label: 'Score', value: `${formatPoints(State.score)} pts` },
                    { label: 'Accuracy', value: `${acc}%` },
                    { label: 'Pace', value: rate }
                ],
                note: State.currentUser && State.drillConfig.time !== 'unlimited'
                    ? 'Score synced to the Supernova Global Leaderboard.'
                    : 'Return to Observatory roam or start another timed run.'
            };
        } else if (kind === 'arena') {
            const players = Object.values(State.arenaPlayers);
            const sorted = players.slice().sort((a, b) => (b.score || 0) - (a.score || 0));
            let eloNote = '';

            if (wasOnline && completed && State.arenaConfig.opponentType === 'online-ranked') {
                const me = State.arenaPlayers[State.myClientId];
                const oppId = Object.keys(State.arenaPlayers).find(id => id !== State.myClientId);
                const opp = State.arenaPlayers[oppId];
                if (me && opp) {
                    const eloRes = recordRankedEloResult(me.score || 0, opp.score || 0, opp.name, opp.elo || 1200, State.arenaConfig.skillMode);
                    const sign = eloRes.diff >= 0 ? '+' : '';
                    eloNote = `Updated ${SKILL_MODE_LABELS[State.arenaConfig.skillMode]} ELO: ${eloRes.newElo} (${sign}${eloRes.diff})`;
                }
            }

            if (wasOnline && wasHost && roomCode) {
                remove(ref(db, `lobbies/${roomCode}`)).catch(() => {});
            }

            const winner = sorted[0];
            const isDraw = sorted.length >= 2 && sorted[0].score === sorted[1].score;
            summaryData = {
                title: isDraw ? 'Match Drawn' : (winner ? `${winner.name} Wins` : '1v1 Match Ended'),
                subtitle: `1v1 Arena · ${SKILL_MODE_LABELS[State.arenaConfig.skillMode]}`,
                stats: sorted.slice(0, 2).map(p => ({
                    label: p.name,
                    value: `${formatPoints(p.score || 0)} pts`
                })),
                note: eloNote || 'All 1v1 matches use live blind-map starfields.'
            };
        }

        State.isSessionActive = false;
        State.sessionKind = 'roam';
        State.practiceConstellation = null;
        State.currentTarget = null;
        State.arenaIsOnline = false;
        State.arenaRole = null;
        State.arenaRoomCode = null;

        this._hideDrillChrome();
        this._restoreObservatorySky();

        this._lastFinishedKind = kind;
        this._lastFinishedConstellation = conAbbr;

        if (summaryData && (completed || State.score > 0 || State.mistakes > 0)) {
            this.showSummary(summaryData);
        }

        if (this.callbacks.onSessionChange) this.callbacks.onSessionChange(false, 'roam');
        if (this.callbacks.onRecordsRefresh) this.callbacks.onRecordsRefresh();
    }

    showSummary(data) {
        if (!this.els.summaryModal) return;
        if (this.els.summaryTitle) this.els.summaryTitle.textContent = data.title;
        if (this.els.summarySubtitle) this.els.summarySubtitle.textContent = data.subtitle;
        if (this.els.summaryStats) {
            this.els.summaryStats.innerHTML = data.stats.map(s => `
                <div class="summary-stat">
                    <span class="summary-stat-label">${s.label}</span>
                    <span class="summary-stat-val">${s.value}</span>
                </div>
            `).join('');
        }
        if (this.els.summaryNote) this.els.summaryNote.textContent = data.note || '';
        this.els.summaryModal.classList.add('open');
    }

    hideSummary() {
        if (this.els.summaryModal) this.els.summaryModal.classList.remove('open');
    }
}
