let map;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 14.1226, lng: 100.8248 },
    zoom: 6
  });

  // Load the GeoJSON file
  map.data.loadGeoJson('path/to/thailand.geojson');

  // Style the GeoJSON layer
  map.data.setStyle({
    fillColor: 'red',
    strokeColor: 'red',
    strokeWeight: 2
  });
}
