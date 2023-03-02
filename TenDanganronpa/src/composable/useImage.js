import { ref } from 'vue';

export const useImage = () => {
  const publicSrc = (url) => {
    const root = process.env.NODE_ENV === 'production' ? '/TenDanganronpa' : '';
    return `${root}${url}`;
  };

  return { publicSrc };
};
