/* global zero17ScreenReaderText */
(function ($) {
  // variables and DOM catching
  let $body = $('body');
  let $customHeader = $body.find('.custom-header');
  let $siteHeader = $body.find('.site-header');
  let $branding = $customHeader.find('.site-branding');
  let $navigation = $body.find('.navigation-top');
  let $navWrap = $navigation.find('.wrap');
  let $navMenuItem = $navigation.find('.menu-item');
  let $menuToggle = $navigation.find('.menu-toggle');
  let $menuScrollDown = $body.find('.menu-scroll-down');
  let $sidebar = $body.find('#secondary')
  let $entryContent = $body.find('.entry-content');
  let $formatQuote = $body.find('.format-quote blockquote');
  let isFrontPage = $body.hasClass('zero17-front-page') || $body.hasClass('home blog');
  let navigationFixedClass = 'site-navigation-fixed';
  let navigationHeight;
  let navigationOuterHeight;
  let navPadding;
  let navMenuItemHeight;
  let idealNavHeight;
  let navIsNotTooTall;
  let headerOffset;
  let menuTop = 0;
  let resizeTimer;
  // ensure the sticky navigation doesn't cover current focused links
  $('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex], [contenteditable]', '.site-content-contain').filter(':visible').focus(function () {
    if ($navigation.hasClass('site-navigation-fixed')) {
      let windowScrollTop = $(window).scrollTop();
      let fixedNavHeight = $navigation.height();
      let itemScrollTop = $(this).offset().top;
      let offsetDiff = itemScrollTop - windowScrollTop;
      // account for admin bar
      if ($('#wpadminbar').length) {
        offsetDiff -= $('#wpadminbar').height();
      }
      if (offsetDiff < fixedNavHeight) {
        $(window).scrollTo(itemScrollTop - (fixedNavHeight + 50), 0);
      }
    }
  });

  // set properties of navigation
  function setNavProps() {
    navigationHeight = $navigation.height();
    navigationOuterHeight = $navigation.outerHeight();
    navPadding = parseFloat($navWrap.css('padding-top')) * 2;
    navMenuItemHeight = $navMenuItem.outerHeight() * 2;
    idealNavHeight = navPadding + navMenuItemHeight;
    navIsNotTooTall = navigationHeight <= idealNavHeight;
  }

  // make navigation stick
  function adjustScrollClass() {
    // make sure we are not on a mobile screen
    if ('none' === $menuToggle.css('display')) {
      // make sure the nav is not taller than two rows
      if (navIsNotTooTall) {
        headerOffset = $siteHeader.outerHeight();
        // if the scroll is more than the custom header, set the fixed class
        if ($(window).scrollTop() >= headerOffset) {
          $navigation.addClass(navigationFixedClass);
        } else {
          $navigation.removeClass(navigationFixedClass);
        }
      } else {
        // remove fixed class if nav is taller than two rows
        $navigation.removeClass(navigationFixedClass);
      }
    }
  }

  // set margins of branding header
  function adjustHeaderHeight() {
    if ('none' === $menuToggle.css('display')) {
      //the margin should be applied to different elements on front-page or home vs. interior pages
      if (isFrontPage) {
        $branding.css('margin-bottom', navigationOuterHeight);
      } else {
        $customHeader.css('margin-bottom', navigationOuterHeight);
      }
    } else {
      $customHeader.css('margin-bottom', '0');
      $branding.css('margin-bottom', 0);
    }
  }

  // set icon for quotes
  function setQuotesIcon() {
    $(enredmenuScreenReaderText.quote).prependTo($formatQuote);
  }

  // add 'below-entry-meta' class to elements
  function belowEntryMetaClass(param) {
    let sidebarPos;
    let sidebarPosBottom;
    if (!$body.hasClass('has-sidebar') || (
      $body.hasClass('search') ||
      $body.hasClass('single-attachment') ||
      $body.hasClass('error404') ||
      $body.hasClass('zero17-front-page')
    )) {
      return;
    }
    sidebarPos = $sidebar.offset();
    sidebarPosBottom = sidebarPos.top + ($sidebar.height() + 28);
    $entryContent.find(param).each(function () {
      let $element = $(this);
      let elementPos = $element.offset();
      let elementPosTop = elementPos.top;
      // add 'below entry meta' to elements below the entry meta
      if (elementPosTop > sidebarPosBottom) {
        $element.addClass('below-entry-meta');
      } else {
        $element.removeClass('below-entry-meta');
      }
    });
  }

  // test if inline SVGs are supported
  function supportsInlineSVG() {
    let div = document.createElement('div');
    div.innerHTM = '<svg/>';
    return 'http://www.w3.org/2000/svg' === ('undefined' !== typeof SVGRect && div.firstChild && div.firstChild.namespaceURI);
  }
  // test if it is an iOS device
  function checkiOS() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  }
  // test if background attachment: fixed is supported
  function supportsFixedBackground() {
    let el = document.createElement('div');
    let isSupported;
    try {
      if (!('backgroundAttachment' in el.style) || checkiOS()) {
        return false;
      }
      el.style.backgroundAttachment = 'fixed';
      isSupported = ('fixed' === el.style.backgroundAttachment);
      return isSupported;
    } catch (e) {
      return false;
    }
  }
  // fire on document ready
  $(document).ready(function () {
    // if navigation menu is present on page, set NavProps and adjustScrollClass
    if ($navigation.length) {
      setNavProps();
      adjustScrollClass();
    }
    // is scroll down arrow present on page, calculate scroll offset and bind an event handler to the click event
    if ($menuScrollDown.length) {
      if ($('body').hasClass('admin-bar')) {
        menuTop -= 32;
      }
      if ($('body').hasClass('blog')) {
        menuTop -= 30;
      }
      if (!$navigation.length) {
        navigationOuterHeight = 0;
      }
      $menuScrollDown.click(function (e) {
        e.preventDefault();
        $(window).scrollTo('#primary', {
          duration: 600,
          offset: { top: menuTop - navigationOuterHeight }
        });
      });
    }
    adjustHeaderHeight();
    setQuotesIcon();
    if (true === supportsInlineSVG()) {
      document.documentElement.className = document.documentElement.className.replace(/(\s*)no-svg(\svg*)/, '$1svg$2');
    }
    if (true === supportsFixedBackground()) {
      document.documentElement.className += ' background-fixed';
    }
  });
  // if navigation menu is present on page, adjust it on scroll and screen size
  if ($navigation.length) {
    // on scroll, we want to stick/unstick the navigation
    $(window).on('scroll', function () {
      adjustScrollClass();
      adjustHeaderHeight();
    });
    // make sure navigation is where it should be on resize
    $(window).resize(function () {
      setNavProps();
      setTimeout(adjustScrollClass, 500);
    });
  }
  $(window).resize(function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      belowEntryMetaClass('blockquote.alignleft, blockquote.alignright');
    }, 300);
    setTimeout(adjustHeaderHeight, 1000);
  });
  // add header video class after the video is loaded
  $(document).on('wp-custom-header-video-loaded', function () {
    $body.addClass('has-header-video');
  });
})(jQuery);
