'use strict'


$('document').ready(() => {

    // By default, inferfaces will be hidden

    $('#addSpecieInterface').removeClass('d-none').slideUp(0);

    $('#addSpecieButton').click((e) => {

        e.preventDefault(); 

        $('#buttons').slideUp(300);
        $('#addSpecieInterface').slideDown(300);
    });

    $('#cancelAddSpecie').click((e) => {

        e.preventDefault(); 

        $('#buttons').slideDown(300);
        $('#addSpecieInterface').slideUp(300);
    });

})
