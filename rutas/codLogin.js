/*
const express = require("express");
const router = express.Router();
const conexion = require("../config/conexion");
const bcrypt = require("bcrypt");

//definimos la ruta de login
router.post("/codLogin", function (req, res) {
  const { email, password } = req.body;

  //validar si el correo existe
  const validar = `SELECT * FROM usuarios WHERE email = ?`;
  conexion.query(validar, [email], async function (error, rows) {
    let mensaje;
    if (error) {
      console.log("❌ Error al validar el correo:", error);
      return res.status(500)("error en el servidor");
    }

    if (rows.length < 1) {
      mensaje = "El correo no existe";
      res.render("inicio_sesion.html", { mensaje, link });
    } else {
      //validar la contraseña
      const usuario = rows[0];
      const mathc = await bcrypt.compare(password, usuario.password);

      if (!mathc) {
        mensaje = "Contraseña incorrecta";
        res.render("index", { mensaje, link });
      } else {
        req.session.usuario = true;
        req.session.usuario = usuario.email;
        console.log(req.session); //comprobar los datos de sesión
        res.render("inicioUsuario", { datos: req.session, link });
      }
    }
  });
});

module.exports = router;
*/