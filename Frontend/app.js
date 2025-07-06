const express = require("express");
require("dotenv").config();;
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

// Enrutadores
const produtosRouter = require("./router");

//middlewares
app.use('/v1', produtosRouter);

//Configurar ejs como motor de plantillas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//middlewares  para archivos estaticos
app.use(express.static(path.join(__dirname, 'public')));

//iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});