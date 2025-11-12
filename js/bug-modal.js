// --- KONSTANTEN ---
// Ihr Cloudflare Worker Proxy
const PROXY_BASE_URL = 'https://mojira-bug-proxy.vincplyz.workers.dev'; 
const API_PATH_PREFIX = '/api/v1/issues/'; 
const MODAL_OVERLAY_ID = 'bug-modal-overlay';
const MODAL_DISPLAY_ID = 'bug-info-display';


// --- 1. ADF-PARSING LOGIK ---

/**
 * Generiert rekursiv HTML aus dem Atlassian Document Format (ADF) JSON.
 * (Diese Funktion ist identisch zur Logik in der alten bug-viewer.js)
 */
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
            const level = node.attrs && node.attrs.level ? node.attrs.level : 3;
            if (level >= 3) {
                 html = `<h4>${innerContent}</h4>`;
            } else {
                 html = `<p>${innerContent}</p>`;
            }
            break;
        case 'paragraph':
            html = `<p>${innerContent}</p>`;
            break;
        case 'codeBlock':
            const codeContent = innerContent.trim();
            // Codeblock HTML für das Modal
            html = `
                <div class="code-block-container">
                    <button class="copy-code-button" data-clipboard-text="${codeContent.replace(/"/g, '&quot;')}">
                        Kopieren
                    </button>
                    <pre><code>${codeContent}</code></pre>
                </div>
            `;
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
                        html = `<a href="${mark.attrs.href}" target="_blank">${html}</a>`;
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

// --- 2. MODAL RENDERING LOGIK ---

/**
 * Generiert das gesamte HTML für den Bug-Report im Modal.
 * @param {object} data - Das JSON-Objekt vom Worker/Mojira API.
 */
function generateBugModalHtml(data) {
    const fields = data.fields || data; 
    
    const issueKey = data.key || 'N/A'; 
    const summary = fields?.summary || 'Zusammenfassung nicht gefunden';
    const status = fields?.status?.name || fields?.status || 'Unbekannt';
    const reporter = fields?.reporter?.displayName || fields?.reporter_name || 'Unbekannt';
    const created = fields?.created ? new Date(fields.created).toLocaleDateString() : (fields?.created_date ? new Date(fields.created_date).toLocaleDateString() : 'N/A');
    
    const rawAdfDescription = fields?.description;
    let descriptionOutput = 'Keine Beschreibung vorhanden.';

    if (rawAdfDescription) {
        try {
            const adfObject = JSON.parse(rawAdfDescription);
            descriptionOutput = generateHtmlFromAdf(adfObject); 
        } catch (e) {
            descriptionOutput = `<p class="error-message">Fehler beim Parsen der Beschreibung:</p>`;
            console.error("ADF Parsing failed:", e);
        }
    }

    return `
        <div class="bug-card">
            <header class="bug-header">
                <h2 class="text-xl font-bold"><a href="https://bugs.mojang.com/browse/${issueKey}" target="_blank">${issueKey} - ${summary}</a></h2>
            </header>
            <div class="bug-details mt-2">
                <p><strong>Status:</strong> <span class="bug-status status-${status.toLowerCase().replace(/\s/g, '-')}">${status}</span></p>
                <p><strong>Reported By:</strong> ${reporter}</p>
                <p><strong>Created On:</strong> ${created}</p>
            </div>
            
            <hr class="my-4 border-t border-neutral-300 dark:border-neutral-600">

            <div class="bug-description-wrapper">
                <h3 class="text-lg font-semibold mb-2">Beschreibung</h3>
                <div class="description-content">
                    ${descriptionOutput}
                </div>
            </div>
        </div>
    `;
}


// --- 3. MODAL STEUERUNGS LOGIK ---

/**
 * Initialisiert die Kopier-Funktionalität.
 */
function initializeCopyButtons() {
    const container = document.getElementById(MODAL_DISPLAY_ID);
    if (!container) return;

    // Verwaltet Klicks auf den Kopier-Button
    container.addEventListener('click', (event) => {
        const button = event.target.closest('.copy-code-button');
        if (button) {
            const textToCopy = button.getAttribute('data-clipboard-text');
            if (textToCopy) {
                // Clipboard API verwenden
                navigator.clipboard.writeText(textToCopy.replace(/&quot;/g, '"')).then(() => {
                    const originalText = button.textContent;
                    button.textContent = 'Kopiert!';
                    setTimeout(() => {
                        button.textContent = originalText;
                    }, 1500);
                }).catch(err => {
                    console.error('Kopieren fehlgeschlagen:', err);
                    alert('Kopieren fehlgeschlagen. Bitte manuell kopieren.');
                });
            }
        }
    });
}

/**
 * Die Hauptfunktion, die vom Shortcode aufgerufen wird.
 * Ruft die Bug-Daten ab und zeigt das Modal an.
 * Muss global zugänglich sein (kein 'const' oder 'let' vor der Funktion).
 */
async function showBugModal(bugKey) {
    const modal = document.getElementById(MODAL_OVERLAY_ID);
    const display = document.getElementById(MODAL_DISPLAY_ID);

    if (!modal || !display) {
        console.error("Bug Modal Struktur nicht im DOM gefunden.");
        return;
    }
    
    // Anzeigen des Modals und Lade-Status
    display.innerHTML = `<p class="text-center">Lade Bug ${bugKey.toUpperCase()}...</p>`;
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Scrollen des Hintergrunds verhindern

    try {
        const PROXY_URL = `${PROXY_BASE_URL}${API_PATH_PREFIX}${bugKey.toUpperCase()}`;
        const response = await fetch(PROXY_URL);
        
        if (!response.ok) {
            throw new Error(`API Fehler! Status: ${response.status}.`);
        }
        
        const data = await response.json(); 
        
        const contentHtml = generateBugModalHtml(data);
        
        display.innerHTML = contentHtml;
        initializeCopyButtons(); // Kopier-Buttons nach dem Rendern neu initialisieren

    } catch (error) {
        console.error("Ladefehler:", error);
        display.innerHTML = `<p class="error-message">Fehler beim Laden des Bug Reports (${bugKey.toUpperCase()}): ${error.message}.</p>`;
    }
}


// --- 4. MODAL SCHLIEẞEN & INITIALISIERUNG & EVENT LISTENER ---

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById(MODAL_OVERLAY_ID);
    const closeButton = document.getElementById('close-modal-button');
    const modalTriggerLinks = document.querySelectorAll('.bug-modal-trigger'); // NEU: Wählt alle Links mit der Klasse aus

    if (!modal || !closeButton) return;

    const closeModal = () => {
        modal.style.display = 'none';
        document.body.style.overflow = ''; // Scrollen wieder erlauben
    };

    // NEU: Fügt den Event-Listener zu ALLEN Links hinzu
    modalTriggerLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            // Verhindert das Springen der Seite
            event.preventDefault(); 
            const bugKey = this.getAttribute('data-bug-id');
            
            // Ruft die Funktion showBugModal() direkt auf
            showBugModal(bugKey); 
        });
    });

    // Schließen beim Klick auf den Schließen-Button
    closeButton.addEventListener('click', closeModal);

    // Schließen beim Klick auf das dunkle Overlay
    modal.addEventListener('click', (e) => {
        if (e.target.id === MODAL_OVERLAY_ID) {
            closeModal();
        }
    });

    // Schließen beim Drücken der ESC-Taste
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display !== 'none') {
            closeModal();
        }
    });
});

// Machen Sie showBugModal global zugänglich, damit der Shortcode es aufrufen kann
window.showBugModal = showBugModal;