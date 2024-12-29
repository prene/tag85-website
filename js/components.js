// Function to load HTML components
async function loadComponent(elementId, componentPath) {
    try {
        const response = await fetch(componentPath);
        const html = await response.text();
        document.getElementById(elementId).innerHTML = html;
    } catch (error) {
        console.error(`Error loading component from ${componentPath}:`, error);
    }
}

// Function to set active navigation state
function setActiveNavigation() {
    const currentPath = window.location.pathname;
    const pageName = currentPath.split('/').pop().replace('.html', '');
    
    // Map of page names to navigation identifiers
    const navMap = {
        'index': 'home',
        'products': 'products',
        'enterprise-ai': 'enterprise',
        'about': 'about'
    };
    
    const navId = navMap[pageName] || 'home';
    
    // Add active class to navigation items
    document.querySelectorAll(`[data-nav="${navId}"]`).forEach(link => {
        link.classList.add('active');
    });
}

// Initialize components
async function initComponents() {
    // Load header and footer
    await Promise.all([
        loadComponent('header-component', '/components/header.html'),
        loadComponent('footer-component', '/components/footer.html')
    ]);
    
    // Set active navigation state
    setActiveNavigation();
    
    // Initialize mobile menu functionality
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initComponents); 