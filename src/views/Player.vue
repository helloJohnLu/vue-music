<template>
  <div class="player">
    <NormalPlayer :songDuration="songDuration"></NormalPlayer>
    <MiniPlayer></MiniPlayer>
    <ListPlayer ref="listPlayer"></ListPlayer>
    <audio :src="currentSong.url" ref="audio"></audio>
  </div>
</template>

<script>
  import NormalPlayer from "../components/Player/NormalPlayer";
  import MiniPlayer from "../components/Player/MiniPlayer";
  import ListPlayer from "../components/Player/ListPlayer";
  import {mapGetters, mapActions} from "vuex";

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
    methods: {
      ...mapActions(['setIsPlaying']),
      // 异步请求歌曲并的播放
      fetchSongAndPlay(audio) {
        fetch(this.currentSong.url)
          .then(response => response.blob())
          .then(blob => {
            audio.audioObject = blob;
            return audio.play();
          })
          .then(_ => {
            // Video playback started ;)
          })
          .catch(e => {
            // Video playback failed ;(
          })
      }
    },
    watch: {
      // 播放按钮 播放/暂停
      isPlaying(newValue, oldValue) {
        if (newValue) {
          // this.$refs.audio.play();
          this.fetchSongAndPlay(this.$refs.audio);
        } else {
          this.$refs.audio.pause();
        }
      },
      // 监听歌曲切换
      /*
      currentIndex(newValue, oldValue) {
        this.$refs.audio.oncanplay = () => {
          if (this.isPlaying) {
            this.$refs.audio.play();
          } else {
            this.$refs.audio.pause();
          }
        }
      }
      */
      // 监听歌曲切换 改进
      currentSong(newValue, oldValue) {
        if (newValue) {
          this.setIsPlaying(false);
          this.$refs.audio.oncanplay = () => {
            this.songDuration = this.$refs.audio.duration;  // 获取歌曲时长
            this.setIsPlaying(true);
          }
        }
      }
    },
    data: function () {
      return {
        songDuration: 0
      }
    },
    mounted() {
      this.$refs.audio.oncanplay = () => {
        this.songDuration = this.$refs.audio.duration;  // 获取歌曲时长
      }
    }
  }
</script>

<style scoped lang="scss">

</style>