<template>
  <div class="player-bottom">
    <div class="bottom-progress">
      <span>0:00</span>
      <div class="progress-bar">
        <div class="progress-line">
          <div class="progress-dot"></div>
        </div>
      </div>
      <span>0:00</span>
    </div>
    <div class="bottom-controll"></div>
  </div>
</template>

<script>
  export default {
    name: "PlayerBottom"
  }
</script>

<style scoped lang="scss">
  .player-bottom {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;

    .bottom-progress {
      width: 80%;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .progress-bar {
        width: 100%;
        margin: 0 10px;
        height: 10px;
        background-color: #fff;
        position: relative;

        .progress-line {
          width: 50%;
          height: 100%;
          background-color: #ccc;

          .progress-dot {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background-color: #fff;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translateY(-50%);
          }
        }
      }
    }
  }
</style>