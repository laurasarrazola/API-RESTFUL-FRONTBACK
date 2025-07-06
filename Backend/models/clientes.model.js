/* Define la estructura de los documentos de la colección "clientes" en MongoDB.*/

// Importar la configuración de Mongoose
const mongoose = require("../config/conection");

// Definir el esquema para los clientes
const SchemaCliente = new mongoose.Schema(
  {
    documento: {
      type: String,
      required: [true, "El documento es obligatorio"],
      unique: true,
      minlength: [7, "El documento debe tener al menos 7 caracteres"],
      maxlength: [10, "El documento debe tener como máximo 10 caracteres"],
    },
    nombreCompleto: {
      type: String,
      required: [true, "El nombre completo es obligatorio"],
      minlength: [3, "Debe tener mínimo 3 caracteres"],
      maxlength: [150, "Debe tener máximo 150 caracteres"],
    },
    telefono: {
      type: String,
      required: [true, "El teléfono es obligatorio"],
      minlength: [7, "Teléfono no válido"],
      maxlength: [15, "Teléfono demasiado largo"],
    },
    correo: {
      type: String,
      required: [true, "El correo es obligatorio"],
      match: [/.+\@.+\..+/, "Debe ser un correo válido"],
      unique: true,
    },
  },

  {
    versionKey: false,
  }
);

// Crear el modelo para los clientes
const cliente = mongoose.model("clientes", SchemaCliente);

// Exportar el modelo
module.exports = cliente;
