document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    const animateStats = () => {
        const stats = document.querySelectorAll('.stat-number');
        stats.forEach(stat => {
            const value = stat.textContent;
            stat.textContent = '0';
            let current = 0;
            const target = parseFloat(value);
            const increment = target / 60;
            const interval = 20;
            let timer = setInterval(() => {
                current += increment;
                const displayValue = value.includes('%') ? Math.min(current, target).toFixed(0) + '%' : Math.min(current, target).toFixed(0);
                stat.textContent = displayValue;
                if (current >= target) {
                    stat.textContent = value;
                    clearInterval(timer);
                }
            }, interval);
        });
    };

    // Animate elements on scroll
    const animateOnScroll = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                if (entry.target.classList.contains('hero-stats')) {
                    if (!entry.target.classList.contains('animated')) {
                        animateStats();
                        entry.target.classList.add('animated');
                    }
                }
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(animateOnScroll, {
        threshold: 0.2,
        rootMargin: '0px'
    });

    document.querySelectorAll('.threat-card, .practice-item').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        observer.observe(element);
    });

    document.querySelectorAll('.hero-stats').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        observer.observe(element);
    });

    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (window.scrollY > 50) { 
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        } else {
            header.style.boxShadow = 'none';
        }
    });

    const expandDetails = (element) => {
        element.classList.add('expanded');
    };

    const collapseDetails = (element) => {
        element.classList.remove('expanded');
    };

    document.querySelectorAll('.threat-card').forEach(card => {
        card.addEventListener('click', (event) => {
            if (event.target.tagName === 'A' && card.classList.contains('expanded')) {
                return;
            }
            card.classList.toggle('expanded');
        });
    });
});