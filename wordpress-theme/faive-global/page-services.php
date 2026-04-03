<?php
/*
Template Name: Services Page
*/
?>
<?php get_header(); ?>

<main class="page-shell">
  <section class="page-hero">
    <div class="container">
      <div class="row align-items-center g-5">
        <div class="col-lg-6">
          <span class="eyebrow">Services</span>
          <h1>Our Services</h1>
          <p>
            We provide end-to-end creative solutions for beauty and lifestyle brands looking to
            grow, scale, and stand out.
          </p>
        </div>
        <div class="col-lg-6">
          <div class="page-visual-card">
            <img
              src="<?php echo esc_url(get_template_directory_uri() . '/assets/placeholder-hero.svg'); ?>"
              alt="Creative services placeholder"
              class="page-visual-image"
            />
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="section-shell">
    <div class="container">
      <div class="row g-4 mb-4">
        <div class="col-lg-4">
          <article class="feature-card h-100">
            <h3>UGC Content Production</h3>
            <p>
              We create authentic, relatable, and high-performing content designed to resonate with
              your audience and drive conversions.
            </p>
            <a class="btn btn-outline-dark btn-sm mt-3" href="<?php echo esc_url(home_url('/quote')); ?>">Request a Quote</a>
          </article>
        </div>
        <div class="col-lg-4">
          <article class="feature-card h-100">
            <h3>Campaign Video Production</h3>
            <p>
              From concept development to final delivery, we produce visually compelling campaigns
              that align with your brand identity.
            </p>
            <a class="btn btn-outline-dark btn-sm mt-3" href="<?php echo esc_url(home_url('/quote')); ?>">Request a Quote</a>
          </article>
        </div>
        <div class="col-lg-4">
          <article class="feature-card h-100">
            <h3>Influencer Marketing Campaigns</h3>
            <p>We connect your brand with the right creators to ensure reach, engagement, and trust.</p>
            <a class="btn btn-outline-dark btn-sm mt-3" href="<?php echo esc_url(home_url('/quote')); ?>">Request a Quote</a>
          </article>
        </div>
        <div class="col-lg-4">
          <article class="feature-card h-100">
            <h3>Creative Direction</h3>
            <p>We develop creative strategies and visuals that position your brand effectively in the market.</p>
            <a class="btn btn-outline-dark btn-sm mt-3" href="<?php echo esc_url(home_url('/quote')); ?>">Request a Quote</a>
          </article>
        </div>
        <div class="col-lg-4">
          <article class="feature-card h-100">
            <h3>Model Sourcing</h3>
            <p>We provide diverse and relevant models tailored to your brand and campaign needs.</p>
            <a class="btn btn-outline-dark btn-sm mt-3" href="<?php echo esc_url(home_url('/quote')); ?>">Request a Quote</a>
          </article>
        </div>
        <div class="col-lg-4">
          <article class="feature-card h-100">
            <h3>Brand Campaign Strategy</h3>
            <p>We design campaigns that are not only creative but also strategically built to perform.</p>
            <a class="btn btn-outline-dark btn-sm mt-3" href="<?php echo esc_url(home_url('/quote')); ?>">Request a Quote</a>
          </article>
        </div>
      </div>
    </div>
  </section>
</main>

<?php get_footer(); ?>
