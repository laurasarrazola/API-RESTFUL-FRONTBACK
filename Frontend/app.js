/*****************************************
 *           IMPORTAR MÓDULOS            *
 *****************************************/
const express = require("express");
require("dotenv").config();
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

/*****************************************
 *CONFIGURAR EJS COMO MOTOR DE PLANTILLAS*
 *****************************************/
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

/*****************************************
 *    CONFIGURAR ARCHIVOS ESTÁTICOS      *
 *****************************************/
//middlewares  para archivos estaticos
app.use(express.static(path.join(__dirname, "public")));

/*****************************************
 *     PARSEAR DATOS DE FORMULARIOS      *
 *****************************************/
//middleware para habilitar la lectura datos de formularios
app.use(express.urlencoded({ extended: true }));

/*****************************************
 * HABILITAR LECTURA DE JSON EN req.body *
 *****************************************/
//middleware para parsear datos en formato JSON
app.use(express.json()); 


/*****************************************
 *   IMPORTAR Y USAR RUTAS DEFINIDAS     *
 *****************************************/
const productosRouter = require("./routes/productos");
app.use("/", productosRouter);

const usuariosRouter = require("./routes/usuarios");
app.use("/", usuariosRouter);


/*****************************************
 *     INICIAR SERVIDOR EXPRESS          *
 *****************************************/
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

// Ruta de prueba para error 500
app.get("/error500", (req, res, next) => {
  next(new Error("Esto es un error de prueba del servidor"));
});

/*****************************************
 *        MANEJO DE ERRORES 404          *
 *****************************************/
app.use((req, res, next) => {
  res.status(404).render("404"); // vista 404.ejs
});

/*****************************************
 *         MANEJO DE ERRORES 500         *
 *****************************************/
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render("500", { error: err.message });
});
