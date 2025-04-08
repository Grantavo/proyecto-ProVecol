const express = require("express"); // Ruta principal de la aplicación

// importar la librería express
const router = express.Router(); // importar el router de express para crear rutas
const link = require("../config/link"); // importar la variable link desde el archivo config/link.js

// importar la variable link desde el archivo config/link.js
router.get("/", function (req, res) {
  res.render("index", { link }); // renderizar la vista index.ejs y pasarle la variable link
});

module.exports = router; // exportar el router para usarlo en app.js
