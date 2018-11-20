// MAP VISUALIZATION, id = viz1 
// Create a Leaflet map with markers marking each location from the json

function createMap(properties) {

  // Leaflet boilerplate
  var streetmap = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    // Darrin's api key
    accessToken: API_KEY
  });

  var baseMaps = {
    "Street Map": streetmap
  };

  var overlayMaps = {
    "Properties": properties
  };

  // Grab the div id and insert all the layers
  var map = L.map("viz1", {
    center: [40.73, -74.0059],
    zoom: 9,
    layers: [streetmap, properties]
  });

  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  })
  .addTo(map)
  ;
}

function createMarkers(response) {

  // Initialize an array to hold property markers
  var propertyMarkers = [];

  // Define different colored icons
  var redIcon = L.icon({
    iconUrl: '/static/images/red_circle.svg',
    iconSize: [20, 20], // size of the icon
  });

  var yellowIcon = L.icon({
    iconUrl: '/static/images/yellow_circle.svg',
    iconSize: [20, 20], // size of the icon
  });

  var greenIcon = L.icon({
    iconUrl: '/static/images/green_circle.svg',
    iconSize: [20, 20], // size of the icon
  });

  var blackIcon = L.icon({
    iconUrl: '/static/images/black_circle.svg',
    iconSize: [20, 20], // size of the icon
  });


  // Loop through the datajson
  for (var index = 0; index < response.length; index++) {
    var location = response[index];
    var propertyMarker;

    // For each location, create a marker and bind a popup 
    switch (true) {
      case (location.energy > 4000000):
        propertyMarker = L.marker([location.Lat, location.Long]
          , {icon: blackIcon}
          )
          .bindPopup("<h3> Energy_Consumption: " + location.energy + " kWh </h3><h3> Age: " + location.age + " years </h3><h3> # of Stories: " + location.number_stories + "</h3><h3> Square Ft: " +location.square_feet+"</h3>"
          );
      break;

      case (location.energy < 4000000 && location.energy > 40000):
        propertyMarker = L.marker([location.Lat, location.Long]
          , {icon: redIcon}
          )
          .bindPopup("<h3> Energy_Consumption: " + location.energy + " kWh </h3><h3> Age: " + location.age + " years </h3><h3> # of Stories: " + location.number_stories + "</h3><h3> Square Ft: " +location.square_feet+"</h3>"
          );
        break;

      case (location.energy < 40000 && location.energy >= 12650):
        propertyMarker = L.marker([location.Lat, location.Long]
          , { icon: yellowIcon })
          .bindPopup("<h3> Energy_Consumption: " + location.energy + " kWh </h3><h3> Age: " + location.age + " years </h3><h3> # of Stories: " + location.number_stories + "</h3><h3> Square Ft: " +location.square_feet+"</h3>"
          );
          break;

      case (location.energy < 12650):
        propertyMarker = L.marker([location.Lat, location.Long]
          , { icon: greenIcon })
          .bindPopup("<h3> Energy_Consumption: " + location.energy + " kWh </h3><h3> Age: " + location.age + " years </h3><h3> # of Stories: " + location.number_stories + "</h3><h3> Square Ft: " +location.square_feet+"</h3>"
          );
        break;

      default:
        propertyMarker = L.marker([location.Lat, location.Long]
          , { icon: blackIcon })
          .bindPopup("<h3> Energy_Consumption: " + location.energy + " kWh </h3><h3> Age: " + location.age + " years </h3><h3> # of Stories: " + location.number_stories + "</h3><h3> Square Ft: " +location.square_feet+"</h3>"
          );
        break;

    }
    // Binding index value to the marker for use in graph 1 to obtain the data element that was clicked
    propertyMarker.index = location.index;
    
    // Add the marker to the propertyMarkers array
    propertyMarkers.push(propertyMarker);

  }

  // Create a layer group made from the property markers array, pass it into the createMap function
  createMap(L.featureGroup(propertyMarkers)
  .on('click', function(event) { 
    // console.log(event);
    seti(event.layer.index); 
  })
  );
}

// Perform a call to the /data page to get station information in json format. Call createMarkers when complete
d3.json('/data', createMarkers);





