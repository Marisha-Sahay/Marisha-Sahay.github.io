// ===================================
// Navbar scroll effect
// ===================================
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });

// ===================================
// Mobile hamburger
// ===================================
const hamburger = document.getElementById('hamburger-btn');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', isOpen.toString());
});

// Close nav on link click (mobile)
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

// ===================================
// Typed text animation
// ===================================
const phrases = [
  'Full-Stack Engineer',
  'Fintech Builder',
  'QA Engineering Expert',
  'Open Source Contributor',
  'AI Agent Enthusiast',
];

const typedEl = document.getElementById('typed-text');
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingTimeout;

function type() {
  const current = phrases[phraseIndex];
  if (!isDeleting) {
    typedEl.textContent = current.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) {
      isDeleting = true;
      typingTimeout = setTimeout(type, 1800);
      return;
    }
  } else {
    typedEl.textContent = current.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
  }
  typingTimeout = setTimeout(type, isDeleting ? 60 : 90);
}

type();

// ===================================
// Intersection Observer for animations
// ===================================
const observerOptions = { threshold: 0.15, rootMargin: '0px 0px -40px 0px' };

const timelineObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 120);
    }
  });
}, observerOptions);

document.querySelectorAll('.timeline-item').forEach(item => {
  timelineObserver.observe(item);
});

// ===================================
// Active nav link highlighting
// ===================================
const sections = document.querySelectorAll('section[id]');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      document.querySelectorAll('.nav-links a').forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${id}`) {
          link.style.color = 'var(--text-primary)';
        }
      });
    }
  });
}, { rootMargin: '-40% 0px -40% 0px' });

sections.forEach(s => navObserver.observe(s));

// ===================================
// Footer year
// ===================================
document.getElementById('footer-year').textContent = new Date().getFullYear();

// ===================================
// Smooth parallax for hero bg (desktop only)
// ===================================
if (window.matchMedia('(min-width: 768px)').matches) {
  const heroBg = document.querySelector('.hero-bg');
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY < window.innerHeight) {
      heroBg.style.transform = `scale(1.05) translateY(${scrollY * 0.3}px)`;
    }
  }, { passive: true });
}
