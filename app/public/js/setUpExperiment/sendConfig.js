'use strict'

const createExperimentBtn = $('#createExperimentBtn');

function sendConfiguration(){

    fetch('/api/experiment/', {
        method: 'POST',
        headers : { 'Content-Type' : 'application/json' },
        body: JSON.stringify(configurationJSON)
    
    }).then(response => {
        console.log(response);
    });
}


// EVENTS

createExperimentBtn.click((e) => {
    e.preventDefault();
    sendConfiguration();
});