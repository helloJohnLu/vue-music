<template>
  <div class="search">
    <div class="search-box">
      <img
        src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNiAyNiI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjYzljOWNhIiBkPSJNMjUuMTgxIDIzLjUzNWwtMS40MTQgMS40MTQtNy4zMTUtNy4zMTRBOS45NjYgOS45NjYgMCAwIDEgMTAgMjBDNC40NzcgMjAgMCAxNS41MjMgMCAxMFM0LjQ3NyAwIDEwIDBzMTAgNC40NzcgMTAgMTBjMCAyLjM0Mi0uODExIDQuNDktMi4xNiA2LjE5NWw3LjM0MSA3LjM0ek0xMCAyYTggOCAwIDEgMCAwIDE2IDggOCAwIDAgMCAwLTE2eiIvPjwvc3ZnPg=="
        alt="">
      <input type="text" placeholder="搜索歌曲、歌手、专辑" v-model="keywords" v-throttile="search">
    </div>
    <div class="search-suggest" v-show="keywords !== ''">
      <ScrollView>
        <ul>
          <li v-for="value in songs" :key="value.id" @click="selectMusic(value.id)">
            <img
              src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNiAyNiI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjYzljOWNhIiBkPSJNMjUuMTgxIDIzLjUzNWwtMS40MTQgMS40MTQtNy4zMTUtNy4zMTRBOS45NjYgOS45NjYgMCAwIDEgMTAgMjBDNC40NzcgMjAgMCAxNS41MjMgMCAxMFM0LjQ3NyAwIDEwIDBzMTAgNC40NzcgMTAgMTBjMCAyLjM0Mi0uODExIDQuNDktMi4xNiA2LjE5NWw3LjM0MSA3LjM0ek0xMCAyYTggOCAwIDEgMCAwIDE2IDggOCAwIDAgMCAwLTE2eiIvPjwvc3ZnPg=="
              alt="">
            <p>{{value.name}} —— {{value.artists[0].name}}</p>
          </li>
        </ul>
      </ScrollView>
    </div>
    <!--热闹搜索-->
    <div class="search-hot">
      <h3>热门搜索</h3>
      <ul>
        <li v-for="value in hots" :key="value.first" @click.stop="selectedHot(value.first)">{{value.first}}</li>
      </ul>
    </div>
    <!--搜索历史-->
    <ul class="search-history">
      <li v-for="value in searchHistory" :key="value">
        <div class="history-left">
          <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMCAzMCI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjYzljYWNhIiBkPSJNMTUgMzBDNi43MTYgMzAgMCAyMy4yODQgMCAxNVM2LjcxNiAwIDE1IDBzMTUgNi43MTYgMTUgMTUtNi43MTYgMTUtMTUgMTVtMC0yOEM3LjgyIDIgMiA3LjgyIDIgMTVzNS44MiAxMyAxMyAxMyAxMy01LjgyIDEzLTEzUzIyLjE4IDIgMTUgMm03IDE2aC04YTEgMSAwIDAgMS0xLTFWN2ExIDEgMCAxIDEgMiAwdjloN2ExIDEgMCAxIDEgMCAyIi8+PC9zdmc+" alt="">
          <p>{{value}}</p>
        </div>
        <div class="history-right">
          <img @click.stop="delHistory(value)" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjOTk5ODk5IiBkPSJNMTMuMzc5IDEybDEwLjMzOCAxMC4zMzdhLjk3NS45NzUgMCAxIDEtMS4zNzggMS4zNzlMMTIuMDAxIDEzLjM3OCAxLjY2MyAyMy43MTZhLjk3NC45NzQgMCAxIDEtMS4zNzgtMS4zNzlMMTAuNjIzIDEyIC4yODUgMS42NjJBLjk3NC45NzQgMCAxIDEgMS42NjMuMjg0bDEwLjMzOCAxMC4zMzhMMjIuMzM5LjI4NGEuOTc0Ljk3NCAwIDEgMSAxLjM3OCAxLjM3OEwxMy4zNzkgMTIiLz48L3N2Zz4=" alt="">
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import ScrollView from "../components/ScrollView";
  import {getSearchList, getSearchHot} from "../api/index";
  import {mapActions} from "vuex";
  import {setlocalStorage, getlocalStorage} from "../tools/tools";

  export default {
    name: "Search",
    components: {
      ScrollView
    },
    data: function () {
      return {
        keywords: '',
        songs: [],
        hots: [],
        searchHistory: []
      }
    },
    methods: {
      ...mapActions([
        'setFullScreen',
        'setMiniPlayer',
        'setSongDetail'
      ]),
      selectMusic(id) {
        this.setFullScreen(true);
        this.setMiniPlayer(false);
        this.setSongDetail([id]);

        // 保存搜索历史
        if (this.searchHistory.includes(this.keywords)) {  // 如果这条记录已保存
          return;
        }
        // 如果没有保存
        this.searchHistory.push(this.keywords);
        // 写入本地
        setlocalStorage('searchHistory', this.searchHistory);
        this.keywords = '';  // 清空
      },
      search() {
        getSearchList({keywords: this.keywords})
          .then(data => {
            // console.log(data);
            this.songs = data.result.songs;
          })
          .catch(error => console.log(error));
      },
      // 点选了热搜
      selectedHot(value) {
        this.keywords = value;
        // 手动触发 search() 方法
        this.search();
      },
      // 删除历史记录
      delHistory(value) {
        let index = this.searchHistory.indexOf(value);
        this.searchHistory.splice(index, 1);
        setlocalStorage('searchHistory', this.searchHistory);
        console.log(this.searchHistory);
      }
    },
    directives: {
      throttile: {
        // 指令定义（节流方式获取 input 值）
        inserted: function (el, obj) {
          let previous = 0;
          let timeout;
          el.addEventListener('input', (...args) => {
            if (!timeout) {
              timeout = setTimeout(() => {
                timeout = null;
                obj.value();
              }, 1000);
            }
          });
        }
      }
    },
    created() {
      // 热搜数据
      getSearchHot()
        .then(data => {
          // console.log(data);
          this.hots = data.result.hots;
        })
        .catch(error => console.log(error));

      // 搜索历史
      // 如果本地没有
      if (getlocalStorage('searchHistory') === undefined || getlocalStorage('searchHistory') === null) {
        return;
      }
      // 如果本地储存有搜索历史数据
      this.searchHistory = getlocalStorage('searchHistory');
    }
  }
</script>

<style scoped lang="scss">
  @import "../assets/css/variable";
  @import "../assets/css/mixin";

  .search {
    position: fixed;
    left: 0;
    right: 0;
    top: 184px;
    bottom: 0;
    @include bg_sub_color();

    .search-box {
      display: flex;
      align-items: center;
      margin: 40px 20px;
      background-color: #ececec;
      border-radius: 30px;
      border-bottom: 1px solid #ccc;

      img {
        width: 40px;
        height: 40px;
        margin-left: 20px;
      }

      input {
        border: none;
        outline: none;
        background: transparent;
        @include font_size($font_medium);
        height: 60px;
        line-height: 60px;
        margin-left: 20px;
      }
    }

    .search-suggest {
      position: fixed;
      left: 0;
      right: 0;
      top: 300px;
      bottom: 0;
      overflow: hidden;
      @include bg_sub_color();

      li {
        display: flex;
        align-items: center;
        padding: 20px;
        box-sizing: border-box;
        border-bottom: 1px solid #ccc;

        img {
          width: 40px;
          height: 40px;
        }

        p {
          margin-left: 20px;
          @include font_size($font_medium);
          @include font_color();
        }
      }
    }

    .search-hot {
      h3 {
        @include font_size($font_large);
        @include font_color();
        padding: 10px 20px;
      }

      ul {
        display: flex;
        flex-wrap: wrap;

        li {
          height: 60px;
          line-height: 60px;
          border: 1px solid #000;
          border-radius: 30px;
          padding: 0 20px;
          margin: 10px 20px;
          @include font_color();
          @include font_size($font_medium_s);
        }
      }
    }

    .search-history {
      margin-top: 20px;

      li {
        display: flex;
        justify-content: space-between;
        padding: 20px 20px;
        box-sizing: border-box;
        border-bottom: 1px solid #ccc;

        .history-left {
          display: flex;
          align-items: center;

          img {
            width: 40px;
            height: 40px;
          }

          p {
            @include font_color();
            @include font_size($font_medium_s);
            margin-left: 20px;
          }
        }

        .history-right {
          img {
            width: 30px;
            height: 30px;
          }
        }
      }
    }
  }
</style>