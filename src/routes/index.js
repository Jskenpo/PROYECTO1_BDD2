const { Router } = require('express');
const router = Router();
const { GetArreglos } = require('../controllers/arreglos.controller');




//GET
router.get('/Arreglos', GetArreglos);


    

module.exports = router;