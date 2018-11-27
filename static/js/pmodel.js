// LINEAR REGRESSION MODEL
    const model = tf.sequential();
    model.add(tf.layers.dense({ units: 1, inputShape: [1] }));

    // Prepare the model for training: Specify the loss and the optimizer.
    model.compile({ loss: 'meanSquaredError', optimizer: 'sgd' });

    // Generate some synthetic data for training.
    const xs = tf.tensor2d([1, 2, 3, 4], [4, 1]);
    const ys = tf.tensor2d([1, 2, 3, 4], [4, 1]);

    // Train the model using the data.
    model.fit(xs, ys, { epochs: 100 })

// SLIDERS
    var slider1 = document.getElementById("myRange1");
    var slider2 = document.getElementById("myRange2");
    var slider3 = document.getElementById("myRange3");
    var slider4 = document.getElementById("myRange4");
    var slider5 = document.getElementById("myRange5");

    // Update the current slider values (each time you drag the slider handle)
    slider1.oninput = function () {
        const svalue1 = model.predict(tf.tensor2d([this.value], [1, 1]));
        text.innerHTML = svalue1.dataSync()[0];
    }

    slider2.oninput = function () {
        const svalue2 = model.predict(tf.tensor2d([this.value], [1, 1]));
        text.innerHTML = svalue2.dataSync()[0];
    }

    slider3.oninput = function () {
        const svalue3 = model.predict(tf.tensor2d([this.value], [1, 1]));
        text.innerHTML = svalue3.dataSync()[0];
    }

    slider4.oninput = function () {
        const svalue4 = model.predict(tf.tensor2d([this.value], [1, 1]));
        text.innerHTML = svalue4.dataSync()[0];
    }

    slider5.oninput = function () {
        const svalue5 = model.predict(tf.tensor2d([this.value], [1, 1]));
        text.innerHTML = svalue5.dataSync()[0];
    }

var text = document.getElementById("text");
