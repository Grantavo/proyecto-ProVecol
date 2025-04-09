const express = require("express");
const router = express.Router();
const conexion = require("../config/conexion");
const bcrypt = require("bcrypt");

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  console.log("➡️ Intento de inicio de sesión con:", { email, password }); // NUEVO LOG

  if (!email || !password) {
    return res.render("inicio_sesion", {
      mensaje: "Por favor, introduce tu correo electrónico y contraseña.",
    });
  }

  try {
    const sql = `SELECT * FROM usuarios WHERE email = ?`;
    conexion.query(sql, [email], async (error, results) => {
      console.log("➡️ Resultados de la consulta a la base de datos:", results); // NUEVO LOG

      if (error) {
        console.error("❌ Error al buscar el usuario:", error.sqlMessage);
        return res.render("inicio_sesion", {
          mensaje: "Error al iniciar sesión.",
        });
      }

      if (results.length > 0) {
        const usuario = results[0];
        console.log("➡️ Contraseña ingresada:", password); // Log de la contraseña ingresada
        console.log(
          "➡️ Contraseña hasheada de la base de datos:",
          usuario.password
        ); // Log de la contraseña de la base de datos
        const passwordMatch = await bcrypt.compare(password, usuario.password);
        console.log(
          "➡️ Resultado de la comparación de contraseñas:",
          passwordMatch
        ); // NUEVO LOG

        if (passwordMatch) {
          // Autenticación exitosa
          req.session.usuario = {
            email: usuario.email,
            // Puedes guardar más información del usuario en la sesión si es necesario
          };
          return res.redirect("/auth/dashboard"); // Redirigir a la página de inicio del usuario (con el /auth)
        } else {
          // Contraseña incorrecta
          return res.render("inicio_sesion", {
            mensaje: "Contraseña incorrecta.",
          });
        }
      } else {
        // Usuario no encontrado
        return res.render("inicio_sesion", {
          mensaje: "Usuario no encontrado.",
        });
      }
    });
  } catch (error) {
    console.error("❌ Error al comparar la contraseña:", error);
    return res.render("inicio_sesion", { mensaje: "Error al iniciar sesión." }); // Cambié '/' a 'inicio_sesion'
  }
});

// Ruta para el dashboard (protegida por sesión) - ¡MOVIDA AQUÍ!
router.get("/dashboard", (req, res) => {
  if (req.session.usuario) {
    res.render("dashboard", { usuario: req.session.usuario }); // Renderiza la vista 'dashboard' y pasa la información del usuario
  } else {
    res.redirect("/inicio_sesion"); // Si no hay sesión, redirige al inicio de sesión
  }
});

module.exports = router;
