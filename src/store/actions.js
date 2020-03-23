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
  SET_CLICK_CURRENT_TIME
} from "./mutations-type";
import {getSongDetail, getSongLyric, getSongUrl} from "../api/index";

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
    let urls = await getSongUrl({id: ids.join(',')});
    // console.log(urls.data[0].url);
    // console.log(result);
    let list = [];
    result.songs.forEach((value, i) => {
      let obj = {};
      obj.url = urls.data[i].url;
      obj.name = value.name;
      obj.id = value.id;
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
  },
  async setSongLyric({commit}, id) {
    let result = await getSongLyric({id: id});
    // console.log(result.lrc.lyric);
    let obj = parseLyric(result.lrc.lyric);
    // console.log(obj);
    commit(SET_SONG_LYRIC, obj);
  },
  // 删除歌曲
  deleteSong({commit}, index) {
    commit(DELETE_SONG, index);
  },
  // 列表播放界面点选播放歌曲
  setSelectSong({commit}, index) {
    commit(SET_SONG_SELECT, index);
  },
  // 点击进度条，时间
  setClickCurrentTime({commit}, time) {
    commit(SET_CLICK_CURRENT_TIME, time);
  }
}

// 格式化歌词
function parseLyric(lrc) {
  // 用换行符进行分割
  let lyrics = lrc.split('\n');

  // [00:00.000] 作曲 : 阿沁
  // 1. 定义正则表达式提取时间：[00:00.000]
  let reg_getTime = /\[\d*:\d*.\d*\]/g;

  // 2. 定义正则表达式提取分钟：[00
  let reg_getMin = /\[\d*/i;

  // 3. 定义正则表达式提取秒钟：00
  let reg_getSecond = /\:\d*/i;

  // 4. 定义一个对象保存处理好的歌词
  let lyricObj = {};

  lyrics.forEach(lyric => {
    // 1). 提取时间
    let timeStr = lyric.match(reg_getTime);
    if (!timeStr) {
      return;
    }
    timeStr = timeStr[0];

    // 2). 提取分钟
    let minStr = timeStr.match(reg_getMin)[0].substr(1);

    // 3). 提取秒钟
    let secondStr = timeStr.match(reg_getSecond)[0].substr(1);

    // 4). 合并时间，将分钟和秒钟都合并为秒钟
    let time = parseInt(minStr) * 60 + parseInt(secondStr);

    // 5). 处理歌词
    let text = lyric.replace(reg_getTime, '').trim();  // 去掉时间

    // 6). 保存歌词
    lyricObj[time] = text;
  });

  // console.log(lyricObj);
  return lyricObj;
}