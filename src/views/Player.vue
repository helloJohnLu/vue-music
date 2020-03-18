<template>
  <div class="player">
    <PlayHeader></PlayHeader>
  </div>
</template>

<script>
  import PlayHeader from "../components/PlayHeader";

  export default {
    name: "Play",
    components: {
      PlayHeader
    }
  }
</script>

<style scoped lang="scss">
  .player {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: pink;
  }
</style>