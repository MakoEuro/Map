'use strict';

// Utility functions
function onEvent(event, selector, callback) {
    return selector.addEventListener(event, callback);
}

function select(selector, parent = document) {
    return parent.querySelector(selector);
}

function sleep(duration) {
    return new Promise(resolve => {
        setTimeout(resolve, duration);
    })
}

// Selectors
const mapFunc = select('#map');

// - - - - - - - - - - - - -

// Retrieve location
function getLocation() {
    var lon;
    var lat;

    var locPromise = new Promise(function(resolve, reject) {
        navigator.geolocation.getCurrentPosition(function(pos){
            lon = pos.coords.longitude
            lat = pos.coords.latitude;
            resolve({lon,lat});
        });
    });
     
    locPromise.then(function(value) {
        workMap.flyTo ({
            center: [value.lon, value.lat],
            zoom: 10,
            showUserHeading: true
        }) 

        const marker = new mapboxgl.Marker()
            .setLngLat([value.lon, value.lat])
            .addTo(workMap);
    });
}
 
// Fail
function errorHandler(error) {
    console.log(error.message);
}

const options = {
        enableHighAccuracy: true
};

window.onload = function() {
    if (navigator.geolocation) {
        const geo = navigator.geolocation;
        geo.getCurrentPosition(getLocation, errorHandler, options);
        getLocation();    
    } else {
        console.log('Geolocation is not supported by your browser');
    }
}

mapboxgl.accessToken = 'pk.eyJ1IjoibWFrb2V1cm8iLCJhIjoiY2xibDAyNGZ5MDJuYTN2cXg1N3ZscThjdyJ9.gMpm_x3YDzyA-wCpJASBNw';
const workMap = new mapboxgl.Map ({
    container: mapFunc, // container ID
    style: 'mapbox://styles/mapbox/streets-v12', // style URL
    zoom: 3 // starting zoom
});

