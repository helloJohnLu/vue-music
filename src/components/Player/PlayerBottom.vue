<template>
  <div class="player-bottom">
    <div class="bottom-progress">
      <span ref="showCurrentDuration">0:00</span>
      <div class="progress-bar" @click="processClick" ref="progressBar">
        <div class="progress-line" ref="progressLine">
          <div class="progress-dot"></div>
        </div>
      </div>
      <span ref="showSongDuration">0:00</span>
    </div>
    <div class="bottom-control">
      <div class="mode loop" @click="setMode" ref="mode"></div>
      <div class="prev" @click="prev"></div>
      <div class="play" @click="play" ref="play"></div>
      <div class="next" @click="next"></div>
      <div class="favorite" @click="favorite" :class="{'active': isFavorite(currentSong)}"></div>
    </div>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from "vuex";
  import mode from "../../store/modeType";

  export default {
    name: "PlayerBottom",
    props: {
      songDuration: {
        type: Number,
        default: 0,
        required: true
      },
      currentTime: {
        type: Number,
        default: 0,
        required: true
      }
    },
    computed: {
      ...mapGetters([
        'isPlaying',
        'modeType',
        'currentIndex',
        'currentSong',
        'favoriteList'
      ])
    },
    methods: {
      ...mapActions([
        'setIsPlaying',
        'setModeType',
        'setSelectSong',
        'setClickCurrentTime',
        'setFavoriteSong',
      ]),
      play() {
        this.setIsPlaying(!this.isPlaying);
      },
      // 切换到上一首
      prev() {
        this.setSelectSong(this.currentIndex - 1);
      },
      // 切换到下一首
      next() {
        this.setSelectSong(this.currentIndex + 1);
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
      },
      // 收藏歌曲
      favorite() {
        this.setFavoriteSong(this.currentSong);
      },
      // 判断当前歌曲是否被收藏
      isFavorite(song) {
        // Array.find(callback) 参数是回调函数，找到则返回第一个满足条件的值，未找到返回 undefined
        let result = this.favoriteList.find(value => {
          // 应当判断对象的 id，而不是直接判断两个对象，否则刷新网页将会报错
          return value.id === song.id;
        });
        return result !== undefined;
      },
      // 格式化歌曲时长
      formatSongTime(time) {
        let songDuration = time;
        // 小时
        let hour = Math.floor(songDuration / (60 * 60) % 24);
        hour = hour >= 10 ? hour : '0' + hour;
        // 分钟
        let minute = Math.floor(songDuration / (60) % 60);
        minute = minute >= 10 ? minute : '0' + minute;
        // 秒
        let second = Math.floor(songDuration % 60);
        second = second >= 10 ? second : '0' + second;
        return {
          hour: hour,
          minute: minute,
          second: second
        }
      },
      // 进度条点击，跳到点击位置播放
      processClick(e) {
        // 进度条距离屏幕左侧偏移量
        // let processBarOffsetLeft = e.target.offsetLeft;  // bug
        let processBarOffsetLeft = this.$refs.progressBar.offsetLeft;
        // 点击位置距离屏幕左侧偏移量
        let eventLeft = e.pageX;
        // 进度条宽度
        // let processBarWidth = e.target.offsetWidth;
        let processBarWidth = this.$refs.progressBar.offsetWidth;
        // 计算点击偏移比例
        let clickOffset = eventLeft - processBarOffsetLeft;
        let offsetRatio = clickOffset / processBarWidth;

        this.$refs.progressLine.style.width = offsetRatio * 100 + '%';

        // 计算当前应该从什么地方开始播放
        let currentTime = this.songDuration * offsetRatio;
        this.setClickCurrentTime(currentTime);
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
      songDuration(newValue, oldValue) {
        let songTime = this.formatSongTime(newValue);
        this.$refs.showSongDuration.innerHTML = songTime.minute + ':' + songTime.second;
      },
      currentTime(newValue, oldValue) {
        // 1. 当前时间
        let songTime = this.formatSongTime(newValue);
        this.$refs.showCurrentDuration.innerHTML = songTime.minute + ':' + songTime.second;
        // 2. 进度条比例: 当前时间 / 总时长
        let value = newValue / this.songDuration * 100;
        this.$refs.progressLine.style.width = value + '%';
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

        .progress-line {
          width: 0;
          height: 100%;
          background-color: #ccc;
          position: relative;

          .progress-dot {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background-color: #fff;
            position: absolute;
            left: 100%;
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