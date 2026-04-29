import { initPortfolioFilters, loadCaseStudy, loadPortfolioCards } from './portfolio.js';
import { initMegaNav } from './mega-nav.js';

// In development: points to the local Express server.
// In production: replace with your deployed server URL e.g. https://api.faiveglobal.ltd
const API_BASE =
  window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:3000/api'
    : '/api';

const applyRevealAttributes = () => {
  const selectors = [
    '.page-hero .col-lg-6',
    '.hero-section .col-lg-7',
    '.hero-section .col-lg-5',
    '.section-heading',
    '.feature-card',
    '.service-card',
    '.svc-card',
    '.svc-feature-card',
    '.svc-visual-panel',
    '.stat-card',
    '.portfolio-card',
    '.pf-card',
    '.pf-heading',
    '.team-card',
    '.cta-card',
    '.testimonial-dark-card',
    '.form-shell',
    '.page-visual-card',
    '.support-visual-card',
    '.metric-card',
    '.gallery-media'
  ];

  selectors.forEach((selector) => {
    document.querySelectorAll(selector).forEach((element, index) => {
      if (element.dataset.animate) return;
      element.dataset.animate =
        selector.includes('col-lg-7') || selector.includes('section-heading')
          ? 'left'
          : selector.includes('col-lg-5') || selector.includes('page-visual-card')
            ? 'right'
            : 'zoom';
      element.style.setProperty('--stagger', `${Math.min(index * 70, 420)}ms`);
    });
  });
};

const initScrollAnimations = () => {
  applyRevealAttributes();

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.14,
      rootMargin: '0px 0px -40px 0px'
    }
  );

  document.querySelectorAll('[data-animate]').forEach((element) => observer.observe(element));
};

const initHeaderMotion = () => {
  const header = document.querySelector('.navigation-parent');
  if (!header) return;

  const syncHeader = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 12);
  };

  syncHeader();
  window.addEventListener('scroll', syncHeader, { passive: true });
};

const initActiveNav = () => {
  const page = document.body.dataset.page;
  const pageMap = {
    home: '/index.html',
    about: '/pages/about.html',
    services: '/pages/services.html',
    portfolio: '/pages/portfolio.html',
    'case-study': '/pages/portfolio.html',
    contact: '/pages/contact.html',
  };

  const activeHref = pageMap[page];
  if (!activeHref) return;

  document.querySelectorAll('.navigation-menu-item').forEach((item) => {
    const href = item.getAttribute('href');
    if (href === activeHref) {
      item.style.backgroundColor = 'var(--color-ink)';
      const text = item.querySelector('.nav-item-text');
      if (text) text.style.color = '#ffffff';
      item.setAttribute('aria-current', 'page');
    }
  });
};

const initContactForm = () => {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const feedback = document.getElementById('contact-feedback');
    const btn = form.querySelector('button[type="submit"]');

    btn.disabled = true;
    btn.textContent = 'Sending…';
    if (feedback) { feedback.textContent = ''; feedback.className = 'form-feedback mt-3'; }

    try {
      const res = await fetch(`${API_BASE}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      const data = await res.json();

      if (feedback) {
        feedback.textContent = data.message;
        feedback.classList.add(data.success ? 'text-success' : 'text-danger');
      }
      if (data.success) form.reset();
    } catch {
      if (feedback) {
        feedback.textContent = 'Something went wrong. Please email hello@faiveglobal.ltd.';
        feedback.classList.add('text-danger');
      }
    } finally {
      btn.disabled = false;
      btn.textContent = 'Send Message';
    }
  });
};


const initHeroSlider = () => {
  const slider = document.getElementById('heroSlider');
  if (!slider) return;

  const slides = Array.from(slider.querySelectorAll('.hero-stack-slide'));
  const total = slides.length;
  let current = 0;
  let animating = false;
  let timer = null;

  const DURATION = 420;
  const easing = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)';

  const set = (el, styles) => Object.assign(el.style, styles);

  const applyStates = () => {
    slides.forEach((s, i) => {
      s.removeAttribute('style');
      const pos = (i - current + total) % total;
      s.classList.remove('is-active', 'is-next', 'is-back');
      if (pos === 0) s.classList.add('is-active');
      else if (pos === 1) s.classList.add('is-next');
      else s.classList.add('is-back');
    });
  };

  const advance = () => {
    if (animating) return;
    animating = true;

    const front = slides[current];
    const peek  = slides[(current + 1) % total];
    const back  = slides[(current + 2) % total];

    // Freeze all at current painted positions before touching anything
    set(front, { transition: 'none', zIndex: '1',  transform: 'translateX(0)',       opacity: '1' });
    set(peek,  { transition: 'none', zIndex: '5',  transform: 'translateX(11.12%)',  opacity: '1' });
    set(back,  { transition: 'none', zIndex: '2',  transform: 'translateX(11.12%)',  opacity: '0' });

    // Force reflow so the browser registers the starting positions
    void slider.offsetWidth;

    // Now animate all three simultaneously
    const tr = `transform ${DURATION}ms ${easing}, opacity ${DURATION}ms ease`;
    set(front, { transition: tr, transform: 'translateX(11.12%)', opacity: '0' });
    set(peek,  { transition: tr, transform: 'translateX(0)',       opacity: '1' });
    set(back,  { transition: tr, transform: 'translateX(11.12%)', opacity: '1' });

    setTimeout(() => {
      current = (current + 1) % total;
      applyStates();
      animating = false;
    }, DURATION + 20);
  };

  const startAuto = () => { timer = setInterval(advance, 2600); };
  const stopAuto  = () => { clearInterval(timer); timer = null; };

  applyStates();
  startAuto();
  slider.addEventListener('mouseenter', stopAuto);
  slider.addEventListener('mouseleave', startAuto);
};

const initPfFilters = () => {
  const filters = document.querySelectorAll('.pf-filter');
  const cards = document.querySelectorAll('.pf-card');
  if (!filters.length) return;

  filters.forEach(btn => {
    btn.addEventListener('click', () => {
      filters.forEach(f => f.classList.remove('is-active'));
      btn.classList.add('is-active');
      const filter = btn.dataset.filter;
      cards.forEach(card => {
        const match = filter === 'all' || card.dataset.category === filter;
        card.classList.toggle('is-hidden', !match);
      });
    });
  });
};

const initTestimonialSlider = () => {
  const slides = Array.from(document.querySelectorAll('.ts-slide'));
  const dots = Array.from(document.querySelectorAll('.ts-dot'));
  if (!slides.length) return;

  let current = 0;
  let timer = null;

  const goTo = (index) => {
    slides[current].classList.remove('is-active');
    dots[current].classList.remove('is-active');
    current = index;
    slides[current].classList.add('is-active');
    dots[current].classList.add('is-active');
  };

  dots.forEach((dot, i) => dot.addEventListener('click', () => { goTo(i); resetTimer(); }));

  const resetTimer = () => {
    clearInterval(timer);
    timer = setInterval(() => goTo((current + 1) % slides.length), 5000);
  };

  resetTimer();
};

const initFaq = () => {
  document.querySelectorAll('.faq-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('.faq-item');
      const isOpen = item.classList.contains('is-open');
      item.classList.toggle('is-open', !isOpen);
      trigger.querySelector('.faq-icon').textContent = isOpen ? '+' : '−';
    });
  });
};

const initPage = async () => {
  initMegaNav();
  initActiveNav();
  initHeaderMotion();

  const page = document.body.dataset.page;

  if (page === 'home') {
    initHeroSlider();
    initFaq();
    initTestimonialSlider();
    loadPortfolioCards('featured-portfolio', { featured: true });
  }

  if (page === 'portfolio') {
    initPfFilters();
  }

  if (page === 'case-study') {
    loadCaseStudy();
  }

  if (page === 'contact') {
    initContactForm();
  }

  initScrollAnimations();
  document.body.classList.add('is-ready');
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPage);
} else {
  initPage();
}
