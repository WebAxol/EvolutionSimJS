'use strict';

/* Note - Controllers have a similar data storage algorithm: it violates DRY 
    
    Proporsal A: Creating a 'Controller' class with special built-in methods to store data based on a given model
            and create concrete controller classes that inherit from it

    Proporsal B: Creating a function that store data based on a model passed as parameter, classes would need to 
            call this function to store their data. 
            
    (These approaches assume that the data is validated by another process before storage; it's better to think it carefully) 
    
*/

/* Note - Explicit dependencies and coupling between controllers could be minimized by implementing 
        a better data communication structure 

        Proporsal: Creating an system of events, implementing a central communication module: an EventManager
*/


// Dependencies

import ExperimentController from './Experiment.js';
import ResultModel from '../models/Result.js';
import ErrorHandler from '../utils/errorHandling.js';


class Result {
   
    #_storeResult(req,res){

        if(!req || !res) return false;

        try{
            var newResult = new ResultModel();

            newResult.experimentID = req.body.experimentID;
            newResult.results = JSON.parse(req.body.results);
            newResult.date = req.body.date;

            console.log(newResult);

            newResult.save((err,resultSaved) => {

                if(err){
                    return ErrorHandler.handleError('internalError',res);
                }           
                if(!resultSaved){
                    return ErrorHandler.handleError('dataStorageError',res);
                } 

                console.log(resultSaved);

                res.status(200).send({
                    dataStored : true 
                });
            });
        }catch(err){
            return ErrorHandler.handleError('internalError',res);
        }
    }

    storeResult(req,res){

        if(!req || !res) return false;

        if(!this.checkInformation(req.body)){
            return ErrorHandler.handleError('invalidDataSupplied',res);
        }

        
        const experimentExists = ExperimentController.getExperimentByID(req.body.experimentID);

        experimentExists.then((r) => {
            if(!r){
                return ErrorHandler.handleError('internalError',res);
            }
            
            this.#_storeResult(req,res);
        });
    }

    checkInformation(body){
        
        if(!body.experimentID) return false;
        if(!body.results )     return false;
        if(!body.date   )      return false;

        return true;
    }

}

export default new Result();