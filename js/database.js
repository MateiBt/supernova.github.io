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

async function initDatabase() {
    try {
        console.log("Începem citirea bazei de date...");
        
        // Calea actualizată pentru a citi CSV-ul din noul folder 'data/'
        const response = await fetch('data/hyg_optimizat.csv');
        if (!response.ok) throw new Error("Nu am putut găsi hyg_optimizat.csv.");
        
        const text = await response.text();
        const rows = text.split(/\r?\n/); 
        
        const iProper = 6;  
        const iRa = 7;      
        const iDec = 8;     
        const iMag = 13;    
        const iCi = 16;     
        const iBayer = 27;  
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
            
            // Definit ca "let" pentru a putea suprascrie eventualele lipsuri/erori din catalog
            let properName = cols[iProper] ? cols[iProper].trim() : "";
            
            // Extragem abrevierea
            let bayerAbbr = (cols.length > iBayer && cols[iBayer]) ? cols[iBayer].trim() : "";
            const con = (cols.length > iCon && cols[iCon]) ? cols[iCon].trim() : "";
            
            // REPARARE BUG: Tăiem sufixele "-1" sau "-2" pentru stelele multiple
            if (bayerAbbr.includes('-')) {
                bayerAbbr = bayerAbbr.split('-')[0];
            }
            
            let bayerName = "";
            if (bayerAbbr && con) {
                const greekFull = greekMap[bayerAbbr] || bayerAbbr;
                bayerName = `${greekFull} ${con}`;
            }

            // Corecturi manuale (Overrides) pentru a ocoli inexactitățile catalogului HYG
            if (bayerName === "Alpha Gru") {
                properName = "Alnair";
            }
            if (properName.toLowerCase() === "itonda") {
                bayerName = bayerName.replace("Sgr", "Gru");
            }
            
            // BUG REPARAT 2: Logica pentru tipul stelei.
            // În HYG, stelele simple și primare au comp = 1. Componentele secundare au 2, 3, etc.
            let tip = "simpla";
            const compVal = (cols.length > iComp && cols[iComp]) ? cols[iComp].trim() : "";
            const varVal = (cols.length > iVar && cols[iVar]) ? cols[iVar].trim() : "";
            
            if (compVal !== "" && parseInt(compVal) > 1) {
                tip = "dubla"; // Dacă componenta e > 1, sigur face parte dintr-un sistem multiplu
            } else if (varVal !== "") {
                tip = "pulsatila"; // Dacă are nume în catalogul de variabile
            }
            
            astronomyDatabase.push({
                id: idCounter++,
                bayerName: bayerName, 
                ra: parseFloat(cols[iRa] || 0),
                dec: parseFloat(cols[iDec] || 0),
                mag: mag,
                color: getStarColor(parseFloat(cols[iCi] || 0)),
                correctName: properName.toLowerCase(),
                correctType: tip
            });
        }
        
        console.log(`Bază de date pregătită: ${astronomyDatabase.length} stele încărcate.`);
    } catch (error) {
        console.error("Eroare critică la baza de date:", error);
    }
}
