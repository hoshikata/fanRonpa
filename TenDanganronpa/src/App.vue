<script setup>
  import ArrowLeft from '~icons/ic/outline-arrow-circle-left';
  import ArrowRight from '~icons/ic/outline-arrow-circle-right';
  import data from '../data/data.json';
  import axios from 'axios';
  import { computed, onMounted, ref } from 'vue';

  //== get data
  const characterData = ref([]);
  const getData = async () => {
    // const data = await axios.get('https://hoshikata.github.io/TenDanganronpa/data.json');
    // characterData.value = data.data;
    characterData.value = data;
  };
  onMounted(getData);

  //== char
  const activeId = ref(4);
  const activeChar = computed(() => {
    const target = characterData.value.find((datum) => datum.id === activeId.value) ?? {};
    const result = JSON.parse(JSON.stringify(target));
    result.birth = (result.birth ?? '').split('-').join('月') + '日';
    return result;
  });
  const changeChar = (num) => {
    const last = characterData.value.length;
    let newId = activeId.value + num;
    if (newId < 0) newId = last + newId;
    if (newId >= last) newId = last - newId;
    activeId.value = newId;
  };

  //== table
  const tableList1 = [
    [
      { title: '身長', dataName: 'height' },
      { title: '体重', dataName: 'weight' },
    ],
    [
      { title: '胸囲', dataName: 'chest' },
      { title: '血液型', dataName: 'blood' },
    ],
  ];
  const tableList2 = [
    [{ title: '誕生日', dataName: 'birth' }],
    [{ title: '好きなもの', dataName: 'like' }],
    [{ title: '嫌いなもの', dataName: 'unlike' }],
    [{ title: '特記事項', dataName: 'ability' }],
  ];
  const tdStyle = { 0: { width: 'w-1/2', title: 'w-36' }, 1: { width: 'w-full', title: 'w-52' } };
</script>

<template lang="pug">
#app
  main.wrapper.relative
    .wrapper_head TSUSHINBO
    .wrapper_group
      button.button(@click="changeChar(-1)", title="PREV")
        ArrowLeft.h-12.w-12
        span.mt-1 PREV
      button.button.flex-row-reverse(@click="changeChar(1)", title="NEXT")
        ArrowRight.h-12.w-12
        span.mt-1 NEXT
    .wrapper_title
      h1.text-7xl {{ activeChar.name }}
      h2.text-5xl(:style="'color: ' + activeChar.color") {{ activeChar.spell }}

    section.w-full(class="h-[520px] pl-[12%]")
      div(class="w-[750px]")
        .mb-2(v-for="(tableList, index) of [tableList1, tableList2]")
          .tbody(v-for="tableLine of tableList")
            .m-1.flex(v-for="table of tableLine", :class="tdStyle[index].width")
              .td.font-bold.text-back(class="bg-primary/80", :class="tdStyle[index].title") {{ table.title }}
              .td.grow {{ activeChar[table.dataName] }}

    .char_image
      img(src="https://images.plurk.com/1Ozqkemya7dEFGj7LXPCQO.png ")
</template>

<style lang="scss" scoped>
  #app {
    @apply min-h-screen w-screen bg-back;
  }
  .wrapper {
    @apply flex min-h-screen w-screen flex-col items-center justify-center  bg-gradient-to-b from-primary via-transparent tracking-widest text-white;
    &_head {
      @apply relative z-20 w-full border-y-4 border-current bg-primary/60 py-1 pl-[12%] font-sans text-3xl font-bold text-back;
    }
    &_group {
      @apply flex h-28 w-full items-center bg-primary/20 pl-[12%];
    }
    &_title {
      @apply flex w-full items-baseline justify-start border-y-[12px] border-back bg-[#5A0C58] py-3 pl-[12%] font-bold;
    }
  }
  .button {
    @apply mx-10 flex flex-col items-center justify-center hover:text-primary;
  }
  .tbody {
    @apply flex;
  }
  .td {
    @apply whitespace-nowrap border border-primary px-3 py-2 text-4xl;
  }
  .char_image {
    @apply absolute right-0 top-0 z-10 h-screen w-2/5 overflow-hidden;
    img {
      @apply h-full w-full object-cover object-top;
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
