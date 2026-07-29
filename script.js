// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            navMenu.classList.remove('active');
        }
    });
});

// Mobile navigation toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Active navigation link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Navbar background on scroll
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 1)';
        navbar.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
    }
});

// Contact section - mailto links work automatically, no JavaScript needed!

// Animate skill bars on scroll
const skillBars = document.querySelectorAll('.skill-progress');

// Initialize all bars to their starting width on page load
// (defaults to 0%, but data-start lets a bar animate downward instead)
skillBars.forEach(bar => {
    const targetWidth = bar.style.width;
    bar.setAttribute('data-width', targetWidth);  // Save target width
    bar.style.width = bar.dataset.start || '0%';  // Start at data-start, else 0%
});

const animateSkills = () => {
    skillBars.forEach(bar => {
        const barPosition = bar.getBoundingClientRect().top;
        const screenPosition = window.innerHeight;
        const barBottom = bar.getBoundingClientRect().bottom;
        
        // Check if bar is in viewport
        if (barPosition < screenPosition && barBottom > 0) {
            // Bar is visible - animate if not already animated
            if (!bar.classList.contains('animated')) {
                bar.classList.add('animated');
                const targetWidth = bar.getAttribute('data-width');
                setTimeout(() => {
                    bar.style.width = targetWidth;
                }, 300);
            }
        } else {
            // Bar is out of view - reset to its starting width
            bar.classList.remove('animated');
            bar.style.width = bar.dataset.start || '0%';
        }
    });
};

// Run once on load and on scroll
window.addEventListener('scroll', animateSkills);
window.addEventListener('load', animateSkills);

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.project-card, .timeline-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});
