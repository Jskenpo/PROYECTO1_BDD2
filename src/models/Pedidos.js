const mongoose = require('mongoose');

// Definición del esquema para pedidos
const pedidoSchema = new mongoose.Schema({
    ID_pedido: {
        type: Number,
        required: true
    },
    Destinatario: {
        type: String,
        required: true
    },
    Comprador: {
        type: String,
        required: true
    },
    Fecha: {
        type: Date,
        required: true
    },
    Arreglo_entregado: {
        arreglo: {
            type: String,
            required: true
        },
        cantidad: {
            type: Number,
            required: true
        }
    },
    Dirección: {
        type: String,
        required: true
    },
    Método_de_pago: {
        type: String,
        required: true
    },
    Estado: {
        type: String,
        required: true
    },
    Método_de_entrega: {
        type: String,
        required: true
    },
    Precio_envío: {
        type: Number,
        required: true
    },
    Subtotal: {
        type: Number,
        required: true
    },
    Precio_total: {
        type: Number,
        required: true
    }
});

// Crea el modelo "Pedido" utilizando el esquema definido
const Pedido = mongoose.model('Pedido', pedidoSchema, 'Pedidos');

module.exports = Pedido;
