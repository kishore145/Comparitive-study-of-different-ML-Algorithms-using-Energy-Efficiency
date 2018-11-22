// MAP VISUALIZATION, id = viz1 
// Create a Leaflet map with markers marking each location from the json

function createMap(properties) {
  // Create the tile layer that will be the background of our map
  var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.light",
  accessToken: API_KEY
  });

  googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
    maxZoom: 18,
    subdomains:['mt0','mt1','mt2','mt3']
  });

  googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
    maxZoom: 18,
    subdomains:['mt0','mt1','mt2','mt3']
  });

  googleTerrain = L.tileLayer('http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
  });

  var baseMaps = {
    "Base World Map" : lightmap,
    "Satellite": googleSat,
    "Google Street" : googleStreets,
    "Terrain": googleTerrain
  
    };

  var overlayMaps = {
    "Properties": properties
  };

  // Grab the div id and insert all the layers
  var map = L.map("viz1", {
    center: [40.73, -74.0059],
    zoom: 10,
    layers: [lightmap, properties]
  });

  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(map);

  var legend = L.control({position: 'bottomright'});

  legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 20, 30, 40, 50, 60, 70, 80, 90],
        labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};

legend.addTo(map);

}

function getColor(d) {
  return d > 90 ? '#a50026' :
         d > 80  ? '#d73027' :
         d > 70  ? '#f46d43' :
         d > 60  ? '#fdae61' :
         d > 50   ? '#fee08b' :
         d > 40   ? '#d9ef8b' :
         d > 30 ? '#a6d96a' :
         d > 20  ? '#66bd63' :
         d > 10  ? '#1a9850' :
                    '#006837';
}

function createMarkers(response) {

  // Initialize an array to hold property markers
  var propertyMarkers = [];
  console.log(response);

  

  // Loop through the datajson
  for (var index = 0; index < response.length; index++) {
    var location = response[index];
    
    console.log([location.Latitude, location.Longitude,
      location["Electricity Use - Grid Purchase (kBtu)"],
      location["Property Id"]],
      location["ENERGY STAR Score"]
      );

      var circle = L.circle([location.Latitude, location.Longitude], {
        color: 'black' ,
        weight: 1,
        opacity: 0.7,
        fillColor: getColor(location["ENERGY STAR Score"]),
        fillOpacity: 0.7,
        radius: 500
      });
      circle.bindPopup(location["Property Name"]);
      propertyMarkers.push(circle);
    
    // Binding index value to the marker for use in graph 1 to obtain the data element that was clicked
    circle.index = location["Property Id"];
    
    }

  // Create a layer group made from the property markers array, pass it into the createMap function
  createMap(L.featureGroup(propertyMarkers)
  .on('click', function(event) { 
    console.log(event);
    
  })
  );
}

// Perform a call to the /data page to get station information in json format. Call createMarkers when complete
d3.json('/data', createMarkers);





