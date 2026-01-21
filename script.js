const carousels = document.querySelectorAll('.carousel');

const initCarousel = (carousel) => {
  const track = carousel.querySelector('.carousel-track');
  const slides = Array.from(carousel.querySelectorAll('.slide'));
  const prevButton = carousel.querySelector('.carousel-btn.prev');
  const nextButton = carousel.querySelector('.carousel-btn.next');

  if (!track || slides.length === 0 || !prevButton || !nextButton) {
    return;
  }

  let activeIndex = 0;
  let autoPlayTimer = null;

  const updateCarousel = () => {
    track.style.transform = `translateX(-${activeIndex * 100}%)`;
    slides.forEach((slide, index) => {
      slide.classList.toggle('is-active', index === activeIndex);
    });
  };

  const goToSlide = (index) => {
    activeIndex = (index + slides.length) % slides.length;
    updateCarousel();
  };

  const startAutoPlay = () => {
    stopAutoPlay();
    autoPlayTimer = setInterval(() => {
      goToSlide(activeIndex + 1);
    }, 6000);
  };

  const stopAutoPlay = () => {
    if (autoPlayTimer) {
      clearInterval(autoPlayTimer);
      autoPlayTimer = null;
    }
  };

  prevButton.addEventListener('click', () => {
    goToSlide(activeIndex - 1);
    startAutoPlay();
  });

  nextButton.addEventListener('click', () => {
    goToSlide(activeIndex + 1);
    startAutoPlay();
  });

  carousel.addEventListener('mouseenter', stopAutoPlay);
  carousel.addEventListener('mouseleave', startAutoPlay);

  updateCarousel();
  startAutoPlay();
};

carousels.forEach(initCarousel);
