<template>
  <div class="singer">
    <ScrollView>
      <ul class="list-wrapper">
        <li class="list-group" v-for="(value, index) in keys" :key="index">
          <h2 class="group-title">{{value}}</h2>
          <ul>
            <li class="group-item" v-for="(v, k) in list[index]" :key="v.id + k + Math.random() * 10000">
              <img v-lazy="v.picUrl" alt="">
              <p>{{v.name}}</p>
            </li>
          </ul>
        </li>
      </ul>
    </ScrollView>
    <!--快捷导航-->
    <ul class="list-keys">
      <li v-for="key in keys" :key="key">{{key}}</li>
    </ul>
  </div>
</template>

<script>
  // import {getHotArtists} from "../api/index";
  // import {getArtistsByLetter} from "../api/index";
  import {getAllArtists} from "../api/index";
  import ScrollView from "../components/ScrollView";

  export default {
    name: "Singer",
    created() {
      getAllArtists()
        .then(response => {
          // console.log(response);
          this.keys = response.keys;
          this.list = response.list
        })
        .catch(error => console.log(error));
    },
    data: function () {
      return {
        keys: [],
        list: []
      }
    },
    components: {
      ScrollView
    }
  }
</script>

<style scoped lang="scss">
  @import "../assets/css/variable";
  @import "../assets/css/mixin";

  .singer {
    position: fixed;
    overflow: hidden;
    top: 184px;
    bottom: 0;
    left: 0;
    right: 0;
    @include bg_sub_color();

    .list-wrapper {
      /* 注释这两行解决滚动 Bug */
      /*width: 100%;
      height: 100%;*/

      .list-group {
        .group-title {
          @include bg_color();
          @include font_size($font_medium);
          color: #fff;
          padding: 10px 20px;
          box-sizing: border-box;
          text-align: center;
        }

        .group-item {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          padding: 10px 20px;
          border-bottom: 1px solid #ccc;

          img {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            overflow: hidden;
          }

          p {
            @include font_size($font_medium);
            @include font_color();
            margin-left: 20px;
          }
        }
      }
    }

    .list-keys {
      position: fixed;
      right: 20px;
      top: 60%;
      transform: translateY(-50%);

      li {
        @include font_size($font_medium_s);
        @include font_color();
        padding: 3px 0;
      }
    }
  }
</style>