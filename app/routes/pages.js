'use strict'

import {Router} from 'express'

var router = Router();

router.get('/', (req,res) => {
    res.status(200).render('../views/index.ejs')
});

router.get('/runExperiment', (req,res) => {
    res.status(200).render('../views/runExperiment.ejs')
});

router.get('/setUpExperiment', (req,res) => {
    res.status(200).render('../views/setUpExperiment.ejs')
});

router.get('/analyseResults', (req,res) => {
    res.status(200).render('../views/analyseResults.ejs')
});

export default router;