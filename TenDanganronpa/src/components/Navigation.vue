<script setup>
  import IconMenu from '~icons/ic/baseline-menu';
  import IconClose from '~icons/ic/baseline-close';
  import { RouterLink } from 'vue-router';
  import { ref } from 'vue';
  import { storeToRefs } from 'pinia';
  import { useLang } from '../stores/useLang.js';

  const store = useLang();
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
header.header
  button.logo
  ul.nav_list(:class="{ 'md:!right-0': navShow }")
    li(v-for="item of navList")
      RouterLink.nav_link(@click="switchNav(false)", :to="`#${item.name}`", :title="item[lang]") {{ item.title }}
    li.nav_close(@click="switchNav(false)")
      IconClose.mt-px

  button.nav_toggle(@click="switchNav(true)")
    IconMenu.mt-px
</template>

<style lang="scss" scoped>
  .logo {
    @apply mr-auto block h-20 w-44 bg-current;
    @apply md:h-14 md:w-32;
    mask: url('/image/LOGO.svg') no-repeat center;
  }

  .header {
    @apply sticky top-0 left-0 z-40 flex items-center py-1 px-5 text-gray-500 mix-blend-difference;
    @apply md:bg-jumbotron-800 md:text-gray-50 md:mix-blend-normal;
  }
  .nav {
    &_list {
      @apply mt-auto flex p-4 duration-500;
      @apply lg:px-0;
      @apply md:absolute md:-right-full md:top-0 md:w-full md:flex-col md:bg-jumbotron-800 md:py-8;
    }
    &_link {
      @apply mx-4 flex cursor-pointer flex-col items-center justify-center font-sans text-base font-medium leading-none tracking-widest hover:text-primary;
      @apply md:mx-0 md:my-4;

      &::after {
        @apply mt-1 scale-90 opacity-50;
        content: attr(title);
      }
    }
    &_toggle {
      @apply hidden text-4xl hover:text-primary md:block;
    }
    &_close {
      @apply absolute top-0 right-0 hidden cursor-pointer p-2 text-3xl md:block;
    }
  }
</style>
