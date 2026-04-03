<?php
/*
Template Name: About Page
*/
?>
<?php get_header(); ?>

<main class="page-shell">
  <section class="page-hero">
    <div class="container">
      <div class="row align-items-center g-5">
        <div class="col-lg-6">
          <span class="eyebrow">About Faive Global</span>
          <h1>About Faive Global</h1>
          <p>
            Faive Global is a lifestyle and beauty media production agency dedicated to creating
            impactful campaigns for modern brands.
          </p>
        </div>
        <div class="col-lg-6">
          <div class="page-visual-card">
            <img
              src="<?php echo esc_url(get_template_directory_uri() . '/assets/placeholder-portfolio.svg'); ?>"
              alt="Agency overview placeholder"
              class="page-visual-image"
            />
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="section-shell">
    <div class="container">
      <div class="row g-5">
        <div class="col-lg-6">
          <h2 class="section-title">Main About</h2>
          <p class="lead-copy">
            We specialize in UGC content, influencer campaigns, and creative production that
            connects brands with their audience in a meaningful way.
          </p>
          <div class="support-visual-card mt-4">
            <img
              src="<?php echo esc_url(get_template_directory_uri() . '/assets/placeholder-hero.svg'); ?>"
              alt="Agency story placeholder"
              class="support-visual-image"
            />
          </div>
        </div>
        <div class="col-lg-6">
          <div class="feature-stack">
            <article class="feature-card">
              <h3>Mission</h3>
              <p>To help brands grow through creative, authentic, and results-driven content.</p>
            </article>
            <article class="feature-card">
              <h3>Vision</h3>
              <p>
                To become a globally recognized creative agency shaping the future of beauty and
                lifestyle marketing.
              </p>
            </article>
            <article class="feature-card">
              <h3>Our Approach</h3>
              <p>
                We combine creativity, strategy, and audience insight to deliver content that not
                only looks good but performs.
              </p>
            </article>
          </div>
        </div>
      </div>

      <div class="team-grid mt-5">
        <article class="team-card">
          <img
            src="<?php echo esc_url(get_template_directory_uri() . '/assets/placeholder-avatar.svg'); ?>"
            alt="Strategy leadership placeholder"
            class="team-card-avatar"
          />
          <h3>Founder & Strategy</h3>
          <p>Campaign positioning, client strategy, and creative oversight for production delivery.</p>
        </article>
        <article class="team-card">
          <img
            src="<?php echo esc_url(get_template_directory_uri() . '/assets/placeholder-avatar.svg'); ?>"
            alt="Creative direction placeholder"
            class="team-card-avatar"
          />
          <h3>Creative & Production</h3>
          <p>Shot planning, visual direction, content production, and campaign execution management.</p>
        </article>
        <article class="team-card">
          <img
            src="<?php echo esc_url(get_template_directory_uri() . '/assets/placeholder-avatar.svg'); ?>"
            alt="Media operations placeholder"
            class="team-card-avatar"
          />
          <h3>Creators & Talent</h3>
          <p>Creator collaboration, model sourcing, and influencer campaign coordination.</p>
        </article>
      </div>
    </div>
  </section>
</main>

<?php get_footer(); ?>
