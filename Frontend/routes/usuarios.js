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
 *             RUTA GET LOGIN            *
 *****************************************/
router.get("/login", (req, res) => {
  res.render("pages/login", { title: "Iniciar Sesión" });
});

/*****************************************
 *            RUTA POST LOGIN            *
 *****************************************/
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


/*****************************************
 *           RUTA ABOUT Y RAIZ           *
 *****************************************/
router.get("/about", (req, res) => {
  res.render("pages/about", { title: "Acerca de" });
});

router.get("/", (req, res) => {
  res.render("pages/about", { title: "Acerca de" });
});

module.exports = router;