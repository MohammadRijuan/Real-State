document.addEventListener('DOMContentLoaded', () => {
  const counters = document.querySelectorAll('.count');
  let currentIndex = 0;

  // Format with commas only (no k, no M)
  function formatNumber(num) {
    return num.toLocaleString();
  }

  function countUp(element, target, duration, callback) {
    const display = element.querySelector('h1');
    const start = 0;
    const startTime = performance.now();

    function animate(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const currentValue = Math.floor(start + (target - start) * progress);

      display.textContent = formatNumber(currentValue)+'k'+ '+';

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        display.textContent = formatNumber(target)+'k'+ '+';
        if (callback) callback();
      }
    }

    requestAnimationFrame(animate);
  }

  function startSequentialCount() {
    if (currentIndex >= counters.length) return;
    const counter = counters[currentIndex];
    const target = parseInt(counter.getAttribute('data-target'), 10);
    const duration = target >= 1000000 ? 1800 : 1200;

    countUp(counter, target, duration, () => {
      currentIndex++;
      startSequentialCount();
    });
  }

  startSequentialCount();
});