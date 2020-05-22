$(document).ready(function () {
    $(window).on('scroll',function() {
        var scroll = $(window).scrollTop(); // how many pixels you've scrolled
        var descriptionTop = $('#description').offset().top; // pixels to the top of div1
        var descriptionHeight = $('#description').height(); // height of div1 in pixels
        var detailsTop = $('#details').offset().top; // pixels to the top of div1
        var detailsHeight = $('#details').height(); // height of div1 in pixels
        // if you've scrolled further than the top of div1 plus it's height
        // change the color. either by adding a class or setting a css property
        if(scroll + 50 > descriptionTop + descriptionHeight){
            $('.nav-item:nth-of-type(1)').removeClass('active');
            if(scroll + 50 > detailsTop + detailsHeight){
                $('.nav-item:nth-of-type(3)').addClass('active');
                $('.nav-item:nth-of-type(2)').removeClass('active');
            } else {
                $('.nav-item:nth-of-type(2)').addClass('active');
                $('.nav-item:nth-of-type(3)').removeClass('active');
            }
        } else {
            $('.nav-item:nth-of-type(1)').addClass('active');
            $('.nav-item:nth-of-type(2)').removeClass('active');
        }
    });
})