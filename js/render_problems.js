import { usaaao_2018 } from './data/usaaao_2018.js';
import { usaaao_2019 } from './data/usaaao_2019.js';
import { usaaao_2020 } from './data/usaaao_2020.js';
import { usaaao_2021 } from './data/usaaao_2021.js';
import { usaaao_2022 } from './data/usaaao_2022.js';
import { usaaao_2023 } from './data/usaaao_2023.js';
import { usaaao_2024 } from './data/usaaao_2024.js';
import { usaaao_2025 } from './data/usaaao_2025.js';
import { usaaao_2026 } from './data/usaaao_2026.js';

const allProblems = [
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

let currentPage = 1;
const itemsPerPage = 5;
let filteredProblems = [...allProblems];

function renderPage() {
    const container = document.getElementById('problems-container');
    if (!container) return;
    
    container.innerHTML = '';

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const problemsToRender = filteredProblems.slice(startIndex, endIndex);

    problemsToRender.forEach(problem => {
        const isSolved = localStorage.getItem(`solved_${problem.uniqueId}`) === 'true';
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
                ${problem.description}
            </div>
            <div style="text-align: right; margin-bottom: 20px;">
                <button id="btn-${problem.uniqueId}" onclick="window.toggleProblemSolved('${problem.uniqueId}')" class="${solveBtnClass}">
                    <i class="${solveBtnIcon}"></i> ${solveBtnText}
                </button>
            </div>
            <details>
                <summary>View Solution</summary>
                <div class="solution-box">
                    ${problem.solutionHtml}
                </div>
            </details>
        `;

        container.appendChild(card);
    });

    if (window.MathJax) {
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
            window.scrollTo({
                top: document.querySelector('.problem-section').offsetTop - 120,
                behavior: 'smooth'
            });
        };
        container.appendChild(btn);
    }
}

window.applyFilters = function() {
    const searchVal = document.getElementById('searchFilter').value.toLowerCase();
    const diffVal = document.getElementById('diffFilter').value;
    const statusVal = document.getElementById('statusFilter').value;

    filteredProblems = allProblems.filter(problem => {
        const textToSearch = `${problem.id} ${problem.competition} ${problem.year} ${problem.title}`.toLowerCase();
        const matchSearch = textToSearch.includes(searchVal);

        let matchDiff = false;
        if (diffVal === 'all') {
            matchDiff = true;
        } else if (problem.difficultyClass === diffVal) {
            matchDiff = true;
        }

        const isSolved = localStorage.getItem(`solved_${problem.uniqueId}`) === 'true';
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
        noResultsMsg.style.display = 'block';
        document.getElementById('problems-container').innerHTML = '';
        document.getElementById('paginationContainer').innerHTML = '';
    } else {
        noResultsMsg.style.display = 'none';
        currentPage = 1; 
        renderPage();
    }
};

window.toggleProblemSolved = function(uniqueId) {
    const isSolved = localStorage.getItem(`solved_${uniqueId}`) === 'true';
    if (isSolved) {
        localStorage.removeItem(`solved_${uniqueId}`);
    } else {
        localStorage.setItem(`solved_${uniqueId}`, 'true');
    }
    
    window.applyFilters();
};

window.openImageModal = function(element) {
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("img01");
    modal.style.display = "flex";
    modal.style.alignItems = "center";
    modal.style.justifyContent = "center";
    modalImg.src = element.src;
};

window.closeImageModal = function() {
    document.getElementById("imageModal").style.display = "none";
};

document.addEventListener('keydown', function(event) {
    if (event.key === "Escape") { 
        window.closeImageModal(); 
    }
});

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('searchFilter').addEventListener('keyup', window.applyFilters);
    document.getElementById('diffFilter').addEventListener('change', window.applyFilters);
    document.getElementById('statusFilter').addEventListener('change', window.applyFilters);
    
    window.applyFilters();
});