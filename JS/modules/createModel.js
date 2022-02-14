//DEFINES MODEL ARCHITECTURE (LAYERS ETC.)

export function createModel() {
    // Create a sequential model
    const model = tf.sequential();

    // Add a single input layer
    model.add(tf.layers.dense({ inputShape: [1], units: 1, useBias: true }));

    // ReLU gives  better fit than sigmoid 
    //    model.add(tf.layers.dense({units: 50, activation: 'sigmoid'}));
    model.add(tf.layers.dense({units: 50, activation: 'ReLU'}));

    // Add an output layer
    model.add(tf.layers.dense({ units: 1, useBias: true }));

    return model;
}

export default {
    createModel,
}