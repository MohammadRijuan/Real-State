const container = document.querySelector('.expand-img-container');
const originalCards = Array.from(container.children);
const bullets = document.querySelectorAll('.nav-but');

let currentIndex = originalCards.length * 4; 
let isDragging = false;
let startX, scrollLeft;


for (let i = 0; i < 4; i++) { 
  originalCards.forEach(card => {
    container.appendChild(card.cloneNode(true));
    container.insertBefore(card.cloneNode(true), container.firstChild); 
  });
}

const allCards = Array.from(container.children);
let cardWidth = allCards[0].offsetWidth;


container.scrollLeft = cardWidth * currentIndex;

//  Overlay slider logic 
allCards.forEach(containerCard => {
  const slider = containerCard.querySelector('.slider');
  const overlay = containerCard.querySelector('.img-compare-overlay');
  if (!slider || !overlay) return;

  overlay.style.width = '50%';
  slider.style.left = '50%';
  let isDown = false;

  const slideMove = (x) => {
    const rect = containerCard.getBoundingClientRect();
    let pos = x - rect.left;
    pos = Math.max(0, Math.min(pos, rect.width));
    overlay.style.width = pos + 'px';
    slider.style.left = pos + 'px';
  };

  slider.addEventListener('mousedown', e => { isDown = true; e.preventDefault(); });
  window.addEventListener('mouseup', () => isDown = false);
  window.addEventListener('mousemove', e => { if(isDown) slideMove(e.clientX); });

  slider.addEventListener('touchstart', e => { isDown = true; e.preventDefault(); });
  window.addEventListener('touchend', () => isDown = false);
  window.addEventListener('touchmove', e => { if(isDown) slideMove(e.touches[0].clientX); });
});

// Update bullets 
function updateBullets() {
  bullets.forEach(b => b.classList.remove('active'));
  let bulletIndex = (currentIndex - originalCards.length * 4) % bullets.length;
  bullets[bulletIndex].classList.add('active');
}

//  Arrow navigation 
function goNext() {
  currentIndex++;
  container.scrollTo({ left: cardWidth * currentIndex, behavior: 'smooth' });
  setTimeout(checkLoop, 300);
}

function goPrev() {
  currentIndex--;
  container.scrollTo({ left: cardWidth * currentIndex, behavior: 'smooth' });
  setTimeout(checkLoop, 300);
}

document.getElementById('nextArrow').addEventListener('click', goNext);
document.getElementById('prevArrow').addEventListener('click', goPrev);


bullets.forEach(btn => {
  btn.addEventListener('click', () => {
    const index = Number(btn.dataset.index);
    currentIndex = index + originalCards.length * 4;
    container.scrollTo({ left: cardWidth * currentIndex, behavior: 'smooth' });
    setTimeout(checkLoop, 300);
  });
});

function checkLoop() {
  const originalCount = originalCards.length;

  const totalClonesPerSide = originalCount * 4; 
  if (currentIndex < totalClonesPerSide) { 
    currentIndex += originalCount * 4;
    container.scrollLeft = cardWidth * currentIndex;
  }

  if (currentIndex >= totalClonesPerSide + originalCount * 4) { 
    currentIndex -= originalCount * 4;
    container.scrollLeft = cardWidth * currentIndex;
  }

  updateBullets();
}





// const container = document.getElementById('expand-img-container');
// const slidesContainer = document.getElementById('slides');
// const prev = document.getElementById('prevArrow');
// const next = document.getElementById('nextArrow');

// let slides = Array.from(slidesContainer.getElementsByClassName('img-compare-container'));
// const slideWidth = slides[0].offsetWidth + 20; // includes margin
// let index = 0;
// let allowShift = true;

// // --- Clone slides for infinite loop ---
// const firstSlide = slides[0].cloneNode(true);
// const lastSlide = slides[slides.length - 1].cloneNode(true);
// slidesContainer.appendChild(firstSlide);
// slidesContainer.insertBefore(lastSlide, slides[0]);
// slides = Array.from(slidesContainer.getElementsByClassName('img-compare-container'));
// slidesContainer.style.left = `-${slideWidth}px`;
// index = 1;

// // --- Overlay slider for each slide ---
// slides.forEach(slide => {
//   const overlay = slide.querySelector('.img-compare-overlay');
//   const slider = slide.querySelector('.slider');
//   if (!overlay || !slider) return;

//   overlay.style.width = '50%';
//   slider.style.left = '50%';

//   let isDown = false;

//   const slideMove = (x) => {
//     const rect = slide.getBoundingClientRect();
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

// // --- Shift carousel ---
// function shiftSlide(dir) {
//   if (!allowShift) return;
//   allowShift = false;
//   index += dir;
//   slidesContainer.style.transition = 'left 0.3s ease';
//   slidesContainer.style.left = `-${slideWidth * index}px`;
// }

// slidesContainer.addEventListener('transitionend', () => {
//   if (index === 0) {
//     slidesContainer.style.transition = 'none';
//     index = slides.length - 2;
//     slidesContainer.style.left = `-${slideWidth * index}px`;
//   }
//   if (index === slides.length - 1) {
//     slidesContainer.style.transition = 'none';
//     index = 1;
//     slidesContainer.style.left = `-${slideWidth * index}px`;
//   }
//   allowShift = true;
// });

// prev.addEventListener('click', () => shiftSlide(-1));
// next.addEventListener('click', () => shiftSlide(1));

// // --- Touch drag carousel ---
// let startX = 0;
// let scrollLeft = 0;
// let isDragging = false;

// slidesContainer.addEventListener('touchstart', e => {
//   isDragging = true;
//   startX = e.touches[0].pageX;
//   scrollLeft = index;
// });
// slidesContainer.addEventListener('touchmove', e => {
//   if (!isDragging) return;
//   const x = e.touches[0].pageX;
//   const walk = (startX - x) / slideWidth;
//   if (walk > 0.2) { shiftSlide(1); isDragging=false; }
//   if (walk < -0.2) { shiftSlide(-1); isDragging=false; }
// });
// slidesContainer.addEventListener('touchend', () => { isDragging = false; });

