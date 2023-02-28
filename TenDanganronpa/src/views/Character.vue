<script setup>
  import IconClose from '~icons/ic/round-close';
  import CharacterInfo from './CharacterInfo.vue';
  import { ref } from 'vue';
  import { RouterLink } from 'vue-router';
  import { useCharacter } from '../composable/useCharacter.js';

  const { characterData, abilityText } = useCharacter();
  const popup = ref(false);
  const charId = ref(0);
  const charPopup = ref(null);

  const openPopup = (id) => {
    charId.value = id;
    popup.value = true;
    charPopup.value.classList.add('opacity-0', 'blur-2xl');
    document.body.classList.add('overflow-hidden');
    setTimeout(() => {
      charPopup.value.classList.remove('opacity-0', 'blur-2xl');
    }, 100);
  };

  const closePopup = (e) => {
    const target = e.target;
    const window = target.matches('.characters_window, .characters_window * ');
    if (!window) {
      popup.value = false;
      document.body.classList.remove('overflow-hidden');
    }
  };
</script>

<template lang="pug">
section.characters
  .relative.py-10.px-12(class="bg-back/50")
    .absolute.top-0.left-0.h-full.w-full.blur-sm
    .p-10
      h2.mb-16.font-sans.text-6xl Character
      .mx-10.flex(class="lg:hidden")
        .characters_group.group(
          v-for="charData in characterData",
          :title="abilityText + charData.ability + '　' + charData.name"
        )
          .characters_img(style="background-image: url('/image/shape_test.png')", class="group-hover:bg-none")
            img.invisible(src="/image/shape_test1.png", class="group-hover:visible")
          //- .characters_detail
            p {{ abilityText }}{{ charData.ability }}
            p.mt-10 {{ charData.name }}
          button.characters_link(@click="openPopup(charData.id)")

      .mt-10.flex.justify-between
        button.characters_button.invisible(@click="openPopup(0)", class="lg:visible")
          span 角色介紹
        RouterLink.characters_button(to="/prediction")
          span 生死預測表 →

  .characters_popup(@click="closePopup", v-show="popup", ref="charPopup")
    button.characters_close
      IconClose
    .characters_window
      CharacterInfo(:id="charId")
</template>

<style lang="scss" scoped>
  .characters {
    @apply relative h-full min-h-screen w-full bg-back/10 py-40;

    &_group {
      @apply relative -mx-10 cursor-pointer px-1;
      &:nth-child(even) {
        @apply z-10 mt-10;
      }
    }
    &_img {
      @apply bg-contain bg-center bg-no-repeat;
    }
    &_detail {
      @apply invisible absolute top-0 left-0 flex h-full w-full items-center pt-10 text-xl tracking-[0.2em] group-hover:visible;
      writing-mode: vertical-lr;
    }
    &_link {
      @apply absolute top-0 left-0 h-full w-full;
    }
    &_button {
      @apply relative border border-current px-5 py-3 hover:bg-white/20;
    }

    &_popup {
      @apply fixed top-0 left-0 z-20 h-full w-full cursor-pointer bg-back/80 p-14 duration-300 xl:p-12 md:p-10 sm:p-8;
    }
    &_close {
      @apply absolute right-0 top-0 text-gray-400 hover:text-gray-600;
      svg {
        @apply m-2 h-12 w-12 xl:h-10 xl:w-10 md:h-8 md:w-8 sm:h-6 sm:w-6;
      }
    }
    &_window {
      @apply h-full w-full cursor-auto overflow-hidden rounded-xl bg-back;
    }
  }
</style>
