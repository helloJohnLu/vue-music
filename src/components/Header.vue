<template>
  <!--
  <div class="header" @click="switchTheme">
    <div class="header-left"></div>
    <p class="header-title">John's music list</p>
    <div class="header-right" @click.stop="accoutClick"></div>
  </div>
  -->
  <div class="header" @click="switchTheme">
    <!-- 注意点：不可以直接设置插槽样式，设置了也无效，要设置插槽样式必须使用一个 HTML 标签包裹插槽 -->
    <div class="left">
      <slot name="left">左</slot>
    </div>
    <slot name="center">中</slot>
    <div class="right">
      <slot name="right">右</slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Header",
    data() {
      return {
        themes: ['red', 'green', 'night'],
        index: 0
      }
    },
    methods: {
      switchTheme() {
        this.index++;
        if (this.index >= this.themes.length) {
          this.index = 0;
        }
        document.documentElement.setAttribute('data-theme', this.themes[this.index]);
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../assets/css/variable";
  @import "../assets/css/mixin";

  .header {
    width: 100%;
    height: 100px;
    @include bg_color();
    display: flex;
    justify-content: space-between;

    .left, .right {
      width: 84px;
      height: 84px;
      margin-top: 8px;

      * {
        width: 100%;
        height: 100%;
      }
    }
  }
</style>