
var traces = [];
var i = "-1";
function seti(index) {
  i = index;
  d3.json('/data', graph1);
}
  function graph1(response) {
    // Loop through the data
    var trace1 = {};
    sum = {
      "ENERGY STAR Score": 0, 
      "ENERGY STAR Score LR": 0
      // ,
      // "ENERGY STAR Score ML1": 0,
      // "ENERGY STAR Score ML2": 0,
      // "ENERGY STAR Score ML3": 0,
      // "ENERGY STAR Score ML4": 0  
    };
    
    data = {};
    
    for (var index = 0; index < response.length; index++) {
      var location = response[index];
      sum["ENERGY STAR Score"] += location["score"];
      sum["ENERGY STAR Score LR"] += location["LR Score"];
      // sum["ENERGY STAR Score ML1"] += location["ENERGY STAR Score ML1"];
      // sum["ENERGY STAR Score ML2"] += location["ENERGY STAR Score ML2"];
      // sum["ENERGY STAR Score ML3"] += location["ENERGY STAR Score ML3"];
      // sum["ENERGY STAR Score ML4"] += location["ENERGY STAR Score ML4"];
      // //console.log(location);
      //console.log(location.index);
      if(location["index"] == i){
        data = location;
        console.log(data);
      }
    }
    trace1 = {
      x: ["Actual", 
          "LR"
          // ,
          // "ML1"
          // // , 
          // "ML2",
          // "ML3",
          // "ML4"
        ],
      y: [data["score"], data["LR Score"]
          // , 
          // data["ENERGY STAR Score ML1"], data["ENERGY STAR Score ML2"],
          // data["ENERGY STAR Score ML3"], data["ENERGY STAR Score ML4"]
        ],
      name: 'Selected Property',
      type: 'bar'
    };
    trace2 = {
      x: ["Actual", "LR"
      // ,
      // "ML1", 
      // "ML2",
      // "ML3",
      // "ML4"
      ],
      y: [sum["ENERGY STAR Score"]/response.length,
        sum["ENERGY STAR Score LR"]/response.length
        // , 
        // sum["ENERGY STAR Score ML1"]/response.length,
        // sum["ENERGY STAR Score ML2"]/response.length,
        // sum["ENERGY STAR Score ML3"]/response.length,
        // sum["ENERGY STAR Score ML4"]/response.length
      ],
      name: 'Mean Value',
      type: 'bar'

    }
    const layout = {
      showlegend: true,
      legend: {"orientation": "h"},
      title: `Energy Star Score prediction from different ML algorithms`,
      yaxis: {
        title: 'Energy Star Score'
      }
    };
    //console.log(trace1);
    traces = [trace1, trace2];
  Plotly.newPlot('viz2', traces,layout);
}

// function graph2(response) {
//   // Loop through the data
//   var trace1 = {};
//   sum = {
//     "ENERGY STAR Score": 0, 
//     "ENERGY STAR Score LR": 0,
//     "ENERGY STAR Score ML2": 0,
//     "ENERGY STAR Score ML2": 0,
//     "ENERGY STAR Score ML3": 0,
//     "ENERGY STAR Score ML4": 0  
//   };

//   data = {};
  
//   for (var index = 0; index < response.length; index++) {
//       var location = response[index];
//       sum["ENERGY STAR Score"] += location["ENERGY STAR Score"];
//       sum["ENERGY STAR Score LR"] += location["ENERGY STAR Score LR"];
//       sum["ENERGY STAR Score ML1"] += location["ENERGY STAR Score ML1"];
//       sum["ENERGY STAR Score ML2"] += location["ENERGY STAR Score ML2"];
//       sum["ENERGY STAR Score ML3"] += location["ENERGY STAR Score ML3"];
//       sum["ENERGY STAR Score ML4"] += location["ENERGY STAR Score ML4"];
//       //console.log(location);
//       //console.log(location.index);
//       if(location.index == i){
//         data = location;
//         // //console.log(data);
//       }
//   }
  
//   trace1 = {
//     x: ["AC Consumption", "Domestic Gas", "Heating Gas", "Plug Load Consumption"],
//     y: [0, 0,0, 0],
//     name: 'Selected Property',
//     type: 'bar'
//   };
//   trace2 = {
//     x: ["AC Consumption", "Domestic Gas", "Heating Gas", "Plug Load Consumption"],
//     y: [sum.ac_consumption/response.length, 
//       sum.domestic_gas/response.length, 
//       sum.heating_gas/response.length, 
//       sum.plug_load_consumption/response.length],
//     name: 'Mean Value',
//     type: 'bar'

//   }
//   const layout = {
//     showlegend: true,
//     legend: {"orientation": "h"},
//     title: `Mean Annual Energy Consumption in kWh`,
//     yaxis: {
//       title: 'Energy Consumption'
//     }
//   };
//   //console.log(trace1);
//   traces = [trace1, trace2];
// //Plotly.newPlot('viz2', traces,layout);
// }
d3.json('/data', graph1);
//Plotly.newPlot('viz2', data);