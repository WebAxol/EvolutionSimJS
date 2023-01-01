'use strict'

var results;

const getExperimentResults = (experimentID) => {

    fetch(`/api/result?experimentID=${experimentID}`, {
        method: 'GET'

    }).then(res => {
        let json = res.json();
        return json;

    }).then(res => {
        results = res.results;
        displayResultList(res);

    }).catch(err => {
        console.error(err);

    });
};

const displayResultList = (records) => {

    $('#experimentSelectionContainer').hide(300);
    analyseResultsUI.resultSelectionContainer.show(300);

    var html = ``;

    // TODO, format date in a user friendly way

    records.results.forEach((result, index) => {
        html += `<li class='list-group-item' data-result-index='${index}'> ${result.date} </li>`
    });

    analyseResultsUI.resultList.html(html);
};