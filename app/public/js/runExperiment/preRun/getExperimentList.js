'use strict'

const experimentPagination = {
    page : 0,
    numberPerPage : 5,
    results : undefined
};

const getExperiments = () => {
    try{
        fetch(`/api/experiment?numberPerPage=${experimentPagination.numberPerPage }&page=${experimentPagination.page}`, {
            method: 'GET'
    
        }).then((res) => {

            let json = res.json();
            return json;

        }).then((json) => {
            let experiments = json.experiments;
            experimentPagination.results = experiments;
            displayExperimentList(experiments);
        });
    }catch(err){

    }
}

const displayExperimentList = (experiments) => {
    
    document.getElementById('experimentList').innerHTML = '';

    experiments.forEach((exp, index) => {
        document.getElementById('experimentList').innerHTML += `<li class='list-group-item' data-experiment-index='${index}'> ${exp.name} </li>`; 
    });
}

getExperiments();