<?php
/*
Template Name: Portfolio Page
*/
?>
<?php get_header(); ?>

<main class="page-shell">
  <section class="page-hero">
    <div class="container">
      <span class="eyebrow">Portfolio</span>
      <h1>Our Work</h1>
      <p>Explore our portfolio of high-performing campaigns across beauty, lifestyle, and UGC content.</p>
    </div>
  </section>

  <section class="section-shell">
    <div class="container">
      <div class="section-heading split-heading">
        <div>
          <span class="eyebrow">Categories</span>
          <h2>UGC Campaign, Beauty Campaign, and Lifestyle Campaign.</h2>
        </div>
      </div>

      <div class="feature-card mb-4">
        <span class="eyebrow">Project Format</span>
        <h3>Every project follows the same clear case study structure.</h3>
        <div class="row g-3 mt-1">
          <div class="col-md-6">
            <p>1. Cover (Photo or Video)</p>
            <p>2. Brand Name</p>
            <p>3. Campaign Title</p>
            <p>4. Objective</p>
          </div>
          <div class="col-md-6">
            <p>5. Concept</p>
            <p>6. Execution</p>
            <p>7. Results</p>
            <p>8. Deliverables</p>
          </div>
        </div>
      </div>

      <div class="row g-4 mt-2">
        <div class="col-lg-4 col-md-6">
          <article class="portfolio-card">
            <img
              src="<?php echo esc_url(get_template_directory_uri() . '/assets/placeholder-portfolio.svg'); ?>"
              alt="Beauty campaign placeholder"
              class="portfolio-thumb"
            />
            <div class="portfolio-card-body">
              <p class="card-meta">Beauty Campaign</p>
              <h3>Campaign Name</h3>
              <p>This campaign focused on creating engaging content that highlighted product benefits while maintaining authenticity.</p>
            </div>
          </article>
        </div>
        <div class="col-lg-4 col-md-6">
          <article class="portfolio-card">
            <img
              src="<?php echo esc_url(get_template_directory_uri() . '/assets/placeholder-portfolio.svg'); ?>"
              alt="UGC campaign placeholder"
              class="portfolio-thumb"
            />
            <div class="portfolio-card-body">
              <p class="card-meta">UGC Campaign</p>
              <h3>Campaign Name</h3>
              <p>This campaign focused on creating engaging content that highlighted product benefits while maintaining authenticity.</p>
            </div>
          </article>
        </div>
        <div class="col-lg-4 col-md-6">
          <article class="portfolio-card">
            <img
              src="<?php echo esc_url(get_template_directory_uri() . '/assets/placeholder-portfolio.svg'); ?>"
              alt="Lifestyle campaign placeholder"
              class="portfolio-thumb"
            />
            <div class="portfolio-card-body">
              <p class="card-meta">Lifestyle Campaign</p>
              <h3>Campaign Name</h3>
              <p>This campaign focused on creating engaging content that highlighted product benefits while maintaining authenticity.</p>
            </div>
          </article>
        </div>
      </div>
    </div>
  </section>
</main>

<?php get_footer(); ?>
