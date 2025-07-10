/**
 * Controlador de Productos
 * Aquí se definen las funciones para manejar las operaciones CRUD de productos.
 * Cada función está explicada paso a paso para principiantes.
 */

// Importar el modelo de productos
const modeloProducto = require("../models/productos.model");

/*****************************************************
 *                     CONSULTA
 * Consulta todos los productos en la base de datos.
 * Si encuentra productos, los muestra en la vista index.ejs.
 *****************************************************/
exports.consultarProductos = async (req, res) => {
  try {
    // Buscar todos los productos en la base de datos
    let productosEncontrados = await modeloProducto.find();
    if (productosEncontrados && productosEncontrados.length > 0) {
      // Si hay productos, renderiza la vista index.ejs
      res.status(200).json(productosEncontrados);
      /*res.render("pages/index", { productosEncontrados });*/
    } else {
      // Si no hay productos, responde con un mensaje
      res.status(404).json({ mensaje: "No se encontraron productos" });
    }
  } catch (error) {
    // Si ocurre un error, responde con el detalle
    res.status(500).json({ mensaje: "Error al consultar productos", detalle: error.message });
  }
};

/*****************************************************
 *                     INSERCIÓN
 * Inserta un nuevo producto en la base de datos.
 *****************************************************/
exports.insertarProductos = async (req, res) => {
  // Validar que los campos requeridos estén presentes
  if (
    !req.body.referencia ||
    !req.body.nombre ||
    !req.body.descripcion ||
    req.body.precio == null ||
    req.body.stock == null ||
    !req.body.imagen
  ) {
    return res.status(400).json({ mensaje: "Todos los campos son obligatorios" });
  }

  // Crear un nuevo producto con los datos recibidos
  const nuevoProducto = new modeloProducto({
    referencia: req.body.referencia,
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
    precio: req.body.precio,
    stock: req.body.stock,
    imagen: req.body.imagen,
    habilitado: req.body.habilitado !== undefined ? req.body.habilitado : true, // Por defecto habilitado
  });

  // Guardar el producto en la base de datos
  nuevoProducto
    .save()
    .then((producto) => {
      // Si se guarda correctamente, responde con el producto creado
      console.log("Producto creado: ", producto);
      res
        .status(201)
        .json({ mensaje: "Producto registrado exitosamente", producto });
    })
    .catch((err) => {
      // Si ocurre un error, responde con el detalle
      console.log("Error al crear producto: ", err);
      res
        .status(500)
        .json({ mensaje: "Error al registrar producto", detalle: err.message });
    });
};

/*****************************************************
 *                 ACTUALIZACIÓN
 * Actualiza los datos de un producto existente por referencia.
 *****************************************************/
exports.actualizarProductos = async (req, res) => {
  // Validar que la referencia esté presente en la URL
  if (!req.params.ref) {
    return res.status(400).json({ mensaje: "Falta la referencia del producto en la URL" });
  }

  // Crear un objeto con los datos actualizados
  const productoActualizado = {
    referencia: req.params.ref,
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
    precio: req.body.precio,
    stock: req.body.stock,
    imagen: req.body.imagen,
    habilitado: req.body.habilitado,
  };

  try {
    // Buscar y actualizar el producto por referencia
    let actualizacionProducto = await modeloProducto.findOneAndUpdate(
      { referencia: req.params.ref },
      productoActualizado,
      { new: true } // Devuelve el producto actualizado
    );

    if (actualizacionProducto) {
      res.status(200).json({ mensaje: "Producto actualizado correctamente", producto: actualizacionProducto });
    } else {
      res.status(404).json({ mensaje: "Producto no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ mensaje: "Error al actualizar producto", detalle: error.message });
  }
};

/*****************************************************
 *                   ELIMINACIÓN
 * Elimina un producto por su referencia.
 *****************************************************/
exports.EliminarProductos = async (req, res) => {
  // Validar que la referencia esté presente en la URL
  if (!req.params.ref) {
    return res.status(400).json({ mensaje: "Falta la referencia del producto en la URL" });
  }

  try {
    // Eliminar el producto por su referencia
    let productoEliminado = await modeloProducto.findOneAndDelete({
      referencia: req.params.ref,
    });
    if (productoEliminado) {
      res.status(200).json({ mensaje: "Producto eliminado correctamente" });
    } else {
      res.status(404).json({ mensaje: "Producto no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar producto", detalle: error.message });
  }
};
