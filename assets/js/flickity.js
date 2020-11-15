var $carousel = $('.carousel').flickity({
  prevNextButtons: false,
});


$( function() {
  // trigger play on all videos
  $carousel.find('video').each( function( i, video ) {
    video.play();
  });

  $('.carousel-nav-buttons').on( 'click', '.nav-item', function() {
    var index = $(this).index();
    $carousel.flickity( 'select', index );
    $(".nav-item").removeClass("active");
    $(this).addClass("active");
  });
});
