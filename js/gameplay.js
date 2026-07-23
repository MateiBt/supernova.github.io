// ==========================================
// GAMEPLAY.JS - Game Loop & Online Sync
// ==========================================
import { State, DOM, db } from './state.js';
import { updateHUDGraph, updateLiveLeaderboard, prepareSkillRoundUI, updateTimerUI } from './ui.js';
import { saveLeaderboardScore, savePracticeScore, populatePracticeLeaderboardModal, updatePersonalRecords, updatePublicLeaderboardView } from './leaderboards.js';
import { populateLearningSection } from './ui.js';
import { panCameraToTarget, updateHighlightRing } from './scene3d.js';
import { shuffleArray, filterDSOByDifficulty, formatPoints, formatTimeMs } from './utils.js';
import { typeDict, dictMode, constellationFullNames } from './config.js';
import { ref, update, onValue, remove } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

export function pickRandomTarget() {
    let currentTargetMode = State.activeTarget;
    let currentDiff = State.activeDiff;

    if (State.activeMode === 'multi') {
        currentTargetMode = 'stars';
        currentDiff = 'extreme';
    }

    let maxMag = 6.5; 
    if (currentDiff === 'easy') maxMag = 2.0;
    else if (currentDiff === 'medium') maxMag = 4.0;
    else if (currentDiff === 'hard') maxMag = 5.0;

    let baseObjects = State.targetObjects.filter(obj => obj.mag <= maxMag);
    let playableObjects = baseObjects;
    
    if (currentTargetMode === 'stars') playableObjects = baseObjects.filter(obj => !obj.isDSO && obj.bayerName && obj.bayerName !== "Necunoscut");
    else if (currentTargetMode === 'dso') {
        playableObjects = baseObjects.filter(obj => obj.isDSO);
        playableObjects = filterDSOByDifficulty(playableObjects, currentDiff);
    }

    if (playableObjects.length === 0) playableObjects = State.targetObjects.filter(o => !o.isDSO && o.mag <= 6.5 && o.bayerName);
    if (playableObjects.length === 0) return State.targetObjects[0]; 

    const namedTargets = playableObjects.filter(s => (s.correctName && s.correctName !== "") || (s.altNames && s.altNames.length > 0));
    const unnamedTargets = playableObjects.filter(s => !s.correctName && (!s.altNames || s.altNames.length === 0));

    if (namedTargets.length > 0 && unnamedTargets.length > 0) {
        if (Math.random() < 0.90) return namedTargets[Math.floor(Math.random() * namedTargets.length)];
        else return unnamedTargets[Math.floor(Math.random() * unnamedTargets.length)];
    }
    return playableObjects[Math.floor(Math.random() * playableObjects.length)];
}

export function startCountdownAndLaunch() {
    const overlay = document.getElementById('countdown-overlay');
    const numEl = document.getElementById('countdown-number');
    overlay.style.display = 'flex';
    let count = 3;
    numEl.innerText = count;

    const interval = setInterval(() => {
        count--;
        if (count > 0) {
            numEl.innerText = count;
        } else if (count === 0) {
            numEl.innerText = "GO!";
        } else {
            clearInterval(interval);
            overlay.style.display = 'none';
            DOM.hudContainer.style.display = 'block';
            startGlobalTimer();

            if(State.isOnlineMatch) initOnlineGame();
            else startNewRound();
        }
    }, 1000);
}

export function showVSScreenAndStart() {
    const vsOverlay = document.getElementById('vs-overlay');
    const vsList = document.getElementById('vs-players-list');
    if(vsOverlay && vsList) {
        vsOverlay.style.display = 'flex';
        vsList.innerHTML = '';
        
        let playersArr = [];
        if (State.activeMode === 'multi') {
            playersArr = Object.values(State.multiPlayers).map(p => p.name);
        } else {
            playersArr = [State.currentUser ? (State.currentUser.displayName || State.currentUser.email.split('@')[0]) : "Player 1"];
        }
        
        playersArr.forEach((pName, i) => {
            if (i > 0) {
                const vsText = document.createElement('div');
                vsText.innerText = "VS";
                vsText.style.color = "var(--danger)";
                vsText.style.fontSize = "1.2rem";
                vsList.appendChild(vsText);
            }
            const pDiv = document.createElement('div');
            pDiv.innerText = pName;
            pDiv.style.color = "var(--text-hi)";
            vsList.appendChild(pDiv);
        });

        setTimeout(() => {
            vsOverlay.style.display = 'none';
            startCountdownAndLaunch();
        }, 3000);
    } else {
        startCountdownAndLaunch();
    }
}

export function triggerGameStart() {
    DOM.setupModal.style.display = 'none';
    State.currentScore = 0; State.mistakesCount = 0; State.totalLettersGuessed = 0; State.currentTarget = null; State.currentStreak = 0; State.performanceHistory = []; State.totalPlayTimeSec = 0;
    State.currentRound = 1; State.currentTurnIndex = 0; State.currentTurnDeadline = null;

    if (State.activeMode === 'multi' && !State.isOnlineMatch) {
        State.isBotMatch = (State.multiOpponentType === 'bot');

        const name1 = (DOM.p1Inp && DOM.p1Inp.value.trim() !== "") ? DOM.p1Inp.value.trim() : "Player 1";
        const name2 = (DOM.p2Inp && DOM.p2Inp.value.trim() !== "") ? DOM.p2Inp.value.trim() : (State.isBotMatch ? "A.I. Bot" : "Player 2");
        
        State.multiPlayers = {
            'p1': { name: name1, score: 0, timeMs: 0, streak: 0, history: [] },
            'p2': { name: name2, score: 0, timeMs: 0, streak: 0, history: [] }
        };
        State.multiOrder = ['p1', 'p2'];
        State.isMyTurnNow = true; 
    }

    updateHUDGraph();
    updateLiveLeaderboard();

    if (State.activePracticeConstellation) {
        let practicePool = State.targetObjects.filter(obj =>
            !obj.isDSO && obj.bayerName && obj.bayerName.endsWith(` ${State.activePracticeConstellation}`)
        );
        State.practiceQueue = shuffleArray([...practicePool]);
        State.currentPracticeIndex = 0;
    }

    if(DOM.scoreDisplay) DOM.scoreDisplay.innerText = "0";
    
    if (State.activeMode !== 'free') showVSScreenAndStart(); 
    else {
        DOM.hudContainer.style.display = 'none';
        startNewRound();
    }
}

export function startHostTimeoutWatcher() {
    if (State.onlineHostTimeoutWatcher) clearInterval(State.onlineHostTimeoutWatcher);
    State.onlineHostTimeoutWatcher = setInterval(() => {
        if (!State.isOnlineMatch || State.onlineRole !== 'host' || !State.currentTurnDeadline || State.isTimerPaused) return;
        if (Date.now() >= State.currentTurnDeadline) advanceOnlineTurnAsTimeout();
    }, 400);
}

export function buildSkillAnswerLabel(target, skill) {
    if (!target) return "N/A";
    if (skill === 'type') {
        if (target.isDSO) return typeDict[target.correctType] || "Unknown";
        return (target.correctTypes && target.correctTypes.length > 0 ? target.correctTypes : ['simpla']).map(t => typeDict[t] || t).join(', ');
    } else if (skill === 'mag') return target.mag.toFixed(2);
    else if (skill === 'position') return target.correctName ? target.correctName.toUpperCase() : (target.bayerName || target.id);
    return target.correctName ? target.correctName.toUpperCase() : "NONE (blank)";
}

export function advanceOnlineTurnAsTimeout() {
    if (!State.currentTurnDeadline) return;
    State.currentTurnDeadline = null; 

    const activeId = State.multiOrder[State.currentTurnIndex];
    const activePlayer = State.multiPlayers[activeId] || { history: [], streak: 0, timeMs: 0 };
    let history = (activePlayer.history || []).slice();
    history.push({ correct: false, time: 15000 });
    if (history.length > 20) history.shift();

    update(ref(db, `lobbies/${State.onlineRoomCode}/players/${activeId}`), {
        streak: 0, history: history, timeMs: (activePlayer.timeMs || 0) + 15000
    });

    update(ref(db, `lobbies/${State.onlineRoomCode}/lastAction`), {
        playerId: activeId, correct: false, points: 0, time: 15000,
        answerLabel: buildSkillAnswerLabel(State.currentTarget, State.multiGameMode),
        timeout: true
    });
}

export function startGlobalTimer() {
    if (State.timerInterval) clearInterval(State.timerInterval);
    if (State.duelTurnTimer) clearInterval(State.duelTurnTimer);
    if (State.onlineHostTimeoutWatcher) clearInterval(State.onlineHostTimeoutWatcher);
    State.isTimerPaused = false;
    State.totalPlayTimeSec = 0;
    
    if (State.activeMode === 'multi') {
        if (State.isOnlineMatch) {
            State.duelTurnTimer = setInterval(() => {
                if (State.isTimerPaused || !State.currentTurnDeadline) return;
                const remainingSec = Math.max(0, Math.ceil((State.currentTurnDeadline - Date.now()) / 1000));
                DOM.timerDisplay.innerText = `00:${remainingSec.toString().padStart(2, '0')}`;
            }, 250);
            if (State.onlineRole === 'host') startHostTimeoutWatcher();
            return;
        }

        State.duelTurnSeconds = 15;
        DOM.timerDisplay.innerText = "00:15";
        State.duelTurnTimer = setInterval(() => {
            if(State.isTimerPaused) return;
            State.duelTurnSeconds--;
            if (State.duelTurnSeconds < 0) State.duelTurnSeconds = 0;
            DOM.timerDisplay.innerText = `00:${State.duelTurnSeconds.toString().padStart(2, '0')}`;
            if(State.duelTurnSeconds <= 0) processAnswer(false, State.currentTarget, true, 0);
        }, 1000);
        return;
    }

    if (State.activePracticeConstellation) {
        State.totalPracticeMs = 0;
        State.lastTickMs = performance.now();
        State.timerInterval = setInterval(() => {
            let now = performance.now();
            let delta = now - State.lastTickMs;
            State.lastTickMs = now;
            if (!State.isTimerPaused) {
                State.totalPracticeMs += delta;
                State.totalPlayTimeSec = State.totalPracticeMs / 1000;
                DOM.timerDisplay.innerText = formatTimeMs(State.totalPracticeMs + (State.mistakesCount * 3000));
            }
        }, 30); 
    } else if (State.activeTime === 'unlimited') {
        State.isUnlimited = true;
        let elapsed = 0;
        State.timerInterval = setInterval(() => {
            if (State.isTimerPaused) return; 
            elapsed++;
            State.totalPlayTimeSec++;
            const mins = String(Math.floor(elapsed / 60)).padStart(2, '0');
            const secs = String(elapsed % 60).padStart(2, '0');
            if(DOM.timerDisplay) DOM.timerDisplay.innerText = `${mins}:${secs}`;
        }, 1000);
    } else {
        State.isUnlimited = false;
        State.remainingTime = parseInt(State.activeTime) * 60;
        updateTimerUI(State.remainingTime);
        State.timerInterval = setInterval(() => {
            if (State.isTimerPaused) return; 
            State.remainingTime--;
            State.totalPlayTimeSec++;
            if (State.remainingTime <= 0) endGameSession();
            else updateTimerUI(State.remainingTime);
        }, 1000);
    }
}

export function handleRankedEloUpdate() {
    if (State.activeMode === 'multi' && State.isOnlineMatch && State.multiOpponentType === 'online-ranked') {
        let myPlayer = State.multiPlayers[State.myClientId];
        let oppId = Object.keys(State.multiPlayers).find(id => id !== State.myClientId);
        let oppPlayer = State.multiPlayers[oppId];
        
        if (myPlayer && oppPlayer) {
            let myScore = myPlayer.score;
            let oppScore = oppPlayer.score;
            
            let S = myScore > oppScore ? 1 : (myScore === oppScore ? 0.5 : 0);
            let E = 1 / (1 + Math.pow(10, ((oppPlayer.elo || 1200) - (State.myElo || 1200)) / 400));
            let newElo = Math.round((State.myElo || 1200) + 32 * (S - E));
            
            let diff = newElo - (State.myElo || 1200);
            let diffStr = diff > 0 ? `+${diff}` : `${diff}`;
            
            State.myElo = newElo;
            if(State.currentUser) update(ref(db, `users/${State.currentUser.uid}`), { elo: State.myElo });
            
            let winText = myScore > oppScore ? 'You won!' : (myScore < oppScore ? 'You lost!' : 'Draw!');
            alert(`GAME OVER! ${winText}\nYour Score: ${formatPoints(myScore)} vs Opponent: ${formatPoints(oppScore)}\nNew ELO: ${newElo} (${diffStr})`);
        }
    } else if (State.activeMode === 'multi') {
        let sorted = Object.values(State.multiPlayers).sort((a,b) => b.score - a.score);
        if (sorted.length > 0) alert(`GAME OVER! ${sorted[0].name} wins the match!`);
    }
}

export function endGameSession() {
    clearInterval(State.timerInterval);
    if(State.duelTurnTimer) clearInterval(State.duelTurnTimer);
    if(State.onlineHostTimeoutWatcher) clearInterval(State.onlineHostTimeoutWatcher);
    State.currentTurnDeadline = null;
    
    if (State.isGameRunning && State.activeMode === 'multi') handleRankedEloUpdate();

    if(State.isOnlineMatch && State.onlineRole === 'host' && State.onlineRoomCode) remove(ref(db, 'lobbies/' + State.onlineRoomCode));
    
    if(State.lobbyListenerUnsubscribe) { State.lobbyListenerUnsubscribe(); State.lobbyListenerUnsubscribe = null; }
    if(State.stateListenerUnsubscribe) { State.stateListenerUnsubscribe(); State.stateListenerUnsubscribe = null; }
    if(State.actionListenerUnsubscribe) { State.actionListenerUnsubscribe(); State.actionListenerUnsubscribe = null; }
    if(State.playersListenerUnsubscribe) { State.playersListenerUnsubscribe(); State.playersListenerUnsubscribe = null; }
    
    State.isGameRunning = false; State.isOnlineMatch = false; State.onlineRole = null; State.onlineRoomCode = null;

    const liveLb = document.getElementById('live-leaderboard');
    if (liveLb) liveLb.style.display = 'none';
    if (DOM.frCard) DOM.frCard.style.display = 'none';

    if (!State.activePracticeConstellation && State.activeMode !== 'free' && State.activeMode !== 'multi' && State.activeTime !== 'unlimited') {
        saveLeaderboardScore();
    }
    
    DOM.hudContainer.style.display = 'none'; 
    DOM.setupModal.style.display = 'flex';
    
    updateHighlightRing(null); 
    updatePersonalRecords(); 
    updatePublicLeaderboardView(); 
    populateLearningSection();
    
    if(DOM.createRoomUI) DOM.createRoomUI.style.display = 'none'; 
    if(DOM.joinRoomUI) DOM.joinRoomUI.style.display = 'none';
    if(State.multiOpponentType.startsWith('online')) {
        const rs = document.getElementById('room-status');
        if (rs) rs.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Awaiting connection...`;
        const js = document.getElementById('join-status');
        if(js) js.style.display = 'none';
        if(DOM.btnLaunchMulti) {
            DOM.btnLaunchMulti.disabled = true; 
            DOM.btnLaunchMulti.innerText = "AWAITING CONNECTION...";
        }
    }
}

export function endPracticeSession(completed = true) {
    clearInterval(State.timerInterval);
    DOM.hudContainer.style.display = 'none';
    updateHighlightRing(null);
    
    const finalMs = State.totalPracticeMs + (State.mistakesCount * 3000);
    savePracticeScore(finalMs);
    
    document.getElementById('practice-final-time').innerText = formatTimeMs(finalMs);
    let statusText = completed ? `Completed all stars in ${constellationFullNames[State.activePracticeConstellation]}` : `Session ended early in ${constellationFullNames[State.activePracticeConstellation]}`;
    document.getElementById('practice-result-text').innerText = `${statusText} (${dictMode[State.activeMode]})`;
    
    populatePracticeLeaderboardModal();
    document.getElementById('practice-result-modal').style.display = 'flex';
}

export function initOnlineGame() {
    if(State.onlineRole === 'host') {
        State.multiOrder = Object.keys(State.multiPlayers);
        const firstTarget = pickRandomTarget();
        update(ref(db, 'lobbies/' + State.onlineRoomCode + '/state'), {
            targetId: firstTarget.id, turnIndex: 0, currentRound: 1, order: State.multiOrder, turnDeadline: Date.now() + 15000, gameMode: State.multiGameMode
        });
    }

    if(State.stateListenerUnsubscribe) State.stateListenerUnsubscribe();
    State.stateListenerUnsubscribe = onValue(ref(db, 'lobbies/' + State.onlineRoomCode + '/state'), (snapshot) => {
        const data = snapshot.val();
        if(data) syncOnlineGame(data);
    });

    if(State.actionListenerUnsubscribe) State.actionListenerUnsubscribe();
    State.actionListenerUnsubscribe = onValue(ref(db, 'lobbies/' + State.onlineRoomCode + '/lastAction'), (snap) => {
        const action = snap.val();
        if(!action) return;
        
        State.isTimerPaused = true;
        const pName = State.multiPlayers[action.playerId]?.name || "Player";
        if (action.correct) {
            DOM.hudFeedback.innerText = `${pName} got it right! (+${formatPoints(action.points)} pts)`;
            DOM.hudFeedback.className = "hud-feedback correct";
        } else {
            const prefix = action.timeout ? "<b>Time expired!</b> " : "Missed! ";
            const label = (action.answerLabel !== undefined && action.answerLabel !== null) ? action.answerLabel.toString().toUpperCase() : "N/A";
            DOM.hudFeedback.innerHTML = `${prefix}${pName} - correct answer: <b>${label}</b>`;
            DOM.hudFeedback.className = "hud-feedback wrong";
        }
        DOM.hudFeedback.style.display = "block";
        DOM.btnCheck.style.display = "none";
        
        if (State.onlineRole === 'host') {
            setTimeout(() => {
                let nextIndex = (State.currentTurnIndex + 1) % State.multiOrder.length;
                let nextRound = State.currentRound;
                if (nextIndex === 0) nextRound++;
                
                update(ref(db, 'lobbies/' + State.onlineRoomCode + '/state'), {
                    turnIndex: nextIndex, currentRound: nextRound, targetId: pickRandomTarget().id, turnDeadline: Date.now() + 15000
                });
            }, 2500);
        }
    });

    if(State.playersListenerUnsubscribe) State.playersListenerUnsubscribe();
    State.playersListenerUnsubscribe = onValue(ref(db, `lobbies/${State.onlineRoomCode}/players`), (snap) => {
        const playersData = snap.val();
        if (playersData) { State.multiPlayers = playersData; updateLiveLeaderboard(); }
    });
}

export function syncOnlineGame(data) {
    State.multiOrder = data.order || []; State.currentTurnIndex = data.turnIndex; State.currentRound = data.currentRound;
    State.currentTurnDeadline = data.turnDeadline || (Date.now() + 15000);
    if (data.gameMode) State.multiGameMode = data.gameMode;
    State.currentTarget = State.targetObjects.find(s => s.id === data.targetId) || State.targetObjects[0];

    if (State.currentRound > State.maxRounds) { endGameSession(); return; }

    State.isTimerPaused = false;
    DOM.scoreDisplay.innerText = `Round ${State.currentRound} / ${State.maxRounds}`;

    let activeId = State.multiOrder[State.currentTurnIndex];
    let currName = State.multiPlayers[activeId]?.name || "Unknown";
    let localIsActing = (activeId === State.myClientId);
    State.isMyTurnNow = localIsActing;

    prepareSkillRoundUI(State.multiGameMode);
    updateHighlightRing(State.currentTarget, localIsActing ? 0x35e6ff : 0xffcf5c);

    State.targetStartTime = performance.now();
    updateHUDGraph();

    const skillLabel = dictMode[State.multiGameMode] || 'Identify Name';

    if (localIsActing) {
        DOM.hudInstruction.innerHTML = `<span style="color:var(--cyan); font-weight:800;">YOUR TURN:</span> ${skillLabel} for highlighted target`;
        DOM.btnCheck.disabled = (State.multiGameMode === 'position'); 
        DOM.btnCheck.style.opacity = (State.multiGameMode === 'position') ? "0.5" : "1";
        DOM.inputName.disabled = false;
        if (State.multiGameMode === 'name') setTimeout(() => { DOM.inputName.focus(); }, 100);
        else if (State.multiGameMode === 'mag' && DOM.inputMag) setTimeout(() => { DOM.inputMag.focus(); }, 100);
    } else {
        DOM.hudInstruction.innerHTML = `<span style="color:var(--gold); font-weight:800;">${currName.toUpperCase()} IS ANSWERING...</span>`;
        DOM.btnCheck.disabled = true; DOM.btnCheck.style.opacity = "0.5"; DOM.inputName.disabled = true;
    }

    if (State.multiGameMode !== 'position') panCameraToTarget(State.currentTarget);
}

export function startNewRound() {
    State.targetStartTime = performance.now();
    updateHUDGraph(); updateLiveLeaderboard();

    if (State.activeMode === 'multi') {
        if (State.currentRound > State.maxRounds) { endGameSession(); return; }
        State.duelTurnSeconds = 15; DOM.timerDisplay.innerText = "00:15";
        DOM.scoreDisplay.innerText = `Round ${State.currentRound} / ${State.maxRounds}`;
    }

    if (State.activePracticeConstellation) {
        if (State.currentPracticeIndex >= State.practiceQueue.length) { endPracticeSession(true); return; }
        State.currentTarget = State.practiceQueue[State.currentPracticeIndex];
        if(DOM.scoreDisplay) DOM.scoreDisplay.innerText = `${formatPoints(State.currentScore)} / ${State.practiceQueue.length}`;
    } else {
        State.currentTarget = pickRandomTarget();
    }

    State.currentSelectedId = null;
    DOM.hudFeedback.className = "hud-feedback"; DOM.hudFeedback.style.display = "none"; DOM.btnCheck.style.display = "block";
    updateHighlightRing(null);

    const mistakesHtml = `<span style="color: var(--danger); font-size: 0.85em; font-weight: 700; margin-left: 8px;">(Mistakes: ${State.mistakesCount})</span>`;
    let prefix = State.activePracticeConstellation ? `<span style="color: var(--gold); font-size:0.8em; margin-right: 5px;">[${State.activePracticeConstellation}]</span> ` : '';

    if (State.activeMode === 'position') {
        prepareSkillRoundUI('position');
        DOM.hudInstruction.innerHTML = `${prefix}Locate Target: <b>${State.currentTarget.bayerName || State.currentTarget.id}</b> ${mistakesHtml}`;
    } else if (State.activeMode === 'name') {
        prepareSkillRoundUI('name');
        DOM.hudInstruction.innerHTML = `${prefix}Identify traditional name ${mistakesHtml}`;
        updateHighlightRing(State.currentTarget, 0xffeb3b);
        setTimeout(() => { DOM.inputName.focus(); }, 100);
    } else if (State.activeMode === 'type') {
        prepareSkillRoundUI('type');
        DOM.hudInstruction.innerHTML = `${prefix}Classify target: <b>${State.currentTarget.bayerName || State.currentTarget.id}</b> ${mistakesHtml}`;
        updateHighlightRing(State.currentTarget, 0xffeb3b);
    } else if (State.activeMode === 'mag') {
        prepareSkillRoundUI('mag');
        DOM.hudInstruction.innerHTML = `${prefix}Estimate visual magnitude of <b>${State.currentTarget.bayerName || State.currentTarget.id}</b> ${mistakesHtml}`;
        updateHighlightRing(State.currentTarget, 0xffeb3b);
        setTimeout(() => { if(DOM.inputMag) DOM.inputMag.focus(); }, 100);
    } else if (State.activeMode === 'multi') {
        let activeId = State.multiOrder[State.currentTurnIndex];
        let activePlayer = State.multiPlayers[activeId];
        let pColor = activeId === 'p1' ? 'var(--cyan)' : 'var(--gold)';
        const skillLabel = dictMode[State.multiGameMode] || 'Identify Name';
        
        updateHighlightRing(State.currentTarget, activeId === 'p1' ? 0x35e6ff : 0xffcf5c);
        prepareSkillRoundUI(State.multiGameMode);

        if (State.isBotMatch && activeId === 'p2') {
            DOM.hudInstruction.innerHTML = `<span style="color:${pColor}; font-weight:800;">${activePlayer.name.toUpperCase()} IS THINKING...</span>`;
            DOM.btnCheck.disabled = true; DOM.btnCheck.style.opacity = "0.5"; DOM.inputName.disabled = true;
            
            let botDelay = 2000 + Math.random() * 3500; 
            setTimeout(() => {
                if (State.activeMode !== 'multi' || State.isTimerPaused) return; 
                const botIsCorrect = Math.random() < State.botAccuracy;
                processAnswer(botIsCorrect, State.currentTarget, false, botIsCorrect ? 1 : 0);
            }, botDelay);

        } else {
            DOM.hudInstruction.innerHTML = `<span style="color:${pColor}; font-weight:800;">${activePlayer.name.toUpperCase()}'S TURN:</span> ${skillLabel}`;
            DOM.btnCheck.innerText = "Submit Answer"; DOM.inputName.disabled = false;
            if (State.multiGameMode === 'name') setTimeout(() => { DOM.inputName.focus(); }, 100);
            else if (State.multiGameMode === 'mag' && DOM.inputMag) setTimeout(() => { DOM.inputMag.focus(); }, 100);
            if (State.multiGameMode === 'position') { DOM.btnCheck.disabled = true; DOM.btnCheck.style.opacity = "0.5"; }
        }
    }

    const effectiveSkillForCamera = (State.activeMode === 'multi') ? State.multiGameMode : State.activeMode;
    if (State.activeMode !== 'free' && effectiveSkillForCamera !== 'position') panCameraToTarget(State.currentTarget);
}

export function processAnswer(isCorrect, starReference, isShotClockExpire = false, customEarnedPoints = 1) {
    DOM.btnCheck.style.display = "none";
    DOM.hudFeedback.style.display = "block";
    State.isTimerPaused = true;
    
    let timeTaken = performance.now() - State.targetStartTime;
    const effectiveSkill = (State.activeMode === 'multi') ? State.multiGameMode : State.activeMode;

    if (State.activeMode === 'multi') {
        if (State.isOnlineMatch) {
            let me = State.multiPlayers[State.myClientId];
            if (!me.history) me.history = [];
            if (isCorrect) { me.streak = (me.streak || 0) + 1; me.score += customEarnedPoints; } else me.streak = 0;
            
            me.history.push({ correct: isCorrect, time: timeTaken });
            if (me.history.length > 20) me.history.shift();
            me.timeMs += timeTaken;

            update(ref(db, `lobbies/${State.onlineRoomCode}/players/${State.myClientId}`), me);
            update(ref(db, `lobbies/${State.onlineRoomCode}/lastAction`), {
                playerId: State.myClientId, correct: isCorrect, points: customEarnedPoints, time: timeTaken, answerLabel: buildSkillAnswerLabel(State.currentTarget, effectiveSkill)
            });
        } else {
            let activeId = State.multiOrder[State.currentTurnIndex];
            let activePlayer = State.multiPlayers[activeId];
            if (!activePlayer.history) activePlayer.history = [];
            
            if (isCorrect) { activePlayer.streak = (activePlayer.streak || 0) + 1; activePlayer.score += customEarnedPoints; } else activePlayer.streak = 0;
            
            activePlayer.history.push({ correct: isCorrect, time: timeTaken });
            if (activePlayer.history.length > 20) activePlayer.history.shift();
            activePlayer.timeMs += timeTaken;

            updateHUDGraph(); updateLiveLeaderboard();

            if (isCorrect) {
                DOM.hudFeedback.innerText = `${activePlayer.name} got it right! (+${formatPoints(customEarnedPoints)} pts)`;
                DOM.hudFeedback.className = "hud-feedback correct";
                updateHighlightRing(starReference, 0x2be38a);
            } else {
                const label = buildSkillAnswerLabel(State.currentTarget, effectiveSkill);
                DOM.hudFeedback.innerHTML = (isShotClockExpire ? "<b>Time expired!</b> " : "Missed! ") + `Correct answer: <b>${label}</b>.`;
                DOM.hudFeedback.className = "hud-feedback wrong";
                updateHighlightRing(starReference, 0xff4d6a);
            }

            setTimeout(() => {
                State.currentTurnIndex++;
                if(State.currentTurnIndex >= State.multiOrder.length) { State.currentTurnIndex = 0; State.currentRound++; }
                State.isTimerPaused = false; startNewRound();
            }, 2500);
        }
        return;
    }

    if (isCorrect) {
        State.currentScore += customEarnedPoints; State.currentStreak++;
        const streakEl = document.getElementById('streak-display'); if(streakEl) streakEl.innerText = State.currentStreak;
        
        State.performanceHistory.push({ correct: true, time: timeTaken });
        if(State.performanceHistory.length > 20) State.performanceHistory.shift();
        updateHUDGraph();

        if (State.activeMode === 'name') State.totalLettersGuessed += State.currentTarget.correctName ? State.currentTarget.correctName.length : 0;

        let extraText = (State.activeMode === 'mag' || State.activeMode === 'type') ? ` (+${formatPoints(customEarnedPoints)} pts)` : "";
        DOM.hudFeedback.innerText = `Correct! Target acquired.${extraText}`;
        DOM.hudFeedback.className = "hud-feedback correct";
        updateHighlightRing(starReference, 0x2be38a);
        
        setTimeout(() => {
            State.isTimerPaused = false;
            if (State.activePracticeConstellation) { State.currentPracticeIndex++; startNewRound(); } 
            else { if(DOM.scoreDisplay) DOM.scoreDisplay.innerText = formatPoints(State.currentScore); startNewRound(); }
        }, 1000);

    } else {
        State.mistakesCount++; State.currentStreak = 0;
        const streakEl = document.getElementById('streak-display'); if(streakEl) streakEl.innerText = State.currentStreak;
        
        State.performanceHistory.push({ correct: false, time: timeTaken });
        if(State.performanceHistory.length > 20) State.performanceHistory.shift();
        updateHUDGraph();

        let wrongMsg = "Incorrect.";
        if (State.activeMode === 'name') {
            const correctName = State.currentTarget.correctName ? State.currentTarget.correctName.toUpperCase() : "NONE (Leave blank)";
            wrongMsg = `Incorrect. Target was: <b>${correctName}</b>.`;
        } else if (State.activeMode === 'type') {
            let truthText = State.currentTarget.isDSO ? (typeDict[State.currentTarget.correctType] || "Unknown") : ((State.currentTarget.correctTypes||[]).map(t=>typeDict[t]).join(', '));
            wrongMsg = `Incorrect. Classification was: <b>${truthText}</b>.`;
        } else if (State.activeMode === 'position') {
            const clickedName = starReference ? (starReference.bayerName || starReference.id || 'unnamed object') : 'unknown point';
            wrongMsg = `Incorrect. You clicked <b>${clickedName}</b>. Correct target highlighted in red.`;
        } else if (State.activeMode === 'mag') {
            wrongMsg = `Incorrect (0 pts). Real magnitude was: <b>${State.currentTarget.mag.toFixed(2)}</b>.`;
        }

        DOM.hudFeedback.innerHTML = wrongMsg + ` <span id="penalty-timer" style="color: var(--danger); margin-left: 5px; font-weight: bold;">(Wait 4s...)</span>`;
        DOM.hudFeedback.className = "hud-feedback wrong"; updateHighlightRing(starReference, 0xff4d6a);
        
        let waitTime = 4;
        const penaltyInterval = setInterval(() => {
            waitTime--;
            const pTimer = document.getElementById('penalty-timer');
            if (pTimer && waitTime > 0) pTimer.innerText = `(Wait ${waitTime}s...)`;
        }, 1000);

        setTimeout(() => { State.isTimerPaused = false; updateHighlightRing(State.currentTarget, 0x2be38a); }, 1000);
        setTimeout(() => { 
            clearInterval(penaltyInterval); 
            if (State.activePracticeConstellation) {
                const failedStar = State.practiceQueue.splice(State.currentPracticeIndex, 1)[0];
                State.practiceQueue.push(failedStar);
            }
            startNewRound(); 
        }, 4000);
    }
}