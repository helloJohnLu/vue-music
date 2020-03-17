<template>
  <div class="personalized">
    <div class="personalized-top">
      <h3>推荐歌单</h3>
    </div>
    <div class="personalized-list"></div>
  </div>
</template>

<script>
  export default {
    name: "Personalized"
  }
</script>

<style scoped lang="scss">
  @import "../assets/css/mixin";
  @import "../assets/css/variable";

  .personalized {
    .personalized-top {
      width: 100%;
      height: 84px;
      line-height: 84px;
      @include bg_sub_color();
      padding: 0 20px;

      h3 {
        @include font_size($font_large);
        font-weight: bold;
        @include font_color();
      }
    }
  }
</style>