const mongoose = require ('mongoose');

const arregloSchema =  mongoose.Schema({
    Nombre_de_arreglo: {
        type: String,
        required: true
    },
    Elemento: {
        Cantidad_total: {
            type: Number,
            required: true
        },
        Tipo: {
            Flores: {
                Cantidad: {
                    type: Number,
                    required: true
                },
                Tipo_de_flor: {
                    type: String,
                    required: true
                }
            },
            Globos: {
                Cantidad: {
                    type: Number,
                    required: true
                },
                Tipo_de_globo: {
                    type: String,
                    required: true
                }
            },
            Snacks: {
                Cantidad: {
                    type: Number,
                    required: true
                },
                Marca: {
                    type: String,
                    required: true
                }
            },
            Botellas: {
                Cantidad: {
                    type: Number,
                    required: true
                },
                Alcohol: {
                    type: String,
                    required: true
                }
            }
        }
    },
    Existencia: {
        type: Number,
        required: true
    },
    Precio: {
        type: Number,
        required: true
    },
    Categoría: {
        type: String,
        required: true
    },
    SKU: {
        type: String,
        required: true
    }
});

// Crea el modelo "Arreglo" utilizando el esquema definido
const ArregloSchema = mongoose.model('Arreglos', arregloSchema, 'Arreglos');

module.exports = ArregloSchema;