// Importación del modelo de cliente
const modeloCliente = require("../models/clientes.model");

/*****************************************************
 *                     CONSULTA
 * Consulta un cliente por su documento (query param).
 *****************************************************/
exports.consultarClientes = async (req, res) => {
  try {
    // Validar que se envíe el parámetro documentoCliente
    if (!req.query.documentoCliente) {
      return res
        .status(400)
        .json({ error: "Falta el parámetro documentoCliente" });
    }
    // Buscar el cliente en la base de datos por documento
    let documentoEncontrado = await modeloCliente.findOne({
      documento: req.query.documentoCliente,
    });
    if (documentoEncontrado) {
      res.status(200).json(documentoEncontrado);
    } else {
      res.status(404).json({ error: "Cliente no encontrado" });
    }
  } catch (error) {
    // Captura cualquier error inesperado
    res.status(500).json({
      error: "Error al consultar cliente",
      detalle: error.message,
    });
  }
};

/*****************************************************
 *                     INSERCIÓN
 * Inserta un nuevo cliente en la base de datos.
 *****************************************************/
exports.insertarClientes = async (req, res) => {
  try {
    // Validar que todos los campos requeridos estén presentes
    const { documento, nombreCompleto, telefono, correo } = req.body;
    if (!documento || !nombreCompleto || !telefono || !correo) {
      return res
        .status(400)
        .json({ error: "Todos los campos son obligatorios" });
    }

    // Crear una nueva instancia del modelo con los datos recibidos
    const nuevoCliente = new modeloCliente({
      documento,
      nombreCompleto,
      telefono,
      correo,
    });

    // Guardar el cliente en la base de datos
    const clienteGuardado = await nuevoCliente.save();

    res.status(201).json({
      mensaje: "Registro exitoso",
      cliente: clienteGuardado,
    });
  } catch (err) {
    // Si ocurre un error, mostrar el mensaje y detalles
    res.status(400).json({
      error: "No se pudo guardar el cliente",
      detalle: err.message,
    });
  }
};

/*****************************************************
 *                 ACTUALIZACIÓN
 * Actualiza los datos de un cliente existente.
 *****************************************************/
exports.actualizarClientes = async (req, res) => {
  try {
    // Validar que se envíe el parámetro ref
    if (!req.params.ref) {
      return res
        .status(400)
        .json({ error: "Falta el parámetro ref en la URL" });
    }
    // Crear un objeto con los datos a actualizar
    const clienteActualizado = {
      documento: req.params.ref,
      nombreCompleto: req.body.nombreCompleto,
      telefono: req.body.telefono,
      correo: req.body.correo,
    };
    // Buscar y actualizar el cliente por documento
    let actualizacion = await modeloCliente.findOneAndUpdate(
      { documento: req.params.ref },
      clienteActualizado,
      { new: true } // Devuelve el documento actualizado
    );
    if (actualizacion) {
      res.status(200).json({
        mensaje: "Cliente actualizado correctamente",
        cliente: actualizacion,
      });
    } else {
      res.status(404).json({ mensaje: "Cliente no encontrado" });
    }
  } catch (error) {
    res.status(500).json({
      error: "Error al actualizar cliente",
      detalle: error.message,
    });
  }
};

/*****************************************************
 *                   ELIMINACIÓN
 * Elimina un cliente por su _id.
 *****************************************************/
exports.eliminarClientes = async (req, res) => {
  try {
    // Validar que se envíe el parámetro id
    if (!req.params.id) {
      return res.status(400).json({ error: "Falta el parámetro id en la URL" });
    }
    // Buscar y eliminar el cliente por _id
    let clienteEliminado = await modeloCliente.findOneAndDelete({
      _id: req.params.id,
    });
    if (clienteEliminado) {
      res.status(200).json({ mensaje: "Cliente eliminado correctamente" });
    } else {
      res.status(404).json({ mensaje: "Cliente no encontrado" });
    }
  } catch (error) {
    res.status(500).json({
      error: "Error al eliminar cliente",
      detalle: error.message,
    });
  }
};
