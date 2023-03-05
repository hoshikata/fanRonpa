<script setup></script>

<template lang="pug">
section.story.wrapper
  #story.wrapper_hash

  .mb-12.flex(class="lg:mb-6")
    h2.title.text-gray-300(title="STORY") STORY

  .story_container
    p Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis quia libero ea fugit earum esse cupiditate nesciunt aspernatur dignissimos tempore dolorem, rem ipsum quibusdam dolor laboriosam. Quod recusandae maiores aspernatur consequatur debitis cumque aliquam tempora delectus possimus animi vel voluptatum perferendis, optio minus hic! Minus fugiat ex placeat eveniet. Dolores reiciendis sequi illo iusto ipsum, aspernatur dolor facilis non, unde neque, quibusdam eveniet nobis? Obcaecati illum reiciendis consectetur, quasi voluptates quam esse, sed delectus veritatis non veniam dolor illo, nemo ducimus similique soluta. Fuga eveniet optio sint! Error, animi quod! Voluptatum accusantium fuga officia consequuntur, aliquam culpa distinctio debitis a similique repellat? Necessitatibus accusantium odio amet distinctio laborum eligendi repudiandae eius facere, rerum architecto aspernatur at esse, ex, itaque quia ullam velit aliquid. Error autem rem vero nam provident asperiores distinctio reiciendis alias eos dolor, odio totam perferendis tempore illo deleniti sed ipsa pariatur eligendi. Ullam ipsum voluptates quod nihil?

    .mt-10.flex(class="sm:flex-col")
      img.mr-10(src="../assets/image/bg_1.png", class="w-1/2 sm:mr-0 sm:mb-5 sm:w-full")
      img(src="../assets/image/bg_2.png", class="w-1/2 sm:w-full")

.story_hr
  img.w-full(src="../assets/image/wave-haikei.svg")
</template>

<style lang="scss" scoped>
  .story {
    @apply min-h-screen bg-jumbotron-700;

    &_container {
      @apply relative mx-auto max-w-[1000px] px-12 py-8 text-justify text-lg text-gray-100 sm:text-base;
      @apply sm:px-8 sm:py-5 xs:px-6 xs:py-4;
    }

    &_hr {
      @apply relative z-10 bg-stone-100 bg-contain bg-bottom bg-no-repeat;
      background-image: url('../assets/image/circle.svg');
      &::before {
        @apply absolute top-0 left-0 -z-10 h-4 w-full bg-jumbotron-700 content-[''];
      }
      &::after {
        @apply absolute top-0 left-0 -z-10 h-full w-full opacity-80 content-[''];
        @apply bg-cover bg-top bg-no-repeat;
        background-image: url('../assets/image/wave-haikei_3.svg');
      }
    }
  }
</style>
