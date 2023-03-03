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
    autoScroll: { speed: 0.8 },
  };
  const cardStyle = (color) => `color: ${color};`;
</script>

<template lang="pug">
div
  Splide(:options="splideOption", :extensions="{ AutoScroll }")
    SplideSlide.splide_box(v-for="charData of characterData")
      .splide_card.group(:style="cardStyle(charData.color)")
        .splide_shool(:style="`mask-image: url(${publicSrc('/school/' + charData.school_img + '.svg')})`")
        img.splide_img(:src="publicSrc('/image/shape_test.png')")
        button.splide_button(@click="emit('open', charData.id)")
          span.splide_ability {{ charData.ability }}
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
      @apply relative h-[600px] w-48 overflow-hidden duration-300;
      @apply border-2 border-current bg-current;
      // @apply bg-gradient-to-b from-current to-transparent;
      // @apply bg-gradient-to-t from-jumbotron-800 via-jumbotron to-secondary;
      @apply lg:h-[500px] lg:w-40;
      @apply sm:h-[400px] sm:w-32;
      box-shadow: 0 0 15px #00000029, inset 0 0 0 8px white;
      &:hover {
        box-shadow: 0 0 0 transparent;
      }
    }
    &_shool {
      @apply absolute top-2 left-2 w-full bg-gray-100 pt-[100%] opacity-100 duration-300 group-hover:scale-110;
      mask-position: -50%;
      mask-size: 90%;
      mask-repeat: no-repeat;
    }
    &_img {
      @apply w-[200%] max-w-none -translate-x-[8%] duration-300 group-hover:scale-125;
      transform-origin: center 20%;
    }
    &_button {
      @apply absolute top-0 left-0 z-10 flex h-full w-full items-end justify-start bg-back/50 opacity-0 duration-300 group-hover:opacity-100;
    }
    &_ability {
      @apply absolute bottom-0 left-0 -z-10 pl-10 pb-12 text-4xl font-bold text-black;
      writing-mode: vertical-lr;
      // text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white;
    }
    &_name {
      @apply p-8 text-4xl font-bold tracking-widest text-white;
      @apply lg:p-6 lg:text-3xl;
      @apply sm:p-3 sm:text-2xl;
      writing-mode: vertical-lr;
      text-shadow: 0 0 5px #000;
    }
  }
</style>
