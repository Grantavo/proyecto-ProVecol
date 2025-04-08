// Esperar a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", function () {
  // Seleccionar el formulario
  const form = document.querySelector(".my-form");

  // Añadir un evento al enviar el formulario
  form.addEventListener("submit", function (event) {
    // Obtener los valores de los campos de contraseña
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    // Validar si las contraseñas coinciden
    if (password !== confirmPassword) {
      // Prevenir el envío del formulario
      event.preventDefault();

      // Mostrar una alerta simple del navegador
      alert("Las contraseñas deben coincidir. Por favor, verifica.");
    }

    // Si coinciden, el formulario se envía normalmente
  });
});
