import fetchData from "./fetchData.js"
import { cleanCsvOutput, cleanObservedCsvOutput } from "./cleanCsvOutput.js";

/**
 * FETCHES CHANNEL SD DATA AND MAKES DATASETOF FLOW AND SEDIMENT  
 */
export async function getData() {
    const channelData = await fetchData('data/channel_sd_day.csv');
    const cleanChannel = cleanCsvOutput(channelData)
    const cleanChannelData = cleanChannel.csvData
   

    const outputOption = document.getElementById("outputNames").value 
    console.log(outputOption)
    
    const cleaned = cleanChannelData.map(channel => ({
        [outputOption]: channel[outputOption],
        flow: channel.flo_out,

    }))
        .filter(channel => (channel.flow != null && channel[outputOption] != null));
    
    return cleaned;
}

export async function getOutputNames() {
    const channelData = await fetchData('data/channel_sd_day.csv');
    const cleanChannel = cleanCsvOutput(channelData)
    const outputNames = cleanChannel.outputNames.map((el, i) => {
        return `<option value=${el}>${el}</option>`;
    });
    document.getElementById("outputNames").innerHTML = outputNames

    const outputOption = document.getElementById("outputNames").value
}




//FETCHES OBSERVED FLOW DATA AND REMOVES DATE 
export async function getObservedFlow() {

    const flowData = await fetchData("data/Dwyfor_dly_flow.csv");
    // const flowData = await fetchData("./Erch_dly_flow.csv");
    // const flowData = await fetchData("./swatData.csv");
    const clean = cleanObservedCsvOutput(flowData)

    const cleaned = clean.map(observed => ({
        flow: observed.Flow,
    }))
   
    return cleaned
}

export default {
    getData,
    getObservedFlow,
    getOutputNames,
}