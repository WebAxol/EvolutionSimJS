'use strict'

import {Router} from 'express';
import Ecosystem from '../controllers/Ecosystem.js';

var router = Router();

router.post('/api/ecosystem', (req,res) => { Ecosystem.storeStatistics(req,res) });


export default router;