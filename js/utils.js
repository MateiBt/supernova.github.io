// ==========================================
// UTILS.JS - Funcții ajutătoare matematice/text
// ==========================================

export function getLevenshteinDistance(a, b) {
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

export function formatDate(isoString) {
    if (!isoString) return "";
    const d = new Date(isoString);
    if (isNaN(d.getTime())) return "";
    return d.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

export function formatTimeMs(ms) {
    let totalS = Math.floor(ms / 1000);
    let m = Math.floor(totalS / 60);
    let s = totalS % 60;
    let milli = Math.floor(ms % 1000);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}.${milli.toString().padStart(3, '0')}`;
}

export function formatPoints(pts) {
    if (Number.isInteger(pts)) return pts.toString();
    return pts.toFixed(2).replace(/\.?0+$/, '');
}

export function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

export function classifyDSODifficultyRank(obj) {
    if (obj.difficultyRank) return obj.difficultyRank; 
    const idStr = (obj.id || '').toString();
    const bayerStr = (obj.bayerName || '').toString();
    const nameStr = (obj.correctName || '').toString();
    const catalogStr = (obj.catalog || obj.designation || obj.messierId || obj.caldwellId || '').toString();
    const haystack = `${idStr} ${bayerStr} ${nameStr} ${catalogStr}`;

    const isMessier = obj.isMessier === true || /\bM\s?\d{1,3}\b/i.test(haystack);
    if (isMessier) return 1; // Easy

    const isCaldwell = obj.isCaldwell === true || /\bC(?:ald(?:well)?)?\s?\d{1,3}\b/i.test(haystack);
    if (isCaldwell) return 2; // Medium

    const isNGC = /\bNGC\s?\d{1,4}\b/i.test(haystack);
    if (isNGC && obj.correctType !== 'open_cluster') return 3; // Hard

    return 4; // Extreme
}

export function filterDSOByDifficulty(objects, diff) {
    let maxRank = 4;
    if (diff === 'easy') maxRank = 1;
    else if (diff === 'medium') maxRank = 2;
    else if (diff === 'hard') maxRank = 3;
    else maxRank = 4;
    return objects.filter(o => classifyDSODifficultyRank(o) <= maxRank);
}