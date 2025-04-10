console.log("✅ mobileMenu.js cargado correctamente");

const MobileMenu = (() => {
  const menuBtn = document.getElementById("menu-btn");
  const menu = document.getElementById("mobile-menu");

  // 🎯 Alternar el menú con animación
  function toggleMenu() {
    if (!menu || !menuBtn) return;

    const isOpen = menu.classList.contains("animate-open");

    if (isOpen) {
      // 🔒 Cerrar menú con animación
      menu.classList.remove("animate-open");
      menu.classList.add("animate-close");

      setTimeout(() => {
        menu.classList.remove("active", "animate-close");
        menu.classList.add("hidden");
      }, 300); // ⏱️ Coincide con transition en CSS

      menuBtn.classList.remove("active");
    } else {
      // 🔓 Abrir menú con animación
      menu.classList.remove("hidden", "animate-close");
      menu.classList.add("active", "animate-open");

      menuBtn.classList.add("active");
    }
  }

  // ❌ Cierra el menú si haces clic en un enlace
  function closeMenu() {
    if (menu && menu.classList.contains("animate-open")) {
      menu.classList.remove("animate-open");
      menu.classList.add("animate-close");

      setTimeout(() => {
        menu.classList.remove("active", "animate-close");
        menu.classList.add("hidden");
      }, 300);
      menuBtn.classList.remove("active");
    }
  }

  // 🎧 Agregar eventos
  function setupEventListeners() {
    if (menuBtn) {
      menuBtn.addEventListener("click", toggleMenu);
    }

    if (menu) {
      const links = menu.querySelectorAll("a");
      links.forEach((link) => link.addEventListener("click", closeMenu));
    }

    // Ocultar menú al cargar
    menu.classList.add("hidden");
  }

  return {
    init: setupEventListeners,
  };
})();

export default MobileMenu;
