//TODO - form validation

'use strict'

const configurationJSON   = { name : 'dummy', species: {}, mutations: {}, foodWeb: {} };
const setUpForm           = document.getElementById('setUpForm');
const executeAddSpecie    = $('#executeAddSpecie');
const executeSetMutation  = $('#executeSetMutations');
const executeSetRelationship = $('#executeSetRelationship');


const fieldValidationRules = {
    addSpecie: {
        specieName             : { type : 'string' , test : (value) => { return (typeof value == 'string'    && value != '' )}},
        speedMinValue          : { type : 'int'    , test : (value) => { return (typeof value == 'number'    && value <= setUpForm.elements['speedMaxValue'].value       && value >= 0 && value <= 10  )}},
        speedMaxValue          : { type : 'int'    , test : (value) => { return (typeof value == 'number'    && value >= setUpForm.elements['speedMinValue'].value       && value >= 0 && value <= 10  )}},
        sensitivityMinValue    : { type : 'int'    , test : (value) => { return (typeof value == 'number'    && value <= setUpForm.elements['sensitivityMaxValue'].value && value >= 0 && value <= 300 )}},
        sensitivityMaxValue    : { type : 'int'    , test : (value) => { return (typeof value == 'number'    && value >= setUpForm.elements['sensitivityMinValue'].value && value >= 0 && value <= 300 )}},
        foodFee                : { type : 'int'    , test : (value) => { return (typeof value == 'number'    && value >= 0        && value <= 100)}},
        lifeSpan               : { type : 'int'    , test : (value) => { return (typeof value == 'number'    && value >  0        && value <  100)}},
        initialPopulation      : { type : 'int'    , test : (value) => { return (typeof value == 'number'    && value  > 0        && value <  500)}},
        populationLimit        : { type : 'int'    , test : (value) => { return (typeof value == 'number'    && value < 2000                    )}} 
    },
    setMutations: {
        sensitivityChangeProbability : { type : 'int', test : (value) => { return (value  >= 0 && value  <= 100 )}},
        sensitivityMinChange         : { type : 'int', test : (value) => { return (value  >= 0 && value  <= 100 )}},
        sensitivityMaxChange         : { type : 'int', test : (value) => { return (value  >= 0 && value  <= 100 )}},
        speedChangeProbability       : { type : 'int', test : (value) => { return (value  >= 0 && value  <= 100 )}},
        speedMinChange               : { type : 'int', test : (value) => { return (value  >= 0 && value  <= 100 )}},
        speedMaxChange               : { type : 'int', test : (value) => { return (value  >= 0 && value  <= 100 )}}

    },
    setRelationship : {
        prey     : { type : 'string', test : (value) => { return (configurationJSON.species[value] && value != setUpForm.elements['predator'].value)}},   
        predator : { type : 'string', test : (value) => { return (configurationJSON.species[value] && value != setUpForm.elements['prey'].value)}}
    }
};

function getSpecies(){ 
    return Object.keys(configurationJSON.species);
}

// Species are displayed as options so the user can select them and set extra configuration

function updateSpeciesAsOptions(){
    let formElements = setUpForm.elements;
    let specieNames      = Object.keys(configurationJSON.species);

    let fieldsTobeUpdated = ['specieToBeMutated','predator','prey'];

    // Clean options

    fieldsTobeUpdated.forEach(field => {
        if(formElements[field]){
            formElements[field].innerHTML = '';
        }
    })

    // Update options

    specieNames.forEach((specieName) => {
        fieldsTobeUpdated.forEach(field => {
            if(formElements[field]){
                formElements[field].innerHTML += `<option value="${specieName}">${specieName}</option>`;
            }
        })
    });
}

function parseToItsType(criteria,fieldName, value){
    let type = fieldValidationRules[criteria][fieldName].type;

    switch(type){
        case 'string' : return value + '';
        break;
        case 'int'    : return parseInt(value);
        break;
    }

    throw Error(`The field '${fieldName}' does not have an explicit defined type at criteria '${criteria}'`);
}

// All field values are obtained as strings; it is important to parse every field value to its type in order to test validity

function checkField(fieldName){

    var criterias = Object.keys(fieldValidationRules),
        formField = setUpForm.elements[fieldName].value,
        requiredCriteria, requiredCriteriaName;

    // find the criteria to be used against field

    for(let criteria of criterias){
        if(fieldValidationRules[criteria][fieldName]){
            requiredCriteria = fieldValidationRules[criteria][fieldName];
            requiredCriteriaName = criteria;
            break;
        }
    }

    console.log(requiredCriteria);
    // check if criteria exists

    if(requiredCriteria){

        let isValid = requiredCriteria.test(parseToItsType(requiredCriteriaName,fieldName,formField));

        if(isValid){
            setUpForm.elements[fieldName].classList.remove('is-invalid');
        }  

        return isValid;
    }
    
    return false;
}


function isFieldCriteriaMet(criteria){
    var fieldsToValidate = Object.keys(fieldValidationRules[criteria]);
    var meetsCriteria = true;

    fieldsToValidate.forEach((field) => {
        let fieldValue      = parseToItsType(criteria,field,setUpForm.elements[field].value);
        let meetsFieldRules = fieldValidationRules[criteria][field].test(fieldValue);

        console.log(field,fieldValue,meetsFieldRules);

        if(!meetsFieldRules){ 
            setUpForm.elements[field].classList.add('is-invalid');
            meetsCriteria = false
        }
    });

    return meetsCriteria;
}

function addSpecieToConfiguration(){

    let formElements = setUpForm.elements;
    let specieName   = formElements['specieName'].value;

    if(!isFieldCriteriaMet('addSpecie')){
        console.warn('addSpecie criteria is not met');
        return false;
    }

    configurationJSON.species[specieName] = {
        minSpeed : parseInt(formElements['speedMinValue'].value),
        maxSpeed : parseInt(formElements['speedMaxValue'].value),
        minSense : parseInt(formElements['sensitivityMinValue'].value),
        maxSense : parseInt(formElements['sensitivityMaxValue'].value),
        foodFee  : parseInt(formElements['foodFee'].value),
        lifeSpan : parseInt(formElements['lifeSpan'].value),
    
        initialPopulation : parseInt(formElements['initialPopulation'].value),
        populationLimit   : parseInt(formElements['populationLimit'].value)
    };

    return true;
}

function setSpecieMutations(){

    let formElements = setUpForm.elements;
    let specieName   = formElements['specieToBeMutated'].value;
        
    if(!configurationJSON.species[specieName]){
        console.warn("Cannot set mutations of specie: '" + specieName + "', because it does not exist");
        return false;
    }

    if(!isFieldCriteriaMet('setMutations')){
        console.warn('setMutations criteria is not met');
        return false;
    }
    
    configurationJSON.mutations[specieName] = {};
    configurationJSON.mutations[specieName]['sensitivity'] = {
        probability :  parseInt(formElements['speedChangeProbability'].value) / 100,
        minChange   :  parseInt(formElements['speedMinChange'].value), 
        maxChange   :  parseInt(formElements['speedMaxChange'].value)
    }

    configurationJSON.mutations[specieName]['speed'] = {
        probability :  parseInt(formElements['sensitivityChangeProbability'].value) / 100,
        minChange   :  parseInt(formElements['sensitivityMinChange'].value), 
        maxChange   :  parseInt(formElements['sensitivityMaxChange'].value)
    }
    
    return true;
}


function setRelationshipBetweenSpecies(){

    let formElements = setUpForm.elements;
    let preyName        = formElements['prey'].value;
    let predatorName    = formElements['predator'].value;


    if(!isFieldCriteriaMet('setRelationship')){
        console.warn('setRelationship criteria is not met');
        return false;
    }

    if(!configurationJSON.foodWeb[predatorName]){
        configurationJSON.foodWeb[predatorName] = {};
    }

    configurationJSON.foodWeb[predatorName][preyName] = 1;

    return true;
}

// EVENTS

$('document').ready(() => {

    executeAddSpecie.click((e) => {
        e.preventDefault();

        // Important: check if there was not any error while adding the new specie to configuration

        if(addSpecieToConfiguration() !== true) return;

        hideInterface('addSpecieInterface');
        updateSpeciesAsOptions();
        displaySpeciesAtTable();
    });


    executeSetMutation.click((e) => {
        e.preventDefault();

        if(setSpecieMutations() !== true) return;

        hideInterface('addMutationInterface');
    });


    executeSetRelationship.click((e) => {
        e.preventDefault();

        if(setRelationshipBetweenSpecies() !== true) return;

        hideInterface('setRelationshipInterface');
    });
    

     setUpForm.addEventListener('focusout', (e) => {
        let fieldName = e.target.name;

        if(fieldName == '' || !setUpForm.elements[fieldName]) return;

        checkField(fieldName);

     });
});