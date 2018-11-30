
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
    y_selected = [data["score"], data["LR Score"]].map(Math.round);
    y_mean = [sum["ENERGY STAR Score"]/response.length,
    sum["ENERGY STAR Score LR"]/response.length].map(Math.round);
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
      y: y_selected,
      text: y_selected.map(String),
      textposition: 'auto',
      hoverinfo: 'none',
      name: 'Selected Property',
      type: 'bar',
      marker: {
        color: 'rgb(55, 83, 109)',
        opacity: 1,
      }
    };
    trace2 = {
      x: ["Actual", "LR"
      // ,
      // "ML1", 
      // "ML2",
      // "ML3",
      // "ML4"
      ],
      y: y_mean,
      text: y_mean.map(String),
      textposition: 'auto',
      hoverinfo: 'none',
      name: 'Mean Value',
      type: 'bar',
      marker: {
        color: 'rgb(26, 118, 255)',
        //color: 'rgb(204,204,204)',
        opacity: 1
      }

    }
    const layout = {
      showlegend: true,
      legend: {"orientation": "h"},
      title: `Energy Star Score prediction from different ML algorithms`,
      xaxis: {tickfont: {
        size: 14,
        color: 'rgb(107, 107, 107)'
      }},
      yaxis: {
        title: 'Energy Star Score',
        titlefont: {
          size: 16,
          color: 'rgb(107, 107, 107)'
        },
        tickfont: {
          size: 14,
          color: 'rgb(107, 107, 107)'
        }
      },
      barmode: 'group',
      bargroupgap: 0.1


    };
    console.log(i);
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