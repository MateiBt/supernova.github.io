// ==========================================
// UI.JS - Controlul Interfeței Utilizator
// ==========================================
import { State, DOM, db } from './state.js';
import { constellationFullNames, typeDict, starTypeKeys, dsoTypeKeys, dictMode } from './config.js';
import { formatPoints, formatTimeMs } from './utils.js';
import { updatePublicLeaderboardView, updatePracticePreview } from './leaderboards.js';
import { ref, get } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

export function updateLobbyUIList() {
    const listEl = document.getElementById('lobby-players-list');
    const container = document.getElementById('lobby-players-container');
    if(!listEl || !container) return;
    
    listEl.innerHTML = '';
    const keys = Object.keys(State.multiPlayers);
    if(keys.length > 0) {
        container.style.display = 'block';
        keys.forEach(k => {
            const li = document.createElement('li');
            // Afișăm ELO-ul oponentului bazat pe modul selectat curent
            const currentElo = State.multiPlayers[k].elo || 1200; 
            li.innerHTML = `<i class="fa-solid fa-user-astronaut" style="color:var(--cyan);"></i> ${State.multiPlayers[k].name} (ELO: ${currentElo})`;
            listEl.appendChild(li);
        });
    } else {
        container.style.display = 'none';
    }
}

export function unselectPractice() {
    State.activePracticeConstellation = null;
    document.querySelectorAll('#learning-constellations-list .learn-btn').forEach(b => b.classList.remove('selected'));
    checkLaunchReady();
}

export function checkLaunchReady() {
    if(DOM.btnLaunchSingle) DOM.btnLaunchSingle.disabled = true;
    if(DOM.btnLaunchMulti) DOM.btnLaunchMulti.disabled = true;
    if(DOM.btnLaunchPractice) DOM.btnLaunchPractice.disabled = true;

    if(State.isOnlineMatch && State.onlineRoomCode) return;

    if (State.activePracticeConstellation) {
        if (!State.activeMode || State.activeMode === 'free' || State.activeMode === 'multi') State.activeMode = 'name';
        if(DOM.btnLaunchPractice) {
            DOM.btnLaunchPractice.disabled = false;
            DOM.btnLaunchPractice.innerText = `ENGAGE PRACTICE: ${State.activePracticeConstellation}`;
        }
    } 
    else if (State.activeMode === 'multi') {
        if(DOM.btnLaunchMulti) DOM.btnLaunchMulti.disabled = false;
    }
    else if (State.activeMode === 'free') {
        if(DOM.btnLaunchSingle) DOM.btnLaunchSingle.disabled = false;
    } 
    else if (State.activeMode && State.activeDiff && State.activeTime && State.activeTarget) {
        if(DOM.btnLaunchSingle) DOM.btnLaunchSingle.disabled = false;
    }
}

export function populateLearningSection() {
    const listElement = document.getElementById('learning-constellations-list');
    if (!listElement) return;
    listElement.innerHTML = '<li class="empty-msg"><i class="fa-solid fa-spinner fa-spin"></i> Syncing Constellation Records...</li>';

    let constelStats = new Map(); 
    State.targetObjects.forEach(obj => {
        if (!obj.isDSO && obj.bayerName) {
            const parts = obj.bayerName.split(' ');
            if (parts.length > 1) {
                const abbr = parts[parts.length - 1]; 
                if(!constelStats.has(abbr)) constelStats.set(abbr, 0);
                constelStats.set(abbr, constelStats.get(abbr) + 1);
            }
        }
    });

    const sortedAbbrs = Array.from(constelStats.keys()).sort();
    const dName = State.currentUser ? (State.currentUser.displayName || (State.currentUser.email ? State.currentUser.email.split('@')[0] : "Student")) : "Student";

    get(ref(db, 'leaderboards/practice')).then((snapshot) => {
        listElement.innerHTML = '';
        let allPracticeScores = [];
        if(snapshot.exists()){
            snapshot.forEach(child => { allPracticeScores.push(child.val()); });
        }

        sortedAbbrs.forEach(abbr => {
            const fullName = constellationFullNames[abbr] || abbr;
            const maxStars = constelStats.get(abbr);

            let cScores = allPracticeScores.filter(s => s.constellation === abbr && s.mode === 'name');
            
            let userBests = {};
            cScores.forEach(sc => {
                if (!userBests[sc.user]) userBests[sc.user] = sc;
                else {
                    let curr = userBests[sc.user];
                    if (sc.points > curr.points || (sc.points === curr.points && sc.timeMs < curr.timeMs)) {
                        userBests[sc.user] = sc;
                    }
                }
            });

            let sortedBests = Object.values(userBests).sort((a, b) => {
                if (b.points !== a.points) return b.points - a.points;
                return a.timeMs - b.timeMs;
            });

            let myRank = -1; let myBest = null;
            for(let i=0; i<sortedBests.length; i++){
                if(sortedBests[i].user === dName) { myRank = i + 1; myBest = sortedBests[i]; break; }
            }

            let btnClass = 'learn-btn';
            let bestTimeHtml = '';

            if (myBest) {
                if (myRank === 1) btnClass += ' rank-gold';
                else if (myRank === 2) btnClass += ' rank-silver';
                else if (myRank === 3) btnClass += ' rank-bronze';
                else if (myBest.points >= maxStars) btnClass += ' rank-completed';
                else btnClass += ' rank-unranked';

                const rankText = myRank === 1 ? '1st Place' : myRank === 2 ? '2nd Place' : myRank === 3 ? '3rd Place' : 'Completed';
                bestTimeHtml = `<div class="best-time-label">${rankText}: <span class="best-time-val">${formatPoints(myBest.points)}pts / ${formatTimeMs(myBest.timeMs)}</span></div>`;
            } else {
                btnClass += ' rank-unranked';
                bestTimeHtml = `<div class="best-time-label" style="font-style: italic;">Unranked</div>`;
            }

            if (abbr === State.activePracticeConstellation) btnClass += ' selected';
            
            const li = document.createElement('li');
            const btn = document.createElement('button');
            btn.className = btnClass;
            btn.innerHTML = `<span class="learn-title">${fullName} <span class="learn-abbr">(${abbr})</span></span> <span class="learn-count"><i class="fa-solid fa-star" style="font-size:0.8em; color:var(--text-low);"></i> ${maxStars} targets</span> ${bestTimeHtml}`;
            btn.title = fullName;
            
            btn.addEventListener('click', () => {
                document.querySelectorAll('#learning-constellations-list .learn-btn').forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
                State.activePracticeConstellation = abbr;
                checkLaunchReady();
                updatePracticePreview(abbr); 
            });
            
            li.appendChild(btn);
            listElement.appendChild(li);
        });
    });
}

export function renderTypeButtonGrid() {
    const grid = document.getElementById('type-button-grid');
    if (!grid) return;
    grid.innerHTML = '';
    State.selectedTypesStar = [];
    State.selectedTypeDSO = null;

    const isDSO = !!(State.currentTarget && State.currentTarget.isDSO);
    const keys = isDSO ? dsoTypeKeys : starTypeKeys;

    const hint = document.getElementById('type-grid-hint');
    if (hint) hint.innerText = isDSO ? "Select one classification." : "Select ALL classifications that apply (a star can be e.g. both Double and Variable).";

    keys.forEach(key => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'opt-btn type-btn';
        btn.dataset.type = key;
        btn.innerText = typeDict[key];
        btn.addEventListener('click', () => {
            if (isDSO) {
                grid.querySelectorAll('.type-btn').forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
                State.selectedTypeDSO = key;
            } else {
                btn.classList.toggle('selected');
                if (btn.classList.contains('selected')) {
                    if (!State.selectedTypesStar.includes(key)) State.selectedTypesStar.push(key);
                } else {
                    State.selectedTypesStar = State.selectedTypesStar.filter(t => t !== key);
                }
            }
        });
        grid.appendChild(btn);
    });
}

export function showInputGroupForSkill(skill) {
    DOM.inputGroupName.style.display = 'none';
    DOM.inputGroupType.style.display = 'none';
    if (DOM.inputGroupMag) DOM.inputGroupMag.style.display = 'none';
    DOM.inputName.value = "";
    if (DOM.inputMag) DOM.inputMag.value = "";
    DOM.hudFeedback.className = "hud-feedback";
    DOM.hudFeedback.style.display = "none";
    DOM.btnCheck.style.display = "block";

    if (skill === 'name') DOM.inputGroupName.style.display = 'flex';
    else if (skill === 'type') {
        DOM.inputGroupType.style.display = 'flex';
        renderTypeButtonGrid();
    } else if (skill === 'mag') {
        if (DOM.inputGroupMag) DOM.inputGroupMag.style.display = 'flex';
    }
}

export function prepareSkillRoundUI(skill) {
    showInputGroupForSkill(skill);
    State.currentSelectedId = null;
    if (skill === 'position') {
        DOM.btnCheck.disabled = true;
        DOM.btnCheck.style.opacity = '0.5';
        DOM.btnCheck.innerText = 'Confirm Target';
    } else {
        DOM.btnCheck.disabled = false;
        DOM.btnCheck.style.opacity = '1';
        DOM.btnCheck.innerText = (State.activeMode === 'multi') ? 'Transmit Answer' : 'Transmit';
    }
}

export function updateHUDGraph() {
    const cvs = document.getElementById('form-graph');
    const streakEl = document.getElementById('streak-display');
    if(!cvs) return;
    const ctx = cvs.getContext('2d');
    ctx.clearRect(0, 0, cvs.width, cvs.height);
    const barW = cvs.width / 20;
    
    let histToDraw = State.performanceHistory;
    let streakToDraw = State.currentStreak;

    if (State.activeMode === 'multi') {
        if(State.multiOrder && State.multiOrder.length > 0 && State.multiPlayers) {
            let activePlayer = State.multiPlayers[State.multiOrder[State.currentTurnIndex]];
            if(activePlayer) {
                histToDraw = activePlayer.history || [];
                streakToDraw = activePlayer.streak || 0;
                if(DOM.graphTitle) DOM.graphTitle.innerText = `${activePlayer.name}'s Form`;
            }
        } else {
            if(DOM.graphTitle) DOM.graphTitle.innerText = `Player Form`;
        }
    } else {
        if(DOM.graphTitle) DOM.graphTitle.innerText = `Live Form (Last 20)`;
    }

    if(streakEl) streakEl.innerText = streakToDraw;

    histToDraw.forEach((item, i) => {
        const x = i * barW;
        if(item.correct) {
            let h = Math.max(3, (1 - item.time / 15000) * cvs.height); 
            ctx.fillStyle = '#2be38a';
            ctx.fillRect(x + 1, cvs.height - h, barW - 2, h);
        } else {
            ctx.fillStyle = '#ff4d6a';
            ctx.fillRect(x + 1, cvs.height - 4, barW - 2, 4);
        }
    });
}

export function updateLiveLeaderboard() {
    const lbContainer = document.getElementById('live-leaderboard');
    const lbList = document.getElementById('live-leaderboard-list');
    if (!lbContainer || !lbList) return;

    if (State.activeMode === 'multi') {
        lbContainer.style.display = 'block';
        lbList.innerHTML = '';
        
        let sortedPlayers = Object.values(State.multiPlayers).sort((a, b) => {
            if (b.score !== a.score) return b.score - a.score;
            return a.timeMs - b.timeMs;
        });

        sortedPlayers.forEach((p, idx) => {
            let isMe = (p.name === (State.currentUser?.displayName || State.currentUser?.email?.split('@')[0]));
            let bg = isMe ? 'rgba(53,230,255,0.1)' : 'transparent';
            let tSecs = (p.timeMs / 1000).toFixed(1);
            
            const div = document.createElement('div');
            div.className = 'live-lb-item';
            div.style.background = bg;
            div.innerHTML = `
                <div class="live-lb-name">${idx + 1}. ${p.name}</div>
                <div><span class="live-lb-score">${formatPoints(p.score || 0)}</span><span class="live-lb-time">(${tSecs}s)</span></div>
            `;
            lbList.appendChild(div);
        });
    } else {
        lbContainer.style.display = 'none';
    }
}

export function updateTimerUI(totalSeconds) {
    const mins = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
    const secs = String(totalSeconds % 60).padStart(2, '0');
    if(DOM.timerDisplay) DOM.timerDisplay.innerText = `${mins}:${secs}`;
}

export function showFreeRoamCard(star) {
    document.getElementById('fr-name').innerText = star.correctName ? star.correctName.toUpperCase() : "UNNAMED OBJECT";
    document.getElementById('fr-bayer').innerText = star.bayerName || star.id || `Unknown`;
    document.getElementById('fr-mag').innerText = star.mag.toFixed(2);
    document.getElementById('fr-type').innerText = star.isDSO ? (typeDict[star.correctType] || "Unknown") : ((star.correctTypes || ['simpla']).map(t => typeDict[t] || t).join(', '));
    document.getElementById('fr-ra').innerText = star.ra.toFixed(4) + "h";
    document.getElementById('fr-dec').innerText = star.dec.toFixed(4) + "°";
    DOM.frCard.style.display = 'block';
}

export function updateArenaEloDisplay() {
    const eloDisplay = document.getElementById('multi-elo-display');
    const modeLabel = document.getElementById('multi-elo-mode-label');
    if (eloDisplay && State.myElo) {
        let mode = State.multiGameMode || 'name';
        eloDisplay.innerText = State.myElo[mode] || 1200;
        if(modeLabel) modeLabel.innerText = `${dictMode[mode]} ELO`;
    }
}