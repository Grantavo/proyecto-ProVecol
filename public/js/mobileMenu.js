export const MobileMenu = (() => {
  function setupEventListeners() {
    const menuBtn = document.getElementById("menu-btn");
    const menu = document.getElementById("mobile-menu");

    if (menuBtn && menu) {
      menuBtn.addEventListener("click", () => {
        menu.classList.toggle("hidden");
      });
    }
  }

  function closeMenu() {
    const menu = document.getElementById("mobile-menu");
    if (menu) menu.classList.add("hidden");
  }

  return {
    init: setupEventListeners,
    closeMenu,
  };
})();
