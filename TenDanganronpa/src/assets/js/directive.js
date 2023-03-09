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

//== vParallax
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const list = ['parallax-b', 'parallax-t', 'parallax-l', 'parallax-r'];
      const { target, isIntersecting } = entry;
      if (isIntersecting) {
        target.classList.remove(...list, '!opacity-0');
        setTimeout(() => (target.style.transition = ''), 500);
      }
    });
  },
  { threshold: 0.2 },
);
const vParallax = {
  mounted(el, binding) {
    const { arg, value } = binding;
    if (arg) el.classList.add(`parallax-${arg}`);
    el.classList.add('!opacity-0');
    el.style.transition = `${value ?? 300}ms`;
    observer.observe(el);
  },
};

export { vSrc, vParallax };
