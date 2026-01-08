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

// Chart.js initialization
document.addEventListener('DOMContentLoaded', () => {
    const primaryColor = '#1a5fb4';
    const accentColors = ['#1a5fb4', '#3584e4', '#62a0ea', '#1055a3', '#99c1f1'];

    // Pie Chart
    const ctxPie = document.getElementById('pieChart')?.getContext('2d');
    if (ctxPie) {
        new Chart(ctxPie, {
            type: 'pie',
            data: {
                labels: ['Class A', 'Class B', 'Class C', 'Other'],
                datasets: [{
                    data: [45, 25, 20, 10],
                    backgroundColor: accentColors,
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { position: 'bottom' }
                }
            }
        });
    }

    // Bar Chart
    const ctxBar = document.getElementById('barChart')?.getContext('2d');
    if (ctxBar) {
        new Chart(ctxBar, {
            type: 'bar',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
                datasets: [{
                    label: 'Sample Count',
                    data: [120, 190, 150, 210, 180],
                    backgroundColor: primaryColor,
                    borderRadius: 8
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: { beginAtZero: true }
                }
            }
        });
    }

    // Line Chart
    const ctxLine = document.getElementById('lineChart')?.getContext('2d');
    if (ctxLine) {
        new Chart(ctxLine, {
            type: 'line',
            data: {
                labels: ['0s', '10s', '20s', '30s', '40s', '50s'],
                datasets: [{
                    label: 'Data Fidelity',
                    data: [92, 95, 94, 98, 97, 99],
                    borderColor: primaryColor,
                    tension: 0.4,
                    fill: true,
                    backgroundColor: 'rgba(26, 95, 180, 0.1)'
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { display: false }
                }
            }
        });
    }
});
