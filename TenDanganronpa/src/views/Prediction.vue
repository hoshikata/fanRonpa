<script setup>
  import izayoi from '../components/prediction/izayoi.vue';
  import Footer from '../components/Footer.vue';
  import { RouterLink, useRoute, useRouter } from 'vue-router';
  import { ref, computed } from 'vue';
  import { useLang } from '../stores/useLang.js';
  import { useCharacter } from '../composable/useCharacter.js';
  import { useImage } from '../composable/useImage.js';

  const route = useRoute();
  const router = useRouter();
  const lang = ref(route.query.lang);

  const { langKey } = useLang();
  const { publicSrc } = useImage();

  const { getCharData } = useCharacter();
  const charData = computed(() => getCharData(lang.value));

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

  const crossStyle = (id) => {
    const target = status.value.find((item) => item.id === id);
    const num = target.status % 3;
    return { 'text-red-700': num === 1, 'text-green-700': num === 2, invisible: !num };
  };
  const ieiStyle = (id) => {
    const target = status.value.find((item) => item.id === id);
    const num = target.status % 3;
    return { '!visible': num };
  };
</script>

<template lang="pug">
.flex.min-h-screen.flex-col
  nav.prediction_nav
    button.logo(@click="goBack", :class="`logo-${lang}`")
    .flex.items-center.self-end
      button.prediction_lang(@click="changeLang('jp')") 日本語
      button.prediction_lang(@click="changeLang('zh')") 中文
      button.prediction_lang(@click="changeLang('en')") English

  main.prediction
    .prediction_container
      .relative(v-for="charData of charData", class="w-1/4")
        .prediction_box.group
          img.invisible.relative.-z-10.h-full.w-full(src="../assets/image/iei_bg.png")
          img.prediction_item.object-contain(:src="publicSrc(`/prediction/${charData.img_name}.png`)")
          img.prediction_item.prediction_frame(:class="ieiStyle(charData.id)", src="../assets/image/iei_frame.png")
          izayoi.prediction_item(:class="crossStyle(charData.id)")
          img.prediction_item.prediction_frame(:class="ieiStyle(charData.id)", src="../assets/image/iei_ribbon.png")
          button.prediction_item.pointer-events-auto(@click="changeStatus(charData.id)")

        .prediction_detail
          p.prediction_ability {{ charData.ability }}
          p.prediction_name(:class="`prediction_name-${lang}`")
            span(v-for="(text, index) of charData.name.split(' ')", :class="{ 'mx-1': index }") {{ text }}

  Footer/
</template>

<style lang="scss" scoped>
  .prediction {
    &_nav {
      @apply relative z-10 flex items-center bg-jumbotron py-1 px-5 text-white;
    }
    &_lang {
      @apply m-3 px-2 font-sans font-medium hover:text-primary;
      @apply sm:m-1 sm:px-1 sm:text-sm;
    }
  }
  .prediction {
    @apply flex grow items-center justify-center bg-back px-10 text-white;
    @apply md:p-5 sm:p-0;
    @apply bg-cover bg-center bg-no-repeat;
    background-size: 101% 101%;
    background-image: url('../assets/image/profile_bg.png');

    * {
      @apply font-sans;
    }
    &_container {
      @apply relative flex max-w-[1200px] flex-wrap py-10 px-14;
      @apply md:p-5 sm:p-2;
      &::before {
        @apply absolute top-0 left-0 h-full w-full bg-back/75 blur-md content-[''];
      }
    }
    &_box {
      @apply pointer-events-none relative m-1;
      background: url('../assets/image/iei_bg_shape.png') no-repeat center;
      background-size: contain;
      mask: url('../assets/image/iei_shape.svg') no-repeat center;
      mask-size: cover;
    }
    &_item {
      @apply absolute top-0 h-full w-full;
    }
    &_frame {
      @apply invisible group-hover:visible;
    }
    &_detail {
      @apply absolute bottom-0 left-0 w-full bg-back/75 p-1.5 text-center tracking-widest;
      @apply lg:text-sm md:relative md:p-0.5 md:text-sm sm:p-0;
    }
    &_ability {
      @apply text-sm lg:text-xs md:text-[0.6rem] sm:hidden;
    }
    &_name-en {
      @apply mt-px md:mt-0 md:flex md:flex-col;
    }
  }
</style>
