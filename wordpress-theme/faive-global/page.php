<?php get_header(); ?>

<main class="page-shell">
  <section class="page-hero">
    <div class="container">
      <span class="eyebrow"><?php echo esc_html(get_the_title()); ?></span>
      <h1><?php the_title(); ?></h1>
      <?php if (has_excerpt()) : ?>
        <p><?php echo esc_html(get_the_excerpt()); ?></p>
      <?php endif; ?>
    </div>
  </section>

  <section class="section-shell">
    <div class="container">
      <div class="feature-card">
        <?php
        while (have_posts()) :
          the_post();
          the_content();
        endwhile;
        ?>
      </div>
    </div>
  </section>
</main>

<?php get_footer(); ?>
