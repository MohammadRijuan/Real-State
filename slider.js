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

  showSlide(current); 
  setInterval(nextSlide, 4000); 
});


document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".review-container");
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

  showSlide(current);
  setInterval(nextSlide, 4000);
});




