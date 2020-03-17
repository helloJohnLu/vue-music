<template>
  <div id="wrapper" ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
  import IScroll from "iscroll/build/iscroll-probe";

  export default {
    name: "ScrollView",
    mounted() {
      this.iscroll = new IScroll(this.$refs.wrapper, {
        mouseWheel: true,
        scrollbars: true,
        // 解决拖拽卡顿问题
        scrollX: false,
        scrollY: true,
        disablePointer: true,
        disableTouch: false,
        disableMouse: true
      });
      setTimeout(() => {
        this.iscroll.refresh();
      }, 5000);
    }
  }
</script>

<style scoped lang="scss">
  #wrapper {
    width: 100%;
    height: 100%;
  }
</style>