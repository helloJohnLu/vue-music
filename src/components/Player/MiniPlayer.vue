<template>
  <transition
    :css="false"
    @enter="enter"
    @leave="leave"
  >
    <div class="mini-player" v-show="this.isShowMiniPlayer">
      <div class="player-wrapper">
        <div class="player-left" @click="showNormalPlayer">
          <img src="http://p4.music.126.net/ysEtllS9g67Dwb4fhwMh8w==/109951164795032738.jpg" alt="">
          <div class="player-title">
            <h3>歌手</h3>
            <p>歌手名</p>
          </div>
        </div>
        <div class="player-right">
          <div class="play" @click="play" ref="play"></div>
          <div class="list" @click.stop="showList"></div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import {mapActions, mapGetters} from "vuex";
  import Velocity from "velocity-animate";
  import 'velocity-animate/velocity.ui';

  export default {
    name: "MiniPlayer",
    computed: {
      ...mapGetters([
        'isShowMiniPlayer',
        'isPlaying'
      ])
    },
    methods: {
      ...mapActions([
        'setFullScreen',
        'setMiniPlayer',
        'setIsPlaying'
      ]),
      showList() {
        this.$emit('showList');
      },
      showNormalPlayer() {
        this.setFullScreen(true);
        this.setMiniPlayer(false);
      },
      // 界面切换动效
      enter(el, done) {
        Velocity(el, 'transition.slideUpIn', {duration: 500}, () => done());
      },
      leave(el, done) {
        Velocity(el, 'transition.slideDownOut', {duration: 500}, () => done());
      },
      // 播放按钮切换
      play() {
        this.setIsPlaying(!this.isPlaying);
      }
    },
    watch: {
      isPlaying(newValue, oldValue) {
        if (newValue) {
          this.$refs.play.classList.add('active');
        } else {
          this.$refs.play.classList.remove('active');
        }
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
          @include bg_img('../../assets/images/pause');

          &.active {
            @include bg_img('../../assets/images/play');
          }
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