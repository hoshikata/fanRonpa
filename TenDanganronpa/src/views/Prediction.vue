<script setup>
  import izayoi from '../components/prediction/izayoi.vue';
  import { RouterLink, useRoute, useRouter } from 'vue-router';
  import { ref, computed } from 'vue';
  import { useLang } from '../stores/useLang.js';
  import { useCharacter } from '../composable/useCharacter.js';
  import { useImage } from '../composable/useImage.js';

  const route = useRoute();
  const router = useRouter();
  const lang = ref(route.query.lang);

  const { langKey } = useLang();

  const { getAbilityText, getCharData } = useCharacter();
  const abilityText = computed(() => getAbilityText(lang.value));
  const charData = computed(() => getCharData(lang.value));

  const { publicSrc } = useImage();

  const changeLang = (val) => {
    lang.value = val;
    router.push({ name: 'prediction', query: { lang: val } });
  };
  const goBack = () => {
    const isEN = lang.value === 'en';
    const langIndex = localStorage.getItem(langKey);
    const langVal = isEN ? langIndex : lang.value;
    router.push({ name: 'index', hash: '#home' });
  };

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
    button.logo(@click="goBack", :class="`logo-${lang}`")
    .flex.items-center.self-end
      button.prediction_lang(@click="changeLang('jp')") 日本語
      button.prediction_lang(@click="changeLang('zh')") 中文
      button.prediction_lang(@click="changeLang('en')") English

  .flex.grow.items-center.justify-center.p-10(class="md:p-5 sm:p-2")
    .flex
      .flex.flex-wrap.p-1(class="max-w-[992px]")
        .z-10(v-for="charData of charData", class="w-1/4")
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
    // @apply bg-cover bg-center bg-no-repeat;
    // background-image: url('/jumbotron/logo_bg05.png');

    * {
      @apply font-sans;
    }
    &_side {
      @apply flex items-center bg-jumbotron py-1 px-5;
    }
    &_lang {
      @apply m-3 px-2 font-medium hover:text-primary;
      @apply sm:m-1 sm:px-1 sm:text-sm;
    }
  }
</style>
