'use strict'

// Function called by experimentPagination

const  __experimentChosenHandler__ = (experiment) => {
  
    console.log(experiment);
    getExperimentResults(experiment._id);

};