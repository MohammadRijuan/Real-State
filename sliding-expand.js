// const container = document.querySelector('.expand-img-container');
// const originalCards = Array.from(container.children);
// const bullets = document.querySelectorAll('.nav-but');

// let currentIndex = originalCards.length * 4; 
// let isDragging = false;
// let startX, scrollLeft;


// for (let i = 0; i < 4; i++) { 
//   originalCards.forEach(card => {
//     container.appendChild(card.cloneNode(true));
//     container.insertBefore(card.cloneNode(true), container.firstChild); 
//   });
// }

// const allCards = Array.from(container.children);
// let cardWidth = allCards[0].offsetWidth;


// container.scrollLeft = cardWidth * currentIndex;

// //  Overlay slider logic 
// allCards.forEach(containerCard => {
//   const slider = containerCard.querySelector('.slider');
//   const overlay = containerCard.querySelector('.img-compare-overlay');
//   if (!slider || !overlay) return;

//   overlay.style.width = '50%';
//   slider.style.left = '50%';
//   let isDown = false;

//   const slideMove = (x) => {
//     const rect = containerCard.getBoundingClientRect();
//     let pos = x - rect.left;
//     pos = Math.max(0, Math.min(pos, rect.width));
//     overlay.style.width = pos + 'px';
//     slider.style.left = pos + 'px';
//   };

//   slider.addEventListener('mousedown', e => { isDown = true; e.preventDefault(); });
//   window.addEventListener('mouseup', () => isDown = false);
//   window.addEventListener('mousemove', e => { if(isDown) slideMove(e.clientX); });

//   slider.addEventListener('touchstart', e => { isDown = true; e.preventDefault(); });
//   window.addEventListener('touchend', () => isDown = false);
//   window.addEventListener('touchmove', e => { if(isDown) slideMove(e.touches[0].clientX); });
// });

// //Update bullets 
// function updateBullets() {
//   bullets.forEach(b => b.classList.remove('active'));
//   let bulletIndex = (currentIndex - originalCards.length * 4) % bullets.length;
//   bullets[bulletIndex].classList.add('active');
// }

// // Arrow navigation 
// function goNext() {
//   currentIndex++;
//   container.scrollTo({ left: cardWidth * currentIndex, behavior: 'smooth' });
//   setTimeout(checkLoop, 300);
// }

// function goPrev() {
//   currentIndex--;
//   container.scrollTo({ left: cardWidth * currentIndex, behavior: 'smooth' });
//   setTimeout(checkLoop, 300);
// }

// document.getElementById('nextArrow').addEventListener('click', goNext);
// document.getElementById('prevArrow').addEventListener('click', goPrev);


// bullets.forEach(btn => {
//   btn.addEventListener('click', () => {
//     const index = Number(btn.dataset.index);
//     currentIndex = index + originalCards.length * 4;
//     container.scrollTo({ left: cardWidth * currentIndex, behavior: 'smooth' });
//     setTimeout(checkLoop, 300);
//   });
// });

// function checkLoop() {
//   const originalCount = originalCards.length;

//   const totalClonesPerSide = originalCount * 4; 
//   if (currentIndex < totalClonesPerSide) { 
//     currentIndex += originalCount * 4;
//     container.scrollLeft = cardWidth * currentIndex;
//   }

//   if (currentIndex >= totalClonesPerSide + originalCount * 4) { 
//     currentIndex -= originalCount * 4;
//     container.scrollLeft = cardWidth * currentIndex;
//   }



//   updateBullets();
// }









const expandImgSwiper = new Swiper('.cus-swiper', {
    slidesPerView: "auto",
    spaceBetween: 32,
    centeredSlides: false,
    loop: true,         
    navigation: {
        nextEl: '.next-arrows',
        prevEl: '.prev-arrows',
    },
    pagination: {
        el: '.bullet-nav',
        clickable: true,
    },
    // allowTouchMove: false,
    // centeredSlides: true,   
});
