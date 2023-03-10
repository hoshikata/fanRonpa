<script setup>
  import IconClose from '~icons/ic/round-close';
  import CharacterCard from './CharacterCard.vue';
  import CharacterInfo from './CharacterInfo.vue';
  import { storeToRefs } from 'pinia';
  import { RouterLink } from 'vue-router';
  import { ref, computed } from 'vue';
  import { useLang } from '../stores/useLang.js';
  import { useNav } from '../stores/useNav.js';
  import { useCharacter } from '../composable/useCharacter.js';
  import { vParallax } from '../assets/js/directive.js';

  const langStore = useLang();
  const { lang } = storeToRefs(langStore);

  const { characterData } = useCharacter();
  const navText = computed(() => useNav().getNavItem('characters'));

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
    h2.title.text-gray-500(:title="navText") CHARACTER
  .mb-10.flex(class="lg:mb-8 sm:mb-5")
    RouterLink.characters_button(:to="{ name: 'prediction', query: { lang: lang } }")
      span.font-sans.tracking-widest {{ lang === 'jp' ? '生死予想シート' : '生死預測表' }} →

  CharacterCard.fullpage(@open="openPopup", v-parallax="500")

.characters_popup(@click="closePopup", v-show="popup", ref="charPopup")
  button.characters_close
    IconClose
  .characters_window
    CharacterInfo(:id="charId")
</template>

<style lang="scss" scoped>
  .characters {
    @apply z-20 bg-stone-100;

    &_button {
      @apply relative ml-auto border border-current px-5 py-3 tracking-wide hover:bg-jumbotron/10;
      @apply lg:px-3 lg:py-2;
    }

    &_popup {
      @apply fixed top-0 left-0 z-50 h-full w-full cursor-pointer bg-back duration-300;
      @apply p-14 xl:p-12 md:p-10 sm:p-8;
    }
    &_close {
      @apply absolute right-0 top-0 z-20 text-gray-400 hover:text-gray-100;
      svg {
        @apply m-2 h-12 w-12 xl:h-10 xl:w-10 md:h-8 md:w-8 sm:h-6 sm:w-6;
      }
    }
    &_window {
      @apply h-full w-full cursor-auto overflow-hidden rounded-xl bg-back;
    }
  }
</style>
