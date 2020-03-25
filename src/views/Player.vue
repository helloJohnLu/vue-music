<template>
  <div class="player">
    <NormalPlayer :songDuration="songDuration" :currentTime="currentTime"></NormalPlayer>
    <MiniPlayer></MiniPlayer>
    <ListPlayer ref="listPlayer"></ListPlayer>
    <audio :src="currentSong.url" ref="audio" @timeupdate="timeupdate" @ended="end"></audio>
  </div>
</template>

<script>
  import NormalPlayer from "../components/Player/NormalPlayer";
  import MiniPlayer from "../components/Player/MiniPlayer";
  import ListPlayer from "../components/Player/ListPlayer";
  import {mapGetters, mapActions} from "vuex";
  import mode from "../store/modeType";

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
        'currentIndex',
        'clickCurrentTime',
        'modeType',
        'songs',
        'favoriteList',
        'historyList',
      ])
    },
    methods: {
      ...mapActions([
        'setIsPlaying',
        'setSelectSong',
        'setFavoriteList',
        'setHistorySong',
        'setHistoryList'
      ]),
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
      },
      // 播放歌曲进度，当前时间
      timeupdate(e) {
        this.currentTime = e.target.currentTime;
      },
      // 监听歌曲是否播放完毕
      end() {
        if (this.modeType === mode.loop) {
          this.setSelectSong(this.currentIndex + 1);
        } else if (this.modeType === mode.one) {
          this.$refs.audio.play();
        } else if (this.modeType === mode.random) {
          let index = this.getRandomNumber(0, this.songs.length - 1);
          this.setSelectSong(index);
        }
      },
      // 生成随机数
      getRandomNumber(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;  // 含最大值，含最小值
      }
    },
    watch: {
      // 播放按钮 播放/暂停
      isPlaying(newValue, oldValue) {
        if (newValue) {
          // this.$refs.audio.play();
          this.fetchSongAndPlay(this.$refs.audio);
        } else {
          // this.$refs.audio.pause();
          let playPromise = this.$refs.audio.play();
          if (playPromise !== undefined) {
            playPromise.then(() => {
              this.$refs.audio.pause();
            }).catch(()=> {

            })
          }
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

            // 写入播放历史
            this.setHistorySong(this.currentSong);
          }
        }
      },
      // 监听点击进度条，时间变化
      clickCurrentTime(newValue, oldValue) {
        if (newValue) {
          this.$refs.audio.currentTime = newValue;
        }
      },
      // 监听收藏歌典数组变化
      favoriteList(newValue, oldValue) {
        window.localStorage.setItem('favoriteList', JSON.stringify(newValue));  // JSON.stringify 转成字符串
      },
      // 播放历史，数据据久化
      historyList(newValue, oldValue) {
        window.localStorage.setItem('historyList', JSON.stringify(newValue));  // JSON.stringify 转成字符串
      }
    },
    data: function () {
      return {
        songDuration: 0,
        currentTime: 0
      }
    },
    created() {
      // 读取收藏歌曲数组
      let favoriteList = JSON.parse(window.localStorage.getItem('favoriteList'));  // 字符串转成数组
      // 如果 favoriteList 为空数组，不读取/赋值
      if (favoriteList === null) {
        return;
      }
      this.setFavoriteList(favoriteList);

      // 读取播放历史
      let historyList = JSON.parse(window.localStorage.getItem('historyList'));  // 字符串转成数组
      // 如果 favoriteList 为空数组，不读取/赋值
      if (historyList === null) {
        return;
      }
      this.setHistoryList(historyList);
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