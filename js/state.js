// ==========================================
// STATE.JS - Centralizatorul de Date & DOM
// ==========================================
import { app } from './auth.js';
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

export const db = getDatabase(app);

export const State = {
    currentUser: null,
    myElo: { name: 1200, type: 1200, mag: 1200, position: 1200 },
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
    
    // Stare Multiplayer / Arena
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
    currentTurnDeadline: null,
    isMyTurnNow: true,
    
    selectedTypesStar: [],
    selectedTypeDSO: null,

    // TOURNAMENT STATE
    isTournament: false,
    tourneyFormat: 'elimination',
    tourneyGameMode: 'name',
    tourneyIsOnline: false,
    tourneyRole: null,
    tourneyRoomCode: null,
    tourneyRoster: [], 
    tourneyState: null,
    currentTourneyMatch: null,
    tourneyListenerUnsubscribe: null
};

export const DOM = {
    setupModal: document.getElementById('setup-modal'),
    
    btnLaunchSingle: document.getElementById('btn-launch-single'),
    btnLaunchMulti: document.getElementById('btn-launch-multi'),
    btnLaunchPractice: document.getElementById('btn-launch-practice'),
    btnLaunchHidden: document.getElementById('btn-launch'), 
    
    targetGroup: document.getElementById('target-group'),
    diffGroup: document.getElementById('diff-group'),
    timeGroup: document.getElementById('time-group'),
    multiPlayersGroup: document.getElementById('multi-players-group'),
    
    recTarget: document.getElementById('rec-target'),
    recMode: document.getElementById('rec-mode'),
    recDiff: document.getElementById('rec-diff'),
    
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
    botDiffGroup: document.getElementById('bot-diff-group')
};