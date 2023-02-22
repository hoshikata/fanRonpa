import { ref, onMounted, onUnmounted } from 'vue';

export const useMousePosition = () => {
  const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
    navigator.userAgent.toLowerCase(),
  );
  const events = ref(isMobile ? 'touchmove' : 'mousemove');

  const pageX = ref(0);
  const pageY = ref(0);

  const mousePosition = (e) => {
    e.preventDefault();
    const target = isMobile ? e.changedTouches[0] : e;
    pageX.value = target.pageX;
    pageY.value = target.pageY;
  };

  onMounted(() => {
    window.addEventListener('touchmove', mousePosition);
  });
  onUnmounted(() => {
    window.removeEventListener('touchmove', mousePosition);
  });

  return { pageX, pageY };
};
