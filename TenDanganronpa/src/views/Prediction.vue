<script setup>
  import { RouterLink } from 'vue-router';
  import { ref, computed, watch } from 'vue';
  import { useCharacter } from '../composable/useCharacter.js';

  const { characterData, abilityText } = useCharacter();
</script>

<template lang="pug">
main.prediction
  .prediction_side
    RouterLink.prediction_logo(to="/")
    ul.flex.items-center.self-end
      li.my-3.mx-5 中文
      li.my-3.mx-5 日本語
      li.my-3.mx-5 English
  .flex.grow.items-center.justify-center.p-10
    .flex.bg-jumbotron
      .flex.flex-wrap.p-1(class="max-w-[992px]")
        .z-10(v-for="charData of characterData", class="w-1/4")
          .relative.m-1
            img.mx-auto.w-full(:src="`/prediction/${charData.img_name}.png`")
            img.absolute.top-0.-z-10.w-full(:src="`/school/${charData.school_img}.svg`", class="left-1/2 -translate-x-1/2")
            .absolute.bottom-0.left-0.w-full.bg-back.py-1.px-2.tracking-widest
              //- p.text-xs {{ abilityText }}
              p.text-xs {{ charData.ability }}
              p.mt-px.text-right {{ charData.name }}
</template>

<style lang="scss" scoped>
  .prediction {
    @apply min-h-screen bg-cover bg-center bg-no-repeat;
    background-image: url('jumbotron/logo_bg05.png');

    * {
      @apply font-sans;
    }
    &_side {
      @apply flex justify-between bg-jumbotron p-4;
      backdrop-filter: blur(10px);
    }
    &_logo {
      @apply block h-24 w-64 bg-white;
      mask: url('image/LOGO.svg') no-repeat center;
    }
  }
</style>
