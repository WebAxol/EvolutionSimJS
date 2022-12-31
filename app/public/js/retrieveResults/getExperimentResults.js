'use strict'

const getExperimentResults = (experimentID) => {

    fetch(`/api/result?experimentID=${experimentID}`, {
        method: 'GET'

    }).then(res => {
        return res.json();

    }).then(res => {
        displayResultList(res);

    }).catch(err => {
        console.error(err);

    });
};

const displayResultList = (records) => {
    console.table(records.results[2].results);

    $('#experimentSelectionContainer').hide(300);
    retrieveResultsUI.resultSelectionContainer.show(300);

    var html = ``;

    // TODO, format date in a user friendly way

    records.results.forEach(result => {
        html += `<li class='list-group-item'> ${result.date} </li>`
    });

    retrieveResultsUI.resultList.html(html);
};