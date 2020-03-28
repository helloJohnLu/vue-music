<template>
  <div class="rank">
    <ScrollView>
      <ul>
        <li v-for="(value, key) in category.titles" :key="key">
          <h3 class="group-title">{{value}}</h3>
        </li>
      </ul>
    </ScrollView>
  </div>
</template>

<script>
  import {getTopListDetail} from "../api/index";
  import ScrollView from "../components/ScrollView";

  export default {
    name: "Rank",
    components: {
      ScrollView
    },
    data: function () {
      return {
        category: {}
      }
    },
    created() {
      getTopListDetail()
        .then(data => {
          console.log(data);
          this.category = data;
        })
        .catch(error => console.log(error));
    }
  }
</script>

<style scoped lang="scss">
  @import "../assets/css/variable";
  @import "../assets/css/mixin";

  .rank {
    position: fixed;
    left: 0;
    right: 0;
    top: 184px;
    bottom: 0;
    @include bg_sub_color();

    .group-title {
      padding: 10px 20px;
      @include font_color();
      @include font_size($font_large);
      font-weight: bold;
    }
  }
</style>