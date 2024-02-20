const { Router } = require('express');
const router = Router();
const { GetArreglos } = require('../controllers/arreglos.controller');
const { GetClientes } = require('../controllers/cliente.controller');




//GET
router.get('/Arreglos', GetArreglos);
router.get('/Clientes', GetClientes);



    

module.exports = router;