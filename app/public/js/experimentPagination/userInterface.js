
const UI = {
    nextPageBtn : $('#nextPage'),
    prevPageBtn : $('#prevPage'), 
    backToSelectBtn  : $('#backToSelect'),
    runExperimentBtn : $('#runExperiment'),
    experimentList   : $('#experimentList'),
    experimentSelectionContainer : $('#experimentSelectionContainer'),
    selectExperimentInterface    : $('#selectExperimentInterface'),
    experimentDetailsInterface   : $('#experimentDetailsInterface'),
    canvasContainer : $('#canvasContainer'),
    
    prepare : () => {
        UI.experimentDetailsInterface.slideUp(0); 
        UI.experimentDetailsInterface.slideUp(0);
        UI.canvasContainer.hide(0);
    }

}

export default UI;