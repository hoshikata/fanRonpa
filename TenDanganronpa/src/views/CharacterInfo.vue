<script setup>
  import IconArrow from '~icons/ic/baseline-double-arrow';
  import { storeToRefs } from 'pinia';
  import { ref, computed, watch } from 'vue';
  import { useLang } from '../stores/useLang.js';
  import { useCharacter } from '../composable/useCharacter.js';
  import { useImage } from '../composable/useImage.js';

  const langStore = useLang();
  const { lang } = storeToRefs(langStore);

  const { characterData, abilityText } = useCharacter();
  const { publicSrc } = useImage();

  const props = defineProps({
    id: {
      type: [Number],
      default: 4,
    },
  });

  //== char
  const charContainer = ref(null);
  const activeId = ref(0);
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
      container.classList.remove('opacity-0');
    }, 700);
  };
  const charName = computed(() => {
    const { name, spell } = activeChar.value;
    const [firstN, lastN] = name?.split?.(' ') ?? [];
    const [firstS, lastS] = spell?.split?.(' ') ?? [];
    return { first: [firstN, firstS], last: [lastN, lastS] };
  });
  const charDesc = computed(() => activeChar.value.description?.split('\n'));
  const charMantra = computed(() => activeChar.value.mantra?.split('\n'));
  const chatSchool = computed(() => {
    const name = activeChar.value.school_img;
    const src = publicSrc(`/school/${name}.svg`);
    return name ? src : '';
  });

  //== table
  const tableList = [
    { title_zh: '身高', title_jp: '身長', dataName: 'height', size: 'w-1/2 lg:w-full' },
    { title_zh: '體重', title_jp: '体重', dataName: 'weight', size: 'w-1/2 lg:w-full' },
    { title_zh: '胸圍', title_jp: '胸囲', dataName: 'chest', size: 'w-1/2 lg:w-full' },
    { title_zh: '血型', title_jp: '血液型', dataName: 'blood', size: 'w-1/2 lg:w-full' },
    { title_zh: '生日', title_jp: '誕生日', dataName: 'birth', size: 'w-1/2 xxl:w-full' },
    { title_zh: '原作者', title_jp: '原作者', dataName: 'author', size: 'w-1/2 xxl:w-full xxl:order-2' },
    { title_zh: '喜歡的東西', title_jp: '好きなもの', dataName: 'like', size: 'w-full' },
    { title_zh: '討厭的東西', title_jp: '嫌いなもの', dataName: 'unlike', size: 'w-full' },
    { title_zh: '原學校', title_jp: '元学校', dataName: 'school', size: 'w-full' },
  ];

  watch(activeId, () => {
    charContainer.value?.parentNode.scrollTo(0, 0);
  });
  watch(
    () => props.id,
    () => (activeId.value = props.id),
    { immediate: true },
  );
</script>

<template lang="pug">
section.character.scrollbar.overflow-y-auto.overscroll-none
  .character_container(ref="charContainer")
    img.character_school(:src="chatSchool")
    .character_author.left-0(src="/image/profile_2.png")
    .character_author.right-0.rotate-180(src="/image/profile_2.png") 

    .relative.z-10.flex.shrink-0.flex-col.py-5(class="lg:w-4/7 w-1/2 md:w-full")
      .character_title
        .flex.justify-center
          p.mx-5(v-for="name of charName")
            h1.text-7xl.font-semibold {{ name[0] }}
            h2.text-primary {{ name[1] }}
        h3.mt-3.flex.flex-wrap.justify-center.text-2xl(class="md:mt-2 md:text-xl")
          span {{ abilityText }}
          span {{ activeChar.ability }}
      .hr
      .character_info
        .character_table(v-for="info of tableList", :class="info.size")
          p.character_th
            span.relative.z-10.whitespace-nowrap.font-bold.text-back {{ info[`title_${lang}`] }}
          p {{ activeChar[info.dataName] }}
            span(v-if="info.dataName === 'birth'", :title="activeChar.birth_remark") ({{ activeChar.star_sign }}座)
      .hr
      .character_description.scrollbar
        p(v-for="text of charDesc") {{ text }}

    .character_aside
      .character_mantra
        //- (:style="`text-shadow: 2px 2px 0 ${activeChar.color}80;`")
        .text-white
          p.whitespace-nowrap(v-for="mantra of charMantra") {{ mantra }}
      img.character_image(src="/image/shape_test.png")

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
      @apply sm:px-5;
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
      @apply lg:mr-7 lg:px-4 lg:py-0.5;
      @apply md:mr-5 md:px-3;
      &::before {
        @apply absolute top-0 left-0 h-full w-full -skew-x-[40deg] bg-primary shadow-info content-[''];
      }
    }
    &_description {
      @apply my-2 mr-2 h-0 w-full grow overflow-y-auto pr-2 leading-10;
      @apply xxl:min-h-[250px] lg:leading-8 md:my-1 md:h-auto md:min-h-0;
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
      @apply md:h-[500px] md:px-2 md:py-5 md:text-lg;
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
      @apply absolute right-24 top-16 max-h-[30%] w-[18%] object-left-top;
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
    @apply my-3 h-0.5 w-full shrink-0 bg-gradient-to-r from-primary via-primary to-transparent;
  }
</style>
