<?php
/*
Template Name: Contact Page
*/
?>
<?php get_header(); ?>

<main class="page-shell">
  <section class="page-hero">
    <div class="container">
      <div class="row align-items-center g-5">
        <div class="col-lg-6">
          <span class="eyebrow">Contact</span>
          <h1>Let's Work Together</h1>
          <p>Have a project in mind? We'd love to hear from you.</p>
        </div>
        <div class="col-lg-6">
          <div class="page-visual-card">
            <img
              src="<?php echo esc_url(get_template_directory_uri() . '/assets/placeholder-brand.svg'); ?>"
              alt="Contact page placeholder"
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
        <div class="col-lg-5">
          <h2 class="section-title">Contact Details</h2>
          <p class="lead-copy">Fill out the form and our team will get back to you within 24-48 hours.</p>
          <div class="contact-info-card mt-4">
            <p><strong>Email</strong><span>hello@faiveglobal.ltd</span></p>
            <p><strong>Phone</strong><span>+234 912 2777 890</span></p>
            <p><strong>Location</strong><span>Abuja, Nigeria</span></p>
          </div>
          <div class="support-visual-card mt-4">
            <img
              src="<?php echo esc_url(get_template_directory_uri() . '/assets/placeholder-portfolio.svg'); ?>"
              alt="Conversation starter placeholder"
              class="support-visual-image"
            />
          </div>
        </div>
        <div class="col-lg-7">
          <form class="form-shell">
            <div class="row g-3">
              <div class="col-md-6"><input class="form-control" placeholder="Full name" /></div>
              <div class="col-md-6"><input class="form-control" type="email" placeholder="Email address" /></div>
              <div class="col-12"><input class="form-control" placeholder="Company" /></div>
              <div class="col-md-6"><input class="form-control" placeholder="Service needed" /></div>
              <div class="col-md-6"><input class="form-control" placeholder="Budget" /></div>
              <div class="col-12"><textarea class="form-control" rows="6" placeholder="Tell us about your brand, campaign, and what you need"></textarea></div>
              <div class="col-12"><button class="btn btn-gold" type="button">Send Message</button></div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</main>

<?php get_footer(); ?>
