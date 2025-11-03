document.querySelectorAll('.img-compare-container').forEach(container => {
  const overlay = container.querySelector('.img-compare-overlay');
  const slider = container.querySelector('.slider');
  let isDragging = false;

  const startDrag = () => (isDragging = true);
  const stopDrag = () => (isDragging = false);

  const onDrag = (e) => {
    if (!isDragging) return;
    const rect = container.getBoundingClientRect();
    let x = e.clientX - rect.left;
    x = Math.max(0, Math.min(x, rect.width));
    overlay.style.width = `${x}px`;
    slider.style.left = `${x}px`;
  };

  slider.addEventListener('mousedown', startDrag);
  window.addEventListener('mouseup', stopDrag);
  window.addEventListener('mousemove', onDrag);
});


// function initImageCompare() {
//     const containers = document.querySelectorAll('.img-compare-container');

//     containers.forEach(container => {
//         const overlay = container.querySelector('.img-compare-overlay');
//         const slider = container.querySelector('.slider');

//         let isDragging = false;

//         const slideWidth = container.offsetWidth;

//         // Mouse events
//         slider.addEventListener('mousedown', e => { isDragging = true; });
//         window.addEventListener('mouseup', e => { isDragging = false; });
//         window.addEventListener('mousemove', e => {
//             if (!isDragging) return;
//             let rect = container.getBoundingClientRect();
//             let x = e.clientX - rect.left;
//             if (x < 0) x = 0;
//             if (x > rect.width) x = rect.width;
//             overlay.style.width = `${x}px`;
//             slider.style.left = `${x}px`;
//         });

//         // Touch events for mobile
//         slider.addEventListener('touchstart', e => { isDragging = true; });
//         window.addEventListener('touchend', e => { isDragging = false; });
//         window.addEventListener('touchmove', e => {
//             if (!isDragging) return;
//             let touch = e.touches[0];
//             let rect = container.getBoundingClientRect();
//             let x = touch.clientX - rect.left;
//             if (x < 0) x = 0;
//             if (x > rect.width) x = rect.width;
//             overlay.style.width = `${x}px`;
//             slider.style.left = `${x}px`;
//         });
//     });
// }

// // Initialize after DOM is ready
// window.addEventListener('DOMContentLoaded', () => {
//     initImageCompare();
// });


