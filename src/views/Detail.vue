<template>
  <div class="detail">
    <SubHeader :title="playlist.name"></SubHeader>
    <DetailTop :img-path="playlist.coverImgUrl" ref="top"></DetailTop>
    <div class="bottom">
      <ScrollView ref="scroll_view">
        <DetailBottom :playlist="playlist.tracks"></DetailBottom>
      </ScrollView>
    </div>
  </div>
</template>

<script>
  import SubHeader from "../components/Detail/DetailHeader";
  import DetailTop from "../components/Detail/DetailTop";
  import DetailBottom from "../components/Detail/DetailBottom";
  import ScrollView from "../components/ScrollView";
  import {getPlayList, getAlbum, getArtistsSongs} from "../api/index";

  export default {
    name: "Detail",
    components: {
      SubHeader,
      DetailTop,
      DetailBottom,
      ScrollView
    },
    data: function() {
      return {
        playlist: {}
      }
    },
    created() {
      if (this.$route.params.type === 'personalized') {
        getPlayList({id: this.$route.params.id})
          .then(data => this.playlist = data.playlist)
          .catch(err => console.log(err));
      } else if (this.$route.params.type === 'album') {
        getAlbum({id: this.$route.params.id})
          .then(data => {
            this.playlist = {
              name: data.album.name,
              coverImgUrl: data.album.picUrl,
              tracks: data.songs
            }
          })
          .catch(err => console.log(err));
      } else if (this.$route.params.type === 'singer') {
        getArtistsSongs({id: this.$route.params.id})
          .then(data => {
            this.playlist = {
              name: data.artist.name,
              coverImgUrl: data.artist.picUrl,
              tracks: data.hotSongs
            }
          })
          .catch(err => console.log(err));
      }
    },
    mounted() {
      let defaultHeight = this.$refs.top.$el.offsetHeight;  // $el 组件根元素
      // console.log(defaultHeight);

      this.$refs.scroll_view.scrolling(offsetY => {
        // console.log(offsetY);
        if (offsetY < 0) {
          // 注意点：高斯模糊效果非常消耗性能，不推荐在移动端使用。如果非要在移动端中使用，建议只设置一次
          // let scale = 10 * Math.abs(offsetY) / defaultHeight;
          // this.$refs.top.$el.style.filter = `blur(${scale}px)`;

          let scale = Math.abs(offsetY) / defaultHeight;
          this.$refs.top.changeMask(scale);
        }else {
          let scale = 1 + offsetY / defaultHeight;
          this.$refs.top.$el.style.transform = `scale(${scale})`;
        }
      })
    }
  }
</script>

<style scoped lang="scss">
  @import "../assets/css/mixin";

  .detail {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    @include bg_sub_color();

    .bottom {
      position: fixed;
      top: 500px;
      bottom: 0;
      left: 0;
      right: 0;
    }
  }
</style>