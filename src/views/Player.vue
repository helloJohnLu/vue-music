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
  import {getRandomNumber, setlocalStorage, getlocalStorage} from "../tools/tools";

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
          let index = getRandomNumber(0, this.songs.length - 1);
          this.setSelectSong(index);
        }
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
            }).catch(() => {

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
          /**
           * 注意点：在 IOS 系统中，Safari 浏览器从 5.0 开始不再支持 preload 特性！
           * 在 PC 与 Android 系统中，浏览器支持 preload 特性，会默认预加载音频/视频资源
           * 即然 Safari 不支持 preload 特性，歌曲没有预加载，那么 oncanplay 就不会自动执行
           * 所以这里不能监听 oncanplay 特性，否则在 IOS 上会产生 Bug
           * 解决方案：监听 ondurationchange 事件
           *         ondurationchange 当时长发生变化时执行 JavaScript
           */
          this.$refs.audio.ondurationchange = () => {
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
        // window.localStorage.setItem('favoriteList', JSON.stringify(newValue));  // JSON.stringify 转成字符串
        setlocalStorage('favoriteList', newValue);
      },
      // 播放历史，数据据久化
      historyList(newValue, oldValue) {
        // window.localStorage.setItem('historyList', JSON.stringify(newValue));  // JSON.stringify 转成字符串
        setlocalStorage('historyList', newValue);
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
      // let favoriteList = JSON.parse(window.localStorage.getItem('favoriteList'));  // 字符串转成数组
      let favoriteList = getlocalStorage('favoriteList');
      // 如果 favoriteList 为空数组，不读取/赋值
      if (favoriteList === null) {
        return;
      }
      this.setFavoriteList(favoriteList);

      // 读取播放历史
      // let historyList = JSON.parse(window.localStorage.getItem('historyList'));  // 字符串转成数组
      let historyList = getlocalStorage('historyList');
      // 如果 favoriteList 为空数组，不读取/赋值
      if (historyList === null) {
        return;
      }
      this.setHistoryList(historyList);
    },
    mounted() {
      this.$refs.audio.ondurationchange = () => {
        this.songDuration = this.$refs.audio.duration;  // 获取歌曲时长
      }
    }
  }
</script>

<style scoped lang="scss">

</style>