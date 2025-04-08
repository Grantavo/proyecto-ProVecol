const express = require("express");
const router = express.Router();
const conexion = require("../config/conexion");
const bcrypt = require("bcrypt");

const saltRounds = 10;

router.post("/", async (req, res) => {
  console.log("Contenido de req.body:", req.body);

  const { email, password } = req.body;

  if (!email || !password) {
    return res.redirect("/?mensaje=Faltan datos del registro");
  }

  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const sql = `INSERT INTO usuarios (email, password) VALUES (?, ?)`;

    conexion.query(sql, [email, hashedPassword], (error, results) => {
      if (error) {
        console.error("❌ Error al registrar el usuario:", error.sqlMessage);
        return res.redirect("/?mensaje=Error al registrar el usuario");
      }

      console.log("✅ Usuario registrado con éxito");
      // Redirigir con un mensaje de éxito
      return res.redirect("/?mensaje=Registro exitoso");
    });
  } catch (error) {
    console.error("❌ Error al hashear la contraseña:", error);
    return res.redirect("/?mensaje=Error al registrar el usuario");
  }
});

module.exports = router;
