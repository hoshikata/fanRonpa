<script setup>
  import { ref, computed } from 'vue';
  import { storeToRefs } from 'pinia';
  import { useLang } from '../stores/useLang.js';

  const store = useLang();
  const { lang } = storeToRefs(store);

  const productsList = {
    zh: [
      { title: '標題', content: '槍彈辯駁10MINS ～驚心動魄修學旅行 in the ocean～', class: 'w-28' },
      { title: '平台', content: 'PC', class: 'w-28' },
      { title: '發售日', content: '2023年04月01日', class: 'w-28' },
      { title: '價格', content: 'FREE', class: 'w-28' },
      { title: '對應語言', content: '中文、日文', class: 'w-28' },
      { title: '類型', content: '超高速推理動作遊戲', class: 'w-28' },
      { title: '主題', content: 'PSYCHO OCEAN', class: 'w-28' },
      { title: 'CERO', content: 'D（17歲以上對象）', class: 'w-28' },
      { title: '角色設計、劇本', content: '全員', class: 'w-36', tr: 'mt-5' },
      { title: '主辦人', content: 'ヤジルシ', class: 'w-36' },
      { title: '美術 & 3D', content: 'いもまる', class: 'w-36' },
      { title: 'CG美術', content: '地瓜探員', class: 'w-36' },
      { title: '設計 & 翻譯', content: 'Zoe', class: 'w-36' },
    ],
  };
  const productsData = computed(() => productsList[lang.value]);
</script>

<template lang="pug">
section.products
  .products_container
    img.w-80(src="/image/37f.jpg")
    .ml-5(class="md:ml-0 md:mt-10")
      .products_tr(v-for="product of productsData", :class="product.tr")
        p.products_th(:class="product.class")
          span(v-for="text of product.title") {{ text }}
        p {{ product.content }}
</template>

<style lang="scss" scoped>
  .products {
    @apply relative flex min-h-screen items-center justify-center overflow-hidden bg-cover bg-center bg-no-repeat;
    background-image: linear-gradient(0deg, #00000080, #00000080), url('/image/37f.jpg');

    &::before {
      @apply absolute top-0 left-0 block h-full w-full content-[''];
      backdrop-filter: blur(10px);
    }
    &_container {
      @apply relative z-10 flex w-full items-center justify-center bg-back/75 py-8 px-16;
      @apply md:flex-col md:px-8;
      &::before {
        @apply absolute top-0 left-0 h-32 w-full -translate-y-full bg-back/75 content-[''];
        clip-path: polygon(0 0, 0 100%, 100% 100%, 0 0);
      }
      &::after {
        @apply absolute bottom-0 left-0 h-24 w-full translate-y-full bg-back/75 content-[''];
        clip-path: polygon(0 0, 100% 0, 100% 100%, 0 0);
      }
    }
    &_tr {
      @apply flex items-center py-1.5 tracking-wider;
      * {
        @apply font-sans text-[1rem] text-gray-100;
        text-shadow: 0 0 5px #ffffff75;
      }
    }
    &_th {
      @apply mr-3 flex shrink-0 justify-between whitespace-nowrap border border-current px-1.5 py-0.5;
    }
  }
</style>
