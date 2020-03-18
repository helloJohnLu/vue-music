<template>
  <div class="detail-top">
    <div class="img-container">
      <img v-lazy="imgPath" alt="">
      <div class="mask" ref="mask"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "DetailTop",
    props: {
      imgPath: {
        type: String,
        default: '',
        required: ''
      }
    },
    methods: {
      changeMask(opacity) {
        this.$refs.mask.style.opacity = opacity;
      }
    }
  }
</script>

<style scoped lang="scss">
  .detail-top {
    width: 100%;
    height: 500px;
    overflow: hidden;
    position: relative;

    img {
      width: 100%;
    }

    .mask {
      position: absolute;
      left: 0;
      top: 0;
      background-color: #000;
      opacity: 0;
      width: 100%;
      height: 100%;
    }
  }
</style>