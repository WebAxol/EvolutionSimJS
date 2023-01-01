'use strict'

$('document').ready(() => {

    analyseResultsUI.resultList.click((e) => {

        let resultIndex = e.target.getAttribute('data-result-index');;

        analyseResultsUI.resultSelectionContainer.slideUp();
        analyseResultsUI.canvasContainer.slideDown();

        handleResultSelection(resultIndex);
    });

});

const handleResultSelection = (resultIndex) => {
    
    let result    = results[resultIndex];
    let formatted = formatResult(result);
    
    createChart(formatted);
}