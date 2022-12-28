'use strict'

   
var selectedExperimentIndex; // Used to access the experiment stored at experimentPagination.results
var InitSimulation = {}; 

experimentDetailsInterface.slideUp(0); // initial state

// Experiment selected

const displayExperimentDetails = () => {

    selectExperimentInterface.slideUp();
    experimentDetailsInterface.slideDown();

    let experiments = experimentPagination.results;
    let experiment  = experiments[selectedExperimentIndex];

    $('#experimentName').html(experiment.name);
}

// Experiment unselected

const backToSelectionInterface = () => {

    selectExperimentInterface.slideDown();
    experimentDetailsInterface.slideUp();
};

// Confirm selection

const runExperiment = () => {

    canvasContainer.show(500);
    experimentSelectionContainer.hide(500);

    
    let experiments = experimentPagination.results;
    let experiment  = experiments[selectedExperimentIndex];
    
    InitSimulation.prepareAndRunSimulation(experiment);
}

// EVENTS

$('document').ready(() => {

    InitSimulation = new Init();

    experimentList.click((e) => {

        var experimentIndex = e.target.getAttribute('data-experiment-index');
        selectedExperimentIndex = experimentIndex;
        displayExperimentDetails();
    });
    
    backToSelectBtn.click(() => {
        selectedExperimentIndex = undefined;
        backToSelectionInterface();
    });
    
    runExperimentBtn.click(() => {
        runExperiment();
    });

});