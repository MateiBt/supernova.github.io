// js/mobile_nav.js
// Responsive mobile header bar & slide-out navigation drawer (<= 800px)

export function initMobileNav() {
    // Support index.html's anchor drawer if present
    const landingDrawer = document.getElementById('landing-drawer');
    const landingBackdrop = document.getElementById('landing-backdrop');
    const landingToggle = document.getElementById('landing-menu-toggle');
    const landingClose = document.getElementById('landing-drawer-close');
    if (landingDrawer && landingBackdrop && landingToggle && !landingDrawer.dataset.boundLandingNav) {
        landingDrawer.dataset.boundLandingNav = 'true';
        const closeLanding = () => {
            landingDrawer.classList.remove('drawer-open');
            landingBackdrop.classList.remove('active');
            landingToggle.setAttribute('aria-expanded', 'false');
        };
        landingToggle.addEventListener('click', () => {
            const isOpen = landingDrawer.classList.toggle('drawer-open');
            landingBackdrop.classList.toggle('active', isOpen);
            landingToggle.setAttribute('aria-expanded', String(isOpen));
        });
        if (landingClose) landingClose.addEventListener('click', closeLanding);
        landingBackdrop.addEventListener('click', closeLanding);
        landingDrawer.addEventListener('click', (e) => {
            if (e.target.closest('a, button')) closeLanding();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeLanding();
        });
        window.addEventListener('resize', () => {
            if (window.innerWidth > 800) closeLanding();
        });
    }

    const sidebar = document.querySelector('aside.sidebar');
    if (!sidebar) return;

    const inSubfolder = /\/(practice|handouts)\//i.test(window.location.pathname);
    const prefix = inSubfolder ? '../' : '';

    // 1. Inject mobile top bar right before <aside class="sidebar"> if absent
    let topbar = document.querySelector('.mobile-topbar');
    if (!topbar) {
        topbar = document.createElement('header');
        topbar.className = 'mobile-topbar';
        topbar.innerHTML = `
            <a href="${prefix}dashboard.html" class="mobile-brand">
                <img src="${prefix}assets/img/supernova_logo.png" alt="Supernova Logo">
                <span>SUPERNOVA GUIDE</span>
            </a>
            <button type="button" class="mobile-menu-toggle" id="mobile-menu-toggle" aria-label="Open navigation menu" aria-expanded="false">
                <i class="fa-solid fa-bars"></i>
            </button>
        `;
        sidebar.parentNode.insertBefore(topbar, sidebar);
    }

    // 2. Inject dimmed backdrop right after <aside class="sidebar"> if absent
    let backdrop = document.querySelector('.sidebar-backdrop');
    if (!backdrop) {
        backdrop = document.createElement('div');
        backdrop.className = 'sidebar-backdrop';
        backdrop.id = 'sidebar-backdrop';
        sidebar.parentNode.insertBefore(backdrop, sidebar.nextSibling);
    }

    // 3. Ensure close button is present inside .sidebar (re-inject if sidebar innerHTML is refreshed)
    function ensureCloseButton() {
        let closeBtn = sidebar.querySelector('.sidebar-close-btn');
        if (!closeBtn) {
            closeBtn = document.createElement('button');
            closeBtn.type = 'button';
            closeBtn.className = 'sidebar-close-btn';
            closeBtn.setAttribute('aria-label', 'Close navigation menu');
            closeBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
            sidebar.insertBefore(closeBtn, sidebar.firstChild);
        }
        if (!closeBtn.dataset.boundClose) {
            closeBtn.dataset.boundClose = 'true';
            closeBtn.addEventListener('click', closeDrawer);
        }
    }

    const toggleBtn = topbar.querySelector('.mobile-menu-toggle');

    function openDrawer() {
        ensureCloseButton();
        sidebar.classList.add('drawer-open');
        backdrop.classList.add('active');
        if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'true');
    }

    function closeDrawer() {
        sidebar.classList.remove('drawer-open');
        backdrop.classList.remove('active');
        if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'false');
    }

    ensureCloseButton();

    if (toggleBtn && !toggleBtn.dataset.boundToggle) {
        toggleBtn.dataset.boundToggle = 'true';
        toggleBtn.addEventListener('click', () => {
            if (sidebar.classList.contains('drawer-open')) {
                closeDrawer();
            } else {
                openDrawer();
            }
        });
    }

    if (!backdrop.dataset.boundBackdrop) {
        backdrop.dataset.boundBackdrop = 'true';
        backdrop.addEventListener('click', closeDrawer);
    }

    if (!sidebar.dataset.boundMobileNav) {
        sidebar.dataset.boundMobileNav = 'true';

        // Close drawer when tapping a navigation item on mobile
        sidebar.addEventListener('click', (e) => {
            if (window.innerWidth <= 800 && e.target.closest('.nav-item, .brand')) {
                closeDrawer();
            }
        });

        // Re-ensure close button if another script (e.g., render_problems.js) rewrites sidebar.innerHTML
        const obs = new MutationObserver(() => {
            if (!sidebar.querySelector('.sidebar-close-btn')) {
                ensureCloseButton();
            }
        });
        obs.observe(sidebar, { childList: true });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && sidebar.classList.contains('drawer-open')) {
                closeDrawer();
            }
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 800 && sidebar.classList.contains('drawer-open')) {
                closeDrawer();
            }
        });
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMobileNav);
} else {
    initMobileNav();
}
