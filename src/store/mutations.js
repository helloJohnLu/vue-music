import {
  SET_FULL_SCREEN,
  SET_MINI_PLAYER,
  SET_LIST_PLAYER,
  SET_IS_PLAYING,
  SET_MODE_TYPE,
  SET_SONG_DETAIL,
  SET_SONG_LYRIC,
  DELETE_SONG,
  SET_SONG_SELECT,
  SET_CLICK_CURRENT_TIME,
  SET_FAVORITE_SONG,
  SET_FAVORITE_LIST,
  SET_HISTORY_SONG,
  SET_HISTORY_LIST
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

    // 解决删除歌曲时索引 bug
    if (index < state.currentIndex) {
      state.currentIndex -= 1;
    }

    // 如果是删除全部歌曲，需要关闭所有的播放器界面
    if (state.songs.length === 0) {
      state.isFullScreen = false;
      state.isShowMiniPlayer = false;
      state.isShowListPlayer = false;
    }
  },
  // 列表播放界面，点选播放歌曲
  [SET_SONG_SELECT](state, index) {
    // 头尾处理
    if (index < 0) {
      index = state.songs.length - 1;
    } else if (index > state.songs.length - 1) {
      index = 0;
    }
    state.currentIndex = index;
  },
  [SET_CLICK_CURRENT_TIME](state, time) {
    state.clickCurrentTime = time;
  },
  // 收藏歌曲
  [SET_FAVORITE_SONG](state, song) {
    // 保存歌曲前先遍历数组，看数组中是否有（之前已收藏过）
    let result = state.favoriteList.find(currentValue => {
      return currentValue === song;
    });
    // 如果之前没有保存过
    if (result === undefined) {
      state.favoriteList.push(song);
    }
  },
  // 收藏歌曲数组更新
  [SET_FAVORITE_LIST](state, list) {
    state.favoriteList = list;
  },
  // 播放历史
  [SET_HISTORY_SONG](state, song) {
    let result = state.historyList.find(currentValue => currentValue.id === song.id);

    // 如果播放历史列表里没有
    if (result === undefined) {
      // 最多保存 30 首
      if (state.historyList.length > 30) {
        state.historyList.pop(state.historyList.length - 1);
      }
      state.historyList.unshift(song);
    } else {
      let index = state.historyList.indexOf(result);
      let song = state.historyList.splice(index, 1);        // Array.splice 删除数组元素时返回的是数组
      let songToObj = JSON.parse(JSON.stringify(song[0]));  // song 转换成对象
      state.historyList.unshift(songToObj);
    }
  },
  // 播放历史列表更新
  [SET_HISTORY_LIST](state, list) {
    state.historyList = list;
  },
}