<template>
  <div class="list-player">
    <div class="player-wrapper">
      <div class="player-top">
        <div class="top-left">
          <div class="mode"></div>
          <p>顺序播放</p>
        </div>
        <div class="top-right">
          <div class="del"></div>
        </div>
      </div>
      <div class="player-middle"></div>
      <div class="player-bottom"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ListPlayer"
  }
</script>

<style scoped lang="scss">
  @import "../../assets/css/variable";
  @import "../../assets/css/mixin";

  .list-player {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    @include bg_sub_color();

    .player-wrapper {
      .player-top {
        width: 100%;
        height: 100px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .top-left {
          display: flex;
          align-items: center;
          padding-left: 20px;

          .mode {
            width: 56px;
            height: 56px;
            margin-right: 20px;
            @include bg_img('../../assets/images/small_loop');
          }

          p {
            @include font_color();
            @include font_size($font_medium_s);
          }
        }

        .top-right {
          .del {
            width: 84px;
            height: 84px;
            @include bg_img('../../assets/images/small_del');
          }
        }
      }
    }
  }
</style>