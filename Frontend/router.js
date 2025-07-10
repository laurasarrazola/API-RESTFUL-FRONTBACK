const express = require("express");
const router = express.Router();
const axios = require("axios");
require("dotenv").config();

const API_BASE_URL = process.env.URL_BASE || "http://localhost:8088";

// Ruta para listar productos
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

// Ruta de login
router.get("/login", (req, res) => {
  res.render("pages/login", { title: "Iniciar Sesión" });
});

router.post("/login", async (req, res) => {
  const { correo, contrasena } = req.body;

  try {
    const response = await axios.post(`${API_BASE_URL}/api/login`, {
      correo,
      contrasena,
    });

    const usuario = response.data;

    if (!usuario) {
      return res.status(401).render("pages/login", {
        title: "Iniciar Sesión",
        error: "Usuario no encontrado",
      });
    }

    // Si todo está bien, redirige al catálogo
    res.redirect("/index");

  } catch (error) {
    console.error("Error al iniciar sesión:", error.toJSON?.() || error);

    // En lugar de lanzar error 500, vuelve al login con mensaje
    return res.status(401).render("pages/login", {
      title: "Iniciar Sesión",
      error: "Credenciales incorrectas o error del servidor",
    });
  }
});



// Ruta de about
router.get("/about", (req, res) => {
  res.render("pages/about", { title: "Acerca de" });
});

router.get("/", (req, res) => {
  res.render("pages/about", { title: "Acerca de" });
});




module.exports = router;
