<script setup>
  import { ref } from 'vue';
  import { usePosition } from '../composable/usePosition.js';
  const { isMobile, mouseX, mouseY, windowMousing, scrollY, windowScrolling } = usePosition();

  const jumbotron = ref(null);
  const setMove = (num) => {
    const w = jumbotron.value?.clientWidth ?? 2;
    const h = jumbotron.value?.clientHeight ?? 2;
    let style = [];
    if (isMobile) {
      const scrollT = (scrollY.value / h) * -3 * num;
      const isScrollOver = scrollY.value >= h;
      if (!isScrollOver) style = [`top: calc(50% + ${scrollT}%)`];
    } else {
      const mouseT = (mouseY.value - h / 2) * 0.001 * num;
      const mouseL = (mouseX.value - w / 2) * 0.001 * num;
      const isMouseOver = mouseY.value >= h || mouseX.value >= w;
      if (!isMouseOver) style = [`top: calc(50% + ${mouseT}%)`, `left: calc(50% + ${mouseL}%)`];
    }
    // return [];
    return style;
  };
  const mountedEvent = () => {
    if (isMobile) windowScrolling();
    else windowMousing();
  };
  mountedEvent();
</script>

<template lang="pug">
.jumbotron(ref="jumbotron")
  img.jumbotron_bg(src="/jumbotron/logo_bg05.png")

  .jumbotron_bg(:style="setMove(1)")
    img.jumbotron_fish(src="/jumbotron/fish10.png", class="top-[60%] left-[30%] h-[15%] w-[15%]")
  .jumbotron_bg(:style="setMove(1)")
    img.jumbotron_fish(src="/jumbotron/fish09.png", class="top-[14%] left-[2%] h-[42%] w-[42%]")
  .jumbotron_bg(:style="setMove(1)")
    img.jumbotron_fish(src="/jumbotron/fish08.png", class="top-[30%] left-[72%] h-[15%] w-[15%]")
  img.jumbotron_bg(src="/jumbotron/logo_bg04.png", :style="setMove(2)")

  .jumbotron_bg(:style="setMove(3)")
    img.jumbotron_fish(src="/jumbotron/fish07.png", class="top-[14%] left-[48%] h-[18%] w-[18%]")
  .jumbotron_bg(:style="setMove(3)")
    img.jumbotron_fish(src="/jumbotron/fish06.png", class="top-[70%] left-[43%] h-[10%] w-[10%]")
  img.jumbotron_bg(src="/jumbotron/logo_bg03.png", :style="setMove(4)")

  .jumbotron_bg(:style="setMove(5)")
    img.jumbotron_fish(src="/jumbotron/fish05.png", class="top-[66%] left-[18%] h-[12%] w-[12%]")
  .jumbotron_bg(:style="setMove(6)")
    img.jumbotron_fish(src="/jumbotron/fish04.png", class="top-[77%] left-[42%] h-[15%] w-[15%]")
  .jumbotron_bg(:style="setMove(7)")
    img.jumbotron_fish(src="/jumbotron/fish03.png", class="top-[55%] left-[60%] h-[20%] w-[20%]")
  img.jumbotron_bg(src="/jumbotron/logo_bg02.png", :style="setMove(8)")

  .jumbotron_bg(:style="setMove(10)")
    img.jumbotron_fish(src="/jumbotron/fish02.png", class="top-[22%] left-[0px] h-[25%] w-[25%]")
  .jumbotron_bg(:style="setMove(12)")
    img.jumbotron_fish(src="/jumbotron/fish01.png", class="top-[69%] left-[66%] h-[25%] w-[25%]")
  img.jumbotron_bg.jumbotron_cover(src="/jumbotron/logo_bg01.png", :style="setMove(14)")

  .jumbotron_logo
</template>

<style lang="scss" scoped>
  .jumbotron {
    @apply relative flex w-full items-center justify-center overflow-hidden bg-jumbotron;

    &_bg {
      @apply absolute top-1/2 left-1/2 h-full min-w-full max-w-none -translate-x-1/2 -translate-y-1/2 duration-75;
      &:first-child {
        @apply relative top-0 left-0 min-h-screen translate-x-0 translate-y-0;
      }
    }
    &_fish {
      @apply absolute object-contain;
    }
    &_cover {
      @apply box-content border-[2000px] border-jumbotron;
    }
    &_logo {
      @apply absolute h-[60%] w-[60%] bg-white/80;
      @apply lg:h-[70%] lg:w-[70%];
      @apply md:h-[80%] md:w-[80%];
      @apply sm:h-[90%] sm:w-[90%];
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
