$(document).ready(function () {
    var isDisplayFooter = true;
    $(window).on('scroll',function() {
        var scroll = $(window).scrollTop(); // how many pixels you've scrolled
        var descriptionTop = $('#description').offset().top; // pixels to the top of div1
        var descriptionHeight = $('#description').height(); // height of div1 in pixels
        var detailsTop = $('#details').offset().top; // pixels to the top of div1
        var detailsHeight = $('#details').height(); // height of div1 in pixels
        var itineraryTop = $('#itinerary').offset().top; // pixels to the top of div1
        var itineraryHeight = $('#itinerary').height(); // height of div1 in pixels
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
        if((scroll + 300) > itineraryTop){
            if (isDisplayFooter) {
                $("#footer").fadeOut("fast");
                isDisplayFooter = false;
            }
        } else {
            if (!isDisplayFooter) {
                $("#footer").fadeIn("fast");
                isDisplayFooter = true;
            }
        }
    });
    $("#title").change(function (e) {
        $(".breadcrumbs h2").html(this.value);
    })
    $('#editModal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget) // Button that triggered the modal
        var timeFrom = button.data('timeFrom') // Extract info from data-* attributes
        var timeTo = button.data('timeTo') // Extract info from data-* attributes
        var place = button.data('place') // Extract info from data-* attributes
        // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
        // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
        var modal = $(this)
        modal.find('.modal-title').text(place || "Choose a new stop")
        modal.find('.modal-body #place').val(place)
        modal.find('.modal-body #timeFrom').timepicker('setTime', timeFrom)
        modal.find('.modal-body #timeTo').timepicker('setTime', timeTo)
      })
})






function handleData()
{
    var form_data = new FormData(document.querySelector("form"));
    
    if(!form_data.has("accessability[]")) {
        document.getElementById("checkedError").style.visibility= "visible";
      return false;
    }

    else{
        document.getElementById("checkedError").style.visibility= "hidden";
      return true;
    }    
}