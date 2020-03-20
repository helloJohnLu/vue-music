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
    return state.modeType;
  },
  currentSong(state) {
    return state.songs[state.currentIndex];
  }
}