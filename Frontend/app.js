const express = require("express");
require("dotenv").config();
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;



//Configurar ejs como motor de plantillas
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//middlewares  para archivos estaticos
app.use(express.static(path.join(__dirname, "public")));

//middleware para parsear datos de formularios
app.use(express.urlencoded({ extended: true }));

//middleware para parsear datos en formato JSON
app.use(express.json()); 


// Enrutadores
const produtosRouter = require("./router");
//middlewares
app.use("/", produtosRouter);

//iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

//Manejo de errores 404
app.use((req, res, next) => {
  res.status(404).render("error"); // vista 404.ejs
});

// Middleware de manejo de errores
/* eslint-disable no-unused-vars */
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render("500", { error: err.message });
});
