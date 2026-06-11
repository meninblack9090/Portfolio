/* ============================================================
   UMALAY PORTFOLIO — script.js
   ============================================================ */

'use strict';

/* =====================
   NAVBAR: scroll effect + active link
   ===================== */
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

function onScroll() {
  // Scrolled class for blur/bg effect
  navbar.classList.toggle('scrolled', window.scrollY > 20);

  // Scroll-to-top visibility
  scrollTopBtn.classList.toggle('visible', window.scrollY > 400);

  // Active nav link based on section in view
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 90;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });

  // Reveal animations
  revealOnScroll();
  animateSkills();
}

window.addEventListener('scroll', onScroll, { passive: true });
onScroll(); // run once on load

/* =====================
   HAMBURGER MENU
   ===================== */
const hamburger = document.getElementById('hamburger-btn');
const navLinksContainer = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinksContainer.classList.toggle('open');
});

// Close menu on link click
navLinksContainer.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinksContainer.classList.remove('open');
  });
});

/* =====================
   SCROLL TO TOP
   ===================== */
const scrollTopBtn = document.getElementById('scroll-top-btn');
scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* =====================
   ANIMATED COUNTERS (stats bar)
   ===================== */
let countersAnimated = false;

function animateCounters() {
  if (countersAnimated) return;
  const statEls = document.querySelectorAll('.stat-number[data-target]');
  const statsBar = document.getElementById('stats-bar');
  const rect = statsBar.getBoundingClientRect();
  if (rect.top < window.innerHeight * 0.9) {
    countersAnimated = true;
    statEls.forEach(el => {
      const target = parseInt(el.dataset.target, 10);
      const duration = 1500;
      const step = Math.ceil(target / (duration / 16));
      let current = 0;
      const timer = setInterval(() => {
        current = Math.min(current + step, target);
        el.textContent = current;
        if (current >= target) clearInterval(timer);
      }, 16);
    });
  }
}

window.addEventListener('scroll', animateCounters, { passive: true });
animateCounters();

/* =====================
   SKILLS ANIMATION
   ===================== */
let skillsAnimated = false;

function animateSkills() {
  if (skillsAnimated) return;
  const skillsSection = document.getElementById('about');
  if (!skillsSection) return;
  const rect = skillsSection.getBoundingClientRect();
  if (rect.top < window.innerHeight * 0.8) {
    skillsAnimated = true;
    document.querySelectorAll('.skill-fill').forEach(bar => {
      const w = bar.dataset.width + '%';
      setTimeout(() => { bar.style.width = w; }, 200);
    });
  }
}

/* =====================
   SCROLL REVEAL
   ===================== */
// Add 'reveal' class to elements we want to animate in
const revealTargets = [
  '.service-card',
  '.portfolio-card',
  '.about-img-wrapper',
  '.about-text-side',
  '.contact-info',
  '.contact-form',
  '.section-header',
];

revealTargets.forEach(selector => {
  document.querySelectorAll(selector).forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${i * 0.08}s`;
  });
});

function revealOnScroll() {
  document.querySelectorAll('.reveal').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.88) {
      el.classList.add('visible');
    }
  });
}

revealOnScroll();

/* =====================
   PORTFOLIO FILTER
   ===================== */
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioCards = document.querySelectorAll('.portfolio-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    portfolioCards.forEach(card => {
      const category = card.dataset.category;
      if (filter === 'all' || category === filter) {
        card.classList.remove('hidden');
        // Slight fade-in
        card.style.animation = 'none';
        card.offsetHeight; // reflow
        card.style.animation = 'fadeUp 0.4s ease forwards';
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

/* =====================
   CONTACT FORM
   ===================== */
const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name    = document.getElementById('form-name').value.trim();
  const email   = document.getElementById('form-email').value.trim();
  const message = document.getElementById('form-message').value.trim();

  if (!name || !email || !message) {
    shakeForm();
    return;
  }

  const submitBtn = document.getElementById('contact-submit-btn');
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending…';

  // Simulate async send
  setTimeout(() => {
    contactForm.reset();
    submitBtn.disabled = false;
    submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
    formSuccess.classList.add('show');
    setTimeout(() => formSuccess.classList.remove('show'), 4000);
  }, 1500);
});

function shakeForm() {
  contactForm.style.animation = 'none';
  contactForm.offsetHeight;
  contactForm.style.animation = 'shake 0.4s ease';
}

/* Add shake animation dynamically */
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    20%       { transform: translateX(-8px); }
    40%       { transform: translateX(8px); }
    60%       { transform: translateX(-6px); }
    80%       { transform: translateX(6px); }
  }
`;
document.head.appendChild(shakeStyle);

/* =====================
   SMOOTH HOVER — hero profile
   ===================== */
const heroCircle = document.querySelector('.hero-circle');
if (heroCircle) {
  heroCircle.style.transition = 'box-shadow 0.35s ease';
  heroCircle.addEventListener('mouseenter', () => {
    heroCircle.style.boxShadow = '0 0 100px rgba(255,107,0,0.45), 0 0 0 4px rgba(255,107,0,0.4)';
  });
  heroCircle.addEventListener('mouseleave', () => {
    heroCircle.style.boxShadow = '0 0 60px rgba(255,107,0,0.2), 0 0 0 3px rgba(255,107,0,0.15)';
  });
}

/* =====================
   NAV LINK SMOOTH SCROLL
   (fallback for older browsers)
   ===================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

/* =====================
   TYPING EFFECT — hero title
   ===================== */
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
  const words = ['UI/UX Designer', 'Creative Thinker', 'Problem Solver', 'Visual Artist'];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingTimeout;

  // Only start after initial animation
  setTimeout(() => {
    heroTitle.textContent = '';
    type();
  }, 1200);

  function type() {
    const current = words[wordIndex];
    if (!isDeleting) {
      heroTitle.textContent = current.slice(0, ++charIndex);
      if (charIndex === current.length) {
        isDeleting = true;
        typingTimeout = setTimeout(type, 2000);
        return;
      }
    } else {
      heroTitle.textContent = current.slice(0, --charIndex);
      if (charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typingTimeout = setTimeout(type, 300);
        return;
      }
    }
    typingTimeout = setTimeout(type, isDeleting ? 60 : 90);
  }

  // Add blinking cursor
  const cursor = document.createElement('span');
  cursor.textContent = '|';
  cursor.style.cssText = 'color: #FF6B00; animation: blink 1s step-end infinite; margin-left: 2px;';
  heroTitle.insertAdjacentElement('afterend', cursor);

  const blinkStyle = document.createElement('style');
  blinkStyle.textContent = `@keyframes blink { 50% { opacity: 0; } }`;
  document.head.appendChild(blinkStyle);
}

console.log('%cUmalay Portfolio 🎨', 'color:#FF6B00;font-size:1.2rem;font-weight:bold;');
console.log('%cCrafted with ❤️ and creativity', 'color:#aaa;font-size:0.9rem;');
