const ClienteSchema = require('../models/Clientes');


async function GetClientes(req, res) {
    ClienteSchema.find()
        .then(clientes => {
            res.json(clientes)
        })
        .catch(err => {
            res.json(err)
        })
}

module.exports = {
    GetClientes
}