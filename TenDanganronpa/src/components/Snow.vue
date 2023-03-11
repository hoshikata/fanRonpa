<script setup>
  import { loadFull } from 'tsparticles';
  import config from '../assets/js/marine-snow-config.json';
  import { ref, nextTick } from 'vue';

  const particlesInit = async (engine) => {
    await loadFull(engine);
  };
  const particlesLoaded = (container) => {
    container.canvas.element.style.pointerEvents = 'none';
    // console.log('Particles container loaded', container);
  };
</script>

<template lang="pug">
Particles#snow.snow(:particlesInit="particlesInit", :particlesLoaded="particlesLoaded", :options="config")
</template>

<style lang="scss" scoped>
  .snow {
    @apply pointer-events-none absolute z-20 h-screen w-full;
  }
</style>
