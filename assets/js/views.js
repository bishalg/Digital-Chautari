// View rendering utilities
// Handles all DOM manipulation and content rendering

class ModalRenderer {
    /**
     * Renders modal content from structured data
     * @param {Object} modalData - The modal data structure
     * @returns {string} - HTML string for the modal content
     */
    static renderModal(modalData) {
        if (!modalData || !modalData.sections) {
            return '<p>Content not available</p>';
        }

        let html = '';
        
        modalData.sections.forEach(section => {
            switch (section.type) {
                case 'header':
                    html += this.renderHeader(section.content);
                    break;
                case 'section':
                    html += this.renderSection(section);
                    break;
                case 'subsection':
                    html += this.renderSubsection(section);
                    break;
                case 'note':
                    html += this.renderNote(section.content);
                    break;
                default:
                    console.warn('Unknown section type:', section.type);
            }
        });

        return html;
    }

    /**
     * Renders a header section for concept note
     */
    static renderHeader(headerData) {
        return `
            <div class="modal-header-section">
                <h3><strong>To:</strong> ${headerData.to}</h3>
                <h4><strong>From:</strong> ${headerData.from}</h4>
                <h4><strong>Date:</strong> ${headerData.date}</h4>
                <h4><strong>Subject:</strong> ${headerData.subject}</h4>
            </div>
        `;
    }

    /**
     * Renders a regular section with title and content
     */
    static renderSection(section) {
        let html = `<h5 class="section-title">${section.title}</h5>`;
        
        if (Array.isArray(section.content)) {
            html += '<ul class="section-list">';
            section.content.forEach(item => {
                const [title, description] = item.split(': ');
                html += `<li><strong>${title}:</strong> ${description}</li>`;
            });
            html += '</ul>';
        } else {
            html += `<p class="section-content">${section.content}</p>`;
        }

        if (section.list) {
            html += '<ul class="section-list">';
            section.list.forEach(item => {
                const [title, description] = item.split(': ');
                html += `<li><strong>${title}:</strong> ${description}</li>`;
            });
            html += '</ul>';
        }

        if (section.orderedList) {
            html += '<ol class="section-ordered-list">';
            section.orderedList.forEach(item => {
                const [title, description] = item.split(': ');
                html += `<li><strong>${title}:</strong> ${description}</li>`;
            });
            html += '</ol>';
        }

        return html;
    }

    /**
     * Renders a subsection (for technical specs)
     */
    static renderSubsection(section) {
        let html = `<p class="subsection-title"><strong>${section.title}</strong></p>`;
        
        if (section.codeList) {
            html += '<ul class="code-list">';
            section.codeList.forEach(item => {
                html += `<li><code>${item}</code></li>`;
            });
            html += '</ul>';
        }

        return html;
    }

    /**
     * Renders a note section
     */
    static renderNote(content) {
        return `<em class="note-content">${content}</em>`;
    }
}

class ContentManager {
    /**
     * Populates modal content from data
     * @param {string} modalId - The modal ID
     * @param {Object} modalData - The modal data
     */
    static populateModal(modalId, modalData) {
        const contentElement = document.getElementById(`${modalId}-content`);
        if (contentElement && modalData) {
            contentElement.innerHTML = ModalRenderer.renderModal(modalData);
        } else {
            console.warn(`Modal content element not found for ${modalId} or data missing`);
        }
    }

    /**
     * Initialize all modals with content from data
     */
    static initializeAllModals() {
        if (!window.AppData || !window.AppData.modalContentData) {
            console.error('Modal content data not loaded');
            return;
        }

        const { modalContentData } = window.AppData;
        
        Object.entries(modalContentData).forEach(([key, modalData]) => {
            this.populateModal(modalData.id, modalData);
        });
    }

    /**
     * Populate page content from translations
     * @param {string} language - The language code
     */
    static updateLanguageContent(language) {
        if (!window.translations || !window.translations[language]) {
            console.warn(`Translations not found for language: ${language}`);
            return;
        }

        const languageData = window.translations[language];
        
        document.querySelectorAll('[data-lang]').forEach(element => {
            const key = element.getAttribute('data-lang');
            if (languageData[key]) {
                element.textContent = languageData[key];
            }
        });

        // Update document language attribute
        document.documentElement.lang = language === 'np' ? 'ne' : 'en';
    }
}

// Animation utilities
class AnimationManager {
    /**
     * Initialize scroll-based animations
     */
    static initializeScrollAnimations() {
        const sections = document.querySelectorAll('.section-fade-in');
        const threshold = window.AppData?.appConfig?.scrollAnimationThreshold || 0.1;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold });

        sections.forEach(section => {
            observer.observe(section);
        });
    }
}

// Export for testing/module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ModalRenderer, ContentManager, AnimationManager };
}

// Make available globally
window.ViewUtils = { ModalRenderer, ContentManager, AnimationManager };
