'use strict'

import {Router} from 'express'

var router = Router();

router.get('/', (req,res) => {
    res.status(200).render('../views/index.ejs')
})


router.get('/setUp', (req,res) => {
    res.status(200).render('../views/setUp.ejs')
})

export default router;