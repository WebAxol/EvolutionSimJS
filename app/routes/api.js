'use strict'

import {Router} from 'express';
import ExperimentController from '../controllers/Experiment.js';
import ResultController from '../controllers/Result.js';


var router = Router();

router.post('/experiment',  (req,res) => { ExperimentController.storeExperiment(req,res) });
router.post('/result',      (req,res) => { ResultController.storeResult(req,res) });

export default router;