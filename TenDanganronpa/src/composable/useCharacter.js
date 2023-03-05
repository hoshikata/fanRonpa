import axios from 'axios';
import data from '../../data/data.json';
import { ref, computed, watch, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useLang } from '../stores/useLang.js';

export const useCharacter = () => {
  const store = useLang();
  const { lang } = storeToRefs(store);

  const abilityText = computed(() => {
    const at = lang.value === 'zh' ? '的' : 'の';
    return `超高校級${at}`;
  });

  const characterRef = ref([]);

  const getLangData = (data) => {
    const result = {};
    for (let key in data) {
      const reg = new RegExp(`(.+)(_${lang.value})`, 'i');
      const newKey = key.match(reg)?.[1] ?? key;
      result[newKey] = data[key];
    }
    return JSON.parse(JSON.stringify(result));
  };
  const characterData = computed(() => {
    const result = characterRef.value.map(getLangData);
    result.sort((a, b) => b.id - a.id);
    const first = result.pop();
    if (first) result.unshift(first);
    return result;
  });

  const getData = async () => {
    // const data = await axios.get('https://hoshikata.github.io/TenDanganronpa/data.json');
    // characterRef.value = data.data;
    characterRef.value = data;
  };
  onMounted(getData);

  return { characterData, abilityText };
};
