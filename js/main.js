document.addEventListener('DOMContentLoaded', () => {
    // 1. Theme Toggle Logic
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;
    const moonIcon = document.getElementById('moon-icon');
    const sunIcon = document.getElementById('sun-icon');

    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'light') {
        html.classList.remove('dark');
        moonIcon.style.display = 'block';
        sunIcon.style.display = 'none';
    } else {
        html.classList.add('dark');
        moonIcon.style.display = 'none';
        sunIcon.style.display = 'block';
    }

    themeToggle.addEventListener('click', () => {
        html.classList.toggle('dark');
        const isDark = html.classList.contains('dark');
        
        if (isDark) {
            localStorage.setItem('theme', 'dark');
            moonIcon.style.display = 'none';
            sunIcon.style.display = 'block';
        } else {
            localStorage.setItem('theme', 'light');
            moonIcon.style.display = 'block';
            sunIcon.style.display = 'none';
        }
    });

    // 2. Sticky Navbar Blur Logic
    const navbar = document.querySelector('.navbar-container');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3. 3D Floating Parallax Effect for Product Card
    const showcase = document.querySelector('.product-showcase');
    const wrapper = document.querySelector('.mock-wrapper');
    if (window.innerWidth > 768) {
        showcase.addEventListener('mousemove', (e) => {
            const rect = wrapper.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const x = e.clientX - centerX;
            const y = e.clientY - centerY;
            
            const rawRotateX = (y / (rect.height / 2)) * -5;
            const rawRotateY = (x / (rect.width / 2)) * -5; 
            
            const rotateX = Math.max(-5, Math.min(5, rawRotateX));
            const rotateY = Math.max(-5, Math.min(5, rawRotateY));
            
            wrapper.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        showcase.addEventListener('mouseleave', () => {
            wrapper.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
        });
    }

    // 4. Magnetic Button Effect
    const ctaButton = document.getElementById('open-modal-btn');
    if (window.innerWidth > 768) {
        ctaButton.addEventListener('mousemove', (e) => {
            const rect = ctaButton.getBoundingClientRect();
            const h = rect.width / 2;
            const v = rect.height / 2;
            const x = e.clientX - rect.left - h;
            const y = e.clientY - rect.top - v;
            
            ctaButton.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px) scale(1.02)`;
        });
        
        ctaButton.addEventListener('mouseleave', () => {
            ctaButton.style.transform = `translate(0px, 0px) scale(1)`;
        });
    }

    // 5. Spotlight Hover Effect for Features Grid
    const featuresGrid = document.querySelector('.features-grid');
    featuresGrid.addEventListener('mousemove', (e) => {
        for (const card of document.querySelectorAll('.feature-card')) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        }
    });

    // 6. Modal & Keyboard Shortcuts Logic
    const modal = document.getElementById('auth-modal');
    const closeBtn = document.getElementById('close-modal');
    const waitlistForm = document.getElementById('waitlist-form');
    const modalInput = document.querySelector('.modal-input');

    // Open via button
    ctaButton.addEventListener('click', () => {
        modal.classList.remove('hidden');
        setTimeout(() => modalInput.focus(), 100);
    });

    // Close via X button
    closeBtn.addEventListener('click', () => {
        modal.classList.add('hidden');
    });

    // Close via clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.add('hidden');
        }
    });

    // Global Keyboard Shortcuts (J to open, Esc to close)
    document.addEventListener('keydown', (e) => {
        // Prevent triggering if user is already typing in an input
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
            if (e.key === 'Escape') {
                modal.classList.add('hidden');
                e.target.blur();
            }
            return;
        }

        if (e.key.toLowerCase() === 'j') {
            e.preventDefault();
            modal.classList.remove('hidden');
            setTimeout(() => modalInput.focus(), 100);
        }

        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
            modal.classList.add('hidden');
        }
    });

    // Realistically "Collect" the email
    waitlistForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = modalInput.value;
        
        let waitlist = JSON.parse(localStorage.getItem('log_waitlist') || '[]');
        waitlist.push({ email, date: new Date().toISOString() });
        localStorage.setItem('log_waitlist', JSON.stringify(waitlist));
        
        console.log(`[Log Application] Successfully collected waitlist email: ${email}`);

        waitlistForm.innerHTML = `<div class="success-msg">Success! <b>${email}</b> is securely added to the waitlist.</div>`;
        
        setTimeout(() => {
            modal.classList.add('hidden');
            setTimeout(() => location.reload(), 500); 
        }, 3000);
    });

    // 7. Scroll Reveal Animations
    const reveals = document.querySelectorAll('.reveal');
    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    reveals.forEach(reveal => {
        revealOnScroll.observe(reveal);
    });

    setTimeout(() => {
        reveals.forEach(reveal => {
            const windowHeight = window.innerHeight;
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - 50) {
                reveal.classList.add('active');
            }
        });
    }, 100);

    // 8. Easter Egg: Konami Code
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;

    document.addEventListener('keydown', (e) => {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                activateEasterEgg();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });

    function activateEasterEgg() {
        const title = document.getElementById('hero-title');
        title.innerHTML = 'You found the secret.<br><span class="text-gradient">Now go lift. 🏋️</span>';
        
        document.body.animate([
            { filter: 'hue-rotate(0deg)' },
            { filter: 'hue-rotate(360deg)' }
        ], {
            duration: 1500,
            iterations: 1
        });
    }
});
