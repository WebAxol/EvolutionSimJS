// Init Constants

const nextPageBtn = $('#nextPage');
const prevPageBtn = $('#prevPage'); 
const backToSelectBtn  = $('#backToSelect');
const runExperimentBtn = $('#runExperiment');
const experimentList   = $('#experimentList');
const experimentSelectionContainer = $('#experimentSelectionContainer');
const selectExperimentInterface  = $('#selectExperimentInterface');
const experimentDetailsInterface = $('#experimentDetailsInterface');
const canvasContainer = $('#canvasContainer');

const experimentPagination = {
    page : 0,
    maxPage : 10,
    numberPerPage : 5,
    results : undefined
};

// Init Interfaces

experimentDetailsInterface.slideUp(0); 
canvasContainer.hide(0);
