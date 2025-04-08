document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const mensaje = urlParams.get("mensaje");

  if (mensaje === "Registro exitoso") {
    // Muestra una alerta
    alert("¡Genial, ya puedes ingresar a tu cuenta!");

    // O, si prefieres un mensaje en la página (por ejemplo, en un div con un ID específico)
    // const mensajeDiv = document.createElement('div');
    // mensajeDiv.textContent = '¡Registro exitoso!';
    // mensajeDiv.style.backgroundColor = '#d4edda'; // Ejemplo de estilo
    // mensajeDiv.style.color = '#155724';
    // mensajeDiv.style.padding = '10px';
    // mensajeDiv.style.marginBottom = '20px';
    // const heroSection = document.getElementById('hero'); // Puedes elegir otra sección
    // if (heroSection) {
    //     heroSection.insertBefore(mensajeDiv, heroSection.firstChild);
    // }
  } else if (mensaje === "Faltan datos del registro") {
    alert("Error: Faltan datos para el registro.");
  } else if (mensaje === "Error al registrar el usuario") {
    alert("Error al registrar el usuario. Por favor, intenta de nuevo.");
  }
});
