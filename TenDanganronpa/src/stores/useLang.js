import { defineStore } from 'pinia';
import { useRoute, useRouter } from 'vue-router';
import { ref, watch } from 'vue';

export const useLang = defineStore('lang', () => {
  const route = useRoute();
  const router = useRouter();
  const lang = ref('jp');
  const langKey = '10mins_lang';

  const changeLang = (val, hash) => {
    lang.value = val;
    localStorage.setItem(langKey, val);
    router.push({ name: route.name ?? 'index', query: { lang: val } });
  };

  watch(
    // () => route.fullPath,
    () => route.name,
    () => {
      const ls = localStorage.getItem(langKey);
      const query = route.query.lang;
      changeLang(query ?? ls ?? 'jp');
    },
    { immediate: true },
  );

  return { lang, langKey, changeLang };
});
