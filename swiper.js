var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1.5,
    spaceBetween: 32,
    centeredSlides: false,
    loop: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    breakpoints: {
        576: {
            slidesPerView: 1,
            spaceBetween: 32
        },
        768: {
            slidesPerView: 1,
            spaceBetween: 32
        },
        1024: {
            slidesPerView: 1.5,
            spaceBetween: 32
        }
    }
});


document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".gallery-slide");
  const nextBtn = document.querySelector(".swiper-button-next");
  const prevBtn = document.querySelector(".swiper-button-prev");
  let current = 0;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
    });
  }

  nextBtn.addEventListener("click", () => {
    current = (current + 1) % slides.length; 
    showSlide(current);
  });

  prevBtn.addEventListener("click", () => {
    current = (current - 1 + slides.length) % slides.length; 
    showSlide(current);
  });


  showSlide(current);
});
