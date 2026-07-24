// ==========================================
// TOURNAMENT.JS - Logică pentru Turnee (Local & A.I.)
// ==========================================
import { State, DOM } from './state.js';
import { triggerGameStart } from './gameplay.js';

export function initTournamentUI() {
    if(!DOM.btnAddTPlayer) return;

    DOM.btnAddTPlayer.addEventListener('click', () => {
        const name = DOM.tInpName.value.trim() || `Player ${State.tourneyRoster.length + 1}`;
        addContestant(name, false, 0);
        DOM.tInpName.value = '';
    });

    DOM.btnAddTBot.addEventListener('click', () => {
        const diffs = [0.2, 0.4, 0.6, 0.8, 0.95];
        const acc = diffs[Math.floor(Math.random() * diffs.length)];
        const name = `A.I. Bot (Acc: ${Math.round(acc*100)}%)`;
        addContestant(name, true, acc);
    });

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

    DOM.btnLaunchTourney.addEventListener('click', startTournament);
    DOM.btnNextTMatch.addEventListener('click', playNextTournamentMatch);
    DOM.btnAbortTourney.addEventListener('click', () => {
        if(confirm("Abort tournament? All progress will be lost.")) {
            resetTournament();
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
    State.tourneyRoster.push({
        id: 't_' + Math.random().toString(36).substr(2, 9),
        name: name,
        isBot: isBot,
        botAccuracy: accuracy,
        score: 0, 
        eliminated: false
    });
    renderRoster();
    checkTourneyLaunchReady();
}

function renderRoster() {
    DOM.tPlayersList.innerHTML = '';
    State.tourneyRoster.forEach((p, index) => {
        const li = document.createElement('li');
        li.style.display = "flex"; li.style.justifyContent = "space-between";
        li.innerHTML = `<span>${index + 1}. ${p.isBot ? '<i class="fa-solid fa-robot" style="color:var(--text-low);"></i>' : '<i class="fa-solid fa-user-astronaut" style="color:var(--cyan);"></i>'} ${p.name}</span>`;
        DOM.tPlayersList.appendChild(li);
    });
}

function checkTourneyLaunchReady() {
    let ready = false;
    let count = State.tourneyRoster.length;
    if (State.tourneyFormat === 'champions') {
        ready = (count === 1); // Trebuie fix 1 jucător uman (restul de 35 se autogenerează)
    } else if (State.tourneyFormat === 'classic') {
        ready = (count >= 4 && (count & (count - 1)) === 0); // Trebuie să fie o putere a lui 2
    } else {
        ready = (count >= 4); // Elimination minim 4
    }
    DOM.btnLaunchTourney.disabled = !ready;
}

function startTournament() {
    if (State.tourneyFormat === 'champions') {
        // Generăm 35 de boți automat pentru formatul de ligă
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

    DOM.tSetupUI.style.display = 'none';
    DOM.tActiveUI.style.display = 'block';
    renderTournamentView();
}

function generateMatches() {
    let matches = [];
    if (State.tourneyFormat === 'classic') {
        // Perechi 1 la 1
        for(let i=0; i<State.tourneyRoster.length; i+=2) {
            matches.push({ p1: State.tourneyRoster[i], p2: State.tourneyRoster[i+1], winner: null, type: '1v1' });
        }
    } else if (State.tourneyFormat === 'elimination') {
        // Toată lumea în aceeași arenă
        matches.push({ type: 'ffa', participants: [...State.tourneyRoster] });
    } else if (State.tourneyFormat === 'champions') {
        // Modul ligă - jucătorul uman vs 8 boți aleatori (simplificat pt prima fază)
        let player = State.tourneyRoster[0];
        let opponents = State.tourneyRoster.slice(1).sort(() => 0.5 - Math.random()).slice(0, 8);
        opponents.forEach(opp => {
            matches.push({ p1: player, p2: opp, winner: null, type: '1v1_league' });
        });
    }
    return matches;
}

export function renderTournamentView() {
    DOM.tViewContainer.innerHTML = '';
    const match = State.tourneyState.matches[State.tourneyState.currentMatchIndex];
    
    if (!match) {
        DOM.tViewContainer.innerHTML = `<h2 style="color:var(--success); text-align:center; font-family:var(--font-display); font-size: 2rem;">TOURNAMENT CONCLUDED!</h2>`;
        DOM.btnNextTMatch.style.display = 'none';
        return;
    }
    
    DOM.btnNextTMatch.style.display = 'inline-block';

    if (match.type === 'ffa') {
        DOM.tTitle.innerText = "ELIMINATION ROUND";
        DOM.tDesc.innerText = `Survival Match - Last place is eliminated after 10 rounds!`;
        let html = `<ul class="lb-list" style="max-width: 400px; margin: 0 auto; border: 1px solid var(--edge);">`;
        match.participants.forEach(p => {
            let style = p.eliminated ? 'color:var(--danger); text-decoration:line-through;' : 'color:var(--text-hi);';
            html += `<li style="${style}">${p.name} ${p.eliminated ? '<span>OUT</span>' : ''}</li>`;
        });
        html += `</ul>`;
        DOM.tViewContainer.innerHTML = html;
    } else {
        DOM.tTitle.innerText = match.type === '1v1_league' ? `LEAGUE PHASE - MATCHDAY ${State.tourneyState.currentMatchIndex + 1}` : "KNOCKOUT BRACKET";
        DOM.tDesc.innerText = `10 Rounds - Winner advances!`;
        DOM.tViewContainer.innerHTML = `
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
        // Găsim cel mai slab punctaj și îl eliminăm
        let sorted = Object.keys(State.multiPlayers).sort((a,b) => State.multiPlayers[b].score - State.multiPlayers[a].score);
        let loserId = sorted[sorted.length-1];
        let loser = State.tourneyRoster.find(p => p.id === loserId);
        if(loser) loser.eliminated = true;
        
        let remaining = match.participants.filter(p => !p.eliminated);
        if(remaining.length === 1) {
            alert(`TOURNAMENT OVER! ${remaining[0].name.toUpperCase()} IS THE CHAMPION!`);
            State.tourneyState.currentMatchIndex++; // End
        } else {
            alert(`${loser.name} has been eliminated from the tournament!`);
        }
    } else {
        let p1Score = State.multiPlayers[match.p1.id].score;
        let p2Score = State.multiPlayers[match.p2.id].score;
        match.winner = p1Score > p2Score ? match.p1 : (p2Score > p1Score ? match.p2 : match.p1); // Draw goes to p1 pt simplitate
        alert(`Match Concluded! ${match.winner.name} won!`);
        
        State.tourneyState.currentMatchIndex++;
        
        // Dacă runda curentă din bracket s-a terminat, generăm semifinalele/finala
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
    DOM.tActiveUI.style.display = 'block';
    renderTournamentView();
}

function resetTournament() {
    State.isTournament = false;
    State.tourneyRoster = [];
    DOM.tSetupUI.style.display = 'block';
    DOM.tActiveUI.style.display = 'none';
    renderRoster();
    DOM.btnLaunchTourney.disabled = true;
}