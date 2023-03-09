<script setup>
  import { loadFull } from 'tsparticles';
  import config from '../assets/js/bubble-config.json';
  import { storeToRefs } from 'pinia';
  import { ref, reactive, computed, watch } from 'vue';
  import { useLoad } from '../stores/useLoad.js';

  const loadStore = useLoad();
  const { isLoad, loadProgress } = storeToRefs(loadStore);

  const particles = ref();
  const particlesInit = async (engine) => {
    await loadFull(engine);
  };
  const particlesLoaded = (container) => {
    particles.value = container;
    // console.log('Particles container loaded', container);
  };

  const loadVal = reactive({ isLoad, limit: 2, time: 0, timer: null });
  const showLoad = computed(() => !(!loadVal.isLoad && loadVal.time >= loadVal.limit));
  const progress = computed(() => {
    const loading = loadProgress.value;
    const timing = loadVal.time / loadVal.limit;
    return Math.round(loading * (timing > 1 ? 1 : timing) * 100);
  });

  const hideScrollBar = (val) => {
    const play = val ? 'start' : 'stop';
    if (particles.value) particles.value[play]();
    const status = val ? 'add' : 'remove';
    document.body.classList[status]('overflow-hidden');
  };

  watch(
    showLoad,
    (nVal) => {
      hideScrollBar(nVal);
      if (!nVal) clearInterval(loadVal.timer);
      else {
        loadVal.time = 0;
        loadVal.timer = setInterval(() => (loadVal.time += 0.5), 500);
      }
    },
    { immediate: true },
  );
</script>

<template lang="pug">
.loading(:class="{ 'opacity-0 invisible': !showLoad }")
  .loading_bar LOADING...
    .loading_progress(:style="`width: ${progress}%`")
  Particles#bubble.bubble(:particlesInit="particlesInit", :particlesLoaded="particlesLoaded", :options="config")
</template>

<style lang="scss" scoped>
  .loading {
    @apply fixed top-0 left-0 z-50 flex h-screen w-full items-center justify-center overflow-hidden bg-white duration-300;
    @apply bg-gradient-to-t from-secondary/80 to-primary/80;

    &_bar {
      @apply relative border border-white/25 px-20 py-3 font-sans font-medium tracking-widest text-white;
    }
    &_progress {
      @apply absolute top-0 left-0 h-full bg-white/25 duration-300;
    }
  }
</style>
