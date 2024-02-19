const Arreglo = require('../models/Arreglos');


const GetArreglos = async (req, res) => {
    try {
        const arreglos = await Arreglo.find();
        res.json(arreglos);
    } catch (error) {
        console.error('Error al obtener los arreglos:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}


module.exports = {
    GetArreglos
}