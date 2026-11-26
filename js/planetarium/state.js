// js/planetarium/state.js
// Centralized Observatory & Training session state store, Firebase RTDB handle,
// and persisted observer site coordinates.

import { app } from '../auth.js';
import { getDatabase } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js';

export const db = getDatabase(app);

function loadSavedObserver() {
    try {
        const raw = localStorage.getItem('planetarium_observer_site');
        if (raw) {
            const parsed = JSON.parse(raw);
            if (typeof parsed.lat === 'number' && typeof parsed.lon === 'number') {
                return {
                    lat: Math.max(-90, Math.min(90, parsed.lat)),
                    lon: Math.max(-180, Math.min(180, parsed.lon)),
                    label: parsed.label || 'Custom Site'
                };
            }
        }
    } catch {
        // Ignore storage restrictions
    }
    return { lat: 44.43, lon: 26.10, label: 'Bucharest Observatory' };
}

export function saveObserverSite(lat, lon, label) {
    State.observer.lat = lat;
    State.observer.lon = lon;
    State.observer.label = label || 'Custom Site';
    try {
        localStorage.setItem('planetarium_observer_site', JSON.stringify(State.observer));
    } catch {
        // Ignore storage restrictions
    }
}

export const State = {
    // Auth & ELO (Firebase path: users/${uid}/elo)
    currentUser: null,
    myElo: { name: 1200, type: 1200, mag: 1200, position: 1200 },
    myClientId: 'obs_' + Math.random().toString(36).slice(2, 11),

    // Catalog & Engine references
    catalog: null,
    engine: null,

    // Observatory overlays & site
    observer: loadSavedObserver(),
    overlays: {
        equatorialGrid: false,
        altAzGrid: false,
        eclipticPlane: true,
        constellationLines: true,
        constellationBoundaries: false,
        starLabels: true,
        dsoMarkers: true,
        magLimit: 6.5
    },
    savedOverlaysBeforeDrill: null,

    // Target Telemetry & Angular Separation selection
    selectedObject: null,
    previousObject: null,
    referencePinned: false,

    // Active Drill / Practice / 1v1 Arena Session
    sessionKind: 'roam', // 'roam' | 'drill' | 'practice' | 'arena'
    isSessionActive: false,

    // Drill configuration (Singleplayer Blind-Map)
    drillConfig: {
        target: 'stars', // 'stars' | 'dso'
        mode: 'name',    // 'name' | 'position' | 'type' | 'mag'
        diff: 'medium',  // 'easy' | 'medium' | 'hard' | 'extreme'
        time: '5'        // '2' | '5' | '10' | 'unlimited'
    },

    // Isolated Constellation Practice
    practiceConstellation: null, // e.g. 'Ori'
    practiceQueue: [],
    practiceIndex: 0,
    practiceElapsedMs: 0,
    practiceLastTickMs: 0,

    // 1v1 Arena configuration
    arenaConfig: {
        opponentType: 'bot', // 'online-ranked' | 'bot' | 'local'
        skillMode: 'name',   // 'name' | 'position' | 'type' | 'mag'
        botAccuracy: 0.70,
        maxRounds: 10
    },
    arenaIsOnline: false,
    arenaRole: null,         // 'host' | 'guest'
    arenaRoomCode: null,
    arenaPlayers: {},
    arenaOrder: [],
    arenaTurnIndex: 0,
    arenaRound: 1,
    arenaIsMyTurn: true,
    arenaTurnSeconds: 15,

    // Active round runtime
    currentTarget: null,
    pendingPositionPick: null,
    score: 0,
    mistakes: 0,
    streak: 0,
    totalLettersGuessed: 0,
    totalPlayTimeSec: 0,
    remainingSec: 300,
    targetStartMs: 0,
    performanceHistory: [],
    isTimerPaused: false,

    // Timers & Firebase listeners
    sessionTimerId: null,
    turnTimerId: null,
    roundTimeoutIds: [],
    lobbyUnsub: null,
    stateUnsub: null,
    actionUnsub: null,
    playersUnsub: null
};

export function getDisplayName() {
    if (!State.currentUser) return 'Observer';
    return State.currentUser.displayName
        || (State.currentUser.email ? State.currentUser.email.split('@')[0] : 'Observer');
}
