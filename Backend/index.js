/*****************************************
 *           IMPORTAR MÓDULOS            *
 *****************************************/
const express = require("express"); //crear el servidor web y manejar rutas HTTP
const mongoose = require("mongoose"); //conectarse a MongoDB y manejar modelos de datos
const morgan = require("morgan"); //registrar en consola las peticiones HTTP (útil para depurar)
const dotenv = require("dotenv"); //Carga las variables de entorno desde el archivo .env
const path = require("path"); //manejar rutas de archivos y directorios en el sistema de archivos

/*****************************************
 *     CARGA DE VARIABLES DE ENTORNO     *
 *****************************************/
dotenv.config();

/*****************************************
 *     IMPORTACIÓN DE CONTROLADORES      *
 *****************************************/
const clienteController = require("./controller/cliente.controller");
/*const productoController = require("./controller/producto.controller");*/
/*const usuarioController = require("./controller/usuario.controller");*/

/*****************************************
 *INICIALIZAR EXPRESS Y CONFIGURAR PUERTO*
 *****************************************/
const app = express();
// Configuración del motor de vistas EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const PORT = process.env.PORT || 3000;

/*****************************************
 *     CONFIGURACIÓN DE MIDDLEWARES      *
 *****************************************/
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/******************************************************
 *                   💡💡💡💡💡💡                      *
 * Middleware es un tipo de software que actúa        *
 * como un puente entre diferentes aplicaciones,      *
 * sistemas operativos o servicios, facilitando su    *
 * comunicación e integración sin que tengan que      *
 *estar diseñados específicamente para trabajar juntos*
 *****************************************************/

/******************************************************************************************************
 * app.use(morgan("dev"));                                                                             *
 * Muestra en consola cada solicitud que llega al servidor (método, ruta, tiempo, etc.).               *
 *                                                                                                     *
 * app.use(express.json());                                                                            *
 * Cuando un cliente (como Postman, un frontend con Axios o Fetch) envía datos en formato JSON,        *
 * esta línea permite que Express los entienda y los convierta en un objeto accesible desde req.body   *
 *                                                                                                     *
 * app.use(express.urlencoded({ extended: false }));                                                   *
 * Permite que el servidor lea datos enviados desde formularios HTML (método POST).                    *
 * El parámetro extended: false indica que solo acepta datos simples (no objetos anidados).            *
 *******************************************************************************************************/

/*****************************************
 *      MONTAJE DE RUTAS SEPARADAS       *
 *****************************************/
const productosRouter = require("./routes/productos");
app.use("/", productosRouter);

const usuarioRoutes = require("./routes/usuarios");
app.use("/api", usuarioRoutes);

/*****************************************
 *         RUTAS GET DE LAS VISTAS       *
 *****************************************/
//Redirige la ruta raíz "/" hacia la página de login
app.get("/", (req, res) => {
  res.redirect("/login");
});

//Muestra la página "about.ejs" cuando se accede a "/about"
app.get("/about", (req, res) => {
  res.render("pages/about");
});

// Muestra la página de login cuando se accede a "/login"
app.get("/login", (req, res) => {
  res.render("pages/login");
});

/*****************************************
 *           RUTAS API RESTFUL           *
 *****************************************/
// Rutas API RESTful para productos
/*app.get("/api/products", productoController.consultarProductos);
app.post("/api/products", productoController.insertarProductos);
app.put("/api/products/:ref", productoController.actualizarProductos);
app.delete("/api/products/:ref", productoController.EliminarProductos);*/

// Rutas API RESTful para clientes
app.get("/api/clientes", clienteController.consultarClientes);
app.post("/api/clientes", clienteController.insertarClientes);
app.put("/api/clientes/:ref", clienteController.actualizarClientes);
app.delete("/api/clientes/:id", clienteController.eliminarClientes);

/*// Rutas API RESTful para usuarios
app.get("/api/usuarios", usuarioController.consultarUsuarios);
app.post("/api/usuarios", usuarioController.insertarUsuarios);
app.put("/api/usuarios/:ref", usuarioController.actualizarUsuarios);
app.delete("/api/usuarios/:id", usuarioController.eliminarUsuarios);*/

/*
Esta forma asume que clienteController es un enrutador (express.Router()), no solo un objeto con funciones.

app.use('/api/clientes', clienteController);
app.use('/api/productos', productoController);
app.use('/api/usuarios', usuarioController);*/

// 11. Servir archivos estáticos (por ejemplo, CSS)
/*app.use(express.static(path.join(__dirname, "public")));*/

// 12. Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
