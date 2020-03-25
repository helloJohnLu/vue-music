<template>
  <transition appear>
    <div class="account">
      <AccountHeader @switchTab="switchTab"></AccountHeader>
      <AccountBottom :switchNum="switchNum"></AccountBottom>
    </div>
  </transition>
</template>

<script>
  import AccountHeader from "../components/account/AccountHeader";
  import AccountBottom from "../components/account/AccountBottom";

  export default {
    name: "Account",
    components: {
      AccountHeader,
      AccountBottom
    },
    data: function () {
      return {
        switchNum: 0
      };
    },
    methods: {
      switchTab(num) {
        this.switchNum = num;
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../assets/css/variable";
  @import "../assets/css/mixin";

  .account {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    /*background-color: #f00;*/
    @include bg_sub_color();
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