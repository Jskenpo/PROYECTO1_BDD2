const ArregloSchema = require('../models/Arreglos');
const PedidoSchema = require('../models/Pedidos');


async function GetArreglos(req, res) {
    ArregloSchema.find()
        .then(arreglos => {
            res.json(arreglos)
        })
        .catch(err => {
            res.json(err)
        })
}

const PostArreglos = async (req, res) => {
    try {
        // Crear un nuevo objeto de arreglo utilizando el modelo
        const nuevoArreglo = new ArregloSchema(req.body);

        // Guardar el nuevo arreglo en la base de datos
        await nuevoArreglo.save();

        // Enviar una respuesta de éxito al cliente
        res.status(201).json({ mensaje: 'Arreglo creado exitosamente', arreglo: nuevoArreglo });
    } catch (error) {
        // Enviar una respuesta de error al cliente si hay algún problema
        res.status(400).json({ error: error.message });
    }
}

const GetArreglosBySKU = async (req, res) => {
    const sku = req.params.sku;

    try {
        // Buscar el arreglo en la base de datos por su SKU
        const arreglo = await ArregloSchema.findOne({ SKU: sku });

        if (!arreglo) {
            // Si no se encuentra el arreglo, enviar una respuesta 404 (Not Found)
            return res.status(404).json({ mensaje: 'Arreglo no encontrado' });
        }

        // Si se encuentra el arreglo, enviarlo en la respuesta
        res.json(arreglo);
    } catch (error) {
        // Enviar una respuesta de error si ocurre algún problema
        res.status(500).json({ error: error.message });
    }
}

const PostManyArreglos = async (req, res) => {
    const arreglos = req.body; // Obtener los arreglos del cuerpo de la solicitud
    try {
        // Insertar los arreglos en la base de datos
        const result = await ArregloSchema.insertMany(arreglos);
        
        // Enviar una respuesta con los arreglos insertados
        res.json({ message: `${result.length} arreglos insertados correctamente`, arreglos: result });
    } catch (error) {
        // Enviar una respuesta de error si ocurre algún problema
        res.status(500).json({ error: error.message });
    }
}

const UpdateArreglosById = async (req, res) => {
    const sku = req.params.sku;
    const newData = req.body;
    try {
        const result = await ArregloSchema.findOneAndUpdate({ SKU: sku }, newData, { new: true });
        if (!result) {
            return res.status(404).json({ mensaje: 'Arreglo no encontrado' });
        }
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const DeleteArreglosBySKU = async (req, res) => {
    const sku = req.params.sku;
    try {
        const result = await ArregloSchema.findOneAndDelete
        ({ SKU: sku });
        if (!result) {
            return res.status(404).json({ mensaje: 'Arreglo no encontrado' });
        }
        res.json({ mensaje: 'Arreglo eliminado' });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
    
}

const VerificarExistenciaArreglo = async (req, res) => {
    try {
        const sku  = req.params.sku;

        // Buscar el arreglo por su SKU
        const arreglo = await ArregloSchema.findOne({ SKU: sku });

        if (!arreglo) {
            // Si no se encuentra el arreglo, devolver un mensaje indicando que no está en existencia
            return res.status(404).json({ mensaje: 'El arreglo no está en existencia.' });
        }

        // Verificar si la existencia del arreglo es mayor que cero
        if (arreglo.Existencia > 0) {
            // Si la existencia es mayor que cero, devolver un mensaje indicando que está en existencia
            return res.json({ mensaje: 'El arreglo está en existencia.', arreglo });
        } else {
            // Si la existencia es cero, devolver un mensaje indicando que no está en existencia
            return res.status(404).json({ mensaje: 'El arreglo está agotado.' });
        }
    } catch (error) {
        // Si ocurre un error durante la búsqueda, devolver un mensaje de error
        res.status(500).json({ error: error.message });
    }
};

const VentasPorCategoria = async (req, res) => {
    try {
        // Agregación para calcular las ventas por categoría de arreglo
        const ventasPorCategoria = await PedidoSchema.aggregate([
            {
                $lookup: {
                    from: 'Arreglos', // Nombre de la colección de arreglos
                    localField: 'Arreglo_entregado.arreglo',
                    foreignField: 'SKU',
                    as: 'arregloInfo'
                }
            },
            {
                $unwind: '$arregloInfo'
            },
            {
                $group: {
                    _id: '$arregloInfo.Categoría', // Agrupar por categoría de arreglo
                    totalVentas: { $sum: '$Precio_total' }, // Sumar el total de ventas
                    cantidadPedidos: { $sum: 1 } // Contar la cantidad de pedidos
                }
            }
        ]);

        res.json(ventasPorCategoria);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    GetArreglos,
    PostArreglos,
    GetArreglosBySKU,
    PostManyArreglos,
    UpdateArreglosById,
    DeleteArreglosBySKU,
    VerificarExistenciaArreglo,
    VentasPorCategoria
}