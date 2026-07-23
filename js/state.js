// ==========================================
// STATE.JS - Centralizatorul de Date & DOM
// ==========================================
import { app } from './auth.js';
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

export const db = getDatabase(app);

export const State = {
    currentUser: null,
    myElo: 1200,
    targetObjects: [],
    
    // Stare Game UI & Logic
    activeTarget: null,
    activeMode: 'name',
    activeDiff: null,
    activeTime: null,
    activeTimeTab: '5',
    activePracticeConstellation: null,
    currentTarget: null,
    currentSelectedId: null,
    currentScore: 0,
    mistakesCount: 0,
    totalLettersGuessed: 0,
    remainingTime: 0,
    isUnlimited: false,
    timerInterval: null,
    isTimerPaused: false,
    totalPlayTimeSec: 0,
    currentStreak: 0,
    performanceHistory: [],
    targetStartTime: 0,
    
    // Practice Vars
    practiceQueue: [],
    currentPracticeIndex: 0,
    lastTickMs: 0,
    totalPracticeMs: 0,
    
    // Stare Multiplayer (cu update-uri)
    multiPlayers: {},
    multiOrder: [],
    currentTurnIndex: 0,
    maxRounds: 25,
    currentRound: 1,
    duelTurnTimer: null,
    duelTurnSeconds: 15,
    isBotMatch: false,
    botAccuracy: 0.60,
    multiOpponentType: 'local',
    multiGameMode: 'name',
    myClientId: Math.random().toString(36).substring(2, 10),
    isOnlineMatch: false,
    isGameRunning: false,
    onlineRole: null,
    onlineRoomCode: null,
    
    lobbyListenerUnsubscribe: null,
    stateListenerUnsubscribe: null,
    actionListenerUnsubscribe: null,
    playersListenerUnsubscribe: null,
    onlineHostTimeoutWatcher: null,
    currentTurnDeadline: null,
    isMyTurnNow: true,
    
    selectedTypesStar: [],
    selectedTypeDSO: null
};

export const DOM = {
    setupModal: document.getElementById('setup-modal'),
    
    // Butoanele Noi de Launch
    btnLaunchSingle: document.getElementById('btn-launch-single'),
    btnLaunchMulti: document.getElementById('btn-launch-multi'),
    btnLaunchPractice: document.getElementById('btn-launch-practice'),
    btnLaunchHidden: document.getElementById('btn-launch'), // Fallback pt siguranță
    
    // Dropdowns & Grids
    targetGroup: document.getElementById('target-group'),
    diffGroup: document.getElementById('diff-group'),
    timeGroup: document.getElementById('time-group'),
    multiPlayersGroup: document.getElementById('multi-players-group'),
    
    // Noi Filtre pentru Records Tab
    recTarget: document.getElementById('rec-target'),
    recMode: document.getElementById('rec-mode'),
    recDiff: document.getElementById('rec-diff'),
    
    // HUD & Game Elements
    hudContainer: document.getElementById('hud-container'),
    frCard: document.getElementById('free-roam-card'),
    hudInstruction: document.getElementById('hud-instruction'),
    inputGroupName: document.getElementById('input-group-name'),
    inputGroupType: document.getElementById('input-group-type'),
    inputGroupMag: document.getElementById('input-group-mag'),
    inputName: document.getElementById('input-name'),
    inputMag: document.getElementById('input-mag'),
    hudFeedback: document.getElementById('hud-feedback'),
    btnCheck: document.getElementById('btn-check'),
    btnEnd: document.getElementById('btn-end'),
    scoreDisplay: document.getElementById('score-display'),
    timerDisplay: document.getElementById('timer-display'),
    graphTitle: document.getElementById('form-graph-title'),
    
    // Multiplayer & Lobby Elements
    onlineLobbyUI: document.getElementById('online-lobby-ui'),
    btnCreateRoom: document.getElementById('btn-create-room'),
    btnShowJoin: document.getElementById('btn-show-join'),
    createRoomUI: document.getElementById('create-room-ui'),
    joinRoomUI: document.getElementById('join-room-ui'),
    inputRoomCode: document.getElementById('input-room-code'),
    btnJoinRoom: document.getElementById('btn-join-room'),
    namesInputsGroup: document.getElementById('names-inputs-group'),
    p1Inp: document.getElementById('multi-p1-name'),
    p2Inp: document.getElementById('multi-p2-name'),
    
    // Grupurile noi de butoane
    botDiffGroup: document.getElementById('bot-diff-group')
};