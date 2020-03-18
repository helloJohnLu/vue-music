<template>
  <div class="detail-top">
    <div class="img-container">
      <img v-lazy="imgPath" alt="">
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
    }
  }
</script>

<style scoped lang="scss">
  .detail-top {
    width: 100%;
    height: 500px;
    overflow: hidden;

    img {
      width: 100%;
    }
  }
</style>