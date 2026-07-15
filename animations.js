document.addEventListener('DOMContentLoaded', function () {
    const scrollElements = document.querySelectorAll('.scroll-fade');
    const navbar = document.querySelector('.navbar');
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    const elementInView = (el, percentageScroll = 100) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <=
            ((window.innerHeight || document.documentElement.clientHeight) * (percentageScroll / 100))
        );
    };

    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 90)) {
                el.classList.add('visible');
            }
        });
    };

    const handleNavbar = () => {
        if (!navbar) return;
        navbar.classList.toggle('scrolled', window.scrollY > 24);
    };

    window.addEventListener('scroll', () => {
        handleScrollAnimation();
        handleNavbar();
    }, { passive: true });

    handleScrollAnimation();
    handleNavbar();

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            const open = navLinks.classList.toggle('open');
            navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        });

        navLinks.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (!href || href === '#') return;
        const target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
    });
});
