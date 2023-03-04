<script setup>
  import izayoi from '../components/prediction/izayoi.vue';
  import { RouterLink } from 'vue-router';
  import { ref, computed, watch } from 'vue';
  import { useCharacter } from '../composable/useCharacter.js';
  import { useImage } from '../composable/useImage.js';

  const { characterData, abilityText } = useCharacter();
  const { publicSrc } = useImage();

  const statusList = () => {
    const result = [];
    for (let n = 0; n < 16; n++) {
      result.push({ id: n, status: 0 });
    }
    return result;
  };
  const status = ref(statusList());

  const changeStatus = (id) => {
    const target = status.value.find((item) => item.id === id);
    target.status += 1;
  };
  const pickStyle = (id) => {
    const target = status.value.find((item) => item.id === id);
    const num = target.status % 3;
    return { 'text-red-700': num === 1, 'text-green-700': num === 2, invisible: !num };
  };
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
    .flex
      .flex.flex-wrap.p-1(class="max-w-[992px]")
        .z-10(v-for="charData of characterData", class="w-1/4")
          .test.group.relative.z-10.m-1
            img.invisible.relative.-z-10.h-full.w-full(src="../assets/image/iei_bg.png")
            //- img.absolute.top-0.-z-10.w-full(
            //-   :src="`/school/${charData.school_img}.svg`",
            //-   class="left-1/2 -translate-x-1/2 group-hover:invisible"
            //- )
            img.absolute.top-0.h-full.w-full.object-contain(:src="publicSrc(`/prediction/${charData.img_name}.png`)")
            img.invisible.absolute.top-0.h-full.w-full(class="group-hover:visible", src="../assets/image/iei_frame.png")
            izayoi.absolute.top-0.h-full.w-full(:class="pickStyle(charData.id)")
            img.invisible.absolute.top-0.h-full.w-full(class="group-hover:visible", src="../assets/image/iei_ribbon.png")
            button.absolute.top-0.h-full.w-full(@click="changeStatus(charData.id)")

            .absolute.bottom-0.left-0.w-full.py-1.px-2.text-center.tracking-widest(class="bg-back/75")
              //- p.text-xs {{ abilityText }}
              p.text-xs {{ charData.ability }}
              p.mt-px {{ charData.name }}
</template>

<style lang="scss" scoped>
  .test {
    background: url('../assets/image/iei_bg_shape.png') no-repeat center;
    background-size: contain;
    mask: url('../assets/image/iei_shape.svg') no-repeat center;
    mask-size: cover;
  }
  .prediction {
    @apply min-h-screen bg-back text-white;
    @apply bg-cover bg-center bg-no-repeat;
    // background-image: url('/jumbotron/logo_bg05.png');

    * {
      @apply font-sans;
    }
    &_side {
      @apply flex justify-between bg-jumbotron p-4;
      backdrop-filter: blur(10px);
    }
    &_logo {
      @apply block h-24 w-64 bg-white;
      mask: url('/image/LOGO.svg') no-repeat center;
    }
  }
</style>
