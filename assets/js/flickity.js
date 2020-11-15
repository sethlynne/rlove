var $carousel = $('.carousel').flickity({
  prevNextButtons: false,
  autoPlay: true
});

$('.carousel-nav-buttons').on( 'click', '.nav-item', function() {
  var index = $(this).index();
  $carousel.flickity( 'select', index );
  $(".nav-item").removeClass("active");
  $(this).addClass("active");
});
