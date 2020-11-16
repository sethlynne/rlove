var $carousel = $('.carousel').flickity({
  prevNextButtons: false,
  imagesLoaded: true,
  adaptiveHeight: true,
  lazyLoad: true
});

$('.carousel-nav-buttons').on( 'click', '.nav-item', function() {
  var index = $(this).index();
  $carousel.flickity( 'select', index );
  $(".nav-item").removeClass("active");
  $(this).addClass("active");
});
