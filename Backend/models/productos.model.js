/* Define la estructura de los documentos de la colección "productos" en MongoDB.*/

//importar la configuración de Mongoose
const mongoose = require("../config/conection");

// Definir el esquema para los productos
const schemaProducto = new mongoose.Schema(
  {
    referencia: {
      type: String,
      required: [true, "La referencia es obligatoria"],
    },
    nombre: {
      type: String,
      required: [true, "El nombre es obligatorio"],
    },
    descripcion: {
      type: String,
      required: [true, "La descripción es obligatoria"],
    },
    precio: {
      type: Number,
      default: [0, "El precio por defecto es 0"],
      min: [0, "El precio no puede ser negativo"],
    },
    stock: {
      type: Number,
      default: [0, "El stock por defecto es 0"],
      min: [0, "El stock no puede ser negativo"],
    },
    imagen: {
      type: String,
      required: [true, "No existe la imagen o ruta a la imagen por defecto"],
    },
    habilitado: {
      type: Boolean,
      default: true,
    },
  },

  {
    versionKey: false,
  }
);

// Crear el modelo para los productos
const producto = mongoose.model("productos", schemaProducto);

// Exportar el modelo
module.exports = producto;
