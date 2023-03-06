import axios from 'axios';
import data from '../../data/data.json';
import { storeToRefs } from 'pinia';
import { ref, computed, watch, onMounted } from 'vue';
import { useLang } from '../stores/useLang.js';

export const useCharacter = () => {
  const langStore = useLang();
  const { lang } = storeToRefs(langStore);

  const getAbilityText = (langVal) => {
    const list = {
      jp: '超高校級の',
      zh: '超高校級的',
      en: 'Ultimate',
    };
    return list[langVal];
  };
  const abilityText = computed(() => getAbilityText(lang.value));

  const characterRef = ref([]);
  const convertCharLang = (data, langVal) => {
    const result = {};
    for (let key in data) {
      const reg = new RegExp(`(.+)(_${langVal})`, 'i');
      const newKey = key.match(reg)?.[1] ?? key;
      result[newKey] = data[key];
    }
    return JSON.parse(JSON.stringify(result));
  };
  const getCharData = (langVal) => {
    const result = characterRef.value.map((datum) => convertCharLang(datum, langVal));
    result.sort((a, b) => b.id - a.id);
    const first = result.pop();
    if (first) result.unshift(first);
    return result;
  };
  const characterData = computed(() => getCharData(lang.value));

  const getData = async () => {
    // const data = await axios.get('https://hoshikata.github.io/TenDanganronpa/data.json');
    // characterRef.value = data.data;
    characterRef.value = data;
  };
  onMounted(getData);

  return { getAbilityText, abilityText, getCharData, characterData };
};
