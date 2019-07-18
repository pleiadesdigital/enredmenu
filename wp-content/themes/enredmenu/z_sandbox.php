  <?php
  // display the icon
  $svg .= ' <use href="#icon-">' . esc_html($args['icon']) . '" xlink:href="#icon-' . esc_html($args['icon']) . '"></use> ';
  // markup to use as a fallback for browsers that do not support SVGs
  if ($args['fallback']) {
    $svg .= '<span class="svg-fallback icon-' . esc_attr($args['icon']) . '"></span>';
  }
