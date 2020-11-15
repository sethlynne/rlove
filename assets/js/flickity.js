var $carousel = $('.carousel').flickity({
  prevNextButtons: false
});

$('.carousel-nav-buttons').on( 'click', '.nav-item', function() {
  var index = $(this).index();
  $carousel.flickity( 'select', index );
  $(".nav-item").removeClass("active");
  $(this).addClass("active");
});
