const analyseResultsUI = {

    resultSelectionContainer : $('#resultSelectionContainer'),
    canvasContainer : $('#canvasContainer'),
    resultList : $('#resultList'),

    prepare: () => {
        analyseResultsUI.resultSelectionContainer.slideUp(0);
    }
};

analyseResultsUI.prepare();
