import { ScrollMenu } from "./scrollMenu.js";
import { MobileMenu } from "./mobileMenu.js";
import { Carousel } from "./carousel.js";
import { ContactForm } from "./contactForm.js";

document.addEventListener("DOMContentLoaded", () => {
  ScrollMenu.init();
  MobileMenu.init();
  Carousel.init();
  ContactForm.init();

  // Eliminar mensaje de éxito si existe
  const alerta = document.getElementById("mensaje-alerta");
  if (alerta) {
    setTimeout(() => {
      alerta.remove();
    }, 3000);
  }
});
