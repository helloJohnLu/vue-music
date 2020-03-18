<template>
  <swiper :options="swiperOption" class="banner">
    <!-- slides -->
    <swiper-slide class="cd">
      <div class="cd-wrapper">
        <img src="" alt="">
      </div>
      <p>歌曲名歌曲名歌曲名歌曲名</p>
    </swiper-slide>
    <swiper-slide class="lyric">

    </swiper-slide>
    <!-- Optional controls -->
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
  import 'swiper/dist/css/swiper.css'
  import {swiper, swiperSlide} from 'vue-awesome-swiper'

  export default {
    name: "PlayerMiddle",
    components: {
      swiper,
      swiperSlide
    },
    data() {
      return {
        swiperOption: {
          // 如果需要分页器
          pagination: {
            el: '.swiper-pagination',
          },
          // 异步加载
          observer: true,
          observeParents: true,
          observeSlideChildren: true
        }
      }
    },
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
    background-color: lightblue;

    .cd {
      .cd-wrapper {
        display: block;
        margin: 0 auto;
        width: 500px;
        height: 500px;
        border-radius: 50%;
        border: 10px solid #fff;
        overflow: hidden;

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
  }
</style>