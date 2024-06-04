$('.items').slick({
    centerMode: true, 
    centerPadding: '60px',
    slidesToShow: 5,
    speed: 500,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 3
        }
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 1
        }
      }
    ]
  });

// $(document).ready(function() {
//   $('.items').slick({
//       slidesToShow: 6,
      
//       centerMode: true,
     
      
//   });
// });