/**
 * Controlador de Usuarios
 * Define funciones para manejar las operaciones CRUD de usuarios.
 * Cada función está explicada para principiantes.
 */

// Importar el modelo de usuarios
const modeloUsuario = require("../models/usuarios.model");

/*****************************************************
 *                     CONSULTA
 * Consulta un usuario por su documento (query param).
 *****************************************************/
exports.consultarUsuarios = async (req, res) => {
  try {
    // Validar que se envíe el parámetro documentoUsuario
    if (!req.query.documentoUsuario) {
      return res
        .status(400)
        .json({ error: "Falta el parámetro documentoUsuario" });
    }
    // Buscar el usuario en la base de datos por documento
    let documentoEncontrado = await modeloUsuario.findOne({
      documento: req.query.documentoUsuario,
    });
    if (documentoEncontrado) {
      res.status(200).json(documentoEncontrado);
    } else {
      res.status(404).json({ error: "Usuario no encontrado" });
    }
  } catch (error) {
    res.status(500).json({
      error: "Error al consultar usuario",
      detalle: error.message,
    });
  }
};

/*****************************************************
 *                     INSERCIÓN
 * Inserta un nuevo usuario en la base de datos.
 *****************************************************/
exports.insertarUsuarios = async (req, res) => {
  // Validar que los campos requeridos estén presentes
  if (
    !req.body.documento ||
    !req.body.nombreCompleto ||
    !req.body.FNacimiento
  ) {
    return res
      .status(400)
      .json({ error: "Todos los campos son obligatorios" });
  }

  // Crear una nueva instancia del modelo con los datos recibidos
  const nuevoUsuario = new modeloUsuario({
    documento: req.body.documento,
    nombreCompleto: req.body.nombreCompleto,
    FNacimiento: req.body.FNacimiento,
  });

  // Guardar el usuario en la base de datos
  nuevoUsuario
    .save()
    .then((usuario) => {
      // Si se guarda correctamente, responde con el usuario creado
      res
        .status(201)
        .json({ mensaje: "Usuario registrado exitosamente", usuario });
    })
    .catch((err) => {
      // Si ocurre un error, responde con el detalle
      res
        .status(500)
        .json({ error: "Error al crear usuario", detalle: err.message });
    });
};

/*****************************************************
 *                 ACTUALIZACIÓN
 * Actualiza los datos de un usuario existente.
 *****************************************************/
exports.actualizarUsuarios = async (req, res) => {
  // Validar que la referencia esté presente en la URL
  if (!req.params.ref) {
    return res
      .status(400)
      .json({ error: "Falta el parámetro ref en la URL" });
  }

  // Crear un objeto con los datos a actualizar
  const usuarioActualizado = {
    documento: req.params.ref,
    nombreCompleto: req.body.nombreCompleto,
    FNacimiento: req.body.FNacimiento,
  };

  try {
    // Buscar y actualizar el usuario por documento
    let Actualizacion = await modeloUsuario.findOneAndUpdate(
      { documento: req.params.ref },
      usuarioActualizado,
      { new: true } // Devuelve el usuario actualizado
    );
    if (Actualizacion) {
      res.status(200).json({
        mensaje: "Usuario actualizado correctamente",
        usuario: Actualizacion,
      });
    } else {
      res.status(404).json({ mensaje: "Usuario no encontrado" });
    }
  } catch (error) {
    res.status(500).json({
      error: "Error al actualizar usuario",
      detalle: error.message,
    });
  }
};

/*****************************************************
 *                   ELIMINACIÓN
 * Elimina un usuario por su _id.
 *****************************************************/
exports.eliminarUsuarios = async (req, res) => {
  // Validar que el id esté presente en la URL
  if (!req.params.id) {
    return res.status(400).json({ error: "Falta el parámetro id en la URL" });
  }

  try {
    // Buscar y eliminar el usuario por _id
    let usuarioEliminado = await modeloUsuario.findOneAndDelete({
      _id: req.params.id,
    });
    if (usuarioEliminado) {
      res.status(200).json({ mensaje: "Usuario eliminado correctamente" });
    } else {
      res.status(404).json({ mensaje: "Usuario no encontrado" });
    }
  } catch (error) {
    res.status(500).json({
      error: "Error al eliminar usuario",
      detalle: error.message,
    });
  }
};
