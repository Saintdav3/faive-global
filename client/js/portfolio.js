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

const renderCoverMedia = (item) => {yes
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

// ── Individual brand case study pages ──

const brandStudies = [
  {
    id: 'medicube',
    name: 'Medicube',
    logo: '/assets/Medicube.png',
    views: '78.5M+',
    description: 'Medicube partnered with Fainna on a high-performing skincare content series focused on ingredient education, product discovery, and routine-based skincare storytelling.',
    challenge: 'Communicate the benefits of advanced skincare ingredients in a way that feels simple, relatable, and engaging for TikTok audiences.',
    strategy: 'Created educational, problem-solution driven content that connected visible skincare concerns with product benefits while simplifying ingredient-heavy messaging.',
    results: ['78.5M+ Total Views', '49.6M Highest Performing Video', '4 Published TikTok Videos', 'Multiple Viral Product Education Assets'],
    videos: [
      { title: 'Peptide Serum', views: '49.6M Views', url: 'https://vt.tiktok.com/ZS91wYFUc/', id: '7592954458749930772' },
      { title: 'Kojic Acid + Turmeric', views: '19.3M Views', url: 'https://vt.tiktok.com/ZS91TusqN/', id: '7588622644660997396' },
      { title: 'Kojic Peel Acid Duo', views: '8.6M Views', url: 'https://vt.tiktok.com/ZS91ToUFm/', id: '7611120311723085076' },
      { title: 'Global Mask', views: '1M Views', url: 'https://vt.tiktok.com/ZS91wu699/', id: '7598867020800625940' },
    ],
  },
  {
    id: 'eqqualberry',
    name: 'Eqqualberry',
    logo: '/assets/eqb.png',
    views: '11.3M+',
    description: 'Eqqualberry partnered with Fainna on a multi-video skincare campaign designed to educate consumers on targeted skincare solutions while increasing product awareness.',
    challenge: 'Increase consumer understanding of product benefits while making skincare education visually engaging and easy to follow.',
    strategy: 'Used benefit-first storytelling and highly visual skincare demonstrations to simplify product messaging and improve audience retention.',
    results: ['11.3M+ Total Views', '8.1M Highest Performing Video', '4 Published TikTok Videos'],
    videos: [
      { title: 'Purple Rice Cleansing Oil', views: '8.1M Views', url: 'https://vt.tiktok.com/ZS9J1bpEt/', id: '7501755125615103238' },
      { title: 'Botox Serum', views: '1.5M Views', url: 'https://vt.tiktok.com/ZS91w1K1k/', id: '7618642159683570964' },
      { title: 'NAD Cream', views: '1.1M Views', url: 'https://vt.tiktok.com/ZS91TKJJ2/', id: '7616029305675451660' },
      { title: 'Bikini Lines', views: '621K Views', url: 'https://vt.tiktok.com/ZS91wkPEY/', id: '7611238048059247893' },
    ],
  },
  {
    id: 'axis-y',
    name: 'AXIS-Y',
    logo: '/assets/Axis-y.jpg',
    views: '2.1M+',
    description: 'AXIS-Y partnered with Fainna to create educational skincare content focused on treatment products and ingredient-led skincare solutions.',
    challenge: 'Help consumers understand how specialized skincare products fit into their routines.',
    strategy: 'Focused on concern-specific skincare education and simplified product explanations that connected ingredients to everyday skincare goals.',
    results: ['2.1M+ Total Views', '1.1M Highest Performing Video', '2 Published TikTok Videos'],
    videos: [
      { title: 'Collagen Serum', views: '1.1M Views', url: 'https://vt.tiktok.com/ZS91Ts3o4/', id: '7620853007265041681' },
      { title: 'Triple PDRN', views: '1M Views', url: 'https://vt.tiktok.com/ZS91TvWKv/', id: '7617885542306385173' },
    ],
  },
  {
    id: 'dr-althea',
    name: 'Dr. Althea',
    logo: '/assets/Dr Althea.png',
    views: '1.1M+',
    description: 'Premium skincare education designed to communicate product efficacy through relatable consumer storytelling.',
    results: ['1.1M+ Views', '1 Published Video'],
    videos: [
      { title: 'Reju 500 Cream', views: 'Watch on TikTok', url: 'https://vt.tiktok.com/ZS91TXNyQ/', id: '7593793688136977684' },
    ],
  },
  {
    id: 'anua',
    name: 'Anua',
    logo: '/assets/anua.png',
    views: '555K+',
    description: 'Trust-led skincare content designed to increase product consideration and brand familiarity.',
    results: ['555K+ Views', '1 Published Video'],
    videos: [
      { title: 'Skincare Steps', views: 'Watch on TikTok', url: 'https://vt.tiktok.com/ZS91wyP9A/', id: '7505848122149473541' },
    ],
  },
  {
    id: 'vaseline',
    name: 'Vaseline',
    logo: '/assets/vaseline.png',
    views: '2.84M+',
    description: 'Creative beauty hacks that repositioned a familiar household product through practical skincare applications.',
    results: ['2.84M+ Views', '3 Published Videos'],
    videos: [
      { title: 'Video 1', views: 'Watch on TikTok', url: 'https://vt.tiktok.com/ZS91wMmBr/', id: '7511320222947757318' },
      { title: 'Video 2', views: 'Watch on TikTok', url: 'https://vt.tiktok.com/ZS91wSYaV/', id: '7523984183966879032' },
      { title: 'Video 3', views: 'Watch on TikTok', url: 'https://vt.tiktok.com/ZS91w9G21/', id: '7621612599695756565' },
    ],
  },
  {
    id: 'the-ordinary',
    name: 'The Ordinary',
    logo: '/assets/Gemini_Generated_Image_luvlzyluvlzyluvl.png',
    views: '575K+',
    description: 'Educational skincare content focused on pigmentation concerns and solution-based skincare routines.',
    results: ['575K+ Views', '1 Published Video'],
    videos: [
      { title: 'Watch Video', views: 'Watch on TikTok', url: 'https://vt.tiktok.com/ZS91wQaWQ/', id: '7537285206953299256' },
    ],
  },
];

const ttIcon = '<svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M14.2 4.2c.6 1.6 1.8 2.8 3.4 3.3v2.8c-1.2 0-2.3-.3-3.4-.9v5.5a4.9 4.9 0 1 1-4.9-4.9c.3 0 .7 0 1 .1v2.8a2.3 2.3 0 1 0 1.3 2V4.2h2.6Z"/></svg>';
const arrowLeft = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 12H5"/><path d="M12 5l-7 7 7 7"/></svg>';

export const loadBrandOverview = (sectionId) => {
  const section = document.getElementById(sectionId);
  if (!section) return;

  const cards = brandStudies
    .map(
      (b) => `
      <div class="col-lg-3 col-md-4 col-6">
        <a href="/pages/case-study?brand=${b.id}" class="cs-overview-card">
          <div class="cs-overview-card-logo">
            ${b.logo ? `<img src="${b.logo}" alt="${b.name}" style="width:100%;height:100%;object-fit:contain;border-radius:50%;" />` : b.name.charAt(0)}
          </div>
          <div class="cs-overview-card-name">${b.name}</div>
          <span class="cs-overview-card-badge">${b.views}</span>
        </a>
      </div>`
    )
    .join('');

  section.innerHTML = `
    <div class="container">
      <div class="cs-cases-heading"><div class="eyebrow">Featured Case Studies</div></div>
      <div class="row g-4">${cards}</div>
    </div>`;
};

export const loadBrandPage = (mountId) => {
  const mount = document.getElementById(mountId);
  if (!mount) return false;

  const brandId = new URLSearchParams(window.location.search).get('brand');
  if (!brandId) return false;

  const brand = brandStudies.find((b) => b.id === brandId);
  if (!brand) return false;

  document.title = brand.name + ' | Fainna Portfolio';

  const csSection = brand.challenge && brand.strategy
    ? `<div class="cs-cs-grid">
        <div class="cs-cs-card"><h4>Challenge</h4><p>${brand.challenge}</p></div>
        <div class="cs-cs-card"><h4>Strategy</h4><p>${brand.strategy}</p></div>
      </div>`
    : '';

  const resultItems = brand.results.map((r) => `<li>${r}</li>`).join('');

  const videoCards = brand.videos
    .map(
      (v) => `
      <div class="cs-tt-embed-wrap" data-video-id="${v.id}" data-url="${v.url}">
        <a href="${v.url}" target="_blank" rel="noopener noreferrer" class="cs-tt-poster">
          <img src="/assets/thumbnails/${v.id}.jpg" alt="${v.title}" class="cs-tt-thumb" />
          <div class="cs-tt-poster-overlay"></div>
          <div class="cs-tt-play-btn">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
          </div>
          <div class="cs-tt-poster-foot">
            <span class="cs-tt-poster-title">${v.title}</span>
            <span class="cs-tt-poster-hint">Hover to preview &middot; Click to open</span>
          </div>
        </a>
        <iframe
          class="cs-tt-iframe"
          src="about:blank"
          data-src="https://www.tiktok.com/embed/v2/${v.id}?autoplay=1"
          allowfullscreen
          allow="encrypted-media; clipboard-write; autoplay"
          scrolling="no"
          title="${v.title}"
          style="display:none">
        </iframe>
        <div class="cs-tt-embed-label">
          <a href="${v.url}" target="_blank" rel="noopener noreferrer" class="cs-tt-embed-title">${v.title}</a>
          <span class="cs-tt-embed-views">${v.views}</span>
        </div>
      </div>`
    )
    .join('');

  mount.innerHTML = `
    <div class="container" style="padding-top:2.5rem;padding-bottom:5rem;">
      <a href="/pages/portfolio" class="cs-back-link">${arrowLeft} Back to Portfolio</a>
      <div class="cs-brand-block" style="border-bottom:none;padding-top:2rem;">
        <div class="cs-brand-header">
          <h1 class="cs-brand-name">${brand.name}</h1>
          <span class="cs-brand-views-badge">${brand.views} Views Generated</span>
        </div>
        <p class="cs-brand-desc">${brand.description}</p>
        ${csSection}
        <div class="cs-results-block">
          <h4>Results</h4>
          <ul class="cs-results-pills">${resultItems}</ul>
        </div>
        <div class="cs-videos-block">
          <h4>Featured Videos</h4>
          <div class="cs-tt-scroll">${videoCards}</div>
        </div>
      </div>
      <div style="margin-top:3rem;padding-top:2rem;border-top:1px solid #e8e4da;display:flex;align-items:center;gap:1.25rem;flex-wrap:wrap;">
        <a href="/pages/portfolio" class="cs-back-link" style="margin-bottom:0;">${arrowLeft} View All Brands</a>
        <a href="/pages/contact" class="btn btn-gold btn-pill" style="font-size:0.875rem;padding:0.6rem 1.75rem;">Work With Me</a>
      </div>
    </div>`;

  mount.querySelectorAll('.cs-tt-embed-wrap').forEach((wrap) => {
    const poster = wrap.querySelector('.cs-tt-poster');
    const iframe = wrap.querySelector('.cs-tt-iframe');

    wrap.addEventListener('mouseenter', () => {
      poster.style.display = 'none';
      iframe.style.display = 'block';
      iframe.src = iframe.dataset.src;
    });

    wrap.addEventListener('mouseleave', () => {
      iframe.src = 'about:blank';
      iframe.style.display = 'none';
      poster.style.display = 'flex';
    });
  });

  return true;
};
