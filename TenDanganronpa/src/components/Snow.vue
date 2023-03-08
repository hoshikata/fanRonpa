<script setup>
  import { loadFull } from 'tsparticles';
  import particlesConfig from '../assets/js/particlesjs-config.json';

  const particlesInit = async (engine) => {
    await loadFull(engine);
  };
  const particlesLoaded = (container) => {
    // console.log('Particles container loaded', container);
  };
</script>

<template lang="pug">
.pointer-events-none.absolute.z-20.h-full.w-full
  Particles#tsparticles(:particlesInit="particlesInit", :particlesLoaded="particlesLoaded", :options="particlesConfig")
</template>

<style lang="scss" scoped></style>
