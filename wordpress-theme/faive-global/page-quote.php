<?php
/*
Template Name: Quote Page
*/
?>
<?php get_header(); ?>

<main class="page-shell">
  <section class="page-hero">
    <div class="container">
      <div class="row align-items-center g-5">
        <div class="col-lg-6">
          <span class="eyebrow">Start Your Project</span>
          <h1>Start Your Project</h1>
          <p>Tell us about your campaign and we'll create a tailored solution for your brand.</p>
        </div>
        <div class="col-lg-6">
          <div class="page-visual-card">
            <img
              src="<?php echo esc_url(get_template_directory_uri() . '/assets/placeholder-portfolio.svg'); ?>"
              alt="Quote request placeholder"
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
        <div class="col-lg-4">
          <div class="feature-card quote-side-card">
            <img
              src="<?php echo esc_url(get_template_directory_uri() . '/assets/placeholder-brand.svg'); ?>"
              alt="Project planning placeholder"
              class="support-visual-image"
            />
            <h2 class="section-title mt-4">What to include</h2>
            <p class="lead-copy mb-0">
              Share the brand, campaign type, number of videos, target deadline, budget range, and country so our team can scope accurately.
            </p>
            <p class="mt-4 mb-0">We're excited to bring your vision to life.</p>
          </div>
        </div>
        <div class="col-lg-8">
          <form class="form-shell">
            <div class="row g-3">
              <div class="col-md-6"><input class="form-control" placeholder="Company name" /></div>
              <div class="col-md-6"><input class="form-control" placeholder="Contact name" /></div>
              <div class="col-md-6"><input class="form-control" type="email" placeholder="Contact email" /></div>
              <div class="col-md-6"><input class="form-control" placeholder="Phone number" /></div>
              <div class="col-md-6"><input class="form-control" placeholder="Campaign type" /></div>
              <div class="col-md-6"><input class="form-control" placeholder="Number of videos" /></div>
              <div class="col-md-6"><input class="form-control" placeholder="Budget" /></div>
              <div class="col-md-6"><input class="form-control" placeholder="Deadline" /></div>
              <div class="col-md-6"><input class="form-control" placeholder="Country" /></div>
              <div class="col-md-6"><input class="form-control" placeholder="Book service" /></div>
              <div class="col-12"><textarea class="form-control" rows="7" placeholder="Briefly describe the campaign, product, audience, and required deliverables"></textarea></div>
              <div class="col-12"><button class="btn btn-gold" type="button">Submit Quote Request</button></div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</main>

<?php get_footer(); ?>
