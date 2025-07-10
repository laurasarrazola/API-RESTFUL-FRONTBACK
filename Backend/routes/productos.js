
/*****************************************************
 *                 IMPORTAR MÓDULOS                  *
 *****************************************************/
const express = require("express"); //crear el servidor web y manejar rutas HTTP
const router = express.Router(); //crear un enrutador para manejar las rutas de productos

/*****************************************************
 *           IMPORTACIÓN DE CONTROLADORES            *
 *****************************************************/
const productoController = require("../controller/producto.controller");

/*****************************************************
 *        RUTA PARA VISTA DE CATÁLOGO (FRONTEND)     *
 *****************************************************/
router.get("/index", productoController.consultarProductos);

/*****************************************************
 *          RUTAS API RESTFUL DE PRODUCTOS           *
 *****************************************************/
// Rutas API RESTful para productos
router.get("/api/products", productoController.consultarProductos);
router.post("/api/products", productoController.insertarProductos);
router.put("/api/products/:ref", productoController.actualizarProductos);
router.delete("/api/products/:ref", productoController.EliminarProductos);

module.exports = router;