/**
 * Archivo de configuración de la conexión a MongoDB usando Mongoose.
 * Utiliza variables de entorno para mayor seguridad y flexibilidad.
 */

// Importar mongoose para manejar la conexión a MongoDB
const mongoose = require("mongoose");

// Importar dotenv para leer variables de entorno desde el archivo .env
require("dotenv").config();

// Construir la URI de conexión usando las variables de entorno
const URI = `mongodb+srv://${process.env.USER_BD}:${process.env.PASS_BD}@cluster0.buuk8nn.mongodb.net/${process.env.DB_NAME}`;

// Conectar a MongoDB
mongoose.connect(URI);

// Exportar la instancia de mongoose para usarla en los modelos
module.exports = mongoose;
