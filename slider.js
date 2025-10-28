document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".img-card");
  let current = 0;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
    });
  }

  function nextSlide() {
    current = (current + 1) % slides.length;
    showSlide(current);
  }

  showSlide(current); // show first slide
  setInterval(nextSlide, 4000); // change every 4 seconds
});
