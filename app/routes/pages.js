'use strict'

import {Router} from 'express'

var router = Router();

router.get('/runExperiment', (req,res) => {
    res.status(200).render('../views/runExperiment.ejs')
})

router.get('/', (req,res) => {
    res.status(200).render('../views/index.ejs')
})


router.get('/setUpExperiment', (req,res) => {
    res.status(200).render('../views/setUpExperiment.ejs')
})

export default router;