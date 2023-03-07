//== vImage
const vSrc = (el, binding) => {
  el.style.opacity = 0;
  if (binding.value) {
    const img = new Image();
    img.src = binding.value;
    img.onload = () => {
      el.src = binding.value;
      el.style.opacity = 1;
    };
    img.onerror = () => {
      // el.src = errorImg;
      el.style.opacity = 1;
    };
  }
};

export { vSrc };
