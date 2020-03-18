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
        scrollbars: false,
        probeType: 3,  // 像素级触发 scroll 事件，此时滚动只关注 requestAnimationFrame
        // 解决拖拽卡顿问题
        scrollX: false,
        scrollY: true,
        disablePointer: true,
        disableTouch: false,
        disableMouse: true
      });
      /*
      setTimeout(() => {
        this.iscroll.refresh();
      }, 5000);
      */

      /*
      * MutationObserver 构造函数只要监听到了指定内容发生变化 ，就会执行传入的回调函数
      * mutations：发生变化的数组
      * observer：观察者对象
      */
      // 1. 创建一个观察者对象
      let observer=  new MutationObserver((mutations, observer) => {
        // console.log(this.iscroll.maxScrollY);
        this.iscroll.refresh();
        // console.log(this.iscroll.maxScrollY);
      });

      // 2. 告诉观察者对象我们需要观察什么内容
      let config = {
        childList: true,  // 观察目标子节点的变化，是否有添加或者删除
        subtree: true,    // 观察后代节点，默认为 false
        attributeFilter: ['height', 'offsetHeight']  // 观察特定属性
      };

      // 3. 告诉观察者对象，我们需要观察谁，需要观察什么内容
      observer.observe(this.$refs.wrapper, config);
      /*
      * 参数一：告诉观察者对象我们需要观察谁
      * 参数二：告诉观察者对象我们需要观察什么内容
      */
    },
    methods: {
      // 提供一个监听滚动距离的方法给外界
      scrolling(fn) {
        this.iscroll.on('scroll', function () {
          fn(this.y);
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  #wrapper {
    width: 100%;
    height: 100%;
  }
</style>