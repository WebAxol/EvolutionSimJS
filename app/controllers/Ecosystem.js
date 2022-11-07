'use strict';

import EcosystemModel from '../models/Ecosystem.js';

class Ecosystem {
   
    storeStatistics(req,res){

        if(!this.checkInformation(req.body)){
            return res.status(400).send({
                error : 'The information supplied is not valid, or is incomplete'
            });
        }

        var newEcosystem = new EcosystemModel();

            newEcosystem.populationGrowth       = JSON.parse(req.body.populationGrowth);
            newEcosystem.averageAttributeChange = JSON.parse(req.body.averageAttributeChange);
            newEcosystem.initialVariables       = JSON.parse(req.body.initialVariables);

        newEcosystem.save((err,ecosystemSaved) => {
            if(err){
                return res.status(500).send({ 
                    error : 'Sorry, there has been an internal mistake' 
                });
            }           
            if(!ecosystemSaved){
                return res.status(500).send({ 
                    error : 'Sorry, we could not store your information' 
                });
            } 

            console.log(ecosystemSaved);
            res.status(200).send({
                dataStored : true 
            });
        });
    }

    checkInformation(body){
        
        if(!body.populationGrowth       ) return false;
        if(!body.averageAttributeChange ) return false;
        if(!body.initialVariables       ) return false;

        return true;
    }

}

export default new Ecosystem();