<script setup>
  import IconClose from '~icons/ic/round-close';
  import Jumbotron from './views/Jumbotron.vue';
  import CharacterInfo from './views/CharacterInfo.vue';
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
#app
  Jumbotron/

  section.characters
    button.border.border-current.px-5.py-3(@click="openPopup", class="hover:bg-white/20") 角色介紹
    .characters_popup(v-show="popup", @click="closePopup", ref="charPopup")
      button.characters_close
        IconClose
      .characters_window
        CharacterInfo/
</template>

<style lang="scss" scoped>
  #app {
    @apply min-h-screen w-full bg-back text-white;
  }
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

<!-- <script setup>
  import { RouterLink, RouterView } from 'vue-router';
  import HelloWorld from './components/HelloWorld.vue';
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
  header {
    line-height: 1.5;
    max-height: 100vh;
  }

  .logo {
    display: block;
    margin: 0 auto 2rem;
  }

  nav {
    width: 100%;
    font-size: 12px;
    text-align: center;
    margin-top: 2rem;
  }

  nav a.router-link-exact-active {
    color: var(--color-text);
  }

  nav a.router-link-exact-active:hover {
    background-color: transparent;
  }

  nav a {
    display: inline-block;
    padding: 0 1rem;
    border-left: 1px solid var(--color-border);
  }

  nav a:first-of-type {
    border: 0;
  }

  @media (min-width: 1024px) {
    header {
      display: flex;
      place-items: center;
      padding-right: calc(var(--section-gap) / 2);
    }

    .logo {
      margin: 0 2rem 0 0;
    }

    header .wrapper {
      display: flex;
      place-items: flex-start;
      flex-wrap: wrap;
    }

    nav {
      text-align: left;
      margin-left: -1rem;
      font-size: 1rem;

      padding: 1rem 0;
      margin-top: 1rem;
    }
  }
</style> -->
