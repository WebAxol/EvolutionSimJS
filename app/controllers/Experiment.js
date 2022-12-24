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


    async getExperiments(req,res){

        console.log(req.query)

        if(!req || !res) return false;
     
        try{

            let skip;
            let limit;

            // Data inputted by client for pagination

            let page          = parseInt(req.query.page) | undefined;
            let numberPerPage = parseInt(req.query.numberPerPage) | undefined;


            if(numberPerPage > 0 && typeof page == 'number' && page >= 0){
                
                skip  = numberPerPage * page;
                limit = numberPerPage;   
            }

            let experiments = await this._getExperiments(skip,limit);

            res.status(200).send({
                experiments : experiments
            });

        }catch(err){
            return ErrorHandler.handleError('internalError',res);
        }
    }
 
    async _getExperiments(skip = 0,limit = 999999999 ){

        if(!(skip >= 0 && limit > 0)) return false;

        try{
            let experiments = await ExperimentModel.find().skip(skip).limit(limit);
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

                newExperiment.name      = req.body.name;
                newExperiment.species   = req.body.species;
                newExperiment.mutations = req.body.mutations;
                newExperiment.foodWeb   = req.body.foodWeb;
    
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
            console.log(err);
            return ErrorHandler.handleError('internalError',res);
        }
    }


    checkInformation(body){

        console.log(body);

        if(!body.name      ) return false;
        if(!body.species   ) return false;
        if(!body.mutations ) return false;
        if(!body.foodWeb   ) return false;

        return true;
    }

}

export default new Experiment();