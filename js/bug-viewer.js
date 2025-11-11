const CONTAINER_ID = 'bug-viewer-container';
const API_BASE_URL = 'https://mojira.dev/api/v1/issues/';

/**
 * Recursively extracts and generates HTML from Atlassian Document Format (ADF) JSON.
 * @param {object} node - The current JSON node.
 * @returns {string} The generated HTML string.
 */
function generateHtmlFromAdf(node) {
    let html = '';
    let innerContent = '';

    // First, process content of children recursively
    if (node.content && Array.isArray(node.content)) {
        node.content.forEach(child => {
            innerContent += generateHtmlFromAdf(child);
        });
    }

    // Wrap the inner content based on the node type
    switch (node.type) {
        case 'doc':
            html = innerContent;
            break;
        case 'heading':
            // Use <h3> for readability
            html = `<h3>${innerContent}</h3>`;
            break;
        case 'paragraph':
            html = `<p>${innerContent}</p>`;
            break;
        case 'codeBlock':
            const codeContent = innerContent.trim();
            html = `
                <div class="code-block-container">
                    <button class="copy-code-button" data-clipboard-text="${codeContent.replace(/"/g, '&quot;')}">
                        Kopieren
                    </button>
                    <pre><code>${codeContent}</code></pre>
                </div>
            `;
            break;
            html = `<pre><code>${innerContent.trim()}</code></pre>`;
            break;
        case 'orderedList':
            html = `<ol>${innerContent}</ol>`;
            break;
        case 'listItem':
            html = `<li>${innerContent}</li>`;
            break;
        case 'text':
            // Handle plain text content
            html = node.text || '';
            // Handle links/marks
            if (node.marks && Array.isArray(node.marks)) {
                 node.marks.forEach(mark => {
                    if (mark.type === 'link' && mark.attrs?.href) {
                        html = `<a href="${mark.attrs.href}" target="_blank">${html}</a>`;
                    }
                });
            }
            break;
        default:
            // For other node types like mention, just return the content
            html = innerContent;
            break;
    }
    
    return html;
}

/**
 * Fetches the bug data for a specific key using a CORS proxy and updates the HTML.
 * @param {string} bugKey - The Minecraft bug key (e.g., MC-4).
 */
async function loadBugReport(bugKey) {
    const container = document.getElementById(CONTAINER_ID);
    
    // Validation
    if (!bugKey || bugKey.trim() === '') {
        container.innerHTML = `<p class="error-message">Bitte geben Sie eine gültige Bug-ID ein.</p>`;
        return;
    }

    // Display loading status
    container.innerHTML = `<p>Lade Minecraft Bug Report (${bugKey})...</p>`;

    const API_URL = API_BASE_URL + bugKey;
    const PROXY_URL = `https://api.allorigins.win/get?url=${encodeURIComponent(API_URL)}`;


    try {
        const response = await fetch(PROXY_URL);
        
        if (!response.ok) {
            throw new Error(`Proxy error! Status: ${response.status}`);
        }
        
        const proxyData = await response.json(); 
        const data = JSON.parse(proxyData.contents);
        
        
        // --- FINALE Parsing logic ---
        // Die Mojira-API ist inkonsistent: Für alte Bugs fehlen die "fields", daher verwenden wir das Hauptobjekt 'data'
        const fields = data.fields || data; 
        
        const issueKey = data.key || bugKey.toUpperCase(); 
        const summary = fields?.summary || 'Zusammenfassung nicht gefunden (Feld fehlt)';
        
        // KORRIGIERT: Abfragen der Top-Level-Eigenschaften, die Sie im JSON gefunden haben
        const status = fields?.status || 'Unbekannt (Feld fehlt)';
        const reporter = fields?.reporter_name || 'Unbekannt (Feld fehlt)';
        const created = fields?.created_date ? new Date(fields.created_date).toLocaleDateString() : 'N/A (Feld fehlt)';
        
        const rawAdfDescription = fields?.description;
        let descriptionOutput = 'Keine Beschreibung vorhanden (Feld fehlt).';

        if (rawAdfDescription) {
            try {
                const adfObject = JSON.parse(rawAdfDescription);
                descriptionOutput = generateHtmlFromAdf(adfObject); 
            } catch (e) {
                descriptionOutput = `<p>Fehler beim Parsen der Beschreibung: ${rawAdfDescription}</p>`;
                console.error("ADF Parsing failed:", e);
            }
        }
        // --- End of parsing logic ---

        container.innerHTML = `
            <div class="bug-card">
                <header class="bug-header">
                    <h2><a href="https://bugs.mojang.com/browse/${issueKey}" target="_blank">${issueKey} - ${summary}</a></h2>
                </header>
                <div class="bug-details">
                    <p><strong>Status:</strong> <span class="bug-status status-${status.toLowerCase().replace(/\s/g, '-')}">${status}</span></p>
                    <p><strong>Reported By:</strong> ${reporter}</p>
                    <p><strong>Created On:</strong> ${created}</p>
                </div>
                
                <hr>

                <div class="bug-description">
                    <h3>Beschreibung</h3>
                    <div class="description-content">
                        ${descriptionOutput}
                    </div>
                </div>
            </div>
        `;

    } catch (error) {
        console.error("Failed to load bug data:", error);
        container.innerHTML = `<p class="error-message">Fehler beim Laden des Bug Reports: ${error.message}. Bitte versuchen Sie es mit einer anderen ID oder prüfen Sie die API.</p>`;
    }
}


// Funktion zum Initialisieren des Viewers, Event Listener und URL-Hash-Analyse
function initializeBugViewer() {
    const inputField = document.getElementById('bug-key-input');
    const loadButton = document.getElementById('load-bug-button');

    if (!loadButton || !inputField) {
        return;
    }
    
    let initialBugKey = inputField.value.trim(); // Standardwert: MC-4

    // 1. Analyse des URL-Hashs (#) für Direktlinks
    // Dies löst keinen 404-Fehler aus und ist robust für statische Seiten.
    const urlHash = window.location.hash; 
    
    if (urlHash) {
        // Entfernt das führende '#' und konvertiert zu Großbuchstaben
        const potentialKey = urlHash.substring(1).toUpperCase(); 
        
        // Prüfung, ob der Hash-Wert wie eine Bug-ID aussieht
        if (/^[A-Z]+-\d+$/i.test(potentialKey)) {
            initialBugKey = potentialKey;
        }
    }
    
    // --- Event Listener und Initialisierung ---

    // Event Listener für den Button-Klick
    loadButton.addEventListener('click', () => {
        const key = inputField.value.trim();
        // Aktualisiert den URL-Hash
        window.location.hash = key; 
        loadBugReport(key);
    });

    // Event Listener für die Enter-Taste im Eingabefeld
    inputField.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const key = inputField.value.trim();
            window.location.hash = key;
            loadBugReport(key);
        }
    });
    
    // 2. Eingabefeld und Viewer mit der ermittelten (oder Standard-) ID aktualisieren
    inputField.value = initialBugKey;
    loadBugReport(initialBugKey);

    // Fügt einen Listener hinzu, um Bugs zu laden, wenn der Hash sich ändert (z.B. durch Browser-Navigation)
    window.addEventListener('hashchange', () => {
        const hashKey = window.location.hash.substring(1).toUpperCase();
        if (hashKey && hashKey !== inputField.value.toUpperCase()) {
            inputField.value = hashKey;
            loadBugReport(hashKey);
        }
    });
}

// Initialisierung starten, wenn das DOM geladen ist
document.addEventListener('DOMContentLoaded', initializeBugViewer);

/**
 * Initialisiert die Kopier-Funktionalität NUR innerhalb des übergebenen Containers.
 */
function initializeCopyButtons(containerElement) {
    if (!containerElement) return;

    containerElement.addEventListener('click', (event) => {
        const button = event.target.closest('.copy-code-button');
        if (button) {
            const textToCopy = button.getAttribute('data-clipboard-text');
            if (textToCopy) {
                navigator.clipboard.writeText(textToCopy).then(() => {
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