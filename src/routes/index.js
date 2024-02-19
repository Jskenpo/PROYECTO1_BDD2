const { Router } = require('express');
const router = Router();
const { GetArreglos } = require('../controllers/arreglos.controller');
const mongoose = require('mongoose');



//GET
router.get('/arreglos', GetArreglos);


    

module.exports = router;