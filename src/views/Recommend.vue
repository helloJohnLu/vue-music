<template>
  <div class="recommend">
    <Banner :banners="banners"></Banner>
    <Personalized :personalized="personalized" :title="'推荐歌单'"></Personalized>
    <Personalized :personalized="albums" :title="'最新专辑'"></Personalized>
    <SongList :songs="songs"></SongList>
  </div>
</template>

<script>
  import {getBanner, getPersonalized, getNewAlbum, getNewSong} from "../api/index";
  import Banner from "../components/Banner";
  import Personalized from "../components/Personalized";
  import SongList from "../components/SongList";

  export default {
    name: "Recommend",
    components: {
      Banner,
      Personalized,
      SongList
    },
    data() {
      return {
        banners: [],
        personalized: [],
        albums: [],
        songs: []
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

<style scoped>

</style>