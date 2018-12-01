var traces = [];
var i = "-1";
// function seti(index) {
//   i = index;
//   console.log('Set i is called');
//   d3.json('/data', graph1);
// }
function graph2(response) {
    // Loop through the data
    var yalorithms = ["Linear Regression",
    "Support Vector Machine",
    "Random Forest",
    "Gradient Boosted",
    "k-Nearest Neighbors",
    "Decision Tree"
    ];
    var trace1 = {};
    sum = {
      "ENERGY STAR Score": 0, 
      "ENERGY STAR Score LR": 0,
      "ENERGY STAR Score ML1": 0,
      "ENERGY STAR Score ML2": 0,
      "ENERGY STAR Score ML3": 0,
      "ENERGY STAR Score ML4": 0,
      "ENERGY STAR Score ML5": 0  
    };
    
    data = {};
    
    for (var index = 0; index < response.length; index++) {
      var location = response[index];
      sum["ENERGY STAR Score"] += location["score"];
      sum["ENERGY STAR Score LR"] += location["lr_score"];
      sum["ENERGY STAR Score ML1"] += location["svm_score"];
      sum["ENERGY STAR Score ML2"] += location["random_forest_score"];
      sum["ENERGY STAR Score ML3"] += location["gb_score"];
      sum["ENERGY STAR Score ML4"] += location["knn_score"];
      sum["ENERGY STAR Score ML5"] += location["dt_score"];
      //console.log(location);
      console.log(location.index);
      if(location["index"] == i){
        data = location;
        console.log(data);
      }
    }
    x_rsquared = [0.691744717, 0.784136614, 0.767730262, 0.78613958, 0.660858287, 0.73999756];
    x_meanscore = [
      // sum["ENERGY STAR Score"]/response.length,
      sum["ENERGY STAR Score LR"]/response.length,
      sum["ENERGY STAR Score ML1"]/response.length,
      sum["ENERGY STAR Score ML2"]/response.length,
      sum["ENERGY STAR Score ML3"]/response.length,
      sum["ENERGY STAR Score ML4"]/response.length,
      sum["ENERGY STAR Score ML5"]/response.length
    ].map(Math.round);

    trace1 = {
      y: yalorithms,
      x: x_rsquared,
      text: x_rsquared.map(String),
      xaxis: 'x1',
      yaxis: 'y1',
      textposition: 'auto',
      hoverinfo: 'none',
      name: 'R-Squared Value',
      type: 'bar',
      marker: {
        color: 'rgba(50,171,96,0.6)',
        line: {
          color: 'rgba(50,171,96,1.0)',
          width: 1
        }
      },
      orientation: 'h'
    };
    trace2 = {
      y:  yalorithms,
      x: x_meanscore,
      xaxis: 'x2',
      yaxis: 'y1',
      type: 'bar',
      marker: {
        color: 'rgb(55, 83, 109,0.6)',
        line: {
          color: 'rgb(55, 83, 109, 1.0)',
          width: 1
        }
      },
      text: x_meanscore.map(String),
      textposition: 'auto',
      hoverinfo: 'none',
      name: 'Mean Enery Star Score',
      // type: 'bar',
      // marker: {
      //   color: 'rgb(26, 118, 255)',
      //   //color: 'rgb(204,204,204)',
      //   opacity: 1
      //   // width: 2
      // },
      orientation: 'h'

    };
    const layout = {
      showlegend: true,
      autosize: true,
      legend: {"orientation": "h"},
      title: `R Squared value & Mean Energy Score predictions`,
      yaxis: {automargin: true},
      xaxis1: {
        range: [0, 1],
        domain: [0, 0.5],
        zeroline: false,
        showline: true,
        showticklabels: true,
        showgrid: true,
        automargin: true
      },
      xaxis2: {
        range: [0, 70],
        domain: [0.55, 1],
        zeroline: false,
        showline: true,
        showticklabels: true,
        showgrid: true,
        automargin: true
        // side: 'top',
        // dtick: 0.5
      },
      legend: {
        "orientation": "h"
      },
      // margin: {
      //   l: 100,
      //   r: 20,
      //   t: 200,
      //   b: 70
      // },
      // width: 600,
      // height: 600,
      paper_bgcolor: 'rgb(248,248,255)',
      plot_bgcolor: 'rgb(248,248,255)'
      // annotations: [
      //   {
      //     xref: 'paper',
      //     yref: 'paper',
      //     x: -0.2,
      //     y: -0.109,
      //     text: 'New York City Data',
      //     showarrow: false,
      //     font:{
      //       family: 'Arial',
      //       size: 10,
      //       color: 'rgb(150,150,150)'
      //     }
      //   }
      // ]
    };

    // for ( var i = 0 ; i < x_rsquared.length ; i++ ) {
    //   var result = {
    //     xref: 'x1',
    //     yref: 'y1',
    //     x: x_rsquared[i],
    //     y: yalorithms[i],
    //     text: x_rsquared[i],
    //     font: {
    //       family: 'Arial',
    //       size: 12,
    //       color: 'rgb(50, 171, 96)'
    //     },
    //      showarrow: false,
    //   };
    //   var result2 = {
    //     xref: 'x2',
    //     yref: 'y1',
    //     x: x_meanscore[i],
    //     y: yalorithms[i],
    //     text: x_meanscore[i],
    //     font: {
    //       family: 'Arial',
    //       size: 12,
    //       color: 'rgb(128, 0, 128)'
    //     },
    //      showarrow: false
    //   };
    //   layout.annotations.push(result, result2);
    // }

    console.log(i);
      traces = [trace1, trace2];
      
      Plotly.newPlot('viz2', traces,layout, {responsive: true});
  }

    


d3.json('/data', graph2);
