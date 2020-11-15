var $carousel = $('.carousel').flickity({
  prevNextButtons: false,
});

// trigger play on all videos
$carousel.find('video').get(0).play();

$('.carousel-nav-buttons').on( 'click', '.nav-item', function() {
  var index = $(this).index();
  $carousel.flickity( 'select', index );
  $(".nav-item").removeClass("active");
  $(this).addClass("active");
});
