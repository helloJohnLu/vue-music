<template>
  <div id="app">
    <Header></Header>
    <div class="theme">
      <button @click="switchColor('red')">网易红</button>
      <button @click="switchColor('green')">QQ 绿</button>
      <button @click="switchColor('night')">夜间</button>
    </div>
  </div>
</template>

<script>
  import Header from "./components/Header";

  export default {
    name: 'App',
    components: {
      Header
    },
    methods: {
      switchColor(data) {
        document.documentElement.setAttribute('data-theme', data);
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "assets/css/variable.scss";

  .theme {
    position: fixed;
    left: 0;
    bottom: 0;

    button {
      width: 100px;
      height: 100px;

      &:nth-of-type(1) {
        background-color: $background-color-theme;
      }

      &:nth-of-type(2) {
        background-color: $background-color-theme1;
      }

      &:nth-of-type(3) {
        background-color: $background-color-theme2;
      }
    }
  }
</style>
