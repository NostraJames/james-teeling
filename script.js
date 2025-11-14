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

// EmailJS Configuration
// IMPORTANT: Replace these with your actual EmailJS credentials
// Get them from: https://dashboard.emailjs.com/
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';  // Replace with your service ID
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID'; // Replace with your template ID
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';   // Replace with your public key

// Initialize EmailJS
(function() {
    emailjs.init(EMAILJS_PUBLIC_KEY);
})();

// Contact form submission
const contactForm = document.getElementById('contactForm');
const submitBtn = contactForm.querySelector('button[type="submit"]');
const originalBtnText = submitBtn.textContent;

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Disable button and show loading state
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    
    // Get form data
    const templateParams = {
        from_name: document.getElementById('name').value,
        from_email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value,
        to_email: 'JamesJTeeling@gmail.com' // Your receiving email
    };
    
    // Send email using EmailJS
    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
        .then((response) => {
            console.log('SUCCESS!', response.status, response.text);
            showFormMessage('Message sent successfully! I\'ll get back to you soon.', 'success');
            contactForm.reset();
        })
        .catch((error) => {
            console.error('FAILED...', error);
            showFormMessage('Failed to send message. Please try again or email me directly at JamesJTeeling@gmail.com', 'error');
        })
        .finally(() => {
            // Re-enable button
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
        });
});

// Function to show form feedback messages
function showFormMessage(message, type) {
    // Remove any existing messages
    const existingMsg = contactForm.querySelector('.form-message');
    if (existingMsg) {
        existingMsg.remove();
    }
    
    // Create new message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message ${type}`;
    messageDiv.textContent = message;
    
    // Insert before submit button
    submitBtn.parentNode.insertBefore(messageDiv, submitBtn);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        messageDiv.style.opacity = '0';
        setTimeout(() => messageDiv.remove(), 300);
    }, 5000);
}

// Animate skill bars on scroll
const skillBars = document.querySelectorAll('.skill-progress');

// Initialize all bars to 0% on page load
skillBars.forEach(bar => {
    const targetWidth = bar.style.width;
    bar.setAttribute('data-width', targetWidth);  // Save target width
    bar.style.width = '0%';                       // Start at 0%
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
            // Bar is out of view - reset to 0%
            bar.classList.remove('animated');
            bar.style.width = '0%';
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
