<template>
  <ul class="detail-bottom">
    <li class="bottom-top">
      <div class="bottom-icon"></div>
      <div class="bottom-title">播放全部</div>
    </li>
    <li v-for="value in playlist" :key="playlist.id" class="item" @click="selectMusic">
      <h3>{{value.name}}</h3>
      <p>{{value.al.name}} —— {{value.ar[0].name}}</p>
    </li>
  </ul>
</template>

<script>
  export default {
    name: "DetailBottom",
    props: {
      playlist: {
        type: Array,
        default: () => [],
        required: true
      }
    },
    methods: {
      selectMusic() {
        this.$store.dispatch('setFullScreen', true);
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../assets/css/mixin";
  @import "../../assets/css/variable";

  .detail-bottom {
    width: 100%;

    li {
      width: 100%;
      padding: 20px;
      box-sizing: border-box;
      @include bg_sub_color();
      border-bottom: 1px solid #ccc;
    }

    .bottom-top {
      display: flex;
      align-items: center;
      border-top-left-radius: 20px;
      border-top-right-radius: 20px;

      .bottom-icon {
        width: 60px;
        height: 60px;
        @include bg_img('../../assets/images/small_play');
        margin-right: 20px;
      }

      .bottom-title {
        @include font_color();
        @include font_size($font_large);
        @include no-wrap();
      }
    }

    .item {
      padding-bottom: 20px;

      h3 {
        @include font_color();
        @include font_size($font_medium);
      }

      p {
        @include font_color();
        @include font_size($font_small);
        margin-top: 10px;
        opacity: 0.8;
      }
    }
  }
</style>