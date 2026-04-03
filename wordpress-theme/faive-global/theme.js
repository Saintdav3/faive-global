const applyRevealAttributes = () => {
  const selectors = [
    '.page-hero .col-lg-6',
    '.hero-section .col-lg-7',
    '.hero-section .col-lg-5',
    '.section-heading',
    '.feature-card',
    '.service-card',
    '.portfolio-card',
    '.team-card',
    '.cta-card',
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

  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('[data-animate]').forEach((element) => {
      element.classList.add('is-visible');
    });
    return;
  }

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
  const header = document.querySelector('.site-header');
  if (!header) return;

  const syncHeader = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 12);
  };

  syncHeader();
  window.addEventListener('scroll', syncHeader, { passive: true });
};

const initThemeMotion = () => {
  initHeaderMotion();
  initScrollAnimations();
  document.body.classList.add('is-ready');
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initThemeMotion);
} else {
  initThemeMotion();
}
