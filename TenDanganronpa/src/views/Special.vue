<script setup>
  import { ref, computed } from 'vue';
  import { useNav } from '../stores/useNav.js';

  const navText = computed(() => useNav().getNavItem('special'));
</script>

<template lang="pug">
section.special.wrapper.flex.flex-col
  #special.wrapper_hash

  .mb-12.flex(class="lg:mb-6")
    h2.title.text-gray-300(:title="navText") SPECIAL

  .flex.grow.p-5.text-white(class="md:flex-col")
    .special_box(v-for="num of 2") {{ num }}
</template>

<style lang="scss" scoped>
  .special {
    @apply min-h-screen bg-jumbotron-900;

    &_box {
      @apply mx-5 w-full bg-jumbotron/80 p-10;
      @apply md:mx-0 md:my-5;
      backdrop-filter: blur(2px);
    }
  }
</style>
