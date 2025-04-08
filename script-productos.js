"use strict";

const App = (() => {
  const Utils = {
    qs: (selector, parent = document) => parent.querySelector(selector),
    qsa: (selector, parent = document) => parent.querySelectorAll(selector),
    addMultipleListeners: (element, events, handler) =>
      events.forEach((event) => element.addEventListener(event, handler)),
  };

  const ProductManager = (() => {
    const init = () => {
      const searchInput = Utils.qs("#search-input");
      const searchSuggestions = Utils.qs("#search-suggestions");
      const gridViewBtn = Utils.qs("#grid-view");
      const listViewBtn = Utils.qs("#list-view");
      const productGrid = Utils.qs("#product-grid");

      const products = [
        {
          name: "Herramienta Eléctrica",
          price: "$150.00",
          img: "/imagenes/herramienta eléctrica.jpg",
        },
        { name: "Pinza Manual", price: "$10.00", img: "/imagenes/pinza.png" },
      ];

      const renderProducts = (view = "grid") => {
        productGrid.innerHTML = "";
        products.forEach((product) => {
          const productDiv = document.createElement("div");
          productDiv.className = `producto ${
            view === "list" ? "list-view" : "grid-view"
          }`;
          productDiv.innerHTML = `
            <img src="${product.img}" alt="${product.name}" />
            <h3>${product.name}</h3>
            <p>${product.price}</p>
            <div class="quantity-controls">
              <button class="quantity-btn">-</button>
              <input type="number" class="quantity-input" value="1" min="1" />
              <button class="quantity-btn">+</button>
            </div>
          `;
          productGrid.appendChild(productDiv);

          const quantityInput = productDiv.querySelector(".quantity-input");
          const decreaseBtn = productDiv.querySelector(
            ".quantity-btn:first-child"
          );
          const increaseBtn = productDiv.querySelector(
            ".quantity-btn:last-child"
          );

          decreaseBtn.addEventListener("click", () => {
            if (quantityInput.value > 1) quantityInput.value--;
          });
          increaseBtn.addEventListener("click", () => quantityInput.value++);
        });
      };

      searchInput.addEventListener("input", () => {
        const query = searchInput.value.toLowerCase();
        searchSuggestions.innerHTML = "";
        if (query) {
          const filtered = products.filter((p) =>
            p.name.toLowerCase().includes(query)
          );
          filtered.forEach((product) => {
            const suggestion = document.createElement("div");
            suggestion.className = "suggestion-item";
            suggestion.innerHTML = `
              <img src="${product.img}" alt="${product.name}" class="suggestion-image" />
              <span class="suggestion-text">${product.name}</span>
            `;
            suggestion.addEventListener("click", () => {
              searchInput.value = product.name;
              searchSuggestions.style.display = "none";
            });
            searchSuggestions.appendChild(suggestion);
          });
          searchSuggestions.style.display = filtered.length ? "block" : "none";
        } else {
          searchSuggestions.style.display = "none";
        }
      });

      gridViewBtn.addEventListener("click", () => {
        gridViewBtn.classList.add("active");
        listViewBtn.classList.remove("active");
        renderProducts("grid");
      });

      listViewBtn.addEventListener("click", () => {
        listViewBtn.classList.add("active");
        gridViewBtn.classList.remove("active");
        renderProducts("list");
      });

      Utils.qsa(".toggle-submenu").forEach((button) => {
        button.addEventListener("click", () => {
          const submenu = button.parentElement.nextElementSibling;
          submenu.classList.toggle("active");
          button.textContent = submenu.classList.contains("active") ? "-" : "+";
        });
      });

      renderProducts("grid");
    };

    return { init };
  })();

  const handleHamburgerMenu = () => {
    const hamburger = Utils.qs(".hamburger");
    const navLinks = Utils.qs(".nav-links");

    if (!hamburger || !navLinks) {
      console.error("Error: .hamburger o .nav-links no encontrados en el DOM");
      return;
    }

    hamburger.addEventListener("click", () => {
      console.log("Clic en hamburguesa detectado");
      navLinks.classList.toggle("active");
      console.log(
        "Clase .active toggled. Estado actual:",
        navLinks.classList.contains("active")
      );
    });
  };

  const handleScroll = () => {
    let lastScroll = 0;
    const header = Utils.qs("header");

    window.addEventListener("scroll", () => {
      const currentScroll = window.pageYOffset;
      if (currentScroll > lastScroll && currentScroll > 80) {
        header.style.transform = "translateY(-100%)";
      } else {
        header.style.transform = "translateY(0)";
      }
      lastScroll = currentScroll;
    });
  };

  document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM completamente cargado");
    ProductManager.init();
    handleScroll();
    handleHamburgerMenu();
  });
})();
