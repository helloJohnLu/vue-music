<template>
  <div class="rank">
    <div class="rank-wrapper">
      <ScrollView>
        <ul>
          <li v-for="(value, key) in category.titles" :key="key">
            <h3 class="group-title">{{value}}</h3>
            <!-- 第一组数据（布局不一样） -->
            <ul class="normal-group" v-if="value === '官方榜'">
              <li v-for="obj in category[key]" :key="obj.rank.id" @click.stop="selectedItem(obj.id)">
                <div class="rank-left">
                  <img v-lazy="obj.rank.coverImgUrl" alt="">
                  <p>{{obj.rank.updateFrequency}}</p>
                </div>
                <div class="rank-right">
                  <p v-for="(song, index) in obj.rank.tracks" :key="song.first">
                    {{index}}. {{song.first}} - {{song.second}}
                  </p>
                </div>
              </li>
            </ul>
            <ul class="other-group" v-else>  <!-- 其它组数据 -->
              <li v-for="obj in category[key]" :key="obj.rank.id" @click.stop="selectedItem(obj.id)">
                <div class="rank-top">
                  <img v-lazy="obj.rank.coverImgUrl" alt="">
                  <p>{{obj.rank.updateFrequency}}</p>
                </div>
                <div class="rank-bottom">
                  <p>{{obj.rank.name}}</p>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </ScrollView>
    </div>
    <transition>
      <router-view></router-view>
    </transition>
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
    methods: {
      selectedItem(id) {
        this.$router.push(`/rank/detail/${id}/rank`);
      }
    },
    created() {
      getTopListDetail()
        .then(data => {
          // console.log(data);
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
    width: 100%;
    height: 100%;
    
    .rank-wrapper {
      position: fixed;
      left: 0;
      right: 0;
      top: 184px;
      bottom: 0;
      @include bg_sub_color();
      overflow: hidden;

      .group-title {
        padding: 10px 20px;
        @include font_color();
        @include font_size($font_large);
        font-weight: bold;
      }

      .normal-group {
        li {
          display: flex;
          align-items: center;
          padding: 10px 20px;
          box-sizing: border-box;

          .rank-left {
            position: relative;

            img {
              width: 200px;
              height: 200px;
              border-radius: 10px;
            }

            p {
              position: absolute;
              left: 10px;
              bottom: 10px;
              color: #fff;
              @include font_size($font_medium_s);
            }
          }

          .rank-right {
            margin-left: 20px;

            p {
              @include font_color();
              @include font_size($font_medium);
              padding: 12px 0;
            }
          }
        }
      }

      .other-group {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;

        li {
          padding: 10px 20px;
          box-sizing: border-box;

          .rank-top {
            position: relative;

            img {
              width: 200px;
              height: 200px;
              border-radius: 10px;
            }

            p {
              position: absolute;
              left: 10px;
              bottom: 10px;
              color: #fff;
              @include font_size($font_medium_s);
            }
          }

          .rank-bottom {
            width: 200px;
            @include no-wrap();

            p {
              @include font_color();
              @include font_size($font_medium);
              padding: 10px 0;
            }
          }
        }
      }
    }
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