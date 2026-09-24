document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('matrixCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        const nodes = [];

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            nodes.length = 0;
            const count = Math.min(70, Math.max(28, Math.floor(window.innerWidth / 18)));
            for (let i = 0; i < count; i++) {
                nodes.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * 0.45,
                    vy: (Math.random() - 0.5) * 0.45,
                    r: Math.random() * 2 + 1.2
                });
            }
        }

        function drawNetwork() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            nodes.forEach((node, index) => {
                node.x += node.vx;
                node.y += node.vy;

                if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
                if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

                ctx.beginPath();
                ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(18, 115, 255, 0.26)';
                ctx.fill();

                for (let j = index + 1; j < nodes.length; j++) {
                    const other = nodes[j];
                    const dx = node.x - other.x;
                    const dy = node.y - other.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < 130) {
                        ctx.beginPath();
                        ctx.moveTo(node.x, node.y);
                        ctx.lineTo(other.x, other.y);
                        ctx.strokeStyle = `rgba(18, 115, 255, ${0.12 * (1 - distance / 130)})`;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                }
            });
            requestAnimationFrame(drawNetwork);
        }

        resizeCanvas();
        drawNetwork();
        window.addEventListener('resize', resizeCanvas);
    }

    const navbar = document.querySelector('.navbar');
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    window.addEventListener('scroll', () => {
        navbar?.classList.toggle('scrolled', window.scrollY > 40);
    });

    navToggle?.addEventListener('click', () => {
        navLinks?.classList.toggle('open');
        navToggle.classList.toggle('active');
    });

    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', event => {
            const href = link.getAttribute('href');
            const target = href ? document.querySelector(href) : null;
            if (!target) return;

            event.preventDefault();
            const top = target.getBoundingClientRect().top + window.scrollY - 104;
            window.scrollTo({ top, behavior: 'smooth' });
            history.pushState(null, '', href);
            navLinks?.classList.remove('open');
            navToggle?.classList.remove('active');

            document.querySelectorAll('.nav-links a').forEach(navLink => {
                navLink.classList.toggle('active', navLink.getAttribute('href') === href);
            });
        });
    });

    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.transitionDelay = entry.target.dataset.delay || '0s';
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealElements.forEach(element => revealObserver.observe(element));

    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
        const target = parseInt(counter.dataset.count || '0', 10);
        const suffix = counter.dataset.suffix || '';
        counter.textContent = target + suffix;
    });

    const particlesContainer = document.querySelector('.particles');
    if (particlesContainer) {
        for (let i = 0; i < 34; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.animationDuration = `${Math.random() * 12 + 11}s`;
            particle.style.animationDelay = `${Math.random() * 8}s`;
            particlesContainer.appendChild(particle);
        }
    }

    const speedLines = document.querySelector('.speed-lines');
    if (speedLines) {
        for (let i = 0; i < 26; i++) {
            const line = document.createElement('div');
            const rotate = Math.random() * 22 - 11;
            line.style.setProperty('--line-rotate', `${rotate}deg`);
            line.style.width = `${Math.random() * 220 + 70}px`;
            line.style.top = `${Math.random() * 100}%`;
            line.style.left = `${Math.random() * 100}%`;
            line.style.animationDelay = `${Math.random() * 4}s`;
            speedLines.appendChild(line);
        }
    }

    const typedElement = document.querySelector('.typed-text');
    if (typedElement) {
        const words = ['Kiberxavfsizlik', "Sun'iy intellekt", 'Robototexnika'];
        let wordIndex = 0;
        let charIndex = typedElement.textContent.length;
        let deleting = true;

        function typeLoop() {
            const word = words[wordIndex];
            typedElement.textContent = deleting
                ? word.slice(0, Math.max(charIndex - 1, 0))
                : word.slice(0, charIndex + 1);

            charIndex += deleting ? -1 : 1;
            let delay = deleting ? 45 : 90;

            if (!deleting && charIndex >= word.length) {
                delay = 1700;
                deleting = true;
            }

            if (deleting && charIndex <= 0) {
                deleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                delay = 300;
            }

            setTimeout(typeLoop, delay);
        }

        setTimeout(typeLoop, 1500);
    }

    const heroCard = document.querySelector('.hero-card-3d');
    if (heroCard) {
        heroCard.addEventListener('mousemove', event => {
            const rect = heroCard.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            const rotateY = (x / rect.width - 0.5) * 12;
            const rotateX = (0.5 - y / rect.height) * 10;
            heroCard.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        heroCard.addEventListener('mouseleave', () => {
            heroCard.style.transform = 'rotateX(0) rotateY(0)';
        });
    }
});
