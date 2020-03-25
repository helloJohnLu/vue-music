// 生成随机数
export const getRandomNumber = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;  // 含最大值，含最小值
}
// 格式化歌曲时长
export const formatSongTime = time => {
  let songDuration = time;
  // 小时
  let hour = Math.floor(songDuration / (60 * 60) % 24);
  hour = hour >= 10 ? hour : '0' + hour;
  // 分钟
  let minute = Math.floor(songDuration / (60) % 60);
  minute = minute >= 10 ? minute : '0' + minute;
  // 秒
  let second = Math.floor(songDuration % 60);
  second = second >= 10 ? second : '0' + second;
  return {
    hour: hour,
    minute: minute,
    second: second
  }
}
// 写入本地数据存储
export const setlocalStorage = (key, value) => {
  window.localStorage.setItem(key, JSON.stringify(value));  // JSON.stringify 转成字符串
}
// 获取本地数据
export const getlocalStorage = key => {
  return JSON.parse(window.localStorage.getItem(key));  // 字符串转成数组
}