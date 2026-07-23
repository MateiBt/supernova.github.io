// ==========================================
// MAIN.JS - Event Listeners & Start
// ==========================================
import { auth } from './auth.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { get, ref, set, update, onDisconnect, onValue } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

import { State, DOM, db } from './state.js';
import { customStarCorrections, starClassifications } from './config.js';
import { getLevenshteinDistance } from './utils.js';
import { initScene3D, buildStarfield, drawConstellations, updateHighlightRing, raycaster, mouse, camera, starPointsMesh, dsoPointsMesh } from './scene3d.js';
import { updatePersonalRecords, updatePublicLeaderboardView } from './leaderboards.js';
import { unselectPractice, checkLaunchReady, populateLearningSection, updateLobbyUIList, showFreeRoamCard } from './ui.js';
import { triggerGameStart, processAnswer, endGameSession, endPracticeSession } from './gameplay.js';

function applyStarClassifications() {
    State.targetObjects.forEach(star => {
        if (!star.isDSO) star.correctTypes = [];
    });

    for (const [type, starsArray] of Object.entries(starClassifications)) {
        starsArray.forEach(identifier => {
            let star = State.targetObjects.find(s => s.bayerName === identifier && !s.isDSO);
            if (star && !star.correctTypes.includes(type)) {
                star.correctTypes.push(type);
            }
        });
    }

    State.targetObjects.forEach(star => {
        if (!star.isDSO) {
            if (star.correctTypes.length === 0) star.correctTypes = ["simpla"];
            star.correctType = star.correctTypes[0];
        }
    });
}

onAuthStateChanged(auth, (user) => {
    const statusText = document.getElementById('auth-status-text');
    const configForms = document.getElementById('config-forms');

    if (user) {
        State.currentUser = user;
        const displayName = user.displayName || (user.email ? user.email.split('@')[0] : "Student");
        
        get(ref(db, `users/${user.uid}/elo`)).then(snap => {
            if(snap.exists()) State.myElo = snap.val();
            else set(ref(db, `users/${user.uid}/elo`), 1200);
            
            if (statusText) statusText.innerHTML = `Welcome, <span style="color: var(--cyan); font-weight: 700;">${displayName}</span>.`;
            const eloDisplay = document.getElementById('multi-elo-display');
            if (eloDisplay) eloDisplay.innerText = State.myElo;
        });

        if (configForms) {
            configForms.style.display = 'flex'; 
            updatePersonalRecords(); 
            updatePublicLeaderboardView(); 
            populateLearningSection(); 
            if(DOM.p1Inp) DOM.p1Inp.value = displayName;
        }
    } else {
        State.currentUser = null;
        if (statusText) statusText.innerHTML = `<span style="color: var(--danger);">Access Denied.</span> Please log in.`;
        if (configForms) configForms.style.display = 'none';
        
        if (DOM.btnLaunchSingle) DOM.btnLaunchSingle.disabled = true;
        if (DOM.btnLaunchMulti) DOM.btnLaunchMulti.disabled = true;
        if (DOM.btnLaunchPractice) DOM.btnLaunchPractice.disabled = true;
    }
});

// ==========================================
// EVENT LISTENERS: TABS & BUTTONS
// ==========================================
document.querySelectorAll('#target-grid .opt-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        unselectPractice();
        document.querySelectorAll('#target-grid .opt-btn').forEach(b => b.classList.remove('selected'));
        e.target.classList.add('selected');
        State.activeTarget = e.target.dataset.target;

        if (State.activeTarget === 'dso') {
            document.querySelector('[data-diff="easy"]').innerText = "Messier Only";
            document.querySelector('[data-diff="medium"]').innerText = "Messier + Caldwell";
            document.querySelector('[data-diff="hard"]').innerText = "Med + Bright NGCs";
            document.querySelector('[data-diff="extreme"]').innerText = "All DSOs";
        } else {
            document.querySelector('[data-diff="easy"]').innerText = "Easy (< 2.0)";
            document.querySelector('[data-diff="medium"]').innerText = "Medium (< 4.0)";
            document.querySelector('[data-diff="hard"]').innerText = "Hard (< 5.0)";
            document.querySelector('[data-diff="extreme"]').innerText = "Extreme (< 6.5)";
        }

        checkLaunchReady(); updatePublicLeaderboardView(); populateLearningSection();
    });
});

document.querySelectorAll('#mode-grid .opt-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        document.querySelectorAll('#mode-grid .opt-btn').forEach(b => b.classList.remove('selected'));
        e.target.classList.add('selected');
        State.activeMode = e.target.dataset.mode;
        
        if (State.activeMode === 'free') {
            unselectPractice();
            if(DOM.targetGroup) DOM.targetGroup.style.display = 'none'; 
            if(DOM.diffGroup) DOM.diffGroup.style.display = 'none'; 
            if(DOM.timeGroup) DOM.timeGroup.style.display = 'none';
        } else {
            unselectPractice();
            if(DOM.targetGroup) DOM.targetGroup.style.display = 'block'; 
            if(DOM.diffGroup) DOM.diffGroup.style.display = 'block'; 
            if(DOM.timeGroup) DOM.timeGroup.style.display = 'block';
            
            if (State.activeMode === 'mag') {
                State.activeTarget = 'stars';
                document.querySelectorAll('#target-grid .opt-btn').forEach(b => b.classList.remove('selected'));
                const sBtn = document.querySelector('#target-grid .opt-btn[data-target="stars"]');
                if(sBtn) sBtn.classList.add('selected');
                
                const dsoBtn = document.querySelector('#target-grid .opt-btn[data-target="dso"]');
                if(dsoBtn) { dsoBtn.disabled = true; dsoBtn.style.opacity = '0.3'; }
            } else {
                const dsoBtn = document.querySelector('#target-grid .opt-btn[data-target="dso"]');
                if(dsoBtn) { dsoBtn.disabled = false; dsoBtn.style.opacity = '1'; }
            }
        }
        checkLaunchReady(); updatePublicLeaderboardView(); populateLearningSection(); 
    });
});

document.querySelectorAll('#diff-grid .opt-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        unselectPractice();
        document.querySelectorAll('#diff-grid .opt-btn').forEach(b => b.classList.remove('selected'));
        e.target.classList.add('selected');
        State.activeDiff = e.target.dataset.diff;
        checkLaunchReady(); updatePublicLeaderboardView(); populateLearningSection();
    });
});

document.querySelectorAll('#time-grid .opt-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        unselectPractice();
        document.querySelectorAll('#time-grid .opt-btn').forEach(b => b.classList.remove('selected'));
        e.target.classList.add('selected');
        State.activeTime = e.target.dataset.time;
        checkLaunchReady(); populateLearningSection();
    });
});

// RECORDS TAB NEW FILTERS 
['#rec-target-btns', '#rec-mode-btns', '#rec-diff-btns', '#lb-tabs'].forEach(groupId => {
    document.querySelectorAll(`${groupId} .lb-tab`).forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll(`${groupId} .lb-tab`).forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            if (groupId === '#lb-tabs') State.activeTimeTab = e.target.dataset.tab;
            updatePublicLeaderboardView();
        });
    });
});

// ==========================================
// ARENA MULTIPLAYER BUTTONS
// ==========================================
document.querySelectorAll('#multi-opponent-grid .opt-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        document.querySelectorAll('#multi-opponent-grid .opt-btn').forEach(b => b.classList.remove('selected'));
        e.target.classList.add('selected');
        State.multiOpponentType = e.target.dataset.opponent;

        if(DOM.botDiffGroup) DOM.botDiffGroup.style.display = 'none';
        if(DOM.onlineLobbyUI) DOM.onlineLobbyUI.style.display = 'none';
        if(DOM.namesInputsGroup) DOM.namesInputsGroup.style.display = 'flex';
        
        if(DOM.p2Inp) { DOM.p2Inp.disabled = false; DOM.p2Inp.style.opacity = '1'; DOM.p2Inp.value = "Player 2"; }
        
        State.isOnlineMatch = false;
        if(DOM.btnLaunchMulti) {
            DOM.btnLaunchMulti.disabled = false;
            DOM.btnLaunchMulti.innerText = "Initiate Duel Protocol";
        }

        if(State.multiOpponentType === 'bot') {
            if(DOM.botDiffGroup) DOM.botDiffGroup.style.display = 'block';
            if(DOM.p2Inp) { DOM.p2Inp.value = "A.I. Bot"; DOM.p2Inp.disabled = true; DOM.p2Inp.style.opacity = '0.5'; }
        } else if(State.multiOpponentType.startsWith('online')) {
            if(DOM.onlineLobbyUI) DOM.onlineLobbyUI.style.display = 'block';
            if(DOM.namesInputsGroup) DOM.namesInputsGroup.style.display = 'none';
            State.isOnlineMatch = true;
            if(DOM.btnLaunchMulti) { DOM.btnLaunchMulti.disabled = true; DOM.btnLaunchMulti.innerText = "AWAITING SIGNAL..."; }
        }
    });
});

document.querySelectorAll('#multi-skill-grid .opt-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        document.querySelectorAll('#multi-skill-grid .opt-btn').forEach(b => b.classList.remove('selected'));
        e.target.classList.add('selected');
        State.multiGameMode = e.target.dataset.skill;
    });
});

document.querySelectorAll('#bot-diff-grid .opt-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        document.querySelectorAll('#bot-diff-grid .opt-btn').forEach(b => b.classList.remove('selected'));
        e.target.classList.add('selected');
        State.botAccuracy = parseFloat(e.target.dataset.bot);
    });
});

document.querySelectorAll('#multi-rounds-grid .opt-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        document.querySelectorAll('#multi-rounds-grid .opt-btn').forEach(b => b.classList.remove('selected'));
        e.target.classList.add('selected');
        State.maxRounds = parseInt(e.target.dataset.rounds);
    });
});

// ==========================================
// ONLINE LOBBY CONNECT
// ==========================================
if(DOM.btnCreateRoom) {
    DOM.btnCreateRoom.addEventListener('click', () => {
        State.onlineRole = 'host';
        State.onlineRoomCode = Math.random().toString(36).substring(2, 6).toUpperCase();
        
        document.getElementById('room-code-display').innerText = State.onlineRoomCode;
        DOM.createRoomUI.style.display = 'block';
        DOM.joinRoomUI.style.display = 'none';
        
        const roomRef = ref(db, 'lobbies/' + State.onlineRoomCode);
        const myName = State.currentUser ? (State.currentUser.displayName || State.currentUser.email.split('@')[0]) : "Player 1";

        set(roomRef, {
            status: 'waiting', hostId: State.myClientId, target: State.activeTarget || 'stars', diff: State.activeDiff || 'extreme', rounds: State.maxRounds, gameMode: State.multiGameMode, ranked: State.multiOpponentType === 'online-ranked'
        });

        const myPlayerRef = ref(db, `lobbies/${State.onlineRoomCode}/players/${State.myClientId}`);
        set(myPlayerRef, { name: myName, score: 0, timeMs: 0, elo: State.myElo });
        onDisconnect(roomRef).remove();

        if(State.lobbyListenerUnsubscribe) State.lobbyListenerUnsubscribe();
        State.lobbyListenerUnsubscribe = onValue(ref(db, `lobbies/${State.onlineRoomCode}`), (snapshot) => {
            const data = snapshot.val();
            if(!data) {
                if (State.onlineRole === 'guest') { alert("Host disconnected. Room closed."); endGameSession(); }
                return;
            }

            State.multiPlayers = data.players || {};
            updateLobbyUIList();

            if (State.onlineRole === 'host') {
                if (Object.keys(State.multiPlayers).length > 1) {
                    document.getElementById('room-status').innerHTML = `<span style="color:var(--success);"><i class="fa-solid fa-check"></i> Signal Locked! Ready to engage.</span>`;
                    DOM.btnLaunchMulti.disabled = false;
                    DOM.btnLaunchMulti.innerText = "INITIATE DUEL PROTOCOL";
                } else {
                    document.getElementById('room-status').innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Awaiting signal...`;
                    DOM.btnLaunchMulti.disabled = true;
                }
            }

            if (data.status === 'starting' && !State.isGameRunning) {
                State.isGameRunning = true;
                triggerGameStart();
            }
        });
    });
}

if(DOM.btnShowJoin) {
    DOM.btnShowJoin.addEventListener('click', () => {
        DOM.createRoomUI.style.display = 'none';
        DOM.joinRoomUI.style.display = 'block';
    });
}

if(DOM.btnJoinRoom) {
    DOM.btnJoinRoom.addEventListener('click', () => {
        const code = DOM.inputRoomCode.value.trim().toUpperCase();
        if(code.length !== 4) return;
        
        const statusText = document.getElementById('join-status');
        statusText.style.display = 'block'; statusText.innerText = "Scanning frequencies...";
        
        get(ref(db, 'lobbies/' + code)).then((snapshot) => {
            if (snapshot.exists() && snapshot.val().status === 'waiting') {
                const isRankedRoom = snapshot.val().ranked === true;
                if (isRankedRoom && State.multiOpponentType !== 'online-ranked') {
                    statusText.style.color = "var(--danger)"; statusText.innerText = "This is a Ranked room. Please select Online Ranked."; return;
                }

                State.onlineRole = 'guest'; State.onlineRoomCode = code;
                const myName = State.currentUser ? (State.currentUser.displayName || State.currentUser.email.split('@')[0]) : "Guest";
                
                State.activeTarget = snapshot.val().target; State.activeDiff = snapshot.val().diff; State.maxRounds = snapshot.val().rounds || 25; State.multiGameMode = snapshot.val().gameMode || 'name';

                const myPlayerRef = ref(db, `lobbies/${State.onlineRoomCode}/players/${State.myClientId}`);
                set(myPlayerRef, { name: myName, score: 0, timeMs: 0, elo: State.myElo }).then(() => {
                    onDisconnect(myPlayerRef).remove();
                    statusText.style.color = "var(--success)"; statusText.innerText = "Connection Established. Awaiting Host.";
                    DOM.btnLaunchMulti.disabled = true; DOM.btnLaunchMulti.innerText = "AWAITING HOST...";
                    
                    if(State.lobbyListenerUnsubscribe) State.lobbyListenerUnsubscribe();
                    State.lobbyListenerUnsubscribe = onValue(ref(db, `lobbies/${State.onlineRoomCode}`), (snap) => {
                        const data = snap.val();
                        if(!data) { alert("Host disconnected. Room closed."); endGameSession(); return; }
                        State.multiPlayers = data.players || {}; updateLobbyUIList();
                        if (data.status === 'starting' && !State.isGameRunning) { State.isGameRunning = true; triggerGameStart(); }
                    });
                });
            } else {
                statusText.style.color = "var(--danger)"; statusText.innerText = "Invalid code or match already started.";
            }
        }).catch((error) => { statusText.innerText = "Connection error."; });
    });
}

// ==========================================
// LAUNCH BUTTONS
// ==========================================
if(DOM.btnLaunchSingle) {
    DOM.btnLaunchSingle.addEventListener('click', () => {
        State.activeMode = document.querySelector('#mode-grid .opt-btn.selected').dataset.mode;
        State.isGameRunning = true;
        triggerGameStart();
    });
}
if(DOM.btnLaunchMulti) {
    DOM.btnLaunchMulti.addEventListener('click', () => {
        State.activeMode = 'multi';
        if (State.isOnlineMatch && State.onlineRole === 'host') {
            update(ref(db, 'lobbies/' + State.onlineRoomCode), { status: 'starting' });
            return; 
        }
        State.isGameRunning = true;
        triggerGameStart();
    });
}
if(DOM.btnLaunchPractice) {
    DOM.btnLaunchPractice.addEventListener('click', () => {
        State.activeMode = 'name';
        State.isGameRunning = true;
        triggerGameStart();
    });
}

// ==========================================
// ABORT & ENTER KEY LOGIC
// ==========================================
if(DOM.btnEnd) {
    DOM.btnEnd.addEventListener('click', () => {
        if(confirm("Abort current session?")) {
            if (State.activePracticeConstellation && State.activeMode !== 'multi' && State.activeMode !== 'free') {
                endPracticeSession(false); 
            } else {
                endGameSession();
            }
        }
    });
}

const btnClosePrac = document.getElementById('btn-close-practice');
if(btnClosePrac) {
    btnClosePrac.addEventListener('click', () => {
        document.getElementById('practice-result-modal').style.display = 'none';
        DOM.setupModal.style.display = 'flex';
        unselectPractice(); 
        if(DOM.targetGroup) DOM.targetGroup.style.display = 'block'; 
        if(DOM.diffGroup) DOM.diffGroup.style.display = 'block'; 
        if(DOM.timeGroup) DOM.timeGroup.style.display = 'block';
        checkLaunchReady(); updatePublicLeaderboardView(); populateLearningSection();
    });
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        if (DOM.hudContainer && DOM.hudContainer.style.display === 'block') {
            e.preventDefault(); 
            if (!State.isTimerPaused && DOM.btnCheck && DOM.btnCheck.style.display !== "none" && !DOM.btnCheck.disabled) {
                DOM.btnCheck.click();
            }
        }
    }
});

DOM.btnCheck.addEventListener('click', () => {
    const effectiveMode = (State.activeMode === 'multi') ? State.multiGameMode : State.activeMode;

    if (effectiveMode === 'name') {
        const userInput = DOM.inputName.value.trim().toLowerCase();
        let isCorrect = false;

        let allValidNames = [];
        if (State.currentTarget.correctName) allValidNames.push(State.currentTarget.correctName);
        if (State.currentTarget.altNames) allValidNames = allValidNames.concat(State.currentTarget.altNames);

        if (allValidNames.length > 0) {
            for (let name of allValidNames) {
                if (name && getLevenshteinDistance(userInput, name) <= 1) { isCorrect = true; break; }
            }
        } else if (userInput === "") isCorrect = true;
        
        processAnswer(isCorrect, State.currentTarget, false, isCorrect ? 1 : 0);

    } else if (effectiveMode === 'type') {
        let isCorrect = false; let earnedPoints = 0;
        if (State.currentTarget.isDSO) {
            if (State.selectedTypeDSO && State.selectedTypeDSO === State.currentTarget.correctType) { isCorrect = true; earnedPoints = 1; }
        } else {
            const correctArr = State.currentTarget.correctTypes || ['simpla'];
            const selArr = State.selectedTypesStar || [];
            
            if (selArr.length === 0) { isCorrect = false; earnedPoints = 0; } 
            else {
                let hasWrong = selArr.some(t => !correctArr.includes(t));
                if (hasWrong) { isCorrect = false; earnedPoints = 0; } 
                else { earnedPoints = selArr.length / correctArr.length; isCorrect = true; }
            }
        }
        processAnswer(isCorrect, State.currentTarget, false, earnedPoints);

    } else if (effectiveMode === 'mag') {
        const userMag = parseFloat(DOM.inputMag.value);
        let earnedPoints = 0;
        if (!isNaN(userMag)) {
            const err = parseFloat(Math.abs(userMag - State.currentTarget.mag).toFixed(2));
            if (err === 0.0) earnedPoints = 5; else if (err <= 0.1) earnedPoints = 4; else if (err <= 0.2) earnedPoints = 3; else if (err <= 0.3) earnedPoints = 2; else if (err <= 0.4) earnedPoints = 1;
        }
        processAnswer(earnedPoints > 0, State.currentTarget, false, earnedPoints);

    } else if (effectiveMode === 'position') {
        if (State.currentSelectedId) {
            const clickedStar = State.targetObjects.find(s => s.id === State.currentSelectedId);
            const isCorrect = (State.currentSelectedId === State.currentTarget.id);
            processAnswer(isCorrect, clickedStar, false, isCorrect ? 1 : 0);
        }
    }
});

window.addEventListener('click', (event) => {
    if (event.target.closest('.hud-container') || event.target.closest('.overlay-modal') || event.target.closest('nav') || event.target.closest('#free-roam-card') || event.target.closest('#countdown-overlay') || event.target.closest('#practice-result-modal')) return;
    
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);

    let allIntersects = [];
    if (starPointsMesh) allIntersects = allIntersects.concat(raycaster.intersectObject(starPointsMesh));
    if (dsoPointsMesh) allIntersects = allIntersects.concat(raycaster.intersectObject(dsoPointsMesh));

    if (allIntersects.length > 0) {
        allIntersects.sort((a, b) => a.distanceToRay - b.distanceToRay);
        const bestHit = allIntersects[0];
        
        let clickedObj;
        if (bestHit.object === starPointsMesh) clickedObj = State.targetObjects.filter(o => !o.isDSO)[bestHit.index];
        else if (bestHit.object === dsoPointsMesh) clickedObj = State.targetObjects.filter(o => o.isDSO)[bestHit.index];

        if (clickedObj) {
            State.currentSelectedId = clickedObj.id;
            const effectiveSkill = (State.activeMode === 'multi') ? State.multiGameMode : State.activeMode;

            if (State.activeMode === 'free') {
                updateHighlightRing(clickedObj, 0x35e6ff);
                showFreeRoamCard(clickedObj);
            } else if (effectiveSkill === 'position' && DOM.btnCheck.style.display !== "none" && State.isMyTurnNow) {
                updateHighlightRing(clickedObj, 0xffcf5c); 
                DOM.btnCheck.disabled = false; DOM.btnCheck.style.opacity = "1";
            }
        }
    } else if (State.activeMode === 'free') {
        if(DOM.frCard) DOM.frCard.style.display = 'none'; 
        updateHighlightRing(null); 
        State.currentSelectedId = null;
    }
});

// ==========================================
// START-UP PROCES
// ==========================================
if (typeof initDatabase === "function") {
    initDatabase().then(() => {
        State.targetObjects = astronomyDatabase.filter(star => star.mag > -10);
        
        customStarCorrections.forEach(corr => {
            let star = State.targetObjects.find(s => s.bayerName === corr.identifier || `HIP ${s.hip}` === corr.identifier);
            if (star) {
                if (corr.correctName !== undefined) star.correctName = corr.correctName.toLowerCase();
                if (corr.correctType !== undefined) star.correctType = corr.correctType.toLowerCase();
                if (corr.altNames !== undefined) star.altNames = corr.altNames.map(n => n.toLowerCase());
            }
        });

        applyStarClassifications();
        initScene3D(); 
        buildStarfield(State.targetObjects); 
        drawConstellations(State.targetObjects); 
        populateLearningSection(); 
    });
}