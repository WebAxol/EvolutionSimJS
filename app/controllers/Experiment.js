'use strict';

import ExperimentModel from '../models/Experiment.js';

class Ecosystem {
   
    storeStatistics(req,res){

        if(!this.checkInformation(req.body)){
            return res.status(400).send({
                error : 'The information supplied is not valid, or is incomplete'
            });
        }

        var newExperiment = new ExperimentModel();

            newExperiment.species   = JSON.parse(req.body.species);
            newExperiment.mutations = JSON.parse(req.body.mutations);
            newExperiment.foodweb   = JSON.parse(req.body.foodweb);

        newExperiment.save((err,experimentSaved) => {
            if(err){
                return res.status(500).send({ 
                    error : 'Sorry, there has been an internal mistake' 
                });
            }           
            if(!experimentSaved){
                return res.status(500).send({ 
                    error : 'Sorry, we could not store your information' 
                });
            } 

            console.log(experimentSaved);

            res.status(200).send({
                dataStored : true 
            });
        });
    }

    checkInformation(body){
        
        if(!body.species   ) return false;
        if(!body.mutations ) return false;
        if(!body.foodweb   ) return false;

        return true;
    }

}

export default new Ecosystem();