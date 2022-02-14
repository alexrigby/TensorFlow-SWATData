//CLEANS SWAT+ channel sd day OUTPUT FILES, RETURNS CLEAN DATA


export function cleanCsvOutput(data) {
    const clean = d3.csvParse(data
        // Remove the header line produced by SWAT+ Editor
        .substring(data.indexOf('\n') + 1)
        // First, remove all spaces and replace with nothing
        .replace(/ +/gm, '')
        //might work, adds 0 in front of all single didgit numbers, test if vega-lite accepts it 
        .replace(/\b(\d{1})\b/g, '0$1'),
        
        //auto parse the data as correct type (e.g number)
        d3.autoType
    );
    
    const columnHeaders = clean.columns.splice(7)
   

    //removes the line which displays units from output data (where there is no name)
    const noUnits = clean.filter(clean => clean.name != null);
    // console.log(noUnits)

    // returns only values for channel 1 (main channel for the ERCH, CHECK for other catchments)
    const channelOne = noUnits.filter(noUnits => noUnits.name == "cha001");
    // console.log(channelOne)

    return {
        csvData: channelOne, 
        outputNames: columnHeaders, 
    }
    
}

//CLEANS THE OBSERVED FLOW DATA CSV FILE
export function cleanObservedCsvOutput(data) {
    const clean = d3.csvParse(data

        // First, remove all spaces and replace with nothing
        .replace(/ +/gm, '')
        //might work, adds 0 in front of all single didgit numbers, test if vega-lite accepts it 
        .replace(/\b(\d{1})\b/g, '0$1'),
        // Then remove all leading and trailing tabs
        // .replace(/^\t|\t$/gm)
        d3.autoType
    );
    
   return clean
    
}



export default {
    cleanCsvOutput,
    cleanObservedCsvOutput,
}