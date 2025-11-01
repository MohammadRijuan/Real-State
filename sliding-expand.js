
const container = document.querySelector('.expand-img-container');
const cards = Array.from(container.children);
const bullets = document.querySelectorAll('.nav-but');

// Clone first and last for infinite loop 
const firstClone = cards[0].cloneNode(true);
const lastClone = cards[cards.length - 1].cloneNode(true);

container.appendChild(firstClone);
container.insertBefore(lastClone, cards[0]);

const allCards = Array.from(container.children);
let cardWidth = allCards[0].offsetWidth;
let currentIndex = 1;

// Scroll to first real card
container.scrollLeft = cardWidth * currentIndex;


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
    if (pos < 0) pos = 0;
    if (pos > rect.width) pos = rect.width;
    overlay.style.width = pos + 'px';
    slider.style.left = pos + 'px';
  };

  // Mouse
  slider.addEventListener('mousedown', e => { isDown = true; e.preventDefault(); });
  window.addEventListener('mouseup', () => isDown = false);
  window.addEventListener('mousemove', e => { if(isDown) slideMove(e.clientX); });

  // Touch
  slider.addEventListener('touchstart', e => { isDown = true; e.preventDefault(); });
  window.addEventListener('touchend', () => isDown = false);
  window.addEventListener('touchmove', e => { if(isDown) slideMove(e.touches[0].clientX); });
});

//Update bullets
function updateBullets() {
  bullets.forEach(b => b.classList.remove('active'));
  let bulletIndex = (currentIndex - 1 + bullets.length) % bullets.length;
  bullets[bulletIndex].classList.add('active');
}

//Arrow navigation
function goNext() {
  currentIndex++;
  container.scrollTo({ left: cardWidth * currentIndex, behavior: 'smooth' });
  updateBullets();
}

function goPrev() {
  currentIndex--;
  container.scrollTo({ left: cardWidth * currentIndex, behavior: 'smooth' });
  updateBullets();
}

document.getElementById('nextArrow').addEventListener('click', goNext);
document.getElementById('prevArrow').addEventListener('click', goPrev);

// Bullet click
bullets.forEach(btn => {
  btn.addEventListener('click', () => {
    const index = Number(btn.dataset.index);
    currentIndex = index + 1; 
    container.scrollTo({ left: cardWidth * currentIndex, behavior: 'smooth' });
    updateBullets();
  });
});


container.addEventListener('scroll', () => {

  if (currentIndex <= 0) {
    container.scrollLeft = cardWidth * (allCards.length - 2);
    currentIndex = allCards.length - 2;
  }
  if (currentIndex >= allCards.length - 1) {
    container.scrollLeft = cardWidth;
    currentIndex = 1;
  }
});

// Touch drag
container.addEventListener('touchstart', e => {
  isDragging = true;
  startX = e.touches[0].pageX - container.offsetLeft;
  scrollLeft = container.scrollLeft;
});

container.addEventListener('touchend', () => { isDragging = false; });
container.addEventListener('touchmove', e => {
  if (!isDragging) return;
  const x = e.touches[0].pageX - container.offsetLeft;
  container.scrollLeft = scrollLeft - (x - startX);
  currentIndex = Math.round(container.scrollLeft / cardWidth);
  updateBullets();
});

