<template>
  <swiper :options="swiperOption" class="banner">
    <!-- slides -->
    <swiper-slide class="cd">
      <div class="cd-wrapper" ref="cdWrapper">
        <img :src="currentSong.picUrl" alt="">
      </div>
      <p>{{getFirstLyric()}}</p>
    </swiper-slide>
    <swiper-slide class="lyric" ref="lyric">
      <ScrollView ref="scrollView">
        <ul>
          <li
            v-for="(value, key) in currentLyric"
            :key="key"
            :class="{'active': currentLineTime === key}"
          >{{value}}
          </li>
        </ul>
      </ScrollView>
    </swiper-slide>
    <!-- Optional controls -->
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
  import 'swiper/dist/css/swiper.css'
  import {swiper, swiperSlide} from 'vue-awesome-swiper'
  import ScrollView from "../ScrollView";
  import {mapGetters} from "vuex";

  export default {
    name: "PlayerMiddle",
    props: {
      currentTime: {
        type: Number,
        default: 0,
        required: true
      }
    },
    components: {
      swiper,
      swiperSlide,
      ScrollView
    },
    data() {
      return {
        swiperOption: {
          // 如果需要分页器
          pagination: {
            el: '.swiper-pagination',
            bulletClass: 'my-bullet', // 分页器小圆点类名
            bulletActiveClass: 'my-bullet-active', // 激活的小圆点类名
          },
          // 异步加载
          observer: true,
          observeParents: true,
          observeSlideChildren: true
        },
        currentLineTime: '0'
      }
    },
    computed: {
      ...mapGetters(['isPlaying', 'currentSong', 'currentLyric'])
    },
    watch: {
      isPlaying(newValue, oldValue) {
        if (newValue) {
          this.$refs.cdWrapper.classList.add('active');
        } else {
          this.$refs.cdWrapper.classList.remove('active');
        }
      },
      currentTime(newValue, oldValue) {
        /*
        // 1、高亮歌词的同步
        let playingTimeInt = Math.floor(newValue) + '';  // 当前播放时间取整
        let result = this.currentLyric[playingTimeInt];  // 判断歌词中当前时间有没有值
        // 如果当前时间没有值，则不改变当前播放时间。有值时才改变歌词高亮
        if (result !== undefined && result !== '') {
          this.currentLineTime = playingTimeInt;
          // 2、歌词滚动同步
          // 当前歌词行距离歌歌界面顶部距离
          let currentLyricTop = document.querySelector('li.active').offsetTop;
          // 歌词界面高度 （this.$refs.lyric 不是 HTML 原生元素，无法获取高度，这里必须加上 $el）
          let lyricHeight = this.$refs.lyric.$el.offsetHeight;
          // 判断当前高亮行距离顶部的距离是否超过歌词界面一半
          if (currentLyricTop > lyricHeight / 2) {
            this.$refs.scrollView.scrollTo(0, lyricHeight / 2 - currentLyricTop, 100);
          }
        }
        */

        // 1、歌词高亮同步
        let playingTimeInt = Math.floor(newValue) + '';  // 当前播放时间取整
        this.currentLineTime = this.getCurrentLyric(playingTimeInt);
        // 2、歌词滚动同步
        // 当前歌词行距离歌歌界面顶部距离
        let currentLyricTop = document.querySelector('li.active').offsetTop;
        // 歌词界面高度 （this.$refs.lyric 不是 HTML 原生元素，无法获取高度，这里必须加上 $el）
        let lyricHeight = this.$refs.lyric.$el.offsetHeight;
        // 判断当前高亮行距离顶部的距离是否超过歌词界面一半
        if (currentLyricTop > lyricHeight / 2) {
          this.$refs.scrollView.scrollTo(0, lyricHeight / 2 - currentLyricTop, 100);
        } else {
          this.$refs.scrollView.scrollTo(0, 0, 100);
        }
      },
      // 监听歌词变化，解决第 0 秒歌词切换时产生的 bug: getCurrentLyric() 陷入无限循环
      currentLyric(newValue, oldValue) {
        for (let key in newValue) {
          this.currentLineTime = key;
          return;
        }
      }
    },
    methods: {
      // 获取第一句歌词
      getFirstLyric() {
        /*for (let key in this.currentLyric) {
          return this.currentLyric[key];
        }*/
        return this.currentLyric[0];
      },
      // 获取当前歌词
      getCurrentLyric(playingTimeInt) {
        if (playingTimeInt < 0) {
          return this.currentLineTime;
        }
        let result = this.currentLyric[playingTimeInt + ''];
        // 如果获取不到，则获取上一行歌词
        if (result === undefined || result === '') {
          playingTimeInt--;
          return this.getCurrentLyric(playingTimeInt);
        } else {
          return playingTimeInt + '';
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../assets/css/variable";
  @import "../../assets/css/mixin";

  .banner {
    position: fixed;
    top: 150px;
    bottom: 250px;
    left: 0;
    right: 0;
    /*background-color: lightblue;*/

    .cd {
      .cd-wrapper {
        display: block;
        margin: 0 auto;
        width: 500px;
        height: 500px;
        border-radius: 50%;
        border: 10px solid #fff;
        overflow: hidden;
        animation: sport 10s linear infinite;
        animation-play-state: paused;

        &.active {
          animation-play-state: running;
        }

        img {
          width: 100%;
          height: 100%;
        }
      }

      p {
        text-align: center;
        @include font_color();
        @include font_size($font_medium);
      }
    }

    .lyric {
      li {
        text-align: center;
        @include font_size($font_medium_s);
        @include font_color();
        margin: 10px 0;

        &:last-of-type {
          padding-bottom: 60%;
        }

        &.active {
          color: #fff;
        }
      }
    }
  }

  @keyframes sport {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
<style lang="scss">
  @import "../../assets/css/mixin";

  .my-bullet {
    display: inline-block;
    width: 20px;
    height: 20px;
    border-radius: 10px;
    background-color: #fff;
    margin: 0 20px;
  }

  .my-bullet-active {
    @include bg_color();
    width: 60px;
  }
</style>