<script setup>
  import { ref } from 'vue';
  import { useMousePosition } from '../composable/useMousePosition.js';
  const { pageX, pageY } = useMousePosition();

  const jumbotron = ref(null);
  const setMove = (num, bd = 0) => {
    const w = jumbotron.value?.clientWidth ?? 0;
    const h = jumbotron.value?.clientHeight ?? 0;
    const top = (pageY.value - h / 2) * 0.001 * num;
    const left = (pageX.value - w / 2) * 0.001 * num;
    return [`top: calc(${top ?? 0}% + ${bd}px)`, `left: calc(${left}% + ${bd}px)`];
  };
</script>

<template lang="pug">
.jumbotron(ref="jumbotron")
  img.jumbotron_bg(src="/jumbotron/logo_bg05.png", class="!relative", :style="setMove(1)")
  img.jumbotron_bg(src="/jumbotron/logo_bg04.png", :style="setMove(2)")
  img.jumbotron_bg(src="/jumbotron/logo_bg03.png", :style="setMove(4)")
  img.jumbotron_bg(src="/jumbotron/logo_bg02.png", :style="setMove(6)")
  img.jumbotron_bg(src="/jumbotron/logo_bg01.png", :style="setMove(8)")
  .jumbotron_cover(:style="setMove(8, -2000)")
  .jumbotron_logo
</template>

<style lang="scss" scoped>
  .jumbotron {
    @apply relative flex w-full items-center justify-center overflow-hidden bg-jumbotron;

    &_bg {
      @apply absolute top-0 left-0 h-full w-full object-cover object-center;
    }
    &_cover {
      @apply absolute box-content h-full w-full border-[2000px] border-jumbotron;
    }
    &_logo {
      @apply absolute h-[60%] w-[60%] bg-white/80;
      mask: url('/image/LOGO_MONOKURO-12.svg') no-repeat center center;
    }
  }
</style>

<!-- <script setup>
  import { onMounted, ref } from 'vue';

  const bubbleStyle = (num) => {
    const size = `${Math.floor(Math.random() * 80 + 10)}px`;
    const top = `top: ${Math.floor(Math.random() * 100 + 100)}%`;
    const left = `left: ${Math.floor(Math.random() * 200 - 50)}%`;
    const opacity = `opacity: ${Math.floor(Math.random() * 40 + 30) / 100}`;
    const duration = `animation-duration: ${Math.floor(Math.random() * 7 + 5)}s`;
    const delay = `animation-delay: ${Math.floor(Math.random() * 8 - 4)}s`;
    return [`width: ${size}`, `height: ${size}`, opacity, top, left, duration, delay];
  };

  const waveStyle = (num) => {
    const duration = `animation-duration: ${Math.floor(Math.random() * 5 + 10)}s`;
    const delay = `animation-delay: -${Math.floor(Math.random() * 4)}s`;
    return [duration, delay];
  };

  const header = ref(null);
  // onMounted(() => {
  //   setTimeout(() => {
  //     header.value.classList.add('jumbotron-header');
  //   }, 5000);
  // });
</script>

<template lang="pug">
section.jumbotron(ref="header")
  .bubbles.cover
    .bubble(v-for="num of 120", :style="bubbleStyle(num)")
  .logo
    .logo_color
    .waves(v-for="num2 of 2")
      .wave(:style="waveStyle(num)")
  .bubbles
    .bubble(v-for="num of 50", :style="bubbleStyle(num)")
</template>

<style lang="scss" scoped>
  .jumbotron {
    @apply relative flex h-screen w-full items-center justify-center overflow-hidden bg-secondary;
    &,
    * {
      @apply duration-1000;
    }
  }
  .logo {
    @apply relative h-2/3 w-2/3 overflow-hidden bg-contain bg-center bg-no-repeat;
    mask: url('/image/LOGO_MONOKURO-12.svg') no-repeat center center;
    &_color {
      @apply h-full w-full bg-gradient-to-t from-primary to-secondary;
    }
  }
  .cover::after {
    @apply absolute top-0 left-0 h-full w-full bg-back/75 content-[''];
  }
  .bubbles {
    @apply absolute top-0 left-0 flex h-full w-full;
  }
  .bubble {
    @apply absolute mx-1 h-5 w-5 shrink-0 rounded-full text-white;
    box-shadow: inset 0 0 10px currentColor;
    animation: rise 5s infinite ease-in;
  }
  .waves {
    @apply absolute bottom-0 left-1/2 w-[300%] translate-y-[95%] -translate-x-1/2 opacity-50;
  }
  .wave {
    @apply w-full rounded-[43%] pt-[100%];
    box-shadow: inset 0 0 50px currentColor;
    animation: rotate 15s infinite linear;
  }

  .jumbotron-header {
    @apply h-24 px-10;

    .logo {
      @apply h-24 w-48;
    }
    .logo_color {
      @apply from-back to-back;
    }
    .bubbles,
    .waves {
      @apply opacity-0;
    }
  }

  @keyframes rise {
    0% {
      transform: translateX(0);
    }
    50% {
      transform: translateX(100px);
    }
    100% {
      top: -100%;
      transform: translateX(-200px);
    }
  }

  @keyframes rotate {
    0% {
      transform: rotate(0);
    }
    0% {
      transform: rotate(360deg);
    }
  }
</style> -->
