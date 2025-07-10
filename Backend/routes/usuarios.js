const express = require("express");
const router = express.Router();
const Usuario = require("../models/usuarios.model");

// Ruta POST /api/login
router.post("/login", async (req, res) => {
  const { correo, contrasena } = req.body;

  try {
    const usuario = await Usuario.findOne({ correo, contrasena });

    if (!usuario) {
      return res.status(401).json({ mensaje: "Credenciales incorrectas" });
    }

    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({ mensaje: "Error en el servidor", error });
  }
});

module.exports = router;
