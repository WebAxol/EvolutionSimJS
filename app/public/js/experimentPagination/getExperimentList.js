'use strict'

import UI from './userInterface.js';

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

    nextPage(){

        UI.prevPageBtn.removeClass('d-none');
        this.#experimentPagination.page++;
        
        this.getExperiments();

        if(this.#experimentPagination.page >= this.#experimentPagination.maxPage){
            UI.nextPageBtn.addClass('d-none');
        }
    }

    prevPage(){

        UI.nextPageBtn.removeClass('d-none');
        
        this.#experimentPagination.page--;
        this.getExperiments();

        if(this.#experimentPagination.page <= 0){
            UI.prevPageBtn.addClass('d-none');
        }

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
                this.displayExperimentList(experiments);
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

var retriever = new ExperimentRetriever();

export default retriever;
