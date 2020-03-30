<template>
  <Header class="header">
    <div slot="left" class="header-left" @click.stop="goBack"></div>
    <p slot="center" class="header-title">{{title}}</p>
    <div slot="right" class="header-right"></div>
  </Header>
</template>

<script>
  import Header from "../Header";

  export default {
    name: "DetailHeader",
    components: {
      Header
    },
    props: {
      title: {
        type: String,
        default: '',
        required: true
      }
    },
    methods: {
      goBack() {
        window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/');
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../assets/css/variable";
  @import "../../assets/css/mixin";

  .header {
    .header-left {
      @include bg_img("../../assets/images/back");
    }

    .header-right {
      @include bg_img("../../assets/images/more")
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