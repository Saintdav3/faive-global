import { api, apiEndpoints } from './api.js';

const portfolioPlaceholder = '/assets/placeholder-portfolio.svg';

const servicePillMarkup = (services = []) =>
  services.map((service) => `<span class="tag-pill">${service.name}</span>`).join('');

const isVideoAsset = (url = '') => /\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(url);

const renderCoverMedia = (item) => {
  const mediaUrl = item.heroMediaUrl || portfolioPlaceholder;

  if (isVideoAsset(mediaUrl)) {
    return `<video class="case-study-hero" controls playsinline src="${mediaUrl}"></video>`;
  }

  return `<img class="case-study-hero" src="${mediaUrl}" alt="${item.title}" />`;
};

const renderDeliverables = (item) => {
  const deliverables = Array.isArray(item.deliverables) && item.deliverables.length
    ? item.deliverables
    : (item.services || []).map((service) => service.name).filter(Boolean);

  if (!deliverables.length) {
    return '<p>No deliverables added yet.</p>';
  }

  return `
    <ul class="case-study-deliverables">
      ${deliverables.map((entry) => `<li>${entry}</li>`).join('')}
    </ul>
  `;
};

export const loadPortfolioCards = async (targetId, options = {}) => {
  const target = document.getElementById(targetId);
  if (!target) return;

  target.innerHTML = '<div class="loading-state">Loading portfolio...</div>';

  const query = new URLSearchParams(options).toString();
  const response = await api.get(`${apiEndpoints.portfolio}${query ? `?${query}` : ''}`);

  target.innerHTML = response.data
    .map(
      (item) => `
        <div class="col-lg-4 col-md-6">
          <article class="portfolio-card">
              <img src="${item.heroMediaUrl || portfolioPlaceholder}" alt="${item.title}" class="portfolio-thumb" />
            <div class="portfolio-card-body">
              <p class="card-meta">${item.brandName || item.category}</p>
              <h3>${item.title}</h3>
              <p>${item.excerpt}</p>
              <div class="tag-row">${servicePillMarkup(item.services)}</div>
              <a class="text-link mt-3 d-inline-flex" href="/pages/case-study.html?id=${item._id}">Open case study</a>
            </div>
          </article>
        </div>
      `
    )
    .join('');
};

export const initPortfolioFilters = async () => {
  const filtersEl = document.getElementById('portfolio-filters');
  const gridEl = document.getElementById('portfolio-grid');
  if (!filtersEl || !gridEl) return;

  const response = await api.get(apiEndpoints.portfolio);
  const categories = ['All', ...new Set(response.data.map((item) => item.category))];

  const render = (activeCategory = 'All') => {
    filtersEl.innerHTML = categories
      .map(
        (category) => `
          <button class="filter-pill ${activeCategory === category ? 'is-active' : ''}" data-category="${category}">
            ${category}
          </button>
        `
      )
      .join('');

    const visibleItems =
      activeCategory === 'All'
        ? response.data
        : response.data.filter((item) => item.category === activeCategory);

    gridEl.innerHTML = visibleItems
      .map(
        (item) => `
          <div class="col-lg-4 col-md-6">
            <article class="portfolio-card">
              <img src="${item.heroMediaUrl || portfolioPlaceholder}" alt="${item.title}" class="portfolio-thumb" />
              <div class="portfolio-card-body">
                <p class="card-meta">${item.brandName || item.category}</p>
                <h3>${item.title}</h3>
                <p>${item.excerpt}</p>
                <a class="text-link" href="/pages/case-study.html?id=${item._id}">Open case study</a>
              </div>
            </article>
          </div>
        `
      )
      .join('');

    filtersEl.querySelectorAll('[data-category]').forEach((button) => {
      button.addEventListener('click', () => render(button.dataset.category));
    });
  };

  render();
};

export const loadCaseStudy = async () => {
  const target = document.getElementById('case-study-container');
  if (!target) return;

  const id = new URLSearchParams(window.location.search).get('id');
  if (!id) {
    target.innerHTML = '<div class="empty-state">Case study not found.</div>';
    return;
  }

  const response = await api.get(`${apiEndpoints.portfolio}/${id}`);
  const item = response.data;

  const gallery = item.mediaGallery
    .map((media) =>
      media.resourceType === 'video'
        ? `<video class="gallery-media" controls src="${media.url}"></video>`
        : `<img class="gallery-media" src="${media.url}" alt="${media.altText || item.title}" />`
    )
    .join('');

  const metrics = item.metrics
    .map(
      (metric) => `
        <div class="metric-card">
          <strong>${metric.value}</strong>
          <span>${metric.label}</span>
        </div>
      `
    )
    .join('');

  target.innerHTML = `
    <div class="case-study-shell">
      <p class="card-meta">${item.category}</p>
      <div class="feature-card mt-4">
        <h3>Cover</h3>
        ${renderCoverMedia(item)}
      </div>
      <div class="feature-card mt-4">
        <h3>Brand Name</h3>
        <p>${item.brandName || 'Brand name not added yet.'}</p>
      </div>
      <div class="feature-card mt-4">
        <h3>Campaign Title</h3>
        <p>${item.title}</p>
      </div>
      <div class="feature-card mt-4">
        <h3>Objective</h3>
        <p>${item.campaignGoal}</p>
      </div>
      <div class="feature-card mt-4">
        <h3>Concept</h3>
        <p>${item.concept || item.excerpt || 'Concept details will be added soon.'}</p>
      </div>
      <div class="feature-card mt-4">
        <h3>Execution</h3>
        <p>${item.strategy || 'Execution details will be added soon.'}</p>
      </div>
      <div class="feature-card mt-4">
        <h3>Results</h3>
        <p>${item.resultsSummary}</p>
      </div>
      <div class="feature-card mt-4">
        <h3>Deliverables</h3>
        ${renderDeliverables(item)}
      </div>
      <div class="metrics-grid mt-4">${metrics}</div>
      <div class="gallery-grid mt-4">${gallery}</div>
    </div>
  `;
};
