'use strict'

import ExperimentRetriever  from './getExperimentList.js'; // Coupled module, it would be better to 
import UI from './userInterface.js';


class ExperimentSelection{

    constructor(){
        this.selectedExperimentIndex; // Used to access the experiment stored at experimentPagination.results
    }

    // Experiment selected

    displayExperimentDetails = () => {

        UI.selectExperimentInterface.slideUp();
        UI.experimentDetailsInterface.slideDown();

        let experiments = ExperimentRetriever.getPaginationResults();
        let experiment  = experiments[this.selectedExperimentIndex];

        $('#experimentName').html(experiment.name);
}

    // Experiment unselected

    backToSelectionInterface = () => {

        UI.selectExperimentInterface.slideDown();
        UI.experimentDetailsInterface.slideUp();
    };

    // Confirm selection

    confirmSelection = () => {

        let experiments = ExperimentRetriever.getPaginationResults();
        let experiment  = experiments[this.selectedExperimentIndex];


        if(!__experimentChosenHandler__){
            throw Error('An __experimentChosenHandler__ function needs to be implemented, to trigger the processes that come after the experiment has been chosen');
        }
        
        // Ugly antipattern is being provisionally used as it is the simplest way of making modules work with non-modular scripts, as they are not fully compatible - IT MUST BE CORRECTED AS SOON AS POSSIBLE
        // For this antipattern to be corrected, all scripts must be changed to ESM, which import and export their modules to work together
        __experimentChosenHandler__(experiment);


    }
}

export default new ExperimentSelection();