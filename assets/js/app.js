$(document).ready(function() {

  'use strict';

  $('body').addClass('js-enabled');

  // =====================
  // Branch Init
  // =====================

  (function(b, r, a, n, c, h, _, s, d, k) {
    if (!b[n] || !b[n]._q) {
      for (; s < _.length;) c(h, _[s++]);
      d = r.createElement(a);
      d.async = 1;
      d.src = "https://cdn.branch.io/branch-latest.min.js";
      k = r.getElementsByTagName(a)[0];
      k.parentNode.insertBefore(d, k);
      b[n] = h
    }
  })(window, document, "script", "branch", function(b, r) {
    b[r] = function() {
      b._q.push([r, arguments])
    }
  }, {
    _q: [],
    _v: 1
  }, "addListener applyCode banner closeBanner creditHistory credits data deepview deepviewCta first getCode init link logout redeem referrals removeListener sendSMS setBranchViewData setIdentity track validateCode".split(" "), 0);

  branch.init('key_live_bjGuml6f7W5Z71ToZfx5cpjmxCdCN8Zc');

  function sendSMS(form) {
    var phone = form.phone.value;
    var linkData = {
      tags: [],
      channel: 'Website',
      feature: 'TextMeTheApp',
      data: {
        'foo': 'bar'
      }
    };
    var options = {};
    var callback = function(err, result) {
      if (err) {
        alert("Oops! There was an error. Please try again. An SMS can only be received from a country with the same IP as your mobile device.");
      } else {
        alert("SMS successfully sent! Check your mobile device");
      }
    };
    branch.sendSMS(phone, linkData, options, callback);
    form.phone.value = "";
  }


  // =====================
  // Flickity Carousel
  // =====================

  var $carousel = $('.carousel').flickity({
    prevNextButtons: false,
    imagesLoaded: true,
    lazyLoad: true,
  });

  $('.carousel-nav-buttons').on( 'click', '.nav-item', function() {
    var index = $(this).index();
    $carousel.flickity( 'select', index );
    $(".nav-item").removeClass("active");
    $(this).addClass("active");
  });

  // =====================
  // Members subscription
  // =====================

  // Parse the URL parameter
  function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }

  // Give the parameter a variable name
  var action = getParameterByName('action');
  var stripe = getParameterByName('stripe');

  $(document).ready(function () {
    if (action == 'subscribe') {
      $('body').addClass('subscribe-success');
    }

    if (action == 'signup') {
      window.location = '/signup/?action=checkout';
    }

    if (action == 'checkout') {
      $('body').addClass('signup-success');
    }

    if (action == 'signin') {
      $('body').addClass('signin-success');
    }

    if (stripe == 'success') {
      $('body').addClass('checkout-success');
    }

    $('.c-notification__close').click(function () {
      var uri = window.location.toString();

      $(this).parent().addClass('closed');

      if (uri.indexOf('?') > 0) {
        var clean_uri = uri.substring(0, uri.indexOf('?'));
        window.history.replaceState({}, document.title, clean_uri);
      }
    });
  });

  // =====================
  // Koenig Gallery
  // =====================
  var gallery_images = document.querySelectorAll('.kg-gallery-image img');

  gallery_images.forEach(function (image) {
    var container = image.closest('.kg-gallery-image');
    var width = image.attributes.width.value;
    var height = image.attributes.height.value;
    var ratio = width / height;
    container.style.flex = ratio + ' 1 0%';
  });

  // =====================
  // Decode HTML entities returned by Ghost translations
  // Input: Plus d&#x27;articles
  // Output: Plus d'articles
  // =====================

  function decoding_translation_chars(string) {
    return $('<textarea/>').html(string).text();
  }

  // =====================
  // Responsive layout
  // =====================

  // Init Masonry
  var $masonry_grid = $('.js-grid').masonry({
    itemSelector: '.js-grid__col',
    percentPosition: true
  });

  // Layout Masonry after each image loads
  $masonry_grid.imagesLoaded().progress(function() {
    $masonry_grid.masonry('layout');
  });

  // =====================
  // Off Canvas menu
  // =====================

  $('.js-off-canvas-toggle').click(function(e) {
    e.preventDefault();
    $('.js-off-canvas-content, .js-off-canvas-container').toggleClass('is-active');
  });

  // =====================
  // Post Card Images Fade
  // =====================

  $('.js-fadein').viewportChecker({
    classToAdd: 'is-inview', // Class to add to the elements when they are visible
    offset: 100,
    removeClassAfterAnimation: true
  });

  // =====================
  // Responsive videos
  // =====================

  $('.c-content').fitVids({
    'customSelector': [ 'iframe[src*="ted.com"]'          ,
                        'iframe[src*="player.twitch.tv"]' ,
                        'iframe[src*="dailymotion.com"]'  ,
                        'iframe[src*="facebook.com"]'
                      ]
  });

  // =====================
  // Images zoom
  // =====================

  $('.c-post img').attr('data-action', 'zoom');

  // If the image is inside a link, remove zoom
  $('.c-post a img').removeAttr('data-action');

  // =====================
  // Clipboard URL Copy
  // =====================

  var clipboard = new ClipboardJS('.js-share__link--clipboard');

  clipboard.on('success', function(e) {
    var element = $(e.trigger);

    element.addClass('tooltipped tooltipped-s');
    element.attr('aria-label', clipboard_copied_text);

    element.mouseleave(function() {
      $(this).removeAttr('aria-label');
      $(this).removeClass('tooltipped tooltipped-s');
    });
  });

  // =====================
  // Search
  // =====================

  var search_field = $('.js-search-input'),
      search_results = $('.js-search-results'),
      toggle_search = $('.js-search-toggle'),
      search_result_template = "\
      <a href={{link}} class='c-search-result'>\
        <div class='c-search-result__content'>\
          <h3 class='c-search-result__title'>{{title}}</h3>\
          <time class='c-search-result__date'>{{pubDate}}</time>\
        </div>\
        <div class='c-search-result__media'>\
          <div class='c-search-result__image is-inview' style='background-image: url({{featureImage}})'></div>\
        </div>\
      </a>";

  toggle_search.click(function(e) {
    e.preventDefault();
    $('.js-search').addClass('is-active');

    // If off-canvas is active, just disable it
    $('.js-off-canvas-container').removeClass('is-active');

    setTimeout(function() {
      search_field.focus();
    }, 500);
  });

  $('.c-search, .js-search-close, .js-search-close .icon').on('click keyup', function(event) {
    if (event.target == this || event.target.className == 'js-search-close' || event.target.className == 'icon' || event.keyCode == 27) {
      $('.c-search').removeClass('is-active');
    }
  });

  search_field.ghostHunter({
    results: search_results,
    onKeyUp         : true,
    result_template : search_result_template,
    zeroResultsInfo : false,
    includepages 	: true,
    onPageLoad: false,
    displaySearchInfo: false,
    before: function() {
      search_results.fadeIn();
    }
  });

  // =====================
  // Ajax Load More
  // =====================

  var pagination_next_url = $('link[rel=next]').attr('href'),
    $load_posts_button = $('.js-load-posts');

  $load_posts_button.click(function(e) {
    e.preventDefault();

    var request_next_link =
      pagination_next_url.split(/page/)[0] +
      'page/' +
      pagination_next_page_number +
      '/';

    $.ajax({
      url: request_next_link,
      beforeSend: function() {
        $load_posts_button.text(decoding_translation_chars(pagination_loading_text));
        $load_posts_button.addClass('c-btn--loading');
      }
    }).done(function(data) {
      var posts = $('.js-post-card-wrap', data);

      $('.js-grid').append(posts).masonry('appended', posts);

      $masonry_grid.imagesLoaded().progress(function() {
        $masonry_grid.masonry('layout');
        $('.js-fadein').addClass('is-inview');
      });

      $load_posts_button.text(decoding_translation_chars(pagination_more_posts_text));
      $load_posts_button.removeClass('c-btn--loading');

      pagination_next_page_number++;

      // If you are on the last pagination page, hide the load more button
      if (pagination_next_page_number > pagination_available_pages_number) {
        $load_posts_button.addClass('c-btn--disabled').attr('disabled', true);
      }
    });
  });
});
