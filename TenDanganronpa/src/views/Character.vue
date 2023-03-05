<script setup>
  import IconClose from '~icons/ic/round-close';
  import CharacterInfo from './CharacterInfo.vue';
  import CharacterCard from './CharacterCard.vue';
  import { ref } from 'vue';
  import { storeToRefs } from 'pinia';
  import { RouterLink } from 'vue-router';
  import { useLang } from '../stores/useLang.js';
  import { useCharacter } from '../composable/useCharacter.js';
  import { useImage } from '../composable/useImage.js';

  const store = useLang();
  const { lang } = storeToRefs(store);

  const { characterData, abilityText } = useCharacter();
  const { publicSrc } = useImage();

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
    const window = target.matches('.characters_window, .characters_window *');
    if (!window) {
      popup.value = false;
      document.body.classList.remove('overflow-hidden');
    }
  };
</script>

<template lang="pug">
section.characters.wrapper
  #characters.wrapper_hash

  .mb-5.flex(class="lg:mb-3")
    h2.title.text-gray-500(title="CHARACTER") CHARACTER
  .mb-10.flex(class="lg:mb-8 sm:mb-5")
    RouterLink.characters_button(to="/prediction")
      span.font-sans.tracking-widest {{ lang === 'jp' ? '生死予想シート' : '生死預測表' }} →

  CharacterCard.relative.z-20.-mx-12(@open="openPopup", class="lg:-mx-10 sm:-mx-8")

  .characters_popup(@click="closePopup", v-show="popup", ref="charPopup")
    button.characters_close
      IconClose
    .characters_window
      CharacterInfo(:id="charId")
</template>

<style lang="scss" scoped>
  .characters {
    @apply bg-stone-100;

    &_button {
      @apply relative ml-auto border border-current px-5 py-3 tracking-wide hover:bg-jumbotron/10;
      @apply lg:px-3 lg:py-2;
    }

    &_popup {
      @apply fixed top-0 left-0 z-50 h-full w-full cursor-pointer bg-back p-14 duration-300 xl:p-12 md:p-10 sm:p-8;
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
