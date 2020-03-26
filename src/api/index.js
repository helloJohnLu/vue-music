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

