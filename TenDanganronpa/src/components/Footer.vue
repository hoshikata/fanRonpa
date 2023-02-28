<script setup>
  import IconTwitter from './icons/IconTwitter.vue';
</script>

<template lang="pug">
footer.bg-jumbotron
  .mx-auto.flex.items-center.justify-between.py-3.px-10(class="max-w-[1200px] sm:flex-col sm:px-5")
    .m-3.grow
      .-mx-2.flex(class="sm:justify-center")
        a.footer_link(href="https://twitter.com/DRDS_Ooinn", title="@DRDS_Ooinn" target="_blank")
          IconTwitter
        a.footer_link(href="https://twitter.com/DRDS_hanji", title="@DRDS_hanji" target="_blank")
          IconTwitter
        a.footer_link(href="https://twitter.com/Zoexiao27", title="@Zoexiao27" target="_blank")
          IconTwitter
        a.footer_link(href="https://twitter.com/yajirusi_dr", title="@yajirusi_dr" target="_blank")
          IconTwitter
      p.footer_copyright(class="sm:text-center") © 2023 Tennan Gakuen Seisaku Iinkai lnc.
    img.m-3.h-16.w-16(src="/image/tennan.svg", title="天南学園製作委員会")
</template>

<style lang="scss" scoped>
  .footer_link {
    @apply mx-2 h-8 w-8 hover:text-primary;
  }
  .footer_copyright {
    @apply mt-2 border-t border-secondary pt-1 font-sans tracking-widest sm:tracking-normal;
  }
</style>
