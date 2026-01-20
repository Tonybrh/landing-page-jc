const track = document.querySelector('.carousel-track');
const slides = Array.from(document.querySelectorAll('.slide'));
const prevButton = document.querySelector('.carousel-btn.prev');
const nextButton = document.querySelector('.carousel-btn.next');

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

track.addEventListener('mouseenter', stopAutoPlay);
track.addEventListener('mouseleave', startAutoPlay);

updateCarousel();
startAutoPlay();
