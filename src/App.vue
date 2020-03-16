<template>
  <div id="app">
    <Header></Header>
    <TabBar></TabBar>
    <router-view></router-view>
  </div>
</template>

<script>
  import Header from "./components/Header";
  import TabBar from "./components/TabBar";

  export default {
    name: 'App',
    components: {
      Header,
      TabBar
    }
  }
</script>

<style scoped lang="scss">

</style>
