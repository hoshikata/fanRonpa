<script setup>
  import { loadFull } from 'tsparticles';
  import particlesConfig from '../assets/js/particlesjs-config.json';

  const particlesInit = async (engine) => {
    await loadFull(engine);
  };
  const particlesLoaded = (container) => {
    container.canvas.element.style.pointerEvents = 'none';
    // console.log('Particles container loaded', container);
  };
</script>

<template lang="pug">
Particles#snow.snow(:particlesInit="particlesInit", :particlesLoaded="particlesLoaded", :options="particlesConfig")
</template>

<style lang="scss" scoped>
  .snow {
    @apply pointer-events-none absolute z-20 h-full w-full;
  }
</style>
