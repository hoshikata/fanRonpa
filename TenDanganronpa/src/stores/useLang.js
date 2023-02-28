import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useLang = defineStore('lang', () => {
  const lang = ref('zh');

  return { lang };
});
