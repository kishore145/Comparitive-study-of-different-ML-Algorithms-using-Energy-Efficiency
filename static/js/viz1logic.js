// MAP VISUALIZATION, id = viz1 
// Create a Leaflet map with markers marking each location from the json

function createMap(markerLayers) {
  //console.log(markerLayers);
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
    "Observed": markerLayers[0],
    "LR": markerLayers[1],
    "SVM": markerLayers[2],
    "RF": markerLayers[3],
    "GB": markerLayers[4],
    "KNN": markerLayers[5],
    "DT": markerLayers[6]
  };

  // Grab the div id and insert all the layers
  var map = L.map("viz1", {
    center: [40.73, -74.0059],
    zoom: 12,
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

  L.control.layers(baseMaps, overlayMaps, {collapsed: true}).addTo(map);
  
  
  
}



function getColor(d) {
  return d > 90 ? '#006837' :
         d > 80  ? '#1a9850'  :
         d > 70  ? '#66bd63':
         d > 60  ? '#a6d96a'  :
         d > 50   ? '#d9ef8b'  :
         d > 40   ? '#fee08b' :
         d > 30 ? '#fdae61' :
         d > 20  ?  '#f46d43' :
         d > 10  ? '#d73027' :
                  '#a50026' ;
}

function findScore(i, location) {
  switch(i) {
    case 0 :
      return getColor(location["score"]);
      break;
    case 1 :
      return getColor(location["lr_score"]);
      break;
    case 2 :
      return getColor(location["svm_score"]);
      break;
    case 3 :
      return getColor(location["random_forest_score"]);
      break;
    case 4 :
      return getColor(location["gb_score"]);
      break;
    case 5 :
      return getColor(location["knn_score"]);
      break;
    case 6 :
      return getColor(location["dt_score"]);
      break;
  }
}

function createMarkers(response) {
  //image();

  // Initialize an array to hold property markers
  var propertyMarkers = [[],[],[],[],[],[],[]];
  console.log(response);
  var circle=[];
  

  // Loop through the datajson
  for (var index = 0; index < response.length; index++) {
    var location = response[index];
    // console.log([location.Latitude, location.Longitude,
    //   location["Electricity Use - Grid Purchase (kBtu)"],
    //   location["Property Id"]],
    //   location["ENERGY STAR Score"]
    //   );
    if(!location.Latitude || !location.Longitude) {
      continue;
    }
    for(i =0;i<=6;i++) {
      circle[i] = L.circle([location.Latitude, location.Longitude], {
        color: 'black' , 
        weight: 0.1,
        opacity: 0.7,
        fillColor: findScore(i, location),
        fillOpacity: 0.7,
        radius: 150
      });

      circle[i].bindPopup(`Actual Energy Score: ${location["score"]}`);
      // Binding index value to the marker for use in graph 1 to obtain the data element that was clicked
      circle[i].index = location["index"];
      console.log(location["score"]);
      console.log(location["index"]);
      propertyMarkers[i].push(circle[i]);
    }
  }
  var markerLayers =[];
  for(i = 0; i<=6; i++) {
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





