function initCompareControls() {
  // select both original and cloned slides (loop creates clones)
  const containers = document.querySelectorAll('.img-compare-container');

  // safety helpers to enable/disable swiper reliably
  const disableSwiperTouch = () => {
    if (window.expandImgSwiper && typeof window.expandImgSwiper === 'object') {
      window.expandImgSwiper.allowTouchMove = false;
    }
    // clear any previous re-enable timeout
    if (window.__enableSwiperTimeout) {
      clearTimeout(window.__enableSwiperTimeout);
      window.__enableSwiperTimeout = null;
    }
  };
  const enableSwiperTouch = (delay = 0) => {
    // schedule a safe re-enable so it never gets stuck
    if (window.__enableSwiperTimeout) clearTimeout(window.__enableSwiperTimeout);
    window.__enableSwiperTimeout = setTimeout(() => {
      if (window.expandImgSwiper && typeof window.expandImgSwiper === 'object') {
        window.expandImgSwiper.allowTouchMove = true;
      }
      window.__enableSwiperTimeout = null;
    }, delay);
  };

  containers.forEach(container => {
    // avoid double-init
    if (container.dataset.compareInited === 'true') return;
    container.dataset.compareInited = 'true';

    const overlay = container.querySelector('.img-compare-overlay');
    const slider = container.querySelector('.slider');

    // initial position (half)
    const setInitial = () => {
      const w = container.clientWidth || container.offsetWidth || 0;
      const half = Math.round(w / 2);
      overlay.style.width = half + 'px';
      slider.style.left = half + 'px';
    };
    setInitial();
    window.addEventListener('resize', setInitial);

    let dragging = false;
    let activePointerId = null;

    function startPointer(e) {
      // only handle primary pointer
      if (e.isPrimary === false) return;

      // mark dragging and block swiper gestures
      dragging = true;
      activePointerId = e.pointerId;

      // it's important to stop propagation so Swiper doesn't pick it up
      e.preventDefault && e.preventDefault();
      e.stopPropagation && e.stopPropagation();

      disableSwiperTouch();

      // try to capture pointer so we keep receiving events
      try { slider.setPointerCapture(activePointerId); } catch (err) {}
    }

    function movePointer(e) {
      // only proceed if dragging and pointer matches
      if (!dragging) return;
      if (activePointerId !== null && e.pointerId !== activePointerId) return;

      // prevent Swiper from handling move
      e.preventDefault && e.preventDefault();
      e.stopPropagation && e.stopPropagation();

      const rect = container.getBoundingClientRect();
      const clientX = e.clientX;
      let x = clientX - rect.left;
      x = Math.max(0, Math.min(x, rect.width));
      overlay.style.width = x + 'px';
      slider.style.left = x + 'px';
    }

    function endPointer(e) {
      // if pointerId exists, ensure same pointer triggered end (or accept any pointerup)
      if (activePointerId !== null && e.pointerId !== activePointerId && e.type === 'pointerup') {
        return;
      }
      dragging = false;
      activePointerId = null;

      // release capture if possible
      try { slider.releasePointerCapture && slider.releasePointerCapture(e.pointerId); } catch (err) {}

      // re-enable swiper immediately (with tiny delay to be safe)
      enableSwiperTouch(10);
    }

    // Attach pointer events
    slider.addEventListener('pointerdown', startPointer, { passive: false });
    window.addEventListener('pointermove', movePointer, { passive: false });
    window.addEventListener('pointerup', endPointer);
    window.addEventListener('pointercancel', endPointer);

    // In case pointer leaves the handle while dragging
    slider.addEventListener('pointerleave', (e) => {
      if (dragging) endPointer(e);
    });

    // Extra global safety: if page visibility changes or window loses focus, re-enable swiper
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) enableSwiperTouch(0);
    });
    window.addEventListener('blur', () => enableSwiperTouch(0));
  });
}

/* Initialize on DOM ready and after Swiper is available */
document.addEventListener('DOMContentLoaded', () => {
  // make sure expandImgSwiper is on window so compare code can access
  // (if you create expandImgSwiper in a local scope, assign it to window.expandImgSwiper)
  // e.g. window.expandImgSwiper = new Swiper(...)
  initCompareControls();

  // ensure clones have handlers after Swiper initialization
  if (window.expandImgSwiper && window.expandImgSwiper.on) {
    window.expandImgSwiper.on('init', () => initCompareControls());
    window.expandImgSwiper.on('slideChange', () => initCompareControls());
    // also ensure touchMove is allowed initially
    window.expandImgSwiper.allowTouchMove = true;
  } else {
    // If Swiper is initialized later, call init again
    setTimeout(initCompareControls, 300);
  }
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


