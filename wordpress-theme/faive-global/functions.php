<?php

function faive_global_theme_setup() {
  add_theme_support('title-tag');
  add_theme_support('post-thumbnails');
}
add_action('after_setup_theme', 'faive_global_theme_setup');

function faive_global_enqueue_assets() {
  wp_enqueue_style(
    'faive-global-bootstrap',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
    [],
    '5.3.3'
  );

  wp_enqueue_style(
    'faive-global-fonts',
    'https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Cormorant+Garamond:wght@500;600;700&display=swap',
    [],
    null
  );

  wp_enqueue_style(
    'faive-global-style',
    get_stylesheet_uri(),
    ['faive-global-bootstrap', 'faive-global-fonts'],
    filemtime(get_stylesheet_directory() . '/style.css')
  );

  wp_enqueue_script(
    'faive-global-bootstrap',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
    [],
    '5.3.3',
    true
  );

  wp_enqueue_script(
    'faive-global-theme',
    get_template_directory_uri() . '/theme.js',
    [],
    filemtime(get_stylesheet_directory() . '/theme.js'),
    true
  );
}
add_action('wp_enqueue_scripts', 'faive_global_enqueue_assets');
