(function() { // Start der Immediately Invoked Function Expression (IIFE)

// --- KONSTANTEN ---
const PROXY_BASE_URL = 'https://mojira-bug-proxy.vincplyz.workers.dev'; 
const API_PATH_PREFIX = '/api/v1/issues/'; 
const MODAL_OVERLAY_ID = 'bug-modal-overlay';
const MODAL_CONTENT_ID = 'bug-modal-content';
const METADATA_COLUMN_ID = 'bug-metadata-column'; 
const DESCRIPTION_COLUMN_ID = 'bug-description-column'; 

// WICHTIG: Die ADF-Funktion WIRD HIER NICHT NEU DEKLARIERT, 
// sondern wird global über window.generateHtmlFromAdf erwartet!
const generateHtmlFromAdf = window.generateHtmlFromAdf;
if (typeof generateHtmlFromAdf !== 'function') {
    console.error("Fehler: generateHtmlFromAdf ist im globalen Scope nicht verfügbar. Stellen Sie sicher, dass bug-viewer.js geladen ist und die Funktion exportiert.");
    return; // Abbruch, wenn Abhängigkeit fehlt
}


// --- 2. MODAL RENDERING LOGIK (KORRIGIERT FÜR METADATEN-FALLBACKS) ---

function generateBugModalHtml(data) {
    // Robustheit: Versucht, 'fields' zu verwenden, andernfalls das Hauptobjekt
    const fields = data.fields || data; 
    
    // --- DATEN SAMMELN (mit robusteren Fallbacks) ---
    const issueKey = data.key || 'N/A'; 
    const summary = fields?.summary || 'Zusammenfassung nicht gefunden';
    const status = fields?.status?.name || fields?.status || 'Unbekannt';
    const reporter = fields?.reporter?.displayName || fields?.reporter_name || 'Unbekannt';
    
    // KORREKTUR: Priorisiere created_date, da JIRA/Proxy sie so benennen kann
    const created = fields?.created_date ? new Date(fields.created_date).toLocaleDateString('de-DE') : (fields?.created ? new Date(fields.created).toLocaleDateString('de-DE') : 'N/A');
    
    const resolution = fields?.resolution?.name || fields?.resolution || 'Unresolved'; 
    
    // KORREKTUR: Labels direkt von 'fields' holen
    const labels = fields?.labels || [];
    
    // KORREKTUR: Affected Versions (versions (JIRA) oder affected_versions (Proxy))
    const affectedVersionsArray = fields?.versions || fields?.affected_versions || [];
    const affectsVersions = affectedVersionsArray.map(v => v.name || v).join(', ') || 'N/A';
    
    // KORREKTUR: Fix Versions (fixVersions (JIRA) oder fix_versions (Proxy))
    const fixVersionsArray = fields?.fixVersions || fields?.fix_versions || [];
    const fixVersions = fixVersionsArray.map(v => v.name || v).join(', ') || 'N/A';
    
    const rawAdfDescription = fields?.description;
    let descriptionOutput = 'Keine Beschreibung vorhanden.';
    if (rawAdfDescription) {
        try {
            // VERWENDET DIE GLOBALE FUNKTION
            const adfObject = JSON.parse(rawAdfDescription);
            descriptionOutput = generateHtmlFromAdf(adfObject); 
        } catch (e) {
            descriptionOutput = `<p class="error-message">Fehler beim Parsen der Beschreibung. RAW Daten: ${rawAdfDescription}</p>`;
        }
    }

    // --- Status-Klassen-Mapping ---
    const statusLower = status.toLowerCase().replace(/\s/g, '-');
    let statusClass = 'status-open'; 
    
    const statusMap = {
        'resolved': 'status-resolved',
        'fixed': 'status-resolved',
        'reopened': 'status-reopened', 
        'wont-fix': 'status-wont-fix',
        'invalid': 'status-invalid',
        'duplicate': 'status-duplicate',
        'open': 'status-open',
        'new': 'status-new'
    };
    if (statusMap[statusLower]) {
        statusClass = statusMap[statusLower];
    }
    
    // --- GENERIEREN DES METADATEN-BLOCKS FÜR DIE LINKEN SPALTE (Top-Metadaten) ---
    const topMetadataHtml = `
        <div class="top-metadata bug-details space-y-2 mt-2 mb-6"> 
            
            <div class="flex flex-row space-x-2">
                <strong>Status:</strong>
                <span class="bug-status ${statusClass}">${status}</span>
            </div>
            
            <div class="flex flex-row space-x-2">
                <strong>Resolution:</strong>
                <span>${resolution}</span>
            </div>

            <div>
                <strong>Reported By:</strong>
                <span>${reporter}</span>
            </div>
            
            <div>
                <strong>Created On:</strong>
                <span>${created}</span>
            </div>
        </div>
        <hr class="mb-6">
    `;


    // --- A. HTML FÜR LINKEN INHALTS-SPALTE (HAUPT-INHALT) ---
    const descriptionHtml = `
        <header class="bug-header mb-2">
            <h2 class="text-2xl font-bold" style="color: var(--mc-accent2);">
                <a href="https://bugs.mojang.com/browse/${issueKey}" target="_blank" style="color: var(--mc-accent2); text-decoration: none;">
                    ${issueKey} - ${summary}
                </a>
            </h2>
        </header>
        
        ${topMetadataHtml}
        
        <div class="bug-description-wrapper bug-description custom-description-content">
            <h3 class="mb-4">Beschreibung</h3>
            <div class="description-content">
                ${descriptionOutput}
            </div>
        </div>
    `;
    
    // --- B. HTML FÜR RECHTE METADATEN-SPALTE (SIDEBAR) ---
    const metadataHtml = `
        <div class="bug-details-sidebar bug-details space-y-4 pt-2 text-right">
            
            <div>
                <strong>Affects Version/s:</strong><br>
                <span>${affectsVersions}</span>
            </div>
            <div>
                <strong>Fix Version/s:</strong><br>
                <span>${fixVersions}</span>
            </div>
            <hr> 
            <div>
                <strong>Labels:</strong><br>
                <span class="labels-container flex flex-wrap gap-1 justify-end">
                    ${labels.length > 0 ? labels.map(label => `<span class="bg-gray-700 text-gray-300 px-2 py-0.5 rounded-full text-xs">${label}</span>`).join(' ') : 'None'}
                </span>
            </div>
        </div>
    `;

    return { metadataHtml, descriptionHtml }; 
}


// --- 3. MODAL STEUERUNGS LOGIK (Keine Änderungen nötig) ---

async function showBugModal(bugKey) {
    const modalOverlay = document.getElementById(MODAL_OVERLAY_ID);
    const modalContent = document.getElementById(MODAL_CONTENT_ID);
    const metadataColumn = document.getElementById(METADATA_COLUMN_ID);
    const descriptionColumn = document.getElementById(DESCRIPTION_COLUMN_ID);

    if (!modalOverlay || !modalContent || !metadataColumn || !descriptionColumn) {
        console.error("Bug Modal Struktur (Spalten) nicht im DOM gefunden.");
        return; 
    }
    
    descriptionColumn.innerHTML = `<p class="text-center">Lade Bug ${bugKey.toUpperCase()}...</p>`;
    metadataColumn.innerHTML = `<p class="text-center">Lade Metadaten...</p>`;

    modalOverlay.style.display = 'flex'; 
    document.body.style.overflow = 'hidden'; 

    setTimeout(() => {
        modalContent.classList.remove('scale-95', 'opacity-0');
        modalContent.classList.add('scale-100', 'opacity-100');
    }, 10); 

    try {
        const PROXY_URL = `${PROXY_BASE_URL}${API_PATH_PREFIX}${bugKey.toUpperCase()}`;
        const response = await fetch(PROXY_URL);
        
        if (!response.ok) throw new Error(`API Fehler! Status: ${response.status}.`);
        
        let rawText = await response.text();
        
        if (rawText.includes("Issue not found")) {
            throw new Error(`Bug ID "${bugKey.toUpperCase()}" wurde nicht gefunden.`);
        }
        
        const data = JSON.parse(rawText); 
        
        const { metadataHtml, descriptionHtml } = generateBugModalHtml(data);
        
        descriptionColumn.innerHTML = descriptionHtml;
        metadataColumn.innerHTML = metadataHtml; 

    } catch (error) {
        console.error("Ladefehler:", error);
        descriptionColumn.innerHTML = `<p class="error-message">Fehler beim Laden des Bug Reports (${bugKey.toUpperCase()}): <strong>${error.message}</strong>.</p>`;
        metadataColumn.innerHTML = `<p class="error-message">Fehler.</p>`;
    }
}


// --- 4. MODAL SCHLIEẞEN & INITIALISIERUNG & EVENT LISTENER (Keine Änderungen nötig) ---

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById(MODAL_OVERLAY_ID);
    const closeButton = document.getElementById('close-modal-button');
    const modalTriggerLinks = document.querySelectorAll('.bug-modal-trigger'); 

    if (!modal || !closeButton) return;

    const closeModal = () => {
        const modalContent = document.getElementById(MODAL_CONTENT_ID);
        if (!modalContent) return;

        modalContent.classList.remove('scale-100', 'opacity-100');
        modalContent.classList.add('scale-95', 'opacity-0');

        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = ''; 
        }, 300);
    };

    modalTriggerLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); 
            const bugKey = this.getAttribute('data-bug-id');
            if (bugKey) {
                showBugModal(bugKey); 
            } else {
                console.error("Bug Modal Trigger fehlt data-bug-id Attribut.");
            }
        });
    });

    closeButton.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target.id === MODAL_OVERLAY_ID) closeModal();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display !== 'none') closeModal();
    });
});
window.showBugModal = showBugModal;
})(); // Ende der IIFE