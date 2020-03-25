<template>
  <transition appear>
    <div class="account">

    </div>
  </transition>
</template>

<script>
  export default {
    name: "Account"
  }
</script>

<style scoped lang="scss">
  .account {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: #f00;
  }

  .v-enter, .v-leave-to {
    transform: translateX(100%);
  }
  .v-enter-to, .v-leave {
    transform: translateX(0%);
  }
  .v-enter-active, .v-leave-active {
    transition: transform 1s;
  }
</style>