//CONVERTS THE OBSERVED DATA INTO TENSOR AND NORMALIZES AND UNNORMALIZEZ THE DATA TO ADD TO THE MODEL

export function convertObseverdToTensor(data) {
    // Wrapping these calculations in a tidy will dispose any
    // intermediate tensors.

    return tf.tidy(() => {
        // Step 1. Shuffle the data
        // shuffles all data so it is not in the order it was input, 
        // helps because the data is fed to the model in batches, removes bias
        tf.util.shuffle(data);

        // Step 2. Convert data to Tensor
        //inputs = example inputs fed to the model
        const inputs = data.map(d => d.flow)

        //tensor has a shape of [number of examples, number of features per example]
        const inputTensor = tf.tensor2d(inputs, [inputs.length, 1]);

        //Step 3. Normalize the data to the range 0 - 1 using min-max scaling
        const inputMax = inputTensor.max();
        const inputMin = inputTensor.min();
        const normalizedInputs = inputTensor.sub(inputMin).div(inputMax.sub(inputMin));

        const unNormInputs = normalizedInputs
            .mul(inputMax.sub(inputMin))
            .add(inputMin);
        // console.log(unNormInputs)


        return {
            observedInputs: normalizedInputs,
            // Return the min/max bounds so we can use them later.
            observedInputMax: inputMax,
            observedInputMin: inputMin,
            unNormObservedInputs: unNormInputs
        }
    });
}

export default {
    convertObseverdToTensor,
}