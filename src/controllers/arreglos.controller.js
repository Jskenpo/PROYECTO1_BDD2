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

module.exports = {
    GetArreglos,
    PostArreglos,
    GetArreglosBySKU,
    PostManyArreglos,
    UpdateArreglosById,
    DeleteArreglosBySKU
}