// ==========================================
// TOURNAMENT.JS - Logică pentru Turnee (Local & A.I.)
// ==========================================
import { State, DOM, db } from './state.js';
import { triggerGameStart } from './gameplay.js';
import { ref, set, update, onValue, onDisconnect, remove } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

export function initTournamentUI() {
    const btnAddPlayer = document.getElementById('btn-add-t-player');
    const btnAddBot = document.getElementById('btn-add-t-bot');
    const inpName = document.getElementById('tourney-player-name');
    
    if(btnAddPlayer) {
        btnAddPlayer.addEventListener('click', () => {
            const name = inpName.value.trim() || `Player ${State.tourneyRoster.length + 1}`;
            addContestant(name, false, 0);
            inpName.value = '';
        });
    }

    if(btnAddBot) {
        btnAddBot.addEventListener('click', () => {
            const diffs = [0.2, 0.4, 0.6, 0.8, 0.95];
            const acc = diffs[Math.floor(Math.random() * diffs.length)];
            const name = `A.I. Bot (Acc: ${Math.round(acc*100)}%)`;
            addContestant(name, true, acc);
        });
    }

    document.querySelectorAll('#tourney-format-grid .opt-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('#tourney-format-grid .opt-btn').forEach(b => b.classList.remove('selected'));
            e.target.classList.add('selected');
            State.tourneyFormat = e.target.dataset.format;
            updateRosterHint();
        });
    });

    document.querySelectorAll('#tourney-skill-grid .opt-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('#tourney-skill-grid .opt-btn').forEach(b => b.classList.remove('selected'));
            e.target.classList.add('selected');
            State.tourneyGameMode = e.target.dataset.skill;
        });
    });

    const btnLocal = document.getElementById('btn-t-local');
    const btnOnline = document.getElementById('btn-t-online');
    const onlineControls = document.getElementById('tourney-online-controls');

    if (btnLocal && btnOnline) {
        btnLocal.addEventListener('click', () => {
            btnLocal.classList.add('selected');
            btnOnline.classList.remove('selected');
            onlineControls.style.display = 'none';
            State.tourneyIsOnline = false;
        });
        btnOnline.addEventListener('click', () => {
            btnOnline.classList.add('selected');
            btnLocal.classList.remove('selected');
            onlineControls.style.display = 'block';
            State.tourneyIsOnline = true;
        });
    }

    const btnHost = document.getElementById('btn-t-host');
    const btnJoin = document.getElementById('btn-t-join');
    if (btnHost) btnHost.addEventListener('click', hostTournamentRoom);
    if (btnJoin) btnJoin.addEventListener('click', joinTournamentRoom);

    const btnLaunch = document.getElementById('btn-launch-tourney');
    if(btnLaunch) btnLaunch.addEventListener('click', startTournament);
    
    const btnNext = document.getElementById('btn-next-tourney-match');
    if(btnNext) btnNext.addEventListener('click', playNextTournamentMatch);
    
    const btnAbort = document.getElementById('btn-abort-tourney');
    if(btnAbort) btnAbort.addEventListener('click', () => {
        if(confirm("Abort tournament? All progress will be lost.")) {
            resetTournament();
        }
    });
}

function hostTournamentRoom() {
    State.tourneyRole = 'host';
    State.tourneyRoomCode = Math.random().toString(36).substring(2, 6).toUpperCase();
    
    const statusLabel = document.getElementById('t-room-status');
    statusLabel.innerText = `Hosting Room: ${State.tourneyRoomCode}`;
    
    const roomRef = ref(db, 'tourneys/' + State.tourneyRoomCode);
    set(roomRef, { status: 'waiting', hostId: State.myClientId, roster: {} });
    onDisconnect(roomRef).remove();

    addContestant(State.currentUser ? (State.currentUser.displayName || State.currentUser.email.split('@')[0]) : "Host", false, 0);
    
    listenToTournamentRoster();
}

function joinTournamentRoom() {
    const codeInp = document.getElementById('inp-t-code');
    const code = codeInp.value.trim().toUpperCase();
    if(code.length !== 4) return;

    State.tourneyRole = 'guest';
    State.tourneyRoomCode = code;
    
    const statusLabel = document.getElementById('t-room-status');
    statusLabel.innerText = `Connected to Room: ${State.tourneyRoomCode}`;
    
    addContestant(State.currentUser ? (State.currentUser.displayName || State.currentUser.email.split('@')[0]) : "Guest", false, 0);
    
    listenToTournamentRoster();
}

function listenToTournamentRoster() {
    if(State.tourneyListenerUnsubscribe) State.tourneyListenerUnsubscribe();
    State.tourneyListenerUnsubscribe = onValue(ref(db, `tourneys/${State.tourneyRoomCode}/roster`), (snapshot) => {
        const data = snapshot.val();
        if(data) {
            State.tourneyRoster = Object.values(data);
            renderRoster();
            checkTourneyLaunchReady();
        }
    });
}

function updateRosterHint() {
    const hint = document.getElementById('tourney-roster-hint');
    if(!hint) return;
    
    if (State.tourneyFormat === 'champions') {
        hint.innerText = "Add exactly 1 Player. 35 Bots will be auto-generated.";
    } else if (State.tourneyFormat === 'classic') {
        hint.innerText = "Add players (power of 2: 4, 8, 16...).";
    } else {
        hint.innerText = "Add at least 4 players (Local/Bots).";
    }
    checkTourneyLaunchReady();
}

function addContestant(name, isBot, accuracy) {
    if (State.tourneyFormat === 'champions' && State.tourneyRoster.length >= 1 && !isBot) {
        alert("Champions Cup only supports 1 human player.");
        return;
    }

    const playerId = 't_' + Math.random().toString(36).substr(2, 9);
    const playerObj = {
        id: playerId,
        name: name,
        isBot: isBot,
        botAccuracy: accuracy,
        score: 0, 
        eliminated: false
    };

    if (State.tourneyIsOnline && State.tourneyRoomCode) {
        update(ref(db, `tourneys/${State.tourneyRoomCode}/roster/${playerId}`), playerObj);
    } else {
        State.tourneyRoster.push(playerObj);
        renderRoster();
        checkTourneyLaunchReady();
    }
}

function renderRoster() {
    const list = document.getElementById('tourney-players-list');
    if(!list) return;
    list.innerHTML = '';
    State.tourneyRoster.forEach((p, index) => {
        const li = document.createElement('li');
        li.style.display = "flex"; li.style.justifyContent = "space-between";
        li.innerHTML = `<span>${index + 1}. ${p.isBot ? '<i class="fa-solid fa-robot" style="color:var(--text-low);"></i>' : '<i class="fa-solid fa-user-astronaut" style="color:var(--cyan);"></i>'} ${p.name}</span>`;
        list.appendChild(li);
    });
}

function checkTourneyLaunchReady() {
    const btnLaunch = document.getElementById('btn-launch-tourney');
    if(!btnLaunch) return;

    let ready = false;
    let count = State.tourneyRoster.length;
    if (State.tourneyFormat === 'champions') {
        ready = (count === 1);
    } else if (State.tourneyFormat === 'classic') {
        ready = (count >= 4 && (count & (count - 1)) === 0);
    } else {
        ready = (count >= 4);
    }
    btnLaunch.disabled = !ready;
}

function startTournament() {
    if (State.tourneyFormat === 'champions') {
        for(let i=0; i<35; i++) {
            const acc = [0.2, 0.4, 0.6, 0.8, 0.95][Math.floor(Math.random()*5)];
            State.tourneyRoster.push({ 
                id: 'bot_fc_'+i, name: `FC Bot ${i+1}`, isBot: true, botAccuracy: acc, 
                score: 0, points: 0, goalsFor: 0, goalsAgainst: 0, eliminated: false 
            });
        }
    }

    State.isTournament = true;
    State.tourneyState = {
        phase: State.tourneyFormat === 'champions' ? 'league' : 'bracket',
        matches: generateMatches(),
        currentMatchIndex: 0
    };

    document.getElementById('tourney-setup-ui').style.display = 'none';
    document.getElementById('tourney-active-ui').style.display = 'block';
    renderTournamentView();
}

function generateMatches() {
    let matches = [];
    if (State.tourneyFormat === 'classic') {
        for(let i=0; i<State.tourneyRoster.length; i+=2) {
            matches.push({ p1: State.tourneyRoster[i], p2: State.tourneyRoster[i+1], winner: null, type: '1v1' });
        }
    } else if (State.tourneyFormat === 'elimination') {
        matches.push({ type: 'ffa', participants: [...State.tourneyRoster] });
    } else if (State.tourneyFormat === 'champions') {
        let player = State.tourneyRoster[0];
        let opponents = State.tourneyRoster.slice(1).sort(() => 0.5 - Math.random()).slice(0, 8);
        opponents.forEach(opp => {
            matches.push({ p1: player, p2: opp, winner: null, type: '1v1_league' });
        });
    }
    return matches;
}

export function renderTournamentView() {
    const viewContainer = document.getElementById('tourney-view-container');
    const tTitle = document.getElementById('tourney-active-title');
    const tDesc = document.getElementById('tourney-active-desc');
    const btnNext = document.getElementById('btn-next-tourney-match');
    
    if(!viewContainer) return;
    viewContainer.innerHTML = '';
    const match = State.tourneyState.matches[State.tourneyState.currentMatchIndex];
    
    if (!match) {
        viewContainer.innerHTML = `<h2 style="color:var(--success); text-align:center; font-family:var(--font-display); font-size: 2rem;">TOURNAMENT CONCLUDED!</h2>`;
        btnNext.style.display = 'none';
        return;
    }
    
    btnNext.style.display = 'inline-block';

    if (match.type === 'ffa') {
        tTitle.innerText = "ELIMINATION ROUND";
        tDesc.innerText = `Survival Match - Last place is eliminated after 10 rounds!`;
        let html = `<ul class="lb-list" style="max-width: 400px; margin: 0 auto; border: 1px solid var(--edge);">`;
        match.participants.forEach(p => {
            let style = p.eliminated ? 'color:var(--danger); text-decoration:line-through;' : 'color:var(--text-hi);';
            html += `<li style="${style}">${p.name} ${p.eliminated ? '<span>OUT</span>' : ''}</li>`;
        });
        html += `</ul>`;
        viewContainer.innerHTML = html;
    } else {
        tTitle.innerText = match.type === '1v1_league' ? `LEAGUE PHASE - MATCHDAY ${State.tourneyState.currentMatchIndex + 1}` : "KNOCKOUT BRACKET";
        tDesc.innerText = `10 Rounds - Winner advances!`;
        viewContainer.innerHTML = `
            <div style="display:flex; justify-content:center; align-items:center; gap: 40px; font-family:var(--font-display); font-size:1.5rem; margin-top:30px;">
                <div style="color:var(--cyan); text-align:right;">${match.p1.name}</div>
                <div style="color:var(--danger); font-size:2rem;">VS</div>
                <div style="color:var(--gold); text-align:left;">${match.p2.name}</div>
            </div>
        `;
    }
}

function playNextTournamentMatch() {
    const match = State.tourneyState.matches[State.tourneyState.currentMatchIndex];
    if(!match) return;

    State.activeMode = 'multi';
    State.multiGameMode = State.tourneyGameMode;
    State.isOnlineMatch = false; 
    State.maxRounds = 10; 
    State.currentRound = 1;
    State.currentTurnIndex = 0;
    
    State.multiPlayers = {};
    State.multiOrder = [];

    if (match.type === 'ffa') {
        match.participants.filter(p => !p.eliminated).forEach(p => {
            State.multiPlayers[p.id] = { name: p.name, score: 0, timeMs: 0, streak: 0, history: [], isBot: p.isBot, botAcc: p.botAccuracy };
            State.multiOrder.push(p.id);
        });
    } else {
        State.multiPlayers[match.p1.id] = { name: match.p1.name, score: 0, timeMs: 0, streak: 0, history: [], isBot: match.p1.isBot, botAcc: match.p1.botAccuracy };
        State.multiPlayers[match.p2.id] = { name: match.p2.name, score: 0, timeMs: 0, streak: 0, history: [], isBot: match.p2.isBot, botAcc: match.p2.botAccuracy };
        State.multiOrder = [match.p1.id, match.p2.id];
    }

    State.currentTourneyMatch = match;
    DOM.setupModal.style.display = 'none';
    triggerGameStart(); 
}

export function handleTournamentMatchEnd() {
    const match = State.currentTourneyMatch;
    
    if (match.type === 'ffa') {
        let sorted = Object.keys(State.multiPlayers).sort((a,b) => State.multiPlayers[b].score - State.multiPlayers[a].score);
        let loserId = sorted[sorted.length-1];
        let loser = State.tourneyRoster.find(p => p.id === loserId);
        if(loser) loser.eliminated = true;
        
        let remaining = match.participants.filter(p => !p.eliminated);
        if(remaining.length === 1) {
            alert(`TOURNAMENT OVER! ${remaining[0].name.toUpperCase()} IS THE CHAMPION!`);
            State.tourneyState.currentMatchIndex++;
        } else {
            alert(`${loser.name} has been eliminated from the tournament!`);
        }
    } else {
        let p1Score = State.multiPlayers[match.p1.id].score;
        let p2Score = State.multiPlayers[match.p2.id].score;
        match.winner = p1Score > p2Score ? match.p1 : (p2Score > p1Score ? match.p2 : match.p1);
        alert(`Match Concluded! ${match.winner.name} won!`);
        
        State.tourneyState.currentMatchIndex++;
        
        if (State.tourneyFormat === 'classic' && State.tourneyState.currentMatchIndex >= State.tourneyState.matches.length) {
            let winners = State.tourneyState.matches.map(m => m.winner);
            if (winners.length === 1) {
                alert(`TOURNAMENT OVER! ${winners[0].name.toUpperCase()} WINS THE TOURNAMENT!`);
            } else {
                State.tourneyState.matches = [];
                for(let i=0; i<winners.length; i+=2) {
                    State.tourneyState.matches.push({ p1: winners[i], p2: winners[i+1], winner: null, type: '1v1' });
                }
                State.tourneyState.currentMatchIndex = 0;
            }
        } else if (State.tourneyFormat === 'champions' && State.tourneyState.currentMatchIndex >= State.tourneyState.matches.length) {
             alert(`LEAGUE PHASE OVER! Further knockout phases will be unlocked in v3.0!`);
        }
    }

    DOM.setupModal.style.display = 'flex';
    document.getElementById('tourney-active-ui').style.display = 'block';
    renderTournamentView();
}

function resetTournament() {
    State.isTournament = false;
    State.tourneyRoster = [];
    
    if(State.tourneyIsOnline && State.tourneyRole === 'host' && State.tourneyRoomCode) {
        remove(ref(db, 'tourneys/' + State.tourneyRoomCode));
    }
    
    if(State.tourneyListenerUnsubscribe) {
        State.tourneyListenerUnsubscribe();
        State.tourneyListenerUnsubscribe = null;
    }
    
    document.getElementById('tourney-setup-ui').style.display = 'block';
    document.getElementById('tourney-active-ui').style.display = 'none';
    const statusLabel = document.getElementById('t-room-status');
    if(statusLabel) statusLabel.innerText = '';
    
    renderRoster();
    const btnLaunch = document.getElementById('btn-launch-tourney');
    if(btnLaunch) btnLaunch.disabled = true;
}