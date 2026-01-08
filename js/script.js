// Theme Toggle Logic
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

const savedTheme = localStorage.getItem('theme') || 'light-mode';
body.classList.add(savedTheme);

themeToggle.addEventListener('click', () => {
    if (body.classList.contains('light-mode')) {
        body.classList.replace('light-mode', 'dark-mode');
        localStorage.setItem('theme', 'dark-mode');
    } else {
        body.classList.replace('dark-mode', 'light-mode');
        localStorage.setItem('theme', 'light-mode');
    }
});

// Scroll Transition Logic (Hero to Sidebar)
const header = document.getElementById('dynamic-header');
const scrollThreshold = 300; // Adjust this value for the transition speed

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    if (scrollY > scrollThreshold) {
        if (!body.classList.contains('scrolled')) {
            body.classList.add('scrolled');
            body.classList.remove('init-page');
        }
    } else {
        if (body.classList.contains('scrolled')) {
            body.classList.remove('scrolled');
            body.classList.add('init-page');
        }
    }

    // Sidebar Active Link Highlight
    const sections = document.querySelectorAll('section');
    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 150;
        const sectionId = current.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.navigation a[href*=' + sectionId + ']')?.classList.add('active');
        } else {
            document.querySelector('.navigation a[href*=' + sectionId + ']')?.classList.remove('active');
        }
    });
});

// Scroll Reveal Animation
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.15 });

revealElements.forEach(el => revealObserver.observe(el));

// Copy BibTeX
const copyBtn = document.querySelector('.copy-btn');
const citationText = document.querySelector('.citation-container code');

if (copyBtn) {
    copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(citationText.innerText)
            .then(() => {
                const originalText = copyBtn.innerText;
                copyBtn.innerText = 'Copied!';
                setTimeout(() => copyBtn.innerText = originalText, 2000);
            });
    });
}
