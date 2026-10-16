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

window.applyFilters = function() {
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
        currentPage = 1;
        renderPage();
    }
};

window.handleProblemSolved = function(uniqueId) {
    const currentlySolved = isProblemSolved(uniqueId);
    if (currentlySolved) {
        localStorage.removeItem(`solved_${uniqueId}`);
    } else {
        localStorage.setItem(`solved_${uniqueId}`, 'true');
        if (typeof window.toggleProblemSolved === 'function') {
            window.toggleProblemSolved(uniqueId);
        }
    }
    window.applyFilters();
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
    const sEl = document.getElementById('searchFilter');
    const dEl = document.getElementById('diffFilter');
    const stEl = document.getElementById('statusFilter');

    if (sEl) sEl.addEventListener('keyup', window.applyFilters);
    if (dEl) dEl.addEventListener('change', window.applyFilters);
    if (stEl) stEl.addEventListener('change', window.applyFilters);

    window.applyFilters();
}

window.addEventListener('userDataLoaded', () => {
    window.applyFilters();
});

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
} 