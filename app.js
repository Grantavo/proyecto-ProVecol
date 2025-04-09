// IMPORTACIÓN DE LIBRERÍAS
const express = require("express");
const session = require("express-session"); // Importa express-session
const app = express();
require("dotenv").config(); // Carga las variables de entorno desde .env

// CONFIGURACIÓN DEL SERVIDOR
app.set("view engine", "ejs"); // Motor de plantillas EJS

// Middlewares para procesar datos del formulario y JSON
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Middleware de sesión
app.use(
  session({
    secret: process.env.SESSION_SECRET, // Usa la variable de entorno para la clave secreta
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static("public"));

// RUTAS
const indexRouter = require("./rutas/index");
const regUsuarioRouter = require("./rutas/regUsuario");
const codLoginRouter = require("./rutas/codLogin"); // Importa el router de codLogin

// Ruta principal con mensaje opcional desde query string
app.get("/", (req, res) => {
  res.render("index", { mensaje: req.query.mensaje }); // Pasamos el mensaje a la vista
});

// Subrutas
app.use("/", indexRouter); // Ruta principal
app.use("/regUsuario", regUsuarioRouter); // Registro de usuario
app.use("/auth", codLoginRouter); // Rutas de autenticación (incluyendo el login)

// PUERTO DEL SERVIDOR
// ─────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en ➤ http://localhost:${PORT}`);
});
