$('.my-slider').slick({
    dots: true,
    infinite: false,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,

    responsive: [
      {
        breakpoint: 1150,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
 
    ]
  });



  $('.items').slick({
    centerMode: true,
    slidesToShow: 5,
    responsive: [
      {
        breakpoint: 1300,
        settings: {
          arrows: false,
          centerMode: true,
          slidesToShow: 5
        }
      },
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          centerMode: true,
          slidesToShow: 3
        }
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          centerMode: true,
          slidesToShow: 1
        }
      }
    ]
  });
  
  $('.my_pre').click(function() {
    $('.items').slick('slickPrev');
  });

  $('.my_next').click(function() {
    $('.items').slick('slickNext');
  });


  
   


 

  $('.my-multi').slick({
    dots: true,
    infinite: false,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,

    responsive: [
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
 
    ]
  });

  $('.btn_left').click(function() {
    $('.my-multi').slick('slickPrev');
  });

  $('.btn_right').click(function() {
    $('.my-multi').slick('slickNext');
  });


 