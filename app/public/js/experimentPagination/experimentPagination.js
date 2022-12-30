import UI from './userInterface.js';
import ExperimentRetriever from './getExperimentList.js';
import ExperimentSelection from './selectExperiment.js';

UI.prepare();

// prepare events

$('document').ready(() => {

    UI.nextPageBtn.click((e) => {
        ExperimentRetriever.nextPage();
    });
    
    UI.prevPageBtn.click((e) => {
        ExperimentRetriever.prevPage();
    });

    UI.experimentList.click((e) => {
        var experimentIndex = e.target.getAttribute('data-experiment-index');
        ExperimentSelection.selectedExperimentIndex = experimentIndex;
        ExperimentSelection.displayExperimentDetails();
    });
        
    UI.backToSelectBtn.click(() => {
        ExperimentSelection.selectedExperimentIndex = undefined;
        ExperimentSelection.backToSelectionInterface();
    });
        
    UI.runExperimentBtn.click(() => {
        ExperimentSelection.confirmSelection();
    });
    
    ExperimentRetriever.getExperiments();

});