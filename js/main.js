document.addEventListener('DOMContentLoaded', () => {
    // 1. Theme Toggle Logic
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;
    const moonIcon = document.getElementById('moon-icon');
    const sunIcon = document.getElementById('sun-icon');

    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Default to dark mode for a more premium feel, unless user explicitly chose light
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

    // 2. Modal Logic for CTA Button
    const modal = document.getElementById('auth-modal');
    const openBtn = document.getElementById('open-modal-btn');
    const closeBtn = document.getElementById('close-modal');
    const waitlistForm = document.getElementById('waitlist-form');

    openBtn.addEventListener('click', () => {
        modal.classList.remove('hidden');
    });

    closeBtn.addEventListener('click', () => {
        modal.classList.add('hidden');
    });

    // Close when clicking outside the modal content
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.add('hidden');
        }
    });

    // Handle form submit (mock interaction)
    waitlistForm.addEventListener('submit', (e) => {
        e.preventDefault();
        waitlistForm.innerHTML = '<div class="success-msg">Success! You are on the waitlist.</div>';
        setTimeout(() => {
            modal.classList.add('hidden');
            // reset form after hiding
            setTimeout(() => location.reload(), 500); 
        }, 2000);
    });

    // 3. Scroll Reveal Animations
    const reveals = document.querySelectorAll('.reveal');
    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    reveals.forEach(reveal => {
        revealOnScroll.observe(reveal);
    });

    // Fire it once on load for elements already in viewport
    setTimeout(() => {
        reveals.forEach(reveal => {
            const windowHeight = window.innerHeight;
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - 50) {
                reveal.classList.add('active');
            }
        });
    }, 100);

    // 4. Easter Egg: Konami Code
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
