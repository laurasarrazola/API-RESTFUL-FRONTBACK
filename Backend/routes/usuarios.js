/*******************************************
 *            IMPORTAR MÓDULOS             *
 *******************************************/
const express = require("express");
const router = express.Router();
const Usuario = require("../models/usuarios.model");

/*******************************************
 *      IMPORTACIÓN DE CONTROLADORES       *
 *******************************************/
const usuarioController = require("../controller/usuario.controller");

/*******************************************
 *VERIFICAR CREDENCIALES DE USUARIO EN LOGIN*
 *******************************************/
router.post("/login", async (req, res) => {
  const { correo, contrasena } = req.body;

  try {
    const usuario = await Usuario.findOne({ correo, contrasena });

    if (!usuario) {
      return res.status(401).json({ mensaje: "Credenciales incorrectas" });
    } else {
      res.status(200).json(usuario);
    }
  } catch (error) {
    res.status(500).json({ mensaje: "Error en el servidor", error });
  }
});

/*******************************************
 *     RUTAS API RESTFUL DE USUARIOS       *
 *******************************************/
router.get("/api/usuarios", usuarioController.consultarUsuarios);
router.post("/api/usuarios", usuarioController.insertarUsuarios);
router.put("/api/usuarios/:ref", usuarioController.actualizarUsuarios);
router.delete("/api/usuarios/:id", usuarioController.eliminarUsuarios);

module.exports = router;


/*****************************************************
router.post("/login", async (req, res) => {
  const { correo, contrasena } = req.body;
//Extrae los datos enviados desde el formulario: correo y contrasena.
Debe coincidir con los atributos definidos en el modelo del usuario y con los <input name="..."> del formulario.

});
 *****************************************************/
