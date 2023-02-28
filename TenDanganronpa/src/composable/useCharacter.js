import axios from 'axios';
import data from '../../data/data.json';
import { ref, onMounted, computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useLang } from '../stores/useLang.js';

export const useCharacter = () => {
  const store = useLang();
  const { lang } = storeToRefs(store);

  const characterData = ref([]);

  const getLangData = (data) => {
    const result = {};
    for (let key in data) {
      const reg = new RegExp(`(.+)(_${lang.value})`, 'i');
      const newKey = key.match(reg)?.[1] ?? key;
      result[newKey] = data[key];
    }
    return JSON.parse(JSON.stringify(result));
  };
  const abilityText = computed(() => {
    const at = lang.value === 'zh' ? '的' : 'の';
    return `超高校級${at}`;
  });

  const getData = async () => {
    // const data = await axios.get('https://hoshikata.github.io/TenDanganronpa/data.json');
    // characterData.value = data.data;
    const result = data.map(getLangData);
    result.sort((a, b) => a.id - b.id);
    characterData.value = result;
  };
  onMounted(getData);

  return { characterData, abilityText };
};
