// js/planetarium/grids.js
// Builds toggleable 3D celestial coordinate layers (Equatorial, Alt-Az, Ecliptic,
// Constellation Lines, IAU Constellation Boundaries) and draws crisp 2D retina HUD labels.

import {
    CELESTIAL_RADIUS,
    DEG_TO_RAD,
    OBLIQUITY_DEG,
    raDecToCartesian,
    horizontalToEquatorial,
    angularSeparationDeg,
    formatAngleDMS
} from './astronomy.js';
import { IAU_BOUNDARY_SEGMENTS } from './boundaries.js';

const R_GRID = CELESTIAL_RADIUS * 1.006;
const R_LINES = CELESTIAL_RADIUS * 1.003;
const R_BOUNDS = CELESTIAL_RADIUS * 1.005;

function toVec3(raHours, decDeg, radius = R_GRID) {
    const p = raDecToCartesian(raHours, decDeg, radius);
    return new THREE.Vector3(p.x, p.y, p.z);
}

/**
 * 1. Equatorial Grid (J2000 RA / Dec) + highlighted Celestial Equator
 */
export function buildEquatorialGrid() {
    const group = new THREE.Group();
    group.name = 'equatorialGrid';

    const minorMat = new THREE.LineBasicMaterial({ color: 0x35e6ff, transparent: true, opacity: 0.14 });
    const majorMat = new THREE.LineBasicMaterial({ color: 0x35e6ff, transparent: true, opacity: 0.28 });
    const equatorMat = new THREE.LineBasicMaterial({ color: 0x35e6ff, transparent: true, opacity: 0.55 });

    // Declination parallels every 15 deg (-75 to +75)
    for (let dec = -75; dec <= 75; dec += 15) {
        const pts = [];
        const steps = 128;
        for (let i = 0; i <= steps; i++) {
            const ra = (i / steps) * 24;
            pts.push(toVec3(ra, dec, R_GRID));
        }
        const geo = new THREE.BufferGeometry().setFromPoints(pts);
        const mat = dec === 0 ? equatorMat : (dec % 30 === 0 ? majorMat : minorMat);
        group.add(new THREE.Line(geo, mat));
    }

    // RA hour circles every 1h (-82 to +82 deg to keep poles clean)
    for (let ra = 0; ra < 24; ra++) {
        const pts = [];
        for (let dec = -80; dec <= 80; dec += 2.5) {
            pts.push(toVec3(ra, dec, R_GRID));
        }
        const geo = new THREE.BufferGeometry().setFromPoints(pts);
        const mat = ra % 3 === 0 ? majorMat : minorMat;
        group.add(new THREE.Line(geo, mat));
    }

    return group;
}

/**
 * 2. Local Horizon / Alt-Az Grid (dynamically oriented to observer lat/lon & UTC)
 */
export function buildAltAzGrid() {
    const group = new THREE.Group();
    group.name = 'altAzGrid';

    const horizonMat = new THREE.LineBasicMaterial({ color: 0x2be38a, transparent: true, opacity: 0.62 });
    const altMat = new THREE.LineBasicMaterial({ color: 0x2be38a, transparent: true, opacity: 0.18 });
    const azMat = new THREE.LineBasicMaterial({ color: 0x2be38a, transparent: true, opacity: 0.16 });
    const meridianMat = new THREE.LineBasicMaterial({ color: 0x2be38a, transparent: true, opacity: 0.34 });

    // Altitude rings (0 deg horizon through 75 deg)
    for (let alt = 0; alt <= 75; alt += 15) {
        const altRad = alt * DEG_TO_RAD;
        const cosAlt = Math.cos(altRad);
        const sinAlt = Math.sin(altRad);
        const pts = [];
        const steps = 128;
        for (let i = 0; i <= steps; i++) {
            const azRad = (i / steps) * Math.PI * 2;
            pts.push(new THREE.Vector3(
                R_GRID * cosAlt * Math.sin(azRad),
                R_GRID * sinAlt,
                -R_GRID * cosAlt * Math.cos(azRad)
            ));
        }
        const geo = new THREE.BufferGeometry().setFromPoints(pts);
        group.add(new THREE.Line(geo, alt === 0 ? horizonMat : altMat));
    }

    // Azimuth verticals every 30 deg from horizon (0°) to 85°
    for (let az = 0; az < 360; az += 30) {
        const azRad = az * DEG_TO_RAD;
        const pts = [];
        for (let alt = 0; alt <= 85; alt += 2.5) {
            const altRad = alt * DEG_TO_RAD;
            pts.push(new THREE.Vector3(
                R_GRID * Math.cos(altRad) * Math.sin(azRad),
                R_GRID * Math.sin(altRad),
                -R_GRID * Math.cos(altRad) * Math.cos(azRad)
            ));
        }
        const geo = new THREE.BufferGeometry().setFromPoints(pts);
        group.add(new THREE.Line(geo, az % 90 === 0 ? meridianMat : azMat));
    }

    return group;
}

/**
 * Orient the Alt-Az grid group to the exact local horizon basis (East, Zenith, South)
 * for the given observer latitude/longitude and UTC Date.
 */
export function updateAltAzOrientation(altAzGroup, latDeg, lonDeg, date = new Date()) {
    if (!altAzGroup) return;
    const eqZenith = horizontalToEquatorial(90, 0, latDeg, lonDeg, date);
    const eqEast = horizontalToEquatorial(0, 90, latDeg, lonDeg, date);
    const eqSouth = horizontalToEquatorial(0, 180, latDeg, lonDeg, date);

    const vEast = toVec3(eqEast.ra, eqEast.dec, 1).normalize();
    const vZenith = toVec3(eqZenith.ra, eqZenith.dec, 1).normalize();
    const vSouth = toVec3(eqSouth.ra, eqSouth.dec, 1).normalize();

    const basis = new THREE.Matrix4().makeBasis(vEast, vZenith, vSouth);
    altAzGroup.quaternion.setFromRotationMatrix(basis);
}

/**
 * 3. Ecliptic Plane (inclined 23.4393° to Celestial Equator) in warm gold (#FFCF5C)
 */
export function buildEclipticPlane() {
    const group = new THREE.Group();
    group.name = 'eclipticPlane';

    const eps = OBLIQUITY_DEG * DEG_TO_RAD;
    const cosEps = Math.cos(eps);
    const sinEps = Math.sin(eps);

    const pts = [];
    const steps = 180;
    for (let i = 0; i <= steps; i++) {
        const lam = (i / steps) * Math.PI * 2;
        pts.push(new THREE.Vector3(
            R_GRID * cosEps * Math.sin(lam),
            R_GRID * sinEps * Math.sin(lam),
            R_GRID * Math.cos(lam)
        ));
    }
    const lineMat = new THREE.LineBasicMaterial({ color: 0xffcf5c, transparent: true, opacity: 0.62 });
    group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), lineMat));

    // Tick marks every 30° of ecliptic longitude (zodiacal boundaries)
    const tickPositions = [];
    const tickMat = new THREE.LineBasicMaterial({ color: 0xffcf5c, transparent: true, opacity: 0.45 });
    const northEclPole = new THREE.Vector3(-sinEps, cosEps, 0).normalize();
    for (let deg = 0; deg < 360; deg += 30) {
        const lam = deg * DEG_TO_RAD;
        const p = new THREE.Vector3(
            R_GRID * cosEps * Math.sin(lam),
            R_GRID * sinEps * Math.sin(lam),
            R_GRID * Math.cos(lam)
        );
        const tickHalf = 2.0;
        const p1 = p.clone().addScaledVector(northEclPole, -tickHalf).normalize().multiplyScalar(R_GRID);
        const p2 = p.clone().addScaledVector(northEclPole, tickHalf).normalize().multiplyScalar(R_GRID);
        tickPositions.push(p1.x, p1.y, p1.z, p2.x, p2.y, p2.z);
    }
    const tickGeo = new THREE.BufferGeometry();
    tickGeo.setAttribute('position', new THREE.Float32BufferAttribute(tickPositions, 3));
    group.add(new THREE.LineSegments(tickGeo, tickMat));

    return group;
}

/**
 * 4. All 88 Constellation Stick Figures
 */
export function buildConstellationLines(resolvedSegments) {
    const group = new THREE.Group();
    group.name = 'constellationLines';

    const positions = [];
    for (const [starA, starB] of resolvedSegments) {
        const a = raDecToCartesian(starA.ra, starA.dec, R_LINES);
        const b = raDecToCartesian(starB.ra, starB.dec, R_LINES);
        positions.push(a.x, a.y, a.z, b.x, b.y, b.z);
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    const mat = new THREE.LineBasicMaterial({ color: 0x5d8fc9, transparent: true, opacity: 0.48 });
    group.add(new THREE.LineSegments(geo, mat));

    return group;
}

/**
 * 5. IAU Constellation Boundaries (stepped J2000 RA/Dec grid in rose #FFC1CC)
 */
export function buildConstellationBoundaries() {
    const group = new THREE.Group();
    group.name = 'constellationBoundaries';

    const positions = [];
    for (const [ra1, dec1, ra2, dec2] of IAU_BOUNDARY_SEGMENTS) {
        // Subdivide longer arcs so constant-Dec parallels curve smoothly on the sphere
        const dRa = Math.abs(ra2 - ra1);
        const dDec = Math.abs(dec2 - dec1);
        const steps = Math.max(1, Math.ceil(Math.max(dRa * 15, dDec) / 2.5));

        for (let s = 0; s < steps; s++) {
            const t0 = s / steps;
            const t1 = (s + 1) / steps;
            const p0 = raDecToCartesian(ra1 + (ra2 - ra1) * t0, dec1 + (dec2 - dec1) * t0, R_BOUNDS);
            const p1 = raDecToCartesian(ra1 + (ra2 - ra1) * t1, dec1 + (dec2 - dec1) * t1, R_BOUNDS);
            positions.push(p0.x, p0.y, p0.z, p1.x, p1.y, p1.z);
        }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    const mat = new THREE.LineBasicMaterial({ color: 0xffc1cc, transparent: true, opacity: 0.25 });
    group.add(new THREE.LineSegments(geo, mat));

    return group;
}

const _projVec = new THREE.Vector3();
const _camDir = new THREE.Vector3();

function projectToScreen(worldPos, camera, width, height) {
    camera.getWorldDirection(_camDir);
    if (worldPos.dot(_camDir) <= 0.05) return null;

    _projVec.copy(worldPos).project(camera);
    if (_projVec.z > 1 || _projVec.z < -1) return null;

    const x = (_projVec.x * 0.5 + 0.5) * width;
    const y = (-_projVec.y * 0.5 + 0.5) * height;
    if (x < -40 || x > width + 40 || y < -30 || y > height + 30) return null;
    return { x, y };
}

function drawDsoSymbol(ctx, type, x, y, color) {
    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.35;
    ctx.beginPath();

    if (type === 'galaxy') {
        ctx.translate(x, y);
        ctx.rotate(-0.45);
        ctx.ellipse(0, 0, 7.5, 3.6, 0, 0, Math.PI * 2);
        ctx.stroke();
    } else if (type === 'nebula') {
        ctx.rect(x - 5.5, y - 5.5, 11, 11);
        ctx.stroke();
    } else if (type === 'planetary_nebula') {
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x - 8, y); ctx.lineTo(x - 5, y);
        ctx.moveTo(x + 5, y); ctx.lineTo(x + 8, y);
        ctx.moveTo(x, y - 8); ctx.lineTo(x, y - 5);
        ctx.moveTo(x, y + 5); ctx.lineTo(x, y + 8);
        ctx.stroke();
    } else if (type === 'globular_cluster') {
        ctx.arc(x, y, 5.5, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x - 5.5, y); ctx.lineTo(x + 5.5, y);
        ctx.moveTo(x, y - 5.5); ctx.lineTo(x, y + 5.5);
        ctx.stroke();
    } else {
        ctx.setLineDash([2.2, 2.2]);
        ctx.arc(x, y, 5.8, 0, Math.PI * 2);
        ctx.stroke();
    }
    ctx.restore();
}

/**
 * Crisp 2D retina screen-space overlay for Star Labels, DSO Markers,
 * Constellation Names, Horizon Cardinals, Equatorial RA labels, and Angular Separation badge.
 */
export function renderSkyOverlay2D(ctx, width, height, camera, catalog, settings, observer, selection) {
    ctx.clearRect(0, 0, width, height);
    if (!catalog || !camera) return;

    const fov = camera.fov || 58;
    const isDrill = Boolean(settings.isDrillActive);
    const magLimit = settings.magLimit ?? 6.5;

    // 1. Constellation Names (when Constellation Lines or IAU Boundaries are active & not in blind drill)
    if (!isDrill && (settings.constellationLines || settings.constellationBoundaries)) {
        ctx.save();
        ctx.font = '600 10.5px "Space Mono", monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = settings.constellationBoundaries ? 'rgba(255, 193, 204, 0.56)' : 'rgba(147, 197, 253, 0.50)';

        for (const c of catalog.constellations) {
            const p = toVec3(c.ra, c.dec, CELESTIAL_RADIUS);
            const pt = projectToScreen(p, camera, width, height);
            if (!pt) continue;
            ctx.fillText(c.name.toUpperCase(), pt.x, pt.y);
        }
        ctx.restore();
    }

    // 2. Equatorial RA hour markers along Dec = 0°
    if (settings.equatorialGrid) {
        ctx.save();
        ctx.font = '500 10px "Space Mono", monospace';
        ctx.fillStyle = 'rgba(53, 230, 255, 0.65)';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';
        for (let h = 0; h < 24; h += 2) {
            const p = toVec3(h, 0, CELESTIAL_RADIUS);
            const pt = projectToScreen(p, camera, width, height);
            if (!pt) continue;
            ctx.fillText(`${String(h).padStart(2, '0')}h`, pt.x, pt.y - 4);
        }
        ctx.restore();
    }

    // 3. Horizon Cardinal Points & Zenith when Alt-Az Grid is enabled
    if (settings.altAzGrid && observer) {
        const cardinals = [
            { label: 'N', az: 0 },
            { label: 'NE', az: 45 },
            { label: 'E', az: 90 },
            { label: 'SE', az: 135 },
            { label: 'S', az: 180 },
            { label: 'SW', az: 225 },
            { label: 'W', az: 270 },
            { label: 'NW', az: 315 }
        ];
        ctx.save();
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';
        for (const c of cardinals) {
            const eq = horizontalToEquatorial(0, c.az, observer.lat, observer.lon, observer.date);
            const p = toVec3(eq.ra, eq.dec, CELESTIAL_RADIUS);
            const pt = projectToScreen(p, camera, width, height);
            if (!pt) continue;
            const isPrimary = c.label.length === 1;
            ctx.font = isPrimary ? '700 13px "Space Mono", monospace' : '500 10px "Space Mono", monospace';
            ctx.fillStyle = isPrimary ? '#2BE38A' : 'rgba(43, 227, 138, 0.72)';
            ctx.fillText(c.label, pt.x, pt.y - 6);
        }
        const eqZ = horizontalToEquatorial(90, 0, observer.lat, observer.lon, observer.date);
        const ptZ = projectToScreen(toVec3(eqZ.ra, eqZ.dec, CELESTIAL_RADIUS), camera, width, height);
        if (ptZ) {
            ctx.font = '700 10px "Space Mono", monospace';
            ctx.fillStyle = '#2BE38A';
            ctx.fillText('ZENITH', ptZ.x, ptZ.y - 6);
        }
        ctx.restore();
    }

    // 4. DSO Markers (hidden during blind drills)
    if (!isDrill && settings.dsoMarkers) {
        const dsoColorMap = {
            galaxy: 'rgba(179, 156, 208, 0.92)',
            nebula: 'rgba(255, 193, 204, 0.92)',
            planetary_nebula: 'rgba(53, 230, 255, 0.92)',
            open_cluster: 'rgba(255, 207, 92, 0.90)',
            globular_cluster: 'rgba(255, 228, 160, 0.90)',
            other_dso: 'rgba(237, 237, 237, 0.80)'
        };
        // Adaptive DSO declutter: wide FOV shows brighter/iconic DSOs, zoomed in shows all 134
        const dsoMagCutoff = fov > 52 ? 7.2 : (fov > 32 ? 9.2 : 14.0);

        ctx.save();
        ctx.font = '500 10.5px "Space Mono", monospace';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';

        for (const dso of catalog.dsos) {
            if (dso.mag > dsoMagCutoff && !dso.properName && selection?.current?.id !== dso.id) continue;
            const p = toVec3(dso.ra, dso.dec, CELESTIAL_RADIUS);
            const pt = projectToScreen(p, camera, width, height);
            if (!pt) continue;

            const color = dsoColorMap[dso.correctType] || 'rgba(53, 230, 255, 0.88)';
            drawDsoSymbol(ctx, dso.correctType, pt.x, pt.y, color);

            ctx.fillStyle = color;
            const label = fov < 34 && dso.properName ? `${dso.id} ${dso.properName}` : dso.id;
            ctx.fillText(label, pt.x + 10, pt.y);
        }
        ctx.restore();
    }

    // 5. Star Labels (adaptive brightness with FOV zoom, respects Magnitude Limit slider)
    if (!isDrill && settings.starLabels) {
        const labelMagThreshold = Math.min(
            magLimit,
            fov > 55 ? 2.15 : (fov > 35 ? 3.2 : (fov > 20 ? 4.3 : 5.4))
        );

        ctx.save();
        ctx.font = '500 11px "Inter", sans-serif';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';

        for (const star of catalog.stars) {
            if (star.mag > labelMagThreshold) continue;
            const label = star.properName || (fov < 32 ? star.bayerSymbol : '');
            if (!label) continue;

            const p = toVec3(star.ra, star.dec, CELESTIAL_RADIUS);
            const pt = projectToScreen(p, camera, width, height);
            if (!pt) continue;

            ctx.fillStyle = star.properName ? 'rgba(237, 237, 237, 0.88)' : 'rgba(138, 148, 166, 0.78)';
            ctx.fillText(label, pt.x + 8, pt.y - 2);
        }
        ctx.restore();
    }

    // 6. Angular Separation Midpoint Pill when comparing two locked objects
    if (!isDrill && selection?.current && selection?.previous && selection.current.id !== selection.previous.id) {
        const pA = toVec3(selection.previous.ra, selection.previous.dec, 1).normalize();
        const pB = toVec3(selection.current.ra, selection.current.dec, 1).normalize();
        const mid = pA.clone().add(pB);
        if (mid.lengthSq() > 1e-6) {
            mid.normalize().multiplyScalar(CELESTIAL_RADIUS);
            const ptMid = projectToScreen(mid, camera, width, height);
            const sep = angularSeparationDeg(selection.previous, selection.current);
            if (ptMid && sep !== null) {
                const text = `Δθ ${sep.toFixed(2)}° (${formatAngleDMS(sep)})`;
                ctx.save();
                ctx.font = '700 11px "Space Mono", monospace';
                const metrics = ctx.measureText(text);
                const padX = 8;
                const boxW = metrics.width + padX * 2;
                const boxH = 22;
                ctx.fillStyle = 'rgba(16, 17, 21, 0.88)';
                ctx.strokeStyle = 'rgba(53, 230, 255, 0.65)';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.roundRect(ptMid.x - boxW / 2, ptMid.y - boxH / 2, boxW, boxH, 6);
                ctx.fill();
                ctx.stroke();

                ctx.fillStyle = '#35E6FF';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(text, ptMid.x, ptMid.y + 0.5);
                ctx.restore();
            }
        }
    }
}
