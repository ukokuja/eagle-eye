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



