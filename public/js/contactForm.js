export const ContactForm = (() => {
  const init = () => {
    const form = document.querySelector("#contact-form");
    if (!form) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      alert(
        "Gracias por tu mensaje. Nos pondremos en contacto contigo pronto."
      );
      form.reset();
    });
  };

  return { init };
})();
