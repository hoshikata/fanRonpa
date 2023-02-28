<script setup>
  import Jumbotron from './Jumbotron.vue';
  import Character from './Character.vue';
  import Products from './Products.vue';
  import { ref } from 'vue';
</script>

<template lang="pug">
Jumbotron/
.bg-gradient-to-b.from-jumbotron
  header
  Character/
  section.story.min-h-screen
  section.special.min-h-screen
  Products/
</template>

<style lang="scss" scoped></style>
