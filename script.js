// ===== DARK MODE =====
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check saved theme
if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark');
    if (body.classList.contains('dark')) {
        localStorage.setItem('theme', 'dark');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        localStorage.setItem('theme', 'light');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
});

// ===== TYPING EFFECT =====
const typingTexts = [
    'Web Developer',
    'CS Student',
    'Cyber Security Enthusiast',
    'Database Designer'
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentText = typingTexts[textIndex];
    const typingElement = document.querySelector('.typing-text');
    
    if (isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }
    
    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        setTimeout(typeEffect, 2000);
        return;
    }
    
    if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % typingTexts.length;
        setTimeout(typeEffect, 500);
        return;
    }
    
    setTimeout(typeEffect, isDeleting ? 50 : 100);
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.typing-text')) {
        typeEffect();
    }
});

// ===== PROJECTS DATA =====
const projects = [
    {
        title: 'Jastip Website',
        description: 'Personal shopper (jasa titip) ordering platform with clean interface and simple ordering flow.',
        tech: ['HTML', 'CSS', 'JavaScript'],
        icon: '🛒',
        demoUrl: 'https://jastip-project.vercel.app',
        githubUrl: 'https://github.com/kezia/jastip'
    },
    {
        title: 'Dimsum Delivery',
        description: 'Food ordering website with full menu, pricing, and fully responsive layout. Designed UI/UX from scratch.',
        tech: ['HTML', 'CSS', 'JavaScript'],
        icon: '🥟',
        demoUrl: 'https://dimsum-delivery.vercel.app',
        githubUrl: 'https://github.com/kezia/dimsum-delivery'
    },
    {
        title: 'Stack Café',
        description: 'Collaborative café platform with menu ordering, user login, and MySQL backend.',
        tech: ['PHP', 'MySQL', 'HTML/CSS'],
        icon: '☕',
        demoUrl: 'https://stack-cafe.vercel.app',
        githubUrl: 'https://github.com/kezia/stack-cafe'
    }
];

function loadProjects() {
    const projectsGrid = document.getElementById('projects-grid');
    if (!projectsGrid) return;
    
    projectsGrid.innerHTML = projects.map(project => `
        <div class="project-card">
            <div class="project-image">
                ${project.icon}
            </div>
            <div class="project-content">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-tech">
                    ${project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
                <div class="project-links">
                    <a href="${project.demoUrl}" target="_blank" rel="noopener">
                        <i class="fas fa-external-link-alt"></i> Live Demo
                    </a>
                    <a href="${project.githubUrl}" target="_blank" rel="noopener">
                        <i class="fab fa-github"></i> GitHub
                    </a>
                </div>
            </div>
        </div>
    `).join('');
}

// ===== SKILL BARS ANIMATION =====
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = width;
        }, 100);
    });
}

// ===== ACTIVE NAVIGATION & SMOOTH SCROLL =====
function initNavigation() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Smooth scroll
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
                // Close mobile menu if open
                document.querySelector('.nav-links')?.classList.remove('active');
            }
        });
    });
}

// ===== MOBILE MENU =====
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }
}

// ===== CONTACT FORM =====
function initContactForm() {
    const form = document.getElementById('contact-form');
    const status = document.getElementById('form-status');
    
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            status.textContent = 'Sending...';
            status.style.color = 'var(--primary)';
            
            try {
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: new FormData(form),
                    headers: { 'Accept': 'application/json' }
                });
                
                if (response.ok) {
                    status.textContent = '✅ Message sent successfully! I\'ll get back to you soon.';
                    form.reset();
                } else {
                    throw new Error('Failed to send');
                }
            } catch (error) {
                status.textContent = '❌ Oops! Something went wrong. Please try again or email me directly.';
                status.style.color = '#EF4444';
            }
        });
    }
}

// ===== SCROLL REVEAL =====
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.project-card, .stat-card, .contact-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
    
    // Trigger skill bars when about section is visible
    const aboutSection = document.querySelector('#about');
    if (aboutSection) {
        const aboutObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                animateSkillBars();
                aboutObserver.disconnect();
            }
        });
        aboutObserver.observe(aboutSection);
    }
}

// ===== INITIALIZE =====
document.addEventListener('DOMContentLoaded', () => {
    loadProjects();
    initNavigation();
    initMobileMenu();
    initContactForm();
    initScrollReveal();
});
