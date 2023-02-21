import { ref, onMounted, onUnmounted } from 'vue';

export const useMousePosition = () => {
  const pageX = ref(0);
  const pageY = ref(0);
  const mousePosition = (e) => {
    pageX.value = e.pageX;
    pageY.value = e.pageY;
  };
  onMounted(() => {
    window.addEventListener('mousemove', mousePosition);
  });
  onUnmounted(() => {
    window.removeEventListener('mousemove', mousePosition);
  });

  // const scrollTop = ref(0);
  // const scrollPosition = (e) => {
  //   scrollTop.value = window.pageYOffset;
  // };
  // onMounted(() => {
  //   window.addEventListener('scroll', scrollPosition);
  // });
  // onUnmounted(() => {
  //   window.removeEventListener('scroll', scrollPosition);
  // });

  return { pageX, pageY };
};
