<script setup>
  import { ref, nextTick } from 'vue';

  const canvas = ref(null);
  nextTick(() => {
    const ctx = canvas.value.getContext('2d');
  });
</script>

<template lang="pug">
.pointer-events-none.fixed.z-20.h-screen.w-full
  canvas.block.h-full.w-full(ref="canvas")
</template>

<style lang="scss" scoped></style>
