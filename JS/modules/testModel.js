//ADDS OBSERVED FLOW DATA TO PREDICTED (SEDIMENT) DATA AND ASIGNES X AND Y
//ADDS ORIGIONAL EXAMPLES TO ARAY ASSINGED TO X AND Y
// USES TFVIS TO RENDER A SCATERPLOT WITH PREDICTED AND ORIGIONAL VALUES


import { getObservedFlow } from "./getData.js";
import { convertObseverdToTensor } from "./converObservedToTensor.js";

export async function testModel(model, inputData, normalizationData) {
    //gets the label max and min values to un-normalise predictions
    const { inputMax, inputMin, labelMin, labelMax } = normalizationData;
    //gets observed flow data 
    const rawOnservedFlowData = await getObservedFlow()
    //converts to tensor
    const tensorObservedFlowData = convertObseverdToTensor(rawOnservedFlowData)
    //extracts array of unnormalized observed flow values 
    const unNormObservedFlow = tensorObservedFlowData.unNormObservedInputs.dataSync()
    //normalized observed flow values
    const normalObservedFlow = tensorObservedFlowData.observedInputs
    

    //clreates tensor of predictions based on shape of normal observed flow value tensor 
    const preds = tf.tidy(() => {
        // same shape as to training data ([number of examples, features per example])
        const preds = model.predict(normalObservedFlow);
        // unnormalizes the predictions
        const unNormPreds = preds
            .mul(labelMax.sub(labelMin))
            .add(labelMin);

        // Un-normalize the data
        return unNormPreds.dataSync();
    });
    
   // creates array from predictions and observed flow and assignes to x and y axis
    const predictedPoints = Array.from(unNormObservedFlow).map((val, i) => {
        return { x: val, y: preds[i] }
    });
    const outputOption = document.getElementById("outputNames").value
  //creates array from origial examples and output and assignes to x and y axis
    const originalPoints = inputData.map(d => ({
        x: d.flow, y: d[outputOption],
    }));

    //renders scatterplot with both arrayes plotted
    tfvis.render.scatterplot(
        { name: 'Model Predictions vs Original Data' },
        { values: [originalPoints, predictedPoints], series: ['original', 'predicted'] },
        {
            xLabel: 'flow',
            yLabel: `${outputOption}`,
            height: 300
        }
    );
   
}


export default {
    testModel,
}