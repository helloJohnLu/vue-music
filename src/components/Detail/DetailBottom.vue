<template>
  <ul class="detail-bottom">
    <li class="bottom-top" @click="selectAllMusic">
      <div class="bottom-icon"></div>
      <div class="bottom-title">播放全部</div>
    </li>
    <li v-for="value in playlist" :key="playlist.id" class="item" @click="selectMusic(value.id)">
      <h3>{{value.name}}</h3>
      <p>{{value.al.name}} —— {{value.ar[0].name}}</p>
    </li>
  </ul>
</template>

<script>
  import {mapActions} from "vuex";

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
      ...mapActions([
        'setFullScreen',
        'setSongDetail',
        'setSelectSong'
      ]),
      selectMusic(id) {
        // this.$store.dispatch('selectMusic', true);
        this.setFullScreen(true);
        this.setSongDetail([id]);  // [id] 之所以是数组因为 acitons.js 中的 ids 使用了 join 方法
      },
      // 播放全部
      selectAllMusic() {
        this.setFullScreen(true);
        // 重置 currentIndex 为 0
        this.setSelectSong(0);

        let ids = this.playlist.map(item => item.id);
        // console.log(ids);
        this.setSongDetail(ids);
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