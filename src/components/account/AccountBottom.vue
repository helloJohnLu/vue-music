<template>
  <div class="account-bottom">
    <div class="bottom-play">
      <span></span>
      <span @click="selectAllMusic">播放全部</span>
    </div>
    <div class="bottom-wrapper">
      <ScrollView>
        <SongListItem :songs="switchNum === 0 ? favoriteList : historyList"></SongListItem>
      </ScrollView>
    </div>
  </div>
</template>

<script>
  import ScrollView from "../ScrollView";
  import SongListItem from "../SongListItem";
  import {mapGetters, mapActions} from "vuex";

  export default {
    name: "AccountBottom",
    props: {
      switchNum: {
        type: Number,
        default: 0,
        required: true
      }
    },
    components: {
      ScrollView,
      SongListItem
    },
    computed: {
      ...mapGetters([
        'favoriteList',
        'historyList'
      ])
    },
    methods: {
      ...mapActions([
        'setFullScreen',
        'setSongDetail',
        'setSelectSong'
      ]),
      // 全部播放
      selectAllMusic() {
        this.setFullScreen(true);
        // 重置 currentIndex 为 0
        this.setSelectSong(0);

        let ids = [];
        // 判断当前列表是处于哪个选项卡
        if (this.switchNum === 0) {
          ids = this.favoriteList.map(item => item.id);
        } else {
          ids = this.historyList.map(item => item.id);
        }
        this.setSongDetail(ids);
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../assets/css/variable";
  @import "../../assets/css/mixin";

  .account-bottom {
    position: fixed;
    top: 100px;
    bottom: 0;
    left: 0;
    right: 0;
    /*background-color: skyblue;*/

    .bottom-play {
      width: 260px;
      height: 60px;
      margin: 20px auto;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid #000;
      @include border_color();
      border-radius: 30px;

      span {
        display: inline-block;

        &:nth-of-type(1) {
          width: 46px;
          height: 46px;
          @include bg_img('../../assets/images/small_play');
          margin-right: 20px;
        }
      }
    }

    .bottom-wrapper {
      position: fixed;
      top: 200px;
      bottom: 0;
      left: 0;
      right: 0;
      /*background-color: pink;*/
      overflow: hidden;
    }
  }
</style>