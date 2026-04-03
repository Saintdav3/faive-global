<?php get_header(); ?>

<main class="page-shell">
  <section class="section-shell">
    <div class="container">
      <div class="feature-card">
        <?php if (have_posts()) : ?>
          <?php while (have_posts()) : the_post(); ?>
            <h1 class="section-title"><?php the_title(); ?></h1>
            <?php the_content(); ?>
          <?php endwhile; ?>
        <?php else : ?>
          <p>No content found.</p>
        <?php endif; ?>
      </div>
    </div>
  </section>
</main>

<?php get_footer(); ?>
