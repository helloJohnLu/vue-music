<template>
  <div class="recommend">
    <ScrollView>
      <div>
        <Banner :banners="banners"></Banner>
        <Personalized :personalized="personalized" :title="'推荐歌单'" @select="fatherSelectItem"></Personalized>
        <Personalized :personalized="albums" :title="'最新专辑'"></Personalized>
        <SongList :songs="songs"></SongList>
      </div>
    </ScrollView>
    <transition>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  import {getBanner, getPersonalized, getNewAlbum, getNewSong} from "../api/index";
  import Banner from "../components/Banner";
  import Personalized from "../components/Personalized";
  import SongList from "../components/SongList";
  import ScrollView from "../components/ScrollView";

  export default {
    name: "Recommend",
    components: {
      Banner,
      Personalized,
      SongList,
      ScrollView
    },
    data() {
      return {
        banners: [],
        personalized: [],
        albums: [],
        songs: []
      }
    },
    methods: {
      fatherSelectItem(id) {
        this.$router.push({
          path: `/recommend/detail/${id}`
        })
      }
    },
    created() {
      getBanner()
        .then(data => this.banners = data.banners)
        .catch(err => console.log(err));
      getPersonalized()
        .then(data => this.personalized = data.result)
        .catch(err => console.log(err));
      getNewAlbum()
        .then(data => this.albums = data.albums.splice(0, 6))
        .catch(err => console.log(err));
      getNewSong()
        .then(data => this.songs = data.result)
        .catch(err => console.log(err));
    }
  }
</script>

<style scoped lang="scss">
  .recommend {
    position: fixed;
    top: 184px;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
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