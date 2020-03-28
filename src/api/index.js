// 这个 JS 文件是专门用于管理各种接口地址
import Network from "./network";

export const getBanner = () => Network.get('/banner?type=2')
export const getPersonalized = () => Network.get('/personalized?limit=6')
export const getNewAlbum = () => Network.get('/album/newest')
export const getNewSong = () => Network.get('/personalized/newsong')
export const getPlayList = (data) => Network.get('/playlist/detail', data)
export const getAlbum = (data) => Network.get('/album', data)
export const getSongDetail = (data) => Network.get('/song/detail', data)
export const getSongLyric = (data) => Network.get('/lyric', data)
export const getSongUrl = (data) => Network.get('/song/url', data)
export const getArtistsSongs = (data) => Network.get('/artists', data)

// 热门歌手数据
// export const getHotArtists = () => Network.get('/top/artists?offset=0&limit=5')
// 改进：直接返回数据数据（方便处理）
export const getHotArtists = () => {
  return new Promise((resolve, reject) => {
    Network.get('/top/artists?offset=0&limit=5')
      .then(response => resolve(response.artists))
      .catch(error => reject(error));
  })
}

// 并发请求热门歌手数据
export const getArtistsByLetter = letter => {
  return new Promise((resolve, reject) => {
    let letterArtists = [];
    Network.all([
      Network.get(`/artist/list?offset=0&limit=5&cat=1001&initial=${letter}`),
      Network.get(`/artist/list?offset=0&limit=5&cat=1002&initial=${letter}`),
      Network.get(`/artist/list?offset=0&limit=5&cat=1003&initial=${letter}`),
      Network.get(`/artist/list?offset=0&limit=5&cat=2001&initial=${letter}`),
      Network.get(`/artist/list?offset=0&limit=5&cat=2002&initial=${letter}`),
      Network.get(`/artist/list?offset=0&limit=5&cat=2003&initial=${letter}`)
    ])
      .then(response => {
        // console.log(response)
        response.forEach(item => {
          letterArtists.push(...item.artists);
        });
        resolve(letterArtists);
      })
      .catch(error => reject(error));
  })
}

// 根据不同字母并发请求热门歌手数据
export const getAllArtists = letter => {
  return new Promise((resolve, reject) => {
    let keys = ['热'];
    let list = [getHotArtists()];

    // A-Z 的 ASCII 码
    for (let i = 65; i < 91; i++) {
      let char = String.fromCharCode(i);
      keys.push(char);
      list.push(getArtistsByLetter(char));
    }

    // 发请求
    Network.all(list)
      .then(response => {
        let obj = {};
        obj.keys = keys;
        obj.list = response;
        resolve(obj);
      })
      .catch(error => reject(error))
    }
  );
};

// 排行榜数据 内容摘要
export const getTopListDetail = () => {
  return new Promise((resolve, reject) => {
    // 对数据进行自定义分类
    let category = {
      officialList: [
        { name: '云音乐飙升榜', id: 3 },
        { name: '云音乐新歌榜', id: 0 },
        { name: '网易原创歌曲榜', id: 2 },
        { name: '云音乐热歌榜', id: 1 }
      ],
      recList: [
        { name: '云音乐说唱榜', id: 23 },
        { name: '云音乐电音榜', id: 25 },
        { name: '云音乐欧美新歌榜', id: 32 },
        { name: '抖音排行榜', id: 26 },
        { name: '云音乐ACG音乐榜', id: 22 },
        { name: '云音乐古典音乐榜', id: 24 }
      ],
      globalList: [
        { name: '美国Billboard周榜', id: 6 },
        { name: 'UK排行榜周榜', id: 5 },
        { name: 'Beatport全球电子舞曲榜', id: 21 },
        { name: '日本Oricon周榜', id: 10 },
        { name: 'iTunes榜', id: 8 },
        { name: '英国Q杂志中文版周榜', id: 29 }
      ],
      otherList: [
        { name: 'KTV唛榜', id: 7 },
        { name: '法国 NRJ Vos Hits 周榜', id: 19 },
        { name: '新声榜', id: 27 },
        { name: '云音乐韩语榜', id: 28 },
        { name: '电竞音乐榜', id: 30 },
        { name: '云音乐欧美热歌榜', id: 31 }
      ],
      titles: { officialList: '官方榜', recList: '推荐榜', globalList: '全球榜', otherList: '更多榜单' }
    };
    Network.get('toplist/detail')
      .then(response => {
        response.list.forEach(item => {
          outer: for (const key in category) {
            for (let i = 0; i < category[key].length; i++) {
              if (category[key][i].name === item.name) {
                category[key][i].rank = item;
                break outer;
              }
            }
          }
        });
        resolve(category);
      })
      .catch(error => reject(error));
  })
};
// 排单数据
export const getToplist = (data) => Network.get('/top/list', data)