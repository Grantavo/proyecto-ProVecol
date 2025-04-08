// IMPORTACIÓN DE LIBRERÍAS
const express = require("express");
const app = express();

// CONFIGURACIÓN DEL SERVIDOR
app.set("view engine", "ejs"); // Motor de plantillas EJS

// Middlewares para procesar datos del formulario y JSON
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static("public"));

// RUTAS

const indexRouter = require("./rutas/index");
const regUsuarioRouter = require("./rutas/regUsuario");

// Ruta principal con mensaje opcional desde query string
app.get("/", (req, res) => {
  res.render("index", { mensaje: req.query.mensaje }); // Pasamos el mensaje a la vista
});

// Subrutas
app.use("/regUsuario", regUsuarioRouter); // Registro de usuario

// PUERTO DEL SERVIDOR
// ─────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en ➤ http://localhost:${PORT}`);
});
