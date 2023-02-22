import { ref, onMounted, onUnmounted } from 'vue';

export const usePosition = () => {
  const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
    navigator.userAgent.toLowerCase(),
  );
  const events = ref(isMobile ? 'touchmove' : 'mousemove');

  //== mouse
  const mouseX = ref(0);
  const mouseY = ref(0);

  const mousePosition = (e) => {
    e.preventDefault();
    const target = isMobile ? e.changedTouches[0] : e;
    mouseX.value = target.pageX;
    mouseY.value = target.pageY;
  };

  const windowMousing = () => {
    onMounted(() => {
      window.addEventListener(events.value, mousePosition);
    });
    onUnmounted(() => {
      window.removeEventListener(events.value, mousePosition);
    });
  };

  //== scroll
  const scrollX = ref(0);
  const scrollY = ref(0);

  const scrollPosition = (e) => {
    scrollX.value = window.pageXOffset;
    scrollY.value = window.pageYOffset;
  };

  const windowScrolling = () => {
    onMounted(() => {
      window.addEventListener('scroll', scrollPosition);
    });
    onUnmounted(() => {
      window.removeEventListener('scroll', scrollPosition);
    });
  };

  return { isMobile, mouseX, mouseY, mousePosition, windowMousing, scrollX, scrollY, scrollPosition, windowScrolling };
};
