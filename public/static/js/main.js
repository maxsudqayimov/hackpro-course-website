/* ===== MANGA CYBER SECURITY — MAIN JS ===== */

(function () {
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }

    function isHomePage() {
        return location.pathname === '/' || location.pathname === '/index.html';
    }

    function shouldStartAtTop() {
        return isHomePage() && !location.hash;
    }

    function scrollHomeToTop() {
        if (!shouldStartAtTop()) {
            return;
        }

        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
        document.documentElement.scrollTop = 0;
        if (document.body) {
            document.body.scrollTop = 0;
        }
    }

    if (!shouldStartAtTop()) {
        return;
    }

    var userInteracted = false;
    var markInteraction = function () {
        userInteracted = true;
    };
    var guardedScrollHomeToTop = function () {
        if (!userInteracted) {
            scrollHomeToTop();
        }
    };

    [0, 50, 250, 750, 1500, 3000].forEach(function (delay) {
        setTimeout(guardedScrollHomeToTop, delay);
    });

    window.addEventListener('load', guardedScrollHomeToTop);
    window.addEventListener('pageshow', guardedScrollHomeToTop);
    window.addEventListener('wheel', markInteraction, { passive: true });
    window.addEventListener('touchstart', markInteraction, { passive: true });
    window.addEventListener('keydown', markInteraction);
    window.addEventListener('pointerdown', markInteraction);

    scrollHomeToTop();
})();

document.addEventListener('DOMContentLoaded', () => {

    // ===== MATRIX RAIN CANVAS =====
    const matrixCanvas = document.getElementById('matrixCanvas');
    if (matrixCanvas) {
        const ctx = matrixCanvas.getContext('2d');
        matrixCanvas.width = window.innerWidth;
        matrixCanvas.height = window.innerHeight;

        const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF<>/{}[]';
        const fontSize = 14;
        const columns = Math.floor(matrixCanvas.width / fontSize);
        const drops = Array.from({ length: columns }, () => Math.random() * -50);

        function drawMatrix() {
            ctx.fillStyle = 'rgba(10, 10, 15, 0.06)';
            ctx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);

            ctx.fillStyle = 'rgba(0, 240, 255, 0.15)';
            ctx.font = `${fontSize}px monospace`;

            for (let i = 0; i < drops.length; i++) {
                const char = chars[Math.floor(Math.random() * chars.length)];
                const x = i * fontSize;
                const y = drops[i] * fontSize;

                ctx.fillText(char, x, y);

                if (y > matrixCanvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }

        setInterval(drawMatrix, 50);

        window.addEventListener('resize', () => {
            matrixCanvas.width = window.innerWidth;
            matrixCanvas.height = window.innerHeight;
        });
    }

    // ===== NAVBAR SCROLL =====
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ===== MOBILE NAV TOGGLE =====
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('open');
            navToggle.classList.toggle('active');
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (event) => {
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                event.preventDefault();
                const top = target.getBoundingClientRect().top + window.scrollY - 90;
                window.scrollTo({ top, behavior: 'smooth' });
                target.classList.add('visible');
                target.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
                history.pushState(null, '', link.getAttribute('href'));
            }
            if (navLinks) {
                navLinks.classList.remove('open');
            }
            if (navToggle) {
                navToggle.classList.remove('active');
            }
            document.querySelectorAll('.nav-links a').forEach(navLink => {
                navLink.classList.toggle('active', navLink.getAttribute('href') === link.getAttribute('href'));
            });
        });
    });

    if (window.location.hash) {
        setTimeout(() => {
            const target = document.querySelector(window.location.hash);
            if (!target) return;
            const top = target.getBoundingClientRect().top + window.scrollY - 90;
            window.scrollTo({ top, behavior: 'auto' });
            target.classList.add('visible');
            target.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
        }, 100);
    }

    // ===== 3D CARD TILT =====
    const card3D = document.querySelector('.hero-card-3d');
    if (card3D) {
        card3D.addEventListener('mousemove', (e) => {
            const rect = card3D.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 15;
            const rotateY = (centerX - x) / 15;
            card3D.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
        });

        card3D.addEventListener('mouseleave', () => {
            card3D.style.transform = 'rotateX(0) rotateY(0) scale(1)';
        });
    }

    // ===== SCROLL REVEAL =====
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                entry.target.style.transitionDelay = entry.target.dataset.delay || '0s';
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    revealElements.forEach(el => revealObserver.observe(el));

    // ===== COUNTER ANIMATION =====
    const counters = document.querySelectorAll('.stat-number');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.dataset.count);
                const suffix = entry.target.dataset.suffix || '';
                let current = 0;
                const step = target / 60;
                const timer = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    entry.target.textContent = Math.floor(current) + suffix;
                }, 25);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(c => counterObserver.observe(c));

    // ===== FLOATING PARTICLES =====
    const particlesContainer = document.querySelector('.particles');
    if (particlesContainer) {
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDuration = (Math.random() * 15 + 10) + 's';
            particle.style.animationDelay = (Math.random() * 10) + 's';
            particle.style.width = (Math.random() * 3 + 1) + 'px';
            particle.style.height = particle.style.width;
            if (Math.random() > 0.5) {
                particle.style.background = '#ff00e5';
            }
            particlesContainer.appendChild(particle);
        }
    }

    // ===== TYPED TEXT EFFECT =====
    const typedElement = document.querySelector('.typed-text');
    if (typedElement) {
        const words = ['Kiberxavfsizlik', "Sun'iy intellekt", 'Robototexnika', 'Dasturlash', 'Mobilografiya', 'SMM'];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function typeEffect() {
            const current = words[wordIndex];
            if (isDeleting) {
                typedElement.textContent = current.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typedElement.textContent = current.substring(0, charIndex + 1);
                charIndex++;
            }

            let speed = isDeleting ? 50 : 100;

            if (!isDeleting && charIndex === current.length) {
                speed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                speed = 500;
            }

            setTimeout(typeEffect, speed);
        }

        typeEffect();
    }

    // ===== COURSE CARD TILT =====
    document.querySelectorAll('.course-card').forEach(card => {
        const courseLink = card.dataset.courseLink;

        if (courseLink) {
            card.addEventListener('click', () => {
                window.location.href = courseLink;
            });

            card.addEventListener('keydown', (event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    window.location.href = courseLink;
                }
            });
        }

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 30;
            const rotateY = (centerX - x) / 30;
            card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateY(0)';
        });
    });

    // ===== PARALLAX ON MOUSE MOVE =====
    document.addEventListener('mousemove', (e) => {
        const moveX = (e.clientX - window.innerWidth / 2) / 50;
        const moveY = (e.clientY - window.innerHeight / 2) / 50;

        document.querySelectorAll('.parallax-layer').forEach(layer => {
            const speed = layer.dataset.speed || 1;
            layer.style.transform = `translate(${moveX * speed}px, ${moveY * speed}px)`;
        });
    });

    // ===== GLITCH ON HOVER =====
    document.querySelectorAll('.glitch').forEach(el => {
        el.dataset.text = el.textContent;
    });

    // ===== SPEED LINES =====
    const speedLines = document.querySelector('.speed-lines');
    if (speedLines) {
        for (let i = 0; i < 40; i++) {
            const line = document.createElement('div');
            const size = Math.random() * 300 + 50;
            line.style.width = size + 'px';
            line.style.height = '1px';
            line.style.top = Math.random() * 100 + '%';
            line.style.left = Math.random() * 100 + '%';
            line.style.transform = `rotate(${Math.random() * 360}deg)`;
            line.style.opacity = Math.random() * 0.5;
            speedLines.appendChild(line);
        }
    }

});
