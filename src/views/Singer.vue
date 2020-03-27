<template>
  <div class="singer">
    <ScrollView ref="scrollView">
      <ul class="list-wrapper">
        <li class="list-group" v-for="(value, index) in keys" :key="index" ref="group">
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
      <li
        v-for="(key, index) in keys"
        :key="key"
        @click.stop="letterNavClicked(index)"
        :class="{'active': currentIndex === index}"
      >{{key}}</li>
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
        list: [],
        groupsItemTop: [],  // 每一组数据距离顶部的距离
        currentIndex: 0
      }
    },
    watch: {
      list() {
        // console.log(this.$refs.group);  // 拿不到数据，因为数据即使发生变化但没有渲染完
        /*
        * 注意点：watch 只能监听数据变化，数据变化的时候并不意味着已经渲染完毕
        *       在保证在数据渲染完毕后再获取数据，需要使用 vm.$nextTick([callback]) 方法
        * vm.$nextTick([callback])：将回调延迟到下次 DOM 更新循环之后执行。在修改数据之后立即使用它，然后等待 DOM 更新。
        */
        this.$nextTick(() => {
          this.$refs.group.forEach(item => {
            this.groupsItemTop.push(item.offsetTop);
          });
          console.log(this.groupsItemTop);
        });

      }
    },
    methods: {
      letterNavClicked(index) {
        this.currentIndex = index;
        let offsetY = this.groupsItemTop[index];
        this.$refs.scrollView.scrollTo(0, -offsetY);
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
      top: 56%;
      transform: translateY(-50%);

      li {
        @include font_size($font_medium_s);
        @include font_color();
        padding: 3px 0;

        &.active {
          text-shadow: 0 0 10px #000;
        }
      }
    }
  }
</style>