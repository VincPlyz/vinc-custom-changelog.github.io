// --- KONSTANTEN ---
const PROXY_BASE_URL = 'https://mojira-bug-proxy.vincplyz.workers.dev'; 
const API_PATH_PREFIX = '/api/v1/issues/'; 
const MODAL_OVERLAY_ID = 'bug-modal-overlay';
const MODAL_CONTENT_ID = 'bug-modal-content';
const METADATA_COLUMN_ID = 'bug-metadata-column'; 
const DESCRIPTION_COLUMN_ID = 'bug-description-column'; 


// --- 1. ADF-PARSING LOGIK ---

function generateHtmlFromAdf(node) {
    let html = '';
    let innerContent = '';

    if (node.content && Array.isArray(node.content)) {
        node.content.forEach(child => {
            innerContent += generateHtmlFromAdf(child);
        });
    }

    switch (node.type) {
        case 'doc':
            html = innerContent;
            break;
        case 'heading':
            html = `<h4>${innerContent}</h4>`; 
            break;
        case 'paragraph':
            html = `<p>${innerContent}</p>`;
            break;
        case 'codeBlock':
            html = `<pre><code>${innerContent.trim()}</code></pre>`;
            break;
        case 'orderedList':
            html = `<ol>${innerContent}</ol>`;
            break;
        case 'bulletList':
            html = `<ul>${innerContent}</ul>`;
            break;
        case 'listItem':
            html = `<li>${innerContent}</li>`;
            break;
        case 'text':
            html = node.text || '';
            if (node.marks && Array.isArray(node.marks)) {
                 node.marks.forEach(mark => {
                    if (mark.type === 'link' && mark.attrs?.href) {
                        html = `<a href="${mark.attrs.href}" target="_blank" style="color: var(--mc-accent2);">${html}</a>`;
                    }
                    if (mark.type === 'strong') {
                        html = `<strong>${html}</strong>`;
                    }
                    if (mark.type === 'em') {
                        html = `<em>${html}</em>`;
                    }
                    if (mark.type === 'code') {
                        html = `<code>${html}</code>`; 
                    }
                });
            }
            break;
        default:
            html = innerContent;
            break;
    }
    
    return html;
}

// --- 2. MODAL RENDERING LOGIK (METADATEN IN LINKER SPALTE + ABSTÄNDE KORRIGIERT) ---

function generateBugModalHtml(data) {
    const fields = data.fields || data; 
    
    // --- DATEN SAMMELN ---
    const issueKey = data.key || 'N/A'; 
    const summary = fields?.summary || 'Zusammenfassung nicht gefunden';
    const status = fields?.status?.name || fields?.status || 'Unbekannt';
    const reporter = fields?.reporter?.displayName || fields?.reporter_name || 'Unbekannt';
    const created = fields?.created ? new Date(fields.created).toLocaleDateString() : 'N/A';
    
    const labels = fields?.labels || [];
    const affectsVersions = (fields?.versions || []).map(v => v.name).join(', ') || 'N/A';
    const fixVersions = (fields?.fixVersions || []).map(v => v.name).join(', ') || 'N/A';
    
    const rawAdfDescription = fields?.description;
    let descriptionOutput = 'Keine Beschreibung vorhanden.';
    if (rawAdfDescription) {
        try {
            const adfObject = JSON.parse(rawAdfDescription);
            descriptionOutput = generateHtmlFromAdf(adfObject); 
        } catch (e) {
            descriptionOutput = `<p class="error-message">Fehler beim Parsen der Beschreibung.</p>`;
        }
    }

    // --- Status-Klassen-Mapping ---
    const statusLower = status.toLowerCase().replace(/\s/g, '-');
    let statusClass = 'status-open'; // Default
    
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
        <div class="top-metadata bug-details space-y-1 mt-2 mb-6"> 
            
            <div class="flex flex-row space-x-2">
                <strong>Status:</strong>
                <span class="bug-status ${statusClass}">${status}</span>
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


    // --- A. HTML FÜR LINKEN INHALTS-SPALTE (KOMBINIERT) ---
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
    
// --- B. HTML FÜR RECHTE METADATEN-SPALTE (NUR VERSIONEN & LABELS - RECHTSBÜNDIG) ---
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


// --- 3. MODAL STEUERUNGS LOGIK ---

async function showBugModal(bugKey) {
    const modalOverlay = document.getElementById(MODAL_OVERLAY_ID);
    const modalContent = document.getElementById(MODAL_CONTENT_ID);
    const metadataColumn = document.getElementById(METADATA_COLUMN_ID);
    const descriptionColumn = document.getElementById(DESCRIPTION_COLUMN_ID);

    if (!modalOverlay || !modalContent || !metadataColumn || !descriptionColumn) {
        console.error("Bug Modal Struktur (Spalten) nicht im DOM gefunden.");
        return; 
    }
    
    // Lade-Status
    descriptionColumn.innerHTML = `<p class="text-center">Lade Bug ${bugKey.toUpperCase()}...</p>`;
    metadataColumn.innerHTML = `<p class="text-center">Lade Metadaten...</p>`;

    // 1. Sichtbar machen
    modalOverlay.style.display = 'flex'; 
    document.body.style.overflow = 'hidden'; 

    // 2. Animation starten
    setTimeout(() => {
        modalContent.classList.remove('scale-95', 'opacity-0');
        modalContent.classList.add('scale-100', 'opacity-100');
    }, 10); 

    try {
        const PROXY_URL = `${PROXY_BASE_URL}${API_PATH_PREFIX}${bugKey.toUpperCase()}`;
        const response = await fetch(PROXY_URL);
        
        if (!response.ok) throw new Error(`API Fehler! Status: ${response.status}.`);
        
        const data = await response.json(); 
        const { metadataHtml, descriptionHtml } = generateBugModalHtml(data);
        
        // Zuweisung zu den korrekten Spalten
        descriptionColumn.innerHTML = descriptionHtml;
        metadataColumn.innerHTML = metadataHtml; 

    } catch (error) {
        console.error("Ladefehler:", error);
        descriptionColumn.innerHTML = `<p class="error-message">Fehler beim Laden des Bug Reports (${bugKey.toUpperCase()}): ${error.message}.</p>`;
        metadataColumn.innerHTML = `<p class="error-message">Fehler.</p>`;
    }
}


// --- 4. MODAL SCHLIEẞEN & INITIALISIERUNG & EVENT LISTENER ---

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
            showBugModal(bugKey); 
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