<template>
  <transition
    :css="false"
    @enter="enter"
    @leave="leave"
  >
    <div class="normal-player" v-show="this.isFullScreen">
      <div class="player-wrapper">
        <PlayHeader></PlayHeader>
        <PlayerMiddle></PlayerMiddle>
        <PlayerBottom></PlayerBottom>
      </div>
      <div class="player-bg">
        <img :src="currentSong.picUrl" alt="">
      </div>
    </div>
  </transition>
</template>

<script>
  import PlayHeader from "./PlayHeader";
  import PlayerMiddle from "./PlayerMiddle";
  import PlayerBottom from "./PlayerBottom";
  import {mapGetters, mapActions} from "vuex";
  import Velocity from "velocity-animate";
  import 'velocity-animate/velocity.ui';

  export default {
    name: "NormalPlayer",
    components: {
      PlayHeader,
      PlayerMiddle,
      PlayerBottom
    },
    computed: {
      ...mapGetters([
        'isFullScreen',
        'currentSong'
      ])
    },
    methods: {
      ...mapActions([
        'setSongLyric'
      ]),
      enter(el, done) {
        Velocity(el, 'transition.slideRightIn', {duration: 500}, () => done());
      },
      leave(el, done) {
        Velocity(el, 'transition.slideRightOut', {duration: 500}, () => done());
      }
    },
    watch: {
      currentSong(newValue, oldValue) {
        // 删除全部歌曲时，不请求数据
        if (newValue.id === undefined) {
          return;
        }
        this.setSongLyric(newValue.id);
      }
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