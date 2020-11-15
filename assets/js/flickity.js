var $carousel = $('.carousel').flickity({
  prevNextButtons: false,
});


$( function() {
  // trigger play on all videos
  $carousel.find('video').each( function( i, video ) {
    video.play();
  });

  // get Flickity instance
  var flkty = $carousel.data('flickity');

  function playOnSelect() {
    var video = flickity.selectedElement.querySelector('video');
    video.play();
  }

  // play initial video
  playOnSelect();
  // play video on select
  $carousel.on( 'select.flickity', playOnSelect );

  $('.carousel-nav-buttons').on( 'click', '.nav-item', function() {
    var index = $(this).index();
    $carousel.flickity( 'select', index );
    $(".nav-item").removeClass("active");
    $(this).addClass("active");
  });
});
