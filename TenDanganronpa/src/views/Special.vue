<script setup>
  import { ref, computed } from 'vue';
  import { useNav } from '../stores/useNav.js';

  const navText = computed(() => useNav().getNavItem('special'));
</script>

<template lang="pug">
section.special.wrapper
  #special.wrapper_hash

  .mb-12.flex(class="lg:mb-6")
    h2.title.text-gray-300(:title="navText") SPECIAL
</template>

<style lang="scss" scoped>
  .special {
    @apply min-h-screen bg-jumbotron-900;
  }
</style>
