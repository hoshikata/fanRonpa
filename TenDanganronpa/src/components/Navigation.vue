<script setup>
  import IconLang from '~icons/ic/baseline-language';
  import IconDrop from '~icons/ic/baseline-arrow-drop-down';
  import IconMenu from '~icons/ic/baseline-menu';
  import IconClose from '~icons/ic/baseline-close';
  import { RouterLink } from 'vue-router';
  import { ref } from 'vue';
  import { storeToRefs } from 'pinia';
  import { useLang } from '../stores/useLang.js';

  const store = useLang();
  const { changeLang } = store;
  const { lang } = storeToRefs(store);

  const navShow = ref(false);

  const navList = [
    { id: 0, name: 'story', title: 'STORY', zh: '故事簡介', jp: 'ストーリー' },
    { id: 1, name: 'characters', title: 'CHARACTER', zh: '角色介紹', jp: 'キャラクター' },
    { id: 2, name: 'special', title: 'SPECIAL', zh: '特典', jp: '特典' },
    { id: 3, name: 'product', title: 'PRODUCT', zh: '作品信息', jp: '製品情報' },
  ];

  const switchNav = (status) => {
    navShow.value = status;
  };
</script>

<template lang="pug">
.header_hr
  img.w-full(src="../assets/image/wave-haikei_5.svg")

header.header
  RouterLink.logo(to="#home")
  ul.nav_list(:class="{ 'md:!right-0': navShow }")
    li(v-for="item of navList")
      RouterLink.nav_link(@click="switchNav(false)", :to="`#${item.name}`", :title="item[lang]") {{ item.title }}

    li.relative.ml-4.self-end
      button.nav_lang.peer
        IconLang
        span.ml-1.w-5.font-sans.text-sm {{ lang.toUpperCase() }}
        IconDrop
      ul.nav_lang_list
        li
          button.nav_lang_item(@click="changeLang('zh')") 中文
        li
          button.nav_lang_item(@click="changeLang('jp')") 日本語

    li.nav_close(@click="switchNav(false)")
      IconClose.mt-px

  button.nav_toggle(@click="switchNav(true)")
    IconMenu.mt-px
</template>

<style lang="scss" scoped>
  .header {
    @apply sticky top-0 left-0 z-30 flex items-center py-1 px-5 text-gray-400 mix-blend-exclusion;
    @apply md:bg-jumbotron-800 md:text-gray-50 md:mix-blend-normal;
    @apply md:bg-gradient-to-b md:from-jumbotron md:to-jumbotron-700;

    &_hr {
      @apply relative -mb-[88px] w-full bg-jumbotron-700 md:hidden;
      &::before {
        @apply absolute top-0 left-0 h-full w-full opacity-50 content-[''];
        @apply bg-cover bg-top bg-no-repeat;
        background-image: url('../assets/image/wave-haikei_6.svg');
      }
    }
  }
  .nav {
    &_list {
      @apply mt-auto flex p-4 duration-500;
      @apply lg:px-0;
      @apply md:absolute md:-right-full md:top-0 md:w-full md:flex-col md:bg-jumbotron-800 md:py-8;
    }
    &_link {
      @apply mx-4 flex cursor-pointer flex-col items-center justify-center font-sans text-base font-medium leading-none tracking-widest hover:text-primary;
      @apply lg:mx-3 md:mx-0 md:my-4;

      &::after {
        @apply mt-1 scale-90 opacity-50;
        content: attr(title);
      }
    }
    &_lang {
      @apply flex items-center justify-center hover:text-primary;
      @apply md:mr-5;

      &_list {
        @apply absolute right-0 bottom-0 w-full translate-y-full;
        @apply invisible hover:visible peer-hover:visible;
      }
      &_item {
        @apply w-full whitespace-nowrap pt-3 text-center font-sans hover:text-primary;
      }
    }
    &_close {
      @apply absolute top-0 right-0 hidden cursor-pointer p-2 text-3xl md:block;
    }
    &_toggle {
      @apply hidden text-4xl hover:text-primary md:block;
    }
  }
</style>
