<template>
  <div class="player-bottom">
    <div class="bottom-progress">
      <span>0:00</span>
      <div class="progress-bar">
        <div class="progress-line">
          <div class="progress-dot"></div>
        </div>
      </div>
      <span>0:00</span>
    </div>
    <div class="bottom-control">
      <div class="mode loop" @click="setMode" ref="mode"></div>
      <div class="prev"></div>
      <div class="play" @click="play" ref="play"></div>
      <div class="next"></div>
      <div class="favorite"></div>
    </div>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from "vuex";
  import mode from "../../store/modeType";

  export default {
    name: "PlayerBottom",
    computed: {
      ...mapGetters(['isPlaying', 'modeType'])
    },
    methods: {
      ...mapActions([
        'setIsPlaying',
        'setModeType'
      ]),
      play() {
        this.setIsPlaying(!this.isPlaying);
      },
      // 播放模式
      setMode() {
        // 切换播放模式
        if (this.modeType === mode.loop) {
          this.setModeType(mode.one);
        } else if (this.modeType === mode.one) {
          this.setModeType(mode.random);
        } else if (this.modeType === mode.random) {
          this.setModeType(mode.loop);
        }
      }
    },
    watch: {
      isPlaying(newValue, oldValue) {
        if (newValue) {
          this.$refs.play.classList.add('active');
        } else {
          this.$refs.play.classList.remove('active');
        }
      },
      modeType(newValue, oldValue) {
        if (newValue === mode.loop) {
          this.$refs.mode.classList.remove('random');
          this.$refs.mode.classList.add('loop');
        } else if (newValue === mode.one) {
          this.$refs.mode.classList.remove('loop');
          this.$refs.mode.classList.add('one');
        } else if (newValue === mode.random) {
          this.$refs.mode.classList.remove('one');
          this.$refs.mode.classList.add('random')
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../assets/css/variable";
  @import "../../assets/css/mixin";

  .player-bottom {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;

    .bottom-progress {
      width: 80%;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;

      span {
        @include font_size($font_small);
        @include font_color();
      }

      .progress-bar {
        width: 100%;
        margin: 0 10px;
        height: 10px;
        background-color: #fff;
        position: relative;

        .progress-line {
          width: 50%;
          height: 100%;
          background-color: #ccc;

          .progress-dot {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background-color: #fff;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translateY(-50%);
          }
        }
      }
    }

    .bottom-control {
      width: 80%;
      margin: 0 auto;
      padding: 50px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      div {
        width: 84px;
        height: 84px;
      }

      .mode {
        &.loop {
          @include bg_img('../../assets/images/loop');
        }
        &.one {
          @include bg_img('../../assets/images/one');
        }
        &.random {
          @include bg_img('../../assets/images/shuffle');
        }
      }

      .prev {
        @include bg_img('../../assets/images/prev');
      }

      .play {
        @include bg_img('../../assets/images/play');

        &.active {
          @include bg_img('../../assets/images/pause');
        }
      }

      .next {
        @include bg_img('../../assets/images/next');
      }

      .favorite {
        @include bg_img('../../assets/images/un_favorite');

        &.active {
          @include bg_img('../../assets/images/favorite');
        }
      }
    }
  }
</style>