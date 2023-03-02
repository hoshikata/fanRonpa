<script setup>
  import '@splidejs/vue-splide/css';
  import { Splide, SplideSlide } from '@splidejs/vue-splide';
  import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';
  import { ref } from 'vue';
  import { useCharacter } from '../composable/useCharacter.js';
  import { useImage } from '../composable/useImage.js';

  const { characterData, abilityText } = useCharacter();
  const { publicSrc } = useImage();

  const emit = defineEmits(['open']);

  const splideOption = {
    type: 'loop',
    // perPage: 6,
    perMove: 1,
    gap: '2%',
    autoWidth: true,
    arrows: false,
    pagination: false,
    autoScroll: { speed: 1 },
  };
</script>

<template lang="pug">
div
  Splide(:options="splideOption", :extensions="{ AutoScroll }")
    SplideSlide.splide_box(v-for="charData of characterData")
      .splide_card.group
        img.splide_img(:src="publicSrc('/image/shape_test.png')")
        button.splide_button(@click="emit('open', charData.id)")
          span.splide_name {{ charData.name }}
</template>

<style lang="scss" scoped>
  .splide {
    &_box {
      @apply py-5;
      &:nth-child(odd) {
        @apply mt-5;
      }
    }
    &_card {
      @apply relative h-[600px] w-48 overflow-hidden duration-300 hover:shadow-none;
      @apply bg-gradient-to-t from-jumbotron-800 via-jumbotron to-secondary;
      @apply lg:h-[500px] lg:w-40;
      @apply sm:h-[400px] sm:w-32;
      box-shadow: 0 0 15px #ffffff29;
    }
    &_img {
      @apply w-[200%] max-w-none -translate-x-[8%] duration-300 group-hover:scale-125;
      transform-origin: center 20%;
    }
    &_button {
      @apply absolute top-0 left-0 flex h-full w-full items-start justify-end bg-back/50 p-8 text-4xl font-bold tracking-widest opacity-0 duration-300 group-hover:opacity-100;
      @apply lg:p-6 lg:text-3xl;
      @apply sm:p-3 sm:text-2xl;
      writing-mode: vertical-lr;
      text-shadow: 0 0 5px #000;
    }
  }
</style>
