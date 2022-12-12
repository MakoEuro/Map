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
function getLocation(position) {
    const { latitude, longitude } = position.coords; 

    return latitude, longitude;
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
    } else {
        console.log('Geolocation is not supported by your browser');
    }
}

mapboxgl.accessToken = 'pk.eyJ1IjoibWFrb2V1cm8iLCJhIjoiY2xibDAyNGZ5MDJuYTN2cXg1N3ZscThjdyJ9.gMpm_x3YDzyA-wCpJASBNw';
const map = new mapboxgl.Map({
    container: mapFunc, // container ID
    style: 'mapbox://styles/mapbox/streets-v12', // style URL
    center: [getLocation()], // starting position [lng, lat]
    zoom: 9 // starting zoom
});

map.on('load', () => {
    map.addLayer({
        id: 'terrain-data',
        type: 'line',
        source: {
            type: 'vector',
            url: 'mapbox://mapbox.mapbox-terrain-v2'
        },
        'source-layer': 'contour'
    });
});