// ==========================================
// SCENE3D.JS - Logica vizuală Three.js
// ==========================================
import { RA_TO_RAD, DEG_TO_RAD, constellationPairs } from './config.js';

export const scene = new THREE.Scene();
scene.background = new THREE.Color(0x010103);
export const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 0.1);

export let renderer, controls;
export let starPointsMesh, dsoPointsMesh;
export const raycaster = new THREE.Raycaster();
raycaster.params.Points.threshold = 0.8; 
export const mouse = new THREE.Vector2();

let highlightRing;

export function initScene3D() {
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('canvas-container').appendChild(renderer.domElement);
    
    controls = new THREE.OrbitControls(camera, renderer.domElement);
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

    window.addEventListener('resize', () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    });

    const highlightGeometry = new THREE.RingGeometry(2.0, 2.3, 32); 
    const highlightMaterial = new THREE.MeshBasicMaterial({ color: 0xffeb3b, side: THREE.DoubleSide, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending, depthWrite: false }); 
    highlightRing = new THREE.Mesh(highlightGeometry, highlightMaterial); 
    highlightRing.visible = false; 
    scene.add(highlightRing);

    animate();
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

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

export function buildStarfield(targetObjects) {
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

export function drawConstellations(targetObjects) {
    function getConstellationStar(starName) {
        if (starName.startsWith("HIP ")) {
            const hipNumber = parseInt(starName.replace("HIP ", "").trim());
            return targetObjects.find(s => s.hip === hipNumber && !s.isDSO);
        }
        return targetObjects.find(s => s.bayerName === starName && !s.isDSO);
    }

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

export function panCameraToTarget(target) {
    const raRad = target.ra * RA_TO_RAD;
    const decRad = target.dec * DEG_TO_RAD;
    const starPos = new THREE.Vector3(
        100 * Math.cos(decRad) * Math.sin(raRad),
        100 * Math.sin(decRad),
        100 * Math.cos(decRad) * Math.cos(raRad)
    );
    camera.position.copy(starPos).normalize().multiplyScalar(-0.1);
    controls.target.set(0, 0, 0);
    controls.update();
}

export function updateHighlightRing(starObj, hexColor = 0xffeb3b) {
    if (!starObj) { highlightRing.visible = false; return; }
    const raRad = starObj.ra * RA_TO_RAD; const decRad = starObj.dec * DEG_TO_RAD; const r = 100;
    highlightRing.position.set( r * Math.cos(decRad) * Math.sin(raRad), r * Math.sin(decRad), r * Math.cos(decRad) * Math.cos(raRad) );
    highlightRing.lookAt(camera.position); 
    highlightRing.material.color.setHex(hexColor);
    highlightRing.visible = true;
}