// js/planetarium/catalog_data.js
// Canonical IAU constellations, stick-figure pairs, English object classifications,
// and curated Messier (M1–M110) + Caldwell/NGC Deep Sky Object catalog.

export const IAU_CONSTELLATIONS = {
    And: 'Andromeda',
    Ant: 'Antlia',
    Aps: 'Apus',
    Aqr: 'Aquarius',
    Aql: 'Aquila',
    Ara: 'Ara',
    Ari: 'Aries',
    Aur: 'Auriga',
    Boo: 'Boötes',
    Cae: 'Caelum',
    Cam: 'Camelopardalis',
    Cnc: 'Cancer',
    CVn: 'Canes Venatici',
    CMa: 'Canis Major',
    CMi: 'Canis Minor',
    Cap: 'Capricornus',
    Car: 'Carina',
    Cas: 'Cassiopeia',
    Cen: 'Centaurus',
    Cep: 'Cepheus',
    Cet: 'Cetus',
    Cha: 'Chamaeleon',
    Cir: 'Circinus',
    Col: 'Columba',
    Com: 'Coma Berenices',
    CrA: 'Corona Australis',
    CrB: 'Corona Borealis',
    Crv: 'Corvus',
    Crt: 'Crater',
    Cru: 'Crux',
    Cyg: 'Cygnus',
    Del: 'Delphinus',
    Dor: 'Dorado',
    Dra: 'Draco',
    Equ: 'Equuleus',
    Eri: 'Eridanus',
    For: 'Fornax',
    Gem: 'Gemini',
    Gru: 'Grus',
    Her: 'Hercules',
    Hor: 'Horologium',
    Hya: 'Hydra',
    Hyi: 'Hydrus',
    Ind: 'Indus',
    Lac: 'Lacerta',
    Leo: 'Leo',
    LMi: 'Leo Minor',
    Lep: 'Lepus',
    Lib: 'Libra',
    Lup: 'Lupus',
    Lyn: 'Lynx',
    Lyr: 'Lyra',
    Men: 'Mensa',
    Mic: 'Microscopium',
    Mon: 'Monoceros',
    Mus: 'Musca',
    Nor: 'Norma',
    Oct: 'Octans',
    Oph: 'Ophiuchus',
    Ori: 'Orion',
    Pav: 'Pavo',
    Peg: 'Pegasus',
    Per: 'Perseus',
    Phe: 'Phoenix',
    Pic: 'Pictor',
    Psc: 'Pisces',
    PsA: 'Piscis Austrinus',
    Pup: 'Puppis',
    Pyx: 'Pyxis',
    Ret: 'Reticulum',
    Sge: 'Sagitta',
    Sgr: 'Sagittarius',
    Sco: 'Scorpius',
    Scl: 'Sculptor',
    Sct: 'Scutum',
    Ser: 'Serpens',
    Sex: 'Sextans',
    Tau: 'Taurus',
    Tel: 'Telescopium',
    Tri: 'Triangulum',
    TrA: 'Triangulum Australe',
    Tuc: 'Tucana',
    UMa: 'Ursa Major',
    UMi: 'Ursa Minor',
    Vel: 'Vela',
    Vir: 'Virgo',
    Vol: 'Volans',
    Vul: 'Vulpecula'
};

export const GREEK_LETTERS = {
    Alp: { name: 'Alpha', symbol: 'α' },
    Bet: { name: 'Beta', symbol: 'β' },
    Gam: { name: 'Gamma', symbol: 'γ' },
    Del: { name: 'Delta', symbol: 'δ' },
    Eps: { name: 'Epsilon', symbol: 'ε' },
    Zet: { name: 'Zeta', symbol: 'ζ' },
    Eta: { name: 'Eta', symbol: 'η' },
    The: { name: 'Theta', symbol: 'θ' },
    Iot: { name: 'Iota', symbol: 'ι' },
    Kap: { name: 'Kappa', symbol: 'κ' },
    Lam: { name: 'Lambda', symbol: 'λ' },
    Mu:  { name: 'Mu', symbol: 'μ' },
    Nu:  { name: 'Nu', symbol: 'ν' },
    Xi:  { name: 'Xi', symbol: 'ξ' },
    Omi: { name: 'Omicron', symbol: 'ο' },
    Pi:  { name: 'Pi', symbol: 'π' },
    Rho: { name: 'Rho', symbol: 'ρ' },
    Sig: { name: 'Sigma', symbol: 'σ' },
    Tau: { name: 'Tau', symbol: 'τ' },
    Ups: { name: 'Upsilon', symbol: 'υ' },
    Phi: { name: 'Phi', symbol: 'φ' },
    Chi: { name: 'Chi', symbol: 'χ' },
    Psi: { name: 'Psi', symbol: 'ψ' },
    Ome: { name: 'Omega', symbol: 'ω' }
};

export const TARGET_POOL_LABELS = {
    stars: 'Stars',
    dso: 'Deep Sky Objects'
};

export const SKILL_MODE_LABELS = {
    name: 'Identify Name',
    position: 'Locate Object',
    type: 'Classify Type',
    mag: 'Estimate Magnitude',
    multi: '1v1 Ranked Arena',
    free: 'Observatory Roam'
};

export const DIFFICULTY_LABELS = {
    easy: 'Easy (m ≤ 2.0)',
    medium: 'Medium (m ≤ 4.0)',
    hard: 'Hard (m ≤ 5.0)',
    extreme: 'Extreme (m ≤ 6.5)'
};

export const DIFFICULTY_SHORT_LABELS = {
    easy: 'Easy',
    medium: 'Medium',
    hard: 'Hard',
    extreme: 'Extreme'
};

export const OBJECT_TYPE_LABELS = {
    single: 'Single Star',
    binary: 'Double / Multiple Star',
    variable: 'Variable Star',
    pulsating: 'Pulsating Variable',
    eruptive: 'Eruptive Variable',
    rotating: 'Rotating Variable',
    eclipsing: 'Eclipsing Binary',
    galaxy: 'Galaxy',
    nebula: 'Nebula / SNR',
    planetary_nebula: 'Planetary Nebula',
    open_cluster: 'Open Cluster',
    globular_cluster: 'Globular Cluster',
    other_dso: 'Optical Double / Asterism'
};

export const STAR_TYPE_KEYS = [
    'single',
    'binary',
    'variable',
    'pulsating',
    'eruptive',
    'rotating',
    'eclipsing'
];

export const DSO_TYPE_KEYS = [
    'galaxy',
    'nebula',
    'planetary_nebula',
    'open_cluster',
    'globular_cluster'
];

export const CUSTOM_STAR_CORRECTIONS = [
    { identifier: 'Alpha CMa', properName: 'Sirius', altNames: ['dog star', 'alpha canis majoris'] },
    { identifier: 'Alpha UMi', properName: 'Polaris', altNames: ['north star', 'pole star', 'cynosura'] },
    { identifier: 'Alpha Cen', properName: 'Rigil Kentaurus', altNames: ['alpha centauri', 'toliman'] },
    { identifier: 'Alpha Gru', properName: 'Alnair', altNames: ['al nair'] },
    { identifier: 'Alpha Car', properName: 'Canopus', altNames: [] },
    { identifier: 'Alpha Lyr', properName: 'Vega', altNames: [] },
    { identifier: 'Alpha Ori', properName: 'Betelgeuse', altNames: [] },
    { identifier: 'Beta Ori', properName: 'Rigel', altNames: [] },
    { identifier: 'Alpha Boo', properName: 'Arcturus', altNames: [] },
    { identifier: 'Alpha Aur', properName: 'Capella', altNames: [] },
    { identifier: 'Alpha Tau', properName: 'Aldebaran', altNames: [] },
    { identifier: 'Alpha Sco', properName: 'Antares', altNames: [] },
    { identifier: 'Alpha Vir', properName: 'Spica', altNames: [] },
    { identifier: 'Alpha Cyg', properName: 'Deneb', altNames: [] },
    { identifier: 'Alpha Aql', properName: 'Altair', altNames: [] },
    { identifier: 'Alpha Leo', properName: 'Regulus', altNames: [] },
    { identifier: 'Alpha PsA', properName: 'Fomalhaut', altNames: [] },
    { identifier: 'Alpha Cru', properName: 'Acrux', altNames: [] },
    { identifier: 'Alpha Eri', properName: 'Achernar', altNames: [] },
    { identifier: 'Alpha CMi', properName: 'Procyon', altNames: [] },
    { identifier: 'Beta Per', properName: 'Algol', altNames: ['demon star'] },
    { identifier: 'Omicron Cet', properName: 'Mira', altNames: [] },
    { identifier: 'Zeta UMa', properName: 'Mizar', altNames: [] },
    { identifier: 'Beta Cyg', properName: 'Albireo', altNames: [] }
];

export const STAR_CLASSIFICATIONS = {
    binary: ['Alpha CMa', 'Alpha Cen', 'Beta Cyg', 'Zeta UMa', 'Alpha Gem', 'Alpha Cru', 'Beta Ori', 'Alpha Aur'],
    pulsating: ['Alpha Ori', 'Alpha Sco', 'Delta Cep', 'Omicron Cet', 'Alpha UMi', 'Eta Aql', 'Zeta Gem'],
    eruptive: ['Gamma Cas'],
    rotating: ['Alpha CVn'],
    eclipsing: ['Beta Per', 'Beta Lyr', 'Epsilon Aur'],
    variable: []
};

// All 88 IAU constellation stick-figure star pairs (trimmed & deduplicated)
export const CONSTELLATION_LINES = [
    // 1. Andromeda
    ['Alpha And','Delta And'], ['Delta And','Beta And'], ['Beta And','Gamma And'], ['Beta And','Mu And'], ['Mu And','Nu And'],
    // 2. Antlia
    ['Alpha Ant','Eta Ant'],
    // 3. Apus
    ['Alpha Aps','Gamma Aps'], ['Gamma Aps','Beta Aps'],
    // 4. Aquarius
    ['Epsilon Aqr','Mu Aqr'], ['Mu Aqr','Beta Aqr'], ['Beta Aqr','Alpha Aqr'], ['Alpha Aqr','Theta Aqr'], ['Theta Aqr','Iota Aqr'],
    ['Theta Aqr','Sigma Aqr'], ['Sigma Aqr','Tau Aqr'], ['Tau Aqr','Delta Aqr'], ['Delta Aqr','HIP 114341'], ['Alpha Aqr','Gamma Aqr'],
    ['Gamma Aqr','Zeta Aqr'], ['Zeta Aqr','Eta Aqr'], ['Eta Aqr','Lambda Aqr'], ['Lambda Aqr','Psi Aqr'], ['Psi Aqr','HIP 115438'],
    // 5. Aquila
    ['Alpha Aql','Beta Aql'], ['Alpha Aql','Gamma Aql'], ['Alpha Aql','Delta Aql'], ['Delta Aql','Zeta Aql'], ['Zeta Aql','Epsilon Aql'],
    ['Delta Aql','Eta Aql'], ['Eta Aql','Theta Aql'], ['Delta Aql','Lambda Aql'],
    // 6. Ara
    ['Alpha Ara','Zeta Ara'], ['Zeta Ara','Eta Ara'], ['Eta Ara','Delta Ara'], ['Delta Ara','Gamma Ara'], ['Gamma Ara','Beta Ara'],
    ['Beta Ara','Theta Ara'], ['Theta Ara','Alpha Ara'],
    // 7. Aries
    ['HIP 13209','Alpha Ari'], ['Alpha Ari','Beta Ari'], ['Beta Ari','Gamma Ari'],
    // 8. Auriga
    ['Alpha Aur','Beta Aur'], ['Beta Aur','Theta Aur'], ['Theta Aur','Beta Tau'], ['Beta Tau','Iota Aur'], ['Iota Aur','Zeta Aur'],
    ['Zeta Aur','Epsilon Aur'], ['Epsilon Aur','Alpha Aur'],
    // 9. Boötes
    ['Rho Boo','Alpha Boo'], ['Alpha Boo','Zeta Boo'], ['Alpha Boo','Eta Boo'], ['Alpha Boo','Epsilon Boo'], ['Epsilon Boo','Delta Boo'],
    ['Delta Boo','Beta Boo'], ['Beta Boo','Gamma Boo'], ['Gamma Boo','Rho Boo'], ['Gamma Boo','Lambda Boo'], ['Lambda Boo','Theta Boo'],
    // 10. Caelum
    ['Beta Cae','Alpha Cae'], ['Alpha Cae','Delta Cae'],
    // 11. Camelopardalis
    ['Alpha Cam','Gamma Cam'], ['Alpha Cam','HIP 18505'], ['HIP 16228','HIP 18505'], ['Gamma Cam','HIP 16228'], ['Gamma Cam','HIP 25110'],
    // 12. Cancer
    ['Alpha Cnc','Delta Cnc'], ['Beta Cnc','Delta Cnc'], ['Delta Cnc','Gamma Cnc'], ['Gamma Cnc','Iota Cnc'], ['Gamma Cnc','Chi Cnc'],
    // 13. Canes Venatici
    ['Alpha CVn','Beta CVn'],
    // 14. Canis Major
    ['Alpha CMa','Iota CMa'], ['Iota CMa','Gamma CMa'], ['Iota CMa','Theta CMa'], ['Gamma CMa','Theta CMa'], ['Alpha CMa','Nu CMa'],
    ['Nu CMa','Beta CMa'], ['Nu CMa','Xi CMa'], ['Alpha CMa','HIP 33977'], ['HIP 33977','Delta CMa'], ['Delta CMa','Omega CMa'],
    ['Omega CMa','Eta CMa'], ['Delta CMa','Sigma CMa'], ['Sigma CMa','Omicron CMa'], ['Omicron CMa','Nu CMa'], ['Sigma CMa','Epsilon CMa'],
    ['Epsilon CMa','Zeta CMa'], ['Epsilon CMa','Kappa CMa'],
    // 15. Canis Minor
    ['Alpha CMi','Beta CMi'],
    // 16. Capricornus
    ['Alpha Cap','Beta Cap'], ['Beta Cap','Psi Cap'], ['Beta Cap','Theta Cap'], ['Theta Cap','Omega Cap'], ['Theta Cap','Iota Cap'],
    ['Iota Cap','Zeta Cap'], ['Zeta Cap','Theta Cap'], ['Iota Cap','Gamma Cap'], ['Gamma Cap','Delta Cap'],
    // 17. Carina
    ['Alpha Car','Epsilon Car'], ['Epsilon Car','HIP 42568'], ['HIP 42568','HIP 45080'], ['HIP 45080','Iota Car'], ['Iota Car','HIP 50371'],
    ['HIP 50371','HIP 51232'], ['HIP 51232','HIP 53253'], ['HIP 53253','HIP 54463'], ['HIP 54463','HIP 52468'], ['HIP 52468','Theta Car'],
    ['Theta Car','Omega Car'], ['Omega Car','Beta Car'],
    // 18. Cassiopeia
    ['Epsilon Cas','Delta Cas'], ['Delta Cas','Gamma Cas'], ['Gamma Cas','Alpha Cas'], ['Alpha Cas','Beta Cas'],
    // 19. Centaurus
    ['Alpha Cen','Beta Cen'], ['Beta Cen','Epsilon Cen'], ['Epsilon Cen','Zeta Cen'], ['Zeta Cen','Gamma Cen'], ['Gamma Cen','Sigma Cen'],
    ['Sigma Cen','Delta Cen'], ['Delta Cen','HIP 56480'], ['HIP 56480','Lambda Cen'], ['Zeta Cen','HIP 68282'], ['HIP 68282','Mu Cen'],
    ['Mu Cen','Eta Cen'], ['Eta Cen','Kappa Cen'], ['Mu Cen','Nu Cen'], ['Nu Cen','Theta Cen'], ['Nu Cen','HIP 65936'], ['HIP 65936','Iota Cen'],
    // 20. Cepheus
    ['Alpha Cep','Beta Cep'], ['Beta Cep','Gamma Cep'], ['Gamma Cep','Iota Cep'], ['Iota Cep','Zeta Cep'], ['Alpha Cep','Zeta Cep'],
    ['Beta Cep','Iota Cep'],
    // 21. Cetus
    ['Alpha Cet','Lambda Cet'], ['Lambda Cet','Mu Cet'], ['Mu Cet','HIP 11484'], ['HIP 11484','HIP 10324'], ['HIP 11484','Nu Cet'],
    ['Nu Cet','Gamma Cet'], ['Gamma Cet','Delta Cet'], ['Delta Cet','Omicron Cet'], ['Omicron Cet','Epsilon Cet'], ['Epsilon Cet','Pi Cet'],
    ['Pi Cet','Sigma Cet'], ['Sigma Cet','Tau Cet'], ['Tau Cet','Beta Cet'], ['Beta Cet','Iota Cet'], ['Beta Cet','Eta Cet'],
    ['Eta Cet','Theta Cet'], ['Zeta Cet','Theta Cet'], ['Zeta Cet','Rho Cet'], ['Rho Cet','Epsilon Cet'], ['Gamma Cet','Alpha Cet'],
    // 22. Chamaeleon
    ['Alpha Cha','Gamma Cha'], ['Beta Cha','Gamma Cha'],
    // 23. Circinus
    ['Alpha Cir','Beta Cir'], ['Alpha Cir','Gamma Cir'],
    // 24. Columba
    ['Alpha Col','Epsilon Col'], ['Alpha Col','Beta Col'], ['Beta Col','Eta Col'], ['Beta Col','Gamma Col'], ['Gamma Col','Kappa Col'],
    ['Kappa Col','Delta Col'],
    // 25. Coma Berenices
    ['Alpha Com','Beta Com'], ['Beta Com','Gamma Com'],
    // 26. Corona Australis
    ['HIP 92953','Zeta CrA'], ['Zeta CrA','Delta CrA'], ['Delta CrA','Beta CrA'], ['Beta CrA','Alpha CrA'], ['Alpha CrA','Gamma CrA'],
    ['Gamma CrA','Epsilon CrA'], ['Epsilon CrA','HIP 92989'], ['HIP 92989','Lambda CrA'], ['Lambda CrA','HIP 90887'],
    // 27. Corona Borealis
    ['Theta CrB','Beta CrB'], ['Beta CrB','Alpha CrB'], ['Alpha CrB','Gamma CrB'], ['Gamma CrB','Delta CrB'], ['Delta CrB','Epsilon CrB'],
    ['Epsilon CrB','Iota CrB'],
    // 28. Corvus
    ['Alpha Crv','Epsilon Crv'], ['Epsilon Crv','Gamma Crv'], ['Gamma Crv','Delta Crv'], ['Delta Crv','Eta Crv'], ['Delta Crv','Beta Crv'],
    ['Beta Crv','Epsilon Crv'],
    // 29. Crater
    ['Alpha Crt','Beta Crt'], ['Beta Crt','Gamma Crt'], ['Gamma Crt','Delta Crt'], ['Delta Crt','Epsilon Crt'], ['Epsilon Crt','Theta Crt'],
    ['Theta Crt','Eta Crt'], ['Eta Crt','Zeta Crt'], ['Zeta Crt','Gamma Crt'], ['Delta Crt','Alpha Crt'],
    // 30. Crux
    ['Alpha Cru','Gamma Cru'], ['Beta Cru','Delta Cru'],
    // 31. Cygnus
    ['Kappa Cyg','Iota Cyg'], ['Iota Cyg','Delta Cyg'], ['Delta Cyg','Gamma Cyg'], ['Gamma Cyg','Epsilon Cyg'], ['Epsilon Cyg','Zeta Cyg'],
    ['Zeta Cyg','Mu Cyg'], ['Gamma Cyg','Alpha Cyg'], ['Gamma Cyg','Eta Cyg'], ['Eta Cyg','Beta Cyg'],
    // 32. Delphinus
    ['Epsilon Del','Beta Del'], ['Beta Del','Alpha Del'], ['Alpha Del','Gamma Del'], ['Gamma Del','Delta Del'], ['Delta Del','Beta Del'],
    // 33. Dorado
    ['Gamma Dor','Alpha Dor'], ['Alpha Dor','Beta Dor'], ['Beta Dor','Delta Dor'], ['Delta Dor','HIP 27890'], ['HIP 27890','Beta Dor'],
    // 34. Draco
    ['Lambda Dra','Kappa Dra'], ['Kappa Dra','Alpha Dra'], ['Alpha Dra','Iota Dra'], ['Iota Dra','Theta Dra'], ['Theta Dra','Eta Dra'],
    ['Eta Dra','Zeta Dra'], ['Zeta Dra','Chi Dra'], ['Chi Dra','Tau Dra'], ['Tau Dra','Epsilon Dra'], ['Epsilon Dra','Delta Dra'],
    ['Delta Dra','Xi Dra'], ['Xi Dra','Gamma Dra'], ['Gamma Dra','Beta Dra'], ['Beta Dra','Nu Dra'], ['Nu Dra','Xi Dra'],
    // 35. Equuleus
    ['Alpha Equ','Beta Equ'], ['Beta Equ','Delta Equ'], ['Delta Equ','Gamma Equ'], ['Gamma Equ','Alpha Equ'],
    // 36. Eridanus
    ['HIP 21594','Lambda Eri'], ['Lambda Eri','Beta Eri'], ['Beta Eri','Omega Eri'], ['Omega Eri','Mu Eri'], ['Mu Eri','Nu Eri'],
    ['Nu Eri','Delta Eri'], ['Delta Eri','Epsilon Eri'], ['Epsilon Eri','Zeta Eri'], ['Zeta Eri','Eta Eri'], ['Eta Eri','HIP 12843'],
    ['HIP 12843','HIP 14146'], ['HIP 14146','HIP 15474'], ['HIP 15474','HIP 16611'], ['HIP 16611','HIP 17651'], ['HIP 17651','HIP 21393'],
    ['HIP 21393','HIP 20535'], ['HIP 20535','HIP 20042'], ['HIP 20042','HIP 17874'], ['HIP 17874','HIP 17797'], ['HIP 17797','HIP 15510'],
    ['HIP 15510','Theta Eri'], ['Theta Eri','Iota Eri'], ['Iota Eri','HIP 12413'], ['HIP 12413','Kappa Eri'], ['Kappa Eri','Phi Eri'],
    ['Phi Eri','Chi Eri'], ['Chi Eri','Alpha Eri'],
    // 37. Fornax
    ['Alpha For','Beta For'],
    // 38. Gemini
    ['Alpha Gem','Tau Gem'], ['Beta Gem','Upsilon Gem'], ['Kappa Gem','Upsilon Gem'], ['Upsilon Gem','Iota Gem'], ['Iota Gem','Tau Gem'],
    ['Tau Gem','Theta Gem'], ['Upsilon Gem','Delta Gem'], ['Delta Gem','Zeta Gem'], ['Zeta Gem','Gamma Gem'], ['Delta Gem','Lambda Gem'],
    ['Lambda Gem','Xi Gem'], ['Tau Gem','Epsilon Gem'], ['Epsilon Gem','Nu Gem'], ['Epsilon Gem','Mu Gem'], ['Mu Gem','Eta Gem'],
    ['Eta Gem','HIP 28734'],
    // 39. Grus
    ['Alpha Gru','Beta Gru'], ['Beta Gru','Epsilon Gru'], ['Beta Gru','Zeta Gru'], ['Beta Gru','Iota Gru'], ['Iota Gru','Theta Gru'],
    ['Theta Gru','Delta Gru'], ['Delta Gru','Alpha Gru'], ['Alpha Gru','Lambda Gru'], ['Lambda Gru','Gamma Gru'],
    // 40. Hercules
    ['Beta Her','Alpha Her'], ['Beta Her','Gamma Her'], ['Beta Her','Zeta Her'], ['Zeta Her','Epsilon Her'], ['Epsilon Her','Lambda Her'],
    ['Lambda Her','Delta Her'], ['Lambda Her','Mu Her'], ['Mu Her','Xi Her'], ['Xi Her','Omicron Her'], ['Zeta Her','Eta Her'],
    ['Eta Her','Sigma Her'], ['Sigma Her','Tau Her'], ['Tau Her','Phi Her'], ['Phi Her','Chi Her'], ['Eta Her','Pi Her'],
    ['Pi Her','HIP 84606'], ['HIP 84606','Rho Her'], ['Rho Her','Theta Her'], ['Theta Her','Iota Her'], ['Pi Her','Epsilon Her'],
    // 41. Horologium
    ['Alpha Hor','Zeta Hor'], ['Zeta Hor','Mu Hor'],
    // 42. Hydra
    ['Delta Hya','Sigma Hya'], ['Sigma Hya','Eta Hya'], ['Eta Hya','Rho Hya'], ['Rho Hya','Epsilon Hya'], ['Epsilon Hya','Delta Hya'],
    ['Rho Hya','Zeta Hya'], ['Zeta Hya','Theta Hya'], ['Theta Hya','HIP 46776'], ['HIP 46776','HIP 46509'], ['HIP 46509','Alpha Hya'],
    ['Alpha Hya','HIP 45751'], ['HIP 45751','Kappa Hya'], ['Kappa Hya','HIP 48356'], ['HIP 48356','HIP 49402'], ['HIP 49402','Lambda Hya'],
    ['Lambda Hya','Mu Hya'], ['Mu Hya','Nu Hya'], ['Nu Hya','Chi Hya'], ['Chi Hya','Xi Hya'], ['Xi Hya','Beta Hya'],
    ['Beta Hya','Psi Hya'], ['Psi Hya','Gamma Hya'], ['Gamma Hya','Pi Hya'], ['Pi Hya','HIP 69415'], ['HIP 69415','HIP 70306'],
    ['HIP 70306','HIP 72571'],
    // 43. Hydrus
    ['Beta Hyi','Gamma Hyi'], ['Gamma Hyi','Epsilon Hyi'], ['Epsilon Hyi','Delta Hyi'], ['Delta Hyi','Alpha Hyi'],
    // 44. Indus
    ['Alpha Ind','Beta Ind'], ['Beta Ind','Theta Ind'], ['Theta Ind','Alpha Ind'],
    // 45. Lacerta
    ['HIP 109937','HIP 111104'], ['HIP 111104','HIP 111022'], ['HIP 111022','HIP 110609'], ['HIP 110609','Beta Lac'], ['Beta Lac','Alpha Lac'],
    ['Alpha Lac','HIP 111022'],
    // 46. Leo
    ['Epsilon Leo','Mu Leo'], ['Mu Leo','Zeta Leo'], ['Zeta Leo','Gamma Leo'], ['Gamma Leo','Eta Leo'], ['Eta Leo','Alpha Leo'],
    ['Gamma Leo','Delta Leo'], ['Delta Leo','Beta Leo'], ['Beta Leo','Theta Leo'], ['Theta Leo','Alpha Leo'], ['Delta Leo','Theta Leo'],
    // 47. Leo Minor
    ['HIP 46952','HIP 49593'], ['HIP 49593','Beta LMi'], ['Beta LMi','HIP 53229'], ['HIP 53229','HIP 49593'],
    // 48. Lepus
    ['Alpha Lep','Beta Lep'], ['Beta Lep','Gamma Lep'], ['Gamma Lep','Delta Lep'], ['Delta Lep','Alpha Lep'], ['Alpha Lep','Zeta Lep'],
    ['Zeta Lep','Eta Lep'], ['Eta Lep','Theta Lep'], ['Alpha Lep','Mu Lep'], ['Mu Lep','Epsilon Lep'], ['Epsilon Lep','Beta Lep'],
    ['Mu Lep','Lambda Lep'], ['Lambda Lep','Nu Lep'], ['Mu Lep','Kappa Lep'], ['Kappa Lep','Iota Lep'],
    // 49. Libra
    ['Alpha Lib','Beta Lib'], ['Alpha Lib','Sigma Lib'], ['Beta Lib','Gamma Lib'], ['Gamma Lib','Theta Lib'], ['Sigma Lib','Upsilon Lib'],
    ['Upsilon Lib','Tau Lib'], ['Beta Lib','Sigma Lib'],
    // 50. Lupus
    ['Alpha Lup','Beta Lup'], ['Beta Lup','Delta Lup'], ['Delta Lup','Phi Lup'], ['Delta Lup','Gamma Lup'], ['Gamma Lup','Eta Lup'],
    ['Eta Lup','Theta Lup'], ['Theta Lup','Chi Lup'], ['Chi Lup','Eta Lup'], ['Gamma Lup','Omega Lup'], ['Omega Lup','Zeta Lup'],
    ['Zeta Lup','Rho Lup'], ['Alpha Lup','Tau Lup'], ['Alpha Lup','Zeta Lup'],
    // 51. Lynx
    ['Alpha Lyn','HIP 45688'], ['HIP 45688','HIP 44700'], ['HIP 44700','HIP 44248'], ['HIP 44248','HIP 41075'], ['HIP 41075','HIP 36145'],
    ['HIP 36145','HIP 33449'], ['HIP 33449','HIP 30060'],
    // 52. Lyra
    ['Alpha Lyr','Zeta Lyr'], ['Zeta Lyr','Delta Lyr'], ['Delta Lyr','Gamma Lyr'], ['Gamma Lyr','Beta Lyr'], ['Beta Lyr','Zeta Lyr'],
    // 53. Mensa
    ['Gamma Men','Mu Men'],
    // 54. Microscopium
    ['Alpha Mic','Gamma Mic'], ['Gamma Mic','Epsilon Mic'],
    // 55. Monoceros
    ['Zeta Mon','HIP 39211'], ['HIP 39211','Alpha Mon'], ['HIP 39211','Delta Mon'], ['Delta Mon','Beta Mon'], ['Delta Mon','Gamma Mon'],
    ['Delta Mon','HIP 32533'], ['HIP 32533','HIP 31978'], ['HIP 31978','HIP 30665'], ['HIP 32533','Epsilon Mon'], ['Epsilon Mon','HIP 31216'],
    ['HIP 31216','HIP 31978'],
    // 56. Musca
    ['Alpha Mus','Beta Mus'], ['Alpha Mus','Gamma Mus'], ['Beta Mus','Lambda Mus'], ['Gamma Mus','Lambda Mus'],
    // 57. Norma
    ['Eta Nor','Kappa Nor'], ['Eta Nor','Epsilon Nor'], ['Eta Nor','HIP 80000'], ['Kappa Nor','HIP 80000'], ['Epsilon Nor','HIP 80000'],
    // 58. Octans
    ['Delta Oct','Beta Oct'], ['Beta Oct','Nu Oct'], ['Nu Oct','Delta Oct'],
    // 59. Ophiuchus
    ['Alpha Oph','Beta Oph'], ['Beta Oph','Eta Oph'], ['Eta Oph','HIP 85755'], ['Eta Oph','Zeta Oph'], ['Zeta Oph','Epsilon Oph'],
    ['Epsilon Oph','Kappa Oph'], ['Kappa Oph','Alpha Oph'],
    // 60. Orion
    ['Alpha Ori','Lambda Ori'], ['Lambda Ori','Gamma Ori'], ['Gamma Ori','Delta Ori'], ['Delta Ori','Epsilon Ori'], ['Epsilon Ori','Zeta Ori'],
    ['Zeta Ori','Alpha Ori'], ['Zeta Ori','Kappa Ori'], ['Kappa Ori','Beta Ori'], ['Beta Ori','Delta Ori'], ['Alpha Ori','Mu Ori'],
    ['Mu Ori','Xi Ori'], ['Mu Ori','Nu Ori'], ['Nu Ori','Xi Ori'], ['Xi Ori','HIP 29434'], ['HIP 29434','HIP 28716'],
    ['HIP 28716','HIP 27913'], ['HIP 27913','Nu Ori'], ['Gamma Ori','HIP 22449'], ['HIP 22449','HIP 22509'], ['HIP 22509','HIP 22845'],
    ['HIP 22449','HIP 22549'], ['HIP 22549','HIP 22730'], ['HIP 22730','HIP 22797'], ['HIP 22797','HIP 23123'],
    // 61. Pavo
    ['Alpha Pav','Gamma Pav'], ['Gamma Pav','Beta Pav'], ['Beta Pav','Delta Pav'], ['Delta Pav','Alpha Pav'], ['Delta Pav','Epsilon Pav'],
    ['Epsilon Pav','Zeta Pav'], ['Zeta Pav','Kappa Pav'], ['Kappa Pav','Delta Pav'], ['Kappa Pav','Lambda Pav'], ['Lambda Pav','Xi Pav'],
    ['Lambda Pav','Pi Pav'], ['Xi Pav','Pi Pav'], ['Pi Pav','Eta Pav'],
    // 62. Pegasus
    ['Alpha And','Gamma Peg'], ['Gamma Peg','Alpha Peg'], ['Alpha Peg','Beta Peg'], ['Beta Peg','Eta Peg'], ['Eta Peg','Pi Peg'],
    ['Beta Peg','Mu Peg'], ['Mu Peg','Lambda Peg'], ['Lambda Peg','Iota Peg'], ['Iota Peg','Kappa Peg'], ['Alpha Peg','Xi Peg'],
    ['Xi Peg','Zeta Peg'], ['Zeta Peg','Theta Peg'], ['Theta Peg','Epsilon Peg'], ['Alpha And','Beta Peg'],
    // 63. Perseus
    ['Eta Per','Gamma Per'], ['Gamma Per','Alpha Per'], ['Alpha Per','Beta Per'], ['Beta Per','Rho Per'], ['Rho Per','HIP 13254'],
    ['Alpha Per','Delta Per'], ['Delta Per','Epsilon Per'], ['Epsilon Per','Xi Per'], ['Xi Per','Zeta Per'], ['Zeta Per','Omicron Per'],
    // 64. Phoenix
    ['Alpha Phe','Kappa Phe'], ['Alpha Phe','Epsilon Phe'], ['Epsilon Phe','Kappa Phe'], ['Kappa Phe','Beta Phe'], ['Kappa Phe','Zeta Phe'],
    ['Kappa Phe','Gamma Phe'], ['Beta Phe','Zeta Phe'], ['Beta Phe','Gamma Phe'], ['Beta Phe','Delta Phe'], ['Delta Phe','Psi Phe'],
    ['Psi Phe','Beta Phe'],
    // 65. Pictor
    ['Alpha Pic','Gamma Pic'], ['Gamma Pic','Beta Pic'],
    // 66. Pisces
    ['Gamma Psc','Kappa Psc'], ['Kappa Psc','Lambda Psc'], ['Lambda Psc','HIP 117245'], ['HIP 117245','Iota Psc'], ['Iota Psc','Theta Psc'],
    ['Theta Psc','HIP 115227'], ['HIP 115227','Gamma Psc'], ['Iota Psc','Omega Psc'], ['Omega Psc','HIP 1645'], ['HIP 1645','Delta Psc'],
    ['Delta Psc','Epsilon Psc'], ['Epsilon Psc','Mu Psc'], ['Mu Psc','Nu Psc'], ['Nu Psc','Xi Psc'], ['Xi Psc','Alpha Psc'],
    ['Alpha Psc','Omicron Psc'], ['Omicron Psc','Eta Psc'], ['Eta Psc','Phi Psc'], ['Phi Psc','Sigma Psc'], ['Sigma Psc','Upsilon Psc'],
    ['Upsilon Psc','Phi Psc'],
    // 67. Piscis Austrinus
    ['Alpha PsA','Epsilon PsA'], ['Epsilon PsA','Eta PsA'], ['Eta PsA','Theta PsA'], ['Theta PsA','Tau PsA'], ['Tau PsA','Beta PsA'],
    ['Beta PsA','Delta PsA'],
    // 68. Puppis
    ['Rho Pup','Xi Pup'], ['Xi Pup','Pi Pup'], ['Pi Pup','Alpha Car'], ['Pi Pup','Tau Pup'], ['Tau Pup','Sigma Pup'],
    ['Sigma Pup','Zeta Pup'], ['Zeta Pup','Rho Pup'], ['Zeta Pup','Epsilon Car'],
    // 69. Pyxis
    ['Alpha Pyx','Gamma Pyx'], ['Alpha Pyx','Beta Pyx'],
    // 70. Reticulum
    ['Alpha Ret','Beta Ret'], ['Beta Ret','Delta Ret'], ['Delta Ret','Epsilon Ret'], ['Epsilon Ret','Alpha Ret'],
    // 71. Sagitta
    ['Alpha Sge','Delta Sge'], ['Delta Sge','Beta Sge'], ['Delta Sge','Gamma Sge'], ['Gamma Sge','Eta Sge'],
    // 72. Sagittarius
    ['HIP 95294','Iota Sgr'], ['Iota Sgr','Alpha Sgr'], ['Iota Sgr','Theta Sgr'], ['Theta Sgr','HIP 98688'], ['HIP 98688','HIP 96406'],
    ['HIP 96406','Tau Sgr'], ['Tau Sgr','Zeta Sgr'], ['Zeta Sgr','Phi Sgr'], ['Phi Sgr','Sigma Sgr'], ['Sigma Sgr','Tau Sgr'],
    ['Sigma Sgr','HIP 93085'], ['HIP 93085','Omicron Sgr'], ['Omicron Sgr','HIP 94820'], ['HIP 94820','Rho Sgr'], ['Zeta Sgr','Epsilon Sgr'],
    ['Epsilon Sgr','Eta Sgr'], ['Epsilon Sgr','Delta Sgr'], ['Delta Sgr','Lambda Sgr'], ['Delta Sgr','Phi Sgr'], ['Phi Sgr','Lambda Sgr'],
    ['Lambda Sgr','Mu Sgr'], ['Delta Sgr','Gamma Sgr'], ['Gamma Sgr','Epsilon Sgr'], ['Gamma Sgr','HIP 87072'],
    // 73. Scorpius
    ['Lambda Sco','Kappa Sco'], ['Kappa Sco','Iota Sco'], ['Iota Sco','Theta Sco'], ['Theta Sco','Eta Sco'], ['Eta Sco','Zeta Sco'],
    ['Zeta Sco','Mu Sco'], ['Mu Sco','Epsilon Sco'], ['Epsilon Sco','Tau Sco'], ['Tau Sco','Alpha Sco'], ['Alpha Sco','Delta Sco'],
    ['Alpha Sco','Beta Sco'], ['Alpha Sco','Pi Sco'],
    // 74. Sculptor
    ['Alpha Scl','Beta Scl'], ['Beta Scl','Gamma Scl'], ['Gamma Scl','Alpha Scl'],
    // 75. Scutum
    ['Alpha Sct','Beta Sct'], ['Alpha Sct','Gamma Sct'], ['Beta Sct','HIP 92202'], ['HIP 92202','HIP 92814'], ['HIP 92814','Gamma Sct'],
    // 76. Serpens
    ['Theta Ser','HIP 90441'], ['HIP 90441','Eta Ser'], ['Eta Ser','HIP 88670'], ['HIP 88670','Nu Oph'], ['Nu Oph','Omicron Ser'],
    ['Omicron Ser','Xi Ser'], ['Xi Ser','Nu Ser'], ['Delta Oph','Mu Ser'], ['Mu Ser','Epsilon Ser'], ['Epsilon Ser','Alpha Ser'],
    ['Alpha Ser','Delta Ser'], ['Delta Ser','Beta Ser'], ['Beta Ser','Gamma Ser'], ['Gamma Ser','Kappa Ser'], ['Kappa Ser','Beta Ser'],
    // 77. Sextans
    ['Alpha Sex','Beta Sex'],
    // 78. Taurus
    ['Beta Tau','Tau Tau'], ['Tau Tau','Epsilon Tau'], ['Epsilon Tau','HIP 20648'], ['HIP 20648','Delta Tau'], ['Delta Tau','HIP 17847'],
    ['Delta Tau','Gamma Tau'], ['Gamma Tau','HIP 20894'], ['HIP 20894','Alpha Tau'], ['Alpha Tau','Epsilon Tau'], ['Alpha Tau','Zeta Tau'],
    ['Gamma Tau','Lambda Tau'], ['Lambda Tau','Omicron Tau'],
    // 79. Telescopium
    ['Alpha Tel','Zeta Tel'],
    // 80. Triangulum
    ['Alpha Tri','Beta Tri'], ['Beta Tri','Gamma Tri'], ['Alpha Tri','Gamma Tri'],
    // 81. Triangulum Australe
    ['Alpha TrA','Beta TrA'], ['Alpha TrA','Gamma TrA'], ['Beta TrA','Gamma TrA'],
    // 82. Tucana
    ['Alpha Tuc','Gamma Tuc'], ['Gamma Tuc','Beta Tuc'], ['Gamma Tuc','Zeta Tuc'],
    // 83. Ursa Major
    ['Eta UMa','Zeta UMa'], ['Zeta UMa','Epsilon UMa'], ['Epsilon UMa','Delta UMa'], ['Delta UMa','Gamma UMa'], ['Gamma UMa','Beta UMa'],
    ['Beta UMa','Alpha UMa'], ['Alpha UMa','Delta UMa'], ['Alpha UMa','HIP 46733'], ['HIP 46733','Omicron UMa'], ['Omicron UMa','Upsilon UMa'],
    ['Upsilon UMa','Phi UMa'], ['Beta UMa','Phi UMa'], ['Phi UMa','Theta UMa'], ['Theta UMa','Iota UMa'], ['Theta UMa','Kappa UMa'],
    ['Gamma UMa','Chi UMa'], ['Chi UMa','Psi UMa'], ['Psi UMa','Mu UMa'], ['Psi UMa','Lambda UMa'],
    // 84. Ursa Minor
    ['Alpha UMi','Delta UMi'], ['Delta UMi','Epsilon UMi'], ['Epsilon UMi','Zeta UMi'],
    ['Zeta UMi','Beta UMi'], ['Beta UMi','Gamma UMi'], ['Gamma UMi','Eta UMi'], ['Eta UMi','Zeta UMi'],
    // 85. Vela
    ['Gamma Vel','Omicron Vel'], ['Omicron Vel','Delta Vel'], ['Delta Vel','Kappa Vel'], ['Kappa Vel','Phi Vel'], ['Phi Vel','Mu Vel'],
    ['Mu Vel','HIP 51986'], ['HIP 51986','HIP 50191'], ['HIP 50191','Psi Vel'], ['Psi Vel','Lambda Vel'], ['Lambda Vel','Gamma Vel'],
    // 86. Virgo
    ['Nu Vir','Eta Vir'], ['Eta Vir','Gamma Vir'], ['Gamma Vir','Delta Vir'], ['Gamma Vir','Theta Vir'], ['Delta Vir','Epsilon Vir'],
    ['Delta Vir','Zeta Vir'], ['Theta Vir','Alpha Vir'], ['Alpha Vir','Zeta Vir'], ['Zeta Vir','Tau Vir'], ['Tau Vir','HIP 72220'],
    ['Alpha Vir','Kappa Vir'], ['Kappa Vir','Iota Vir'], ['Iota Vir','Mu Vir'],
    // 87. Volans
    ['Alpha Vol','Beta Vol'], ['Beta Vol','Epsilon Vol'], ['Epsilon Vol','Alpha Vol'], ['Epsilon Vol','Delta Vol'], ['Epsilon Vol','Zeta Vol'],
    ['Zeta Vol','HIP 34481'], ['HIP 34481','Epsilon Vol'],
    // 88. Vulpecula
    ['Alpha Vul','HIP 98543']
];

const DSO_TYPE_COLORS = {
    galaxy: 0xB39CD0,
    nebula: 0xFFC1CC,
    planetary_nebula: 0x35E6FF,
    open_cluster: 0xFFCF5C,
    globular_cluster: 0xFFE4A0,
    other_dso: 0xEDEDED
};

function dsoEntry(id, properName, ngc, con, type, ra, dec, mag, extraAlts = [], difficultyRank = 1, subtype = '') {
    const cleanProper = properName || '';
    const alts = [id.toLowerCase(), id.replace(/^([A-Z]+)(\d+)/, '$1 $2').toLowerCase()];
    if (ngc) {
        alts.push(ngc.toLowerCase());
        alts.push(ngc.replace(/\s+/g, '').toLowerCase());
    }
    extraAlts.forEach(a => alts.push(a.toLowerCase()));
    return {
        id,
        bayerName: id,
        ngc: ngc || '',
        constellation: con,
        constellationFull: IAU_CONSTELLATIONS[con] || con,
        properName: cleanProper,
        correctName: cleanProper.toLowerCase(),
        altNames: [...new Set(alts)],
        mag,
        correctType: type,
        subtype: subtype || OBJECT_TYPE_LABELS[type] || 'Deep Sky Object',
        ra,
        dec,
        color: DSO_TYPE_COLORS[type] || 0x35E6FF,
        difficultyRank,
        isDSO: true
    };
}

// Complete, verified Messier Catalog (M1–M110) + Curated Iconic Caldwell / NGC Deep Sky Objects
export const DEEP_SKY_CATALOG = [
    dsoEntry('M1', 'Crab Nebula', 'NGC 1952', 'Tau', 'nebula', 5.5755, 22.0145, 8.4, ['taurus a'], 1, 'Supernova Remnant'),
    dsoEntry('M2', '', 'NGC 7089', 'Aqr', 'globular_cluster', 21.5575, -0.8233, 6.5, [], 1),
    dsoEntry('M3', '', 'NGC 5272', 'CVn', 'globular_cluster', 13.7032, 28.3773, 6.2, [], 1),
    dsoEntry('M4', '', 'NGC 6121', 'Sco', 'globular_cluster', 16.3931, -26.5257, 5.6, ['spider globular'], 1),
    dsoEntry('M5', '', 'NGC 5904', 'Ser', 'globular_cluster', 15.3092, 2.0810, 5.6, ['rose cluster'], 1),
    dsoEntry('M6', 'Butterfly Cluster', 'NGC 6405', 'Sco', 'open_cluster', 17.6683, -32.2167, 4.2, [], 1),
    dsoEntry('M7', 'Ptolemy Cluster', 'NGC 6475', 'Sco', 'open_cluster', 17.8983, -34.8167, 3.3, ['ptolemy\'s cluster'], 1),
    dsoEntry('M8', 'Lagoon Nebula', 'NGC 6523', 'Sgr', 'nebula', 18.0633, -24.3833, 6.0, [], 1, 'Emission Nebula'),
    dsoEntry('M9', '', 'NGC 6333', 'Oph', 'globular_cluster', 17.3200, -18.5167, 7.7, [], 1),
    dsoEntry('M10', '', 'NGC 6254', 'Oph', 'globular_cluster', 16.9525, -4.1003, 6.6, [], 1),
    dsoEntry('M11', 'Wild Duck Cluster', 'NGC 6705', 'Sct', 'open_cluster', 18.8517, -6.2667, 5.8, [], 1),
    dsoEntry('M12', '', 'NGC 6218', 'Oph', 'globular_cluster', 16.7873, -1.9485, 6.7, [], 1),
    dsoEntry('M13', 'Hercules Cluster', 'NGC 6205', 'Her', 'globular_cluster', 16.6949, 36.4613, 5.8, ['great globular cluster in hercules', 'great hercules cluster'], 1),
    dsoEntry('M14', '', 'NGC 6402', 'Oph', 'globular_cluster', 17.6267, -3.2459, 7.6, [], 1),
    dsoEntry('M15', 'Pegasus Cluster', 'NGC 7078', 'Peg', 'globular_cluster', 21.4995, 12.1670, 6.2, ['great pegasus cluster'], 1),
    dsoEntry('M16', 'Eagle Nebula', 'NGC 6611', 'Ser', 'nebula', 18.3133, -13.7833, 6.0, ['star queen nebula', 'pillars of creation'], 1, 'Emission Nebula / Cluster'),
    dsoEntry('M17', 'Omega Nebula', 'NGC 6618', 'Sgr', 'nebula', 18.3467, -16.1833, 6.0, ['swan nebula', 'horseshoe nebula'], 1, 'Emission Nebula'),
    dsoEntry('M18', '', 'NGC 6613', 'Sgr', 'open_cluster', 18.3317, -17.1333, 7.5, ['black swan cluster'], 1),
    dsoEntry('M19', '', 'NGC 6273', 'Oph', 'globular_cluster', 17.0438, -26.2679, 6.8, [], 1),
    dsoEntry('M20', 'Trifid Nebula', 'NGC 6514', 'Sgr', 'nebula', 18.0433, -23.0333, 6.3, [], 1, 'Emission / Reflection Nebula'),
    dsoEntry('M21', '', 'NGC 6531', 'Sgr', 'open_cluster', 18.0767, -22.5000, 6.5, ['webb\'s cross'], 1),
    dsoEntry('M22', 'Sagittarius Cluster', 'NGC 6656', 'Sgr', 'globular_cluster', 18.6066, -23.9047, 5.1, ['great sagittarius cluster'], 1),
    dsoEntry('M23', '', 'NGC 6494', 'Sgr', 'open_cluster', 17.9467, -19.0167, 5.5, [], 1),
    dsoEntry('M24', 'Sagittarius Star Cloud', 'IC 4715', 'Sgr', 'open_cluster', 18.2817, -18.4833, 4.6, ['small sagittarius star cloud', 'ngc 6603'], 1, 'Star Cloud'),
    dsoEntry('M25', '', 'IC 4725', 'Sgr', 'open_cluster', 18.5267, -19.2500, 4.6, [], 1),
    dsoEntry('M26', '', 'NGC 6694', 'Sct', 'open_cluster', 18.7533, -9.4000, 8.0, [], 1),
    dsoEntry('M27', 'Dumbbell Nebula', 'NGC 6853', 'Vul', 'planetary_nebula', 19.9934, 22.7212, 7.5, ['apple core nebula'], 1),
    dsoEntry('M28', '', 'NGC 6626', 'Sgr', 'globular_cluster', 18.4091, -24.8698, 6.8, [], 1),
    dsoEntry('M29', 'Cooling Tower', 'NGC 6913', 'Cyg', 'open_cluster', 20.3983, 38.5333, 7.1, [], 1),
    dsoEntry('M30', '', 'NGC 7099', 'Cap', 'globular_cluster', 21.6728, -23.1799, 7.2, ['jellyfish cluster'], 1),
    dsoEntry('M31', 'Andromeda Galaxy', 'NGC 224', 'And', 'galaxy', 0.7123, 41.2688, 3.4, ['andromeda'], 1, 'Spiral Galaxy (SA(s)b)'),
    dsoEntry('M32', '', 'NGC 221', 'And', 'galaxy', 0.7116, 40.8652, 8.1, ['andromeda satellite'], 1, 'Dwarf Elliptical Galaxy'),
    dsoEntry('M33', 'Triangulum Galaxy', 'NGC 598', 'Tri', 'galaxy', 1.5641, 30.6599, 5.7, ['pinwheel of triangulum'], 1, 'Spiral Galaxy (SA(s)cd)'),
    dsoEntry('M34', 'Spiral Cluster', 'NGC 1039', 'Per', 'open_cluster', 2.7000, 42.7833, 5.5, [], 1),
    dsoEntry('M35', 'Shoe-Buckle Cluster', 'NGC 2168', 'Gem', 'open_cluster', 6.1483, 24.3333, 5.3, [], 1),
    dsoEntry('M36', 'Pinwheel Cluster', 'NGC 1960', 'Aur', 'open_cluster', 5.6017, 34.1333, 6.3, [], 1),
    dsoEntry('M37', 'Salt and Pepper Cluster', 'NGC 2099', 'Aur', 'open_cluster', 5.8733, 32.5500, 6.2, [], 1),
    dsoEntry('M38', 'Starfish Cluster', 'NGC 1912', 'Aur', 'open_cluster', 5.4783, 35.8333, 7.4, [], 1),
    dsoEntry('M39', 'Pyramid Cluster', 'NGC 7092', 'Cyg', 'open_cluster', 21.5367, 48.4333, 4.6, [], 1),
    dsoEntry('M40', 'Winnecke 4', 'WNC 4', 'UMa', 'other_dso', 12.3702, 58.0829, 9.0, ['winnecke 4'], 1, 'Optical Double Star'),
    dsoEntry('M41', 'Little Beehive Cluster', 'NGC 2287', 'CMa', 'open_cluster', 6.7833, -20.7333, 4.5, [], 1),
    dsoEntry('M42', 'Orion Nebula', 'NGC 1976', 'Ori', 'nebula', 5.5881, -5.3911, 4.0, ['great orion nebula'], 1, 'Diffuse Emission Nebula'),
    dsoEntry('M43', "De Mairan's Nebula", 'NGC 1982', 'Ori', 'nebula', 5.5920, -5.2700, 9.0, ['de mairans nebula'], 1, 'H II Region'),
    dsoEntry('M44', 'Beehive Cluster', 'NGC 2632', 'Cnc', 'open_cluster', 8.6683, 19.9833, 3.7, ['praesepe'], 1),
    dsoEntry('M45', 'Pleiades', 'Mel 22', 'Tau', 'open_cluster', 3.7833, 24.1167, 1.6, ['seven sisters', 'subaru'], 1),
    dsoEntry('M46', '', 'NGC 2437', 'Pup', 'open_cluster', 7.6967, -14.8167, 6.0, [], 1),
    dsoEntry('M47', '', 'NGC 2422', 'Pup', 'open_cluster', 7.6100, -14.5000, 4.4, [], 1),
    dsoEntry('M48', '', 'NGC 2548', 'Hya', 'open_cluster', 8.2300, -5.8000, 5.5, [], 1),
    dsoEntry('M49', '', 'NGC 4472', 'Vir', 'galaxy', 12.4963, 8.0004, 8.4, [], 1, 'Elliptical Galaxy'),
    dsoEntry('M50', 'Heart-Shaped Cluster', 'NGC 2323', 'Mon', 'open_cluster', 7.0533, -8.3333, 5.9, [], 1),
    dsoEntry('M51', 'Whirlpool Galaxy', 'NGC 5194', 'CVn', 'galaxy', 13.4979, 47.1953, 8.4, ['question mark galaxy'], 1, 'Grand-Design Spiral Galaxy'),
    dsoEntry('M52', 'Scorpion Cluster', 'NGC 7654', 'Cas', 'open_cluster', 23.4033, 61.5833, 5.0, [], 1),
    dsoEntry('M53', '', 'NGC 5024', 'Com', 'globular_cluster', 13.2153, 18.1682, 7.6, [], 1),
    dsoEntry('M54', '', 'NGC 6715', 'Sgr', 'globular_cluster', 18.9176, -30.4799, 7.6, [], 1),
    dsoEntry('M55', 'Specter Cluster', 'NGC 6809', 'Sgr', 'globular_cluster', 19.6666, -30.9648, 6.3, [], 1),
    dsoEntry('M56', '', 'NGC 6779', 'Lyr', 'globular_cluster', 19.2766, 30.1835, 8.3, [], 1),
    dsoEntry('M57', 'Ring Nebula', 'NGC 6720', 'Lyr', 'planetary_nebula', 18.8931, 33.0292, 8.8, [], 1),
    dsoEntry('M58', '', 'NGC 4579', 'Vir', 'galaxy', 12.6287, 11.8181, 9.7, [], 1, 'Barred Spiral Galaxy'),
    dsoEntry('M59', '', 'NGC 4621', 'Vir', 'galaxy', 12.7007, 11.6470, 9.6, [], 1, 'Elliptical Galaxy'),
    dsoEntry('M60', '', 'NGC 4649', 'Vir', 'galaxy', 12.7278, 11.5526, 8.8, [], 1, 'Elliptical Galaxy'),
    dsoEntry('M61', 'Swelling Spiral', 'NGC 4303', 'Vir', 'galaxy', 12.3653, 4.4738, 9.7, [], 1, 'Barred Spiral Galaxy'),
    dsoEntry('M62', 'Flickering Globular', 'NGC 6266', 'Oph', 'globular_cluster', 17.0202, -30.1137, 6.5, [], 1),
    dsoEntry('M63', 'Sunflower Galaxy', 'NGC 5055', 'CVn', 'galaxy', 13.2637, 42.0294, 8.6, [], 1, 'Flocculent Spiral Galaxy'),
    dsoEntry('M64', 'Black Eye Galaxy', 'NGC 4826', 'Com', 'galaxy', 12.9455, 21.6827, 8.5, ['evil eye galaxy', 'sleeping beauty galaxy'], 1, 'Spiral Galaxy'),
    dsoEntry('M65', '', 'NGC 3623', 'Leo', 'galaxy', 11.3155, 13.0922, 9.3, ['leo triplet'], 1, 'Intermediate Spiral Galaxy'),
    dsoEntry('M66', '', 'NGC 3627', 'Leo', 'galaxy', 11.3375, 12.9915, 8.9, ['leo triplet'], 1, 'Intermediate Spiral Galaxy'),
    dsoEntry('M67', 'King Cobra Cluster', 'NGC 2682', 'Cnc', 'open_cluster', 8.8550, 11.8167, 6.1, ['golden eye cluster'], 1),
    dsoEntry('M68', '', 'NGC 4590', 'Hya', 'globular_cluster', 12.6577, -26.7441, 7.8, [], 1),
    dsoEntry('M69', '', 'NGC 6637', 'Sgr', 'globular_cluster', 18.5231, -32.3481, 7.6, [], 1),
    dsoEntry('M70', '', 'NGC 6681', 'Sgr', 'globular_cluster', 18.7202, -32.2921, 7.9, [], 1),
    dsoEntry('M71', 'Angelfish Cluster', 'NGC 6838', 'Sge', 'globular_cluster', 19.8963, 18.7792, 8.2, [], 1),
    dsoEntry('M72', '', 'NGC 6981', 'Aqr', 'globular_cluster', 20.8910, -12.5373, 9.3, [], 1),
    dsoEntry('M73', '', 'NGC 6994', 'Aqr', 'open_cluster', 20.9817, -12.6333, 9.0, [], 1, 'Four-Star Asterism'),
    dsoEntry('M74', 'Phantom Galaxy', 'NGC 628', 'Psc', 'galaxy', 1.6116, 15.7836, 9.4, [], 1, 'Grand-Design Spiral Galaxy'),
    dsoEntry('M75', '', 'NGC 6864', 'Sgr', 'globular_cluster', 20.1014, -21.9223, 8.5, [], 1),
    dsoEntry('M76', 'Little Dumbbell Nebula', 'NGC 650', 'Per', 'planetary_nebula', 1.7055, 51.5754, 10.1, ['cork nebula', 'barbell nebula'], 1),
    dsoEntry('M77', 'Cetus A', 'NGC 1068', 'Cet', 'galaxy', 2.7113, -0.0133, 8.9, ['squid galaxy'], 1, 'Seyfert 2 Spiral Galaxy'),
    dsoEntry('M78', 'Casper the Friendly Ghost Nebula', 'NGC 2068', 'Ori', 'nebula', 5.7783, 0.0500, 8.3, [], 1, 'Reflection Nebula'),
    dsoEntry('M79', '', 'NGC 1904', 'Lep', 'globular_cluster', 5.4029, -24.5247, 7.7, [], 1),
    dsoEntry('M80', '', 'NGC 6093', 'Sco', 'globular_cluster', 16.2840, -22.9761, 7.3, [], 1),
    dsoEntry('M81', "Bode's Galaxy", 'NGC 3031', 'UMa', 'galaxy', 9.9259, 69.0653, 6.9, ['bodes galaxy'], 1, 'Grand-Design Spiral Galaxy'),
    dsoEntry('M82', 'Cigar Galaxy', 'NGC 3034', 'UMa', 'galaxy', 9.9312, 69.6797, 8.4, [], 1, 'Starburst Galaxy'),
    dsoEntry('M83', 'Southern Pinwheel Galaxy', 'NGC 5236', 'Hya', 'galaxy', 13.6169, -29.8654, 7.5, ['thousand-ruby galaxy'], 1, 'Barred Spiral Galaxy'),
    dsoEntry('M84', '', 'NGC 4374', 'Vir', 'galaxy', 12.4177, 12.8870, 9.1, [], 1, 'Lenticular Galaxy'),
    dsoEntry('M85', '', 'NGC 4382', 'Com', 'galaxy', 12.4233, 18.1911, 9.1, [], 1, 'Lenticular Galaxy'),
    dsoEntry('M86', '', 'NGC 4406', 'Vir', 'galaxy', 12.4366, 12.9460, 8.9, [], 1, 'Lenticular Galaxy'),
    dsoEntry('M87', 'Virgo A', 'NGC 4486', 'Vir', 'galaxy', 12.5137, 12.3911, 8.6, ['smoking gun galaxy'], 1, 'Supergiant Elliptical Galaxy'),
    dsoEntry('M88', '', 'NGC 4501', 'Com', 'galaxy', 12.5331, 14.4204, 9.6, [], 1, 'Spiral Galaxy'),
    dsoEntry('M89', '', 'NGC 4552', 'Vir', 'galaxy', 12.5944, 12.5563, 9.8, [], 1, 'Elliptical Galaxy'),
    dsoEntry('M90', '', 'NGC 4569', 'Vir', 'galaxy', 12.6138, 13.1629, 9.5, [], 1, 'Intermediate Spiral Galaxy'),
    dsoEntry('M91', '', 'NGC 4548', 'Com', 'galaxy', 12.5906, 14.4963, 10.2, [], 1, 'Barred Spiral Galaxy'),
    dsoEntry('M92', '', 'NGC 6341', 'Her', 'globular_cluster', 17.2854, 43.1359, 6.4, [], 1),
    dsoEntry('M93', 'Critter Cluster', 'NGC 2447', 'Pup', 'open_cluster', 7.7433, -23.8667, 6.0, [], 1),
    dsoEntry('M94', "Cat's Eye Galaxy", 'NGC 4736', 'CVn', 'galaxy', 12.8481, 41.1205, 8.2, ['crocodile eye galaxy'], 1, 'Spiral Galaxy'),
    dsoEntry('M95', '', 'NGC 3351', 'Leo', 'galaxy', 10.7327, 11.7038, 9.7, [], 1, 'Barred Spiral Galaxy'),
    dsoEntry('M96', '', 'NGC 3368', 'Leo', 'galaxy', 10.7794, 11.8199, 9.2, [], 1, 'Intermediate Spiral Galaxy'),
    dsoEntry('M97', 'Owl Nebula', 'NGC 3587', 'UMa', 'planetary_nebula', 11.2466, 55.0190, 9.9, [], 1),
    dsoEntry('M98', '', 'NGC 4192', 'Com', 'galaxy', 12.2301, 14.9005, 10.1, [], 1, 'Intermediate Spiral Galaxy'),
    dsoEntry('M99', 'St. Catherine\'s Wheel', 'NGC 4254', 'Com', 'galaxy', 12.3138, 14.4165, 9.9, ['coma pinwheel'], 1, 'Unbarred Spiral Galaxy'),
    dsoEntry('M100', 'Mirror Galaxy', 'NGC 4321', 'Com', 'galaxy', 12.3820, 15.8223, 9.3, ['blowdryer galaxy'], 1, 'Grand-Design Spiral Galaxy'),
    dsoEntry('M101', 'Pinwheel Galaxy', 'NGC 5457', 'UMa', 'galaxy', 14.0535, 54.3489, 7.9, [], 1, 'Face-On Spiral Galaxy'),
    dsoEntry('M102', 'Spindle Galaxy', 'NGC 5866', 'Dra', 'galaxy', 15.1082, 55.7632, 9.9, [], 1, 'Lenticular Galaxy'),
    dsoEntry('M103', '', 'NGC 581', 'Cas', 'open_cluster', 1.5550, 60.6583, 7.4, [], 1),
    dsoEntry('M104', 'Sombrero Galaxy', 'NGC 4594', 'Vir', 'galaxy', 12.6665, -11.6231, 8.0, [], 1, 'Unbarred Spiral Galaxy'),
    dsoEntry('M105', '', 'NGC 3379', 'Leo', 'galaxy', 10.7971, 12.5816, 9.3, [], 1, 'Elliptical Galaxy'),
    dsoEntry('M106', '', 'NGC 4258', 'CVn', 'galaxy', 12.3160, 47.3037, 8.4, [], 1, 'Intermediate Spiral Galaxy'),
    dsoEntry('M107', 'Crucifix Cluster', 'NGC 6171', 'Oph', 'globular_cluster', 16.5422, -13.0538, 7.9, [], 1),
    dsoEntry('M108', 'Surfboard Galaxy', 'NGC 3556', 'UMa', 'galaxy', 11.1919, 55.6741, 10.0, [], 1, 'Barred Spiral Galaxy'),
    dsoEntry('M109', 'Vacuum Cleaner Galaxy', 'NGC 3992', 'UMa', 'galaxy', 11.9600, 53.3745, 9.8, [], 1, 'Barred Spiral Galaxy'),
    dsoEntry('M110', 'Edward Young Star', 'NGC 205', 'And', 'galaxy', 0.6728, 41.6854, 8.1, [], 1, 'Dwarf Elliptical Galaxy'),

    // Iconic Caldwell / NGC / Southern Sky DSOs (Rank 2–3 for Olympiad depth)
    dsoEntry('C14', 'Double Cluster', 'NGC 869', 'Per', 'open_cluster', 2.3333, 57.1333, 3.7, ['h and chi persei', 'ngc 884', 'caldwell 14'], 2),
    dsoEntry('C80', 'Omega Centauri', 'NGC 5139', 'Cen', 'globular_cluster', 13.4465, -47.4795, 3.9, ['caldwell 80'], 2),
    dsoEntry('C106', '47 Tucanae', 'NGC 104', 'Tuc', 'globular_cluster', 0.4015, -72.0813, 4.1, ['caldwell 106'], 2),
    dsoEntry('C92', 'Carina Nebula', 'NGC 3372', 'Car', 'nebula', 10.7510, -59.8678, 1.0, ['eta carinae nebula', 'caldwell 92'], 2, 'Giant Emission Nebula'),
    dsoEntry('C63', 'Helix Nebula', 'NGC 7293', 'Aqr', 'planetary_nebula', 22.4940, -20.8371, 7.6, ['eye of god', 'caldwell 63'], 2),
    dsoEntry('C49', 'Rosette Nebula', 'NGC 2237', 'Mon', 'nebula', 6.5333, 5.0500, 9.0, ['ngc 2244', 'caldwell 49'], 2, 'H II Region'),
    dsoEntry('C34', 'Western Veil Nebula', 'NGC 6960', 'Cyg', 'nebula', 20.7617, 30.7167, 7.0, ['witch\'s broom', 'veil nebula', 'caldwell 34'], 2, 'Supernova Remnant'),
    dsoEntry('C33', 'Eastern Veil Nebula', 'NGC 6992', 'Cyg', 'nebula', 20.9400, 31.7167, 7.0, ['network nebula', 'caldwell 33'], 2, 'Supernova Remnant'),
    dsoEntry('C94', 'Jewel Box', 'NGC 4755', 'Cru', 'open_cluster', 12.8942, -60.3667, 4.2, ['kappa crucis cluster', 'caldwell 94'], 2),
    dsoEntry('C65', 'Sculptor Galaxy', 'NGC 253', 'Scl', 'galaxy', 0.7926, -25.2882, 7.1, ['silver coin galaxy', 'caldwell 65'], 2, 'Starburst Spiral Galaxy'),
    dsoEntry('C77', 'Centaurus A', 'NGC 5128', 'Cen', 'galaxy', 13.4246, -43.0191, 6.8, ['caldwell 77'], 2, 'Active Radio Galaxy'),
    dsoEntry('C20', 'North America Nebula', 'NGC 7000', 'Cyg', 'nebula', 20.9883, 44.3300, 4.0, ['caldwell 20'], 2, 'Emission Nebula'),
    dsoEntry('C6', "Cat's Eye Nebula", 'NGC 6543', 'Dra', 'planetary_nebula', 17.9759, 66.6332, 8.1, ['cats eye nebula', 'caldwell 6'], 2),
    dsoEntry('C39', 'Eskimo Nebula', 'NGC 2392', 'Gem', 'planetary_nebula', 7.4863, 20.9118, 9.2, ['clownface nebula', 'caldwell 39'], 2),
    dsoEntry('C41', 'Hyades', 'Mel 25', 'Tau', 'open_cluster', 4.4483, 15.8667, 0.5, ['caldwell 41'], 2),
    dsoEntry('C30', 'Deer Lick Galaxy', 'NGC 7331', 'Peg', 'galaxy', 22.6178, 34.4156, 9.5, ['caldwell 30'], 3, 'Unbarred Spiral Galaxy'),
    dsoEntry('C53', 'Spindle Galaxy (Sextans)', 'NGC 3115', 'Sex', 'galaxy', 10.0872, -7.7186, 8.9, ['caldwell 53'], 3, 'Lenticular Galaxy'),
    dsoEntry('LMC', 'Large Magellanic Cloud', 'ESO 56-115', 'Dor', 'galaxy', 5.3929, -69.7561, 0.9, ['nubecula major'], 2, 'Magellanic Spiral Galaxy'),
    dsoEntry('SMC', 'Small Magellanic Cloud', 'NGC 292', 'Tuc', 'galaxy', 0.8783, -72.8286, 2.7, ['nubecula minor'], 2, 'Dwarf Irregular Galaxy'),
    dsoEntry('NGC 2070', 'Tarantula Nebula', 'C103', 'Dor', 'nebula', 5.6442, -69.1008, 8.0, ['30 doradus', 'caldwell 103'], 2, 'Giant H II Region'),
    dsoEntry('IC 434', 'Horsehead Nebula', 'B 33', 'Ori', 'nebula', 5.6831, -2.4583, 6.8, ['barnard 33'], 2, 'Dark / Emission Nebula'),
    dsoEntry('NGC 2264', 'Christmas Tree Cluster', 'Cone Nebula', 'Mon', 'open_cluster', 6.6833, 9.8833, 3.9, ['cone nebula'], 3),
    dsoEntry('C19', 'Cocoon Nebula', 'IC 5146', 'Cyg', 'nebula', 21.8917, 47.2667, 7.2, ['caldwell 19'], 3, 'Emission / Reflection Nebula'),
    dsoEntry('C99', 'Coalsack Nebula', 'Coalsack', 'Cru', 'nebula', 12.8333, -63.0000, 5.0, ['caldwell 99'], 3, 'Dark Nebula')
];
