const CONTAINER_ID = 'bug-viewer-container';
// NEU: Verwenden Sie die URL Ihres Cloudflare Workers für den Proxy
const PROXY_BASE_URL = 'https://mojira-bug-proxy.vincplyz.workers.dev'; 
const API_PATH_PREFIX = '/api/v1/issues/'; 

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
            // Verwenden Sie H4 für untergeordnete Überschriften wie "How to reproduce"
            const level = node.attrs && node.attrs.level ? node.attrs.level : 3;
            // Wir begrenzen das Level, da H1/H2 bereits für den Titel verwendet werden
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
            // Logik für den Codeblock mit Kopier-Button
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
            // Handle plain text content and marks (bold, italic, links)
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
            // For other node types like mention, just return the content
            html = innerContent;
            break;
    }
    
    return html;
}

/**
 * Initialisiert die Kopier-Funktionalität NUR innerhalb des übergebenen Containers.
 * Wird jedes Mal nach dem Laden eines neuen Bugs aufgerufen.
 */
function initializeCopyButtons(containerElement) {
    if (!containerElement) return;

    // Wir entfernen und fügen den Listener nicht ständig neu hinzu, 
    // stattdessen verwenden wir Event Delegation auf dem Container.
    // Wir müssen nur sicherstellen, dass dieser Listener einmalig außerhalb 
    // der loadBugReport-Funktion registriert wird, aber da die DOM-Elemente 
    // jedes Mal neu gesetzt werden, ist die Delegation am Container der beste Weg.
    
    containerElement.addEventListener('click', (event) => {
        const button = event.target.closest('.copy-code-button');
        if (button) {
            const textToCopy = button.getAttribute('data-clipboard-text');
            if (textToCopy) {
                // Clipboard API verwenden
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


/**
 * Fetches the bug data for a specific key using the Cloudflare Worker proxy.
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
    container.innerHTML = `<p>Lade Minecraft Bug Report (${bugKey.toUpperCase()})...</p>`;

    // NEU: Erstellt die vollständige URL für den Worker
    const PROXY_URL = `${PROXY_BASE_URL}${API_PATH_PREFIX}${bugKey.toUpperCase()}`;


    try {
        const response = await fetch(PROXY_URL);
        
        if (!response.ok) {
            // Fehlstatus vom Worker oder der API (z.B. 404 Not Found)
            throw new Error(`API Fehler! Status: ${response.status}.`);
        }
        
        // NEU: Der Cloudflare Worker gibt direkt sauberes JSON zurück
        const data = await response.json(); 
        
        
        // --- FINALE Parsing logic ---
        // Die Mojira-API ist inkonsistent, daher prüfen wir 'fields' oder das Hauptobjekt
        const fields = data.fields || data; 
        
        const issueKey = data.key || bugKey.toUpperCase(); 
        const summary = fields?.summary || 'Zusammenfassung nicht gefunden (Feld fehlt)';
        
        // KORRIGIERT: Abfragen der Top-Level-Eigenschaften mit Fallbacks
        const status = fields?.status?.name || fields?.status || 'Unbekannt (Feld fehlt)';
        const reporter = fields?.reporter?.displayName || fields?.reporter_name || 'Unbekannt (Feld fehlt)';
        const created = fields?.created ? new Date(fields.created).toLocaleDateString() : (fields?.created_date ? new Date(fields.created_date).toLocaleDateString() : 'N/A (Feld fehlt)');
        
        const rawAdfDescription = fields?.description;
        let descriptionOutput = 'Keine Beschreibung vorhanden (Feld fehlt).';

        if (rawAdfDescription) {
            try {
                const adfObject = JSON.parse(rawAdfDescription);
                descriptionOutput = generateHtmlFromAdf(adfObject); 
            } catch (e) {
                // Zeigt Raw-Daten bei Parse-Fehler
                descriptionOutput = `<p>Fehler beim Parsen der Beschreibung:</p><pre><code>${rawAdfDescription}</code></pre>`;
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

                <div class="bug-description-wrapper">
                    <h3>Beschreibung</h3>
                    <div class="description-content">
                        ${descriptionOutput}
                    </div>
                </div>
            </div>
        `;
        
        // Fügt den Event Listener für die Kopier-Buttons zum neu geladenen Inhalt hinzu
        initializeCopyButtons(container);


    } catch (error) {
        console.error("Failed to load bug data:", error);
        container.innerHTML = `<p class="error-message">Fehler beim Laden des Bug Reports (${bugKey.toUpperCase()}): ${error.message}.</p>`;
    }
}


// Funktion zum Initialisieren des Viewers, Event Listener und URL-Hash-Analyse
function initializeBugViewer() {
    const inputField = document.getElementById('bug-key-input');
    const loadButton = document.getElementById('load-bug-button');

    if (!loadButton || !inputField) {
        // Stoppt, wenn die HTML-Elemente nicht existieren
        return;
    }
    
    let initialBugKey = inputField.value.trim() || 'MC-4'; // Standardwert: MC-4

    // 1. Analyse des URL-Hashs (#) für Direktlinks
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