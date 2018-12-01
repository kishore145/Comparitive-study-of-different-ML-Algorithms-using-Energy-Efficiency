
var traces = [];
var i = "-1";
function seti(index) {
  i = index;
  console.log('Set i is called');
  d3.json('/data', graph1);
}
  function graph1(response) {
    // Loop through the data
    var trace1 = {};
    // sum = {
    //   "ENERGY STAR Score": 0, 
    //   "ENERGY STAR Score LR": 0,
    //   "ENERGY STAR Score ML1": 0,
    //   "ENERGY STAR Score ML2": 0,
    //   "ENERGY STAR Score ML3": 0,
    //   "ENERGY STAR Score ML4": 0,
    //   "ENERGY STAR Score ML5": 0  
    // };
    var data = response[i];
    console.log(`Data.index : ${data.index}, i: ${i}`);
    // data = {};
    
    // for (var index = 0; index < response.length; index++) {
    //   var location = response[index];
    //   sum["ENERGY STAR Score"] += location["score"];
    //   sum["ENERGY STAR Score LR"] += location["lr_score"];
    //   sum["ENERGY STAR Score ML1"] += location["svm_score"];
    //   sum["ENERGY STAR Score ML2"] += location["random_forest_score"];
    //   sum["ENERGY STAR Score ML3"] += location["gb_score"];
    //   sum["ENERGY STAR Score ML4"] += location["knn_score"];
    //   sum["ENERGY STAR Score ML5"] += location["dt_score"];
    //   //console.log(location);
    //   console.log(location.index);
    //   if(location["index"] == i){
    //     data = location;
    //     console.log(data);
    //   }
    // }
    y_selected = [data["score"], data["lr_score"], data["svm_score"], data["random_forest_score"], data["gb_score"], data["knn_score"],data["dt_score"]].map(Math.round);
    // y_mean = [
    //   sum["ENERGY STAR Score"]/response.length,
    //   sum["ENERGY STAR Score LR"]/response.length,
    //   sum["ENERGY STAR Score ML1"]/response.length,
    //   sum["ENERGY STAR Score ML2"]/response.length,
    //   sum["ENERGY STAR Score ML3"]/response.length,
    //   sum["ENERGY STAR Score ML4"]/response.length,
    //   sum["ENERGY STAR Score ML5"]/response.length
    // ].map(Math.round);
    trace1 = {
      x: ["Observed", 
          "LR",
          "SVM",
          "RF",           
          "GB",
          "KNN",
          "DT"
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
        width: 2
      }
    };
    // trace2 = {
    //   x: ["Observed", 
    //   "LR",
    //   "SVM",
    //   "RF",           
    //   "GB",
    //   "KNN",
    //   "DT"
    //   ] ,
    //   y: y_mean,
    //   text: y_mean.map(String),
    //   textposition: 'auto',
    //   hoverinfo: 'none',
    //   name: 'Mean Value',
    //   type: 'bar',
    //   marker: {
    //     color: 'rgb(26, 118, 255)',
    //     //color: 'rgb(204,204,204)',
    //     opacity: 1,
    //     width: 2
    //   }}

    
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
      traces = [trace1];
      
      Plotly.newPlot('viz2', traces,layout);
    }

    // // function rmimage() {
    // //   console.log('Removing image');
    //   //document.getElementById("picture").style.display='none';
    //   //foo.removeChild('picture');
    // }

