// 这个 JS 文件是专门用于管理各种接口地址
import Network from "./network";

export const getBanner = () => Network.get('/banner?type=2')
export const getPersonalized = () => Network.get('/personalized?limit=6')
export const getNewAlbum = () => Network.get('/album/newest')