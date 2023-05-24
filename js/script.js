$(document).ready(function () {

    /* Показать - Скрыть город */

    $(".dropbtn-box, .dropdown-content").mouseenter(function(){
      $(".dropdown-content").show(); 
    });
  
    $(".dropbtn-box, .dropdown-content").mouseleave(function(){
      $(".dropdown-content").hide(); 
    });

    /* Мега меню */

    "use strict";
    $('.menu > ul > li:has( > ul)').addClass('menu-dropdown-icon');
    $('.menu > ul > li > ul:not(:has(ul))').addClass('normal-sub');
    $(".menu > ul").before("<span class=\"menu-mobile\">Меню:</span>");
    $(".menu > ul > li").hover(function(e) {
        if ($(window).width() > 768) {
            $(this).children("ul").stop(true, false).fadeToggle(150);
            e.preventDefault();
        }
    });
    $(".menu > ul > li").click(function(e) {
        if (($(window).width() <= 768) && (($(".menu > ul > li").width() - e.offsetX) < 70)) {
            $(this).children("ul").fadeToggle(150);
        }
    });
    $(".menu-mobile").click(function(e) {
        $(".menu > ul").toggleClass('show-on-mobile');
        e.preventDefault();
    });
    

    /* Включаем аккордеон */

    $("#my-accordion").accordionjs();


 });
