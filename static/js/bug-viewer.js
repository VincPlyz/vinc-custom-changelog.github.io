(function() { // IIFE zur Vermeidung von globalen Scope-Konflikten

const CONTAINER_ID = 'bug-viewer-container';
// Der Cloudflare Worker Proxy
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
            // Wir begrenzen das Level, da H1/H2 bereits für den Titel verwendet werden
            const level = node.attrs && node.attrs.level ? node.attrs.level : 3;
            if (level >= 3) {
                 // Verwenden H4 für untergeordnete Überschriften
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
            // For other node types like mention, just return the content
            html = innerContent;
            break;
    }
    
    return html;
}

/**
 * Initialisiert die Kopier-Funktionalität NUR innerhalb des übergebenen Containers.
 */
function initializeCopyButtons(containerElement) {
    if (!containerElement) return;

    const buttons = containerElement.querySelectorAll('.copy-code-button');
    buttons.forEach(button => {
         button.addEventListener('click', function() {
            const textToCopy = this.getAttribute('data-clipboard-text');
            if (textToCopy) {
                // Verwenden der modernen Clipboard API
                navigator.clipboard.writeText(textToCopy).then(() => {
                    const originalText = this.textContent;
                    this.textContent = 'Kopiert!';
                    setTimeout(() => {
                        this.textContent = originalText;
                    }, 1500);
                }).catch(err => {
                    console.error('Kopieren fehlgeschlagen:', err);
                    alert('Kopieren fehlgeschlagen. Bitte manuell kopieren.');
                });
            }
        });
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

    // Display loading status (WICHTIG: Überschreibt das gesamte Bug-Card-HTML)
    container.innerHTML = `
        <div class="bug-card">
            <p><strong>Lade Minecraft Bug Report (${bugKey.toUpperCase()})...</strong></p>
        </div>
    `;

    const PROXY_URL = `${PROXY_BASE_URL}${API_PATH_PREFIX}${bugKey.toUpperCase()}`;

    try {
        const response = await fetch(PROXY_URL);
        
        // Fängt 404, 500 etc. vom Proxy ab
        if (!response.ok) {
            throw new Error(`API Fehler! Status: ${response.status}.`);
        }
        
        // --- KORREKTUR: Antwort als Text lesen und dann JSON parsen ---
        let rawText = await response.text();
        let data;
        
        // NEU: Abfangen des Proxy-Fehlertexts, wenn ID nicht gefunden wird
        if (rawText.includes("Issue not found")) {
            throw new Error(`Bug ID "${bugKey.toUpperCase()}" wurde nicht gefunden.`);
        }
        
        try {
            // VERSUCH, den Text als JSON zu parsen
            data = JSON.parse(rawText);
        } catch (e) {
            // Fängt Fehler ab, falls der Worker ungültiges JSON zurückgibt
            throw new Error(`Fehler beim Parsen der API-Antwort: ${e.message}.`);
        }
        
        // --- FINALE Parsing logic ---
        const fields = data.fields || data; 
        
        const issueKey = data.key || bugKey.toUpperCase(); 
        const summary = fields?.summary || 'Zusammenfassung nicht gefunden (Feld fehlt)';
        
        const status = fields?.status?.name || fields?.status || 'Unbekannt';
        const reporter = fields?.reporter?.displayName || fields?.reporter_name || 'Unbekannt';
        // Korrigiertes Fallback für das Erstellungsdatum
        const created = fields?.created ? new Date(fields.created).toLocaleDateString('de-DE') : (fields?.created_date ? new Date(fields.created_date).toLocaleDateString('de-DE') : 'N/A');
        
        const rawAdfDescription = fields?.description;
        let descriptionOutput = 'Keine Beschreibung vorhanden.';

        if (rawAdfDescription) {
            try {
                // ADF-Parsing
                const adfObject = JSON.parse(rawAdfDescription);
                descriptionOutput = generateHtmlFromAdf(adfObject); 
            } catch (e) {
                // Zeigt RAW-Daten bei Parse-Fehler
                descriptionOutput = `<p class="error-message">Fehler beim Parsen der Beschreibung:</p><pre><code>${rawAdfDescription}</code></pre>`;
                console.error("ADF Parsing failed:", e);
            }
        }
        
        const statusClass = status.toLowerCase().replace(/\s/g, '-');
        
        // --- HTML RENDERING ---
        container.innerHTML = `
            <div class="bug-card">
                <header class="bug-header">
                    <h2><a href="https://bugs.mojang.com/browse/${issueKey}" target="_blank">${issueKey} - ${summary}</a></h2>
                </header>
                <div class="bug-details">
                    <p><strong>Status:</strong> <span class="bug-status status-${statusClass}">${status}</span></p>
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
        // WICHTIG: Setze den gesamten Container-Inhalt auf die Fehlermeldung
        container.innerHTML = `
            <div class="bug-card">
                <p class="error-message p-4 text-center">
                    Fehler beim Laden des Bug Reports (${bugKey.toUpperCase()}): 
                    <br><strong>${error.message}</strong>
                    <br><em>Möglicherweise ist der Proxy ausgefallen oder die Bug-ID existiert nicht.</em>
                </p>
            </div>
        `;
    }
}


// Funktion zum Initialisieren des Viewers, Event Listener und URL-Hash-Analyse
function initializeBugViewer() {
    const inputField = document.getElementById('bug-key-input');
    const loadButton = document.getElementById('load-bug-button');

    if (!loadButton || !inputField) {
        return;
    }
    
    let initialBugKey = inputField.value.trim() || 'MC-4'; 

    // 1. Analyse des URL-Hashs (#) für Direktlinks
    const urlHash = window.location.hash; 
    
    if (urlHash) {
        const potentialKey = urlHash.substring(1).toUpperCase(); 
        if (/^[A-Z]+-\d+$/i.test(potentialKey)) {
            initialBugKey = potentialKey;
        }
    }
    
    // --- Event Listener und Initialisierung ---

    // Event Listener für den Button-Klick
    const clickHandler = () => {
        const key = inputField.value.trim();
        window.location.hash = key; 
        loadBugReport(key);
    };
    
    loadButton.addEventListener('click', clickHandler);

    // Event Listener für die Enter-Taste im Eingabefeld
    inputField.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            clickHandler();
        }
    });
    
    // 2. Eingabefeld und Viewer mit der ermittelten (oder Standard-) ID aktualisieren
    inputField.value = initialBugKey;
    loadBugReport(initialBugKey);

    // Fügt einen Listener hinzu, um Bugs zu laden, wenn der Hash sich ändert
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
window.generateHtmlFromAdf = generateHtmlFromAdf;
})(); // Ende der IIFE