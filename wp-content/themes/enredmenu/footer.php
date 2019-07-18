<?php /* SITE FOOTER */ ?>
</div> <!-- #content -->
  <footer id="colophon" class="site-footer">
    <h2>This is the Site Footer</h2>
    <p>Tristique vitae vitae aliquam. Eros purus, sed maecenas dolor sapien vel nunc pellentesque, hymenaeos luctus nulla auctor, elit aliquam ante. Dignissim vestibulum a praesent rutrum luctus, ut sed dictumst rutrum augue turpis integer, faucibus pede leo morbi fringilla accumsan aliquam.</p>
    <nav class="social-navigation" role="navigation" aria-label="<?php esc_attr_e('Footer Social Links Menu', 'enredmenu'); ?>">
      <?php
      wp_nav_menu(array(
        'theme_location'      => 'social',
        'menu_class'          => 'social-links-menu',
        'depth'               => 1,
        'link_before'         => '<span class="screen-reader-text">',
        'link_after'          => '</span>' . enredmenu_get_svg(array('icon' => 'chain')),
      ));
      ?>
    </nav>
  </footer>
  </div> <!-- #page .site -->
  <?php wp_footer(); ?>
</body>
</html>
