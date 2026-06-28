document.addEventListener('DOMContentLoaded', () => {
    // --- Theme Toggle Logic ---
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    // Apply saved theme on load
    if (currentTheme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const isDark = document.body.getAttribute('data-theme') === 'dark';
            if (isDark) {
                document.body.removeAttribute('data-theme');
                localStorage.setItem('theme', 'light');
            } else {
                document.body.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
            }
        });
    }

    // --- Scroll Reveal Animations ---
    const reveals = document.querySelectorAll('.reveal');

    function revealOnScroll() {
        const windowHeight = window.innerHeight;
        const elementVisible = 150;

        reveals.forEach((reveal) => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', revealOnScroll);
    // --- Dynamic Parallax & Fading Background ---
    const pageImages = {
        'index': [
            'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
            'https://images.unsplash.com/photo-1551818255-e6e10975bc17?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
            'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'
        ],
        'register': [
            'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
            'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'
        ],
        'attendance': [
            'https://images.unsplash.com/photo-1511632765486-a01980e01a18?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
            'https://images.unsplash.com/photo-1558008258-3256797b43f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'
        ],
        'previousevents': [
            'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
            'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'
        ],
        'about': [
            'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
            'https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'
        ],
        'admin': [
            'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
            'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'
        ]
    };

    let currentPage = window.location.pathname.split('/').pop().split('.')[0];
    if (!currentPage || currentPage === '') currentPage = 'index';
    
    const images = pageImages[currentPage] || pageImages['index'];

    if (images && images.length > 0) {
        const bgContainer = document.createElement('div');
        bgContainer.id = 'dynamic-bg-container';
        Object.assign(bgContainer.style, {
            position: 'fixed',
            top: '-5%',
            left: '-5%',
            width: '110%',
            height: '110%',
            zIndex: '-1',
            pointerEvents: 'none',
            overflow: 'hidden'
        });
        
        images.forEach((src, idx) => {
            const img = document.createElement('img');
            img.src = src;
            img.className = 'dynamic-bg-img';
            Object.assign(img.style, {
                position: 'absolute',
                top: '0',
                left: '0',
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: idx === 0 ? (document.body.getAttribute('data-theme') === 'dark' ? '0.15' : '0.08') : '0',
                transition: 'opacity 3s ease-in-out, transform 0.2s ease-out'
            });
            bgContainer.appendChild(img);
        });

        document.body.prepend(bgContainer);

        let currentImgIdx = 0;
        const bgElements = bgContainer.querySelectorAll('.dynamic-bg-img');
        
        if (bgElements.length > 1) {
            setInterval(() => {
                bgElements[currentImgIdx].style.opacity = '0';
                currentImgIdx = (currentImgIdx + 1) % bgElements.length;
                bgElements[currentImgIdx].style.opacity = document.body.getAttribute('data-theme') === 'dark' ? '0.15' : '0.08';
            }, 6000);
        }

        document.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 30;
            const y = (e.clientY / window.innerHeight - 0.5) * 30;
            bgElements.forEach(img => {
                img.style.transform = `translate(${x}px, ${y}px) scale(1.05)`;
            });
        });
        
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                setTimeout(() => {
                    const isDark = document.body.getAttribute('data-theme') === 'dark';
                    bgElements[currentImgIdx].style.opacity = isDark ? '0.15' : '0.08';
                }, 100);
            });
        }
    }
});
