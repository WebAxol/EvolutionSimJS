'use strict'

function showInterface(interfaceId){

    $('#buttons').slideUp(300);
    $(`#${interfaceId}`).slideDown(300);
}

function hideInterface(interfaceId){

    $('#buttons').slideDown(300);
    $(`#${interfaceId}`).slideUp(300);

}

// EVENTS

$('document').ready(() => {

    // By default, inferfaces will be hidden

    $('#addSpecieInterface').removeClass('d-none').slideUp(0);
    $('#addMutationInterface').removeClass('d-none').slideUp(0);
    $('#setRelationshipInterface').removeClass('d-none').slideUp(0);


    //Species

    $('#addSpecieButton').click((e) => {
        e.preventDefault(); 
        showInterface('addSpecieInterface');
    });

    $('#cancelAddSpecie').click((e) => {
        e.preventDefault(); 
        hideInterface('addSpecieInterface');
    });

    // Mutations 

    $('#addMutationButton').click((e) => {
        e.preventDefault(); 
        showInterface('addMutationInterface');
    });

    $('#cancelSetMutations').click((e) => {
        e.preventDefault(); 
        hideInterface('addMutationInterface');
    });

    // Relationships

    $('#setRelationshipButton').click((e) => {
        e.preventDefault(); 
        showInterface('setRelationshipInterface');
    });

    $('#cancelSetRelationship').click((e) => {
        e.preventDefault(); 
        hideInterface('setRelationshipInterface');
    });


});
