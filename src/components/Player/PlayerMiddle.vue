<template>
  <swiper :options="swiperOption" class="banner">
    <!-- slides -->
    <swiper-slide class="cd">
      <div class="cd-wrapper" ref="cdWrapper">
        <img :src="currentSong.picUrl" alt="">
      </div>
      <p>{{getFirstLyric()}}</p>
    </swiper-slide>
    <swiper-slide class="lyric">
      <ScrollView>
        <ul>
          <li v-for="(value, index) in currentLyric" :key="index">{{value}}</li>
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
            bulletClass : 'my-bullet', // 分页器小圆点类名
            bulletActiveClass: 'my-bullet-active', // 激活的小圆点类名
          },
          // 异步加载
          observer: true,
          observeParents: true,
          observeSlideChildren: true
        },
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
      }
    },
    methods: {
      // 获取第一句歌词
      getFirstLyric() {
        /*for (let key in this.currentLyric) {
          return this.currentLyric[key];
        }*/
        return this.currentLyric[0];
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
        &.active{
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
          padding-bottom: 100px;
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
    border-radius:10px;
    background-color: #fff;
    margin: 0 20px;
  }
  .my-bullet-active {
    @include bg_color();
    width: 60px;
  }
</style>