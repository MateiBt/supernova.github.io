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
        
        // AICI AM MODIFICAT: am adăugat folderul "data/" în fața numelui fișierului
        const fisierCSV = 'data/hyg_optimizat.csv'; 
        
        const response = await fetch(fisierCSV);
        if (!response.ok) throw new Error("Nu am putut găsi fișierul " + fisierCSV);
        
        const text = await response.text();
        
        // --- 1. VERIFICARE DACA CALEA E GRESITA (Dacă descarcă HTML din greșeală) ---
        if (text.trim().toLowerCase().startsWith("<!doctype") || text.trim().toLowerCase().startsWith("<html")) {
            alert("CALE GREȘITĂ: Browserul nu a găsit CSV-ul și a încărcat pagina HTML. Verifică în ce folder ai pus hyg_optimizat.csv și corectează linia 17!");
            return;
        }

        // --- 2. AUTO-DETECTARE REPARAȚIE EXCEL ---
        let separator = ',';
        if (text.indexOf(';') !== -1 && text.indexOf(';') < 100) {
            separator = ';'; // Dacă Excel a stricat fișierul, îl reparăm din mers
            console.log("Atenție: S-a detectat format Excel (punct și virgulă). Auto-reparare activată.");
        }
        
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
            const cols = cleanRow.split(separator); // Folosește separatorul detectat automat
            
            if (cols.length <= iMag) continue;

            const magStr = cols[iMag] ? cols[iMag].trim() : "";
            const mag = parseFloat(magStr);
            
            if (isNaN(mag) || mag > 6.5) continue;
            
            const properName = cols[iProper] ? cols[iProper].trim() : "";
            
            let bayerAbbr = (cols.length > iBayer && cols[iBayer]) ? cols[iBayer].trim() : "";
            const con = (cols.length > iCon && cols[iCon]) ? cols[iCon].trim() : "";
            
            if (bayerAbbr.includes('-')) {
                bayerAbbr = bayerAbbr.split('-')[0];
            }
            
            let bayerName = "";
            if (bayerAbbr && con) {
                const greekFull = greekMap[bayerAbbr] || bayerAbbr;
                bayerName = `${greekFull} ${con}`;
            }
            
            let tip = "simpla";
            if (cols.length > iComp && cols[iComp] && cols[iComp].trim() !== "") {
                tip = "dubla";
            } else if (cols.length > iVar && cols[iVar] && cols[iVar].trim() !== "") {
                tip = "pulsatila"; 
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