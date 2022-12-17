//TODO - form validation

'use strict'

const configurationJSON = { species: {}, mutations: {}, foodWeb: {} };
const setUpForm         = document.getElementById('setUpForm');
const executeAddSpecie  = $('#executeAddSpecie');

function getSpecies(){
    return Object.keys(configurationJSON.species);
}

function addSpecieToConfiguration(){

    let formElements = setUpForm.elements;
    let specieName   = formElements['specieName'].value;
        
    configurationJSON.species[specieName] = {
        minSpeed : formElements['speedMinValue'].value,
        maxSpeed : formElements['speedMaxValue'].value,
        minSense : formElements['sensitivityMinValue'].value,
        maxSense : formElements['sensitivityMaxValue'].value,
        foodFee  : formElements['foodFee'].value,
        lifeSpan : formElements['lifeSpan'].value,
        populationLimit : formElements['populationLimit'].value
    }
}

// EVENTS

$('document').ready(() => {

    executeAddSpecie.click((e) => {
        e.preventDefault();

        addSpecieToConfiguration();
        hideInterface('addSpecieInterface');
    });

});