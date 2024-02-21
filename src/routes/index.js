const { Router } = require('express');
const router = Router();
const { GetArreglos, PostArreglos, GetArreglosBySKU, PostManyArreglos, UpdateArreglosById, DeleteArreglosBySKU } = require('../controllers/arreglos.controller');
const { GetClientes, ClienteConMasPedidos, PostCliente, UpdateClienteByCUI, DeleteClienteByCUI, GetClienteByCUI } = require('../controllers/cliente.controller');
const { GetPedidos, contarPedidos, GetPedidoById, UpdatePedidoById, DeletePedidoById, PostPedido } = require('../controllers/pedidos.controller');




//GET
router.get('/Arreglos', GetArreglos);
router.get('/Clientes', GetClientes);
router.get('/Pedidos', GetPedidos);

//GET by id
router.get('/Arreglos/:sku', GetArreglosBySKU);
router.get('/Pedidos/:id', GetPedidoById);
router.get('/Clientes/:cui', GetClienteByCUI);

//POST
router.post('/Arreglos', PostArreglos);
router.post('/Arreglos/many', PostManyArreglos);
router.post('/Pedidos', PostPedido);
router.post('/Clientes', PostCliente);

//UPDATE BY ID
router.put('/Arreglos/:sku', UpdateArreglosById);
router.put('/Pedidos/:id', UpdatePedidoById);
router.put('/Clientes/:cui', UpdateClienteByCUI);

//DELETE BY ID
router.delete('/Arreglos/:sku', DeleteArreglosBySKU);
router.delete('/Pedidos/:id', DeletePedidoById);
router.delete('/Clientes/:cui', DeleteClienteByCUI);

// Querys varios 
router.get('/Clientes/ConMasPedidos', ClienteConMasPedidos);
router.get('/Pedidos/count', contarPedidos);


    

module.exports = router;