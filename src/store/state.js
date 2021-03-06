import mode from "./modeType";

export default {
  isFullScreen: false,
  isShowMiniPlayer: false,
  isShowListPlayer: false,
  isPlaying: false,
  modeType: mode.loop,
  songs: [],
  currentIndex: 0,
  currentSong: {},
  currentLyric: {},
  clickCurrentTime: 0,
  favoriteList: [],
  historyList: []
}