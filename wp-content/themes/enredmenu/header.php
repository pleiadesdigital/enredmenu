<?php /* SITE HEADER */ ?>
<!DOCTYPE html>
<html <?php language_attributes(); ?> class="js">

<head>
  <meta charset="<?php bloginfo('charset'); ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="profile" href="https://gmpg.org/xfn/11">
  <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
  <div id="page" class="site">
    <a href="#content" class="skip-link screen-reader-text"><?php esc_html_e('Skip to content', 'enredmenu'); ?></a>
    <header id="masthead" class="site-header">
      <!-- NAVIGATION -->
      <div class="navigation-top">
        <div class="wrap">
          <nav id="site-navigation" class="main-navigation" role="navigation" aria-label="<?php esc_attr_e('Top Menu', 'enredmenu'); ?>">
            <button class="menu-toggle" aria-controls="top-menu" aria-expanded="false">
              <?php
              echo enredmenu_get_svg(array('icon' => 'bars'));
              echo enredmenu_get_svg(array('icon' => 'close'));
              _e('Menu', 'enredmenu');
              ?>
            </button>
            <?php
            wp_nav_menu(array(
              'theme_location'      => 'top',
              'menu_id'             => 'top-menu'
            ));
            ?>
          </nav>
        </div>
      </div>
    </header>
  </div><!-- id="page" class="site" -->
