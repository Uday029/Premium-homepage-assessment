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

    // 2. 3D Floating Parallax Effect (Modern Website design)
    const wrapper = document.querySelector('.mock-wrapper');
    
    // Only apply on desktop
    if (window.innerWidth > 768) {
        wrapper.addEventListener('mousemove', (e) => {
            const rect = wrapper.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Calculate rotation up to 8 degrees
            const rotateX = ((y - centerY) / centerY) * -8;
            const rotateY = ((x - centerX) / centerX) * 8;
            
            wrapper.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        wrapper.addEventListener('mouseleave', () => {
            wrapper.style.transform = `rotateX(0deg) rotateY(0deg)`;
        });
    }

    // 3. Modal & Data Collection Logic
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

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.add('hidden');
        }
    });

    // Realistically "Collect" the email
    waitlistForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const emailInput = document.querySelector('.modal-input');
        const email = emailInput.value;
        
        // Save the collected email to local storage so it persists
        let waitlist = JSON.parse(localStorage.getItem('log_waitlist') || '[]');
        waitlist.push({ email, date: new Date().toISOString() });
        localStorage.setItem('log_waitlist', JSON.stringify(waitlist));
        
        // Log it to the console to verify collection works
        console.log(`[Log Application] Successfully collected waitlist email: ${email}`);

        // Update the UI to show personalized success
        waitlistForm.innerHTML = `<div class="success-msg">Success! <b>${email}</b> is securely added to the waitlist.</div>`;
        
        // Close modal and reload page after a delay
        setTimeout(() => {
            modal.classList.add('hidden');
            setTimeout(() => location.reload(), 500); 
        }, 3000);
    });

    // 4. Scroll Reveal Animations
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

    // 5. Easter Egg: Konami Code
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
