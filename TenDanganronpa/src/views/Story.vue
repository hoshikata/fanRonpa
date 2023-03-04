<script setup></script>

<template lang="pug">
//- img.wave.bg-jumbotron-700(src="../assets/image/wave_1.svg")
section.story.wrapper.min-h-screen.bg-jumbotron-700
  #story.wrapper_hash

  .mb-12.flex(class="lg:mb-6")
    h2.title.text-gray-300(title="STORY") STORY

  .story_container
    p Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis quia libero ea fugit earum esse cupiditate nesciunt aspernatur dignissimos tempore dolorem, rem ipsum quibusdam dolor laboriosam. Quod recusandae maiores aspernatur consequatur debitis cumque aliquam tempora delectus possimus animi vel voluptatum perferendis, optio minus hic! Minus fugiat ex placeat eveniet. Dolores reiciendis sequi illo iusto ipsum, aspernatur dolor facilis non, unde neque, quibusdam eveniet nobis? Obcaecati illum reiciendis consectetur, quasi voluptates quam esse, sed delectus veritatis non veniam dolor illo, nemo ducimus similique soluta. Fuga eveniet optio sint! Error, animi quod! Voluptatum accusantium fuga officia consequuntur, aliquam culpa distinctio debitis a similique repellat? Necessitatibus accusantium odio amet distinctio laborum eligendi repudiandae eius facere, rerum architecto aspernatur at esse, ex, itaque quia ullam velit aliquid. Error autem rem vero nam provident asperiores distinctio reiciendis alias eos dolor, odio totam perferendis tempore illo deleniti sed ipsa pariatur eligendi. Ullam ipsum voluptates quod nihil?

    .mt-10.flex
      img.mr-10(src="../assets/image/bg_1.png", class="w-1/2 sm:mr-5")
      img(src="../assets/image/bg_2.png", class="w-1/2")
</template>

<style lang="scss" scoped>
  .story_container {
    @apply relative mx-auto max-w-[1000px] px-12 py-8 text-justify text-lg text-gray-100 sm:text-base;
    @apply sm:px-8 sm:py-5 xs:px-6 xs:py-4;
    // &::before,
    // &::after {
    //   @apply absolute top-0 left-0 h-full w-full bg-white/5 content-[''];
    // }
    // &::before {
    //   @apply -skew-x-3 skew-y-1 sm:-skew-x-2;
    // }
    // &::after {
    //   @apply -skew-y-3 skew-x-1 sm:-skew-y-2;
    // }
  }
</style>
