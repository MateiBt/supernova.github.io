let astronomyDatabase = [];

function getStarColor(ci) {
    if (isNaN(ci)) return 0xffffff; 
    if (ci < 0.0) return 0x9eb5ff; 
    if (ci >= 0.0 && ci < 0.3) return 0xffffff; 
    if (ci >= 0.3 && ci < 0.6) return 0xffe4ce; 
    if (ci >= 0.6 && ci < 0.9) return 0xffd085; 
    if (ci >= 0.9 && ci < 1.4) return 0xffa45c; 
    return 0xff5e41; 
}

// Catalogul Messier Complet (M1 - M110) formatat pentru citire ușoară
const messierData = [
    { "id": "M1", "bayerName": "M1", "correctName": "crab nebula", "altNames": ["m1", "m 1", "ngc 1952"], "mag": 8.2, "correctType": "planetary_nebula", "ra": 5.575, "dec": 22.0167, "color": 6750156, "isDSO": true },
    { "id": "M2", "bayerName": "M2", "correctName": "", "altNames": ["m2", "m 2", "ngc 7089"], "mag": 6.5, "correctType": "globular_cluster", "ra": 21.5583, "dec": 0.8167, "color": 16774604, "isDSO": true },
    { "id": "M3", "bayerName": "M3", "correctName": "", "altNames": ["m3", "m 3", "ngc 5272"], "mag": 6.4, "correctType": "globular_cluster", "ra": 13.7033, "dec": 28.3833, "color": 16774604, "isDSO": true },
    { "id": "M4", "bayerName": "M4", "correctName": "", "altNames": ["m4", "m 4", "ngc 6121"], "mag": 5.9, "correctType": "globular_cluster", "ra": 16.3933, "dec": -26.5333, "color": 16774604, "isDSO": true },
    { "id": "M5", "bayerName": "M5", "correctName": "", "altNames": ["m5", "m 5", "ngc 5904"], "mag": 5.8, "correctType": "globular_cluster", "ra": 15.31, "dec": 2.0833, "color": 16774604, "isDSO": true },
    { "id": "M6", "bayerName": "M6", "correctName": "butterfly cluster", "altNames": ["m6", "m 6", "ngc 6405"], "mag": 4.2, "correctType": "open_cluster", "ra": 17.6683, "dec": -32.2167, "color": 13434879, "isDSO": true },
    { "id": "M7", "bayerName": "M7", "correctName": "ptolemy cluster", "altNames": ["m7", "m 7", "ngc 6475"], "mag": 3.3, "correctType": "open_cluster", "ra": 17.8983, "dec": -34.8167, "color": 13434879, "isDSO": true },
    { "id": "M8", "bayerName": "M8", "correctName": "lagoon nebula", "altNames": ["m8", "m 8", "ngc 6523"], "mag": 6.8, "correctType": "nebula", "ra": 18.0633, "dec": -24.3833, "color": 16759722, "isDSO": true },
    { "id": "M9", "bayerName": "M9", "correctName": "", "altNames": ["m9", "m 9", "ngc 6333"], "mag": 7.9, "correctType": "globular_cluster", "ra": 17.32, "dec": -18.5167, "color": 16774604, "isDSO": true },
    { "id": "M10", "bayerName": "M10", "correctName": "", "altNames": ["m10", "m 10", "ngc 6254"], "mag": 6.6, "correctType": "globular_cluster", "ra": 16.9517, "dec": -4.1, "color": 16774604, "isDSO": true },
    { "id": "M11", "bayerName": "M11", "correctName": "wild duck cluster", "altNames": ["m11", "m 11", "ngc 6705"], "mag": 5.8, "correctType": "open_cluster", "ra": 18.8517, "dec": -6.2667, "color": 13434879, "isDSO": true },
    { "id": "M12", "bayerName": "M12", "correctName": "", "altNames": ["m12", "m 12", "ngc 6218"], "mag": 6.6, "correctType": "globular_cluster", "ra": 16.7867, "dec": -1.95, "color": 16774604, "isDSO": true },
    { "id": "M13", "bayerName": "M13", "correctName": "", "altNames": ["m13", "m 13", "ngc 6205"], "mag": 5.9, "correctType": "globular_cluster", "ra": 16.695, "dec": 36.4667, "color": 16774604, "isDSO": true },
    { "id": "M14", "bayerName": "M14", "correctName": "", "altNames": ["m14", "m 14", "ngc 6402"], "mag": 7.6, "correctType": "globular_cluster", "ra": 17.6267, "dec": -3.25, "color": 16774604, "isDSO": true },
    { "id": "M15", "bayerName": "M15", "correctName": "", "altNames": ["m15", "m 15", "ngc 7078"], "mag": 6.4, "correctType": "globular_cluster", "ra": 21.5, "dec": 12.1667, "color": 16774604, "isDSO": true },
    { "id": "M16", "bayerName": "M16", "correctName": "orion nebula", "altNames": ["m16", "m 16", "ngc 6611"], "mag": 6.4, "correctType": "nebula", "ra": 18.3133, "dec": -13.7833, "color": 16759722, "isDSO": true },
    { "id": "M17", "bayerName": "M17", "correctName": "omega nebula", "altNames": ["m17", "m 17", "ngc 6618"], "mag": 7.5, "correctType": "nebula", "ra": 18.3467, "dec": -16.1833, "color": 16759722, "isDSO": true },
    { "id": "M18", "bayerName": "M18", "correctName": "", "altNames": ["m18", "m 18", "ngc 6613"], "mag": 6.9, "correctType": "open_cluster", "ra": 18.3317, "dec": -17.1333, "color": 13434879, "isDSO": true },
    { "id": "M19", "bayerName": "M19", "correctName": "", "altNames": ["m19", "m 19", "ngc 6273"], "mag": 7.2, "correctType": "globular_cluster", "ra": 17.0433, "dec": -26.2667, "color": 16774604, "isDSO": true },
    { "id": "M20", "bayerName": "M20", "correctName": "trifid nebula", "altNames": ["m20", "m 20", "ngc 6514"], "mag": 9.0, "correctType": "nebula", "ra": 18.0433, "dec": -23.0333, "color": 16759722, "isDSO": true },
    { "id": "M21", "bayerName": "M21", "correctName": "", "altNames": ["m21", "m 21", "ngc 6531"], "mag": 5.9, "correctType": "open_cluster", "ra": 18.0767, "dec": -22.5, "color": 13434879, "isDSO": true },
    { "id": "M22", "bayerName": "M22", "correctName": "", "altNames": ["m22", "m 22", "ngc 6656"], "mag": 5.1, "correctType": "globular_cluster", "ra": 18.6067, "dec": -23.9, "color": 16774604, "isDSO": true },
    { "id": "M23", "bayerName": "M23", "correctName": "", "altNames": ["m23", "m 23", "ngc 6494"], "mag": 5.5, "correctType": "open_cluster", "ra": 17.9467, "dec": -19.0167, "color": 13434879, "isDSO": true },
    { "id": "M24", "bayerName": "M24", "correctName": "sagittarius star cloud", "altNames": ["m24", "m 24", "ngc 6603"], "mag": 4.6, "correctType": "open_cluster", "ra": 18.2817, "dec": -18.4833, "color": 13434879, "isDSO": true },
    { "id": "M25", "bayerName": "M25", "correctName": "", "altNames": ["m25", "m 25", "ngc IC4725"], "mag": 4.6, "correctType": "open_cluster", "ra": 18.5267, "dec": -19.25, "color": 13434879, "isDSO": true },
    { "id": "M26", "bayerName": "M26", "correctName": "", "altNames": ["m26", "m 26", "ngc 6694"], "mag": 8.0, "correctType": "open_cluster", "ra": 18.7533, "dec": -9.4, "color": 13434879, "isDSO": true },
    { "id": "M27", "bayerName": "M27", "correctName": "ring nebula", "altNames": ["m27", "m 27", "ngc 6853"], "mag": 7.6, "correctType": "planetary_nebula", "ra": 19.9933, "dec": 22.7167, "color": 6750156, "isDSO": true },
    { "id": "M28", "bayerName": "M28", "correctName": "", "altNames": ["m28", "m 28", "ngc 6626"], "mag": 6.9, "correctType": "globular_cluster", "ra": 18.4083, "dec": -24.8667, "color": 16774604, "isDSO": true },
    { "id": "M29", "bayerName": "M29", "correctName": "", "altNames": ["m29", "m 29", "ngc 6913"], "mag": 6.6, "correctType": "open_cluster", "ra": 20.3983, "dec": 38.5333, "color": 13434879, "isDSO": true },
    { "id": "M30", "bayerName": "M30", "correctName": "", "altNames": ["m30", "m 30", "ngc 7099"], "mag": 7.5, "correctType": "globular_cluster", "ra": 21.6733, "dec": -23.1833, "color": 16774604, "isDSO": true },
    { "id": "M31", "bayerName": "M31", "correctName": "andromeda galaxy", "altNames": ["m31", "m 31", "ngc 224"], "mag": 4.8, "correctType": "galaxy", "ra": 0.7117, "dec": 41.2667, "color": 11190271, "isDSO": true },
    { "id": "M32", "bayerName": "M32", "correctName": "", "altNames": ["m32", "m 32", "ngc 221"], "mag": 8.7, "correctType": "galaxy", "ra": 0.7117, "dec": 40.8667, "color": 11190271, "isDSO": true },
    { "id": "M33", "bayerName": "M33", "correctName": "whirlpool galaxy", "altNames": ["m33", "m 33", "ngc 598"], "mag": 6.3, "correctType": "galaxy", "ra": 1.565, "dec": 30.65, "color": 11190271, "isDSO": true },
    { "id": "M34", "bayerName": "M34", "correctName": "", "altNames": ["m34", "m 34", "ngc 1039"], "mag": 5.5, "correctType": "open_cluster", "ra": 2.7, "dec": 42.7833, "color": 13434879, "isDSO": true },
    { "id": "M35", "bayerName": "M35", "correctName": "", "altNames": ["m35", "m 35", "ngc 2168"], "mag": 5.3, "correctType": "open_cluster", "ra": 6.1483, "dec": 24.3333, "color": 13434879, "isDSO": true },
    { "id": "M36", "bayerName": "M36", "correctName": "", "altNames": ["m36", "m 36", "ngc 1960"], "mag": 6.0, "correctType": "open_cluster", "ra": 5.6017, "dec": 34.1333, "color": 13434879, "isDSO": true },
    { "id": "M37", "bayerName": "M37", "correctName": "", "altNames": ["m37", "m 37", "ngc 2099"], "mag": 5.6, "correctType": "open_cluster", "ra": 5.8733, "dec": 32.55, "color": 13434879, "isDSO": true },
    { "id": "M38", "bayerName": "M38", "correctName": "", "altNames": ["m38", "m 38", "ngc 1912"], "mag": 6.4, "correctType": "open_cluster", "ra": 5.4783, "dec": 35.8333, "color": 13434879, "isDSO": true },
    { "id": "M39", "bayerName": "M39", "correctName": "", "altNames": ["m39", "m 39", "ngc 7092"], "mag": 4.6, "correctType": "open_cluster", "ra": 21.5367, "dec": 48.4333, "color": 13434879, "isDSO": true },
    { "id": "M40", "bayerName": "M40", "correctName": "", "altNames": ["m40", "m 40", "ngc wnc 4"], "mag": 9.1, "correctType": "other_dso", "ra": 12.3733, "dec": 58.0833, "color": 16777215, "isDSO": true },
    { "id": "M41", "bayerName": "M41", "correctName": "", "altNames": ["m41", "m 41", "ngc 2287"], "mag": 4.6, "correctType": "open_cluster", "ra": 6.7833, "dec": -20.7333, "color": 13434879, "isDSO": true },
    { "id": "M42", "bayerName": "M42", "correctName": "orion nebula", "altNames": ["m42", "m 42", "ngc 1976"], "mag": 2.9, "correctType": "nebula", "ra": 5.59, "dec": -5.45, "color": 16759722, "isDSO": true },
    { "id": "M43", "bayerName": "M43", "correctName": "de mairan's nebula", "altNames": ["m43", "m 43", "ngc 1982"], "mag": 6.9, "correctType": "nebula", "ra": 5.5933, "dec": -5.2667, "color": 16759722, "isDSO": true },
    { "id": "M44", "bayerName": "M44", "correctName": "beehive cluster", "altNames": ["m44", "m 44", "ngc 2632"], "mag": 3.1, "correctType": "open_cluster", "ra": 8.6683, "dec": 19.9833, "color": 13434879, "isDSO": true },
    { "id": "M45", "bayerName": "M45", "correctName": "pleiades", "altNames": ["m45", "m 45"], "mag": 1.2, "correctType": "open_cluster", "ra": 3.7833, "dec": 24.1167, "color": 13434879, "isDSO": true },
    { "id": "M46", "bayerName": "M46", "correctName": "", "altNames": ["m46", "m 46", "ngc 2437"], "mag": 6.1, "correctType": "open_cluster", "ra": 7.6967, "dec": -14.8167, "color": 13434879, "isDSO": true },
    { "id": "M47", "bayerName": "M47", "correctName": "", "altNames": ["m47", "m 47", "ngc 2422"], "mag": 4.5, "correctType": "open_cluster", "ra": 7.61, "dec": -14.5, "color": 13434879, "isDSO": true },
    { "id": "M48", "bayerName": "M48", "correctName": "", "altNames": ["m48", "m 48", "ngc 2548"], "mag": 5.8, "correctType": "open_cluster", "ra": 8.23, "dec": -5.8, "color": 13434879, "isDSO": true },
    { "id": "M49", "bayerName": "M49", "correctName": "", "altNames": ["m49", "m 49", "ngc 4472"], "mag": 8.4, "correctType": "galaxy", "ra": 12.4967, "dec": 8.0, "color": 11190271, "isDSO": true },
    { "id": "M50", "bayerName": "M50", "correctName": "", "altNames": ["m50", "m 50", "ngc 2323"], "mag": 5.9, "correctType": "open_cluster", "ra": 7.0533, "dec": -8.3333, "color": 13434879, "isDSO": true },
    { "id": "M51", "bayerName": "M51", "correctName": "whirlpool galaxy", "altNames": ["m51", "m 51", "ngc 5194"], "mag": 8.4, "correctType": "galaxy", "ra": 13.4983, "dec": 47.2, "color": 11190271, "isDSO": true },
    { "id": "M52", "bayerName": "M52", "correctName": "", "altNames": ["m52", "m 52", "ngc 7654"], "mag": 6.9, "correctType": "open_cluster", "ra": 23.4033, "dec": 61.5833, "color": 13434879, "isDSO": true },
    { "id": "M53", "bayerName": "M53", "correctName": "", "altNames": ["m53", "m 53", "ngc 5024"], "mag": 7.7, "correctType": "globular_cluster", "ra": 13.215, "dec": 18.1667, "color": 16774604, "isDSO": true },
    { "id": "M54", "bayerName": "M54", "correctName": "", "altNames": ["m54", "m 54", "ngc 6715"], "mag": 7.7, "correctType": "globular_cluster", "ra": 18.9183, "dec": -30.4833, "color": 16774604, "isDSO": true },
    { "id": "M55", "bayerName": "M55", "correctName": "", "altNames": ["m55", "m 55", "ngc 6809"], "mag": 7.0, "correctType": "globular_cluster", "ra": 19.6667, "dec": -30.9667, "color": 16774604, "isDSO": true },
    { "id": "M56", "bayerName": "M56", "correctName": "", "altNames": ["m56", "m 56", "ngc 6779"], "mag": 8.3, "correctType": "globular_cluster", "ra": 19.2767, "dec": 30.1833, "color": 16774604, "isDSO": true },
    { "id": "M57", "bayerName": "M57", "correctName": "ring nebula", "altNames": ["m57", "m 57", "ngc 6720"], "mag": 9.3, "correctType": "planetary_nebula", "ra": 18.8933, "dec": 33.0333, "color": 6750156, "isDSO": true },
    { "id": "M58", "bayerName": "M58", "correctName": "", "altNames": ["m58", "m 58", "ngc 4579"], "mag": 9.8, "correctType": "galaxy", "ra": 12.6283, "dec": 11.8167, "color": 11190271, "isDSO": true },
    { "id": "M59", "bayerName": "M59", "correctName": "", "altNames": ["m59", "m 59", "ngc 4621"], "mag": 9.8, "correctType": "galaxy", "ra": 12.7, "dec": 11.65, "color": 11190271, "isDSO": true },
    { "id": "M60", "bayerName": "M60", "correctName": "", "altNames": ["m60", "m 60", "ngc 4649"], "mag": 8.8, "correctType": "galaxy", "ra": 12.7283, "dec": 11.55, "color": 11190271, "isDSO": true },
    { "id": "M61", "bayerName": "M61", "correctName": "", "altNames": ["m61", "m 61", "ngc 4303"], "mag": 9.7, "correctType": "galaxy", "ra": 12.365, "dec": 4.4667, "color": 11190271, "isDSO": true },
    { "id": "M62", "bayerName": "M62", "correctName": "", "altNames": ["m62", "m 62", "ngc 6266"], "mag": 6.6, "correctType": "globular_cluster", "ra": 17.02, "dec": -30.1167, "color": 16774604, "isDSO": true },
    { "id": "M63", "bayerName": "M63", "correctName": "triangulum galaxy", "altNames": ["m63", "m 63", "ngc 5055"], "mag": 8.6, "correctType": "galaxy", "ra": 13.2633, "dec": 42.0333, "color": 11190271, "isDSO": true },
    { "id": "M64", "bayerName": "M64", "correctName": "black eye galaxy", "altNames": ["m64", "m 64", "ngc 4826"], "mag": 8.5, "correctType": "galaxy", "ra": 12.945, "dec": 21.6833, "color": 11190271, "isDSO": true },
    { "id": "M65", "bayerName": "M65", "correctName": "", "altNames": ["m65", "m 65", "ngc 3623"], "mag": 9.3, "correctType": "galaxy", "ra": 11.315, "dec": 13.0833, "color": 11190271, "isDSO": true },
    { "id": "M66", "bayerName": "M66", "correctName": "", "altNames": ["m66", "m 66", "ngc 3627"], "mag": 9.0, "correctType": "galaxy", "ra": 11.3367, "dec": 12.9833, "color": 11190271, "isDSO": true },
    { "id": "M67", "bayerName": "M67", "correctName": "", "altNames": ["m67", "m 67", "ngc 2682"], "mag": 6.9, "correctType": "open_cluster", "ra": 8.84, "dec": 11.8167, "color": 13434879, "isDSO": true },
    { "id": "M68", "bayerName": "M68", "correctName": "", "altNames": ["m68", "m 68", "ngc 4590"], "mag": 8.2, "correctType": "globular_cluster", "ra": 12.6583, "dec": -26.75, "color": 16774604, "isDSO": true },
    { "id": "M69", "bayerName": "M69", "correctName": "", "altNames": ["m69", "m 69", "ngc 6637"], "mag": 7.7, "correctType": "globular_cluster", "ra": 18.5233, "dec": -32.35, "color": 16774604, "isDSO": true },
    { "id": "M70", "bayerName": "M70", "correctName": "", "altNames": ["m70", "m 70", "ngc 6681"], "mag": 8.1, "correctType": "globular_cluster", "ra": 18.72, "dec": -32.3, "color": 16774604, "isDSO": true },
    { "id": "M71", "bayerName": "M71", "correctName": "", "altNames": ["m71", "m 71", "ngc 6838"], "mag": 8.3, "correctType": "globular_cluster", "ra": 19.8967, "dec": 18.7833, "color": 16774604, "isDSO": true },
    { "id": "M72", "bayerName": "M72", "correctName": "", "altNames": ["m72", "m 72", "ngc 6981"], "mag": 9.4, "correctType": "globular_cluster", "ra": 20.8917, "dec": -12.5333, "color": 16774604, "isDSO": true },
    { "id": "M73", "bayerName": "M73", "correctName": "", "altNames": ["m73", "m 73", "ngc 6994"], "mag": 9.0, "correctType": "open_cluster", "ra": 20.9817, "dec": -12.6333, "color": 13434879, "isDSO": true },
    { "id": "M74", "bayerName": "M74", "correctName": "", "altNames": ["m74", "m 74", "ngc 628"], "mag": 9.2, "correctType": "galaxy", "ra": 1.6117, "dec": 15.7833, "color": 11190271, "isDSO": true },
    { "id": "M75", "bayerName": "M75", "correctName": "", "altNames": ["m75", "m 75", "ngc 6864"], "mag": 8.6, "correctType": "globular_cluster", "ra": 20.1017, "dec": -21.9167, "color": 16774604, "isDSO": true },
    { "id": "M76", "bayerName": "M76", "correctName": "", "altNames": ["m76", "m 76", "ngc 650"], "mag": 12.2, "correctType": "planetary_nebula", "ra": 1.7067, "dec": 51.5667, "color": 6750156, "isDSO": true },
    { "id": "M77", "bayerName": "M77", "correctName": "", "altNames": ["m77", "m 77", "ngc 1068"], "mag": 8.9, "correctType": "galaxy", "ra": 2.7117, "dec": 0.0167, "color": 11190271, "isDSO": true },
    { "id": "M78", "bayerName": "M78", "correctName": "", "altNames": ["m78", "m 78", "ngc 2068"], "mag": 10.5, "correctType": "nebula", "ra": 5.7783, "dec": 0.05, "color": 16759722, "isDSO": true },
    { "id": "M79", "bayerName": "M79", "correctName": "", "altNames": ["m79", "m 79", "ngc 1904"], "mag": 8.4, "correctType": "globular_cluster", "ra": 5.4083, "dec": -24.55, "color": 16774604, "isDSO": true },
    { "id": "M80", "bayerName": "M80", "correctName": "", "altNames": ["m80", "m 80", "ngc 6093"], "mag": 7.2, "correctType": "globular_cluster", "ra": 16.2833, "dec": -22.9833, "color": 16774604, "isDSO": true },
    { "id": "M81", "bayerName": "M81", "correctName": "whirlpool galaxy", "altNames": ["m81", "m 81", "ngc 3031"], "mag": 6.9, "correctType": "galaxy", "ra": 9.9267, "dec": 69.0667, "color": 11190271, "isDSO": true },
    { "id": "M82", "bayerName": "M82", "correctName": "bode's galaxy", "altNames": ["m82", "m 82", "ngc 3034"], "mag": 8.4, "correctType": "galaxy", "ra": 9.93, "dec": 69.6833, "color": 11190271, "isDSO": true },
    { "id": "M83", "bayerName": "M83", "correctName": "southern pinwheel galaxy", "altNames": ["m83", "m 83", "ngc 5236"], "mag": 8.2, "correctType": "galaxy", "ra": 13.6167, "dec": -29.8667, "color": 11190271, "isDSO": true },
    { "id": "M84", "bayerName": "M84", "correctName": "", "altNames": ["m84", "m 84", "ngc 4374"], "mag": 9.3, "correctType": "galaxy", "ra": 12.4183, "dec": 12.8833, "color": 11190271, "isDSO": true },
    { "id": "M85", "bayerName": "M85", "correctName": "", "altNames": ["m85", "m 85", "ngc 4382"], "mag": 9.3, "correctType": "galaxy", "ra": 12.4233, "dec": 18.1833, "color": 11190271, "isDSO": true },
    { "id": "M86", "bayerName": "M86", "correctName": "", "altNames": ["m86", "m 86", "ngc 4406"], "mag": 9.2, "correctType": "galaxy", "ra": 12.4367, "dec": 12.95, "color": 11190271, "isDSO": true },
    { "id": "M87", "bayerName": "M87", "correctName": "sombrero galaxy", "altNames": ["m87", "m 87", "ngc 4486"], "mag": 8.6, "correctType": "galaxy", "ra": 12.5133, "dec": 12.4, "color": 11190271, "isDSO": true },
    { "id": "M88", "bayerName": "M88", "correctName": "", "altNames": ["m88", "m 88", "ngc 4501"], "mag": 9.5, "correctType": "galaxy", "ra": 12.5333, "dec": 14.4167, "color": 11190271, "isDSO": true },
    { "id": "M89", "bayerName": "M89", "correctName": "", "altNames": ["m89", "m 89", "ngc 4552"], "mag": 9.8, "correctType": "galaxy", "ra": 12.595, "dec": 12.55, "color": 11190271, "isDSO": true },
    { "id": "M90", "bayerName": "M90", "correctName": "", "altNames": ["m90", "m 90", "ngc 4569"], "mag": 9.5, "correctType": "galaxy", "ra": 12.6133, "dec": 13.1667, "color": 11190271, "isDSO": true },
    { "id": "M91", "bayerName": "M91", "correctName": "", "altNames": ["m91", "m 91", "ngc 4548"], "mag": 10.2, "correctType": "galaxy", "ra": 12.59, "dec": 14.5, "color": 11190271, "isDSO": true },
    { "id": "M92", "bayerName": "M92", "correctName": "", "altNames": ["m92", "m 92", "ngc 6341"], "mag": 6.5, "correctType": "globular_cluster", "ra": 17.285, "dec": 43.1333, "color": 16774604, "isDSO": true },
    { "id": "M93", "bayerName": "M93", "correctName": "", "altNames": ["m93", "m 93", "ngc 2447"], "mag": 6.2, "correctType": "open_cluster", "ra": 7.7433, "dec": -23.8667, "color": 13434879, "isDSO": true },
    { "id": "M94", "bayerName": "M94", "correctName": "", "altNames": ["m94", "m 94", "ngc 4736"], "mag": 8.2, "correctType": "galaxy", "ra": 12.8483, "dec": 41.1167, "color": 11190271, "isDSO": true },
    { "id": "M95", "bayerName": "M95", "correctName": "", "altNames": ["m95", "m 95", "ngc 3351"], "mag": 9.7, "correctType": "galaxy", "ra": 10.7333, "dec": 11.7, "color": 11190271, "isDSO": true },
    { "id": "M96", "bayerName": "M96", "correctName": "", "altNames": ["m96", "m 96", "ngc 3368"], "mag": 9.1, "correctType": "galaxy", "ra": 10.78, "dec": 11.8167, "color": 11190271, "isDSO": true },
    { "id": "M97", "bayerName": "M97", "correctName": "owl nebula", "altNames": ["m97", "m 97", "ngc 3587"], "mag": 12.0, "correctType": "planetary_nebula", "ra": 11.2467, "dec": 55.0167, "color": 6750156, "isDSO": true },
    { "id": "M98", "bayerName": "M98", "correctName": "", "altNames": ["m98", "m 98", "ngc 4192"], "mag": 10.1, "correctType": "galaxy", "ra": 12.23, "dec": 14.9, "color": 11190271, "isDSO": true },
    { "id": "M99", "bayerName": "M99", "correctName": "", "altNames": ["m99", "m 99", "ngc 4254"], "mag": 9.8, "correctType": "galaxy", "ra": 12.3133, "dec": 14.4167, "color": 11190271, "isDSO": true },
    { "id": "M100", "bayerName": "M100", "correctName": "", "altNames": ["m100", "m 100", "ngc 4321"], "mag": 9.4, "correctType": "galaxy", "ra": 12.3817, "dec": 15.8167, "color": 11190271, "isDSO": true },
    { "id": "M101", "bayerName": "M101", "correctName": "", "altNames": ["m101", "m 101", "ngc 5457"], "mag": 7.7, "correctType": "galaxy", "ra": 14.0533, "dec": 54.35, "color": 11190271, "isDSO": true },
    { "id": "M102", "bayerName": "M102", "correctName": "", "altNames": ["m102", "m 102", "ngc 5457"], "mag": 7.7, "correctType": "galaxy", "ra": 14.0533, "dec": 54.35, "color": 11190271, "isDSO": true },
    { "id": "M103", "bayerName": "M103", "correctName": "", "altNames": ["m103", "m 103", "ngc 581"], "mag": 7.4, "correctType": "open_cluster", "ra": 1.5533, "dec": 60.7, "color": 13434879, "isDSO": true },
    { "id": "M104", "bayerName": "M104", "correctName": "sombrero galaxy", "altNames": ["m104", "m 104", "ngc 4594"], "mag": 8.3, "correctType": "galaxy", "ra": 12.6667, "dec": -11.6167, "color": 11190271, "isDSO": true },
    { "id": "M105", "bayerName": "M105", "correctName": "", "altNames": ["m105", "m 105", "ngc 3379"], "mag": 9.2, "correctType": "galaxy", "ra": 10.7967, "dec": 12.5833, "color": 11190271, "isDSO": true },
    { "id": "M106", "bayerName": "M106", "correctName": "", "altNames": ["m106", "m 106", "ngc 4258"], "mag": 8.3, "correctType": "galaxy", "ra": 12.3167, "dec": 47.3, "color": 11190271, "isDSO": true },
    { "id": "M107", "bayerName": "M107", "correctName": "", "altNames": ["m107", "m 107", "ngc 6171"], "mag": 8.1, "correctType": "globular_cluster", "ra": 16.5417, "dec": -13.05, "color": 16774604, "isDSO": true },
    { "id": "M108", "bayerName": "M108", "correctName": "", "altNames": ["m108", "m 108", "ngc 3556"], "mag": 10.1, "correctType": "galaxy", "ra": 11.1917, "dec": 55.6667, "color": 11190271, "isDSO": true },
    { "id": "M109", "bayerName": "M109", "correctName": "", "altNames": ["m109", "m 109", "ngc 3992"], "mag": 9.8, "correctType": "galaxy", "ra": 11.96, "dec": 53.3833, "color": 11190271, "isDSO": true },
    { "id": "M110", "bayerName": "M110", "correctName": "", "altNames": ["m110", "m 110", "ngc 205"], "mag": 9.4, "correctType": "galaxy", "ra": 0.6733, "dec": 41.6833, "color": 11190271, "isDSO": true }
];

async function initDatabase() {
    try {
        console.log("Începem citirea bazei de date...");
        
        const response = await fetch('data/hyg_optimizat.csv');
        if (!response.ok) throw new Error("Nu am putut găsi hyg_optimizat.csv.");
        
        const text = await response.text();
        const rows = text.split(/\r?\n/); 
        
        const iHip = 1;     
        const iProper = 6;  
        const iRa = 7;      
        const iDec = 8;     
        const iMag = 13;    
        const iCi = 16;     
        const iBayer = 27;  
        const iFlam = 28;   
        const iCon = 29;    
        const iComp = 30; 
        const iVar = 34;    

        const greekMap = {
            'Alp': 'Alpha', 'Bet': 'Beta', 'Gam': 'Gamma', 'Del': 'Delta', 'Eps': 'Epsilon',
            'Zet': 'Zeta', 'Eta': 'Eta', 'The': 'Theta', 'Iot': 'Iota', 'Kap': 'Kappa',
            'Lam': 'Lambda', 'Mu': 'Mu', 'Nu': 'Nu', 'Xi': 'Xi', 'Omi': 'Omicron',
            'Pi': 'Pi', 'Rho': 'Rho', 'Sig': 'Sigma', 'Tau': 'Tau', 'Ups': 'Upsilon',
            'Phi': 'Phi', 'Chi': 'Chi', 'Psi': 'Psi', 'Ome': 'Omega'
        };

        let idCounter = 1;

        for (let i = 1; i < rows.length; i++) {
            if (!rows[i] || rows[i].trim() === '') continue;
            
            const cleanRow = rows[i].replace(/"/g, '');
            const cols = cleanRow.split(',');
            
            if (cols.length <= iMag) continue;

            const magStr = cols[iMag] ? cols[iMag].trim() : "";
            const mag = parseFloat(magStr);
            
            if (isNaN(mag) || mag > 6.5) continue;
            
            let properName = cols[iProper] ? cols[iProper].trim() : "";
            
            const hipVal = (cols.length > iHip && cols[iHip]) ? parseInt(cols[iHip].trim()) : null;
            let bayerAbbr = (cols.length > iBayer && cols[iBayer]) ? cols[iBayer].trim() : "";
            let flamStr = (cols.length > iFlam && cols[iFlam]) ? cols[iFlam].trim() : "";
            const con = (cols.length > iCon && cols[iCon]) ? cols[iCon].trim() : "";
            
            if (bayerAbbr.includes('-')) {
                bayerAbbr = bayerAbbr.split('-')[0];
            }
            
            let bayerName = "";
            if (bayerAbbr && con) {
                const greekFull = greekMap[bayerAbbr] || bayerAbbr;
                bayerName = `${greekFull} ${con}`;
            } else if (flamStr && con) {
                bayerName = `${flamStr} ${con}`;
            }

            if (bayerName === "Alpha Gru") properName = "Alnair";
            if (properName.toLowerCase() === "itonda") bayerName = bayerName.replace("Sgr", "Gru");
            
            let tip = "simpla";
            const compVal = (cols.length > iComp && cols[iComp]) ? cols[iComp].trim() : "";
            const varVal = (cols.length > iVar && cols[iVar]) ? cols[iVar].trim() : "";
            
            if (compVal !== "" && parseInt(compVal) > 1) {
                tip = "dubla"; 
            } else if (varVal !== "") {
                tip = "pulsatila"; 
            }
            
            astronomyDatabase.push({
                id: idCounter++,
                hip: hipVal,               
                bayerName: bayerName, 
                ra: parseFloat(cols[iRa] || 0),
                dec: parseFloat(cols[iDec] || 0),
                mag: mag,
                color: getStarColor(parseFloat(cols[iCi] || 0)),
                correctName: properName.toLowerCase(),
                correctType: tip
            });
        }
        
        // ==========================================
        // INJECTAREA OBIECTELOR MESSIER
        // ==========================================
        messierData.forEach(dso => {
            astronomyDatabase.push(dso);
        });
        
        console.log(`Bază de date pregătită: ${astronomyDatabase.length} obiecte încărcate (stele + DSO).`);
    } catch (error) {
        console.error("Eroare critică la baza de date:", error);
    }
}