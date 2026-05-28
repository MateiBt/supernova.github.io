import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// --- CONFIGURARE FIREBASE ---
const firebaseConfig = {
  apiKey: "AIzaSyBZT_CK1nA24qYSzkQ2iNCwCDPiouR-uv8",
  authDomain: "supernova-auth-92414.firebaseapp.com",
  projectId: "supernova-auth-92414",
  storageBucket: "supernova-auth-92414.firebasestorage.app",
  messagingSenderId: "761827551286",
  appId: "1:761827551286:web:e4bdb744264402c1f61097"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

let currentUser = null;
let userProgress = []; 
let progressChart = null; 

// --- DICTIONAR DIFICULTATI (Actualizat cu problemele recente) ---
const difficultyMap = {
    'q1_usaaao_2026': 'easy',
    'q2_usaaao_2026': 'theory',
    'q9_usaaao_2026': 'easy',
    'q10_usaaao_2026': 'easy',
    'q15_usaaao_2026': 'medium',
    'q16_usaaao_2026': 'easy',
    'q27_usaaao_2026': 'easy',

    'q1_usaaao_2025': 'easy',
    'q4_usaaao_2025': 'medium',
    'q5_usaaao_2025': 'easy',
    'q11-12_usaaao_2025': 'easy',
    'q13_usaaao_2025': 'easy',
    'q19_usaaao_2025': 'theory',
    'q26_usaaao_2025': 'medium',

    'q1_usaaao_2018': 'easy',
    'q30_usaaao_2018': 'easy'
};

const loginBtn = document.getElementById('loginBtn');
const logoutBtn = document.getElementById('logoutBtn');
const profileLink = document.getElementById('profileLink');
const authModal = document.getElementById('authModal');
const authForm = document.getElementById('authForm');
const modalTitle = document.getElementById('modalTitle');
const authError = document.getElementById('authError');
const usernameInput = document.getElementById('usernameInput');

let isLoginMode = true;

// 1. MONITORIZARE USER
onAuthStateChanged(auth, (user) => {
  if (user) {
    currentUser = user;
    if(loginBtn) loginBtn.style.display = 'none';
    if(logoutBtn) logoutBtn.style.display = 'inline-flex';
    if(profileLink) profileLink.style.display = 'inline-block';

    loadUserProgress(user.uid);
    updateProfileUI(user);
    updateProblemButtons();
    
    if(document.getElementById('activityChart')) {
        updateChart('week');
        renderActivityLog(); 
    }
  } else {
    currentUser = null;
    userProgress = [];
    
    // Curățăm log-ul de probleme rezolvate de pe ecran
    localStorage.removeItem('solvedProblems');
    window.dispatchEvent(new Event('userDataLoaded'));

    if(loginBtn) loginBtn.style.display = 'inline-flex';
    if(logoutBtn) logoutBtn.style.display = 'none';
    if(profileLink) profileLink.style.display = 'none';

    if (window.location.pathname.includes('profile.html')) {
        window.location.href = 'index.html';
    }
  }
});

// 2. LOGICA PROGRES
function loadUserProgress(uid) {
    const saved = localStorage.getItem(`supernova_progress_${uid}`);
    if (saved) {
        let parsed = JSON.parse(saved);
        userProgress = parsed.map(item => {
            if (typeof item === 'string') return { id: item, date: new Date().toISOString() };
            // Fix-uri automate ID-uri vechi
            if (item.id === 'q1_mech') { item.id = 'q1_usaaao_2025'; } 
            if (item.id === 'q11_12_usaaao_2025') { item.id = 'q11-12_usaaao_2025'; } 
            return item;
        });
        localStorage.setItem(`supernova_progress_${uid}`, JSON.stringify(userProgress));
        
        // --- AICI INJECTĂM DATELE PENTRU PRACTICE HUB (PROGRESS PILLS) ---
        const solvedIds = userProgress.map(p => p.id);
        localStorage.setItem('solvedProblems', JSON.stringify(solvedIds));
        window.dispatchEvent(new Event('userDataLoaded')); // Anunțăm fișierele HTML că am adus datele
    } else {
        userProgress = [];
        localStorage.setItem('solvedProblems', JSON.stringify([]));
        window.dispatchEvent(new Event('userDataLoaded'));
    }
}

function saveUserProgress() {
    if(!currentUser) return;
    localStorage.setItem(`supernova_progress_${currentUser.uid}`, JSON.stringify(userProgress));
    
    // --- ACTUALIZĂM ȘI ARRAY-UL SIMPLU PENTRU PROGRESS PILLS ---
    const solvedIds = userProgress.map(p => p.id);
    localStorage.setItem('solvedProblems', JSON.stringify(solvedIds));
    window.dispatchEvent(new Event('userDataLoaded')); // Anunțăm că s-a salvat o problemă nouă

    updateProfileUI(currentUser);
    
    if(document.getElementById('activityChart')) {
        const activeBtn = document.querySelector('.filter-btn.active');
        const currentMode = activeBtn ? activeBtn.id.replace('btn-', '') : 'week';
        updateChart(currentMode);
        renderActivityLog(); 
    }
}

window.toggleProblemSolved = function(problemId) {
    if (!currentUser) { openAuthModal(); return; }
    const btn = document.getElementById(`btn-${problemId}`);
    
    const exists = userProgress.find(p => p.id === problemId);

    if (exists) {
        alert("Already solved!");
    } else {
        userProgress.push({ id: problemId, date: new Date().toISOString() });
        saveUserProgress();
        if(btn) {
            btn.innerHTML = '<i class="fas fa-check-circle"></i> Solved!';
            btn.classList.add('solved');
        }
        triggerConfetti();
        showToast("Problem solved!");
    }
}

function updateProblemButtons() {
    userProgress.forEach(item => {
        const btn = document.getElementById(`btn-${item.id}`);
        if (btn) {
            btn.innerHTML = '<i class="fas fa-check-circle"></i> Solved!';
            btn.classList.add('solved');
        }
    });
}

// 3. LOGICA DASHBOARD (GRAFIC & ACTIVITATE)
window.updateChart = (timeframe) => {
    const ctx = document.getElementById('activityChart');
    if (!ctx) return;

    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    const clickedBtn = document.getElementById(`btn-${timeframe}`);
    if(clickedBtn) clickedBtn.classList.add('active');

    const now = new Date();
    let limitDate = new Date();
    
    if (timeframe === 'week') {
        limitDate.setDate(now.getDate() - 6);
    } else if (timeframe === 'month') {
        limitDate.setDate(now.getDate() - 29);
    } else if (timeframe === 'all') {
        if (userProgress.length > 0) {
            const allDates = userProgress.map(p => new Date(p.date).getTime());
            limitDate = new Date(Math.min(...allDates));
            limitDate.setDate(limitDate.getDate() - 1); 
        } else {
            limitDate.setMonth(now.getMonth() - 1);
        }
    }

    const filteredData = userProgress.filter(item => new Date(item.date) >= limitDate);

    const grouped = {};
    filteredData.forEach(item => {
        const dateObj = new Date(item.date);
        let key = '';
        if (timeframe === 'all' && (now - limitDate) > 90 * 24 * 60 * 60 * 1000) {
            key = dateObj.toLocaleString('en-US', { month: 'short', year: '2-digit' });
        } else {
            key = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        }
        grouped[key] = (grouped[key] || 0) + 1;
    });

    let labels = Object.keys(grouped);
    let dataPoints = Object.values(grouped);
    if (labels.length === 0) { labels = ["No Data"]; dataPoints = [0]; }

    if (progressChart) progressChart.destroy();

    progressChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Solved',
                data: dataPoints,
                borderColor: '#00c6ff',
                backgroundColor: (context) => {
                    const ctxObj = context.chart.ctx;
                    const gradient = ctxObj.createLinearGradient(0, 0, 0, 300);
                    gradient.addColorStop(0, 'rgba(0, 198, 255, 0.4)');
                    gradient.addColorStop(1, 'rgba(0, 198, 255, 0)');
                    return gradient;
                },
                borderWidth: 3,
                tension: 0.4,
                pointBackgroundColor: '#050507',
                pointBorderColor: '#00c6ff',
                pointBorderWidth: 2,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                y: { beginAtZero: true, grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { stepSize: 1, color: '#666' } },
                x: { grid: { display: false }, ticks: { color: '#666' } }
            }
        }
    });
}

function renderActivityLog() {
    const listContainer = document.getElementById('activityLogList');
    if (!listContainer) return;

    listContainer.innerHTML = ''; 
    const sorted = [...userProgress].sort((a, b) => new Date(b.date) - new Date(a.date));

    if (sorted.length === 0) {
        listContainer.innerHTML = '<div style="color:#666; font-style:italic; text-align:center; padding:20px;">No problems solved yet. Start your mission!</div>';
        return;
    }

    sorted.forEach(item => {
        const dateObj = new Date(item.date);
        const dateStr = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute:'2-digit' });
        const displayId = item.id.toUpperCase().replace(/_/g, ' ');

        const row = document.createElement('div');
        row.className = 'activity-item';
        row.innerHTML = `
            <div class="activity-icon"><i class="fas fa-check"></i></div>
            <div class="activity-info">
                <span class="activity-id">Solved: <strong style="color:white;">${displayId}</strong></span>
                <span class="activity-date">${dateStr}</span>
            </div>
        `;
        listContainer.appendChild(row);
    });
}

// 4. UPDATE UI & PROFILE STATS
function updateProfileUI(user) {
    const nameDisplay = document.getElementById('profileUsername');
    const emailDisplay = document.getElementById('profileEmail');
    const statsCount = document.getElementById('statsCount');
    const statsRank = document.getElementById('statsRank');
    const progressBar = document.getElementById('levelProgress');
    const progressPercent = document.getElementById('progressPercent');
    const statsStreak = document.getElementById('statsStreak');
    const editContainer = document.getElementById('editUserContainer');

    if (nameDisplay && (!editContainer || editContainer.style.display !== 'block')) {
        nameDisplay.innerText = user.displayName || "Explorer";
    }
    
    if (emailDisplay) emailDisplay.innerText = user.email;

    // --- CALCULARE DAY STREAK ---
    if (statsStreak) {
        if (!userProgress || userProgress.length === 0) {
            statsStreak.innerText = "0";
        } else {
            const activeDates = [...new Set(userProgress.map(item => {
                const d = new Date(item.date);
                return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
            }))].sort((a, b) => new Date(b) - new Date(a));

            let streak = 0;
            let currentDate = new Date();
            currentDate.setHours(0, 0, 0, 0);

            let lastActiveDate = new Date(activeDates[0]);
            lastActiveDate.setHours(0, 0, 0, 0);

            let diffDaysFromToday = Math.round((currentDate - lastActiveDate) / (1000 * 60 * 60 * 24));

            if (diffDaysFromToday > 1) {
                streak = 0; 
            } else {
                streak = 1; 
                for (let i = 0; i < activeDates.length - 1; i++) {
                    let d1 = new Date(activeDates[i]);
                    let d2 = new Date(activeDates[i+1]);
                    d1.setHours(0, 0, 0, 0);
                    d2.setHours(0, 0, 0, 0);

                    let diff = Math.round((d1 - d2) / (1000 * 60 * 60 * 24));
                    if (diff === 1) {
                        streak++;
                    } else {
                        break;
                    }
                }
            }
            statsStreak.innerText = streak;
        }
    }
    
    // --- UPDATE TOTAL & PROGRESS BAR ---
    if (statsCount) {
        const count = userProgress.length;
        statsCount.innerText = count;
        
        const ranks = [
            { id: 'rank-0', name: "Novice", req: 0 },
            { id: 'rank-5', name: "Cadet", req: 5 },
            { id: 'rank-10', name: "Explorer", req: 10 },
            { id: 'rank-25', name: "Specialist", req: 25 },
            { id: 'rank-50', name: "Expert", req: 50 },
            { id: 'rank-67', name: "Stellar Anomaly", req: 67 },
            { id: 'rank-75', name: "Master", req: 75 },
            { id: 'rank-100', name: "Grandmaster", req: 100 },
            { id: 'rank-125', name: "Cosmic Voyager", req: 125 },
            { id: 'rank-150', name: "Galaxy Weaver", req: 150 },
            { id: 'rank-175', name: "Quasar Tamer", req: 175 },
            { id: 'rank-200', name: "Universal Architect", req: 200 },
            { id: 'rank-250', name: "Astral Deity", req: 250 }
        ];

        let currentRank = ranks[0];
        let nextRank = ranks[1];
        let maxUnlockedIndex = 0;

        ranks.forEach((r, index) => {
            const el = document.getElementById(r.id);
            if (el) {
                el.classList.remove('active', 'unlocked');
                if (count >= r.req) {
                    el.classList.add('unlocked');
                    currentRank = r;
                    nextRank = ranks[index + 1] || r; 
                    maxUnlockedIndex = index;
                }
            }
        });

        const activeEl = document.getElementById(ranks[maxUnlockedIndex].id);
        if (activeEl) {
            activeEl.classList.remove('unlocked');
            activeEl.classList.add('active');
        }

        let progress = 0;
        if (count >= ranks[ranks.length-1].req) {
            progress = 100;
        } else {
            progress = ((count - currentRank.req) / (nextRank.req - currentRank.req)) * 100;
        }

        if(statsRank) statsRank.innerText = currentRank.name;
        if(progressBar) progressBar.style.width = Math.max(5, Math.min(progress, 100)) + "%"; 
        if(progressPercent) progressPercent.innerText = Math.round(progress) + "%";

        // --- UPDATE DIFICULTATI ---
        let counts = { easy: 0, medium: 0, hard: 0, theory: 0 };
        userProgress.forEach(p => {
            let diff = difficultyMap[p.id];
            if (diff) counts[diff]++;
        });

        if(document.getElementById('stat-easy')) {
            document.getElementById('stat-easy').innerText = counts.easy;
            document.getElementById('stat-medium').innerText = counts.medium;
            document.getElementById('stat-hard').innerText = counts.hard;
            document.getElementById('stat-theory').innerText = counts.theory;
        }
    }
}

// Helpers Edit Username
window.enableEditUsername = () => { document.getElementById('viewMode').style.display = 'none'; document.getElementById('editUserContainer').style.display = 'block'; }
window.saveNewUsername = () => {
    const newName = document.getElementById('newUsernameInput').value;
    updateProfile(currentUser, { displayName: newName }).then(() => {
        window.location.reload();
    });
}
window.cancelEditUsername = () => { document.getElementById('viewMode').style.display = 'block'; document.getElementById('editUserContainer').style.display = 'none'; }

// Login Handlers
if (authForm) {
    authForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('emailInput').value;
        const password = document.getElementById('passwordInput').value;
        const username = usernameInput ? usernameInput.value : "Cadet";

        if (isLoginMode) {
            signInWithEmailAndPassword(auth, email, password).then(() => closeModal()).catch(e => authError.innerText = e.message);
        } else {
            createUserWithEmailAndPassword(auth, email, password).then((cred) => {
                updateProfile(cred.user, { displayName: username }).then(() => window.location.reload());
            }).catch(e => authError.innerText = e.message);
        }
    });
}

if (logoutBtn) logoutBtn.addEventListener('click', () => signOut(auth).then(() => window.location.href = 'index.html'));

window.openAuthModal = () => { authModal.style.display = 'flex'; }
window.closeModal = () => { authModal.style.display = 'none'; if(authForm) authForm.reset(); }
window.toggleMode = () => {
    isLoginMode = !isLoginMode;
    modalTitle.innerText = isLoginMode ? "Login" : "Register";
    document.getElementById('submitAuthBtn').innerText = isLoginMode ? "Login" : "Join Crew";
    if (usernameInput) usernameInput.style.display = isLoginMode ? 'none' : 'block';
    document.getElementById('toggleText').innerHTML = isLoginMode ? 'New? <span onclick="toggleMode()">Create</span>' : 'Member? <span onclick="toggleMode()">Login</span>';
}

function triggerConfetti() {
    const colors = ['#00c6ff', '#ff512f', '#ffffff'];
    for (let i = 0; i < 50; i++) {
        const d = document.createElement('div');
        d.style.cssText = `width:8px;height:8px;background:${colors[Math.floor(Math.random()*3)]};position:fixed;top:50%;left:50%;pointer-events:none;z-index:9999;`;
        document.body.appendChild(d);
        const a = Math.random()*Math.PI*2, v = 5+Math.random()*10;
        d.animate([{transform:'translate(0,0)', opacity:1}, {transform:`translate(${Math.cos(a)*300}px, ${Math.sin(a)*300}px)`, opacity:0}], {duration:1000}).onfinish=()=>d.remove();
    }
}
function showToast(m) {
    const t = document.createElement('div');
    t.innerText = m;
    t.style.cssText = "position:fixed;bottom:30px;left:50%;transform:translateX(-50%);background:#00c6ff;color:#000;padding:10px 20px;border-radius:20px;font-weight:bold;z-index:10000;";
    document.body.appendChild(t); setTimeout(() => t.remove(), 3000);
}