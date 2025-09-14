/**
 * VisaEthio - THE MOST AMAZING INTERACTIVE EXPERIENCE
 * Revolutionary JavaScript with cutting-edge animations and effects
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 VisaEthio - Amazing UI loaded successfully!');
    
    // Initialize all revolutionary functionality
    initParticleSystem();
    initScrollNavbar();
    initMobileNavigation();
    initCountryCards();
    initRegistrationForm();
    initSmoothScrolling();
    initFormValidation();
    initLoadingStates();
    initMouseFollower();
    initScrollAnimations();
    initFloatingElements();
    
    // Add entrance animations
    setTimeout(() => {
        document.body.style.opacity = '1';
        document.body.style.transform = 'translateY(0)';
    }, 100);
});

/**
 * Particle System for Background
 */
function initParticleSystem() {
    const canvas = document.createElement('canvas');
    canvas.id = 'particle-canvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '-1';
    canvas.style.pointerEvents = 'none';
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.size = Math.random() * 3 + 1;
            this.opacity = Math.random() * 0.5 + 0.1;
            this.hue = Math.random() * 60 + 200; // Blue to purple range
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }
        
        draw() {
            ctx.save();
            ctx.globalAlpha = this.opacity;
            ctx.fillStyle = `hsl(${this.hue}, 70%, 60%)`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }
    
    // Create particles
    for (let i = 0; i < 50; i++) {
        particles.push(new Particle());
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

/**
 * Initialize Mobile Navigation
 */
function initMobileNavigation() {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const body = document.body;
    
    if (!navbarToggler || !navbarCollapse) return;
    
    // Create mobile overlay
    let mobileOverlay = document.querySelector('.mobile-nav-overlay');
    if (!mobileOverlay) {
        mobileOverlay = document.createElement('div');
        mobileOverlay.className = 'mobile-nav-overlay';
        document.body.appendChild(mobileOverlay);
    }
    
    // Close mobile menu when clicking on overlay
    mobileOverlay.addEventListener('click', function() {
        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse) || new bootstrap.Collapse(navbarCollapse, { toggle: false });
        bsCollapse.hide();
    });
    
    // Close mobile menu when clicking outside (fallback)
    document.addEventListener('click', function(e) {
        const isClickInsideNav = navbarCollapse.contains(e.target) || navbarToggler.contains(e.target);
        const isNavOpen = navbarCollapse.classList.contains('show');
        
        if (!isClickInsideNav && isNavOpen && window.innerWidth <= 991) {
            const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse) || new bootstrap.Collapse(navbarCollapse, { toggle: false });
            bsCollapse.hide();
        }
    });
    
    // Close mobile menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const isNavOpen = navbarCollapse.classList.contains('show');
            
            if (isNavOpen && window.innerWidth <= 991) {
                // Add a small delay to allow for smooth transition before closing
                setTimeout(() => {
                    const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse) || new bootstrap.Collapse(navbarCollapse, { toggle: false });
                    bsCollapse.hide();
                }, 150);
            }
        });
    });
    
    // Handle escape key to close mobile menu
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const isNavOpen = navbarCollapse.classList.contains('show');
            if (isNavOpen && window.innerWidth <= 991) {
                const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse) || new bootstrap.Collapse(navbarCollapse, { toggle: false });
                bsCollapse.hide();
            }
        }
    });
    
    // Add proper ARIA attributes for accessibility
    navbarToggler.addEventListener('click', function() {
        const isExpanded = this.getAttribute('aria-expanded') === 'true';
        this.setAttribute('aria-expanded', !isExpanded);
    });
    
    // Listen to Bootstrap collapse events to update toggler state and overlay
    navbarCollapse.addEventListener('show.bs.collapse', function() {
        if (window.innerWidth <= 991) {
            mobileOverlay.classList.add('show');
            body.style.overflow = 'hidden'; // Prevent body scroll when menu is open
        }
    });
    
    navbarCollapse.addEventListener('shown.bs.collapse', function() {
        navbarToggler.setAttribute('aria-expanded', 'true');
        navbarToggler.classList.add('collapsed');
    });
    
    navbarCollapse.addEventListener('hide.bs.collapse', function() {
        if (window.innerWidth <= 991) {
            mobileOverlay.classList.remove('show');
            body.style.overflow = ''; // Restore body scroll
        }
    });
    
    navbarCollapse.addEventListener('hidden.bs.collapse', function() {
        navbarToggler.setAttribute('aria-expanded', 'false');
        navbarToggler.classList.remove('collapsed');
    });
    
    // Handle window resize to clean up mobile-specific functionality
    window.addEventListener('resize', function() {
        if (window.innerWidth > 991) {
            mobileOverlay.classList.remove('show');
            body.style.overflow = '';
            navbarToggler.classList.remove('collapsed');
        }
    });
}

/**
 * Enhanced Scroll-triggered Navbar Effects
 */
function initScrollNavbar() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    let ticking = false;
    
    function updateNavbar() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
    
    // Add active state to nav links based on current section
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link[href^="#"]');
    
    function highlightNavigation() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavigation);
    
    // Add navbar brand hover effect
    const brand = navbar.querySelector('.navbar-brand');
    if (brand) {
        brand.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.filter = 'drop-shadow(0 6px 20px rgba(16, 185, 129, 0.4))';
        });
        
        brand.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.filter = 'none';
        });
    }
    
    // Enhanced CTA button effects
    const ctaButton = navbar.querySelector('.btn-cta');
    if (ctaButton) {
        ctaButton.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
            this.style.boxShadow = '0 15px 40px rgba(16, 185, 129, 0.4), 0 6px 20px rgba(0, 0, 0, 0.15)';
        });
        
        ctaButton.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 8px 25px rgba(16, 185, 129, 0.3), 0 3px 10px rgba(0, 0, 0, 0.1)';
        });
        
        ctaButton.addEventListener('click', function(e) {
            // Add click ripple effect without scaling
            const rect = this.getBoundingClientRect();
            const ripple = document.createElement('span');
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.3)';
            ripple.style.transform = 'none';
            ripple.style.animation = 'ripple 0.6s linear';
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    }
}

/**
 * Mouse Follower Effect
 */
function initMouseFollower() {
    const follower = document.createElement('div');
    follower.className = 'mouse-follower';
    follower.innerHTML = '<div class="follower-inner"></div>';
    document.body.appendChild(follower);
    
    const style = document.createElement('style');
    style.textContent = `
        .mouse-follower {
            position: fixed;
            width: 40px;
            height: 40px;
            pointer-events: none;
            z-index: 9999;
            transition: all 0.1s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .follower-inner {
            width: 100%;
            height: 100%;
            border: 2px solid rgba(102, 126, 234, 0.5);
            border-radius: 50%;
            background: rgba(102, 126, 234, 0.1);
            backdrop-filter: blur(10px);
            transform: scale(0);
            transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .mouse-follower.active .follower-inner {
            transform: scale(1);
        }
    `;
    document.head.appendChild(style);
    
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        follower.classList.add('active');
    });
    
    document.addEventListener('mouseleave', () => {
        follower.classList.remove('active');
    });
    
    function updateFollower() {
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        
        follower.style.left = followerX - 20 + 'px';
        follower.style.top = followerY - 20 + 'px';
        
        requestAnimationFrame(updateFollower);
    }
    
    updateFollower();
}

/**
 * Floating Elements Animation
 */
function initFloatingElements() {
    const floatingElements = document.querySelectorAll('.hero-icon, .feature-icon, .country-flag-img');
    
    floatingElements.forEach((element, index) => {
        const delay = index * 0.2;
        const amplitude = 10 + Math.random() * 10;
        const frequency = 0.01 + Math.random() * 0.005;
        
        function float() {
            const time = Date.now() * frequency;
            const y = Math.sin(time + delay) * amplitude;
            const x = Math.cos(time * 0.5 + delay) * (amplitude * 0.5);
            
            element.style.transform = `translate(${x}px, ${y}px)`;
            requestAnimationFrame(float);
        }
        
        float();
    });
}

/**
 * Enhanced Country Card Interactions
 */
function initCountryCards() {
    const countryCards = document.querySelectorAll('.country-card');
    
    countryCards.forEach((card, index) => {
        // Add entrance animation delay
        card.style.animationDelay = `${index * 0.2}s`;
        card.classList.add('animate-in');
        
        // Enhanced hover effects with 3D tilt
        card.addEventListener('mouseenter', function(e) {
            this.style.transform = 'translateY(-15px) scale(1.05) rotateX(5deg)';
            
            // Add ripple effect
            createRipple(e, this);
            
            // Animate flag
            const flag = this.querySelector('.country-flag-img, .flag-emoji');
            if (flag) {
                flag.style.transform = 'scale(1.2) rotate(10deg)';
            }
            
            // Animate stats
            const stats = this.querySelectorAll('.stat-item');
            stats.forEach((stat, i) => {
                setTimeout(() => {
                    stat.style.transform = 'translateY(-5px) scale(1.05)';
                }, i * 100);
            });
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1) rotateX(0)';
            
            const flag = this.querySelector('.country-flag-img, .flag-emoji');
            if (flag) {
                flag.style.transform = 'scale(1) rotate(0deg)';
            }
            
            const stats = this.querySelectorAll('.stat-item');
            stats.forEach(stat => {
                stat.style.transform = 'translateY(0) scale(1)';
            });
        });
        
        // 3D mouse tracking effect
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.style.transform = `translateY(-15px) scale(1.05) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        // Enhanced apply button
        const applyButton = card.querySelector('.btn');
        if (applyButton) {
            applyButton.addEventListener('click', function(e) {
                e.preventDefault();
                
                const countryName = card.querySelector('.country-name').textContent;
                
                // Magical loading animation
                this.innerHTML = '<div class="spinner-magic"></div><span>Preparing Application...</span>';
                this.disabled = true;
                this.style.background = 'linear-gradient(45deg, #667eea, #764ba2, #f093fb)';
                this.style.backgroundSize = '300% 300%';
                this.style.animation = 'gradientShift 2s ease infinite';
                
                // Add magical particles
                createMagicalParticles(this);
                
                // Navigate after animation
                setTimeout(() => {
                    window.location.href = this.closest('a').href || applyButton.href;
                }, 2000);
            });
        }
    });
}

/**
 * Create Ripple Effect
 */
function createRipple(event, element) {
    const circle = document.createElement('span');
    const diameter = Math.max(element.clientWidth, element.clientHeight);
    const radius = diameter / 2;
    
    const rect = element.getBoundingClientRect();
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - rect.left - radius}px`;
    circle.style.top = `${event.clientY - rect.top - radius}px`;
    circle.classList.add('ripple');
    
    const rippleStyle = `
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    
    if (!document.querySelector('#ripple-style')) {
        const style = document.createElement('style');
        style.id = 'ripple-style';
        style.textContent = rippleStyle;
        document.head.appendChild(style);
    }
    
    element.appendChild(circle);
    
    setTimeout(() => {
        circle.remove();
    }, 600);
}

/**
 * Create Magical Particles
 */
function createMagicalParticles(element) {
    const particleCount = 20;
    const rect = element.getBoundingClientRect();
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'magic-particle';
        particle.style.position = 'fixed';
        particle.style.left = rect.left + rect.width / 2 + 'px';
        particle.style.top = rect.top + rect.height / 2 + 'px';
        particle.style.width = '4px';
        particle.style.height = '4px';
        particle.style.background = `hsl(${Math.random() * 60 + 200}, 70%, 60%)`;
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '9999';
        
        const angle = (i / particleCount) * Math.PI * 2;
        const velocity = 2 + Math.random() * 3;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        
        document.body.appendChild(particle);
        
        let opacity = 1;
        let scale = 1;
        
        function animateParticle() {
            const currentLeft = parseFloat(particle.style.left);
            const currentTop = parseFloat(particle.style.top);
            
            particle.style.left = currentLeft + vx + 'px';
            particle.style.top = currentTop + vy + 'px';
            
            opacity -= 0.02;
            scale += 0.02;
            
            particle.style.opacity = opacity;
            particle.style.transform = `scale(${scale})`;
            
            if (opacity > 0) {
                requestAnimationFrame(animateParticle);
            } else {
                particle.remove();
            }
        }
        
        setTimeout(() => animateParticle(), i * 50);
    }
}

/**
 * Initialize registration form functionality
 */
function initRegistrationForm() {
    const form = document.getElementById('registrationForm');
    if (!form) return;
    
    // Pre-fill country from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const selectedCountry = urlParams.get('country');
    if (selectedCountry) {
        const countrySelect = document.getElementById('desired_country');
        if (countrySelect) {
            countrySelect.value = selectedCountry;
        }
    }
    
    // Form submission is now handled by emailjs-config.js
    
    // Auto-format phone number
    const phoneInput = form.querySelector('input[name="phone_number"]');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            // Format as +251-XX-XXX-XXXX for Ethiopian numbers
            if (value.startsWith('251')) {
                value = value.substring(3);
            }
            if (value.startsWith('0')) {
                value = value.substring(1);
            }
            
            if (value.length > 0) {
                if (value.length <= 2) {
                    value = '+251-' + value;
                } else if (value.length <= 5) {
                    value = '+251-' + value.substring(0, 2) + '-' + value.substring(2);
                } else if (value.length <= 8) {
                    value = '+251-' + value.substring(0, 2) + '-' + value.substring(2, 5) + '-' + value.substring(5);
                } else {
                    value = '+251-' + value.substring(0, 2) + '-' + value.substring(2, 5) + '-' + value.substring(5, 9);
                }
            }
            
            e.target.value = value;
        });
    }
    
    // Real-time validation
    const inputs = form.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            // Remove error states on input
            this.classList.remove('is-invalid');
            const errorDiv = this.parentNode.querySelector('.text-danger');
            if (errorDiv) {
                errorDiv.style.display = 'none';
            }
        });
    });
}

/**
 * Initialize smooth scrolling for anchor links
 */
function initSmoothScrolling() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Form validation is now handled by emailjs-config.js

// Field validation is now handled by emailjs-config.js

// Error handling is now in emailjs-config.js

// Error handling is now in emailjs-config.js

/**
 * Initialize loading states for buttons
 */
function initLoadingStates() {
    const buttons = document.querySelectorAll('.btn:not([type="submit"])');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (this.href && !this.href.startsWith('#')) {
                const originalText = this.innerHTML;
                this.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Loading...';
                this.disabled = true;
                
                // Re-enable after navigation starts
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.disabled = false;
                }, 1000);
            }
        });
    });
}

/**
 * Utility function to get URL parameters
 */
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    const results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

// Success/error messages are now in emailjs-config.js

// Success/error messages are now in emailjs-config.js

/**
 * Initialize animations on scroll
 */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationDelay = '0.1s';
                entry.target.style.animationFillMode = 'both';
                entry.target.style.animationName = 'fadeInUp';
            }
        });
    }, observerOptions);
    
    const animatedElements = document.querySelectorAll('.country-card, .feature-card, .stat-item');
    animatedElements.forEach(el => observer.observe(el));
}

// Initialize scroll animations if Intersection Observer is supported
if ('IntersectionObserver' in window) {
    document.addEventListener('DOMContentLoaded', initScrollAnimations);
}