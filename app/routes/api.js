'use strict'

import {Router} from 'express';
import Experiment from '../controllers/Experiment.js';

var router = Router();

router.post('/api/experiment', (req,res) => { Experiment.storeStatistics(req,res) });


export default router;