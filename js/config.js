// ==========================================
// CONFIG.JS - Date fixe și dicționare
// ==========================================

export const RA_TO_RAD = (Math.PI * 2) / 24;
export const DEG_TO_RAD = Math.PI / 180;

export const customStarCorrections = [
    { identifier: "Alpha CMa", correctName: "sirius", altNames: ["dog star"] }
];

export const starClassifications = {
    "dubla": [ "Alpha CMa", "Alpha Cen", "Beta Cyg", "Zeta UMa" ],
    "pulsatila": [ "Alpha Ori", "Alpha Sco", "Delta Cep", "Omicron Cet" ],
    "eruptiva": [],
    "rotativa": [ "Alpha CVn" ],
    "eclipsanta": [ "Beta Per", "Beta Lyr" ],
    "variabila": []
};

export const constellationFullNames = {
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

export const constellationPairs = [
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
    ["Alpha Sge", "Delta Sge"], ["Delta Sge", "Beta Sge"], ["Alpha Sge", "Delta Sge"], ["Delta Sge", "Gamma Sge"], ["Gamma Sge", "Eta Sge"],
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

export const dictTarget = { "stars": "Stars", "dso": "DSO" }; 
export const dictMode = { "name": "Identify Name", "type": "Classify Type", "position": "Locate Object", "mag": "Guess Magnitude", "multi": "Multiplayer Arena", "free": "Free Roam" }; 
export const dictDiff = { "easy": "Easy", "medium": "Medium", "hard": "Hard", "extreme": "Extreme" };

export const typeDict = { 
    "simpla": "Simple Star", "dubla": "Double / Multiple Star", "variabila": "Variable Star (Generic)",
    "pulsatila": "Pulsating Variable", "eruptiva": "Eruptive Variable", "rotativa": "Rotative Variable",
    "eclipsanta": "Eclipsing Binary System", "galaxy": "Galaxy", "nebula": "Nebula / SNR", 
    "planetary_nebula": "Planetary Nebula", "open_cluster": "Open Cluster", "globular_cluster": "Globular Cluster"
};

export const starTypeKeys = ["simpla", "dubla", "variabila", "pulsatila", "eruptiva", "rotativa", "eclipsanta"]; 
export const dsoTypeKeys = ["galaxy", "nebula", "planetary_nebula", "open_cluster", "globular_cluster"];