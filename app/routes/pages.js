'use strict'

import {Router} from 'express'

var router = Router();

router.get('/', (req,res) => {
    res.status(200).render('../views/index.ejs')
})

export default router;