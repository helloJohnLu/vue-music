<template>
  <div class="mini-player">
    <div class="player-wrapper">
      <div class="player-left">
        <img src="http://p4.music.126.net/ysEtllS9g67Dwb4fhwMh8w==/109951164795032738.jpg" alt="">
        <div class="player-title">
          <h3>歌手</h3>
          <p>歌手名</p>
        </div>
      </div>
      <div class="player-right">
        <div class="play"></div>
        <div class="list" @click.stop="showList"></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "MiniPlayer",
    methods: {
      showList() {
        this.$emit('showList');
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../assets/css/variable";
  @import "../../assets/css/mixin";

  .mini-player {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 150px;

    .player-wrapper {
      width: 100%;
      height: 100%;
      @include bg_color();
      display: flex;
      align-items: center;
      justify-content: space-between;

      .player-left {
        display: flex;
        padding-left: 30px;

        img {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          margin-right: 20px;
        }

        .player-title {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          h3 {
            @include font_size($font_medium);
            @include font_color();
          }

          p {
            @include font_size($font_medium_s);
            @include font_color();
          }
        }
      }

      .player-right {
        display: flex;
        align-items: center;

        .play {
          width: 84px;
          height: 84px;
          @include bg_img('../../assets/images/play')
        }

        .list {
          width: 120px;
          height: 120px;
          @include bg_img('../../assets/images/list')
        }
      }
    }
  }
</style>