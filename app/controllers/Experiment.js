'use strict';

import { isObjectIdOrHexString } from 'mongoose';
// Dependencies

import ExperimentModel from '../models/Experiment.js';
import ErrorHandler from '../utils/errorHandling.js';

class Experiment {
   

    async getExperimentByID(experimentID){

        // Is id valid?

        if(!experimentID.match(/^[0-9a-fA-F]{24}$/)){
            return false;
        }

        // Look for experiment with given id

        let experiment = await ExperimentModel.findById(experimentID);
        
        return experiment;
    }


    getAllExperiments(req,res){

        if(!req || !res) return false;
    
        try{
            let experiments = this._getAllExperiments();

            res.status(200).send({
                experiments : experiments
            });

        }catch(err){
            return ErrorHandler.handleError('internalError',res);
        }
    }

    async _getAllExperiments(){
        try{
            let experiments = await ExperimentModel.find();
            return experiments;
        }catch(err){
           return { error : err };
        }
    }


    storeExperiment(req,res){

        if(!req || !res) return false;

        try{
            if(!this.checkInformation(req.body)){
                return ErrorHandler.handleError('invalidDataSupplied',res);
            }
    
            var newExperiment = new ExperimentModel();
    
                newExperiment.species   = JSON.parse(req.body.species);
                newExperiment.mutations = JSON.parse(req.body.mutations);
                newExperiment.foodweb   = JSON.parse(req.body.foodweb);
    
            newExperiment.save((err,experimentSaved) => {
                if(err){
                    return ErrorHandler.handleError('internalError',res);
                }           
                if(!experimentSaved){
                    return ErrorHandler.handleError('dataStorageError',res);
                } 
    
                console.log(experimentSaved);
    
                res.status(200).send({
                    dataStored : true 
                });
            });
        }catch(err){
            return ErrorHandler.handleError('internalError',res);
        }
    }


    checkInformation(body){
        
        if(!body.species   ) return false;
        if(!body.mutations ) return false;
        if(!body.foodweb   ) return false;

        return true;
    }

}

export default new Experiment();