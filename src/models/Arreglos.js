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
            // campos no requeridos
            Flores: {
                Cantidad: {
                    type: Number,
                },
                Tipo_de_flor: {
                    type: String,
                }
            },
            Globos: {
                Cantidad: {
                    type: Number,
                },
                Tipo_de_globo: {
                    type: String,
                }
            },
            Snacks: {
                Cantidad: {
                    type: Number,
                },
                Marca: {
                    type: String,
                }
            },
            Botellas: {
                Cantidad: {
                    type: Number,
                },
                Alcohol: {
                    type: String,
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