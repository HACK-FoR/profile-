// JavaScript for English Page - No Horizontal Movements
document.addEventListener('DOMContentLoaded', function() {
    // Static Navigation
    const navbar = document.querySelector('.navbar');
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Toggle navigation menu for mobile
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
    
    // Close menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
    
    // Counter Effects (vertical only)
    const statValues = document.querySelectorAll('.stat-value');
    
    const animateCounter = (element, target, duration = 2000) => {
        const startValue = 0;
        const startTime = Date.now();
        
        const updateCounter = () => {
            const currentTime = Date.now();
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const currentValue = Math.floor(easeProgress * target);
            
            element.textContent = currentValue;
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        };
        
        updateCounter();
    };
    
    // Intersection Observer for animations (vertical only)
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                // Statistics counters
                if (element.classList.contains('stat-value')) {
                    const target = parseInt(element.getAttribute('data-count'));
                    animateCounter(element, target, 1500);
                }
                
                // Skills progress bars
                if (element.classList.contains('skill-progress')) {
                    const width = element.getAttribute('data-width') + '%';
                    setTimeout(() => {
                        element.style.width = width;
                    }, 300);
                }
                
                // Graph bars
                if (element.classList.contains('graph-bar')) {
                    const height = element.getAttribute('data-value') + '%';
                    setTimeout(() => {
                        element.style.height = height;
                    }, 500);
                }
            }
        });
    }, observerOptions);
    
    // Observe all required elements
    document.querySelectorAll('.stat-value, .skill-progress, .graph-bar').forEach(el => {
        observer.observe(el);
    });
    
    // Typing effect for title (no horizontal movement)
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        // Start typing after delay
        setTimeout(typeWriter, 500);
    }
    
    // Image scaling on scroll (vertical only)
    const mainImage = document.querySelector('.main-image');
    if (mainImage) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            // Only vertical scaling
            const scale = 1 + (scrolled * 0.0001);
            mainImage.style.transform = `scale(${Math.min(scale, 1.05)})`;
        });
    }
    
    // Particle effects around image (vertical only)
    const imageContainer = document.querySelector('.image-container');
    if (imageContainer) {
        imageContainer.addEventListener('mousemove', (e) => {
            const rect = imageContainer.getBoundingClientRect();
            const y = e.clientY - rect.top;
            
            const sparkles = document.querySelectorAll('.image-sparkle');
            
            sparkles.forEach((sparkle, index) => {
                const centerY = rect.height / 2;
                const distance = Math.abs(y - centerY);
                const maxDistance = rect.height / 2;
                const intensity = 1 - (distance / maxDistance);
                
                // Vertical movement only
                const moveDistance = 20 * intensity;
                const newY = y < centerY ? -moveDistance : moveDistance;
                
                sparkle.style.transform = `translateY(${newY}px)`;
                sparkle.style.opacity = intensity;
            });
        });
        
        imageContainer.addEventListener('mouseleave', () => {
            const sparkles = document.querySelectorAll('.image-sparkle');
            sparkles.forEach(sparkle => {
                sparkle.style.transform = 'translateY(0)';
                sparkle.style.opacity = '1';
            });
        });
    }
    
    // Card effects (vertical only)
    const cards = document.querySelectorAll('.service-card, .advantage-card, .exp-item, .platform-card');
    cards.forEach(card => {
        card.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
        
        // Hover effect (vertical only)
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Contact form
    const messageForm = document.getElementById('messageForm');
    if (messageForm) {
        messageForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            // Here you can add code to send the message
            console.log('Sending message:', { name, email, message });
            
            // Success message
            alert('Your message has been sent successfully! I will contact you soon.');
            this.reset();
        });
    }
    
    // Smooth scrolling for anchor links (vertical only)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offset = 80;
                const targetPosition = targetElement.offsetTop - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Page load animation
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
        
        // Animate elements after load (vertical only)
        setTimeout(() => {
            const animatedElements = document.querySelectorAll('.service-card, .advantage-card, .exp-item');
            animatedElements.forEach((el, index) => {
                setTimeout(() => {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }, index * 100);
            });
        }, 500);
    });
    
    // Animated background particles (vertical only)
    const bgParticles = document.querySelectorAll('.bg-particle');
    bgParticles.forEach(particle => {
        const duration = 20 + Math.random() * 10;
        const delay = Math.random() * 10;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;
    });
    
    // Prevent horizontal movements for language cards
    const arabicCard = document.querySelector('.arabic-card');
    if (arabicCard) {
        arabicCard.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)'; // Vertical only
        });
        
        arabicCard.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    }
    
    const englishCard = document.querySelector('.english-card');
    if (englishCard) {
        englishCard.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)'; // Vertical only
        });
        
        englishCard.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    }
});