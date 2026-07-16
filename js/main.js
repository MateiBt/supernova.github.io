// ==========================================
// 0. AUTHENTICATION & DATABASE (Shared)
// ==========================================
import { auth, app } from './auth.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getDatabase, ref, set, get, update, onValue, onDisconnect, remove } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

let currentUser = null;
let db = getDatabase(app);

onAuthStateChanged(auth, (user) => {
    const statusText = document.getElementById('auth-status-text');
    const configForms = document.getElementById('config-forms');
    const btnLaunch = document.getElementById('btn-launch');

    if (user) {
        currentUser = user;
        const displayName = user.displayName || (user.email ? user.email.split('@')[0] : "Student");
        
        if (statusText) {
            statusText.innerHTML = `Welcome, <span style="color: var(--accent-blue);">${displayName}</span>. Please configure your session.`;
        }
        if (configForms) {
            configForms.style.display = 'grid'; 
            updatePersonalRecords(); 
            
            const p1Inp = document.getElementById('multi-p1-name');
            if(p1Inp) p1Inp.value = displayName;
        }
    } else {
        currentUser = null;
        
        if (statusText) {
            statusText.innerHTML = `<span style="color: #ef4444;">Access Denied.</span> Please log in to the platform to access the simulation.`;
        }
        if (configForms) {
            configForms.style.display = 'none';
        }
        if (btnLaunch) {
            btnLaunch.disabled = true;
        }
    }
});

// ==========================================
// 0.5. CORECTURI MANUALE BAZĂ DE DATE
// ==========================================
const customStarCorrections = [
    { identifier: "Alpha CMa", correctName: "sirius", altNames: ["dog star"] }
];

// ==========================================
// 0.6. CLASIFICARE FIZICĂ STELE (STELLARIUM DATA)
// ==========================================
const starClassifications = {
    "dubla": [
        "Alpha CMa", // Sirius
        "Alpha Cen", // Rigil Kentaurus
        "Beta Cyg",  // Albireo
        "Zeta UMa"   // Mizar
    ],
    "pulsatila": [
        "Alpha Ori", // Betelgeuse
        "Alpha Sco", // Antares
        "Delta Cep", // Delta Cephei
        "Omicron Cet" // Mira
    ],
    "eruptiva": [
        
    ],
    "rotativa": [
        "Alpha CVn"  // Cor Caroli
    ],
    "eclipsanta": [
        "Beta Per",  // Algol
        "Beta Lyr"   // Sheliak
    ],
    "variabila": [
        
    ]
};

function applyStarClassifications() {
    targetObjects.forEach(star => {
        if (!star.isDSO) {
            star.correctType = "simpla"; 
        }
    });

    for (const [type, starsArray] of Object.entries(starClassifications)) {
        starsArray.forEach(identifier => {
            let star = getConstellationStar(identifier);
            if (star) {
                star.correctType = type;
            }
        });
    }
}

const constellationFullNames = {
    "And": "Andromeda", "Ant": "Antlia", "Aps": "Apus", "Aqr": "Aquarius", "Aql": "Aquila",
    "Ara": "Ara", "Ari": "Aries", "Aur": "Auriga", "Boo": "Bootes", "Cae": "Caelum",
    "Cam": "Camelopardalis", "Cnc": "Cancer", "CVn": "Canes Venatici", "CMa": "Canis Major", "CMi": "Canis Minor",
    "Cap": "Capricornus", "Car": "Carina", "Cas": "Cassiopeia", "Cen": "Centaurus", "Cep": "Cepheus",
    "Cet": "Cetus", "Cha": "Chamaeleon", "Cir": "Circinus", "Col": "Columba", "Com": "Coma Berenices",
    "CrA": "Corona Australis", "CrB": "Corona Borealis", "Crv": "Corvus", "Crt": "Crater", "Cru": "Crux",
    "Cyg": "Cygnus", "Del": "Delphinus", "Dor": "Dorado", "Dra": "Draco", "Equ": "Equuleus",
    "Eri": "Eridanus", "For": "Fornax", "Gem": "Gemini", "Gru": "Grus", "Her": "Hercules",
    "Hor": "Horologium", "Hya": "Hydra", "Hyi": "Hydrus", "Ind": "Indus", "Lac": "Lacerta",
    "Leo": "Leo", "LMi": "Leo Minor", "Lep": "Lepus", "Lib": "Libra", "Lup": "Lupus",
    "Lyn": "Lynx", "Lyr": "Lyra", "Men": "Mensa", "Mic": "Microscopium", "Mon": "Monoceros",
    "Mus": "Musca", "Nor": "Norma", "Oct": "Octans", "Oph": "Ophiuchus", "Ori": "Orion",
    "Pav": "Pavo", "Peg": "Pegasus", "Per": "Perseus", "Phe": "Phoenix", "Pic": "Pictor",
    "Psc": "Pisces", "PsA": "Piscis Austrinus", "Pup": "Puppis", "Pyx": "Pyxis", "Ret": "Reticulum",
    "Sge": "Sagitta", "Sgr": "Sagittarius", "Sco": "Scorpius", "Scl": "Sculptor", "Sct": "Scutum",
    "Ser": "Serpens", "Sex": "Sextans", "Tau": "Taurus", "Tel": "Telescopium", "Tri": "Triangulum",
    "TrA": "Triangulum Australe", "Tuc": "Tucana", "UMa": "Ursa Major", "UMi": "Ursa Minor", "Vel": "Vela",
    "Vir": "Virgo", "Vol": "Volans", "Vul": "Vulpecula"
};

// ==========================================
// 1. SETĂRILE DE BAZĂ THREE.JS & ZOOM OPTIC
// ==========================================
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x010103);

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 0.1); 

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('canvas-container').appendChild(renderer.domElement);

const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enablePan = false;
controls.rotateSpeed = -0.15; 
controls.enableZoom = false; 

window.addEventListener('wheel', (event) => {
    if (event.target.closest('#setup-modal') || event.target.closest('.modal-content') || event.target.closest('.hud-container') || event.target.closest('#free-roam-card') || event.target.closest('#practice-result-modal')) return;
    const zoomStep = Math.sign(event.deltaY) * 5; 
    camera.fov += zoomStep;
    camera.fov = Math.max(15, Math.min(75, camera.fov)); 
    camera.updateProjectionMatrix();
}, { passive: false });

// ==========================================
// 2. TEXTURI (STELE ROTUNDE vs DSO PĂTRATE)
// ==========================================
function createStarTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 32; canvas.height = 32;
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

function createDSOTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 32; canvas.height = 32;
    const context = canvas.getContext('2d');
    context.fillStyle = 'rgba(255, 255, 255, 0.8)';
    context.fillRect(4, 4, 24, 24); 
    context.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    context.lineWidth = 2;
    context.strokeRect(2, 2, 28, 28);
    return new THREE.CanvasTexture(canvas);
}

// ==========================================
// 3. GENERAREA CÂMPULUI STELAR & DSO
// ==========================================
const RA_TO_RAD = (Math.PI * 2) / 24;
const DEG_TO_RAD = Math.PI / 180;

let targetObjects = []; 
let starPointsMesh;
let dsoPointsMesh; 

function buildStarfield() {
    const starVertices = []; const starSizes = []; const starColors = [];
    const dsoVertices = []; const dsoSizes = []; const dsoColors = [];

    targetObjects.forEach(obj => {
        const raRad = obj.ra * RA_TO_RAD;
        const decRad = obj.dec * DEG_TO_RAD;
        const r = 100;
        
        const x = r * Math.cos(decRad) * Math.sin(raRad);
        const y = r * Math.sin(decRad);
        const z = r * Math.cos(decRad) * Math.cos(raRad);

        let calculatedSize = Math.max(3.0, 40 * Math.exp(-obj.mag * 0.4));
        if (calculatedSize > 60) calculatedSize = 60; 
        
        const cVal = obj.color !== undefined ? obj.color : 0xffffff;
        const color = new THREE.Color(cVal);

        if (obj.isDSO) {
            dsoVertices.push(x, y, z);
            dsoSizes.push(calculatedSize * 1.5);
            dsoColors.push(color.r, color.g, color.b);
        } else {
            starVertices.push(x, y, z);
            starSizes.push(calculatedSize);
            starColors.push(color.r, color.g, color.b);
        }
    });

    const starGeometry = new THREE.BufferGeometry();
    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
    starGeometry.setAttribute('color', new THREE.Float32BufferAttribute(starColors, 3));
    starGeometry.setAttribute('size', new THREE.Float32BufferAttribute(starSizes, 1));

    const starMaterial = new THREE.ShaderMaterial({
        uniforms: { pointTexture: { value: createStarTexture() } },
        vertexShader: `attribute float size; varying vec3 vColor; void main() { vColor = color; vec4 mvPosition = modelViewMatrix * vec4(position, 1.0); gl_PointSize = size; gl_Position = projectionMatrix * mvPosition; }`,
        fragmentShader: `uniform sampler2D pointTexture; varying vec3 vColor; void main() { gl_FragColor = vec4(vColor * 2.5, 1.0) * texture2D(pointTexture, gl_PointCoord); }`,
        blending: THREE.AdditiveBlending, depthWrite: false, transparent: true, vertexColors: true
    });

    if (starPointsMesh) scene.remove(starPointsMesh);
    starPointsMesh = new THREE.Points(starGeometry, starMaterial);
    scene.add(starPointsMesh);

    const dsoGeometry = new THREE.BufferGeometry();
    dsoGeometry.setAttribute('position', new THREE.Float32BufferAttribute(dsoVertices, 3));
    dsoGeometry.setAttribute('color', new THREE.Float32BufferAttribute(dsoColors, 3));
    dsoGeometry.setAttribute('size', new THREE.Float32BufferAttribute(dsoSizes, 1));

    const dsoMaterial = new THREE.ShaderMaterial({
        uniforms: { pointTexture: { value: createDSOTexture() } },
        vertexShader: `attribute float size; varying vec3 vColor; void main() { vColor = color; vec4 mvPosition = modelViewMatrix * vec4(position, 1.0); gl_PointSize = size; gl_Position = projectionMatrix * mvPosition; }`,
        fragmentShader: `uniform sampler2D pointTexture; varying vec3 vColor; void main() { gl_FragColor = vec4(vColor, 0.9) * texture2D(pointTexture, gl_PointCoord); }`,
        blending: THREE.AdditiveBlending, depthWrite: false, transparent: true, vertexColors: true
    });

    if (dsoPointsMesh) scene.remove(dsoPointsMesh);
    dsoPointsMesh = new THREE.Points(dsoGeometry, dsoMaterial);
    scene.add(dsoPointsMesh);
}

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
// 4. DESENAREA CONSTELAȚIILOR
// ==========================================
function getConstellationStar(starName) {
    if (starName.startsWith("HIP ")) {
        const hipNumber = parseInt(starName.replace("HIP ", "").trim());
        return targetObjects.find(s => s.hip === hipNumber && !s.isDSO);
    }
    return targetObjects.find(s => s.bayerName === starName && !s.isDSO);
}

// FORMATAT EXACT CUM ERA ÎN FIȘIERUL ORIGINAL!
const constellationPairs = [
    // 1. Andromeda
    ["Alpha And","Delta And"], ["Delta And","Beta And"], ["Beta And","Gamma And"], ["Beta And","Mu And"], ["Mu And","Nu And"],
    // 2. Antlia
    ["Alpha Ant","Eta Ant"],
    // 3. Apus
    ["Alpha Aps","Gamma Aps"], ["Gamma Aps","Beta Aps"],
    // 4. Aquarius
    ["Epsilon Aqr","Mu Aqr"], ["Mu Aqr","Beta Aqr"], ["Beta Aqr","Alpha Aqr"], ["Alpha Aqr","Theta Aqr"], ["Theta Aqr","Iota Aqr"],
    ["Theta Aqr","Sigma Aqr"], ["Sigma Aqr","Tau Aqr"], ["Tau Aqr","Delta Aqr"], ["Delta Aqr","HIP 114341"], ["Alpha Aqr","Gamma Aqr"],
    ["Gamma Aqr","Zeta Aqr"], ["Zeta Aqr","Eta Aqr"], ["Eta Aqr","Lambda Aqr"], ["Lambda Aqr","Psi Aqr"], ["Psi Aqr","HIP 115438"], 
    // 5. Aquila
    ["Alpha Aql","Beta Aql"], ["Alpha Aql","Gamma Aql"], ["Alpha Aql","Delta Aql"], ["Delta Aql","Zeta Aql"], ["Zeta Aql","Epsilon Aql"],
    ["Delta Aql","Eta Aql"], ["Eta Aql","Theta Aql"], ["Delta Aql","Lambda Aql"],
    // 6. Ara
    ["Alpha Ara","Zeta Ara"], ["Zeta Ara","Eta Ara"], ["Eta Ara","Delta Ara"], ["Delta Ara","Gamma Ara"], ["Gamma Ara","Beta Ara"],
    ["Beta Ara","Theta Ara"], ["Theta Ara","Alpha Ara"],
    // 7. Aries
    ["HIP 13209","Alpha Ari"], ["Alpha Ari","Beta Ari"], ["Beta Ari","Gamma Ari"],
    // 8. Auriga
    ["Alpha Aur","Beta Aur"], ["Beta Aur","Theta Aur"], ["Theta Aur","Beta Tau"], ["Beta Tau","Iota Aur"], ["Iota Aur","Zeta Aur"],
    ["Zeta Aur","Epsilon Aur"], ["Epsilon Aur","Alpha Aur"],
    // 9. Bootes
    ["Rho Boo", "Alpha Boo"], ["Alpha Boo", "Zeta Boo"],["Alpha Boo", "Eta Boo"], ["Alpha Boo", "Epsilon Boo"], ["Epsilon Boo", "Delta Boo"],
    ["Delta Boo", "Beta Boo"], ["Beta Boo", "Gamma Boo"], ["Gamma Boo", "Rho Boo"], ["Gamma Boo", "Lambda Boo"], ["Lambda Boo", "Theta Boo"],
    // 10. Caelum
    ["Beta Cae", "Alpha Cae"], ["Alpha Cae", "Delta Cae"],
    // 11. Camelopardalis
    ["Alpha Cam", "Gamma Cam"], ["Alpha Cam", "HIP 18505"], ["HIP 16228", "HIP 18505"], ["Gamma Cam", "HIP 16228"], ["Gamma Cam", "HIP 25110"],
    // 12. Cancer
    ["Alpha Cnc", "Delta Cnc"], ["Beta Cnc", "Delta Cnc"], ["Delta Cnc", "Gamma Cnc"], ["Gamma Cnc", "Iota Cnc"], ["Gamma Cnc", "Chi Cnc"],
    // 13. Canes Venatici
    ["Alpha CVn", "Beta CVn"],
    // 14. Canis Major
    ["Alpha CMa", "Iota CMa"], ["Iota CMa", "Gamma CMa"], ["Iota CMa", "Theta CMa"], ["Gamma CMa", "Theta CMa"], ["Alpha CMa", "Nu CMa"],
    ["Nu CMa", "Beta CMa"], ["Nu CMa", "Xi CMa"], ["Alpha CMa", "HIP 33977"], ["HIP 33977", "Delta CMa"], ["Delta CMa", "Omega CMa"],
    ["Omega CMa", "Eta CMa"], ["Delta CMa", "Sigma CMa"], ["Sigma CMa", "Omicron CMa"], ["Omicron CMa", "Nu CMa"], ["Sigma CMa", "Epsilon CMa"],
    ["Epsilon CMa", "Zeta CMa"], ["Epsilon CMa", "Kappa CMa"],
    // 15. Canis Minor
    ["Alpha CMi", "Beta CMi"],
    // 16. Capricornus
    ["Alpha Cap", "Beta Cap"], ["Beta Cap", "Psi Cap"], ["Beta Cap", "Theta Cap"], ["Theta Cap", "Omega Cap"], ["Theta Cap", "Iota Cap"],
    ["Iota Cap", "Zeta Cap"], ["Zeta Cap", "Theta Cap"], ["Iota Cap", "Gamma Cap"], ["Gamma Cap", "Delta Cap"],
    // 17. Carina
    ["Alpha Car", "Epsilon Car"], ["Epsilon Car", "HIP 42568"], ["HIP 42568", "HIP 45080"], ["HIP 45080", "Iota Car"], ["Iota Car", "HIP 50371"],
    ["HIP 50371", "HIP 51232"], ["HIP 51232", "HIP 53253"], ["HIP 53253", "HIP 54463"], ["HIP 54463", "HIP 52468"], ["HIP 52468", "Theta Car"],
    ["Theta Car", "Omega Car"], ["Omega Car", "Beta Car"],
    // 18. Cassiopeia
    ["Epsilon Cas", "Delta Cas"], ["Delta Cas", "Gamma Cas"], ["Gamma Cas", "Alpha Cas"], ["Alpha Cas", "Beta Cas"],
    // 19. Centaurus
    ["Alpha Cen", "Beta Cen"], ["Beta Cen", "Epsilon Cen"], ["Epsilon Cen", "Zeta Cen"], ["Zeta Cen", "Gamma Cen"], ["Gamma Cen", "Sigma Cen"],
    ["Sigma Cen", "Delta Cen"], ["Delta Cen", "HIP 56480"], ["HIP 56480", "Lambda Cen"], ["Zeta Cen", "HIP 68282"], ["HIP 68282", "Mu Cen"],
    ["Mu Cen", "Eta Cen"], ["Eta Cen", "Kappa Cen"], ["Mu Cen", "Nu Cen"], ["Nu Cen", "Theta Cen"], ["Nu Cen", "HIP 65936"], ["HIP 65936", "Iota Cen"],
    // 20. Cepheus
    ["Alpha Cep", "Beta Cep"], ["Beta Cep", "Gamma Cep"], ["Gamma Cep", "Iota Cep"], ["Iota Cep", "Zeta Cep"], ["Alpha Cep", "Zeta Cep"],
    ["Beta Cep", "Iota Cep"],
    // 21. Cetus
    ["Alpha Cet", "Lambda Cet"], ["Lambda Cet", "Mu Cet"], ["Mu Cet", "HIP 11484"], ["HIP 11484", "HIP 10324"], ["HIP 11484", "Nu Cet"],
    ["Nu Cet", "Gamma Cet"], ["Gamma Cet", "Delta Cet"], ["Delta Cet", "Omicron Cet"], ["Omicron Cet", "Epsilon Cet"], ["Epsilon Cet", "Pi Cet"],
    ["Pi Cet", "Sigma Cet"], ["Sigma Cet", "Tau Cet"], ["Tau Cet", "Beta Cet"], ["Beta Cet", "Iota Cet"], ["Beta Cet", "Eta Cet"],
    ["Eta Cet", "Theta Cet"], ["Zeta Cet", "Theta Cet"], ["Zeta Cet", "Rho Cet"], ["Rho Cet", "Epsilon Cet"], ["Gamma Cet", "Alpha Cet"],
    // 22. Chameleon
    ["Alpha Cha", "Gamma Cha"], ["Beta Cha", "Gamma Cha"],
    // 23. Circinus
    ["Alpha Cir", "Beta Cir"], ["Alpha Cir", "Gamma Cir"],
    // 24. Columba
    ["Alpha Col", "Epsilon Col"], ["Alpha Col", "Beta Col"], ["Beta Col", "Eta Col"], ["Beta Col", "Gamma Col"], ["Gamma Col", "Kappa Col"],
    ["Kappa Col", "Delta Col"],
    // 25. Coma Berenices
    ["Alpha Com", "Beta Com"], ["Beta Com", "Gamma Com"],
    // 26. Corona Australis
    ["HIP 92953", "Zeta CrA"], ["Zeta CrA", "Delta CrA"], ["Delta CrA", "Beta CrA"], ["Beta CrA", "Alpha CrA"], ["Alpha CrA", "Gamma CrA"],
    ["Gamma CrA", "Epsilon CrA"], ["Epsilon CrA", "HIP 92989"], ["HIP 92989", "Lambda CrA"], ["Lambda CrA", "HIP 90887"],
    // 27. Corona Borealis
    ["Theta CrB", "Beta CrB"], ["Beta CrB", "Alpha CrB"], ["Alpha CrB", "Gamma CrB"], ["Gamma CrB", "Delta CrB"], ["Delta CrB", "Epsilon CrB"],
    ["Epsilon CrB", "Iota CrB"],
    // 28. Corvus
    ["Alpha Crv", "Epsilon Crv"], ["Epsilon Crv", "Gamma Crv"], ["Gamma Crv", "Delta Crv"], ["Delta Crv", "Eta Crv"], ["Delta Crv", "Beta Crv"],
    ["Beta Crv", "Epsilon Crv"],
    // 29. Crater
    ["Alpha Crt", "Beta Crt"], ["Beta Crt", "Gamma Crt"], ["Gamma Crt", "Delta Crt"], ["Delta Crt", "Epsilon Crt"], ["Epsilon Crt", "Theta Crt"],
    ["Theta Crt", "Eta Crt"], ["Eta Crt", "Zeta Crt"], ["Zeta Crt", "Gamma Crt"], ["Delta Crt", "Alpha Crt"],
    // 30. Crux
    ["Alpha Cru", "Gamma Cru"], ["Beta Cru", "Delta Cru"],
    // 31. Cygnus
    ["Kappa Cyg", "Iota Cyg"], ["Iota Cyg", "Delta Cyg"], ["Delta Cyg", "Gamma Cyg"], ["Gamma Cyg", "Epsilon Cyg"], ["Epsilon Cyg", "Zeta Cyg"],
    ["Zeta Cyg", "Mu Cyg"], ["Gamma Cyg", "Alpha Cyg"], ["Gamma Cyg", "Eta Cyg"], ["Eta Cyg", "Beta Cyg"],
    // 32. Delphinus
    ["Epsilon Del", "Beta Del"], ["Beta Del", "Alpha Del"], ["Alpha Del", "Gamma Del"], ["Gamma Del", "Delta Del"], ["Delta Del", "Beta Del"],
    // 33. Dorado
    ["Gamma Dor", "Alpha Dor"], ["Alpha Dor", "Beta Dor"], ["Beta Dor", "Delta Dor"], ["Delta Dor", "HIP 27890"], ["HIP 27890", "Beta Dor"],
    // 34. Dragon
    ["Lambda Dra", "Kappa Dra"], ["Kappa Dra", "Alpha Dra"], ["Alpha Dra", "Iota Dra"], ["Iota Dra", "Theta Dra"], ["Theta Dra", "Eta Dra"],
    ["Eta Dra", "Zeta Dra"], ["Zeta Dra", "Chi Dra"], ["Chi Dra", "Tau Dra"], ["Tau Dra", "Epsilon Dra"], ["Epsilon Dra", "Delta Dra"],
    ["Delta Dra", "Xi Dra"], ["Xi Dra", "Gamma Dra"], ["Gamma Dra", "Beta Dra"], ["Beta Dra", "Nu Dra"], ["Nu Dra", "Xi Dra"],
    // 35. Equuleus
    ["Alpha Equ", "Beta Equ"], ["Beta Equ", "Delta Equ"], ["Delta Equ", "Gamma Equ"], ["Gamma Equ", "Alpha Equ"],
    // 36. Eridanus
    ["HIP 21594", "Lambda Eri"], ["Lambda Eri", "Beta Eri"], ["Beta Eri", "Omega Eri"], ["Omega Eri", "Mu Eri"], ["Mu Eri", "Nu Eri"],
    ["Nu Eri", "Delta Eri"], ["Delta Eri", "Epsilon Eri"], ["Epsilon Eri", "Zeta Eri"], ["Zeta Eri", "Eta Eri"], ["Eta Eri", "HIP 12843"],
    ["HIP 12843", "HIP 14146"], ["HIP 14146", "HIP 15474"], ["HIP 15474", "HIP 16611"], ["HIP 16611", "HIP 17651"], ["HIP 17651", "HIP 21393"],
    ["HIP 21393", "HIP 20535"], ["HIP 20535", "HIP 20042"], ["HIP 20042", "HIP 17874"], ["HIP 17874", "HIP 17797"], ["HIP 17797", "HIP 15510"],
    ["HIP 15510", "Theta Eri"], ["Theta Eri", "Iota Eri"], ["Iota Eri", "HIP 12413"], ["HIP 12413", "Kappa Eri"], ["Kappa Eri", "Phi Eri"],
    ["Phi Eri", "Chi Eri"], ["Chi Eri", "Alpha Eri"],
    // 37. Fornax
    ["Alpha For", "Beta For"],
    // 38. Gemini
    ["Alpha Gem", "Tau Gem"], ["Beta Gem", "Upsilon Gem"], ["Kappa Gem", "Upsilon Gem"], ["Upsilon Gem", "Iota Gem"], ["Iota Gem", "Tau Gem"],
    ["Tau Gem", "Theta Gem"], ["Upsilon Gem", "Delta Gem"], ["Delta Gem", "Zeta Gem"], ["Zeta Gem", "Gamma Gem"], ["Delta Gem", "Lambda Gem"],
    ["Lambda Gem", "Xi Gem"], ["Tau Gem", "Epsilon Gem"], ["Epsilon Gem", "Nu Gem"], ["Epsilon Gem", "Mu Gem"], ["Mu Gem", "Eta Gem"],
    ["Eta Gem", "HIP 28734"],
    // 39. Grus
    ["Alpha Gru", "Beta Gru"], ["Beta Gru", "Epsilon Gru"], ["Beta Gru", "Zeta Gru"], ["Beta Gru", "Iota Gru"], ["Iota Gru", "Theta Gru"],
    ["Theta Gru", "Delta Gru"], ["Delta Gru", " Alpha Gru"], ["Alpha Gru", "Lambda Gru"], ["Lambda Gru", "Gamma Gru"], ["Delta Gru", "Alpha Gru"],
    // 40. Hercules
    ["Beta Her", "Alpha Her"], ["Beta Her", "Gamma Her"], ["Beta Her", "Zeta Her"], ["Zeta Her", "Epsilon Her"], ["Epsilon Her", "Lambda Her"],
    ["Lambda Her", "Delta Her"], ["Lambda Her", "Mu Her"], ["Mu Her", "Xi Her"], ["Xi Her", "Omicron Her"], ["Zeta Her", "Eta Her"],
    ["Eta Her", "Sigma Her"], ["Sigma Her", "Tau Her"], ["Tau Her", "Phi Her"], ["Phi Her", "Chi Her"], ["Eta Her", "Pi Her"],
    ["Pi Her", "HIP 84606"], ["HIP 84606", "Rho Her"], ["Rho Her", "Theta Her"], ["Theta Her", "Iota Her"], ["Pi Her", "Epsilon Her"],
    // 41. Horologium
    ["Alpha Hor", "Zeta Hor"], ["Zeta Hor", "Mu Hor"],
    // 42. Hydra
    ["Delta Hya", "Sigma Hya"], ["Sigma Hya", "Eta Hya"], ["Eta Hya", "Rho Hya"], ["Rho Hya", "Epsilon Hya"], ["Epsilon Hya", "Delta Hya"],
    ["Rho Hya", "Zeta Hya"], ["Zeta Hya", "Theta Hya"], ["Theta Hya", "HIP 46776"], ["HIP 46776", "HIP 46509"], ["HIP 46509", "Alpha Hya"],
    ["Alpha Hya", "HIP 45751"], ["HIP 45751", "Kappa Hya"], ["Kappa Hya", "HIP 48356"], ["HIP 48356", "HIP 49402"], ["HIP 49402", "Lambda Hya"],
    ["Lambda Hya", "Mu Hya"], ["Mu Hya", "Nu Hya"], ["Nu Hya", "Chi Hya"], ["Chi Hya", "Xi Hya"], ["Xi Hya", "Beta Hya"],
    ["Beta Hya", "Psi Hya"], ["Psi Hya", "Gamma Hya"], ["Gamma Hya", "Pi Hya"], ["Pi Hya", "HIP 69415"], ["HIP 69415", "HIP 70306"],
    ["HIP 70306", "HIP 72571"],
    // 43. Hydrus
    ["Beta Hyi", "Gamma Hyi"], ["Gamma Hyi", "Epsilon Hyi"], ["Epsilon Hyi", "Delta Hyi"], ["Delta Hyi", "Alpha Hyi"],
    // 44. Indus
    ["Alpha Ind", "Beta Ind"], ["Beta Ind", "Theta Ind"], ["Theta Ind", "Alpha Ind"],
    // 45. Lacerta
    ["HIP 109937", "HIP 111104"], ["HIP 111104", "HIP 111022"], ["HIP 111022", "HIP 110609"], ["HIP 110609", "Beta Lac"], ["Beta Lac", "Alpha Lac"],
    ["Alpha Lac", "HIP 111022"],
    // 46. Leo
    ["Epsilon Leo", "Mu Leo"], ["Mu Leo", "Zeta Leo"], ["Zeta Leo", "Gamma Leo"], ["Gamma Leo", "Eta Leo"], ["Eta Leo", "Alpha Leo"],
    ["Gamma Leo", "Delta Leo"], ["Delta Leo", "Beta Leo"], ["Beta Leo", "Theta Leo"], ["Theta Leo", "Alpha Leo"], ["Delta Leo", "Theta Leo"],
    // 47. Leo Minor
    ["HIP 46952", "HIP 49593"], ["HIP 49593", "Beta LMi"], ["Beta LMi", "HIP 53229"], ["HIP 53229", "HIP 49593"],
    // 48. Lepus
    ["Alpha Lep", "Beta Lep"], ["Beta Lep", "Gamma Lep"], ["Gamma Lep", "Delta Lep"], ["Delta Lep", "Alpha Lep"], ["Alpha Lep", "Zeta Lep"],
    ["Zeta Lep", "Eta Lep"], ["Eta Lep", "Theta Lep"], ["Alpha Lep", "Mu Lep"], ["Mu Lep", "Epsilon Lep"], ["Epsilon Lep", "Beta Lep"],
    ["Mu Lep", "Lambda Lep"], ["Lambda Lep", "Nu Lep"], ["Mu Lep", "Kappa Lep"], ["Kappa Lep", "Iota Lep"],
    // 49. Libra
    ["Alpha Lib", "Beta Lib"], ["Alpha Lib", "Sigma Lib"], ["Beta Lib", "Gamma Lib"], ["Gamma Lib", "Theta Lib"], ["Sigma Lib", "Upsilon Lib"],
    ["Upsilon Lib", "Tau Lib"], ["Beta Lib", "Sigma Lib"],
    // 50. Lupus
    ["Alpha Lup", "Beta Lup"], ["Beta Lup", "Delta Lup"], ["Delta Lup", "Phi Lup"], ["Delta Lup", "Gamma Lup"], ["Gamma Lup", "Eta Lup"],
    ["Eta Lup", "Theta Lup"], ["Theta Lup", "Chi Lup"], ["Chi Lup", "Eta Lup"], ["Gamma Lup", "Omega Lup"], ["Omega Lup", "Zeta Lup"],
    ["Zeta Lup", "Rho Lup"], ["Alpha Lup", "Tau Lup"], ["Alpha Lup", "Zeta Lup"],
    // 51. Lynx
    ["Alpha Lyn", "HIP 45688"], ["HIP 45688", "HIP 44700"], ["HIP 44700", "HIP 44248"], ["HIP 44248", "HIP 41075"], ["HIP 41075", "HIP 36145"],
    ["HIP 36145", "HIP 33449"], ["HIP 33449", "HIP 30060"],
    // 52. Lyra
    ["Alpha Lyr", "Zeta Lyr"], ["Zeta Lyr", "Delta Lyr"], ["Delta Lyr", "Gamma Lyr"], ["Gamma Lyr", "Beta Lyr"], ["Beta Lyr", "Zeta Lyr"],
    // 53. Mensa
    ["Gamma Men", "Mu Men"],
    // 54. Microscopium
    ["Alpha Mic", "Gamma Mic"], ["Gamma Mic", "Epsilon Mic"],
    // 55. Monoceros
    ["Zeta Mon", "HIP 39211"], ["HIP 39211", "Alpha Mon"], ["HIP 39211", "Delta Mon"], ["Delta Mon", "Beta Mon"], ["Delta Mon", "Gamma Mon"],
    ["Delta Mon", "HIP 32533"], ["HIP 32533", "HIP 31978"], ["HIP 31978", "HIP 30665"], ["HIP 32533", "Epsilon Mon"], ["Epsilon Mon", "HIP 31216"],
    ["HIP 31216", "HIP 31978"],
    // 56. Musca
    ["Alpha Mus", "Beta Mus"], ["Alpha Mus", "Gamma Mus"], ["Beta Mus", "Lambda Mus"], ["Gamma Mus", "Lambda Mus"],
    // 57. Norma
    ["Eta Nor", "Kappa Nor"], ["Eta Nor", "Epsilon Nor"], ["Eta Nor", "HIP 80000"], ["Kappa Nor", "HIP 80000"], ["Epsilon Nor", "HIP 80000"],
    // 58. Octans
    ["Delta Oct", "Beta Oct"], ["Beta Oct", "Nu Oct"], ["Nu Oct", "Delta Oct"],
    // 59. Ophiuchus
    ["Alpha Oph", "Beta Oph"], ["Beta Oph", "Eta Oph"], ["Eta Oph", "HIP 85755"], ["Eta Oph", "Zeta Oph"], ["Zeta Oph", "Epsilon Oph"],
    ["Epsilon Oph", "Kappa Oph"], ["Kappa Oph", "Alpha Oph"],
    // 60. Orion
    ["Alpha Ori", "Lambda Ori"], ["Lambda Ori", "Gamma Ori"], ["Gamma Ori", "Delta Ori"], ["Delta Ori", "Epsilon Ori"], ["Epsilon Ori", "Zeta Ori"],
    ["Zeta Ori", "Alpha Ori"], ["Zeta Ori", "Kappa Ori"], ["Kappa Ori", "Beta Ori"], ["Beta Ori", "Delta Ori"], ["Alpha Ori", "Mu Ori"],
    ["Mu Ori", "Xi Ori"], ["Mu Ori", "Nu Ori"], ["Nu Ori", "Xi Ori"], ["Xi Ori", "HIP 29434"], ["HIP 29434", "HIP 28716"],
    ["HIP 28716", "HIP 27913"], ["HIP 27913", "Nu Ori"], ["Gamma Ori", "HIP 22449"], ["HIP 22449", "HIP 22509"], ["HIP 22509", "HIP 22845"],
    ["HIP 22449", "HIP 22549"], ["HIP 22549", "HIP 22730"], ["HIP 22730", "HIP 22797"], ["HIP 22797", "HIP 23123"],
    // 61. Pavo
    ["Alpha Pav", "Gamma Pav"], ["Gamma Pav", "Beta Pav"], ["Beta Pav", "Delta Pav"], ["Delta Pav", "Alpha Pav"], ["Delta Pav", "Epsilon Pav"],
    ["Epsilon Pav", "Zeta Pav"], ["Zeta Pav", "Kappa Pav"], ["Kappa Pav", "Delta Pav"], ["Kappa Pav", "Lambda Pav"], ["Lambda Pav", "Xi Pav"],
    ["Lambda Pav", "Pi Pav"], ["Xi Pav", "Pi Pav"], ["Pi Pav", "Eta Pav"],
    // 62. Pegasus
    ["Alpha And", "Gamma Peg"], ["Gamma Peg", "Alpha Peg"], ["Alpha Peg", "Beta Peg"], ["Beta Peg", "Eta Peg"], ["Eta Peg", "Pi Peg"],
    ["Beta Peg", "Mu Peg"], ["Mu Peg", "Lambda Peg"], ["Lambda Peg", "Iota Peg"], ["Iota Peg", "Kappa Peg"], ["Alpha Peg", "Xi Peg"],
    ["Xi Peg", "Zeta Peg"], ["Zeta Peg", "Theta Peg"], ["Theta Peg", "Epsilon Peg"], ["Alpha And", "Beta Peg"],
    // 63. Perseus
    ["Eta Per", "Gamma Per"], ["Gamma Per", "Alpha Per"], ["Alpha Per", "Beta Per"], ["Beta Per", "Rho Per"], ["Rho Per", "HIP 13254"],
    ["Alpha Per", "Delta Per"], ["Delta Per", "Epsilon Per"], ["Epsilon Per", "Xi Per"], ["Xi Per", "Zeta Per"], ["Zeta Per", "Omicron Per"],
    // 64. Phoenix
    ["Alpha Phe", "Kappa Phe"], ["Alpha Phe", "Epsilon Phe"], ["Epsilon Phe", "Kappa Phe"], ["Kappa Phe", "Beta Phe"], ["Kappa Phe", "Zeta Phe"],
    ["Kappa Phe", "Gamma Phe"], ["Beta Phe", "Zeta Phe"], ["Beta Phe", "Gamma Phe"], ["Beta Phe", "Delta Phe"], ["Delta Phe", "Psi Phe"],
    ["Psi Phe", "Beta Phe"],
    // 65. Pictor
    ["Alpha Pic", "Gamma Pic"], ["Gamma Pic", "Beta Pic"],
    // 66. Pisces
    ["Gamma Psc", "Kappa Psc"], ["Kappa Psc", "Lambda Psc"], ["Lambda Psc", "HIP 117245"], ["HIP 117245", "Iota Psc"], ["Iota Psc", "Theta Psc"],
    ["Theta Psc", "HIP 115227"], ["HIP 115227", "Gamma Psc"], ["Iota Psc", "Omega Psc"], ["Omega Psc", "HIP 1645"], ["HIP 1645", "Delta Psc"],
    ["Delta Psc", "Epsilon Psc"], ["Epsilon Psc", "Mu Psc"], ["Mu Psc", "Nu Psc"], ["Nu Psc", "Xi Psc"], ["Xi Psc", "Alpha Psc"],
    ["Alpha Psc", "Omicron Psc"], ["Omicron Psc", "Eta Psc"], ["Eta Psc", "Phi Psc"], ["Phi Psc", "Sigma Psc"], ["Sigma Psc", "Upsilon Psc"],
    ["Upsilon Psc", "Phi Psc"],
    // 67. Piscis Austrinus
    ["Alpha PsA", "Epsilon PsA"], ["Epsilon PsA", "Eta PsA"], ["Eta PsA", "Theta PsA"], ["Theta PsA", "Tau PsA"], ["Tau PsA", "Beta PsA"],
    ["Beta PsA", "Delta PsA"],
    // 68. Puppis
    ["Rho Pup", "Xi Pup"], ["Xi Pup", "Pi Pup"], ["Pi Pup", "Alpha Car"], ["Pi Pup", "Tau Pup"], ["Tau Pup", "Sigma Pup"],
    ["Sigma Pup", "Zeta Pup"], ["Zeta Pup", "Rho Pup"], ["Zeta Pup", "Epsilon Car"],
    // 69. Pyxis
    ["Alpha Pyx", "Gamma Pyx"], ["Alpha Pyx", "Beta Pyx"],
    // 70. Reticulum
    ["Alpha Ret", "Beta Ret"], ["Beta Ret", "Delta Ret"], ["Delta Ret", "Epsilon Ret"], ["Epsilon Ret", "Alpha Ret"],
    // 71. Sagitta
    ["Alpha Sgt", "Delta Sgt"], ["Delta Sgt", "Beta Sgt"], ["Alpha Sgt", "Delta Sgt"], ["Delta Sgt", "Gamma Sgt"], ["Gamma Sgt", "Eta Sgt"],
    // 72. Sagittarius
    ["HIP 95294", "Iota Sgr"], ["Iota Sgr", "Alpha Sgr"], ["Iota Sgr", "Theta Sgr"], ["Theta Sgr", "HIP 98688"], ["HIP 98688", "HIP 96406"],
    ["HIP 96406", "Tau Sgr"], ["Tau Sgr", "Zeta Sgr"], ["Zeta Sgr", "Phi Sgr"], ["Phi Sgr", "Sigma Sgr"], ["Sigma Sgr", "Tau Sgr"],
    ["Sigma Sgr", "HIP 93085"], ["HIP 93085", "Omicron Sgr"], ["Omicron Sgr", "HIP 94820"], ["HIP 94820", "Rho Sgr"], ["Zeta Sgr", "Epsilon Sgr"],
    ["Epsilon Sgr", "Eta Sgr"], ["Epsilon Sgr", "Delta Sgr"], ["Delta Sgr", "Lambda Sgr"], ["Delta Sgr", "Phi Sgr"], ["Phi Sgr", "Lambda Sgr"],
    ["Lambda Sgr", "Mu Sgr"], ["Delta Sgr", "Gamma Sgr"], ["Gamma Sgr", "Epsilon Sgr"], ["Gamma Sgr", "HIP 87072"],
    // 73. Scorpius
    ["Lambda Sco", "Kappa Sco"], ["Kappa Sco", "Iota Sco"], ["Iota Sco", "Theta Sco"], ["Theta Sco", "Eta Sco"], ["Eta Sco", "Zeta Sco"],
    ["Zeta Sco", "Mu Sco"], ["Mu Sco", "Epsilon Sco"], ["Epsilon Sco", "Tau Sco"], ["Tau Sco", "Alpha Sco"], ["Alpha Sco", "Delta Sco"],
    ["Alpha Sco", "Beta Sco"], ["Alpha Sco", "Pi Sco"],
    // 74. Sculptor
    ["Alpha Scl", "Beta Scl"], ["Beta Scl", "Gamma Scl"], ["Gamma Scl", "Alpha Scl"],
    // 75. Scutum
    ["Alpha Sct", "Beta Sct"], ["Alpha Sct", "Gamma Sct"], ["Beta Sct", "HIP 92202"], ["HIP 92202", "HIP 92814"], ["HIP 92814", "Gamma Sct"],
    // 76. Serpens
    ["Theta Ser", "HIP 90441"], ["HIP 90441", "Eta Ser"], ["Eta Ser", "HIP 88670"], ["HIP 88670", "Nu Oph"], ["Nu Oph", "Omicron Ser"],
    ["Omicron Ser", "Xi Ser"], ["Xi Ser", "Nu Ser"], ["Delta Oph", "Mu Ser"], ["Mu Ser", "Epsilon Ser"], ["Epsilon Ser", "Alpha Ser"],
    ["Alpha Ser", "Delta Ser"], ["Delta Ser", "Beta Ser"], ["Beta Ser", "Gamma Ser"], ["Gamma Ser", "Kappa Ser"], ["Kappa Ser", "Beta Ser"],
    // 77. Sextans
    ["Alpha Sex", "Beta Sex"],
    // 78. Taurus
    ["Beta Tau", "Tau Tau"], ["Tau Tau", "Epsilon Tau"], ["Epsilon Tau", "HIP 20648"], ["HIP 20648", "Delta Tau"], ["Delta Tau", "HIP 17847"],
    ["Delta Tau", "Gamma Tau"], ["Gamma Tau", "HIP 20894"], ["HIP 20894", "Alpha Tau"], ["Alpha Tau", "Epsilon Tau"], ["Alpha Tau", "Zeta Tau"],
    ["Gamma Tau", "Lambda Tau"], ["Lambda Tau", "Omicron Tau"],
    // 79. Telescopium
    ["Alpha Tel", "Zeta Tel"],
    // 80. Triangulum
    ["Alpha Tri", "Beta Tri"], ["Beta Tri", "Gamma Tri"], ["Alpha Tri", "Gamma Tri"],
    // 81. Triangulum Australe
    ["Alpha TrA", "Beta TrA"], ["Alpha TrA", "Gamma TrA"], ["Beta TrA", "Gamma TrA"],
    // 82. Tucana
    ["Alpha Tuc", "Gamma Tuc"], ["Gamma Tuc", "Beta Tuc"], ["Gamma Tuc", "Zeta Tuc"],
    // 83. Ursa Major 
    ["Eta UMa", "Zeta UMa"], ["Zeta UMa", "Epsilon UMa"], ["Epsilon UMa", "Delta UMa"], ["Delta UMa", "Gamma UMa"], ["Gamma UMa", "Beta UMa"],
    ["Beta UMa", "Alpha UMa"], ["Alpha UMa", "Delta UMa"], ["Alpha UMa", "HIP 46733"], ["HIP 46733", "Omicron UMa"], ["Omicron UMa", "Upsilon UMa"],
    ["Upsilon UMa", "Phi UMa"], ["Beta UMa", "Phi UMa"], ["Phi UMa", "Theta UMa"], ["Theta UMa", "Iota UMa"], ["Theta UMa", "Kappa UMa"],
    ["Gamma UMa", "Chi UMa"], ["Chi UMa", "Psi UMa"], ["Psi UMa", "Mu UMa"], ["Psi UMa", "Lambda UMa"],
    // 84. Ursa Minor
    ["Alpha UMi", "Delta UMi"], ["Delta UMi", "Epsilon UMi"], ["Epsilon UMi", "Zeta UMi"], 
    ["Zeta UMi", "Beta UMi"], ["Beta UMi", "Gamma UMi"], ["Gamma UMi", "Eta UMi"], ["Eta UMi", "Zeta UMi"],
    // 85. Vela
    ["Gamma Vel", "Omicron Vel"], ["Omicron Vel", "Delta Vel"], ["Delta Vel", "Kappa Vel"], ["Kappa Vel", "Phi Vel"], ["Phi Vel", "Mu Vel"],
    ["Mu Vel", "HIP 51986"], ["HIP 51986", "HIP 50191"], ["HIP 50191", "Psi Vel"], ["Psi Vel", "Lambda Vel"], ["Lambda Vel", "Gamma Vel"],
    // 86. Virgo
    ["Nu Vir", "Eta Vir"], ["Eta Vir", "Gamma Vir"], ["Gamma Vir", "Delta Vir"], ["Gamma Vir", "Theta Vir"], ["Delta Vir", "Epsilon Vir"],
    ["Delta Vir", "Zeta Vir"], ["Theta Vir", "Alpha Vir"], ["Alpha Vir", "Zeta Vir"], ["Zeta Vir", "Tau Vir"], ["Tau Vir", "HIP 72220"],
    ["Alpha Vir", "Kappa Vir"], ["Kappa Vir", "Iota Vir"], ["Iota Vir", "Mu Vir"],
    // 87. Volans
    ["Alpha Vol", "Beta Vol"], ["Beta Vol", "Epsilon Vol"], ["Epsilon Vol", "Alpha Vol"], ["Epsilon Vol", "Delta Vol"], ["Epsilon Vol", "Zeta Vol"],
    ["Zeta Vol", "HIP 34481"], ["HIP 34481", "Epsilon Vol"],
    // 88. Vulpecula
    ["Alpha Vul", "HIP 98543"]
];

function drawConstellations() {
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0x1D4ED8, transparent: true, opacity: 0.7, linewidth: 1 });
    const points = [];
    constellationPairs.forEach(pair => {
        const star1 = getConstellationStar(pair[0]);
        const star2 = getConstellationStar(pair[1]);
        if (star1 && star2) {
            const r = 100;
            const raRad1 = star1.ra * RA_TO_RAD; const decRad1 = star1.dec * DEG_TO_RAD;
            points.push(new THREE.Vector3( r * Math.cos(decRad1) * Math.sin(raRad1), r * Math.sin(decRad1), r * Math.cos(decRad1) * Math.cos(raRad1) ));
            const raRad2 = star2.ra * RA_TO_RAD; const decRad2 = star2.dec * DEG_TO_RAD;
            points.push(new THREE.Vector3( r * Math.cos(decRad2) * Math.sin(raRad2), r * Math.sin(decRad2), r * Math.cos(decRad2) * Math.cos(raRad2) ));
        }
    });
    const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
    const constLinesMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(constLinesMesh);
}

// ==========================================
// 4.5. FUNCȚII AJUTĂTOARE (TYPO, DATA & TIMP)
// ==========================================
function getLevenshteinDistance(a, b) {
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;
    const matrix = [];
    for (let i = 0; i <= b.length; i++) matrix[i] = [i];
    for (let j = 0; j <= a.length; j++) matrix[0][j] = j;
    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            if (b.charAt(i - 1) == a.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1));
            }
        }
    }
    return matrix[b.length][a.length];
}

function formatDate(isoString) {
    if (!isoString) return "";
    const d = new Date(isoString);
    if (isNaN(d.getTime())) return "";
    return d.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

function formatTimeMs(ms) {
    let totalS = Math.floor(ms / 1000);
    let m = Math.floor(totalS / 60);
    let s = totalS % 60;
    let milli = Math.floor(ms % 1000);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}.${milli.toString().padStart(3, '0')}`;
}

// ==========================================
// 5. PLANETARIUM UI & LOGICĂ
// ==========================================
let activeTarget = null;
let activeMode = 'name'; 
let activeDiff = null;
let activeTime = null;
let activeTimeTab = '5'; 
let activePracticeConstellation = null; 

let currentTarget = null;
let currentSelectedId = null;
let currentScore = 0;
let mistakesCount = 0; 
let totalLettersGuessed = 0; 
let remainingTime = 0;
let isUnlimited = false;
let timerInterval = null;
let isTimerPaused = false; 

// Form & Trackers (Single Player)
let totalPlayTimeSec = 0;
let currentStreak = 0;
let performanceHistory = []; 
let targetStartTime = 0;

// Practice Vars
let practiceQueue = [];
let currentPracticeIndex = 0;
let lastTickMs = 0;
let totalPracticeMs = 0; 

// Multiplayer Vars (Unified N-Players)
let multiPlayers = {}; // { uuid: { name, score, timeMs, streak, history } }
let multiOrder = []; // Array of uuids
let currentTurnIndex = 0;
let maxRounds = 25;
let currentRound = 1;
let duelTurnTimer = null;
let duelTurnSeconds = 15;
let isBotMatch = false;
let botAccuracy = 0.60;

// Online Multiplayer Vars
let myClientId = Math.random().toString(36).substring(2, 10);
let isOnlineMatch = false;
let isGameRunning = false; 
let onlineRole = null; 
let onlineRoomCode = null;
let lobbyListenerUnsubscribe = null;
let stateListenerUnsubscribe = null;
let actionListenerUnsubscribe = null;
let playersListenerUnsubscribe = null;

const dictTarget = { "stars": "Stars", "dso": "DSO" };
const dictMode = { "name": "Identify Name", "type": "Classify Type", "position": "Locate Object", "mag": "Guess Magnitude", "multi": "Multiplayer Arena", "free": "Free Roam" };
const dictDiff = { "easy": "Easy", "medium": "Medium", "hard": "Hard", "extreme": "Extreme" };

const typeDict = { 
    "simpla": "Simple Star", 
    "dubla": "Double / Multiple Star", 
    "variabila": "Variable Star (Generic)",
    "pulsatila": "Pulsating Variable",
    "eruptiva": "Eruptive Variable",
    "rotativa": "Rotative Variable",
    "eclipsanta": "Eclipsing Binary System",
    "galaxy": "Galaxy", 
    "nebula": "Nebula / SNR", 
    "planetary_nebula": "Planetary Nebula",
    "open_cluster": "Open Cluster", 
    "globular_cluster": "Globular Cluster"
};

const setupModal = document.getElementById('setup-modal');
const btnLaunch = document.getElementById('btn-launch');
const targetGroup = document.getElementById('target-group');
const diffGroup = document.getElementById('diff-group');
const timeGroup = document.getElementById('time-group');
const multiPlayersGroup = document.getElementById('multi-players-group');
const hudContainer = document.getElementById('hud-container');
const frCard = document.getElementById('free-roam-card');
const hudInstruction = document.getElementById('hud-instruction');
const inputGroupName = document.getElementById('input-group-name');
const inputGroupType = document.getElementById('input-group-type');
const inputGroupMag = document.getElementById('input-group-mag');
const inputName = document.getElementById('input-name');
const inputMag = document.getElementById('input-mag');
const hudFeedback = document.getElementById('hud-feedback');
const btnCheck = document.getElementById('btn-check');
const btnEnd = document.getElementById('btn-end');
const scoreDisplay = document.getElementById('score-display');
const timerDisplay = document.getElementById('timer-display');
const graphTitle = document.getElementById('form-graph-title');

// UI LOBBY ONLINE
const onlineLobbyUI = document.getElementById('online-lobby-ui');
const btnCreateRoom = document.getElementById('btn-create-room');
const btnShowJoin = document.getElementById('btn-show-join');
const createRoomUI = document.getElementById('create-room-ui');
const joinRoomUI = document.getElementById('join-room-ui');
const inputRoomCode = document.getElementById('input-room-code');
const btnJoinRoom = document.getElementById('btn-join-room');
const namesInputsGroup = document.getElementById('names-inputs-group');
const opponentSelect = document.getElementById('multi-opponent');
const botDiffSelect = document.getElementById('bot-difficulty');
const multiRoundsSelect = document.getElementById('multi-rounds');
const p1Inp = document.getElementById('multi-p1-name');
const p2Inp = document.getElementById('multi-p2-name');

function updateLobbyUIList() {
    const listEl = document.getElementById('lobby-players-list');
    const container = document.getElementById('lobby-players-container');
    if(!listEl || !container) return;
    
    listEl.innerHTML = '';
    const keys = Object.keys(multiPlayers);
    if(keys.length > 0) {
        container.style.display = 'block';
        keys.forEach(k => {
            const li = document.createElement('li');
            li.innerHTML = `<i class="fa-solid fa-user-astronaut" style="color:var(--accent-blue);"></i> ${multiPlayers[k].name}`;
            listEl.appendChild(li);
        });
    } else {
        container.style.display = 'none';
    }
}

// EVENIMENTE LOBBY ONLINE
if(opponentSelect) {
    opponentSelect.addEventListener('change', (e) => {
        botDiffSelect.style.display = 'none';
        onlineLobbyUI.style.display = 'none';
        namesInputsGroup.style.display = 'flex';
        p2Inp.disabled = false;
        p2Inp.style.opacity = '1';
        p2Inp.value = "Player 2";
        multiRoundsSelect.disabled = false;
        multiRoundsSelect.style.opacity = '1';
        isOnlineMatch = false;
        btnLaunch.innerText = "Start Arena Duel";
        checkLaunchReady();

        if(e.target.value === 'bot') {
            botDiffSelect.style.display = 'block';
            p2Inp.value = "A.I. Bot";
            p2Inp.disabled = true;
            p2Inp.style.opacity = '0.5';
        } else if(e.target.value === 'online') {
            onlineLobbyUI.style.display = 'block';
            namesInputsGroup.style.display = 'none';
            isOnlineMatch = true;
            btnLaunch.disabled = true;
            btnLaunch.innerText = "Awaiting connection...";
        }
    });
}

btnCreateRoom.addEventListener('click', () => {
    onlineRole = 'host';
    onlineRoomCode = Math.random().toString(36).substring(2, 6).toUpperCase();
    
    document.getElementById('room-code-display').innerText = onlineRoomCode;
    createRoomUI.style.display = 'block';
    joinRoomUI.style.display = 'none';
    
    const roomRef = ref(db, 'lobbies/' + onlineRoomCode);
    const myName = currentUser ? (currentUser.displayName || currentUser.email.split('@')[0]) : "Player 1";

    maxRounds = parseInt(multiRoundsSelect.value);

    set(roomRef, {
        status: 'waiting',
        hostId: myClientId,
        target: activeTarget,
        diff: activeDiff,
        rounds: maxRounds
    });

    const myPlayerRef = ref(db, `lobbies/${onlineRoomCode}/players/${myClientId}`);
    set(myPlayerRef, {
        name: myName,
        score: 0,
        timeMs: 0
    });

    onDisconnect(roomRef).remove();

    if(lobbyListenerUnsubscribe) lobbyListenerUnsubscribe();
    lobbyListenerUnsubscribe = onValue(ref(db, `lobbies/${onlineRoomCode}`), (snapshot) => {
        const data = snapshot.val();
        if(!data) {
            if (onlineRole === 'guest') {
                alert("Host disconnected. Room closed.");
                endGameSession();
            }
            return;
        }

        multiPlayers = data.players || {};
        updateLobbyUIList();

        if (onlineRole === 'host') {
            if (Object.keys(multiPlayers).length > 1) {
                document.getElementById('room-status').innerHTML = `<span style="color:var(--accent-green);"><i class="fa-solid fa-check"></i> Players joined! Ready to start.</span>`;
                btnLaunch.disabled = false;
                btnLaunch.innerText = "START ONLINE DUEL";
            } else {
                document.getElementById('room-status').innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Awaiting players...`;
                btnLaunch.disabled = true;
            }
        }

        if (data.status === 'starting') {
            if (!isGameRunning) {
                isGameRunning = true;
                triggerGameStart();
            }
        }
    });
});

btnShowJoin.addEventListener('click', () => {
    createRoomUI.style.display = 'none';
    joinRoomUI.style.display = 'block';
});

btnJoinRoom.addEventListener('click', () => {
    const code = inputRoomCode.value.trim().toUpperCase();
    if(code.length !== 4) return;
    
    const statusText = document.getElementById('join-status');
    statusText.style.display = 'block';
    statusText.innerText = "Searching for room...";
    
    const roomRef = ref(db, 'lobbies/' + code);
    get(roomRef).then((snapshot) => {
        if (snapshot.exists() && snapshot.val().status === 'waiting') {
            onlineRole = 'guest';
            onlineRoomCode = code;
            
            const myName = currentUser ? (currentUser.displayName || currentUser.email.split('@')[0]) : "Guest";
            
            activeTarget = snapshot.val().target;
            activeDiff = snapshot.val().diff;
            maxRounds = snapshot.val().rounds || 25;
            
            multiRoundsSelect.value = maxRounds;
            multiRoundsSelect.disabled = true;

            const myPlayerRef = ref(db, `lobbies/${onlineRoomCode}/players/${myClientId}`);
            set(myPlayerRef, {
                name: myName,
                score: 0,
                timeMs: 0
            }).then(() => {
                onDisconnect(myPlayerRef).remove();
                
                statusText.style.color = "var(--accent-green)";
                statusText.innerText = "Connected! Waiting for Host to start.";
                btnLaunch.disabled = true;
                btnLaunch.innerText = "Waiting for Host...";
                
                if(lobbyListenerUnsubscribe) lobbyListenerUnsubscribe();
                lobbyListenerUnsubscribe = onValue(ref(db, `lobbies/${onlineRoomCode}`), (snap) => {
                    const data = snap.val();
                    if(!data) {
                        alert("Host disconnected. Room closed.");
                        endGameSession();
                        return;
                    }
                    
                    multiPlayers = data.players || {};
                    updateLobbyUIList();

                    if (data.status === 'starting') {
                        if (!isGameRunning) {
                            isGameRunning = true;
                            triggerGameStart();
                        }
                    }
                });
            });
        } else {
            statusText.style.color = "var(--accent-red)";
            statusText.innerText = "Invalid room code or match already started.";
        }
    }).catch((error) => {
        statusText.innerText = "Connection error.";
    });
});

function unselectPractice() {
    activePracticeConstellation = null;
    document.querySelectorAll('#learning-constellations-list .learn-btn').forEach(b => b.classList.remove('selected'));
}

document.querySelectorAll('#target-grid .opt-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        unselectPractice();
        document.querySelectorAll('#target-grid .opt-btn').forEach(b => b.classList.remove('selected'));
        e.target.classList.add('selected');
        activeTarget = e.target.dataset.target;
        checkLaunchReady();
        updatePublicLeaderboardView();
        populateLearningSection();
    });
});

document.querySelectorAll('#mode-grid .opt-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        document.querySelectorAll('#mode-grid .opt-btn').forEach(b => b.classList.remove('selected'));
        e.target.classList.add('selected');
        activeMode = e.target.dataset.mode;
        
        if(multiPlayersGroup) multiPlayersGroup.style.display = 'none';
        isOnlineMatch = false;

        if (activeMode === 'free') {
            unselectPractice();
            targetGroup.style.display = 'none';
            diffGroup.style.display = 'none';
            timeGroup.style.display = 'none';
        } else if (activeMode === 'multi') {
            unselectPractice();
            if(multiPlayersGroup) multiPlayersGroup.style.display = 'block';
            targetGroup.style.display = 'block';
            diffGroup.style.display = 'block';
            timeGroup.style.display = 'none';
            activeTime = 'unlimited';
            const dsoBtn = document.querySelector('#target-grid .opt-btn[data-target="dso"]');
            if(dsoBtn) { dsoBtn.disabled = false; dsoBtn.style.opacity = '1'; }
            
            if(opponentSelect && opponentSelect.value === 'online') {
                isOnlineMatch = true;
                namesInputsGroup.style.display = 'none';
                onlineLobbyUI.style.display = 'block';
            }
        } else if (activeMode === 'mag') {
            unselectPractice();
            targetGroup.style.display = 'block';
            diffGroup.style.display = 'block';
            timeGroup.style.display = 'block';
            activeTarget = 'stars';
            document.querySelectorAll('#target-grid .opt-btn').forEach(b => b.classList.remove('selected'));
            document.querySelector('#target-grid .opt-btn[data-target="stars"]').classList.add('selected');
            document.querySelector('#target-grid .opt-btn[data-target="dso"]').disabled = true;
            document.querySelector('#target-grid .opt-btn[data-target="dso"]').style.opacity = '0.3';
        } else {
            if (!activePracticeConstellation) {
                targetGroup.style.display = 'block';
                diffGroup.style.display = 'block';
                timeGroup.style.display = 'block';
                const dsoBtn = document.querySelector('#target-grid .opt-btn[data-target="dso"]');
                if(dsoBtn) { dsoBtn.disabled = false; dsoBtn.style.opacity = '1'; }
            }
        }
        checkLaunchReady();
        updatePublicLeaderboardView();
        populateLearningSection(); 
    });
});

document.querySelectorAll('#diff-grid .opt-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        unselectPractice();
        document.querySelectorAll('#diff-grid .opt-btn').forEach(b => b.classList.remove('selected'));
        e.target.classList.add('selected');
        activeDiff = e.target.dataset.diff;
        checkLaunchReady();
        updatePublicLeaderboardView();
        populateLearningSection();
    });
});

document.querySelectorAll('#time-grid .opt-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        unselectPractice();
        document.querySelectorAll('#time-grid .opt-btn').forEach(b => b.classList.remove('selected'));
        e.target.classList.add('selected');
        activeTime = e.target.dataset.time;
        checkLaunchReady();
        populateLearningSection();
    });
});

document.querySelectorAll('#lb-tabs .lb-tab').forEach(btn => {
    btn.addEventListener('click', (e) => {
        document.querySelectorAll('#lb-tabs .lb-tab').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        activeTimeTab = e.target.dataset.tab;
        updatePublicLeaderboardView();
    });
});

function checkLaunchReady() {
    if(isOnlineMatch && onlineRoomCode) return; 

    if (activePracticeConstellation) {
        if (!activeMode || activeMode === 'free' || activeMode === 'multi') {
            activeMode = 'name';
            document.querySelectorAll('#mode-grid .opt-btn').forEach(b => b.classList.remove('selected'));
            document.querySelector('#mode-grid .opt-btn[data-mode="name"]').classList.add('selected');
        }
        btnLaunch.disabled = false;
        btnLaunch.innerText = `START PRACTICE: ${activePracticeConstellation}`;
    } else if (activeMode === 'free') {
        btnLaunch.disabled = false;
        btnLaunch.innerText = "Initialize Simulation";
    } else if (activeMode === 'multi' && activeDiff && activeTarget) {
        btnLaunch.disabled = false;
        btnLaunch.innerText = "Start Arena Duel";
    } else if (activeMode && activeDiff && activeTime && activeTarget) {
        btnLaunch.disabled = false;
        btnLaunch.innerText = "Initialize Simulation";
    } else {
        btnLaunch.disabled = true;
        btnLaunch.innerText = "Initialize Simulation";
    }
}

function populateLearningSection() {
    const listElement = document.getElementById('learning-constellations-list');
    if (!listElement) return;
    listElement.innerHTML = '';

    let constelStats = new Map(); 
    
    targetObjects.forEach(obj => {
        if (!obj.isDSO && obj.correctName && obj.correctName !== "" && obj.bayerName) {
            const parts = obj.bayerName.split(' ');
            if (parts.length > 1) {
                const abbr = parts[parts.length - 1]; 
                if(!constelStats.has(abbr)) constelStats.set(abbr, 0);
                constelStats.set(abbr, constelStats.get(abbr) + 1);
            }
        }
    });

    const sortedAbbrs = Array.from(constelStats.keys()).sort();

    let allPScores = JSON.parse(localStorage.getItem('planetariu_practice_lb')) || [];
    let evalMode = activeMode || 'name'; 
    const dName = currentUser ? (currentUser.displayName || (currentUser.email ? currentUser.email.split('@')[0] : "Student")) : "Student";

    sortedAbbrs.forEach(abbr => {
        const fullName = constellationFullNames[abbr] || abbr;
        const maxStars = constelStats.get(abbr);

        let cScores = allPScores.filter(s => s.constellation === abbr && s.mode === evalMode);
        
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

        let sortedBests = Object.values(userBests);
        sortedBests.sort((a, b) => {
            if (b.points !== a.points) return b.points - a.points;
            return a.timeMs - b.timeMs;
        });

        let myRank = -1;
        let myBest = null;
        for(let i=0; i<sortedBests.length; i++){
            if(sortedBests[i].user === dName) {
                myRank = i + 1;
                myBest = sortedBests[i];
                break;
            }
        }

        let btnClass = 'learn-btn';
        let bestTimeHtml = '';

        if (myBest) {
            if (myRank === 1) btnClass += ' rank-1';
            else if (myRank <= 10) btnClass += ' rank-top10';
            else if (myBest.points >= maxStars) btnClass += ' completed';
            
            bestTimeHtml = `<div class="best-time-label">Best: <span class="best-time-val">${myBest.points}pts / ${formatTimeMs(myBest.timeMs)}</span></div>`;
        }

        if (abbr === activePracticeConstellation) {
            btnClass += ' selected';
        }
        
        const li = document.createElement('li');
        const btn = document.createElement('button');
        btn.className = btnClass;
        btn.innerHTML = `
            <span class="learn-title">${fullName} <span class="learn-abbr">(${abbr})</span></span> 
            <span class="learn-count"><i class="fa-solid fa-star" style="font-size:0.8em; color:var(--text-muted);"></i> ${maxStars} targets</span>
            ${bestTimeHtml}
        `;
        btn.title = fullName;
        
        btn.addEventListener('click', () => {
            document.querySelectorAll('#learning-constellations-list .learn-btn').forEach(b => b.classList.remove('selected'));
            document.querySelectorAll('#target-grid .opt-btn').forEach(b => b.classList.remove('selected'));
            document.querySelectorAll('#diff-grid .opt-btn').forEach(b => b.classList.remove('selected'));
            document.querySelectorAll('#time-grid .opt-btn').forEach(b => b.classList.remove('selected'));
            
            btn.classList.add('selected');
            activePracticeConstellation = abbr;
            
            document.getElementById('target-group').style.display = 'none';
            document.getElementById('diff-group').style.display = 'none';
            document.getElementById('time-group').style.display = 'none';
            
            checkLaunchReady();
            updatePublicLeaderboardView();
        });
        
        li.appendChild(btn);
        listElement.appendChild(li);
    });
}

function updateHUDGraph() {
    const cvs = document.getElementById('form-graph');
    const streakEl = document.getElementById('streak-display');
    if(!cvs) return;
    const ctx = cvs.getContext('2d');
    ctx.clearRect(0, 0, cvs.width, cvs.height);
    const barW = cvs.width / 20;
    
    let histToDraw = performanceHistory;
    let streakToDraw = currentStreak;

    if (activeMode === 'multi') {
        if(multiOrder && multiOrder.length > 0 && multiPlayers) {
            let activePlayer = multiPlayers[multiOrder[currentTurnIndex]];
            if(activePlayer) {
                histToDraw = activePlayer.history || [];
                streakToDraw = activePlayer.streak || 0;
                if(graphTitle) graphTitle.innerText = `${activePlayer.name}'s Form`;
            }
        } else {
            if(graphTitle) graphTitle.innerText = `Player Form`;
        }
    } else {
        if(graphTitle) graphTitle.innerText = `Live Form (Last 20)`;
    }

    if(streakEl) streakEl.innerText = streakToDraw;

    histToDraw.forEach((item, i) => {
        const x = i * barW;
        if(item.correct) {
            let h = Math.max(3, (1 - item.time / 15000) * cvs.height); 
            ctx.fillStyle = '#10b981';
            ctx.fillRect(x + 1, cvs.height - h, barW - 2, h);
        } else {
            ctx.fillStyle = '#ef4444';
            ctx.fillRect(x + 1, cvs.height - 4, barW - 2, 4);
        }
    });
}

function updateLiveLeaderboard() {
    const lbContainer = document.getElementById('live-leaderboard');
    const lbList = document.getElementById('live-leaderboard-list');
    if (!lbContainer || !lbList) return;

    if (activeMode === 'multi') {
        lbContainer.style.display = 'block';
        lbList.innerHTML = '';
        
        let sortedPlayers = Object.values(multiPlayers).sort((a, b) => {
            if (b.score !== a.score) return b.score - a.score;
            return a.timeMs - b.timeMs;
        });

        sortedPlayers.forEach((p, idx) => {
            let isMe = (p.name === (currentUser?.displayName || currentUser?.email?.split('@')[0]));
            let bg = isMe ? 'rgba(255,255,255,0.1)' : 'transparent';
            let tSecs = (p.timeMs / 1000).toFixed(1);
            
            const div = document.createElement('div');
            div.className = 'live-lb-item';
            div.style.background = bg;
            div.innerHTML = `
                <div class="live-lb-name">${idx + 1}. ${p.name}</div>
                <div><span class="live-lb-score">${p.score}</span><span class="live-lb-time">(${tSecs}s)</span></div>
            `;
            lbList.appendChild(div);
        });
    } else {
        lbContainer.style.display = 'none';
    }
}

function startCountdownAndLaunch() {
    const overlay = document.getElementById('countdown-overlay');
    const numEl = document.getElementById('countdown-number');
    overlay.style.display = 'flex';
    let count = 3;
    numEl.innerText = count;

    const interval = setInterval(() => {
        count--;
        if (count > 0) {
            numEl.innerText = count;
        } else if (count === 0) {
            numEl.innerText = "GO!";
        } else {
            clearInterval(interval);
            overlay.style.display = 'none';
            hudContainer.style.display = 'block';
            startGlobalTimer();

            if(isOnlineMatch) {
                initOnlineGame();
            } else {
                startNewRound();
            }
        }
    }, 1000);
}

function showVSScreenAndStart() {
    const vsOverlay = document.getElementById('vs-overlay');
    const vsList = document.getElementById('vs-players-list');
    if(vsOverlay && vsList) {
        vsOverlay.style.display = 'flex';
        vsList.innerHTML = '';
        
        let playersArr = [];
        if (activeMode === 'multi') {
            if (isOnlineMatch) {
                playersArr = Object.values(multiPlayers).map(p => p.name);
            } else {
                playersArr = Object.values(multiPlayers).map(p => p.name);
            }
        } else {
            playersArr = [currentUser ? (currentUser.displayName || currentUser.email.split('@')[0]) : "Player 1"];
        }
        
        playersArr.forEach((pName, i) => {
            if (i > 0) {
                const vsText = document.createElement('div');
                vsText.innerText = "VS";
                vsText.style.color = "var(--accent-red)";
                vsText.style.fontSize = "1.2rem";
                vsList.appendChild(vsText);
            }
            const pDiv = document.createElement('div');
            pDiv.innerText = pName;
            pDiv.style.color = "var(--text-light)";
            vsList.appendChild(pDiv);
        });

        setTimeout(() => {
            vsOverlay.style.display = 'none';
            startCountdownAndLaunch();
        }, 3000);
    } else {
        startCountdownAndLaunch();
    }
}

function triggerGameStart() {
    setupModal.style.display = 'none';
    currentScore = 0; mistakesCount = 0; totalLettersGuessed = 0; currentTarget = null; currentStreak = 0; performanceHistory = []; totalPlayTimeSec = 0;
    
    currentRound = 1;
    currentTurnIndex = 0;

    if (activeMode === 'multi' && !isOnlineMatch) {
        const oppType = opponentSelect ? opponentSelect.value : 'local';
        isBotMatch = (oppType === 'bot');
        if (botDiffSelect) botAccuracy = parseFloat(botDiffSelect.value);

        const p1In = document.getElementById('multi-p1-name');
        const p2In = document.getElementById('multi-p2-name');
        const name1 = (p1In && p1In.value.trim() !== "") ? p1In.value.trim() : "Player 1";
        const name2 = (p2In && p2In.value.trim() !== "") ? p2In.value.trim() : (isBotMatch ? "A.I. Bot" : "Player 2");
        
        maxRounds = parseInt(multiRoundsSelect.value) || 25;

        multiPlayers = {
            'p1': { name: name1, score: 0, timeMs: 0, streak: 0, history: [] },
            'p2': { name: name2, score: 0, timeMs: 0, streak: 0, history: [] }
        };
        multiOrder = ['p1', 'p2'];
    }

    updateHUDGraph();
    updateLiveLeaderboard();

    if (activePracticeConstellation) {
        let practicePool = targetObjects.filter(obj => 
            !obj.isDSO && obj.correctName && obj.correctName !== "" && 
            obj.bayerName && obj.bayerName.endsWith(` ${activePracticeConstellation}`)
        );
        practiceQueue = [...practicePool];
        shuffleArray(practiceQueue);
        currentPracticeIndex = 0;
    }

    if(scoreDisplay) scoreDisplay.innerText = "0";
    
    if (activeMode !== 'free') {
        showVSScreenAndStart(); 
    } else {
        hudContainer.style.display = 'block';
        startNewRound();
    }
}

btnLaunch.addEventListener('click', () => {
    if (activeMode === 'multi' && isOnlineMatch && onlineRole === 'host') {
        update(ref(db, 'lobbies/' + onlineRoomCode), { status: 'starting' });
        return; 
    }
    isGameRunning = true;
    triggerGameStart();
});

function startGlobalTimer() {
    if (timerInterval) clearInterval(timerInterval);
    if (duelTurnTimer) clearInterval(duelTurnTimer);
    isTimerPaused = false;
    totalPlayTimeSec = 0;
    
    if (activeMode === 'multi') {
        duelTurnSeconds = 15;
        timerDisplay.innerText = "00:15";
        duelTurnTimer = setInterval(() => {
            if(isTimerPaused) return;
            duelTurnSeconds--;
            timerDisplay.innerText = `00:${duelTurnSeconds.toString().padStart(2, '0')}`;
            if(duelTurnSeconds <= 0) {
                if(isOnlineMatch) {
                    let activeId = multiOrder[currentTurnIndex];
                    if(activeId === myClientId) {
                        processAnswer(false, currentTarget, true);
                    }
                } else {
                    processAnswer(false, currentTarget, true);
                }
            }
        }, 1000);
        return;
    }

    if (activePracticeConstellation) {
        totalPracticeMs = 0;
        lastTickMs = performance.now();
        timerInterval = setInterval(() => {
            let now = performance.now();
            let delta = now - lastTickMs;
            lastTickMs = now;
            if (!isTimerPaused) {
                totalPracticeMs += delta;
                totalPlayTimeSec = totalPracticeMs / 1000;
                timerDisplay.innerText = formatTimeMs(totalPracticeMs + (mistakesCount * 3000));
            }
        }, 30); 
    } else if (activeTime === 'unlimited') {
        isUnlimited = true;
        let elapsed = 0;
        timerInterval = setInterval(() => {
            if (isTimerPaused) return; 
            elapsed++;
            totalPlayTimeSec++;
            const mins = String(Math.floor(elapsed / 60)).padStart(2, '0');
            const secs = String(elapsed % 60).padStart(2, '0');
            if(timerDisplay) timerDisplay.innerText = `${mins}:${secs}`;
        }, 1000);
    } else {
        isUnlimited = false;
        remainingTime = parseInt(activeTime) * 60;
        updateTimerUI(remainingTime);
        
        timerInterval = setInterval(() => {
            if (isTimerPaused) return; 
            remainingTime--;
            totalPlayTimeSec++;
            if (remainingTime <= 0) {
                endGameSession();
            } else {
                updateTimerUI(remainingTime);
            }
        }, 1000);
    }
}

function updateTimerUI(totalSeconds) {
    const mins = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
    const secs = String(totalSeconds % 60).padStart(2, '0');
    if(timerDisplay) timerDisplay.innerText = `${mins}:${secs}`;
}

function endGameSession() {
    clearInterval(timerInterval);
    if(duelTurnTimer) clearInterval(duelTurnTimer);
    
    if(isOnlineMatch && onlineRole === 'host' && onlineRoomCode) {
        remove(ref(db, 'lobbies/' + onlineRoomCode));
    }
    if(lobbyListenerUnsubscribe) { lobbyListenerUnsubscribe(); lobbyListenerUnsubscribe = null; }
    if(stateListenerUnsubscribe) { stateListenerUnsubscribe(); stateListenerUnsubscribe = null; }
    if(actionListenerUnsubscribe) { actionListenerUnsubscribe(); actionListenerUnsubscribe = null; }
    if(playersListenerUnsubscribe) { playersListenerUnsubscribe(); playersListenerUnsubscribe = null; }
    
    isGameRunning = false;
    isOnlineMatch = false;
    onlineRole = null;
    onlineRoomCode = null;

    document.getElementById('live-leaderboard').style.display = 'none';

    if (!activePracticeConstellation && activeMode !== 'free' && activeMode !== 'multi' && activeTime !== 'unlimited') {
        saveLeaderboardScore();
    }
    hudContainer.style.display = 'none';
    setupModal.style.display = 'flex';
    updateHighlightRing(null);
    updatePersonalRecords();
    updatePublicLeaderboardView();
    populateLearningSection();
    
    createRoomUI.style.display = 'none';
    joinRoomUI.style.display = 'none';
    if(opponentSelect && opponentSelect.value === 'online') {
        document.getElementById('room-status').innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Awaiting connection...`;
        const js = document.getElementById('join-status');
        if(js) js.style.display = 'none';
        btnLaunch.disabled = true;
        btnLaunch.innerText = "Awaiting connection...";
    }
}

function endPracticeSession(completed = true) {
    clearInterval(timerInterval);
    hudContainer.style.display = 'none';
    updateHighlightRing(null);
    
    const finalMs = totalPracticeMs + (mistakesCount * 3000);
    savePracticeScore(finalMs);
    
    document.getElementById('practice-final-time').innerText = formatTimeMs(finalMs);
    let statusText = completed ? `Completed all stars in ${constellationFullNames[activePracticeConstellation]}` : `Session ended early in ${constellationFullNames[activePracticeConstellation]}`;
    document.getElementById('practice-result-text').innerText = `${statusText} (${dictMode[activeMode]})`;
    
    populatePracticeLeaderboardModal();
    document.getElementById('practice-result-modal').style.display = 'flex';
}

document.getElementById('btn-close-practice')?.addEventListener('click', () => {
    document.getElementById('practice-result-modal').style.display = 'none';
    setupModal.style.display = 'flex';
    unselectPractice(); 
    document.getElementById('target-group').style.display = 'block';
    document.getElementById('diff-group').style.display = 'block';
    document.getElementById('time-group').style.display = 'block';
    checkLaunchReady();
    updatePublicLeaderboardView();
    populateLearningSection();
});

btnEnd.addEventListener('click', () => {
    if(confirm("End current session?")) {
        if (activePracticeConstellation) {
            endPracticeSession(false); 
        } else {
            endGameSession();
        }
    }
});

const highlightGeometry = new THREE.RingGeometry(2.0, 2.3, 32); 
const highlightMaterial = new THREE.MeshBasicMaterial({ color: 0xffeb3b, side: THREE.DoubleSide, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending, depthWrite: false });
const highlightRing = new THREE.Mesh(highlightGeometry, highlightMaterial);
highlightRing.visible = false;
scene.add(highlightRing);

function updateHighlightRing(starObj, hexColor = 0xffeb3b) {
    if (!starObj) { highlightRing.visible = false; return; }
    const raRad = starObj.ra * RA_TO_RAD; const decRad = starObj.dec * DEG_TO_RAD; const r = 100;
    highlightRing.position.set( r * Math.cos(decRad) * Math.sin(raRad), r * Math.sin(decRad), r * Math.cos(decRad) * Math.cos(raRad) );
    highlightRing.lookAt(camera.position); 
    highlightRing.material.color.setHex(hexColor);
    highlightRing.visible = true;
}

function pickRandomTarget() {
    let maxMag = 6.5; 
    if (activeDiff === 'easy') maxMag = 2.0;
    else if (activeDiff === 'medium') maxMag = 4.0;
    else if (activeDiff === 'hard') maxMag = 5.0;

    let baseObjects = targetObjects.filter(obj => obj.mag <= maxMag);
    let playableObjects = baseObjects;
    
    if (activeTarget === 'stars') playableObjects = baseObjects.filter(obj => !obj.isDSO && obj.bayerName && obj.bayerName !== "Necunoscut");
    else if (activeTarget === 'dso') playableObjects = baseObjects.filter(obj => obj.isDSO);

    if (playableObjects.length === 0) return targetObjects[0];

    const namedTargets = playableObjects.filter(s => (s.correctName && s.correctName !== "") || (s.altNames && s.altNames.length > 0));
    const unnamedTargets = playableObjects.filter(s => !s.correctName && (!s.altNames || s.altNames.length === 0));

    if (namedTargets.length > 0 && unnamedTargets.length > 0) {
        if (Math.random() < 0.90) {
            return namedTargets[Math.floor(Math.random() * namedTargets.length)];
        } else {
            return unnamedTargets[Math.floor(Math.random() * unnamedTargets.length)];
        }
    }
    return playableObjects[Math.floor(Math.random() * playableObjects.length)];
}

function initOnlineGame() {
    if(onlineRole === 'host') {
        multiOrder = Object.keys(multiPlayers);
        const firstTarget = pickRandomTarget();
        update(ref(db, 'lobbies/' + onlineRoomCode + '/state'), {
            targetId: firstTarget.id,
            turnIndex: 0, 
            currentRound: 1,
            order: multiOrder
        });
    }

    if(stateListenerUnsubscribe) stateListenerUnsubscribe();
    stateListenerUnsubscribe = onValue(ref(db, 'lobbies/' + onlineRoomCode + '/state'), (snapshot) => {
        const data = snapshot.val();
        if(data) {
            syncOnlineGame(data);
        }
    });

    if(actionListenerUnsubscribe) actionListenerUnsubscribe();
    actionListenerUnsubscribe = onValue(ref(db, 'lobbies/' + onlineRoomCode + '/lastAction'), (snap) => {
        const action = snap.val();
        if(!action) return;
        
        isTimerPaused = true;
        const pName = multiPlayers[action.playerId]?.name || "Player";
        if (action.correct) {
            hudFeedback.innerText = `${pName} got it right! (+${action.points} pts)`;
            hudFeedback.className = "hud-feedback correct";
        } else {
            hudFeedback.innerHTML = `${pName} missed! Target was: <b>${action.targetName.toUpperCase()}</b>`;
            hudFeedback.className = "hud-feedback wrong";
        }
        hudFeedback.style.display = "block";
        btnCheck.style.display = "none";
        
        if (onlineRole === 'host') {
            setTimeout(() => {
                let nextIndex = (currentTurnIndex + 1) % multiOrder.length;
                let nextRound = currentRound;
                if (nextIndex === 0) nextRound++;
                
                update(ref(db, 'lobbies/' + onlineRoomCode + '/state'), {
                    turnIndex: nextIndex,
                    currentRound: nextRound,
                    targetId: pickRandomTarget().id
                });
            }, 2500);
        }
    });

    if(playersListenerUnsubscribe) playersListenerUnsubscribe();
    playersListenerUnsubscribe = onValue(ref(db, `lobbies/${onlineRoomCode}/players`), (snap) => {
        const playersData = snap.val();
        if (playersData) {
            multiPlayers = playersData;
            updateLiveLeaderboard();
        }
    });
}

function syncOnlineGame(data) {
    multiOrder = data.order || [];
    currentTurnIndex = data.turnIndex;
    currentRound = data.currentRound;
    currentTarget = targetObjects.find(s => s.id === data.targetId) || targetObjects[0];

    if (currentRound > maxRounds) {
        let sorted = Object.values(multiPlayers).sort((a,b) => b.score - a.score);
        alert(`GAME OVER! ${sorted[0].name} wins the match!`);
        endGameSession();
        return;
    }

    duelTurnSeconds = 15;
    isTimerPaused = false;
    timerDisplay.innerText = "00:15";
    scoreDisplay.innerText = `Round ${currentRound} / ${maxRounds}`;

    currentSelectedId = null;
    inputGroupName.style.display = 'none';
    inputGroupType.style.display = 'none';
    if(inputGroupMag) inputGroupMag.style.display = 'none';
    inputName.value = "";
    if(inputMag) inputMag.value = "";
    document.getElementById('select-type').value = "";
    hudFeedback.style.display = "none";
    btnCheck.style.display = "block";
    updateHighlightRing(null);

    targetStartTime = performance.now();
    updateHUDGraph();

    let activeId = multiOrder[currentTurnIndex];
    let currName = multiPlayers[activeId]?.name || "Unknown";
    let isMyTurn = (activeId === myClientId);
    
    updateHighlightRing(currentTarget, isMyTurn ? 0x3b82f6 : 0xfbbf24);
    inputGroupName.style.display = 'flex';

    if (isMyTurn) {
        hudInstruction.innerHTML = `<span style="color:var(--accent-blue); font-weight:800;">YOUR TURN:</span> Identify highlighted target`;
        btnCheck.innerText = "Submit Answer";
        btnCheck.disabled = false;
        btnCheck.style.opacity = "1";
        inputName.disabled = false;
        setTimeout(() => { inputName.focus(); }, 100);
    } else {
        hudInstruction.innerHTML = `<span style="color:var(--accent-gold); font-weight:800;">${currName.toUpperCase()} IS ANSWERING...</span>`;
        btnCheck.disabled = true;
        btnCheck.style.opacity = "0.5";
        inputName.disabled = true;
    }

    const raRad = currentTarget.ra * RA_TO_RAD;
    const decRad = currentTarget.dec * DEG_TO_RAD;
    const starPos = new THREE.Vector3(
        100 * Math.cos(decRad) * Math.sin(raRad),
        100 * Math.sin(decRad),
        100 * Math.cos(decRad) * Math.cos(raRad)
    );
    camera.position.copy(starPos).normalize().multiplyScalar(-0.1);
    controls.target.set(0, 0, 0);
    controls.update();
}

function startNewRound() {
    targetStartTime = performance.now();

    updateHUDGraph(); 
    updateLiveLeaderboard();

    if (activeMode === 'multi') {
        if (currentRound > maxRounds) {
            let sorted = Object.values(multiPlayers).sort((a,b) => b.score - a.score);
            alert(`GAME OVER! ${sorted[0].name} wins the match!`);
            endGameSession();
            return;
        }
        duelTurnSeconds = 15;
        timerDisplay.innerText = "00:15";
        scoreDisplay.innerText = `Round ${currentRound} / ${maxRounds}`;
    }

    if (activePracticeConstellation) {
        if (currentPracticeIndex >= practiceQueue.length) {
            endPracticeSession(true);
            return;
        }
        currentTarget = practiceQueue[currentPracticeIndex];
        if(scoreDisplay) scoreDisplay.innerText = `${currentScore} / ${practiceQueue.length}`;
    } else {
        let maxMag = 6.5; 
        if (activeMode !== 'mag') {
            if (activeDiff === 'easy') maxMag = 2.0;
            else if (activeDiff === 'medium') maxMag = 4.0;
            else if (activeDiff === 'hard') maxMag = 5.0;
            else if (activeDiff === 'extreme') maxMag = 6.5;
        }

        let baseObjects = targetObjects.filter(obj => obj.mag <= maxMag);
        let playableObjects = baseObjects;
        
        if (activeTarget === 'stars' || activeMode === 'mag') playableObjects = baseObjects.filter(obj => !obj.isDSO && obj.bayerName && obj.bayerName !== "Necunoscut");
        else if (activeTarget === 'dso') playableObjects = baseObjects.filter(obj => obj.isDSO);

        if (playableObjects.length === 0) return;

        const namedTargets = playableObjects.filter(s => (s.correctName && s.correctName !== "") || (s.altNames && s.altNames.length > 0));
        const unnamedTargets = playableObjects.filter(s => !s.correctName && (!s.altNames || s.altNames.length === 0));

        if ((activeMode === 'name' || activeMode === 'multi') && namedTargets.length > 0 && unnamedTargets.length > 0) {
            if (Math.random() < 0.90) {
                currentTarget = namedTargets[Math.floor(Math.random() * namedTargets.length)];
            } else {
                currentTarget = unnamedTargets[Math.floor(Math.random() * unnamedTargets.length)];
            }
        } else {
            currentTarget = playableObjects[Math.floor(Math.random() * playableObjects.length)];
        }
    }

    currentSelectedId = null;
    inputGroupName.style.display = 'none';
    inputGroupType.style.display = 'none';
    if(inputGroupMag) inputGroupMag.style.display = 'none';
    inputName.value = "";
    if(inputMag) inputMag.value = "";
    document.getElementById('select-type').value = "";
    hudFeedback.className = "hud-feedback";
    hudFeedback.style.display = "none";
    btnCheck.style.display = "block";
    updateHighlightRing(null);

    const mistakesHtml = `<span style="color: var(--accent-red); font-size: 0.85em; font-weight: 700; margin-left: 8px;">(Mistakes: ${mistakesCount})</span>`;
    let prefix = activePracticeConstellation ? `<span style="color: var(--accent-gold); font-size:0.8em; margin-right: 5px;">[${activePracticeConstellation}]</span> ` : '';

    if (activeMode === 'position') {
        hudInstruction.innerHTML = `${prefix}Locate Target: <b>${currentTarget.bayerName || currentTarget.id}</b> ${mistakesHtml}`;
        btnCheck.innerText = "Confirm Target"; 
        btnCheck.disabled = true; 
        btnCheck.style.opacity = "0.5";
    } else if (activeMode === 'name') {
        hudInstruction.innerHTML = `${prefix}Identify traditional name ${mistakesHtml}`;
        btnCheck.innerText = "Submit";
        btnCheck.disabled = false;
        btnCheck.style.opacity = "1";
        updateHighlightRing(currentTarget, 0xffeb3b);
        inputGroupName.style.display = 'flex';
        setTimeout(() => { inputName.focus(); }, 100);
    } else if (activeMode === 'type') {
        hudInstruction.innerHTML = `${prefix}Classify target: <b>${currentTarget.bayerName || currentTarget.id}</b> ${mistakesHtml}`;
        btnCheck.innerText = "Submit";
        btnCheck.disabled = false;
        btnCheck.style.opacity = "1";
        updateHighlightRing(currentTarget, 0xffeb3b);
        inputGroupType.style.display = 'flex';
    } else if (activeMode === 'mag') {
        hudInstruction.innerHTML = `${prefix}Estimate visual magnitude of <b>${currentTarget.bayerName || currentTarget.id}</b> ${mistakesHtml}`;
        btnCheck.innerText = "Submit Magnitude";
        btnCheck.disabled = false;
        btnCheck.style.opacity = "1";
        updateHighlightRing(currentTarget, 0xffeb3b);
        if(inputGroupMag) inputGroupMag.style.display = 'flex';
        setTimeout(() => { if(inputMag) inputMag.focus(); }, 100);
    } else if (activeMode === 'multi') {
        let activeId = multiOrder[currentTurnIndex];
        let activePlayer = multiPlayers[activeId];
        let pColor = activeId === 'p1' ? 'var(--accent-blue)' : 'var(--accent-gold)';
        
        updateHighlightRing(currentTarget, activeId === 'p1' ? 0x3b82f6 : 0xfbbf24);
        inputGroupName.style.display = 'flex';

        if (isBotMatch && activeId === 'p2') {
            hudInstruction.innerHTML = `<span style="color:${pColor}; font-weight:800;">${activePlayer.name.toUpperCase()} IS THINKING...</span>`;
            btnCheck.disabled = true;
            btnCheck.style.opacity = "0.5";
            inputName.disabled = true;
            
            let botDelay = 2000 + Math.random() * 3500; 
            setTimeout(() => {
                if (activeMode !== 'multi' || isTimerPaused) return; 
                const botIsCorrect = Math.random() < botAccuracy;
                processAnswer(botIsCorrect, currentTarget, false);
            }, botDelay);

        } else {
            hudInstruction.innerHTML = `<span style="color:${pColor}; font-weight:800;">${activePlayer.name.toUpperCase()}'S TURN:</span> Identify highlighted target`;
            btnCheck.innerText = "Submit Answer";
            btnCheck.disabled = false;
            btnCheck.style.opacity = "1";
            inputName.disabled = false;
            setTimeout(() => { inputName.focus(); }, 100);
        }
    }

    if (activeMode !== 'free' && activeMode !== 'position') {
        const raRad = currentTarget.ra * RA_TO_RAD;
        const decRad = currentTarget.dec * DEG_TO_RAD;
        const starPos = new THREE.Vector3(
            100 * Math.cos(decRad) * Math.sin(raRad),
            100 * Math.sin(decRad),
            100 * Math.cos(decRad) * Math.cos(raRad)
        );
        camera.position.copy(starPos).normalize().multiplyScalar(-0.1);
        controls.target.set(0, 0, 0);
        controls.update();
    }
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && hudContainer.style.display === 'block') {
        e.preventDefault(); 
        if (btnCheck.style.display !== "none" && !btnCheck.disabled) {
            btnCheck.click();
        }
    }
});

const raycaster = new THREE.Raycaster();
raycaster.params.Points.threshold = 0.8; 
const mouse = new THREE.Vector2();

window.addEventListener('click', (event) => {
    if (event.target.closest('.hud-container') || event.target.closest('.overlay-modal') || event.target.closest('nav') || event.target.closest('#free-roam-card') || event.target.closest('#countdown-overlay') || event.target.closest('#practice-result-modal')) return;
    
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);

    let allIntersects = [];
    if (starPointsMesh) {
        allIntersects = allIntersects.concat(raycaster.intersectObject(starPointsMesh));
    }
    if (dsoPointsMesh) {
        allIntersects = allIntersects.concat(raycaster.intersectObject(dsoPointsMesh));
    }

    if (allIntersects.length > 0) {
        allIntersects.sort((a, b) => a.distanceToRay - b.distanceToRay);
        const bestHit = allIntersects[0];
        
        let clickedObj;
        if (bestHit.object === starPointsMesh) {
            const starOnlyArray = targetObjects.filter(o => !o.isDSO);
            clickedObj = starOnlyArray[bestHit.index];
        } else if (bestHit.object === dsoPointsMesh) {
            const dsoOnlyArray = targetObjects.filter(o => o.isDSO);
            clickedObj = dsoOnlyArray[bestHit.index];
        }

        if (clickedObj) {
            currentSelectedId = clickedObj.id;
            
            if (activeMode === 'free') {
                updateHighlightRing(clickedObj, 0x3b82f6);
                showFreeRoamCard(clickedObj);
            } else if (activeMode === 'position' && btnCheck.style.display !== "none") {
                updateHighlightRing(clickedObj, 0xffeb3b); 
                btnCheck.disabled = false;
                btnCheck.style.opacity = "1";
            }
        }
    } else if (activeMode === 'free') {
        frCard.style.display = 'none';
        updateHighlightRing(null);
        currentSelectedId = null;
    }
});

function showFreeRoamCard(star) {
    document.getElementById('fr-name').innerText = star.correctName ? star.correctName.toUpperCase() : "UNNAMED OBJECT";
    document.getElementById('fr-bayer').innerText = star.bayerName || star.id || `Unknown`;
    document.getElementById('fr-mag').innerText = star.mag.toFixed(2);
    document.getElementById('fr-type').innerText = typeDict[star.correctType] || "Unknown";
    document.getElementById('fr-ra').innerText = star.ra.toFixed(4) + "h";
    document.getElementById('fr-dec').innerText = star.dec.toFixed(4) + "°";
    frCard.style.display = 'block';
}

function processAnswer(isCorrect, starReference, isShotClockExpire = false, customEarnedPoints = 1) {
    btnCheck.style.display = "none";
    hudFeedback.style.display = "block";
    isTimerPaused = true;
    
    let timeTaken = performance.now() - targetStartTime;

    if (activeMode === 'multi') {
        if (isOnlineMatch) {
            let me = multiPlayers[myClientId];
            if (!me.history) me.history = [];
            
            if (isCorrect) {
                me.streak = (me.streak || 0) + 1;
                me.score += customEarnedPoints;
            } else {
                me.streak = 0;
            }
            me.history.push({ correct: isCorrect, time: timeTaken });
            if (me.history.length > 20) me.history.shift();
            me.timeMs += timeTaken;

            update(ref(db, `lobbies/${onlineRoomCode}/players/${myClientId}`), me);

            update(ref(db, `lobbies/${onlineRoomCode}/lastAction`), {
                playerId: myClientId,
                correct: isCorrect,
                points: customEarnedPoints,
                time: timeTaken,
                targetName: currentTarget.correctName || "NONE"
            });
            // Host trece la tura urmatoare din listener
        } else {
            let activeId = multiOrder[currentTurnIndex];
            let activePlayer = multiPlayers[activeId];
            
            if (!activePlayer.history) activePlayer.history = [];
            
            if (isCorrect) {
                activePlayer.streak = (activePlayer.streak || 0) + 1;
                activePlayer.score += customEarnedPoints;
            } else {
                activePlayer.streak = 0;
            }
            activePlayer.history.push({ correct: isCorrect, time: timeTaken });
            if (activePlayer.history.length > 20) activePlayer.history.shift();
            activePlayer.timeMs += timeTaken;

            updateHUDGraph();
            updateLiveLeaderboard();

            if (isCorrect) {
                hudFeedback.innerText = `${activePlayer.name} got it right! (+${customEarnedPoints} pts)`;
                hudFeedback.className = "hud-feedback correct";
                updateHighlightRing(starReference, 0x10b981);
            } else {
                const cName = currentTarget.correctName ? currentTarget.correctName.toUpperCase() : "NONE (Blank)";
                hudFeedback.innerHTML = (isShotClockExpire ? "<b>Time expired!</b> " : "Missed! ") + `Target was: <b>${cName}</b>.`;
                hudFeedback.className = "hud-feedback wrong";
                updateHighlightRing(starReference, 0xef4444);
            }

            setTimeout(() => {
                currentTurnIndex++;
                if(currentTurnIndex >= multiOrder.length) {
                    currentTurnIndex = 0;
                    currentRound++;
                }
                isTimerPaused = false;
                startNewRound();
            }, 2500);
        }
        return;
    }

    if (isCorrect) {
        currentScore += customEarnedPoints;
        currentStreak++;
        
        const streakEl = document.getElementById('streak-display');
        if(streakEl) streakEl.innerText = currentStreak;
        
        performanceHistory.push({ correct: true, time: timeTaken });
        if(performanceHistory.length > 20) performanceHistory.shift();
        updateHUDGraph();

        if (activeMode === 'name') {
            totalLettersGuessed += currentTarget.correctName ? currentTarget.correctName.length : 0;
        }

        let extraText = activeMode === 'mag' ? ` (+${customEarnedPoints} pts)` : "";
        hudFeedback.innerText = `Correct! Target acquired.${extraText}`;
        hudFeedback.className = "hud-feedback correct";
        updateHighlightRing(starReference, 0x10b981);
        
        setTimeout(() => {
            isTimerPaused = false;
            if (activePracticeConstellation) {
                currentPracticeIndex++;
                startNewRound(); 
            } else {
                if(scoreDisplay) scoreDisplay.innerText = currentScore;
                startNewRound();
            }
        }, 1000);

    } else {
        mistakesCount++;
        currentStreak = 0;
        
        const streakEl = document.getElementById('streak-display');
        if(streakEl) streakEl.innerText = currentStreak;
        
        performanceHistory.push({ correct: false, time: timeTaken });
        if(performanceHistory.length > 20) performanceHistory.shift();
        updateHUDGraph();

        let wrongMsg = "Incorrect.";
        if (activeMode === 'name') {
            const correctName = currentTarget.correctName ? currentTarget.correctName.toUpperCase() : "NONE (Leave blank)";
            wrongMsg = `Incorrect. Target was: <b>${correctName}</b>.`;
        } else if (activeMode === 'type') {
            wrongMsg = `Incorrect. Classification was: <b>${typeDict[currentTarget.correctType] || "Unknown"}</b>.`;
        } else if (activeMode === 'position') {
            const clickedName = starReference ? (starReference.bayerName || starReference.id || 'unnamed object') : 'unknown point';
            wrongMsg = `Incorrect. You clicked <b>${clickedName}</b>. Correct target highlighted in green.`;
        } else if (activeMode === 'mag') {
            wrongMsg = `Incorrect (0 pts). Real magnitude was: <b>${currentTarget.mag.toFixed(2)}</b>.`;
        }

        hudFeedback.innerHTML = wrongMsg + ` <span id="penalty-timer" style="color: var(--accent-red); margin-left: 5px; font-weight: bold;">(Wait 4s...)</span>`;
        hudFeedback.className = "hud-feedback wrong";
        updateHighlightRing(starReference, 0xef4444);
        
        let waitTime = 4;
        const penaltyInterval = setInterval(() => {
            waitTime--;
            const pTimer = document.getElementById('penalty-timer');
            if (pTimer && waitTime > 0) {
                pTimer.innerText = `(Wait ${waitTime}s...)`;
            }
        }, 1000);

        setTimeout(() => {
            isTimerPaused = false;
            updateHighlightRing(currentTarget, 0x10b981); 
        }, 1000);

        setTimeout(() => {
            clearInterval(penaltyInterval);
            startNewRound();
        }, 4000);
    }
}

btnCheck.addEventListener('click', () => {
    if (activeMode === 'name' || activeMode === 'multi') {
        const userInput = inputName.value.trim().toLowerCase();
        let isCorrect = false;

        let allValidNames = [];
        if (currentTarget.correctName) allValidNames.push(currentTarget.correctName);
        if (currentTarget.altNames) allValidNames = allValidNames.concat(currentTarget.altNames);

        if (allValidNames.length > 0) {
            for (let name of allValidNames) {
                if (name && getLevenshteinDistance(userInput, name) <= 1) {
                    isCorrect = true;
                    break;
                }
            }
        } else {
            if (userInput === "") isCorrect = true;
        }

        processAnswer(isCorrect, currentTarget);
    } else if (activeMode === 'type') {
        const userType = document.getElementById('select-type').value;
        const isCorrect = (userType === currentTarget.correctType);
        processAnswer(isCorrect, currentTarget);
    } else if (activeMode === 'mag') {
        const userMag = parseFloat(inputMag.value);
        let earnedPoints = 0;

        if (!isNaN(userMag)) {
            const err = parseFloat(Math.abs(userMag - currentTarget.mag).toFixed(2));
            if (err === 0.0) earnedPoints = 5;
            else if (err <= 0.1) earnedPoints = 4;
            else if (err <= 0.2) earnedPoints = 3;
            else if (err <= 0.3) earnedPoints = 2;
            else if (err <= 0.4) earnedPoints = 1;
        }

        const isCorrect = (earnedPoints > 0);
        processAnswer(isCorrect, currentTarget, false, earnedPoints);
    } else if (activeMode === 'position') {
        if (currentSelectedId) {
            const clickedStar = targetObjects.find(s => s.id === currentSelectedId);
            const isCorrect = (currentSelectedId === currentTarget.id);
            processAnswer(isCorrect, clickedStar);
        }
    }
});

function updatePersonalRecords() {
    const listElement = document.getElementById('personal-records-list');
    const nameLabel = document.getElementById('pb-user-name');
    
    if (!listElement || !currentUser) return;
    listElement.innerHTML = '';

    const dName = currentUser.displayName || (currentUser.email ? currentUser.email.split('@')[0] : "Student");
    if(nameLabel) nameLabel.innerText = dName + "'s"; 

    let allScores = JSON.parse(localStorage.getItem('planetariu_leaderboard')) || [];
    let myScores = allScores.filter(s => s.user === dName && s.time !== 'unlimited' && !s.constellation);
    myScores.sort((a, b) => b.points - a.points);
    
    if (myScores.length === 0) {
        listElement.innerHTML = '<li class="empty-msg">No completed sessions yet.</li>';
        return;
    }

    myScores.slice(0, 5).forEach(sc => {
        let categoryScores = allScores.filter(s => s.mode === sc.mode && s.diff === sc.diff && s.time === sc.time && s.target === sc.target);
        categoryScores.sort((a, b) => {
            if (b.points !== a.points) return b.points - a.points;
            return (b.avgNameLength || 0) - (a.avgNameLength || 0);
        });
        
        let globalRank = categoryScores.findIndex(s => s.user === dName) + 1;
        let formattedDate = sc.date ? formatDate(sc.date) : "N/A";
        let targetStr = sc.target ? `<span style="font-size:0.85em; color:var(--accent-blue)">[${dictTarget[sc.target]}]</span>` : "";
        let rateStr = sc.rate ? `<span class="lb-extra" style="color:var(--accent-green); margin-left:8px;">${sc.rate}s/obj</span>` : "";

        const li = document.createElement('li');
        let extraInfo = sc.mode === 'name' ? `<div class="lb-extra" style="margin:0;">(avg ${sc.avgNameLength || 0} chr)</div>` : "";
        li.innerHTML = `
            <div class="lb-user">
                <div><span style="color: var(--accent-gold); font-weight: bold; margin-right: 3px;">#${globalRank}</span> ${dictMode[sc.mode]} ${targetStr}</div>
                <span class="lb-subtext">${dictDiff[sc.diff]} | ${sc.time}m | ${formattedDate}</span>
            </div> 
            <div style="text-align: right;">
                <span class="lb-score">${sc.points} pts</span> ${rateStr}
                ${extraInfo}
            </div>`;
        listElement.appendChild(li);
    });
}

function updatePublicLeaderboardView() {
    const lbSection = document.getElementById('public-leaderboard-section');
    const lbTabs = document.getElementById('lb-tabs');
    
    if (!activeMode || activeMode === 'free' || activeMode === 'multi') {
        lbSection.style.display = 'none';
        return;
    }

    if (activePracticeConstellation) {
        lbSection.style.display = 'block';
        document.getElementById('lb-category-label').innerText = `[PRACT] ${activePracticeConstellation} | ${dictMode[activeMode].toUpperCase()}`;
        lbTabs.style.display = 'none'; 
        
        const listElement = document.getElementById('public-leaderboard-list');
        listElement.innerHTML = '';
        
        let pScores = JSON.parse(localStorage.getItem('planetariu_practice_lb')) || [];
        pScores = pScores.filter(s => s.constellation === activePracticeConstellation && s.mode === activeMode);
        
        let userBests = {};
        pScores.forEach(sc => {
            if (!userBests[sc.user]) userBests[sc.user] = sc;
            else {
                let curr = userBests[sc.user];
                if (sc.points > curr.points || (sc.points === curr.points && sc.timeMs < curr.timeMs)) {
                    userBests[sc.user] = sc;
                }
            }
        });

        let sortedBests = Object.values(userBests);
        sortedBests.sort((a, b) => {
            if (b.points !== a.points) return b.points - a.points;
            return a.timeMs - b.timeMs;
        });
        
        if (sortedBests.length === 0) {
            listElement.innerHTML = '<li class="empty-msg">No practice records yet. Be the first!</li>';
            return;
        }
        
        const dName = currentUser ? (currentUser.displayName || (currentUser.email ? currentUser.email.split('@')[0] : "Student")) : "";

        sortedBests.forEach((sc, idx) => {
            const li = document.createElement('li');
            if (sc.user === dName) li.style.background = 'rgba(255,255,255,0.1)'; 
            let formattedDate = sc.date ? formatDate(sc.date) : "N/A";
            li.innerHTML = `
                <div class="lb-user">
                    <span>${idx + 1}. ${sc.user}</span>
                    <span class="lb-subtext" style="font-size: 0.7em; color: var(--text-muted); margin-top: 2px;">${formattedDate}</span>
                </div> 
                <div style="text-align: right;">
                    <span class="lb-score" style="margin-right: 8px;">${sc.points} pts</span>
                    <div class="lb-score" style="color:var(--accent-green); margin:0;">${formatTimeMs(sc.timeMs)}</div>
                </div>`;
            listElement.appendChild(li);
        });
        
    } else {
        if (!activeDiff || !activeTarget) {
            lbSection.style.display = 'none';
            return;
        }
        
        lbSection.style.display = 'block';
        lbTabs.style.display = 'flex';
        document.getElementById('lb-category-label').innerText = `[${dictTarget[activeTarget].toUpperCase()}] ${activeMode.toUpperCase()} | ${activeDiff.toUpperCase()}`;
        
        const listElement = document.getElementById('public-leaderboard-list');
        listElement.innerHTML = '';
        
        let scores = JSON.parse(localStorage.getItem('planetariu_leaderboard')) || [];
        scores = scores.filter(s => s.mode === activeMode && s.diff === activeDiff && s.time === activeTimeTab && s.target === activeTarget && !s.constellation);
        
        scores.sort((a, b) => {
            if (b.points !== a.points) return b.points - a.points;
            return (b.avgNameLength || 0) - (a.avgNameLength || 0);
        }); 
        
        if (scores.length === 0) {
            listElement.innerHTML = '<li class="empty-msg">No records yet. Be the first!</li>';
            return;
        }
        
        scores.slice(0, 10).forEach((sc, idx) => {
            const li = document.createElement('li');
            let extraInfo = sc.mode === 'name' ? `<span class="lb-extra">(avg ${sc.avgNameLength || 0} chr)</span>` : "";
            let rateStr = sc.rate ? `<span class="lb-extra" style="color:var(--accent-green); margin-left:8px;">${sc.rate}s/obj</span>` : "";
            let formattedDate = sc.date ? formatDate(sc.date) : "N/A";
            li.innerHTML = `
                <div class="lb-user">
                    <span>${idx + 1}. ${sc.user}</span>
                    <span class="lb-subtext" style="font-size: 0.7em; color: var(--text-muted); margin-top: 2px;">${formattedDate}</span>
                </div> 
                <div><span class="lb-score">${sc.points} pts</span> ${rateStr} ${extraInfo}</div>`;
            listElement.appendChild(li);
        });
    }
}

function saveLeaderboardScore() {
    if (!currentUser || activePracticeConstellation || activeMode === 'free' || activeMode === 'multi' || activeTime === 'unlimited') return;
    
    let scores = JSON.parse(localStorage.getItem('planetariu_leaderboard')) || [];
    const dName = currentUser.displayName || (currentUser.email ? currentUser.email.split('@')[0] : "Student");
    
    let avgLen = currentScore > 0 ? parseFloat((totalLettersGuessed / currentScore).toFixed(1)) : 0;
    let rate = currentScore > 0 ? (totalPlayTimeSec / currentScore).toFixed(2) : 0;

    const existingIndex = scores.findIndex(s => s.user === dName && s.mode === activeMode && s.diff === activeDiff && s.time === activeTime && s.target === activeTarget && !s.constellation);
    
    if (existingIndex !== -1) {
        if (currentScore > scores[existingIndex].points || (currentScore === scores[existingIndex].points && avgLen > (scores[existingIndex].avgNameLength || 0))) {
            scores[existingIndex].points = currentScore;
            scores[existingIndex].avgNameLength = activeMode === 'name' ? avgLen : 0;
            scores[existingIndex].date = new Date().toISOString(); 
            scores[existingIndex].rate = rate;
        }
    } else {
        scores.push({
            user: dName,
            target: activeTarget,
            mode: activeMode,
            diff: activeDiff,
            time: activeTime,
            points: currentScore,
            avgNameLength: activeMode === 'name' ? avgLen : 0,
            date: new Date().toISOString(),
            rate: rate
        });
    }
    
    localStorage.setItem('planetariu_leaderboard', JSON.stringify(scores));
}

function savePracticeScore(timeMs) {
    if (!currentUser || !activePracticeConstellation) return;
    let pScores = JSON.parse(localStorage.getItem('planetariu_practice_lb')) || [];
    const dName = currentUser.displayName || (currentUser.email ? currentUser.email.split('@')[0] : "Student");
    
    let existingIndex = pScores.findIndex(s => s.user === dName && s.constellation === activePracticeConstellation && s.mode === activeMode);

    if (existingIndex !== -1) {
        if (currentScore > pScores[existingIndex].points || (currentScore === pScores[existingIndex].points && timeMs < pScores[existingIndex].timeMs)) {
            pScores[existingIndex].points = currentScore;
            pScores[existingIndex].timeMs = timeMs;
            pScores[existingIndex].date = new Date().toISOString();
        }
    } else {
        pScores.push({
            user: dName,
            constellation: activePracticeConstellation,
            mode: activeMode,
            points: currentScore,
            timeMs: timeMs,
            date: new Date().toISOString()
        });
    }
    
    localStorage.setItem('planetariu_practice_lb', JSON.stringify(pScores));
}

function populatePracticeLeaderboardModal() {
    const listElement = document.getElementById('practice-lb-list');
    listElement.innerHTML = '';
    
    let pScores = JSON.parse(localStorage.getItem('planetariu_practice_lb')) || [];
    pScores = pScores.filter(s => s.constellation === activePracticeConstellation && s.mode === activeMode);
    
    let userBests = {};
    pScores.forEach(sc => {
        if (!userBests[sc.user]) userBests[sc.user] = sc;
        else {
            let curr = userBests[sc.user];
            if (sc.points > curr.points || (sc.points === curr.points && sc.timeMs < curr.timeMs)) {
                userBests[sc.user] = sc;
            }
        }
    });

    let sortedBests = Object.values(userBests);
    sortedBests.sort((a, b) => {
        if (b.points !== a.points) return b.points - a.points;
        return a.timeMs - b.timeMs;
    });

    if (sortedBests.length === 0) return;

    const dName = currentUser ? (currentUser.displayName || (currentUser.email ? currentUser.email.split('@')[0] : "Student")) : "";

    sortedBests.forEach((sc, idx) => {
        const li = document.createElement('li');
        if (sc.user === dName) li.style.background = 'rgba(255,255,255,0.1)'; 
        let formattedDate = sc.date ? formatDate(sc.date) : "N/A";
        li.innerHTML = `
            <div class="lb-user">
                <span>${idx + 1}. ${sc.user}</span>
                <span class="lb-subtext" style="font-size: 0.7em; color: var(--text-muted); margin-top: 2px;">${formattedDate}</span>
            </div> 
            <div style="text-align: right;">
                <span class="lb-score" style="margin-right: 8px;">${sc.points} pts</span>
                <div class="lb-score" style="color:var(--accent-green); margin:0;">${formatTimeMs(sc.timeMs)}</div>
            </div>`;
        listElement.appendChild(li);
    });
}

// ==========================================
// 7. START-UP PROCES
// ==========================================
if (typeof initDatabase === "function") {
    initDatabase().then(() => {
        
        targetObjects = astronomyDatabase.filter(star => star.mag > -10);
        
        customStarCorrections.forEach(corr => {
            let star = targetObjects.find(s => s.bayerName === corr.identifier || `HIP ${s.hip}` === corr.identifier);
            if (star) {
                if (corr.correctName !== undefined) star.correctName = corr.correctName.toLowerCase();
                if (corr.correctType !== undefined) star.correctType = corr.correctType.toLowerCase();
                if (corr.altNames !== undefined) star.altNames = corr.altNames.map(n => n.toLowerCase());
            }
        });

        applyStarClassifications();

        buildStarfield(); 
        drawConstellations(); 
        populateLearningSection(); 
    });
}