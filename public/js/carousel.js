// public/js/carousel.js
export const Carousel = (() => {
  let carouselContainer;
  let carouselTrack;
  let carouselItems;
  let prevButton;
  let nextButton;
  let currentIndex = 0;
  let itemWidth;
  let trackWidth;
  let intervalId;
  let itemsToShow;

  const config = {
    autoplayInterval: 2500,
  };

  function init() {
    console.log("Carrusel inicializado");

    carouselContainer = document.querySelector(".carousel-container");
    carouselTrack = document.querySelector(".carousel-track");
    carouselItems = document.querySelectorAll(".carousel-item");
    prevButton = document.querySelector(".carousel-control.prev");
    nextButton = document.querySelector(".carousel-control.next");

    if (!carouselItems.length) {
      console.warn("No se encontraron elementos del carrusel.");
      return;
    }

    const containerWidth = carouselContainer.offsetWidth;
    itemWidth = carouselItems[0].offsetWidth;
    itemsToShow = Math.floor(containerWidth / itemWidth);

    trackWidth = itemWidth * carouselItems.length;
    carouselTrack.style.width = `${trackWidth}px`;

    function moveToSlide(index) {
      // Aseguramos que el índice esté dentro de los límites
      if (index < 0) {
        index = carouselItems.length - itemsToShow;
      } else if (index >= carouselItems.length) {
        index = 0;
      }
      carouselTrack.style.transform = `translateX(-${index * itemWidth}px)`;
      currentIndex = index;
      updateButtons();
    }

    function nextSlide() {
      moveToSlide(currentIndex + itemsToShow);
    }

    function prevSlide() {
      moveToSlide(currentIndex - itemsToShow);
    }

    function updateButtons() {
      if (prevButton && nextButton) {
        // Para un scroll infinito, los botones siempre deberían estar habilitados (visualmente)
        prevButton.disabled = false;
        nextButton.disabled = false;
      }
    }

    if (nextButton) {
      nextButton.addEventListener("click", nextSlide);
    }
    if (prevButton) {
      prevButton.addEventListener("click", prevSlide);
    }

    function startAutoplay() {
      intervalId = setInterval(nextSlide, config.autoplayInterval);
    }

    function stopAutoplay() {
      clearInterval(intervalId);
    }

    startAutoplay();

    if (carouselContainer) {
      carouselContainer.addEventListener("mouseenter", stopAutoplay);
      carouselContainer.addEventListener("mouseleave", startAutoplay);
    }

    updateButtons();
    moveToSlide(currentIndex);
  }

  return { init };
})();
