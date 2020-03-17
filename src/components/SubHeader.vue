<template>
  <div class="header" @click="switchTheme">
    <div class="header-left" @click.stop="goBack"></div>
    <p class="header-title">{{title}}</p>
    <div class="header-right"></div>
  </div>
</template>

<script>
  export default {
    name: "SubHeader",
    props: {
      title: {
        type: String,
        default: '',
        required: true
      }
    },
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
      },
      goBack() {
        window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/');
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
    /*background-color: #f00;*/
    @include bg_color();
    display: flex;
    justify-content: space-between;
    /*position: relative;
    z-index: 999;*/

    .header-left, .header-right {
      width: 84px;
      height: 84px;
      /*background-color: #000;*/
      margin-top: 8px;
    }

    .header-left {
      @include bg_img("../assets/images/back");
    }

    .header-right {
      @include bg_img("../assets/images/more")
    }
  }

  .header-title {
    text-align: center;
    line-height: 100px;
    color: #fff;
    font-weight: bold;
    @include font_size($font_medium);
    @include no-wrap();
  }
</style>