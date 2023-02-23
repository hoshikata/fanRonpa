<script setup>
  import IconClose from '~icons/ic/round-close';
  import CharacterInfo from './CharacterInfo.vue';
  import { ref } from 'vue';

  const popup = ref(false);
  const charPopup = ref(null);

  const openPopup = () => {
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
  button.relative.border.border-current.px-5.py-3(@click="openPopup", class="hover:bg-white/20")
    span 角色介紹

  .characters_popup(v-show="popup", @click="closePopup", ref="charPopup")
    button.characters_close
      IconClose
    .characters_window
      CharacterInfo/
</template>

<style lang="scss" scoped>
  .characters {
    @apply relative flex h-full min-h-screen w-full items-center justify-center;
    &_popup {
      @apply fixed top-0 left-0 h-full w-full cursor-pointer bg-back/80 p-14 duration-300 xl:p-12 md:p-10 sm:p-8;
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
