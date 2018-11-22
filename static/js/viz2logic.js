var trace1 = {
  x: [0, 1, 2, 3, 4, 5], 
  y: [1.5, 1, 1.3, 0.7, 0.8, 0.9], 
  type: 'scatter'
};

var traces = [];
var i = "-1";
function seti(index) {
  i = index;
  d3.json('/data', graph1);
}
  function graph1(response) {
    // Loop through the data
    var trace1 = {};
    sum = {"ENERGY STAR Score": 0, 
       "ENERGY STAR Score LR": 0,
       "ENERGY STAR Score ML2": 0,
       "plug_load_consumption": 0};
    
    data = {};
    
    for (var index = 0; index < response.length; index++) {
      var location = response[index];
      sum.ac_consumption += location.ac_consumption;
      sum.domestic_gas += location.domestic_gas;
      sum.heating_gas += location.heating_gas;
      sum.plug_load_consumption += location.plug_load_consumption;
      //console.log(location);
      //console.log(location.index);
      if(location.index == i){
        data = location;
        // //console.log(data);
      }
    }
    trace1 = {
      x: ["AC Consumption", "Domestic Gas", "Heating Gas", "Plug Load Consumption"],
      y: [data.ac_consumption, data.domestic_gas, data.heating_gas, data.plug_load_consumption],
      name: 'Selected Property',
      type: 'bar'
    };
    trace2 = {
      x: ["AC Consumption", "Domestic Gas", "Heating Gas", "Plug Load Consumption"],
      y: [sum.ac_consumption/response.length, 
        sum.domestic_gas/response.length, 
        sum.heating_gas/response.length, 
        sum.plug_load_consumption/response.length],
      name: 'Mean Value',
      type: 'bar'

    }
    const layout = {
      showlegend: true,
      legend: {"orientation": "h"},
      title: `Annual Energy Consumption for selected building : ${data.energy} kwh`,
      yaxis: {
        title: 'Energy Consumption'
      }
    };
    //console.log(trace1);
    traces = [trace1, trace2];
  //Plotly.newPlot('viz2', traces,layout);
}

function graph2(response) {
  // Loop through the data
  var trace1 = {};
  sum = {"ac_consumption": 0, "domestic_gas": 0, "heating_gas": 0, "plug_load_consumption": 0};
  
  data = {};
  
  for (var index = 0; index < response.length; index++) {
    var location = response[index];
    sum.ac_consumption += location.ac_consumption;
    sum.domestic_gas += location.domestic_gas;
    sum.heating_gas += location.heating_gas;
    sum.plug_load_consumption += location.plug_load_consumption;
    //console.log(location);
    //console.log(location.index);
    if(location.index == i){
      data = location;
      // //console.log(data);
    }
  }
  trace1 = {
    x: ["AC Consumption", "Domestic Gas", "Heating Gas", "Plug Load Consumption"],
    y: [0, 0,0, 0],
    name: 'Selected Property',
    type: 'bar'
  };
  trace2 = {
    x: ["AC Consumption", "Domestic Gas", "Heating Gas", "Plug Load Consumption"],
    y: [sum.ac_consumption/response.length, 
      sum.domestic_gas/response.length, 
      sum.heating_gas/response.length, 
      sum.plug_load_consumption/response.length],
    name: 'Mean Value',
    type: 'bar'

  }
  const layout = {
    showlegend: true,
    legend: {"orientation": "h"},
    title: `Mean Annual Energy Consumption in kWh`,
    yaxis: {
      title: 'Energy Consumption'
    }
  };
  //console.log(trace1);
  traces = [trace1, trace2];
//Plotly.newPlot('viz2', traces,layout);
}
//d3.json('/data', graph2);
//Plotly.newPlot('viz2', data);