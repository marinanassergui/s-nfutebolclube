document.addEventListener('DOMContentLoaded', () => {
    // Premium Fade-In Entry Animation
    const heroElements = [
        document.querySelector('.hero-logo-img'),
        document.querySelector('.hero-title'),
        document.querySelector('.hero-description'),
        ...document.querySelectorAll('.btn')
    ];

    // Initialize elements with hidden state
    heroElements.forEach((el, index) => {
        if (el) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.8s cubic-bezier(0.25, 1, 0.5, 1), transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)';
            
            // Staggered fade in
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, 150 + index * 100);
        }
    });

    // Handle background video play promise to catch browsers blocking autoplay
    const video = document.querySelector('.hero-video');
    if (video) {
        video.play().catch(error => {
            console.log("Autoplay was blocked by browser. User interaction might be required to play video.", error);
            
            // Optional fallback: add event listener to document to resume video on first interaction
            const resumeVideo = () => {
                video.play();
                document.removeEventListener('click', resumeVideo);
                document.removeEventListener('touchstart', resumeVideo);
            };
            document.addEventListener('click', resumeVideo);
            document.addEventListener('touchstart', resumeVideo);
        });
    }

    // Smooth scroll for CTAs (if references inside page are added later)
    const partnerBtn = document.getElementById('btn-partner');
    if (partnerBtn) {
        partnerBtn.addEventListener('click', (e) => {
            const href = partnerBtn.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    }

    // Scroll-based animations for Section 2 & 3 elements
    const fadeOnScrollElements = [
        document.querySelector('.section-header'),
        ...document.querySelectorAll('.card'),
        document.querySelector('.section-footer'),
        document.querySelector('.project-info-inner')
    ];

    // Set initial hidden state for scroll elements by adding the class
    fadeOnScrollElements.forEach(el => {
        if (el) {
            el.classList.add('animate-on-scroll');
        }
    });

    const observerOptions = {
        root: null,
        threshold: 0.08,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const target = entry.target;
                setTimeout(() => {
                    target.classList.add('visible');
                }, 50);
                observer.unobserve(target);
            }
        });
    }, observerOptions);

    fadeOnScrollElements.forEach(el => {
        if (el) observer.observe(el);
    });

    // Sticky Header Scroll Handler
    const mainHeader = document.getElementById('main-header');
    function handleScroll() {
        if (mainHeader) {
            const scrollTop = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
            if (scrollTop > 50) {
                mainHeader.classList.add('scrolled');
            } else {
                mainHeader.classList.remove('scrolled');
            }
        }
    }
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Trigger once on load

    // Mobile Hamburger Menu Navigation Toggle
    const navToggle = document.querySelector('.mobile-nav-toggle');
    const headerNav = document.querySelector('.header-nav');
    const navOverlay = document.getElementById('nav-overlay');
    const navLinks = document.querySelectorAll('.nav-link');

    function toggleMenu() {
        if (navToggle && headerNav && navOverlay) {
            const isActive = navToggle.classList.toggle('active');
            headerNav.classList.toggle('active', isActive);
            navOverlay.classList.toggle('active', isActive);
            document.body.style.overflow = isActive ? 'hidden' : '';
        }
    }

    if (navToggle) {
        navToggle.addEventListener('click', toggleMenu);
    }
    if (navOverlay) {
        navOverlay.addEventListener('click', toggleMenu);
    }

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navToggle && navToggle.classList.contains('active')) {
                toggleMenu();
            }
        });
    });
});
