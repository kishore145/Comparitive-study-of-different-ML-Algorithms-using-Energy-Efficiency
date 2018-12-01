// LINEAR REGRESSION MODEL
var x = 50.0, y = 50.0, z = 50.0, a = 50.0, b = 50.0
// SLIDERS
var slider1 = document.getElementById("myRange1");
var slider2 = document.getElementById("myRange2");
var slider3 = document.getElementById("myRange3");
var slider4 = document.getElementById("myRange4");
var slider5 = document.getElementById("myRange5");
// Update the PREDICTED ENERGY STAR SCORE (each time you drag the slider handle)
var text = document.getElementById("text");

var predict = () => {
    $.get("/python-model",(e)=>{

        text.innerHTML = "10"+JSON.parse(e)[0]
    })
}


slider1.oninput = function () {
    x = this.value
    predict()
    console.log(text.innerHTML)
}

slider2.oninput = function () {
    y = this.value
    predict()
    console.log(text.innerHTML)
}

slider3.oninput = function () {
    z = this.value
    predict()
    console.log(text.innerHTML)
}

slider4.oninput = function () {
    a = this.value
    predict()
    console.log(text.innerHTML)
}

slider5.oninput = function () {
    b = this.value
    predict()
    console.log(text.innerHTML)
}
