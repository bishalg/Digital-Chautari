// Main application logic - Clean and testable
let currentLang = 'en';

// Theme Management Module
const ThemeManager = {
    init() {
        const themeToggle = document.getElementById('theme-toggle');
        const themeIconLight = document.getElementById('theme-icon-light');
        const themeIconDark = document.getElementById('theme-icon-dark');
        const docElement = document.documentElement;

        if (!themeToggle || !themeIconLight || !themeIconDark) {
            console.warn('Theme elements not found');
            return;
        }

        // Apply theme on initial load
        this.applyInitialTheme(docElement, themeIconLight, themeIconDark);
        
        // Add click handler
        themeToggle.addEventListener('click', () => {
            this.toggleTheme(docElement, themeIconLight, themeIconDark);
        });
    },

    applyInitialTheme(docElement, lightIcon, darkIcon) {
        const isDark = localStorage.getItem('theme') === 'dark' || 
            (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
        
        if (isDark) {
            docElement.classList.add('dark');
            lightIcon.classList.add('hidden');
            darkIcon.classList.remove('hidden');
        } else {
            docElement.classList.remove('dark');
            lightIcon.classList.remove('hidden');
            darkIcon.classList.add('hidden');
        }
    },

    toggleTheme(docElement, lightIcon, darkIcon) {
        docElement.classList.toggle('dark');
        lightIcon.classList.toggle('hidden');
        darkIcon.classList.toggle('hidden');
        
        const theme = docElement.classList.contains('dark') ? 'dark' : 'light';
        localStorage.setItem('theme', theme);
    }
};

// Language Management Module
const LanguageManager = {
    init() {
        const langSwitch = document.getElementById('lang-switch');
        const langText = document.getElementById('lang-text');

        if (!langSwitch || !langText) {
            console.warn('Language elements not found');
            return;
        }

        langSwitch.addEventListener('click', () => {
            this.toggleLanguage(langText);
        });
    },

    toggleLanguage(langText) {
        const newLang = currentLang === 'en' ? 'np' : 'en';
        this.setLanguage(newLang, langText);
    },

    setLanguage(lang, langText) {
        currentLang = lang;
        langText.textContent = lang.toUpperCase();
        
        document.querySelectorAll('[data-lang]').forEach(el => {
            const key = el.getAttribute('data-lang');
            if (translations[lang] && translations[lang][key]) {
                el.textContent = translations[lang][key];
            }
        });
        
        document.documentElement.lang = lang === 'np' ? 'ne' : 'en';
    }
};

// Modal Management Module
const ModalManager = {
    init() {
        // Populate modal content
        this.populateModalContent();
        
        // Add escape key handler
        document.addEventListener('keydown', (event) => {
            if (event.key === "Escape") {
                document.querySelectorAll('.modal:not(.hidden)').forEach(modal => {
                    this.close(modal.id);
                });
            }
        });
    },

    populateModalContent() {
        // Use our new modular data and rendering system
        if (typeof window.modalContentData !== 'undefined' && typeof window.ModalRenderer !== 'undefined') {
            const renderer = new window.ModalRenderer();
            
            Object.keys(window.modalContentData).forEach(modalId => {
                const contentElement = document.getElementById(`${modalId}-content`);
                if (contentElement) {
                    contentElement.innerHTML = renderer.renderModal(window.modalContentData[modalId]);
                }
            });
        }
    },

    open(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('hidden');
            setTimeout(() => {
                modal.classList.remove('opacity-0');
                modal.classList.add('opacity-100');
            }, 10);
            document.body.style.overflow = 'hidden';
        }
    },

    close(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('opacity-100');
            modal.classList.add('opacity-0');
            setTimeout(() => {
                modal.classList.add('hidden');
            }, 300);
            document.body.style.overflow = '';
        }
    }
};

// Scroll Animation Module
const ScrollAnimations = {
    init() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.section-fade-in').forEach(section => {
            observer.observe(section);
        });
    }
};

// Main Application
const App = {
    init() {
        try {
            ThemeManager.init();
            LanguageManager.init();
            ModalManager.init();
            ScrollAnimations.init();
            console.log('Application initialized successfully');
        } catch (error) {
            console.error('Error initializing application:', error);
        }
    }
};

// Public API for global access (for onclick handlers)
window.openModal = (modalId) => ModalManager.open(modalId);
window.closeModal = (modalId) => ModalManager.close(modalId);

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ThemeManager, LanguageManager, ModalManager, App };
}
