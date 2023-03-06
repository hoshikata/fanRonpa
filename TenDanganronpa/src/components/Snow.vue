<script setup>
  import '../assets/js/particles';
  import { ref, nextTick } from 'vue';

  const canvas = ref(null);

  nextTick(() => {
    new Particles(canvas.value, {
      size: { min: 0, max: 2.5 },
      density: 200,
      speed: 1.2,
      fps: 30,
      color: '#FFFFFF',
    });
  });
</script>

<template lang="pug">
.pointer-events-none.absolute.z-20.h-full.w-full
  canvas.block.h-full.w-full.opacity-30(ref="canvas")
</template>

<style lang="scss" scoped></style>
