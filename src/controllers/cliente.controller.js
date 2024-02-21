const ClienteSchema = require('../models/Clientes');
const PedidoSchema = require('../models/Pedidos');


async function GetClientes(req, res) {
    ClienteSchema.find()
        .then(clientes => {
            res.json(clientes)
        })
        .catch(err => {
            res.json(err)
        })
}

const ClienteConMasPedidos = async (req, res) => {
    try {
        const resultado = await PedidoSchema.aggregate([
          { $group: { _id: "$Comprador", totalPedidos: { $sum: 1 } } },
          { $sort: { totalPedidos: -1 } },
          { $limit: 1 },
          { 
            $lookup: {
              from: "Clientes",
              localField: "_id",
              foreignField: "CUI",
              as: "clienteInfo"
            }
          },
          { 
            $addFields: {
              nombre: { $arrayElemAt: ["$clienteInfo.Nombre", 0] },
              apellido: { $arrayElemAt: ["$clienteInfo.Apellido", 0] }
            }
          },
          { 
            $project: { 
              _id: 0,
              nombre: 1,
              apellido: 1,
              totalPedidos: 1
            }
          }
        ]);
    
        res.json(resultado[0]);
      } catch (error) {
        console.error("Error al obtener el cliente con más pedidos:", error);
        return null;
      }
}

const PostCliente = async (req, res) => {
    try {
        const nuevoCliente = new ClienteSchema(req.body);
        await nuevoCliente.save();
        res.status(201).json({ mensaje: 'Cliente creado exitosamente', cliente: nuevoCliente });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const UpdateClienteByCUI = async (req, res) => {
    const CUI = req.params.CUI;
    const newData = req.body;
    try {
        const result = await ClienteSchema.findOneAndUpdate ({ CUI: CUI }, newData, { new: true });
        if (!result) {
            return res.status(404).json({ mensaje: 'Cliente no encontrado' });
        }
        res.json(result);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const DeleteClienteByCUI = async (req, res) => {
    const CUI = req.params.CUI;
    try {
        const result = await ClienteSchema.findOneAndDelete({ CUI: CUI });
        if (!result) {
            return res.status(404).json({ mensaje: 'Cliente no encontrado' });
        }
        res.json(result);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const GetClienteByCUI = async (req, res) => {
    const cui = req.params.cui;
    try {
        const cliente = await ClienteSchema.findOne({ CUI: cui });
        if (!cliente) {
            return res.status(404).json({ mensaje: 'Cliente no encontrado' });
        }
        res.json(cliente);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}


const ClienteMasGastador = async (req, res) => {
    try {
        const clienteMasGastador = await PedidoSchema.aggregate([
            {
                $group: {
                    _id: "$Comprador",
                    totalGastado: { $sum: "$Precio_total" },
                    cantidadPedidos: { $sum: 1 } // Contar la cantidad de pedidos por cliente
                }
            },
            {
                $lookup: {
                    from: "Clientes", // Nombre de la colección de clientes
                    localField: "_id",
                    foreignField: "CUI",
                    as: "clienteInfo"
                }
            },
            {
                $unwind: "$clienteInfo" // Deshacer el arreglo generado por el $lookup
            },
            {
                $project: {
                    _id: 0, // Excluir el ID generado por la agregación
                    CUI: "$_id", // Utilizar el CUI como identificador del cliente
                    nombre: "$clienteInfo.Nombre", // Obtener el nombre del cliente
                    apellido: "$clienteInfo.Apellido", // Obtener el apellido del cliente
                    totalGastado: 1, // Incluir el total gastado
                    cantidadPedidos: 1 // Incluir la cantidad de pedidos
                }
            },
            {
                $sort: { totalGastado: -1 } // Ordenar por total gastado descendente
            },
            {
                $limit: 1 // Obtener solo el cliente con el total más alto
            }
        ]);

        if (clienteMasGastador.length === 0) {
            return res.status(404).json({ mensaje: 'No se encontraron clientes.' });
        }

        res.json(clienteMasGastador[0]); // Enviar el cliente más gastador como respuesta
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    GetClientes,
    ClienteConMasPedidos,
    PostCliente,
    UpdateClienteByCUI,
    DeleteClienteByCUI,
    GetClienteByCUI,
    ClienteMasGastador
}