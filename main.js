// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 24);
}, { passive: true });

// Mobile menu
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const closeMenu  = document.getElementById('closeMenu');

hamburger.addEventListener('click', () => mobileMenu.classList.add('open'));
closeMenu.addEventListener('click',  () => mobileMenu.classList.remove('open'));

function closeMobileMenu() { mobileMenu.classList.remove('open'); }

// Close mobile menu on outside click
mobileMenu.addEventListener('click', (e) => {
    if (e.target === mobileMenu) closeMobileMenu();
});

// Scroll-triggered fade-up animations
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            fadeObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.fade-up').forEach(el => fadeObserver.observe(el));

// FAQ accordion
document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
        const item = btn.parentElement;
        const answer = item.querySelector('.faq-a');
        const isOpen = item.classList.contains('open');

        // close all
        document.querySelectorAll('.faq-item').forEach(i => {
            i.classList.remove('open');
            i.querySelector('.faq-a').style.maxHeight = '0';
        });

        // open clicked if it was closed
        if (!isOpen) {
            item.classList.add('open');
            answer.style.maxHeight = answer.scrollHeight + 'px';
        }
    });
});

// WhatsApp chat animation
function animateChat() {
    const messages = document.querySelectorAll('.wa-msg');
    messages.forEach(m => m.classList.remove('show'));
    messages.forEach(m => {
        const delay = parseInt(m.dataset.delay || 0);
        setTimeout(() => m.classList.add('show'), delay);
    });
}

animateChat();
// Loop: restart after all messages shown + pause
setInterval(animateChat, 14000);

// Smooth active nav link highlight on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach(link => {
                link.style.color = link.getAttribute('href') === `#${id}`
                    ? 'var(--white)'
                    : '';
            });
        }
    });
}, { threshold: 0.5 });

sections.forEach(s => sectionObserver.observe(s));
