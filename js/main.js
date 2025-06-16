// Theme Switcher
document.addEventListener('DOMContentLoaded', function () {
    const themeToggle = document.getElementById('theme-toggle');
    const bodyElement = document.body;
    const iconSun = document.getElementById('icon-sun');
    const iconMoon = document.getElementById('icon-moon');

    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    const isDark = savedTheme === 'dark';
    bodyElement.classList.toggle('dark', isDark);
    iconSun.classList.toggle('hidden', isDark);
    iconMoon.classList.toggle('hidden', !isDark);

    themeToggle.addEventListener('click', () => {
        const darkMode = bodyElement.classList.toggle('dark');
        localStorage.setItem('theme', darkMode ? 'dark' : 'light');

        iconSun.classList.toggle('hidden', darkMode);
        iconMoon.classList.toggle('hidden', !darkMode);

        // Add smooth rotate animation
        themeToggle.style.transition = 'transform 0.3s ease-in-out';
        themeToggle.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            themeToggle.style.transform = 'rotate(0deg)';
        }, 300);
    });
});


// Initialize Bootstrap components
document.addEventListener('DOMContentLoaded', () => {
    // Bootstrap Dropdowns
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    if (dropdownToggles.length > 0) {
        dropdownToggles.forEach(dropdown => {
            new bootstrap.Dropdown(dropdown);
        });
    }

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.dropdown')) {
            const openDropdowns = document.querySelectorAll('.dropdown-menu.show');
            openDropdowns.forEach(dropdown => {
                bootstrap.Dropdown.getInstance(dropdown.previousElementSibling)?.hide();
            });
        }
    });

    // Search input effects
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        const searchContainer = searchInput.parentNode;
        
        searchInput.addEventListener('focus', () => {
            searchContainer.style.transform = 'scale(1.05)';
            searchContainer.style.transition = 'transform 0.3s ease';
        });
        
        searchInput.addEventListener('blur', () => {
            searchContainer.style.transform = 'scale(1)';
        });
    }
});

// Force reflow for dark mode
document.documentElement.classList.add('dark');
document.documentElement.offsetHeight; // Trigger reflow
document.documentElement.classList.remove('dark');