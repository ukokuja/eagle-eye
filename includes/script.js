// Article  Javascript 

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





// Javascript on Form - Error  
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



//Navigate Javascript

var stops = [{
    name: "Ein Gedi",
    location: [31.469835,35.3283313],
},
{
    name: "First stop",
    location: [31.465169,35.3521382],
},
{
    name: "Second stop",
    location: [31.459354,35.3579443]
},
{
    name: "Third stop",
    location: [31.455787,35.3677043],
}]
var drones = [{
    name: "Back",
    location: [31.465718,35.3510653]
},
{
    name: "Right",
    location: [31.465718,35.3516873]
},
{
    name: "Front",
    location: [31.465169,35.3521382]
},
{
    name: "Left",
    location: [31.464931,35.3515913]
}]
$(document).ready(() => {
    var map = L.map('map', {
        center: [31.4664,35.387983],
        zoom: 5,
        preferCanvas: true,
        zoomControl: false
    });
    // couche OpenStreetMap
    var Stadia_AlidadeSmoothDark = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
        maxZoom: 20
    });
    map.addLayer(Stadia_AlidadeSmoothDark);
    
    map.setView(new L.LatLng(31.465718,35.3510653), 17);
    for (var i in drones) {
        drones[i].drone = setDrone(map, drones[i].location)
    }
    var dots = [];
    for (var i in stops) {
        L.marker(stops[i].location).addTo(map);
        dots.push(stops[i].location)
    }
    
    var polyline = L.polyline(dots, {color: '#AAA', dashArray: "20, 15", weight: 5, 
    lineJoin: 'round'}).addTo(map);

    setInterval(function (){
        for (var i in drones) {
            drones[i].location = [drones[i].location[0] - 0.00005, drones[i].location[1] + 0.00005]
            drones[i].drone.setLatLng(drones[i].location); 
        }
        map.panTo(new L.LatLng(drones[2].location[0], drones[2].location[1]), {animation: true});
    }, 1000)

    $('header > section').click(function (){
        $('body').toggleClass('isHamburgerOpen');
    })
    $('#map').click(function(){
        $('body').removeClass('isHamburgerOpen');
    })

})


function setDrone (map, pos) {
    var myIcon = L.icon({
        iconUrl: '/images/logo.png',
        iconSize: [50, 50],
    });
    return L.marker(pos, {icon: myIcon}).addTo(map);
}



