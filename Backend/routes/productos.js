
/*******************************************
 *            IMPORTAR MÓDULOS             *
 *******************************************/
const express = require("express"); //crear el servidor web y manejar rutas HTTP
const router = express.Router(); //crear un enrutador para manejar las rutas de productos
const Producto = require("../models/productos.model");

/*******************************************
 *      IMPORTACIÓN DE CONTROLADORES       *
 *******************************************/
const productoController = require("../controller/producto.controller");

/*******************************************
 * RUTA PARA VISTA DE CATÁLOGO (FRONTEND)  *
 *******************************************/
router.get("/index", productoController.consultarProductos);

/*******************************************
 *     RUTAS API RESTFUL DE PRODUCTOS      *
 *******************************************/
router.get("/api/products", productoController.consultarProductos);
router.post("/api/products", productoController.insertarProductos);
router.put("/api/products/:ref", productoController.actualizarProductos);
router.delete("/api/products/:ref", productoController.EliminarProductos);

module.exports = router;