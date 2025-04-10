// Importar los módulos necesarios
const express = require("express");
const router = express.Router();
const conexion = require("../config/conexion");
const bcrypt = require("bcrypt");
const { Resend } = require("resend");

// Inicializar el cliente de Resend (reemplazar con tu clave API real)
const resend = new Resend("re_TAiAqRRX_3xkCxNCuX1VUYWdXBLci48AH");

// Definir el número de rondas de sal para el hash de contraseñas
const saltRounds = 10;

// Ruta para manejar el registro de usuarios (solicitud POST a la ruta raíz '/')
router.post("/", async (req, res) => {
  // Registrar el contenido del cuerpo de la solicitud para propósitos de depuración
  console.log("Contenido de req.body:", req.body);

  // Extraer el correo electrónico y la contraseña del cuerpo de la solicitud
  const { email, password } = req.body;

  // Validación de entrada: Verificar si se proporcionaron el correo electrónico o la contraseña
  if (!email || !password) {
    // Si falta el correo electrónico o la contraseña, redirigir de vuelta a la página de registro con un mensaje de error
    return res.redirect("/registro?mensaje=Faltan datos del registro");
  }

  try {
    // Paso 1: Verificar si ya existe un usuario con el correo electrónico proporcionado en la base de datos
    conexion.query(
      "SELECT * FROM usuarios WHERE email = ?",
      [email],
      async (error, results) => {
        // Manejar errores de consulta a la base de datos durante la verificación de existencia
        if (error) {
          console.error("❌ Error al verificar el usuario:", error.sqlMessage);
          return res.redirect(
            "/registro?mensaje=Error al registrar el usuario",
          );
        }

        // Paso 2: Si se encuentra un usuario con el correo electrónico proporcionado
        if (results.length > 0) {
          // Redirigir de vuelta a la página de registro con un mensaje indicando que el correo ya está registrado
          return res.redirect(
            "/registro?mensaje=!Ups¡ Lo siento, este usuario ya está registrado",
          );
        } else {
          // Paso 3: Si el correo no está registrado, proceder con la creación del nuevo usuario
          try {
            // Hashear la contraseña del usuario usando bcrypt
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            // Consulta SQL para insertar el correo y la contraseña hasheada del nuevo usuario en la tabla 'usuarios'
            const sql = `INSERT INTO usuarios (email, password) VALUES (?, ?)`;

            // Ejecutar la consulta de inserción en la base de datos
            conexion.query(
              sql,
              [email, hashedPassword],
              async (insertError, insertResults) => {
                // Manejar errores durante el registro del usuario (inserción)
                if (insertError) {
                  console.error(
                    "❌ Error al registrar el usuario:",
                    insertError.sqlMessage,
                  );
                  return res.redirect(
                    "/registro?mensaje=Error al registrar el usuario",
                  );
                }

                // Registrar un mensaje de éxito indicando que el usuario ha sido registrado
                console.log("✅ Usuario registrado con éxito");

                // Paso 4: Enviar un correo de bienvenida usando Resend (opcional, para propósitos de prueba)
                try {
                  const data = await resend.emails.send({
                    from: "Acme <onboarding@resend.dev>", // Reemplazar con tu dirección de correo verificada en Resend.dev
                    to: "kabtavo@gmail.com", // Reemplazar con tu correo personal para pruebas
                    subject: "Nuevo usuario registrado en ProVecol",
                    html: `<p>Se ha registrado un nuevo usuario con la siguiente información:</p>
                                       <ul>
                                           <li><strong>Correo electrónico:</strong> ${email}</li>
                                       </ul>`,
                  });
                  console.log("Correo electrónico enviado:", data);
                } catch (sendError) {
                  console.error(
                    "Error al enviar el correo de notificación:",
                    sendError,
                  );
                }

                // Paso 5: Redirigir al usuario a la página principal con un mensaje de éxito
                return res.redirect("/inicio_sesion?mensaje=Registro exitoso");
              },
            );
          } catch (hashError) {
            // Manejar errores que ocurran durante el proceso de hash de la contraseña
            console.error("❌ Error al hashear la contraseña:", hashError);
            return res.redirect(
              "/registro?mensaje=Error al registrar el usuario",
            );
          }
        }
      },
    );
  } catch (error) {
    // Manejar cualquier error inesperado que pueda ocurrir durante el proceso
    console.error("⚠️ Error inesperado durante el registro:", error);
    return res.redirect(
      "/registro?mensaje=Error inesperado durante el registro",
    );
  }
});

// Exportar el router para que pueda ser utilizado por la aplicación principal de Express
module.exports = router;
