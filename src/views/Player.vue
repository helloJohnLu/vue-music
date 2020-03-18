<template>
  <div class="player">
    <PlayHeader></PlayHeader>
    <PlayerMiddle></PlayerMiddle>
    <PlayerBottom></PlayerBottom>
  </div>
</template>

<script>
  import PlayHeader from "../components/Player/PlayHeader";
  import PlayerMiddle from "../components/Player/PlayerMiddle";
  import PlayerBottom from "../components/Player/PlayerBottom";

  export default {
    name: "Play",
    components: {
      PlayHeader,
      PlayerMiddle,
      PlayerBottom
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