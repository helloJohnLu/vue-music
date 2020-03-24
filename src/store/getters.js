export default {
  isFullScreen(state) {
    return state.isFullScreen;
  },
  isShowMiniPlayer(state) {
    return state.isShowMiniPlayer;
  },
  isShowListPlayer(state) {
    return state.isShowListPlayer;
  },
  isPlaying(state) {
    return state.isPlaying;
  },
  modeType(state) {
    return state.modeType;
  },
  songs(state) {
    return state.songs;
  },
  currentSong(state) {
    let obj = {
      name: '',
      singer: '',
      picUrl: null
    };
    if (state.songs.length !== 0) {
      obj = state.songs[state.currentIndex];
    }
    return obj;
  },
  currentLyric(state) {
    return state.currentLyric;
  },
  currentIndex(state) {
    return state.currentIndex;
  },
  // 点击进度条，时间
  clickCurrentTime(state) {
    return state.clickCurrentTime;
  },
  // 收藏歌曲
  favoriteList(state) {

  }
}