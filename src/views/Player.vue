<template>
  <div class="player">
    <PlayHeader></PlayHeader>
    <PlayerMiddle></PlayerMiddle>
  </div>
</template>

<script>
  import PlayHeader from "../components/Player/PlayHeader";
  import PlayerMiddle from "../components/Player/PlayerMiddle";

  export default {
    name: "Play",
    components: {
      PlayHeader,
      PlayerMiddle
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