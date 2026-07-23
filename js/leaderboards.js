// ==========================================
// LEADERBOARDS.JS - Firebase Leaderboards
// ==========================================
import { State, DOM, db } from './state.js';
import { ref, get, push, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";
import { formatDate, formatTimeMs, formatPoints } from './utils.js';
import { dictMode, dictTarget, dictDiff } from './config.js';

export function updatePersonalRecords() {
    const listElement = document.getElementById('personal-records-list');
    const nameLabel = document.getElementById('pb-user-name');
    if (!listElement || !State.currentUser) return;
    listElement.innerHTML = '<li class="empty-msg"><i class="fa-solid fa-spinner fa-spin"></i> Syncing...</li>';

    const dName = State.currentUser.displayName || (State.currentUser.email ? State.currentUser.email.split('@')[0] : "Student");
    if(nameLabel) nameLabel.innerText = dName + "'s";

    get(ref(db, 'leaderboards/global')).then((snapshot) => {
        listElement.innerHTML = '';
        let allScores = []; snapshot.forEach(child => { allScores.push(child.val()); });
        
        let myScores = allScores.filter(s => s.user === dName && s.time !== 'unlimited' && !s.constellation);
        myScores.sort((a, b) => b.points - a.points);
        
        if (myScores.length === 0) { listElement.innerHTML = '<li class="empty-msg">No completed sessions yet.</li>'; return; }

        myScores.slice(0, 5).forEach(sc => {
            let categoryScores = allScores.filter(s => s.mode === sc.mode && s.diff === sc.diff && s.time === sc.time && s.target === sc.target);
            categoryScores.sort((a, b) => {
                if (b.points !== a.points) return b.points - a.points;
                return (b.avgNameLength || 0) - (a.avgNameLength || 0);
            });
            
            let globalRank = categoryScores.findIndex(s => s.user === dName) + 1;
            let formattedDate = sc.date ? formatDate(sc.date) : "N/A";
            let targetStr = sc.target ? `<span style="font-size:0.85em; color:var(--cyan)">[${dictTarget[sc.target]}]</span>` : "";
            let rateStr = sc.rate ? `<span class="lb-extra" style="color:var(--success); margin-left:8px;">${sc.rate}s/obj</span>` : "";

            const li = document.createElement('li');
            let extraInfo = sc.mode === 'name' ? `<div class="lb-extra" style="margin:0;">(avg ${sc.avgNameLength || 0} chr)</div>` : "";
            li.innerHTML = `
            <div class="lb-user">
                <div><span style="color: var(--gold); font-weight: bold; margin-right: 3px;">#${globalRank}</span> ${dictMode[sc.mode]} ${targetStr}</div>
                <span class="lb-subtext">${dictDiff[sc.diff]} | ${sc.time}m | ${formattedDate}</span>
            </div> 
            <div style="text-align: right;">
                <span class="lb-score">${formatPoints(sc.points)} pts</span> ${rateStr}
                ${extraInfo}
            </div>`;
            listElement.appendChild(li);
        });
    }).catch(() => { listElement.innerHTML = '<li class="empty-msg">Error syncing records.</li>'; });
}

// Această funcție citește STRICT din BUTOANELE din Records Tab
export function updatePublicLeaderboardView() {
    const listElement = document.getElementById('public-leaderboard-list');
    if (!listElement) return;
    
    const targetBtn = document.querySelector('#rec-target-btns .active');
    const modeBtn = document.querySelector('#rec-mode-btns .active');
    const diffBtn = document.querySelector('#rec-diff-btns .active');
    const timeBtn = document.querySelector('#lb-tabs .active');

    const recTarget = targetBtn ? targetBtn.dataset.val : 'stars';
    const recMode = modeBtn ? modeBtn.dataset.val : 'name';
    const recDiff = diffBtn ? diffBtn.dataset.val : 'extreme';
    const recTime = timeBtn ? timeBtn.dataset.tab : '5';

    listElement.innerHTML = '<li class="empty-msg"><i class="fa-solid fa-spinner fa-spin"></i> Loading...</li>';
    
    get(ref(db, 'leaderboards/global')).then((snapshot) => {
        listElement.innerHTML = ''; 
        let scores = []; snapshot.forEach(child => { scores.push(child.val()); });

        scores = scores.filter(s => s.mode === recMode && s.diff === recDiff && s.time === recTime && s.target === recTarget && !s.constellation);
        
        let userBests = {};
        scores.forEach(sc => {
            if (!userBests[sc.user]) userBests[sc.user] = sc;
            else {
                let curr = userBests[sc.user];
                if (sc.points > curr.points || (sc.points === curr.points && (sc.avgNameLength||0) > (curr.avgNameLength||0))) userBests[sc.user] = sc;
            }
        });

        let sortedScores = Object.values(userBests).sort((a, b) => {
            if (b.points !== a.points) return b.points - a.points;
            return (b.avgNameLength || 0) - (a.avgNameLength || 0);
        }); 
        
        if (sortedScores.length === 0) { listElement.innerHTML = '<li class="empty-msg">No records yet. Be the first!</li>'; return; }
        
        sortedScores.slice(0, 10).forEach((sc, idx) => {
            const li = document.createElement('li');
            let extraInfo = sc.mode === 'name' ? `<span class="lb-extra">(avg ${sc.avgNameLength || 0} chr)</span>` : "";
            let rateStr = sc.rate ? `<span class="lb-extra" style="color:var(--success); margin-left:8px;">${sc.rate}s/obj</span>` : "";
            let formattedDate = sc.date ? formatDate(sc.date) : "N/A";
            li.innerHTML = `
            <div class="lb-user">
                <span>${idx + 1}. ${sc.user}</span>
                <span class="lb-subtext" style="font-size: 0.7em; color: var(--text-muted); margin-top: 2px;">${formattedDate}</span>
            </div> 
            <div><span class="lb-score">${formatPoints(sc.points)} pts</span> ${rateStr} ${extraInfo}</div>`;
            listElement.appendChild(li);
        });
    });
}

// Funcție specială pentru previzualizarea Constelațiilor în Tab-ul Records
export function updatePracticePreview(abbr) {
    const listElement = document.getElementById('practice-lb-preview-list');
    if(!listElement) return;

    listElement.innerHTML = '<li class="empty-msg"><i class="fa-solid fa-spinner fa-spin"></i> Loading...</li>';
    
    get(ref(db, 'leaderboards/practice')).then((snapshot) => {
        listElement.innerHTML = '';
        let pScores = []; snapshot.forEach(child => { pScores.push(child.val()); });
        
        pScores = pScores.filter(s => s.constellation === abbr);
        
        let userBests = {};
        pScores.forEach(sc => {
            if (!userBests[sc.user]) userBests[sc.user] = sc;
            else {
                let curr = userBests[sc.user];
                if (sc.points > curr.points || (sc.points === curr.points && sc.timeMs < curr.timeMs)) userBests[sc.user] = sc;
            }
        });

        let sortedBests = Object.values(userBests).sort((a, b) => { if (b.points !== a.points) return b.points - a.points; return a.timeMs - b.timeMs; });

        if (sortedBests.length === 0) {
            listElement.innerHTML = '<li class="empty-msg">No records yet for this constellation.</li>';
            return;
        }

        sortedBests.slice(0, 10).forEach((sc, idx) => {
            const li = document.createElement('li');
            li.innerHTML = `
            <div class="lb-user">
                <span>${idx + 1}. ${sc.user}</span>
            </div> 
            <div style="text-align: right;">
                <span class="lb-score" style="margin-right: 8px;">${formatPoints(sc.points)} pts</span>
                <div class="lb-score" style="color:var(--success); font-size: 0.8em; margin:0;">${formatTimeMs(sc.timeMs)}</div>
            </div>`;
            listElement.appendChild(li);
        });
    });
}

export function saveLeaderboardScore() {
    if (!State.currentUser || State.activePracticeConstellation || State.activeMode === 'free' || State.activeMode === 'multi' || State.activeTime === 'unlimited') return;
    const dName = State.currentUser.displayName || (State.currentUser.email ? State.currentUser.email.split('@')[0] : "Student");
    let avgLen = State.currentScore > 0 ? parseFloat((State.totalLettersGuessed / State.currentScore).toFixed(1)) : 0;
    let rate = State.currentScore > 0 ? parseFloat((State.totalPlayTimeSec / State.currentScore).toFixed(2)) : 0;

    const scoreData = {
        user: dName, target: State.activeTarget, mode: State.activeMode, diff: State.activeDiff, time: State.activeTime, points: State.currentScore,
        avgNameLength: State.activeMode === 'name' ? avgLen : 0, date: new Date().toISOString(), rate: rate, timestamp: serverTimestamp()
    };
    push(ref(db, 'leaderboards/global'), scoreData);
}

export function savePracticeScore(timeMs) {
    if (!State.currentUser || !State.activePracticeConstellation) return;
    const dName = State.currentUser.displayName || (State.currentUser.email ? State.currentUser.email.split('@')[0] : "Student");
    
    // Practice e salvat mereu sub modul "name"
    const scoreData = {
        user: dName, constellation: State.activePracticeConstellation, mode: 'name', points: State.currentScore, timeMs: timeMs, date: new Date().toISOString(), timestamp: serverTimestamp()
    };
    push(ref(db, 'leaderboards/practice'), scoreData);
    
    let pScores = JSON.parse(localStorage.getItem('planetariu_practice_lb')) || [];
    pScores.push(scoreData);
    localStorage.setItem('planetariu_practice_lb', JSON.stringify(pScores));
}

export function populatePracticeLeaderboardModal() {
    const listElement = document.getElementById('practice-lb-list');
    if(!listElement) return;
    listElement.innerHTML = '<li class="empty-msg"><i class="fa-solid fa-spinner fa-spin"></i> Loading...</li>';
    
    get(ref(db, 'leaderboards/practice')).then((snapshot) => {
        listElement.innerHTML = '';
        let pScores = []; snapshot.forEach(child => { pScores.push(child.val()); });
        pScores = pScores.filter(s => s.constellation === State.activePracticeConstellation && s.mode === 'name');
        
        let userBests = {};
        pScores.forEach(sc => {
            if (!userBests[sc.user]) userBests[sc.user] = sc;
            else {
                let curr = userBests[sc.user];
                if (sc.points > curr.points || (sc.points === curr.points && sc.timeMs < curr.timeMs)) userBests[sc.user] = sc;
            }
        });

        let sortedBests = Object.values(userBests).sort((a, b) => { if (b.points !== a.points) return b.points - a.points; return a.timeMs - b.timeMs; });

        if (sortedBests.length === 0) return;
        const dName = State.currentUser ? (State.currentUser.displayName || (State.currentUser.email ? State.currentUser.email.split('@')[0] : "Student")) : "";

        sortedBests.forEach((sc, idx) => {
            const li = document.createElement('li');
            if (sc.user === dName) li.style.background = 'rgba(255,255,255,0.05)'; 
            let formattedDate = sc.date ? formatDate(sc.date) : "N/A";
            li.innerHTML = `
            <div class="lb-user">
                <span>${idx + 1}. ${sc.user}</span>
                <span class="lb-subtext" style="font-size: 0.7em; color: var(--text-muted); margin-top: 2px;">${formattedDate}</span>
            </div> 
            <div style="text-align: right;">
                <span class="lb-score" style="margin-right: 8px;">${formatPoints(sc.points)} pts</span>
                <div class="lb-score" style="color:var(--success); margin:0;">${formatTimeMs(sc.timeMs)}</div>
            </div>`;
            listElement.appendChild(li);
        });
    });
}