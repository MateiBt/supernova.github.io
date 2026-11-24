// js/planetarium/engine.js
// Full-viewport Three.js WebGL 3D Celestial Sphere engine with real-time magnitude
// shader uniforms, smooth camera slewing, spherical picking, and 2D retina HUD overlays.

import { CELESTIAL_RADIUS, RAD_TO_DEG, DEG_TO_RAD, raDecToCartesian } from './astronomy.js';
import {
    buildEquatorialGrid,
    buildAltAzGrid,
    updateAltAzOrientation,
    buildEclipticPlane,
    buildConstellationLines,
    buildConstellationBoundaries,
    renderSkyOverlay2D
} from './grids.js';

const CAMERA_RADIUS = 0.1;

function createReticleRing(colorHex, innerR = 1.65, outerR = 2.05) {
    const geo = new THREE.RingGeometry(innerR, outerR, 48);
    const mat = new THREE.MeshBasicMaterial({
        color: colorHex,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.92,
        depthTest: false
    });
    const ring = new THREE.Mesh(geo, mat);
    ring.visible = false;
    ring.renderOrder = 10;
    return ring;
}

export class PlanetariumEngine {
    constructor(canvasContainer, overlayCanvas) {
        this.container = canvasContainer;
        this.overlayCanvas = overlayCanvas;
        this.overlayCtx = overlayCanvas ? overlayCanvas.getContext('2d') : null;

        this.catalog = null;
        this.unitVectors = [];
        this.layers = {};
        this.starField = null;
        this.starMaterial = null;

        this.settings = {
            equatorialGrid: false,
            altAzGrid: false,
            eclipticPlane: true,
            constellationLines: true,
            constellationBoundaries: false,
            starLabels: true,
            dsoMarkers: true,
            magLimit: 6.5,
            dsoPointVisible: true,
            isDrillActive: false
        };

        this.observer = {
            lat: 45.0,
            lon: 25.0,
            date: new Date()
        };

        this.selection = {
            current: null,
            previous: null
        };

        this.slew = null;
        this.onObjectClick = null;
        this.onViewChange = null;
        this.animationFrameId = null;
        this.lastAltAzSyncMs = 0;

        this._initScene();
        this._bindEvents();
    }

    _initScene() {
        const width = this.container.clientWidth || window.innerWidth;
        const height = this.container.clientHeight || window.innerHeight;

        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x06070a);

        this.camera = new THREE.PerspectiveCamera(58, width / height, 0.01, 1000);
        // Initial dramatic view facing Orion / Winter Hexagon (RA ~5.6h, Dec ~+4°)
        const initDir = raDecToCartesian(5.55, 4.0, 1);
        this.camera.position.set(
            -initDir.x * CAMERA_RADIUS,
            -initDir.y * CAMERA_RADIUS,
            -initDir.z * CAMERA_RADIUS
        );

        this.renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
        this.renderer.setSize(width, height);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        this.container.appendChild(this.renderer.domElement);

        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableZoom = false;
        this.controls.enablePan = false;
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.08;
        this.controls.rotateSpeed = -0.42;
        this.controls.target.set(0, 0, 0);
        this.controls.update();

        // Cancel smooth slew if user grabs the sky
        this.controls.addEventListener('start', () => {
            this.slew = null;
        });

        // Target lock rings & great-circle separation arc
        this.primaryRing = createReticleRing(0x35e6ff, 1.55, 1.95);
        this.secondaryRing = createReticleRing(0xffc1cc, 1.25, 1.55);
        this.scene.add(this.primaryRing);
        this.scene.add(this.secondaryRing);

        this.separationArcMat = new THREE.LineBasicMaterial({
            color: 0x35e6ff,
            transparent: true,
            opacity: 0.78,
            depthTest: false
        });
        this.separationArc = new THREE.Line(new THREE.BufferGeometry(), this.separationArcMat);
        this.separationArc.visible = false;
        this.separationArc.renderOrder = 9;
        this.scene.add(this.separationArc);

        this._resizeOverlay(width, height);
    }

    _resizeOverlay(width, height) {
        if (!this.overlayCanvas) return;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        this.overlayCanvas.width = Math.max(1, Math.floor(width * dpr));
        this.overlayCanvas.height = Math.max(1, Math.floor(height * dpr));
        this.overlayCanvas.style.width = `${width}px`;
        this.overlayCanvas.style.height = `${height}px`;
        if (this.overlayCtx) {
            this.overlayCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
        }
    }

    _bindEvents() {
        this._handleResize = () => {
            const width = this.container.clientWidth || window.innerWidth;
            const height = this.container.clientHeight || window.innerHeight;
            this.camera.aspect = width / height;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(width, height);
            this._resizeOverlay(width, height);
        };
        window.addEventListener('resize', this._handleResize);

        // Smooth FOV zoom on scroll wheel
        const domEl = this.renderer.domElement;
        domEl.addEventListener('wheel', (e) => {
            e.preventDefault();
            this.slew = null;
            const delta = e.deltaY * 0.04;
            this.setFov(this.camera.fov + delta);
        }, { passive: false });

        // Pinch-to-zoom on touch screens
        let lastPinchDist = null;
        domEl.addEventListener('touchstart', (e) => {
            if (e.touches.length === 2) {
                const dx = e.touches[0].clientX - e.touches[1].clientX;
                const dy = e.touches[0].clientY - e.touches[1].clientY;
                lastPinchDist = Math.hypot(dx, dy);
            }
        }, { passive: true });
        domEl.addEventListener('touchmove', (e) => {
            if (e.touches.length === 2 && lastPinchDist !== null) {
                const dx = e.touches[0].clientX - e.touches[1].clientX;
                const dy = e.touches[0].clientY - e.touches[1].clientY;
                const dist = Math.hypot(dx, dy);
                const diff = (lastPinchDist - dist) * 0.14;
                lastPinchDist = dist;
                this.setFov(this.camera.fov + diff);
            }
        }, { passive: true });
        domEl.addEventListener('touchend', () => { lastPinchDist = null; }, { passive: true });

        // Clean click vs drag discrimination
        let downX = 0;
        let downY = 0;
        let pointerMoved = false;

        domEl.addEventListener('pointerdown', (e) => {
            if (e.button !== 0 && e.pointerType === 'mouse') return;
            downX = e.clientX;
            downY = e.clientY;
            pointerMoved = false;
        });

        domEl.addEventListener('pointermove', (e) => {
            if (Math.hypot(e.clientX - downX, e.clientY - downY) > 6) {
                pointerMoved = true;
            }
        });

        domEl.addEventListener('pointerup', (e) => {
            if (e.button !== 0 && e.pointerType === 'mouse') return;
            if (pointerMoved) return;
            const hit = this.pickObjectAtClientPos(e.clientX, e.clientY);
            if (this.onObjectClick) {
                this.onObjectClick(hit);
            }
        });
    }

    loadCatalogIntoScene(catalog) {
        this.catalog = catalog;

        // Build star & DSO particle geometry + real-time GLSL shader
        const count = catalog.objects.length;
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);
        const mags = new Float32Array(count);
        const isDsos = new Float32Array(count);
        const sizes = new Float32Array(count);

        this.unitVectors = new Array(count);
        const cTmp = new THREE.Color();

        for (let i = 0; i < count; i++) {
            const obj = catalog.objects[i];
            const pos = raDecToCartesian(obj.ra, obj.dec, CELESTIAL_RADIUS);
            positions[i * 3] = pos.x;
            positions[i * 3 + 1] = pos.y;
            positions[i * 3 + 2] = pos.z;

            const u = raDecToCartesian(obj.ra, obj.dec, 1);
            this.unitVectors[i] = new THREE.Vector3(u.x, u.y, u.z);

            cTmp.setHex(obj.color);
            colors[i * 3] = cTmp.r;
            colors[i * 3 + 1] = cTmp.g;
            colors[i * 3 + 2] = cTmp.b;

            mags[i] = obj.mag;
            isDsos[i] = obj.isDSO ? 1.0 : 0.0;

            if (obj.isDSO) {
                sizes[i] = Math.max(7.0, 12.0 - obj.mag * 0.4);
            } else {
                // Photometric-inspired point sizing
                const clamped = Math.max(-1.5, Math.min(6.5, obj.mag));
                sizes[i] = Math.max(2.1, Math.pow(6.8 - clamped, 1.38) * 1.15);
            }
        }

        const geo = new THREE.BufferGeometry();
        geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        geo.setAttribute('aMag', new THREE.BufferAttribute(mags, 1));
        geo.setAttribute('aIsDso', new THREE.BufferAttribute(isDsos, 1));
        geo.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));

        this.starMaterial = new THREE.ShaderMaterial({
            uniforms: {
                uMagLimit: { value: this.settings.magLimit },
                uDsoVisible: { value: this.settings.dsoPointVisible ? 1.0 : 0.0 },
                uPixelRatio: { value: Math.min(window.devicePixelRatio || 1, 2) },
                uFovFactor: { value: 1.0 }
            },
            vertexShader: `
                attribute float aMag;
                attribute float aIsDso;
                attribute float aSize;
                uniform float uMagLimit;
                uniform float uDsoVisible;
                uniform float uPixelRatio;
                uniform float uFovFactor;
                varying vec3 vColor;
                varying float vAlpha;
                varying float vIsDso;

                void main() {
                    vColor = color;
                    vIsDso = aIsDso;

                    if (aIsDso > 0.5) {
                        if (uDsoVisible < 0.5) {
                            vAlpha = 0.0;
                            gl_PointSize = 0.0;
                        } else {
                            vAlpha = 0.72;
                            gl_PointSize = clamp(aSize * uPixelRatio * (0.75 + 0.35 * uFovFactor), 4.0, 22.0);
                        }
                    } else {
                        if (aMag > uMagLimit) {
                            vAlpha = 0.0;
                            gl_PointSize = 0.0;
                        } else {
                            float fade = smoothstep(uMagLimit + 0.15, uMagLimit - 0.65, aMag);
                            vAlpha = mix(0.32, 1.0, fade);
                            gl_PointSize = clamp(aSize * uPixelRatio * uFovFactor, 2.0, 26.0);
                        }
                    }

                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                varying vec3 vColor;
                varying float vAlpha;
                varying float vIsDso;

                void main() {
                    if (vAlpha <= 0.01) discard;
                    vec2 uv = gl_PointCoord - vec2(0.5);
                    float d = length(uv);
                    if (d > 0.5) discard;

                    if (vIsDso > 0.5) {
                        float glow = exp(-d * d * 10.0) * 0.85;
                        gl_FragColor = vec4(vColor, glow * vAlpha);
                    } else {
                        float core = smoothstep(0.26, 0.04, d);
                        float halo = exp(-d * d * 16.0) * 0.75;
                        vec3 col = mix(vColor, vec3(1.0), core * 0.55);
                        float alpha = clamp(core + halo, 0.0, 1.0) * vAlpha;
                        gl_FragColor = vec4(col, alpha);
                    }
                }
            `,
            vertexColors: true,
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending
        });

        this.starField = new THREE.Points(geo, this.starMaterial);
        this.scene.add(this.starField);

        // Build all 5 celestial coordinate & constellation layers
        this.layers.equatorialGrid = buildEquatorialGrid();
        this.layers.altAzGrid = buildAltAzGrid();
        this.layers.eclipticPlane = buildEclipticPlane();
        this.layers.constellationLines = buildConstellationLines(catalog.resolvedLineSegments);
        this.layers.constellationBoundaries = buildConstellationBoundaries();

        Object.values(this.layers).forEach(layer => this.scene.add(layer));
        this.applySettings(this.settings);
        this.syncAltAzGrid(true);
    }

    applySettings(partial) {
        Object.assign(this.settings, partial);

        if (this.layers.equatorialGrid) {
            this.layers.equatorialGrid.visible = Boolean(this.settings.equatorialGrid);
        }
        if (this.layers.altAzGrid) {
            this.layers.altAzGrid.visible = Boolean(this.settings.altAzGrid);
        }
        if (this.layers.eclipticPlane) {
            this.layers.eclipticPlane.visible = Boolean(this.settings.eclipticPlane);
        }
        if (this.layers.constellationLines) {
            this.layers.constellationLines.visible = Boolean(this.settings.constellationLines);
        }
        if (this.layers.constellationBoundaries) {
            this.layers.constellationBoundaries.visible = Boolean(this.settings.constellationBoundaries);
        }
        if (this.starMaterial) {
            this.starMaterial.uniforms.uMagLimit.value = Number(this.settings.magLimit);
            this.starMaterial.uniforms.uDsoVisible.value = this.settings.dsoPointVisible ? 1.0 : 0.0;
        }
        if (this.overlayCtx && this.settings.isDrillActive) {
            const width = this.container.clientWidth || window.innerWidth;
            const height = this.container.clientHeight || window.innerHeight;
            this.overlayCtx.clearRect(0, 0, width, height);
        }
    }

    setObserver(lat, lon) {
        this.observer.lat = lat;
        this.observer.lon = lon;
        this.syncAltAzGrid(true);
    }

    syncAltAzGrid(force = false) {
        const now = performance.now();
        if (!force && now - this.lastAltAzSyncMs < 1000) return;
        this.lastAltAzSyncMs = now;
        this.observer.date = new Date();
        if (this.layers.altAzGrid) {
            updateAltAzOrientation(this.layers.altAzGrid, this.observer.lat, this.observer.lon, this.observer.date);
        }
    }

    setFov(nextFov) {
        const clamped = Math.max(8, Math.min(85, nextFov));
        this.camera.fov = clamped;
        this.camera.updateProjectionMatrix();
        if (this.starMaterial) {
            // Gently boost star crispness when zoomed in
            this.starMaterial.uniforms.uFovFactor.value = Math.min(1.55, Math.max(0.75, 58 / clamped * 0.45 + 0.55));
        }
        if (this.onViewChange) this.onViewChange(clamped);
    }

    zoomBy(deltaFov) {
        this.slew = null;
        this.setFov(this.camera.fov + deltaFov);
    }

    /**
     * Smoothly slew the 3D observatory camera to (raHours, decDeg) with optional target FOV.
     */
    slewToRaDec(raHours, decDeg, targetFov = null, durationMs = 680) {
        const destLook = raDecToCartesian(raHours, decDeg, 1);
        const endCamDir = new THREE.Vector3(-destLook.x, -destLook.y, -destLook.z).normalize();
        const startCamDir = this.camera.position.clone().normalize();

        this.slew = {
            startCamDir,
            endCamDir,
            startFov: this.camera.fov,
            endFov: targetFov !== null ? Math.max(8, Math.min(85, targetFov)) : this.camera.fov,
            startTime: performance.now(),
            duration: durationMs
        };
    }

    /**
     * Place primary reticle ring on an object (with color override for drill feedback).
     */
    setPrimaryHighlight(obj, colorHex = 0x35e6ff) {
        if (!obj) {
            this.primaryRing.visible = false;
            return;
        }
        const pos = raDecToCartesian(obj.ra, obj.dec, CELESTIAL_RADIUS);
        this.primaryRing.position.set(pos.x, pos.y, pos.z);
        this.primaryRing.lookAt(0, 0, 0);
        this.primaryRing.material.color.setHex(colorHex);
        this.primaryRing.visible = true;
    }

    /**
     * Update Observatory dual-object lock & great-circle angular separation arc.
     */
    setObservatorySelection(currentObj, previousObj) {
        this.selection.current = currentObj || null;
        this.selection.previous = previousObj || null;

        this.setPrimaryHighlight(currentObj, 0x35e6ff);

        if (previousObj && currentObj && previousObj.id !== currentObj.id) {
            const pPrev = raDecToCartesian(previousObj.ra, previousObj.dec, CELESTIAL_RADIUS);
            this.secondaryRing.position.set(pPrev.x, pPrev.y, pPrev.z);
            this.secondaryRing.lookAt(0, 0, 0);
            this.secondaryRing.visible = true;

            // Build spherical great-circle arc between previous and current
            const vA = new THREE.Vector3(pPrev.x, pPrev.y, pPrev.z).normalize();
            const pCurr = raDecToCartesian(currentObj.ra, currentObj.dec, CELESTIAL_RADIUS);
            const vB = new THREE.Vector3(pCurr.x, pCurr.y, pCurr.z).normalize();

            const dot = Math.max(-1, Math.min(1, vA.dot(vB)));
            const omega = Math.acos(dot);
            const steps = 64;
            const pts = [];
            for (let i = 0; i <= steps; i++) {
                const t = i / steps;
                let v;
                if (omega < 1e-4) {
                    v = vA.clone().lerp(vB, t).normalize();
                } else {
                    const sinO = Math.sin(omega);
                    const sA = Math.sin((1 - t) * omega) / sinO;
                    const sB = Math.sin(t * omega) / sinO;
                    v = new THREE.Vector3(
                        vA.x * sA + vB.x * sB,
                        vA.y * sA + vB.y * sB,
                        vA.z * sA + vB.z * sB
                    ).normalize();
                }
                pts.push(v.multiplyScalar(CELESTIAL_RADIUS * 0.995));
            }
            this.separationArc.geometry.dispose();
            this.separationArc.geometry = new THREE.BufferGeometry().setFromPoints(pts);
            this.separationArc.visible = true;
        } else {
            this.secondaryRing.visible = false;
            this.separationArc.visible = false;
        }
    }

    /**
     * Exact angular spherical picking of the nearest visible star or DSO under (clientX, clientY).
     */
    pickObjectAtClientPos(clientX, clientY) {
        if (!this.catalog || this.unitVectors.length === 0) return null;

        const rect = this.renderer.domElement.getBoundingClientRect();
        const ndcX = ((clientX - rect.left) / rect.width) * 2 - 1;
        const ndcY = -((clientY - rect.top) / rect.height) * 2 + 1;

        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera({ x: ndcX, y: ndcY }, this.camera);
        const rayDir = raycaster.ray.direction.clone().normalize();

        // Adaptive angular threshold based on current FOV
        const maxAngleDeg = Math.max(0.45, Math.min(2.6, this.camera.fov * 0.032));
        const minCos = Math.cos(maxAngleDeg * DEG_TO_RAD);

        const magLimit = this.settings.magLimit;
        const dsoVisible = this.settings.dsoPointVisible;

        let bestObj = null;
        let bestScore = Infinity;

        const objects = this.catalog.objects;
        for (let i = 0; i < objects.length; i++) {
            const obj = objects[i];
            if (obj.isDSO) {
                if (!dsoVisible) continue;
            } else if (obj.mag > magLimit) {
                continue;
            }

            const dot = rayDir.dot(this.unitVectors[i]);
            if (dot < minCos) continue;

            const angDeg = Math.acos(Math.min(1, dot)) * RAD_TO_DEG;
            // Small brightness bonus so bright stars/iconic DSOs win overlapping hits
            const magBonus = obj.isDSO ? -0.18 : Math.max(-0.28, (obj.mag - 4.0) * 0.05);
            const score = angDeg + magBonus;
            if (score < bestScore) {
                bestScore = score;
                bestObj = obj;
            }
        }

        return bestObj;
    }

    start() {
        const renderLoop = (now) => {
            this.animationFrameId = requestAnimationFrame(renderLoop);

            // Process active camera slew
            if (this.slew) {
                const elapsed = now - this.slew.startTime;
                const rawT = Math.min(1, elapsed / this.slew.duration);
                const t = 1 - Math.pow(1 - rawT, 3); // cubic ease-out

                const qStart = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), this.slew.startCamDir);
                const qEnd = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), this.slew.endCamDir);
                const qCur = new THREE.Quaternion();
                qCur.slerpQuaternions(qStart, qEnd, t);

                const dir = new THREE.Vector3(0, 0, 1).applyQuaternion(qCur).normalize();
                this.camera.position.copy(dir.multiplyScalar(CAMERA_RADIUS));

                if (Math.abs(this.slew.endFov - this.slew.startFov) > 0.05) {
                    this.setFov(this.slew.startFov + (this.slew.endFov - this.slew.startFov) * t);
                }

                if (rawT >= 1) {
                    this.slew = null;
                }
            }

            this.controls.update();
            this.syncAltAzGrid(false);

            // Scale reticle rings gracefully with FOV so they remain crisp zoomed in or out
            const ringScale = Math.max(0.32, Math.min(1.45, this.camera.fov / 52));
            if (this.primaryRing.visible) this.primaryRing.scale.setScalar(ringScale);
            if (this.secondaryRing.visible) this.secondaryRing.scale.setScalar(ringScale);

            this.renderer.render(this.scene, this.camera);

            if (this.overlayCtx && this.catalog) {
                const width = this.container.clientWidth || window.innerWidth;
                const height = this.container.clientHeight || window.innerHeight;
                renderSkyOverlay2D(
                    this.overlayCtx,
                    width,
                    height,
                    this.camera,
                    this.catalog,
                    this.settings,
                    this.observer,
                    this.selection
                );
            }
        };

        this.animationFrameId = requestAnimationFrame(renderLoop);
    }

    destroy() {
        if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId);
        window.removeEventListener('resize', this._handleResize);
        this.renderer.dispose();
    }
}
