<!doctype html>
<html <?php language_attributes(); ?>>
  <head>
    <meta charset="<?php bloginfo('charset'); ?>" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <?php wp_head(); ?>
  </head>
  <body <?php body_class(); ?>>
    <?php wp_body_open(); ?>
    <header class="site-header">
      <div class="container">
        <nav class="navbar navbar-expand-lg py-4">
          <a class="navbar-brand brand-mark" href="<?php echo esc_url(home_url('/')); ?>">
            Faive Global
          </a>
          <button
            class="navbar-toggler border-0 shadow-none"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#siteNav"
            aria-controls="siteNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="siteNav">
            <ul class="navbar-nav ms-auto align-items-lg-center gap-lg-3">
              <li class="nav-item"><a class="nav-link" href="<?php echo esc_url(home_url('/')); ?>">Home</a></li>
              <li class="nav-item"><a class="nav-link" href="<?php echo esc_url(home_url('/services')); ?>">Services</a></li>
              <li class="nav-item"><a class="nav-link" href="<?php echo esc_url(home_url('/portfolio')); ?>">Portfolio</a></li>
              <li class="nav-item"><a class="nav-link" href="<?php echo esc_url(home_url('/about')); ?>">About</a></li>
              <li class="nav-item"><a class="nav-link" href="<?php echo esc_url(home_url('/contact')); ?>">Contact</a></li>
              <li class="nav-item">
                <a class="btn btn-gold btn-sm px-4" href="<?php echo esc_url(home_url('/quote')); ?>">
                  Request a Quote
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
