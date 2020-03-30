<template>
  <Header class="header">
    <div slot="left" class="header-left" @click.stop="goBack"></div>
    <ul slot="center" class="header-title">
      <li :class="{'active': switchNum === 0}" @click.stop="switchHeaderTab(0)">我喜欢的</li>
      <li :class="{'active': switchNum === 1}" @click.stop="switchHeaderTab(1)">最近听的</li>
    </ul>
    <div slot="right" class="header-right"></div>
  </Header>
</template>

<script>
  import Header from "../Header";


  export default {
    name: "AccountHeader",
    /*props: {
      title: {
        type: String,
        default: '',
        required: true
      }
    },*/
    components: {
      Header
    },
    data() {
      return {
        switchNum: 0
      }
    },
    methods: {
      goBack() {
        window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/');
      },
      switchHeaderTab(num) {
        this.switchNum = num;
        this.$emit('switchTab', num);
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../assets/css/variable";
  @import "../../assets/css/mixin";

  .header {
    .header-left {
      @include bg_img("../../assets/images/back");
    }

    .header-right {
      @include bg_img("../../assets/images/more")
    }
  }

  .header-title {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-weight: bold;
    border: 1px solid #fff;
    border-radius: 10px;
    @include font_size($font_medium);
    @include no-wrap();
    height: 60px;
    margin-top: 20px;

    li {
      height: 60px;
      line-height: 60px;
      padding: 0 20px;

      &:nth-of-type(1) {
        border-right: 1px solid #fff;
      }

      &.active {
        background-color: rgba(255, 255, 255, .3);
      }
    }
  }
</style>