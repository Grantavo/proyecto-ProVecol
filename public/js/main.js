// =========================
// 🌐 Archivo principal main.js
// =========================

// 🧩 Importación de módulos individuales
import { ScrollMenu } from "./scrollMenu.js";
import MobileMenu from "./mobileMenu.js";
import { Carousel } from "./carousel.js";
import { ContactForm } from "./contactForm.js";

// 🚀 Ejecutar todo cuando el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", () => {
  // 🔽 Inicializa el scroll dinámico del menú
  ScrollMenu.init();

  // 📱 Inicializa el menú móvil (hamburguesa)
  MobileMenu.init();

  // 🎠 Inicializa el carrusel de productos
  Carousel.init();

  // 📬 Inicializa el formulario de contacto
  ContactForm.init();

  // ✅ Ocultar automáticamente el mensaje de éxito si existe
  const alerta = document.getElementById("mensaje-alerta");
  if (alerta) {
    setTimeout(() => alerta.remove(), 3000);
    console.log("⏳ Mensaje de éxito eliminado después de 3 segundos");
  }
});
