<script setup>
  import IconArrow from '~icons/ic/baseline-double-arrow';
  import axios from 'axios';
  // import data from '../../data/data.json';
  import { computed, watch, onMounted, ref } from 'vue';

  const props = defineProps({
    id: {
      type: [Number],
      default: 4,
    },
  });

  const characterData = ref([]);
  const getData = async () => {
    const data = await axios.get('https://hoshikata.github.io/TenDanganronpa/data.json');
    characterData.value = data.data;
    // characterData.value = data;
  };
  onMounted(getData);

  //== char
  const charContainer = ref(null);
  const activeId = ref(4);
  const activeChar = computed(() => {
    const target = characterData.value.find((datum) => datum.id === activeId.value) ?? {};
    const result = JSON.parse(JSON.stringify(target));
    result.birth = (result.birth ?? '').split('-').join('月') + '日';
    return result;
  });
  const changeChar = (num) => {
    const container = charContainer.value;
    container.classList.add('opacity-0');
    setTimeout(() => {
      const last = characterData.value.length;
      let newId = activeId.value + num;
      if (newId < 0) newId = last + newId;
      if (newId >= last) newId = last - newId;
      activeId.value = newId;
      container.parentNode.scrollTo(0, 0);
      container.classList.remove('opacity-0');
    }, 700);
  };
  const charName = computed(() => {
    const { name, spell } = activeChar.value;
    const [firstN, lastN] = name?.split?.(' ') ?? [];
    const [firstS, lastS] = spell?.split?.(' ') ?? [];
    return { first: [firstN, firstS], last: [lastN, lastS] };
  });
  const charAbility = computed(() => activeChar.value.ability?.split('\n'));
  const charDesc = computed(() => activeChar.value.description?.split('\n'));
  const charMantra = computed(() => activeChar.value.mantra?.split('\n'));

  //== table
  const tableList = [
    { title: '身長', dataName: 'height', size: 'w-1/2 lg:w-full' },
    { title: '体重', dataName: 'weight', size: 'w-1/2 lg:w-full' },
    { title: '胸囲', dataName: 'chest', size: 'w-1/2 lg:w-full' },
    { title: '血液型', dataName: 'blood', size: 'w-1/2 lg:w-full' },
    { title: '誕生日', dataName: 'birth', size: 'w-1/2 xxl:w-full' },
    { title: '原作者', dataName: 'author', size: 'w-1/2 xxl:w-full xxl:order-2' },
    { title: '好きなもの', dataName: 'like', size: 'w-full' },
    { title: '嫌いなもの', dataName: 'unlike', size: 'w-full' },
  ];

  watch(
    () => props.id,
    () => (activeId.value = props.id),
    { immediate: true },
  );
</script>

<template lang="pug">
section.character.scrollbar.overflow-y-auto.overscroll-none
  .character_container(ref="charContainer")
    img.character_school(src="/image/KIKUTERAZONO-19.svg")
    .character_author.left-0(src="/image/profile_2.png")
    .character_author.right-0.rotate-180(src="/image/profile_2.png") 

    .relative.z-10.flex.shrink-0.flex-col.py-5(class="lg:w-4/7 w-1/2 md:w-full")
      .character_title
        .flex.justify-center
          p.mx-5(v-for="name of charName")
            h1.text-7xl.font-semibold {{ name[0] }}
            h2.text-primary {{ name[1] }}
        h3.mt-3.flex.flex-wrap.justify-center.text-2xl(class="md:mt-2 md:text-xl")
          span(v-for="ability of charAbility") {{ ability }}
      .hr
      .character_info
        .character_table(v-for="info of tableList", :class="info.size")
          p.character_th
            span.relative.z-10.whitespace-nowrap.font-bold.text-back {{ info.title }}
          p {{ activeChar[info.dataName] }}
      .hr
      .character_description
        .scrollbar.h-0.min-h-full.w-full.overflow-y-auto.pr-2
          p(v-for="text of charDesc") {{ text }}

    .character_aside
      .character_mantra
        .text-white(:style="`text-shadow: 2px 2px 0 ${activeChar.color}80;`")
          p.whitespace-nowrap(v-for="mantra of charMantra") {{ mantra }}
      img.character_image(src="https://images.plurk.com/1Ozqkemya7dEFGj7LXPCQO.png")

    button.character_next.left-0.-scale-100(@click="changeChar(-1)")
      IconArrow
    button.character_next.right-0(@click="changeChar(1)")
      IconArrow
</template>

<style lang="scss" scoped>
  .character {
    @apply relative flex h-full w-full flex-col items-stretch tracking-widest text-white;
    @apply bg-cover bg-center bg-no-repeat;
    background-image: url('../assets/image/profile_bg.png');

    &_container {
      @apply relative z-10 flex w-full grow px-20 text-xl tracking-[0.2em] duration-[600ms];
      @apply xxl:px-16 xxl:text-lg xxl:tracking-[0.15em];
      @apply xl:px-14;
      @apply lg:px-10;
      @apply md:flex-col-reverse md:px-8 md:text-base;
      // &:before {
      //   @apply absolute top-0 left-0 h-full w-full bg-gradient-to-l from-primary to-transparent opacity-20 content-[''];
      // }
    }
    &_title {
      @apply whitespace-nowrap text-center;
      h1 {
        @apply xl:text-5xl;
        @apply md:text-4xl;
      }
    }
    &_info {
      @apply flex flex-wrap;
    }
    &_table {
      @apply flex items-center px-4 py-3.5;
      @apply lg:py-3;
      @apply md:py-2.5;
    }
    &_th {
      @apply relative mr-9 py-1 px-6;
      @apply xxl:px-5;
      @apply lg:py-0.5;
      @apply md:mr-6 md:px-4;
      &::before {
        @apply absolute top-0 left-0 h-full w-full -skew-x-[40deg] bg-primary shadow-info content-[''];
      }
    }
    &_description {
      @apply my-2 mr-2 grow leading-10 xxl:min-h-[250px];
      @apply lg:leading-8 md:my-1;
    }
    &_aside {
      @apply relative flex min-h-full grow overflow-hidden;
      @apply md:min-h-0 md:grow-0;
      mask: url('../assets/image/profile_clip.png') repeat-x;
      mask-size: contain;
      mask-position: bottom right;
    }
    &_mantra {
      @apply box-content flex w-[4em] shrink-0 items-center justify-start px-4 pt-10 text-3xl leading-10 opacity-80;
      @apply bg-gradient-to-b from-back via-back to-transparent;
      @apply xl:text-2xl;
      @apply lg:text-xl;
      @apply md:px-2 md:py-5 md:text-lg md:h-[500px];
      writing-mode: vertical-rl;
      p:nth-child(2) {
        @apply indent-[3em] md:indent-[2em];
      }
      p:nth-child(3) {
        @apply indent-[6em] md:indent-[4em];
      }
    }
    &_image {
      @apply absolute right-5 top-5 w-[95%] object-contain;
      @apply xl:right-0 xl:w-[80%];
      @apply lg:w-[75%];
    }
    &_school {
      @apply absolute right-24 top-16 w-[18%] opacity-100;
      @apply xl:right-5;
      @apply sm:w-[25%];
      filter: drop-shadow(0 0 2px black);
      mask: url('../assets/image/profile_clip.png') repeat-x;
      mask-size: cover;
      mask-position: bottom right;
    }
    &_author {
      @apply absolute top-0 h-full w-56 opacity-80 mix-blend-multiply;
      @apply bg-contain bg-top bg-no-repeat;
      @apply xl:w-40;
      @apply md:w-32;
      @apply sm:w-28;
      background-image: url('../assets/image/profile_zoe.png');
    }
    &_next {
      @apply absolute top-0 z-10 h-full w-20 px-3 text-white/50 opacity-0 hover:opacity-100;
      @apply bg-gradient-to-l from-white/20  to-transparent;
      @apply md:w-16;
      svg {
        @apply h-auto w-full;
      }
    }
  }
  .hr {
    @apply my-3 h-0.5 w-full bg-gradient-to-r from-primary via-primary to-transparent;
  }
</style>
