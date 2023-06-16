$(document).ready(function(){

    $('.recommended').slick({

       arrows:true,
       dots:false,
       adaptiveHeight:false,
       slidesToShow:4,
       autoplay:false,
       autoplaySpeed:2500,
       responsive: [
                       {
           breakpoint: 1366,
           settings: {
              arrows:false,
             slidesToShow: 2,
             adaptiveHeight:false,
             autoplay:true,
             autoplaySpeed:2500,
           }
         },
         {
           breakpoint: 767,
           settings: {
             slidesToShow: 2,
             adaptiveHeight:false,
             autoplay:true,
             autoplaySpeed:2500,
           }
         }

       ]
    });


    $('.slider-nizbox').slick({

      arrows:true,
      dots:false,
      adaptiveHeight:false,
      slidesToShow:1,
      autoplay:false,
      autoplaySpeed:2500,
      responsive: [
                      {
          breakpoint: 1366,
          settings: {
             arrows:false,
            slidesToShow: 1,
            adaptiveHeight:false,
            autoplay:true,
            autoplaySpeed:2500,
          }
        },
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 1,
            adaptiveHeight:false,
            autoplay:true,
            autoplaySpeed:2500,
          }
        }

      ]
   });

   
   });