// LINEAR REGRESSION MODEL
var x=50.0,y=50.0,z=50.0,a=50.0,b=50.0
// SLIDERS
var slider1 = document.getElementById("myRange1");
var slider2 = document.getElementById("myRange2");
var slider3 = document.getElementById("myRange3");
var slider4 = document.getElementById("myRange4");
var slider5 = document.getElementById("myRange5");

    // model.add(tf.layers.dense({ units: 1, inputShape: [1] }));

    // // Prepare the model for training: Specify the loss and the optimizer.
    // model.compile({ loss: 'meanSquaredError', optimizer: 'sgd' });

    // // // // Generate some synthetic data for training.
    // const xs = tf.tensor2d([1, 2, 3, 4], [4, 1]);
    // const ys = tf.tensor2d([1, 2, 3, 4], [4, 1]);

    // // Train the model using the data.
    // model.fit(xs, ys, { epochs: 100 })
    // // model.fit(xarray, ystar, { epochs: 100 })
    var predict = ()=>{
        $.get("/python-model",(e)=>{

            text.innerHTML = e[0]

        })
        
    }
    // Update the PREDICTED ENERGY STAR SCORE (each time you drag the slider handle)
    var text = document.getElementById("text");

    slider1.onchange = function () {
        x=this.value
        console.log(x)
        predict()
    }

    slider2.oninput = function () {
        y=this.value
        predict()
        console.log(text.innerHTML)
    }

    slider3.oninput = function () {
        z=this.value
        predict()
        console.log(text.innerHTML)
    }

    slider4.oninput = function () {
        a=this.value
        predict()
        console.log(text.innerHTML)
    }

    slider5.oninput = function () {
        b=this.value
        predict()
        console.log(text.innerHTML)
    }

