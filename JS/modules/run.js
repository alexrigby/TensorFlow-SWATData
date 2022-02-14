//COMPILES ALL FUNCTIONS TO INITIATE THE MODEL RUNNING AND DISPLAY RESULTS


import { getData } from "./getData.js"
import { createModel } from "./createModel.js"
import { convertToTensor } from "./converToTensor.js"
import { trainModel } from "./trainModel.js"
import { testModel } from "./testModel.js"


export async function run() {
    // Loads the cleaned data
const data = await getData();
  
const outputOption = document.getElementById("outputNames").value
    //adds the values to an object (x and y) to plot
    const values = data.map(d => ({
        x: d.flow,
        y: d[outputOption],
    }));
    
    // renders a scatterplot of the origional trining data
    tfvis.render.scatterplot(
        { name: `training data` },
        { values },
        {
            xLabel: 'Flow',
            yLabel: `${outputOption}`,
            height: 300
        }
    );

    // Create the model
    const model = createModel();

    //modelSummary gives a table to the layers in the model
    tfvis.show.modelSummary({ name: 'Model Summary' }, model);
    // Convert the data to a form we can use for training.
    const tensorData = convertToTensor(data);
    
    //extracts inputs and lables created in convertToTensor function
    const { inputs, labels } = tensorData;

    // Train the model
    await trainModel(model, inputs, labels);
    console.log('Done Training');

    // Make some predictions using the model and compare them to the
    // original data
    testModel(model, data, tensorData);
}

export default {
    run,
}