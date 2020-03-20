<template>
  <transition
    :css="false"
    @enter="enter"
    @leave="leave"
  >
    <div class="list-player" v-show="isShow">
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
        <div class="player-middle">
          <ScrollView>
            <ul>
              <li class="item">
                <div class="item-left">
                  <div class="item-play"></div>
                  <p>歌手</p>
                </div>
                <div class="item-right">
                  <div class="item-favorite"></div>
                  <div class="item-del"></div>
                </div>
              </li>
              <li class="item">
                <div class="item-left">
                  <div class="item-play"></div>
                  <p>歌手</p>
                </div>
                <div class="item-right">
                  <div class="item-favorite"></div>
                  <div class="item-del"></div>
                </div>
              </li>
              <li class="item">
                <div class="item-left">
                  <div class="item-play" @click="play" ref="play"></div>
                  <p>歌手</p>
                </div>
                <div class="item-right">
                  <div class="item-favorite"></div>
                  <div class="item-del"></div>
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

  export default {
    name: "ListPlayer",
    components: {
      ScrollView
    },
    data: function () {
      return {
        isShow: false
      }
    },
    computed: {
      ...mapGetters(['isPlaying'])
    },
    methods: {
      show() {
        this.isShow = true;
      },
      hidden() {
        this.isShow = false;
      },
      // 界面切换动效
      enter(el, done) {
        Velocity(el, 'transition.slideUpIn', {duration: 500}, () => done());
      },
      leave(el, done) {
        Velocity(el, 'transition.slideDownOut', {duration: 500}, () => done());
      },
      ...mapActions(['setIsPlaying']),
      // 播放按钮的切换
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

      .player-middle {
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
              @include bg_img('../../assets/images/small_pause');
              margin-right: 20px;

              &.active {
                @include bg_img('../../assets/images/small_play');
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