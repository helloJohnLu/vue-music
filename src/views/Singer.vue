<template>
  <div class="singer">
    <div class="singer-wrapper">
      <ScrollView ref="scrollView">
        <ul class="list-wrapper">
          <li class="list-group" v-for="(value, index) in keys" :key="index" ref="group">
            <h2 class="group-title">{{value}}</h2>
            <ul>
              <li
                class="group-item"
                v-for="(v, k) in list[index]"
                :key="v.id + k + Math.random() * 10000"
                @click.stop="goToSinger(v.id)"
              >
                <img v-lazy="v.picUrl" alt="">
                <p>{{v.name}}</p>
              </li>
            </ul>
          </li>
        </ul>
        <div class="fix-title" v-show="fixTitle && flag" ref="elFixTitle">{{fixTitle}}</div>
      </ScrollView>
      <!--快捷导航-->
      <ul class="list-keys">
        <!--
        <li
          v-for="(key, index) in keys"
          :key="key"
          @click.stop="letterNavClicked(index)"
          :class="{'active': currentIndex === index}"
        >{{key}}</li>
        -->

        <li
          v-for="(key, index) in keys"
          :key="key"
          :data-index="index"
          @touchstart.stop.prevent="touchstart"
          @touchmove.stop.prevent="touchmove"
          :class="{'active': currentIndex === index}"
        >{{key}}
        </li>
      </ul>
    </div>
    <transition>
      <router-view></router-view>
    </transition>
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
        currentIndex: 0,
        beginOffsetY: 0,
        moveOffsetY: 0,
        flag: true
      }
    },
    computed: {
      fixTitle() {
        return this.keys[this.currentIndex];
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
          // console.log(this.groupsItemTop);
        });
      },
      fixTitle() {
        // 渲染完毕后再获取高度
        this.$nextTick(() => {
          this.fixTitleHeight = this.$refs.elFixTitle.offsetHeight;
        });
      },
      /*// 切换页面隐藏加载框，防止数据没有加载完成时加载框一直显示
      $route(to, from) {
        if (to) {
          this.$hiddenLoading();
        }
      }*/
    },
    methods: {
      letterNavClicked(index) {
        this.currentIndex = index;
        let offsetY = this.groupsItemTop[index];
        this.$refs.scrollView.scrollTo(0, -offsetY);
      },
      touchstart(e) {
        // console.log(e.target.dataset.index);
        let index = parseInt(e.target.dataset.index);
        this.letterNavClicked(index);

        this.beginOffsetY = e.touches[0].pageY;
      },
      // 滑动导航滚动界面
      touchmove(e) {
        this.moveOffsetY = e.touches[0].pageY;
        let offsetY = (this.moveOffsetY - this.beginOffsetY) / e.target.offsetHeight;  // 除以每个元素的高度
        // console.log(offsetY);
        let index = parseInt(e.target.dataset.index) + Math.floor(offsetY);
        if (index < 0) {
          index = 0;
        } else if (index > this.keys.length - 1) {
          index = this.keys.length - 1;
        }
        // 滚动
        this.letterNavClicked(index);
      },
      // 点击歌手跳转到歌手详情界面
      goToSinger(id) {
        this.$router.push(`/singer/detail/${id}/singer`);
      }
    },
    mounted() {
      // 监听滚动
      let timer = setTimeout(this.$refs.scrollView.scrolling(y => {
        clearTimeout(timer);

        // 处理第一个 item ：向下滚动，始终是第一组
        if (y >= 0) {
          this.currentIndex = 0;
          this.flag = false;
          return;
        } else {
          this.flag = true;
        }

        // 中间区域
        for (let i = 0; i < this.groupsItemTop.length - 1; i++) {
          let preTop = this.groupsItemTop[i];
          let nextTop = this.groupsItemTop[i + 1];

          // 如果滚上去的距离处于两个元素距离之间
          if (-y >= preTop && -y <= nextTop) {
            this.currentIndex = i;

            // 下一组标题的偏移量 + 当前滚动出去的偏移量
            let diffOffsetY = nextTop + y;
            let fixTitleOffsetY = 0;  // 标题需要移动的偏移量
            // 判断计算的结果是否是 0 ~ 分组标题高度的值
            if (diffOffsetY <= this.fixTitleHeight && diffOffsetY >= 0) {
              fixTitleOffsetY = diffOffsetY - this.fixTitleHeight;
              // console.log(fixTitleOffsetY);
            } else {
              fixTitleOffsetY = 0;
            }
            // console.log(this.fixTitleOffsetY);
            if (fixTitleOffsetY === this.fixTitleOffsetY) {
              return ;
            }
            this.fixTitleOffsetY = fixTitleOffsetY;
            this.$refs.elFixTitle.style.transform = `translateY(${fixTitleOffsetY}px)`;
            return;
          }
        }

        // 最后一个 item
        return this.currentIndex = this.groupsItemTop.length - 1;
      }), 100);
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
    width: 100%;
    height: 100%;

    .singer-wrapper{
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
            padding: 0 20px;
            box-sizing: border-box;
            text-align: center;
            height: 60px;
            line-height: 60px;
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

      .fix-title {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        @include bg_color();
        @include font_size($font_medium);
        color: #fff;
        padding: 0 20px;
        box-sizing: border-box;
        text-align: center;
        height: 60px;
        line-height: 60px;
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