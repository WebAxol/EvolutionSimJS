'use strict'

import {Router} from 'express';
import ExperimentController from '../controllers/Experiment.js';
import ResultController from '../controllers/Result.js';


var router = Router();

// TODO improve API security and controllers' methods

router.post('/experiment',(req,res) => { ExperimentController.storeExperiment(req,res) });
router.get( '/experiment',(req,res) => { ExperimentController.getExperiments(req,res) });
router.post('/result'    ,(req,res) => { ResultController.storeResult(req,res) });
router.get ('/result'    ,(req,res) => { ResultController.getResultsOfExperiment(req,res)});


export default router;