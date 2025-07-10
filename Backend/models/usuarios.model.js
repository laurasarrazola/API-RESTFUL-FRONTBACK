//importar la configuración de Mongoose desde el archivo correspondiente
const mongoose = require("../config/conection");

// Definir el esquema para los usuarios
const SchemaUsuario = new mongoose.Schema(
  {
    documento: {
      type: String,
      required: [true, "El documento es obligatorio"],
      minLength: [7, "El documento debe tener al menos 7 caracteres"],
      maxLength: [10, "El documento debe tener como máximo 10 caracteres"],
    },
    nombreCompleto: {
      type: String,
      minLength: [3, "El nombre completo debe tener al menos 3 caracteres"],
      maxLength: [
        150,
        "El nombre completo debe tener como máximo 150 caracteres",
      ],
    },
    FNacimiento: {
      type: Date,
      default: Date.now,
      max: Date.now,
    },

    correo: {
      type: String,
      required: [true, "El correo es obligatorio"],
      unique: true,
      match: [/\S+@\S+\.\S+/, "El correo debe tener un formato válido"],
    },

    contrasena: {
      type: String,
      required: [true, "La contraseña es obligatoria"],
      minLength: [6, "La contraseña debe tener al menos 6 caracteres"],
    }
  },
  
  {
    versionKey: false,
  }
);

// Crear el modelo para los usuarios
const usuario = mongoose.model("usuarios", SchemaUsuario);

// Exportar el modelo
module.exports = usuario;
