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
  const cardImg = (name, id) => {
    const hasImg = [0, 7, 9, 12].includes(id * 1);
    return hasImg ? publicSrc(`/ability/${name}.png`) : '';
  };
  const schoolMask = (name) => {
    const src = publicSrc(`/school/${name}.svg`);
    return `mask-image: url(${src}); -webkit-mask-image: url(${src});`;
  };

  const cardOpen = (id) => emit('open', id);
</script>

<template lang="pug">
div
  Splide(:options="splideOption", :extensions="{ AutoScroll }")
    SplideSlide.splide_box(v-for="charData of characterData")
      .splide_card.group(
        @click="cardOpen(charData.id)",
        :class="`splide_card_${charData.id}`",
        :style="cardStyle(charData.color)"
      )
        .splide_school(:style="schoolMask(charData.school_img)")
        img.splide_img(:src="cardImg(charData.img_name, charData.id)")
        button.splide_button
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
      @apply relative z-10 h-[600px] w-48 overflow-hidden border-2 border-current duration-300;
      @apply bg-gradient-to-b from-current to-transparent;
      @apply lg:h-[500px] lg:w-40;
      @apply sm:h-[400px] sm:w-32;
      box-shadow: 0 0 15px #00000029, inset 0 0 0 8px white;
      &:hover {
        box-shadow: 0 0 0 transparent;
      }
    }
    &_school {
      @apply absolute top-2 left-2 -z-10 w-full bg-white pt-[100%] opacity-90 duration-300 group-hover:scale-110;
      mask-position: -50% center;
      mask-size: 90%;
      mask-repeat: no-repeat;
    }
    &_img {
      @apply h-[200%] max-w-none -translate-x-[8%] duration-300 group-hover:scale-125;
      transform-origin: center 20%;
    }
    &_button {
      @apply absolute top-0 left-0 z-10 flex h-full w-full items-end justify-start bg-back/50 opacity-0 duration-300 group-hover:opacity-100;
    }
    &_ability {
      @apply absolute top-0 right-0 -z-10 pr-6 pt-5 text-5xl font-bold tracking-widest text-white;
      @apply lg:pr-5 lg:pt-4 lg:text-4xl;
      @apply sm:pr-3 sm:pt-2 sm:text-3xl;
      writing-mode: vertical-lr;
      text-shadow: 0 0 5px #000;
    }
    &_name {
      @apply pl-6 pb-5 text-4xl font-bold tracking-widest text-white;
      @apply lg:pl-5 lg:pb-4 lg:text-3xl;
      @apply sm:pl-3 sm:pb-2 sm:text-2xl;
      writing-mode: vertical-lr;
      text-shadow: 0 0 5px #000;
    }
  }

  .splide_card {
    &_0 .splide_img {
      @apply -translate-x-[39%] -translate-y-[4%];
      transform-origin: 55% 22%;
    }
    &_7 .splide_img {
      @apply -translate-x-[48%] -translate-y-[10%];
      transform-origin: 50% 35%;
    }
    &_9 .splide_img {
      @apply -translate-x-[58%] -translate-y-[2%];
      transform-origin: 70% 30%;
    }
    &_12 .splide_img {
      @apply -translate-x-[32%] translate-y-[1%];
      transform-origin: 45% 20%;
    }
  }

  .splide_card {
    &_7 .splide_school {
      mask-position: 50% center;
    }
  }
</style>
