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
                576:{
                    slidesPerView:1,
                    spaceBetween:32
                },
                768: {
                    slidesPerView: 1.5,
                    spaceBetween: 32
                },
                1024: {
                    slidesPerView: 1.5,
                    spaceBetween: 32
                }
            }
        });