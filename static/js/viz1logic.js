// MAP VISUALIZATION, id = viz1 
// Create a Leaflet map with markers marking each location from the json

function createMap(markerLayers) {
  console.log(markerLayers);
  // Create the tile layer that will be the background of our map
  var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.light",
  accessToken: API_KEY
  });
  // Additional Tile Layers 1
  googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
    maxZoom: 18,
    subdomains:['mt0','mt1','mt2','mt3']
  });
  // Additional Tile Layers 2
  googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
    maxZoom: 18,
    subdomains:['mt0','mt1','mt2','mt3']
  });
  // Additional Tile Layers 3
  googleTerrain = L.tileLayer('http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
  });
  // Additional Tile Layers 4
  var baseMaps = {
    "Base Map" : lightmap,
    "Satellite": googleSat,
    "Google Street" : googleStreets,
    "Terrain": googleTerrain
  
    };

    
  // Overlays for different Machine Learning Energy Scores  
  var overlayMaps = {
    "Actual Energy Scores": markerLayers[0],
    "LR Energy Scores": markerLayers[1],
    "ML1 Energy Scores": markerLayers[2],
    "ML2 Energy Scores": markerLayers[3],
    "ML3 Energy Scores": markerLayers[4],
    "ML4 Energy Scores": markerLayers[5]
  };

  // Grab the div id and insert all the layers
  var map = L.map("viz1", {
    center: [40.73, -74.0059],
    zoom: 10,
    layers: [lightmap, markerLayers[0]]
  });

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

  L.control.layers(baseMaps, overlayMaps, {collapsed: false}).addTo(map);
  //L.control.layers(overlayMaps).addTo(map);
  
  
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

function findScore(i, location) {
  switch(i) {
    case 0 :
      return getColor(location["ENERGY STAR Score"]);
      break;
    case 1 :
      return getColor(location["ENERGY STAR Score LR"]);
      break;
    case 2 :
      return getColor(location["ENERGY STAR Score ML1"]);
      break;
    case 3 :
      return getColor(location["ENERGY STAR Score ML2"]);
      break;
    case 4 :
      return getColor(location["ENERGY STAR Score ML3"]);
      break;
    case 5 :
      return getColor(location["ENERGY STAR Score ML4"]);
      break;
  }
}

function createMarkers(response) {

  // Initialize an array to hold property markers
  var propertyMarkers = [[],[],[],[],[],[]];
  console.log(response);
  var circle=[];
  

  // Loop through the datajson
  for (var index = 0; index < response.length; index++) {
    var location = response[index];
    console.log([location.Latitude, location.Longitude,
      location["Electricity Use - Grid Purchase (kBtu)"],
      location["Property Id"]],
      location["ENERGY STAR Score"]
      );
    if(!location.Latitude || !location.Longitude) {
      continue;
    }
    for(i =0;i<=5;i++) {
      circle[i] = L.circle([location.Latitude, location.Longitude], {
        color: 'black' ,
        weight: 1,
        opacity: 0.7,
        fillColor: findScore(i, location),
        fillOpacity: 0.7,
        radius: 500
      });
      circle[i].bindPopup(location["Property Name"]);
      // Binding index value to the marker for use in graph 1 to obtain the data element that was clicked
      circle[i].index = location["Property Id"];
      propertyMarkers[i].push(circle[i]);
    }
  }
  var markerLayers =[];
  for(i = 0; i<=5; i++) {
    markerLayers.push(L.featureGroup(propertyMarkers[i])
    .on('click', function(event) { 
      console.log(event);
      seti(event.layer.index); 
    })
    
    );
  }
  // Create a layer group made from the property markers array, pass it into the createMap function
  createMap(markerLayers);
}

// Perform a call to the /data page to get station information in json format. Call createMarkers when complete
d3.json('/data', createMarkers);





