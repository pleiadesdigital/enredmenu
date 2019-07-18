<?php
/* SETUP FUNCTIONS */
if (!function_exists('enredmenu_setup')) :
  function enredmenu_setup() {
    /* template tags */
    add_theme_support('title-tag');
    /* menus */
    register_nav_menus(array(
      'top'     => esc_html__('Top Menu', 'enredmenu'),
      'social'  => esc_html__('Social Menu', 'enredmenu')
    ));
  }
endif;
add_action('after_setup_theme', 'enredmenu_setup');

/* SCRIPTS */
function enredmenu_scripts() {
  /* main styles */
  wp_enqueue_style('enredmenu-styles', get_stylesheet_uri());
  /* bundle scripts */
  wp_enqueue_script('enredmenu', get_template_directory_uri() . '/js/scripts-bundled.js', NULL, microtime(), true);
  /* navigation */
  wp_enqueue_script('enredmenu-navigation', get_theme_file_uri('/js/navigation.js'), array('jquery'), microtime(), true);
  /* localize script */
  wp_localize_script('enredmenu-navigation', 'enredmenuScreenReaderText', array(
    'expand'      => __('Expand child menu', 'enredmenu'),
    'collapse'    => __('Collapse child menu', 'enredmenu'),
    'icon'        => enredmenu_get_svg(array('icon' => 'angle-down', 'fallback' -> true))
  ));

  /* global js */
  wp_enqueue_script('enredmenu-global', get_theme_file_uri('/js/global.js'), array('jquery'), microtime(), true);
}
add_action('wp_enqueue_scripts', 'enredmenu_scripts');

/* PHP SUPPORT FILES */
require get_parent_theme_file_path('/inc/icon-functions.php');





