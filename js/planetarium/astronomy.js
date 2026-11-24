// js/planetarium/astronomy.js
// Celestial coordinate transformations, sidereal time, Alt/Az telemetry,
// angular separation, and formatting helpers for the 3D Planetarium.

export const RA_TO_RAD = (Math.PI * 2) / 24;
export const DEG_TO_RAD = Math.PI / 180;
export const RAD_TO_DEG = 180 / Math.PI;
export const CELESTIAL_RADIUS = 100;
export const OBLIQUITY_DEG = 23.4392911;

/**
 * Convert J2000 equatorial coordinates (RA in hours, Dec in degrees) to
 * a 3D Cartesian vector on the celestial sphere.
 * Preserves the repository's canonical Three.js sphere convention:
 *   x = r cos(dec) sin(ra)
 *   y = r sin(dec)
 *   z = r cos(dec) cos(ra)
 */
export function raDecToCartesian(raHours, decDeg, radius = CELESTIAL_RADIUS) {
    const raRad = raHours * RA_TO_RAD;
    const decRad = decDeg * DEG_TO_RAD;
    const cosDec = Math.cos(decRad);
    return {
        x: radius * cosDec * Math.sin(raRad),
        y: radius * Math.sin(decRad),
        z: radius * cosDec * Math.cos(raRad)
    };
}

/**
 * Compute Julian Date from a JS Date object (UTC).
 */
export function dateToJulianDate(date = new Date()) {
    return date.getTime() / 86400000 + 2440587.5;
}

/**
 * Compute Greenwich Mean Sidereal Time in hours [0, 24) using IAU 2006 / USNO formula.
 */
export function computeGMSTHours(date = new Date()) {
    const jd = dateToJulianDate(date);
    const d = jd - 2451545.0;
    const t = d / 36525.0;
    let gmstDeg = 280.46061837 + 360.98564736629 * d + 0.000387933 * t * t - (t * t * t) / 38710000.0;
    gmstDeg = ((gmstDeg % 360) + 360) % 360;
    return gmstDeg / 15.0;
}

/**
 * Compute Local Sidereal Time in hours [0, 24) for an observer longitude (East positive, degrees).
 */
export function computeLSTHours(date = new Date(), lonDeg = 25.0) {
    const gmst = computeGMSTHours(date);
    return (((gmst + lonDeg / 15.0) % 24) + 24) % 24;
}

/**
 * Convert equatorial (RA hours, Dec deg) to horizontal (Alt deg, Az deg N->E)
 * for an observer at (latDeg, lonDeg) at UTC Date `date`.
 */
export function equatorialToHorizontal(raHours, decDeg, latDeg = 45.0, lonDeg = 25.0, date = new Date()) {
    const lst = computeLSTHours(date, lonDeg);
    const haRad = (lst - raHours) * RA_TO_RAD;
    const decRad = decDeg * DEG_TO_RAD;
    const latRad = latDeg * DEG_TO_RAD;

    const sinAlt = Math.sin(decRad) * Math.sin(latRad) + Math.cos(decRad) * Math.cos(latRad) * Math.cos(haRad);
    const altRad = Math.asin(Math.max(-1, Math.min(1, sinAlt)));
    const cosAlt = Math.cos(altRad);

    let azDeg = 0;
    if (Math.abs(cosAlt) > 1e-8) {
        const sinAz = (-Math.cos(decRad) * Math.sin(haRad)) / cosAlt;
        const cosAz = (Math.sin(decRad) - Math.sin(latRad) * sinAlt) / (Math.cos(latRad) * cosAlt);
        azDeg = ((Math.atan2(sinAz, cosAz) * RAD_TO_DEG) % 360 + 360) % 360;
    }

    return { alt: altRad * RAD_TO_DEG, az: azDeg, lst };
}

/**
 * Convert horizontal (Alt deg, Az deg N->E) back to equatorial (RA hours, Dec deg).
 * Used for orienting the live Alt-Az celestial grid on the 3D sphere.
 */
export function horizontalToEquatorial(altDeg, azDeg, latDeg = 45.0, lonDeg = 25.0, date = new Date()) {
    const lst = computeLSTHours(date, lonDeg);
    const altRad = altDeg * DEG_TO_RAD;
    const azRad = azDeg * DEG_TO_RAD;
    const latRad = latDeg * DEG_TO_RAD;

    const sinDec = Math.sin(altRad) * Math.sin(latRad) + Math.cos(altRad) * Math.cos(latRad) * Math.cos(azRad);
    const decRad = Math.asin(Math.max(-1, Math.min(1, sinDec)));
    const cosDec = Math.cos(decRad);

    let haHours = 0;
    if (Math.abs(cosDec) > 1e-8) {
        const sinHa = (-Math.cos(altRad) * Math.sin(azRad)) / cosDec;
        const cosHa = (Math.sin(altRad) - Math.sin(latRad) * sinDec) / (Math.cos(latRad) * cosDec);
        haHours = Math.atan2(sinHa, cosHa) / RA_TO_RAD;
    }

    const raHours = (((lst - haHours) % 24) + 24) % 24;
    return { ra: raHours, dec: decRad * RAD_TO_DEG };
}

/**
 * Exact spherical angular separation (in degrees) between two objects with (ra [h], dec [deg]).
 */
export function angularSeparationDeg(objA, objB) {
    if (!objA || !objB) return null;
    const dRa = (objB.ra - objA.ra) * RA_TO_RAD;
    const dec1 = objA.dec * DEG_TO_RAD;
    const dec2 = objB.dec * DEG_TO_RAD;
    const sinHalfDec = Math.sin((dec2 - dec1) / 2);
    const sinHalfRa = Math.sin(dRa / 2);
    const a = sinHalfDec * sinHalfDec + Math.cos(dec1) * Math.cos(dec2) * sinHalfRa * sinHalfRa;
    const c = 2 * Math.asin(Math.min(1, Math.sqrt(Math.max(0, a))));
    return c * RAD_TO_DEG;
}

export function formatRA(raHours) {
    const norm = (((raHours % 24) + 24) % 24);
    const h = Math.floor(norm);
    const remM = (norm - h) * 60;
    const m = Math.floor(remM);
    const s = (remM - m) * 60;
    return `${String(h).padStart(2, '0')}h ${String(m).padStart(2, '0')}m ${s.toFixed(1).padStart(4, '0')}s`;
}

export function formatDec(decDeg) {
    const sign = decDeg < 0 ? '−' : '+';
    const abs = Math.abs(decDeg);
    const d = Math.floor(abs);
    const remM = (abs - d) * 60;
    const m = Math.floor(remM);
    const s = Math.round((remM - m) * 60);
    if (s === 60) return `${sign}${String(d).padStart(2, '0')}° ${String(m + 1).padStart(2, '0')}' 00"`;
    return `${sign}${String(d).padStart(2, '0')}° ${String(m).padStart(2, '0')}' ${String(s).padStart(2, '0')}"`;
}

export function formatAngleDMS(deg) {
    const abs = Math.abs(deg);
    const d = Math.floor(abs);
    const remM = (abs - d) * 60;
    const m = Math.floor(remM);
    const s = Math.round((remM - m) * 60);
    return `${d}° ${String(m).padStart(2, '0')}' ${String(s).padStart(2, '0')}"`;
}

export function formatAzimuthCardinal(azDeg) {
    const dirs = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    const idx = Math.round((((azDeg % 360) + 360) % 360) / 22.5) % 16;
    return dirs[idx];
}

export function getLevenshteinDistance(a, b) {
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;
    const matrix = [];
    for (let i = 0; i <= b.length; i++) matrix[i] = [i];
    for (let j = 0; j <= a.length; j++) matrix[0][j] = j;
    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            if (b.charAt(i - 1) === a.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1,
                    matrix[i][j - 1] + 1,
                    matrix[i - 1][j] + 1
                );
            }
        }
    }
    return matrix[b.length][a.length];
}

export function formatDate(isoString) {
    if (!isoString) return '—';
    const d = new Date(isoString);
    if (isNaN(d.getTime())) return '—';
    return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
}

export function formatTimeMs(ms) {
    const clamped = Math.max(0, ms);
    const totalS = Math.floor(clamped / 1000);
    const m = Math.floor(totalS / 60);
    const s = totalS % 60;
    const milli = Math.floor(clamped % 1000);
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}.${String(milli).padStart(3, '0')}`;
}

export function formatClockSec(totalSec) {
    const clamped = Math.max(0, Math.floor(totalSec));
    const m = Math.floor(clamped / 60);
    const s = clamped % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export function formatPoints(pts) {
    if (Number.isInteger(pts)) return pts.toString();
    return pts.toFixed(2).replace(/\.?0+$/, '');
}

export function shuffleArray(arr) {
    const out = arr.slice();
    for (let i = out.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [out[i], out[j]] = [out[j], out[i]];
    }
    return out;
}
