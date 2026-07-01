// Navigation Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        updateActiveLink(link);
    });
});

// Update active navigation link
function updateActiveLink(current) {
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    current.classList.add('active');
}

// Smooth scroll navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Update active link on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// Donation Modal
const modal = document.getElementById('donationModal');
const closeBtn = document.querySelector('.close');
const ctaButtons = document.querySelectorAll('.cta-button');
const donationCards = document.querySelectorAll('.donation-card');
const donationAmountInput = document.getElementById('donationAmount');
const donationForm = document.getElementById('donationForm');
const customDonationForm = document.getElementById('customDonationForm');

// Open modal with CTA button
ctaButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        // Check if it's in the hero section or donate section
        const isHeroButton = button.closest('.hero');
        const isDonateButton = button.closest('.donate');
        
        if (isHeroButton || button.textContent === 'Support a Child Today') {
            // Show a simple alert or open donation section
            window.location.href = '#donate';
        } else if (isDonateButton) {
            modal.style.display = 'block';
        }
    });
});

// Open modal with donation cards
donationCards.forEach(card => {
    const cardBtn = card.querySelector('.donate-card-btn');
    cardBtn.addEventListener('click', () => {
        const amount = card.getAttribute('data-amount');
        donationAmountInput.value = amount;
        modal.style.display = 'block';
    });
});

// Close modal
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// Custom donation form
customDonationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const amount = document.getElementById('customAmount').value;
    if (amount && amount > 0) {
        donationAmountInput.value = amount;
        modal.style.display = 'block';
        document.getElementById('customAmount').value = '';
    }
});

// Donation form submission
donationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const amount = donationAmountInput.value;
    const name = donationForm.querySelector('input[type="text"]').value;
    const email = donationForm.querySelector('input[type="email"]').value;
    const paymentMethod = donationForm.querySelector('select').value;

    // Simulate donation processing
    console.log({
        amount,
        name,
        email,
        paymentMethod,
        timestamp: new Date().toISOString()
    });

    // Show success message
    showSuccessMessage(`Thank you, ${name}! Your donation of $${amount} has been received.`);
    
    // Reset form and close modal
    donationForm.reset();
    modal.style.display = 'none';
    
    // Clear input
    donationAmountInput.value = '';
});

// Success message display
function showSuccessMessage(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = `
        <div style="
            position: fixed;
            top: 20px;
            right: 20px;
            background: #10b981;
            color: white;
            padding: 1rem 2rem;
            border-radius: 5px;
            box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
            z-index: 3000;
            animation: slideInRight 0.3s ease;
        ">
            <i class="fas fa-check-circle"></i> ${message}
        </div>
    `;
    document.body.appendChild(successDiv);

    setTimeout(() => {
        successDiv.remove();
    }, 3000);
}

// Contact form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = {
            name: contactForm.querySelector('input[type="text"]').value,
            email: contactForm.querySelector('input[type="email"]').value,
            message: contactForm.querySelector('textarea').value,
            timestamp: new Date().toISOString()
        };

        console.log('Contact form submitted:', formData);
        
        showSuccessMessage('Thank you for your message! We will get back to you soon.');
        
        contactForm.reset();
    });
}

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeIn 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe cards and elements
document.querySelectorAll('.program-card, .story-card, .stat-card, .donation-card').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// Add CSS animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Counter animation for statistics
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current).toLocaleString();
    }, 16);
}

// Trigger counter animation when stats section is visible
const statsSection = document.querySelector('.about-stats');
if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            const statCards = document.querySelectorAll('.stat-card');
            statCards.forEach(card => {
                const h4 = card.querySelector('h4');
                const text = h4.textContent;
                
                if (text.includes('$')) {
                    const amount = parseInt(text.replace(/\D/g, ''));
                    animateCounter(h4, amount);
                    h4.textContent = text.replace(/[\d,]+/, 'animating');
                } else if (text.includes('%')) {
                    const percent = parseInt(text);
                    animateCounter(h4, percent);
                    h4.textContent = text.replace(/\d+%/, 'animating%');
                } else {
                    const num = parseInt(text.replace(/\D/g, ''));
                    if (!isNaN(num)) {
                        animateCounter(h4, num);
                    }
                }
            });
            statsObserver.unobserve(entries[0].target);
        }
    }, { threshold: 0.5 });
    
    statsObserver.observe(statsSection);
}

// Add smooth scroll behavior to page
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// Form validation utilities
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validateAmount(amount) {
    return amount > 0 && amount <= 100000;
}

// Add event listeners for form validation
const allInputs = document.querySelectorAll('input[type="text"], input[type="email"], input[type="number"]');
allInputs.forEach(input => {
    input.addEventListener('blur', function() {
        if (this.type === 'email' && this.value) {
            if (!validateEmail(this.value)) {
                this.style.borderColor = '#ef4444';
                this.title = 'Please enter a valid email address';
            } else {
                this.style.borderColor = '#10b981';
            }
        }
        if (this.type === 'number' && this.value) {
            if (!validateAmount(this.value)) {
                this.style.borderColor = '#ef4444';
                this.title = 'Please enter an amount between 1 and 100000';
            } else {
                this.style.borderColor = '#10b981';
            }
        }
    });
});

// Mobile menu responsiveness
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        navMenu.classList.remove('active');
    }
});

console.log('Nepal Education Fund Website Loaded Successfully');
