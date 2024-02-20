const mongoose = require('mongoose');

const clienteSchema = mongoose.Schema({

    Nombre: {
        type: String,
        required: true
    },
    Apellido: {
        type: String,
        required: true
    },
    Nit: {
        type: Number,
        required: true
    },
    Teléfono: {
        type: String,
        required: true
    },
    Correo: {
        type: String,
        required: true
    },  
    CUI: {
        type: Number,
        required: true
    }

});

module.exports = mongoose.model('Clientes', clienteSchema, 'Clientes');