<template>
  <div class="search">
    <div class="search-box">
      <img
        src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNiAyNiI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjYzljOWNhIiBkPSJNMjUuMTgxIDIzLjUzNWwtMS40MTQgMS40MTQtNy4zMTUtNy4zMTRBOS45NjYgOS45NjYgMCAwIDEgMTAgMjBDNC40NzcgMjAgMCAxNS41MjMgMCAxMFM0LjQ3NyAwIDEwIDBzMTAgNC40NzcgMTAgMTBjMCAyLjM0Mi0uODExIDQuNDktMi4xNiA2LjE5NWw3LjM0MSA3LjM0ek0xMCAyYTggOCAwIDEgMCAwIDE2IDggOCAwIDAgMCAwLTE2eiIvPjwvc3ZnPg=="
        alt="">
      <input type="text" placeholder="搜索歌曲、歌手、专辑">
    </div>
  </div>
</template>

<script>
  export default {
    name: "Search"
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
  }
</style>