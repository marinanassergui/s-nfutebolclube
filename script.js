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
});
