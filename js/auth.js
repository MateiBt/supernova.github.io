// js/auth.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyBZT_CK1nA24qYSzkQ2iNCwCDPiouR-uv8",
    authDomain: "supernova-auth-92414.firebaseapp.com",
    databaseURL: "https://supernova-auth-92414-default-rtdb.europe-west1.firebasedatabase.app/",
    projectId: "supernova-auth-92414",
    storageBucket: "supernova-auth-92414.firebasestorage.app",
    messagingSenderId: "761827551286",
    appId: "1:761827551286:web:e4bdb744264402c1f61097"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export { app };

let currentUser = null;
let userProgress = [];
let progressChart = null;

// 14 Days in Milliseconds (2 Weeks)
const COOLDOWN_MS = 14 * 24 * 60 * 60 * 1000;

export const difficultyMap = {
    // --- POTD Rotations (19.10.2026 - 01.11.2026) ---
    'potd_2026_10_19': 'medium',
    'potd_2026_10_20': 'medium',
    'potd_2026_10_21': 'easy',
    'potd_2026_10_22': 'medium',
    'potd_2026_10_23': 'easy',
    'potd_2026_10_24': 'easy',
    'potd_2026_10_25': 'easy',
    'potd_2026_10_26': 'easy',
    'potd_2026_10_27': 'easy',
    'potd_2026_10_28': 'easy',
    'potd_2026_10_29': 'easy',
    'potd_2026_10_30': 'easy',
    'potd_2026_10_31': 'easy',
    'potd_2026_11_01': 'easy',

    // --- POTW & POTM Rotations ---
    'potw_2026_w1': 'medium',
    'potw_2026_w2': 'hard',
    'potm_2026_m1': 'hard',

    // --- USAAAO 2026 (Q1 - Q30) ---
    'q1_usaaao_2026': 'easy',
    'q2_usaaao_2026': 'theory',
    'q3_usaaao_2026': 'easy',
    'q4_usaaao_2026': 'easy',
    'q5_usaaao_2026': 'easy',
    'q6_usaaao_2026': 'easy',
    'q7_usaaao_2026': 'easy',
    'q8_usaaao_2026': 'easy',
    'q9_usaaao_2026': 'easy',
    'q10_usaaao_2026': 'easy',
    'q11_usaaao_2026': 'easy',
    'q12_usaaao_2026': 'easy',
    'q13_usaaao_2026': 'easy',
    'q14_usaaao_2026': 'theory',
    'q15_usaaao_2026': 'easy',
    'q16_usaaao_2026': 'easy',
    'q17_usaaao_2026': 'easy',
    'q18_usaaao_2026': 'easy',
    'q19_usaaao_2026': 'easy',
    'q20_usaaao_2026': 'easy',
    'q21_usaaao_2026': 'easy',
    'q22_usaaao_2026': 'easy',
    'q23_usaaao_2026': 'theory',
    'q24_usaaao_2026': 'easy',
    'q25_usaaao_2026': 'easy',
    'q26_usaaao_2026': 'easy',
    'q27_usaaao_2026': 'easy',
    'q28_usaaao_2026': 'easy',
    'q29_usaaao_2026': 'easy',
    'q30_usaaao_2026': 'theory',

    // --- USAAAO 2025 (Q1 - Q30) ---
    'q1_usaaao_2025': 'easy',
    'q2_3_usaaao_2025': 'easy',
    'q2-3_usaaao_2025': 'easy',
    'q4_usaaao_2025': 'easy',
    'q5_usaaao_2025': 'easy',
    'q6_usaaao_2025': 'easy',
    'q7_usaaao_2025': 'easy',
    'q8_usaaao_2025': 'theory',
    'q9_usaaao_2025': 'theory',
    'q10_usaaao_2025': 'easy',
    'q11_12_usaaao_2025': 'easy',
    'q11-12_usaaao_2025': 'easy',
    'q13_usaaao_2025': 'easy',
    'q14_16_usaaao_2025': 'easy',
    'q14-16_usaaao_2025': 'easy',
    'q17_usaaao_2025': 'easy',
    'q18_usaaao_2025': 'easy',
    'q19_usaaao_2025': 'theory',
    'q20_usaaao_2025': 'easy',
    'q21_usaaao_2025': 'easy',
    'q22_usaaao_2025': 'easy',
    'q23_usaaao_2025': 'easy',
    'q24_usaaao_2025': 'theory',
    'q25_usaaao_2025': 'easy',
    'q26_usaaao_2025': 'easy',
    'q27_usaaao_2025': 'easy',
    'q28_usaaao_2025': 'easy',
    'q29_usaaao_2025': 'easy',
    'q30_usaaao_2025': 'easy',

    // --- USAAAO 2024 (Q1 - Q30) ---
    'q1_usaaao_2024': 'easy',
    'q2_usaaao_2024': 'theory',
    'q3_usaaao_2024': 'easy',
    'q4_usaaao_2024': 'easy',
    'q5_usaaao_2024': 'easy',
    'q6_usaaao_2024': 'easy',
    'q7_usaaao_2024': 'easy',
    'q8_usaaao_2024': 'easy',
    'q9_usaaao_2024': 'easy',
    'q10_usaaao_2024': 'easy',
    'q11_12_usaaao_2024': 'easy',
    'q11-12_usaaao_2024': 'easy',
    'q13_usaaao_2024': 'easy',
    'q14_usaaao_2024': 'easy',
    'q15_usaaao_2024': 'easy',
    'q16_usaaao_2024': 'easy',
    'q17_usaaao_2024': 'easy',
    'q18_19_usaaao_2024': 'easy',
    'q18-19_usaaao_2024': 'easy',
    'q20_usaaao_2024': 'easy',
    'q21_usaaao_2024': 'easy',
    'q22_usaaao_2024': 'easy',
    'q23_usaaao_2024': 'easy',
    'q24_usaaao_2024': 'easy',
    'q25_usaaao_2024': 'easy',
    'q26_usaaao_2024': 'easy',
    'q27_usaaao_2024': 'easy',
    'q28_usaaao_2024': 'easy',
    'q29_30_usaaao_2024': 'easy',
    'q29-30_usaaao_2024': 'easy',

    // --- USAAAO 2023 (Q1 - Q30) ---
    'q1_usaaao_2023': 'easy',
    'q2_usaaao_2023': 'easy',
    'q3_usaaao_2023': 'easy',
    'q4_usaaao_2023': 'easy',
    'q5_usaaao_2023': 'easy',
    'q6_usaaao_2023': 'easy',
    'q7_usaaao_2023': 'theory',
    'q8_usaaao_2023': 'easy',
    'q9_usaaao_2023': 'easy',
    'q10_usaaao_2023': 'easy',
    'q11_usaaao_2023': 'easy',
    'q12_usaaao_2023': 'easy',
    'q13_usaaao_2023': 'easy',
    'q14_usaaao_2023': 'easy',
    'q15_usaaao_2023': 'easy',
    'q16_usaaao_2023': 'easy',
    'q17_18_usaaao_2023': 'easy',
    'q17-18_usaaao_2023': 'easy',
    'q19_usaaao_2023': 'easy',
    'q20_usaaao_2023': 'theory',
    'q21_usaaao_2023': 'easy',
    'q22_usaaao_2023': 'easy',
    'q23_usaaao_2023': 'easy',
    'q24_usaaao_2023': 'easy',
    'q25_usaaao_2023': 'easy',
    'q26_usaaao_2023': 'easy',
    'q27_usaaao_2023': 'easy',
    'q28_usaaao_2023': 'easy',
    'q29_30_usaaao_2023': 'easy',
    'q29-30_usaaao_2023': 'easy',

    // --- USAAAO 2022 ---
    'q1_usaaao_2022': 'easy',
    'q2_usaaao_2022': 'easy',
    'q3_usaaao_2022': 'easy',
    'q4_usaaao_2022': 'easy',
    'q5_usaaao_2022': 'easy',
    'q6_usaaao_2022': 'easy',
    'q7_usaaao_2022': 'easy',
    'q8_usaaao_2022': 'easy',
    'q9_usaaao_2022': 'easy',
    'q10_usaaao_2022': 'easy',
    'q11_usaaao_2022': 'easy',
    'q12_usaaao_2022': 'theory',
    'q13_usaaao_2022': 'easy',
    'q14_usaaao_2022': 'easy',
    'q15_usaaao_2022': 'easy',
    'q16_usaaao_2022': 'easy',
    'q17_usaaao_2022': 'easy',
    'q18_usaaao_2022': 'easy',
    'q19_usaaao_2022': 'easy',
    'q20_usaaao_2022': 'easy',
    'q21_usaaao_2022': 'easy',
    'q22_usaaao_2022': 'easy',
    'q23_usaaao_2022': 'easy',
    'q24_usaaao_2022': 'easy',
    'q25_usaaao_2022': 'easy',
    'q26_usaaao_2022': 'easy',
    'q27_usaaao_2022': 'easy',
    'q28_usaaao_2022': 'easy',
    'q29_usaaao_2022': 'easy',
    'q30_usaaao_2022': 'easy',

    // --- Earlier Archives ---
    'q1_usaaao_2018': 'easy',
    'q30_usaaao_2018': 'easy'
};

export const RANKS = [
    { id: 'rank-0', name: "Novice Observer", req: 0 },
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

export function getUserAvatarUrl(user) {
    if (!user) return `https://ui-avatars.com/api/?name=Guest&background=1C1D22&color=FFFFFF`;
    const localCustomAvatar = localStorage.getItem(`supernova_avatar_${user.uid}`);
    if (localCustomAvatar) return localCustomAvatar;
    if (user.photoURL) return user.photoURL;
    const displayName = user.displayName || user.email.split('@')[0];
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=35E6FF&color=050507&bold=true`;
}

export function getRankForCount(count) {
    let currentRank = RANKS[0];
    for (const r of RANKS) {
        if (count >= r.req) currentRank = r;
    }
    return currentRank.name;
}

onAuthStateChanged(auth, (user) => {
    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const sidebarLogout = document.getElementById('btn-logout');
    const profileLink = document.getElementById('profileLink');

    const headerName = document.getElementById('user-name-display');
    const headerRole = document.getElementById('user-role-display');
    const headerAvatar = document.getElementById('user-avatar');

    if (profileLink) profileLink.style.display = 'flex';

    if (user) {
        currentUser = user;
        localStorage.setItem('supernova_last_uid', user.uid);

        if (loginBtn) loginBtn.style.display = 'none';
        if (logoutBtn) logoutBtn.style.display = 'inline-flex';

        loadUserProgress(user.uid);

        const displayName = user.displayName || user.email.split('@')[0];
        const avatarUrl = getUserAvatarUrl(user);
        const rankTitle = getRankForCount(userProgress.length);

        if (headerName) headerName.innerText = displayName;
        if (headerRole) headerRole.innerText = rankTitle;
        if (headerAvatar) headerAvatar.src = avatarUrl;

        updateProfileUI(user);
        updateProblemButtons();
        updateCooldownBadges(user.uid);

        if (document.getElementById('activityChart')) {
            updateChart('week');
            renderActivityLog();
        }

        if (sidebarLogout) {
            sidebarLogout.onclick = (e) => {
                e.preventDefault();
                signOut(auth).then(() => window.location.href = 'landing.html');
            };
        }
    } else {
        currentUser = null;
        userProgress = [];
        localStorage.removeItem('solvedProblems');
        window.dispatchEvent(new Event('userDataLoaded'));

        if (loginBtn) loginBtn.style.display = 'inline-flex';
        if (logoutBtn) logoutBtn.style.display = 'none';

        if (headerName) headerName.innerText = "Guest";
        if (headerRole) headerRole.innerText = "Not Logged In";
        if (headerAvatar) headerAvatar.src = getUserAvatarUrl(null);

        if (document.getElementById('activityChart')) {
            updateChart('week');
            renderActivityLog();
        }
    }
});

function loadUserProgress(uid) {
    const saved = localStorage.getItem(`supernova_progress_${uid}`);
    if (saved) {
        let parsed = JSON.parse(saved);
        userProgress = parsed.map(item => {
            if (typeof item === 'string') return { id: item, date: new Date().toISOString() };
            if (item.id === 'q1_mech') item.id = 'q1_usaaao_2025';
            if (item.id === 'q11-12_usaaao_2025') item.id = 'q11_12_usaaao_2025';
            return item;
        });
        localStorage.setItem(`supernova_progress_${uid}`, JSON.stringify(userProgress));
        const solvedIds = userProgress.map(p => p.id);
        solvedIds.forEach(id => localStorage.setItem(`solved_${id}`, 'true'));
        localStorage.setItem('solvedProblems', JSON.stringify(solvedIds));
    } else {
        userProgress = [];
        localStorage.setItem('solvedProblems', JSON.stringify([]));
    }
    window.dispatchEvent(new Event('userDataLoaded'));
}

function saveUserProgress() {
    if (!currentUser) return;
    localStorage.setItem(`supernova_progress_${currentUser.uid}`, JSON.stringify(userProgress));
    const solvedIds = userProgress.map(p => p.id);
    solvedIds.forEach(id => localStorage.setItem(`solved_${id}`, 'true'));
    localStorage.setItem('solvedProblems', JSON.stringify(solvedIds));
    window.dispatchEvent(new Event('userDataLoaded'));

    updateProfileUI(currentUser);

    if (document.getElementById('activityChart')) {
        const activeBtn = document.querySelector('.filter-btn.active');
        const currentMode = activeBtn ? activeBtn.id.replace('btn-', '') : 'week';
        updateChart(currentMode);
        renderActivityLog();
    }
}

window.toggleProblemSolved = function(problemId) {
    if (!currentUser) { window.openAuthModal(); return; }
    const btn = document.getElementById(`btn-${problemId}`);
    const exists = userProgress.find(p => p.id === problemId);

    if (exists) {
        showToast("Problem already marked as solved.");
    } else {
        userProgress.push({ id: problemId, date: new Date().toISOString() });
        localStorage.setItem(`solved_${problemId}`, 'true');
        saveUserProgress();
        if (btn) {
            btn.innerHTML = '<i class="fas fa-check-circle"></i> Solved!';
            btn.classList.add('solved');
        }
        triggerConfetti();
        showToast("Problem solved! Telemetry updated.");
    }
};

function updateProblemButtons() {
    userProgress.forEach(item => {
        const altId = item.id.replace('-', '_');
        const btn = document.getElementById(`btn-${item.id}`) || document.getElementById(`btn-${altId}`);
        if (btn) {
            btn.innerHTML = '<i class="fas fa-check-circle"></i> Solved!';
            btn.classList.add('solved');
        }
    });
}

function getRemainingCooldown(key) {
    const lastTs = parseInt(localStorage.getItem(key) || '0', 10);
    if (!lastTs) return 0;
    const elapsed = Date.now() - lastTs;
    return elapsed < COOLDOWN_MS ? (COOLDOWN_MS - elapsed) : 0;
}

function formatCooldown(ms) {
    const days = Math.floor(ms / (1000 * 60 * 60 * 24));
    const hours = Math.ceil((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    return `${days}d ${hours}h`;
}

function updateCooldownBadges(uid) {
    const nameBadge = document.getElementById('name-cooldown-status');
    const avatarBadge = document.getElementById('avatar-cooldown-status');

    const nameRem = getRemainingCooldown(`supernova_last_name_change_${uid}`);
    const avatarRem = getRemainingCooldown(`supernova_last_avatar_change_${uid}`);

    if (nameBadge) {
        nameBadge.innerHTML = nameRem > 0
            ? `<i class="fa-solid fa-lock"></i> Name locked for ${formatCooldown(nameRem)}`
            : `<i class="fa-solid fa-unlock"></i> Name change available (14d limit)`;
        nameBadge.style.color = nameRem > 0 ? 'var(--accent-rose)' : 'var(--accent-green)';
    }

    if (avatarBadge) {
        avatarBadge.innerHTML = avatarRem > 0
            ? `<i class="fa-solid fa-lock"></i> Avatar locked for ${formatCooldown(avatarRem)}`
            : `<i class="fa-solid fa-unlock"></i> Avatar change available (14d limit)`;
        avatarBadge.style.color = avatarRem > 0 ? 'var(--accent-rose)' : 'var(--accent-green)';
    }
}

window.enableEditUsername = () => {
    if (!currentUser) { window.openAuthModal(); return; }
    const rem = getRemainingCooldown(`supernova_last_name_change_${currentUser.uid}`);
    if (rem > 0) {
        showToast(`Callsign can only be changed once every 14 days. Remaining: ${formatCooldown(rem)}`);
        return;
    }
    const viewEl = document.getElementById('viewMode');
    const editEl = document.getElementById('editUserContainer');
    if (viewEl) viewEl.style.display = 'none';
    if (editEl) editEl.style.display = 'flex';
};

window.cancelEditUsername = () => {
    const viewEl = document.getElementById('viewMode');
    const editEl = document.getElementById('editUserContainer');
    if (viewEl) viewEl.style.display = 'block';
    if (editEl) editEl.style.display = 'none';
};

window.saveNewUsername = () => {
    if (!currentUser) { window.openAuthModal(); return; }
    const rem = getRemainingCooldown(`supernova_last_name_change_${currentUser.uid}`);
    if (rem > 0) {
        showToast(`Cooldown active: ${formatCooldown(rem)} remaining.`);
        return;
    }
    const newName = document.getElementById('newUsernameInput').value.trim();
    if (newName.length < 3) {
        showToast("Callsign must be at least 3 characters.");
        return;
    }
    updateProfile(currentUser, { displayName: newName }).then(() => {
        localStorage.setItem(`supernova_last_name_change_${currentUser.uid}`, Date.now().toString());
        window.location.reload();
    });
};

window.triggerAvatarUpload = () => {
    if (!currentUser) { window.openAuthModal(); return; }
    const rem = getRemainingCooldown(`supernova_last_avatar_change_${currentUser.uid}`);
    if (rem > 0) {
        showToast(`Profile picture can only be changed once every 14 days. Remaining: ${formatCooldown(rem)}`);
        return;
    }
    const fileInput = document.getElementById('avatarFileInput');
    if (fileInput) fileInput.click();
};

document.addEventListener('change', (e) => {
    if (e.target && e.target.id === 'avatarFileInput') {
        const file = e.target.files[0];
        if (!file || !currentUser) return;

        const rem = getRemainingCooldown(`supernova_last_avatar_change_${currentUser.uid}`);
        if (rem > 0) {
            showToast(`Cooldown active: ${formatCooldown(rem)} remaining.`);
            return;
        }

        const reader = new FileReader();
        reader.onload = (ev) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = 180;
                canvas.height = 180;
                const ctx = canvas.getContext('2d');
                const minDim = Math.min(img.width, img.height);
                const sx = (img.width - minDim) / 2;
                const sy = (img.height - minDim) / 2;
                ctx.drawImage(img, sx, sy, minDim, minDim, 0, 0, 180, 180);

                const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
                localStorage.setItem(`supernova_avatar_${currentUser.uid}`, dataUrl);
                localStorage.setItem(`supernova_last_avatar_change_${currentUser.uid}`, Date.now().toString());
                window.location.reload();
            };
            img.src = ev.target.result;
        };
        reader.readAsDataURL(file);
    }
});

function updateProfileUI(user) {
    const nameDisplay = document.getElementById('profileUsername');
    const emailDisplay = document.getElementById('profileEmail');
    const profileAvatarImg = document.getElementById('profileAvatarImg');
    const statsCount = document.getElementById('statsCount');
    const statsRank = document.getElementById('statsRank');
    const progressBar = document.getElementById('levelProgress');
    const progressPercent = document.getElementById('progressPercent');
    const statsStreak = document.getElementById('statsStreak');

    if (nameDisplay) nameDisplay.innerText = user.displayName || user.email.split('@')[0];
    if (emailDisplay) emailDisplay.innerText = user.email;
    if (profileAvatarImg) profileAvatarImg.src = getUserAvatarUrl(user);

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

            let diffDays = Math.round((currentDate - lastActiveDate) / (1000 * 60 * 60 * 24));
            if (diffDays <= 1) {
                streak = 1;
                for (let i = 0; i < activeDates.length - 1; i++) {
                    let d1 = new Date(activeDates[i]);
                    let d2 = new Date(activeDates[i + 1]);
                    d1.setHours(0, 0, 0, 0);
                    d2.setHours(0, 0, 0, 0);
                    if (Math.round((d1 - d2) / (1000 * 60 * 60 * 24)) === 1) streak++;
                    else break;
                }
            }
            statsStreak.innerText = streak;
        }
    }

    if (statsCount) {
        const count = userProgress.length;
        statsCount.innerText = count;

        let currentRank = RANKS[0];
        let nextRank = RANKS[1];
        let maxUnlockedIndex = 0;

        RANKS.forEach((r, index) => {
            const el = document.getElementById(r.id);
            if (el) {
                el.classList.remove('active', 'unlocked');
                if (count >= r.req) {
                    el.classList.add('unlocked');
                    currentRank = r;
                    nextRank = RANKS[index + 1] || r;
                    maxUnlockedIndex = index;
                }
            }
        });

        const activeEl = document.getElementById(RANKS[maxUnlockedIndex].id);
        if (activeEl) {
            activeEl.classList.remove('unlocked');
            activeEl.classList.add('active');
        }

        let progress = count >= RANKS[RANKS.length - 1].req
            ? 100
            : ((count - currentRank.req) / (nextRank.req - currentRank.req)) * 100;

        if (statsRank) statsRank.innerText = currentRank.name;
        if (progressBar) progressBar.style.width = Math.max(4, Math.min(progress, 100)) + "%";
        if (progressPercent) progressPercent.innerText = Math.round(progress) + "%";

        let counts = { easy: 0, medium: 0, hard: 0, theory: 0 };
        userProgress.forEach(p => {
            let diff = difficultyMap[p.id];
            if (diff && counts[diff] !== undefined) counts[diff]++;
        });

        if (document.getElementById('stat-easy')) {
            document.getElementById('stat-easy').innerText = counts.easy;
            document.getElementById('stat-medium').innerText = counts.medium;
            document.getElementById('stat-hard').innerText = counts.hard;
            document.getElementById('stat-theory').innerText = counts.theory;
        }
    }
}

window.updateChart = (timeframe) => {
    const ctx = document.getElementById('activityChart');
    if (!ctx || typeof Chart === 'undefined') return;

    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    const clickedBtn = document.getElementById(`btn-${timeframe}`);
    if (clickedBtn) clickedBtn.classList.add('active');

    const now = new Date();
    let limitDate = new Date();
    if (timeframe === 'week') limitDate.setDate(now.getDate() - 6);
    else if (timeframe === 'month') limitDate.setDate(now.getDate() - 29);
    else if (timeframe === 'all') {
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
        const key = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        grouped[key] = (grouped[key] || 0) + 1;
    });

    let labels = Object.keys(grouped);
    let dataPoints = Object.values(grouped);
    if (labels.length === 0) { labels = ["No Activity Yet"]; dataPoints = [0]; }

    if (progressChart) progressChart.destroy();
    progressChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Solved Problems',
                data: dataPoints,
                borderColor: '#35E6FF',
                backgroundColor: 'rgba(53, 230, 255, 0.15)',
                borderWidth: 2.5,
                tension: 0.35,
                pointBackgroundColor: '#0A0A0C',
                pointBorderColor: '#35E6FF',
                pointBorderWidth: 2,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                y: { beginAtZero: true, grid: { color: 'rgba(255,255,255,0.06)' }, ticks: { stepSize: 1, color: '#8A94A6' } },
                x: { grid: { display: false }, ticks: { color: '#8A94A6' } }
            }
        }
    });
};

function renderActivityLog() {
    const listContainer = document.getElementById('activityLogList');
    if (!listContainer) return;

    listContainer.innerHTML = '';
    const sorted = [...userProgress].sort((a, b) => new Date(b.date) - new Date(a.date));

    if (sorted.length === 0) {
        listContainer.innerHTML = '<div style="color:var(--text-muted); font-style:italic; text-align:center; padding:20px;">No problems solved yet. Visit Study & Practice to begin!</div>';
        return;
    }

    sorted.forEach(item => {
        const dateObj = new Date(item.date);
        const dateStr = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
        const displayId = item.id.toUpperCase().replace(/_/g, ' ');

        const row = document.createElement('div');
        row.className = 'activity-item';
        row.innerHTML = `
            <div class="activity-icon"><i class="fas fa-check"></i></div>
            <div class="activity-info">
                <span class="activity-id">Solved: <strong style="color:var(--text-pure);">${displayId}</strong></span>
                <span class="activity-date">${dateStr}</span>
            </div>
        `;
        listContainer.appendChild(row);
    });
}

const authModal = document.getElementById('authModal');
const authForm = document.getElementById('authForm');
const modalTitle = document.getElementById('modalTitle');
const authError = document.getElementById('authError');
const usernameInput = document.getElementById('usernameInput');
let isLoginMode = true;

if (authForm) {
    authForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('emailInput').value.trim();
        const password = document.getElementById('passwordInput').value;
        const username = usernameInput && usernameInput.value.trim() ? usernameInput.value.trim() : email.split('@')[0];

        if (isLoginMode) {
            signInWithEmailAndPassword(auth, email, password)
                .then(() => {
                    window.closeModal();
                    if (window.location.pathname.endsWith('landing.html')) {
                        window.location.href = 'index.html';
                    }
                })
                .catch(err => { if (authError) authError.innerText = err.message.replace('Firebase: ', ''); });
        } else {
            createUserWithEmailAndPassword(auth, email, password)
                .then((cred) => updateProfile(cred.user, { displayName: username }))
                .then(() => {
                    if (window.location.pathname.endsWith('landing.html')) {
                        window.location.href = 'index.html';
                    } else {
                        window.location.reload();
                    }
                })
                .catch(err => { if (authError) authError.innerText = err.message.replace('Firebase: ', ''); });
        }
    });
}

const logoutBtnEl = document.getElementById('logoutBtn');
if (logoutBtnEl) {
    logoutBtnEl.addEventListener('click', () => signOut(auth).then(() => window.location.href = 'landing.html'));
}

window.openAuthModal = () => { if (authModal) authModal.style.display = 'flex'; };
window.closeModal = () => { if (authModal) authModal.style.display = 'none'; if (authForm) authForm.reset(); };
window.toggleMode = () => {
    isLoginMode = !isLoginMode;
    if (modalTitle) modalTitle.innerText = isLoginMode ? "Student Login" : "Create Account";
    const subBtn = document.getElementById('submitAuthBtn');
    if (subBtn) subBtn.innerText = isLoginMode ? "Sign In" : "Register";
    if (usernameInput) usernameInput.style.display = isLoginMode ? 'none' : 'block';
    const togText = document.getElementById('toggleText');
    if (togText) togText.innerHTML = isLoginMode
        ? 'New to the platform? <span onclick="toggleMode()">Register</span>'
        : 'Already registered? <span onclick="toggleMode()">Sign In</span>';
};

function triggerConfetti() {
    const colors = ['#35E6FF', '#B39CD0', '#2BE38A'];
    for (let i = 0; i < 45; i++) {
        const d = document.createElement('div');
        d.style.cssText = `width:8px;height:8px;background:${colors[i % 3]};position:fixed;top:50%;left:50%;pointer-events:none;z-index:9999;border-radius:50%;`;
        document.body.appendChild(d);
        const a = Math.random() * Math.PI * 2;
        d.animate([
            { transform: 'translate(0,0)', opacity: 1 },
            { transform: `translate(${Math.cos(a) * 280}px, ${Math.sin(a) * 280}px)`, opacity: 0 }
        ], { duration: 900 }).onfinish = () => d.remove();
    }
}

export function showToast(m) {
    const t = document.createElement('div');
    t.innerText = m;
    t.style.cssText = "position:fixed;bottom:30px;left:50%;transform:translateX(-50%);background:#35E6FF;color:#0A0A0C;padding:10px 22px;border-radius:99px;font-weight:700;font-family:'Space Mono',monospace;font-size:0.82rem;z-index:10000;box-shadow:0 10px 30px rgba(0,0,0,0.6);";
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 3200);
}

// --- GLOBAL USAAAO DIAGRAM PATH RESOLVER (.png -> .jpeg & ../assets/) + SQUARE STYLER ---
(function initGlobalDiagramFixer() {
    const styleEl = document.createElement('style');
    styleEl.textContent = `
        img.user-diagram, .problem-text img, .solution-box img {
            display: block !important;
            width: 340px !important;
            height: 340px !important;
            max-width: 100% !important;
            aspect-ratio: 1 / 1 !important;
            object-fit: contain !important;
            background: #101115 !important;
            border: 1px solid rgba(255, 255, 255, 0.12) !important;
            border-radius: 12px !important;
            padding: 12px !important;
            margin: 18px auto !important;
            cursor: zoom-in;
        }
    `;
    document.head.appendChild(styleEl);

    const inSubfolder = /\/(practice|handouts)\//i.test(window.location.pathname);

    function normalizeDiagramImg(img) {
        if (!img) return;
        const rawSrc = img.getAttribute('src') || '';
        if (!rawSrc || rawSrc.startsWith('http') || rawSrc.startsWith('data:')) return;

        let fixedSrc = rawSrc;
        if (/USAAAO_\d{4}\/Q[\d-]+_USAAAO_\d{4}\.png$/i.test(fixedSrc)) {
            fixedSrc = fixedSrc.replace(/\.png$/i, '.jpeg');
        }
        if (inSubfolder && fixedSrc.startsWith('assets/')) {
            fixedSrc = '../' + fixedSrc;
        }
        if (fixedSrc !== rawSrc) {
            img.setAttribute('src', fixedSrc);
        }
    }

    window.addEventListener('error', (e) => {
        const img = e.target;
        if (!img || img.tagName !== 'IMG') return;
        const src = img.getAttribute('src') || '';
        const step = parseInt(img.dataset.fallbackStep || '0', 10);
        if (step >= 3) return;
        img.dataset.fallbackStep = String(step + 1);

        let nextSrc = src;
        if (inSubfolder && nextSrc.startsWith('assets/')) {
            nextSrc = '../' + nextSrc;
        } else if (/\.png$/i.test(nextSrc)) {
            nextSrc = nextSrc.replace(/\.png$/i, '.jpeg');
        } else if (/\.jpeg$/i.test(nextSrc)) {
            nextSrc = nextSrc.replace(/\.jpeg$/i, '.jpg');
        }
        if (nextSrc !== src) img.src = nextSrc;
    }, true);

    document.addEventListener('DOMContentLoaded', () => {
        document.querySelectorAll('img').forEach(normalizeDiagramImg);
        const obs = new MutationObserver((mutations) => {
            mutations.forEach((m) => {
                m.addedNodes.forEach((node) => {
                    if (node.nodeType === 1) {
                        if (node.tagName === 'IMG') normalizeDiagramImg(node);
                        node.querySelectorAll?.('img').forEach(normalizeDiagramImg);
                    }
                });
            });
        });
        obs.observe(document.body, { childList: true, subtree: true });
    });
})();