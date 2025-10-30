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
