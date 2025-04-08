export const ScrollMenu = (() => {
  let lastScroll = 0;
  let header; // Variable para almacenar el elemento header

  function handleScroll() {
    if (!header) return; // Asegurarse de que el header se ha encontrado

    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
      header.style.transform = "translateY(0)"; // Mostrar el header en la parte superior
      return;
    }

    if (currentScroll > lastScroll) {
      // Scrolling hacia abajo
      header.style.transform = "translateY(-100%)"; // Ocultar el header
    } else {
      // Scrolling hacia arriba
      header.style.transform = "translateY(0)"; // Mostrar el header
    }

    lastScroll = currentScroll;
  }

  function init() {
    header = document.querySelector("header"); // Seleccionar el elemento header
    if (header) {
      window.addEventListener("scroll", handleScroll);
    } else {
      console.error("No se encontró ningún elemento <header> en el DOM.");
    }
  }

  return { init };
})();
