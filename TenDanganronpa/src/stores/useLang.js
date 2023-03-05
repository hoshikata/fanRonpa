import { defineStore } from 'pinia';
import { ref, onMounted } from 'vue';

export const useLang = defineStore('lang', () => {
  const lang = ref('jp');

  const changeLang = (val) => {
    lang.value = val;
    localStorage.setItem('10mins_lang', val);
  };

  onMounted(() => {
    const langOld = localStorage.getItem('10mins_lang');
    lang.value = langOld ?? 'jp';
  });

  return { lang, changeLang };
});
