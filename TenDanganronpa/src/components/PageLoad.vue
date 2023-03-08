<script setup>
  import { storeToRefs } from 'pinia';
  import { ref, reactive, computed, watch } from 'vue';
  import { useLoad } from '../stores/useLoad.js';

  const loadStore = useLoad();
  const { isLoad, loadProgress } = storeToRefs(loadStore);

  const loadVal = reactive({ isLoad, limit: 2, time: 0, timer: null });
  const showLoad = computed(() => !(!loadVal.isLoad && loadVal.time >= loadVal.limit));
  const progress = computed(() => {
    const loading = loadProgress.value;
    const timing = loadVal.time / loadVal.limit;
    return Math.round(loading * (timing > 1 ? 1 : timing) * 100);
  });

  const hideScrollBar = (val) => {
    const status = val ? 'add' : 'remove';
    document.body.classList[status]('overflow-hidden');
  };

  watch(
    showLoad,
    (nVal) => {
      hideScrollBar(nVal);
      if (!nVal) clearInterval(loadVal.timer);
      else {
        loadVal.time = 0;
        loadVal.timer = setInterval(() => (loadVal.time += 0.5), 500);
      }
    },
    { immediate: true },
  );
</script>

<template lang="pug">
.fixed.top-0.left-0.z-50.flex.h-screen.w-full.items-center.justify-center.bg-secondary(v-show="showLoad")
  p.font-sans.text-white Loading... {{ progress }}
</template>

<style lang="scss" scoped></style>
