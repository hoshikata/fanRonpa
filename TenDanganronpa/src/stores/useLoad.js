import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useLoad = defineStore('load', () => {
  const loadProgress = ref(0);
  const isLoad = computed(() => loadProgress.value !== 1);
  const changeLoadProgress = (status) => (loadProgress.value = status);

  return { loadProgress, isLoad, changeLoadProgress };
});
