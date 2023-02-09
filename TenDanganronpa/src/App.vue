<script setup>
  import ArrowLeft from '~icons/ic/outline-arrow-circle-left';
  import ArrowRight from '~icons/ic/outline-arrow-circle-right';
  import axios from 'axios';
  import { computed, onMounted, ref } from 'vue';
  //== get data
  const characterData = ref([]);
  const getData = async () => {
    const data = await axios.get('https://hoshikata.github.io/TenDanganronpa/data.json');
    characterData.value = data.data;
  };
  onMounted(getData);
  //== char
  const activeId = ref(0);
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
  const tdWidth = { 0: 'w-36', 1: 'w-52' };
</script>

<template lang="pug">
#app.flex.min-h-screen.w-screen.justify-center.bg-back.tracking-widest.text-white
  button.button(@click="changeChar(-1)", title="PREV")
    ArrowLeft.h-12.w-12
    span.mt-1 PREV

  section.flex.h-full.flex-col.items-stretch.justify-center(class="min-w-[720px]")
    .my-4.flex.items-baseline.justify-between
      h1.text-6xl {{ activeChar.name }}
      h2.text-4xl {{ activeChar.spell }}

    table.table-fixed(v-for="(tableList, index) of [tableList1, tableList2]")
      tr(v-for="tableLine of tableList")
        template(v-for="table of tableLine")
          td.bg-primary.font-semibold.text-back(:class="tdWidth[index]") {{ table.title }}
          td {{ activeChar[table.dataName] }}

  button.button.flex-row-reverse(@click="changeChar(1)", title="NEXT")
    ArrowRight.h-12.w-12
    span.mt-1 NEXT
</template>

<style lang="scss" scoped>
  .button {
    @apply mx-10 flex flex-col items-center justify-center hover:text-primary;
  }
  table {
    @apply mt-1 border-separate border-spacing-y-2;
  }
  td {
    @apply whitespace-nowrap border border-primary px-3 py-2 text-3xl;
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
