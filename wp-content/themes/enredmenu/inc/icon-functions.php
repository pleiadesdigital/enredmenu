<?php

// add svg definitions to the footer
function enredmenu_include_svg_icons() {
  $svg_icons = get_parent_theme_file_path('/assets/images/svg-icons.svg');
  if (file_exists($svg_icons)) {
    require_once($svg_icons);
  }
}
add_action('wp_footer', 'enredmenu_include_svg_icons', 9999);

/* return svg markup */
function enredmenu_get_svg($args = array()) {
  // make sure $args are an array
  if (empty($args)) {
    return __('Please define default parameters in the form of an array.', 'enredmenu');
  }
  // define an icon
  if (false === array_key_exists('icon', $args)) {
    return __('Please define an SVG icon filename.', 'enredmenu');
  }
  // set defaults
  $defaults = array(
    'icon'      => '',
    'title'     => '',
    'desc'      => '',
    'fallback'  => false
  );
  // parse args
  $args = wp_parse_args($args, $defaults);
  // set aria hidden
  $aria_hidden = ' aria-hidden="true"';
  // set ARIA
  $aria_labelledby = '';
  if ($args['title']) :
    $aria_hidden = '';
    $unique_id = enredmenu_unique_id();
    $aria_labelledby = ' aria-labelledby="title-' . $unique_id . '"';
    if ($args['desc']) {
      $aria_labelledby = ' aria-labelledby="title-' . $unique_id . ' desc-' . $unique_id . '"';
    }
  endif;

  // begin SVG markup
  $svg = '<svg class="icon icon-' . esc_attr($args['icon']) . '"' . $aria_hidden . $aria_labelledby . ' role="img">';
  // display the title
  if ($args['title']) :
    $svg .= '<title id="title-"' . $unique_id . '">' . esc_html($args['title']) . '</title>';
    // display the desc only if the title is already set
    if ($args['desc']) {
      $svg .= '<desc id="desc-' . $unique_id . '">' . esc_html($args['desc']) . '</desc>';
    }
  endif;

  // display the icon
  $svg .= ' <use href="#icon-' . esc_html($args['icon']) . '" xlink:href="#icon-' . esc_html($args['icon']) . '"></use> ';
  // markup to use as a fallback for browsers that do not support SVGs
  if ($args['fallback']) {
    $svg .= '<span class="svg-fallback icon-' . esc_attr($args['icon']) . '"></span>';
  }

  $svg .= '</svg>';
  return $svg;
} // enredmenu_get_svg()

// display SVg icons in social links menu
function enredmenu_nav_menu_social_icons($item_output, $item, $depth, $args) {
  // get supported social icons
  $social_icons = enredmenu_social_links_icons();
  // change SVG icon inside social links menu if there is supported URL
  if ('social' === $args->theme_location) {
    foreach ($social_icons as $attr => $value) {
      if (false !== strpos($item_output, $attr)) {
        $item_output = str_replace($args->link_after, '</span>' . enredmenu_get_svg(array('icon' => esc_attr($value))), $item_output);
      }
    }
  }
  return $item_output;
}
add_filter('walker_nav_menu_start_el', 'enredmenu_nav_menu_social_icons', 10, 4);

// add dropdown icon if menu item has children
function enredmenu_dropdown_icon_to_menu_link($title, $item, $args, $depth) {
  if ('top' === $args->theme_location) :
    foreach ($item->classes as $value) :
      if ('menu-item-has-children' === $value || 'page_item_has_children' === $value) {
        $title = $title . enredmenu_get_svg(array('icon' => 'angle-down'));
      }
    endforeach;
  endif;
  return $title;
}
add_filter('nav_menu_item_title', 'enredmenu_dropdown_icon_to_menu_link', 10, 4);

// array of supported social links icons
function enredmenu_social_links_icons() {
  // supported social links icons
  $social_links_icons = array(
    'behance.net'     => 'behance',
    'codepen.io'      => 'codepen',
    'deviantart.com'  => 'deviantart',
    'digg.com'        => 'digg',
    'docker.com'      => 'dockerhub',
    'dribbble.com'    => 'dribbble',
    'dropbox.com'     => 'dropbox',
    'facebook.com'    => 'facebook',
    'flickr.com'      => 'flickr',
    'foursquare.com'  => 'foursquare',
    'plus.google.com' => 'google-plus',
    'github.com'      => 'github',
    'instagram.com'   => 'instagram',
    'linkedin.com'    => 'linkedin',
    'mailto:'         => 'envelope-o',
    'medium.com'      => 'medium',
    'pinterest.com'   => 'pinterest-p',
    'pscp.tv'         => 'periscope',
    'getpocket.com'   => 'get-pocket',
    'reddit.com'      => 'reddit-alien',
    'skype.com'       => 'skype',
    'skype:'          => 'skype',
    'slideshare.net'  => 'slideshare',
    'snapchat.com'    => 'snapchat-ghost',
    'soundcloud.com'  => 'soundcloud',
    'spotify.com'     => 'spotify',
    'stumbleupon.com' => 'stumbleupon',
    'tumblr.com'      => 'tumblr',
    'twitch.tv'       => 'twitch',
    'twitter.com'     => 'twitter',
    'vimeo.com'       => 'vimeo',
    'vine.co'         => 'vine',
    'vk.com'          => 'vk',
    'wordpress.org'   => 'wordpress',
    'wordpress.com'   => 'wordpress',
    'yelp.com'        => 'yelp',
    'youtube.com'     => 'youtube'
  );
  return apply_filters('enredmenu_social_links', $social_links_icons);
}
