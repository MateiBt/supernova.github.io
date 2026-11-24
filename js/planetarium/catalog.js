// js/planetarium/catalog.js
// Loads and indexes the HYG star catalog (mag <= 6.5) and Deep Sky Object catalog,
// computes 88 IAU constellation centroids, and powers instant English/IAU object search.

import {
    IAU_CONSTELLATIONS,
    GREEK_LETTERS,
    CONSTELLATION_LINES,
    CUSTOM_STAR_CORRECTIONS,
    STAR_CLASSIFICATIONS,
    DEEP_SKY_CATALOG,
    OBJECT_TYPE_LABELS
} from './catalog_data.js';
import { raDecToCartesian, RAD_TO_DEG } from './astronomy.js';

export function normalizeQuery(str) {
    if (!str) return '';
    return str
        .toString()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/['’`]/g, '')
        .replace(/\s+/g, ' ')
        .trim();
}

export function starColorFromCI(ci) {
    if (isNaN(ci)) return 0xffffff;
    if (ci < -0.1) return 0x9bb8ff;
    if (ci < 0.15) return 0xcad8ff;
    if (ci < 0.40) return 0xf8f9ff;
    if (ci < 0.65) return 0xfff0d4;
    if (ci < 0.95) return 0xffd592;
    if (ci < 1.35) return 0xffab64;
    return 0xff6e4a;
}

export function filterDsoByDifficulty(dsos, difficulty) {
    if (difficulty === 'easy') {
        const iconic = ['M1', 'M8', 'M13', 'M16', 'M17', 'M20', 'M27', 'M31', 'M33', 'M42', 'M44', 'M45', 'M51', 'M57', 'M81', 'M82', 'M101', 'M104'];
        return dsos.filter(d => iconic.includes(d.id));
    }
    if (difficulty === 'medium') {
        return dsos.filter(d => d.id.startsWith('M') && (d.mag <= 7.5 || Boolean(d.properName)));
    }
    if (difficulty === 'hard') {
        return dsos.filter(d => d.id.startsWith('M'));
    }
    return dsos;
}

export async function loadCatalog() {
    const response = await fetch('data/hyg_catalog.csv');
    if (!response.ok) {
        throw new Error(`Failed to fetch star catalog (HTTP ${response.status}).`);
    }

    const text = await response.text();
    const rows = text.split(/\r?\n/);

    const iHip = 1;
    const iHd = 2;
    const iHr = 3;
    const iProper = 6;
    const iRa = 7;
    const iDec = 8;
    const iDist = 9;
    const iMag = 13;
    const iSpect = 15;
    const iCi = 16;
    const iBayer = 27;
    const iFlam = 28;
    const iCon = 29;
    const iComp = 30;
    const iVar = 34;

    const objects = [];
    const lookupByKey = new Map();
    let idCounter = 1;

    for (let i = 1; i < rows.length; i++) {
        const raw = rows[i];
        if (!raw || raw.trim() === '') continue;

        const cols = raw.replace(/"/g, '').split(',');
        if (cols.length <= iMag) continue;

        const mag = parseFloat((cols[iMag] || '').trim());
        if (isNaN(mag) || mag > 6.5 || mag < -2.0) continue;

        let properName = (cols[iProper] || '').trim();
        if (properName === 'Sol') continue;

        const hipVal = cols[iHip] && cols[iHip].trim() !== '' ? parseInt(cols[iHip].trim(), 10) : null;
        const hdVal = cols[iHd] && cols[iHd].trim() !== '' ? parseInt(cols[iHd].trim(), 10) : null;
        const hrVal = cols[iHr] && cols[iHr].trim() !== '' ? parseInt(cols[iHr].trim(), 10) : null;
        const ra = parseFloat(cols[iRa] || '0');
        const dec = parseFloat(cols[iDec] || '0');
        const distRaw = parseFloat(cols[iDist] || '');
        const distPc = !isNaN(distRaw) && distRaw > 0 && distRaw < 99999 ? distRaw : null;
        const spect = (cols[iSpect] || '').trim();
        const ciRaw = parseFloat(cols[iCi] || '');
        const ci = isNaN(ciRaw) ? null : ciRaw;

        let bayerAbbr = (cols[iBayer] || '').trim();
        const flamStr = (cols[iFlam] || '').trim();
        let con = (cols[iCon] || '').trim();

        if (bayerAbbr.includes('-')) {
            bayerAbbr = bayerAbbr.split('-')[0];
        }

        // Preserve historical HYG Grus correction
        if (properName.toLowerCase() === 'itonda' && con === 'Sgr') {
            con = 'Gru';
        }

        let bayerName = '';
        let bayerSymbol = '';
        let flamsteedName = '';

        if (flamStr && con) {
            flamsteedName = `${flamStr} ${con}`;
        }

        if (bayerAbbr && con) {
            const greek = GREEK_LETTERS[bayerAbbr];
            if (greek) {
                bayerName = `${greek.name} ${con}`;
                bayerSymbol = `${greek.symbol} ${con}`;
            } else {
                bayerName = `${bayerAbbr} ${con}`;
                bayerSymbol = bayerName;
            }
        } else if (flamsteedName) {
            bayerName = flamsteedName;
            bayerSymbol = flamsteedName;
        }

        if (bayerName === 'Alpha Gru' && !properName) {
            properName = 'Alnair';
        }

        const compVal = (cols[iComp] || '').trim();
        const varVal = (cols[iVar] || '').trim();
        let defaultType = 'single';
        if (compVal !== '' && parseInt(compVal, 10) > 1) {
            defaultType = 'binary';
        } else if (varVal !== '') {
            defaultType = 'pulsating';
        }

        const starObj = {
            id: idCounter++,
            hip: hipVal,
            hd: hdVal,
            hr: hrVal,
            properName,
            bayerName,
            bayerSymbol,
            flamsteedName,
            constellation: con,
            constellationFull: IAU_CONSTELLATIONS[con] || con || 'Unknown',
            ra,
            dec,
            mag,
            distPc,
            spectralClass: spect || '—',
            colorIndex: ci,
            color: starColorFromCI(ci === null ? NaN : ci),
            correctName: properName.toLowerCase(),
            altNames: [],
            correctType: defaultType,
            correctTypes: [defaultType],
            subtype: OBJECT_TYPE_LABELS[defaultType] || 'Single Star',
            isDSO: false
        };

        // Apply custom English name corrections
        const correction = CUSTOM_STAR_CORRECTIONS.find(
            c => c.identifier === starObj.bayerName || (starObj.hip && c.identifier === `HIP ${starObj.hip}`)
        );
        if (correction) {
            starObj.properName = correction.properName;
            starObj.correctName = correction.properName.toLowerCase();
            if (correction.altNames && correction.altNames.length > 0) {
                starObj.altNames.push(...correction.altNames);
            }
        }

        // Apply explicit astronomical variable/binary classifications
        const matchedTypes = [];
        for (const [typeKey, idList] of Object.entries(STAR_CLASSIFICATIONS)) {
            if (idList.includes(starObj.bayerName) || (starObj.hip && idList.includes(`HIP ${starObj.hip}`))) {
                matchedTypes.push(typeKey);
            }
        }
        if (matchedTypes.length > 0) {
            starObj.correctTypes = matchedTypes;
            starObj.correctType = matchedTypes[0];
            starObj.subtype = matchedTypes.map(t => OBJECT_TYPE_LABELS[t] || t).join(' · ');
        }

        // Display name & search tokens
        starObj.displayName = starObj.properName
            || starObj.bayerSymbol
            || starObj.bayerName
            || (starObj.hip ? `HIP ${starObj.hip}` : `Star #${starObj.id}`);

        const searchTokens = [
            starObj.properName,
            starObj.bayerName,
            starObj.bayerSymbol,
            starObj.flamsteedName,
            starObj.constellation,
            starObj.constellationFull,
            starObj.hip ? `HIP ${starObj.hip}` : '',
            starObj.hip ? `HIP${starObj.hip}` : '',
            starObj.hd ? `HD ${starObj.hd}` : '',
            starObj.hr ? `HR ${starObj.hr}` : '',
            ...starObj.altNames
        ].filter(Boolean);
        starObj.searchText = normalizeQuery(searchTokens.join(' | '));

        objects.push(starObj);

        // Index for constellation stick-figure lookup (prefer brightest when Bayer duplicates occur)
        if (starObj.bayerName) {
            const prev = lookupByKey.get(starObj.bayerName);
            if (!prev || starObj.mag < prev.mag) {
                lookupByKey.set(starObj.bayerName, starObj);
            }
        }
        if (starObj.hip) {
            lookupByKey.set(`HIP ${starObj.hip}`, starObj);
        }
    }

    // Inject verified Deep Sky Objects
    for (const dso of DEEP_SKY_CATALOG) {
        const displayName = dso.properName ? `${dso.id} · ${dso.properName}` : dso.id;
        const searchTokens = [
            dso.id,
            dso.properName,
            dso.ngc,
            dso.constellation,
            dso.constellationFull,
            dso.subtype,
            ...dso.altNames
        ].filter(Boolean);
        const entry = {
            ...dso,
            displayName,
            bayerSymbol: dso.id,
            flamsteedName: '',
            hip: null,
            hd: null,
            distPc: null,
            spectralClass: dso.subtype,
            colorIndex: null,
            correctTypes: [dso.correctType],
            searchText: normalizeQuery(searchTokens.join(' | '))
        };
        objects.push(entry);
        lookupByKey.set(entry.id, entry);
    }

    // Resolve constellation stick-figure segments & compute accurate 88 constellation centroids
    const resolvedLineSegments = [];
    const conVectors = {};
    const conStarCounts = {};

    for (const abbr of Object.keys(IAU_CONSTELLATIONS)) {
        conVectors[abbr] = { x: 0, y: 0, z: 0, count: 0 };
        conStarCounts[abbr] = 0;
    }

    for (const obj of objects) {
        if (!obj.isDSO && obj.constellation && conStarCounts[obj.constellation] !== undefined) {
            conStarCounts[obj.constellation]++;
        }
    }

    for (const [idA, idB] of CONSTELLATION_LINES) {
        const starA = lookupByKey.get(idA.trim());
        const starB = lookupByKey.get(idB.trim());
        if (!starA || !starB) continue;
        resolvedLineSegments.push([starA, starB]);

        for (const s of [starA, starB]) {
            if (s.constellation && conVectors[s.constellation]) {
                const v = raDecToCartesian(s.ra, s.dec, 1);
                conVectors[s.constellation].x += v.x;
                conVectors[s.constellation].y += v.y;
                conVectors[s.constellation].z += v.z;
                conVectors[s.constellation].count++;
            }
        }
    }

    // Fallback to all bright stars in a constellation if stick-figure vector is sparse
    for (const obj of objects) {
        if (!obj.isDSO && obj.constellation && conVectors[obj.constellation] && conVectors[obj.constellation].count < 2) {
            const v = raDecToCartesian(obj.ra, obj.dec, 1);
            conVectors[obj.constellation].x += v.x;
            conVectors[obj.constellation].y += v.y;
            conVectors[obj.constellation].z += v.z;
            conVectors[obj.constellation].count++;
        }
    }

    const constellations = Object.entries(IAU_CONSTELLATIONS)
        .map(([abbr, name]) => {
            const acc = conVectors[abbr];
            const len = Math.hypot(acc.x, acc.y, acc.z) || 1;
            const nx = acc.x / len;
            const ny = acc.y / len;
            const nz = acc.z / len;
            const dec = Math.asin(Math.max(-1, Math.min(1, ny))) * RAD_TO_DEG;
            let ra = (Math.atan2(nx, nz) * RAD_TO_DEG) / 15.0;
            if (ra < 0) ra += 24;
            return {
                abbr,
                name,
                ra,
                dec,
                starCount: conStarCounts[abbr] || 0,
                searchText: normalizeQuery(`${abbr} ${name}`)
            };
        })
        .sort((a, b) => a.name.localeCompare(b.name));

    return {
        objects,
        stars: objects.filter(o => !o.isDSO),
        dsos: objects.filter(o => o.isDSO),
        constellations,
        resolvedLineSegments,
        lookupByKey
    };
}

/**
 * Instant search across stars, Deep Sky Objects, and all 88 IAU constellations.
 */
export function searchCatalog(query, catalog, limit = 12) {
    const q = normalizeQuery(query);
    if (!q || !catalog) return [];
    const qCompact = q.replace(/\s+/g, '');

    const results = [];

    // 1. Constellations
    for (const c of catalog.constellations) {
        const nameNorm = normalizeQuery(c.name);
        const abbrNorm = c.abbr.toLowerCase();
        let score = 0;
        if (nameNorm === q || abbrNorm === q) score = 120;
        else if (nameNorm.startsWith(q)) score = 95;
        else if (c.searchText.includes(q)) score = 65;

        if (score > 0) {
            results.push({
                kind: 'constellation',
                title: c.name,
                subtitle: `IAU Constellation · ${c.abbr} · ${c.starCount} stars`,
                badge: 'CON',
                ra: c.ra,
                dec: c.dec,
                data: c,
                score
            });
        }
    }

    // 2. Stars & Deep Sky Objects
    for (const obj of catalog.objects) {
        if (!obj.searchText.includes(q) && !obj.searchText.replace(/\s+/g, '').includes(qCompact)) {
            continue;
        }

        let score = 30;
        const propNorm = normalizeQuery(obj.properName);
        const idNorm = normalizeQuery(obj.id);
        const bayerNorm = normalizeQuery(obj.bayerName);
        const ngcNorm = normalizeQuery(obj.ngc || '');

        if (propNorm === q || idNorm === q || ngcNorm === q || bayerNorm === q) score = 115;
        else if (obj.altNames && obj.altNames.some(a => normalizeQuery(a) === q || normalizeQuery(a).replace(/\s+/g, '') === qCompact)) score = 110;
        else if (propNorm && propNorm.startsWith(q)) score = 92;
        else if (idNorm.startsWith(qCompact) || bayerNorm.startsWith(q)) score = 84;
        else if (ngcNorm && ngcNorm.replace(/\s+/g, '').startsWith(qCompact)) score = 80;
        else if (propNorm && propNorm.includes(q)) score = 70;

        // Slight brightness boost so Vega/Sirius/Orion Nebula rank above obscure faint matches
        score += Math.max(0, 7 - obj.mag) * 1.6;
        if (obj.isDSO && obj.id.startsWith('M')) score += 4;

        const secondaryId = obj.isDSO
            ? [obj.id, obj.ngc, obj.constellationFull].filter(Boolean).join(' · ')
            : [obj.bayerSymbol || obj.bayerName, obj.hip ? `HIP ${obj.hip}` : '', obj.constellationFull].filter(Boolean).join(' · ');

        results.push({
            kind: obj.isDSO ? 'dso' : 'star',
            title: obj.properName ? obj.properName : obj.displayName,
            subtitle: `${secondaryId} · m ${obj.mag.toFixed(1)}`,
            badge: obj.isDSO ? obj.id : (obj.constellation || 'STAR'),
            ra: obj.ra,
            dec: obj.dec,
            data: obj,
            score
        });
    }

    results.sort((a, b) => b.score - a.score);
    return results.slice(0, limit);
}
