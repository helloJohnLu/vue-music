<template>
  <div class="player">
    <NormalPlayer></NormalPlayer>
    <MiniPlayer></MiniPlayer>
    <ListPlayer ref="listPlayer"></ListPlayer>
    <audio :src="this.currentSong.url" ref="audio"></audio>
  </div>
</template>

<script>
  import NormalPlayer from "../components/Player/NormalPlayer";
  import MiniPlayer from "../components/Player/MiniPlayer";
  import ListPlayer from "../components/Player/ListPlayer";
  import {mapGetters} from "vuex";

  export default {
    name: "Play",
    components: {
      NormalPlayer,
      MiniPlayer,
      ListPlayer
    },
    computed: {
      ...mapGetters([
        'currentSong',
        'isPlaying',
        'currentIndex'
      ])
    },
    watch: {
      // 播放按钮 播放/暂停
      isPlaying(newValue, oldValue) {
        if (newValue) {
          this.$refs.audio.play();
        } else {
          this.$refs.audio.pause();
        }
      },
      // 监听歌曲切换
      currentIndex(newValue, oldValue) {
        this.$refs.audio.oncanplay = () => {
          if (this.isPlaying) {
            this.$refs.audio.play();
          } else {
            this.$refs.audio.pause();
          }
        }
      }
    }
  }
</script>

<style scoped lang="scss">

</style>