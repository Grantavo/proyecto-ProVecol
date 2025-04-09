const express = require("express"); // Ruta principal de la aplicación

// importar la librería express
const router = express.Router(); // importar el router de express para crear rutas
const link = require("../config/link"); // importar la variable link desde el archivo config/link.js

// importar la variable link desde el archivo config/link.js
router.get("/", function (req, res) {
  res.render("index", { link }); // renderizar la vista index.ejs y pasarle la variable link
});

// Ruta para la página de inicio de sesión
router.get("/inicio_sesion", function (req, res) {
  res.render("inicio_sesion", { link, mensaje: "" }); // Pasar 'mensaje' con un valor vacío
});

module.exports = router; // exportar el router para usarlo en app.js
