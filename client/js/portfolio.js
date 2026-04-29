const portfolioPlaceholder = '/assets/placeholder-portfolio.svg';
const brandPlaceholder = '/assets/placeholder-brand.svg';
const creatorPlaceholder = '/assets/placeholder-avatar.svg';

const portfolioItems = [
  {
    id: 'radiance-reset',
    brandName: 'Radiance Lab',
    title: 'Radiance Reset Launch Campaign',
    category: 'Beauty Campaign',
    industry: 'Beauty / Skincare',
    excerpt:
      'A skincare launch campaign designed to spotlight glow-focused routines with premium, creator-led visuals.',
    heroMediaUrl: portfolioPlaceholder,
    campaignGoal:
      'Introduce a new skincare line with visuals that build trust, highlight product benefits, and support launch momentum.',
    concept:
      'A polished beauty story built around texture, routine, and visible glow, designed for social-first performance.',
    strategy:
      'We combined creator-led demos, product closeups, and clean premium styling to create a launch-ready campaign system.',
    resultsSummary:
      'The campaign delivered strong brand presentation, high watch-through quality, and versatile assets for multiple placements.',
    deliverables: ['Hero campaign visuals', 'Short-form UGC edits', 'Product detail photography'],
    mediaGallery: [{ url: portfolioPlaceholder, resourceType: 'image', altText: 'Radiance Reset campaign media' }],
    platforms: ['Instagram', 'TikTok', 'YouTube Shorts'],
    locations: ['Nigeria', 'Kenya', 'South Africa'],
    awarenessMetrics: ['Views', 'Mentions', 'Engagement', 'Reach'],
    acquisitionMetrics: ['Product interest', 'Site visits', 'Community growth'],
    influencers: [
      { name: 'Creator One', niche: 'Beauty', image: creatorPlaceholder },
      { name: 'Creator Two', niche: 'Skincare', image: creatorPlaceholder },
      { name: 'Creator Three', niche: 'Lifestyle', image: creatorPlaceholder },
      { name: 'Creator Four', niche: 'UGC', image: creatorPlaceholder }
    ],
    metrics: [
      { label: 'Content Assets', value: '12' },
      { label: 'Launch Markets', value: '3' }
    ],
    featured: true
  },
  {
    id: 'daily-skin-diaries',
    brandName: 'Daily Skin',
    title: 'Daily Skin UGC Conversion Series',
    category: 'UGC Campaign',
    industry: 'Beauty / UGC',
    excerpt:
      'A creator-first content series focused on authentic product usage, credibility, and ad-ready performance.',
    heroMediaUrl: portfolioPlaceholder,
    campaignGoal:
      'Create relatable skincare content that feels real, demonstrates product value, and supports conversion-focused campaigns.',
    concept:
      'Honest daily-routine storytelling with clean framing, natural delivery, and product-led moments.',
    strategy:
      'We produced short-form creator assets optimized for paid social, retention, and repeatable testing.',
    resultsSummary:
      'The final content library gave the brand a flexible bank of native-feeling assets for ads and organic use.',
    deliverables: ['UGC video series', 'Hook variations', 'Lifestyle stills'],
    mediaGallery: [{ url: portfolioPlaceholder, resourceType: 'image', altText: 'Daily Skin UGC campaign media' }],
    platforms: ['Instagram', 'TikTok', 'Paid Social'],
    locations: ['Nigeria', 'Ghana', 'United Kingdom'],
    awarenessMetrics: ['Video views', 'Shares', 'Reach', 'Retention'],
    acquisitionMetrics: ['CTR', 'Add to cart interest', 'Landing page visits'],
    influencers: [
      { name: 'Creator One', niche: 'Beauty', image: creatorPlaceholder },
      { name: 'Creator Two', niche: 'UGC', image: creatorPlaceholder },
      { name: 'Creator Three', niche: 'Lifestyle', image: creatorPlaceholder },
      { name: 'Creator Four', niche: 'Creator Ads', image: creatorPlaceholder }
    ],
    metrics: [
      { label: 'Video Variations', value: '9' },
      { label: 'Creators', value: '4' }
    ],
    featured: true
  },
  {
    id: 'soft-life-rituals',
    brandName: 'Soft Life Rituals',
    title: 'Lifestyle Rituals Brand Story',
    category: 'Lifestyle Campaign',
    industry: 'Lifestyle / Brand Storytelling',
    excerpt:
      'A lifestyle content system designed to position the brand through mood, aspiration, and intentional storytelling.',
    heroMediaUrl: portfolioPlaceholder,
    campaignGoal:
      'Build a visual identity that connects brand products to modern lifestyle aspiration and premium everyday use.',
    concept:
      'An intimate, elevated lifestyle narrative that blends environment, emotion, and product relevance.',
    strategy:
      'We created a mix of campaign imagery and short-form edits that turned brand positioning into a living visual world.',
    resultsSummary:
      'The campaign produced a cohesive lifestyle library that strengthened the brand’s visual consistency across channels.',
    deliverables: ['Lifestyle campaign visuals', 'Social cutdowns', 'Brand storytelling frames'],
    mediaGallery: [{ url: portfolioPlaceholder, resourceType: 'image', altText: 'Soft Life Rituals campaign media' }],
    platforms: ['Instagram', 'Pinterest', 'Website'],
    locations: ['Nigeria', 'South Africa', 'Remote Production'],
    awarenessMetrics: ['Brand recall', 'Engagement', 'Saves', 'Reach'],
    acquisitionMetrics: ['Product discovery', 'Profile visits', 'Audience interaction'],
    influencers: [
      { name: 'Creator One', niche: 'Lifestyle', image: creatorPlaceholder },
      { name: 'Creator Two', niche: 'Fashion', image: creatorPlaceholder },
      { name: 'Creator Three', niche: 'Lifestyle', image: creatorPlaceholder },
      { name: 'Creator Four', niche: 'Brand Story', image: creatorPlaceholder }
    ],
    metrics: [
      { label: 'Scenes', value: '6' },
      { label: 'Formats', value: '5' }
    ],
    featured: true
  }
];

const servicePillMarkup = (deliverables = []) =>
  deliverables.map((item) => `<span class="tag-pill">${item}</span>`).join('');

const isVideoAsset = (url = '') => /\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(url);

const renderCoverMedia = (item) => {
  const mediaUrl = item.heroMediaUrl || portfolioPlaceholder;

  if (isVideoAsset(mediaUrl)) {
    return `<video class="case-study-hero" controls playsinline src="${mediaUrl}"></video>`;
  }

  return `<img class="case-study-hero" src="${mediaUrl}" alt="${item.title}" />`;
};

const renderDeliverables = (item) => {
  const deliverables = Array.isArray(item.deliverables) ? item.deliverables : [];

  if (!deliverables.length) {
    return '<p>No deliverables added yet.</p>';
  }

  return `<ul class="case-study-deliverables">${deliverables.map((entry) => `<li>${entry}</li>`).join('')}</ul>`;
};

const platformIcons = {
  Instagram: {
    label: 'Instagram',
    svg: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3.25" y="3.25" width="17.5" height="17.5" rx="5"></rect>
        <circle cx="12" cy="12" r="4.1"></circle>
        <circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" stroke="none"></circle>
      </svg>
    `
  },
  TikTok: {
    label: 'TikTok',
    svg: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M14.2 4.2c.6 1.6 1.8 2.8 3.4 3.3v2.8c-1.2 0-2.3-.3-3.4-.9v5.5a4.9 4.9 0 1 1-4.9-4.9c.3 0 .7 0 1 .1v2.8a2.3 2.3 0 1 0 1.3 2V4.2h2.6Z"></path>
      </svg>
    `
  },
  'YouTube Shorts': {
    label: 'YouTube Shorts',
    svg: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M15.8 3.8c-1 .3-1.8 1.1-2.6 2l-1.5 1.7-2-.5A4.2 4.2 0 0 0 4.8 13l1.9.4-1 1.1a4.2 4.2 0 0 0 5.2 6.6l1.8-1 1.5 1.1a4.2 4.2 0 0 0 5-6.7l-1.3-1 1.1-1.2a4.2 4.2 0 0 0-3.2-7.1Z"></path>
        <path d="m10.2 9.4 5 2.6-5 2.6V9.4Z" fill="currentColor" stroke="none"></path>
      </svg>
    `
  },
  Pinterest: {
    label: 'Pinterest',
    svg: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 3.4a8.6 8.6 0 0 0-3.1 16.7c0-.7 0-1.8.3-2.6l1.1-4.5s-.3-.7-.3-1.8c0-1.7 1-3 2.2-3 1 0 1.5.8 1.5 1.7 0 1-.7 2.5-1 3.9-.3 1.1.5 2 1.6 2 2 0 3.4-2.6 3.4-5.7 0-2.3-1.6-4.1-4.6-4.1-3.4 0-5.4 2.5-5.4 5.2 0 1 .3 1.8.8 2.4.2.2.2.3.1.6l-.3 1c-.1.3-.3.4-.7.3-1.8-.7-2.6-2.6-2.6-4.7 0-3.5 3-7.7 8.8-7.7 4.7 0 7.8 3.4 7.8 7 0 4.8-2.7 8.4-6.7 8.4-1.4 0-2.6-.7-3-1.4l-.8 2.8c-.3 1-.9 2-1.4 2.7.8.2 1.5.4 2.3.4A8.6 8.6 0 0 0 12 3.4Z"></path>
      </svg>
    `
  },
  Website: {
    label: 'Website',
    svg: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="8.25"></circle>
        <path d="M3.9 12h16.2M12 3.9c2.2 2.2 3.5 5 3.5 8.1S14.2 17.9 12 20.1M12 3.9C9.8 6.1 8.5 8.9 8.5 12s1.3 5.9 3.5 8.1" fill="none"></path>
      </svg>
    `
  },
  'Paid Social': {
    label: 'Paid Social',
    svg: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4.5 17.5h3.2l6.8-9.8a1.7 1.7 0 0 1 2.4-.4l2.6 1.8"></path>
        <path d="M14.2 4.6h5.3v5.2"></path>
        <path d="M5 8.2h5.2v5.2H5z"></path>
      </svg>
    `
  }
};

const renderPlatformIcons = (items = []) => {
  if (!items.length) {
    return '<div class="case-study-platform-row"><span class="case-study-platform-icon is-placeholder">?</span></div>';
  }

  return `<div class="case-study-platform-row">${items
    .map((item) => {
      const icon = platformIcons[item];
      if (!icon) {
        return `<span class="case-study-platform-icon" title="${item}" aria-label="${item}">${item.slice(0, 1)}</span>`;
      }

      return `
        <span class="case-study-platform-icon" title="${icon.label}" aria-label="${icon.label}">
          ${icon.svg}
        </span>
      `;
    })
    .join('')}</div>`;
};

const renderChipRow = (items = []) => {
  if (!items.length) {
    return '<div class="case-study-chip-row"><span class="case-study-chip">Placeholder</span></div>';
  }

  return `<div class="case-study-chip-row">${items
    .map((item) => `<span class="case-study-chip">${item}</span>`)
    .join('')}</div>`;
};

const renderMetricList = (items = []) => {
  if (!items.length) {
    return '<ul class="case-study-list"><li>Placeholder metric</li></ul>';
  }

  return `<ul class="case-study-list">${items.map((item) => `<li>${item}</li>`).join('')}</ul>`;
};

const renderInfluencers = (item) => {
  const creators = Array.isArray(item.influencers) ? item.influencers : [];

  return creators
    .map(
      (creator) => `
        <article class="case-study-creator">
          <img
            class="case-study-creator-image"
            src="${creator.image || creatorPlaceholder}"
            alt="${creator.name}"
          />
          <div>
            <h3>${creator.name}</h3>
            <p>${creator.niche}</p>
          </div>
        </article>
      `
    )
    .join('');
};

export const loadPortfolioCards = (targetId, options = {}) => {
  const target = document.getElementById(targetId);
  if (!target) return;

  const items = options.featured ? portfolioItems.filter((item) => item.featured) : portfolioItems;

  target.innerHTML = items
    .map(
      (item) => `
        <div class="col-lg-4 col-md-6">
          <article class="portfolio-card">
            <img src="${item.heroMediaUrl || portfolioPlaceholder}" alt="${item.title}" class="portfolio-thumb" />
            <div class="portfolio-card-body">
              <p class="card-meta">${item.brandName || item.category}</p>
              <h3>${item.title}</h3>
              <p>${item.excerpt}</p>
              <div class="tag-row">${servicePillMarkup(item.deliverables)}</div>
              <a class="text-link mt-3 d-inline-flex" href="/pages/case-study.html?id=${item.id}">Open case study</a>
            </div>
          </article>
        </div>
      `
    )
    .join('');
};

export const initPortfolioFilters = () => {
  const filtersEl = document.getElementById('portfolio-filters');
  const gridEl = document.getElementById('portfolio-grid');
  if (!filtersEl || !gridEl) return;

  const categories = ['All', ...new Set(portfolioItems.map((item) => item.category))];

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
        ? portfolioItems
        : portfolioItems.filter((item) => item.category === activeCategory);

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
                <a class="text-link" href="/pages/case-study.html?id=${item.id}">Open case study</a>
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

export const loadCaseStudy = () => {
  const target = document.getElementById('case-study-container');
  if (!target) return;

  const id = new URLSearchParams(window.location.search).get('id');
  const item = portfolioItems.find((entry) => entry.id === id) || portfolioItems[0];

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
      <section class="case-study-slide case-study-slide-intro">
        <div class="case-study-brand-lockup">
          <img class="case-study-brand-logo" src="${brandPlaceholder}" alt="${item.brandName} brand placeholder" />
          <div class="case-study-brand-name">${item.brandName}</div>
        </div>
        <div class="case-study-intro-copy">
          <p class="card-meta">${item.category}</p>
          <h1>${item.title}</h1>
          <p>${item.excerpt}</p>
          <div class="case-study-meta-line">
            <strong>Industry:</strong>
            <span>${item.industry || item.category}</span>
          </div>
        </div>
      </section>

      <section class="case-study-slide">
        <div class="case-study-slide-head">
          <h2>About</h2>
        </div>
        <div class="case-study-detail-grid">
          <div class="case-study-detail-row">
            <strong>Problem:</strong>
            <p>${item.campaignGoal}</p>
          </div>
          <div class="case-study-detail-row">
            <strong>Solution:</strong>
            <p>${item.strategy}</p>
          </div>
        </div>
        <div class="case-study-columns">
          <div>
            <h3>Services Provided</h3>
            ${renderDeliverables(item)}
          </div>
          <div>
            <h3>Platform(s)</h3>
            ${renderPlatformIcons(item.platforms)}
          </div>
          <div>
            <h3>Location(s)</h3>
            ${renderChipRow(item.locations)}
          </div>
          <div>
            <h3>Awareness Metrics</h3>
            ${renderMetricList(item.awarenessMetrics)}
          </div>
          <div>
            <h3>Acquisition Metrics</h3>
            ${renderMetricList(item.acquisitionMetrics)}
          </div>
        </div>
      </section>

      <section class="case-study-slide">
        <div class="case-study-slide-head">
          <h2>Campaign Influencers</h2>
        </div>
        <div class="case-study-creator-grid">
          ${renderInfluencers(item)}
        </div>
      </section>

      <section class="case-study-slide">
        <div class="case-study-slide-head">
          <h2>Campaign Assets</h2>
        </div>
        <div class="gallery-grid">${gallery}</div>
        <div class="metrics-grid mt-4">${metrics}</div>
        <div class="case-study-columns mt-4">
          <div>
            <h3>Concept</h3>
            <p>${item.concept}</p>
          </div>
          <div>
            <h3>Results</h3>
            <p>${item.resultsSummary}</p>
          </div>
          <div>
            <h3>Cover</h3>
            ${renderCoverMedia(item)}
          </div>
        </div>
      </section>
    </div>
  `;
};
