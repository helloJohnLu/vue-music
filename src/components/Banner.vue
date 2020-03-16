<template>
  <swiper :options="swiperOption" class="banner">
    <!-- slides -->
    <swiper-slide v-for="value in banners" :key="value.bannerId" class="item">
      <a :href="value.url">
        <img :src="value.pic" alt="">
      </a>
    </swiper-slide>
    <!-- Optional controls -->
    <div class="swiper-pagination"  slot="pagination"></div>
  </swiper>
</template>

<script>
  import 'swiper/dist/css/swiper.css'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'

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
      banners: Array,
      default: () => [],
      required: true
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