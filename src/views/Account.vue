<template>
  <transition appear>
    <div class="account">
      <AccountHeader></AccountHeader>
    </div>
  </transition>
</template>

<script>
  import AccountHeader from "../components/account/AccountHeader";



  export default {
    name: "Account",
    components: {
      AccountHeader,
    }
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