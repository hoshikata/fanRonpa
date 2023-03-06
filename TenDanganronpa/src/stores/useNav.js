import { defineStore, storeToRefs } from 'pinia';
import { ref, computed } from 'vue';
import { useLang } from '../stores/useLang.js';

export const useNav = defineStore('nav', () => {
  const langStore = useLang();
  const { lang } = storeToRefs(langStore);

  const navList = [
    { id: 0, name: 'story', title: 'STORY', zh: '故事簡介', jp: 'ストーリー' },
    { id: 1, name: 'characters', title: 'CHARACTER', zh: '角色介紹', jp: 'キャラクター' },
    { id: 2, name: 'special', title: 'SPECIAL', zh: '特典', jp: '特典' },
    { id: 3, name: 'product', title: 'PRODUCT', zh: '作品信息', jp: '製品情報' },
  ];
  const navData = computed(() => {
    return navList.map((item) => ({ ...item, text: item[lang.value] }));
  });
  const getNavItem = (name) => {
    return navData.value.find((item) => item.name === name)?.text ?? '';
  };

  return { navData, getNavItem };
});
