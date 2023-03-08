<script setup>
  import { ref, reactive, computed, watch, onMounted } from 'vue';
  import { useLoad } from '../stores/useLoad.js';
  import { usePosition } from '../composable/usePosition.js';

  const loadStore = useLoad();
  const { isMobile, mouseX, mouseY, windowMousing, scrollY, windowScrolling } = usePosition();

  //== mouse effect
  const hasAnimate = ref(false);
  const jumbotron = ref(null);

  const setMove = (num) => {
    const w = jumbotron.value?.clientWidth ?? 2;
    const h = jumbotron.value?.clientHeight ?? 2;
    const will = { scroll: 'will-change: top', mouse: 'will-change: transform', mouseL: 'will-change: top, left' };
    let style = [];
    if (isMobile) {
      const scrollT = (scrollY.value / h) * -3 * num;
      const isScrollOver = scrollY.value >= h;
      if (!isScrollOver) style = [`top: calc(${50 + scrollT}%)`, will.scroll];
      // if (!isScrollOver) style = [`transform: translate(-50%, ${-50 + scrollT}%)`, will.mouse];
    } else {
      const parm = 0.001;
      const mouseT = (mouseY.value - h / 2) * parm * num;
      const mouseL = (mouseX.value - w / 2) * parm * num;
      const isMouseOver = mouseY.value >= h || mouseX.value >= w;
      // if (!isMouseOver) style = [`top: calc(${50 + mouseT}%)`, `left: calc(${50 + mouseL}%)`, will.mouseL];
      if (!isMouseOver) style = [`transform: translate(${-50 + mouseL}%, ${-50 + mouseT}%)`, will.mouse];
    }
    return hasAnimate.value ? style : [];
  };

  const observer = new IntersectionObserver(
    ([entry]) => {
      const status = entry.isIntersecting;
      hasAnimate.value = status;
    },
    { threshold: 0.1 },
  );
  onMounted(() => observer.observe(jumbotron.value));

  const mountedEvent = () => {
    if (isMobile) windowScrolling();
    else windowMousing();
  };
  mountedEvent();

  //== loading
  const imgLoading = reactive({
    bg01: false,
    bg02: false,
    bg03: false,
    bg04: false,
    bg05: false,
    fish01: false,
    fish02: false,
    fish03: false,
    fish04: false,
    fish05: false,
    // fish06: false,
    fish07: false,
    fish08: false,
    fish09: false,
    fish10: false,
  });
  const loadingProgress = computed(() => {
    const loads = Object.values(imgLoading);
    const finishList = loads.filter((val) => val);
    return finishList.length / loads.length;
  });
  const loadingImg = (name) => (imgLoading[name] = true);

  watch(
    loadingProgress,
    (nVal) => {
      hasAnimate.value = nVal === 1;
      loadStore.changeLoadProgress(nVal);
    },
    { immediate: true },
  );
</script>

<template lang="pug">
#home.jumbotron(:class="{ 'jumbotron-pause': !hasAnimate }", ref="jumbotron")
  img.jumbotron_bg.bg(src="/jumbotron/logo_bg05.png", @load="loadingImg('bg05')")

  .jumbotron_bg(:style="setMove(0.8)")
    img.jumbotron_cage(src="/jumbotron/torikago_big.png")

  .jumbotron_bg(:style="setMove(1)")
    img.jumbotron_fish.fish-10(src="/jumbotron/fish10.png", @load="loadingImg('fish10')")
  .jumbotron_bg(:style="setMove(1)")
    img.jumbotron_fish.fish-9(src="/jumbotron/fish09.png", @load="loadingImg('fish09')")
  .jumbotron_bg(:style="setMove(1)")
    img.jumbotron_fish.fish-8(src="/jumbotron/fish08.png", @load="loadingImg('fish08')")
  img.jumbotron_bg(src="/jumbotron/logo_bg04-2.png", :style="setMove(2)", @load="loadingImg('bg04')")

  .jumbotron_bg(:style="setMove(3)")
    img.jumbotron_fish.fish-7(src="/jumbotron/fish07.png", @load="loadingImg('fish07')")
  //- .jumbotron_bg(:style="setMove(3)")
    img.jumbotron_fish.fish-6(src="/jumbotron/fish06.png", @load="loadingImg('fish06')")
  img.jumbotron_bg(src="/jumbotron/logo_bg03-2.png", :style="setMove(4)", @load="loadingImg('bg03')")

  .jumbotron_bg(:style="setMove(5)")
    img.jumbotron_fish.fish-5(src="/jumbotron/fish05.png", @load="loadingImg('fish05')")
  .jumbotron_bg(:style="setMove(6)")
    img.jumbotron_fish.fish-4(src="/jumbotron/fish04.png", @load="loadingImg('fish04')")
  .jumbotron_bg(:style="setMove(7)")
    img.jumbotron_fish.fish-3(src="/jumbotron/fish03.png", @load="loadingImg('fish03')")
  img.jumbotron_bg(src="/jumbotron/logo_bg02-2.png", :style="setMove(8)", @load="loadingImg('bg02')")

  .jumbotron_bg(:style="setMove(10)")
    img.jumbotron_fish.fish-2(src="/jumbotron/fish02.png", @load="loadingImg('fish02')")
  .jumbotron_bg(:style="setMove(12)")
    img.jumbotron_fish.fish-1(src="/jumbotron/fish01.png", @load="loadingImg('fish01')")
  img.jumbotron_bg.jumbotron_cover(
    src="/jumbotron/logo_bg01-3.png",
    :style="setMove(isMobile ? 14 : 4)",
    @load="loadingImg('bg01')"
  )

  .jumbotron_logo
</template>

<style lang="scss" scoped>
  .jumbotron {
    @apply relative z-20 flex w-full items-center justify-center overflow-hidden bg-jumbotron;

    &-pause .jumbotron_fish {
      animation-play-state: paused;
    }

    &_bg {
      @apply absolute top-1/2 left-1/2 h-full min-w-full max-w-none -translate-x-1/2 -translate-y-1/2;
      &.bg {
        @apply relative top-0 left-0 min-h-screen translate-x-0 translate-y-0;
      }
    }
    &_fish {
      @apply absolute object-contain;
    }
    &_cage {
      @apply absolute top-[64.75%] left-[46%] h-[3%] w-[3%] object-contain opacity-70;
    }
    &_cover {
      @apply box-content border-[2000px] border-jumbotron;
      @apply duration-[0.025s];
    }
    &_logo {
      @apply absolute h-[60%] w-[60%] bg-white/80;
      @apply lg:h-[75%] lg:w-[75%];
      @apply md:h-[90%] md:w-[90%];
      @apply sm:h-[95%] sm:w-[95%];
      mask: url('/image/LOGO.svg') no-repeat center center;
    }
  }

  @mixin mobile {
    @media only screen and (max-width: 576px) {
      @content;
    }
  }
  .fish {
    &-1 {
      @apply top-[69%] left-[66%] h-[25%] w-[25%];
      animation: fish1 90s -19s infinite linear;
      @include mobile {
        @apply top-[60%] left-[65%] h-[40%] w-[40%];
      }
    }
    &-2 {
      @apply top-[22%] left-[0px] h-[25%] w-[25%];
      animation: fish2 60s -34s infinite linear;
      @include mobile {
        @apply top-[22%] left-[0px] h-[30%] w-[30%];
      }
    }
    &-3 {
      @apply top-[55%] left-[60%] h-[20%] w-[20%];
      animation: fish3 150s -37.5s infinite linear;
      @include mobile {
        @apply top-[47%] left-[60%] h-[40%] w-[40%];
      }
    }
    &-4 {
      @apply top-[77%] left-[42%] h-[15%] w-[15%];
      // animation: fish4 200s -100s infinite linear;
      @include mobile {
        @apply top-[70%] left-[42%] h-[25%] w-[25%];
      }
    }
    &-5 {
      @apply top-[66%] left-[18%] h-[12%] w-[12%];
      animation: fish5 150s -40s infinite linear;
      @include mobile {
        @apply top-[60%] left-[15%] h-[18%] w-[18%];
      }
    }
    // &-6 {
    //   @apply top-[70%] left-[43%] h-[10%] w-[10%];
    //   animation: fish6 250s -125s infinite linear;
    // }
    &-7 {
      @apply top-[14%] left-[48%] h-[18%] w-[18%];
      // animation: fish7 300s -25s infinite linear;
      @include mobile {
        @apply top-[12%] left-[45%] h-[25%] w-[25%];
      }
    }
    &-8 {
      @apply top-[30%] left-[72%] h-[15%] w-[15%];
      // animation: fish8 100s -22s infinite linear;
      @include mobile {
        @apply top-[28%] left-[83%] h-[20%] w-[20%];
      }
    }
    &-9 {
      @apply top-[14%] left-[2%] h-[42%] w-[42%];
      animation: fish9 300s -130s infinite linear;
      @include mobile {
        @apply top-[3%] left-[-22%] h-[60%] w-[60%];
      }
    }
    &-10 {
      @apply top-[60%] left-[30%] h-[15%] w-[15%];
      animation: fish10 200s -115s infinite linear;
      @include mobile {
        @apply top-[53%] left-[25%] h-[25%] w-[25%];
      }
    }
  }

  @keyframes fish1 {
    0% {
      transform: translate(80%, -5%);
    }
    100% {
      transform: translate(-302%, 22%);
    }
  }
  @keyframes fish2 {
    0% {
      transform: translate(-65%, 195%);
    }
    100% {
      transform: translate(50%, -150%);
    }
  }
  @keyframes fish3 {
    0% {
      transform: translate(100%, -5%);
    }
    100% {
      transform: translate(-305%, 10%);
    }
  }
  // @keyframes fish4 {
  //   0% {
  //     transform: translate(150%, 0%);
  //   }
  //   100% {
  //     transform: translate(-150%, 0%);
  //   }
  // }
  @keyframes fish5 {
    0% {
      transform: translate(-170%, 2%);
    }
    100% {
      transform: translate(470%, -5%);
    }
  }
  // @keyframes fish6 {
  //   0% {
  //     transform: translate(320%, 20%);
  //   }
  //   50% {
  //     transform: translate(0%, 0%);
  //   }
  //   100% {
  //     transform: translate(-280%, 20%);
  //   }
  // }
  // @keyframes fish7 {
  //   0% {
  //     transform: translate(25%, -25%);
  //   }
  //   100% {
  //     transform: translate(-260%, 260%);
  //   }
  // }
  // @keyframes fish8 {
  //   0% {
  //     transform: translate(25%, 30%);
  //   }
  //   100% {
  //     transform: translate(-90%, -100%);
  //   }
  // }
  @keyframes fish9 {
    0% {
      transform: translate(-85%, 62%);
    }
    100% {
      transform: translate(105%, -78%);
    }
  }
  @keyframes fish10 {
    0% {
      transform: translate(-150%, -30%);
    }
    100% {
      transform: translate(110%, 30%);
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
    mask: url('/image/LOGO.svg') no-repeat center center;
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
