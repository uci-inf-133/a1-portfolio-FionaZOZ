// ===================================
// Smooth Scroll Navigation
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});


// ===================================
// Navigation Bar Scroll Effect
// ===================================
let lastScroll = 0;
const nav = document.querySelector('nav');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Hide nav on scroll down, show on scroll up
    if (currentScroll > lastScroll && currentScroll > 100) {
        nav.style.transform = 'translateY(-100%)';
    } else {
        nav.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
});


// ===================================
// Scroll Animations (Intersection Observer)
// ===================================
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

// Animate elements on scroll
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.service-card, .project-card, .project-section, ' +
        '.experience-item, .education-item, .skill-item, ' +
        '.contact-form, .info-card'
    );
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Initialize animations when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollAnimations);
} else {
    initScrollAnimations();
}


// ===================================
// Contact Form Handler
// ===================================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Validate form (basic validation)
        if (!firstName || !lastName || !email || !subject || !message) {
            alert('Please fill out all required fields.');
            return;
        }
        
        // Email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        // Show success message
        const successMessage = document.getElementById('successMessage');
        if (successMessage) {
            successMessage.classList.add('show');
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                successMessage.classList.remove('show');
            }, 5000);
        }
        
        // Reset form
        this.reset();
        
        // Scroll to top of form
        document.querySelector('.contact-form').scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
        
        // Here you would normally send the form data to a server
        // For example using fetch API:
        /*
        fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstName,
                lastName,
                email,
                subject,
                message
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
        */
    });
}


// ===================================
// Mobile Menu Toggle (Optional Enhancement)
// ===================================
function createMobileMenu() {
    const nav = document.querySelector('nav');
    const navUl = nav.querySelector('ul');
    
    // Only create mobile menu if it doesn't exist
    if (!nav.querySelector('.mobile-menu-toggle')) {
        // Create hamburger button
        const menuToggle = document.createElement('button');
        menuToggle.className = 'mobile-menu-toggle';
        menuToggle.setAttribute('aria-label', 'Toggle navigation menu');
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        
        // Insert after logo
        nav.insertBefore(menuToggle, navUl);
        
        // Toggle menu on click
        menuToggle.addEventListener('click', function() {
            navUl.classList.toggle('mobile-menu-open');
            const icon = this.querySelector('i');
            
            if (navUl.classList.contains('mobile-menu-open')) {
                icon.className = 'fas fa-times';
            } else {
                icon.className = 'fas fa-bars';
            }
        });
        
        // Close menu when clicking a link
        navUl.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                navUl.classList.remove('mobile-menu-open');
                menuToggle.querySelector('i').className = 'fas fa-bars';
            });
        });
    }
}

// Initialize mobile menu on small screens
if (window.innerWidth <= 768) {
    createMobileMenu();
}

// Reinitialize on resize
let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        if (window.innerWidth <= 768) {
            createMobileMenu();
        }
    }, 250);
});


// ===================================
// Preload Images (Optional Performance Enhancement)
// ===================================
function preloadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    images.forEach(img => {
        const src = img.getAttribute('data-src');
        if (src) {
            img.src = src;
            img.removeAttribute('data-src');
        }
    });
}

// Call preload when page is loaded
window.addEventListener('load', preloadImages);


// ===================================
// Add Active Class to Current Page Nav Link
// ===================================
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const linkPage = link.getAttribute('href');
        
        if (linkPage === currentPage || 
            (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// Set active nav link on page load
document.addEventListener('DOMContentLoaded', setActiveNavLink);


// ===================================
// Form Input Enhancement
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    const formInputs = document.querySelectorAll('input, textarea, select');
    
    formInputs.forEach(input => {
        // Add floating label effect
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
        
        // Check if input already has value on page load
        if (input.value) {
            input.parentElement.classList.add('focused');
        }
    });
});


// ===================================
// Back to Top Button (Optional Enhancement)
// ===================================
function createBackToTopButton() {
    // Check if button already exists
    if (document.querySelector('.back-to-top')) return;
    
    const button = document.createElement('button');
    button.className = 'back-to-top';
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(button);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            button.classList.add('visible');
        } else {
            button.classList.remove('visible');
        }
    });
    
    // Scroll to top on click
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize back to top button
document.addEventListener('DOMContentLoaded', createBackToTopButton);


// ===================================
// Console Welcome Message
// ===================================
console.log('%c👋 Hi there!', 'font-size: 20px; color: #f6ad55; font-weight: bold;');
console.log('%cWelcome to my portfolio website!', 'font-size: 14px; color: #2d3748;');
console.log('%cIf you\'re interested in the code, check out the repository or get in touch!', 'font-size: 12px; color: #718096;');