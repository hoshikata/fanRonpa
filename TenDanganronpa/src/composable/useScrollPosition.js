import { ref, onMounted, onUnmounted } from 'vue';

export const useScrollPosition = () => {
  const scrollX = ref(0);
  const scrollY = ref(0);

  const scrollPosition = (e) => {
    scrollX.value = window.pageXOffset;
    scrollY.value = window.pageYOffset;
  };
  onMounted(() => {
    window.addEventListener('scroll', scrollPosition);
  });
  onUnmounted(() => {
    window.removeEventListener('scroll', scrollPosition);
  });

  return { scrollX, scrollY };
};
