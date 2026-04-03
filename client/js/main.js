import { renderHeader } from '../components/header.js';
import { renderFooter } from '../components/footer.js';
import { api, apiEndpoints } from './api.js';

const placeholders = {
  avatar: '/assets/placeholder-avatar.svg'
};

const adminBaseUrl = window.location.origin.includes('5500')
  ? 'http://localhost:5000'
  : window.location.origin;

let authModulePromise;
let portfolioModulePromise;
let dashboardModulePromise;

const loadAuthModule = async () => {
  authModulePromise ||= import('./auth.js');
  return authModulePromise;
};

const loadPortfolioModule = async () => {
  portfolioModulePromise ||= import('./portfolio.js');
  return portfolioModulePromise;
};

const loadDashboardModule = async () => {
  dashboardModulePromise ||= import('./dashboard.js');
  return dashboardModulePromise;
};

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

const mountSharedShell = () => {
  const header = document.getElementById('site-header');
  const footer = document.getElementById('site-footer');

  if (header) header.innerHTML = renderHeader();
  if (footer) footer.innerHTML = renderFooter();

  const toggler = document.querySelector('.navbar-toggler');
  const nav = document.getElementById('siteNav');

  if (toggler && nav) {
    toggler.addEventListener('click', () => {
      nav.classList.toggle('show');
    });
  }
};

const renderServices = async (targetId, limit) => {
  const target = document.getElementById(targetId);
  if (!target) return;

  const response = await api.get(apiEndpoints.services);
  const items = limit ? response.data.slice(0, limit) : response.data;

  target.innerHTML = items
    .map(
      (service) => `
        <div class="col-lg-4">
            <article class="service-card">
            <p class="card-meta">${service.category}</p>
            <h3>${service.name}</h3>
            <p>${service.shortDescription}</p>
            <div class="service-footer">
              <span>${service.startingAt || 'Custom scope'}</span>
              <a class="btn btn-outline-dark btn-sm" href="/pages/quote.html">Request quote</a>
            </div>
          </article>
        </div>
      `
    )
    .join('');
};

const initContactForm = () => {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const feedback = document.getElementById('contact-feedback');
    const payload = Object.fromEntries(new FormData(form).entries());
    feedback.textContent = 'Sending your message...';

    try {
      await api.post(apiEndpoints.contacts, payload);
      feedback.textContent = 'Your message has been sent successfully.';
      form.reset();
    } catch (error) {
      feedback.textContent = error.message;
    }
  });
};

const initQuoteForm = async () => {
  const form = document.getElementById('quote-form');
  if (!form) return;

  const serviceSelect = document.getElementById('quote-service-select');
  const services = await api.get(apiEndpoints.services);
  serviceSelect.innerHTML = `
    <option value="">Select service interest</option>
    ${services.data.map((service) => `<option value="${service._id}">${service.name}</option>`).join('')}
  `;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const feedback = document.getElementById('quote-feedback');
    const formData = new FormData(form);
    feedback.textContent = 'Submitting your quote request...';

    try {
      await api.post(apiEndpoints.quotes, formData);
      feedback.textContent = 'Your quote request was submitted successfully.';
      form.reset();
    } catch (error) {
      feedback.textContent = error.message;
    }
  });
};

const initAdminLogin = () => {
  const form = document.getElementById('admin-login-form');
  if (!form) return;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const feedback = document.getElementById('admin-login-feedback');
    const payload = Object.fromEntries(new FormData(form).entries());
    feedback.textContent = 'Authenticating...';

    try {
      const { loginAdmin } = await loadAuthModule();
      await loginAdmin(payload);
      window.location.href = `${adminBaseUrl}/admin`;
    } catch (error) {
      feedback.textContent = error.message;
    }
  });
};

const initPage = async () => {
  mountSharedShell();
  initHeaderMotion();

  const page = document.body.dataset.page;

  try {
    if (page === 'home') {
      const { loadPortfolioCards } = await loadPortfolioModule();
      await Promise.all([
        loadPortfolioCards('featured-portfolio', { featured: true })
      ]);
    }

    if (page === 'services') {
      const servicesGrid = document.getElementById('services-grid');
      if (servicesGrid) {
        await renderServices('services-grid');
      }
    }

    if (page === 'portfolio') {
      const { initPortfolioFilters } = await loadPortfolioModule();
      await initPortfolioFilters();
    }

    if (page === 'case-study') {
      const { loadCaseStudy } = await loadPortfolioModule();
      await loadCaseStudy();
    }

    if (page === 'contact') {
      initContactForm();
    }

    if (page === 'quote') {
      await initQuoteForm();
    }

    if (page === 'admin-login') {
      initAdminLogin();
    }

    if (page === 'dashboard') {
      const { initDashboard } = await loadDashboardModule();
      await initDashboard();
    }
  } catch (error) {
    const target =
      document.querySelector('#home-services, #featured-portfolio, #services-grid, #portfolio-grid, #case-study-container, #dashboard-panel') ||
      document.querySelector('main');

    if (target) {
      target.insertAdjacentHTML(
        'beforeend',
        `<div class="error-banner">Unable to load content right now. ${error.message}</div>`
      );
    }
  }

  initScrollAnimations();
  document.body.classList.add('is-ready');
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPage);
} else {
  initPage();
}
