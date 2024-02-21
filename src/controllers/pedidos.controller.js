const PedidoSchema = require('../models/Pedidos');

async function GetPedidos(req, res) {
    PedidoSchema.find()
        .then(pedidos => {
            res.json(pedidos)
        })
        .catch(err => {
            res.json(err)
        })
}

async function contarPedidos(req, res) {
    try {
        const cantidadPedidos = await PedidoSchema.countDocuments();
        res.json({ cantidadPedidos }); // Enviar el resultado al cliente como JSON
    } catch (error) {
        console.error('Error al contar pedidos:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

const GetPedidoById = async (req, res) => {
    const id = req.params.id;

    try {
        // Buscar el pedido en la base de datos por su SKU
        const pedido = await PedidoSchema.findOne({ ID_pedido: id });

        if (!pedido) {
            // Si no se encuentra el pedido, enviar una respuesta 404 (Not Found)
            return res.status(404).json({ mensaje: 'Pedido no encontrado' });
        }

        // Si se encuentra el pedido, enviarlo en la respuesta
        res.json(pedido);
    } catch (error) {
        // Enviar una respuesta de error si ocurre algún problema
        res.status(500).json({ error: error.message });
    }

    
}

const UpdatePedidoById = async (req, res) => {
    const id = req.params.id;
    const newData = req.body;
    try {
        const result = await PedidoSchema.findOneAndUpdate ({ ID_pedido: id }, newData, { new: true });
        if (!result) {
            return res.status(404).json({ mensaje: 'Pedido no encontrado' });
        }
        res.json(result);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const DeletePedidoById = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await PedidoSchema.findOneAndDelete({ ID_pedido: id });
        if (!result) {
            return res.status(404).json({ mensaje: 'Pedido no encontrado' });
        }
        res.json(result);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const PostPedido = async (req, res) => {
    try {
        // Crear un nuevo objeto de arreglo utilizando el modelo
        const nuevoPedido = new PedidoSchema(req.body);

        // Guardar el nuevo arreglo en la base de datos
        await nuevoPedido.save();

        // Enviar una respuesta de éxito al cliente
        res.status(201).json({ mensaje: 'Pedido creado exitosamente', pedido: nuevoPedido });
    } catch (error) {
        // Enviar una respuesta de error al cliente si hay algún problema
        res.status(400).json({ error: error.message });
    }
}

const MejoresVentas = async (req, res) => {
    try {
        const ventas = await PedidoSchema.find().sort({ "Precio_total": -1 }).limit(3);
        res.json(ventas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const VentasPorMes = async (req, res) => {
    try {
        const ventasPorMes = await PedidoSchema.aggregate([
            {
                $group: {
                    _id: { $month: "$Fecha" }, // Agrupar por mes
                    totalVentas: { $sum: "$Precio_total" } // Sumar el total de ventas para cada mes
                }
            },
            {
                $project: {
                    _id: 0,
                    mes: "$_id",
                    totalVentas: 1
                }
            },
            {
                $sort: { mes: 1 } // Ordenar por mes ascendente
            }
        ]);

        res.json(ventasPorMes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const VentasPorMetodoEntrega = async (req, res) => {
    try {
        // Realizar una agregación para contar la cantidad de pedidos por método de entrega
        // Realizar una agregación para contar la cantidad total de pedidos
        const totalPedidos = await PedidoSchema.countDocuments();

        // Realizar una agregación para contar la cantidad de pedidos por método de entrega
        const ventasPorMetodoEntrega = await PedidoSchema.aggregate([
            {
                $group: {
                    _id: "$Método_de_entrega",
                    cantidadPedidos: { $sum: 1 }
                }
            },
            {
                $project: {
                    _id: 0,
                    Método_de_entrega: "$_id",
                    cantidadPedidos: 1,
                    porcentajeVentas: { $multiply: [ { $divide: ["$cantidadPedidos", totalPedidos] }, 100 ] }
                }
            }
        ]);

        res.json(ventasPorMetodoEntrega);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const VentasPorMetodoPago = async (req, res) => {
    try {
        // Obtener el total de pedidos
        const totalVentas = await PedidoSchema.aggregate([
            {
                $group: {
                    _id: null,
                    totalVentas: { $sum: "$Precio_total" }
                }
            }
        ]);

        // Realizar una agregación para calcular el total de ventas por método de pago
        const ventasPorMetodoPago = await PedidoSchema.aggregate([
            {
                $group: {
                    _id: "$Método_de_pago",
                    totalVentas: { $sum: "$Precio_total" },
                    cantidadPedidos: { $sum: 1 } 
                }
            },
            {
                $project: {
                    _id: 0,
                    Método_de_pago: "$_id",
                    totalVentas: 1,
                    cantidadPedidos: 1,
                    porcentajeVentas: { $multiply: [ { $divide: ["$totalVentas", totalVentas[0].totalVentas] }, 100 ] }
                }
            }
        ]);

        res.json(ventasPorMetodoPago);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    GetPedidos,
    contarPedidos,
    GetPedidoById,
    UpdatePedidoById,
    DeletePedidoById,
    PostPedido,
    MejoresVentas,
    VentasPorMes,
    VentasPorMetodoEntrega,
    VentasPorMetodoPago
}