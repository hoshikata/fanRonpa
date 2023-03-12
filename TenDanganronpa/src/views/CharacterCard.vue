<script setup>
  import '@splidejs/vue-splide/css';
  import { Splide, SplideSlide } from '@splidejs/vue-splide';
  import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';
  import { ref, nextTick } from 'vue';
  import { vSrc } from '../assets/js/directive.js';
  import { useCharacter } from '../composable/useCharacter.js';
  import { useImage } from '../composable/useImage.js';

  const { characterData } = useCharacter();
  const { publicSrc } = useImage();

  const emit = defineEmits(['open']);

  //== splide handler
  const splide = ref();
  const splideExtensions = { AutoScroll };
  const splideOption = {
    type: 'loop',
    gap: '2%',
    autoWidth: true,
    focus: 'center',
    lazyLoad: 'nearby',
    preloadPages: 3,
    arrows: false,
    pagination: false,
    autoScroll: { speed: 0.8, autoStart: false },
  };

  const clickSplide = (e, slide, target) => {
    const id = slide.slide.dataset.id * 1 ?? 0;
    emit('open', id);
  };

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (!splide.value) return;
      const status = entry.isIntersecting;
      const splideList = splide.value?.root.firstChild.firstChild;
      const { AutoScroll } = splide.value?.splide.Components;
      if (status) {
        splideList.style.willChange = 'transform';
        AutoScroll.play();
      } else {
        splideList.style.willChange = '';
        AutoScroll.pause();
      }
    },
    { threshold: 0 },
  );
  nextTick(() => observer.observe(splide.value.root));

  //== character card
  const imgList = [
    { id: 9, src: 'https://images.plurk.com/5GO8xZITRXkJLLQlRx747X.png' },
    { id: 7, src: 'https://images.plurk.com/wnajJXSYGOusXuqkqkkTD.png' },
    { id: 12, src: 'https://images.plurk.com/OMcZwSfj8Qmvi9dd2CDzE.png' },
    { id: 4, src: 'https://images.plurk.com/2SZWYkilMV3mkYegp6hCI1.png ' },
    { id: 0, src: 'https://images.plurk.com/7Cs3PcrDKxfDf5VDx9j6iD.png' },
    { id: 8, src: 'https://images.plurk.com/4Md3auuvHOUv1191vD6b14.png' },
    { id: 11, src: 'https://images.plurk.com/5FdxBLaH152pxxiImaMaeR.png' },
    { id: 5, src: 'https://images.plurk.com/1THWkDxQGj8UgGVuF0sVh9.png' },
    { id: 6, src: 'https://images.plurk.com/1pA35DJZdC12zRlvnbph0L.png' },
    { id: 10, src: 'https://images.plurk.com/3AC77jy65UNFqQ90hRaYPl.png' },
    { id: 1, src: 'https://images.plurk.com/5ZvcGP6CaFIZzdx8yIoMeq.png' },
  ];
  const cardImg = (name, id) => {
    const imgSrc = imgList.find((item) => item.id === id)?.src;
    return imgSrc ?? '';
  };
  const cardStyle = (color) => `color: ${color};`;
  const schoolMask = (name) => {
    const src = publicSrc(`/school/${name}.svg`);
    return `mask-image: url(${src}); -webkit-mask-image: url(${src});`;
  };
</script>

<template lang="pug">
div
  Splide.py-5(@splide:click="clickSplide", :options="splideOption", :extensions="splideExtensions", ref="splide")
    SplideSlide.splide_box(v-for="charData of characterData", :data-id="charData.id")
      .splide_card.group(:class="`splide_card_${charData.id}`", :style="cardStyle(charData.color)")
        .splide_school(:style="schoolMask(charData.school_img)")
        img.splide_img(:src="cardImg(charData.img_name, charData.id)")
        button.splide_button
          span.splide_ability {{ charData.ability }}
          span.splide_name {{ charData.name }}
</template>

<style lang="scss" scoped>
  .splide {
    &_box {
      &:nth-child(odd) {
        @apply mt-5;
      }
      &:nth-child(even) {
        @apply mb-5;
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
      @apply h-[200%] max-w-none duration-300 group-hover:scale-125;
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
      @apply h-[190%] -translate-x-[40%] -translate-y-[6%];
      transform-origin: 55% 28%;
    }
    &_1 .splide_img {
      @apply h-[210%] -translate-x-[41%] -translate-y-[1%];
      transform-origin: 50% 28%;
    }
    &_4 .splide_img {
      @apply h-[140%] -translate-x-[32%] translate-y-[0%];
      transform-origin: 50% 28%;
    }
    &_5 .splide_img {
      @apply h-[185%] -translate-x-[52%] -translate-y-[3%];
      transform-origin: 58% 25%;
    }
    &_6 .splide_img {
      @apply h-[225%] -translate-x-[48%] translate-y-[0%];
      transform-origin: 52% 20%;
    }
    &_7 .splide_img {
      @apply -translate-x-[48%] -translate-y-[10%];
      transform-origin: 50% 35%;
    }
    &_8 .splide_img {
      @apply -translate-x-[39%] -translate-y-[20%] -rotate-12;
      transform-origin: 52% 42%;
    }
    &_9 .splide_img {
      @apply h-[190%] -translate-x-[58%] -translate-y-[2%];
      transform-origin: 70% 30%;
    }
    &_10 .splide_img {
      @apply h-[170%] -translate-x-[39%] -translate-y-[1%];
      transform-origin: 54% 30%;
    }
    &_11 .splide_img {
      @apply h-[250%] -translate-x-[46%] -translate-y-[5%];
      transform-origin: 50% 23%;
    }
    &_12 .splide_img {
      @apply h-[195%] -translate-x-[32%] translate-y-[1%];
      transform-origin: 45% 20%;
    }
  }

  .splide_card {
    &_6,
    &_7,
    &_11 {
      .splide_school {
        mask-position: 50% center;
      }
    }
    &_1 {
      .splide_school {
        mask-position: 0% center;
      }
    }
  }
</style>
