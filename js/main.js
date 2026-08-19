document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;
    const moonIcon = document.getElementById('moon-icon');
    const sunIcon = document.getElementById('sun-icon');

    // Check local storage or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
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

    // Easter Egg: Konami Code
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;

    document.addEventListener('keydown', (e) => {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                activateEasterEgg();
                konamiIndex = 0; // Reset
            }
        } else {
            konamiIndex = 0;
        }
    });

    function activateEasterEgg() {
        const title = document.getElementById('hero-title');
        title.innerHTML = 'You found the secret.<br>Now go lift. 🏋️';
        
        // Fun subtle animation on body
        document.body.animate([
            { filter: 'hue-rotate(0deg)' },
            { filter: 'hue-rotate(360deg)' }
        ], {
            duration: 1500,
            iterations: 1
        });
    }
});
