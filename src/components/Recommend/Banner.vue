<template>
  <!-- swiper 的 bug，如果数据是从网络获取的，自动轮播到最后一页之后就不轮播了 -->
  <!-- 只需要在 swiper 组件上加上 v-if="banners.length > 0" 即可此 bug -->
  <swiper :options="swiperOption" class="banner" v-if="banners.length > 0">
    <!-- slides -->
    <swiper-slide v-for="value in banners" :key="value.bannerId" class="item">
      <a :href="value.url">
        <img :src="value.pic" alt="">
      </a>
    </swiper-slide>
    <!-- Optional controls -->
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
  import 'swiper/dist/css/swiper.css'
  import {swiper, swiperSlide} from 'vue-awesome-swiper'

  export default {
    name: "Banner",
    components: {
      swiper,
      swiperSlide
    },
    data() {
      return {
        swiperOption: {
          loop: true, // 循环模式选项
          autoplay: {
            delay: 3000,  // 自动切换的时间间隔，单位 ms
            stopOnLastSlide: false,  // 当切换到最后一个 slide 时停止自动切换
            disableOnInteraction: false  // 用户操作 swiper 后，是否禁止 autoplay
          },
          // 如果需要分页器
          pagination: {
            el: '.swiper-pagination'
          },
          // 异步加载
          observer: true,
          observeParents: true,
          observeSlideChildren: true
        }
      }
    },
    props: {
      banners: {
        type: Array,
        default: () => [],
        required: true
      }
    }
  }
</script>

<style scoped lang="scss">
  .banner {
    .item {
      width: 100%;
      height: 300px;
    }
  }
</style>
<style lang="scss">
  @import "../../assets/css/mixin";

  /* 注意：如果想覆盖 swiper 样式，那么 style 标签不能是 scoped 的，不则无法覆盖 */
  .banner {
    .swiper-pagination-bullet {
      width: 16px;
      height: 16px;
      background-color: #fff;
      opacity: 1;
    }

    .swiper-pagination-bullet-active {
      @include bg_color();
    }
  }
</style>