<template>
  <div class="normal-player" v-show="this.isFullScreen">
    <div class="player-wrapper">
      <PlayHeader></PlayHeader>
      <PlayerMiddle></PlayerMiddle>
      <PlayerBottom></PlayerBottom>
    </div>
    <div class="player-bg">
      <img src="http://p4.music.126.net/ysEtllS9g67Dwb4fhwMh8w==/109951164795032738.jpg" alt="">
    </div>
  </div>
</template>

<script>
  import PlayHeader from "./PlayHeader";
  import PlayerMiddle from "./PlayerMiddle";
  import PlayerBottom from "./PlayerBottom";
  import {mapGetters} from "vuex";

  export default {
    name: "NormalPlayer",
    components: {
      PlayHeader,
      PlayerMiddle,
      PlayerBottom
    },
    computed: {
      ...mapGetters([
        'isFullScreen'
      ])
    }
  }
</script>

<style scoped lang="scss">
  @import "../../assets/css/variable";
  @import "../../assets/css/mixin";

  .normal-player {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    @include bg_sub_color();

    .player-wrapper {
      width: 100%;
      height: 100%;
      position: relative;
      z-index: 999;
    }

    .player-bg {
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;

      img {
        height: 100%;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        filter: blur(10px);
      }
    }
  }
</style>