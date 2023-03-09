<script setup>
  import { storeToRefs } from 'pinia';
  import { ref, computed } from 'vue';
  import { useLang } from '../stores/useLang.js';
  import { useNav } from '../stores/useNav.js';
  import { vSrc } from '../assets/js/directive.js';
  import { useImage } from '../composable/useImage.js';
  import { vParallax } from '../assets/js/directive.js';

  const langStore = useLang();
  const { lang } = storeToRefs(langStore);
  const navText = computed(() => useNav().getNavItem('product'));
  const { publicSrc } = useImage();

  const productsList = {
    zh: [
      { title: '標題', content: '槍彈辯駁10MINS ～驚心動魄修學旅行 in the ocean～', class: 'w-28 sm:w-20' },
      { title: '平台', content: 'PC', class: 'w-28 sm:w-20' },
      { title: '發售日', content: '2023年04月01日', class: 'w-28 sm:w-20' },
      { title: '價格', content: 'FREE', class: 'w-28 sm:w-20' },
      { title: '對應語言', content: '中文、日文', class: 'w-28 sm:w-20' },
      { title: '類型', content: '超高速推理動作遊戲', class: 'w-28 sm:w-20' },
      { title: '主題', content: 'PSYCHO OCEAN', class: 'w-28 sm:w-20' },
      { title: 'CERO', content: 'D（17歲以上對象）', class: 'w-28 sm:w-20' },
      { title: '角色設計', content: '全員', class: 'w-40 sm:w-36', tr: 'mt-5' },
      { title: '主辦人&網頁製作', content: 'ヤジルシ', class: 'w-40 sm:w-36' },
      { title: '立繪&3D建模', content: 'いもまる', class: 'w-40 sm:w-36' },
      { title: 'CG&遊戲腳本', content: '地瓜探員', class: 'w-40 sm:w-36' },
      { title: 'CG&設計&翻譯', content: 'Zoe', class: 'w-40 sm:w-36' },
    ],
    jp: [
      { title: 'タイトル', content: 'ダンガンロンパ10MINS ～ドキメキ修学旅行 in the ocean～', class: 'w-28 sm:w-20' },
      { title: '機種', content: 'PC', class: 'w-28 sm:w-20' },
      { title: '発売日', content: '2023年04月01日', class: 'w-28 sm:w-20' },
      { title: '価格', content: 'FREE', class: 'w-28 sm:w-20' },
      { title: '対応言語', content: '中国語、日本語', class: 'w-28 sm:w-20' },
      { title: 'ジャンル', content: 'ハイスピード推理アクション', class: 'w-28 sm:w-20' },
      { title: 'テーマ', content: 'サイコオーシャン', class: 'w-28 sm:w-20' },
      { title: 'CERO', content: 'D（17才以上対象）', class: 'w-28 sm:w-20' },
      { title: 'キャラクターデザイン', content: '全員', class: 'w-48 sm:w-40', tr: 'mt-5' },
      { title: '主催&サイト制作', content: 'ヤジルシ', class: 'w-48 sm:w-40' },
      { title: '立ち絵&3D', content: 'いもまる', class: 'w-48 sm:w-40' },
      { title: 'CG&シナリオ', content: '地瓜探員', class: 'w-48 sm:w-40' },
      { title: 'CG&デザイン&翻訳', content: 'Zoe', class: 'w-48 sm:w-40' },
    ],
  };
  const productsData = computed(() => productsList[lang.value]);
</script>

<template lang="pug">
section.products.wrapper
  #product.wrapper_hash

  .mb-12.flex(class="lg:mb-6")
    h2.title.text-gray-100(:title="navText") PRODUCT

  .products_container
    img.w-80(v-src="publicSrc('/image/37f.jpg')", v-parallax:l="500")
    .ml-10(v-parallax:b="500", class="lg:ml-0 lg:mt-10 sm:mt-6")
      .products_tr(v-for="product of productsData", :class="product.tr")
        p.products_th(:class="product.class")
          span(v-for="text of product.title") {{ text }}
        p {{ product.content }}
</template>

<style lang="scss" scoped>
  .products {
    @apply flex min-h-screen flex-col items-center justify-center overflow-hidden bg-cover bg-no-repeat;
    background-image: linear-gradient(0deg, #00000080, #00000080), url('../assets/image/product_bg.png');
    background-position: center 45%;
    background-attachment: fixed;

    &::before {
      @apply absolute top-0 left-0 block h-full w-full content-[''];
      backdrop-filter: blur(10px);
    }
    &_container {
      @apply relative z-20 flex items-center justify-center bg-back/75 py-8 px-16;
      @apply lg:flex-col lg:py-10 lg:px-8 sm:p-5 sm:py-7;
      // &::before {
      //   @apply absolute top-0 left-0 h-32 w-full -translate-y-full bg-back/75 content-[''];
      //   clip-path: polygon(0 0, 0 100%, 100% 100%, 0 0);
      // }
      // &::after {
      //   @apply absolute bottom-0 left-0 h-24 w-full translate-y-full bg-back/75 content-[''];
      //   clip-path: polygon(0 0, 100% 0, 100% 100%, 0 0);
      // }
    }
    &_tr {
      @apply flex items-center py-1.5 tracking-wider;
      * {
        @apply font-sans text-base text-gray-100 sm:text-sm;
        text-shadow: 0 0 5px #ffffff75;
      }
    }
    &_th {
      @apply mr-3 flex shrink-0 justify-between whitespace-nowrap border border-current px-1.5 py-0.5;
    }
  }
</style>
