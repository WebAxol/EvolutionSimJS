'use strict'

class ExperimentRetriever {

    #experimentPagination

    constructor(){
        this.#experimentPagination = {
            page : 0,
            maxPage : 10,
            numberPerPage : 5,
            results : undefined
        };
    }

    getPaginationResults(){
        return this.#experimentPagination.results;
    }

    getExperiments = () => {
        try{
            fetch(`/api/experiment?numberPerPage=${this.#experimentPagination.numberPerPage }&page=${this.#experimentPagination.page}`, {
                method: 'GET'
        
            }).then((res) => {
    
                let json = res.json();
                return json;
    
            }).then((json) => {
                let experiments = json.experiments;
                this.#experimentPagination.results = experiments;
                displayExperimentList(experiments);
            });
        }catch(err){
    
        }
    }
    
    displayExperimentList = (experiments) => {
        
        document.getElementById('experimentList').innerHTML = '';
    
        experiments.forEach((exp, index) => {
            document.getElementById('experimentList').innerHTML += `<li class='list-group-item experiment' data-experiment-index='${index}'>${exp.name}</li>`; 
        });
    }
}



// Update experiment - EVENTS

$('document').ready(() => {

    nextPageBtn.click((e) => {

        prevPageBtn.removeClass('d-none');
    
        experimentPagination.page++;
        getExperiments();
    
        if(experimentPagination.page >= experimentPagination.maxPage){
            nextPageBtn.addClass('d-none');
        }
    
    });
    
    prevPageBtn.click((e) => {
    
        nextPageBtn.removeClass('d-none');
        
        experimentPagination.page--;
        getExperiments();
    
        if(experimentPagination.page <= 0){
            prevPageBtn.addClass('d-none');
        }
    
    });

    getExperiments();

});
