<script setup>
  import IconTwitter from './icons/IconTwitter.vue';
  import { RouterLink } from 'vue-router';

  const twitterList = ['yajirusi_dr', 'DRDS_Ooinn', 'DRDS_hanji', 'Zoexiao27'];
</script>

<template lang="pug">
footer.relative.z-20.bg-jumbotron.text-white
  .mx-auto.flex.items-center.justify-between.py-3.px-10(class="max-w-[1200px] sm:flex-col sm:px-5")
    .m-3.grow
      .-mx-2.flex.flex-wrap(class="sm:justify-center")
        a.footer_link(
          v-for="twitter of twitterList",
          :href="`https://twitter.com/${twitter}`",
          :title="`@${twitter}`",
          target="_blank"
        )
          IconTwitter
          span @{{ twitter }}
      p.footer_copyright © 2023 Tennan Gakuen Seisaku Iinkai lnc.

    RouterLink.block.shrink-0(:to="{ name: 'index', hash: '#home' }")
      img.m-3.h-16.w-16(src="/image/tennan.svg", title="天南学園製作委員会")
</template>

<style lang="scss" scoped>
  .footer_link {
    @apply mx-2 flex items-end whitespace-nowrap hover:text-primary sm:mx-1 sm:w-32;
    svg {
      @apply h-8 w-8 shrink-0;
    }
    span {
      @apply font-sans text-[0.6rem];
    }
  }
  .footer_copyright {
    @apply mt-3 border-t border-secondary pt-1 font-sans tracking-widest sm:mt-5 sm:text-center sm:tracking-normal;
  }
</style>
