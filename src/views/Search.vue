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
          <li v-for="value in songs" :key="value.id">
            <img
              src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNiAyNiI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjYzljOWNhIiBkPSJNMjUuMTgxIDIzLjUzNWwtMS40MTQgMS40MTQtNy4zMTUtNy4zMTRBOS45NjYgOS45NjYgMCAwIDEgMTAgMjBDNC40NzcgMjAgMCAxNS41MjMgMCAxMFM0LjQ3NyAwIDEwIDBzMTAgNC40NzcgMTAgMTBjMCAyLjM0Mi0uODExIDQuNDktMi4xNiA2LjE5NWw3LjM0MSA3LjM0ek0xMCAyYTggOCAwIDEgMCAwIDE2IDggOCAwIDAgMCAwLTE2eiIvPjwvc3ZnPg=="
              alt="">
            <p>{{value.name}} —— {{value.artists[0].name}}</p>
          </li>
        </ul>
      </ScrollView>
    </div>
  </div>
</template>

<script>
  import ScrollView from "../components/ScrollView";
  import {getSearchList} from "../api/index";

  export default {
    name: "Search",
    components: {
      ScrollView
    },
    data: function () {
      return {
        keywords: '',
        songs: []
      }
    },
    methods: {
      search() {
        getSearchList({keywords: this.keywords})
          .then(data => {
            console.log(data);
            this.songs = data.result.songs;
          })
          .catch(error => console.log(error));
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
  }
</style>