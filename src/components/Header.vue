<template>
  <div class="header">
    <div class="header-left"></div>
    <p class="header-title">John's music list</p>
    <div class="header-right"></div>
  </div>
</template>

<script>
  export default {
    name: "Header"
  }
</script>

<style scoped lang="scss">
  .header {
    width: 100%;
    height: 100px;
    background-color: #f00;
    display: flex;
    justify-content: space-between;

    .header-left, .header-right {
      width: 84px;
      height: 84px;
      background-color: #000;
      margin-top: 8px;
    }
  }

  .header-title {
    text-align: center;
    line-height: 100px;
  }
</style>