<template>
  <transition
    :css="false"
    @enter="enter"
    @leave="leave"
  >
    <div class="list-player" v-show="isShowListPlayer">
      <div class="player-wrapper">
        <div class="player-top">
          <div class="top-left">
            <div class="mode loop" @click="setMode" ref="mode"></div>
            <p v-if="modeType === 0">顺序播放</p>
            <p v-else-if="modeType === 1">单曲播放</p>
            <p v-else="modeType">随机播放</p>
          </div>
          <div class="top-right">
            <div class="del"></div>
          </div>
        </div>
        <div class="player-middle">
          <ScrollView ref="scrollView">
            <ul>
              <li class="item" v-for="(value, index) in songs" :key="value.id">
                <div class="item-left">
                  <div class="item-play" @click="play" ref="play"></div>
                  <p>{{value.name}}</p>
                </div>
                <div class="item-right">
                  <div class="item-favorite"></div>
                  <div class="item-del" @click="del(index)"></div>
                </div>
              </li>
            </ul>
          </ScrollView>
        </div>
        <div class="player-bottom">
          <p @click.top="hidden">关闭</p>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import ScrollView from "../ScrollView";
  import Velocity from "velocity-animate";
  import 'velocity-animate/velocity.ui';
  import {mapGetters, mapActions} from "vuex";
  import mode from "../../store/modeType";

  export default {
    name: "ListPlayer",
    components: {
      ScrollView
    },
    computed: {
      ...mapGetters([
        'isPlaying',
        'modeType',
        'isShowListPlayer',
        'songs'
      ])
    },
    methods: {
      ...mapActions([
        'setIsPlaying',
        'setModeType',
        'setListPlayer',
        'deleteSong'
      ]),
      // 点击淡出列表播放界面
      hidden() {
        this.setListPlayer(false);
      },
      // 界面切换动效
      enter(el, done) {
        Velocity(el, 'transition.slideUpIn', {duration: 500}, () => done());
      },
      leave(el, done) {
        Velocity(el, 'transition.slideDownOut', {duration: 500}, () => done());
      },
      // 播放按钮的切换
      play() {
        this.setIsPlaying(!this.isPlaying);
      },
      // 播放模式切换
      setMode() {
        // 切换播放模式
        if (this.modeType === mode.loop) {
          this.setModeType(mode.one);
        } else if (this.modeType === mode.one) {
          this.setModeType(mode.random);
        } else if (this.modeType === mode.random) {
          this.setModeType(mode.loop);
        }
      },
      // 删除歌曲
      del(index) {
        this.deleteSong(index);
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
      },
      // 重新计算高度
      isShowListPlayer(newValue, oldValue) {
        if (newValue) {
          this.$refs.scrollView.refresh();
        }
      }
    }
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

            &.loop {
              @include bg_img('../../assets/images/small_loop');
            }

            &.one {
              @include bg_img('../../assets/images/small_one');
            }

            &.random {
              @include bg_img('../../assets/images/small_shuffle');
            }
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

      .player-middle {
        height: 700px;
        overflow: hidden;

        .item {
          height: 100px;
          border-top: 1px solid #ccc;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 20px;
          box-sizing: border-box;

          .item-left {
            display: flex;
            align-items: center;

            .item-play {
              width: 56px;
              height: 56px;
              @include bg_img('../../assets/images/small_play');
              margin-right: 20px;

              &.active {
                @include bg_img('../../assets/images/small_pause');
              }
            }

            p {
              @include font_size($font_medium_s);
              @include font_color();
            }
          }

          .item-right {
            display: flex;
            align-items: center;

            .item-favorite {
              width: 56px;
              height: 56px;
              @include bg_img('../../assets/images/small_favorite')
            }

            .item-del {
              width: 52px;
              height: 52px;
              margin-left: 20px;
              @include bg_img('../../assets/images/small_close')
            }
          }
        }

      }

      .player-bottom {
        width: 100%;
        height: 100px;
        line-height: 100px;
        @include bg_color();

        p {
          text-align: center;
          color: #fff;
          @include font_size($font_medium);
        }
      }
    }
  }
</style>