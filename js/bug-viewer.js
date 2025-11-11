// The Mojira API endpoint for the specific bug MC-4
const API_URL = 'https://mojira.dev/api/v1/issues/MC-4';
const CONTAINER_ID = 'bug-viewer-container';

/**
 * Fetches the bug data and updates the HTML.
 */
async function loadBugReport() {
    const container = document.getElementById(CONTAINER_ID);

    if (!container) {
        console.error("Bug viewer container not found.");
        return;
    }

    try {
        const response = await fetch(API_URL);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Jira/Mojira uses a 'fields' object for most issue details
        const fields = data.fields;

        // Extract key information (using standard Jira field names)
        const issueKey = data.key || 'N/A';
        const summary = fields.summary || 'Summary not found';
        const status = fields.status ? fields.status.name : 'Unknown';
        const reporter = fields.reporter ? fields.reporter.displayName : 'Unknown';
        const created = fields.created ? new Date(fields.created).toLocaleDateString() : 'N/A';
        
        // Description content often contains complex Jira formatting (like JIRA Wiki Markup). 
        // We'll use the rendered HTML if available, or the raw text.
        const descriptionHtml = fields.descriptionRendered || fields.description || 'No description provided.';


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
                    <h3>Description</h3>
                    <p>${descriptionHtml}</p>
                </div>
            </div>
        `;

    } catch (error) {
        console.error("Failed to load bug data:", error);
        container.innerHTML = `<p class="error-message">Error loading bug report: ${error.message}. Please check the API status.</p>`;
    }
}

// Run the function once the page is fully loaded
document.addEventListener('DOMContentLoaded', loadBugReport);