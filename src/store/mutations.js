import {
  SET_FULL_SCREEN,
  SET_MINI_PLAYER,
  SET_LIST_PLAYER,
  SET_IS_PLAYING,
  SET_MODE_TYPE,
  SET_SONG_DETAIL,
  SET_SONG_LYRIC,
  DELETE_SONG
} from "./mutations-type";

export default {
  /*
  changeFullScreen(state, flag) {
    state.isFullScreen = flag;
  }
   */

  [SET_FULL_SCREEN](state, flag) {
    state.isFullScreen = flag;
    if (flag) {
      state.isShowListPlayer = false;
      state.isShowMiniPlayer = false;
    }
  },
  [SET_MINI_PLAYER](state, flag) {
    state.isShowMiniPlayer = flag;
    if (flag) {
      state.isShowListPlayer = false;
      state.isFullScreen = false;
    }
  },
  [SET_LIST_PLAYER](state, flag) {
    state.isShowListPlayer = flag;
  },
  [SET_IS_PLAYING](state, flag) {
    state.isPlaying = flag;
  },
  [SET_MODE_TYPE](state, flag) {
    state.modeType = flag;
  },
  [SET_SONG_DETAIL](state, list) {
    state.songs = list;
  },
  [SET_SONG_LYRIC](state, lyric) {
    state.currentLyric = lyric;
  },
  // 删除歌曲
  [DELETE_SONG](state, index) {
    if (index !== undefined) {
      state.songs.splice(index, 1);  // 删除单首
    } else {
      state.songs = [];  // 删除全部歌曲
    }
    // 如果是删除全部歌曲，需要关闭所有的播放器界面
    if (state.songs.length === 0) {
      state.isFullScreen = false;
      state.isShowMiniPlayer = false;
      state.isShowListPlayer = false;
    }
  }
}