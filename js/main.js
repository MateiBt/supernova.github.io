// ==========================================
// 1. SETĂRILE DE BAZĂ THREE.JS
// ==========================================
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x010103);

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 0.1); 

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('canvas-container').appendChild(renderer.domElement);

const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableZoom = true;
controls.enablePan = false;

// ==========================================
// 2. TEXTURA PENTRU STELE
// ==========================================
function createStarTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const context = canvas.getContext('2d');
    const gradient = context.createRadialGradient(16, 16, 0, 16, 16, 16);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.3, 'rgba(255, 255, 255, 0.9)'); 
    gradient.addColorStop(0.6, 'rgba(255, 255, 255, 0.4)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
    context.fillStyle = gradient;
    context.fillRect(0, 0, 32, 32);
    return new THREE.CanvasTexture(canvas);
}

// ==========================================
// 3. GENERAREA CÂMPULUI STELAR
// ==========================================
const RA_TO_RAD = (Math.PI * 2) / 24;
const DEG_TO_RAD = Math.PI / 180;

let targetObjects = []; 
let starPointsMesh;

function buildStarfield() {
    const starGeometry = new THREE.BufferGeometry();
    const starVertices = [];
    const starSizes = [];
    const starColors = [];

    targetObjects.forEach(obj => {
        const raRad = obj.ra * RA_TO_RAD;
        const decRad = obj.dec * DEG_TO_RAD;
        
        const r = 100;
        const x = r * Math.cos(decRad) * Math.sin(raRad);
        const y = r * Math.sin(decRad);
        const z = r * Math.cos(decRad) * Math.cos(raRad);

        starVertices.push(x, y, z);

        let calculatedSize = Math.max(3.0, 40 * Math.exp(-obj.mag * 0.4));
        if (calculatedSize > 60) calculatedSize = 60; 
        
        starSizes.push(calculatedSize);
        const color = new THREE.Color(obj.color);
        starColors.push(color.r, color.g, color.b);
    });

    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
    starGeometry.setAttribute('color', new THREE.Float32BufferAttribute(starColors, 3));
    starGeometry.setAttribute('size', new THREE.Float32BufferAttribute(starSizes, 1));

    const starMaterial = new THREE.ShaderMaterial({
        uniforms: { pointTexture: { value: createStarTexture() } },
        vertexShader: `
            attribute float size;
            varying vec3 vColor;
            void main() {
                vColor = color;
                vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                gl_PointSize = size; 
                gl_Position = projectionMatrix * mvPosition;
            }
        `,
        fragmentShader: `
            uniform sampler2D pointTexture;
            varying vec3 vColor;
            void main() {
                vec4 texColor = texture2D(pointTexture, gl_PointCoord);
                gl_FragColor = vec4(vColor * 2.5, 1.0) * texColor;
            }
        `,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        transparent: true,
        vertexColors: true
    });

    if (starPointsMesh) scene.remove(starPointsMesh);
    starPointsMesh = new THREE.Points(starGeometry, starMaterial);
    scene.add(starPointsMesh);
}

// ==========================================
// 4. ANIMAȚIA (Fără cod experimental, 100% Stabilă)
// ==========================================
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
animate();

// ==========================================
// 5. LOGICA DE QUIZ, SCOR, TIMER & CLASAMENT
// ==========================================
const raycaster = new THREE.Raycaster();
raycaster.params.Points.threshold = 1.5; 
const mouse = new THREE.Vector2();

let currentSelectedId = null;
let currentTarget = null; 

// Structura de scoruri detaliate
let scoreboard = {
    locatie: { corect: 0, gresit: 0 },
    nume: { corect: 0, gresit: 0 },
    tip: { corect: 0, gresit: 0 }
};

// Logica de Cronometru
let gameStartTime = Date.now();
let totalSecondsElapsed = 0;
let timerInterval = null;

const uiTargetInstruction = document.getElementById('target-instruction');
const inputName = document.getElementById('input-name');
const selectType = document.getElementById('select-type');
const btnCheck = document.getElementById('btn-check');
const btnNext = document.getElementById('btn-next');
const feedbackDiv = document.getElementById('feedback');
const selectDifficulty = document.getElementById('select-difficulty');
const timerDisplay = document.getElementById('timer-display');

// Inel de selecție simplu, fix și robust (Fără animații ce pot genera erori)
const highlightGeometry = new THREE.RingGeometry(2.0, 2.3, 32); 
const highlightMaterial = new THREE.MeshBasicMaterial({ 
    color: 0xffeb3b, side: THREE.DoubleSide, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending, depthWrite: false 
});
const highlightRing = new THREE.Mesh(highlightGeometry, highlightMaterial);
highlightRing.visible = false;
scene.add(highlightRing);

function updateHighlightRing(starObj) {
    if (!starObj) {
        highlightRing.visible = false;
        return;
    }
    const raRad = starObj.ra * RA_TO_RAD;
    const decRad = starObj.dec * DEG_TO_RAD; 
    const r = 100;
    const x = r * Math.cos(decRad) * Math.sin(raRad);
    const y = r * Math.sin(decRad);
    const z = r * Math.cos(decRad) * Math.cos(raRad);

    highlightRing.position.set(x, y, z);
    highlightRing.lookAt(camera.position); 
    highlightRing.visible = true;
}

// Pornirea cronometrului global
function startGlobalTimer() {
    if (timerInterval) clearInterval(timerInterval);
    gameStartTime = Date.now();
    timerInterval = setInterval(() => {
        totalSecondsElapsed = Math.floor((Date.now() - gameStartTime) / 1000);
        const mins = String(Math.floor(totalSecondsElapsed / 60)).padStart(2, '0');
        const secs = String(totalSecondsElapsed % 60).padStart(2, '0');
        timerDisplay.innerText = `${mins}:${secs}`;
    }, 1000);
}

// Actualizarea vizuală a tabelei de scor HTML
function updateScoreUI() {
    document.getElementById('score-loc-c').innerText = scoreboard.locatie.corect;
    document.getElementById('score-loc-g').innerText = scoreboard.locatie.gresit;
    document.getElementById('score-name-c').innerText = scoreboard.nume.corect;
    document.getElementById('score-name-g').innerText = scoreboard.nume.gresit;
    document.getElementById('score-type-c').innerText = scoreboard.tip.corect;
    document.getElementById('score-type-g').innerText = scoreboard.tip.gresit;
}

// Selectarea unei stele noi în funcție de dificultate
function startNewRound() {
    const diff = selectDifficulty.value;
    let maxMag = 4.0; 
    if (diff === 'easy') maxMag = 2.0;
    else if (diff === 'medium') maxMag = 4.0;
    else if (diff === 'hard') maxMag = 5.0;
    else if (diff === 'extreme') maxMag = 6.5;

    // Filtrare pe bază de Nume Bayer valid ȘI Magnitudine conform opțiunii alese
    const playableStars = targetObjects.filter(star => star.bayerName && star.bayerName !== "Necunoscut" && star.mag <= maxMag);
    
    if (playableStars.length === 0) {
        uiTargetInstruction.innerText = "Nu s-au găsit stele în această categorie!";
        return;
    }

    const randomIndex = Math.floor(Math.random() * playableStars.length);
    currentTarget = playableStars[randomIndex];

    uiTargetInstruction.innerText = `Găsește steaua: ${currentTarget.bayerName}`;
    inputName.value = "";
    selectType.value = "";
    feedbackDiv.innerHTML = "";
    feedbackDiv.className = "";
    btnNext.style.display = "none";
    btnCheck.style.display = "block";
    
    currentSelectedId = null;
    highlightRing.visible = false;
    highlightRing.material.color.setHex(0xffeb3b); 
}

// Schimbarea dificultății resetează jocul și runda
selectDifficulty.addEventListener('change', () => {
    startNewRound();
});

// Click pe ecran pentru identificare
window.addEventListener('click', (event) => {
    if (event.target.closest('#ui-container')) return;
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);

    if (starPointsMesh) {
        const intersects = raycaster.intersectObject(starPointsMesh);
        if (intersects.length > 0) {
            const index = intersects[0].index;
            const clickedStar = targetObjects[index];
            currentSelectedId = clickedStar.id;
            updateHighlightRing(clickedStar);
        } else {
            currentSelectedId = null;
            updateHighlightRing(null);
        }
    }
});

// Verificarea răspunsurilor pe componente
btnCheck.addEventListener('click', () => {
    if (!currentTarget) return;
    if (!currentSelectedId) {
        feedbackDiv.innerText = "Dă click pe o stea de pe cerul virtual mai întâi!";
        feedbackDiv.className = "incorect";
        return;
    }

    const userNameInput = inputName.value.trim().toLowerCase();
    const userTypeInput = selectType.value;
    let errors = [];

    // 1. Verificare Locație
    if (currentSelectedId === currentTarget.id) {
        scoreboard.locatie.corect++;
    } else {
        scoreboard.locatie.gresit++;
        errors.push("Locație incorectă pe hartă.");
    }

    // 2. Verificare Nume
    if (currentTarget.correctName) {
        if (userNameInput === currentTarget.correctName) {
            scoreboard.nume.corect++;
        } else {
            scoreboard.nume.gresit++;
            errors.push(`Nume incorect (era necesar: ${currentTarget.correctName.toUpperCase()}).`);
        }
    } else {
        if (userNameInput === "") {
            scoreboard.nume.corect++; 
        } else {
            scoreboard.nume.gresit++;
            errors.push("Această stea nu are un nume tradițional în registru (lasă gol).");
        }
    }

    // 3. Verificare Tip
    if (userTypeInput === currentTarget.correctType) {
        scoreboard.tip.corect++;
    } else {
        scoreboard.tip.gresit++;
        errors.push("Tipul obiectului este selectat greșit.");
    }

    updateScoreUI();

    if (errors.length === 0) {
        feedbackDiv.innerHTML = "Perfect! Toate cele 3 componente au fost identificate corect.";
        feedbackDiv.className = "corect";
        highlightRing.material.color.setHex(0x28a745); 
        btnCheck.style.display = "none";
        btnNext.style.display = "block";
    } else {
        feedbackDiv.innerHTML = "<strong>Erori identificate:</strong><br>" + errors.join("<br>");
        feedbackDiv.className = "incorect";
        highlightRing.material.color.setHex(0xdc3545); 
        btnCheck.style.display = "none";
        btnNext.style.display = "block"; // Permitem trecerea mai departe chiar dacă a greșit
    }
});

btnNext.addEventListener('click', startNewRound);

// ==========================================
// LOGICA DE CLASAMENT (LEADERBOARD)
// ==========================================
function displayLeaderboard() {
    const listElement = document.getElementById('leaderboard-list');
    listElement.innerHTML = "";
    let scores = JSON.parse(localStorage.getItem('planetariu_scores')) || [];
    
    // Sortăm după numărul total de corecte (descrescător), apoi după timp (crescător)
    scores.sort((a, b) => (b.correct - a.correct) || (a.time - b.time));
    
    // Afișăm doar primele 5
    scores.slice(0, 5).forEach(sc => {
        const li = document.createElement('li');
        const mins = String(Math.floor(sc.time / 60)).padStart(2, '0');
        const secs = String(sc.time % 60).padStart(2, '0');
        li.innerText = `${sc.correct} Puncte Corecte | Timp: ${mins}:${secs} (${sc.diff.toUpperCase()})`;
        listElement.appendChild(li);
    });
}

document.getElementById('btn-save-score').addEventListener('click', () => {
    const totalCorrect = scoreboard.locatie.corect + scoreboard.nume.corect + scoreboard.tip.corect;
    let scores = JSON.parse(localStorage.getItem('planetariu_scores')) || [];
    
    scores.push({
        correct: totalCorrect,
        time: totalSecondsElapsed,
        diff: selectDifficulty.value
    });
    
    localStorage.setItem('planetariu_scores', JSON.stringify(scores));
    displayLeaderboard();
    alert("Scorul curent a fost salvat în clasament!");
});

// ==========================================
// 6. DESENAREA CONSTELAȚIILOR
// ==========================================
// Definim ce stele se leagă între ele (Denumirile Bayer exacte din baza de date)
const constellationPairs = [
    // 1. Andromeda
    ["Alpha And","Delta And"], ["Delta And","Beta And"], ["Beta And","Gamma And"], ["Beta And","Mu And"], ["Mu And","Nu And"],

    // 2. Antlia
    ["Alpha Ant","Eta Ant"],

    // 3. Apus
    ["Alpha Aps","Gamma Aps"], ["Gamma Aps","Beta Aps"],

    // 4. Aquarius
    ["Epsilon Aqr","Mu Aqr"], ["Mu Aqr","Beta Aqr"], ["Beta Aqr","Alpha Aqr"], ["Alpha Aqr","Theta Aqr"], ["Theta Aqr","Iota Aqr"],
    ["Theta Aqr","Sigma Aqr"], ["Sigma Aqr","Tau Aqr"], ["Tau Aqr","Delta Aqr"], ["Epsilon Aqr","Mu Aqr"], ["Delta Aqr","c2 Aqr"],
    ["Alpha Aqr","Gamma Aqr"], ["Gamma Aqr","Zeta Aqr"], ["Zeta Aqr","Eta Aqr"], ["Eta Aqr","Lambda Aqr"], ["Lambda Aqr","Psi Aqr"],
    ["Psi Aqr","b1 Aqr"], 

    // Ursa Mare (Aici apărea eroarea ta)
    ["Eta UMa", "Zeta UMa"], ["Zeta UMa", "Epsilon UMa"], ["Epsilon UMa", "Delta UMa"], 
    ["Delta UMa", "Gamma UMa"], ["Gamma UMa", "Beta UMa"], ["Beta UMa", "Alpha UMa"], ["Alpha UMa", "Delta UMa"], 

    // Ursa Mică
    ["Alpha UMi", "Delta UMi"], ["Delta UMi", "Epsilon UMi"], ["Epsilon UMi", "Zeta UMi"], 
    ["Zeta UMi", "Beta UMi"], ["Beta UMi", "Gamma UMi"], ["Gamma UMi", "Eta UMi"], ["Eta UMi", "Zeta UMi"], 

    // Bootes
    ["Alpha Boo", "Epsilon Boo"], ["Epsilon Boo", "Delta Boo"], ["Delta Boo", "Beta Boo"], 
    ["Beta Boo", "Gamma Boo"], ["Gamma Boo", "Rho Boo"], 
    ["Alpha Boo", "Eta Boo"],  
    ["Rho Boo", "Alpha Boo"], ["Alpha Boo", "Zeta Boo"],

    // Cassiopeia
    ["Epsilon Cas", "Delta Cas"], ["Delta Cas", "Gamma Cas"], ["Gamma Cas", "Alpha Cas"], ["Alpha Cas", "Beta Cas"],

    // Leo
    ["Epsilon Leo", "Mu Leo"], ["Mu Leo", "Zeta Leo"], ["Zeta Leo", "Gamma Leo"], ["Gamma Leo", "Eta Leo"], ["Eta Leo", "Alpha Leo"],
    ["Gamma Leo", "Delta Leo"], ["Delta Leo", "Beta Leo"], ["Beta Leo", "Theta Leo"], ["Theta Leo", "Alpha Leo"], ["Delta Leo", "Theta Leo"]
];

function drawConstellations() {
    // Material pentru linii: o culoare albăstruie, semi-transparentă
    const lineMaterial = new THREE.LineBasicMaterial({ 
        color: 0x4aa3ff, 
        transparent: true, 
        opacity: 0.35,
        linewidth: 1 
    });
    
    const points = [];

    // Căutăm coordonatele pentru fiecare pereche
    constellationPairs.forEach(pair => {
        const star1 = targetObjects.find(s => s.bayerName === pair[0]);
        const star2 = targetObjects.find(s => s.bayerName === pair[1]);

        if (star1 && star2) {
            const r = 100; // Raza sferei noastre

            // Poziția 3D a primei stele
            const raRad1 = star1.ra * RA_TO_RAD;
            const decRad1 = star1.dec * DEG_TO_RAD;
            points.push(new THREE.Vector3(
                r * Math.cos(decRad1) * Math.sin(raRad1),
                r * Math.sin(decRad1),
                r * Math.cos(decRad1) * Math.cos(raRad1)
            ));

            // Poziția 3D a celei de-a doua stele
            const raRad2 = star2.ra * RA_TO_RAD;
            const decRad2 = star2.dec * DEG_TO_RAD;
            points.push(new THREE.Vector3(
                r * Math.cos(decRad2) * Math.sin(raRad2),
                r * Math.sin(decRad2),
                r * Math.cos(decRad2) * Math.cos(raRad2)
            ));
        }
    });

    // Creăm geometria liniilor și le adăugăm în scenă
    const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
    const constLinesMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(constLinesMesh);
}

// ==========================================
// 7. START-UP PROCES (CORECTAT - eliminat duplicatul)
// ==========================================
if (typeof initDatabase === "function") {
    initDatabase().then(() => {
        targetObjects = astronomyDatabase; 
        buildStarfield(); 
        drawConstellations(); 
        startNewRound(); 
        startGlobalTimer(); 
        displayLeaderboard(); 
    });
}
