/*****************************************
 *           IMPORTAR MÓDULOS            *
 *****************************************/
const express = require("express");
const router = express.Router();
const axios = require("axios");
require("dotenv").config();

/*****************************************
 *      DEFINIR URL BASE DE LA API       *
 *****************************************/
const API_BASE_URL = process.env.URL_BASE || "http://localhost:8088";

/*****************************************
 *          RUTA GET PRODCUTOS           *
 *****************************************/
// Listar productos
router.get("/index", async (req, res) => {
  try {
    //hacer petición GET a la API del backend
  const { data: productos } = await axios.get(`${API_BASE_URL}/api/products`);

    // Renderizar la vista con los productos
    res.render("pages/index", {
      productosEncontrados: productos,
      title: "Lista de Productos"
    });
  } catch (error) {
    console.error("Error al obtener los productos:");
    console.error(error.toJSON?.() || error);

    //Renderizar página de error
    res.status(500).render("error", {
      error: "error del servidor",
      message: "No se pudo cargar la lista de productos. Revise el backend."
    });
  }
});

module.exports = router;
