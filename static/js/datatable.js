// Create a table from the json data

d3.json("/data", function (err, json) {
    var string = ""

    json.forEach(row => {
       
        string +=
            `
        <tr>
            <td>${row.Lat.toFixed(2)}</td>
            <td>${row.Long.toFixed(2)}</td>
            <td>${row.ac_consumption.toFixed(2)}</td>
            <td>${row.age.toFixed(2)}</td>
            <td>${row.domestic_gas.toFixed(2)}</td>
            <td>${row.energy.toFixed(2)}</td>
            <td>${row.heating_gas.toFixed(2)}</td>
            <td>${parseFloat(row.index).toFixed(2)}</td>
            <td>${row.number_stories.toFixed(2)}</td>
            <td>${row.plei_1.toFixed(2)}</td>
            <td>${row.plei_3.toFixed(2)}</td>
            <td>${row.plug_load_consumption.toFixed(2)}</td>
            <td>${row.square_feet.toFixed(2)}</td>
        </tr>
        `

    })
    // Use d3 to grab the div id and to insert the html
    d3.select('#tdb').html(string)
    
});
