/* global enredmenuScreenReaderText */
/* contains handlers for navigation and widget area */
(function ($) {
  let masthead, menuToggle, siteNavContain, siteNavigation;
  function initMainNavigation(container) {
    // Add dropdown toggle that displays child menu items.
    let dropdownToggle = $('<button />', { 'class': 'dropdown-toggle', 'aria-expanded': false })
      .append(enredmenuScreenReaderText.icon)
      .append($('<span />', { 'class': 'screen-reader-text', text: enredmenuScreenReaderText.expand }));
    container.find('.menu-item-has-children > a, .page_item_has_children > a').after(dropdownToggle);
    // set the active submenu dropdown toggle button initial state
    container.find('.current-menu-ancestor > button')
      .addClass('toggled-on')
      .attr('aria-expanded', 'true')
      .find('.screen-reader-text')
      .text(enredmenuScreenReaderText.collapse);
    // set the active submenu initial state
    container.find('.current-menu-ancestor > .sub-menu').addClass('toggled-on');
    container.find('.dropdown-toggle').click(function (e) {
      let _this = $(this);
      let screenReaderSpan = _this.find('.screen-reader-text');

      e.preventDefault();
      _this.toggleClass('toggled-on');
      _this.next('.children, .sub-menu').toggleClass('toggled-on');
      _this.attr('aria-expanded', _this.attr('aria-expanded') === 'false' ? 'true' : 'false');
      screenReaderSpan.text(screenReaderSpan.text() === enredmenuScreenReaderText.expand ? enredmenuScreenReaderText.collapse : enredmenuScreenReaderText.expand);
    });
  }
  initMainNavigation($('.main-navigation'));
  masthead = $('#masthead');
  menuToggle = masthead.find('.menu-toggle');
  siteNavContain = masthead.find('.main-navigation');
  siteNavigation = masthead.find('.main-navigation > div > ul');
  // enable menuToggle
  (function () {
    // return early if menuToggle is missing
    if (!menuToggle.length) {
      return;
    }
    // add an initial value for the attribute
    menuToggle.attr('aria-expanded', 'false');
    menuToggle.on('click.enredmenu', function () {
      siteNavContain.toggleClass('toggled-on');
      $(this).attr('aria-expanded', siteNavContain.hasClass('toggled-on'));
    });
  })();
  // fix submenus for touch devices and better focus for hidden submenu items for accessibility
  (function () {
    if (!siteNavigation.length || !siteNavigation.children().length) {
      return;
    }
    // toggle `focus` class to allow submenu access on tablets
    function toggleFocusClassTouchScreen() {
      if ('none' === $('.menu-toggle').css('display')) {
        $(document.body).on('touchstart.enredmenu', function (e) {
          if (!$(e.target).closest('.main-navigation li').length) {
            $('.main-navigation li').removeClass('focus');
          }
        });
        siteNavigation.find('.menu-item-has-children > a, .page_item_has_children > a').on('touchstart.enredmenu', function (e) {
          let el = $(this).parent('li');
          if (!el.hasClass('focus')) {
            e.preventDefault();
            el.toggleClass('focus');
            el.sibling('.focus').removeClass('focus');
          }
        });
      } else {
        siteNavigation.find('.menu-item-has-children > a, .page_item_has_children > a').unbind('touchstart.enredmenu');
      }
    }
    if ('ontouchstart' in window) {
      $(window).on('resize.enredmenu', toggleFocusClassTouchScreen);
      toggleFocusClassTouchScreen();
    }
    siteNavigation.find('a').on('focus.enredmenu blur.enredmenu', function () {
      $(this).parents('.menu-item, .page_item').toggleClass('focus');
    });
  })();
})(jQuery);
