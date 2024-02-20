const ArregloSchema = require('../models/Arreglos');


async function GetArreglos(req, res) {
    ArregloSchema.find()
        .then(arreglos => {
            res.json(arreglos)
        })
        .catch(err => {
            res.json(err)
        })
}


module.exports = {
    GetArreglos
}