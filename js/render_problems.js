// js/render_problems.js
import { usaaao_2018 } from './data/usaaao_2018.js';
import { usaaao_2019 } from './data/usaaao_2019.js';
import { usaaao_2020 } from './data/usaaao_2020.js';
import { usaaao_2021 } from './data/usaaao_2021.js';
import { usaaao_2022 } from './data/usaaao_2022.js';
import { usaaao_2023 } from './data/usaaao_2023.js';
import { usaaao_2024 } from './data/usaaao_2024.js';
import { usaaao_2025 } from './data/usaaao_2025.js';
import { usaaao_2026 } from './data/usaaao_2026.js';

// Map each practice/*.html filename to its curriculum module code
const FILE_TO_MODULE = {
    'positional_celestial_mechanics': 'T1',
    'radiation_relativity': 'T2',
    'astronomical_instrumentation': 'T3',
    'stellar_parameters': 'T4',
    'stellar_structure': 'T5',
    'interstellar_medium': 'T6',
    'stellar_evolution': 'T7',
    'stellar_remnants': 'T8',
    'planetary_systems': 'T9',
    'galactic_structure': 'T10',
    'galactic_evolution': 'T11',
    'cosmology': 'T12',
    'data_methods_plotting': 'D1',
    'data_full_sets': 'D2',
    'obs_blind_map': 'O1',
    'obs_telescope': 'O2'
};

const currentFileKey = window.location.pathname.split('/').pop().replace('.html', '');
const activeModuleCode = FILE_TO_MODULE[currentFileKey] || null;

const rawProblems = [
    ...usaaao_2018,
    ...usaaao_2019,
    ...usaaao_2020,
    ...usaaao_2021,
    ...usaaao_2022,
    ...usaaao_2023,
    ...usaaao_2024,
    ...usaaao_2025,
    ...usaaao_2026
];

// Filter problems for the current module page (defaults untagged legacy problems to T1)
const allProblems = activeModuleCode
    ? rawProblems.filter(p => (p.module || 'T1') === activeModuleCode)
    : rawProblems;

let currentPage = 1;
const itemsPerPage = 5;
let filteredProblems = [...allProblems];

// Automatically synchronize the sidebar across all practice/*.html pages
function syncPracticeSidebar() {
    const sidebar = document.querySelector('aside.sidebar');
    if (!sidebar) return;
    sidebar.style.overflowY = 'auto';
    sidebar.innerHTML = `
        <a href="../dashboard.html" class="brand" style="margin-bottom: 32px;">
            <img src="../assets/img/supernova_logo.png" alt="Supernova Logo">
            <span>SUPERNOVA<br>GUIDE</span>
        </a>
        
        <div class="menu-label" style="font-size: 0.68rem; margin: 18px 0 8px 8px;">Menu</div>
        <ul class="nav-menu">
            <li><a href="../dashboard.html" class="nav-item"><i class="fa-solid fa-border-all"></i> Dashboard</a></li>
            <li><a href="../challenges.html" class="nav-item"><i class="fa-solid fa-clock-rotate-left"></i> POTD · POTW · POTM</a></li>
            <li><a href="../planetariu.html" class="nav-item"><i class="fa-solid fa-satellite-dish"></i> Planetarium</a></li>
            <li><a href="../problems.html" class="nav-item active"><i class="fa-solid fa-rocket"></i> Study &amp; Practice</a></li>
            <li><a href="../courses.html" class="nav-item"><i class="fa-solid fa-circle-play"></i> Supernova Courses</a></li>
            <li><a href="../competitions.html" class="nav-item"><i class="fa-solid fa-trophy"></i> Competitions</a></li>
        </ul>

        <div class="menu-label" style="font-size: 0.68rem; margin: 18px 0 8px 8px;">Tools &amp; Analytics</div>
        <ul class="nav-menu">
            <li><a href="../analytics.html" class="nav-item"><i class="fa-solid fa-chart-simple"></i> Analytics</a></li>
            <li><a href="../tools.html" class="nav-item"><i class="fa-solid fa-calculator"></i> Formula &amp; Tools</a></li>
            <li><a href="../notebook.html" class="nav-item"><i class="fa-solid fa-book-open"></i> Mistake Notebook</a></li>
            <li><a href="../resources.html" class="nav-item"><i class="fa-solid fa-book-atlas"></i> External Library</a></li>
        </ul>
        
        <div class="menu-label" style="font-size: 0.68rem; margin: 18px 0 8px 8px;">General</div>
        <ul class="nav-menu">
            <li><a href="../profile.html" class="nav-item"><i class="fa-solid fa-gear"></i> Settings</a></li>
            <li><a href="../community.html" class="nav-item"><i class="fa-solid fa-users"></i> Community</a></li>
            <li><a href="#" class="nav-item" id="btn-logout"><i class="fa-solid fa-arrow-right-from-bracket"></i> Logout</a></li>
        </ul>
    `;
}

function isProblemSolved(uniqueId) {
    if (localStorage.getItem(`solved_${uniqueId}`) === 'true') return true;
    try {
        const solvedArr = JSON.parse(localStorage.getItem('solvedProblems') || '[]');
        return solvedArr.includes(uniqueId) || solvedArr.includes(uniqueId.replace('_', '-'));
    } catch (e) {
        return false;
    }
}

function normalizeDiagramHtml(html) {
    if (!html) return '';
    return html
        .replace(/src="assets\//g, 'src="../assets/')
        .replace(/(USAAAO_\d{4}\/Q[\d-]+_USAAAO_\d{4})\.png/gi, '$1.jpeg');
}

function renderPage() {
    const container = document.getElementById('problems-container');
    if (!container) return;

    // If this module has no problems indexed yet, keep the "Problem Set In Calibration" empty state
    if (allProblems.length === 0) return;

    container.innerHTML = '';

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const problemsToRender = filteredProblems.slice(startIndex, endIndex);

    problemsToRender.forEach(problem => {
        const isSolved = isProblemSolved(problem.uniqueId);
        const solveBtnClass = isSolved ? 'solve-btn solved' : 'solve-btn';
        const solveBtnIcon = isSolved ? 'fas fa-check-circle' : 'far fa-circle';
        const solveBtnText = isSolved ? 'Solved' : 'Mark as Solved';

        const card = document.createElement('div');
        card.className = 'problem-card';

        card.innerHTML = `
            <div class="card-header-badges">
                <span class="source-badge">${problem.id} / ${problem.competition} ${problem.year}</span>
                <span class="diff-badge diff-${problem.difficultyClass}"><i class="fas fa-${problem.icon}"></i> Diff: ${problem.difficultyText}</span>
            </div>
            <div class="problem-text">
                <strong>${problem.title}</strong>
                ${normalizeDiagramHtml(problem.description)}
            </div>
            <div style="text-align: right; margin-bottom: 20px;">
                <button id="btn-${problem.uniqueId}" onclick="window.handleProblemSolved('${problem.uniqueId}')" class="${solveBtnClass}">
                    <i class="${solveBtnIcon}"></i> ${solveBtnText}
                </button>
            </div>
            <details>
                <summary>View Solution</summary>
                <div class="solution-box">
                    ${normalizeDiagramHtml(problem.solutionHtml)}
                </div>
            </details>
        `;

        container.appendChild(card);
    });

    if (window.MathJax && window.MathJax.typesetPromise) {
        window.MathJax.typesetPromise([container]).catch((err) => console.log('MathJax error: ', err));
    }

    renderPaginationControls();
}

function renderPaginationControls() {
    const container = document.getElementById('paginationContainer');
    if (!container) return;
    container.innerHTML = '';

    const totalPages = Math.ceil(filteredProblems.length / itemsPerPage);
    if (totalPages <= 1) return;

    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement('button');
        btn.className = 'page-btn' + (i === currentPage ? ' active' : '');
        btn.innerText = i;
        btn.onclick = () => {
            currentPage = i;
            renderPage();
            const mainEl = document.querySelector('.dashboard-main');
            if (mainEl) {
                mainEl.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                window.scrollTo({
                    top: document.querySelector('.problem-section').offsetTop - 120,
                    behavior: 'smooth'
                });
            }
        };
        container.appendChild(btn);
    }
}

window.applyFilters = function(resetPage = false) {
    if (allProblems.length === 0) return;

    const searchInput = document.getElementById('searchFilter');
    const diffInput = document.getElementById('diffFilter');
    const statusInput = document.getElementById('statusFilter');

    const searchVal = searchInput ? searchInput.value.toLowerCase() : '';
    const diffVal = diffInput ? diffInput.value : 'all';
    const statusVal = statusInput ? statusInput.value : 'all';

    filteredProblems = allProblems.filter(problem => {
        const textToSearch = `${problem.id} ${problem.competition} ${problem.year} ${problem.title} ${problem.description}`.toLowerCase();
        const matchSearch = textToSearch.includes(searchVal);

        let matchDiff = false;
        if (diffVal === 'all') {
            matchDiff = true;
        } else if (problem.difficultyClass === diffVal) {
            matchDiff = true;
        }

        const isSolved = isProblemSolved(problem.uniqueId);
        let matchStatus = false;
        if (statusVal === 'all') {
            matchStatus = true;
        } else if (statusVal === 'solved' && isSolved) {
            matchStatus = true;
        } else if (statusVal === 'unsolved' && !isSolved) {
            matchStatus = true;
        }

        return matchSearch && matchDiff && matchStatus;
    });

    const noResultsMsg = document.getElementById('noResultsMsg');
    if (filteredProblems.length === 0) {
        if (noResultsMsg) noResultsMsg.style.display = 'flex';
        document.getElementById('problems-container').innerHTML = '';
        document.getElementById('paginationContainer').innerHTML = '';
    } else {
        if (noResultsMsg) noResultsMsg.style.display = 'none';
        const totalPages = Math.max(1, Math.ceil(filteredProblems.length / itemsPerPage));
        if (resetPage === true) {
            currentPage = 1;
        } else if (currentPage > totalPages) {
            currentPage = totalPages;
        }
        renderPage();
    }
};

window.handleProblemSolved = function(uniqueId) {
    const currentlySolved = isProblemSolved(uniqueId);
    if (currentlySolved) {
        localStorage.removeItem(`solved_${uniqueId}`);
        try {
            const solvedArr = JSON.parse(localStorage.getItem('solvedProblems') || '[]')
                .filter(id => id !== uniqueId && id !== uniqueId.replace('_', '-'));
            localStorage.setItem('solvedProblems', JSON.stringify(solvedArr));

            const uid = localStorage.getItem('supernova_last_uid');
            if (uid) {
                const prog = JSON.parse(localStorage.getItem(`supernova_progress_${uid}`) || '[]')
                    .filter(item => item.id !== uniqueId && item.id !== uniqueId.replace('_', '-'));
                localStorage.setItem(`supernova_progress_${uid}`, JSON.stringify(prog));
            }
        } catch (e) {}
    } else {
        localStorage.setItem(`solved_${uniqueId}`, 'true');
        if (typeof window.toggleProblemSolved === 'function') {
            window.toggleProblemSolved(uniqueId);
        }
    }
    // Pass false so currentPage is preserved!
    window.applyFilters(false);
};

window.openImageModal = function(element) {
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("img01");
    if (!modal || !modalImg) return;
    modal.style.display = "flex";
    modal.style.alignItems = "center";
    modal.style.justifyContent = "center";
    modalImg.src = element.src;
};

window.closeImageModal = function() {
    const modal = document.getElementById("imageModal");
    if (modal) modal.style.display = "none";
};

document.addEventListener('keydown', function(event) {
    if (event.key === "Escape") {
        window.closeImageModal();
    }
});

function init() {
    syncPracticeSidebar();

    const sEl = document.getElementById('searchFilter');
    const dEl = document.getElementById('diffFilter');
    const stEl = document.getElementById('statusFilter');

    if (sEl) sEl.addEventListener('keyup', () => window.applyFilters(true));
    if (dEl) dEl.addEventListener('change', () => window.applyFilters(true));
    if (stEl) stEl.addEventListener('change', () => window.applyFilters(true));

    window.applyFilters(true);
}

window.addEventListener('userDataLoaded', () => {
    window.applyFilters(false);
});

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}