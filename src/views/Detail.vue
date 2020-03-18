<template>
  <div class="detail">
    <SubHeader :title="playlist.name"></SubHeader>
    <DetailTop :img-path="playlist.coverImgUrl"></DetailTop>
    <div class="bottom">
      <ScrollView>
        <DetailBottom :playlist="playlist.tracks"></DetailBottom>
      </ScrollView>
    </div>
  </div>
</template>

<script>
  import SubHeader from "../components/SubHeader";
  import DetailTop from "../components/DetailTop";
  import DetailBottom from "../components/DetailBottom";
  import ScrollView from "../components/ScrollView";
  import {getPlayList} from "../api/index";

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
        playlist: []
      }
    },
    created() {
      getPlayList({id: this.$route.params.id})
        .then(data => this.playlist = data.playlist)
        .catch(err => console.log(err));
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
    @include bg_color();

    .bottom {
      position: fixed;
      top: 500px;
      bottom: 0;
      left: 0;
      right: 0;
    }
  }
</style>