import {
  SET_FULL_SCREEN,
  SET_MINI_PLAYER,
  SET_LIST_PLAYER,
  SET_IS_PLAYING,
  SET_MODE_TYPE,
  SET_SONG_DETAIL
} from "./mutations-type";
import {getSongDetail} from "../api/index";


export default {
  /*
  setFullScreen({commit}, flag) {
    commit('SET_FULL_SCREEN', flag);
  }
   */

  setFullScreen({commit}, flag) {
    commit(SET_FULL_SCREEN, flag);
  },
  setMiniPlayer({commit}, flag) {
    commit(SET_MINI_PLAYER, flag);
  },
  setListPlayer({commit}, flag) {
    commit(SET_LIST_PLAYER, flag);
  },
  setIsPlaying({commit}, flag) {
    commit(SET_IS_PLAYING, flag);
  },
  setModeType({commit}, flag) {
    commit(SET_MODE_TYPE, flag);
  },
  async setSongDetail({commit}, ids) {
    let result = await getSongDetail({ids: ids.join(',')});
    // console.log(result);
    let list = [];
    result.songs.forEach(value => {
      let obj = {};
      obj.name = value.name;
      let singer = '';
      value['ar'].forEach((item, index) => {
        if (index === 0) {  // 如果只有一位歌手
          singer = item.name;
        } else {  // 如果有多位歌手
          singer += '-' + item.name;
        }
      });
      obj.singer = singer;
      obj.picUrl = value['al'].picUrl;
      list.push(obj);
    });
    commit(SET_SONG_DETAIL, list);
  }
}