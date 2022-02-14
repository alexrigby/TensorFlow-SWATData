import { run } from "./modules/run.js";
import {getData, getOutputNames } from "./modules/getData.js"

await getOutputNames()

// document.addEventListener('DOMContentLoaded', await getData());
document.getElementById("outputNames").addEventListener("change", () => {
   
    run()
})
// document.getElementById("outputNames").addEventListener("change", run())











